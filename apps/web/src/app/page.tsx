import Link from "next/link";
import { ArrowRight, Hammer, Orbit, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-black/30 px-3 py-2 text-xs text-muted-foreground">
            <Hammer className="h-4 w-4" />
            Narrative Forge mode
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Open app <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <section className="relative rounded-3xl border border-border bg-card/60 p-6 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_0%_20%,rgba(16,185,129,0.18),transparent_50%),radial-gradient(900px_circle_at_100%_90%,rgba(249,115,22,0.16),transparent_45%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-sm text-muted-foreground">NextPrep</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
                Build interview answers like a forged argument chain.
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Move through a diagonal response pipeline: prompt, raw response, structural repair, and polished final delivery.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/interview">
                  <Button size="lg">
                    Enter forge <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    Track progress
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative min-h-[340px] rounded-3xl border border-border bg-black/20 p-4">
              <div className="absolute -left-20 top-16 h-12 w-[130%] rotate-[-14deg] rounded-full border border-emerald-500/40 bg-emerald-500/10" />
              <div className="absolute -left-10 top-36 h-12 w-[120%] rotate-[-14deg] rounded-full border border-amber-500/40 bg-amber-500/10" />
              <div className="absolute -left-2 top-56 h-12 w-[112%] rotate-[-14deg] rounded-full border border-cyan-400/40 bg-cyan-500/10" />

              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-black/40 px-3 py-2 text-xs">
                  <Sparkles className="h-4 w-4 text-emerald-300" /> Prompt captured
                </div>
                <div className="ml-6 inline-flex items-center gap-2 rounded-xl border border-border bg-black/40 px-3 py-2 text-xs">
                  <Orbit className="h-4 w-4 text-amber-300" /> Raw response analyzed
                </div>
                <div className="ml-12 inline-flex items-center gap-2 rounded-xl border border-border bg-black/40 px-3 py-2 text-xs">
                  <Hammer className="h-4 w-4 text-cyan-300" /> Story structure repaired
                </div>
                <div className="ml-16 inline-flex items-center gap-2 rounded-xl border border-border bg-black/40 px-3 py-2 text-xs">
                  <ArrowRight className="h-4 w-4 text-violet-300" /> Final answer forged
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-black/20 p-4">
              <p className="text-xs text-muted-foreground">Problem solved</p>
              <p className="mt-1 text-sm font-medium">&quot;I know it, but explain it poorly.&quot;</p>
            </div>
            <div className="rounded-2xl border border-border bg-black/20 p-4">
              <p className="text-xs text-muted-foreground">Interaction model</p>
              <p className="mt-1 text-sm font-medium">Argument assembly, not static Q&A.</p>
            </div>
            <div className="rounded-2xl border border-border bg-black/20 p-4">
              <p className="text-xs text-muted-foreground">Outcome</p>
              <p className="mt-1 text-sm font-medium">Clear STAR narratives with quantified impact.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

