import { useState, type FormEvent } from "react";
import {
  pickLocalized,
  type Course,
  type Grade,
  type Medium,
} from "@/data/courses";
import {
  formatGrade,
  formatMedium,
  formatSubject,
  TERM_NAME_MAP,
} from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import { CourseCoverField } from "./course-cover-field";
import type { TeacherCourseCopy } from "./course-strings";
import { TEACHER_COPY } from "./strings";

const SUBJECTS = ["Science", "Mathematics", "ICT", "History"] as const;
const MEDIUMS: Medium[] = ["si", "ta", "en"];

interface CourseInfoPanelProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  course: Course;
  onSave: (patch: Partial<Course>) => void;
}

export function CourseInfoPanel({
  lang,
  copy,
  course,
  onSave,
}: CourseInfoPanelProps) {
  const shared = TEACHER_COPY[lang];
  const [editLang, setEditLang] = useState<AppLanguage>(lang);
  const [title, setTitle] = useState(pickLocalized(course.title, editLang));
  const [description, setDescription] = useState(
    pickLocalized(course.description, editLang),
  );
  const [subject, setSubject] = useState(course.subject);
  const [grade, setGrade] = useState<Grade>(course.grade);
  const [medium, setMedium] = useState<Medium>(course.medium);
  const [term, setTerm] = useState<1 | 2 | 3>(course.term);
  const [isFree, setIsFree] = useState(course.isFree);
  const [priceLkr, setPriceLkr] = useState(
    course.priceLkr ? String(course.priceLkr) : "1200",
  );
  const [coverImageUrl, setCoverImageUrl] = useState(course.coverImageUrl);

  const switchLang = (next: AppLanguage) => {
    setEditLang(next);
    setTitle(course.title[next] ?? "");
    setDescription(course.description[next] ?? "");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      title: { ...course.title, [editLang]: title.trim() },
      description: { ...course.description, [editLang]: description.trim() },
      subject,
      grade,
      medium,
      term,
      isFree,
      priceLkr: isFree ? null : Number(priceLkr) || 1200,
      coverImageUrl,
    });
  };

  return (
    <form
      key={course.id}
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
      data-testid="teacher-course-info"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-[var(--sn-text-secondary)]">
          Language tab
        </span>
        <div className="flex rounded-xl border border-[var(--sn-border)] p-0.5">
          {(["si", "ta", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => switchLang(code)}
              className={`min-h-10 rounded-lg px-3 text-xs font-bold uppercase ${
                editLang === code
                  ? "bg-[var(--sn-primary)] text-white"
                  : "text-[var(--sn-text-muted)]"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <label className="block space-y-1 text-sm font-bold">
        <span>
          {copy.titleField} ({editLang.toUpperCase()})
        </span>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
        />
      </label>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="space-y-1 text-sm font-bold">
          <span>{shared.subjectField}</span>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-base"
          >
            {SUBJECTS.map((sub) => (
              <option key={sub} value={sub}>
                {formatSubject(lang, sub)}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm font-bold">
          <span>{shared.gradeField}</span>
          <select
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value) as Grade)}
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-base"
          >
            {[6, 7, 8, 9, 10, 11].map((g) => (
              <option key={g} value={g}>
                {formatGrade(lang, g)}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm font-bold">
          <span>{copy.mediumField}</span>
          <select
            value={medium}
            onChange={(e) => setMedium(e.target.value as Medium)}
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-base"
          >
            {MEDIUMS.map((m) => (
              <option key={m} value={m}>
                {formatMedium(lang, m)}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm font-bold">
          <span>Term</span>
          <select
            value={term}
            onChange={(e) => setTerm(Number(e.target.value) as 1 | 2 | 3)}
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-base"
          >
            <option value={1}>{TERM_NAME_MAP["Term 1"][lang]}</option>
            <option value={2}>{TERM_NAME_MAP["Term 2"][lang]}</option>
            <option value={3}>{TERM_NAME_MAP["Term 3"][lang]}</option>
          </select>
        </label>
      </div>

      <label className="block space-y-1 text-sm font-bold">
        <span>
          {copy.descriptionField} ({editLang.toUpperCase()})
        </span>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border border-[var(--sn-border)] p-3 text-base"
        />
      </label>

      <CourseCoverField
        label={copy.coverImageField}
        hint={copy.coverImageHint}
        clearLabel={copy.coverImageClear}
        value={coverImageUrl}
        onChange={setCoverImageUrl}
      />

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-bold">
          <input
            type="radio"
            checked={isFree}
            onChange={() => setIsFree(true)}
          />
          <span>{copy.freeLabel}</span>
        </label>
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-bold">
          <input
            type="radio"
            checked={!isFree}
            onChange={() => setIsFree(false)}
          />
          <span>{copy.paidLabel}</span>
        </label>
        {!isFree ? (
          <input
            type="number"
            value={priceLkr}
            onChange={(e) => setPriceLkr(e.target.value)}
            aria-label={copy.priceField}
            className="min-h-11 w-36 rounded-xl border border-[var(--sn-border)] px-3 text-base"
          />
        ) : null}
      </div>

      <button
        type="submit"
        className="min-h-12 rounded-xl bg-[var(--sn-primary)] px-5 text-sm font-bold text-white"
      >
        {copy.saveCourseInfoBtn}
      </button>
    </form>
  );
}
