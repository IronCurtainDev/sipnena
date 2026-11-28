import { CheckCircle2 } from "lucide-react";
import type { CourseInstructor } from "./mock-data";
import type { CourseDetailStrings } from "./strings.types";
import { TeacherAvatar } from "./teacher-avatar";

interface CourseInstructorSectionProps {
  instructor: CourseInstructor;
  t: CourseDetailStrings;
}

export function CourseInstructorSection({
  instructor,
  t,
}: CourseInstructorSectionProps) {
  return (
    <section
      aria-labelledby="instructor-heading"
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 sm:p-6"
    >
      <h2
        id="instructor-heading"
        className="text-lg font-bold leading-snug text-[var(--sn-text-main)] sm:text-xl"
      >
        {t.aboutInstructorTitle}
      </h2>

      <div className="flex items-start gap-4">
        <TeacherAvatar size="lg" />
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
              {instructor.name}
            </h3>
            <CheckCircle2
              className="h-5 w-5 shrink-0 text-[var(--sn-primary)]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
