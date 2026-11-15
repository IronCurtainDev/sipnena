import { KeyRound, LockKeyhole } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Feedback } from "@/components/app/feedback";
import { Field } from "@/components/app/field";
import { Button } from "@/components/ui/button";
import { AuthFooter, AuthHeading } from "@/features/auth/auth-heading";
import { PasswordField } from "@/features/auth/password-field";
import { useAction } from "@/hooks/use-action";
import { authClient, checkAuth } from "@/lib/auth/client";
import { searchParam } from "@/lib/auth/redirect";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const action = useAction();
  function submit(event: FormEvent) {
    event.preventDefault();
    void action.run(async () => {
      checkAuth(
        await authClient.requestPasswordReset({
          email,
          redirectTo: `${window.location.origin}/reset-password`,
        }),
      );
    }, "If an account exists for this email, we have sent password reset instructions.");
  }
  return (
    <section>
      <AuthHeading
        icon={KeyRound}
        title="Reset your password"
        description="Enter your account email and we will send you a reset link."
      />
      <form className="grid gap-4" onSubmit={submit}>
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Feedback error={action.error} message={action.message} />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={action.pending}
        >
          {action.pending ? "Sending…" : "Send reset link"}
        </Button>
      </form>
      <AuthFooter>
        <p>
          Remembered it? <a href="/login">Back to sign in</a>
        </p>
      </AuthFooter>
    </section>
  );
}

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const action = useAction();
  const token = searchParam("token");
  function submit(event: FormEvent) {
    event.preventDefault();
    void action.run(async () => {
      if (password !== confirmation) throw new Error("Passwords do not match.");
      checkAuth(
        await authClient.resetPassword({ newPassword: password, token }),
      );
      setPassword("");
      setConfirmation("");
    }, "Your password has been changed. You can now sign in.");
  }
  const invalid = !token || Boolean(searchParam("error"));
  return (
    <section>
      <AuthHeading
        icon={LockKeyhole}
        title="Choose a new password"
        description="Use at least 8 characters that you do not use elsewhere."
      />
      {invalid ? (
        <div className="grid gap-4">
          <Feedback error="This reset link is missing or expired." />
          <Button asChild size="lg" className="w-full">
            <a href="/forgot-password">Request a new link</a>
          </Button>
        </div>
      ) : action.message ? (
        <div className="grid gap-4">
          <Feedback message={action.message} />
          <Button asChild size="lg" className="w-full">
            <a href="/login">Continue to sign in</a>
          </Button>
        </div>
      ) : (
        <form className="grid gap-4" onSubmit={submit}>
          <PasswordField
            label="New password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <PasswordField
            label="Confirm password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            required
          />
          <Feedback error={action.error} />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={action.pending}
          >
            {action.pending ? "Saving…" : "Save password"}
          </Button>
        </form>
      )}
      <AuthFooter>
        <p>
          <a href="/login">Back to sign in</a>
        </p>
      </AuthFooter>
    </section>
  );
}
