import { describe, expect, it } from "vitest";
import { isPermission, parseRoles } from "./access/permissions";
import { createRoleRequestSchema, roleNameSchema } from "./access/schemas";
import { paginationRequestSchema } from "./common/pagination";
import { fileSchema, MAX_FILE_BYTES } from "./files/schemas";

describe("public contracts", () => {
  it("defaults pagination and rejects oversized or fractional requests", () => {
    expect(paginationRequestSchema.parse({})).toEqual({ limit: 20 });
    for (const limit of [0, 51, 2.5, "invalid"]) {
      expect(paginationRequestSchema.safeParse({ limit }).success).toBe(false);
    }
  });

  it("rejects file metadata outside the supported upload contract", () => {
    const file = {
      id: "file",
      name: "receipt.pdf",
      contentType: "application/pdf",
      size: 100,
      createdAt: "2026-10-02T00:00:00.000Z",
    };
    expect(fileSchema.safeParse(file).success).toBe(true);
    expect(
      fileSchema.safeParse({ ...file, size: MAX_FILE_BYTES + 1 }).success,
    ).toBe(false);
    expect(
      fileSchema.safeParse({ ...file, contentType: "text/html" }).success,
    ).toBe(false);
  });

  it("accepts only slug role names that fit Better Auth's role list", () => {
    for (const name of ["support", "billing-team", "ops2"]) {
      expect(roleNameSchema.safeParse(name).success).toBe(true);
    }
    for (const name of ["a", "Support", "admin,user", "1ops", "has space"]) {
      expect(roleNameSchema.safeParse(name).success).toBe(false);
    }
  });

  it("rejects unknown permissions when creating a role", () => {
    const role = { name: "support", permissions: ["user:list"] };
    expect(createRoleRequestSchema.parse(role)).toMatchObject({
      description: "",
    });
    expect(
      createRoleRequestSchema.safeParse({
        ...role,
        permissions: ["user:everything"],
      }).success,
    ).toBe(false);
  });

  it("splits Better Auth role strings and recognizes catalog permissions", () => {
    expect(parseRoles("admin, support,,")).toEqual(["admin", "support"]);
    expect(parseRoles(null)).toEqual([]);
    expect(isPermission("file:delete-any")).toBe(true);
    expect(isPermission("toString")).toBe(false);
  });
});
