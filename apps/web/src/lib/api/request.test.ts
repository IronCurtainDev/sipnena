import { describe, expect, it } from "vitest";
import { requestSignal } from "./request";

describe("web request deadlines", () => {
  it("combines caller cancellation with the request deadline", () => {
    const caller = new AbortController();
    const combined = requestSignal(caller.signal, 60_000);
    expect(combined).not.toBe(caller.signal);
    expect(combined.aborted).toBe(false);
    caller.abort();
    expect(combined.aborted).toBe(true);
  });
});
