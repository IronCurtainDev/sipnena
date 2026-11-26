import type { FormEvent } from "react";
import {
  formatGrade,
  formatMedium,
  formatSubject,
  TERM_NAME_MAP,
} from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { StudyMedium } from "@/lib/language-types";
import type {
  TeacherCourseDraft,
  TeacherCourseTerm,
} from "@/lib/prototype-state";
import type { TeacherCourseCopy } from "./course-strings";
import { TEACHER_COPY } from "./strings";

const SUBJECTS = ["Science", "Mathematics", "ICT", "History"] as const;
const MEDIUMS: StudyMedium[] = ["si", "ta", "en"];
const TERMS: TeacherCourseTerm[] = ["Term 1", "Term 2", "Term 3"];

interface CourseInfoPanelProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  course: TeacherCourseDraft;
  onSave: (patch: Partial<TeacherCourseDraft>) => void;
}

export function CourseInfoPanel({
  lang,
  copy,
  course,
  onSave,
}: CourseInfoPanelProps) {
  const shared = TEACHER_COPY[lang];

  const read = (fd: FormData, key: string, fallback = "") => {
    const value = fd.get(key);
    return typeof value === "string" ? value : fallback;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const isFree =
      read(fd, "pricing", course.isFree ? "free" : "paid") === "free";
    onSave({
      title: read(fd, "title").trim() || course.title,
      subject: read(fd, "subject", course.subject),
      grade: Number(read(fd, "grade", String(course.grade))) || course.grade,
      medium: read(fd, "medium", course.medium) as StudyMedium,
      term: read(fd, "term", course.term) as TeacherCourseTerm,
      description: read(fd, "description").trim(),
      isFree,
      price: isFree ? null : read(fd, "price").trim() || null,
    });
  };

  return (
    <form
      key={course.id}
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
      data-testid="teacher-course-info"
    >
      <label className="block text-base font-bold">
        <span className="mb-1.5 block">{copy.titleField}</span>
        <input
          name="title"
          type="text"
          required
          defaultValue={course.title}
          className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <label className="block text-base font-bold">
          <span className="mb-1.5 block">{shared.subjectField}</span>
          <select
            name="subject"
            defaultValue={course.subject}
            className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 py-3 text-base"
          >
            {SUBJECTS.map((sub) => (
              <option key={sub} value={sub}>
                {formatSubject(lang, sub)}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-base font-bold">
          <span className="mb-1.5 block">{shared.gradeField}</span>
          <select
            name="grade"
            defaultValue={course.grade}
            className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 py-3 text-base"
          >
            {[6, 7, 8, 9, 10, 11].map((g) => (
              <option key={g} value={g}>
                {formatGrade(lang, g)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="block text-base font-bold">
          <span className="mb-1.5 block">{copy.mediumField}</span>
          <select
            name="medium"
            defaultValue={course.medium}
            className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 py-3 text-base"
          >
            {MEDIUMS.map((m) => (
              <option key={m} value={m}>
                {formatMedium(lang, m)}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-base font-bold">
          <span className="mb-1.5 block">{shared.termField}</span>
          <select
            name="term"
            defaultValue={course.term}
            className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 py-3 text-base"
          >
            {TERMS.map((t) => (
              <option key={t} value={t}>
                {TERM_NAME_MAP[t][lang]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-base font-bold">
        <span className="mb-1.5 block">{copy.descriptionField}</span>
        <textarea
          name="description"
          rows={3}
          defaultValue={course.description}
          placeholder={copy.descriptionPlaceholder}
          className="w-full resize-none rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
        />
      </label>

      <fieldset className="space-y-2">
        <legend className="text-base font-bold">{copy.pricingField}</legend>
        <div className="flex gap-4 text-base font-bold">
          <label className="flex items-center gap-1.5">
            <input
              type="radio"
              name="pricing"
              value="free"
              defaultChecked={course.isFree}
            />
            {copy.freeLabel}
          </label>
          <label className="flex items-center gap-1.5">
            <input
              type="radio"
              name="pricing"
              value="paid"
              defaultChecked={!course.isFree}
            />
            {copy.paidLabel}
          </label>
        </div>
        <label className="block text-base font-bold">
          <span className="mb-1.5 block">{copy.priceField}</span>
          <input
            name="price"
            type="text"
            defaultValue={course.price ?? ""}
            placeholder={copy.pricePlaceholder}
            className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
          />
        </label>
      </fieldset>

      <p className="text-base text-[var(--sn-text-muted)]">
        {copy.publishToggleHint}
      </p>

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--sn-primary)] px-4 text-base font-bold text-white"
      >
        {copy.saveCourseInfoBtn}
      </button>
    </form>
  );
}
