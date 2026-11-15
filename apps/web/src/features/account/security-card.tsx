import { KeyRound } from "lucide-react";
import { Feedback } from "@/components/app/feedback";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAction } from "@/hooks/use-action";
import { authClient, checkAuth } from "@/lib/auth/client";

export function SecurityCard({ email }: { email: string }) {
  const action = useAction();
  function sendReset() {
    void action.run(async () => {
      checkAuth(
        await authClient.requestPasswordReset({
          email,
          redirectTo: `${window.location.origin}/reset-password`,
        }),
      );
    }, `We sent a password reset link to ${email}.`);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Security</h2>
        </CardTitle>
        <CardDescription>Keep your sign-in details up to date.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted">
              <KeyRound className="size-4" />
            </span>
            <div className="grid gap-0.5">
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">
                We will email you a secure link to choose a new password.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            disabled={action.pending}
            onClick={sendReset}
          >
            {action.pending ? "Sending…" : "Send password reset email"}
          </Button>
        </div>
        <Feedback error={action.error} message={action.message} />
      </CardContent>
    </Card>
  );
}
