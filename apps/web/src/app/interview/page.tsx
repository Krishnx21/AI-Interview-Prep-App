"use client";

import { useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  sender: "ai" | "user";
  text: string;
  at: string;
};

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function InterviewPage() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "ai",
      text: "Welcome to your mock interview. Tell me about a recent project and your role in it.",
      at: nowTime()
    }
  ]);
  const pendingTimer = useRef<number | null>(null);

  const canSend = useMemo(() => inputValue.trim().length > 0, [inputValue]);

  function send() {
    if (!canSend) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: inputValue.trim(),
      at: nowTime()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    if (pendingTimer.current) window.clearTimeout(pendingTimer.current);
    pendingTimer.current = window.setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: "Great. What were the hardest trade-offs, and how did you measure success?",
        at: nowTime()
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 900);
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-[1fr_420px]">
        <section className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold">Session</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This is a UI placeholder. Next we’ll connect it to real-time transcription and GPT feedback.
          </p>

          <div className="mt-6 aspect-video w-full rounded-2xl border border-border bg-black/30" />
        </section>

        <section className="flex min-h-[70vh] flex-col rounded-3xl border border-border bg-card/60 backdrop-blur">
          <div className="border-b border-border p-5">
            <h3 className="text-lg font-semibold">Transcript</h3>
          </div>

          <div className="flex-1 space-y-3 overflow-auto p-5">
            {messages.map((m) => (
              <div key={m.id} className={m.sender === "ai" ? "pr-10" : "pl-10"}>
                <div
                  className={
                    "rounded-2xl border border-border px-4 py-3 " +
                    (m.sender === "ai" ? "bg-muted/40" : "bg-primary/15")
                  }
                >
                  <p className="text-sm leading-6">{m.text}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.at}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Type your response…"
                className="h-11 flex-1 rounded-xl border border-border bg-black/20 px-4 text-sm outline-none"
              />
              <button
                type="button"
                onClick={send}
                disabled={!canSend}
                className="h-11 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

