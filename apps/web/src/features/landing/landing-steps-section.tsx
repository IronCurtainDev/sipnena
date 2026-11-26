import { LANDING_STEPS } from "./mock-data";
import type { LandingStrings } from "./strings.types";

interface LandingStepsSectionProps {
  t: LandingStrings;
}

export function LandingStepsSection({ t }: LandingStepsSectionProps) {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-xl font-extrabold text-[var(--sn-text-main)] sm:text-2xl">
            {t.howItWorksTitle}
          </h2>
          <p className="mt-1 text-xs text-[var(--sn-text-secondary)] sm:text-sm">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {LANDING_STEPS.map((s) => (
            <div
              key={s.step}
              className="flex flex-col items-center rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 text-center shadow-xs transition hover:shadow-sm"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black ${s.badgeBg}`}
              >
                {s.step}
              </div>

              <h3 className="mt-4 text-sm font-bold text-[var(--sn-text-main)] sm:text-base">
                {s.titleEn}
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-[var(--sn-primary)]">
                {s.titleSi}
              </p>

              <p className="mt-2 text-xs leading-relaxed text-[var(--sn-text-secondary)]">
                {s.descEn}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-[var(--sn-text-muted)]">
                {s.descSi}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
