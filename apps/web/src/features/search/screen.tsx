import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  FileCheck2,
  FileText,
  GraduationCap,
  History,
  Search as SearchIcon,
  Sparkles,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { usePrototypeState } from "@/lib/prototype-state";

type SearchCategory = "All" | "Lessons" | "Past Papers" | "Tutes" | "Teachers";

interface SearchResultItem {
  id: string;
  category: Exclude<SearchCategory, "All">;
  title: string;
  subtitle: string;
  keywords: string;
  to: string;
}

const SEARCH_CATALOG: SearchResultItem[] = [
  {
    id: "sr-1",
    category: "Lessons",
    title: "Lesson 4: Mirrors & Image Formation (ආලෝකය සහ පරාවර්තනය)",
    subtitle: "Grade 8 Science • Ms. Menaka Jayawardena • 18 mins",
    keywords:
      "light reflection alokaya paravarthanaya mirrors oli science vidyawa",
    to: "/lesson",
  },
  {
    id: "sr-2",
    category: "Past Papers",
    title: "G.C.E. O/L Science — 2024 Part I & Official Marking Scheme",
    subtitle: "Grade 11 • English Medium • 40 MCQs + Part II",
    keywords: "past paper 2024 science mcq vidyawa விஞ்ஞானம்",
    to: "/past-papers",
  },
  {
    id: "sr-3",
    category: "Past Papers",
    title: "G.C.E. O/L Mathematics — 2023 Part II (ගණිතය)",
    subtitle: "Grade 11 • Sinhala Medium • Quadratic & Geometry",
    keywords: "ganithaya maths quadratic geometry கணிதம் 2023",
    to: "/past-papers",
  },
  {
    id: "sr-4",
    category: "Tutes",
    title: "O/L Mathematics Master Formula Sheet (All 3 Terms)",
    subtitle: "PDF Formula Sheet • 4 Pages • 920 KB",
    keywords: "formula tute ganithaya area volume circle theorem",
    to: "/notes",
  },
  {
    id: "sr-5",
    category: "Tutes",
    title: "Unit 7: Light, Mirrors & Ray Diagrams Tute (PDF)",
    subtitle: "Lesson Tute • Grade 8 Science • 14 Pages",
    keywords: "alokaya ray diagram mirror tute pdf",
    to: "/notes",
  },
  {
    id: "sr-6",
    category: "Lessons",
    title: "Photosynthesis & Gas Exchange (ප්‍රභාසංශ්ලේෂණය / ஒளித்தொகுப்பு)",
    subtitle: "Grade 10–11 Science • Term 1 Biology",
    keywords:
      "photosynthesis prabhasansleshanaya ஒளித்தொகுப்பு plant leaf starch",
    to: "/courses",
  },
  {
    id: "sr-7",
    category: "Teachers",
    title: "Ms. Menaka Jayawardena — Senior Science Specialist",
    subtitle: "BSc, PGDE • Grades 6–11 Sinhala & English Medium",
    keywords: "menaka science teacher vidyawa newton",
    to: "/courses",
  },
  {
    id: "sr-8",
    category: "Teachers",
    title: "Mr. Anura Perera — O/L Mathematics & Geometry Mentor",
    subtitle: "20+ Years Experience • Western Province Marking Panel",
    keywords: "anura maths ganithaya geometry quadratic",
    to: "/courses",
  },
  {
    id: "sr-9",
    category: "Lessons",
    title: "Newton's Laws of Motion & Force Calculations",
    subtitle: "Grade 10 Science • Physics Unit 4",
    keywords: "newton laws force physics motion vidyawa",
    to: "/lesson",
  },
];

const TOPIC_CHIPS = [
  "Alokaya (ආලෝකය)",
  "Quadratic",
  "ගණිතය 2023",
  "ஒளித்தொகுப்பு",
  "Newton",
  "Vidyawa",
  "Logic Gates",
];

const TABS: SearchCategory[] = [
  "All",
  "Lessons",
  "Past Papers",
  "Tutes",
  "Teachers",
];

export function GlobalSearchScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, update } = usePrototypeState();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<SearchCategory>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEARCH_CATALOG.filter((item) => {
      if (tab !== "All" && item.category !== tab) return false;
      if (!q) return true;
      return `${item.title} ${item.subtitle} ${item.keywords}`
        .toLowerCase()
        .includes(q);
    });
  }, [query, tab]);

  const applyTopic = (term: string) => {
    const clean = term.split(" (")[0] ?? term;
    setQuery(clean);
    update((prev) => ({
      ...prev,
      recentSearches: [
        clean,
        ...prev.recentSearches.filter((x) => x !== clean),
      ].slice(0, 6),
    }));
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Search SipNena"
      roleOverride="student"
    >
      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--sn-text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search in English, සිංහල, தமிழ், or Singlish (e.g. alokaya, ganithaya, newton)..."
            className="w-full rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-page-bg)]/50 py-3 pl-10 pr-4 text-sm font-semibold text-[var(--sn-text-main)] focus:border-[var(--sn-primary)] focus:outline-none"
          />
        </div>

        {/* Instant Filter Tabs */}
        <div className="mt-4 flex flex-wrap gap-2">
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${
                tab === item
                  ? "bg-[var(--sn-primary)] text-white"
                  : "bg-[var(--sn-surface-muted)] text-[var(--sn-text-secondary)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Recent & Popular Chips */}
        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-[var(--sn-text-muted)]">
              <span className="flex items-center gap-1">
                <History className="h-3.5 w-3.5" /> Recent Searches
              </span>
              {state.recentSearches.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    update((prev) => ({ ...prev, recentSearches: [] }))
                  }
                  className="text-[11px] font-semibold text-[var(--sn-primary)] hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {state.recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-[var(--sn-text-main)] hover:bg-[var(--sn-olive)]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="flex items-center gap-1 text-xs font-bold text-[var(--sn-text-muted)]">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Popular Grade 6–11 Topics (EN / සි / த / Singlish)</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TOPIC_CHIPS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => applyTopic(topic)}
                  className="rounded-xl bg-[var(--sn-olive)] px-2.5 py-1 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-sage)]"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <p className="text-xs font-bold text-[var(--sn-text-secondary)]">
          Showing {results.length} results {query ? `for "${query}"` : ""}
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {results.map((item) => {
            const Icon =
              item.category === "Past Papers"
                ? FileCheck2
                : item.category === "Tutes"
                  ? FileText
                  : item.category === "Teachers"
                    ? GraduationCap
                    : BookOpen;
            return (
              <Link
                key={item.id}
                to={item.to}
                className="flex items-start gap-3 rounded-3xl border border-[var(--sn-border)] bg-white p-4 shadow-xs transition hover:border-[var(--sn-primary)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                    {item.category}
                  </span>
                  <h3 className="mt-1 text-sm font-extrabold text-[var(--sn-text-main)]">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SipNenaPortalShell>
  );
}
