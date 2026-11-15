import { createRoute, z } from "@hono/zod-openapi";
import {
  fileIdParamsSchema,
  fileResponseSchema,
  filesListResponseSchema,
  paginationRequestSchema,
} from "@repo/contracts";
import { createMiddleware } from "hono/factory";
import { MAX_MULTIPART_BYTES } from "../../lib/limits";
import { enforceRateLimit } from "../../lib/rate-limit";
import {
  authMiddleware,
  mutationGuard,
} from "../../middleware/auth.middleware";
import { boundedBody } from "../../middleware/body-limit.middleware";
import {
  createRouter,
  errorResponses,
  privateSecurity,
} from "../../openapi/router";
import type { AppEnv } from "../../types/context";
import { listFiles } from "./files.queries";
import { deleteFile, downloadFile, uploadFile } from "./files.service";

const uploadLimit = createMiddleware<AppEnv>(async (c, next) => {
  await enforceRateLimit(
    c.env.UPLOAD_RATE_LIMITER,
    `upload:${c.get("session").user.id}`,
    c.env,
  );
  await next();
});

const listRoute = createRoute({
  method: "get",
  path: "/",
  operationId: "listFiles",
  tags: ["Files"],
  security: privateSecurity,
  request: { query: paginationRequestSchema },
  responses: {
    200: {
      description: "The signed-in user's files",
      content: { "application/json": { schema: filesListResponseSchema } },
    },
    ...errorResponses,
  },
});

const uploadRoute = createRoute({
  method: "post",
  path: "/",
  operationId: "uploadFile",
  tags: ["Files"],
  security: privateSecurity,
  middleware: [uploadLimit, boundedBody(MAX_MULTIPART_BYTES)] as const,
  request: {
    body: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: z
            .object({
              file: z
                .instanceof(File)
                .openapi({ type: "string", format: "binary" }),
            })
            .strict(),
        },
      },
    },
  },
  responses: {
    201: {
      description: "A completed private upload, maximum 5 MiB",
      content: { "application/json": { schema: fileResponseSchema } },
    },
    ...errorResponses,
  },
});

const downloadRoute = createRoute({
  method: "get",
  path: "/{id}/content",
  operationId: "downloadFile",
  tags: ["Files"],
  security: privateSecurity,
  request: { params: fileIdParamsSchema },
  responses: {
    200: {
      description: "Private file download",
      content: {
        "application/octet-stream": {
          schema: z.string().openapi({ format: "binary" }),
        },
      },
    },
    ...errorResponses,
  },
});

const deleteRoute = createRoute({
  method: "delete",
  path: "/{id}",
  operationId: "deleteFile",
  tags: ["Files"],
  security: privateSecurity,
  request: { params: fileIdParamsSchema },
  responses: {
    204: { description: "File deleted" },
    ...errorResponses,
  },
});

const router = createRouter();
router.use("*", authMiddleware, mutationGuard);

export const filesRoutes = router
  .openapi(listRoute, async (c) =>
    c.json(
      await listFiles(c.env.DB, c.get("session").user.id, c.req.valid("query")),
      200,
    ),
  )
  .openapi(uploadRoute, async (c) =>
    c.json(
      await uploadFile(
        c.env,
        c.get("session").user.id,
        c.req.valid("form").file,
        c.get("requestId"),
      ),
      201,
    ),
  )
  .openapi(downloadRoute, (c) =>
    downloadFile(c.env, c.get("session").user.id, c.req.valid("param").id),
  )
  .openapi(deleteRoute, async (c) => {
    await deleteFile(c.env, c.get("session").user.id, c.req.valid("param").id);
    return c.body(null, 204);
  });
