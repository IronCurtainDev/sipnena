# Architecture

Security-sensitive implementation and recovery rules are documented in
[Web and API security invariants](security.md). Edge dependency choices follow
[ADR 004](decisions/004-edge-native-security.md).

## One deployment, two clients

```text
React browser ─┐                       ┌─ D1: auth + application tables
              ├─ /api/* ─ Hono Worker ├─ R2: private personal files
Flutter app ──┘                       └─ Resend: transactional email

React HTML/CSS/JS ─ Workers Static Assets (same deployed origin)
```

Cloudflare serves React assets directly, including SPA navigation fallback. `assets.run_worker_first` routes `/api/*` through Hono, including OAuth callbacks and API URLs opened in a browser. Static assets are public; API authorization protects data. React and API keep separate source and build tasks; the root deployment command packages both. See [Cloudflare routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/).

## Feature boundaries

| Location                      | Responsibility                                         |
| ----------------------------- | ------------------------------------------------------ |
| `apps/api/src/modules`        | Feature routes, queries, and coordination where needed |
| `apps/api/src/db`             | D1 connection and schema                               |
| `apps/api/drizzle/migrations` | Reviewed SQL migrations and generated metadata         |
| `apps/web/src/features`       | Feature UI, queries, and mutations                     |
| `apps/web/src/routes`         | Small page composition and navigation                  |
| `apps/web/src/components`     | shadcn/ui primitives, app building blocks, and layouts |
| `packages/contracts`          | Application Zod inputs, outputs, and inferred types    |
| `packages/api-client`         | Hono RPC factory for React                             |
| `apps/mobile`                 | Flutter developer's app and toolchain                  |

Start a feature with routes and plain query functions. Add a service when one operation coordinates meaningful work, such as R2 storage plus D1 metadata. Do not require a repository/service/controller chain, a class for forwarding calls, or empty hook files.

Pages/screens have a 200-line limit; other handwritten TypeScript and Dart files have a 300-line limit, including tests. Physical lines count. Generated code, migrations, lockfiles, and documentation are excluded. Split by responsibility; keep readable formatting. Avoid tiny files that only forward arguments.

## Authentication and data

Better Auth owns users, sessions, credentials, email verification, Google sign-in, organizations, members, and invitations. Extend its configuration and plugins instead of maintaining a second auth implementation. React uses HttpOnly cookies. Flutter uses the signed bearer token returned in `set-auth-token`; browser storage is not the session store.

Application roles are stored in D1 (`role`, `role_permission`); the permission catalog lives in `packages/contracts/src/access/permissions.ts`. Hono routes check permissions with `requirePermission`, and Better Auth's admin plugin authorizes `/api/auth/admin/*` against the same roles. The `admin` role always holds every permission. Organization roles (owner, admin, member) are separate and stay with the organization plugin. See [roles and permissions](customizing.md#roles-and-permissions).

Organizations are optional. A personal account can upload files without joining one. The initial file model is user-owned; organization membership never grants access to another user's files. Adding shared files later needs an explicit permission model and migration.

D1 uses Drizzle with indexed queries. Application lists request `limit + 1` rows to produce a cursor, with a default of 20 and maximum of 50. Avoid routine counts, background polling, per-request counters, and unnecessary session writes. Better Auth endpoints retain their own documented shapes and pagination.

D1 interactive transactions are disabled in the auth adapter. Multi-step auth operations can fail partway; see [recovery](operations.md). A short D1 lease serializes the rare super-admin access-removal path across Workers. File upload compensates storage if metadata insertion fails and stores private internal ownership identifiers in R2 for recovery. Scheduled orphan cleanup fails closed on every D1 error and confirms a missing row twice. Deletion removes the R2 object before metadata so a failed database delete remains retryable.

## Change safely

The Hono/React developer owns backend, web, contracts, migrations, and deployment. The Flutter developer owns mobile structure and dependencies. Both review mobile-facing contract changes. Keep `/api/v1` changes additive; deployed mobile versions outlive a web deployment.

Use the current schema and checked-in initial migration for a new database. Once an MVP has deployed data, append migrations instead of rewriting history. Review SQL, test from an empty database and the previous schema, and deploy compatible migrations before application code.

One Worker, one D1 database, and one private R2 bucket are enough to start each MVP. Add queues, caches, search services, or separate deployments when measured product needs justify their maintenance and cost.
