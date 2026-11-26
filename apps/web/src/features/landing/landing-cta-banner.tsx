import { ArrowRight } from "lucide-react";
import type { LandingStrings } from "./strings.types";

interface LandingCtaBannerProps {
  onStartFree: () => void;
  t: LandingStrings;
}

export function LandingCtaBanner({ onStartFree, t }: LandingCtaBannerProps) {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[2rem] bg-[var(--sn-primary)] p-8 text-center text-[var(--sn-cream)] sm:p-12">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              {t.ctaBannerTitle}
            </h2>
            <p className="text-sm font-semibold text-[var(--sn-sage)]">
              {t.ctaBannerSub}
            </p>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-[var(--sn-olive)]">
              {t.ctaBannerDesc}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onStartFree}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-[var(--sn-cream)] px-8 py-3.5 text-sm font-bold text-[var(--sn-primary)] transition hover:bg-white active:scale-[0.98] sm:text-base"
              >
                <span>{t.startFreeBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
