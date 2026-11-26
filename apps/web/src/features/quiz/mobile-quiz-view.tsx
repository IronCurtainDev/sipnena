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
      {/* Mobile Sticky Top Header */}
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
            {isStarted
              ? `Q${question.questionNumber}: Light Quiz`
              : "Quiz Checkpoint"}
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

      {/* Progress & Badge Bar */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-1.5 text-slate-800">
            <span className="h-2 w-2 rounded-full bg-[var(--sn-primary)]" />
            <span>
              Question {question.questionNumber} of {question.totalQuestions}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              Science • Light
            </span>
            <span className="flex items-center gap-1 text-slate-500 font-semibold text-[11px]">
              <Clock className="h-3 w-3" />
              01:14
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-[var(--sn-primary)] transition-all duration-300"
            style={{
              width: `${(question.questionNumber / question.totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="p-4 space-y-5">
        {!isStarted ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900">Quiz time</h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Test your understanding before moving to Unit 2. Take your time
                and read each ray diagram carefully.
              </p>
            </div>

            {/* Assessment Checkpoint Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-slate-500">
                    Assessment Checkpoint • Grade 8
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    Unit 1: Fundamentals of Light & Reflection
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl bg-slate-50 p-2.5">
                  <div className="text-[11px] text-slate-500">Questions</div>
                  <div className="text-base font-bold text-slate-900">
                    10 MCQs
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5">
                  <div className="text-[11px] text-slate-500">
                    Est. Duration
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    15 mins
                  </div>
                </div>
              </div>

              {/* Target score pill */}
              <div className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/70 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Target Score
                  </span>
                  <span className="rounded-md bg-white px-2 py-0.5 text-[var(--sn-primary)] font-bold shadow-2xs">
                    6 / 10 to pass
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-normal">
                  <span className="font-bold text-slate-800">
                    Unlimited retries:
                  </span>{" "}
                  Practice anytime to improve your understanding and confidence.
                </p>
              </div>

              {/* Feature bullet list */}
              <div className="space-y-2 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--sn-sage)] text-[10px] font-bold text-[var(--sn-primary)]">
                    1
                  </span>
                  <span>One focused question per screen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-[10px] font-bold text-emerald-700">
                    💡
                  </span>
                  <span>Instant feedback with helpful ray hints</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-100 text-[10px] font-bold text-amber-700">
                    🔓
                  </span>
                  <span>Scoring 6/10 unlocks Chapter 2: Curved Mirrors</span>
                </div>
              </div>
            </div>

            {/* Study Desk Advice */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 space-y-1">
              <div className="text-xs font-bold text-amber-900">
                ✍️ Study Desk Advice
              </div>
              <p className="text-xs text-amber-950 font-normal leading-relaxed">
                Keep a rough sheet, ruler, and your science notebook handy to
                sketch ray paths before choosing an option.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={onStart}
                className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-6 font-bold text-white shadow-md hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
              >
                <span>Start quiz</span>
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={onReviewNotes}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-bold text-[var(--sn-primary)] hover:underline"
              >
                <BookOpen className="h-4 w-4" />
                <span>Review lesson notes first</span>
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
