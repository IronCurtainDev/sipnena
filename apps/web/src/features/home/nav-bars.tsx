import { BookOpen, User } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { NAV_ITEMS } from "./mock-data";
import { HOME_STRINGS } from "./strings";

interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  lang: AppLanguage;
}

export function TabletRail({ activeTab, onTabChange, lang }: NavProps) {
  const t = HOME_STRINGS[lang];

  return (
    <aside
      aria-label="Primary tablet navigation"
      className="sticky top-0 hidden h-svh w-20 shrink-0 flex-col items-center justify-between overflow-y-auto border-r border-[var(--sn-border)] bg-[var(--sn-surface)] py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex lg:hidden"
    >
      <div className="flex w-full flex-col items-center gap-5 px-1.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sn-primary)] text-white shadow-xs">
          <BookOpen className="h-5 w-5" aria-hidden="true" />
        </div>

        <nav className="flex w-full flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-[56px] w-full flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                  isActive
                    ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                    : "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)] active:scale-[0.99]"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="line-clamp-1 text-center leading-tight">
                  {t[item.labelKey]}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-4 px-2 text-center">
        <span className="rounded-md bg-[var(--sn-surface-selected)] px-2 py-0.5 text-[11px] font-bold text-[var(--sn-primary)]">
          O/L
        </span>
      </div>
    </aside>
  );
}

export function MobileBottomNav({ activeTab, onTabChange, lang }: NavProps) {
  const t = HOME_STRINGS[lang];

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 gap-1 border-t border-[var(--sn-border)] bg-[var(--sn-surface)]/95 px-2 py-1.5 shadow-lg backdrop-blur-md sm:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            aria-current={isActive ? "page" : undefined}
            className={`flex min-h-[54px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
              isActive
                ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                : "text-[var(--sn-text-muted)] hover:text-[var(--sn-text-main)]"
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="max-w-full truncate">{t[item.labelKey]}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function HomeTopBar({
  lang,
  onLanguageChange,
  onProfileClick,
}: {
  lang: AppLanguage;
  onLanguageChange: (l: AppLanguage) => void;
  onProfileClick: () => void;
}) {
  const t = HOME_STRINGS[lang];

  return (
    <>
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[var(--sn-border)] bg-[var(--sn-surface)]/95 px-4 backdrop-blur-md sm:hidden">
        <h1 className="text-lg font-bold tracking-tight text-[var(--sn-text-main)]">
          {t.mobileHeaderTitle}
        </h1>

        <div className="flex items-center gap-2">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
            ariaLabel={t.langGroupAria}
            size="sm"
          />

          <button
            type="button"
            onClick={onProfileClick}
            aria-label={t.profileAria}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            <User className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      <header className="sticky top-0 z-20 hidden h-14 shrink-0 items-center justify-between border-b border-[var(--sn-border)] bg-[var(--sn-surface)]/95 px-6 backdrop-blur-md sm:flex lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--sn-text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--sn-primary)]" />
          <span>{t.topContextPill}</span>
        </div>

        <div className="flex items-center gap-3">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
            ariaLabel={t.langGroupAria}
          />

          <button
            type="button"
            onClick={onProfileClick}
            aria-label={t.profileAria}
            className="flex items-center gap-2.5 rounded-full p-1 transition hover:bg-[var(--sn-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--sn-primary)] font-bold text-white shadow-xs">
              K
            </span>
            <span className="hidden text-left text-xs sm:block">
              <span className="block font-bold text-[var(--sn-text-main)]">
                Kasun P.
              </span>
              <span className="block font-semibold text-[var(--sn-primary)]">
                {t.gradeLabel}
              </span>
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
