# Reuse for the next MVP

Start from the working template, rename it with `pnpm init:project <name> [domain]`, and remove product features you do not need. Keep changes local to feature folders and regenerate contracts after changing the HTTP surface.

## Add a feature

1. Define application input/output Zod schemas in `packages/contracts`.
2. Add an indexed Drizzle table and reviewed migration when data is needed.
3. Add Hono OpenAPI routes and plain queries in a feature folder. Add a service only for meaningful coordination.
4. Add React feature components and queries; keep route pages focused on composition. Give the mobile developer both updated OpenAPI artifacts and compatibility notes.
5. Test authorization, persistence, failures, and the changed user flow. Run `pnpm check` and the relevant browser tests.

Use `/api/v1` for application endpoints. Do not add a second user/auth service around Better Auth. Share types that represent a real contract, not every internal helper.

## Customize the web UI

The web app uses [shadcn/ui](https://ui.shadcn.com) components (Radix primitives on Tailwind v4) with `lucide-react` icons.

| Change                    | Where                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product name and tagline  | `apps/web/src/lib/brand.ts` (also update `<title>` in `apps/web/index.html` and `appName` in `apps/api/src/auth/auth.ts`)                               |
| Colors, radius, font      | CSS variables in `apps/web/src/styles/global.css` (`:root` for light, `.dark` for dark). `--brand` is the accent color                                  |
| Sidebar and mobile menu   | Add one entry to `apps/web/src/components/layout/nav-items.ts`; `visible` hides it by permission or capability                                          |
| New signed-in page        | `appPage("/path", Page)` in `apps/web/src/router.tsx`. It gets the sidebar shell and the session check                                                  |
| New signed-out page       | `authPage("/path", Page)` in `apps/web/src/router.tsx`. It gets the centered auth layout                                                                |
| New UI primitive          | From `apps/web`, run `pnpm dlx shadcn@latest add <name>`, then `pnpm format`. Files land in `src/components/ui`; keep each one under the 300-line limit |
| App-level building blocks | `apps/web/src/components/app`: `PageHeader`, `EmptyState`, `ConfirmDialog`, `Field`/`SelectField`, `Feedback`                                           |

Build pages from `PageHeader` plus cards or lists, give every list a loading skeleton and an `EmptyState`, and confirm destructive actions with `ConfirmDialog`. The CSP in `apps/web/public/_headers` blocks inline scripts and `style` attributes, so put any pre-paint script in `public/` as a file. It allows injected `<style>` elements (`style-src-elem`) only because Radix scroll locking needs them.

## Roles and permissions

Permissions are defined in code; which role holds which permission is stored in D1 and managed from **Admin → Roles**. Users can hold several roles (Better Auth stores them comma-separated in `user.role`), and their permissions combine. Migration `0004_roles` seeds three roles:

| Role      | Permissions                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------- |
| `admin`   | Every permission, including ones added later. Its permissions are not stored and cannot be edited    |
| `user`    | None. The default for new accounts                                                                   |
| `support` | View users, user details, sessions, and every user's files; download files. Can be edited or deleted |

`admin` and `user` are system roles and cannot be deleted. A role still assigned to a user cannot be deleted either.

### Single responsibility rule for permissions

Every permission assigned to a role must do exactly one thing:

- **Atomic and granular**: One permission corresponds to one discrete operation (e.g. `user:create`, `file:delete-any`).
- **No compound permissions**: Never introduce grouped actions such as `manage`, `admin`, or `crud` that bundle create, update, and delete together.
- **Separation of concerns**: Separate read operations (`:list`, `:get`) from write operations (`:create`, `:update`, `:delete`), and isolate sensitive state transitions (such as `:ban` or `:set-password`).

To protect something new:

1. Append a single-responsibility `"resource:action"` entry to `PERMISSIONS` in `packages/contracts/src/access/permissions.ts`. Never rename a shipped permission, because stored roles refer to it by name.
2. Guard the route with `requirePermission("resource:action")` (or `requireAnyPermission(...)`) from `apps/api/src/middleware/auth.middleware.ts`. For `createRoute`, write it inline as `middleware: [requirePermission("resource:action")] as const`.
3. In React, read `useAccess()` from `apps/web/src/features/access/use-access.ts` and render the control only when `can("resource:action")` is true. The server check is the one that matters; hiding UI is a convenience.
4. Grant the permission to a role from **Admin → Roles**. `admin` has it immediately.

Better Auth's admin endpoints (`/api/auth/admin/*`) check the `user:*` and `session:*` permissions, synced from D1 on each admin request. Target-side super-admin protections and self-lockout rules apply on top. Application middleware separates `user:ban` from `user:unban` even though Better Auth uses one internal statement. Treat `role:create`, `role:update`, `role:delete`, `user:set-role`, `user:set-password`, and `user:impersonate` as powerful. A non-super-admin role editor can grant only permissions they already hold. See [the security invariants](security.md).

## Optional features

| Need                       | Smallest change                                                                                                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Personal app without teams | Set `ENABLE_ORGANIZATIONS=false`; organization plugin routes and web UI are disabled                                                                                                                                 |
| Email/password only        | Omit both Google credentials; capability discovery hides Google sign-in                                                                                                                                              |
| No files                   | Remove file routes/feature UI, shared file contracts, related tests, the `FILES` binding, and upload limiter; then remove the file schema with a reviewed migration                                                  |
| No mobile app              | Delete `apps/mobile`, `.github/workflows/mobile.yml`, and the `pub` Dependabot entry; keep `/api/v1` and the OpenAPI artifacts for a later client                                                                    |
| Bot challenge on one route | Mount `turnstileMiddleware` from `apps/api/src/middleware/turnstile.middleware.ts` on that route and set `TURNSTILE_SECRET_KEY`. Development skips the check when the secret is empty; other environments return 503 |
| Signed provider webhook    | Add a route that reads the raw body, verifies the provider signature, and performs the real write. Do not acknowledge events you do not handle                                                                       |

Disabling organizations preserves existing organization tables/data. For a fresh MVP that should have no organization schema at all, remove that plugin from both runtime and auth-generation configuration, regenerate the auth schema and initial database migration before any deployment, and remove unused organization client/UI code. After data exists, keep history and use reviewed forward migrations.

Removing files affects the capability and authorization surfaces, so update navigation, OpenAPI generation inputs, tests, and docs together. Existing stored objects need a deliberate retention/export decision before dropping file metadata; do not remove only the R2 binding and leave broken routes.

Email delivery remains required for email/password verification and recovery even when organizations are disabled. Passwordless, social-only, billing, and organization-owned files are later product choices rather than half-configured starter features. The starter includes an admin dashboard, database-managed roles, and a bootstrapped admin account; replace the default credentials before using the template for a real product.

## Update dependencies

Dependencies and toolchains are pinned where required for reproducibility, with the lockfile committed, and GitHub Actions are pinned by commit SHA. Dependabot opens weekly pull requests into `develop`: grouped minor/patch npm runtime and tooling updates, GitHub Actions updates, and Flutter `pub` updates for the mobile owner. Take one major version per pull request; [upgrading](upgrading.md) lists majors deliberately held back. Review security updates promptly.

For Better Auth updates, inspect generated schema and both HTTP contracts, then test cookie and signed-bearer sessions, Google token exchange, email links, and organization permissions. Coordinate behavior changes with the Flutter developer. For Wrangler/runtime updates, run the Worker integration tests and deployment dry-run.

Do not replace a familiar working stack just because a newer framework appears. Add infrastructure or abstraction when a concrete feature or measured bottleneck warrants it.
