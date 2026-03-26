"use client";

import { useMemo } from "react";
import { ArrowRight, Hammer, Orbit, Sparkles } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useInterviewSessionStore } from "@/store/interview-session";
import type { FeedbackModel } from "@/types/interview";

function nowTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function InterviewPage() {
  const {
    interviewId,
    stage,
    question,
    answer,
    messages,
    feedback,
    finalScore,
    isSubmitting,
    error,
    setInterviewId,
    setStage,
    setAnswer,
    setFeedback,
    setFinalScore,
    setSubmitting,
    setError,
    pushMessage,
    reset
  } = useInterviewSessionStore();

  const canSubmit = useMemo(() => answer.trim().length > 0 && !isSubmitting, [answer, isSubmitting]);

  async function startSession() {
    try {
      setError(null);
      const resp = await fetch("/api/interviews/start", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId: "demo-user",
          title: "Narrative Forge Mock",
          role: "Software Engineer",
          company: "DemoCorp",
          interviewType: "BEHAVIORAL",
          mode: "PRACTICE"
        })
      });
      const data = await resp.json();
      const id = data?.interview?.id ?? null;
      setInterviewId(id);
      setStage("raw");
      return id as string | null;
    } catch {
      setError("Unable to start session.");
      return null;
    }
  }

  async function endSession() {
    if (!interviewId) return;
    setSubmitting(true);
    try {
      const resp = await fetch("/api/interviews/end", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ interviewId })
      });
      const data = await resp.json();
      setFinalScore(data?.interview?.overallScore ?? null);
      setStage("polished");
    } catch {
      setError("Unable to end session.");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitAnswer() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    let activeInterviewId = interviewId;
    if (!activeInterviewId) activeInterviewId = await startSession();
    if (!activeInterviewId) {
      setSubmitting(false);
      return;
    }

    const userText = answer.trim();
    pushMessage({ id: crypto.randomUUID(), sender: "user", text: userText, at: nowTime() });
    setAnswer("");

    try {
      await fetch("/api/interviews/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          interviewId: activeInterviewId,
          question,
          answer: userText,
          transcript: userText
        })
      });

      const feedbackResp = await fetch("/api/feedback/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ transcript: userText, answer: userText })
      });
      const feedbackData = await feedbackResp.json();

      let parsed: Partial<FeedbackModel> = {};
      if (typeof feedbackData.feedback === "string") {
        try {
          parsed = JSON.parse(feedbackData.feedback) as Partial<FeedbackModel>;
        } catch {
          parsed = { summary: String(feedbackData.feedback) };
        }
      } else {
        parsed = feedbackData.feedback as Partial<FeedbackModel>;
      }

      setFeedback({
        clarity: Number(parsed.clarity ?? parsed.clarityScore ?? 70),
        confidence: Number(parsed.confidence ?? parsed.confidenceScore ?? 70),
        relevance: Number(parsed.relevance ?? parsed.relevanceScore ?? 70),
        suggestions: parsed.suggestions ?? parsed.suggestedImprovements ?? ["Add quantified business impact."],
        missingStarParts: parsed.missingStarParts ?? ["Result"],
        summary: parsed.summary ?? "Feedback generated."
      });

      pushMessage({
        id: crypto.randomUUID(),
        sender: "ai",
        text: "Nice start. Tighten your STAR structure and include one measurable impact result.",
        at: nowTime()
      });
      setStage("repair");
    } catch {
      setError("Failed to submit answer.");
    } finally {
      setSubmitting(false);
    }
  }

  const stageOrder = ["prompt", "raw", "repair", "polished"] as const;
  const stageLabel: Record<(typeof stageOrder)[number], string> = {
    prompt: "Prompt",
    raw: "Raw",
    repair: "Repair",
    polished: "Polished"
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-black/20 p-3">
          <div className="grid gap-2 md:grid-cols-4">
            {stageOrder.map((s, i) => {
              const active = s === stage;
              return (
                <div
                  key={s}
                  className={
                    "rounded-xl border px-3 py-2 text-xs transition-colors " +
                    (active
                      ? "border-primary/50 bg-primary/15 text-foreground"
                      : "border-border bg-black/20 text-muted-foreground")
                  }
                >
                  <span className="mr-2 text-[11px] opacity-70">0{i + 1}</span>
                  {stageLabel[s]}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle>Narrative Forge Session</CardTitle>
                <CardDescription>
                  Build answer quality through prompt -&gt; raw -&gt; repair -&gt; polished flow.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" aria-label="Prompt stage">
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Raw stage">
                  <Orbit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Repair stage">
                  <Hammer className="h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={startSession} disabled={Boolean(interviewId)}>
                  Start
                </Button>
                <Button variant="outline" onClick={endSession} disabled={!interviewId || isSubmitting}>
                  End
                </Button>
                <Button variant="ghost" onClick={reset}>
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-border bg-black/20 p-4">
              <p className="text-xs text-muted-foreground">Active prompt</p>
              <p className="mt-1 text-sm font-medium">{question}</p>
            </div>
            <div className="mt-4">
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your answer using STAR (Situation, Task, Action, Result)..."
              />
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Keep answer under 120 words for first pass.</p>
                <Button onClick={submitAnswer} disabled={!canSubmit}>
                  Submit answer <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          </CardContent>
        </Card>

        <Card className="flex min-h-[70vh] flex-col">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Forge Feedback</CardTitle>
                <CardDescription>Structural coaching and transcript feed.</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-4">
            <div className="flex-1 space-y-3 overflow-auto pr-1">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-border bg-black/20 p-3">
                  <p className="text-xs text-muted-foreground">Clarity</p>
                  <p className="mt-1 text-sm font-medium">{feedback?.clarity ?? 0}/100</p>
                </div>
                <div className="rounded-xl border border-border bg-black/20 p-3">
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="mt-1 text-sm font-medium">{feedback?.confidence ?? 0}/100</p>
                </div>
                <div className="rounded-xl border border-border bg-black/20 p-3">
                  <p className="text-xs text-muted-foreground">Relevance</p>
                  <p className="mt-1 text-sm font-medium">{feedback?.relevance ?? 0}/100</p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-black/20 p-3">
                <p className="text-xs text-muted-foreground">Missing STAR parts</p>
                <p className="mt-1 text-sm font-medium">{feedback?.missingStarParts.join(", ") ?? "None"}</p>
              </div>
              <div className="rounded-xl border border-border bg-black/20 p-3">
                <p className="text-xs text-muted-foreground">Suggestions</p>
                <ul className="mt-1 list-disc pl-4 text-sm">
                  {(feedback?.suggestions ?? ["Submit an answer to get suggestions."]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {finalScore !== null && (
                <div className="rounded-xl border border-primary/40 bg-primary/10 p-3">
                  <p className="text-xs text-muted-foreground">Final score</p>
                  <p className="mt-1 text-lg font-semibold">{finalScore}/100</p>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={"rounded-xl border border-border p-3 text-sm " + (m.sender === "ai" ? "bg-muted/40" : "bg-primary/15")}>
                  <p>{m.text}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.at}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </AppShell>
  );
}

