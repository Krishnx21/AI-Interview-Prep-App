"use client";

import { useMemo, useRef, useState } from "react";
import { Mic, Send, Video } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_460px]">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle>Mock interview</CardTitle>
                <CardDescription>Practice mode (UI only). Next: WebRTC + Whisper + GPT feedback.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" aria-label="Toggle camera" title="Toggle camera">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Voice input" title="Voice input">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-2xl border border-border bg-black/30" />
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-black/10 p-4">
                <p className="text-xs text-muted-foreground">Pacing</p>
                <p className="mt-1 text-sm font-medium">Good</p>
              </div>
              <div className="rounded-2xl border border-border bg-black/10 p-4">
                <p className="text-xs text-muted-foreground">Clarity</p>
                <p className="mt-1 text-sm font-medium">Improve structure</p>
              </div>
              <div className="rounded-2xl border border-border bg-black/10 p-4">
                <p className="text-xs text-muted-foreground">Confidence</p>
                <p className="mt-1 text-sm font-medium">Steady</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex min-h-[70vh] flex-col">
          <CardHeader className="pb-4">
            <div className="flex items-end justify-between">
              <div>
                <CardTitle>Transcript</CardTitle>
                <CardDescription>Question 1 of 5</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-4">
            <div className="flex-1 space-y-3 overflow-auto pr-1">
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

            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Type your response…"
              />
              <Button onClick={send} disabled={!canSend} size="icon" aria-label="Send">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

