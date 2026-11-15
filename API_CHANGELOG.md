# API change log

Record changes here when a release changes `/api/v1`, Better Auth configuration, or a generated OpenAPI document used by Flutter.

Each entry should include:

- date and release/commit;
- endpoints, fields, or authentication behavior changed;
- compatibility impact for already-installed mobile clients;
- migration and rollout order, if applicable;
- the Hono/React and Flutter reviewers.

Application API changes remain additive. Removed fields, tightened validation, changed error meanings, and authentication changes require an explicit compatibility decision and a new API version when they cannot remain backward compatible.

## Unreleased (OpenAPI 1.4.0)

- Better Auth and its Drizzle adapter are aligned on `1.7.14`. Unexpected auth failures retain the existing redacted `{ code, message }` 5xx response instead of exposing internal errors; documented success and 4xx response shapes are unchanged.
- Role mutations now use atomic `role:create`, `role:update`, and `role:delete` permissions. Ban and unban are separate `user:ban` and `user:unban` actions. The legacy `role:manage` request value remains an input-only compatibility alias; migration `0006_atomic_role_permissions` expands stored permissions while retaining the legacy row for one rollback-compatible release.
- Custom admin routes enforce the normal mutation policy. Deployed environments require verified email; development may use unverified local accounts. Better Auth admin actions protect super-admin targets and self-lockout while allowing a second super-admin to recover a compromised account. Access-removing super-admin actions are serialized through the short D1 lease added by migration `0007_super_admin_mutation_lock`.
- Uploads validate extension and leading file signature in addition to MIME and size, and enforce 500-file/250 MiB per-user limits. New error codes: `FILE_CONTENT_INVALID`, `STORAGE_QUOTA_EXCEEDED`, and `ACCOUNT_CLEANUP_INCOMPLETE`.
- `AdminFile` and `AdminFilesListResponse` are now named shared schemas; existing response fields are unchanged.
- Mobile impact: existing valid uploads remain compatible, but clients must tolerate the new error codes and stricter rejection of mislabeled files. The Hono/React and Flutter developers must review before release.
- Rollout: apply migrations `0006_atomic_role_permissions` and `0007_super_admin_mutation_lock` before deploying the Worker. Migration `0006` remains compatible with the previous Worker; remove its retained `role:manage` rows only in a later release.

### Previously queued in this release

- Mutating `/api/v1/*` requests accept an optional `Idempotency-Key` header. The stored result is scoped to the signed-in user and the request hash. A different body, an in-flight lease, or a conflicting key returns 409 `IDEMPOTENCY_CONFLICT`. An invalid key returns 400 `INVALID_IDEMPOTENCY_KEY`.
- Optional Turnstile middleware can be mounted on a route. It skips verification in development when `TURNSTILE_SECRET_KEY` is unset and returns 503 `BOT_VERIFICATION_FAILED` in every other environment until the secret is set.
- New error codes: `INVALID_IDEMPOTENCY_KEY`, `IDEMPOTENCY_CONFLICT`, `BOT_VERIFICATION_FAILED`.
- `pnpm db:seed` loads local-only admin, support, and member accounts plus a sample organization. It does not run against a remote database.
- Mobile impact: none required. Mobile clients can send `Idempotency-Key` to retry a mutation without repeating it. Reviewers: Hono/React and Flutter developers.
- Rollout: apply migration `0005_idempotency_keys` before deploying the Worker.

## 2026-10-18 (OpenAPI 1.2.0)

- Added `/api/v1/access`: `GET /me` returns the signed-in user's `roles` and effective `permissions`. `GET /permissions` and `GET`/`POST /roles`, `PATCH`/`DELETE /roles/{id}` manage database-stored roles. New schemas: `Role`, `RoleResponse`, `RolesListResponse`, `Permission`, `PermissionsListResponse`, `MyAccessResponse`. Permission names in responses are plain strings, so clients must tolerate names added later.
- New error codes: `ROLE_NOT_FOUND`, `ROLE_NAME_TAKEN`, `ROLE_IN_USE`, `ROLE_PROTECTED` (409 except not-found).
- `/api/v1/admin/files` routes now require `file:list-any`, `file:download-any`, or `file:delete-any` instead of the `admin` role. `admin` still holds every permission, so existing admins see no change.
- Better Auth admin endpoints (`/api/auth/admin/*`) authorize per endpoint against roles stored in D1 instead of requiring `admin` for all of them. `set-role` and `create-user` reject unknown role names, users can no longer change their own roles, and only an `admin` can grant `admin`.
- Mobile impact: none required. Mobile can call `GET /api/v1/access/me` to hide actions the user cannot perform. Reviewers: Hono/React and Flutter developers.
- Rollout: apply migration `0004_roles` before deploying the Worker.

## 2026-10-05 (OpenAPI 1.1.0)

- Added `deploymentId` to `GET /api/health`, and `apiVersion` and `minSupportedMobileVersion` to `GET /api/config`. Additive; existing fields are unchanged.
- Validation errors now include an optional `error.issues[]` array of `{ path, message }`. Known error codes are published in the `ErrorResponse` schema.
- OpenAPI schemas are named (`File`, `FileResponse`, `FilesListResponse`, `PaginationMeta`, `ErrorResponse`, `ValidationIssue`, `HealthResponse`, `ConfigResponse`); paths and payloads are unchanged.
- The gateway accepts any key in the new `API_KEYS` secret, so the public key can be rotated with an overlap. `API_KEY` still works.
- `/api/telescope` is now local-development only.
- `GET /api/v1/admin/files` accepts `limit`/`cursor` and returns `meta.nextCursor` (web admin only). It now returns 20 files by default instead of 100.
- Better Auth: `POST /api/auth/delete-user` is enabled and deletes the user's files first. Session lifetimes are now explicit (7 days, refreshed daily), matching the previous defaults. Admin remove-user now succeeds for users who own files.
- Mobile impact: none required. Mobile should start sending `x-client-version` and honoring `minSupportedMobileVersion`.

## 2026-10-04

- Documented that `API_KEY` is a public abuse-control identifier, not authorization.
- Added the guarded production administrator bootstrap procedure and release/recovery checklist.
