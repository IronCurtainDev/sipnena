import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  Play,
  School,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { LEADING_SCHOOLS, PROVINCES, TERM_TEST_PACKS } from "./mock-data";

const TERMS: Array<"Term 1" | "Term 2" | "Term 3"> = [
  "Term 1",
  "Term 2",
  "Term 3",
];

export function TermTestsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const [activeTerm, setActiveTerm] = useState<"Term 1" | "Term 2" | "Term 3">(
    "Term 2",
  );
  const [province, setProvince] = useState("All Provinces");
  const [school, setSchool] = useState("All Schools");
  const [completedIds, setCompletedIds] = useState<string[]>(() =>
    TERM_TEST_PACKS.filter((p) => p.completed).map((p) => p.id),
  );

  const filtered = useMemo(
    () =>
      TERM_TEST_PACKS.filter((p) => {
        if (p.term !== activeTerm) return false;
        if (province !== "All Provinces" && p.province !== province)
          return false;
        if (school !== "All Schools" && p.school !== school) return false;
        return true;
      }),
    [activeTerm, province, school],
  );

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Term Test Packs & Model Papers"
      roleOverride="student"
      toastMessage={toast}
    >
      <section className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-[var(--sn-text-main)]">
              Provincial & Leading School Term Test Packs
            </h2>
            <p className="mt-0.5 text-xs text-[var(--sn-text-secondary)]">
              Compare Western, Southern, Central, and national school papers
              across Terms 1–3.
            </p>
          </div>
          <div className="inline-flex rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-1">
            {TERMS.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setActiveTerm(term)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTerm === term
                    ? "bg-[var(--sn-primary)] text-white shadow-xs"
                    : "text-[var(--sn-text-secondary)] hover:text-[var(--sn-text-main)]"
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-xs font-bold text-[var(--sn-text-secondary)]">
            <span className="mb-1 block">Filter by Province</span>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full rounded-xl border border-[var(--sn-border)] bg-white px-3 py-2.5 text-xs font-semibold text-[var(--sn-text-main)]"
            >
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-bold text-[var(--sn-text-secondary)]">
            <span className="mb-1 block">Filter by Leading School</span>
            <select
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full rounded-xl border border-[var(--sn-border)] bg-white px-3 py-2.5 text-xs font-semibold text-[var(--sn-text-main)]"
            >
              {LEADING_SCHOOLS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center">
          <p className="text-sm font-bold text-[var(--sn-text-main)]">
            No {activeTerm} papers match this province/school combination.
          </p>
          <button
            type="button"
            onClick={() => {
              setProvince("All Provinces");
              setSchool("All Schools");
            }}
            className="mt-3 rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white"
          >
            Show All {activeTerm} Packs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((pack) => {
            const done = completedIds.includes(pack.id);
            const difficultyCls =
              pack.difficulty === "Challenging"
                ? "bg-rose-50 text-rose-700"
                : pack.difficulty === "Standard"
                  ? "bg-amber-50 text-amber-800"
                  : "bg-emerald-50 text-emerald-700";

            return (
              <article
                key={pack.id}
                className="flex flex-col justify-between rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--sn-primary)]">
                      Grade {pack.grade} • {pack.subject}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${difficultyCls}`}
                      >
                        {pack.difficulty}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleCompleted(pack.id)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          done
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        <span>{done ? "Completed" : "Mark Done"}</span>
                      </button>
                    </div>
                  </div>

                  <h3 className="mt-3 text-base font-extrabold text-[var(--sn-text-main)]">
                    {pack.title}
                  </h3>

                  <div className="mt-2 space-y-1 text-xs text-[var(--sn-text-muted)]">
                    <p className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-[var(--sn-primary)]" />
                      <span>{pack.province}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <School className="h-3.5 w-3.5 text-[var(--sn-primary)]" />
                      <span>{pack.school}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Duration: {pack.duration}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      showToast(`Downloading ${pack.title} PDF...`)
                    }
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] py-2.5 text-xs font-bold text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)]"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </button>
                  <Link
                    to="/past-papers/$paperId"
                    params={{ paperId: pack.paperLinkId }}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] py-2.5 text-xs font-bold text-white hover:bg-[var(--sn-primary-hover)]"
                  >
                    <Play className="h-4 w-4" />
                    <span>Attempt Now</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </SipNenaPortalShell>
  );
}
