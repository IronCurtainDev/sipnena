import {
  ArrowRight,
  Check,
  Globe,
  Languages,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { AnimatedStudentsScene } from "@/components/app/animated-students-scene";
import { ONBOARDING_CONFIG } from "./tokens";
import type { OnboardingStrings } from "./strings";

interface ContentProps {
  t: OnboardingStrings;
  selectedLang: string;
  onLanguageChange: (code: string) => void;
  onContinue: () => void;
  statusMessage: string;
}

export function LanguageSetupContent({
  t,
  selectedLang,
  onLanguageChange,
  onContinue,
  statusMessage,
}: ContentProps) {
  return (
    <div key={selectedLang} className="w-full animate-lang-switch">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-[var(--sn-border)] p-4 sm:p-5 shadow-sm">
            <AnimatedStudentsScene />

            <div className="mt-4 space-y-1 border-t border-[var(--sn-border)] pt-4">
              <h2 className="text-base font-bold text-[var(--sn-text-main)]">
                {t.featureTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--sn-text-secondary)] leading-relaxed">
                {t.featureDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 bg-white rounded-2xl border border-[var(--sn-border)] px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
              <Check
                className="w-4 h-4 shrink-0 text-emerald-600"
                aria-hidden="true"
              />
              <span>{t.supportedBanner}</span>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--sn-olive)] text-[var(--sn-primary)] shrink-0">
              {t.freeBadge}
            </span>
          </div>
        </div>

        <section
          aria-labelledby="language-setup-heading"
          className="lg:col-span-6 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-3 bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]">
            <Languages className="w-4 h-4" aria-hidden="true" />
            <span>{t.stepBadge}</span>
          </div>

          <h1
            id="language-setup-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            {t.heading}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {t.subheading}
          </p>

          <div
            role="radiogroup"
            aria-label={t.languageGroupLabel}
            className="w-full mt-5 grid grid-cols-3 gap-2 sm:gap-3"
          >
            {ONBOARDING_CONFIG.languages.map((lang) => {
              const isSelected = selectedLang === lang.code;
              const subKey = `langSub_${lang.code}` as keyof OnboardingStrings;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`relative min-h-[96px] sm:min-h-[112px] rounded-2xl border px-1.5 py-3 sm:px-3 sm:py-4 flex flex-col items-center justify-center gap-1.5 text-center transition-all hover:border-[var(--sn-border-selected)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--sn-primary)] ${
                    isSelected
                      ? "bg-[var(--sn-surface-selected)] border-[var(--sn-border-selected)] border-[1.5px] shadow-xs"
                      : "bg-white border-[var(--sn-border)]"
                  }`}
                >
                  {isSelected ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[var(--sn-primary)] flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </span>
                  ) : null}

                  <span
                    aria-hidden="true"
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors shadow-xs ${
                      isSelected
                        ? "bg-[var(--sn-primary)] text-[var(--sn-cream)]"
                        : "bg-[var(--sn-surface-muted)] text-[var(--sn-text-secondary)]"
                    }`}
                  >
                    {lang.badge}
                  </span>

                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug px-0.5">
                    {lang.nativeTitle}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 leading-tight px-0.5 line-clamp-2">
                    {t[subKey]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-full sm:w-auto mt-6">
            <button
              type="button"
              onClick={onContinue}
              className="w-full sm:w-auto min-w-[200px] min-h-[48px] px-8 rounded-xl text-base font-semibold text-[var(--sn-cream)] inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.99] hover:opacity-95 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--sn-primary)] bg-[var(--sn-primary)] hover:bg-[var(--sn-primary-hover)]"
            >
              <span>{t.continueBtn}</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {statusMessage ? (
            <p
              role="status"
              aria-live="polite"
              className="mt-3 text-xs sm:text-sm font-medium text-[var(--sn-primary)]"
            >
              {statusMessage}
            </p>
          ) : null}

          <div className="w-full mt-5 pt-4 border-t border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Globe
                className="w-4 h-4 text-slate-400 shrink-0"
                aria-hidden="true"
              />
              <span>{t.settingsNote}</span>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Smartphone
                  className="w-4 h-4 shrink-0 text-[var(--sn-primary)]"
                  aria-hidden="true"
                />
                <span>{t.phoneSync}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck
                  className="w-4 h-4 shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                <span>{t.curriculumBadge}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
