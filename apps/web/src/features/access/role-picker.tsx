import { SUPER_ADMIN_ROLE, isPermission } from "@repo/contracts";
import { Feedback } from "@/components/app/feedback";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccess, useRoles } from "./use-access";

// Only an admin may grant the admin role; the API enforces the same rule.
export function RolePicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const roles = useRoles();
  const { isSuperAdmin, permissions } = useAccess();
  if (roles.isPending) return <Skeleton className="h-24 w-full rounded-lg" />;
  if (roles.isError) return <Feedback error={roles.error} />;
  const toggle = (name: string, checked: boolean) =>
    onChange(
      roles.data
        .map((role) => role.name)
        .filter((role) => (role === name ? checked : value.includes(role))),
    );
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-2 text-sm font-medium">Roles</legend>
      {roles.data.map((role) => {
        const canGrant =
          isSuperAdmin ||
          role.permissions
            .filter(isPermission)
            .every((permission) => permissions.includes(permission));
        return (
          <label
            key={role.id}
            className="flex items-start gap-2.5 rounded-lg border p-3 text-sm has-data-checked:border-primary/40 has-data-checked:bg-muted/50"
          >
            <Checkbox
              className="mt-0.5"
              checked={value.includes(role.name)}
              disabled={
                !canGrant || (role.name === SUPER_ADMIN_ROLE && !isSuperAdmin)
              }
              onCheckedChange={(checked) => toggle(role.name, checked === true)}
            />
            <span className="grid gap-0.5">
              <span className="font-medium">{role.name}</span>
              {role.description && (
                <span className="text-xs text-muted-foreground">
                  {role.description}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
