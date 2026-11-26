interface PlaylistQuizzesTabProps {
  onSelectLesson: (id: string, isLocked?: boolean) => void;
  onToast?: (msg: string) => void;
}

const QUIZZES = [
  {
    id: "quiz-sec1",
    title: "Section 1 quiz: Plane mirrors",
    meta: "Done · 10/10",
    locked: false,
  },
  {
    id: "quiz-sec2",
    title: "Section 2 quiz: Curved mirrors",
    meta: "Ready · 10 questions",
    locked: false,
  },
  {
    id: "quiz-final",
    title: "Unit final check",
    meta: "Locked until section 2 is done",
    locked: true,
  },
] as const;

export function PlaylistQuizzesTab({
  onSelectLesson,
  onToast,
}: PlaylistQuizzesTabProps) {
  return (
    <ul className="max-h-[560px] space-y-1 overflow-y-auto pr-1">
      {QUIZZES.map((quiz) => (
        <li key={quiz.id}>
          <button
            type="button"
            onClick={() => {
              if (quiz.locked) {
                onToast?.(
                  "Finish the section 2 quiz first to unlock this check.",
                );
                return;
              }
              onSelectLesson(quiz.id);
            }}
            className={`flex min-h-[56px] w-full flex-col items-start justify-center rounded-xl px-3 py-2 text-left transition ${
              quiz.locked ? "opacity-60" : "hover:bg-[var(--sn-cream)]"
            }`}
          >
            <span className="text-sm font-bold text-[var(--sn-text-main)]">
              {quiz.title}
            </span>
            <span className="text-sm text-[var(--sn-text-muted)]">
              {quiz.meta}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
