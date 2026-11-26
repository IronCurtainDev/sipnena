import { ChevronDown, Eye } from "lucide-react";
import type { PartTwoQuestionItem } from "./mock-data";

interface PartTwoSectionProps {
  questions: PartTwoQuestionItem[];
  openSchemes: Record<string, boolean>;
  showAllSchemes: boolean;
  onToggleOne: (id: string) => void;
  onToggleAll: () => void;
}

export function PartTwoSection({
  questions,
  openSchemes,
  showAllSchemes,
  onToggleOne,
  onToggleAll,
}: PartTwoSectionProps) {
  return (
    <section className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-[var(--sn-text-main)]">
            Part II — Structured &amp; Essay Questions
          </h2>
          <p className="text-xs text-[var(--sn-text-muted)]">
            Write answers on paper, then reveal the official NIE marking scheme.
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleAll}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)] px-4 py-2 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-sage)]"
        >
          <Eye className="h-4 w-4" />
          <span>
            {showAllSchemes
              ? "Hide Official Marking Scheme"
              : "Show Official Marking Scheme"}
          </span>
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {questions.map((q) => {
          const isOpen = Boolean(openSchemes[q.id]);
          return (
            <div
              key={q.id}
              className="rounded-2xl border border-[var(--sn-border)] bg-white p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-[var(--sn-surface-muted)] px-2.5 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
                  {q.number} • {q.marks} Marks
                </span>
                <h3 className="text-sm font-extrabold text-[var(--sn-text-main)]">
                  {q.title}
                </h3>
              </div>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[var(--sn-text-secondary)]">
                {q.prompt}
              </p>

              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => onToggleOne(q.id)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[var(--sn-olive)] px-3.5 py-2 text-xs font-bold text-[var(--sn-primary)]"
              >
                <span>
                  {isOpen
                    ? "Hide Official Marking Scheme"
                    : "Show Official Marking Scheme"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                  <p className="text-xs font-extrabold uppercase text-emerald-900">
                    Official Marking Scheme Points
                  </p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-emerald-950">
                    {q.markingScheme.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
