import { useState } from "react";
import { ArrowDown, ArrowUp, Copy, MoreHorizontal, Trash2 } from "lucide-react";
import { pickLocalized, type PublishStatus, type Unit } from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";

interface CurriculumRowMenuProps {
  lang: AppLanguage;
  kind: "unit" | "lesson";
  itemTitle: string;
  status: PublishStatus;
  canMoveUp: boolean;
  canMoveDown: boolean;
  units?: Unit[];
  currentUnitId?: string;
  lessonCountInUnit?: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onMoveToUnit?: (unitId: string) => void;
  onStatusChange: (status: PublishStatus) => void;
  onDelete: () => void;
}

export function CurriculumRowMenu({
  lang,
  kind,
  itemTitle,
  status,
  canMoveUp,
  canMoveDown,
  units,
  currentUnitId,
  lessonCountInUnit = 0,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onMoveToUnit,
  onStatusChange,
  onDelete,
}: CurriculumRowMenuProps) {
  const extra = BUILDER_EXTRA_COPY[lang];
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const act = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${itemTitle} actions`}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)]"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-1 w-56 space-y-1 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-2 shadow-xl"
        >
          <button
            type="button"
            disabled={!canMoveUp}
            onClick={() => act(onMoveUp)}
            className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-left text-sm font-semibold hover:bg-[var(--sn-olive)] disabled:opacity-40"
          >
            <ArrowUp className="h-4 w-4" />
            <span>{extra.moveUp}</span>
          </button>
          <button
            type="button"
            disabled={!canMoveDown}
            onClick={() => act(onMoveDown)}
            className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-left text-sm font-semibold hover:bg-[var(--sn-olive)] disabled:opacity-40"
          >
            <ArrowDown className="h-4 w-4" />
            <span>{extra.moveDown}</span>
          </button>
          <button
            type="button"
            onClick={() => act(onDuplicate)}
            className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-left text-sm font-semibold hover:bg-[var(--sn-olive)]"
          >
            <Copy className="h-4 w-4" />
            <span>
              {kind === "unit" ? extra.duplicateUnit : extra.duplicateLesson}
            </span>
          </button>

          {kind === "lesson" && units && units.length > 1 && onMoveToUnit ? (
            <label className="block px-3 py-1 text-xs font-bold text-[var(--sn-text-muted)]">
              <span>{extra.moveToUnit}</span>
              <select
                value={currentUnitId}
                onChange={(e) => {
                  const target = e.target.value;
                  setOpen(false);
                  if (target && target !== currentUnitId) onMoveToUnit(target);
                }}
                className="mt-1 min-h-10 w-full rounded-lg border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm text-[var(--sn-text-main)]"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {pickLocalized(u.title, lang)}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="border-t border-[var(--sn-border)] pt-1">
            {(["draft", "scheduled", "published"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => act(() => onStatusChange(s))}
                className={`flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-semibold ${
                  status === s
                    ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                    : "hover:bg-[var(--sn-surface-muted)]"
                }`}
              >
                <span>
                  {s === "draft"
                    ? extra.statusDraft
                    : s === "scheduled"
                      ? extra.statusScheduled
                      : extra.statusPublished}
                </span>
                {status === s ? <span>✓</span> : null}
              </button>
            ))}
          </div>

          <div className="border-t border-[var(--sn-border)] pt-1">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                if (kind === "unit" && lessonCountInUnit > 0) {
                  setConfirmDelete(true);
                } else {
                  onDelete();
                }
              }}
              className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-left text-sm font-bold text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              <span>{extra.deleteItem}</span>
            </button>
          </div>
        </div>
      ) : null}

      {confirmDelete ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
        >
          <div className="w-full max-w-sm space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xl">
            <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
              {extra.deleteConfirmTitle}
            </h3>
            <p className="text-sm text-[var(--sn-text-secondary)]">
              {extra.deleteUnitWarning(lessonCountInUnit)}
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="min-h-11 rounded-xl border border-[var(--sn-border)] px-4 text-sm font-bold"
              >
                {extra.stepBack}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmDelete(false);
                  onDelete();
                }}
                className="min-h-11 rounded-xl bg-red-700 px-4 text-sm font-bold text-white"
              >
                {extra.deleteItem}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
