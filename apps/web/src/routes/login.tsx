import { AuthForm } from "@/features/auth/auth-form";
import { AuthHeading } from "@/features/auth/auth-heading";

export function LoginPage() {
  return (
    <section>
      <AuthHeading
        title="Welcome back"
        description="Sign in to your account to continue."
      />
      <AuthForm />
    </section>
  );
}

export function SignupPage() {
  return (
    <section>
      <AuthHeading
        title="Create your account"
        description="Start with your own account. Invite a team when you need one."
      />
      <AuthForm signup />
    </section>
  );
}
