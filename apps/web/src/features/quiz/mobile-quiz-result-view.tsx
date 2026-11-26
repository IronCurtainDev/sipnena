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
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-3 backdrop-blur-xs">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="truncate text-sm font-bold text-slate-900">
            {t.headerTitle || "Quiz Results"}
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
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white hover:bg-[var(--sn-primary-hover)] transition"
            aria-label="Profile (Me)"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Pill header */}
      <div className="border-b border-slate-200 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-primary)]">
          <span>🧪</span>
          <span className="truncate">{t.pillUnit}</span>
        </div>
      </div>

      {/* Main Body */}
      <main className="p-4 space-y-5">
        {/* Score Header Card */}
        <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-6 text-center space-y-4 shadow-xs">
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
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {result.isPassed ? t.wellDoneSub : t.almostThereSub}
            </p>
          </div>

          {/* 3 Stats Row */}
          <div className="grid w-full grid-cols-3 gap-2 border-t border-slate-100 pt-4">
            <div className="rounded-xl bg-slate-50 p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-700">
                <Check className="h-3.5 w-3.5" />
                <span>{result.score}</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {t.statCorrect}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-700">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{result.totalQuestions - result.score}</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {t.statToReview}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-800">
                <Clock className="h-3.5 w-3.5" />
                <span>{result.timeSpent}</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Spent
              </div>
            </div>
          </div>
        </div>

        {/* Quick Science Tip */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/70 p-4">
          <span className="text-base">💡</span>
          <div className="space-y-0.5 text-xs text-[var(--sn-text-main)]">
            <div className="font-bold">{t.scienceTipTitle}</div>
            <p className="leading-relaxed text-[var(--sn-text-main)] font-medium">
              {result.scienceTip}
            </p>
          </div>
        </div>

        {/* Question Breakdown List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-slate-900">
              {t.breakdownTitle}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              See which questions to practice
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
                        <div className="text-[11px] font-bold text-slate-500">
                          Q{q.questionNumber} •{" "}
                          <span
                            className={
                              q.isCorrect
                                ? "text-emerald-700"
                                : "text-amber-700"
                            }
                          >
                            {q.isCorrect ? "Correct" : "To review"}
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

                  {/* Expanded tip */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/60 p-3 text-xs space-y-2">
                      {!q.isCorrect && (
                        <div className="space-y-1">
                          <div className="text-amber-900 font-semibold">
                            Your answer: {q.userAnswer}
                          </div>
                          <div className="text-emerald-800 font-bold">
                            Correct: {q.correctAnswer}
                          </div>
                        </div>
                      )}
                      <div className="rounded-lg bg-white p-2.5 text-slate-700 border border-slate-200">
                        <span className="font-bold">Tip: </span>
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

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 inset-x-0 z-30 border-t border-slate-200 bg-white/95 p-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] backdrop-blur-xs space-y-2">
        {result.isPassed ? (
          <button
            type="button"
            onClick={onNextLesson}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 font-bold text-white shadow-md hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
          >
            <span>Next lesson</span>
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
          onClick={() => onReviewLesson("Notes")}
          className="w-full text-center text-xs font-bold text-[var(--sn-primary)] hover:underline py-1"
        >
          {result.isPassed
            ? "Back to Science Grade 8 course"
            : "Review lesson notes first"}
        </button>
      </div>
    </div>
  );
}
