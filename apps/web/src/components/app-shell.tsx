"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Home, MessageSquare, User2 } from "lucide-react";

import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/interview", label: "Interview", icon: MessageSquare },
  { href: "/resources", label: "Resources", icon: FileText },
  { href: "/analytics", label: "Analytics", icon: BarChart3 }
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 md:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-border bg-card/60 p-4 backdrop-blur">
          <div className="flex items-center justify-between px-2 py-2">
            <Link href="/" className="font-semibold tracking-tight">
              NextPrep
            </Link>
            <div className="rounded-xl border border-border bg-black/20 px-2 py-1 text-[11px] text-muted-foreground">
              MVP
            </div>
          </div>

          <nav className="mt-3 space-y-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm transition-colors",
                    active ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-6">
          <header className="flex items-center justify-between rounded-3xl border border-border bg-card/60 px-5 py-4 backdrop-blur">
            <div>
              <p className="text-xs text-muted-foreground">AI Interview Prep</p>
              <p className="text-sm font-medium">Your practice hub</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-black/20">
                <User2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

