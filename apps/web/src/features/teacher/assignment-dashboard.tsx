import type { AppLanguage } from "@/lib/language";
import type { AssignCopy } from "./assignment-copy";

interface AssignmentDashboardProps {
  lang: AppLanguage;
  t: AssignCopy;
  publishedCount: number;
  pendingCount: number;
  gradedCount: number;
  avgScore: number;
  totalSubmissions: number;
  statusFilter: "all" | "pending" | "graded";
  onFilterChange: (next: "all" | "pending" | "graded") => void;
}

export function AssignmentDashboard({
  lang,
  t,
  publishedCount,
  pendingCount,
  gradedCount,
  avgScore,
  totalSubmissions,
  statusFilter,
  onFilterChange,
}: AssignmentDashboardProps) {
  return (
    <>
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
          <p className="text-xs font-bold text-[var(--sn-text-muted)]">
            {t.tabPublished}
          </p>
          <p className="mt-1 text-2xl font-black text-[var(--sn-primary)]">
            {publishedCount}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
          <p className="text-xs font-bold text-amber-900">{t.needsReview}</p>
          <p className="mt-1 text-2xl font-black text-amber-950">
            {pendingCount}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
          <p className="text-xs font-bold text-emerald-900">{t.graded}</p>
          <p className="mt-1 text-2xl font-black text-emerald-950">
            {gradedCount}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
          <p className="text-xs font-bold text-[var(--sn-text-muted)]">
            {lang === "si"
              ? "සාමාන්‍ය ලකුණු"
              : lang === "ta"
                ? "சராசரி மதிப்பெண்"
                : "Average score"}
          </p>
          <p className="mt-1 text-2xl font-black text-[var(--sn-text-main)]">
            {gradedCount > 0 ? avgScore : "—"}
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", `${totalSubmissions}`],
            ["pending", `${t.needsReview} (${pendingCount})`],
            ["graded", `${t.graded} (${gradedCount})`],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => onFilterChange(id)}
            className={`min-h-10 rounded-full px-4 text-xs font-bold ${
              statusFilter === id
                ? "bg-[var(--sn-primary)] text-white"
                : "border border-[var(--sn-border)] bg-[var(--sn-surface)] text-[var(--sn-text-main)]"
            }`}
          >
            {id === "all"
              ? lang === "si"
                ? `සියල්ල (${label})`
                : lang === "ta"
                  ? `அனைத்தும் (${label})`
                  : `All (${label})`
              : label}
          </button>
        ))}
      </div>
    </>
  );
}
