import { SUPER_ADMIN_ROLE, parseRoles } from "@repo/contracts";
import { createMiddleware } from "hono/factory";
import { permissionsFor } from "../../auth/access-control";
import { AppError } from "../../lib/errors";
import { sessionRole } from "../../middleware/auth.middleware";
import type { AppEnv } from "../../types/context";
import { permissionsForRoleNames } from "./access.queries";

// Runs before Better Auth's set-role and create-user. Better Auth checks that
// the actor may assign roles at all; this stops two escalations it allows.
export const roleAssignmentGuard = createMiddleware<AppEnv>(async (c, next) => {
  if (c.req.method !== "POST") return next();
  const body = (await c.req.raw
    .clone()
    .json()
    .catch(() => null)) as {
    userId?: unknown;
    role?: unknown;
    data?: { role?: unknown };
  } | null;
  const session = c.get("session");
  if (c.req.path.endsWith("/set-role") && body?.userId === session.user.id) {
    throw new AppError("FORBIDDEN", "You cannot change your own roles", 403);
  }
  const role = body?.data?.role ?? body?.role;
  const requested = Array.isArray(role)
    ? role.flatMap(parseRoles)
    : parseRoles(role);
  const actorRole = sessionRole(session);
  const superAdmin = parseRoles(actorRole).includes(SUPER_ADMIN_ROLE);
  if (requested.includes(SUPER_ADMIN_ROLE) && !superAdmin) {
    throw new AppError(
      "FORBIDDEN",
      "Only an admin can grant the admin role",
      403,
    );
  }
  if (!superAdmin && requested.length) {
    const [actorPermissions, requestedPermissions] = await Promise.all([
      permissionsFor(c.env, actorRole),
      permissionsForRoleNames(c.env.DB, requested),
    ]);
    if (
      [...requestedPermissions].some(
        (permission) =>
          !actorPermissions.some((granted) => granted === permission),
      )
    ) {
      throw new AppError(
        "FORBIDDEN",
        "You cannot assign a role with permissions you do not have",
        403,
      );
    }
  }
  await next();
});
