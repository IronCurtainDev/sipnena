import { BarChart3, X } from "lucide-react";
import {
  getQuizWithQuestions,
  isQuizAttemptPassed,
  pickLocalized,
  useCoursesStore,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";

interface QuizAnalyticsPanelProps {
  lang: AppLanguage;
  quizId: string;
  onClose: () => void;
}

const COPY: Record<
  AppLanguage,
  {
    title: string;
    attempts: string;
    avgScore: string;
    passRate: string;
    hardestFirst: string;
    noAttempts: string;
    correctPct: string;
  }
> = {
  en: {
    title: "Quiz Analytics",
    attempts: "Attempts",
    avgScore: "Avg score",
    passRate: "Pass rate",
    hardestFirst: "Questions sorted by difficulty (lowest % correct first)",
    noAttempts: "No student attempts recorded yet for this quiz.",
    correctPct: "% correct",
  },
  si: {
    title: "ප්‍රශ්නාවලි විශ්ලේෂණය",
    attempts: "උත්සාහයන්",
    avgScore: "සාමාන්‍ය ලකුණු",
    passRate: "සමත් ප්‍රතිශතය",
    hardestFirst: "අඩුම නිවැරදි ප්‍රතිශතය ඇති ප්‍රශ්න ඉහළින්",
    noAttempts: "මෙම ප්‍රශ්නාවලිය සඳහා තවම සිසු උත්සාහයන් නැත.",
    correctPct: "% නිවැරදි",
  },
  ta: {
    title: "வினாடி பகுப்பாய்வு",
    attempts: "முயற்சிகள்",
    avgScore: "சராசரி மதிப்பெண்",
    passRate: "தேர்ச்சி விகிதம்",
    hardestFirst: "குறைந்த சரியான விடை கொண்ட கேள்விகள் முதலில்",
    noAttempts: "இந்த வினாடிக்கு இன்னும் மாணவர் முயற்சிகள் இல்லை.",
    correctPct: "% சரி",
  },
};

export function QuizAnalyticsPanel({
  lang,
  quizId,
  onClose,
}: QuizAnalyticsPanelProps) {
  const t = COPY[lang];
  const { store } = useCoursesStore();
  const { quiz, questions } = getQuizWithQuestions(store, quizId);

  if (!quiz) return null;

  const attempts = store.progress.flatMap((p) =>
    (p.quizAttempts ?? []).filter((a) => a.quizId === quizId),
  );
  const attemptsCount = attempts.length;
  const avgPct =
    attemptsCount > 0
      ? Math.round(
          (attempts.reduce(
            (acc, a) => acc + a.score / Math.max(1, a.total),
            0,
          ) /
            attemptsCount) *
            100,
        )
      : 0;
  const passRate =
    attemptsCount > 0
      ? Math.round(
          (attempts.filter((a) => isQuizAttemptPassed(a, quiz)).length /
            attemptsCount) *
            100,
        )
      : 0;

  const questionStats = questions
    .map((q, qIdx) => {
      let seen = 0;
      let correct = 0;
      for (const a of attempts) {
        const chosen = a.answers[qIdx];
        if (typeof chosen === "number") {
          seen += 1;
          if (chosen === q.correctIndex) correct += 1;
        }
      }
      const pct = seen > 0 ? Math.round((correct / seen) * 100) : 0;
      return { question: q, seen, pct };
    })
    .sort((a, b) => a.pct - b.pct);

  return (
    <section
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-sm"
      data-testid="quiz-analytics-panel"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[var(--sn-primary)]">
            <BarChart3 className="h-4 w-4" />
            <span>{t.title}</span>
          </p>
          <h3 className="mt-1 text-xl font-bold text-[var(--sn-text-main)]">
            {pickLocalized(quiz.title, lang)}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--sn-border)]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-3">
          <p className="text-xs font-bold text-[var(--sn-text-muted)]">
            {t.attempts}
          </p>
          <p className="mt-1 text-2xl font-extrabold text-[var(--sn-primary)]">
            {attemptsCount}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-3">
          <p className="text-xs font-bold text-[var(--sn-text-muted)]">
            {t.avgScore}
          </p>
          <p className="mt-1 text-2xl font-extrabold text-[var(--sn-primary)]">
            {avgPct}%
          </p>
        </div>
        <div className="rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-3">
          <p className="text-xs font-bold text-[var(--sn-text-muted)]">
            {t.passRate}
          </p>
          <p className="mt-1 text-2xl font-extrabold text-[var(--sn-primary)]">
            {passRate}%
          </p>
        </div>
      </div>

      {attemptsCount === 0 ? (
        <p className="rounded-xl border border-dashed border-[var(--sn-border)] p-4 text-sm text-[var(--sn-text-muted)]">
          {t.noAttempts}
        </p>
      ) : (
        <div className="space-y-2">
          <p className="text-sm font-bold text-[var(--sn-text-secondary)]">
            {t.hardestFirst}
          </p>
          <ul className="space-y-2">
            {questionStats.map(({ question, pct, seen }) => {
              const hard = seen > 0 && pct < 50;
              return (
                <li
                  key={question.id}
                  className={`flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between ${
                    hard
                      ? "border-amber-300 bg-amber-50/70"
                      : "border-[var(--sn-border)] bg-[var(--sn-surface)]"
                  }`}
                >
                  <span className="text-sm font-semibold text-[var(--sn-text-main)]">
                    {pickLocalized(question.prompt, lang)}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-extrabold ${
                      hard
                        ? "bg-amber-200 text-amber-950"
                        : "bg-emerald-100 text-emerald-900"
                    }`}
                  >
                    {pct}
                    {t.correctPct} ({seen})
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
