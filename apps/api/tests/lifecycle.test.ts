import { describe, expect, it } from "vitest";
import { runMaintenance } from "../src/maintenance";
import { deleteAllFilesForUser } from "../src/modules/files/files.service";
import {
  authRequest,
  bindings,
  loginAdmin,
  mockEmail,
  password,
  request,
  signUp,
  upload,
} from "./helpers";

async function countRows(sql: string, ...params: unknown[]) {
  const row = await bindings.DB.prepare(sql)
    .bind(...params)
    .first<{ count: number }>();
  return row?.count ?? 0;
}

describe("data lifecycle", () => {
  it("deletes a user's files when they delete their account", async () => {
    const user = await signUp(mockEmail());
    expect((await upload(user.token)).status).toBe(201);
    const response = await authRequest(
      "/delete-user",
      { password },
      user.token,
    );
    expect(response.status, await response.clone().text()).toBe(200);
    expect(
      await countRows(
        "SELECT count(*) AS count FROM user WHERE id = ?",
        user.id,
      ),
    ).toBe(0);
    expect(await countRows("SELECT count(*) AS count FROM files")).toBe(0);
    expect((await bindings.FILES.list()).objects).toHaveLength(0);
  });

  it("lets admins remove users who own files and audits the action", async () => {
    const user = await signUp(mockEmail());
    expect((await upload(user.token)).status).toBe(201);
    const adminToken = await loginAdmin();
    const response = await authRequest(
      "/admin/remove-user",
      { userId: user.id },
      adminToken,
    );
    expect(response.status, await response.clone().text()).toBe(200);
    expect((await bindings.FILES.list()).objects).toHaveLength(0);
    const audit = await bindings.DB.prepare(
      "SELECT action, target_type, target_id FROM admin_audit",
    ).all();
    expect(audit.results).toEqual([
      { action: "remove-user", target_type: "user", target_id: user.id },
    ]);
  });

  it("bounds account file cleanup and completes safely on retry", async () => {
    const user = await signUp(mockEmail());
    const ids = Array.from({ length: 501 }, () => crypto.randomUUID());
    for (let offset = 0; offset < ids.length; offset += 100) {
      await bindings.DB.batch(
        ids
          .slice(offset, offset + 100)
          .map((id) =>
            bindings.DB.prepare(
              "INSERT INTO files (id,user_id,name,content_type,size,object_key,created_at) VALUES (?,?,?,?,?,?,?)",
            ).bind(
              id,
              user.id,
              "bulk.pdf",
              "application/pdf",
              1,
              `users/${user.id}/${id}`,
              "2026-01-01T00:00:00.000Z",
            ),
          ),
      );
    }

    await expect(
      deleteAllFilesForUser(bindings, user.id),
    ).rejects.toMatchObject({
      code: "ACCOUNT_CLEANUP_INCOMPLETE",
      status: 503,
    });
    expect(await countRows("SELECT count(*) AS count FROM files")).toBe(1);
    await expect(
      deleteAllFilesForUser(bindings, user.id),
    ).resolves.toBeUndefined();
    expect(await countRows("SELECT count(*) AS count FROM files")).toBe(0);
  });

  it("pages admin files with a cursor and audits file deletion", async () => {
    const user = await signUp(mockEmail());
    for (const name of ["a.pdf", "b.pdf", "c.pdf"])
      expect((await upload(user.token, name)).status).toBe(201);
    const headers = { authorization: `Bearer ${await loginAdmin()}` };
    type Page = {
      data: Array<{ id: string }>;
      meta: { nextCursor: string | null };
    };
    const first = (await (
      await request("/api/v1/admin/files?limit=2", { headers })
    ).json()) as Page;
    expect(first.data).toHaveLength(2);
    expect(first.meta.nextCursor).toBeTruthy();
    const second = (await (
      await request(
        `/api/v1/admin/files?limit=2&cursor=${first.meta.nextCursor}`,
        { headers },
      )
    ).json()) as Page;
    expect(second.data).toHaveLength(1);
    expect(second.meta.nextCursor).toBeNull();
    const id = second.data[0]!.id;
    await request(`/api/v1/admin/files/${id}`, { method: "DELETE", headers });
    expect(
      await countRows(
        "SELECT count(*) AS count FROM admin_audit WHERE action = 'delete-file' AND target_id = ?",
        id,
      ),
    ).toBe(1);
  });

  it("purges expired auth rows and orphaned objects but keeps live data", async () => {
    const user = await signUp(mockEmail());
    expect((await upload(user.token)).status).toBe(201);
    const now = Date.now() + 2 * 60 * 60 * 1000;
    await bindings.DB.batch([
      bindings.DB.prepare(
        "INSERT INTO session (id, expires_at, token, created_at, updated_at, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      ).bind("expired-session", 1, "expired-token", 1, 1, user.id),
      bindings.DB.prepare(
        "INSERT INTO verification (id, identifier, value, expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      ).bind("expired-verification", "someone", "value", 1, 1, 1),
    ]);
    await bindings.FILES.put(`users/${user.id}/orphan`, "left behind");

    const result = await runMaintenance(bindings, now);

    expect(result.expiredSessions).toBe(1);
    expect(result.orphanObjects).toBe(1);
    expect(result.expiredVerifications).toBeGreaterThanOrEqual(1);
    expect(
      await countRows(
        "SELECT count(*) AS count FROM session WHERE user_id = ?",
        user.id,
      ),
    ).toBe(1);
    const keys = (await bindings.FILES.list()).objects.map((o) => o.key);
    expect(keys).toHaveLength(1);
    expect(keys[0]).not.toContain("orphan");
  });

  it("keeps orphaned objects when the D1 health check fails", async () => {
    const user = await signUp(mockEmail());
    const key = `users/${user.id}/recoverable-orphan`;
    await bindings.FILES.put(key, "left behind", {
      customMetadata: {
        metadataVersion: "1",
        uploadId: "recoverable-orphan",
        ownerUserId: user.id,
        uploadedByUserId: user.id,
      },
    });
    const unavailableDatabase = new Proxy(bindings.DB, {
      get(target, property) {
        if (property === "prepare") {
          return (sql: string) => {
            if (sql === "SELECT 1 AS healthy") {
              throw new Error("Simulated D1 outage");
            }
            return target.prepare(sql);
          };
        }
        const value = Reflect.get(target, property);
        return typeof value === "function" ? value.bind(target) : value;
      },
    });

    await expect(
      runMaintenance(
        { ...bindings, DB: unavailableDatabase },
        Date.now() + 2 * 60 * 60 * 1000,
      ),
    ).rejects.toThrow("Simulated D1 outage");
    expect(await bindings.FILES.head(key)).not.toBeNull();
  });
});
