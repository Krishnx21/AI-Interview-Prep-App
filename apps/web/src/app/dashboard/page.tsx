import Link from "next/link";
import { BarChart3, Clock3, Plus, Target, TrendingUp } from "lucide-react";

import { auth, signOut } from "@/auth";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Signed in as {session?.user?.email ?? "guest"}.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/interview">
              <Button>
                <Plus className="h-4 w-4" />
                New interview
              </Button>
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant="outline">Sign out</Button>
            </form>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <Target className="h-4 w-4" /> Average score
              </CardDescription>
              <CardTitle className="text-3xl">86/100</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-foreground/90">
                <TrendingUp className="h-4 w-4" /> +4%
              </span>{" "}
              this week
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" /> Practice time
              </CardDescription>
              <CardTitle className="text-3xl">12h 30m</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">-2h vs last week</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" /> Interviews completed
              </CardDescription>
              <CardTitle className="text-3xl">14</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Keep a steady cadence.</CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Start a focused practice session.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Link href="/interview">
                <Button variant="secondary">Mock interview</Button>
              </Link>
              <Button variant="outline" disabled>
                Resume analyzer (next)
              </Button>
              <Button variant="outline" disabled>
                System design (next)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Example items (will be DB-backed).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-2xl border border-border bg-black/10 p-4">
                <p className="font-medium">Frontend behavioral (practice)</p>
                <p className="text-muted-foreground">Score: 92 • Strong structure</p>
              </div>
              <div className="rounded-2xl border border-border bg-black/10 p-4">
                <p className="font-medium">System design (graded)</p>
                <p className="text-muted-foreground">Score: 84 • Improve trade-offs</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

