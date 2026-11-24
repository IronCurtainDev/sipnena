import { AlertCircle, Inbox, RefreshCw } from "lucide-react";
import type { CourseDetailStrings } from "./strings.types";

interface CourseStateViewsProps {
  demoState: "loading" | "error" | "empty";
  onRetry: () => void;
  t: CourseDetailStrings;
}

export function CourseStateViews({
  demoState,
  onRetry,
  t,
}: CourseStateViewsProps) {
  if (demoState === "loading") {
    return (
      <div
        aria-busy="true"
        className="grid animate-pulse grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div className="space-y-6">
          <div className="h-56 rounded-2xl border border-[var(--sn-border)] bg-white" />
          <div className="h-44 rounded-2xl border border-[var(--sn-border)] bg-white" />
          <div className="h-64 rounded-2xl border border-[var(--sn-border)] bg-white" />
        </div>
        <div className="hidden h-96 rounded-2xl border border-[var(--sn-border)] bg-white lg:block" />
      </div>
    );
  }

  if (demoState === "error") {
    return (
      <div
        role="alert"
        className="mx-auto my-8 max-w-md space-y-4 rounded-2xl border border-orange-300 bg-orange-50 p-6 text-center text-orange-900"
      >
        <AlertCircle className="mx-auto h-8 w-8" aria-hidden="true" />
        <h1 className="text-xl font-bold">{t.errorTitle}</h1>
        <p className="text-base">{t.errorDesc}</p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 font-semibold text-white transition hover:bg-[var(--sn-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <RefreshCw className="h-5 w-5" aria-hidden="true" />
          <span>{t.retryBtn}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto my-8 max-w-md space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center">
      <Inbox
        className="mx-auto h-8 w-8 text-[var(--sn-text-muted)]"
        aria-hidden="true"
      />
      <h1 className="text-xl font-bold text-[var(--sn-text-main)]">
        {t.emptyTitle}
      </h1>
      <p className="text-base text-[var(--sn-text-secondary)]">{t.emptyDesc}</p>
    </div>
  );
}
