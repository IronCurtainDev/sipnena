import { Check, Play, X } from "lucide-react";
import type { LessonItem } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";

interface CoursePreviewModalProps {
  previewLesson: LessonItem | null;
  onClose: () => void;
  onEnroll: () => void;
  t: CourseDetailStrings;
}

export function CoursePreviewModal({
  previewLesson,
  onClose,
  onEnroll,
  t,
}: CoursePreviewModalProps) {
  if (!previewLesson) return null;

  const titleKey = `${previewLesson.id}_title` as keyof CourseDetailStrings;
  const metaKey = `${previewLesson.id}_meta` as keyof CourseDetailStrings;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-lesson-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-4 sm:items-center"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-[var(--sn-border)] p-4 sm:p-5">
          <div>
            <span className="mb-1.5 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
              {t.previewModalEyebrow}
            </span>
            <h2
              id="preview-lesson-title"
              className="text-lg font-bold leading-snug text-[var(--sn-text-main)] sm:text-xl"
            >
              {t[titleKey]}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.closePreviewBtn}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[var(--sn-text-muted)] transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 p-4 sm:p-6">
          <div className="space-y-3 rounded-xl bg-slate-900 p-6 text-center text-white">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sn-primary)]">
              <Play
                className="ml-0.5 h-7 w-7 fill-current"
                aria-hidden="true"
              />
            </div>
            <div className="text-base font-bold">{t[titleKey]}</div>
            <div className="text-sm text-slate-300">
              {t[metaKey]} • {t.mediumPill}
            </div>
          </div>

          <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
            {t.previewModalNote}
          </p>

          <div className="flex flex-col-reverse items-center justify-end gap-3 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[48px] w-full rounded-xl border border-[var(--sn-border)] bg-white px-5 text-base font-semibold text-[var(--sn-text-main)] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:w-auto"
            >
              {t.closePreviewBtn}
            </button>
            <button
              type="button"
              onClick={onEnroll}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-base font-bold text-white transition hover:bg-[var(--sn-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:w-auto"
            >
              <Check className="h-5 w-5" aria-hidden="true" />
              <span>{t.enrollNowBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
