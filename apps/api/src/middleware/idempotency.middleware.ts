import type { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { getAuth } from "../auth/auth";
import { AppError } from "../lib/errors";
import {
  claimIdempotencyKey,
  completeIdempotencyKey,
  fingerprintRequest,
  MAX_STORED_BODY_BYTES,
  releaseIdempotencyKey,
  type IdempotencyRow,
} from "../lib/idempotency";
import type { AppEnv, Session } from "../types/context";

const IDEMPOTENCY_KEY_REGEX = /^[A-Za-z0-9_-]{1,128}$/;
const MUTATION_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export const idempotencyMiddleware = createMiddleware<AppEnv>(
  async (c, next) => {
    if (!MUTATION_METHODS.has(c.req.method)) return next();
    const rawKey = c.req.header("idempotency-key")?.trim();
    if (!rawKey) return next();
    if (!IDEMPOTENCY_KEY_REGEX.test(rawKey)) {
      throw new AppError(
        "INVALID_IDEMPOTENCY_KEY",
        "Idempotency-Key must be 1-128 characters (alphanumeric, dashes, underscores)",
        400,
      );
    }

    const userId = await signedInUserId(c);
    if (!userId) return next();

    const body = await c.req.raw.clone().arrayBuffer();
    const requestHash = await fingerprintRequest(
      c.req.method,
      c.req.path,
      body,
    );
    const claimInput = {
      key: rawKey,
      userId,
      route: `${c.req.method} ${c.req.path}`,
      requestHash,
    };
    const claim = await claimIdempotencyKey(c.env.DB, claimInput);
    if (claim.action === "replay") return replayResponse(claim.row, rawKey);
    if (claim.action === "conflict") {
      throw new AppError(
        "IDEMPOTENCY_CONFLICT",
        "A request with this idempotency key is currently being processed or was already used for a different request",
        409,
      );
    }

    try {
      await next();
    } catch (error) {
      await releaseIdempotencyKey(c.env.DB, claimInput);
      throw error;
    }

    if (c.res.status >= 500) {
      await releaseIdempotencyKey(c.env.DB, claimInput);
      return;
    }

    const responseBody = await c.res
      .clone()
      .text()
      .catch(() => "");
    if (
      new TextEncoder().encode(responseBody).byteLength > MAX_STORED_BODY_BYTES
    ) {
      await releaseIdempotencyKey(c.env.DB, claimInput);
      return;
    }

    const contentType = c.res.headers.get("content-type");
    await completeIdempotencyKey(c.env.DB, {
      ...claimInput,
      statusCode: c.res.status,
      responseHeaders: JSON.stringify(
        contentType ? { "content-type": contentType } : {},
      ),
      responseBody,
    });
    c.header("X-Idempotency-Key", rawKey);
  },
);

async function signedInUserId(c: Context<AppEnv>) {
  const current = c.get("session") as Session | undefined;
  if (current?.user.id) return current.user.id;
  const headers = new Headers(c.req.raw.headers);
  if (headers.has("authorization")) headers.delete("cookie");
  const session = await getAuth(c.env).api.getSession({ headers });
  if (!session?.user.id) return null;
  c.set("session", session);
  return session.user.id;
}

function replayResponse(row: IdempotencyRow, key: string) {
  const headers = new Headers();
  const contentType = storedContentType(row.response_headers);
  if (contentType) headers.set("content-type", contentType);
  headers.set("Cache-Control", "no-store");
  headers.set("Idempotent-Replay", "true");
  headers.set("X-Idempotency-Key", key);
  const empty = row.status_code === 204 || row.status_code === 205;
  return new Response(empty ? null : row.response_body, {
    status: row.status_code ?? 200,
    headers,
  });
}

function storedContentType(value: string | null) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as { "content-type"?: unknown };
    return typeof parsed["content-type"] === "string"
      ? parsed["content-type"]
      : null;
  } catch {
    return null;
  }
}
