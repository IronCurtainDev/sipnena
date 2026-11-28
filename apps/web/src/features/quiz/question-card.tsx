import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight, HelpCircle, Lightbulb, X } from "lucide-react";
import { QuizRayDiagram } from "./ray-diagram";
import type { QuizStrings } from "./strings";
import type { QuizQuestion } from "./types";

interface QuestionCardProps {
  t: QuizStrings;
  question: QuizQuestion;
  selectedOption: string | null;
  onSelectOption: (id: string) => void;
  isChecked: boolean;
  onCheck: () => void;
  onNext: () => void;
}

export function QuestionCard({
  t,
  question,
  selectedOption,
  onSelectOption,
  isChecked,
  onCheck,
  onNext,
}: QuestionCardProps) {
  const navigate = useNavigate();
  const correctOption = question.options.find((o) => o.isCorrect)?.id;
  const isCorrect = selectedOption === correctOption;

  return (
    <div className="space-y-6">
      {/* Question Header & Title */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-lg bg-[var(--sn-olive)] px-2.5 py-1 text-xs font-bold text-[var(--sn-primary)]">
            {t.gradeQuizBadge}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            <HelpCircle className="h-3.5 w-3.5" />
            {t.markLabel}
          </span>
        </div>

        <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
          {question.title}
        </h2>

        {question.showDiagram === false ? null : (
          <QuizRayDiagram
            t={t}
            incidentAngle={question.incidentAngle}
            showLawBadge={question.showLawBadge}
            highlightCorrect={isChecked && isCorrect}
          />
        )}
      </div>

      {/* Options Prompt */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          {question.showDiagram === false ? null : (
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 sm:text-sm">
              {t.chooseAnglePrompt}
            </p>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isOptionCorrect = option.id === correctOption;

            let containerStyle =
              "border-slate-200 bg-white hover:border-[var(--sn-border-selected)] hover:bg-[var(--sn-olive)]/30 text-slate-900";
            let badgeStyle = "bg-slate-100 text-slate-700";

            if (isChecked) {
              if (isOptionCorrect) {
                containerStyle =
                  "border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-500";
                badgeStyle = "bg-emerald-600 text-white";
              } else if (isSelected && !isCorrect) {
                containerStyle =
                  "border-amber-500 bg-amber-50/70 text-amber-950 ring-1 ring-amber-500";
                badgeStyle = "bg-amber-600 text-white";
              } else {
                containerStyle =
                  "border-slate-200 bg-white text-slate-400 opacity-60";
                badgeStyle = "bg-slate-100 text-slate-400";
              }
            } else if (isSelected) {
              containerStyle =
                "border-[var(--sn-primary)] bg-[var(--sn-olive)]/70 text-[var(--sn-text-main)] ring-2 ring-[var(--sn-primary)]";
              badgeStyle = "bg-[var(--sn-primary)] text-white";
            }

            return (
              <button
                key={option.id}
                type="button"
                disabled={isChecked}
                onClick={() => onSelectOption(option.id)}
                className={`flex min-h-[58px] w-full items-center justify-between rounded-2xl border p-4 text-left transition ${containerStyle}`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition ${badgeStyle}`}
                  >
                    {isChecked && isOptionCorrect ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : isChecked && isSelected && !isCorrect ? (
                      <X className="h-4 w-4 stroke-[3]" />
                    ) : (
                      option.id
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm sm:text-base">
                      {option.text}
                    </div>
                    {option.subtext && (
                      <div className="truncate text-xs opacity-80 font-medium">
                        {option.subtext}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Status Badge */}
                <div className="ml-2 shrink-0">
                  {isChecked && isOptionCorrect && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white shadow-2xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                      {t.correctAnswerLabel}
                    </span>
                  )}
                  {isChecked && isSelected && !isCorrect && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/90 px-3 py-1 text-xs font-bold text-amber-900">
                      {t.yourAnswerLabel}
                    </span>
                  )}
                  {!isChecked && (
                    <div
                      className={`h-5 w-5 rounded-full border-2 transition ${
                        isSelected
                          ? "border-[var(--sn-primary)] bg-[var(--sn-primary)]"
                          : "border-slate-300 bg-transparent"
                      }`}
                    >
                      {isSelected && (
                        <div className="flex h-full w-full items-center justify-center text-white">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation Box when Checked */}
      {isChecked && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm sm:text-base">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Lightbulb className="h-4 w-4" />
              </div>
              <span>{t.explanationTitle}</span>
            </div>
            {question.explanation.formula && (
              <span className="rounded-md bg-white border border-emerald-200 px-2 py-0.5 font-mono text-xs font-bold text-emerald-800 shadow-2xs">
                {question.explanation.formula}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-emerald-950 font-normal">
            {question.explanation.body}
          </p>

          {question.showDiagram === false ? null : (
            <button
              type="button"
              onClick={() => void navigate({ to: "/lesson" })}
              className="flex w-full items-center justify-between border-t border-emerald-200/70 pt-3 text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
            >
              <span>{t.reviewTextbookLabel}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        {!isChecked ? (
          <button
            type="button"
            disabled={!selectedOption}
            onClick={onCheck}
            className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-6 font-bold text-white shadow-md transition hover:bg-[var(--sn-primary-hover)] disabled:opacity-40 disabled:pointer-events-none active:scale-[0.99]"
          >
            <span>{t.checkAnswerBtn}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-6 font-bold text-white shadow-md transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
          >
            <span>{t.nextQuestionBtn}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
        <p className="text-center text-xs text-slate-500 font-medium">
          {!isChecked ? t.tapCheckNotice : t.keepGoingNotice}
        </p>
      </div>
    </div>
  );
}
