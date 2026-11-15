# Operations and recovery

## Migrations and release failures

The initial migration creates a fresh template database. Each derived MVP owns all later migrations. Before deploying a schema change, review the SQL. Keep changes compatible with the previous Worker: migrations run before the new Worker is published. `migrations.test.ts` applies the newest migration over data written with the previous schema.

`tools/deploy.mjs` records a D1 Time Travel bookmark before applying migrations, prints it, and adds it to the GitHub Actions job summary. It refuses to migrate if it cannot record one. It then deploys the Worker tagged with the git commit and smoke-checks `/api/health`, `/api/config` (with the deployed web key), and the React shell.

If deployment fails after migration succeeds, fix and retry the deployment or restore the previous compatible Worker. Rolling back Worker code does not undo SQL. Use a new corrective migration for schema problems; do not edit an already-applied migration.

## Backup and recovery

Run these from `apps/api` with `--env <name>` for non-production environments.

| Situation                             | Command                                                                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Bad Worker code, schema is fine       | `pnpm exec wrangler deployments list`, then `pnpm exec wrangler rollback <version-id>`                                      |
| Find the pre-deploy recovery point    | Read "D1 recovery bookmark" in the deploy job summary, or `pnpm exec wrangler d1 time-travel info DB --timestamp <RFC3339>` |
| Bad migration or data corruption      | `pnpm exec wrangler d1 time-travel restore DB --bookmark <bookmark>`                                                        |
| Off-platform backup before risky work | `pnpm exec wrangler d1 export DB --remote --output backup-$(date +%F).sql`                                                  |

Time Travel restores the whole database to that moment, including discarding writes made since. Before restoring production: roll the Worker back to a version compatible with the restored schema, announce the data-loss window, export the current database first, then restore. Time Travel retention depends on the plan (see [D1 Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/)); keep periodic `d1 export` files for longer horizons in private storage, never in git.

R2 has no point-in-time restore. File objects are deleted immediately when users or admins delete files or accounts. If the product needs undelete or backups, add R2 object versioning or a lifecycle copy deliberately; the template does not.

## Secret rotation

| Secret                          | Effect of rotation                                                            | Procedure                                                                                                                                                                        |
| ------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `API_KEYS` (public gateway key) | Old web bundles and installed mobile builds get 401 once their key is removed | Add the new key to `API_KEYS` alongside the old one, deploy web with the new `VITE_API_KEY`, release mobile, raise `MIN_MOBILE_VERSION` past old builds, then remove the old key |
| `BETTER_AUTH_SECRET`            | Invalidates all sessions, bearer tokens, and pending verification/reset links | Schedule it, `wrangler secret put BETTER_AUTH_SECRET`, expect every user to sign in again                                                                                        |
| `RESEND_API_KEY`                | None for users if swapped atomically                                          | Create the new key in Resend, `wrangler secret put`, then revoke the old key                                                                                                     |
| `GOOGLE_CLIENT_SECRET`          | Google sign-in fails until updated                                            | Add a new secret in Google Cloud, `wrangler secret put`, then delete the old one                                                                                                 |
| `CLOUDFLARE_API_TOKEN` (GitHub) | Deploys fail until updated                                                    | Create a scoped token per environment (Workers Scripts, D1, R2 edit; that account only), set an expiry, update the GitHub environment secret, revoke the old token               |

## Incident checklist

1. Note the time window and any request IDs users reported.
2. Search Workers Logs for `request_failed`, `auth_request_failed`, `configuration_invalid`, and `request_misconfigured` events by `requestId`.
3. If the last deployment correlates, roll back the Worker first (`wrangler rollback`); restore D1 only if data or schema is wrong.
4. Check Cloudflare and Resend status pages and account usage limits (D1 daily rows, Workers CPU).
5. Record what happened, the fix, and any follow-up migration or test in the pull request or API change log.

The custom `0001_auth_lookup_index.sql` migration adds an account lookup index outside Better Auth's generated schema. Preserve that index if a later migration rebuilds the account table; the Worker query-plan tests check that it remains usable.

## Interrupted organization creation

Better Auth's Drizzle adapter disables interactive transactions for D1. Organization creation writes an organization and its owner membership separately. An interrupted request may leave an organization without members and reserve its slug.

1. Refresh the user's organization list before retrying: the operation might have succeeded despite a lost response.
2. If the slug remains occupied but no organization is visible, inspect it through D1 as an operator. Do not expose a public endpoint to adopt a memberless organization.
3. Stop retries for that specific creation attempt. Confirm no request is still running, correlate the failure's timing, and inspect the exact organization and membership rows.
4. Delete only the confirmed orphan with a conditional query, then let the user retry normally. If any members exist, investigate instead of deleting or assigning ownership.

Read-only diagnostic SQL, run in the D1 console or through Wrangler, scoped to the affected slug:

```sql
SELECT o.id, o.slug, o.created_at
FROM organization AS o
WHERE o.slug = 'the-affected-slug'
  AND NOT EXISTS (
    SELECT 1 FROM member AS m WHERE m.organization_id = o.id
  );
```

After confirming the failure and the exact ID, use a guarded deletion:

```sql
DELETE FROM organization
WHERE id = 'confirmed-orphan-id'
  AND NOT EXISTS (
    SELECT 1 FROM member WHERE organization_id = organization.id
  );
```

Do not bulk-delete every memberless row: a legitimate creation may be in progress. The conditional check protects existing memberships but cannot replace the operator's confirmation that the failed attempt has stopped. Other partial auth operations need the same inspect-before-retry approach.

## File storage failures

Uploads write a random private R2 object, then D1 metadata. If the metadata write fails, the service attempts to remove that object. If cleanup also fails, use the logged request ID to investigate storage state; compare the specific candidate's key with D1 metadata before removing an orphan. Avoid routinely scanning every object.

Deletion removes the R2 object before deleting its metadata. If the database delete fails, retry the same delete: deleting an already-missing R2 object is safe. A metadata row with missing content should not be turned into a public storage URL or treated as another user's file.

R2 and D1 do not share a transaction. A terminated Worker can prevent compensation from running. The daily cron (`src/maintenance.ts`, `17 3 * * *` UTC) samples up to 500 objects from a random point in `users/`, deletes those older than one hour with no `files` row, and logs a `maintenance_completed` event with counts. Over successive days it covers the whole bucket without a global scan. The same run deletes expired `session` and `verification` rows in batches of 500 (at most 10,000 per table). Run it locally while `pnpm dev` is running with `curl "http://localhost:8787/cdn-cgi/local/scheduled"`, the trigger Wrangler prints at startup (the older `/__scheduled` path is swallowed by the SPA fallback).

Account deletion (self-service `POST /api/auth/delete-user` or admin remove-user) deletes the user's R2 objects and then their `files` rows, 50 at a time, before Better Auth removes the user. If storage fails, the request fails with the user row intact; retrying the same deletion resumes where it stopped.

## Admin audit

Successful Better Auth admin actions (create, update, role, password, ban, unban, remove, impersonate, revoke sessions) and admin file downloads and deletions append a row to `admin_audit` with the actor, action, target, and request ID. It has no foreign keys so history survives deleted users. Query it with:

```bash
pnpm --filter @repo/api exec wrangler d1 execute DB --remote --command "SELECT created_at, actor_user_id, action, target_type, target_id FROM admin_audit ORDER BY created_at DESC LIMIT 50"
```

A failed audit insert does not undo the action; it logs `admin_audit_failed` with the request ID.

## Email and session failures

If signup succeeded but delivery failed, use resend verification rather than repeatedly registering. For recovery, request a new link; expired or consumed links are not reusable. For an invitation, inspect its state in the organization interface, cancel the pending invitation, then send a new one. Email calls can fail independently of persisted auth state.

Production email preview is rejected. Resend calls time out after 10 seconds and carry an `Idempotency-Key` derived from the message, so a retried identical send is not delivered twice. Check Resend status, domain configuration, and sending limits when delivery fails. The client must not get API keys or provider response bodies. Keep auth secrets stable across deploys; see [secret rotation](#secret-rotation).

Monitor Worker CPU during password hashing. Repeated CPU exhaustion on Free calls for a Paid plan and a measured CPU limit, not weaker password hashing. See [costs](cloudflare-free-first.md).

## Logs and support

Application error responses include a request ID. Deployed Workers log a `request` event per call and, for unexpected failures, a `request_failed` event with the error name, redacted message, a short stack, method, and route pattern. Better Auth failures (`auth_error`, `auth_request_failed`) log only the error name and stack frames, because their messages can contain database values. URLs, email addresses, and bearer tokens in messages are replaced before logging (`apps/api/src/lib/log.ts`). Preserve the request ID when reporting a problem. Auth errors retain Better Auth's response format; do not copy credentials or emailed links into support reports.

Wrangler keeps every log (`head_sampling_rate: 1`), redacts query strings, and disables automatic invocation logs and traces. Reset tokens can appear in URL paths, so query-string redaction alone is insufficient; application logs use the route pattern, never the raw path. Keep automatic URL logging disabled unless you add suitable redaction. Local email preview deliberately prints links; its output must stay in the developer's terminal.
