import { BarChart3, CheckCircle2, ClipboardList, Pencil } from "lucide-react";
import {
  pickLocalized,
  type Course,
  type Quiz,
  type Unit,
} from "@/data/courses";
import { formatGrade, formatSubject } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";

export function QuizLibraryCard({
  lang,
  quiz,
  course,
  unit,
  attemptsCount,
  questionsWord,
  editLabel,
  analyticsLabel,
  publishedLabel,
  draftLabel,
  unassignedLabel,
  onEdit,
  onAnalytics,
}: {
  lang: AppLanguage;
  quiz: Quiz;
  course: Course | undefined;
  unit: Unit | undefined;
  attemptsCount: number;
  questionsWord: string;
  editLabel: string;
  analyticsLabel: string;
  publishedLabel: string;
  draftLabel: string;
  unassignedLabel: string;
  onEdit: () => void;
  onAnalytics: () => void;
}) {
  return (
    <article className="flex flex-col justify-between gap-4 rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
            <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              {formatGrade(lang, quiz.grade ?? 8)} ·{" "}
              {formatSubject(lang, quiz.subject ?? "Science")}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              {quiz.status === "published" ? publishedLabel : draftLabel}
            </span>
          </span>
        </div>
        <h3 className="text-lg font-extrabold text-[var(--sn-text-main)]">
          {pickLocalized(quiz.title, lang)}
        </h3>
        <p className="text-sm text-[var(--sn-text-secondary)]">
          {quiz.questionIds.length} {questionsWord} · {attemptsCount} attempts ·{" "}
          {course
            ? `${pickLocalized(course.title, lang)}${
                unit ? ` · ${pickLocalized(unit.title, lang)}` : ""
              }`
            : unassignedLabel}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--sn-border)] px-3.5 text-sm font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{editLabel}</span>
        </button>
        <button
          type="button"
          onClick={onAnalytics}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--sn-border)] px-3.5 text-sm font-bold text-[var(--sn-text-main)] hover:bg-[var(--sn-surface-muted)]"
        >
          <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{analyticsLabel}</span>
        </button>
      </div>
    </article>
  );
}
