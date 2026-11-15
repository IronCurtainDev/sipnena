# Practical Cloudflare costs

Use free allowances where they fit, but budget for authentication and real traffic. A low-cost MVP should fail predictably, expose useful metrics, and avoid unnecessary infrastructure.

## Baseline and upgrade

Prices below were checked on 2026-10-02; verify provider pricing before each new launch.

| Service       | Included Free allowance                                                        | Cost consideration                                                       |
| ------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Workers       | 100,000 requests/day; 10 ms CPU per invocation                                 | Paid starts at US$5/month per account, plus usage above included amounts |
| Static Assets | Free, unlimited asset requests                                                 | Keep asset requests outside Worker execution                             |
| D1            | 5 million rows read/day, 100,000 rows written/day, 5 GB total storage          | Free usage exhaustion causes database errors                             |
| R2 Standard   | 10 GB-month storage; 1 million Class A and 10 million Class B operations/month | Storage and operations beyond allowances are billed; egress is free      |
| Resend        | Provider-specific email allowance                                              | Check sending limits, verified domains, and paid email volume separately |

Sources: [Workers and assets](https://developers.cloudflare.com/workers/platform/pricing/), [D1](https://developers.cloudflare.com/d1/platform/pricing/), [R2](https://developers.cloudflare.com/r2/pricing/), [Resend pricing](https://resend.com/pricing).

These are shared account allowances, not a fresh allowance for every MVP. Keep separate per-app resources for ownership and diagnostics, but review combined account usage. R2 and email may cost money independently of the Workers plan.

Better Auth retains its default scrypt password hashing. It intentionally consumes CPU and memory, so Workers Free's 10 ms budget may be insufficient even for the first signup or login. Test production CPU before launch and use Workers Paid when necessary. Do not weaken hashing to force it into a free quota. See [Better Auth security](https://better-auth.com/docs/reference/security).

The template no longer pins `limits.cpu_ms` to 10. On Paid, choose an explicit CPU limit after measuring sign-up, sign-in, and reset requests with real hashing and reasonable headroom. Remove any inherited 10 ms override when upgrading. The 5 MiB upload limit is a product default independent of the billing plan.

## Defaults that reduce work

- Static Assets serves the React bundle; `/api/*` invokes Hono. There is one deployment and no separate always-running server.
- D1 indexes support per-user file queries. Application lists default to 20, cap at 50, and fetch one extra row for the next cursor. Routine list pages do not count every row.
- Sessions remain server-side; no custom per-request last-seen writes or polling loop is added.
- Private R2 files are small and downloaded only on demand. Repeated downloads still incur Worker and storage operations.
- Native Workers bindings throttle authentication, email requests, and uploads without KV counter reads/writes. The limits are approximate and local to Cloudflare locations, not a global quota or spending cap. [Rate-limit semantics](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
- No queues, analytics warehouse, public file CDN, or background cache warmer are required for the starting app. One daily cron trigger purges expired sessions and verification tokens in bounded batches and samples up to 500 R2 objects for orphans (one list operation per day).
- Workers Logs keeps every request (`head_sampling_rate: 1`): deployed Workers log one redacted `request` event per call (method, route pattern, status, duration, client version), so a user's request ID always leads to a log line. Automatic invocation logs stay off because they record raw paths that can contain reset tokens. Sampling applies to error logs too, so lower the rate only when daily log volume approaches your plan's Workers Logs allowance, and prefer filtering noisy routes first. Check current limits on [Workers Logs pricing](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#pricing).

## A small team's operating routine

After launch, check each app weekly and the shared account monthly:

| Check                                        | Action                                                                        |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| Worker CPU, request volume, errors, and 429s | Investigate expensive auth paths and abusive traffic before increasing limits |
| D1 rows read/written and storage             | Check query indexes when reads grow faster than user activity                 |
| R2 stored bytes and Class A/B operations     | Review abandoned uploads, repeated downloads, and product retention needs     |
| Resend send volume, failures, and bounces    | Confirm legitimate delivery and stop accidental resend loops                  |
| Logs and observability usage                 | Keep redacted error logs and sampling appropriate to traffic                  |

Use Cloudflare usage notifications and available billing alerts. They inform you; they are not a guaranteed hard spending cap. Request IDs connect a user's error to redacted server logs. Never add request bodies, full auth URLs, cookies, tokens, or email links to production logs.

Upgrade before quotas or CPU errors disrupt users. Paid does not remove the need for bounded queries, private authorization, or abuse controls. Add user storage quotas or stronger global abuse control only when the product needs them; the native limiter alone does not enforce those guarantees.
