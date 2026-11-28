import { pickLocalized, type Localized } from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import type { CourseContentCopy } from "./course-content-strings";

interface SimpleCourse {
  id: string;
  title: string | Localized;
}

interface SimpleSection {
  id: string;
  title: string | Localized;
}

function readTitle(title: string | Localized, lang: AppLanguage): string {
  return typeof title === "string" ? title : pickLocalized(title, lang);
}

interface QuizPlacementFieldsProps {
  lang?: AppLanguage;
  content: CourseContentCopy;
  courses: SimpleCourse[];
  courseSections: SimpleSection[];
  courseId: string;
  sectionId: string;
  placementError: string;
  onCourseChange: (courseId: string) => void;
  onSectionChange: (sectionId: string) => void;
}

export function QuizPlacementFields({
  lang = "en",
  content,
  courses,
  courseSections,
  courseId,
  sectionId,
  placementError,
  onCourseChange,
  onSectionChange,
}: QuizPlacementFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-base font-bold" htmlFor="quiz-course">
          <span className="mb-1.5 block">{content.courseField}</span>
          <select
            id="quiz-course"
            required
            value={courseId}
            data-testid="teacher-quiz-course"
            onChange={(event) => onCourseChange(event.target.value)}
            className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-3 text-base"
          >
            <option value="">{content.chooseCourse}</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {readTitle(course.title, lang)}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-base font-bold" htmlFor="quiz-section">
          <span className="mb-1.5 block">{content.sectionField}</span>
          <select
            id="quiz-section"
            required
            value={sectionId}
            data-testid="teacher-quiz-section"
            aria-describedby={
              courseId && courseSections.length === 0
                ? "quiz-section-hint"
                : undefined
            }
            onChange={(event) => onSectionChange(event.target.value)}
            className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-3 text-base"
          >
            <option value="">{content.chooseSection}</option>
            {courseSections.map((section) => (
              <option key={section.id} value={section.id}>
                {readTitle(section.title, lang)}
              </option>
            ))}
          </select>
        </label>
      </div>
      {courseId && courseSections.length === 0 ? (
        <p
          id="quiz-section-hint"
          className="text-base text-[var(--sn-text-secondary)]"
        >
          {content.noSections}
        </p>
      ) : null}
      {placementError ? (
        <p role="alert" className="text-base font-bold text-red-700">
          {placementError}
        </p>
      ) : null}
    </>
  );
}
