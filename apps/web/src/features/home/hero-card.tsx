import { CheckCircle2, CloudDownload } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { HOME_STRINGS } from "./strings";

interface HeroCardProps {
  lang: AppLanguage;
  onToggleOffline: () => void;
}

export function HeroBanner({ lang, onToggleOffline }: HeroCardProps) {
  const t = HOME_STRINGS[lang];

  return (
    <section
      aria-label="Student greeting and daily goal"
      className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 py-4 sm:px-5 sm:py-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <p className="text-sm font-semibold text-[var(--sn-text-secondary)]">
            {t.termBadge}
          </p>

          <h1 className="text-2xl font-bold leading-normal text-[var(--sn-text-main)] sm:text-[1.75rem]">
            {t.greetingTitle}
          </h1>

          <p className="max-w-2xl text-base leading-normal text-[var(--sn-text-secondary)]">
            <span className="sm:hidden">{t.greetingBilingualSub}</span>
            <span className="hidden sm:inline">{t.heroSubtitle}</span>
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <div className="flex w-full items-center gap-2.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-3.5 py-2.5 sm:w-auto">
            <CheckCircle2
              className="h-5 w-5 shrink-0 text-emerald-600"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-[var(--sn-text-main)] sm:hidden">
                {t.todaysGoalMobile}
              </div>
              <div className="hidden text-xs font-bold text-[var(--sn-text-main)] sm:block">
                {t.todaysGoalLabel}
              </div>
              <div className="hidden text-xs font-medium text-[var(--sn-text-muted)] sm:block">
                {t.todaysGoalDesktop}
              </div>
            </div>
            <span className="ml-auto shrink-0 text-xs font-semibold text-[var(--sn-text-muted)] sm:hidden">
              {t.goalMinsShort}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleOffline}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 text-sm font-bold text-[var(--sn-primary)] transition hover:bg-[var(--sn-surface-selected)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:w-auto"
          >
            <CloudDownload className="h-4 w-4" aria-hidden="true" />
            <span>{t.offlineAccessBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
