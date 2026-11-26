import { ArrowRight, Clock, Play, Video } from "lucide-react";
import { LANDING_SAMPLE_COURSES } from "./mock-data";
import type { LandingStrings } from "./strings.types";

interface LandingFreePreviewsSectionProps {
  onWatchCoursePreview: (courseId: string) => void;
  onSeeAllCourses: () => void;
  t: LandingStrings;
}

export function LandingFreePreviewsSection({
  onWatchCoursePreview,
  onSeeAllCourses,
  t,
}: LandingFreePreviewsSectionProps) {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--sn-primary)]">
              <Video className="h-3.5 w-3.5" />
              <span>Free Previews</span>
            </p>
            <h2 className="text-xl font-extrabold text-[var(--sn-text-main)] sm:text-2xl">
              {t.freeLessonsTitle}
            </h2>
            <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
              {t.freeLessonsSubtitle}
            </p>
          </div>
          <span className="self-start rounded-full bg-[var(--sn-olive)] px-3.5 py-1 text-xs font-bold text-[var(--sn-primary)] sm:self-auto">
            {t.noLoginNeededBadge}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_SAMPLE_COURSES.map((c) => (
            <div
              key={c.id}
              className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-[var(--sn-border)] bg-[var(--sn-surface)]"
            >
              <div className="relative flex h-36 w-full items-end bg-[var(--sn-olive)] px-4 pb-4">
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-[var(--sn-surface)]/90 px-2 py-0.5 text-[10px] font-semibold text-[var(--sn-text-secondary)]">
                  <Clock className="h-3 w-3" />
                  <span>Preview</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--sn-primary)]">
                    {c.gradeBadge} · {c.subjectBadge}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-[var(--sn-text-main)]">
                    {c.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <p className="text-xs text-[var(--sn-text-muted)]">
                  {c.teacher}
                </p>
                <button
                  type="button"
                  onClick={() => onWatchCoursePreview(c.id)}
                  className="mt-4 flex w-full min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] py-3 text-xs font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)]"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>{t.watchFreeLessonsBtn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onSeeAllCourses}
            className="inline-flex items-center gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-6 py-3 text-xs font-bold text-[var(--sn-text-main)] transition hover:bg-[var(--sn-olive)] active:scale-[0.99]"
          >
            <span>{t.seeAllCoursesBtn}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
