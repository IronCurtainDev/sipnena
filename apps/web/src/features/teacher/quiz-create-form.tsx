import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { formatSubject } from "@/lib/i18n-common";
import type {
  TeacherCourseDraft,
  TeacherCourseSection,
} from "@/lib/prototype-state";
import type { CourseContentCopy } from "./course-content-strings";
import { QuizOptionFields } from "./quiz-option-fields";
import { QuizPlacementFields } from "./quiz-placement-fields";
import type { TeacherCopy } from "./strings";

const SUBJECTS = ["Science", "Mathematics", "ICT", "History"];

export interface NewQuizInput {
  title: string;
  subject: string;
  grade: number;
  courseId: string;
  sectionId: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
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
  courses: TeacherCourseDraft[];
  sections: TeacherCourseSection[];
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

  const courseSections = sections
    .filter((section) => section.courseId === courseId)
    .sort((a, b) => a.order - b.order);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!courseId || !sectionId) {
      setPlacementError(content.placementMissing);
      return;
    }
    if (!prompt.trim() || !options[0]?.trim() || !options[1]?.trim()) return;
    setPlacementError("");
    onCreate({
      title: quizTitle.trim() || copy.defaultQuizFallbackTitle,
      subject,
      grade,
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
    });
    setPrompt("");
    setOptions(["", "", "", ""]);
    setExplanation("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="teacher-quiz-form-heading"
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 lg:col-span-8"
      data-testid="teacher-quiz-create"
    >
      <h2
        id="teacher-quiz-form-heading"
        className="text-lg font-bold text-[var(--sn-text-main)]"
      >
        {locked ? content.createNewQuiz : copy.buildQuizHeading}
      </h2>

      {!locked ? (
        <QuizPlacementFields
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
          }}
          onSectionChange={(next) => {
            setSectionId(next);
            setPlacementError("");
          }}
        />
      ) : null}

      <label className="block text-base font-bold" htmlFor="quiz-title">
        <span className="sr-only">{copy.quizTitlePlaceholder}</span>
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
        <>
          <label className="block text-base font-bold" htmlFor="quiz-subject">
            <span className="sr-only">{copy.subjectField}</span>
            <select
              id="quiz-subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 py-3 text-base"
            >
              {SUBJECTS.map((item) => (
                <option key={item} value={item}>
                  {formatSubject(lang, item)}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="space-y-2">
            <legend className="text-base font-bold">{copy.gradeColon}</legend>
            <div className="flex flex-wrap items-center gap-2">
              {[6, 7, 8, 9, 10, 11].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGrade(item)}
                  className={`min-h-12 rounded-xl px-3 text-base font-bold ${
                    grade === item
                      ? "bg-[var(--sn-primary)] text-white"
                      : "bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
        </>
      ) : null}

      <label className="block text-base font-bold" htmlFor="quiz-prompt">
        <span className="sr-only">{copy.promptPlaceholder}</span>
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
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] text-base font-bold text-white"
        >
          <Plus className="h-4 w-4" />
          <span>{copy.publishQuizBtn}</span>
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
