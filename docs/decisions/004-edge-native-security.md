# ADR 004: Prefer edge-native security primitives

Status: accepted

## Context

This Worker template needs upload validation, request deadlines, response
headers, rate limits, and private object storage. General Node packages often
increase bundle size, transitive vulnerabilities, and runtime assumptions for
features already available in the Worker runtime or Hono.

## Decision

Prefer built-in Web APIs, Cloudflare bindings, Hono middleware, and short
application-specific checks when the required behavior is small and fully
testable. Current examples are `AbortSignal.timeout`, byte-prefix upload
validation, `secureHeaders`, D1 queries, Rate Limiter bindings, and private R2.

Do not add Axios, Helmet, a file-signature package, a generic rate-limit store,
or an object-storage abstraction solely to wrap these capabilities.

A dependency is justified when the format/protocol is complex, standards
maintenance is substantial, the implementation cannot be tested locally with
reasonable confidence, or measured duplication exceeds the maintenance and
supply-chain cost. Record such a choice in an ADR and review Worker runtime and
bundle compatibility first.

## Consequences

- Smaller bundles and fewer supply-chain/runtime compatibility risks.
- Security behavior stays close to the route and its tests.
- We own narrow checks such as supported file signatures and must extend their
  fixtures when adding a format.
- This is a decision rule, not a ban on dependencies.
