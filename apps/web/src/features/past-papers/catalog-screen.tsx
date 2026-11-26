import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark, Clock, FileCheck2, Filter, PlayCircle } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { usePrototypeState } from "@/lib/prototype-state";
import { PAST_PAPERS } from "./mock-data";

const YEARS = ["all", "2025", "2024", "2023", "2022", "2021", "2019", "2016"];
const SUBJECTS = ["all", "Science", "Mathematics", "ICT", "History", "English"];

export function PastPapersCatalogScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, toggleBookmark } = usePrototypeState();
  const { toast, showToast } = useToastMessage();

  const [subject, setSubject] = useState("all");
  const [year, setYear] = useState("all");
  const [medium, setMedium] = useState("all");
  const [paperType, setPaperType] = useState("all");

  const filtered = useMemo(
    () =>
      PAST_PAPERS.filter((paper) => {
        if (subject !== "all" && paper.subject !== subject) return false;
        if (year !== "all" && String(paper.year) !== year) return false;
        if (medium !== "all" && paper.medium !== medium) return false;
        if (paperType !== "all" && paper.paperType !== paperType) return false;
        return true;
      }),
    [medium, paperType, subject, year],
  );

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Past Papers & Marking Schemes"
      roleOverride="student"
      toastMessage={toast}
    >
      <section className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
              <FileCheck2 className="h-3.5 w-3.5" />
              <span>Official G.C.E. O/L & Grade 6–11 Archive (2016–2025)</span>
            </span>
            <h2 className="mt-2 text-xl font-extrabold text-[var(--sn-text-main)]">
              Practice Real Exam Papers with Auto-Grading
            </h2>
          </div>
          <Link
            to="/term-tests"
            className="rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-3.5 py-2 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-sage)]"
          >
            Browse Provincial Term Tests →
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block text-xs font-bold text-[var(--sn-text-secondary)]">
            <span className="mb-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Subject
            </span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-xs font-semibold text-[var(--sn-text-main)]"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All Subjects" : s}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-bold text-[var(--sn-text-secondary)]">
            <span className="mb-1 block">Year (2016–2025)</span>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-xs font-semibold text-[var(--sn-text-main)]"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y === "all" ? "All Years" : y}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-bold text-[var(--sn-text-secondary)]">
            <span className="mb-1 block">Medium</span>
            <select
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-xs font-semibold text-[var(--sn-text-main)]"
            >
              <option value="all">All Mediums</option>
              <option value="si">Sinhala Medium (සිංහල)</option>
              <option value="ta">Tamil Medium (தமிழ்)</option>
              <option value="en">English Medium</option>
            </select>
          </label>

          <label className="block text-xs font-bold text-[var(--sn-text-secondary)]">
            <span className="mb-1 block">Paper Type</span>
            <select
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
              className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-xs font-semibold text-[var(--sn-text-main)]"
            >
              <option value="all">All Types</option>
              <option value="Part I MCQ">Part I MCQ</option>
              <option value="Part II Structured & Essay">
                Part II Structured & Essay
              </option>
            </select>
          </label>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center">
          <p className="text-sm font-bold text-[var(--sn-text-main)]">
            No past papers matched those filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubject("all");
              setYear("all");
              setMedium("all");
              setPaperType("all");
            }}
            className="mt-3 rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((paper) => {
            const bookmarked = state.bookmarkedIds.includes(paper.id);
            return (
              <article
                key={paper.id}
                className="flex flex-col justify-between rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--sn-primary)]">
                        {paper.subject}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                        {paper.year}
                      </span>
                      <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                        {paper.paperType}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        toggleBookmark(paper.id);
                        showToast(
                          bookmarked
                            ? "Removed from Saved bookmarks"
                            : "Paper saved to Revision Bookmarks",
                        );
                      }}
                      aria-label={`Bookmark ${paper.title}`}
                      className={`rounded-xl p-2 ${
                        bookmarked
                          ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>

                  <h3 className="mt-3 text-base font-extrabold text-[var(--sn-text-main)]">
                    {paper.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-3 text-xs text-[var(--sn-text-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {paper.durationMinutes} mins
                    </span>
                    <span>•</span>
                    <span>Grade {paper.grade}</span>
                    <span>•</span>
                    <span>{paper.totalMarks} marks</span>
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <span className="text-xs font-semibold uppercase text-[var(--sn-text-secondary)]">
                    {paper.medium === "si"
                      ? "Sinhala Medium"
                      : paper.medium === "ta"
                        ? "Tamil Medium"
                        : "English Medium"}
                  </span>
                  <Link
                    to="/past-papers/$paperId"
                    params={{ paperId: paper.id }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white hover:bg-[var(--sn-primary-hover)]"
                  >
                    <PlayCircle className="h-4 w-4" />
                    <span>Open Paper Viewer</span>
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
