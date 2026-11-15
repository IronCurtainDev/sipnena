import {
  PERMISSIONS,
  SUPER_ADMIN_ROLE,
  isPermission,
  type Role,
} from "@repo/contracts";
import { Pencil, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { EmptyState } from "@/components/app/empty-state";
import { Feedback } from "@/components/app/feedback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRowAction } from "@/features/admin/use-row-action";
import { deleteRole } from "./api";
import { RoleDialog } from "./role-dialog";
import { useAccess, useRoles } from "./use-access";

function PermissionSummary({ role }: { role: Role }) {
  if (role.name === SUPER_ADMIN_ROLE) return <Badge>All permissions</Badge>;
  const labels = role.permissions
    .filter(isPermission)
    .map((name) => PERMISSIONS[name].label);
  if (!labels.length)
    return (
      <span className="text-sm text-muted-foreground">No permissions</span>
    );
  return (
    <div className="flex flex-wrap gap-1.5">
      {labels.slice(0, 4).map((label) => (
        <Badge key={label} variant="secondary">
          {label}
        </Badge>
      ))}
      {labels.length > 4 && (
        <Badge variant="outline">+{labels.length - 4} more</Badge>
      )}
    </div>
  );
}

export function RolesManagement() {
  const roles = useRoles();
  const { can, permissions } = useAccess();
  const action = useRowAction();
  const canCreate = can("role:create");
  const canUpdate = can("role:update");
  const canDelete = can("role:delete");
  const [notice, setNotice] = useState("");
  return (
    <section className="grid grid-cols-1 gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-0.5">
          <h2 className="text-base font-semibold">Roles</h2>
          <p className="text-sm text-muted-foreground">
            Group permissions into roles, then assign roles to users.
          </p>
        </div>
        {canCreate && (
          <RoleDialog
            onSaved={setNotice}
            allowedPermissions={permissions}
            trigger={
              <Button>
                <Plus />
                New role
              </Button>
            }
          />
        )}
      </div>
      <Feedback error={action.error} message={notice || action.message} />
      {roles.isPending ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : roles.isError ? (
        <Feedback error={roles.error} />
      ) : !roles.data.length ? (
        <EmptyState icon={ShieldCheck} title="No roles yet." />
      ) : (
        <ul className="divide-y rounded-xl bg-card ring-1 ring-foreground/10">
          {roles.data.map((role) => (
            <li
              key={role.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="grid min-w-0 gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{role.name}</h3>
                  {role.system && <Badge variant="outline">System</Badge>}
                </div>
                {role.description && (
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                )}
                <PermissionSummary role={role} />
              </div>
              {(canUpdate || canDelete) && (
                <div className="flex shrink-0 gap-1">
                  {canUpdate && (
                    <RoleDialog
                      role={role}
                      onSaved={setNotice}
                      allowedPermissions={permissions}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Edit ${role.name}`}
                        >
                          <Pencil />
                        </Button>
                      }
                    />
                  )}
                  {canDelete && !role.system && (
                    <ConfirmDialog
                      title={`Delete the ${role.name} role?`}
                      description="Users must have this role removed first. This cannot be undone."
                      confirmLabel="Delete role"
                      pendingLabel="Deleting…"
                      destructive
                      pending={action.busy(`delete:${role.id}`)}
                      error={action.error}
                      onConfirm={() => {
                        setNotice("");
                        return action.run(
                          `delete:${role.id}`,
                          () => deleteRole(role.id),
                          `Role “${role.name}” deleted.`,
                        );
                      }}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${role.name}`}
                        >
                          <Trash2 />
                        </Button>
                      }
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
