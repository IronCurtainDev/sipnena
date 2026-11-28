import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Copy, Trash2 } from "lucide-react";
import {
  getCourseStatusCounts,
  pickLocalized,
  useCoursesStore,
  type Course,
  type Medium,
} from "@/data/courses";
import {
  formatGrade,
  formatMedium,
  formatSubject,
  TERM_NAME_MAP,
} from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";
import type { TeacherCourseCopy } from "./course-strings";

interface TeacherCourseCardProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  course: Course;
  onDuplicate: (course: Course, medium: Medium) => void;
  onDelete: (course: Course) => void;
}

export function TeacherCourseCard({
  lang,
  copy,
  course,
  onDuplicate,
  onDelete,
}: TeacherCourseCardProps) {
  const extra = BUILDER_EXTRA_COPY[lang];
  const { store } = useCoursesStore();
  const counts = getCourseStatusCounts(store, course.id);
  const [dupOpen, setDupOpen] = useState(false);
  const [dupMedium, setDupMedium] = useState<Medium>(course.medium);

  const termKey =
    course.term === 1 ? "Term 1" : course.term === 3 ? "Term 3" : "Term 2";
  const statusLabel =
    course.status === "published"
      ? extra.statusPublished
      : course.status === "scheduled"
        ? extra.statusScheduled
        : extra.statusDraft;
  const metaTone =
    course.status === "published"
      ? "text-[var(--sn-primary)]"
      : "text-[var(--sn-text-muted)]";

  return (
    <article className="flex flex-col justify-between rounded-[2rem] border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
      <div>
        {course.coverImageUrl ? (
          <div className="mb-4 overflow-hidden rounded-2xl border border-[var(--sn-border)]">
            <img
              src={course.coverImageUrl}
              alt=""
              className="aspect-[16/9] h-auto w-full object-cover"
            />
          </div>
        ) : null}
        <h3 className="text-xl leading-tight font-extrabold text-[var(--sn-primary)]">
          {pickLocalized(course.title, lang)}
        </h3>
        <p className="mt-2 text-sm text-[var(--sn-text-muted)]">
          {formatGrade(lang, course.grade)} ·{" "}
          {formatSubject(lang, course.subject)} ·{" "}
          {formatMedium(lang, course.medium)} · {TERM_NAME_MAP[termKey][lang]}
        </p>
        <p className={`mt-3 text-sm font-semibold ${metaTone}`}>
          {statusLabel} · {counts.unitCount} units · {counts.totalLessons}{" "}
          {copy.lessonCountLabel} ·{" "}
          {course.isFree
            ? copy.freeLabel
            : course.priceLkr
              ? `Rs. ${course.priceLkr.toLocaleString("en-LK")}`
              : copy.paidLabel}
        </p>
      </div>

      {dupOpen ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-3">
          <label className="text-xs font-bold text-[var(--sn-text-main)]">
            {extra.duplicateMediumPrompt}:
          </label>
          <select
            value={dupMedium}
            onChange={(e) => setDupMedium(e.target.value as Medium)}
            className="min-h-10 rounded-lg border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-xs font-bold"
          >
            {(["si", "ta", "en"] as const).map((m) => (
              <option key={m} value={m}>
                {formatMedium(lang, m)}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              setDupOpen(false);
              onDuplicate(course, dupMedium);
            }}
            className="min-h-10 rounded-lg bg-[var(--sn-primary)] px-3 text-xs font-bold text-white"
          >
            {extra.duplicateCourseBtn}
          </button>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link
          to="/teacher/courses/$courseId"
          params={{ courseId: course.id }}
          className="inline-flex min-h-12 flex-1 items-center justify-center whitespace-nowrap rounded-xl bg-[var(--sn-primary)] px-4 text-sm font-bold text-white hover:bg-[var(--sn-primary-hover)]"
        >
          {copy.editCurriculumBtn}
        </Link>
        <button
          type="button"
          onClick={() => setDupOpen((v) => !v)}
          aria-label={extra.duplicateCourseBtn}
          className="inline-flex h-12 min-w-12 shrink-0 items-center justify-center gap-1 rounded-xl border border-[var(--sn-border)] px-3 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
        >
          <Copy className="h-4 w-4" />
          <span className="hidden sm:inline">{extra.duplicateCourseBtn}</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(course)}
          aria-label={copy.deleteCourseBtn}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--sn-border)] text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
