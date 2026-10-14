"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { id?: string; role: "user" | "assistant"; content: string };

export default function ChatBox() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // load recent messages (optional)
    fetch("/api/chat-history")
      .then((r) => r.json())
      .then((d) => {
        if (d?.messages) setMessages(d.messages);
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
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.error || "AI error" }]);
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
    <div className="flex h-full flex-col">
      <div className="mb-4 max-h-[360px] space-y-3 overflow-auto rounded-xl bg-[#07182b] p-4 text-sm text-[#dbeefc]">
        {messages.length === 0 ? (
          <div className="text-[#bcdff6]">Ask me about spending, taxes, or savings.</div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={m.role === "assistant" ? "rounded-md bg-white/06 p-3" : "ml-auto rounded-md bg-[#eaf5ff] p-3 text-[#0d213a]"}>
              {m.content}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-auto flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={loading ? "Thinking…" : "Ask about your finances"}
          className="w-full rounded-2xl border border-[#234a66] bg-[#071827] px-4 py-2 text-sm text-[#dbeefc] outline-none"
          disabled={loading}
        />
        <button onClick={send} disabled={loading} className="rounded-full bg-[#9dcff7] px-4 py-2 font-semibold text-[#0d213a] disabled:opacity-60">
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
