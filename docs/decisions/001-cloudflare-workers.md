# 001: One Cloudflare Worker deployment

Deploy Hono and React assets together. Workers Static Assets serves React; `/api/*` always invokes Hono. Same-origin cookies simplify browser authentication and deployment for one API/web developer.

Keep one D1 database and private R2 bucket per MVP. Native Workers rate-limit bindings replace KV counters. Add other infrastructure only for an observed need. See [operating costs](../cloudflare-free-first.md).
