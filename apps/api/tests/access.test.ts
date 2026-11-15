import { describe, expect, it } from "vitest";
import {
  bindings,
  loginAdmin,
  mockEmail,
  origin,
  request,
  signUp,
  upload,
} from "./helpers";

const SUPPORT_ROLE_ID = "00000000-0000-4000-8000-00000000a003";
const USER_ROLE_ID = "00000000-0000-4000-8000-00000000a002";

function call(path: string, token: string, method = "GET", body?: object) {
  return request(path, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      origin,
      ...(body ? { "content-type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

async function setRole(userId: string, role: string) {
  await bindings.DB.prepare("UPDATE user SET role = ? WHERE id = ?")
    .bind(role, userId)
    .run();
}

async function uploadedFileId(token: string) {
  const response = await upload(token);
  expect(response.status).toBe(201);
  return ((await response.json()) as { data: { id: string } }).data.id;
}

describe("roles and permissions", () => {
  it("lets support view users and files but not change them", async () => {
    const messages = mockEmail();
    const staff = await signUp(messages);
    const member = await signUp(messages);
    await setRole(staff.id, "support");
    const fileId = await uploadedFileId(member.token);

    const me = await call("/api/v1/access/me", staff.token);
    expect(await me.json()).toEqual({
      data: {
        roles: ["support"],
        permissions: [
          "user:list",
          "user:get",
          "session:list",
          "file:list-any",
          "file:download-any",
        ],
      },
    });
    expect((await call("/api/auth/admin/list-users", staff.token)).status).toBe(
      200,
    );
    expect((await call("/api/v1/admin/files", staff.token)).status).toBe(200);
    expect(
      (await call(`/api/v1/admin/files/${fileId}/content`, staff.token)).status,
    ).toBe(200);

    const target = { userId: member.id };
    for (const [path, body] of [
      ["/api/auth/admin/ban-user", target],
      ["/api/auth/admin/remove-user", target],
      ["/api/auth/admin/set-role", { ...target, role: "support" }],
    ] as const) {
      const response = await call(path, staff.token, "POST", body);
      expect(response.status, path).toBe(403);
    }
    expect(
      (await call(`/api/v1/admin/files/${fileId}`, staff.token, "DELETE"))
        .status,
    ).toBe(403);
  });

  it("applies permissions granted to a custom role", async () => {
    const messages = mockEmail();
    const staff = await signUp(messages);
    const member = await signUp(messages);
    const admin = await loginAdmin();
    const created = await call("/api/v1/access/roles", admin, "POST", {
      name: "file-cleaner",
      permissions: ["file:list-any", "file:delete-any"],
    });
    expect(created.status, await created.clone().text()).toBe(201);
    await setRole(staff.id, "user,file-cleaner");
    const fileId = await uploadedFileId(member.token);

    expect(
      (await call(`/api/v1/admin/files/${fileId}`, staff.token, "DELETE"))
        .status,
    ).toBe(204);
    expect((await call("/api/auth/admin/list-users", staff.token)).status).toBe(
      403,
    );
  });

  it("does not let role editors grant permissions they do not hold", async () => {
    const manager = await signUp(mockEmail());
    const admin = await loginAdmin();
    const editor = await call("/api/v1/access/roles", admin, "POST", {
      name: "role-editor",
      permissions: ["role:create"],
    });
    expect(editor.status).toBe(201);
    await setRole(manager.id, "role-editor");

    const escalation = await call(
      "/api/v1/access/roles",
      manager.token,
      "POST",
      { name: "escalated", permissions: ["file:delete-any"] },
    );
    expect(escalation.status).toBe(403);
    expect(
      (
        await call("/api/v1/access/roles", manager.token, "POST", {
          name: "delegated-editor",
          permissions: ["role:create"],
        })
      ).status,
    ).toBe(201);
  });

  it("only assigns roles that exist", async () => {
    const member = await signUp(mockEmail());
    const admin = await loginAdmin();
    const unknown = await call("/api/auth/admin/set-role", admin, "POST", {
      userId: member.id,
      role: "auditor",
    });
    expect(unknown.status).toBe(400);
    const known = await call("/api/auth/admin/set-role", admin, "POST", {
      userId: member.id,
      role: ["user", "support"],
    });
    expect(known.status, await known.clone().text()).toBe(200);
    const stored = await bindings.DB.prepare(
      "SELECT role FROM user WHERE id = ?",
    )
      .bind(member.id)
      .first<{ role: string }>();
    expect(stored?.role).toBe("user,support");
  });

  it("gives admins permissions that are not stored for any role", async () => {
    const admin = await loginAdmin();
    await bindings.DB.prepare(
      "DELETE FROM role_permission WHERE permission = 'file:list-any'",
    ).run();
    expect((await call("/api/v1/admin/files", admin)).status).toBe(200);
    const me = (await (await call("/api/v1/access/me", admin)).json()) as {
      data: { permissions: string[] };
    };
    expect(me.data.permissions).toContain("role:create");
    expect(me.data.permissions).toContain("role:update");
    expect(me.data.permissions).toContain("role:delete");
  });

  it("protects system roles, roles in use, and the admin role", async () => {
    const admin = await loginAdmin();
    const roles = (await (
      await call("/api/v1/access/roles", admin)
    ).json()) as {
      data: Array<{ id: string; name: string }>;
    };
    expect(roles.data.map((role) => role.name)).toEqual([
      "admin",
      "support",
      "user",
    ]);
    const adminRole = roles.data.find((role) => role.name === "admin")!;

    const system = await call(
      `/api/v1/access/roles/${USER_ROLE_ID}`,
      admin,
      "DELETE",
    );
    expect(system.status).toBe(409);
    expect(
      (
        await call(`/api/v1/access/roles/${adminRole.id}`, admin, "PATCH", {
          permissions: [],
        })
      ).status,
    ).toBe(409);

    const staff = await signUp(mockEmail());
    await setRole(staff.id, "support");
    const inUse = await call(
      `/api/v1/access/roles/${SUPPORT_ROLE_ID}`,
      admin,
      "DELETE",
    );
    expect(inUse.status).toBe(409);
    const body = (await inUse.json()) as { error: { code: string } };
    expect(body.error.code).toBe("ROLE_IN_USE");

    await setRole(staff.id, "user");
    expect(
      (await call(`/api/v1/access/roles/${SUPPORT_ROLE_ID}`, admin, "DELETE"))
        .status,
    ).toBe(204);
  });

  it("hides role management from users without access", async () => {
    const member = await signUp(mockEmail());
    expect((await call("/api/v1/access/roles", member.token)).status).toBe(403);
    expect(
      (
        await call("/api/v1/access/roles", member.token, "POST", {
          name: "sneaky",
          permissions: ["role:create"],
        })
      ).status,
    ).toBe(403);
  });

  it("blocks self role changes and admin grants by non-admins", async () => {
    const messages = mockEmail();
    const manager = await signUp(messages);
    const member = await signUp(messages);
    const admin = await loginAdmin();
    const created = await call("/api/v1/access/roles", admin, "POST", {
      name: "role-manager",
      permissions: ["user:list", "user:update", "user:set-role"],
    });
    expect(created.status).toBe(201);
    await setRole(manager.id, "role-manager");

    const self = await call("/api/auth/admin/set-role", manager.token, "POST", {
      userId: manager.id,
      role: "support",
    });
    expect(self.status).toBe(403);
    const grantAdmin = await call(
      "/api/auth/admin/set-role",
      manager.token,
      "POST",
      { userId: member.id, role: ["user", "admin"] },
    );
    expect(grantAdmin.status).toBe(403);
    const updateGrant = await call(
      "/api/auth/admin/update-user",
      manager.token,
      "POST",
      { userId: member.id, data: { role: "admin" } },
    );
    expect(updateGrant.status).toBe(403);
    const strongerRole = await call(
      "/api/auth/admin/set-role",
      manager.token,
      "POST",
      { userId: member.id, role: "support" },
    );
    expect(strongerRole.status).toBe(403);
    const allowed = await call(
      "/api/auth/admin/set-role",
      manager.token,
      "POST",
      { userId: member.id, role: "role-manager" },
    );
    expect(allowed.status, await allowed.clone().text()).toBe(200);
  });
});
