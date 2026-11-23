# Layouts

SipNena onboarding uses full-bleed root routes (not AuthLayout). Legacy auth pages still use AuthLayout.

### `apps/web/src/components/layout/auth-layout.tsx`

```tsx
import { Outlet } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { brand } from "@/lib/brand";
import { Brand, BrandMark } from "./brand";

export function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="relative hidden overflow-hidden bg-zinc-950 p-10 text-zinc-50 lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_0%_0%,color-mix(in_oklch,var(--brand)_45%,transparent),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_top_left,black,transparent_75%)]"
        />
        <div className="relative flex items-center gap-2.5 font-semibold">
          <BrandMark />
          {brand.name}
        </div>
        <div className="relative max-w-md space-y-4">
          <p className="text-3xl font-semibold tracking-tight text-balance">
            {brand.tagline}
          </p>
          <p className="text-zinc-400 text-pretty">{brand.description}</p>
        </div>
        <p className="relative text-xs text-zinc-500">
          © {new Date().getFullYear()} {brand.name}
        </p>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Brand className="lg:invisible" />
          <ThemeToggle />
        </header>
        <main
          id="main-content"
          className="flex flex-1 items-start justify-center px-4 pt-6 pb-16 sm:items-center sm:px-6 sm:pt-0"
        >
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
```

### `apps/web/src/components/layout/brand.tsx`

```tsx
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground shadow-sm",
        className,
      )}
    >
      <Sparkles className="size-4" />
    </span>
  );
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center gap-2.5 rounded-lg font-semibold tracking-tight no-underline outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <BrandMark />
      <span className="truncate">{brand.name}</span>
    </Link>
  );
}
```

### `apps/web/src/components/layout/app-layout.tsx`

```tsx
import { Outlet } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Feedback } from "@/components/app/feedback";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Protected } from "@/features/auth/protected";
import { useSignOut } from "@/features/auth/use-sign-out";
import { AppSidebar } from "./app-sidebar";
import { Brand } from "./brand";

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const signOut = useSignOut();
  const sidebar = {
    signingOut: signOut.pending,
    onSignOut: signOut.signOut,
  };
  return (
    <div className="flex min-h-svh">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 border-r border-sidebar-border md:block">
        <AppSidebar {...sidebar} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/85 px-4 backdrop-blur md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 gap-0 p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Move between pages of the app.
              </SheetDescription>
              <AppSidebar {...sidebar} onNavigate={() => setMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <Brand />
        </header>
        <main
          id="main-content"
          className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10"
        >
          <Feedback error={signOut.error} className="mb-6" />
          <Protected>
            <Outlet />
          </Protected>
        </main>
      </div>
    </div>
  );
}
```

### `apps/web/src/components/layout/app-shell.tsx`

```tsx
import { Outlet } from "@tanstack/react-router";
import { SessionBoundary } from "@/features/auth/protected";

export function AppShell() {
  return (
    <SessionBoundary>
      <a
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-lg bg-background px-3 py-2 text-sm font-medium shadow-md ring-1 ring-border focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <Outlet />
    </SessionBoundary>
  );
}
```

### `apps/web/src/features/onboarding/sipnena-screen.tsx`

```tsx
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { LanguageSetupContent } from "./content";
import { CompactLanguageSwitcher } from "./compact-language-switcher";
import { ONBOARDING_CONFIG, TOKENS } from "./tokens";
import { ONBOARDING_STRINGS } from "./strings";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "./language-preference";

export function SipNenaLanguageSetupScreen() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] =
    useState<AppLanguage>(getSavedLanguage);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<AppLanguage>;
      if (customEvent.detail) {
        setSelectedLang(customEvent.detail);
      }
    };
    window.addEventListener("sipnena_language_change", handleSync);
    return () => {
      window.removeEventListener("sipnena_language_change", handleSync);
    };
  }, []);

  const t = ONBOARDING_STRINGS[selectedLang] || ONBOARDING_STRINGS.en;

  const handleLanguageChange = (code: string) => {
    const lang = code as AppLanguage;
    setSelectedLang(lang);
    saveLanguage(lang);
    const chosen = ONBOARDING_CONFIG.languages.find((l) => l.code === code);
    if (chosen) {
      setStatusMessage(
        `${ONBOARDING_STRINGS[lang].selectedFeedback} ${chosen.nativeTitle}`,
      );
    }
  };

  const handleContinue = () => {
    const chosen = ONBOARDING_CONFIG.languages.find(
      (l) => l.code === selectedLang,
    );
    setStatusMessage(
      `${t.continueFeedback} ${chosen ? chosen.nativeTitle : selectedLang}`,
    );
    setTimeout(() => {
      void navigate({ to: "/create-account" });
    }, 280);
  };

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden bg-[#F8FAFC]"
      style={{
        fontFamily:
          "'Noto Sans', 'Noto Sans Sinhala', 'Noto Sans Tamil', sans-serif",
      }}
    >
      {/* Responsive Top Navigation Bar */}
      <header
        className="w-full bg-white/95 backdrop-blur border-b sticky top-0 z-20 px-3 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between gap-2"
        style={{ borderColor: TOKENS.colors.border }}
      >
        {/* Brand identity */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
            style={{ backgroundColor: TOKENS.colors.primary }}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <span className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight leading-none block truncate">
              {ONBOARDING_CONFIG.brandName}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium truncate hidden min-[420px]:block">
              {t.topContext}
            </span>
          </div>
        </div>

        {/* Compact Responsive Language Switcher */}
        <CompactLanguageSwitcher
          selectedLang={selectedLang}
          onLanguageChange={handleLanguageChange}
          ariaLabel={t.quickLangLabel}
        />
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 flex flex-col justify-center animate-page-enter">
        <LanguageSetupContent
          t={t}
          selectedLang={selectedLang}
          onLanguageChange={handleLanguageChange}
          onContinue={handleContinue}
          statusMessage={statusMessage}
        />
      </main>
    </div>
  );
}
```

### `apps/web/src/features/login/screen.tsx`

```tsx
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { CompactLanguageSwitcher } from "@/features/onboarding/compact-language-switcher";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/features/onboarding/language-preference";
import { LoginHighlightCard } from "./highlight-card";
import { LoginForm } from "./login-form";
import { LOGIN_STRINGS } from "./strings";

export function SipNenaLoginScreen() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] =
    useState<AppLanguage>(getSavedLanguage);

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<AppLanguage>;
      if (customEvent.detail) {
        setSelectedLang(customEvent.detail);
      }
    };
    window.addEventListener("sipnena_language_change", handleSync);
    return () => {
      window.removeEventListener("sipnena_language_change", handleSync);
    };
  }, []);

  const t = LOGIN_STRINGS[selectedLang] || LOGIN_STRINGS.en;

  const handleLanguageChange = (code: AppLanguage) => {
    setSelectedLang(code);
    saveLanguage(code);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      void navigate({ to: "/welcome-language" });
    }
  };

  const handleCreateAccount = () => {
    void navigate({ to: "/create-account" });
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#F4F7FB]"
      style={{
        fontFamily:
          "'Noto Sans', 'Noto Sans Sinhala', 'Noto Sans Tamil', sans-serif",
      }}
    >
      {/* Responsive Top Navigation Header */}
      <header className="w-full bg-white/95 backdrop-blur border-b sticky top-0 z-20 px-3 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between gap-2 border-slate-200">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={handleBack}
            aria-label={t.backBtn}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-white shrink-0 bg-blue-600 shadow-xs">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-none block truncate">
                SipNena
              </span>
              <span className="text-[11px] text-slate-500 font-medium truncate hidden min-[480px]:block">
                {t.brandSubtitle}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
            <ShieldCheck
              className="w-3.5 h-3.5 text-emerald-600"
              aria-hidden="true"
            />
            <span>{t.topBadge}</span>
          </div>

          <CompactLanguageSwitcher
            selectedLang={selectedLang}
            onLanguageChange={handleLanguageChange}
            ariaLabel={t.langSwitcherAria}
          />
        </div>
      </header>

      {/* Main Centered Login Frame */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex items-center justify-center animate-page-enter">
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
          <LoginHighlightCard t={t} />

          <LoginForm
            t={t}
            selectedLang={selectedLang}
            onCreateAccountClick={handleCreateAccount}
          />
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-xs text-slate-500">
        {t.pageBottomFooter}
      </footer>
    </div>
  );
}
```

### `apps/web/src/features/create-account/screen.tsx`

```tsx
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { CompactLanguageSwitcher } from "@/features/onboarding/compact-language-switcher";
import { CreateAccountHighlightCard } from "./highlight-card";
import { CreateAccountForm } from "./create-account-form";
import { CREATE_ACCOUNT_CONFIG, CREATE_ACCOUNT_STRINGS } from "./strings";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/features/onboarding/language-preference";

export function CreateAccountScreen() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] =
    useState<AppLanguage>(getSavedLanguage);
  const [formFeedback, setFormFeedback] = useState<{
    type: "info" | "warning" | "success";
    text: string;
  } | null>(null);

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<AppLanguage>;
      if (customEvent.detail) {
        setSelectedLang(customEvent.detail);
      }
    };
    window.addEventListener("sipnena_language_change", handleSync);
    return () => {
      window.removeEventListener("sipnena_language_change", handleSync);
    };
  }, []);

  const t = CREATE_ACCOUNT_STRINGS[selectedLang] || CREATE_ACCOUNT_STRINGS.en;

  const handleLanguageChange = (code: AppLanguage) => {
    setSelectedLang(code);
    saveLanguage(code);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      void navigate({ to: "/welcome-language" });
    }
  };

  const handleLogin = () => {
    void navigate({ to: "/login" });
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#F4F7FB]"
      style={{
        fontFamily:
          "'Noto Sans', 'Noto Sans Sinhala', 'Noto Sans Tamil', sans-serif",
      }}
    >
      {/* Responsive Top Navigation Header */}
      <header className="w-full bg-white/95 backdrop-blur border-b sticky top-0 z-20 px-3 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between gap-2 border-slate-200">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={handleBack}
            aria-label={t.backBtn}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-white shrink-0 bg-blue-600 shadow-xs">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-none block truncate">
                {CREATE_ACCOUNT_CONFIG.brandName}
              </span>
              <span className="text-[11px] text-slate-500 font-medium truncate hidden min-[480px]:block">
                {t.brandSubtitle}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
            <ShieldCheck
              className="w-3.5 h-3.5 text-emerald-600"
              aria-hidden="true"
            />
            <span>{t.topBadge}</span>
          </div>

          <CompactLanguageSwitcher
            selectedLang={selectedLang}
            onLanguageChange={handleLanguageChange}
            ariaLabel={t.langSwitcherAria}
          />
        </div>
      </header>

      {/* Main Centered Auth Form Frame */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex items-center justify-center animate-page-enter">
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
          <CreateAccountHighlightCard t={t} />

          <CreateAccountForm
            t={t}
            selectedLang={selectedLang}
            onLoginClick={handleLogin}
            formFeedback={formFeedback}
            setFormFeedback={setFormFeedback}
          />
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-xs text-slate-500">
        {t.pageBottomFooter}
      </footer>
    </div>
  );
}
```
