import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-border bg-card/60 p-10 backdrop-blur">
          <p className="text-sm text-muted-foreground">NextPrep</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            AI Interview Prep that feels real.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Practice role-specific mock interviews and get structured feedback on clarity,
            relevance, and confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Go to dashboard
            </Link>
            <Link
              href="/interview"
              className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium"
            >
              Start mock interview
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

