import { describe, expect, it } from "vitest";
import { errorResponseSchema, healthResponseSchema } from "@repo/contracts";
import { mockEmail, request, signUp } from "./helpers";

describe("HTTP contracts", () => {
  it("serves health and capabilities without credentials or database operations", async () => {
    const health = await request(
      "/api/health",
      {},
      { BETTER_AUTH_SECRET: undefined },
    );
    expect(health.status).toBe(200);
    expect(health.headers.get("x-request-id")).toBeTruthy();
    expect(healthResponseSchema.parse(await health.json())).toMatchObject({
      version: "1",
    });
    const config = await request(
      "/api/config",
      {},
      {
        BETTER_AUTH_SECRET: undefined,
        ENABLE_ORGANIZATIONS: "false",
        MIN_MOBILE_VERSION: "1.4.0",
      },
    );
    expect(await config.json()).toEqual({
      googleEnabled: false,
      organizationsEnabled: false,
      apiVersion: "1",
      minSupportedMobileVersion: "1.4.0",
    });
  });

  it("enforces baseline security headers across API endpoints", async () => {
    const response = await request("/api/health");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("x-frame-options")).toBe("SAMEORIGIN");
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("reports every invalid field with its path", async () => {
    const user = await signUp(mockEmail());
    const response = await request("/api/v1/files?limit=999", {
      headers: { authorization: `Bearer ${user.token}` },
    });
    expect(response.status).toBe(400);
    const body = errorResponseSchema.parse(await response.json());
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(body.error.issues).toEqual([
      expect.objectContaining({ path: "limit" }),
    ]);
  });

  it("returns JSON for unknown API routes instead of the React shell", async () => {
    for (const path of ["/api", "/api/missing", "/api/v1/missing"]) {
      const response = await request(path);
      expect(response.status).toBe(404);
      const error = errorResponseSchema.parse(await response.json());
      expect(error.error.requestId).toBeTruthy();
    }
  });

  it("documents application routes and the provider's actual auth and organization endpoints", async () => {
    const application = (await (await request("/api/openapi.json")).json()) as {
      paths: Record<string, Record<string, unknown>>;
      components: { securitySchemes: Record<string, unknown> };
    };
    expect(application.paths).toHaveProperty("/api/v1/files");
    expect(application.paths).toHaveProperty("/api/v1/files/{id}/content");
    expect(application.paths).toHaveProperty("/api/auth/sign-in/email");
    expect(application.paths).toHaveProperty("/api/auth/sign-up/email");
    expect(application.paths).toHaveProperty(
      "/api/auth/request-password-reset",
    );
    expect(application.paths).toHaveProperty(
      "/api/auth/send-verification-email",
    );
    const signIn = application.paths["/api/auth/sign-in/email"]!.post as {
      security: unknown;
      parameters: unknown[];
    };
    const signUp = application.paths["/api/auth/sign-up/email"]!.post as {
      security: unknown;
      requestBody: {
        content: Record<string, { schema: Record<string, unknown> }>;
      };
    };
    expect(signIn.security).toEqual([{ apiKeyAuth: [] }]);
    expect(signUp.security).toEqual([{ apiKeyAuth: [] }]);
    const signUpSchema = signUp.requestBody.content["application/json"]!
      .schema as {
      required: string[];
      properties: Record<string, Record<string, unknown>>;
    };
    expect(signUpSchema.required).toEqual(["name", "email", "password"]);
    expect(signUpSchema.properties.password!).toMatchObject({
      minLength: 8,
      maxLength: 128,
    });
    expect(signIn.parameters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Content-Type", in: "header" }),
        expect.objectContaining({ name: "Origin", in: "header" }),
        expect.objectContaining({
          name: "x-api-key",
          in: "header",
          required: true,
        }),
      ]),
    );
    expect(
      (application.paths["/api/auth/sign-out"]!.post as { security: unknown })
        .security,
    ).toEqual([
      { apiKeyAuth: [], cookieAuth: [] },
      { apiKeyAuth: [], bearerAuth: [] },
    ]);
    expect(
      (
        application.paths["/api/auth/sign-out"]!.post as {
          parameters: unknown[];
        }
      ).parameters,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Authorization",
          in: "header",
          schema: { type: "string", example: "Bearer <session-token>" },
        }),
      ]),
    );
    expect(application.components.securitySchemes).toHaveProperty("cookieAuth");
    expect(application.components.securitySchemes).toHaveProperty("bearerAuth");
    expect(JSON.stringify(application)).not.toMatch(
      /12345678|dev-demo-api-key|admin@email\.com/,
    );
    const auth = await request("/api/auth/open-api/generate-schema");
    expect(auth.status).toBe(200);
    const schema = (await auth.json()) as { paths: Record<string, unknown> };
    expect(
      Object.keys(schema.paths).some((path) => path.includes("sign-in/email")),
    ).toBe(true);
    expect(
      Object.keys(schema.paths).some((path) =>
        path.includes("organization/create"),
      ),
    ).toBe(true);
  });
});
