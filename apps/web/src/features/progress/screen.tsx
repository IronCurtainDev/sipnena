import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  History,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { ProgressBar } from "@/features/portal-shell/progress-bar";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import {
  MISTAKE_BANK_ITEMS,
  QUIZ_HISTORY_ITEMS,
  SUBJECT_PROGRESS,
} from "./mock-data";

export function ProgressAndMistakesScreen({
  defaultTab = "overview",
}: {
  defaultTab?: "overview" | "history" | "mistakes";
}) {
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const [tab, setTab] = useState<"overview" | "history" | "mistakes">(
    defaultTab,
  );
  const [retryMode, setRetryMode] = useState(false);
  const [retryAnswers, setRetryAnswers] = useState<Record<string, number>>({});
  const [retrySubmitted, setRetrySubmitted] = useState(false);

  const retryCorrect = MISTAKE_BANK_ITEMS.filter(
    (q) => retryAnswers[q.id] === q.correctIndex,
  ).length;

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Progress Analytics & Mistake Bank"
      roleOverride="student"
      toastMessage={toast}
    >
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: "overview", label: "Syllabus Completion", icon: BarChart3 },
            { id: "history", label: "Quiz History", icon: History },
            { id: "mistakes", label: "Mistake Bank (3)", icon: AlertTriangle },
          ] as const
        ).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
                tab === item.id
                  ? "bg-[var(--sn-primary)] text-white"
                  : "border border-[var(--sn-border)] bg-white text-[var(--sn-text-secondary)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {tab === "overview" && (
        <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-[var(--sn-text-main)]">
            Subject-by-Subject Syllabus Completion
          </h2>
          <div className="space-y-4">
            {SUBJECT_PROGRESS.map((item) => (
              <div key={item.subject} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[var(--sn-text-main)]">
                    {item.subject} ({item.completedUnits}/{item.totalUnits}{" "}
                    units)
                  </span>
                  <span className="text-[var(--sn-primary)]">{item.pct}%</span>
                </div>
                <ProgressBar value={item.pct} label={item.subject} />
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "history" && (
        <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-[var(--sn-text-main)]">
            <TrendingUp className="h-5 w-5 text-[var(--sn-primary)]" />
            <span>Quiz History &amp; Score Trends</span>
          </h2>
          <div className="divide-y divide-slate-100">
            {QUIZ_HISTORY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3.5"
              >
                <div>
                  <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--sn-primary)]">
                    {item.subject} • {item.date}
                  </span>
                  <p className="mt-1 text-sm font-extrabold text-[var(--sn-text-main)]">
                    {item.title}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-700">
                    {item.trend}
                  </span>
                  <span className="rounded-xl bg-[var(--sn-surface-selected)] px-3 py-1.5 text-xs font-black text-[var(--sn-primary)]">
                    {item.score} ({item.pct}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "mistakes" && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-amber-200 bg-amber-50/70 p-5">
            <div>
              <h2 className="text-lg font-extrabold text-amber-950">
                Mistake Bank — Review &amp; Clear Wrong Questions
              </h2>
              <p className="text-xs text-amber-900">
                Questions you missed in previous quizzes are saved here until
                you master them.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setRetryMode(true);
                setRetryAnswers({});
                setRetrySubmitted(false);
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-5 py-2.5 text-xs font-bold text-white"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Wrong Questions</span>
            </button>
          </div>

          <div className="space-y-3">
            {MISTAKE_BANK_ITEMS.map((q) => {
              const chosen = retryAnswers[q.id];
              return (
                <article
                  key={q.id}
                  className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs"
                >
                  <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--sn-primary)]">
                    {q.subject} • {q.source}
                  </span>
                  <h3 className="mt-2 text-sm font-extrabold text-[var(--sn-text-main)]">
                    {q.prompt}
                  </h3>

                  {retryMode ? (
                    <div className="mt-3 space-y-2">
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {q.options.map((opt, idx) => {
                          const selected = chosen === idx;
                          const isRight =
                            retrySubmitted && idx === q.correctIndex;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                !retrySubmitted &&
                                setRetryAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: idx,
                                }))
                              }
                              className={`rounded-xl border px-3 py-2 text-left text-xs font-bold ${
                                isRight
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                                  : selected
                                    ? "border-2 border-[var(--sn-primary)] bg-[var(--sn-surface-selected)]"
                                    : "border-slate-200 bg-white"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {retrySubmitted && (
                        <p className="rounded-xl bg-emerald-50 p-2.5 text-xs text-emerald-900">
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-3 space-y-1.5 text-xs">
                      <p className="text-rose-700 font-semibold">
                        Previous answer: {q.yourWrongAnswer}
                      </p>
                      <p className="flex items-center gap-1 font-bold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Correct: {q.options[q.correctIndex]}</span>
                      </p>
                      <p className="text-[var(--sn-text-secondary)]">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {retryMode && (
            <div className="flex items-center justify-between rounded-2xl border border-[var(--sn-border)] bg-white p-4">
              {retrySubmitted ? (
                <p className="text-sm font-extrabold text-emerald-800">
                  Retry Score: {retryCorrect} / {MISTAKE_BANK_ITEMS.length}
                </p>
              ) : (
                <p className="text-xs text-[var(--sn-text-muted)]">
                  Select an option for each question above.
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  setRetrySubmitted(true);
                  showToast("Mistake Bank retry graded!");
                }}
                className="rounded-xl bg-[var(--sn-primary)] px-5 py-2.5 text-xs font-bold text-white"
              >
                Check Retry Answers
              </button>
            </div>
          )}
        </section>
      )}
    </SipNenaPortalShell>
  );
}
