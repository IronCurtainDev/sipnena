import { Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import {
  formatGrade,
  formatMedium,
  formatSubject,
  TERM_NAME_MAP,
} from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { TeacherCourseDraft } from "@/lib/prototype-state";
import type { TeacherCourseCopy } from "./course-strings";

interface TeacherCourseCardProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  course: TeacherCourseDraft;
  lessonCount: number;
  onDelete: (course: TeacherCourseDraft) => void;
}

export function TeacherCourseCard({
  lang,
  copy,
  course,
  lessonCount,
  onDelete,
}: TeacherCourseCardProps) {
  const metaTone = course.published
    ? "text-[var(--sn-primary)]"
    : "text-[var(--sn-text-muted)]";

  return (
    <article className="flex flex-col justify-between rounded-[2rem] border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
      <div>
        <h3 className="text-xl leading-tight font-extrabold text-[var(--sn-primary)]">
          {course.title}
        </h3>
        <p className="mt-2 text-base text-[var(--sn-text-muted)]">
          {formatGrade(lang, course.grade)} ·{" "}
          {formatSubject(lang, course.subject)} ·{" "}
          {formatMedium(lang, course.medium)} ·{" "}
          {TERM_NAME_MAP[course.term][lang]}
        </p>
        <p className={`mt-3 text-base font-semibold ${metaTone}`}>
          {course.published ? copy.publishedLabel : copy.draftLabel}
          {" · "}
          {lessonCount} {copy.lessonCountLabel}
          {" · "}
          {course.isFree ? copy.freeLabel : (course.price ?? copy.paidLabel)}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <Link
          to="/teacher/courses/$courseId"
          params={{ courseId: course.id }}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[var(--sn-primary)] px-4 text-base font-bold text-white hover:bg-[var(--sn-primary-hover)]"
        >
          {copy.editCurriculumBtn}
        </Link>
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
