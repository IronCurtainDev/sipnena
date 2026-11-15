import {
  DEFAULT_ROLE,
  PERMISSION_NAMES,
  SUPER_ADMIN_ROLE,
  parseRoles,
  type Permission,
} from "@repo/contracts";
import {
  createAccessControl,
  role as accessRole,
  type Role,
} from "better-auth/plugins/access";
import {
  listRoles,
  permissionsForRoleNames,
} from "../modules/access/access.queries";
import type { Bindings } from "../types/bindings";

// "user:ban" becomes Better Auth's statement shape { user: ["ban"] }.
function toStatements(permissions: readonly string[]) {
  const statements: Record<string, string[]> = {};
  for (const permission of permissions) {
    const [resource, action] = permission.split(":");
    if (resource && action) {
      // Better Auth protects both endpoints with user:ban. Application
      // middleware applies the narrower user:ban/user:unban permissions.
      const authAction = permission === "user:unban" ? "ban" : action;
      const actions = (statements[resource] ??= []);
      if (!actions.includes(authAction)) actions.push(authAction);
    }
  }
  return statements;
}

export const ac = createAccessControl(toStatements(PERMISSION_NAMES));
const superRole = accessRole(toStatements(PERMISSION_NAMES));

type AuthRoles = Record<string, Role>;
const registries = new WeakMap<Bindings, AuthRoles>();

// Better Auth's admin plugin reads this object on every permission check, so
// syncAuthRoles can replace its contents with the roles stored in D1.
export function authRolesFor(env: Bindings): AuthRoles {
  let roles = registries.get(env);
  if (!roles) {
    roles = {
      [SUPER_ADMIN_ROLE]: superRole,
      [DEFAULT_ROLE]: accessRole({}),
    };
    registries.set(env, roles);
  }
  return roles;
}

export async function syncAuthRoles(env: Bindings) {
  const stored = await listRoles(env.DB);
  const roles = authRolesFor(env);
  const names = new Set(stored.map((role) => role.name));
  for (const name of Object.keys(roles)) {
    if (name !== SUPER_ADMIN_ROLE && !names.has(name)) delete roles[name];
  }
  for (const role of stored) {
    if (role.name === SUPER_ADMIN_ROLE) continue;
    roles[role.name] = accessRole(toStatements(role.permissions));
  }
}

export async function permissionsFor(
  env: Bindings,
  roleValue: unknown,
): Promise<Permission[]> {
  const names = parseRoles(roleValue);
  if (!names.length) names.push(DEFAULT_ROLE);
  if (names.includes(SUPER_ADMIN_ROLE)) return [...PERMISSION_NAMES];
  const granted = await permissionsForRoleNames(env.DB, names);
  return PERMISSION_NAMES.filter((permission) => granted.has(permission));
}
