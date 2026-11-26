import { Bookmark, CheckCircle2, XCircle } from "lucide-react";
import type { McqQuestionItem } from "./mock-data";

interface McqSheetProps {
  mcqs: McqQuestionItem[];
  answers: Record<string, number>;
  graded: boolean;
  bookmarkedIds: string[];
  onSelectAnswer: (qId: string, idx: number) => void;
  onToggleBookmark: (qId: string) => void;
  onGrade: () => void;
  onReset: () => void;
}

export function McqAnswerSheet({
  mcqs,
  answers,
  graded,
  bookmarkedIds,
  onSelectAnswer,
  onToggleBookmark,
  onGrade,
  onReset,
}: McqSheetProps) {
  const correctCount = mcqs.filter(
    (q) => answers[q.id] === q.correctIndex,
  ).length;

  return (
    <section className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-[var(--sn-text-main)]">
            Part I — Interactive MCQ Answer Sheet
          </h2>
          <p className="text-xs text-[var(--sn-text-muted)]">
            Select answers below and grade instantly with official solutions.
          </p>
        </div>

        {graded && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-right">
            <p className="text-xs font-bold text-emerald-800">Score Summary</p>
            <p className="text-lg font-black text-emerald-950">
              {correctCount} / {mcqs.length} (
              {Math.round((correctCount / mcqs.length) * 100)}%)
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {mcqs.map((q) => {
          const chosen = answers[q.id];
          const isCorrect = chosen === q.correctIndex;
          const saved = bookmarkedIds.includes(q.id);
          return (
            <div
              key={q.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-[var(--sn-text-main)]">
                  {q.number}. {q.prompt}
                </p>
                <button
                  type="button"
                  onClick={() => onToggleBookmark(q.id)}
                  className={`shrink-0 rounded-lg p-1.5 ${
                    saved
                      ? "bg-[var(--sn-sage)] text-[var(--sn-primary)]"
                      : "text-slate-400 hover:bg-slate-200"
                  }`}
                  aria-label={`Bookmark question ${q.number}`}
                >
                  <Bookmark
                    className={`h-4 w-4 ${saved ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {q.options.map((opt, idx) => {
                  const selected = chosen === idx;
                  const highlightRight = graded && idx === q.correctIndex;
                  const highlightWrong = graded && selected && !isCorrect;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => !graded && onSelectAnswer(q.id, idx)}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${
                        highlightRight
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                          : highlightWrong
                            ? "border-rose-400 bg-rose-50 text-rose-900"
                            : selected
                              ? "border-2 border-[var(--sn-primary)] bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                              : "border-slate-200 bg-white text-[var(--sn-text-main)] hover:bg-slate-50"
                      }`}
                    >
                      <span>
                        ({idx + 1}) {opt}
                      </span>
                      {highlightRight && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      )}
                      {highlightWrong && (
                        <XCircle className="h-4 w-4 text-rose-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {graded && (
                <p className="mt-2.5 rounded-xl bg-white px-3 py-2 text-xs text-[var(--sn-text-secondary)]">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
        {graded ? (
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-5 py-2.5 text-xs font-bold text-[var(--sn-primary)]"
          >
            Retry MCQ Sheet
          </button>
        ) : (
          <button
            type="button"
            onClick={onGrade}
            className="rounded-xl bg-[var(--sn-primary)] px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-[var(--sn-primary-hover)]"
          >
            Submit &amp; Auto-Grade MCQs
          </button>
        )}
      </div>
    </section>
  );
}
