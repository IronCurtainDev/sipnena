import { CheckCircle2, Star } from "lucide-react";
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
      <div className="text-xs font-bold tracking-wider uppercase text-[var(--sn-text-muted)] sm:hidden">
        {t.aboutInstructorEyebrow}
      </div>
      <h2
        id="instructor-heading"
        className="hidden text-lg font-bold leading-snug text-[var(--sn-text-main)] sm:block sm:text-xl"
      >
        {t.aboutInstructorTitle}
      </h2>

      <div className="flex items-start gap-4">
        <TeacherAvatar size="lg" />

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-1.5">
            <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
              {instructor.name}
            </h3>
            <CheckCircle2
              className="h-5 w-5 shrink-0 text-[var(--sn-primary)]"
              aria-hidden="true"
            />
          </div>

          <p className="text-sm leading-relaxed text-[var(--sn-text-muted)] sm:text-base">
            <span className="sm:hidden">{t.instructorQualsMobile}</span>
            <span className="hidden sm:inline">{t.instructorQualsDesktop}</span>
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5 text-sm">
            <span className="inline-flex items-center gap-1 font-bold text-amber-800">
              <Star
                className="h-4 w-4 fill-amber-400 text-amber-600"
                aria-hidden="true"
              />
              <span>{t.instructorRatingLabel}</span>
            </span>
            <span className="font-medium text-[var(--sn-text-muted)]">
              • {t.instructorStudentsLabel}
            </span>
            <span className="hidden font-medium text-[var(--sn-text-muted)] sm:inline">
              • {t.instructorYearsLabel}
            </span>
          </div>

          <p className="hidden pt-1 text-base leading-relaxed text-[var(--sn-text-secondary)] sm:block">
            {t.instructorBioDesktop}
          </p>
        </div>
      </div>
    </section>
  );
}
