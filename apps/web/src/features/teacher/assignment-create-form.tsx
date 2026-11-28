import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import {
  ASSIGNMENT_GRADES,
  addLessonToUnit,
  makeLocalized,
  pickLocalized,
  updateLessonFields,
  type Course,
  type Grade,
  type Unit,
} from "@/data/courses";
import { formatGrade } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import { CREATE_ASSIGNMENT_COPY } from "./assignment-copy";

interface AssignmentCreateFormProps {
  lang: AppLanguage;
  courses: Course[];
  units: Unit[];
  initialGrade?: Grade | "all";
  onCreated: () => void;
  onCancel: () => void;
}

export function AssignmentCreateForm({
  lang,
  courses,
  units,
  initialGrade = "all",
  onCreated,
  onCancel,
}: AssignmentCreateFormProps) {
  const t = CREATE_ASSIGNMENT_COPY[lang];
  const paidCourses = courses.filter((c) => !c.isFree && Boolean(c.grade));
  const defaultGrade: Grade | "all" =
    initialGrade !== "all"
      ? initialGrade
      : (paidCourses[0]?.grade ?? ASSIGNMENT_GRADES[2]!);
  const [grade, setGrade] = useState<Grade | "all">(defaultGrade);
  const gradeCourses =
    grade === "all"
      ? paidCourses
      : paidCourses.filter((c) => c.grade === grade);
  const [courseId, setCourseId] = useState(gradeCourses[0]?.id ?? "");
  const courseUnits = units
    .filter((u) => u.courseId === courseId)
    .sort((a, b) => a.order - b.order);
  const [unitId, setUnitId] = useState(courseUnits[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [maxScore, setMaxScore] = useState("10");
  const [dueAt, setDueAt] = useState("");
  const [submissionMode, setSubmissionMode] = useState<
    "both" | "text_only" | "image_only"
  >("both");

  const syncCourseForGrade = (nextGrade: Grade | "all") => {
    setGrade(nextGrade);
    const nextCourses =
      nextGrade === "all"
        ? paidCourses
        : paidCourses.filter((c) => c.grade === nextGrade);
    const nextCourseId = nextCourses[0]?.id ?? "";
    setCourseId(nextCourseId);
    const firstUnit = units
      .filter((u) => u.courseId === nextCourseId)
      .sort((a, b) => a.order - b.order)[0];
    setUnitId(firstUnit?.id ?? "");
  };

  if (paidCourses.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-950">
        {t.noCourses}
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const resolvedUnit = unitId || courseUnits[0]?.id;
    if (!courseId || !resolvedUnit || !title.trim() || !instructions.trim()) {
      return;
    }
    const lessonId = addLessonToUnit(
      courseId,
      resolvedUnit,
      "assignment",
      makeLocalized(title.trim()),
    );
    updateLessonFields(lessonId, {
      status: "published",
      items: [
        {
          id: `asg-item-${lessonId}`,
          type: "assignment",
          instructions: makeLocalized(instructions.trim()),
          maxScore: Math.max(1, Number(maxScore) || 10),
          dueAt: dueAt || undefined,
          submissionMode,
        },
      ],
    });
    setTitle("");
    setInstructions("");
    setDueAt("");
    onCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
    >
      <h2 className="text-lg font-extrabold text-[var(--sn-primary)]">
        {t.heading}
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="space-y-1 text-sm font-bold">
          <span>{t.gradeLabel}</span>
          <select
            value={grade === "all" ? "" : String(grade)}
            onChange={(e) =>
              syncCourseForGrade(Number(e.target.value) as Grade)
            }
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
          >
            {ASSIGNMENT_GRADES.map((g) => (
              <option key={g} value={g}>
                {formatGrade(lang, g)}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm font-bold">
          <span>{t.courseLabel}</span>
          <select
            required
            value={courseId}
            onChange={(e) => {
              const nextId = e.target.value;
              setCourseId(nextId);
              const firstUnit = units
                .filter((u) => u.courseId === nextId)
                .sort((a, b) => a.order - b.order)[0];
              setUnitId(firstUnit?.id ?? "");
            }}
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
          >
            {gradeCourses.length === 0 ? (
              <option value="">{t.noCourses}</option>
            ) : (
              gradeCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {pickLocalized(c.title, lang)}
                </option>
              ))
            )}
          </select>
        </label>
        <label className="space-y-1 text-sm font-bold">
          <span>{t.unitLabel}</span>
          <select
            required
            value={unitId || courseUnits[0]?.id || ""}
            onChange={(e) => setUnitId(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
          >
            {courseUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {pickLocalized(u.title, lang)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block space-y-1 text-sm font-bold">
        <span>{t.titleLabel}</span>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.titlePlaceholder}
          className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
        />
      </label>

      <label className="block space-y-1 text-sm font-bold">
        <span>{t.instructionsLabel}</span>
        <textarea
          required
          rows={3}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder={t.instructionsPlaceholder}
          className="w-full rounded-xl border border-[var(--sn-border)] p-3 text-base"
        />
      </label>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="space-y-1 text-sm font-bold">
          <span>{t.modeLabel}</span>
          <select
            value={submissionMode}
            onChange={(e) =>
              setSubmissionMode(
                e.target.value as "both" | "text_only" | "image_only",
              )
            }
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
          >
            <option value="both">{t.modeBoth}</option>
            <option value="text_only">{t.modeText}</option>
            <option value="image_only">{t.modeImage}</option>
          </select>
        </label>
        <label className="space-y-1 text-sm font-bold">
          <span>{t.maxScoreLabel}</span>
          <input
            type="number"
            min={1}
            max={100}
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
          />
        </label>
        <label className="space-y-1 text-sm font-bold">
          <span>{t.dueLabel}</span>
          <input
            type="date"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={!courseId || gradeCourses.length === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--sn-primary)] px-5 text-sm font-bold text-white disabled:opacity-50"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t.submitBtn}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-xl border border-[var(--sn-border)] px-4 text-sm font-bold text-[var(--sn-text-main)]"
        >
          {t.cancelBtn}
        </button>
      </div>
    </form>
  );
}
