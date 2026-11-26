import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import type { AppLanguage } from "@/lib/language";
import type { LandingStrings } from "./strings.types";

interface LandingNavBarProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onStartFree: () => void;
  onLogin: () => void;
  onScrollToSection: (sectionId: string) => void;
  onExploreCourses?: () => void;
  t: LandingStrings;
}

export function LandingNavBar({
  lang,
  onLanguageChange,
  onStartFree,
  onLogin,
  onScrollToSection,
  t,
}: LandingNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--sn-border)] bg-[var(--sn-cream)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={handleBrandClick}
          className="text-left focus:outline-none"
        >
          <span className="text-lg font-black tracking-tight text-[var(--sn-text-main)] sm:text-xl">
            {t.brandName}
          </span>
        </button>

        <nav
          aria-label="Main menu"
          className="hidden items-center gap-8 text-sm font-medium text-[var(--sn-text-secondary)] lg:flex"
        >
          <button
            type="button"
            onClick={() => handleNavClick("grades")}
            className="hover:text-[var(--sn-primary)]"
          >
            {t.navGrades}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("subjects")}
            className="hover:text-[var(--sn-primary)]"
          >
            {t.navSubjects}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("parents")}
            className="hover:text-[var(--sn-primary)]"
          >
            {t.navParents}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("why-easy")}
            className="hover:text-[var(--sn-primary)]"
          >
            {t.navGuarantee}
          </button>
        </nav>

        <div className="flex items-center gap-2.5">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
            size="sm"
            showLabel={false}
          />

          <button
            type="button"
            onClick={onLogin}
            className="hidden text-sm font-bold text-[var(--sn-text-main)] hover:text-[var(--sn-primary)] lg:block"
          >
            {t.navLogin}
          </button>

          <button
            type="button"
            onClick={onStartFree}
            className="rounded-2xl bg-[var(--sn-primary)] px-4 py-2.5 text-xs font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.98]"
          >
            {t.startFreeBtn}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--sn-border)] text-[var(--sn-text-main)] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 pb-5 pt-4 shadow-lg lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {[
              { id: "grades", label: t.navGrades },
              { id: "subjects", label: t.navSubjects },
              { id: "parents", label: t.navParents },
              { id: "why-easy", label: t.navGuarantee },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className="rounded-xl bg-[var(--sn-olive)] px-3 py-2.5 text-left text-sm font-semibold text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)] active:scale-[0.98] transition"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onLogin();
              }}
              className="flex-1 rounded-xl border border-[var(--sn-border)] py-2.5 text-sm font-bold text-[var(--sn-text-main)] transition"
            >
              {t.navLogin}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartFree();
              }}
              className="flex-1 rounded-xl bg-[var(--sn-primary)] py-2.5 text-sm font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.98]"
            >
              {t.startFreeBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
