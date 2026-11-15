import { describe, expect, it } from "vitest";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  bindings,
  loginAdmin,
  mockEmail,
  request,
  signUp,
  upload,
} from "./helpers";

describe("admin access", () => {
  it("bootstraps the default admin account and allows login", async () => {
    const token = await loginAdmin();
    expect(token).toBeTruthy();
    const admin = await bindings.DB.prepare(
      "SELECT email_verified, role, banned FROM user WHERE email = ?",
    )
      .bind(ADMIN_EMAIL)
      .first<{ emailVerified: number; role: string; banned: number }>();
    expect(admin).toMatchObject({ role: "admin" });
  });

  it("accepts the local 127.0.0.1 browser origin for the demo admin", async () => {
    await request("/api/dev/bootstrap-admin", { method: "POST" });
    const response = await request("/api/auth/sign-in/email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://127.0.0.1:5173",
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });
    expect(response.status, await response.clone().text()).toBe(200);
  });

  it("rate-limits and bounds admin bodies before guard parsing", async () => {
    const token = await loginAdmin();
    const init = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        "cf-connecting-ip": "192.0.2.20",
      },
      body: JSON.stringify({ padding: "x".repeat(70 * 1024) }),
    };
    const limited = await request("/api/auth/admin/set-role", init, {
      AUTH_RATE_LIMITER: { limit: async () => ({ success: false }) },
    });
    expect(limited.status).toBe(429);
    expect(
      ((await limited.json()) as { error: { code: string } }).error.code,
    ).toBe("RATE_LIMITED");

    const oversized = await request("/api/auth/admin/set-role", init);
    expect(oversized.status).toBe(413);
    expect(
      ((await oversized.json()) as { error: { code: string } }).error.code,
    ).toBe("PAYLOAD_TOO_LARGE");
  });

  it("protects admin tools outside development", async () => {
    const user = await signUp(mockEmail());
    const headers = { authorization: `Bearer ${user.token}` };
    const overrides = {
      ENVIRONMENT: "production" as const,
      BETTER_AUTH_URL: "https://example.test",
    };
    expect((await request("/api/docs", { headers }, overrides)).status).toBe(
      403,
    );
    const adminToken = await loginAdmin();
    expect(
      (
        await request(
          "/api/telescope",
          { headers: { authorization: `Bearer ${adminToken}` } },
          overrides,
        )
      ).status,
    ).toBe(404);
    expect(
      (
        await request(
          "/api/docs",
          { headers: { authorization: `Bearer ${adminToken}` } },
          overrides,
        )
      ).status,
    ).toBe(200);
  });

  it("opens Telescope locally only for users with api-docs:view", async () => {
    const user = await signUp(mockEmail());
    const asUser = { headers: { authorization: `Bearer ${user.token}` } };
    expect((await request("/api/telescope", asUser, {}, null)).status).toBe(
      403,
    );
    const adminToken = await loginAdmin();
    const asAdmin = { headers: { authorization: `Bearer ${adminToken}` } };
    expect((await request("/api/telescope", asAdmin, {}, null)).status).toBe(
      200,
    );
  });

  it("lets admins manage files across users", async () => {
    const user = await signUp(mockEmail());
    const uploaded = await upload(user.token);
    expect(uploaded.status).toBe(201);
    const adminToken = await loginAdmin();
    const headers = { authorization: `Bearer ${adminToken}` };
    const list = (await (
      await request("/api/v1/admin/files", { headers })
    ).json()) as { data: Array<{ id: string; ownerEmail: string }> };
    expect(list.data).toHaveLength(1);
    expect(list.data[0]?.ownerEmail).toBe(user.email);
    const id = list.data[0]!.id;
    expect(
      (await request(`/api/v1/admin/files/${id}/content`, { headers })).status,
    ).toBe(200);
    expect(
      (
        await request(`/api/v1/admin/files/${id}`, {
          method: "DELETE",
          headers,
        })
      ).status,
    ).toBe(204);
    expect((await bindings.FILES.list()).objects).toHaveLength(0);
  });

  it("prevents admins from removing their own admin role", async () => {
    const token = await loginAdmin();
    const admin = await bindings.DB.prepare(
      "SELECT id FROM user WHERE email = ?",
    )
      .bind(ADMIN_EMAIL)
      .first<{ id: string }>();
    const response = await request("/api/auth/admin/set-role", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        origin: "http://localhost:5173",
      },
      body: JSON.stringify({ userId: admin!.id, role: "user" }),
    });
    expect(response.status).toBe(403);
  });

  it("protects super-admins while allowing another super-admin to recover a compromised account", async () => {
    const messages = mockEmail();
    const manager = await signUp(messages);
    const recoveryAdmin = await signUp(messages);
    const adminToken = await loginAdmin();
    const primary = await bindings.DB.prepare(
      "SELECT id FROM user WHERE email = ?",
    )
      .bind(ADMIN_EMAIL)
      .first<{ id: string }>();
    await bindings.DB.prepare("UPDATE user SET role = 'admin' WHERE id = ?")
      .bind(recoveryAdmin.id)
      .run();
    const roleResponse = await request("/api/v1/access/roles", {
      method: "POST",
      headers: {
        authorization: `Bearer ${adminToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "user-suspender",
        permissions: ["user:ban"],
      }),
    });
    expect(roleResponse.status).toBe(201);
    await bindings.DB.prepare(
      "UPDATE user SET role = 'user-suspender' WHERE id = ?",
    )
      .bind(manager.id)
      .run();

    const ban = (token: string, userId: string) =>
      request("/api/auth/admin/ban-user", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
    expect((await ban(manager.token, primary!.id)).status).toBe(403);
    expect((await ban(recoveryAdmin.token, recoveryAdmin.id)).status).toBe(403);
    expect((await ban(recoveryAdmin.token, primary!.id)).status).toBe(200);
  });

  it("serializes concurrent super-admin access removal", async () => {
    const recoveryAdmin = await signUp(mockEmail());
    const primaryToken = await loginAdmin();
    const primary = await bindings.DB.prepare(
      "SELECT id FROM user WHERE email = ?",
    )
      .bind(ADMIN_EMAIL)
      .first<{ id: string }>();
    await bindings.DB.prepare("UPDATE user SET role = 'admin' WHERE id = ?")
      .bind(recoveryAdmin.id)
      .run();

    const ban = (token: string, userId: string) =>
      request("/api/auth/admin/ban-user", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
    const responses = await Promise.all([
      ban(primaryToken, recoveryAdmin.id),
      ban(recoveryAdmin.token, primary!.id),
    ]);
    expect(responses.map((response) => response.status).sort()).toEqual([
      200, 409,
    ]);
    const active = await bindings.DB.prepare(
      "SELECT count(*) AS count FROM user WHERE role = 'admin' AND COALESCE(banned, 0) = 0",
    ).first<{ count: number }>();
    expect(active?.count).toBe(1);
  });
});
