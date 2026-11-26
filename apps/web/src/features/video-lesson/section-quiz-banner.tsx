import { ArrowRight } from "lucide-react";

interface SectionQuizBannerProps {
  eyebrow: string;
  quizTitle: string;
  detail: string;
  ctaLabel: string;
  onTakeQuiz: () => void;
}

export function SectionQuizBanner({
  eyebrow,
  quizTitle,
  detail,
  ctaLabel,
  onTakeQuiz,
}: SectionQuizBannerProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold leading-snug text-[var(--sn-primary)]">
          {eyebrow}
        </p>
        <p className="text-base font-bold leading-snug text-[var(--sn-text-main)]">
          {quizTitle}
        </p>
        <p className="text-sm leading-relaxed text-[var(--sn-text-secondary)]">
          {detail}
        </p>
      </div>

      <button
        type="button"
        onClick={onTakeQuiz}
        className="flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-5 text-sm font-bold leading-snug text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
      >
        <span>{ctaLabel}</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </button>
    </div>
  );
}
