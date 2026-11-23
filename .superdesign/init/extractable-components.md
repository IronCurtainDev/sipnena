# Extractable components

## SipNenaOnboardingShell

- Source: `apps/web/src/features/login/screen.tsx` / `apps/web/src/features/create-account/screen.tsx` (to be shared)
- Category: layout
- Description: Sticky header with back, brand mark, trust badge, language switcher; footer
- Extractable props: showBack (boolean), brandSubtitle (string), topBadge (string), footer (string), langSwitcherAria (string)
- Hardcoded: SipNena name, BookOpen mark, blue primary

## CompactLanguageSwitcher

- Source: `apps/web/src/features/onboarding/compact-language-switcher.tsx`
- Category: basic
- Description: Compact si/ta/en language toggle
- Extractable props: selectedLang, ariaLabel
- Hardcoded: language codes, badge glyphs

## AnimatedStudentsScene

- Source: `apps/web/src/features/onboarding/animated-students-scene.tsx`
- Category: basic
- Description: Looping study video panel
- Extractable props: className, aspectRatio
- Hardcoded: /videos/students-studying.mp4

## AuthHighlightCard

- Source: `apps/web/src/features/login/highlight-card.tsx`
- Category: basic
- Description: Left column video + benefit bullets for auth screens
- Extractable props: title, description, benefits[]
- Hardcoded: layout, video scene
