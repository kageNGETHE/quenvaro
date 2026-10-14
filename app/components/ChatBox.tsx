"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { id?: string; role: "user" | "assistant"; content: string };

export default function ChatBox() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // load recent messages
    fetch("/api/chat-history")
      .then((r) => r.json())
      .then((d) => {
        if (d?.messages) setMessages(d.messages.map((m: any) => ({ id: m.id, role: m.role, content: m.content })));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      } else if (data?.error) {
        setMessages((m) => [...m, { role: "assistant", content: data.error || "AI error" }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: "Unexpected response from server" }]);
      }
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Network error" }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex h-full flex-col" role="region" aria-label="Private finance chat">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#bcdff6]">How to use the AI</p>
          <p className="mt-1 text-xs text-[#9ec7e8]">Ask about budgets, spending categories, tax planning, or savings suggestions. Avoid entering passwords or account numbers; these will be redacted.</p>
        </div>
      </div>

      <div className="mb-4 max-h-[360px] space-y-3 overflow-auto rounded-xl p-4 chat-container text-sm">
        {messages.length === 0 ? (
          <div className="text-[#bcdff6]">Tip: Try "How can I reduce dining out expenses by 20% this month?"</div>
        ) : (
          <ul className="space-y-3" aria-live="polite">
            {messages.map((m, i) => (
              <li key={i} className={m.role === "assistant" ? "rounded-md p-3 chat-message-assistant" : "ml-auto rounded-md p-3 chat-message-user"} tabIndex={0}>
                {m.content}
              </li>
            ))}
          </ul>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-auto flex gap-3">
        <label htmlFor="chat-input" className="sr-only">Chat message</label>
        <input
          id="chat-input"
          aria-label="Type your question to Quenvaro"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={loading ? "Thinking…" : "Ask about your finances"}
          className="w-full rounded-2xl border border-[#234a66] bg-[#071827] px-4 py-2 text-sm text-[#dbeefc] outline-none"
          disabled={loading}
        />
        <button aria-label="Send message" onClick={send} disabled={loading} className="rounded-full bg-[#9dcff7] px-4 py-2 font-semibold text-[#0d213a] disabled:opacity-60">
          {loading ? "..." : "Send"}
        </button>
      </div>

      <div className="mt-3 text-xs text-[#9ec7e8]">Privacy: sensitive data you enter will be redacted before saving or sending to the AI.</div>
    </div>
  );
}
