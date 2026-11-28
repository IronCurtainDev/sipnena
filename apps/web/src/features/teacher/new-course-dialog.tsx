import { useState } from "react";
import { X } from "lucide-react";
import {
  createCourseWithUnits,
  makeLocalized,
  TeacherMutationError,
  type Grade,
  type Localized,
  type Medium,
} from "@/data/courses";
import {
  getPublishedSyllabusUnits,
  useSyllabusStore,
} from "@/data/syllabus-store";
import {
  formatGrade,
  formatMedium,
  formatSubject,
  TERM_NAME_MAP,
} from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";
import { NewCourseDetailsFields } from "./new-course-details-fields";
import type { TeacherCourseCopy } from "./course-strings";
import { TEACHER_COPY } from "./strings";

interface NewCourseDialogProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  open: boolean;
  onClose: () => void;
  onCreated: (courseId: string) => void;
}

const SUBJECTS = ["Science", "Mathematics", "ICT", "History"] as const;
const GRADES: Grade[] = [6, 7, 8, 9, 10, 11];
const MEDIUMS: Medium[] = ["si", "ta", "en"];

export function NewCourseDialog({
  lang,
  copy,
  open,
  onClose,
  onCreated,
}: NewCourseDialogProps) {
  const extra = BUILDER_EXTRA_COPY[lang];
  const shared = TEACHER_COPY[lang];
  const { tree } = useSyllabusStore();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [grade, setGrade] = useState<Grade>(8);
  const [subject, setSubject] = useState("Science");
  const [medium, setMedium] = useState<Medium>(lang);
  const [term, setTerm] = useState<1 | 2 | 3>(2);
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");
  const [isFree, setIsFree] = useState(true);
  const [priceLkr, setPriceLkr] = useState("1200");
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>();
  const [useSyllabus, setUseSyllabus] = useState(true);

  if (!open) return null;

  const syllabusUnits = getPublishedSyllabusUnits(tree, grade, subject, term);
  const previewUnits: Localized[] = syllabusUnits.map((u) => u.localizedTitle);

  const handleSubmit = () => {
    const cleanTitle =
      titleText.trim() ||
      `${formatGrade(lang, grade)} ${formatSubject(lang, subject)}`;
    try {
      const courseId = createCourseWithUnits({
        grade,
        subject,
        medium,
        term,
        title: { ...makeLocalized(cleanTitle), [lang]: cleanTitle },
        description: makeLocalized(descText.trim()),
        isFree,
        priceLkr: isFree ? null : Math.max(0, Number(priceLkr) || 1200),
        coverImageUrl,
        initialUnitTitles:
          useSyllabus && previewUnits.length > 0 ? previewUnits : [],
        syllabusRef: `g${grade}-${subject.toLowerCase()}-t${term}`,
      });
      setStep(0);
      setTitleText("");
      setDescText("");
      setCoverImageUrl(undefined);
      onCreated(courseId);
    } catch (err) {
      window.alert(
        err instanceof TeacherMutationError
          ? err.message
          : "Could not create course. Select an active teacher first.",
      );
    }
  };

  const termKey = term === 1 ? "Term 1" : term === 3 ? "Term 3" : "Term 2";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-course-dialog-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 backdrop-blur-xs sm:items-center"
    >
      <div className="w-full max-w-lg space-y-5 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--sn-primary)]">
              {step + 1} / 3 · {extra.newCourseSteps[step]}
            </p>
            <h2
              id="new-course-dialog-title"
              className="mt-1 text-xl font-bold text-[var(--sn-text-main)]"
            >
              {copy.newCourseBtn}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={extra.stepBack}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--sn-border)] text-[var(--sn-text-secondary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === 0 ? (
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1 text-sm font-bold">
              <span>{shared.gradeField}</span>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value) as Grade)}
                className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {formatGrade(lang, g)}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1 text-sm font-bold">
              <span>{shared.subjectField}</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {formatSubject(lang, s)}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1 text-sm font-bold">
              <span>{copy.mediumField}</span>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value as Medium)}
                className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
              >
                {MEDIUMS.map((m) => (
                  <option key={m} value={m}>
                    {formatMedium(lang, m)}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1 text-sm font-bold">
              <span>{TERM_NAME_MAP[termKey][lang]}</span>
              <select
                value={term}
                onChange={(e) => setTerm(Number(e.target.value) as 1 | 2 | 3)}
                className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
              >
                <option value={1}>{TERM_NAME_MAP["Term 1"][lang]}</option>
                <option value={2}>{TERM_NAME_MAP["Term 2"][lang]}</option>
                <option value={3}>{TERM_NAME_MAP["Term 3"][lang]}</option>
              </select>
            </label>
          </div>
        ) : step === 1 ? (
          <NewCourseDetailsFields
            lang={lang}
            copy={copy}
            grade={grade}
            subject={subject}
            titleText={titleText}
            descText={descText}
            isFree={isFree}
            priceLkr={priceLkr}
            coverImageUrl={coverImageUrl}
            onTitleChange={setTitleText}
            onDescChange={setDescText}
            onFreeChange={setIsFree}
            onPriceChange={setPriceLkr}
            onCoverChange={setCoverImageUrl}
          />
        ) : (
          <div className="space-y-3">
            <label className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-3 text-sm font-bold">
              <input
                type="checkbox"
                checked={useSyllabus}
                onChange={(e) => setUseSyllabus(e.target.checked)}
                className="h-4 w-4"
              />
              <span>{extra.useNieSyllabus}</span>
            </label>
            {useSyllabus ? (
              <div className="space-y-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-cream)] p-3 text-sm">
                <p className="font-semibold text-[var(--sn-text-secondary)]">
                  {previewUnits.length > 0
                    ? extra.syllabusPreviewHint
                    : extra.noSyllabusHint}
                </p>
                {previewUnits.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-5 font-semibold text-[var(--sn-primary)]">
                    {previewUnits.map((u, i) => (
                      <li key={i}>{u[lang] ?? u.en ?? ""}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={
              step === 0 ? onClose : () => setStep((s) => (s === 2 ? 1 : 0))
            }
            className="min-h-12 rounded-xl border border-[var(--sn-border)] px-4 text-sm font-bold text-[var(--sn-text-main)]"
          >
            {step === 0 ? "Cancel" : extra.stepBack}
          </button>
          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s === 0 ? 1 : 2))}
              className="min-h-12 rounded-xl bg-[var(--sn-primary)] px-5 text-sm font-bold text-white"
            >
              {extra.stepNext}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              data-testid="confirm-create-course"
              className="min-h-12 rounded-xl bg-[var(--sn-primary)] px-5 text-sm font-bold text-white"
            >
              {extra.createCourseSubmit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
