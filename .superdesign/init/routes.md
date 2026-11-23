# Routes

Router: `apps/web/src/router.tsx` (TanStack Router, lazyRouteComponent).

## SipNena onboarding (rootRoute, full-bleed)

| Path                 | Component                                                                     |
| -------------------- | ----------------------------------------------------------------------------- |
| `/welcome-language`  | `apps/web/src/routes/welcome-language.tsx` → `SipNenaLanguageSetupScreen`     |
| `/create-account`    | `apps/web/src/routes/create-account.tsx` → `CreateAccountScreen`              |
| `/login`             | `apps/web/src/routes/login.tsx` → `SipNenaLoginScreen`                        |
| `/preparing-courses` | `apps/web/src/routes/preparing-courses.tsx` → `PreparingCoursesLoadingScreen` |

## Legacy auth (authLayout / AuthLayout)

`/signup`, `/verify-email`, `/forgot-password`, `/reset-password`

## App (appLayout, requireSession)

`/account`, `/files`, `/admin`, `/organizations`, …

Home `/` currently redirects signed-out users (to be `/welcome-language`).
