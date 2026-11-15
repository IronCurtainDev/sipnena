# Template change log

Changes to the template itself, for projects created from it. The current version is in `TEMPLATE_VERSION`; see [upgrading](docs/upgrading.md) for how to pull a release into a project. HTTP and mobile-facing changes are also recorded in [API_CHANGELOG.md](API_CHANGELOG.md).

Each entry lists what a project must do by hand (secrets, variables, Cloudflare resources, migrations) under **Action needed**.

## Unreleased

### Roles and permissions

- Roles are stored in D1 and managed from **Admin → Roles**. Each role grants named permissions from `packages/contracts/src/access/permissions.ts`, and users can hold several roles. See [roles and permissions](docs/customizing.md#roles-and-permissions).
- Seeded roles: `admin` (every permission, including future ones), `user` (none), and `support` (view users, sessions, and all files; download files).
- API routes use `requirePermission(...)` instead of `adminMiddleware`, which was removed along with `isAdminSession` and `adminOrDevelopmentMiddleware` (now `permissionOrDevelopment("api-docs:view")`). Better Auth admin endpoints authorize against the stored roles.
- Users cannot change their own roles, and only an `admin` can grant `admin`.
- In local development the admin dashboard links to Hono Telescope. `/api/telescope` opens in a browser tab without the `x-api-key` header but now requires a signed-in session with `api-docs:view`; logged-out visitors get 401. Deployed Workers still do not serve it.
- New `/api/v1/access` endpoints (OpenAPI 1.2.0). The web app reads `GET /api/v1/access/me` through `useAccess()` to show only the admin tabs and actions a user may use. The create-user and change-role dialogs pick from the stored roles.

### Web UI

- The web app uses shadcn/ui (Radix primitives, Tailwind v4, `lucide-react` icons) instead of the hand-written global stylesheet. Theme tokens live in `apps/web/src/styles/global.css`, and generated components live in `apps/web/src/components/ui`.
- Signed-in pages share a sidebar layout with a mobile drawer and a user menu. Sign-out moved into that menu. Navigation is registered in `apps/web/src/components/layout/nav-items.ts`.
- Light, dark, and system themes. `public/theme-init.js` applies the saved theme before first paint without relaxing the CSP.
- The static-asset CSP adds `style-src-elem 'self' 'unsafe-inline'` so Radix dialogs and drawers can inject their scroll-lock `<style>` element. Inline scripts and `style` attributes stay blocked.
- Routes are grouped under pathless `auth` and `app` layout routes in `apps/web/src/router.tsx`. Route IDs for signed-in pages gained an `/app` prefix (for example `useParams({ from: "/app/organizations/$organizationId" })`).
- Redesigned screens:
  - Auth pages have a split brand layout, a password visibility toggle, and a resend cooldown on email verification.
  - Account gains a one-click password reset email.
  - Files gains a drag-and-drop upload with client-side checks shared with the contracts.
  - Admin moves to tabs with user and file tables and dialogs.
  - Organizations use a card grid, and the create dialog generates the slug from the name.
  - Destructive actions confirm in accessible dialogs instead of `window.confirm`.
- No HTTP or contract changes beyond the roles endpoints above.

### Action needed

- Apply migration `0004_roles` before deploying the Worker (`pnpm --filter @repo/api db:migrate:local` locally; deploys run migrations first). It creates the `role` and `role_permission` tables and seeds the three roles. Existing `admin` and `user` assignments keep working unchanged.
- Code that imported `adminMiddleware`, `adminOrDevelopmentMiddleware`, or `isAdminSession` must switch to `requirePermission(...)` or `permissionOrDevelopment(...)`. Web code that used `isAdmin()` from `apps/web/src/lib/auth/roles.ts` should use `useAccess().can(...)`.

- Projects that customized web screens should merge carefully. The legacy CSS classes (`.panel`, `.row`, `.notice`, `.admin-*`, and so on) were removed, and `Field`/`Feedback` moved from `components/ui` to `components/app`.
- Browser tests that signed out with the header button or accepted `window.confirm` need the updated interactions shown in `tests/e2e/foundation.spec.ts`.

## 1.0.0 - 2026-10-05

First versioned release. Projects created earlier should treat it as a large merge and read every **Action needed** item.

### Security and deployment

- Deployed web bundles no longer fall back to the demo API key. `tools/deploy.mjs` requires `VITE_API_KEY`, rebuilds the web app with it, records a D1 Time Travel bookmark before migrations, tags the deploy with the commit, and smoke-tests `/api/health`, `/api/config`, and `/`.
- Production and `develop` deploy only from GitHub Actions; `pnpm deploy:production` was removed.
- Static assets get security headers (CSP, HSTS, `frame-ancestors 'none'`) from `apps/web/public/_headers`.
- Hono Telescope runs in local development only. Dependency audit and secret scanning now fail CI.
- An `INVALID_API_KEY` response shows a configuration error instead of looping through sign-out.

### Contracts

- `/api/config` reports `apiVersion` and `minSupportedMobileVersion`; `/api/health` reports the deployment ID.
- `API_KEYS` allows rotating the public key with an overlap.
- Errors use a published code enum, and validation errors include `issues[]`. OpenAPI schemas are named for client generators.
- CI runs `oasdiff` and flags breaking changes to `docs/openapi/app.json`.

### Operations and data lifecycle

- Error and Better Auth logs are structured with request IDs and never include messages that could carry tokens. Configuration is validated once per isolate.
- `pnpm check` detects Drizzle and Better Auth schema drift; a test upgrades a seeded database through the latest migration.
- Account deletion works for users who own files (self-service and admin), removing their R2 objects first. The web account page has a delete-account section.
- A daily cron purges expired sessions and verification tokens and removes orphaned R2 objects.
- Admin actions are written to a new `admin_audit` table. Admin file listing is paginated.
- Email delivery has a timeout and an idempotency key. Session lifetimes are explicit.
- `docs/operations.md` covers rollback, Time Travel restore, exports, secret rotation, and an incident checklist.

### Toolchain

- Node 24 LTS, pnpm 12, Vite 8, ESLint 10 with type-aware rules and React hooks rules. TypeScript stays on 5.9 and Vitest on 4.1 for now; see [upgrading](docs/upgrading.md#held-major-versions).
- `pnpm check` runs Prettier and lints `tools/` and `tests/e2e`.
- GitHub Actions are pinned by commit SHA. Dependabot runs weekly against `develop` and covers Flutter `pub` packages.
- Admin and organization routes are lazy-loaded, and protected routes redirect before rendering.
- Browser tests no longer inherit the production route, which made `wrangler dev` rewrite every request to the production hostname and fail Better Auth's origin check.
- `pnpm init:project` renames template resources for a new project. The committed personal `dev-aloka` environment was removed.

### Action needed

- Set the `VITE_API_KEY` variable in the GitHub `staging` and `production` environments to a key accepted by that environment's `API_KEY`/`API_KEYS` secret.
- Add D1 Time Travel permission to the Cloudflare API token used by the deploy workflows.
- Apply migration `0003_admin_audit` (the deploy workflow does this). If your project already has its own `0003`, follow [migration numbering](docs/upgrading.md#migration-numbering).
- Use Node 24.21 and pnpm 12.9 locally (`corepack enable` picks up pnpm from `package.json`).
- If you used the `dev-aloka` environment, recreate your own as described in [setup](docs/setup.md#add-a-developer-environment).
