import { Link } from "@tanstack/react-router";
import { Bookmark, BookOpen, FileCheck2, FileText, Trash2 } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { usePrototypeState } from "@/lib/prototype-state";

interface SavedCatalogItem {
  id: string;
  subject: string;
  type: "Lesson" | "Past Paper Question" | "Short Note";
  title: string;
  to: string;
}

const BOOKMARKABLE_CATALOG: SavedCatalogItem[] = [
  {
    id: "les-light-4",
    subject: "Science",
    type: "Lesson",
    title: "Lesson 4: Mirrors & Image Formation (Unit 7)",
    to: "/lesson",
  },
  {
    id: "note-light-short",
    subject: "Science",
    type: "Short Note",
    title: "O/L Science — Electricity & Ohm's Law One-Page Note",
    to: "/notes",
  },
  {
    id: "pp-2023-sci-mcq-12",
    subject: "Science",
    type: "Past Paper Question",
    title: "2024 O/L Science MCQ #1 — Concave vs Convex Lens Image",
    to: "/past-papers",
  },
  {
    id: "note-algebra-formula",
    subject: "Mathematics",
    type: "Short Note",
    title: "G.C.E. O/L Mathematics Master Formula Sheet (All 3 Terms)",
    to: "/notes",
  },
  {
    id: "ol-2024-science-p1",
    subject: "Science",
    type: "Past Paper Question",
    title: "G.C.E. O/L Science — 2024 Part I Paper",
    to: "/past-papers",
  },
  {
    id: "ol-2023-maths-p2",
    subject: "Mathematics",
    type: "Past Paper Question",
    title: "G.C.E. O/L Mathematics — 2023 Part II (සිංහල)",
    to: "/past-papers",
  },
];

export function SavedBookmarksScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, toggleBookmark } = usePrototypeState();
  const { toast, showToast } = useToastMessage();

  const savedItems = BOOKMARKABLE_CATALOG.filter((item) =>
    state.bookmarkedIds.includes(item.id),
  );

  const groupedBySubject = savedItems.reduce<
    Record<string, SavedCatalogItem[]>
  >((acc, item) => {
    const list = acc[item.subject] ?? [];
    list.push(item);
    acc[item.subject] = list;
    return acc;
  }, {});

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Saved & Exam-Week Bookmarks"
      roleOverride="student"
      toastMessage={toast}
    >
      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-[var(--sn-text-main)]">
              <Bookmark className="h-5 w-5 text-[var(--sn-primary)]" />
              <span>Revision Bookmarks ({savedItems.length})</span>
            </h2>
            <p className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
              Bookmarked lessons, tricky past paper questions, and short notes
              grouped by subject.
            </p>
          </div>
          <Link
            to="/notes"
            className="rounded-xl bg-[var(--sn-olive)] px-3.5 py-2 text-xs font-bold text-[var(--sn-primary)]"
          >
            + Browse More Notes
          </Link>
        </div>
      </section>

      {savedItems.length === 0 ? (
        <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-8 text-center">
          <p className="text-sm font-bold text-[var(--sn-text-main)]">
            No revision bookmarks saved yet.
          </p>
          <Link
            to="/past-papers"
            className="mt-3 inline-block rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white"
          >
            Bookmark Past Papers
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedBySubject).map(([subject, items]) => (
            <section
              key={subject}
              className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs"
            >
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--sn-primary)]">
                {subject} ({items.length})
              </h3>
              <div className="mt-3 space-y-2.5">
                {items.map((item) => {
                  const Icon =
                    item.type === "Past Paper Question"
                      ? FileCheck2
                      : item.type === "Short Note"
                        ? FileText
                        : BookOpen;
                  return (
                    <div
                      key={item.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-[var(--sn-page-bg)]/50 p-3.5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase text-[var(--sn-text-muted)]">
                            {item.type}
                          </span>
                          <p className="truncate text-xs font-extrabold text-[var(--sn-text-main)] sm:text-sm">
                            {item.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={item.to}
                          className="rounded-xl bg-[var(--sn-primary)] px-3 py-1.5 text-xs font-bold text-white"
                        >
                          Open
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            toggleBookmark(item.id);
                            showToast("Removed from bookmarks");
                          }}
                          aria-label={`Remove ${item.title}`}
                          className="rounded-xl border border-slate-200 p-1.5 text-slate-500 hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </SipNenaPortalShell>
  );
}
