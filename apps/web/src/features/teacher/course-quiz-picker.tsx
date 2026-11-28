import { pickLocalized, type Quiz } from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import type { CourseContentCopy } from "./course-content-strings";

interface CourseQuizPickerProps {
  lang: AppLanguage;
  copy: CourseContentCopy;
  quizzes: Quiz[];
  onPlace: (quizId: string) => void;
  onCreateNew: () => void;
}

export function CourseQuizPicker({
  lang,
  copy,
  quizzes,
  onPlace,
  onCreateNew,
}: CourseQuizPickerProps) {
  return (
    <section
      className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
      data-testid="teacher-quiz-picker"
      aria-labelledby="quiz-picker-heading"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3
          id="quiz-picker-heading"
          className="text-lg font-bold text-[var(--sn-text-main)]"
        >
          {copy.pickerHeading}
        </h3>
        <button
          type="button"
          onClick={onCreateNew}
          data-testid="teacher-create-quiz"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--sn-primary)] px-3 text-base font-bold text-white"
        >
          {copy.createNewQuiz}
        </button>
      </div>
      {quizzes.length === 0 ? (
        <p className="text-base text-[var(--sn-text-secondary)]">
          {copy.pickerEmpty}
        </p>
      ) : (
        <ul className="space-y-2">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="flex flex-col gap-2 rounded-xl border border-[var(--sn-border)] p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-base font-bold text-[var(--sn-text-main)]">
                  {pickLocalized(quiz.title, lang)}
                </p>
                <p className="text-base text-[var(--sn-text-secondary)]">
                  {quiz.questionIds.length} {copy.questionsWord}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onPlace(quiz.id)}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--sn-primary)] px-3 text-base font-bold text-white"
              >
                {copy.placeQuiz}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
