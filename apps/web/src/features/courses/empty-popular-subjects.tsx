import { Bell, ChevronRight, LayoutGrid, Megaphone } from "lucide-react";
import { POPULAR_SUBJECTS } from "./mock-data";
import { formatCourseString } from "./strings";
import type { CourseStrings } from "./strings.types";

interface PopularSubjectsSectionProps {
  selectedGrade: string;
  onSeeAllSubjects: (subName?: string) => void;
  onRequestModule: () => void;
  t: CourseStrings;
}

export function PopularSubjectsSection({
  selectedGrade,
  onSeeAllSubjects,
  onRequestModule,
  t,
}: PopularSubjectsSectionProps) {
  return (
    <section aria-labelledby="popular-grade-heading" className="space-y-4">
      <div className="flex items-end justify-between gap-2">
        <div>
          <h3
            id="popular-grade-heading"
            className="text-lg font-bold text-[var(--sn-text-main)]"
          >
            <span className="sm:hidden">
              {formatCourseString(t.popularInGradeMobile, {
                grade: selectedGrade,
              })}
            </span>
            <span className="hidden sm:inline">
              {formatCourseString(t.popularInGradeDesktop, {
                grade: selectedGrade,
              })}
            </span>
          </h3>
          <p className="hidden text-base text-[var(--sn-text-muted)] sm:block">
            {t.popularDesktopSub}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSeeAllSubjects()}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-base font-semibold text-[var(--sn-primary)] transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <span className="sm:hidden">{t.exploreAllMobile}</span>
          <span className="hidden sm:inline">{t.exploreAllDesktop}</span>
          <ChevronRight
            className="hidden h-5 w-5 sm:inline"
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {POPULAR_SUBJECTS.map((sub, idx) => {
          const Icon = sub.icon;
          const subTitleKey = `sub_${sub.id}` as keyof CourseStrings;
          const subDescKey = `sub_${sub.id}_desc` as keyof CourseStrings;
          const subTitle = t[subTitleKey] || sub.id;
          const subDesc = t[subDescKey] || "";

          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => onSeeAllSubjects(subTitle)}
              className={`${
                idx === 2 ? "hidden md:flex" : "flex"
              } flex-col justify-between rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 text-left transition hover:border-[var(--sn-border-selected)] hover:bg-[var(--sn-surface-selected)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]`}
            >
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${sub.iconClass}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-lg bg-[var(--sn-surface-muted)] px-3 py-1 text-sm font-semibold text-[var(--sn-text-secondary)]">
                    {t.gradeFilterLabel} {selectedGrade}
                  </span>
                </div>

                <div>
                  <div className="text-lg font-bold text-[var(--sn-text-main)]">
                    {subTitle}
                  </div>
                  <div className="mt-0.5 text-sm text-[var(--sn-text-muted)]">
                    {sub.bilingualSub}
                  </div>
                </div>

                <p className="line-clamp-2 text-base leading-relaxed text-[var(--sn-text-secondary)]">
                  {subDesc}
                </p>
              </div>

              <div className="mt-4 flex w-full items-center justify-between border-t border-slate-100 pt-4 text-sm text-[var(--sn-text-muted)]">
                <span>
                  {sub.unitsCount} {t.unitsWord} • {sub.coursesCount}{" "}
                  {t.coursesWord}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sn-surface-muted)] text-[var(--sn-text-secondary)]">
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Full-Width See All Subjects CTA */}
      <div className="pt-2 sm:hidden">
        <button
          type="button"
          onClick={() => onSeeAllSubjects()}
          className="inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[var(--sn-primary)] px-6 text-base font-semibold text-white transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] focus-visible:ring-offset-2"
        >
          <LayoutGrid className="h-6 w-6" aria-hidden="true" />
          <span>{t.seeAllSubjectsBtn}</span>
        </button>
      </div>

      {/* Desktop Request Module Banner */}
      <div className="hidden items-center justify-between gap-4 rounded-2xl border border-blue-200 bg-[var(--sn-surface-selected)] p-6 sm:flex">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--sn-primary)] shadow-xs"
          >
            <Megaphone className="h-6 w-6" />
          </span>
          <div>
            <div className="text-lg font-bold text-[var(--sn-text-main)]">
              {formatCourseString(t.requestBannerTitle, {
                grade: selectedGrade,
              })}
            </div>
            <p className="mt-0.5 text-base text-[var(--sn-text-secondary)]">
              {t.requestBannerDesc}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRequestModule}
          className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 text-base font-semibold text-[var(--sn-primary)] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span>{t.requestModuleBtn}</span>
        </button>
      </div>
    </section>
  );
}
