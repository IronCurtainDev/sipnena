# Setup and deployment

## New MVP

1. Create a repository from this template and run `pnpm init:project <project-name> [domain]` (for example `pnpm init:project acme-notes acme.dev`). It renames the root package, Worker, D1 databases, and R2 buckets in `apps/api/wrangler.jsonc`, replaces `example.com`, and picks unused rate-limit namespace IDs. Use separate resources for each MVP and production/staging environment. Record the template version from `TEMPLATE_VERSION` so [upgrading](upgrading.md) knows where you started.
2. Install the Node version from `.nvmrc` and enable Corepack. Run `pnpm install --frozen-lockfile`, then `pnpm setup:local`.
3. The setup command creates ignored `apps/api/.dev.vars` from its example with a random auth secret, then applies local D1 migrations. Existing local configuration is preserved. Run `pnpm dev` and open `http://localhost:5173`.
4. Run `pnpm db:seed` to populate the local database only. It creates `admin@example.com` (admin), `support@example.com` (support), and `member@example.com` (user), plus the Acme Corporation organization. Those accounts use password `Password1234!`. The command refuses `--remote`.
5. Register, follow the verification link printed in the API terminal, or log into one of the seeded accounts. Local email preview requires no external email service. Configure real Google credentials only when testing Google sign-in.
6. Choose optional features using [customization](customizing.md). Run `pnpm check` and browser tests before your first release.

If you manually copied `.dev.vars.example`, replace `__GENERATE_SECRET__` yourself with a random secret of at least 32 characters. Never commit `.dev.vars` or real secrets.

## Configuration

Use `.dev.vars` locally. In production, put public configuration under `vars` in Wrangler and secrets in Cloudflare's secret store.

| Name                       | Purpose                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `ENVIRONMENT`              | `development` locally; `production` or `staging` when deployed                                                               |
| `API_KEY`                  | Public abuse-control identifier required in the `x-api-key` header for every `/api/*` request                                |
| `API_KEYS`                 | Optional comma-separated extra accepted keys, used to rotate `API_KEY` with an overlap; secret store                         |
| `VITE_API_KEY`             | Build-time copy of one accepted key for the web bundle; never use it for authorization                                       |
| `MIN_MOBILE_VERSION`       | Optional `major.minor.patch`; older mobile builds are told to update (see [API](api.md))                                     |
| `BETTER_AUTH_URL`          | Trusted web origin, e.g. `http://localhost:5173` or `https://app.example.com`                                                |
| `BETTER_AUTH_SECRET`       | Unique random secret of at least 32 characters; secret store only                                                            |
| `EMAIL_MODE`               | `preview` for local development; `resend` when deployed                                                                      |
| `EMAIL_FROM`               | Sender name/address verified for your Resend domain                                                                          |
| `RESEND_API_KEY`           | Resend secret; required for `resend` mode                                                                                    |
| `GOOGLE_CLIENT_ID`         | Google web OAuth client ID; configure together with its secret                                                               |
| `GOOGLE_CLIENT_SECRET`     | Google web OAuth secret; server only                                                                                         |
| `GOOGLE_MOBILE_CLIENT_IDS` | Optional comma-separated extra audiences for native ID tokens                                                                |
| `ENABLE_ORGANIZATIONS`     | `true` by default; `false` disables the plugin and organization UI                                                           |
| `ADMIN_EMAIL`              | Optional local-only email for the first development administrator                                                            |
| `ADMIN_PASSWORD`           | Optional local-only password for the first development administrator                                                         |
| `TURNSTILE_SECRET_KEY`     | Optional secret for routes that mount `turnstileMiddleware`. Empty skips the check in development and fails closed elsewhere |

Deployed Workers reject requests with a `CONFIGURATION_INVALID` error (and log the variable names) when a variable has an invalid format; `/api/health` keeps answering so the problem is visible.

After setting the local values, run `curl -X POST -H "x-api-key: $API_KEY" http://localhost:5173/api/dev/bootstrap-admin` once. This endpoint is development-only. Calling it again resets that local administrator's password to `ADMIN_PASSWORD`.

The browser bundle includes `VITE_API_KEY`, so treat this value as public and rotate it only as an abuse-control measure. Authentication and administrator authorization are always enforced independently by Better Auth. Native clients send the configured value together with their signed bearer token.

Local builds and browser tests use the demo key `dev-demo-api-key`. Deployments never ship it: `tools/deploy.mjs` refuses to run unless `VITE_API_KEY` is set to a non-demo value, then rebuilds the web bundle with it. In GitHub, set `VITE_API_KEY` as an environment **variable** (not secret) in the `staging` and `production` environments, matching a key in that environment's `API_KEY`/`API_KEYS` secrets. For a personal environment, export it before deploying: `VITE_API_KEY=... pnpm deploy:env dev-<name>`.

Bindings are `DB` (D1), `FILES` (R2), `AUTH_RATE_LIMITER`, `EMAIL_RATE_LIMITER`, and `UPLOAD_RATE_LIMITER`. Native rate-limit bindings do not need a KV namespace. Use distinct rate-limit namespace IDs for independent apps in the same account.

Production rejects email preview mode, missing required email/auth secrets, and incomplete Google configuration. Google can remain disabled by omitting both credentials; `/api/config` reports enabled capabilities without exposing secrets.

## Create the first production administrator

There is no production bootstrap endpoint. After a verified user has registered, identify the exact account and run a guarded D1 update from an authenticated operator environment:

```sh
pnpm --filter @repo/api exec wrangler d1 execute DB --remote --command \
  "SELECT id, email, role, banned FROM user WHERE lower(email) = lower('person@example.com') LIMIT 1"
```

Confirm the returned ID and email out of band, then assign the role by ID:

```sh
pnpm --filter @repo/api exec wrangler d1 execute DB --remote --command \
  "UPDATE user SET role = CASE WHEN role IS NULL OR role = '' THEN 'admin' ELSE role || ',admin' END, updated_at = cast(unixepoch('subsecond') * 1000 as integer) WHERE id = 'CONFIRMED_USER_ID' AND lower(email) = lower('person@example.com') AND banned = false"
```

Verify the update and sign in through the web app. Keep command output private. Do not remove the last administrator until another administrator has been verified. Admin operations remain authorization-protected and retain request IDs for support; never log credentials, cookies, bearer tokens, or email links.

## Release and recovery checklist

Before production deployment:

- Confirm the D1 database and R2 bucket are the intended production resources, the R2 bucket has no public URL, and a D1 recovery point/export exists.
- Confirm `API_KEY` (or `API_KEYS`), `BETTER_AUTH_SECRET`, and `RESEND_API_KEY` are Cloudflare secrets, and the GitHub `production` environment has the matching `VITE_API_KEY` variable; confirm production email delivery and the exact OAuth callback origin.
- Review pending migrations and compatibility with the currently deployed Worker. Apply migrations only when the new schema remains readable by the old Worker.
- Verify a production administrator exists, can access `/admin`, and a second administrator is available before removing the first.
- Run `pnpm check`, `pnpm test:e2e`, and `pnpm deploy:check`, then smoke-test health, sign-in, a private file upload/download/delete, and a protected SPA URL.

If deployment fails after migrations apply, do not edit or roll back an applied migration. Restore the previous Worker only if its code remains compatible with the new schema, otherwise fix forward with a corrective migration and inspect D1/R2 state before retrying storage operations.

## Google and email

Create a Google OAuth web client and register exactly these redirect patterns for the origins you use:

- Local: `http://localhost:5173/api/auth/callback/google`
- Production: `https://your-domain.example/api/auth/callback/google`

Set `BETTER_AUTH_URL` to the matching origin, without `/api/auth`. Add any required consent-screen test users. The mobile developer configures native clients and coordinates their token audiences with the backend owner. See [Google setup](https://better-auth.com/docs/authentication/google) and the [mobile handoff](mobile-handoff.md).

For real email, verify a sending domain in Resend, configure `EMAIL_FROM`, add `RESEND_API_KEY`, and set `EMAIL_MODE=resend`. Local preview intentionally prints sensitive links in the development terminal; never enable it on a shared production environment.

## Provision and deploy

### Environments

Each environment is a separate Wrangler environment in `apps/api/wrangler.jsonc` with its own Worker, D1 database, private R2 bucket, rate-limit namespaces, secrets, and hostname. Environments are not tied to branches:

| Environment                                | Hostname                         | Deployed by                                                           |
| ------------------------------------------ | -------------------------------- | --------------------------------------------------------------------- |
| `dev-<name>` (optional, one per developer) | `https://dev-<name>.example.com` | That developer, locally: `pnpm deploy:env dev-<name>` from any branch |
| `develop` (shared staging)                 | `https://develop.example.com`    | **Deploy staging** workflow on every push to `develop`                |
| production (root configuration)            | `https://app.example.com`        | Manual **Deploy** workflow from `main`                                |

`tools/deploy.mjs` accepts only `production`, `develop`, or a `dev-<name>` environment that exists in the Wrangler config. It refuses `develop` outside GitHub Actions, and it lists every placeholder or mismatched setting (resource IDs, `BETTER_AUTH_URL` versus `routes`, email settings, `ENVIRONMENT`) before touching Cloudflare. Non-production environments use `ENVIRONMENT: "staging"`, which behaves like production at runtime.

Replace `example.com` with the real domain in `apps/api/wrangler.jsonc`, then create the shared staging resources once:

```sh
pnpm --filter @repo/api exec wrangler d1 create <project>-develop
pnpm --filter @repo/api exec wrangler r2 bucket create <project>-develop-files
```

Put the returned D1 ID in `env.develop`, configure its custom domain, and create its secrets as in the checklist below. For GitHub Actions, configure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the `staging` and `production` GitHub environments. The Flutter developer's staging flavor should point at the `develop` hostname.

### Add a developer environment

The template commits no personal environments. Add yours under `env` in `apps/api/wrangler.jsonc` in your project:

1. Copy the `env.develop` block, rename it `dev-<name>`, and replace `develop` with `dev-<name>` in its Worker name, route, D1 and R2 names, and `BETTER_AUTH_URL`.
2. Give its three rate limiters unused `namespace_id` values: take the next free ten after `develop` (for example production `x01`-`x03`, develop `x11`-`x13`, then `x21`-`x23`).
3. Always keep the `routes` entry: an environment without its own routes inherits the production custom domain. `version_metadata` and the cron trigger are inherited; bindings and `vars` are not.
4. Create the resources and put the D1 ID in the block:

   ```sh
   pnpm --filter @repo/api exec wrangler d1 create <project>-dev-<name>
   pnpm --filter @repo/api exec wrangler r2 bucket create <project>-dev-<name>-files
   ```

5. Create secrets. Never reuse production values:

   ```sh
   for secret in API_KEY BETTER_AUTH_SECRET RESEND_API_KEY; do
     pnpm --filter @repo/api exec wrangler secret put "$secret" --env dev-<name>
   done
   ```

6. If Google sign-in is enabled, register `https://dev-<name>.example.com/api/auth/callback/google` (and the matching `develop`/production callbacks).

Use separate approved Resend senders or recipient restrictions for `dev-*` and `develop`; never enable preview email on a shared deployment.

### Day-to-day flow

```sh
git switch develop
git pull origin develop
git switch -c feature/my-change
# implement and commit changes
pnpm deploy:env dev-<name>
git push -u origin feature/my-change
```

After testing on your `dev-<name>` hostname, open a pull request into `develop`. A merge to `develop` runs the **Deploy staging** workflow and updates the `develop` hostname. After shared staging verification, open a pull request from `develop` into `main`; production is deployed manually from `main`.

Use only test accounts and approved test recipients in `dev-*` and `develop`. Never copy production data into either environment without sanitizing it first. Migrations are shared code but execute against the selected environment only; keep them additive and compatible with the currently deployed Worker. Deploying an older branch to your `dev-<name>` environment after a newer migration was applied there can leave the schema ahead of the code; recreate the D1 database if that happens.

Smoke-test each non-production deployment: registration and verification, login/logout, password reset, Google sign-in if enabled, private file upload/download/delete, cross-user authorization, and administrator access. Confirm the hostname, D1 database, and R2 bucket before investigating any data issue.

### Production

Run these commands from the repository root after choosing your actual resource names:

```sh
pnpm --filter @repo/api exec wrangler login
pnpm --filter @repo/api exec wrangler d1 create my-mvp
pnpm --filter @repo/api exec wrangler r2 bucket create my-mvp-files
```

Copy the returned D1 ID and chosen names into `apps/api/wrangler.jsonc`. Keep the R2 bucket private: do not enable a public `r2.dev` URL or public custom domain. Configure the Worker domain and production `vars` before deploying.

Create production secrets interactively:

```sh
pnpm --filter @repo/api exec wrangler secret put API_KEY
pnpm --filter @repo/api exec wrangler secret put BETTER_AUTH_SECRET
pnpm --filter @repo/api exec wrangler secret put RESEND_API_KEY
pnpm --filter @repo/api exec wrangler secret put GOOGLE_CLIENT_SECRET
```

Set the same `API_KEY` value as the `VITE_API_KEY` variable of the GitHub `production` environment. The last command is needed only when enabling Google. Put its public client ID in production `vars`. Generate a different auth secret from local development. Review the [CPU budget and costs](cloudflare-free-first.md) before enabling password sign-in on Workers Free.

```sh
pnpm check
pnpm exec playwright install chromium
pnpm test:e2e
pnpm deploy:check
```

`deploy:check` builds and runs Wrangler's dry-run without provisioning or publishing; add `--env <name>` to check another environment. Production deploys only from GitHub Actions: `tools/deploy.mjs` refuses to deploy production or `develop` from a laptop.

For GitHub deployment, set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets and the `VITE_API_KEY` variable in the repository's `production` environment. Give the token permissions needed for Worker deployment and secret-name inspection, D1 migrations and Time Travel, and the configured storage bindings. Runtime application secrets remain in Cloudflare. Run the manual **Deploy** workflow. It verifies code, contracts, build, and browser flows. It then rejects placeholder settings and missing secret names, rebuilds the web bundle with `VITE_API_KEY`, and records a D1 Time Travel bookmark (shown in the job summary). Only then does it apply migrations, deploy the Worker tagged with the commit, and smoke-test `/api/health`, `/api/config`, and `/`. No separate web deployment is needed.

The secret-name check does not verify secret values, Google credentials, or email deliverability; complete the credential-backed checks below before launch. Review migrations first; a failed deploy after migration does not roll the database back. Keep schema changes compatible with the previous Worker, and see [operations](operations.md#backup-and-recovery) for rollback and restore.

## Schema changes and validation

Application schema changes: edit the Drizzle schema, run `pnpm --filter @repo/api db:generate`, inspect SQL, then `pnpm --filter @repo/api db:migrate:local`. Auth/plugin schema changes: first run `pnpm --filter @repo/api auth:generate`, then generate and inspect the Drizzle migration. Never rewrite an applied migration or its generated metadata. The initial migration is intended for a fresh database; an older deployed scaffold needs its own migration path.

Run `pnpm openapi:generate` and commit both specs after API or auth-plugin changes. Run `pnpm check` for code, line-limit, contract, test, and build checks. Browser tests need Playwright Chromium; Linux CI also installs browser system dependencies. Flutter CI starts when its owner supplies the app and pinned SDK.

Before the first production launch, use real credentials to check Google callback/sign-in, delivery of verification/reset/invitation emails, expired or reused links, cookie login/logout, and native ID-token/bearer exchange. Upload/download/delete a file, confirm a second account cannot access it, and open a protected SPA URL directly. Review Workers CPU and D1 metrics during password sign-in. Automated Google/email mocks cannot validate provider setup or real deliverability.

For local development, set `API_KEY`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `apps/api/.dev.vars`, then run `curl -X POST -H "x-api-key: $API_KEY" http://localhost:8787/api/dev/bootstrap-admin` once. The endpoint is development-only and never changes an existing account. The admin dashboard lives at `/admin`; combined application and authentication Swagger UI is `/api/docs`; Hono Telescope is `/api/telescope` in local development only (it is not served when deployed) and requires signing in with an account that has `api-docs:view`, such as the admin. Every API request requires `x-api-key` except these browser tools; outside development `/api/docs` also requires a session with `api-docs:view`.
