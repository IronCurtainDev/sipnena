import { Plus, Trash2 } from "lucide-react";
import type { Localized, Question } from "@/data/courses";
import type { AppLanguage } from "@/lib/language";

interface QuizQuestionEditorProps {
  editLang: AppLanguage;
  question: Question;
  onChange: (next: Question) => void;
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

function hasText(loc: Localized | undefined, code: AppLanguage): boolean {
  return Boolean(loc?.[code]?.trim());
}

export function isQuestionMissingTranslations(q: Question): boolean {
  return (
    !hasText(q.prompt, "si") ||
    !hasText(q.prompt, "ta") ||
    !hasText(q.prompt, "en")
  );
}

export function QuizQuestionEditor({
  editLang,
  question,
  onChange,
}: QuizQuestionEditorProps) {
  const updateOption = (idx: number, value: string) => {
    const nextOptions = question.options.map((opt, i) =>
      i === idx ? { ...opt, [editLang]: value } : opt,
    );
    onChange({ ...question, options: nextOptions });
  };

  const addOption = () => {
    if (question.options.length >= 6) return;
    onChange({
      ...question,
      options: [...question.options, { si: "", ta: "", en: "" }],
    });
  };

  const removeOption = (idx: number) => {
    if (question.options.length <= 2) return;
    const nextOptions = question.options.filter((_, i) => i !== idx);
    const nextCorrect =
      question.correctIndex >= nextOptions.length
        ? nextOptions.length - 1
        : question.correctIndex;
    onChange({
      ...question,
      options: nextOptions,
      correctIndex: Math.max(0, nextCorrect),
    });
  };

  return (
    <div className="space-y-4">
      <label className="block space-y-1 text-sm font-bold">
        <span>Question prompt ({editLang.toUpperCase()})</span>
        <textarea
          rows={3}
          required
          value={question.prompt[editLang] ?? ""}
          onChange={(e) =>
            onChange({
              ...question,
              prompt: { ...question.prompt, [editLang]: e.target.value },
            })
          }
          className="w-full rounded-xl border border-[var(--sn-border)] p-3 text-base"
        />
      </label>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">
            Options (2–6) &amp; single correct answer
          </span>
          {question.options.length < 6 ? (
            <button
              type="button"
              onClick={addOption}
              className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-[var(--sn-border)] px-3 text-xs font-bold text-[var(--sn-primary)]"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add option</span>
            </button>
          ) : null}
        </div>

        {question.options.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${question.id}`}
              checked={question.correctIndex === idx}
              onChange={() => onChange({ ...question, correctIndex: idx })}
              aria-label={`Mark option ${OPTION_LETTERS[idx]} correct`}
              className="h-5 w-5 shrink-0"
            />
            <span className="w-6 shrink-0 text-sm font-extrabold text-[var(--sn-primary)]">
              {OPTION_LETTERS[idx]}
            </span>
            <input
              type="text"
              required={idx < 2}
              value={opt[editLang] ?? ""}
              onChange={(e) => updateOption(idx, e.target.value)}
              placeholder={`Option ${OPTION_LETTERS[idx]} (${editLang.toUpperCase()})`}
              className="min-h-11 flex-1 rounded-xl border border-[var(--sn-border)] px-3 text-base"
            />
            {question.options.length > 2 ? (
              <button
                type="button"
                onClick={() => removeOption(idx)}
                aria-label={`Remove option ${OPTION_LETTERS[idx]}`}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        ))}
      </div>

      <label className="block space-y-1 text-sm font-bold">
        <span>Explanation ({editLang.toUpperCase()})</span>
        <textarea
          rows={2}
          value={question.explanation[editLang] ?? ""}
          onChange={(e) =>
            onChange({
              ...question,
              explanation: {
                ...question.explanation,
                [editLang]: e.target.value,
              },
            })
          }
          className="w-full rounded-xl border border-[var(--sn-border)] p-3 text-base"
        />
      </label>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="space-y-1 text-sm font-bold">
          <span>Source</span>
          <select
            value={question.source}
            onChange={(e) =>
              onChange({
                ...question,
                source: e.target.value as Question["source"],
              })
            }
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm"
          >
            <option value="teacher">Teacher</option>
            <option value="past-paper">Past Paper</option>
            <option value="term-test">Term Test</option>
          </select>
        </label>
        <label className="space-y-1 text-sm font-bold">
          <span>Difficulty</span>
          <select
            value={question.difficulty}
            onChange={(e) =>
              onChange({
                ...question,
                difficulty: Number(e.target.value) as 1 | 2 | 3,
              })
            }
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm"
          >
            <option value={1}>Easy (1)</option>
            <option value={2}>Medium (2)</option>
            <option value={3}>Challenge (3)</option>
          </select>
        </label>
        <label className="space-y-1 text-sm font-bold">
          <span>Image URL (optional)</span>
          <input
            type="url"
            value={question.imageUrl ?? ""}
            onChange={(e) =>
              onChange({ ...question, imageUrl: e.target.value || undefined })
            }
            placeholder="https://..."
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] px-3 text-sm"
          />
        </label>
      </div>
    </div>
  );
}
