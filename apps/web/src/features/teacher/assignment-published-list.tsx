import {
  countSubmissionsForLesson,
  enrolledStudentIdsForCourse,
  getAssignmentItem,
  isAssignmentOverdue,
  missingStudentsForLesson,
  pickLocalized,
  type Course,
  type CourseStoreState,
  type Lesson,
} from "@/data/courses";
import { formatGrade } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { AssignCopy } from "./assignment-copy";

interface PublishedRow {
  lesson: Lesson;
  course: Course;
  item: NonNullable<ReturnType<typeof getAssignmentItem>>;
}

interface AssignmentPublishedListProps {
  lang: AppLanguage;
  store: CourseStoreState;
  rows: PublishedRow[];
  selectedLessonId: string | null;
  t: AssignCopy;
  emptyLabel: string;
  onSelect: (lessonId: string) => void;
  onOpenMarking: (lessonId: string) => void;
}

export function AssignmentPublishedList({
  lang,
  store,
  rows,
  selectedLessonId,
  t,
  emptyLabel,
  onSelect,
  onOpenMarking,
}: AssignmentPublishedListProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center text-base text-[var(--sn-text-muted)]">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rows.map(({ lesson, course, item }) => {
        const counts = countSubmissionsForLesson(store, lesson.id);
        const expected = enrolledStudentIdsForCourse(store, course.id).length;
        const missing = missingStudentsForLesson(store, lesson.id, course.id);
        const selected = selectedLessonId === lesson.id;
        const overdue = isAssignmentOverdue(item.dueAt);

        return (
          <article
            key={lesson.id}
            className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <button
                type="button"
                onClick={() => onSelect(selected ? "" : lesson.id)}
                className="min-w-0 flex-1 text-left"
              >
                <h2 className="text-lg font-bold text-[var(--sn-primary)]">
                  {pickLocalized(lesson.title, lang)}
                </h2>
                <p className="mt-1 text-sm text-[var(--sn-text-muted)]">
                  {formatGrade(lang, course.grade)} ·{" "}
                  {pickLocalized(course.title, lang)}
                </p>
                <p className="mt-2 flex flex-wrap gap-3 text-xs font-semibold text-[var(--sn-text-secondary)]">
                  <span>
                    {t.marksLabel}: {item.maxScore ?? 10}
                  </span>
                  {item.dueAt ? (
                    <span className={overdue ? "text-amber-800" : undefined}>
                      {t.dueLabel}: {item.dueAt.slice(0, 10)}
                      {overdue ? ` · ${t.overdue}` : ""}
                    </span>
                  ) : null}
                  <span>
                    {t.submittedCount}: {counts.submitted}
                    {expected > 0 ? ` / ${expected}` : ""}
                  </span>
                  <span>
                    {t.pendingMarkCount}: {counts.pendingMark}
                  </span>
                </p>
              </button>
              <button
                type="button"
                onClick={() => onOpenMarking(lesson.id)}
                className="inline-flex min-h-10 items-center rounded-xl border border-[var(--sn-border)] px-3 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
              >
                {t.viewSubmissions}
              </button>
            </div>

            {selected ? (
              <div className="space-y-2 border-t border-[var(--sn-border)] pt-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--sn-text-muted)]">
                  {t.missingHeading}
                </p>
                {missing.length === 0 ? (
                  <p className="text-sm text-[var(--sn-text-secondary)]">
                    {t.noMissing}
                  </p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {missing.map((stu) => (
                      <li
                        key={stu.id}
                        className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-950"
                      >
                        {stu.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
