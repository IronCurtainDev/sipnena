import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark, Clock, FileCheck2, PlayCircle } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { formatGrade, formatMedium, formatSubject } from "@/lib/i18n-common";
import { usePrototypeState } from "@/lib/prototype-state";
import { PastPapersFilters } from "./catalog-filters";
import { PAST_PAPERS } from "./mock-data";
import { PAST_PAPERS_COPY } from "./strings";

const SUBJECTS = ["All", "Science", "Mathematics", "ICT", "History", "English"];
const GRADES = [6, 7, 8, 9, 10, 11] as const;

function clampGrade(value: number): number {
  return GRADES.includes(value as (typeof GRADES)[number]) ? value : 8;
}

export function PastPapersCatalogScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, toggleBookmark } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const copy = PAST_PAPERS_COPY[lang];

  const [grade, setGrade] = useState(() => clampGrade(state.grade));
  const [subject, setSubject] = useState("All");
  const [year, setYear] = useState("all");
  const [medium, setMedium] = useState("all");
  const [paperType, setPaperType] = useState("all");
  const [moreOpen, setMoreOpen] = useState(false);

  const filtered = useMemo(
    () =>
      PAST_PAPERS.filter((paper) => {
        if (paper.grade !== grade) return false;
        if (subject !== "All" && paper.subject !== subject) return false;
        if (year !== "all" && String(paper.year) !== year) return false;
        if (medium !== "all" && paper.medium !== medium) return false;
        if (paperType !== "all" && paper.paperType !== paperType) return false;
        return true;
      }),
    [grade, medium, paperType, subject, year],
  );

  const resetFilters = () => {
    setGrade(clampGrade(state.grade));
    setSubject("All");
    setYear("all");
    setMedium("all");
    setPaperType("all");
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.pageTitle}
      roleOverride="student"
      toastMessage={toast}
    >
      <section className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
              <FileCheck2 className="h-3.5 w-3.5" />
              <span>{copy.archiveBadge}</span>
            </span>
            <h2 className="mt-2 text-xl font-extrabold text-[var(--sn-text-main)]">
              {copy.catalogTitle}
            </h2>
          </div>
          <Link
            to="/term-tests"
            className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-3.5 py-2 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-sage)]"
          >
            {copy.termTestsLink}
          </Link>
        </div>

        <PastPapersFilters
          lang={lang}
          copy={copy}
          grades={GRADES}
          grade={grade}
          onGradeChange={setGrade}
          subjects={SUBJECTS}
          subject={subject}
          onSubjectChange={setSubject}
          year={year}
          onYearChange={setYear}
          medium={medium}
          onMediumChange={setMedium}
          paperType={paperType}
          onPaperTypeChange={setPaperType}
          moreOpen={moreOpen}
          onToggleMore={() => setMoreOpen((open) => !open)}
        />
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center">
          <p className="text-sm font-bold text-[var(--sn-text-main)]">
            {copy.emptyText}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-3 min-h-11 rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white"
          >
            {copy.resetBtn}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((paper) => {
            const bookmarked = state.bookmarkedIds.includes(paper.id);
            const paperTitle = paper.localizedTitle[lang];
            const typeLabel =
              paper.paperType === "Part I MCQ"
                ? copy.part1Label
                : copy.part2Label;
            return (
              <article
                key={paper.id}
                className="flex flex-col justify-between rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-[var(--sn-primary)] px-2.5 py-0.5 text-xs font-bold text-white">
                        {formatGrade(lang, paper.grade)}
                      </span>
                      <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
                        {formatSubject(lang, paper.subject)}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                        {typeLabel}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        toggleBookmark(paper.id);
                        showToast(
                          bookmarked ? copy.removedToast : copy.savedToast,
                        );
                      }}
                      aria-label={`Bookmark ${paperTitle}`}
                      className={`min-h-11 min-w-11 rounded-xl p-2 ${
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
                    {paperTitle}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--sn-text-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {paper.durationMinutes} {copy.minsWord}
                    </span>
                    <span>
                      {paper.totalMarks} {copy.marksWord}
                    </span>
                    <span>{paper.year}</span>
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <span className="text-xs font-semibold text-[var(--sn-text-secondary)]">
                    {formatMedium(lang, paper.medium)}
                  </span>
                  <Link
                    to="/past-papers/$paperId"
                    params={{ paperId: paper.id }}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white hover:bg-[var(--sn-primary-hover)]"
                  >
                    <PlayCircle className="h-4 w-4" />
                    <span>{copy.openViewerBtn}</span>
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
