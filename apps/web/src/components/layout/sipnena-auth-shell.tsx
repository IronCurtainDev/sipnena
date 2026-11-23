import type { ReactNode } from "react";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { brand } from "@/lib/brand";
import type { AppLanguage } from "@/lib/language";

interface ShellProps {
  selectedLang: AppLanguage;
  onLanguageChange: (code: AppLanguage) => void;
  langSwitcherAria: string;
  brandSubtitle: string;
  topBadge?: string;
  footer: string;
  onBack?: () => void;
  backAria?: string;
  children: ReactNode;
}

export function SipNenaOnboardingShell({
  selectedLang,
  onLanguageChange,
  langSwitcherAria,
  brandSubtitle,
  topBadge,
  footer,
  onBack,
  backAria,
  children,
}: ShellProps) {
  return (
    <div className="sipnena-onboarding min-h-screen flex flex-col justify-between overflow-x-hidden bg-[var(--sn-auth-bg)]">
      <header className="w-full bg-white/95 backdrop-blur border-b border-[var(--sn-border)] sticky top-0 z-20 px-3 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label={backAria ?? "Back"}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </button>
          ) : null}

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-white shrink-0 bg-[var(--sn-primary)] shadow-xs">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-none block truncate">
                {brand.name}
              </span>
              <span className="text-[11px] text-slate-500 font-medium truncate hidden min-[480px]:block">
                {brandSubtitle}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {topBadge ? (
            <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
              <ShieldCheck
                className="w-3.5 h-3.5 text-emerald-600"
                aria-hidden="true"
              />
              <span>{topBadge}</span>
            </div>
          ) : null}

          <CompactLanguageSwitcher
            selectedLang={selectedLang}
            onLanguageChange={onLanguageChange}
            ariaLabel={langSwitcherAria}
          />
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex items-center justify-center animate-page-enter">
        {children}
      </main>

      <footer className="py-4 px-6 text-center text-xs text-slate-500">
        {footer}
      </footer>
    </div>
  );
}
