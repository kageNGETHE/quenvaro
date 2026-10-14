import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { redactPII } from "@/lib/redact";

type Body = {
  content?: string;
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body: Body = await request.json().catch(() => ({}));
  const content = (body.content || "").toString().trim();
  if (!content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  // ensure user exists and is not deleted
  const user = await prisma.user.findUnique({ where: { email: session.user.email.toString().toLowerCase() } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (user.deletedAt) {
    return NextResponse.json({ error: "Account scheduled for deletion" }, { status: 403 });
  }

  try {
    // Redact PII before saving or forwarding
    const { text: sanitizedContent, types } = redactPII(content);

    if (types.length > 0) {
      // Record an audit event noting that PII was redacted from user input
      try {
        await prisma.audit.create({
          data: {
            actor: session.user.email.toString().toLowerCase(),
            action: "REDACT_INPUT",
            details: JSON.stringify({ types, snippet: sanitizedContent.slice(0, 200) }),
          },
        });
      } catch (auditErr) {
        console.error("Failed to write redact audit:", auditErr);
      }
    }

    // save user message (sanitized)
    const userMessage = await prisma.message.create({
      data: {
        userId: user.id,
        role: "user",
        content: sanitizedContent,
      },
    });

    // prepare system prompt and recent messages
    const recent = await prisma.message.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
      take: 20,
    });

    const messagesForAI = [
      { role: "system", content: "You are Quenvaro, a concise and privacy-first personal finance assistant. Respond with clear, actionable financial guidance. Do not ask for raw account credentials or personal secrets. Keep answers short and helpful." },
      ...recent.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
    ];

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      const canned = "Thanks — I’ve saved your question. In a live system I would analyze spending categories and suggest a budget. (Set OPENAI_API_KEY to enable live responses.)";

      await prisma.message.create({
        data: {
          userId: user.id,
          role: "assistant",
          content: canned,
        },
      });

      return NextResponse.json({ reply: canned });
    }

    // call OpenAI Chat Completions
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messagesForAI,
        max_tokens: 400,
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("OpenAI error:", res.status, text);
      const fallback = "Sorry, the AI service is unavailable right now.";
      await prisma.message.create({ data: { userId: user.id, role: "assistant", content: fallback } });
      return NextResponse.json({ error: "AI provider error", details: text }, { status: 502 });
    }

    const payload = await res.json();
    const aiContent = payload?.choices?.[0]?.message?.content ?? payload?.choices?.[0]?.text ?? "";

    const assistantMessage = await prisma.message.create({
      data: {
        userId: user.id,
        role: "assistant",
        content: aiContent,
      },
    });

    return NextResponse.json({ reply: aiContent, assistantId: assistantMessage.id, userMessageId: userMessage.id });
  } catch (error) {
    console.error("Chat handler error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
