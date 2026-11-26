import { ArrowRight, Check, Play } from "lucide-react";
import { AnimatedStudentsScene } from "@/components/app/animated-students-scene";
import type { LandingStrings } from "./strings.types";

interface LandingHeroProps {
  onStartFree: () => void;
  onForParents: () => void;
  onWatchSample?: () => void;
  t: LandingStrings;
}

export function LandingHero({
  onStartFree,
  onForParents,
  onWatchSample,
  t,
}: LandingHeroProps) {
  const handlePlaySample = onWatchSample ?? onStartFree;

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-7">
            <p className="text-sm font-semibold text-[var(--sn-text-secondary)]">
              {t.heroBadge} · Grades 6–11
            </p>

            <h1 className="text-3xl font-black tracking-tight text-[var(--sn-text-main)] sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              {t.heroTitle}
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[var(--sn-text-secondary)]">
              {t.heroDescription}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onStartFree}
                className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-[var(--sn-primary)] px-6 py-3.5 text-sm font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] sm:text-base"
              >
                <span>{t.startFreeBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handlePlaySample}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-5 py-3.5 text-sm font-bold text-[var(--sn-text-main)] transition hover:bg-[var(--sn-olive)] active:scale-[0.99]"
              >
                <Play className="h-4 w-4 fill-current text-[var(--sn-primary)]" />
                <span>Watch free lessons</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onForParents}
              className="text-sm font-semibold text-[var(--sn-text-secondary)] underline-offset-4 hover:text-[var(--sn-primary)] hover:underline"
            >
              {t.forParentsBtn}
            </button>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs font-semibold text-[var(--sn-text-secondary)]">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 stroke-[3] text-[var(--sn-primary)]" />
                {t.trustNoCard}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 stroke-[3] text-[var(--sn-primary)]" />
                {t.trustFreePreviews}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 stroke-[3] text-[var(--sn-primary)]" />
                {t.trustChildSafe}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-[var(--sn-border)] bg-[var(--sn-surface)] lg:max-w-none">
              <div className="relative overflow-hidden bg-[var(--sn-text-main)]">
                <AnimatedStudentsScene aspectRatio="aspect-[16/10]" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                  <button
                    type="button"
                    onClick={handlePlaySample}
                    aria-label="Play free sample lesson"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sn-cream)] text-[var(--sn-primary)] shadow-lg transition hover:scale-105 active:scale-95"
                  >
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </button>
                </div>
              </div>
              <div className="px-4 py-3 text-sm text-[var(--sn-text-secondary)]">
                <p className="font-bold text-[var(--sn-text-main)]">
                  Unit 1: Light & Reflection
                </p>
                <p className="text-xs">
                  සිංහල / தமிழ் / English · Free preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
