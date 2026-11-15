# Upgrading from the template

Projects keep the template's history, so later template releases arrive as an ordinary Git merge. `TEMPLATE_VERSION` records the release a project last merged, and [CHANGELOG.md](../CHANGELOG.md) lists each release with the manual steps it needs.

## Pull a template release

Once per clone, add the template as a second remote:

```sh
git remote add template https://github.com/IronCurtainDev/react-hono-flutter-template.git
```

For each upgrade, work on a branch from `develop` like any other change:

```sh
git switch develop && git pull origin develop
git switch -c chore/template-<version>
git fetch template
git log --oneline HEAD..template/main   # what is incoming
git merge template/main
```

Read every changelog entry newer than your `TEMPLATE_VERSION` before resolving conflicts, and do its **Action needed** items. Expect conflicts in files you have customized, such as `apps/api/wrangler.jsonc`, the root `package.json`, and `README.md`. Keep your project's names, hostnames, database IDs, and rate-limit namespace IDs in `wrangler.jsonc`, and take the template's new keys. Resolve `pnpm-lock.yaml` by taking either side and running `pnpm install` to rebuild it.

Then run the same checks as any release: `pnpm install`, `pnpm check`, `pnpm test:e2e`, and `pnpm deploy:check`. Regenerate OpenAPI with `pnpm openapi:generate` if the merge changed routes or Better Auth plugins, and review mobile-facing changes with the Flutter developer. Open the pull request into `develop` so staging runs the migrations before production.

If a project has diverged too far for a merge, cherry-pick individual template commits (`git cherry-pick <sha>`) instead, still in changelog order.

## Migration numbering

Drizzle numbers migrations in `apps/api/drizzle/migrations` sequentially, and D1 records applied migrations by file name. A template migration can arrive with a number your project already used, for example the template's `0003_admin_audit.sql` next to your own `0003_invoices.sql`.

Never renumber, rename, or edit a migration that has run on any shared database (develop, production, or a teammate's personal environment). For an incoming template migration that your databases have not applied:

1. Merge the template's schema files under `apps/api/src/db/schema` (they are the source of truth).
2. Delete the template's incoming `.sql` file, its `meta/<number>_snapshot.json`, and its entry in `meta/_journal.json`, keeping your project's files for that number.
3. Run `pnpm --filter @repo/api db:generate --name <template-name>` (for example `admin_audit`). Drizzle writes the same change as the next free number after your own migrations.
4. Review the generated SQL against the template's original and copy over any hand-written statements (data backfills or comments) it contained.
5. Run `pnpm check:schema` (part of `pnpm check`). It fails if the schema, Better Auth configuration, and migrations disagree.

Project-specific migrations should be generated, never hand-numbered, so they always follow whatever the latest merged template migration is. Test the upgrade path on a local copy before deploying (`pnpm --filter @repo/api db:migrate:local`), and let staging apply it first.

## Upgrading Hono securely

Hono and its companion packages (`@hono/zod-openapi`, `@hono/swagger-ui`, `hono-telescope`) are centralized in `pnpm-workspace.yaml` under `catalog:`. Both `apps/api` and `packages/api-client` reference `"catalog:"`, ensuring the Worker backend and React RPC client stay strictly synchronized on the same Hono release.

### Check for updates

To inspect current versus latest versions and check release age across the Hono ecosystem without modifying anything:

```sh
pnpm check:hono
```

### Automated upgrade with security gates

To perform an automated upgrade with complete verification:

```sh
pnpm upgrade:hono               # upgrades to latest stable release
pnpm upgrade:hono 4.14.0        # or specify an explicit version
```

The upgrade workflow enforces multiple security gates:

1. **Supply-chain gate**: Verifies release age from the npm registry. Releases published under 24 hours ago are blocked unless `--force` is provided, protecting production against zero-day supply-chain compromises.
2. **Atomic catalog update**: Modifies the root catalog in `pnpm-workspace.yaml` so API and client packages are updated together in one atomic step.
3. **Production security audit**: Runs `pnpm security:audit` (`pnpm audit --prod --audit-level high`) to verify no known high-severity vulnerabilities exist.
4. **Line limits and linting**: Verifies code health with `pnpm check:lines` and `pnpm lint:repo`.
5. **Schema consistency**: Verifies D1 and Better Auth schema agreement with `pnpm check:schema`.
6. **Full build and test verification**: Compiles all workspaces and runs tests with `turbo run typecheck lint test build`, validating security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Cache-Control: no-store`), the API key gateway, and route guards.
7. **OpenAPI contract drift check**: Runs `pnpm openapi:check`. If OpenAPI documents changed, run `pnpm openapi:generate` and review any mobile-facing changes with the Flutter developer (keeping `/api/v1` additive).
8. **Automatic rollback**: If any test, audit, or typecheck fails, the tool automatically rolls back `pnpm-workspace.yaml` and `pnpm-lock.yaml` and reinstalls cleanly.

Dependabot in `.github/dependabot.yml` also groups Hono ecosystem dependencies together under the `hono` group so Dependabot PRs update the catalog in one atomic change.

## Held major versions

Dependabot ignores these majors until their ecosystems support them. Revisit them when upgrading:

| Package    | Held at | Waiting for                                                                                                      |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| TypeScript | 5.9     | 6.0 is supported by `typescript-eslint` and is the next upgrade to take; 7 waits for `typescript-eslint` support |
| Vitest     | 4.1     | `@cloudflare/vitest-pool-workers` to accept Vitest 5 as a peer dependency                                        |

Take one major upgrade per pull request, and run the full checks after each one.
