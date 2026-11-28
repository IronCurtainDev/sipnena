import { ArrowLeft, BookOpen, CheckCircle2, Clock, User } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import type { AppLanguage } from "@/lib/language";
import { QuestionCard } from "./question-card";
import type { QuizStrings } from "./strings";
import type { QuizQuestion } from "./types";

interface MobileQuizViewProps {
  t: QuizStrings;
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  isStarted: boolean;
  onStart: () => void;
  onReviewNotes: () => void;
  question: QuizQuestion;
  selectedOption: string | null;
  onSelectOption: (id: string) => void;
  isChecked: boolean;
  onCheck: () => void;
  onNext: () => void;
  onBack: () => void;
  onNavTab?: (tab: string) => void;
}

export function MobileQuizView({
  t,
  lang,
  onLanguageChange,
  isStarted,
  onStart,
  onReviewNotes,
  question,
  selectedOption,
  onSelectOption,
  isChecked,
  onCheck,
  onNext,
  onBack,
  onNavTab,
}: MobileQuizViewProps) {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50 pb-20 text-slate-900">
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
            {isStarted
              ? `${t.questionProgressPrefix} ${question.questionNumber}: ${t.mobileHeaderQuestionLabel}`
              : t.mobileHeaderCheckpoint}
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

      {isStarted ? (
        <div className="space-y-2 border-b border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-1.5 text-slate-800">
              <span className="h-2 w-2 rounded-full bg-[var(--sn-primary)]" />
              <span>
                {t.questionProgressPrefix} {question.questionNumber}{" "}
                {t.questionProgressOf} {question.totalQuestions}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                {t.mobileSubjectBadge}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                <Clock className="h-3 w-3" />
                01:14
              </span>
            </div>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full bg-[var(--sn-primary)] transition-all duration-300"
              style={{
                width: `${(question.questionNumber / question.totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>
      ) : null}

      <main className="space-y-5 p-4">
        {!isStarted ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900">
                {t.quizTimeHeading}
              </h1>
              <p className="text-sm font-normal leading-relaxed text-slate-600">
                {t.mobileIntroDesc}
              </p>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-700">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-500">
                    {t.assessmentGradeTag}
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {t.moduleTitle}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl bg-slate-50 p-2.5">
                  <div className="text-xs text-slate-500">
                    {t.questionsLabel}
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    {t.questionsValue}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5">
                  <div className="text-xs text-slate-500">
                    {t.estDurationLabel}
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    {t.estDurationValue}
                  </div>
                </div>
              </div>

              <div className="space-y-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/70 p-3.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {t.targetScoreLabel}
                  </span>
                  <span className="rounded-md bg-white px-2 py-0.5 font-bold text-[var(--sn-primary)] shadow-2xs">
                    {t.targetScorePassBadge}
                  </span>
                </div>
                <p className="text-xs font-normal text-slate-600">
                  <span className="font-bold text-slate-800">
                    {t.unlimitedRetriesBold}
                  </span>{" "}
                  {t.unlimitedRetriesDesc}
                </p>
              </div>

              <div className="space-y-2 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--sn-sage)] text-xs font-bold text-[var(--sn-primary)]">
                    1
                  </span>
                  <span>{t.mobileBullet1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-xs font-bold text-emerald-700">
                    2
                  </span>
                  <span>{t.mobileBullet2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-100 text-xs font-bold text-amber-700">
                    3
                  </span>
                  <span>{t.mobileBullet3}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
              <div className="text-xs font-bold text-amber-900">
                {t.studyAdviceTitle}
              </div>
              <p className="text-xs font-normal leading-relaxed text-amber-950">
                {t.studyAdviceMobileBody}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={onStart}
                className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-6 font-bold text-white shadow-md hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
              >
                <span>{t.startQuizBtn}</span>
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={onReviewNotes}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-bold text-[var(--sn-primary)] hover:underline"
              >
                <BookOpen className="h-4 w-4" />
                <span>{t.reviewNotesBtn}</span>
              </button>
            </div>
          </div>
        ) : (
          <QuestionCard
            t={t}
            question={question}
            selectedOption={selectedOption}
            onSelectOption={onSelectOption}
            isChecked={isChecked}
            onCheck={onCheck}
            onNext={onNext}
          />
        )}
      </main>
    </div>
  );
}
