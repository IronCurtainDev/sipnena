# Working in this template

Build small MVPs for two developers. Read [architecture](docs/architecture.md) and the existing feature before adding code.

- Product (SipNena web): student/parent-facing onboarding in Sinhala, Tamil, and English. Prefer plain language, large tap targets, and calm motion. Do not invent metrics or claim unfinished features.
- Hono/React owns API, web, contracts, migrations, and deployment. Flutter owns `apps/mobile` and its toolchain; do not scaffold or choose mobile dependencies during unrelated API/web work.
- Keep pages/screens at most 200 physical lines and other handwritten TypeScript/Dart files at most 300. Extract coherent responsibilities; never compress formatting to pass.
- Start with feature routes, plain queries, and nearby UI. Add a coordination service only when needed. Avoid forwarding classes, empty abstractions, and generic frameworks.
- Keep React assets and `/api/*` on one Worker origin. Use D1 and private R2; do not add KV counters, polling, or infrastructure without a concrete need.
- Portal, studio, dashboard, library, and sidebar-layout `<main>` screens (`SipNenaPortalShell`, `AppLayout`, desktop workspace views) must fill full usable width (`w-full flex-1 px-4 sm:px-6 xl:px-8`) — never center them with `mx-auto max-w-*` caps that leave blank margins on both left and right sides (see `.cursor/rules/layout-width.mdc`).
- Better Auth owns authentication and organizations. Auth mutations (sign-up, sign-in, Google) must use Better Auth cookie sessions — never placeholder “account created” success. Until `/create-account` is wired, keep `/signup` as the real registration path and treat SipNena create-account as UI prototype only. Check authorization at every data boundary; files are personal by default. Never log credentials, cookies, bearer tokens, or production email links.
- Keep Better Auth, its adapters, CLI, and `@better-auth/core` on the same version. After an auth upgrade, check generated schema and OpenAPI, exercise cookie and bearer sessions, organizations, admin authorization, and unexpected 5xx responses. Error hooks may log redacted details but clients must receive stable safe JSON; preserve normal Better Auth 4xx shapes.
- Every permission assigned to a role must follow the Single Responsibility Principle: each permission must do exactly one discrete, atomic action (`resource:action`, e.g. `user:create`, `file:delete-any`). Never bundle multiple operations into compound permissions (avoid `manage` or `crud`).
- Application contracts come from shared Zod schemas. Regenerate OpenAPI after HTTP changes. Keep `/api/v1` additive and flag mobile-facing changes for both developers' review.
- Determine whether a migration has been applied to any shared or persistent database before editing it. Unapplied migrations may be corrected in place; once applied, append a new migration and never rewrite history. Test migrations and failure recovery for multi-step writes.
- Trace every dependency advisory to its exact installed path. Prefer a compatible direct update, then a narrowly scoped override with schema/CLI/runtime tests; never use a blanket override or call an audit clean while findings remain. Record any advisory that cannot be removed safely as an explicit blocker.
- Lazy-load React route pages and route layouts unless they are required for the initial shell. Compare production bundle output before and after; fix genuine oversized initial chunks instead of raising warning limits to hide them.
- Add D1 indexes only from representative query plans or a demonstrated access pattern. Do not add speculative indexes to silence an audit note.
- Inspect `git status` before and after work. Preserve existing changes, do not add editor/IDE preference files or unrelated generated artifacts, and do not stage, commit, or push unless the user requests it.
- Run relevant checks, `pnpm check:lines`, and `pnpm check` before handing off. Run browser tests for changed user flows and `pnpm deploy:check` for deployment changes. Report any checks that could not run.

Scoped implementation guidance lives in [.cursor/rules](.cursor/rules); setup and recovery commands live in [docs](docs/setup.md).

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
