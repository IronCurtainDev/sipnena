import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  FlaskConical,
  HelpCircle,
  ListChecks,
  ShieldCheck,
} from "lucide-react";
import { CURRICULUM_TERMS } from "./mock-data";
import { formatCourseString } from "./strings";
import type { CourseStrings } from "./strings.types";

interface CourseSidebarProps {
  selectedGrade: string;
  openTermIds: string[];
  onToggleTerm: (termId: string) => void;
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onAskTeacher: () => void;
  t: CourseStrings;
}

export function CourseSidebar({
  selectedGrade,
  openTermIds,
  onToggleTerm,
  selectedUnitId,
  onSelectUnit,
  onAskTeacher,
  t,
}: CourseSidebarProps) {
  return (
    <aside
      aria-label="Syllabus details and curriculum units"
      className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-1"
    >
      {/* 1. Government Syllabus Aligned Card */}
      <div className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[var(--sn-primary)]"
          >
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <h3 className="text-base font-bold text-[var(--sn-text-main)]">
              {t.sidebarGovTitle}
            </h3>
            <p className="text-sm text-[var(--sn-text-muted)]">
              {t.sidebarGovSub}
            </p>
          </div>
        </div>

        <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
          {formatCourseString(t.sidebarGovDesc, { grade: selectedGrade })}
        </p>

        <dl className="space-y-2.5 border-t border-slate-100 pt-3 text-sm">
          <div className="flex justify-between gap-2">
            <dt className="text-[var(--sn-text-muted)]">
              {t.curriculumYearLabel}
            </dt>
            <dd className="text-right font-semibold text-[var(--sn-text-main)]">
              {t.curriculumYearVal}
            </dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-[var(--sn-text-muted)]">
              {t.assessmentStyleLabel}
            </dt>
            <dd className="text-right font-semibold text-[var(--sn-text-main)]">
              {t.assessmentStyleVal}
            </dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-[var(--sn-text-muted)]">
              {t.mediumAvailLabel}
            </dt>
            <dd className="text-right font-semibold text-[var(--sn-text-main)]">
              {t.mediumAvailVal}
            </dd>
          </div>
        </dl>
      </div>

      {/* 2. Curriculum Units Accordion Card */}
      <div className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-base font-bold text-[var(--sn-text-main)]">
            <ListChecks
              className="h-5 w-5 shrink-0 text-[var(--sn-primary)]"
              aria-hidden="true"
            />
            <span>{t.curriculumUnitsTitle}</span>
          </div>
          <span className="rounded-md bg-[var(--sn-surface-muted)] px-2.5 py-1 text-xs font-bold text-[var(--sn-text-secondary)]">
            {t.gradePrefix} {selectedGrade}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {CURRICULUM_TERMS.map((term) => {
            const isOpen = openTermIds.includes(term.id);
            const headerKey = `${term.id}Header` as keyof CourseStrings;
            return (
              <div key={term.id} className="py-2 first:pt-0 last:pb-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => onToggleTerm(term.id)}
                  className="flex min-h-[44px] w-full items-center justify-between gap-2 rounded-xl px-2 text-left transition hover:bg-[var(--sn-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
                >
                  <span
                    className={`text-sm font-bold ${
                      term.statusType === "active"
                        ? "text-[var(--sn-primary)]"
                        : "text-amber-800"
                    }`}
                  >
                    {t[headerKey] || term.id}
                  </span>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="text-xs font-medium text-[var(--sn-text-muted)]">
                      {term.statusType === "active"
                        ? t.activeCountBadge
                        : t.comingSoonBadge}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="space-y-1 pb-1 pt-2">
                    {term.units.length > 0 ? (
                      term.units.map((u) => {
                        const active = selectedUnitId === u.id;
                        const unitTitleKey =
                          `${u.id}_title` as keyof CourseStrings;
                        const unitTitle = t[unitTitleKey] || u.id;
                        return (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => onSelectUnit(u.id)}
                            className={`flex min-h-[44px] w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                              active
                                ? "bg-[var(--sn-surface-selected)] font-semibold text-[var(--sn-primary)]"
                                : "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)]"
                            }`}
                          >
                            <span className="line-clamp-2">{unitTitle}</span>
                            {u.done ? (
                              <CheckCircle2
                                className="h-5 w-5 shrink-0 text-[var(--sn-primary)]"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronRight
                                className="h-5 w-5 shrink-0 text-slate-400"
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <p className="px-2 py-1 text-sm text-[var(--sn-text-muted)]">
                        {t.term3Note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Need Help With a Science Question Card */}
      <div className="space-y-3 rounded-2xl bg-[var(--sn-primary)] p-5 text-white sm:col-span-2 lg:col-span-1">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600"
        >
          <HelpCircle className="h-6 w-6" />
        </span>

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold leading-snug">{t.helpCardTitle}</h3>
          <p className="text-base leading-relaxed text-blue-100">
            {t.helpCardDesc}
          </p>
        </div>

        <button
          type="button"
          onClick={onAskTeacher}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-5 text-base font-bold text-[var(--sn-primary)] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sn-primary)]"
        >
          {t.askTeacherBtn}
        </button>
      </div>
    </aside>
  );
}

export function LabPracticalsCard({
  t,
  onViewManual,
}: {
  t: CourseStrings;
  onViewManual: () => void;
}) {
  return (
    <div className="hidden items-center justify-between gap-4 rounded-2xl border-l-4 border-l-emerald-600 border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 sm:flex">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"
        >
          <FlaskConical className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
            {t.labPracticalsTitle}
          </h3>
          <p className="mt-0.5 text-base leading-relaxed text-[var(--sn-text-secondary)]">
            {t.labPracticalsDesc}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onViewManual}
        className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-4 text-base font-semibold text-[var(--sn-text-main)] transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
      >
        <span>{t.viewLabManualBtn}</span>
        <Download className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export function GovAlignedMobileCard({ t }: { t: CourseStrings }) {
  return (
    <div className="flex items-start gap-3.5 rounded-2xl border border-blue-200 bg-[var(--sn-surface-selected)] p-4 sm:hidden">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 shadow-xs"
      >
        <BookOpen className="h-6 w-6" />
      </span>
      <div className="space-y-1">
        <div className="text-base font-bold text-[var(--sn-text-main)]">
          {t.govAlignedMobileTitle}
        </div>
        <p className="text-sm leading-relaxed text-[var(--sn-text-secondary)]">
          {t.govAlignedMobileDesc}
        </p>
      </div>
    </div>
  );
}
