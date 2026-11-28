import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from "lucide-react";
import {
  pickLocalized,
  type PublishStatus,
  type Question,
  type Quiz,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { isQuestionMissingTranslations } from "./quiz-question-editor";

export function QuizSettingsFields({
  editLang,
  draftQuiz,
  maxPassMark,
  onChange,
}: {
  editLang: AppLanguage;
  draftQuiz: Quiz;
  maxPassMark: number;
  onChange: (next: Quiz) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
      <label className="space-y-1 text-sm font-bold sm:col-span-2">
        <span>Quiz title ({editLang.toUpperCase()})</span>
        <input
          type="text"
          value={draftQuiz.title[editLang] ?? ""}
          onChange={(e) =>
            onChange({
              ...draftQuiz,
              title: { ...draftQuiz.title, [editLang]: e.target.value },
            })
          }
          className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
        />
      </label>
      <label className="space-y-1 text-sm font-bold">
        <span>Pass mark</span>
        <input
          type="number"
          min={1}
          max={Math.max(1, maxPassMark)}
          value={draftQuiz.passMark}
          onChange={(e) =>
            onChange({
              ...draftQuiz,
              passMark: Math.max(1, Number(e.target.value) || 1),
            })
          }
          className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
        />
      </label>
      <label className="space-y-1 text-sm font-bold">
        <span>Status</span>
        <select
          value={draftQuiz.status}
          onChange={(e) =>
            onChange({
              ...draftQuiz,
              status: e.target.value as PublishStatus,
            })
          }
          className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>
    </div>
  );
}

export function QuizQuestionRail({
  editLang,
  questions,
  activeIdx,
  onSelect,
  onMove,
  onDuplicate,
  onRemove,
  onAdd,
}: {
  editLang: AppLanguage;
  questions: Question[];
  activeIdx: number;
  onSelect: (idx: number) => void;
  onMove: (idx: number, delta: -1 | 1) => void;
  onDuplicate: (idx: number) => void;
  onRemove: (idx: number) => void;
  onAdd: () => void;
}) {
  return (
    <div className="space-y-2 lg:col-span-4">
      {questions.map((q, idx) => (
        <div
          key={q.id}
          className={`flex items-center gap-1 rounded-xl border p-2 ${
            idx === activeIdx
              ? "border-[var(--sn-primary)] bg-[var(--sn-surface-selected)]"
              : "border-[var(--sn-border)]"
          }`}
        >
          <button
            type="button"
            onClick={() => onSelect(idx)}
            className="min-h-10 min-w-0 flex-1 text-left text-xs font-bold"
          >
            <span className="mr-1">Q{idx + 1}.</span>
            <span className="line-clamp-1">
              {pickLocalized(q.prompt, editLang, "Untitled")}
            </span>
            {isQuestionMissingTranslations(q) ? (
              <span
                title="Missing translation in si/ta/en"
                className="ml-1 inline-block h-2 w-2 rounded-full bg-amber-500"
              />
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => onMove(idx, -1)}
            aria-label="Move up"
            className="flex h-9 w-9 items-center justify-center rounded-lg"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onMove(idx, 1)}
            aria-label="Move down"
            className="flex h-9 w-9 items-center justify-center rounded-lg"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDuplicate(idx)}
            aria-label="Duplicate"
            className="flex h-9 w-9 items-center justify-center rounded-lg"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={questions.length <= 1}
            onClick={() => onRemove(idx)}
            aria-label="Remove"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-red-700 disabled:opacity-30"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[var(--sn-border)] text-xs font-bold text-[var(--sn-primary)]"
      >
        <Plus className="h-4 w-4" />
        <span>Add question</span>
      </button>
    </div>
  );
}

export function QuizBankAttachPanel({
  editLang,
  bankQuestions,
  attachedIds,
  onAttach,
}: {
  editLang: AppLanguage;
  bankQuestions: Question[];
  attachedIds: Set<string>;
  onAttach: (question: Question) => void;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-3">
      <p className="text-xs font-bold uppercase text-[var(--sn-primary)]">
        Question Bank — click to attach
      </p>
      <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
        {bankQuestions
          .filter((q) => !attachedIds.has(q.id))
          .map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => onAttach(q)}
              className="flex min-h-11 items-center justify-between gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-left text-xs font-semibold hover:bg-[var(--sn-olive)]"
            >
              <span className="line-clamp-2">
                {pickLocalized(q.prompt, editLang)}
              </span>
              <Plus className="h-4 w-4 shrink-0 text-[var(--sn-primary)]" />
            </button>
          ))}
      </div>
    </div>
  );
}
