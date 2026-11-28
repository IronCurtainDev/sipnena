import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ClipboardCheck,
  FileText,
  Lock,
  Play,
  type LucideIcon,
} from "lucide-react";
import type { CourseModule, LessonItem, LessonType } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";

interface CourseSyllabusSectionProps {
  modules: CourseModule[];
  openModuleIds: string[];
  allExpanded: boolean;
  onToggleModule: (id: string) => void;
  onExpandCollapseAll: () => void;
  onLessonClick: (lesson: LessonItem) => void;
  t: CourseDetailStrings;
}

function getLessonIcon(type: LessonType): LucideIcon {
  if (type === "video") return Play;
  if (type === "note") return FileText;
  return ClipboardCheck;
}

export function CourseSyllabusSection({
  modules,
  openModuleIds,
  allExpanded,
  onToggleModule,
  onExpandCollapseAll,
  onLessonClick,
  t,
}: CourseSyllabusSectionProps) {
  return (
    <section
      aria-labelledby="syllabus-heading"
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2
            id="syllabus-heading"
            className="text-lg font-bold leading-snug text-[var(--sn-text-main)] sm:text-xl"
          >
            {t.syllabusTitle}
          </h2>
          <p className="mt-0.5 text-sm text-[var(--sn-text-muted)]">
            {modules.length} modules ·{" "}
            {modules.reduce((n, m) => n + m.lessons.length, 0)} lessons
          </p>
        </div>

        <button
          type="button"
          onClick={onExpandCollapseAll}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl px-3.5 text-sm font-bold text-[var(--sn-primary)] transition hover:bg-[var(--sn-olive)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <span className="sm:hidden">
            {allExpanded ? t.collapseAllBtn : t.expandAllBtn}
          </span>
          <span className="hidden sm:inline">{t.toggleModulesBtn}</span>
          <ChevronsUpDown
            className="hidden h-4 w-4 sm:inline"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        {modules.map((mod) => {
          const isOpen = openModuleIds.includes(mod.id);

          return (
            <div
              key={mod.id}
              className="overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)]"
            >
              {/* Module Header Button */}
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => onToggleModule(mod.id)}
                className="flex min-h-[64px] w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:px-5"
              >
                <div className="flex min-w-0 items-start gap-3 sm:items-center">
                  <span
                    aria-hidden="true"
                    className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:flex ${
                      mod.locked
                        ? "bg-slate-100 text-slate-700"
                        : "bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                    }`}
                  >
                    {mod.number}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-base font-bold leading-snug text-[var(--sn-text-main)]">
                      <span>{mod.title}</span>
                      {mod.status && mod.status !== "published" ? (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">
                          {mod.status}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-0.5 text-sm text-[var(--sn-text-muted)]">
                      {mod.meta}
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {mod.locked && (
                    <Lock
                      className="h-5 w-5 text-slate-400"
                      aria-hidden="true"
                    />
                  )}
                  {isOpen ? (
                    <ChevronUp
                      className="h-5 w-5 text-[var(--sn-text-muted)]"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDown
                      className="h-5 w-5 text-[var(--sn-text-muted)]"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </button>

              {/* Expanded Lessons List */}
              {isOpen && (
                <div className="divide-y divide-slate-100 border-t border-slate-100 bg-slate-50/40">
                  {mod.lessons.map((lesson) => {
                    const LessonIcon = getLessonIcon(lesson.type);

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => onLessonClick(lesson)}
                        className="flex min-h-[64px] w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-[var(--sn-olive)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:px-5"
                      >
                        <div className="flex min-w-0 items-center gap-3.5">
                          <span
                            aria-hidden="true"
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                              lesson.accessible
                                ? "border border-[var(--sn-border)] bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                                : "bg-slate-100 text-[var(--sn-text-muted)]"
                            }`}
                          >
                            <LessonIcon className="h-5 w-5" />
                          </span>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 line-clamp-2 text-base font-semibold text-[var(--sn-text-main)]">
                              <span>{lesson.title}</span>
                              {lesson.status &&
                              lesson.status !== "published" ? (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">
                                  {lesson.status}
                                </span>
                              ) : null}
                            </div>
                            <div className="text-sm text-[var(--sn-text-muted)]">
                              {lesson.meta}
                            </div>
                          </div>
                        </div>

                        {lesson.isFreePreview ? (
                          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 sm:text-sm">
                            <span>{t.freePreviewBadge}</span>
                            <Play
                              className="hidden h-3.5 w-3.5 fill-current sm:inline"
                              aria-hidden="true"
                            />
                          </span>
                        ) : lesson.accessible ? null : (
                          <Lock
                            className="h-5 w-5 shrink-0 text-slate-400"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
