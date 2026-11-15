# Web and API security invariants

This is the operational contract for security-sensitive web and API changes.
Read it before changing authentication, admin routes, permissions, uploads, or
file cleanup. Client-visible messages may become more helpful, but the stable
error codes below must not be renamed or reused.

## Mutation policy

All custom `/api/v1` routers mount `authMiddleware` and `mutationGuard` at the
router boundary. Non-read requests follow these rules:

- `production` and `staging` require `emailVerified === true`.
- `development` permits an unverified account so local work does not depend on
  an email provider. Developers can still use a verified seeded account.
- Cookie-authenticated mutations require an `Origin` in Better Auth's trusted
  origin list in every environment.
- Signed bearer-token requests do not require `Origin`; native clients do not
  use browser cookies.

Never add a custom admin mutation without both guards.

## Auth middleware order

The order in `apps/api/src/app.ts` is a security invariant:

1. auth rate limit;
2. 64 KiB request-body limit;
3. authenticated session;
4. target-side super-admin protection;
5. atomic ban/unban and role-assignment permission checks;
6. D1 role synchronization and audit capture;
7. Better Auth handler.

Rate and size limits must run before anything clones or parses a body. Return
the normal application error envelope where our middleware handles the error.
Better Auth may return its native `{ message }` response after the request
passes application middleware; web clients intentionally understand both.

| Condition                             | HTTP | Stable code                  |
| ------------------------------------- | ---: | ---------------------------- |
| Auth rate limit                       |  429 | `RATE_LIMITED`               |
| Auth body over 64 KiB                 |  413 | `PAYLOAD_TOO_LARGE`          |
| Deployed account is unverified        |  403 | `EMAIL_NOT_VERIFIED`         |
| Cookie origin is not trusted          |  403 | `INVALID_ORIGIN`             |
| Target/permission boundary fails      |  403 | `FORBIDDEN`                  |
| Last active super-admin protection    |  409 | `ROLE_PROTECTED`             |
| Unsupported declared upload type      |  415 | `UNSUPPORTED_FILE_TYPE`      |
| Extension or bytes disagree with type |  415 | `FILE_CONTENT_INVALID`       |
| User storage/file quota reached       |  409 | `STORAGE_QUOTA_EXCEEDED`     |
| Account cleanup exceeds one request   |  503 | `ACCOUNT_CLEANUP_INCOMPLETE` |

Do not log request cookies, authorization headers, passwords, email links, or
raw auth/upload bodies.

## Super-admin recovery policy

`admin` is the super-admin role. A delegated administrator cannot change a
super-admin account even if they hold the corresponding `user:*` permission.
A super-admin cannot use admin tooling to change, ban, delete, impersonate, or
reset their own account. This prevents accidental self-lockout.

A different super-admin may disable or recover a super-admin account. Keep at
least two independently controlled super-admin accounts in production. During
a credential incident, the unaffected super-admin should ban the compromised
account, revoke its sessions, reset its password, and then unban it only after
the credential is secured. All actions remain in the admin audit log.

Access-removing changes to a super-admin are serialized with a five-minute D1
lease. The lease spans the active-super-admin count and Better Auth mutation,
so concurrent requests cannot both pass the last-admin check. A crashed Worker
can delay another such change until the lease expires but cannot permanently
lock it. Other admin actions do not acquire this lease.

If no unaffected super-admin can sign in, this is an operator incident, not an
HTTP authorization exception. Use the D1 backup/recovery procedure, preserve
an audit record, restore one known account, revoke sessions, and rotate exposed
credentials. Do not temporarily grant a delegated role authority over
super-admins.

## Roles and permissions

Every permission is one atomic `resource:action`. Role create, update, and
delete are separate permissions, as are user ban and unban. Better Auth uses
one internal ban statement for both endpoints, so route middleware enforces
the narrower application permission before its plugin check. Non-super-admin role editors may grant only
permissions they already hold. The `admin` role always receives all known
permissions in code, including permissions added after deployment.
Delegated role assignment follows the same subset rule: an actor cannot assign
a role containing permissions they do not hold.

## Upload and storage limits

Uploads are limited to 5 MiB each, 500 files per user, and 250 MiB per user.
The API verifies declared MIME type, filename extension, and leading file
signature before writing R2. Downloads are private attachments and use
`nosniff`. Quota checks can race across concurrent Worker requests by a small
amount; rate limiting bounds that race. Use a reservation design only if a
future product requires strict billing-grade quotas.

Account deletion removes at most 500 objects per request. If more remain, the
deletion is aborted with `ACCOUNT_CLEANUP_INCOMPLETE`; retry until it succeeds.
Objects are deleted before their D1 rows so retries remain possible.

## Orphan-object cleanup

Uploads store private R2 custom metadata containing a version, upload ID,
owner user ID, and uploader user ID. These are internal recovery identifiers;
never store names, email addresses, credentials, or tokens in object metadata.

Daily maintenance samples objects under `users/`. An object is eligible only
after it is one hour old. Before scanning, maintenance requires a successful D1
health query. It then checks the exact R2 object key against `files` twice, with
the second check immediately before deletion. Any D1 error aborts the run and
deletes nothing further. Cloudflare observability records the failed scheduled
invocation and the application emits `maintenance_failed` without database
error details.

This policy is suitable while the template is pre-production: successful D1
queries with no matching row identify an abandoned upload, while unavailable
or ambiguous D1 results always fail closed. Revisit retention and an admin
review queue before adopting different recovery requirements in production.

## Response headers

The React static asset responses already receive the CSP in
`apps/web/public/_headers`. API responses receive Hono secure headers and are
JSON or attachment responses. Do not add a second incompatible CSP to the API
glob; Swagger UI has different script/style requirements and is separately
permission-gated outside development.
