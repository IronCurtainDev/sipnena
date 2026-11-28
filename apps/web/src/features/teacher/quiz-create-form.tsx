import { useState, type FormEvent } from "react";
import {
  type Course,
  type Localized,
  type PublishStatus,
  type Unit,
} from "@/data/courses";
import { formatGrade, formatSubject } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { CourseContentCopy } from "./course-content-strings";
import { QuizOptionFields } from "./quiz-option-fields";
import { QuizPlacementFields } from "./quiz-placement-fields";
import type { TeacherCopy } from "./strings";

export interface NewQuizInput {
  title: Localized;
  subject: string;
  grade: number;
  courseId: string;
  sectionId: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  status: PublishStatus;
}

interface LockedPlacement {
  courseId: string;
  sectionId: string;
  subject?: string;
  grade?: number;
}

interface QuizCreateFormProps {
  lang: AppLanguage;
  copy: TeacherCopy;
  content: CourseContentCopy;
  courses: Course[];
  sections: Unit[];
  lockedPlacement?: LockedPlacement;
  onCreate: (input: NewQuizInput) => void;
  onCancel?: () => void;
}

export function QuizCreateForm({
  lang,
  copy,
  content,
  courses,
  sections,
  lockedPlacement,
  onCreate,
  onCancel,
}: QuizCreateFormProps) {
  const [quizTitle, setQuizTitle] = useState("");
  const [subject, setSubject] = useState(lockedPlacement?.subject ?? "Science");
  const [grade, setGrade] = useState(lockedPlacement?.grade ?? 8);
  const [courseId, setCourseId] = useState(lockedPlacement?.courseId ?? "");
  const [sectionId, setSectionId] = useState(lockedPlacement?.sectionId ?? "");
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [placementError, setPlacementError] = useState("");
  const locked = Boolean(lockedPlacement);
  const selectedCourse = courses.find((course) => course.id === courseId);
  const derivedFromCourse = Boolean(selectedCourse);

  const courseSections = sections
    .filter((section) => section.courseId === courseId)
    .sort((a, b) => a.order - b.order);

  const buildInput = (status: PublishStatus): NewQuizInput | null => {
    if (!courseId || !sectionId || !grade) {
      setPlacementError(content.placementMissing);
      return null;
    }
    if (!prompt.trim() || !options[0]?.trim() || !options[1]?.trim()) return null;
    setPlacementError("");
    const titleStr = quizTitle.trim() || copy.defaultQuizFallbackTitle;
    const resolvedSubject = selectedCourse?.subject ?? subject;
    const resolvedGrade = selectedCourse?.grade ?? grade;
    return {
      title: { en: titleStr, si: titleStr, ta: titleStr, [lang]: titleStr },
      subject: resolvedSubject,
      grade: resolvedGrade,
      courseId,
      sectionId,
      prompt: prompt.trim(),
      options: [
        options[0].trim(),
        options[1].trim(),
        options[2]?.trim() || `${copy.optionPrefix} C`,
        options[3]?.trim() || `${copy.optionPrefix} D`,
      ],
      correctIndex,
      explanation: explanation.trim() || copy.defaultExplanation,
      status,
    };
  };

  const submitWithStatus = (status: PublishStatus) => {
    const input = buildInput(status);
    if (!input) return;
    onCreate(input);
    setPrompt("");
    setOptions(["", "", "", ""]);
    setExplanation("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitWithStatus("draft");
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="teacher-quiz-form-heading"
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
      data-testid="teacher-quiz-create"
    >
      <h2
        id="teacher-quiz-form-heading"
        className="text-lg font-bold text-[var(--sn-text-main)]"
      >
        {locked ? content.createNewQuiz : copy.buildQuizHeading}
      </h2>

      <label className="block text-base font-bold" htmlFor="quiz-title">
        <span className="mb-1 block text-sm">{copy.quizTitlePlaceholder}</span>
        <input
          id="quiz-title"
          type="text"
          value={quizTitle}
          onChange={(event) => setQuizTitle(event.target.value)}
          placeholder={copy.defaultQuizTitleInput}
          className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
        />
      </label>

      {!locked ? (
        <fieldset className="space-y-2">
          <legend className="text-base font-bold">{copy.gradeColon}</legend>
          <div className="flex flex-wrap items-center gap-2">
            {[6, 7, 8, 9, 10, 11].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setGrade(item)}
                disabled={derivedFromCourse}
                className={`min-h-12 rounded-xl px-3 text-base font-bold ${
                  grade === item
                    ? "bg-[var(--sn-primary)] text-white"
                    : "bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                } disabled:opacity-70`}
              >
                {formatGrade(lang, item)}
              </button>
            ))}
          </div>
          {derivedFromCourse && selectedCourse ? (
            <p className="text-xs font-semibold text-[var(--sn-text-secondary)]">
              {formatSubject(lang, selectedCourse.subject)} ·{" "}
              {formatGrade(lang, selectedCourse.grade)}
            </p>
          ) : null}
        </fieldset>
      ) : null}

      {!locked ? (
        <QuizPlacementFields
          lang={lang}
          content={content}
          courses={courses}
          courseSections={courseSections}
          courseId={courseId}
          sectionId={sectionId}
          placementError={placementError}
          onCourseChange={(next) => {
            setCourseId(next);
            setSectionId("");
            setPlacementError("");
            const selected = courses.find((c) => c.id === next);
            if (selected) {
              setSubject(selected.subject);
              setGrade(selected.grade);
            }
          }}
          onSectionChange={(next) => {
            setSectionId(next);
            setPlacementError("");
          }}
        />
      ) : null}

      <label className="block text-base font-bold" htmlFor="quiz-prompt">
        <span className="mb-1 block text-sm">{copy.promptPlaceholder}</span>
        <textarea
          id="quiz-prompt"
          rows={3}
          required
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={copy.promptPlaceholder}
          className="w-full rounded-xl border border-[var(--sn-border)] p-3 text-base"
        />
      </label>

      <QuizOptionFields
        options={options}
        correctIndex={correctIndex}
        radioName="correctOption"
        optionPrefix={copy.optionPrefix}
        markCorrectPrefix={copy.markCorrectPrefix}
        onCorrectChange={setCorrectIndex}
        onOptionChange={(index, value) =>
          setOptions((current) =>
            current.map((option, optionIndex) =>
              optionIndex === index ? value : option,
            ),
          )
        }
      />

      <label className="block text-base font-bold" htmlFor="quiz-explanation">
        <span className="sr-only">{copy.explanationPlaceholder}</span>
        <input
          id="quiz-explanation"
          type="text"
          value={explanation}
          onChange={(event) => setExplanation(event.target.value)}
          placeholder={copy.explanationPlaceholder}
          className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
        />
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[var(--sn-primary)] text-base font-bold text-white"
        >
          {copy.saveDraftBtn}
        </button>
        <button
          type="button"
          onClick={() => submitWithStatus("published")}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)] px-4 text-base font-bold text-[var(--sn-primary)]"
        >
          {copy.publishQuizBtn}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--sn-border)] px-4 text-base font-bold text-[var(--sn-text-main)]"
          >
            {content.cancelEdit}
          </button>
        ) : null}
      </div>
    </form>
  );
}
