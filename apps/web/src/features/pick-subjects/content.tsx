import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { OlBasketsPicker } from "./ol-baskets";
import { SubjectGrid } from "./subject-grid";
import type { PickSubjectsStrings } from "./strings";

interface Props {
  t: PickSubjectsStrings;
  lang: AppLanguage;
  grade: number;
  onChangeGrade: (grade: number) => void;
  olBaskets: { basket1: string; basket2: string; basket3: string };
  onSelectBasket: (
    basketId: "basket1" | "basket2" | "basket3",
    optionId: string,
  ) => void;
  selectedSubjects: Record<string, boolean>;
  onToggleSubject: (id: string) => void;
  onProceed: () => void;
}

export function PickSubjectsContent({
  t,
  lang,
  grade,
  onChangeGrade,
  olBaskets,
  onSelectBasket,
  selectedSubjects,
  onToggleSubject,
  onProceed,
}: Props) {
  const [showHelp, setShowHelp] = useState(false);
  const isOL = grade >= 10;
  const selectedCount = isOL
    ? 9
    : Object.values(selectedSubjects).filter(Boolean).length;
  const hasAtLeastOne = selectedCount > 0;

  const countBadge =
    selectedCount === 1
      ? t.mobileSelectedOne
      : t.mobileSelectedMany.replace("{count}", String(selectedCount));

  return (
    <div className="md:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-5">
      {/* Top Mobile Title / Desktop Subheader Row */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--sn-sage)] text-[var(--sn-primary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--sn-primary)]" />
            <span>{t.stepPillDesktop}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => onChangeGrade(8)}
                className={`rounded-full px-2.5 py-1 transition ${
                  !isOL
                    ? "bg-white text-[var(--sn-primary)] shadow-2xs"
                    : "text-slate-500"
                }`}
              >
                {lang === "si"
                  ? "6–9 ශ්‍රේණි"
                  : lang === "ta"
                    ? "தரம் 6–9"
                    : "Grades 6–9"}
              </button>
              <button
                type="button"
                onClick={() => onChangeGrade(11)}
                className={`rounded-full px-2.5 py-1 transition ${
                  isOL
                    ? "bg-[var(--sn-primary)] text-white shadow-2xs"
                    : "text-slate-500"
                }`}
              >
                {lang === "si"
                  ? "10–11 ශ්‍රේණි (O/L)"
                  : lang === "ta"
                    ? "தரம் 10–11 (சா/த)"
                    : "Grades 10–11 (O/L)"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowHelp((prev) => !prev)}
              aria-expanded={showHelp}
              aria-label={t.helpBtnAria}
              className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold shrink-0 ${
                hasAtLeastOne
                  ? "bg-[var(--sn-olive)] border-[var(--sn-border)] text-[var(--sn-primary)]"
                  : "bg-amber-50 border-amber-200 text-amber-700"
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
              <span>{countBadge}</span>
            </div>
          </div>
        </div>

        {showHelp && (
          <div
            role="status"
            className="rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/60 p-3 flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 animate-page-enter"
          >
            <Lightbulb className="w-4 h-4 text-[var(--sn-primary)] shrink-0 mt-0.5" />
            <p className="leading-relaxed">{t.helpCalloutText}</p>
          </div>
        )}

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {isOL
              ? lang === "si"
                ? `${grade} ශ්‍රේණිය සා/පෙළ විෂයයන් සහ කාණ්ඩ`
                : lang === "ta"
                  ? `தரம் ${grade} சா/த பாடங்கள் & பிரிவுகள்`
                  : `Grade ${grade} G.C.E. O/L Subjects & Baskets`
              : t.cardGroupTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {isOL
              ? lang === "si"
                ? "ප්‍රධාන විෂයයන් 6 සහ 1, 2, 3 කාණ්ඩ වලින් එක බැගින් තෝරන්න"
                : lang === "ta"
                  ? "6 கட்டாயப் பாடங்கள் மற்றும் I, II, III பிரிவுகளில் தலா 1 பாடம்"
                  : "6 core subjects plus 1 subject from each O/L Basket (I, II & III)"
              : t.cardGroupSubtitle}
          </p>
        </div>
      </div>

      {isOL ? (
        <OlBasketsPicker
          lang={lang}
          baskets={olBaskets}
          onSelectBasket={onSelectBasket}
        />
      ) : (
        <SubjectGrid
          t={t}
          selectedSubjects={selectedSubjects}
          onToggleSubject={onToggleSubject}
        />
      )}

      {/* Bottom Action Area */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3.5">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <span
            aria-hidden="true"
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              hasAtLeastOne
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {hasAtLeastOne ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
          </span>
          <div className="text-xs sm:text-sm text-slate-700">
            {hasAtLeastOne ? (
              <span className="font-semibold text-slate-900">
                {selectedCount === 1
                  ? t.desktopReadyOne
                  : t.desktopReadyMany.replace(
                      "{count}",
                      String(selectedCount),
                    )}
              </span>
            ) : (
              <span className="font-semibold text-amber-800">
                {t.zeroWarningTitle}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onProceed}
          disabled={!hasAtLeastOne}
          className="w-full sm:w-auto min-h-[46px] px-6 rounded-xl font-bold flex items-center justify-center gap-2 bg-[var(--sn-primary)] text-white hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
        >
          <span>{t.continueBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
