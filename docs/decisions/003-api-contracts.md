# 003: Contracts for React and Flutter

Application request/response schemas live in `packages/contracts`. Hono validates these schemas and generates application OpenAPI. React uses the Hono RPC client; Flutter consumes HTTP and the exported OpenAPI document, since it cannot import TypeScript types.

Better Auth owns authentication and organization endpoints and generates a separate OpenAPI document. Keep its response shapes and use its React client. Do not wrap these endpoints in a competing application auth API.

Both developers review changes that affect mobile. Keep `/api/v1` additive and regenerate both specifications with `pnpm openapi:generate`; CI checks for drift.
