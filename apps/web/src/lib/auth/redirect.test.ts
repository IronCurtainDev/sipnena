import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { safeRedirect, searchParam } from "./redirect";

beforeEach(() => {
  vi.stubGlobal("window", {
    location: {
      origin: "https://app.example",
      search: "?redirect=%2Ffiles&token=a%2Bb",
    },
  });
});
afterEach(() => vi.unstubAllGlobals());

describe("authentication return paths", () => {
  it("preserves local destinations, query strings, and fragments", () => {
    expect(safeRedirect("/files?filter=recent#uploads")).toBe(
      "/files?filter=recent#uploads",
    );
    expect(safeRedirect("/accept-invitation/example")).toBe(
      "/accept-invitation/example",
    );
  });

  it.each([
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "/\nevil.example",
    "/api",
    "/api/auth/sign-out",
    "/files/../api/auth/sign-out",
    "javascript:alert(1)",
    undefined,
  ])("rejects external, invalid, or API destinations: %s", (destination) => {
    expect(safeRedirect(destination)).toBe("/account");
  });

  it("reads encoded tokens without modifying their value", () => {
    expect(searchParam("redirect")).toBe("/files");
    expect(searchParam("token")).toBe("a+b");
    expect(searchParam("missing")).toBe("");
  });
});
