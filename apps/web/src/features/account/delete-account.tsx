import { useState } from "react";
import {
  ConfirmDialog,
  solidDestructive,
} from "@/components/app/confirm-dialog";
import { PasswordField } from "@/features/auth/password-field";
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

export function DeleteAccount() {
  const [password, setPassword] = useState("");
  const action = useAction();
  function confirm() {
    return action.run(async () => {
      // Accounts without a password (Google) rely on a recent sign-in instead.
      checkAuth(await authClient.deleteUser(password ? { password } : {}));
      window.location.assign("/login");
    }, "Your account has been deleted.");
  }
  return (
    <Card className="ring-destructive/30">
      <CardHeader>
        <CardTitle>
          <h2 className="text-destructive">Delete account</h2>
        </CardTitle>
        <CardDescription>
          Permanently remove your profile and every file you have uploaded. This
          cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ConfirmDialog
          title="Delete your account?"
          description="Your profile and all of your files will be permanently deleted. Enter your password to confirm."
          confirmLabel="Delete account"
          pendingLabel="Deleting…"
          destructive
          pending={action.pending}
          error={action.error}
          onConfirm={confirm}
          trigger={
            <Button className={solidDestructive}>Delete account…</Button>
          }
        >
          <PasswordField
            label="Current password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            description="Signed in with Google? Leave this empty."
          />
        </ConfirmDialog>
      </CardContent>
    </Card>
  );
}
