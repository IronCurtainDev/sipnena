# Theme

## Compact token summary (SipNena onboarding)

- pageBg: #F8FAFC / auth shell #F4F7FB
- surface: #FFFFFF
- primary: #0D5BD7 (hover #0A49B0)
- textMain: #0F172A, textSecondary: #475569, textMuted: #64748B
- border: #E2E8F0, borderSelected: #0D5BD7
- Fonts (target): Geist Variable (app) + Noto Sans / Sinhala / Tamil for onboarding (self-hosted)
- Motion: `.animate-page-enter`, `.animate-lang-switch`; honor prefers-reduced-motion

## Raw: onboarding tokens

```ts
export interface LanguageOption {
  code: string;
  badge: string;
  nativeTitle: string;
  nativeDesktopTitle: string;
}

export const TOKENS = {
  colors: {
    pageBg: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceMuted: "#F1F5F9",
    surfaceSelected: "#EFF6FF",
    primary: "#0D5BD7",
    primaryHover: "#0A49B0",
    primarySoft: "#DBEAFE",
    textMain: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#64748B",
    border: "#E2E8F0",
    borderSelected: "#0D5BD7",
    successText: "#0F766E",
    warningBg: "#FFF7ED",
    warningBorder: "#FDBA74",
    warningText: "#9A3412",
  },
  typography: {
    title: "text-2xl sm:text-[28px] font-bold leading-tight tracking-tight",
    subtitle: "text-base font-medium leading-relaxed",
    body: "text-base leading-relaxed",
  },
} as const;

export const ONBOARDING_CONFIG = {
  brandName: "SipNena",
  gradesRange: "Grades 6–11",
  languages: [
    {
      code: "si",
      badge: "සි",
      nativeTitle: "සිංහල",
      nativeDesktopTitle: "සිංහල මාධ්‍යය",
    },
    {
      code: "ta",
      badge: "த",
      nativeTitle: "தமிழ்",
      nativeDesktopTitle: "தமிழ் மொழி மூலம்",
    },
    {
      code: "en",
      badge: "En",
      nativeTitle: "English",
      nativeDesktopTitle: "English Medium",
    },
  ] as LanguageOption[],
};
```

## Raw: global.css

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";

@custom-variant dark (&:is(.dark *));

/* Theme tokens: change these to rebrand. Components read only these variables. */
:root {
  --background: oklch(0.985 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.96 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.96 0 0);
  --muted-foreground: oklch(0.52 0 0);
  --accent: oklch(0.96 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --success: oklch(0.52 0.14 155);
  --border: oklch(0.92 0 0);
  --input: oklch(0.9 0 0);
  --ring: oklch(0.708 0 0);
  --brand: oklch(0.55 0.2 265);
  --brand-foreground: oklch(0.985 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(1 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-accent: oklch(0.96 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.92 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.185 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --success: oklch(0.72 0.15 155);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --brand: oklch(0.65 0.19 265);
  --brand-foreground: oklch(0.985 0 0);
  --sidebar: oklch(0.175 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
}

@theme inline {
  --font-sans: "Geist Variable", ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-sans);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-success: var(--success);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-brand: var(--brand);
  --color-brand-foreground: var(--brand-foreground);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html {
    @apply font-sans antialiased;
    color-scheme: light;
  }
  html.dark {
    color-scheme: dark;
  }
  body {
    @apply min-w-80 bg-background text-foreground;
  }
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
  a {
    @apply underline-offset-4;
  }
}

@keyframes pageSlideFadeIn {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.995);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.animate-lang-switch {
  animation: pageSlideFadeIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-page-enter {
  animation: pageSlideFadeIn 0.48s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
