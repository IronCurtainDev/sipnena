# Page dependency trees

## /welcome-language

Entry: apps/web/src/routes/welcome-language.tsx

- apps/web/src/features/onboarding/sipnena-screen.tsx
  - apps/web/src/features/onboarding/content.tsx
    - apps/web/src/features/onboarding/animated-students-scene.tsx
    - apps/web/src/features/onboarding/tokens.ts
    - apps/web/src/features/onboarding/strings.ts
  - apps/web/src/features/onboarding/compact-language-switcher.tsx
  - apps/web/src/features/onboarding/language-preference.ts

## /login

Entry: apps/web/src/routes/login.tsx

- apps/web/src/features/login/screen.tsx
  - apps/web/src/features/login/highlight-card.tsx
    - apps/web/src/features/onboarding/animated-students-scene.tsx
  - apps/web/src/features/login/login-form.tsx
    - apps/web/src/features/create-account/google-icon.tsx
  - apps/web/src/features/login/strings.ts
  - apps/web/src/features/onboarding/compact-language-switcher.tsx
  - apps/web/src/features/onboarding/language-preference.ts

## /create-account

Entry: apps/web/src/routes/create-account.tsx

- apps/web/src/features/create-account/screen.tsx
  - apps/web/src/features/create-account/highlight-card.tsx
  - apps/web/src/features/create-account/create-account-form.tsx
    - apps/web/src/features/create-account/grade-selector.tsx
    - apps/web/src/features/create-account/google-icon.tsx
  - apps/web/src/features/create-account/strings.ts
  - apps/web/src/features/onboarding/*

## /preparing-courses

Entry: apps/web/src/routes/preparing-courses.tsx

- apps/web/src/features/onboarding/preparing-courses-screen.tsx
  - apps/web/src/features/onboarding/animated-students-scene.tsx
  - apps/web/src/features/onboarding/language-preference.ts
