import { CheckCircle2 } from "lucide-react";
import { LANDING_PARENT_CHECKS } from "./mock-data";
import type { LandingStrings } from "./strings.types";

interface LandingParentsSectionProps {
  onHowItWorksForParents: () => void;
  t: LandingStrings;
}

export function LandingParentsSection({
  onHowItWorksForParents,
  t,
}: LandingParentsSectionProps) {
  return (
    <section id="parents" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[1.5rem] border border-[var(--sn-border)] bg-[var(--sn-olive)]/50 p-6 sm:p-10">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--sn-primary)]">
                Parents
              </p>
              <h2 className="text-xl font-extrabold text-[var(--sn-text-main)] sm:text-2xl">
                {t.forParentsTitle}
              </h2>
              <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
                {t.forParentsDesc}
              </p>
              <button
                type="button"
                onClick={onHowItWorksForParents}
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-[var(--sn-primary)] bg-[var(--sn-surface)] px-5 text-sm font-bold text-[var(--sn-primary)] transition hover:bg-[var(--sn-surface)] active:scale-[0.99]"
              >
                {t.howItWorksForParentsBtn}
              </button>
            </div>

            <ul className="space-y-3 lg:col-span-7">
              {LANDING_PARENT_CHECKS.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 border-t border-[var(--sn-border)] pt-3 first:border-t-0 first:pt-0"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--sn-primary)]" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-[var(--sn-text-main)]">
                      {item.titleEn}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--sn-primary)]">
                      {item.titleSi}
                    </p>
                    <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
                      {item.descEn}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
