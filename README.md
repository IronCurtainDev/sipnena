# React + Hono + Flutter MVP template

A small foundation for a two-developer team: React and Hono deploy together on Cloudflare Workers, with D1 for data and private R2 files. Flutter has its own owner and consumes the same HTTP API.

Included: verified email/password and Google sign-in, password recovery, profile settings, optional organizations and invitations, personal file uploads, and an admin dashboard. No organization is required to use the app.

## Start locally

Use the Node version in `.nvmrc` and pnpm version in `package.json`.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm setup:local
pnpm dev
```

Open `http://localhost:5173`. Vite proxies `/api` to the local Worker on port 8787. D1 and R2 run locally; email preview prints verification, recovery, and invitation links in the API terminal. Local preview needs no Resend account. Google sign-in needs real OAuth credentials; other local features work without them.

`setup:local` creates `.dev.vars` with a unique `BETTER_AUTH_SECRET` and preserves an existing file. See [setup and deployment](docs/setup.md) for production secrets, Google configuration, migrations, and first-launch checks.

For local development, set `API_KEY`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `apps/api/.dev.vars`, then run `curl -X POST -H "x-api-key: $API_KEY" http://localhost:8787/api/dev/bootstrap-admin` once to create the administrator.

After signing in, open `/admin` for user and file management. Combined application and authentication Swagger UI is at `/api/docs` (open locally, admin-only when deployed). Hono Telescope is at `/api/telescope` in local development only.

## Everyday commands

| Command                      | Purpose                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `pnpm init:project <name>`   | Rename template resources for a new project (once, see [setup](docs/setup.md))      |
| `pnpm dev`                   | Run the API and React development servers                                           |
| `pnpm check`                 | Run the repository's code, contract, and test checks                                |
| `pnpm test:e2e`              | Run browser smoke tests                                                             |
| `pnpm check:lines`           | Enforce 200-line pages/screens and 300-line source files                            |
| `pnpm openapi:generate`      | Refresh the checked-in application and auth specifications                          |
| `pnpm openapi:check`         | Detect specification drift                                                          |
| `pnpm check:hono`            | Check current vs latest Hono ecosystem versions and supply-chain age                |
| `pnpm upgrade:hono`          | Safely upgrade Hono across monorepo with security gates & rollback                  |
| `pnpm deploy:check`          | Build and validate the Worker/assets deployment locally (`--env <name>` for others) |
| `pnpm deploy:env dev-<name>` | Check, migrate, and deploy to your personal environment                             |

Staging and production deploy only from GitHub Actions. Production deployment needs your Cloudflare resources and secrets. The template does not create accounts or provision production resources. `API_KEY`/`VITE_API_KEY` is a public abuse-control identifier because browser JavaScript exposes it; Better Auth sessions and administrator roles remain the real authorization boundary. See [production admin and release recovery](docs/setup.md#create-the-first-production-administrator).

## Branch workflow

Use the permanent branches `develop` and `main`:

```text
feature/* or fix/* or chore/* → develop → staging → main → production
```

Create short-lived branches from `develop`:

```sh
git switch develop
git pull origin develop
git switch -c feature/my-change
# implement and commit changes
pnpm deploy:env dev-<name>   # optional: test on your personal Cloudflare environment
git push -u origin feature/my-change
```

Open a pull request into `develop`. Changes merged into `develop` are checked and deployed to Cloudflare staging by the **Deploy staging** workflow; staging is never deployed from a laptop. After staging verification, open a pull request from `develop` into `main`. Production deployment is a manual GitHub Actions workflow run from `main`. Use `fix/<short-description>` for bug fixes and `chore/<short-description>` for maintenance.

Protect both branches in GitHub. Require pull requests and the CI status check for `develop`; require pull requests, the CI status check, one reviewer, and no direct pushes for `main`. The repository administrator must configure these rules in GitHub branch settings.

## Work together

| Area                                                                | Owner                  |
| ------------------------------------------------------------------- | ---------------------- |
| `apps/api`, `apps/web`, shared packages, migrations, deployment     | Hono/React developer   |
| `apps/mobile`, Flutter dependencies and SDK, mobile release process | Flutter developer      |
| HTTP changes affecting installed mobile apps                        | Both developers review |

Read [architecture](docs/architecture.md) when adding a feature, [API contracts](docs/api.md) when connecting a client, and the [mobile handoff](docs/mobile-handoff.md) before connecting Flutter. [Upgrading](docs/upgrading.md) explains how to pull later template changes into a project. [AGENTS.md](AGENTS.md) and the scoped [Cursor rules](.cursor/rules) keep automated edits consistent with this workflow.

Keep new MVPs small: [remove unused features](docs/customizing.md) before launch. [Operating costs](docs/cloudflare-free-first.md) explains the Free allowances and why password authentication can require Workers Paid even at low traffic.
