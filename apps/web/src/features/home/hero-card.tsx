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
      className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-5 py-5 sm:px-6 sm:py-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 space-y-2">
          <span className="inline-flex items-center rounded-full bg-[var(--sn-surface-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--sn-text-secondary)]">
            {t.termBadge}
          </span>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--sn-text-main)] sm:text-3xl">
            {t.greetingTitle}
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-[var(--sn-text-secondary)] sm:text-base">
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
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 text-xs font-bold text-[var(--sn-primary)] transition hover:bg-[var(--sn-surface-selected)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:w-auto sm:min-h-[40px]"
          >
            <CloudDownload className="h-4 w-4" aria-hidden="true" />
            <span>{t.offlineAccessBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
