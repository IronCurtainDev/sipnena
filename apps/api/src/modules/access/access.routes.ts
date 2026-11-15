import { createRoute } from "@hono/zod-openapi";
import {
  DEFAULT_ROLE,
  PERMISSIONS,
  PERMISSION_NAMES,
  SUPER_ADMIN_ROLE,
  createRoleRequestSchema,
  myAccessResponseSchema,
  parseRoles,
  permissionsListResponseSchema,
  roleIdParamsSchema,
  roleResponseSchema,
  rolesListResponseSchema,
  updateRoleRequestSchema,
  type Permission,
} from "@repo/contracts";
import { permissionsFor } from "../../auth/access-control";
import { AppError } from "../../lib/errors";
import {
  authMiddleware,
  mutationGuard,
  requireAnyPermission,
  requirePermission,
  sessionRole,
} from "../../middleware/auth.middleware";
import {
  createRouter,
  errorResponses,
  privateSecurity,
} from "../../openapi/router";
import { recordAdminAction } from "../admin/admin.audit";
import type { Bindings } from "../../types/bindings";
import {
  deleteRole,
  findRole,
  insertRole,
  listRoles,
  roleInUse,
  updateRole,
} from "./access.queries";

const errors = { ...errorResponses, 409: errorResponses[400] };
const json = <T>(schema: T) => ({ "application/json": { schema } });
const route = { tags: ["Access"], security: privateSecurity };

async function assertGrantablePermissions(
  env: Bindings,
  actorRole: unknown,
  requested: Permission[],
) {
  if (parseRoles(actorRole).includes(SUPER_ADMIN_ROLE)) return;
  const granted = await permissionsFor(env, actorRole);
  if (requested.some((permission) => !granted.includes(permission))) {
    throw new AppError(
      "FORBIDDEN",
      "You cannot grant a permission you do not have",
      403,
    );
  }
}

const meRoute = createRoute({
  ...route,
  method: "get",
  path: "/me",
  operationId: "getMyAccess",
  responses: {
    200: {
      description: "The signed-in user's roles and effective permissions",
      content: json(myAccessResponseSchema),
    },
    ...errors,
  },
});

const permissionsRoute = createRoute({
  ...route,
  method: "get",
  path: "/permissions",
  operationId: "listPermissions",
  middleware: [requirePermission("role:list")] as const,
  responses: {
    200: {
      description: "Every permission a role can grant",
      content: json(permissionsListResponseSchema),
    },
    ...errors,
  },
});

const listRolesRoute = createRoute({
  ...route,
  method: "get",
  path: "/roles",
  operationId: "listRoles",
  middleware: [
    requireAnyPermission("role:list", "user:set-role", "user:create"),
  ] as const,
  responses: {
    200: {
      description: "All roles with their permissions, by name",
      content: json(rolesListResponseSchema),
    },
    ...errors,
  },
});

const createRoleRoute = createRoute({
  ...route,
  method: "post",
  path: "/roles",
  operationId: "createRole",
  middleware: [requirePermission("role:create")] as const,
  request: {
    body: { required: true, content: json(createRoleRequestSchema) },
  },
  responses: {
    201: { description: "Role created", content: json(roleResponseSchema) },
    ...errors,
  },
});

const updateRoleRoute = createRoute({
  ...route,
  method: "patch",
  path: "/roles/{id}",
  operationId: "updateRole",
  middleware: [requirePermission("role:update")] as const,
  request: {
    params: roleIdParamsSchema,
    body: { required: true, content: json(updateRoleRequestSchema) },
  },
  responses: {
    200: { description: "Role updated", content: json(roleResponseSchema) },
    ...errors,
  },
});

const deleteRoleRoute = createRoute({
  ...route,
  method: "delete",
  path: "/roles/{id}",
  operationId: "deleteRole",
  middleware: [requirePermission("role:delete")] as const,
  request: { params: roleIdParamsSchema },
  responses: {
    204: { description: "Role deleted" },
    ...errors,
  },
});

const router = createRouter();
router.use("*", authMiddleware, mutationGuard);

export const accessRoutes = router
  .openapi(meRoute, async (c) => {
    const role = sessionRole(c.get("session"));
    const roles = parseRoles(role);
    return c.json(
      {
        data: {
          roles: roles.length ? roles : [DEFAULT_ROLE],
          permissions: await permissionsFor(c.env, role),
        },
      },
      200,
    );
  })
  .openapi(permissionsRoute, (c) =>
    c.json(
      {
        data: PERMISSION_NAMES.map((name) => ({ name, ...PERMISSIONS[name] })),
      },
      200,
    ),
  )
  .openapi(listRolesRoute, async (c) =>
    c.json({ data: await listRoles(c.env.DB) }, 200),
  )
  .openapi(createRoleRoute, async (c) => {
    const input = c.req.valid("json");
    await assertGrantablePermissions(
      c.env,
      sessionRole(c.get("session")),
      input.permissions,
    );
    const id = await insertRole(c.env.DB, input);
    await recordAdminAction(c.env, {
      actorUserId: c.get("session").user.id,
      action: "create-role",
      targetType: "role",
      targetId: id,
    });
    return c.json({ data: await findRole(c.env.DB, id) }, 201);
  })
  .openapi(updateRoleRoute, async (c) => {
    const { id } = c.req.valid("param");
    const input = c.req.valid("json");
    const existing = await findRole(c.env.DB, id);
    if (existing.name === SUPER_ADMIN_ROLE && input.permissions) {
      throw new AppError(
        "ROLE_PROTECTED",
        "The admin role always has every permission",
        409,
      );
    }
    if (input.permissions) {
      await assertGrantablePermissions(
        c.env,
        sessionRole(c.get("session")),
        input.permissions,
      );
    }
    await updateRole(c.env.DB, id, input);
    await recordAdminAction(c.env, {
      actorUserId: c.get("session").user.id,
      action: "update-role",
      targetType: "role",
      targetId: id,
    });
    return c.json({ data: await findRole(c.env.DB, id) }, 200);
  })
  .openapi(deleteRoleRoute, async (c) => {
    const { id } = c.req.valid("param");
    const existing = await findRole(c.env.DB, id);
    if (existing.system) {
      throw new AppError(
        "ROLE_PROTECTED",
        "System roles cannot be deleted",
        409,
      );
    }
    if (await roleInUse(c.env.DB, existing.name)) {
      throw new AppError(
        "ROLE_IN_USE",
        "Remove this role from every user before deleting it",
        409,
      );
    }
    await deleteRole(c.env.DB, id);
    await recordAdminAction(c.env, {
      actorUserId: c.get("session").user.id,
      action: "delete-role",
      targetType: "role",
      targetId: id,
    });
    return c.body(null, 204);
  });
