import { describe, expect, it } from "vitest";
import { formatBytes, initials, slugify } from "./format";

describe("display formatting", () => {
  it.each([
    [0, "0 B"],
    [999, "999 B"],
    [1536, "1.5 KB"],
    [5 * 1024 * 1024, "5 MB"],
    [12 * 1024 * 1024, "12 MB"],
  ])("formats %d bytes as %s", (bytes, expected) => {
    expect(formatBytes(bytes)).toBe(expected);
  });

  it("uses a dash for impossible sizes", () => {
    expect(formatBytes(-1)).toBe("—");
    expect(formatBytes(Number.NaN)).toBe("—");
  });

  it("derives avatar initials from a name, then the email", () => {
    expect(initials("Ada Lovelace")).toBe("AL");
    expect(initials("ada")).toBe("A");
    expect(initials("", "grace.hopper@example.com")).toBe("GH");
    expect(initials(null)).toBe("?");
  });
});

describe("organization slugs", () => {
  it("produces values accepted by the slug pattern", () => {
    const pattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    for (const name of ["Acme Inc.", "  Café & Co  ", "Team—2026!", "a--b"]) {
      expect(slugify(name)).toMatch(pattern);
    }
    expect(slugify("Café & Co")).toBe("cafe-co");
  });

  it("stays within the 64 character limit without a trailing hyphen", () => {
    const slug = slugify(`${"a".repeat(63)} b`);
    expect(slug.length).toBeLessThanOrEqual(64);
    expect(slug.endsWith("-")).toBe(false);
  });

  it("returns an empty slug when nothing usable remains", () => {
    expect(slugify("!!!")).toBe("");
  });
});
