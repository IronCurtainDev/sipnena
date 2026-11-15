import { describe, expect, it } from "vitest";
import { runMaintenance } from "../src/maintenance";
import {
  ADMIN_EMAIL,
  bindings,
  loginAdmin,
  mockEmail,
  origin,
  request,
  signUp,
} from "./helpers";

function call(
  path: string,
  token: string,
  method = "GET",
  body?: object,
  headers: Record<string, string> = {},
) {
  return request(path, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      origin,
      ...(body ? { "content-type": "application/json" } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

function roleBody(name: string) {
  return { name, description: "test", permissions: ["user:get"] };
}

async function userId(email: string) {
  const row = await bindings.DB.prepare(
    "SELECT id FROM user WHERE lower(email) = lower(?) LIMIT 1",
  )
    .bind(email)
    .first<{ id: string }>();
  expect(row?.id).toBeTruthy();
  return row!.id;
}

describe("idempotency middleware", () => {
  it("rejects invalid idempotency keys with 400", async () => {
    const adminToken = await loginAdmin();
    const response = await call(
      "/api/v1/access/roles",
      adminToken,
      "POST",
      roleBody("test-role-invalid"),
      { "idempotency-key": "invalid/character!@#" },
    );
    expect(response.status).toBe(400);
    const body = (await response.json()) as { error: { code: string } };
    expect(body.error.code).toBe("INVALID_IDEMPOTENCY_KEY");
  });

  it("replays the same response for the same user, key, and body", async () => {
    const adminToken = await loginAdmin();
    const key = `key-${crypto.randomUUID()}`;
    const name = `role-${crypto.randomUUID().slice(0, 8)}`;

    const first = await call(
      "/api/v1/access/roles",
      adminToken,
      "POST",
      roleBody(name),
      { "idempotency-key": key },
    );
    expect(first.status).toBe(201);
    expect(first.headers.get("x-idempotency-key")).toBe(key);
    expect(first.headers.get("idempotent-replay")).toBeNull();
    const firstBody = await first.json();

    const second = await call(
      "/api/v1/access/roles",
      adminToken,
      "POST",
      roleBody(name),
      { "idempotency-key": key },
    );
    expect(second.status).toBe(201);
    expect(second.headers.get("idempotent-replay")).toBe("true");
    expect(second.headers.get("x-idempotency-key")).toBe(key);
    expect(await second.json()).toEqual(firstBody);
  });

  it("returns 409 when the same key is reused with a different body", async () => {
    const adminToken = await loginAdmin();
    const key = `mismatch-${crypto.randomUUID()}`;
    const firstName = `role-${crypto.randomUUID().slice(0, 8)}`;
    const secondName = `role-${crypto.randomUUID().slice(0, 8)}`;
    const first = await call(
      "/api/v1/access/roles",
      adminToken,
      "POST",
      roleBody(firstName),
      { "idempotency-key": key },
    );
    expect(first.status).toBe(201);

    const second = await call(
      "/api/v1/access/roles",
      adminToken,
      "POST",
      roleBody(secondName),
      { "idempotency-key": key },
    );
    expect(second.status).toBe(409);
    const body = (await second.json()) as { error: { code: string } };
    expect(body.error.code).toBe("IDEMPOTENCY_CONFLICT");
    const created = await bindings.DB.prepare(
      "SELECT count(*) as count FROM role WHERE name = ?",
    )
      .bind(secondName)
      .first<{ count: number }>();
    expect(created?.count).toBe(0);
  });

  it("returns 409 while another request still holds the lease", async () => {
    const adminToken = await loginAdmin();
    const key = `pending-${crypto.randomUUID()}`;
    const adminId = await userId(ADMIN_EMAIL);
    await bindings.DB.prepare(
      `INSERT INTO idempotency_keys
         (key, user_id, route, request_hash, status, created_at, expires_at)
       VALUES (?, ?, 'POST /api/v1/access/roles', 'different', 'pending', ?, ?)`,
    )
      .bind(key, adminId, Date.now(), Date.now() + 60_000)
      .run();

    const response = await call(
      "/api/v1/access/roles",
      adminToken,
      "POST",
      roleBody(`role-${crypto.randomUUID().slice(0, 8)}`),
      { "idempotency-key": key },
    );
    expect(response.status).toBe(409);
    const body = (await response.json()) as { error: { code: string } };
    expect(body.error.code).toBe("IDEMPOTENCY_CONFLICT");
  });

  it("takes over a pending key after its lease expires", async () => {
    const adminToken = await loginAdmin();
    const key = `expired-lease-${crypto.randomUUID()}`;
    const adminId = await userId(ADMIN_EMAIL);
    await bindings.DB.prepare(
      `INSERT INTO idempotency_keys
         (key, user_id, route, request_hash, status, created_at, expires_at)
       VALUES (?, ?, 'POST /api/v1/access/roles', 'stale', 'pending', 1, 2)`,
    )
      .bind(key, adminId)
      .run();

    const response = await call(
      "/api/v1/access/roles",
      adminToken,
      "POST",
      roleBody(`role-${crypto.randomUUID().slice(0, 8)}`),
      { "idempotency-key": key },
    );
    expect(response.status).toBe(201);
    expect(response.headers.get("idempotent-replay")).toBeNull();
  });

  it("does not replay a response stored for a different user", async () => {
    const adminToken = await loginAdmin();
    const member = await signUp(mockEmail());
    const key = `shared-${crypto.randomUUID()}`;
    const name = `role-${crypto.randomUUID().slice(0, 8)}`;
    const first = await call(
      "/api/v1/access/roles",
      adminToken,
      "POST",
      roleBody(name),
      { "idempotency-key": key },
    );
    expect(first.status).toBe(201);

    const second = await call(
      "/api/v1/access/roles",
      member.token,
      "POST",
      roleBody(name),
      { "idempotency-key": key },
    );
    expect(second.status).toBe(403);
    expect(second.headers.get("idempotent-replay")).toBeNull();
  });

  it("cleans up expired idempotency keys in maintenance", async () => {
    const expiredKey = `expired-${crypto.randomUUID()}`;
    await bindings.DB.prepare(
      `INSERT INTO idempotency_keys
         (key, user_id, route, request_hash, status, created_at, expires_at)
       VALUES (?, 'user1', 'POST /test', 'hash', 'completed', 100, 200)`,
    )
      .bind(expiredKey)
      .run();

    const maintenanceResult = await runMaintenance(bindings, 1000);
    expect(maintenanceResult.expiredIdempotencyKeys).toBeGreaterThanOrEqual(1);

    const check = await bindings.DB.prepare(
      "SELECT count(*) as count FROM idempotency_keys WHERE key = ?",
    )
      .bind(expiredKey)
      .first<{ count: number }>();
    expect(check?.count).toBe(0);
  });
});
