import {
  Ban,
  CircleCheck,
  KeyRound,
  MoreHorizontal,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Access } from "@/features/access/use-access";
import { removeAdminUser, setAdminBan, type AdminUser } from "./api";
import { SetPasswordDialog } from "./set-password-dialog";
import type { RowAction } from "./use-row-action";
import { UserRolesDialog } from "./user-roles-dialog";

export function UserRowActions({
  user,
  self,
  action,
  can,
  canManageTarget,
}: {
  user: AdminUser;
  self: boolean;
  action: RowAction;
  can: Access["can"];
  canManageTarget: boolean;
}) {
  const [dialog, setDialog] = useState<"roles" | "password" | "delete" | null>(
    null,
  );
  const busy = (kind: string) => action.busy(`${kind}:${user.id}`);
  const dialogProps = (name: NonNullable<typeof dialog>) => ({
    user,
    action,
    open: dialog === name,
    onOpenChange: (open: boolean) => setDialog(open ? name : null),
  });
  const canChangeRoles = can("user:set-role") && !self && canManageTarget;
  const canSetPassword = can("user:set-password") && !self && canManageTarget;
  const canChangeBan =
    can(user.banned ? "user:unban" : "user:ban") && !self && canManageTarget;
  const canDelete = can("user:delete") && !self && canManageTarget;
  if (!canChangeRoles && !canSetPassword && !canChangeBan && !canDelete)
    return null;
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Actions for ${user.email}`}
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="truncate">
            {user.email}
          </DropdownMenuLabel>
          {canChangeRoles && (
            <DropdownMenuItem onSelect={() => setDialog("roles")}>
              <ShieldCheck />
              Change roles…
            </DropdownMenuItem>
          )}
          {canSetPassword && (
            <DropdownMenuItem onSelect={() => setDialog("password")}>
              <KeyRound />
              Set password…
            </DropdownMenuItem>
          )}
          {canChangeBan && (
            <DropdownMenuItem
              disabled={busy("ban")}
              onSelect={() =>
                void action.run(
                  `ban:${user.id}`,
                  () => setAdminBan(user.id, !user.banned),
                  user.banned ? "User unbanned." : "User banned.",
                )
              }
            >
              {user.banned ? <CircleCheck /> : <Ban />}
              {user.banned ? "Unban user" : "Ban user"}
            </DropdownMenuItem>
          )}
          {canDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => setDialog("delete")}
              >
                <Trash2 />
                Delete user…
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <UserRolesDialog {...dialogProps("roles")} />
      <SetPasswordDialog {...dialogProps("password")} />
      <ConfirmDialog
        open={dialog === "delete"}
        onOpenChange={dialogProps("delete").onOpenChange}
        title="Delete this user?"
        description={`${user.email} and all of their files will be permanently deleted.`}
        confirmLabel="Delete user"
        pendingLabel="Deleting…"
        destructive
        pending={busy("delete")}
        error={action.error}
        onConfirm={() =>
          action.run(
            `delete:${user.id}`,
            () => removeAdminUser(user.id),
            "User deleted.",
          )
        }
      />
    </>
  );
}
