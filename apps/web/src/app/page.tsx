import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-black/20 px-3 py-2 text-xs text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            Premium interview prep MVP (Next.js + Tailwind + shadcn-style UI)
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Open app <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(59,130,246,0.25),transparent_45%),radial-gradient(900px_circle_at_80%_30%,rgba(139,92,246,0.22),transparent_45%),radial-gradient(700px_circle_at_60%_90%,rgba(236,72,153,0.18),transparent_45%)]" />
          <CardHeader className="relative">
            <p className="text-sm text-muted-foreground">NextPrep</p>
            <CardTitle className="mt-2 text-4xl font-semibold tracking-tight">
              AI Interview Prep that feels real.
            </CardTitle>
            <CardDescription className="mt-3 max-w-2xl">
              Run mock interviews and get structured feedback on clarity, relevance, confidence, and next steps.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex flex-wrap gap-3">
              <Link href="/interview">
                <Button size="lg">
                  Start mock interview <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  View dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

