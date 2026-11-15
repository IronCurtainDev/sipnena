export type OpenApiDocument = {
  paths?: Record<string, Record<string, unknown>>;
  components?: Record<string, Record<string, unknown>>;
  tags?: Array<Record<string, unknown>>;
  [key: string]: unknown;
};

type OpenApiOperation = Record<string, unknown>;

const publicAuthPaths = new Set([
  "/api/auth/sign-in/email",
  "/api/auth/sign-up/email",
  "/api/auth/sign-in/social",
  "/api/auth/request-password-reset",
  "/api/auth/reset-password",
  "/api/auth/reset-password/{token}",
  "/api/auth/send-verification-email",
  "/api/auth/reset-password",
  "/api/auth/verify-email",
  "/api/auth/callback/{id}",
  "/api/auth/delete-user/callback",
  "/api/auth/error",
  "/api/auth/ok",
]);

function withHeader(
  operation: OpenApiOperation,
  name: string,
  description: string,
  example?: string,
  required = false,
) {
  const parameters: unknown[] = Array.isArray(operation.parameters)
    ? operation.parameters
    : [];
  if (
    parameters.some((parameter) => {
      const value = parameter as { in?: string; name?: string };
      return (
        value.in === "header" &&
        value.name?.toLowerCase() === name.toLowerCase()
      );
    })
  ) {
    return operation;
  }
  return {
    ...operation,
    parameters: [
      ...parameters,
      {
        name,
        in: "header",
        required,
        description,
        schema: { type: "string", ...(example ? { example } : {}) },
      },
    ],
  };
}

function improveRequestBody(operation: OpenApiOperation, path: string) {
  const requestBody = operation.requestBody as
    { content?: Record<string, Record<string, unknown>> } | undefined;
  const json = requestBody?.content?.["application/json"];
  if (!json?.schema) return operation;
  const rawSchema = json.schema as {
    properties?: Record<string, Record<string, unknown>>;
  };
  const schema = {
    ...rawSchema,
    properties: { ...(rawSchema.properties ?? {}) },
  };
  const property = (name: string, values: Record<string, unknown>) => {
    if (schema.properties[name])
      schema.properties[name] = { ...schema.properties[name], ...values };
  };
  property("email", { format: "email", example: "you@example.test" });
  property("name", { example: "Test User" });
  property("password", {
    minLength: 8,
    maxLength: 128,
    format: "password",
    example: "correct-horse-battery",
  });
  if (path.endsWith("/reset-password")) {
    property("token", {
      description: "One-time token from the recovery link.",
    });
    property("newPassword", {
      minLength: 8,
      maxLength: 128,
      format: "password",
      example: "new-correct-horse",
    });
  }
  return {
    ...operation,
    requestBody: {
      ...requestBody,
      content: {
        ...requestBody?.content,
        "application/json": { ...json, schema },
      },
    },
  };
}

export function normalizeAuthOpenApi(document: OpenApiDocument) {
  const paths = Object.fromEntries(
    Object.entries(document.paths ?? {}).map(([path, pathItem]) => {
      const operations = Object.fromEntries(
        Object.entries(pathItem).map(([method, rawOperation]) => {
          if (!["get", "post", "put", "patch", "delete"].includes(method))
            return [method, rawOperation];
          let operation = rawOperation as OpenApiOperation;
          const isAuthOperation = path.startsWith("/api/auth/");
          const publicOperation = publicAuthPaths.has(path);
          if (isAuthOperation) {
            operation = {
              ...operation,
              security: publicOperation
                ? [{ apiKeyAuth: [] }]
                : [
                    { apiKeyAuth: [], cookieAuth: [] },
                    { apiKeyAuth: [], bearerAuth: [] },
                  ],
            };
          }
          const protectedOperation =
            Array.isArray(operation.security) &&
            operation.security.some((scheme: unknown) => {
              const value = scheme as Record<string, unknown>;
              return "cookieAuth" in value || "bearerAuth" in value;
            });
          const requestBody = operation.requestBody as
            { content?: Record<string, unknown> } | undefined;
          operation = withHeader(
            operation,
            "x-api-key",
            "Required gateway key for every /api request.",
            "<api-key>",
            true,
          );
          if (requestBody?.content?.["application/json"]) {
            operation = withHeader(
              operation,
              "Content-Type",
              "JSON request body.",
            );
          }
          if (method !== "get" && method !== "head") {
            operation = withHeader(
              operation,
              "Origin",
              "Browser origin; native bearer clients may omit this header.",
            );
          }
          if (protectedOperation) {
            operation = withHeader(
              operation,
              "Authorization",
              "Bearer access token returned by sign-in for native clients. Browser clients may use the session cookie instead.",
              "Bearer <session-token>",
            );
          }
          operation = improveRequestBody(operation, path);
          return [method, operation];
        }),
      );
      return [path, operations];
    }),
  );
  return { ...document, paths };
}

export function mergeAuthOpenApi(
  application: OpenApiDocument,
  authentication: OpenApiDocument,
) {
  const authPaths = Object.fromEntries(
    Object.entries(authentication.paths ?? {}).map(([path, definition]) => [
      path.startsWith("/api/auth/")
        ? path
        : `/api/auth${path.startsWith("/") ? path : `/${path}`}`,
      definition,
    ]),
  );
  const applicationComponents = application.components ?? {};
  const authenticationComponents = authentication.components ?? {};
  const authenticationSecuritySchemes = Object.fromEntries(
    Object.entries(authenticationComponents.securitySchemes ?? {}).filter(
      ([name]) => name !== "apiKeyCookie",
    ),
  );

  return normalizeAuthOpenApi({
    ...application,
    paths: { ...authPaths, ...(application.paths ?? {}) },
    tags: [
      ...(application.tags ?? []),
      ...(authentication.tags ?? []).filter(
        (authTag) =>
          !application.tags?.some((appTag) => appTag.name === authTag.name),
      ),
    ],
    components: {
      ...applicationComponents,
      ...authenticationComponents,
      schemas: {
        ...(applicationComponents.schemas ?? {}),
        ...(authenticationComponents.schemas ?? {}),
      },
      securitySchemes: {
        ...(applicationComponents.securitySchemes ?? {}),
        ...authenticationSecuritySchemes,
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "Required gateway key for every /api request.",
        },
      },
    },
  } satisfies OpenApiDocument);
}
