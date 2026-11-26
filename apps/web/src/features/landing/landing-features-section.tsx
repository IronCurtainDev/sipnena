import { LANDING_FEATURES } from "./mock-data";
import type { LandingStrings } from "./strings.types";

interface LandingFeaturesSectionProps {
  t: LandingStrings;
}

export function LandingFeaturesSection({ t }: LandingFeaturesSectionProps) {
  return (
    <section id="why-easy" className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-extrabold text-[var(--sn-text-main)] sm:text-2xl">
            {t.whyEasyTitle}
          </h2>
          <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
            {t.whyEasySubtitle}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LANDING_FEATURES.map((f, index) => (
            <div key={f.id} className="border-t border-[var(--sn-border)] pt-4">
              <p className="text-xs font-bold text-[var(--sn-moss)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-sm font-bold text-[var(--sn-text-main)]">
                {f.titleEn}
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-[var(--sn-primary)]">
                {f.titleSi}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--sn-text-secondary)]">
                {f.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
