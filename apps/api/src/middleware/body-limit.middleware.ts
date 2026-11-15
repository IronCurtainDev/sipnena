import { createMiddleware } from "hono/factory";
import { AppError } from "../lib/errors";
import type { AppEnv } from "../types/context";

export function boundedBody(maxBytes: number) {
  return createMiddleware<AppEnv>(async (c, next) => {
    const declaredSize = Number(c.req.header("content-length"));
    if (declaredSize > maxBytes) {
      throw new AppError("PAYLOAD_TOO_LARGE", "Request body is too large", 413);
    }
    const body = c.req.raw.body as ReadableStream<Uint8Array> | null;
    const reader = body?.getReader();
    if (!reader) return next();
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        throw new AppError(
          "PAYLOAD_TOO_LARGE",
          "Request body is too large",
          413,
        );
      }
      chunks.push(value);
    }
    const buffered = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      buffered.set(chunk, offset);
      offset += chunk.byteLength;
    }
    c.req.raw = new Request(c.req.raw, { body: buffered });
    await next();
  });
}
