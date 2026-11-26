import { ArrowLeft, User } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import type { AppLanguage } from "@/lib/language";
import type { CheckoutStrings } from "./strings.types";

interface CheckoutTopBarProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onBack: () => void;
  onProfileClick: () => void;
  t: CheckoutStrings;
  title?: string;
}

export function CheckoutTopBar({
  lang,
  onLanguageChange,
  onBack,
  onProfileClick,
  t,
  title,
}: CheckoutTopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--sn-border)] bg-[var(--sn-surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] text-[var(--sn-text-main)] shadow-2xs transition hover:bg-[var(--sn-surface-muted)]"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-[var(--sn-text-main)] sm:text-base">
              {title || t.brandName}
            </h1>
            <p className="hidden text-xs text-[var(--sn-text-muted)] sm:block">
              {t.brandSub}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
          />
          <button
            type="button"
            onClick={onProfileClick}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-primary)] transition hover:bg-[var(--sn-surface-selected)]"
            aria-label="Profile"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
