import { AlertCircle, Inbox, RefreshCw } from "lucide-react";
import type { CourseStrings } from "./strings.types";

interface CourseStateViewsProps {
  demoState: "loading" | "empty" | "error";
  onRetry: () => void;
  t: CourseStrings;
}

export function CourseStateViews({
  demoState,
  onRetry,
  t,
}: CourseStateViewsProps) {
  if (demoState === "loading") {
    return (
      <div aria-busy="true" className="space-y-6 animate-pulse">
        <div className="h-32 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)]" />
        <div className="h-14 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)]" />
      </div>
    );
  }

  if (demoState === "error") {
    return (
      <div
        role="alert"
        className="mx-auto my-8 max-w-md space-y-4 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center"
      >
        <AlertCircle
          className="mx-auto h-8 w-8 text-orange-600"
          aria-hidden="true"
        />
        <h2 className="text-xl font-bold text-orange-900">
          {t.errorStateTitle}
        </h2>
        <p className="text-base text-orange-800">{t.errorStateDesc}</p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 font-semibold text-white transition hover:bg-[var(--sn-primary-hover)]"
        >
          <RefreshCw className="h-5 w-5" aria-hidden="true" />
          <span>{t.retryBtn}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto my-8 max-w-md space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center">
      <Inbox className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
      <h2 className="text-xl font-bold text-[var(--sn-text-main)]">
        {t.emptyStateTitle}
      </h2>
      <p className="text-base text-[var(--sn-text-secondary)]">
        {t.emptyStateDesc}
      </p>
    </div>
  );
}
