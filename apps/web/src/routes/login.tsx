import { AuthForm } from "@/features/auth-classic/auth-form";
import { AuthHeading } from "@/features/auth-classic/auth-heading";
import { SipNenaLoginScreen } from "@/features/login/screen";

export function LoginPage() {
  return <SipNenaLoginScreen />;
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
