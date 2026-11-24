import { CourseCard } from "./course-card";
import { GovAlignedMobileCard, LabPracticalsCard } from "./course-sidebar";
import type { CourseItem } from "./mock-data";
import type { CourseStrings } from "./strings.types";

interface CourseCatalogGridProps {
  courses: CourseItem[];
  savedIds: string[];
  onToggleSave: (id: string, title: string) => void;
  onOpenModal: (course: CourseItem) => void;
  onViewManual: () => void;
  t: CourseStrings;
}

export function CourseCatalogGrid({
  courses,
  savedIds,
  onToggleSave,
  onOpenModal,
  onViewManual,
  t,
}: CourseCatalogGridProps) {
  return (
    <div className="min-w-0 space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isSaved={savedIds.includes(course.id)}
            onToggleSave={onToggleSave}
            onOpenModal={onOpenModal}
            t={t}
          />
        ))}
      </div>

      <GovAlignedMobileCard t={t} />
      <LabPracticalsCard t={t} onViewManual={onViewManual} />
    </div>
  );
}
