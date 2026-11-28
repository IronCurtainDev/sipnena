import type { AppLanguage } from "@/lib/language";
import { CourseEnrollStepJoin } from "./course-enroll-step-join";
import { CourseEnrollStepSuccess } from "./course-enroll-step-success";
import type { CourseDetailData } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";

interface CourseEnrollModalProps {
  isOpen: boolean;
  isSuccess: boolean;
  course: CourseDetailData;
  lang: AppLanguage;
  t: CourseDetailStrings;
  onClose: () => void;
  onConfirmJoin: () => void;
  onStartFirstLesson: () => void;
  onGoToCourses: () => void;
}

export function CourseEnrollModal({
  isOpen,
  isSuccess,
  course,
  lang,
  t,
  onClose,
  onConfirmJoin,
  onStartFirstLesson,
  onGoToCourses,
}: CourseEnrollModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={isSuccess ? "enrolled-heading" : "enroll-heading"}
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-0 backdrop-blur-xs sm:items-center sm:p-4"
    >
      <div className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:max-h-[90vh] sm:max-w-md sm:rounded-2xl md:max-w-lg">
        {/* Mobile Sheet Drag Indicator */}
        <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-slate-300 sm:hidden" />
        {/* Desktop Top Brand Gradient Line Accent */}
        <div className="hidden h-1 w-full bg-linear-to-r from-[var(--sn-primary)] via-[var(--sn-moss)] to-amber-500 sm:block" />

        {!isSuccess ? (
          <CourseEnrollStepJoin
            course={course}
            lang={lang}
            t={t}
            onClose={onClose}
            onConfirmJoin={onConfirmJoin}
          />
        ) : (
          <CourseEnrollStepSuccess
            course={course}
            t={t}
            onClose={onClose}
            onStartFirstLesson={onStartFirstLesson}
            onGoToCourses={onGoToCourses}
          />
        )}
      </div>
    </div>
  );
}
