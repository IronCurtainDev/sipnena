import { parseRoles } from "@repo/contracts";

export function hasRole(role: unknown, ...names: string[]) {
  return parseRoles(role).some((value) => names.includes(value));
}
