import { PageHeader } from "@/components/app/page-header";
import { DeleteAccount } from "@/features/account/delete-account";
import { ProfileCard } from "@/features/account/profile-card";
import { SecurityCard } from "@/features/account/security-card";
import { authClient } from "@/lib/auth/client";

export function AccountPage() {
  const { data, refetch } = authClient.useSession();
  if (!data) return null;
  return (
    <section className="max-w-3xl">
      <PageHeader
        title="Your account"
        description="Manage your profile, sign-in details, and account data."
      />
      <div className="grid grid-cols-1 gap-6">
        <ProfileCard
          key={data.user.id}
          name={data.user.name}
          email={data.user.email}
          verified={data.user.emailVerified}
          onSaved={() => void refetch()}
        />
        <SecurityCard email={data.user.email} />
        <DeleteAccount />
      </div>
    </section>
  );
}
