import { useState } from "react";
import { CheckCircle2, Eye } from "lucide-react";
import {
  getAssignmentItem,
  gradeStudentAssignment,
  isAssignmentOverdue,
  pickLocalized,
  type AssignmentSubmission,
  type Course,
  type Lesson,
} from "@/data/courses";
import { formatGrade } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { AssignCopy } from "./assignment-copy";

interface AssignmentSubmissionCardProps {
  lang: AppLanguage;
  sub: AssignmentSubmission;
  studentName: string;
  lesson: Lesson;
  course: Course;
  t: AssignCopy;
  onSaved: () => void;
}

export function AssignmentSubmissionCard({
  lang,
  sub,
  studentName,
  lesson,
  course,
  t,
  onSaved,
}: AssignmentSubmissionCardProps) {
  const [open, setOpen] = useState(false);
  const assignItem = getAssignmentItem(lesson);
  const maxScore =
    assignItem?.maxScore ?? sub.maxScore ?? 10;
  const [score, setScore] = useState(
    sub.score !== undefined ? String(sub.score) : "8",
  );
  const [comment, setComment] = useState(sub.teacherComment ?? "");
  const overdue =
    !sub.gradedAt && isAssignmentOverdue(assignItem?.dueAt);

  return (
    <article className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-[var(--sn-primary)]">
            {studentName}
          </h2>
          <p className="text-sm text-[var(--sn-text-muted)]">
            {formatGrade(lang, course.grade)} ·{" "}
            {pickLocalized(course.title, lang)} ·{" "}
            {pickLocalized(lesson.title, lang)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {sub.gradedAt ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t.graded} ({sub.score ?? 0}/{maxScore})
            </span>
          ) : overdue ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-950">
              {t.overdue}
            </span>
          ) : (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-950">
              {t.needsReview}
            </span>
          )}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-[var(--sn-border)] px-3 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{open ? t.hideReviewBtn : t.reviewBtn}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="space-y-3 border-t border-[var(--sn-border)] pt-3">
          {assignItem ? (
            <div className="rounded-xl bg-[var(--sn-olive)]/50 p-3 text-xs text-[var(--sn-text-secondary)]">
              <span className="font-bold text-[var(--sn-primary)]">
                {t.promptLabel}:{" "}
              </span>
              {pickLocalized(assignItem.instructions, lang)}
            </div>
          ) : null}

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--sn-text-muted)]">
              {t.studentWorkLabel} · {sub.submittedAt.slice(0, 10)}
            </p>
            {sub.text ? (
              <p className="rounded-xl bg-[var(--sn-surface-muted)] p-3 text-base text-[var(--sn-text-main)]">
                {sub.text}
              </p>
            ) : null}
            {sub.imageDataUrl ? (
              <img
                src={sub.imageDataUrl}
                alt={studentName}
                className="max-h-72 rounded-xl border border-[var(--sn-border)] object-contain"
              />
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-12 sm:items-end">
            <label className="space-y-1 text-sm font-bold sm:col-span-2">
              <span>
                {t.scoreLabel} (/ {maxScore})
              </span>
              <input
                type="number"
                min={0}
                max={maxScore}
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
              />
            </label>
            <label className="space-y-1 text-sm font-bold sm:col-span-7">
              <span>{t.feedbackLabel}</span>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.feedbackPlaceholder}
                className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                gradeStudentAssignment(
                  sub.id,
                  Math.min(maxScore, Math.max(0, Number(score) || 0)),
                  comment,
                );
                onSaved();
              }}
              className="min-h-11 rounded-xl bg-[var(--sn-primary)] px-4 text-sm font-bold text-white sm:col-span-3"
            >
              {t.saveGradeBtn}
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}
