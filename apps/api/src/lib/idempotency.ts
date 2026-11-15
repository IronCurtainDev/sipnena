const LEASE_MS = 60 * 1000;
const COMPLETED_TTL_MS = 24 * 60 * 60 * 1000;
export const MAX_STORED_BODY_BYTES = 64 * 1024;

export type IdempotencyRow = {
  status: "pending" | "completed";
  route: string;
  request_hash: string;
  status_code: number | null;
  response_headers: string | null;
  response_body: string | null;
  expires_at: number;
};

type ClaimInput = {
  key: string;
  userId: string;
  route: string;
  requestHash: string;
  now?: number;
};

export type IdempotencyClaim =
  | { action: "proceed" }
  | { action: "replay"; row: IdempotencyRow }
  | { action: "conflict" };

const SELECT_ROW = `SELECT status, route, request_hash, status_code, response_headers, response_body, expires_at
  FROM idempotency_keys WHERE key = ? AND user_id = ?`;

export async function fingerprintRequest(
  method: string,
  path: string,
  body: ArrayBuffer,
) {
  const prefix = new TextEncoder().encode(`${method}\n${path}\n`);
  const bytes = new Uint8Array(prefix.length + body.byteLength);
  bytes.set(prefix);
  bytes.set(new Uint8Array(body), prefix.length);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function claimIdempotencyKey(
  db: D1Database,
  input: ClaimInput,
): Promise<IdempotencyClaim> {
  const now = input.now ?? Date.now();
  if (await insertPending(db, input, now)) return { action: "proceed" };

  const existing = await readRow(db, input);
  if (!existing) {
    if (await insertPending(db, input, now)) return { action: "proceed" };
    const raced = await readRow(db, input);
    return raced ? resolveRow(db, input, raced, now) : { action: "conflict" };
  }
  return resolveRow(db, input, existing, now);
}

export async function completeIdempotencyKey(
  db: D1Database,
  input: ClaimInput & {
    statusCode: number;
    responseHeaders: string;
    responseBody: string;
  },
) {
  const now = input.now ?? Date.now();
  await db
    .prepare(
      `UPDATE idempotency_keys
       SET status = 'completed',
           status_code = ?,
           response_headers = ?,
           response_body = ?,
           expires_at = ?
       WHERE key = ? AND user_id = ? AND status = 'pending' AND request_hash = ?`,
    )
    .bind(
      input.statusCode,
      input.responseHeaders,
      input.responseBody,
      now + COMPLETED_TTL_MS,
      input.key,
      input.userId,
      input.requestHash,
    )
    .run();
}

export async function releaseIdempotencyKey(
  db: D1Database,
  input: Pick<ClaimInput, "key" | "userId" | "requestHash">,
) {
  await db
    .prepare(
      `DELETE FROM idempotency_keys
       WHERE key = ? AND user_id = ? AND status = 'pending' AND request_hash = ?`,
    )
    .bind(input.key, input.userId, input.requestHash)
    .run()
    .catch(() => undefined);
}

async function insertPending(db: D1Database, input: ClaimInput, now: number) {
  const result = await db
    .prepare(
      `INSERT INTO idempotency_keys
         (key, user_id, route, request_hash, status, created_at, expires_at)
       VALUES (?, ?, ?, ?, 'pending', ?, ?)
       ON CONFLICT(key, user_id) DO NOTHING`,
    )
    .bind(
      input.key,
      input.userId,
      input.route,
      input.requestHash,
      now,
      now + LEASE_MS,
    )
    .run();
  return (result.meta.changes ?? 0) > 0;
}

async function readRow(
  db: D1Database,
  input: Pick<ClaimInput, "key" | "userId">,
) {
  return db
    .prepare(SELECT_ROW)
    .bind(input.key, input.userId)
    .first<IdempotencyRow>();
}

async function resolveRow(
  db: D1Database,
  input: ClaimInput,
  row: IdempotencyRow,
  now: number,
): Promise<IdempotencyClaim> {
  const decision = decisionFor(row, input, now);
  if (decision !== "expired") return decision;

  const taken = await db
    .prepare(
      `UPDATE idempotency_keys
       SET route = ?,
           request_hash = ?,
           status = 'pending',
           status_code = NULL,
           response_headers = NULL,
           response_body = NULL,
           created_at = ?,
           expires_at = ?
       WHERE key = ? AND user_id = ? AND expires_at <= ?`,
    )
    .bind(
      input.route,
      input.requestHash,
      now,
      now + LEASE_MS,
      input.key,
      input.userId,
      now,
    )
    .run();
  if ((taken.meta.changes ?? 0) > 0) return { action: "proceed" };

  const again = await readRow(db, input);
  if (!again) return { action: "conflict" };
  const next = decisionFor(again, input, Date.now());
  return next === "expired" ? { action: "conflict" } : next;
}

function decisionFor(
  row: IdempotencyRow,
  input: ClaimInput,
  now: number,
): IdempotencyClaim | "expired" {
  if (row.expires_at <= now) return "expired";
  if (
    row.status === "completed" &&
    row.request_hash === input.requestHash &&
    row.route === input.route
  ) {
    return { action: "replay", row };
  }
  return { action: "conflict" };
}
