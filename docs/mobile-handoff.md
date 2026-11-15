# Mobile handoff

The Flutter app in `apps/mobile` was started from a different backend's boilerplate and does not yet talk to this API. This page lists the gaps found during the template review, for the Flutter developer, who owns `apps/mobile` and decides how to fix them. Nothing here was changed in the Flutter code.

Request and response examples are in [`apps/mobile/BACKEND_INTEGRATION.md`](../apps/mobile/BACKEND_INTEGRATION.md) and the [HTTP API guide](api.md). The contracts are [`docs/openapi/app.json`](openapi/app.json) (application and auth combined) and [`docs/openapi/auth.json`](openapi/auth.json) (Better Auth only).

## What the app expects compared to what the API does

| Concern            | App today                                                                        | This API                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Auth endpoints     | `/register`, `/login`, `/logout`, `/verify-email`, `/password/email` (form data) | Better Auth JSON under `/api/auth/*`: `sign-up/email`, `sign-in/email`, `sign-out`, `request-password-reset`    |
| Session token      | `access_token` in the JSON body, sent as `x-access-token`                        | Signed token in the `set-auth-token` response header, sent as `Authorization: Bearer <token>`                   |
| Email verification | Code entered in the app                                                          | Link opened in a browser; then sign in. There is no code endpoint                                               |
| Success envelope   | `{ "result": true, "payload": ... }`                                             | Application routes: `{ "data": ..., "meta": ... }`. Better Auth: its own shapes, no wrapper                     |
| Error envelope     | `{ "result": false, "message": ... }`                                            | Application: `{ "error": { "code", "message", "requestId", "issues"? } }`. Better Auth: `{ "code", "message" }` |
| API key            | `x-api-key` from `env` (correct)                                                 | Same; every `/api/*` request needs it                                                                           |

Relevant files: [`auth_endpoints.dart`](../apps/mobile/lib/core/network/endpoints/auth_endpoints.dart), [`auth_interceptor.dart`](../apps/mobile/lib/core/network/interceptors/auth_interceptor.dart), [`api_response.dart`](../apps/mobile/lib/core/network/models/api_response.dart), [`api_error.dart`](../apps/mobile/lib/core/network/exceptions/api_error.dart), and [`auth_session_model.dart`](../apps/mobile/lib/features/auth/core/data/models/auth_session_model.dart). `ApiError.fromJson` casts a top-level `message` to `String`, so an application error from this API (where `message` is nested under `error`) throws a type error instead of showing the message.

## Checklist

### Contracts and code generation

- [ ] Point `tools/swagger_codegen.dart` at this API. It reads `swagger.json` from the working directory, and the checked-in `tools/swagger.json` is another project's spec ("coastrover API"). Use the checked-in `docs/openapi/app.json`; the live `GET /api/openapi.json` is open only on a local Worker (deployed, it requires an admin session).
- [ ] Update the generator's envelope handling. It only recognizes `result`, `payload`, `data`, and similar top-level fields, and unwraps `payload`; this API's application responses use `data` plus `meta`, and Better Auth responses are unwrapped.
- [ ] Schemas are named (`File`, `FilesListResponse`, `PaginationMeta`, `ErrorResponse`, `ValidationIssue`, `HealthResponse`, `ConfigResponse`), so generated types should be stable. Ignore unknown fields: the API only adds fields within `/api/v1`. Error codes are append-only, so treat unknown codes as a generic failure.

### Authentication

- [ ] Replace the placeholder implementations in [`auth_remote_data_source_impl.dart`](../apps/mobile/lib/features/auth/core/data/datasources/auth_remote_data_source_impl.dart). `verifyEmail`, `resendVerificationCode`, and `forgotPassword` return success after a delay without calling the server, and `verifyEmail` returns a hard-coded `user_123` session.
- [ ] Read the session token from the `set-auth-token` header after `sign-in/email` or `sign-in/social`, store it in secure storage, and send it as a bearer token. Store a replacement header when one arrives.
- [ ] On launch, call `GET /api/auth/get-session`. Treat `null` or a 401 as signed out, and a network failure as unknown rather than signed out. Sessions last 7 days and are extended on use once they are a day old; there is no refresh token.
- [ ] Remove or narrow the development auth bypass. `enableDevAuthBypass` in [`settings.dart`](../apps/mobile/lib/utils/settings.dart) is true for the development entrypoint regardless of build mode, so a release build of `main_development.dart` skips sign-in with a fake `dev-token-*` session. Gate it on `kDebugMode` as well, or delete it once real auth works.
- [ ] Add in-app account deletion with `POST /api/auth/delete-user` (send `{ "password": "..." }`, or sign in within the last day for Google-only accounts). Both app stores require it. The server deletes the user's files first.
- [ ] For native Google sign-in, exchange the Google ID token at `/api/auth/sign-in/social`; agree the client IDs (`GOOGLE_MOBILE_CLIENT_IDS`) with the backend owner.

### Network behavior

- [ ] Stop automatic retries of non-idempotent requests. [`retry_interceptor.dart`](../apps/mobile/lib/core/network/interceptors/retry_interceptor.dart) retries every request up to three times on timeouts and 5xx responses, including POSTs. A retried upload creates duplicate files and a retried sign-up or password reset sends duplicate emails. Retry only `GET`/`HEAD` automatically, and let the user retry anything else.
- [ ] Handle 429. Throttled responses carry `Retry-After` (seconds); wait at least that long and do not loop. 503 with `EMAIL_DELIVERY_FAILED` means the email provider was unavailable, and the user may retry later.
- [ ] Certificate pinning does not pin anything. [`certificate_pinning.dart`](../apps/mobile/lib/core/network/interceptors/certificate_pinning.dart) only sets `badCertificateCallback`, which runs for certificates that already fail validation, so any publicly trusted certificate is accepted; it is also applied with an empty hash list, which makes it a no-op. Either implement SPKI pinning with backup pins (Cloudflare rotates edge certificates) or delete the scaffold so it is not mistaken for protection.
- [ ] Keep `x-api-key` configurable per environment. It is public, not a secret, and can be rotated: the server accepts several keys during a rotation (see [API compatibility](api.md#compatibility)).

### Versions and forced updates

- [ ] Send `x-client-version: <major.minor.patch>` (the `pubspec.yaml` version) on every request. It appears in server logs for support.
- [ ] On launch, read `minSupportedMobileVersion` from `GET /api/config`. When the installed version is older, show a required-update screen instead of calling other endpoints. The value is `null` until the backend owner sets `MIN_MOBILE_VERSION`.
- [ ] Use `googleEnabled` and `organizationsEnabled` from the same response to hide unavailable features.

### Mock screens

- [ ] The home feature ships mock data: [`mock_gallery_content.dart`](../apps/mobile/lib/features/home/presentation/pages/mock_gallery_content.dart), [`mock_event_previews.dart`](../apps/mobile/lib/features/home/presentation/pages/mock_event_previews.dart), and [`gallery_mock_tile.dart`](../apps/mobile/lib/features/home/presentation/widgets/gallery_mock_tile.dart), used by the gallery and event pages. This API has no events or galleries; it offers personal files (`/api/v1/files`) and organizations. Decide with the backend owner which screens become real features, and remove the rest before a store release.

### Line limits and CI

- [ ] 13 handwritten Dart files exceed the 300-line limit (as of this review), led by `app_text_styles.dart` (752), `event_details_page.dart` (705), `extensions_sample.dart` (701), and `widget_extension.dart` (658). `lib/l10n/arb/app_localizations.dart` is generated by `flutter gen-l10n` and can be excluded. Check with:

  ```sh
  node tools/check-lines.mjs apps/mobile/lib apps/mobile/test
  ```

  The root `pnpm check:lines` no longer scans `apps/mobile`, so this limit is only enforced if the mobile workflow runs it. Add that step to `.github/workflows/mobile.yml` once the files are split.

- [ ] Dependabot opens weekly `pub` dependency pull requests against `develop`; they are yours to review.

## Coordinating changes

Both developers review any change to `/api/v1` or Better Auth configuration that affects installed apps, and the backend owner records it in [API_CHANGELOG.md](../API_CHANGELOG.md). Pull requests fail when `oasdiff` finds a breaking change to `docs/openapi/app.json`. When the mobile app needs a new endpoint or field, ask for it as an additive change rather than adapting the app to a one-off shape.
