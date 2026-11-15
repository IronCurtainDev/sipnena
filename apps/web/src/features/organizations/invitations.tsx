import { useQuery } from "@tanstack/react-query";
import { Mail, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Feedback } from "@/components/app/feedback";
import { Field, SelectField } from "@/components/app/field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAction } from "@/hooks/use-action";
import { queryClient } from "@/lib/api/query-client";
import { authClient, checkAuth } from "@/lib/auth/client";
import { formatDate } from "@/lib/format";

export function Invitations({ organizationId }: { organizationId: string }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"member" | "admin">("member");
  const { data: session } = authClient.useSession();
  const action = useAction();
  const invitations = useQuery({
    queryKey: ["invitations", organizationId, session?.user.id],
    enabled: !!session,
    queryFn: async () =>
      checkAuth(
        await authClient.organization.listInvitations({
          query: { organizationId },
        }),
      ).data,
  });
  const refresh = () =>
    queryClient.invalidateQueries({
      queryKey: ["invitations", organizationId],
    });
  function submit(event: FormEvent) {
    event.preventDefault();
    void action.run(async () => {
      checkAuth(
        await authClient.organization.inviteMember({
          organizationId,
          email,
          role,
        }),
      );
      setEmail("");
      await refresh();
    }, "Invitation sent.");
  }
  function cancel(invitationId: string) {
    void action.run(async () => {
      checkAuth(
        await authClient.organization.cancelInvitation({ invitationId }),
      );
      await refresh();
    }, "Invitation canceled.");
  }
  const pending =
    invitations.data?.filter((invite) => invite.status === "pending") ?? [];
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Invite a member</h2>
        </CardTitle>
        <CardDescription>
          We will email them a link to join this organization.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-5">
        <form
          className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_9rem_auto] sm:items-end"
          onSubmit={submit}
        >
          <Field
            label="Member email"
            type="email"
            placeholder="teammate@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <SelectField
            label="Invitation role"
            value={role}
            onChange={(event) =>
              setRole(event.target.value as "member" | "admin")
            }
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </SelectField>
          <Button type="submit" className="h-9" disabled={action.pending}>
            {action.pending ? "Sending…" : "Send invitation"}
          </Button>
        </form>
        <Feedback
          error={action.error || invitations.error}
          message={action.message}
        />
        <div className="grid grid-cols-1 gap-2">
          <h3 className="text-sm font-medium">Pending invitations</h3>
          {invitations.isPending ? (
            <p role="status" className="text-sm text-muted-foreground">
              Loading invitations…
            </p>
          ) : !pending.length ? (
            !invitations.error && (
              <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
                No pending invitations.
              </p>
            )
          ) : (
            <ul className="divide-y rounded-lg border">
              {pending.map((invite) => {
                const expired = new Date(invite.expiresAt) < new Date();
                return (
                  <li key={invite.id} className="flex items-center gap-3 p-3">
                    <Mail className="size-4 shrink-0 text-muted-foreground" />
                    <div className="grid min-w-0 flex-1 gap-0.5">
                      <p className="truncate text-sm font-medium">
                        {invite.email}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {invite.role} · expires {formatDate(invite.expiresAt)}
                      </p>
                    </div>
                    <Badge variant={expired ? "destructive" : "secondary"}>
                      {expired ? "Expired" : "Pending"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Cancel invitation for ${invite.email}`}
                      disabled={action.pending}
                      onClick={() => cancel(invite.id)}
                    >
                      <X />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
