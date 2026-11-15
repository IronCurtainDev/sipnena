import { UserMinus } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { Feedback } from "@/components/app/feedback";
import { NativeSelect } from "@/components/app/field";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { queryClient } from "@/lib/api/query-client";
import { authClient, checkAuth } from "@/lib/auth/client";
import { hasRole } from "@/lib/auth/roles";
import type { useMembers } from "./queries";

export type Member = NonNullable<
  ReturnType<typeof useMembers>["data"]
>["members"][number];

export function MemberActions({
  member,
  currentRole,
}: {
  member: Member;
  currentRole: string;
}) {
  const [role, setRole] = useState(member.role);
  const action = useAction();
  const { data: session } = authClient.useSession();
  const isOwner = hasRole(currentRole, "owner");
  const canManage = hasRole(currentRole, "owner", "admin");
  if (!canManage || (!isOwner && hasRole(member.role, "owner"))) return null;

  async function refresh() {
    await Promise.all(
      ["members", "organization-role", "organization"].map((key) =>
        queryClient.invalidateQueries({
          queryKey: [key, member.organizationId],
        }),
      ),
    );
  }

  return (
    <div className="grid justify-items-end gap-2">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <NativeSelect
          aria-label={`Role for ${member.user.email}`}
          value={role}
          disabled={action.pending}
          onChange={(event) => setRole(event.target.value as Member["role"])}
          className="w-28 [&>select]:h-8"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
          {isOwner && <option value="owner">Owner</option>}
        </NativeSelect>
        {role !== member.role && (
          <Button
            variant="outline"
            disabled={action.pending}
            aria-label={`Save role for ${member.user.email}`}
            onClick={() =>
              void action.run(async () => {
                checkAuth(
                  await authClient.organization.updateMemberRole({
                    memberId: member.id,
                    organizationId: member.organizationId,
                    role,
                  }),
                );
                await refresh();
              }, "Role updated.")
            }
          >
            Save
          </Button>
        )}
        {session?.user.id !== member.userId && (
          <ConfirmDialog
            title="Remove member?"
            description={`${member.user.name} will lose access to this organization.`}
            confirmLabel="Remove member"
            pendingLabel="Removing…"
            destructive
            pending={action.pending}
            error={action.error}
            onConfirm={() =>
              action.run(async () => {
                checkAuth(
                  await authClient.organization.removeMember({
                    memberIdOrEmail: member.id,
                    organizationId: member.organizationId,
                  }),
                );
                await refresh();
              })
            }
            trigger={
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Remove ${member.user.email}`}
                disabled={action.pending}
                className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <UserMinus />
              </Button>
            }
          />
        )}
      </div>
      <Feedback error={action.error} message={action.message} />
    </div>
  );
}
