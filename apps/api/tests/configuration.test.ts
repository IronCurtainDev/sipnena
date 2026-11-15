import { describe, expect, it, vi } from "vitest";
import { errorResponseSchema } from "@repo/contracts";
import { bindings, mockEmail, request, signUp, upload } from "./helpers";

describe("configuration validation", () => {
  it("rejects malformed variables by name without leaking values, but keeps health live", async () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => {});
    const overrides = { MIN_MOBILE_VERSION: "latest-secret-value" };
    const config = await request("/api/config", {}, overrides);
    expect(config.status).toBe(503);
    expect(errorResponseSchema.parse(await config.json()).error.code).toBe(
      "CONFIGURATION_INVALID",
    );
    const output = logged.mock.calls.flat().join("\n");
    expect(output).toContain("MIN_MOBILE_VERSION");
    expect(output).not.toContain("latest-secret-value");
    expect((await request("/api/health", {}, overrides)).status).toBe(200);
  });

  it("logs unexpected failures with the cause and route but redacts personal data", async () => {
    const user = await signUp(mockEmail());
    const logged = vi.spyOn(console, "error").mockImplementation(() => {});
    const bucket = new Proxy(bindings.FILES, {
      get(target, key) {
        if (key === "put")
          return async () => {
            throw new Error(`R2 refused upload for ${user.email}`);
          };
        const value = Reflect.get(target, key);
        return typeof value === "function" ? value.bind(target) : value;
      },
    });
    const response = await upload(user.token, "report.pdf", "%PDF-1.7\nx", {
      FILES: bucket,
    });
    expect(response.status).toBe(500);
    const output = logged.mock.calls.flat().join("\n");
    expect(output).toContain('"event":"request_failed"');
    expect(output).toContain("R2 refused upload for [email]");
    expect(output).toContain('"method":"POST"');
    expect(output).not.toContain(user.email);
  });
});
