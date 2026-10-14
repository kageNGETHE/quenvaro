import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const email = session.user.email.toString().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const messages = await prisma.message.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
      take: 200,
      select: { id: true, role: true, content: true, createdAt: true },
    });

    // serialize dates
    const serialized = messages.map((m) => ({
      id: m.id,
      role: m.role as "user" | "assistant" | string,
      content: m.content,
      createdAt: m.createdAt.toISOString(),
    }));

    return NextResponse.json({ messages: serialized });
  } catch (error) {
    console.error("Chat history error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
