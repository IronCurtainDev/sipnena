import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import type { QuizStrings } from "./strings";

interface QuizOverviewCardProps {
  t: QuizStrings;
  onStart: () => void;
  onReviewNotes: () => void;
}

export function QuizOverviewCard({
  t,
  onStart,
  onReviewNotes,
}: QuizOverviewCardProps) {
  return (
    <div className="space-y-6">
      {/* Blue Self-Assessment Banner Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {t.checkpointBadge}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            {t.freeAccessBadge}
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {t.quizHeaderTitle}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[var(--sn-primary)]">
            {t.quizHeaderSubtitle}
          </p>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            {t.checkpointDesc}
          </p>
        </div>

        {/* Module Sub-bar */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-primary)] text-white shadow-2xs">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.moduleLabel}
            </div>
            <div className="truncate text-sm sm:text-base font-bold text-slate-900">
              {t.moduleTitle}
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Parameters Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-slate-900 sm:text-base">
            {t.paramsTitle}
          </h2>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
            {t.noPenaltyBadge}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs space-y-1">
            <div className="text-xs font-semibold text-slate-500">
              {t.questionsLabel}
            </div>
            <div className="text-lg font-black text-slate-900">
              {t.questionsValue}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {t.questionsSub}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs space-y-1">
            <div className="text-xs font-semibold text-slate-500">
              {t.estDurationLabel}
            </div>
            <div className="text-lg font-black text-slate-900">
              {t.estDurationValue}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {t.estDurationSub}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs space-y-1">
            <div className="text-xs font-semibold text-slate-500">
              {t.passMarkLabel}
            </div>
            <div className="text-lg font-black text-emerald-600">
              {t.passMarkValue}
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              {t.passMarkSub}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs space-y-1">
            <div className="text-xs font-semibold text-slate-500">
              {t.attemptsLabel}
            </div>
            <div className="text-lg font-black text-[var(--sn-primary)]">
              {t.attemptsValue}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {t.attemptsSub}
            </div>
          </div>
        </div>

        {/* Target Progress Bar */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">{t.masteryLabel}</span>
            <span className="text-[var(--sn-primary)]">
              {t.masteryTargetValue}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 flex">
            <div className="h-full bg-[var(--sn-primary)] w-[60%]" />
            <div className="h-full bg-emerald-500 w-[25%]" />
            <div className="h-full bg-slate-200 flex-1" />
          </div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{t.passThresholdLabel}</span>
            <span>{t.distinctionLabel}</span>
          </div>
        </div>
      </div>

      {/* What to expect checklist */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 sm:text-base px-1">
          {t.expectTitle}
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)] font-bold">
              1
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900">
                {t.expect1Title}
              </div>
              <div className="text-xs text-slate-600 leading-relaxed font-normal">
                {t.expect1Desc}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)] font-bold">
              2
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900">
                {t.expect2Title}
              </div>
              <div className="text-xs text-slate-600 leading-relaxed font-normal">
                {t.expect2Desc}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)] font-bold">
              3
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900">
                {t.expect3Title}
              </div>
              <div className="text-xs text-slate-600 leading-relaxed font-normal">
                {t.expect3Desc}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)] font-bold">
              4
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900">
                {t.expect4Title}
              </div>
              <div className="text-xs text-slate-600 leading-relaxed font-normal">
                {t.expect4Desc}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ready to begin Bottom Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-[var(--sn-border)] bg-gradient-to-r from-[var(--sn-olive)]/80 to-white p-6 shadow-xs">
        <div className="space-y-1">
          <div className="text-base font-bold text-slate-900">
            {t.readyPrompt}
          </div>
          <div className="text-xs text-slate-600 font-medium">{t.readySub}</div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReviewNotes}
            className="flex min-h-[46px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <BookOpen className="h-4 w-4" />
            <span>{t.reviewNotesBtn}</span>
          </button>

          <button
            type="button"
            onClick={onStart}
            className="flex min-h-[46px] items-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-sm font-bold text-white shadow-md hover:bg-[var(--sn-primary-hover)] transition active:scale-[0.99]"
          >
            <span>{t.startQuizBtn}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
