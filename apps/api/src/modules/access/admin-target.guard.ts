import { SUPER_ADMIN_ROLE, parseRoles } from "@repo/contracts";
import { createMiddleware } from "hono/factory";
import { AppError } from "../../lib/errors";
import { logEvent } from "../../lib/log";
import { sessionRole } from "../../middleware/auth.middleware";
import type { AppEnv } from "../../types/context";

const TARGETED_ACTIONS = new Set([
  "ban-user",
  "impersonate-user",
  "remove-user",
  "revoke-user-session",
  "revoke-user-sessions",
  "set-role",
  "set-user-password",
  "unban-user",
  "update-user",
]);

const SELF_FORBIDDEN = new Set([
  "ban-user",
  "impersonate-user",
  "remove-user",
  "set-role",
  "set-user-password",
  "update-user",
]);

type AdminBody = {
  userId?: unknown;
  sessionToken?: unknown;
  role?: unknown;
  data?: { role?: unknown; banned?: unknown };
};

const SUPER_ADMIN_LOCK = "access-removal";
const SUPER_ADMIN_LOCK_MS = 5 * 60 * 1000;

async function acquireSuperAdminLock(database: D1Database) {
  const ownerId = crypto.randomUUID();
  const now = Date.now();
  await database
    .prepare(
      "DELETE FROM super_admin_mutation_lock WHERE name = ? AND expires_at <= ?",
    )
    .bind(SUPER_ADMIN_LOCK, now)
    .run();
  const result = await database
    .prepare(
      "INSERT OR IGNORE INTO super_admin_mutation_lock (name, owner_id, expires_at) VALUES (?, ?, ?)",
    )
    .bind(SUPER_ADMIN_LOCK, ownerId, now + SUPER_ADMIN_LOCK_MS)
    .run();
  if (result.meta.changes !== 1) {
    throw new AppError(
      "ROLE_PROTECTED",
      "Another super-admin security change is in progress; retry shortly",
      409,
    );
  }
  return ownerId;
}

async function releaseSuperAdminLock(database: D1Database, ownerId: string) {
  await database
    .prepare(
      "DELETE FROM super_admin_mutation_lock WHERE name = ? AND owner_id = ?",
    )
    .bind(SUPER_ADMIN_LOCK, ownerId)
    .run();
}

async function targetUserId(
  database: D1Database,
  action: string,
  body: AdminBody,
) {
  if (typeof body.userId === "string") return body.userId;
  if (
    action === "revoke-user-session" &&
    typeof body.sessionToken === "string"
  ) {
    const row = await database
      .prepare("SELECT user_id AS userId FROM session WHERE token = ?")
      .bind(body.sessionToken)
      .first<{ userId: string }>();
    return row?.userId;
  }
  return undefined;
}

async function activeSuperAdminCount(database: D1Database) {
  const row = await database
    .prepare(
      `SELECT COUNT(*) AS count FROM user
       WHERE COALESCE(banned, 0) = 0
         AND instr(',' || replace(COALESCE(role, ''), ' ', '') || ',', ',admin,') > 0`,
    )
    .first<{ count: number }>();
  return row?.count ?? 0;
}

// Better Auth authorizes the action. This guard adds target-side rules that
// its generic permission model cannot express.
export const adminTargetGuard = createMiddleware<AppEnv>(async (c, next) => {
  if (c.req.method !== "POST") return next();
  const action = c.req.path.split("/").at(-1) ?? "";
  if (!TARGETED_ACTIONS.has(action)) return next();

  const body = (await c.req.raw
    .clone()
    .json()
    .catch(() => null)) as AdminBody | null;
  if (!body) return next();
  const targetId = await targetUserId(c.env.DB, action, body);
  if (!targetId) return next();

  const actorId = c.get("session").user.id;
  if (targetId === actorId && SELF_FORBIDDEN.has(action)) {
    throw new AppError(
      "FORBIDDEN",
      "Use the account settings flow for your own account",
      403,
    );
  }

  const target = await c.env.DB.prepare(
    "SELECT role, banned FROM user WHERE id = ?",
  )
    .bind(targetId)
    .first<{ role: string | null; banned: number | null }>();
  if (!target || !parseRoles(target.role).includes(SUPER_ADMIN_ROLE)) {
    return next();
  }
  if (!parseRoles(sessionRole(c.get("session"))).includes(SUPER_ADMIN_ROLE)) {
    throw new AppError(
      "FORBIDDEN",
      "Only a super-admin can change another super-admin account",
      403,
    );
  }

  const updatedRole =
    action === "update-user" && body.data && "role" in body.data
      ? body.data.role
      : undefined;
  const removesAccess =
    action === "ban-user" ||
    action === "remove-user" ||
    (action === "set-role" &&
      !parseRoles(body.role).includes(SUPER_ADMIN_ROLE)) ||
    (updatedRole !== undefined &&
      !parseRoles(updatedRole).includes(SUPER_ADMIN_ROLE)) ||
    body.data?.banned === true;
  if (!removesAccess || target.banned) return next();

  const lockOwner = await acquireSuperAdminLock(c.env.DB);
  try {
    if ((await activeSuperAdminCount(c.env.DB)) <= 1) {
      throw new AppError(
        "ROLE_PROTECTED",
        "The last active super-admin cannot be disabled",
        409,
      );
    }
    await next();
  } finally {
    await releaseSuperAdminLock(c.env.DB, lockOwner).catch(() => {
      logEvent("error", "super_admin_lock_release_failed", {
        requestId: c.get("requestId"),
      });
    });
  }
});
