import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Feedback } from "@/components/app/feedback";
import { Field } from "@/components/app/field";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useAppConfig } from "@/lib/api/config";
import { queryClient } from "@/lib/api/query-client";
import { authClient, checkAuth } from "@/lib/auth/client";
import { safeRedirect, searchParam } from "@/lib/auth/redirect";
import { PasswordField } from "@/features/auth/password-field";
import { AuthFooter } from "./auth-heading";
import { AuthDivider, GoogleButton } from "./google-button";

export function AuthForm({ signup = false }: { signup?: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const action = useAction();
  const config = useAppConfig();
  const destination = safeRedirect(searchParam("redirect"));
  const callbackURL = `${window.location.origin}${destination}`;
  const redirectQuery = `redirect=${encodeURIComponent(destination)}`;
  const verifyHref = (sent: boolean) =>
    `/verify-email?email=${encodeURIComponent(email)}&${redirectQuery}${sent ? "&sent=1" : ""}`;

  function submit(event: FormEvent) {
    event.preventDefault();
    void action.run(async () => {
      if (signup) {
        if (!name.trim()) throw new Error("Please enter your name.");
        checkAuth(
          await authClient.signUp.email({
            email,
            password,
            name: name.trim(),
            callbackURL,
          }),
        );
        window.location.assign(verifyHref(true));
      } else {
        checkAuth(
          await authClient.signIn.email({ email, password, callbackURL }),
        );
        queryClient.clear();
        window.location.assign(destination);
      }
    });
  }

  function continueWithGoogle() {
    void action.run(async () => {
      checkAuth(
        await authClient.signIn.social({
          provider: "google",
          callbackURL,
          errorCallbackURL: `${window.location.origin}/login`,
        }),
      );
    });
  }

  return (
    <>
      {config.data?.googleEnabled && (
        <>
          <GoogleButton
            disabled={action.pending}
            onClick={continueWithGoogle}
          />
          <AuthDivider>or continue with email</AuthDivider>
        </>
      )}
      <form onSubmit={submit} className="grid gap-4">
        {signup && (
          <Field
            label="Name"
            name="name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={100}
            required
          />
        )}
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <PasswordField
          name="password"
          autoComplete={signup ? "new-password" : "current-password"}
          minLength={8}
          maxLength={128}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          description={signup ? "Use at least 8 characters." : undefined}
          labelAction={
            signup ? undefined : (
              <Link
                to="/forgot-password"
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Forgot password?
              </Link>
            )
          }
        />
        <Feedback
          error={
            action.error ||
            (searchParam("error")
              ? "The sign-in link could not be used. Please try again."
              : "")
          }
        />
        <Button
          type="submit"
          size="lg"
          className="mt-1 w-full"
          disabled={action.pending}
        >
          {action.pending
            ? "Please wait…"
            : signup
              ? "Create account"
              : "Sign in"}
        </Button>
      </form>
      <Feedback error={config.error} className="mt-4" />
      <AuthFooter>
        <p>
          {signup ? "Already have an account?" : "New here?"}{" "}
          <Link
            to={signup ? "/login" : "/signup"}
            search={destination !== "/" ? { redirect: destination } : undefined}
          >
            {signup ? "Sign in" : "Create an account"}
          </Link>
        </p>
        {!signup && (
          <p>
            Need a new verification link?{" "}
            <Link
              to="/verify-email"
              search={email ? { email, redirect: destination } : undefined}
            >
              Verify email
            </Link>
          </p>
        )}
      </AuthFooter>
    </>
  );
}
