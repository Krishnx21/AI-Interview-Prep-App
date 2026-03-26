import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Continue with Google or request an email login link.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <Button className="w-full">Continue with Google</Button>
          </form>
          <form
            action={async (formData) => {
              "use server";
              const email = String(formData.get("email") ?? "");
              await signIn("email", { email, redirectTo: "/dashboard" });
            }}
            className="space-y-2"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="h-10 w-full rounded-xl border border-border bg-black/20 px-3 text-sm"
            />
            <Button variant="outline" className="w-full">
              Send magic link
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

