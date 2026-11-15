# HTTP API

React calls relative `/api` URLs on the same origin and uses Hono RPC for application data. Flutter uses HTTP and the generated contracts:

| Contract                      | Runtime document                         | Checked-in export              |
| ----------------------------- | ---------------------------------------- | ------------------------------ |
| Combined application and auth | `GET /api/openapi.json`                  | [app.json](openapi/app.json)   |
| Better Auth and organizations | `GET /api/auth/open-api/generate-schema` | [auth.json](openapi/auth.json) |

Run `pnpm openapi:generate` after route or auth-plugin changes. The main Swagger UI combines application and Better Auth paths; `auth.json` is the gateway-aware Better Auth export. `pnpm openapi:check` detects drift.

Most `/api/*` requests require `x-api-key`. Verification links and OAuth callbacks are narrowly exempt because top-level browser navigations cannot attach custom headers; Better Auth still validates their one-use token or OAuth state. The key is an abuse-control identifier, not a secret: browser builds necessarily expose it in JavaScript, and native clients must configure it separately. Private routes additionally require the current user's session cookie or signed bearer token, and operational tools require administrator authorization outside development. Possessing the API key never grants user or administrator access.

## Application endpoints

| Method | Path                        | Behavior                                                                   |
| ------ | --------------------------- | -------------------------------------------------------------------------- |
| GET    | `/api/health`               | Public health check without database work                                  |
| GET    | `/api/config`               | Public capabilities and mobile compatibility (see below)                   |
| GET    | `/api/docs`                 | Swagger UI for the combined application and auth OpenAPI                   |
| GET    | `/api/telescope`            | Hono Telescope dashboard, local only, needs a session with `api-docs:view` |
| GET    | `/api/v1/admin/files`       | Admin list of files across users, cursor paginated                         |
| GET    | `/api/v1/files`             | List only the current user's files                                         |
| POST   | `/api/v1/files`             | Upload one multipart `file`                                                |
| GET    | `/api/v1/files/:id/content` | Download an owned file as an attachment                                    |
| DELETE | `/api/v1/files/:id`         | Delete an owned file                                                       |

All private file routes require `x-api-key` plus a valid session. Browser sessions use the HttpOnly cookie; native clients send `Authorization: Bearer <access-token>` as described in the [mobile handoff](mobile-handoff.md). Cookie-authenticated browser mutations must come from the configured origin. Organizations never grant file access.

The admin dashboard is available at `/admin` after signing in with an administrator account. Local development can create one with the documented bootstrap command; production uses the guarded operator procedure in [setup](setup.md#create-the-first-production-administrator). Outside local development, `/api/docs` requires a session with the `api-docs:view` permission and `/api/telescope` is not served. Locally, `/api/telescope` opens in a browser tab without `x-api-key` but still requires a signed-in session with `api-docs:view` (admins have it).

### Versions and mobile compatibility

`GET /api/health` returns `version` (the application API major, `"1"` for `/api/v1`) and `deploymentId` (the Cloudflare Worker version, or `null` locally). `GET /api/config` returns:

```json
{
  "googleEnabled": false,
  "organizationsEnabled": true,
  "apiVersion": "1",
  "minSupportedMobileVersion": "1.4.0"
}
```

Mobile clients send `x-client-version: <major.minor.patch>` on every request and check `minSupportedMobileVersion` on launch. When the installed version is older, show a required-update screen instead of calling other endpoints. Operators set `MIN_MOBILE_VERSION` in `apps/api/wrangler.jsonc` vars; leave it unset (`null`) until a release must be forced. Raise it only after the replacement build is live in both stores.

### Pagination and uploads

`GET /api/v1/files?limit=20&cursor=...` returns:

```json
{
  "data": [
    {
      "id": "example-file-id",
      "name": "receipt.pdf",
      "contentType": "application/pdf",
      "size": 1234,
      "createdAt": "2026-10-02T10:00:00.000Z"
    }
  ],
  "meta": { "nextCursor": null }
}
```

Treat the cursor as opaque. Pass `meta.nextCursor` unchanged, URL-encoded, for the next request; stop at `null`. The default limit is 20 and the maximum is 50. There is no total count. Invalid limits/cursors produce validation errors.

Upload exactly one file, up to 5 MiB (5,242,880 bytes), with MIME type `image/jpeg`, `image/png`, `image/webp`, or `application/pdf`. The server also bounds the full multipart body before parsing. Let your HTTP library set the multipart boundary. Downloads are private attachments; no public R2 URL or upload URL is returned. Administrators can list, download, and delete files across all users through `/api/v1/admin/files`.

```sh
curl --fail-with-body \
  -H "x-api-key: $API_KEY" \
  -H "Authorization: Bearer $SESSION_TOKEN" \
  -F "file=@receipt.pdf;type=application/pdf" \
  https://your-app.example/api/v1/files
```

### Safe retries with Idempotency-Key

Mutating requests (`POST`, `PUT`, `PATCH`, `DELETE`) under `/api/v1/*` accept an optional `Idempotency-Key: <unique-key>` header (1–128 alphanumeric characters, dashes, or underscores). The key is stored for the signed-in user. A request without a session does not reserve a key; route authentication still applies.

- The first execution processes normally and saves the response for 24 hours when the body is at most 64 KiB.
- The same key, route, and body replay that response with `Idempotent-Replay: true` and `X-Idempotency-Key`.
- The same key with a different route or body returns 409 `IDEMPOTENCY_CONFLICT`.
- A second request while the first still holds its 60-second lease returns the same 409.
- A 5xx response or a thrown error removes the reservation so the client can retry. An expired lease can be taken over.
- Records are purged after they expire.

### Application errors

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "requestId": "request-id"
  }
}
```

Validation failures (`VALIDATION_ERROR`) also include `issues`, one entry per invalid field, for example `[{ "path": "limit", "message": "Too big: expected number to be <=50" }]`. Known codes are listed in `ERROR_CODES` in [packages/contracts](../packages/contracts/src/common/errors.ts) and in the OpenAPI `ErrorResponse` schema. Codes are append-only; clients must treat an unknown code as a generic failure rather than crashing.

Use the status and `error.code` for behavior; display `error.message` and retain `requestId` for support. Expect 400 for invalid input, 401 for a missing/expired session, 403 for forbidden operations, 404 for missing/inaccessible resources, 413 for oversized uploads, 415 for unsupported file types, and 429 when throttled. Do not repeatedly retry an upload or email request after a 429; respect `Retry-After` when present. Network/server errors should allow an explicit retry.

## Better Auth endpoints

Auth paths are under `/api/auth` and are included in the main Swagger UI. Login and registration require `x-api-key`; protected auth operations additionally accept the HttpOnly browser session cookie or `Authorization: Bearer <access-token>` for native clients. The React app uses Better Auth's client; native clients call the generated HTTP contract directly. Common paths:

| Method | Suffix                     | Purpose                                           |
| ------ | -------------------------- | ------------------------------------------------- |
| POST   | `/sign-up/email`           | Register a personal account and send verification |
| POST   | `/sign-in/email`           | Sign in after email verification                  |
| POST   | `/sign-in/social`          | Google redirect or native ID-token exchange       |
| POST   | `/send-verification-email` | Resend verification                               |
| GET    | `/get-session`             | Current user and session, or `null`               |
| POST   | `/update-user`             | Update the current profile                        |
| POST   | `/request-password-reset`  | Send a recovery link                              |
| POST   | `/reset-password`          | Consume the recovery token and choose a password  |
| POST   | `/sign-out`                | Revoke the current session                        |
| POST   | `/delete-user`             | Delete the account and all of its files           |

Sessions last 7 days (`session.expiresIn`) and are extended on use once they are a day old (`updateAge`); the bearer token stays the same. Native clients should call `/get-session` on launch and treat `null` or a 401 as signed out. `/delete-user` needs `{ "password": "..." }`, or a sign-in within the last day (`freshAge`) for accounts without a password. App stores require in-app account deletion, so mobile should expose it.

Verification and recovery links point at the deployed web origin. Native clients can use that web flow, then return to the app and sign in. See the auth export for required request fields and organization endpoints.

Better Auth returns its own success shapes and errors such as `{ "code": "...", "message": "..." }`. Do not assume application `data` or `error` wrappers. Gateway-level failures, including throttling and origin rejection, can still use the application error envelope; clients should tolerate both on auth paths.

Swagger documents the browser `Origin` and JSON headers for auth mutations. Use the cookie security scheme for browser sessions or the bearer security scheme for native clients.

Organization creation is optional and uses the built-in `owner`, `admin`, and `member` roles. The plugin enforces permissions and last-owner protection. The starting limits are five organizations per creator, 25 members per organization, and 20 pending invitations per organization. Invitations link to `/accept-invitation/:invitationId` and require the invited user to sign in. `ENABLE_ORGANIZATIONS=false` removes the organization plugin and hides web organization UI.

## Compatibility

Application changes inside `/api/v1` stay additive. Retain existing meanings, field names, and accepted inputs; add optional fields where possible. Use a new version when the change cannot be compatible. Both developers review mobile-facing changes, including changes caused by Better Auth upgrades. Never assume all installed mobile clients update with a deployment.

Pull requests run [oasdiff](https://github.com/oasdiff/oasdiff) against the base branch's `docs/openapi/app.json` and fail on breaking changes. Bump `OPENAPI_VERSION` in `apps/api/src/app.ts` (minor for additive changes) and add an [API change log](../API_CHANGELOG.md) entry. Named schemas (`File`, `FilesListResponse`, `ErrorResponse`, and so on) come from `.meta({ id })` in the contracts so OpenAPI generators produce stable type names.

Rotate the public API key without breaking installed apps: add the new key to the `API_KEYS` secret (comma-separated, alongside the old key), ship web and mobile builds with the new key, and remove the old key only after `MIN_MOBILE_VERSION` excludes builds that still use it.
