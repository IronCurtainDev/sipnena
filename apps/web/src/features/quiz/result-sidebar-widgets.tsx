import { ArrowRight, BookOpen, MessageSquare, Play } from "lucide-react";
import type { QuizResultStrings } from "./result-strings.types";

interface ResultSidebarWidgetsProps {
  t: QuizResultStrings;
  isPassed: boolean;
  onStartNextLesson: () => void;
  onReviewLesson: (lesson: string) => void;
  onAskTeacher: () => void;
}

export function ResultSidebarWidgets({
  t,
  isPassed,
  onStartNextLesson,
  onReviewLesson,
  onAskTeacher,
}: ResultSidebarWidgetsProps) {
  return (
    <div className="space-y-6">
      {/* If Passed: Next in syllabus unlocked card */}
      {isPassed ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.nextInSyllabusTitle}
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
              ✓
            </span>
          </div>

          <div className="space-y-2">
            <div className="overflow-hidden rounded-2xl border border-emerald-200/80 bg-white p-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Play className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                <span>{t.nextLessonTitle}</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                {t.nextLessonDesc}
              </p>
            </div>

            <button
              type="button"
              onClick={onStartNextLesson}
              className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-4 text-xs font-bold text-white shadow-md hover:bg-[var(--sn-primary-hover)] transition active:scale-[0.99]"
            >
              <span>{t.startLessonBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* If Need Review: Refresher Topics widget */
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-3.5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <BookOpen className="h-4 w-4 text-[var(--sn-primary)]" />
            <span>{t.refresherTopicsTitle}</span>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => onReviewLesson(t.refresher1Title)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 text-left hover:bg-[var(--sn-olive)]/60 transition"
            >
              <div className="min-w-0">
                <div className="truncate text-xs font-bold text-slate-900">
                  {t.refresher1Title}
                </div>
                <div className="text-xs text-slate-500">{t.refresher1Meta}</div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => onReviewLesson(t.refresher2Title)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 text-left hover:bg-[var(--sn-olive)]/60 transition"
            >
              <div className="min-w-0">
                <div className="truncate text-xs font-bold text-slate-900">
                  {t.refresher2Title}
                </div>
                <div className="text-xs text-slate-500">{t.refresher2Meta}</div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Formula Quick Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 space-y-2 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>{t.formulaCardTitle}</span>
          <span className="font-mono text-sm text-[var(--sn-primary)]">Σ</span>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 font-mono text-xs font-bold text-slate-800 text-center">
          f = R / 2
        </div>
        <p className="text-xs text-slate-500 text-center">
          {t.formulaCardBody}
        </p>
      </div>

      {/* Teacher's Voice & WhatsApp Support */}
      <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/40 p-5 space-y-3.5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white font-bold text-sm shadow-2xs">
            MJ
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-bold text-slate-900">
              {t.teacherName}
            </div>
            <div className="truncate text-xs font-semibold text-[var(--sn-primary)]">
              {t.teacherTitle}
            </div>
          </div>
        </div>

        <p className="text-xs italic leading-relaxed text-slate-700">
          {t.teacherPraiseQuote}
        </p>

        <button
          type="button"
          onClick={onAskTeacher}
          className="flex min-h-[40px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition shadow-2xs"
        >
          <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
          <span>{t.askTeacherWhatsApp}</span>
        </button>
      </div>
    </div>
  );
}
