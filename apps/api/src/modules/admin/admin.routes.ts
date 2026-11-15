import { createRoute, z } from "@hono/zod-openapi";
import {
  adminFilesListResponseSchema,
  paginationRequestSchema,
} from "@repo/contracts";
import {
  authMiddleware,
  mutationGuard,
  requirePermission,
} from "../../middleware/auth.middleware";
import {
  createRouter,
  errorResponses,
  privateSecurity,
} from "../../openapi/router";
import {
  deleteFileForAdmin,
  downloadFileForAdmin,
  listFilesForAdmin,
} from "./admin.service";

const fileParams = z.object({ id: z.uuid() });

const listFilesRoute = createRoute({
  method: "get",
  path: "/files",
  operationId: "listAdminFiles",
  tags: ["Admin"],
  security: privateSecurity,
  middleware: [requirePermission("file:list-any")] as const,
  request: { query: paginationRequestSchema },
  responses: {
    200: {
      description: "Recent files across all users, newest first",
      content: {
        "application/json": {
          schema: adminFilesListResponseSchema,
        },
      },
    },
    ...errorResponses,
  },
});

const downloadFileRoute = createRoute({
  method: "get",
  path: "/files/{id}/content",
  operationId: "downloadAdminFile",
  tags: ["Admin"],
  security: privateSecurity,
  middleware: [requirePermission("file:download-any")] as const,
  request: { params: fileParams },
  responses: {
    200: {
      description: "Admin file download",
      content: {
        "application/octet-stream": {
          schema: z.string().openapi({ format: "binary" }),
        },
      },
    },
    ...errorResponses,
  },
});

const deleteFileRoute = createRoute({
  method: "delete",
  path: "/files/{id}",
  operationId: "deleteAdminFile",
  tags: ["Admin"],
  security: privateSecurity,
  middleware: [requirePermission("file:delete-any")] as const,
  request: { params: fileParams },
  responses: {
    204: { description: "File deleted by an administrator" },
    ...errorResponses,
  },
});

const router = createRouter();
router.use("*", authMiddleware, mutationGuard);

export const adminRoutes = router
  .openapi(listFilesRoute, async (c) =>
    c.json(await listFilesForAdmin(c.env, c.req.valid("query")), 200),
  )
  .openapi(downloadFileRoute, (c) =>
    downloadFileForAdmin(
      c.env,
      c.req.valid("param").id,
      c.get("session").user.id,
    ),
  )
  .openapi(deleteFileRoute, async (c) => {
    await deleteFileForAdmin(
      c.env,
      c.req.valid("param").id,
      c.get("session").user.id,
    );
    return c.body(null, 204);
  });
