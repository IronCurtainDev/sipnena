import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import {
  assignCourseToClasses,
  pickLocalized,
  useCoursesStore,
  type Unit,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";

interface AssignCourseDialogProps {
  lang: AppLanguage;
  courseId: string;
  units: Unit[];
  open: boolean;
  onClose: () => void;
  onAssigned: (msg: string) => void;
}

export function AssignCourseDialog({
  lang,
  courseId,
  units,
  open,
  onClose,
  onAssigned,
}: AssignCourseDialogProps) {
  const extra = BUILDER_EXTRA_COPY[lang];
  const { store } = useCoursesStore();
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>(() =>
    store.classes.slice(0, 1).map((c) => c.id),
  );
  const [startAt, setStartAt] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [dueDates, setDueDates] = useState<Record<string, string>>({});

  if (!open) return null;

  const toggleClass = (id: string) => {
    setSelectedClassIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    if (selectedClassIds.length === 0) return;
    assignCourseToClasses({
      courseId,
      classIds: selectedClassIds,
      startAt,
      unitDueDates: dueDates,
    });
    onAssigned(extra.assignedToast);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="assign-course-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 backdrop-blur-xs sm:items-center"
    >
      <div className="max-h-[90svh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 shadow-xl">
        <div className="flex items-center justify-between gap-2">
          <h2
            id="assign-course-title"
            className="text-xl font-bold text-[var(--sn-text-main)]"
          >
            {extra.assignDialogTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--sn-border)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {store.classes.length === 0 ? (
          <div className="space-y-3 rounded-xl border border-[var(--sn-border)] p-4 text-sm">
            <p>{extra.noClassesYet}</p>
            <Link
              to="/teacher/classes"
              className="inline-flex min-h-11 items-center rounded-xl bg-[var(--sn-primary)] px-4 font-bold text-white"
            >
              {extra.manageClassesLink}
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {store.classes.map((cls) => (
              <label
                key={cls.id}
                className="flex min-h-12 cursor-pointer items-center justify-between gap-2 rounded-xl border border-[var(--sn-border)] px-3 py-2 text-sm font-bold"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedClassIds.includes(cls.id)}
                    onChange={() => toggleClass(cls.id)}
                    className="h-4 w-4"
                  />
                  <span>{cls.name}</span>
                </span>
                <span className="text-xs font-medium text-[var(--sn-text-muted)]">
                  {cls.studentIds.length} students
                </span>
              </label>
            ))}
          </div>
        )}

        <label className="block space-y-1 text-sm font-bold">
          <span>{extra.startDateLabel}</span>
          <input
            type="date"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
          />
        </label>

        {units.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-bold">{extra.unitDueDatesLabel}</p>
            {units.map((u) => (
              <label
                key={u.id}
                className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="truncate font-semibold">
                  {pickLocalized(u.title, lang)}
                </span>
                <input
                  type="date"
                  value={dueDates[u.id] ?? ""}
                  onChange={(e) =>
                    setDueDates((p) => ({ ...p, [u.id]: e.target.value }))
                  }
                  className="min-h-11 rounded-xl border border-[var(--sn-border)] px-2 text-sm"
                />
              </label>
            ))}
          </div>
        ) : null}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 rounded-xl border border-[var(--sn-border)] px-4 text-sm font-bold"
          >
            {extra.stepBack}
          </button>
          <button
            type="button"
            disabled={selectedClassIds.length === 0}
            onClick={handleSave}
            className="min-h-12 rounded-xl bg-[var(--sn-primary)] px-4 text-sm font-bold text-white disabled:opacity-50"
          >
            {extra.assignSaveBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
