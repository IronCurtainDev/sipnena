import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lightbulb,
  RotateCcw,
  User,
} from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { DesktopSidebar } from "@/features/home/nav-sidebar";
import type { AppLanguage } from "@/lib/language";
import { QuestionBreakdown } from "./question-breakdown";
import { ResultSidebarWidgets } from "./result-sidebar-widgets";
import type { QuizResultStrings } from "./result-strings.types";
import type { QuizResultSummary } from "./result-types";
import { ScoreMeter } from "./score-meter";

interface DesktopQuizResultViewProps {
  t: QuizResultStrings;
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  activeNav: string;
  onNavTab: (tab: string) => void;
  result: QuizResultSummary;
  onTryAgain: () => void;
  onNextLesson: () => void;
  onReviewLesson: (ref: string) => void;
  onBackToCourse: () => void;
  onToast: (msg: string) => void;
}

export function DesktopQuizResultView({
  t,
  lang,
  onLanguageChange,
  activeNav,
  onNavTab,
  result,
  onTryAgain,
  onNextLesson,
  onReviewLesson,
  onBackToCourse,
  onToast,
}: DesktopQuizResultViewProps) {
  const [filter, setFilter] = useState<"all" | "review" | "correct">("all");

  return (
    <div className="hidden min-h-svh flex-row bg-slate-50 lg:flex">
      <DesktopSidebar
        activeTab={activeNav}
        onTabChange={onNavTab}
        lang={lang}
      />

      <div className="flex min-w-0 flex-1 flex-col pb-20">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700">
            {t.topContext}
          </div>

          <div className="flex items-center gap-3">
            <CompactLanguageSwitcher
              selectedLang={lang}
              onLanguageChange={onLanguageChange}
            />
            <button
              type="button"
              onClick={() => onNavTab("me")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white shadow-xs transition hover:bg-[var(--sn-primary-hover)]"
              aria-label={t.profileAria}
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="w-full flex-1 space-y-6 px-6 py-6 xl:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs font-semibold text-slate-500">
              <button
                type="button"
                onClick={onBackToCourse}
                className="inline-flex items-center gap-1.5 font-bold text-[var(--sn-primary)] hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{t.breadcrumbBack}</span>
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => onNavTab("courses")}
                className="text-slate-600 transition hover:text-[var(--sn-primary)] hover:underline"
              >
                {t.breadcrumbSubject}
              </button>
              <span>&gt;</span>
              <button
                type="button"
                onClick={onBackToCourse}
                className="text-slate-600 transition hover:text-[var(--sn-primary)] hover:underline"
              >
                {t.breadcrumbTopic}
              </button>
              <span>&gt;</span>
              <button
                type="button"
                onClick={() => onReviewLesson(t.breadcrumbUnit)}
                className="text-slate-600 transition hover:text-[var(--sn-primary)] hover:underline"
              >
                {t.breadcrumbUnit}
              </button>
              <span>&gt;</span>
              <span className="font-bold text-slate-900">
                {t.breadcrumbResult}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700">
                <span className="h-2 w-2 rounded-full bg-[var(--sn-primary)]" />
                <span>{t.badgeGrade}</span>
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {t.badgeTerm}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="min-w-0 space-y-6">
              <div className="relative space-y-6 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                  <ScoreMeter
                    score={result.score}
                    total={result.totalQuestions}
                    isPassed={result.isPassed}
                    passMark={result.passScore}
                  />

                  <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex items-center justify-center gap-2 sm:justify-start">
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                          result.isPassed
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {result.isPassed
                          ? t.competencyAttained
                          : `${t.passMarkPrefix} ${result.passScore} / ${result.totalQuestions} ${t.questionsUnit}`}
                      </span>
                    </div>

                    <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
                      {result.isPassed ? t.wellDoneTitle : t.almostThereTitle}
                    </h1>

                    <p className="text-xs font-semibold text-[var(--sn-primary)] sm:text-sm">
                      {result.isPassed
                        ? t.wellDoneBilingual
                        : t.almostThereBilingual}
                    </p>

                    <p className="text-sm leading-relaxed text-slate-600">
                      {result.isPassed ? t.wellDoneSub : t.almostThereSub}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-4">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-center">
                    <div className="text-xs font-semibold text-slate-500">
                      {t.statCorrect}
                    </div>
                    <div className="text-base font-black text-emerald-600">
                      {result.score} {t.questionsUnit}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-center">
                    <div className="text-xs font-semibold text-slate-500">
                      {t.statToReview}
                    </div>
                    <div className="text-base font-black text-amber-600">
                      {result.totalQuestions - result.score} {t.questionsUnit}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-center">
                    <div className="text-xs font-semibold text-slate-500">
                      {t.statTimeSpent}
                    </div>
                    <div className="text-base font-black text-slate-900">
                      {result.timeSpent}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-center">
                    <div className="text-xs font-semibold text-slate-500">
                      {t.statAttempts}
                    </div>
                    <div className="text-base font-black text-[var(--sn-primary)]">
                      {result.attemptsUsed} {t.ofUnlimited}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/70 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-primary)] text-white shadow-2xs">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5 text-xs text-[var(--sn-text-main)]">
                    <div className="font-bold">{t.scienceTipTitle}</div>
                    <p className="font-medium leading-relaxed text-[var(--sn-text-main)]">
                      {result.scienceTip}
                    </p>
                  </div>
                </div>
              </div>

              <QuestionBreakdown
                t={t}
                questions={result.questions}
                filter={filter}
                onFilterChange={setFilter}
                onReviewLesson={onReviewLesson}
              />

              <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs sm:flex-row">
                <button
                  type="button"
                  onClick={onTryAgain}
                  className="flex min-h-[46px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>{t.tryAgainBtn}</span>
                </button>

                {result.isPassed ? (
                  <button
                    type="button"
                    onClick={onNextLesson}
                    className="flex min-h-[46px] items-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-sm font-bold text-white shadow-md transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
                  >
                    <span>{t.nextLessonBtn}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onReviewLesson(t.breadcrumbUnit)}
                    className="flex min-h-[46px] items-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-sm font-bold text-white shadow-md transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>{t.reviewNotesBtn}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="hidden xl:block">
              <ResultSidebarWidgets
                t={t}
                isPassed={result.isPassed}
                onStartNextLesson={onNextLesson}
                onReviewLesson={onReviewLesson}
                onAskTeacher={() => onToast(t.whatsappToast)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
