import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MailOpen } from "lucide-react";
import { Feedback } from "@/components/app/feedback";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { queryClient } from "@/lib/api/query-client";
import { authClient, checkAuth } from "@/lib/auth/client";

export function AcceptInvitationPage() {
  const { invitationId } = useParams({
    from: "/app/accept-invitation/$invitationId",
  });
  const action = useAction();
  const { data: session } = authClient.useSession();
  const invitation = useQuery({
    queryKey: ["invitation", invitationId, session?.user.id],
    enabled: !!session,
    queryFn: async () =>
      checkAuth(
        await authClient.organization.getInvitation({
          query: { id: invitationId },
        }),
      ).data,
    retry: false,
  });
  function accept() {
    void action.run(async () => {
      const result = checkAuth(
        await authClient.organization.acceptInvitation({ invitationId }),
      );
      queryClient.clear();
      window.location.assign(
        result.data
          ? `/organizations/${encodeURIComponent(result.data.member.organizationId)}`
          : "/organizations",
      );
    });
  }
  const data = invitation.data;
  return (
    <section className="mx-auto max-w-md py-6">
      <Card>
        <CardHeader className="justify-items-center text-center">
          <span className="mb-2 grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">
            <MailOpen className="size-6" />
          </span>
          <CardTitle>
            <h1 className="text-2xl font-semibold tracking-tight">
              Organization invitation
            </h1>
          </CardTitle>
          {data && (
            <CardDescription className="text-pretty">
              You have been invited to join{" "}
              <strong className="text-foreground">
                {data.organizationName}
              </strong>{" "}
              as {data.role}.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="grid gap-4 text-center">
          <Feedback error={invitation.error || action.error} />
          {invitation.isPending ? (
            <div
              role="status"
              aria-label="Loading invitation"
              className="grid gap-2"
            >
              <Skeleton className="mx-auto h-4 w-56" />
              <Skeleton className="h-9 w-full" />
            </div>
          ) : (
            data && (
              <>
                <p className="text-sm text-muted-foreground">
                  Invitation for {data.email}.
                </p>
                {data.status !== "pending" ? (
                  <p className="text-sm">
                    This invitation has already been handled.
                  </p>
                ) : (
                  <Button size="lg" disabled={action.pending} onClick={accept}>
                    {action.pending ? "Joining…" : "Accept invitation"}
                  </Button>
                )}
              </>
            )
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <a
            href="/organizations"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back to your organizations
          </a>
        </CardFooter>
      </Card>
    </section>
  );
}
