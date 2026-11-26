import { Star } from "lucide-react";
import type { StudentReview } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";

interface CourseReviewsSectionProps {
  reviews: StudentReview[];
  gradeBadge: string;
  t: CourseDetailStrings;
}

export function CourseReviewsSection({
  reviews,
  gradeBadge,
  t,
}: CourseReviewsSectionProps) {
  return (
    <section
      aria-labelledby="feedback-heading"
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          id="feedback-heading"
          className="text-lg font-bold leading-snug text-[var(--sn-text-main)] sm:text-xl"
        >
          {t.feedbackTitle}
        </h2>

        <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
          {gradeBadge}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {reviews.map((rev, idx) => {
          const quoteKey = `${rev.id}_quote` as keyof CourseDetailStrings;
          return (
            <article
              key={rev.id}
              className={`${
                idx === 1 ? "hidden sm:flex" : "flex"
              } flex-col justify-between space-y-3 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-4`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="flex items-center gap-1"
                    aria-label="5 out of 5 stars"
                  >
                    {[1, 2, 3, 4, 5].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className="h-4 w-4 fill-amber-400 text-amber-500"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[var(--sn-text-muted)] sm:hidden">
                    {rev.timeAgo}
                  </span>
                </div>

                <div className="text-base font-bold text-[var(--sn-text-main)] sm:hidden">
                  {rev.studentName} ({rev.districtMobile})
                </div>

                <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
                  {t[quoteKey]}
                </p>
              </div>

              <div className="hidden items-center gap-2.5 border-t border-slate-200/70 pt-2 sm:flex">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--sn-sage)] text-xs font-bold text-[var(--sn-primary)]">
                  {rev.initials}
                </span>
                <span className="text-sm font-semibold text-[var(--sn-text-main)]">
                  {rev.studentName} • {rev.districtDesktop}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
