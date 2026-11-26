import { User } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { PrototypeRoleSwitcher } from "@/features/portal-shell/role-switcher";
import type { CourseStrings } from "./strings.types";

interface CoursesTopBarProps {
  lang: AppLanguage;
  onLanguageChange: (l: AppLanguage) => void;
  onProfileClick: () => void;
  t: CourseStrings;
}

export function CoursesTopBar({
  lang,
  onLanguageChange,
  onProfileClick,
  t,
}: CoursesTopBarProps) {
  return (
    <>
      {/* MOBILE TOP BAR (< 640px) */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 sm:hidden">
        <h1 className="text-xl font-bold text-[var(--sn-text-main)]">
          {t.mobilePageTitle}
        </h1>

        <div className="flex items-center gap-2">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
            size="sm"
          />

          <button
            type="button"
            onClick={onProfileClick}
            aria-label={t.profileAria}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white shadow-xs transition hover:bg-[var(--sn-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] focus-visible:ring-offset-2"
          >
            <User className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* DESKTOP & TABLET TOP BAR (>= 640px) */}
      <header className="hidden h-16 shrink-0 items-center justify-between gap-2 border-b border-[var(--sn-border)] bg-[var(--sn-surface)] px-6 sm:flex lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="hidden xl:inline-flex items-center rounded-full bg-[var(--sn-surface-muted)] px-3.5 py-1.5 text-sm font-semibold text-[var(--sn-text-secondary)]">
            {t.topContextPill}
          </div>
          <PrototypeRoleSwitcher lang={lang} activeRoleOverride="student" />
        </div>

        <div className="flex items-center gap-3">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
          />

          <button
            type="button"
            onClick={onProfileClick}
            aria-label={t.profileAria}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white shadow-xs transition hover:bg-[var(--sn-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] focus-visible:ring-offset-2"
          >
            <User className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>
    </>
  );
}
