import { useState } from "react";
import {
  AlertCircle,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  X,
} from "lucide-react";
import type { QuizResultStrings } from "./result-strings.types";
import type { QuestionResultItem } from "./result-types";

interface QuestionBreakdownProps {
  t: QuizResultStrings;
  questions: QuestionResultItem[];
  filter: "all" | "review" | "correct";
  onFilterChange: (f: "all" | "review" | "correct") => void;
  onReviewLesson: (lessonRef: string) => void;
}

export function QuestionBreakdown({
  t,
  questions,
  filter,
  onFilterChange,
  onReviewLesson,
}: QuestionBreakdownProps) {
  const [expandedId, setExpandedId] = useState<number | null>(3);

  const filtered = questions.filter((q) => {
    if (filter === "review") return !q.isCorrect;
    if (filter === "correct") return q.isCorrect;
    return true;
  });

  const correctCount = questions.filter((q) => q.isCorrect).length;
  const reviewCount = questions.length - correctCount;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            {t.breakdownTitle}
          </h3>
          <p className="text-xs font-medium text-slate-500">{t.breakdownSub}</p>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 text-xs font-bold text-slate-600 shadow-2xs">
          <button
            type="button"
            onClick={() => onFilterChange("all")}
            className={`min-h-[38px] rounded-lg px-2.5 py-1 transition ${
              filter === "all"
                ? "bg-[var(--sn-primary)] text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {t.filterAll} ({questions.length})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("review")}
            className={`min-h-[38px] rounded-lg px-2.5 py-1 transition ${
              filter === "review"
                ? "bg-amber-600 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {t.filterReview} ({reviewCount})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("correct")}
            className={`min-h-[38px] rounded-lg px-2.5 py-1 transition ${
              filter === "correct"
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {t.filterCorrect} ({correctCount})
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        {filtered.map((q) => {
          const isExpanded = expandedId === q.id;

          return (
            <div
              key={q.id}
              className={`overflow-hidden rounded-2xl border transition ${
                q.isCorrect
                  ? "border-slate-200 bg-white"
                  : "border-amber-200/90 bg-amber-50/20"
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-slate-50/80"
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
                      {q.topicTitle}
                    </div>
                    <div className="truncate text-sm font-bold text-slate-900">
                      {q.title}
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      q.isCorrect
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {q.isCorrect ? t.statusCorrectShort : t.statusReviewShort}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="space-y-3 border-t border-slate-100 bg-white p-4 sm:px-6">
                  {!q.isCorrect && (
                    <div className="space-y-1 rounded-xl border border-amber-200 bg-amber-50/50 p-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <span>{t.yourAnswerLabel}:</span>
                        <span className="font-semibold text-amber-800">
                          {q.userAnswer}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        <Check className="h-4 w-4 stroke-[3] text-emerald-600" />
                        <span>{t.correctAnswerLabel}:</span>
                        <span className="font-semibold text-emerald-900">
                          {q.correctAnswer}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/60 p-3 text-xs text-[var(--sn-text-main)]">
                    <Lightbulb className="h-4 w-4 shrink-0 text-[var(--sn-primary)]" />
                    <div>
                      <span className="font-bold">{t.teacherNoteLabel}: </span>
                      <span className="leading-relaxed">{q.teacherTip}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => onReviewLesson(q.lessonRef)}
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-[var(--sn-primary)] hover:underline"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>
                        {t.reviewInPrefix} {q.lessonRef}
                      </span>
                    </button>
                    <span className="text-xs font-semibold text-slate-400">
                      {q.marks} {t.markUnit}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
