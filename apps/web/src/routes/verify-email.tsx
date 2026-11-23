import { MailCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Feedback } from "@/components/app/feedback";
import { Field } from "@/components/app/field";
import { Button } from "@/components/ui/button";
import { useCooldown } from "@/features/auth/use-cooldown";
import { AuthFooter, AuthHeading } from "@/features/auth-classic/auth-heading";
import { useAction } from "@/hooks/use-action";
import { authClient, checkAuth } from "@/lib/auth/client";
import { safeRedirect, searchParam } from "@/lib/auth/redirect";

const resendDelaySeconds = 30;

export function VerifyEmailPage() {
  const initialEmail = searchParam("email");
  const [email, setEmail] = useState(initialEmail);
  const action = useAction();
  // Sign-up has just sent a link, so wait before offering another one.
  const cooldown = useCooldown(searchParam("sent") ? resendDelaySeconds : 0);
  function submit(event: FormEvent) {
    event.preventDefault();
    void action
      .run(async () => {
        checkAuth(
          await authClient.sendVerificationEmail({
            email,
            callbackURL: `${window.location.origin}${safeRedirect(searchParam("redirect"))}`,
          }),
        );
      }, "If this email needs verification, a new link is on its way. Check your inbox and spam folder.")
      .then((sent) => {
        if (sent) cooldown.start(resendDelaySeconds);
      });
  }
  return (
    <section>
      <AuthHeading
        icon={MailCheck}
        title="Check your email"
        description={
          initialEmail ? (
            <>
              We sent a verification link to{" "}
              <strong className="font-medium break-all text-foreground">
                {initialEmail}
              </strong>
              . Open it to finish setting up your account.
            </>
          ) : (
            "Open the verification link to finish creating your account."
          )
        }
      />
      <div className="mb-6 rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
        Can&apos;t find it? Check your spam folder, or request a new link below.
      </div>
      <form className="grid gap-4" onSubmit={submit}>
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Feedback error={action.error} message={action.message} />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={action.pending || cooldown.remaining > 0}
        >
          {action.pending
            ? "Sending…"
            : cooldown.remaining > 0
              ? `Resend available in ${cooldown.remaining}s`
              : "Resend verification email"}
        </Button>
      </form>
      <AuthFooter>
        <p>
          Already verified? <a href="/login">Back to sign in</a>
        </p>
      </AuthFooter>
    </section>
  );
}
