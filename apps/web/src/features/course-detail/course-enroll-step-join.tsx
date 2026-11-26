import {
  Check,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  X,
} from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { OpticsRayDiagramThumbnail } from "./course-enroll-graphics";
import type { CourseDetailData } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";

interface StepJoinProps {
  course: CourseDetailData;
  lang: AppLanguage;
  t: CourseDetailStrings;
  onClose: () => void;
  onConfirmJoin: () => void;
}

export function CourseEnrollStepJoin({
  course,
  lang,
  t,
  onClose,
  onConfirmJoin,
}: StepJoinProps) {
  return (
    <>
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
            <Check className="h-3.5 w-3.5 stroke-[3] text-emerald-600" />
            <span>{t.freeEnrollmentBadge}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/60 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
            <span className="text-slate-400">•</span>
            <span>{t.subjectGradePill}</span>
          </span>
        </div>
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
        <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/70 bg-slate-50/80 p-3">
          <OpticsRayDiagramThumbnail className="h-14 w-14 sm:h-16 sm:w-16" />
          <div className="min-w-0 flex-1">
            <h3
              id="enroll-heading"
              className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 sm:text-base"
            >
              {t.courseTitle}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-700 sm:text-sm">
              <span>{course.instructor.name}</span>
              <CheckCircle2 className="inline h-3.5 w-3.5 shrink-0 fill-[var(--sn-cream)] text-[var(--sn-primary)]" />
            </div>
            <p className="mt-0.5 hidden truncate text-xs text-slate-500 sm:block">
              {t.educatorRole}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-emerald-200/80 bg-emerald-50/80 p-3.5 sm:rounded-2xl sm:p-4">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xs">
            <Check className="h-4 w-4 stroke-[3]" />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-snug text-slate-900 sm:text-base">
                {t.course100FreeTitle}
              </span>
              <span className="text-xs font-semibold text-emerald-800 sm:text-sm">
                {lang === "ta"
                  ? t.course100FreeSubtitleTa
                  : t.course100FreeSubtitleSi}
              </span>
            </div>
            <p className="pt-0.5 text-xs leading-relaxed text-slate-600">
              <span className="hidden sm:inline">{t.course100FreeDesc}</span>
              <span className="sm:hidden">{t.course100FreeDescMobile}</span>
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--sn-border)] bg-[var(--sn-olive)] text-[var(--sn-primary)]">
              <Play className="ml-0.5 h-4 w-4 fill-[var(--sn-primary)]" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 sm:text-sm">
                {t.feature1Title}
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                {t.feature1Desc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--sn-border)] bg-[var(--sn-olive)] text-[var(--sn-primary)]">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 sm:text-sm">
                {t.feature2Title}
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                {t.feature2Desc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 sm:text-sm">
                {t.feature3Title}
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                {t.feature3Desc}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onConfirmJoin}
            className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] sm:text-base"
          >
            <GraduationCap className="h-5 w-5 shrink-0" />
            <span className="hidden sm:inline">{t.joinCourseBtn}</span>
            <span className="sm:hidden">{t.joinCourseBtnMobile}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer py-1.5 text-center text-xs font-semibold text-slate-500 transition hover:text-slate-800 sm:text-sm"
          >
            <span className="hidden sm:inline">{t.notNowBtn}</span>
            <span className="sm:hidden">{t.notNowBtnMobile}</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 pt-1 text-center text-[11px] text-slate-500 sm:text-xs">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span>{t.syncFootnote}</span>
          </div>
        </div>
      </div>
    </>
  );
}
