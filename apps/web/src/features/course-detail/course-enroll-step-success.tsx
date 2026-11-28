import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  ListChecks,
  Play,
  X,
} from "lucide-react";
import { CelebrationCheckGraphic } from "./course-enroll-graphics";
import type { CourseDetailData } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";

interface StepSuccessProps {
  course: CourseDetailData;
  t: CourseDetailStrings;
  onClose: () => void;
  onStartFirstLesson: () => void;
  onGoToCourses: () => void;
}

export function CourseEnrollStepSuccess({
  course,
  t,
  onClose,
  onStartFirstLesson,
  onGoToCourses,
}: StepSuccessProps) {
  const firstLesson = course.modules
    .flatMap((m) => m.lessons)
    .find(Boolean);
  return (
    <>
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sn-border)] bg-[var(--sn-olive)] px-3 py-1 text-xs font-semibold text-[var(--sn-primary)]">
          <BookOpen className="h-3.5 w-3.5 text-[var(--sn-primary)]" />
          <span>{course.subjectGradePill}</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4 overflow-y-auto p-4 sm:p-6">
        <div className="space-y-1.5 text-center">
          <CelebrationCheckGraphic />
          <h2
            id="enrolled-heading"
            className="pt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
          >
            {t.joinedCourseSuccessTitle}
          </h2>
          <div className="text-xs font-bold text-emerald-700 sm:text-sm">
            {t.joinedBilingualSubtitle}
          </div>
          <p className="mx-auto max-w-sm pt-0.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
            <span className="hidden sm:inline">{t.joinedSubtitle}</span>
            <span className="sm:hidden">{t.joinedSubtitleMobile}</span>
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 uppercase sm:text-xs">
                <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-600" />
                <span>{t.enrolledTag}</span>
              </div>
              <div className="text-sm font-bold leading-snug text-slate-900 sm:text-base">
                {course.title}
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
              {t.enrolledStatusBadge}
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 font-medium text-slate-600">
                <ListChecks className="h-4 w-4 text-slate-400" />
                <span>{t.syllabusStatus}</span>
              </div>
              <span className="text-xs font-bold text-slate-900 sm:text-sm">
                0% · 0 of {course.lessonsTotal} lessons
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 sm:h-2">
              <div className="h-full w-0 rounded-full bg-[var(--sn-primary)]" />
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={onStartFirstLesson}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onStartFirstLesson();
            }}
            className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-white p-3 shadow-2xs transition hover:border-[var(--sn-border-selected)] hover:shadow-xs sm:p-3.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--sn-olive)] text-[var(--sn-primary)] transition group-hover:bg-[var(--sn-primary)] group-hover:text-[var(--sn-cream)] sm:h-10 sm:w-10">
                <Play className="ml-0.5 h-4 w-4 fill-current" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold tracking-wide text-[var(--sn-primary)] uppercase sm:text-xs">
                  <span className="hidden sm:inline">{t.nextUpEyebrow}</span>
                  <span className="sm:hidden">{t.nextUpEyebrowMobile}</span>
                </div>
                <div className="truncate text-xs font-bold text-slate-900 transition group-hover:text-[var(--sn-primary)] sm:text-sm">
                  {firstLesson?.title || t.startFirstLessonBtn}
                </div>
                <div className="text-xs text-slate-500 sm:text-xs">
                  {firstLesson?.meta || course.duration || "—"}
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[var(--sn-primary)]" />
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-200/70 bg-amber-50/80 p-2.5 text-xs text-amber-900 sm:p-3">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="leading-relaxed">
              <span className="hidden sm:inline">{t.notebookTip}</span>
              <span className="sm:hidden">{t.notebookTipMobile}</span>
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onStartFirstLesson}
            className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] sm:text-base"
          >
            <span>{t.startFirstLessonBtn}</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onGoToCourses}
            className="w-full cursor-pointer py-1.5 text-center text-xs font-semibold text-slate-700 transition hover:text-slate-900 hover:underline sm:text-sm"
          >
            {t.goToMyCoursesBtn}
          </button>

          <div className="flex items-center justify-center gap-1.5 pt-1 text-center text-xs text-slate-500 sm:text-xs">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span className="hidden sm:inline">{t.trackerFootnote}</span>
            <span className="sm:hidden">{t.trackerFootnoteMobile}</span>
          </div>
        </div>
      </div>
    </>
  );
}
