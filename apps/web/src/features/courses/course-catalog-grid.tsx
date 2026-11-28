import type { AppLanguage } from "@/lib/language";
import { CourseCard } from "./course-card";
import type { CourseItem } from "./mock-data";
import type { CourseStrings } from "./strings.types";

interface CourseCatalogGridProps {
  courses: CourseItem[];
  lang: AppLanguage;
  savedIds: string[];
  onToggleSave: (id: string, title: string) => void;
  onOpenModal: (course: CourseItem) => void;
  t: CourseStrings;
}

export function CourseCatalogGrid({
  courses,
  lang,
  savedIds,
  onToggleSave,
  onOpenModal,
  t,
}: CourseCatalogGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          lang={lang}
          isSaved={savedIds.includes(course.id)}
          onToggleSave={onToggleSave}
          onOpenModal={onOpenModal}
          t={t}
        />
      ))}
    </div>
  );
}
