import {
  SUPER_ADMIN_ROLE,
  isPermission,
  type Permission,
} from "@repo/contracts";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth/client";
import { getMyAccess, listRoles } from "./api";

// Any of these opens the admin dashboard.
export const adminAreaPermissions: Permission[] = [
  "user:list",
  "file:list-any",
  "role:list",
];

// Hides controls the user cannot use; the API still enforces every permission.
export function useAccess() {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  const access = useQuery({
    queryKey: ["access", "me", userId],
    queryFn: getMyAccess,
    enabled: Boolean(userId),
    staleTime: 60_000,
  });
  const permissions = (access.data?.permissions ?? []).filter(isPermission);
  const granted = new Set(permissions);
  return {
    pending: access.isPending,
    error: access.error,
    roles: access.data?.roles ?? [],
    permissions,
    isSuperAdmin: access.data?.roles.includes(SUPER_ADMIN_ROLE) ?? false,
    can: (permission: Permission) => granted.has(permission),
    canAny: (...permissions: Permission[]) =>
      permissions.some((permission) => granted.has(permission)),
  };
}

export type Access = ReturnType<typeof useAccess>;

export function useRoles(enabled = true) {
  return useQuery({
    queryKey: ["access", "roles"],
    queryFn: listRoles,
    enabled,
  });
}
