// Permissions are checked in code, so they are defined here; which role has
// which permission is stored in the database. Append new entries freely, but
// never rename one that has shipped: roles in deployed databases refer to it.
//
// SINGLE RESPONSIBILITY RULE FOR PERMISSIONS:
// Each permission assigned to a role must do only one discrete, atomic action
// (`resource:action`, e.g. `user:create`, `file:delete-any`). Never bundle multiple
// actions into compound permissions (avoid `manage` or `crud`). Keep reads,
// mutations, and sensitive state changes strictly isolated.
//
// `user:*` and `session:*` match Better Auth's admin plugin statements.
export const PERMISSIONS = {
  "user:list": { group: "Users", label: "View the user list" },
  "user:get": { group: "Users", label: "View user details" },
  "user:create": { group: "Users", label: "Create users" },
  "user:update": { group: "Users", label: "Edit user profiles" },
  "user:set-email": { group: "Users", label: "Change user emails" },
  "user:set-password": { group: "Users", label: "Set user passwords" },
  "user:set-role": { group: "Users", label: "Assign roles to users" },
  "user:ban": { group: "Users", label: "Ban users" },
  "user:unban": { group: "Users", label: "Unban users" },
  "user:impersonate": { group: "Users", label: "Sign in as another user" },
  "user:delete": { group: "Users", label: "Delete users" },
  "session:list": { group: "Sessions", label: "View user sessions" },
  "session:revoke": { group: "Sessions", label: "Sign users out" },
  "session:delete": { group: "Sessions", label: "Delete user sessions" },
  "file:list-any": { group: "Files", label: "View every user's files" },
  "file:download-any": { group: "Files", label: "Download any file" },
  "file:delete-any": { group: "Files", label: "Delete any file" },
  "role:list": { group: "Roles", label: "View roles and permissions" },
  "role:create": { group: "Roles", label: "Create roles" },
  "role:update": { group: "Roles", label: "Edit roles" },
  "role:delete": { group: "Roles", label: "Delete roles" },
  "api-docs:view": {
    group: "Developer",
    label: "Open API docs and developer tools",
  },
} as const satisfies Record<string, { group: string; label: string }>;

export type Permission = keyof typeof PERMISSIONS;

export const PERMISSION_NAMES = Object.keys(PERMISSIONS) as [
  Permission,
  ...Permission[],
];

// Holds every permission, including ones added after a database was seeded.
export const SUPER_ADMIN_ROLE = "admin";
export const DEFAULT_ROLE = "user";

export function isPermission(value: string): value is Permission {
  return Object.hasOwn(PERMISSIONS, value);
}

// Better Auth stores several roles on a user as a comma-separated string.
export function parseRoles(value: unknown): string[] {
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);
}
