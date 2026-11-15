import { describe, expect, it } from "vitest";
import {
  bindings,
  loginAdmin,
  mockEmail,
  origin,
  request,
  signUp,
} from "./helpers";

function call(path: string, token: string, body: object) {
  return request(path, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      origin,
    },
    body: JSON.stringify(body),
  });
}

async function setRole(userId: string, role: string) {
  await bindings.DB.prepare("UPDATE user SET role = ? WHERE id = ?")
    .bind(role, userId)
    .run();
}

describe("atomic admin permissions", () => {
  it("authorizes banning and unbanning independently", async () => {
    const messages = mockEmail();
    const manager = await signUp(messages);
    const target = await signUp(messages);
    const otherTarget = await signUp(messages);
    const admin = await loginAdmin();
    for (const [name, permission] of [
      ["user-banner", "user:ban"],
      ["user-unbanner", "user:unban"],
    ] as const) {
      expect(
        (
          await call("/api/v1/access/roles", admin, {
            name,
            permissions: [permission],
          })
        ).status,
      ).toBe(201);
    }

    await setRole(manager.id, "user-banner");
    expect(
      (
        await call("/api/auth/admin/ban-user", manager.token, {
          userId: target.id,
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await call("/api/auth/admin/unban-user", manager.token, {
          userId: target.id,
        })
      ).status,
    ).toBe(403);

    await setRole(manager.id, "user-unbanner");
    expect(
      (
        await call("/api/auth/admin/unban-user", manager.token, {
          userId: target.id,
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await call("/api/auth/admin/ban-user", manager.token, {
          userId: otherTarget.id,
        })
      ).status,
    ).toBe(403);
  });
});
