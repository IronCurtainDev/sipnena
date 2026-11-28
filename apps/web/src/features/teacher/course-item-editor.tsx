import { useEffect, useRef, useState, type FormEvent } from "react";
import { Trash2 } from "lucide-react";
import { pickLocalized, type Lesson, type Quiz } from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";
import type { CourseContentCopy } from "./course-content-strings";
import type { TeacherCourseCopy } from "./course-strings";
import { LessonEditorTabs } from "./lesson-editor-tabs";
import type { SaveIndicator } from "./use-course-builder";

interface CourseItemEditorProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  content: CourseContentCopy;
  lesson: Lesson | null;
  quiz: Quiz | null;
  onSave: (lesson: Lesson, silent?: boolean) => void;
  onDirtyChange: (state: SaveIndicator) => void;
  onOpenQuizEditor?: (quizId: string) => void;
  onRemove: (lessonId: string) => void;
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
  onDirtyChange,
  onOpenQuizEditor,
  onRemove,
}: CourseItemEditorProps & { lesson: Lesson }) {
  const extra = BUILDER_EXTRA_COPY[lang];
  const [draft, setDraft] = useState<Lesson>(lesson);
  const [prevLesson, setPrevLesson] = useState<Lesson>(lesson);
  if (lesson !== prevLesson) {
    setPrevLesson(lesson);
    setDraft(lesson);
  }
  const [editLang, setEditLang] = useState<AppLanguage>(lang);
  const [activeTab, setActiveTab] = useState<
    "basics" | "video" | "notes" | "files"
  >("basics");
  const timerRef = useRef<number | null>(null);
  const pendingDraftRef = useRef<Lesson | null>(null);
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  const flushPendingSave = (silent = true) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const pending = pendingDraftRef.current;
    if (!pending) return;
    pendingDraftRef.current = null;
    onSaveRef.current(pending, silent);
  };

  useEffect(() => {
    return () => {
      flushPendingSave(true);
    };
  }, []);

  const handlePatch = (patch: Partial<Lesson>) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    pendingDraftRef.current = next;
    onDirtyChange("saving");
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      pendingDraftRef.current = null;
      onSaveRef.current(next, true);
    }, 300);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    pendingDraftRef.current = null;
    onSave(draft, false);
  };

  if (draft.kind === "quiz") {
    return (
      <section
        className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
        data-testid="teacher-quiz-slot"
      >
        <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
          {content.quizSlotHeading}
        </h3>
        <p className="text-base font-bold text-[var(--sn-primary)]">
          {quiz
            ? pickLocalized(quiz.title, lang)
            : pickLocalized(draft.title, lang)}
        </p>
        <p className="text-sm text-[var(--sn-text-secondary)]">
          {quiz?.questionIds.length ?? 0} {content.questionsWord}
        </p>
        <div className="flex flex-wrap gap-3">
          {quiz && onOpenQuizEditor ? (
            <button
              type="button"
              onClick={() => onOpenQuizEditor(quiz.id)}
              className="min-h-12 rounded-xl bg-[var(--sn-primary)] px-4 text-sm font-bold text-white"
            >
              {content.editQuestions}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onRemove(draft.id)}
            className="inline-flex min-h-12 items-center gap-1.5 rounded-xl border border-[var(--sn-border)] px-4 text-sm font-bold text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span>{copy.removeLectureBtn}</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          flushPendingSave(true);
        }
      }}
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 pb-20 sm:pb-5"
      data-testid="teacher-lesson-editor"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--sn-border)] pb-3">
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ["basics", extra.tabBasics],
              ["video", extra.tabVideo],
              ["notes", extra.tabNotes],
              ["files", extra.tabFiles],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`min-h-11 rounded-xl px-3.5 text-sm font-bold ${
                activeTab === id
                  ? "bg-[var(--sn-primary)] text-white"
                  : "border border-[var(--sn-border)] text-[var(--sn-text-secondary)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex rounded-xl border border-[var(--sn-border)] p-0.5">
          {(["si", "ta", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setEditLang(code)}
              className={`min-h-10 rounded-lg px-2.5 text-xs font-bold uppercase ${
                editLang === code
                  ? "bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                  : "text-[var(--sn-text-muted)]"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <LessonEditorTabs
        lang={lang}
        editLang={editLang}
        activeTab={activeTab}
        draft={draft}
        copy={copy}
        content={content}
        onPatch={handlePatch}
      />

      <div className="sticky bottom-16 z-20 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-cream)] p-3 sm:static sm:border-0 sm:bg-transparent sm:p-0">
        <button
          type="submit"
          data-testid="teacher-lesson-save"
          className="min-h-12 rounded-xl bg-[var(--sn-primary)] px-5 text-sm font-bold text-white"
        >
          {copy.saveCourseInfoBtn}
        </button>
        <button
          type="button"
          onClick={() => onRemove(draft.id)}
          className="inline-flex min-h-12 items-center gap-1.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 text-sm font-bold text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          <span>{copy.removeLectureBtn}</span>
        </button>
      </div>
    </form>
  );
}
