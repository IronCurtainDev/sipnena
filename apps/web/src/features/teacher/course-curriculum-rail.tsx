import { ClipboardList, FlaskConical, Plus, Video } from "lucide-react";
import { localizeTeacherLessonTitle } from "@/lib/prototype-i18n";
import type { AppLanguage } from "@/lib/language";
import type {
  TeacherCourseSection,
  TeacherLessonDraft,
} from "@/lib/prototype-state";
import type { CourseContentCopy } from "./course-content-strings";
import type { TeacherCourseCopy } from "./course-strings";

interface CourseCurriculumRailProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  content: CourseContentCopy;
  sections: TeacherCourseSection[];
  lessons: TeacherLessonDraft[];
  selectedLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  onAddSection: () => void;
  onAddVideo: (sectionId: string) => void;
  onAddQuiz: (sectionId: string) => void;
  onAddLab: (sectionId: string) => void;
  onRenameSection: (sectionId: string, title: string) => void;
}

const ICONS = {
  video: Video,
  quiz: ClipboardList,
  lab: FlaskConical,
} as const;

export function CourseCurriculumRail({
  lang,
  copy,
  content,
  sections,
  lessons,
  selectedLessonId,
  onSelectLesson,
  onAddSection,
  onAddVideo,
  onAddQuiz,
  onAddLab,
  onRenameSection,
}: CourseCurriculumRailProps) {
  const sorted = [...sections].sort((a, b) => a.order - b.order);

  return (
    <aside
      className="flex flex-col space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 lg:sticky lg:top-4"
      data-testid="teacher-curriculum-rail"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
          {copy.tabCurriculum}
        </h3>
        <button
          type="button"
          onClick={onAddSection}
          className="inline-flex min-h-12 items-center gap-1 rounded-xl bg-[var(--sn-primary)] px-3 text-base font-bold text-white"
        >
          <Plus className="h-3 w-3" />
          <span>{copy.addSectionBtn}</span>
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-base text-[var(--sn-text-muted)]">
          {copy.noSections}
        </p>
      ) : (
        sorted.map((section) => {
          const sectionLessons = lessons
            .filter((lesson) => lesson.sectionId === section.id)
            .sort((a, b) => a.order - b.order);
          return (
            <div key={section.id} className="space-y-1.5">
              <label className="block text-base font-bold">
                <span className="sr-only">{copy.sectionTitlePlaceholder}</span>
                <input
                  type="text"
                  value={section.title}
                  onChange={(event) =>
                    onRenameSection(section.id, event.target.value)
                  }
                  placeholder={copy.sectionTitlePlaceholder}
                  className="w-full rounded-lg border border-transparent bg-[var(--sn-olive)]/70 px-2 py-2 text-base font-bold text-[var(--sn-primary)] outline-none focus:border-[var(--sn-primary)]"
                />
              </label>
              <ul className="space-y-1">
                {sectionLessons.map((lesson) => {
                  const selected = selectedLessonId === lesson.id;
                  const Icon = ICONS[lesson.kind];
                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        onClick={() => onSelectLesson(lesson.id)}
                        className={`flex min-h-12 w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-base ${
                          selected
                            ? "bg-[var(--sn-surface-selected)] font-bold text-[var(--sn-primary)]"
                            : "font-semibold text-[var(--sn-text-main)] hover:bg-[var(--sn-olive)]/40"
                        }`}
                      >
                        <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-2">
                          {localizeTeacherLessonTitle(lesson, lang)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => onAddVideo(section.id)}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-1 rounded-xl border border-dashed border-[var(--sn-border)] px-2 text-base font-bold text-[var(--sn-primary)]"
                >
                  <Plus className="h-3 w-3" />
                  <span>{content.addVideo}</span>
                </button>
                <button
                  type="button"
                  data-testid="teacher-add-quiz"
                  onClick={() => onAddQuiz(section.id)}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-1 rounded-xl border border-dashed border-[var(--sn-border)] px-2 text-base font-bold text-[var(--sn-primary)]"
                >
                  <Plus className="h-3 w-3" />
                  <span>{content.addQuiz}</span>
                </button>
                <button
                  type="button"
                  data-testid="teacher-add-lab"
                  onClick={() => onAddLab(section.id)}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-1 rounded-xl border border-dashed border-[var(--sn-border)] px-2 text-base font-bold text-[var(--sn-primary)]"
                >
                  <Plus className="h-3 w-3" />
                  <span>{content.addLab}</span>
                </button>
              </div>
            </div>
          );
        })
      )}
    </aside>
  );
}
