import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Building2, LogOut } from "lucide-react";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { EmptyState } from "@/components/app/empty-state";
import { Feedback } from "@/components/app/feedback";
import { PageHeader } from "@/components/app/page-header";
import { PagePending } from "@/components/layout/status-pages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Invitations } from "@/features/organizations/invitations";
import { Members } from "@/features/organizations/members";
import {
  useOrganization,
  useOrganizationRole,
} from "@/features/organizations/queries";
import { useAction } from "@/hooks/use-action";
import { queryClient } from "@/lib/api/query-client";
import { authClient, checkAuth } from "@/lib/auth/client";
import { hasRole } from "@/lib/auth/roles";

export function OrganizationPage() {
  const { organizationId } = useParams({
    from: "/app/organizations/$organizationId",
  });
  const organization = useOrganization(organizationId);
  const action = useAction();
  const role = useOrganizationRole(organizationId);
  if (organization.isPending) return <PagePending />;
  if (organization.error) return <Feedback error={organization.error} />;
  if (!organization.data)
    return (
      <EmptyState
        icon={Building2}
        title="Organization not found."
        action={
          <Button variant="outline" asChild>
            <Link to="/organizations">Back to your organizations</Link>
          </Button>
        }
      />
    );
  const { name, slug } = organization.data;
  const currentRole = role.data?.role ?? "member";
  const canInvite = hasRole(role.data?.role, "owner", "admin");
  return (
    <section className="max-w-4xl">
      <PageHeader
        back={
          <Link
            to="/organizations"
            className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground no-underline hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Your organizations
          </Link>
        }
        title={name}
        description={slug}
        actions={
          role.data && (
            <Badge variant="secondary" className="capitalize">
              Your role: {currentRole}
            </Badge>
          )
        }
      />
      <div className="grid grid-cols-1 gap-6">
        <Members
          key={organizationId}
          organizationId={organizationId}
          currentRole={currentRole}
        />
        <Feedback error={role.error} />
        {canInvite && <Invitations organizationId={organizationId} />}
        <Card className="ring-destructive/30">
          <CardHeader>
            <CardTitle>
              <h2>Leave organization</h2>
            </CardTitle>
            <CardDescription>
              You will lose access until someone invites you again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConfirmDialog
              title={`Leave ${name}?`}
              description="You will lose access to this organization until someone invites you again."
              confirmLabel="Leave organization"
              pendingLabel="Leaving…"
              destructive
              pending={action.pending}
              error={action.error}
              onConfirm={() =>
                action.run(async () => {
                  checkAuth(
                    await authClient.organization.leave({ organizationId }),
                  );
                  queryClient.clear();
                  window.location.assign("/organizations");
                })
              }
              trigger={
                <Button variant="destructive">
                  <LogOut />
                  Leave organization
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
