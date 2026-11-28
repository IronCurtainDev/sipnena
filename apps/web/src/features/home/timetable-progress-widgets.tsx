import { Calendar, Lightbulb } from "lucide-react";
import {
  getCourseProgressPercent,
  getStudentEnrollments,
  resolveActiveStudentId,
  useCoursesStore,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { TIMETABLE_ITEMS } from "./mock-data";
import { HOME_STRINGS } from "./strings";

function useOverallTermProgress(): number {
  const { store } = useCoursesStore();
  const studentId = resolveActiveStudentId(store.activeStudentId);
  const enrolled = getStudentEnrollments(store, studentId);
  if (enrolled.length === 0) return 0;
  let completed = 0;
  let total = 0;
  for (const enrollment of enrolled) {
    const p = getCourseProgressPercent(store, studentId, enrollment.courseId);
    completed += p.completed;
    total += p.total;
  }
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

interface TimetableProgressProps {
  lang: AppLanguage;
  onJoinSession?: (id: string) => void;
}

export function TimetableWidget({
  lang,
  onJoinSession,
}: TimetableProgressProps) {
  const t = HOME_STRINGS[lang];

  return (
    <div className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]">
            <Calendar className="h-4 w-4" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-bold text-[var(--sn-text-main)] sm:text-base">
            {t.todaysTimetableTitle}
          </h3>
        </div>
        <span className="rounded-full bg-[var(--sn-surface-muted)] px-2.5 py-0.5 text-xs font-semibold text-[var(--sn-text-secondary)]">
          {t.timetableDayLabel}
        </span>
      </div>

      <div className="space-y-2">
        {TIMETABLE_ITEMS.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-4 text-sm text-[var(--sn-text-secondary)]">
            No live sessions scheduled yet.
          </p>
        ) : null}
        {TIMETABLE_ITEMS.map((slot, idx) => {
          const isNext = idx === 0;
          const title = isNext ? t.tt1_title : t.tt2_title;
          const subtitle = isNext ? t.tt1_sub : t.tt2_sub;

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onJoinSession?.(slot.id)}
              className={`group flex w-full items-start gap-3 rounded-xl p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                isNext
                  ? "border border-[var(--sn-border-selected)] bg-[var(--sn-surface-selected)]"
                  : "border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] hover:bg-[var(--sn-surface)]"
              }`}
            >
              <span
                className={`shrink-0 rounded-md px-2 py-1 text-xs font-bold ${
                  isNext
                    ? "bg-[var(--sn-primary)] text-white"
                    : "bg-[var(--sn-border)] text-[var(--sn-text-secondary)]"
                }`}
              >
                {slot.time}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-xs font-bold text-[var(--sn-text-main)]">
                    {title}
                  </span>
                  {isNext && (
                    <span className="rounded-md bg-[var(--sn-surface)] px-1.5 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
                      {t.nextSlotLabel}
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-xs font-medium leading-snug text-[var(--sn-text-muted)]">
                  {subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StudyTipWidget({ lang }: { lang: AppLanguage }) {
  const t = HOME_STRINGS[lang];

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white"
      >
        <Lightbulb className="h-4 w-4" />
      </span>
      <p className="text-xs leading-relaxed font-medium text-amber-950/90 sm:text-sm">
        <strong className="font-bold">{t.studyTipPrefix}</strong>{" "}
        {t.studyTipText}
      </p>
    </div>
  );
}

export function TermProgressWidget({ lang }: { lang: AppLanguage }) {
  const t = HOME_STRINGS[lang];
  const pct = useOverallTermProgress();

  return (
    <div className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-[var(--sn-text-main)] sm:text-base">
          {t.termProgressTitle}
        </h3>
        <span className="rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
          {t.targetWeekLabel}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.termProgressTitle}
          className="h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--sn-surface-muted)]"
        >
          <div
            className="sn-progress h-full rounded-full bg-emerald-500"
            style={{ width: `${pct}%` }}
            data-progress={pct}
          />
        </div>
        <span className="shrink-0 text-sm font-bold text-[var(--sn-text-main)]">
          {pct}%
        </span>
      </div>

      <p className="text-xs font-medium leading-snug text-[var(--sn-text-secondary)] sm:text-sm">
        {t.termProgressDesc}
      </p>
    </div>
  );
}

/** Compact next-session + term progress for phones (aside is desktop/tablet). */
export function MobileSupportStrip({
  lang,
  onJoinSession,
}: TimetableProgressProps) {
  const t = HOME_STRINGS[lang];
  const pct = useOverallTermProgress();
  const next = TIMETABLE_ITEMS[0];
  if (!next) return null;

  return (
    <section
      aria-label={t.todaysTimetableTitle}
      className="grid grid-cols-1 gap-3 sm:hidden"
    >
      <button
        type="button"
        onClick={() => onJoinSession?.(next.id)}
        className="flex items-center gap-3 rounded-2xl border border-[var(--sn-border-selected)] bg-[var(--sn-surface-selected)] p-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
      >
        <span className="shrink-0 rounded-md bg-[var(--sn-primary)] px-2 py-1 text-xs font-bold text-white">
          {next.time}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-xs font-bold text-[var(--sn-text-main)]">
              {t.tt1_title}
            </span>
            <span className="shrink-0 text-xs font-bold text-[var(--sn-primary)]">
              {t.nextSlotLabel}
            </span>
          </div>
          <p className="truncate text-xs text-[var(--sn-text-muted)]">
            {t.tt1_sub}
          </p>
        </div>
      </button>

      <div className="flex items-center gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3.5 py-3">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-[var(--sn-text-main)]">
            {t.termProgressTitle}
          </div>
          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t.termProgressTitle}
            className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--sn-surface-muted)]"
          >
            <div
              className="sn-progress h-full rounded-full bg-emerald-500"
              style={{ width: `${pct}%` }}
              data-progress={pct}
            />
          </div>
        </div>
        <span className="shrink-0 text-sm font-bold text-[var(--sn-text-main)]">
          {pct}%
        </span>
      </div>
    </section>
  );
}
