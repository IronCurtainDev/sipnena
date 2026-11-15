import { createMiddleware } from "hono/factory";
import { createDb } from "../../db/client";
import { adminAudit } from "../../db/schema/audit";
import { describeError, logEvent } from "../../lib/log";
import { currentRequestId } from "../../lib/request-context";
import type { Bindings } from "../../types/bindings";
import type { AppEnv } from "../../types/context";

type AdminAction = {
  actorUserId: string;
  action: string;
  targetType: "user" | "file" | "role";
  targetId: string | null;
};

// Better Auth admin endpoints that change another account.
const auditedAuthActions = new Set([
  "create-user",
  "update-user",
  "set-role",
  "set-user-password",
  "ban-user",
  "unban-user",
  "remove-user",
  "impersonate-user",
  "revoke-user-session",
  "revoke-user-sessions",
]);

// The action has already happened, so a failed audit write is logged rather
// than turned into an error response that would invite a duplicate retry.
export async function recordAdminAction(env: Bindings, entry: AdminAction) {
  const requestId = currentRequestId() ?? null;
  try {
    await createDb(env.DB)
      .insert(adminAudit)
      .values({
        id: crypto.randomUUID(),
        ...entry,
        requestId,
        createdAt: new Date().toISOString(),
      });
  } catch (error) {
    logEvent("error", "admin_audit_failed", {
      requestId,
      action: entry.action,
      ...describeError(error),
    });
  }
}

export const adminAuthAudit = createMiddleware<AppEnv>(async (c, next) => {
  const action = c.req.path.split("/").at(-1) ?? "";
  if (c.req.method !== "POST" || !auditedAuthActions.has(action)) return next();
  const body = (await c.req.raw
    .clone()
    .json()
    .catch(() => null)) as { userId?: unknown } | null;
  const actorUserId = c.get("session").user.id;
  await next();
  if (!c.res.ok) return;
  const created =
    action === "create-user"
      ? // Better Auth admin responses are buffered JSON, not streams, so
        // cloning c.res here is safe even though next() has already run.
        ((await c.res
          .clone()
          .json()
          .catch(() => null)) as { user?: { id?: unknown } } | null)
      : null;
  const targetId = created ? created.user?.id : body?.userId;
  await recordAdminAction(c.env, {
    actorUserId,
    action,
    targetType: "user",
    targetId: typeof targetId === "string" ? targetId : null,
  });
});
