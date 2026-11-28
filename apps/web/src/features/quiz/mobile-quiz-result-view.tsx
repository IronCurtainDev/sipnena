import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  RotateCcw,
  User,
  X,
} from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import type { AppLanguage } from "@/lib/language";
import type { QuizResultStrings } from "./result-strings.types";
import type { QuizResultSummary } from "./result-types";
import { ScoreMeter } from "./score-meter";

interface MobileQuizResultViewProps {
  t: QuizResultStrings;
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  result: QuizResultSummary;
  onTryAgain: () => void;
  onNextLesson: () => void;
  onReviewLesson: (ref: string) => void;
  onBack: () => void;
  onNavTab?: (tab: string) => void;
}

export function MobileQuizResultView({
  t,
  lang,
  onLanguageChange,
  result,
  onTryAgain,
  onNextLesson,
  onReviewLesson,
  onBack,
  onNavTab,
}: MobileQuizResultViewProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="flex min-h-svh flex-col bg-slate-50 pb-36 text-slate-900">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-3 backdrop-blur-xs">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label={t.backAria}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="truncate text-sm font-bold text-slate-900">
            {t.headerTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
          />
          <button
            type="button"
            onClick={() => onNavTab?.("me")}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white transition hover:bg-[var(--sn-primary-hover)]"
            aria-label={t.profileAria}
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="border-b border-slate-200 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-primary)]">
          <span className="truncate">{t.pillUnit}</span>
        </div>
      </div>

      <main className="space-y-5 p-4">
        <div className="flex flex-col items-center space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xs">
          <ScoreMeter
            score={result.score}
            total={result.totalQuestions}
            isPassed={result.isPassed}
            passMark={result.passScore}
          />

          <div className="space-y-1.5">
            <h1 className="text-xl font-bold text-slate-900">
              {result.isPassed ? t.wellDoneTitle : t.almostThereTitle}
            </h1>
            <p className="text-xs font-normal leading-relaxed text-slate-600">
              {result.isPassed ? t.wellDoneSub : t.almostThereSub}
            </p>
          </div>

          <div className="grid w-full grid-cols-3 gap-2 border-t border-slate-100 pt-4">
            <div className="rounded-xl bg-slate-50 p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-emerald-700">
                <Check className="h-3.5 w-3.5" />
                <span>{result.score}</span>
              </div>
              <div className="text-xs font-medium text-slate-500">
                {t.statCorrect}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-700">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{result.totalQuestions - result.score}</span>
              </div>
              <div className="text-xs font-medium text-slate-500">
                {t.statToReview}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-800">
                <Clock className="h-3.5 w-3.5" />
                <span>{result.timeSpent}</span>
              </div>
              <div className="text-xs font-medium text-slate-500">
                {t.spentShort}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/70 p-4">
          <div className="space-y-0.5 text-xs text-[var(--sn-text-main)]">
            <div className="font-bold">{t.scienceTipTitle}</div>
            <p className="font-medium leading-relaxed text-[var(--sn-text-main)]">
              {result.scienceTip}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-1 px-1">
            <h2 className="text-sm font-bold text-slate-900">
              {t.breakdownTitle}
            </h2>
            <span className="text-xs font-medium text-slate-500">
              {t.breakdownMobileHint}
            </span>
          </div>

          <div className="space-y-2">
            {result.questions.map((q) => {
              const isExpanded = expandedId === q.id;

              return (
                <div
                  key={q.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="flex w-full items-center justify-between gap-3 p-3 text-left"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          q.isCorrect
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {q.isCorrect ? (
                          <Check className="h-4 w-4 stroke-[3]" />
                        ) : (
                          <X className="h-4 w-4 stroke-[3]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-500">
                          {t.questionShortPrefix} {q.questionNumber} •{" "}
                          <span
                            className={
                              q.isCorrect
                                ? "text-emerald-700"
                                : "text-amber-700"
                            }
                          >
                            {q.isCorrect
                              ? t.statusCorrectShort
                              : t.statusReviewShort}
                          </span>
                        </div>
                        <div className="truncate text-xs font-bold text-slate-900">
                          {q.title}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="space-y-2 border-t border-slate-100 bg-slate-50/60 p-3 text-xs">
                      {!q.isCorrect && (
                        <div className="space-y-1">
                          <div className="font-semibold text-amber-900">
                            {t.yourAnswerLabel}: {q.userAnswer}
                          </div>
                          <div className="font-bold text-emerald-800">
                            {t.correctAnswerLabel}: {q.correctAnswer}
                          </div>
                        </div>
                      )}
                      <div className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-700">
                        <span className="font-bold">{t.tipLabel} </span>
                        {q.teacherTip}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 space-y-2 border-t border-slate-200 bg-white/95 p-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] backdrop-blur-xs">
        {result.isPassed ? (
          <button
            type="button"
            onClick={onNextLesson}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 font-bold text-white shadow-md hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
          >
            <span>{t.nextLessonMobileBtn}</span>
            <span>→</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onTryAgain}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 font-bold text-white shadow-md hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t.tryAgainBtn}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onReviewLesson(t.breadcrumbUnit)}
          className="min-h-[44px] w-full py-1 text-center text-xs font-bold text-[var(--sn-primary)] hover:underline"
        >
          {result.isPassed ? t.backToCourseMobileBtn : t.reviewNotesMobileBtn}
        </button>
      </div>
    </div>
  );
}
