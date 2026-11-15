import { describeError, logEvent } from "./lib/log";
import type { Bindings } from "./types/bindings";

const PURGE_BATCH = 500;
const MAX_PURGE_BATCHES = 20;
const ORPHAN_SCAN_LIMIT = 500;
// D1 allows at most 100 bound parameters per statement.
const ORPHAN_LOOKUP_BATCH = 50;
// Uploads write R2 before D1; the grace period keeps in-flight uploads safe.
const ORPHAN_GRACE_MS = 60 * 60 * 1000;

async function requireHealthyDatabase(db: D1Database) {
  const result = await db
    .prepare("SELECT 1 AS healthy")
    .first<{ healthy: number }>();
  if (Number(result?.healthy) !== 1) {
    throw new Error("D1 maintenance health check failed");
  }
}

async function referencedObjectKeys(db: D1Database, keys: string[]) {
  const known = await db
    .prepare(
      `SELECT object_key FROM files WHERE object_key IN (${keys.map(() => "?").join(",")})`,
    )
    .bind(...keys)
    .all<{ object_key: string }>();
  return new Set(known.results.map((row) => row.object_key));
}

async function purgeExpired(
  db: D1Database,
  table: "session" | "verification",
  now: number,
) {
  let deleted = 0;
  for (let batch = 0; batch < MAX_PURGE_BATCHES; batch++) {
    const result = await db
      .prepare(
        `DELETE FROM ${table} WHERE id IN (SELECT id FROM ${table} WHERE expires_at < ? LIMIT ${PURGE_BATCH})`,
      )
      .bind(now)
      .run();
    deleted += result.meta.changes;
    if (result.meta.changes < PURGE_BATCH) break;
  }
  return deleted;
}

// Keys are users/{userId}/{fileId}. Starting each run at a random point samples
// the whole bucket over successive days without storing a scan cursor.
async function removeOrphanObjects(env: Bindings, now: number) {
  if (!env.FILES) return 0;
  // A failed or ambiguous D1 check must never be interpreted as "no row".
  // Throwing aborts the scheduled run and leaves every R2 object untouched.
  await requireHealthyDatabase(env.DB);
  const start = `users/${crypto.randomUUID()}`;
  const listing = await env.FILES.list({
    prefix: "users/",
    startAfter: start,
    limit: ORPHAN_SCAN_LIMIT,
  });
  let objects = listing.objects;
  if (!listing.truncated && objects.length < ORPHAN_SCAN_LIMIT) {
    const wrapped = await env.FILES.list({
      prefix: "users/",
      limit: ORPHAN_SCAN_LIMIT - objects.length,
    });
    objects = objects.concat(wrapped.objects.filter((o) => o.key <= start));
  }
  const candidates = objects
    .filter((object) => now - object.uploaded.getTime() > ORPHAN_GRACE_MS)
    .map((object) => object.key);
  let removed = 0;
  for (let start = 0; start < candidates.length; start += ORPHAN_LOOKUP_BATCH) {
    const keys = candidates.slice(start, start + ORPHAN_LOOKUP_BATCH);
    const referenced = await referencedObjectKeys(env.DB, keys);
    const possibleOrphans = keys.filter((key) => !referenced.has(key));
    if (!possibleOrphans.length) continue;

    // Recheck immediately before the non-transactional R2 deletion. This
    // protects a delayed metadata write that completes during the scan.
    const confirmed = await referencedObjectKeys(env.DB, possibleOrphans);
    const orphans = possibleOrphans.filter((key) => !confirmed.has(key));
    if (orphans.length) await env.FILES.delete(orphans);
    removed += orphans.length;
  }
  return removed;
}

async function purgeExpiredIdempotencyKeys(db: D1Database, now: number) {
  let deleted = 0;
  for (let batch = 0; batch < MAX_PURGE_BATCHES; batch++) {
    const result = await db
      .prepare(
        `DELETE FROM idempotency_keys WHERE rowid IN (SELECT rowid FROM idempotency_keys WHERE expires_at < ? LIMIT ${PURGE_BATCH})`,
      )
      .bind(now)
      .run();
    deleted += result.meta.changes;
    if (result.meta.changes < PURGE_BATCH) break;
  }
  return deleted;
}

export async function runMaintenance(env: Bindings, now = Date.now()) {
  try {
    const result = {
      expiredSessions: await purgeExpired(env.DB, "session", now),
      expiredVerifications: await purgeExpired(env.DB, "verification", now),
      expiredIdempotencyKeys: await purgeExpiredIdempotencyKeys(env.DB, now),
      orphanObjects: await removeOrphanObjects(env, now),
    };
    logEvent("info", "maintenance_completed", result);
    return result;
  } catch (error) {
    logEvent("error", "maintenance_failed", {
      ...describeError(error, { includeMessage: false }),
    });
    throw error;
  }
}
