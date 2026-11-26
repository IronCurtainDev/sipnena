import { useState, type FormEvent } from "react";
import { FileUp, Trash2 } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import type {
  TeacherLessonDraft,
  TeacherQuizDraft,
} from "@/lib/prototype-state";
import type { CourseContentCopy } from "./course-content-strings";
import type { TeacherCourseCopy } from "./course-strings";
import { LessonAuthoredFields } from "./lesson-authored-fields";
import { QuizEditPanel } from "./quiz-edit-panel";
import { TEACHER_COPY } from "./strings";

interface CourseItemEditorProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  content: CourseContentCopy;
  lesson: TeacherLessonDraft | null;
  quiz: TeacherQuizDraft | null;
  onSave: (lesson: TeacherLessonDraft) => void;
  onSaveQuiz: (quiz: TeacherQuizDraft) => void;
  onRemove: (lessonId: string) => void;
}

function filledBlocks<
  T extends { title: string; body?: string; meta?: string },
>(rows: T[]): T[] {
  return rows.filter(
    (row) => row.title.trim() || row.body?.trim() || row.meta?.trim(),
  );
}

export function CourseItemEditor(props: CourseItemEditorProps) {
  if (!props.lesson) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-base text-[var(--sn-text-muted)]">
        {props.copy.selectLectureHint}
      </div>
    );
  }
  return (
    <CourseItemForm key={props.lesson.id} {...props} lesson={props.lesson} />
  );
}

function CourseItemForm({
  lang,
  copy,
  content,
  lesson,
  quiz,
  onSave,
  onSaveQuiz,
  onRemove,
}: CourseItemEditorProps & { lesson: TeacherLessonDraft }) {
  const shared = TEACHER_COPY[lang];
  const [draft, setDraft] = useState(lesson);
  const [editingQuiz, setEditingQuiz] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ...draft,
      title: draft.title.trim() || lesson.title,
      rules: filledBlocks(draft.rules),
      revisionNotes: filledBlocks(draft.revisionNotes),
      files: filledBlocks(draft.files),
    });
  };

  if (draft.kind === "quiz") {
    if (editingQuiz && quiz) {
      return (
        <QuizEditPanel
          copy={shared}
          content={content}
          quiz={quiz}
          onSave={(next) => {
            onSaveQuiz(next);
            setEditingQuiz(false);
          }}
          onCancel={() => setEditingQuiz(false)}
        />
      );
    }
    return (
      <section
        className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
        data-testid="teacher-quiz-slot"
      >
        <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
          {content.quizSlotHeading}
        </h3>
        {quiz ? (
          <>
            <p className="text-base font-bold text-[var(--sn-text-main)]">
              {quiz.title}
            </p>
            <p className="text-base text-[var(--sn-text-secondary)]">
              {quiz.questions.length} {content.questionsWord}
            </p>
            <button
              type="button"
              onClick={() => setEditingQuiz(true)}
              className="inline-flex min-h-12 items-center text-base font-bold text-[var(--sn-primary)]"
            >
              {content.editQuestions}
            </button>
          </>
        ) : (
          <p className="text-base text-[var(--sn-text-secondary)]">
            {content.noQuizLinked}
          </p>
        )}
        <button
          type="button"
          onClick={() => onRemove(lesson.id)}
          className="inline-flex min-h-12 items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 text-base font-bold text-red-700"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>{content.removeRow}</span>
        </button>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="teacher-item-heading"
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
      data-testid="teacher-lecture-editor"
    >
      <h3
        id="teacher-item-heading"
        className="text-lg font-bold text-[var(--sn-text-main)]"
      >
        {draft.kind === "lab" ? content.labHeading : copy.lectureEditorHeading}
      </h3>

      <label className="block text-base font-bold" htmlFor="item-title">
        <span className="mb-1.5 block">{shared.lessonTitleField}</span>
        <input
          id="item-title"
          type="text"
          required
          value={draft.title}
          onChange={(event) =>
            setDraft({ ...draft, title: event.target.value })
          }
          className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
        />
      </label>

      {draft.kind === "video" ? (
        <>
          <label className="block text-base font-bold" htmlFor="item-video">
            <span className="mb-1.5 block">{shared.videoUrlField}</span>
            <input
              id="item-video"
              type="url"
              required
              value={draft.videoUrl}
              spellCheck={false}
              autoCapitalize="none"
              onChange={(event) =>
                setDraft({ ...draft, videoUrl: event.target.value })
              }
              className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
            />
          </label>
          <div className="rounded-2xl border border-dashed border-[var(--sn-border)] bg-[var(--sn-olive)]/40 p-3">
            <div className="flex items-center justify-between gap-2 text-base font-bold">
              <span className="flex items-center gap-1.5 text-[var(--sn-primary)]">
                <FileUp className="h-4 w-4" />
                <span>{shared.pdfAttachmentLabel}</span>
              </span>
              <label className="inline-flex min-h-12 cursor-pointer items-center rounded-xl bg-[var(--sn-surface)] px-3 text-base text-[var(--sn-primary)]">
                <span>{shared.browsePdfBtn}</span>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setDraft((current) => ({
                      ...current,
                      tuteName: file.name,
                    }));
                  }}
                />
              </label>
            </div>
            <label
              className="mt-2 block text-base font-bold"
              htmlFor="item-tute"
            >
              <span className="sr-only">{shared.pdfAttachmentLabel}</span>
              <input
                id="item-tute"
                type="text"
                value={draft.tuteName}
                spellCheck={false}
                onChange={(event) =>
                  setDraft({ ...draft, tuteName: event.target.value })
                }
                className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-3 text-base"
              />
            </label>
          </div>
        </>
      ) : (
        <label className="block text-base font-bold" htmlFor="item-lab">
          <span className="mb-1.5 block">{content.labPromptLabel}</span>
          <textarea
            id="item-lab"
            rows={3}
            required
            value={draft.labPrompt}
            placeholder={content.labPromptPlaceholder}
            onChange={(event) =>
              setDraft({ ...draft, labPrompt: event.target.value })
            }
            className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
          />
        </label>
      )}

      <LessonAuthoredFields copy={content} lesson={draft} onChange={setDraft} />

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[var(--sn-primary)] px-4 text-base font-bold text-white"
        >
          {shared.saveChangesBtn}
        </button>
        <button
          type="button"
          onClick={() => onRemove(lesson.id)}
          className="inline-flex min-h-12 items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 text-base font-bold text-red-700"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>{copy.removeLectureBtn}</span>
        </button>
      </div>
    </form>
  );
}
