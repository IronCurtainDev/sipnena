import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, Pause, Play, RotateCcw } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { usePrototypeState } from "@/lib/prototype-state";
import { McqAnswerSheet } from "./mcq-sheet";
import { PAST_PAPERS, type PastPaperItem } from "./mock-data";
import { PartTwoSection } from "./part-two-section";

function formatClock(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function PastPaperViewerBody({ paper }: { paper: PastPaperItem }) {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, toggleBookmark } = usePrototypeState();
  const { toast, showToast } = useToastMessage();

  const [mode, setMode] = useState<"exam" | "practice">("exam");
  const [secondsLeft, setSecondsLeft] = useState(paper.durationMinutes * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [graded, setGraded] = useState(false);
  const [openSchemes, setOpenSchemes] = useState<Record<string, boolean>>({});
  const [showAllSchemes, setShowAllSchemes] = useState(false);

  useEffect(() => {
    if (mode !== "exam" || !timerRunning) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [mode, timerRunning]);

  const toggleAllSchemes = () => {
    const next = !showAllSchemes;
    setShowAllSchemes(next);
    const updated: Record<string, boolean> = {};
    paper.partTwo.forEach((q) => {
      updated[q.id] = next;
    });
    setOpenSchemes(updated);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={paper.title}
      roleOverride="student"
      toastMessage={toast}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/past-papers"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--sn-primary)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Past Papers</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-2 shadow-xs">
          <div className="inline-flex rounded-xl bg-[var(--sn-surface-muted)] p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setMode("exam")}
              className={`rounded-lg px-3 py-1.5 ${
                mode === "exam"
                  ? "bg-[var(--sn-primary)] text-white"
                  : "text-[var(--sn-text-secondary)]"
              }`}
            >
              Exam Mode
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("practice");
                setTimerRunning(false);
              }}
              className={`rounded-lg px-3 py-1.5 ${
                mode === "practice"
                  ? "bg-[var(--sn-primary)] text-white"
                  : "text-[var(--sn-text-secondary)]"
              }`}
            >
              Practice Mode
            </button>
          </div>

          {mode === "exam" ? (
            <div className="flex items-center gap-1.5 pl-1">
              <Clock className="h-4 w-4 text-[var(--sn-primary)]" />
              <span className="font-mono text-sm font-extrabold text-[var(--sn-text-main)]">
                {formatClock(secondsLeft)}
              </span>
              <button
                type="button"
                onClick={() => setTimerRunning((v) => !v)}
                aria-label={timerRunning ? "Pause timer" : "Start timer"}
                className="rounded-lg bg-[var(--sn-olive)] p-1.5 text-[var(--sn-primary)]"
              >
                {timerRunning ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  setSecondsLeft(paper.durationMinutes * 60);
                }}
                aria-label="Reset timer"
                className="rounded-lg bg-slate-100 p-1.5 text-slate-600"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <span className="px-2 text-xs font-semibold text-emerald-700">
              Untimed Practice
            </span>
          )}
        </div>
      </div>

      <McqAnswerSheet
        mcqs={paper.mcqs}
        answers={answers}
        graded={graded}
        bookmarkedIds={state.bookmarkedIds}
        onSelectAnswer={(qId, idx) =>
          setAnswers((prev) => ({ ...prev, [qId]: idx }))
        }
        onToggleBookmark={(qId) => {
          const saved = state.bookmarkedIds.includes(qId);
          toggleBookmark(qId);
          showToast(
            saved
              ? "Question removed from Saved"
              : "Tricky question saved for revision!",
          );
        }}
        onGrade={() => {
          setGraded(true);
          showToast("MCQ sheet auto-graded!");
        }}
        onReset={() => {
          setAnswers({});
          setGraded(false);
        }}
      />

      <PartTwoSection
        questions={paper.partTwo}
        openSchemes={openSchemes}
        showAllSchemes={showAllSchemes}
        onToggleOne={(id) =>
          setOpenSchemes((prev) => ({ ...prev, [id]: !prev[id] }))
        }
        onToggleAll={toggleAllSchemes}
      />
    </SipNenaPortalShell>
  );
}

export function PastPaperViewerScreen() {
  const { paperId } = useParams({ strict: false });
  const paper = PAST_PAPERS.find((p) => p.id === paperId) ?? PAST_PAPERS[0]!;
  return <PastPaperViewerBody key={paper.id} paper={paper} />;
}
