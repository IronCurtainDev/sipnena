import { z } from "zod";
import { PERMISSION_NAMES, type Permission } from "./permissions";

// Lowercase slug: it is stored inside Better Auth's comma-separated user.role.
export const roleNameSchema = z
  .string()
  .regex(
    /^[a-z][a-z0-9-]{1,31}$/,
    "Use 2-32 lowercase letters, numbers, or hyphens, starting with a letter",
  );

const permissionInputSchema = z.union([
  z.enum(PERMISSION_NAMES),
  // Compatibility-only input alias. It is expanded before storage and is
  // never returned or assigned to a role.
  z.literal("role:manage"),
]);
const rolePermissionsInputSchema = z
  .array(permissionInputSchema)
  .max(PERMISSION_NAMES.length)
  .transform(
    (permissions) =>
      [
        ...new Set(
          permissions.flatMap((permission) =>
            permission === "role:manage"
              ? ["role:create", "role:update", "role:delete"]
              : [permission],
          ),
        ),
      ] as Permission[],
  );

export const roleIdParamsSchema = z.object({ id: z.uuid() });

// Responses use plain strings so older clients tolerate permissions added later.
export const roleSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    system: z.boolean().meta({
      description: "System roles cannot be deleted",
    }),
    permissions: z.array(z.string()),
    createdAt: z.iso.datetime(),
  })
  .meta({ id: "Role" });

export const createRoleRequestSchema = z.object({
  name: roleNameSchema,
  description: z.string().trim().max(200).default(""),
  permissions: rolePermissionsInputSchema,
});

export const updateRoleRequestSchema = z.object({
  description: z.string().trim().max(200).optional(),
  permissions: rolePermissionsInputSchema.optional(),
});

export const rolesListResponseSchema = z
  .object({ data: z.array(roleSchema) })
  .meta({ id: "RolesListResponse" });

export const roleResponseSchema = z
  .object({ data: roleSchema })
  .meta({ id: "RoleResponse" });

export const permissionSchema = z
  .object({ name: z.string(), group: z.string(), label: z.string() })
  .meta({ id: "Permission" });

export const permissionsListResponseSchema = z
  .object({ data: z.array(permissionSchema) })
  .meta({ id: "PermissionsListResponse" });

export const myAccessResponseSchema = z
  .object({
    data: z.object({
      roles: z.array(z.string()),
      permissions: z.array(z.string()),
    }),
  })
  .meta({ id: "MyAccessResponse" });

export type Role = z.infer<typeof roleSchema>;
export type CreateRoleRequest = z.input<typeof createRoleRequestSchema>;
export type UpdateRoleRequest = z.infer<typeof updateRoleRequestSchema>;
export type PermissionInfo = z.infer<typeof permissionSchema>;
export type MyAccess = z.infer<typeof myAccessResponseSchema>["data"];
