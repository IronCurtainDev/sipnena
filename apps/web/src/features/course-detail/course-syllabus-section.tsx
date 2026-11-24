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
            <span className="sm:hidden">{t.syllabusMetaMobile}</span>
            <span className="hidden sm:inline">{t.syllabusMetaDesktop}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onExpandCollapseAll}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl px-3.5 text-sm font-bold text-[var(--sn-primary)] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
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
          const titleKey = `${mod.id}_title` as keyof CourseDetailStrings;
          const metaKey = `${mod.id}_meta` as keyof CourseDetailStrings;

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
                        : "bg-blue-50 text-[var(--sn-primary)]"
                    }`}
                  >
                    {mod.number}
                  </span>

                  <div className="min-w-0">
                    <div className="text-base font-bold leading-snug text-[var(--sn-text-main)]">
                      {t[titleKey]}
                    </div>
                    <div className="mt-0.5 text-sm text-[var(--sn-text-muted)]">
                      {t[metaKey]}
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
                    const lTitleKey =
                      `${lesson.id}_title` as keyof CourseDetailStrings;
                    const lMetaKey =
                      `${lesson.id}_meta` as keyof CourseDetailStrings;

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => onLessonClick(lesson)}
                        className="flex min-h-[64px] w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-blue-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] sm:px-5"
                      >
                        <div className="flex min-w-0 items-center gap-3.5">
                          <span
                            aria-hidden="true"
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                              lesson.isFreePreview
                                ? "border border-blue-200 bg-blue-50 text-[var(--sn-primary)]"
                                : "bg-slate-100 text-[var(--sn-text-muted)]"
                            }`}
                          >
                            <LessonIcon className="h-5 w-5" />
                          </span>

                          <div className="min-w-0">
                            <div className="line-clamp-2 text-base font-semibold text-[var(--sn-text-main)]">
                              {t[lTitleKey]}
                            </div>
                            <div className="text-sm text-[var(--sn-text-muted)]">
                              {t[lMetaKey]}
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
                        ) : (
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
