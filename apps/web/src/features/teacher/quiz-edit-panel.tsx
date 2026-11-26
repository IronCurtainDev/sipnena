import { useState, type FormEvent } from "react";
import type { TeacherQuizDraft } from "@/lib/prototype-state";
import type { QuizQuestionDraft } from "@/lib/prototype-teacher-seed";
import type { CourseContentCopy } from "./course-content-strings";
import { QuizOptionFields } from "./quiz-option-fields";
import type { TeacherCopy } from "./strings";

interface QuizEditPanelProps {
  copy: TeacherCopy;
  content: CourseContentCopy;
  quiz: TeacherQuizDraft;
  onSave: (quiz: TeacherQuizDraft) => void;
  onCancel: () => void;
}

export function QuizEditPanel({
  copy,
  content,
  quiz,
  onSave,
  onCancel,
}: QuizEditPanelProps) {
  const first = quiz.questions[0];
  const [title, setTitle] = useState(quiz.title);
  const [prompt, setPrompt] = useState(first?.prompt ?? "");
  const [options, setOptions] = useState(first?.options ?? ["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(first?.correctIndex ?? 0);
  const [explanation, setExplanation] = useState(first?.explanation ?? "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim() || !options[0]?.trim() || !options[1]?.trim()) return;
    const question: QuizQuestionDraft = {
      id: first?.id ?? `q-${Date.now()}`,
      prompt: prompt.trim(),
      options: [
        options[0].trim(),
        options[1].trim(),
        options[2]?.trim() || `${copy.optionPrefix} C`,
        options[3]?.trim() || `${copy.optionPrefix} D`,
      ],
      correctIndex,
      explanation: explanation.trim() || copy.defaultExplanation,
    };
    onSave({
      ...quiz,
      title: title.trim() || quiz.title,
      questions: [question, ...quiz.questions.slice(1)],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
      data-testid="teacher-quiz-edit"
      aria-labelledby="teacher-quiz-edit-heading"
    >
      <h3
        id="teacher-quiz-edit-heading"
        className="text-lg font-bold text-[var(--sn-text-main)]"
      >
        {content.editQuestions}
      </h3>
      <label className="block text-base font-bold" htmlFor="edit-quiz-title">
        <span className="sr-only">{copy.quizTitlePlaceholder}</span>
        <input
          id="edit-quiz-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
        />
      </label>
      <label className="block text-base font-bold" htmlFor="edit-quiz-prompt">
        <span className="sr-only">{copy.promptPlaceholder}</span>
        <textarea
          id="edit-quiz-prompt"
          rows={3}
          required
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="w-full rounded-xl border border-[var(--sn-border)] p-3 text-base"
        />
      </label>
      <QuizOptionFields
        options={options}
        correctIndex={correctIndex}
        radioName="editCorrectOption"
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
      <label
        className="block text-base font-bold"
        htmlFor="edit-quiz-explanation"
      >
        <span className="sr-only">{copy.explanationPlaceholder}</span>
        <input
          id="edit-quiz-explanation"
          type="text"
          value={explanation}
          onChange={(event) => setExplanation(event.target.value)}
          className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center rounded-xl bg-[var(--sn-primary)] px-4 text-base font-bold text-white"
        >
          {content.saveQuestions}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-12 items-center rounded-xl border border-[var(--sn-border)] px-4 text-base font-bold text-[var(--sn-text-main)]"
        >
          {content.cancelEdit}
        </button>
      </div>
    </form>
  );
}
