import { Clock, FlaskConical, Play } from "lucide-react";
import {
  getCompletedLessonIds,
  getCourseById,
  getCourseProgressPercent,
  getLessonsForCourse,
  pickLocalized,
  resolveActiveStudentId,
  useCoursesStore,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { RayDiagramThumbnail } from "./thumbnails";
import { HOME_STRINGS } from "./strings";

interface ActiveLessonCardProps {
  lang: AppLanguage;
  onContinue: (courseId?: string, lessonId?: string) => void;
}

export function ActiveLessonCard({ lang, onContinue }: ActiveLessonCardProps) {
  const t = HOME_STRINGS[lang];
  const { store } = useCoursesStore();
  const studentId = resolveActiveStudentId(store.activeStudentId);
  const activeProgress = store.progress.find((p) => p.studentId === studentId);
  const activeCourse = getCourseById(store, activeProgress?.courseId);
  const courseId = activeCourse?.id ?? "";
  const lessons = courseId
    ? getLessonsForCourse(store, courseId, { includeDrafts: false })
    : [];
  const completedSet = new Set(
    getCompletedLessonIds(store, studentId, courseId),
  );
  const nextLesson = lessons.find((l) => !completedSet.has(l.id)) ?? lessons[0];
  const progress = courseId
    ? getCourseProgressPercent(store, studentId, courseId)
    : { completed: 0, total: 0, percent: 0 };
  const pct = progress.percent;
  if (!activeCourse || !nextLesson) return null;
  const lessonTitleText = pickLocalized(nextLesson.title, lang);
  const courseTitleText = pickLocalized(activeCourse.title, lang);
  const gradeBadge =
    lang === "si"
      ? `${activeCourse.grade} ශ්‍රේණිය`
      : lang === "ta"
        ? `தரம் ${activeCourse.grade}`
        : `Grade ${activeCourse.grade}`;
  const progressText =
    progress.total > 0
      ? `${pct}% (${progress.completed}/${progress.total})`
      : t.percentCompleted;
  const lessonCountText =
    progress.total > 0
      ? `${progress.completed}/${progress.total} ${t.lessonsWord}`
      : t.lessonsFraction;

  return (
    <section aria-labelledby="pickup-heading" className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <h2
            id="pickup-heading"
            className="text-sm font-bold leading-normal text-[var(--sn-text-main)]"
          >
            {t.pickUpLabel}
          </h2>
          <span className="hidden rounded-full bg-[var(--sn-surface-selected)] px-2.5 py-0.5 text-xs font-semibold text-[var(--sn-primary)] sm:inline-block">
            {gradeBadge}
          </span>
        </div>

        <span className="text-xs font-semibold text-[var(--sn-primary)] sm:hidden">
          {gradeBadge}
        </span>
        <div className="hidden items-center gap-1.5 text-xs font-medium text-[var(--sn-text-muted)] sm:flex">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t.lastOpenedLabel}</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] shadow-sm">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-4">
          <div className="flex items-start gap-3.5 sm:hidden">
            <RayDiagramThumbnail compact />
            <div className="min-w-0 flex-1 space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sn-border)] bg-[var(--sn-olive)] px-2.5 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
                <FlaskConical
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{activeCourse?.subject ?? t.activeSubjectBadge}</span>
              </div>
              <h3 className="line-clamp-2 text-base font-bold leading-normal text-[var(--sn-text-main)]">
                {lessonTitleText}
              </h3>
              <p className="line-clamp-2 text-xs text-[var(--sn-text-secondary)]">
                {courseTitleText}
              </p>
            </div>
          </div>

          <div className="hidden w-48 shrink-0 overflow-hidden rounded-xl border border-[var(--sn-border)] sm:block lg:w-56">
            <RayDiagramThumbnail />
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="hidden space-y-1 sm:block">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sn-border)] bg-[var(--sn-olive)] px-3 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
                <FlaskConical
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{activeCourse?.subject ?? t.activeSubjectBadge}</span>
              </div>
              <h3 className="line-clamp-2 text-xl font-bold leading-normal text-[var(--sn-text-main)]">
                {lessonTitleText}
              </h3>
              <p className="line-clamp-2 text-sm font-medium text-[var(--sn-text-secondary)]">
                {courseTitleText}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-[var(--sn-text-main)]">
                  {progressText}
                </span>
                <span className="rounded-md bg-[var(--sn-surface-selected)] px-2 py-0.5 text-xs font-semibold text-[var(--sn-primary)]">
                  {lessonCountText}
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={progressText}
                className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--sn-surface-muted)]"
              >
                <div
                  className="sn-progress h-full rounded-full bg-[var(--sn-primary)]"
                  data-progress={String(pct)}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => onContinue(courseId, nextLesson?.id)}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-[var(--sn-primary)] px-6 text-sm font-bold text-[var(--sn-cream)] shadow-sm transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:w-auto sm:text-base"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>{t.continueLessonBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
