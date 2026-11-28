import { useState, type FormEvent } from "react";
import { Library } from "lucide-react";
import {
  makeLocalized,
  saveQuizRecord,
  useCoursesStore,
  type Grade,
  type Question,
  type Quiz,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import type { CourseContentCopy } from "./course-content-strings";
import {
  QuizBankAttachPanel,
  QuizQuestionRail,
  QuizSettingsFields,
} from "./quiz-edit-sidebar";
import { QuizQuestionEditor } from "./quiz-question-editor";
import type { TeacherCopy } from "./strings";

interface QuizEditPanelProps {
  lang?: AppLanguage;
  copy: TeacherCopy;
  content: CourseContentCopy;
  quiz: Quiz;
  onSave: (next: Quiz) => void;
  onCancel: () => void;
}

export function QuizEditPanel({
  lang = "en",
  content,
  quiz,
  onSave,
  onCancel,
}: QuizEditPanelProps) {
  const { store } = useCoursesStore();
  const initialMap = new Map(store.questions.map((q) => [q.id, q]));
  const [editLang, setEditLang] = useState<AppLanguage>(lang);
  const [draftQuiz, setDraftQuiz] = useState<Quiz>(quiz);
  const [questions, setQuestions] = useState<Question[]>(() =>
    quiz.questionIds
      .map((id) => initialMap.get(id))
      .filter((q): q is Question => Boolean(q)),
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const [bankOpen, setBankOpen] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [sharedPromptOpen, setSharedPromptOpen] = useState(false);

  const activeQuestion = questions[activeIdx] ?? null;
  const attachedIds = new Set(questions.map((q) => q.id));

  const addNewQuestion = () => {
    const q: Question = {
      id: `q-${Date.now()}`,
      prompt: makeLocalized(""),
      options: [
        makeLocalized(""),
        makeLocalized(""),
        makeLocalized(""),
        makeLocalized(""),
      ],
      correctIndex: 0,
      explanation: makeLocalized(""),
      subject: draftQuiz.subject ?? "Science",
      grade: (draftQuiz.grade as Grade) ?? 8,
      source: "teacher",
      difficulty: 2,
    };
    const next = [...questions, q];
    setQuestions(next);
    setActiveIdx(next.length - 1);
  };

  const duplicateAt = (idx: number) => {
    const src = questions[idx];
    if (!src) return;
    const next = [...questions];
    next.splice(idx + 1, 0, {
      ...src,
      id: `q-${Date.now()}`,
      prompt: { ...src.prompt },
      options: src.options.map((o) => ({ ...o })),
      explanation: { ...src.explanation },
    });
    setQuestions(next);
    setActiveIdx(idx + 1);
  };

  const moveAt = (idx: number, delta: -1 | 1) => {
    const nextIdx = idx + delta;
    if (nextIdx < 0 || nextIdx >= questions.length) return;
    const next = [...questions];
    const [item] = next.splice(idx, 1);
    next.splice(nextIdx, 0, item!);
    setQuestions(next);
    setActiveIdx(nextIdx);
  };

  const removeAt = (idx: number) => {
    if (questions.length <= 1) return;
    const next = questions.filter((_, i) => i !== idx);
    setQuestions(next);
    setActiveIdx(Math.min(activeIdx, next.length - 1));
  };

  const sharedModifiedIds = questions.filter(
    (q) =>
      store.quizzes.filter((qz) => qz.questionIds.includes(q.id)).length > 1,
  );

  const commitSave = (cloneShared: boolean) => {
    const clones: Record<string, Question> = {};
    const finalQuestions = questions.map((q) => {
      if (cloneShared && sharedModifiedIds.some((sq) => sq.id === q.id)) {
        const cloneId = `${q.id}-copy-${Date.now()}`;
        const cloned = { ...q, id: cloneId };
        clones[cloneId] = cloned;
        return cloned;
      }
      return q;
    });
    const updatedQuiz: Quiz = {
      ...draftQuiz,
      questionIds: finalQuestions.map((q) => q.id),
    };
    saveQuizRecord(
      updatedQuiz,
      finalQuestions.filter((q) => !clones[q.id]),
      clones,
    );
    setSharedPromptOpen(false);
    onSave(updatedQuiz);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draftQuiz.courseId || !draftQuiz.grade) {
      setValidationError(
        "Every quiz must be linked to at least one course and grade.",
      );
      return;
    }
    const invalid = questions.some(
      (q) =>
        !(q.prompt.en || q.prompt.si || q.prompt.ta)?.trim() ||
        !(q.options[0]?.en || q.options[0]?.si || q.options[0]?.ta)?.trim() ||
        !(q.options[1]?.en || q.options[1]?.si || q.options[1]?.ta)?.trim(),
    );
    if (invalid) {
      setValidationError(
        "Every question needs a prompt and at least 2 answer options.",
      );
      return;
    }
    setValidationError("");
    if (sharedModifiedIds.length > 0 && !sharedPromptOpen) {
      setSharedPromptOpen(true);
      return;
    }
    commitSave(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
      data-testid="teacher-quiz-edit"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--sn-border)] pb-3">
        <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
          {content.editQuestions} ({questions.length})
        </h3>
        <div className="flex rounded-xl border border-[var(--sn-border)] p-0.5">
          {(["si", "ta", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setEditLang(code)}
              className={`min-h-10 rounded-lg px-2.5 text-xs font-bold uppercase ${
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

      <QuizSettingsFields
        editLang={editLang}
        draftQuiz={draftQuiz}
        maxPassMark={questions.length}
        onChange={setDraftQuiz}
      />

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setBankOpen((v) => !v)}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[var(--sn-primary)]"
          aria-expanded={bankOpen}
        >
          <Library className="h-4 w-4" />
          <span>{bankOpen ? "Hide question bank" : "Add from question bank"}</span>
        </button>
        {bankOpen ? (
          <QuizBankAttachPanel
            editLang={editLang}
            bankQuestions={store.questions}
            attachedIds={attachedIds}
            onAttach={(q) => {
              setQuestions((p) => [...p, q]);
              setActiveIdx(questions.length);
            }}
          />
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <QuizQuestionRail
          editLang={editLang}
          questions={questions}
          activeIdx={activeIdx}
          onSelect={setActiveIdx}
          onMove={moveAt}
          onDuplicate={duplicateAt}
          onRemove={removeAt}
          onAdd={addNewQuestion}
        />

        <div className="lg:col-span-8">
          {activeQuestion ? (
            <QuizQuestionEditor
              editLang={editLang}
              question={activeQuestion}
              onChange={(updated) =>
                setQuestions((prev) =>
                  prev.map((q, i) => (i === activeIdx ? updated : q)),
                )
              }
            />
          ) : null}
        </div>
      </div>

      {validationError ? (
        <p role="alert" className="text-sm font-bold text-red-700">
          {validationError}
        </p>
      ) : null}

      {sharedPromptOpen ? (
        <div className="space-y-2 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm">
          <p className="font-bold text-amber-950">
            {sharedModifiedIds.length} question(s) are shared with another quiz.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => commitSave(false)}
              className="min-h-11 rounded-xl bg-[var(--sn-primary)] px-4 text-xs font-bold text-white"
            >
              Update everywhere
            </button>
            <button
              type="button"
              onClick={() => commitSave(true)}
              className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-white px-4 text-xs font-bold text-[var(--sn-text-main)]"
            >
              Only update in this quiz
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex gap-2">
        <button
          type="submit"
          data-testid="teacher-quiz-save-btn"
          className="min-h-12 flex-1 rounded-xl bg-[var(--sn-primary)] text-sm font-bold text-white"
        >
          {content.saveQuestions}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-12 rounded-xl border border-[var(--sn-border)] px-4 text-sm font-bold"
        >
          {content.cancelEdit}
        </button>
      </div>
    </form>
  );
}
