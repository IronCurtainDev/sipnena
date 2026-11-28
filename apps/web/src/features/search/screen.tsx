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
import type { AppLanguage } from "@/lib/language";
import { usePrototypeState } from "@/lib/prototype-state";
import {
  SEARCH_CATALOG,
  SEARCH_CATEGORY_LABELS,
  SEARCH_COPY,
  type SearchCategory,
} from "./strings";

const TOPIC_CHIPS: Record<AppLanguage, string[]> = {
  en: [
    "Light & Mirrors",
    "Quadratic",
    "Maths 2023",
    "Photosynthesis",
    "Newton",
    "Logic Gates",
  ],
  si: [
    "ආලෝකය (Alokaya)",
    "වර්ගජ සමීකරණ",
    "ගණිතය 2023",
    "ප්‍රභාසංශ්ලේෂණය",
    "නිව්ටන්",
    "තර්ක ද්වාර",
  ],
  ta: [
    "ஒளி & ஆடிகள்",
    "இருபடிச் சமன்பாடு",
    "கணிதம் 2023",
    "ஒளித்தொகுப்பு",
    "நியூட்டன்",
    "தர்க்க வாயில்கள்",
  ],
};

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
  const copy = SEARCH_COPY[lang];
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<SearchCategory>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEARCH_CATALOG.filter((item) => {
      if (tab !== "All" && item.category !== tab) return false;
      if (!q) return true;
      const hay = `${item.localizedTitle.en} ${item.localizedTitle.si} ${item.localizedTitle.ta} ${item.localizedSubtitle[lang]} ${item.keywords}`;
      return hay.toLowerCase().includes(q);
    });
  }, [lang, query, tab]);

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
      title={copy.pageTitle}
      roleOverride="student"
    >
      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--sn-text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.placeholder}
            className="w-full rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-page-bg)]/50 py-3 pl-10 pr-4 text-sm font-semibold text-[var(--sn-text-main)] focus:border-[var(--sn-primary)] focus:outline-none"
          />
        </div>

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
              {SEARCH_CATEGORY_LABELS[item][lang]}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-[var(--sn-text-muted)]">
              <span className="flex items-center gap-1">
                <History className="h-3.5 w-3.5" /> {copy.recentSearches}
              </span>
              {state.recentSearches.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    update((prev) => ({ ...prev, recentSearches: [] }))
                  }
                  className="text-xs font-semibold text-[var(--sn-primary)] hover:underline"
                >
                  {copy.clearBtn}
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
              <span>{copy.popularTopics}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TOPIC_CHIPS[lang].map((topic) => (
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
          {copy.showingPrefix} {results.length} {copy.resultsSuffix}{" "}
          {query ? `(${copy.forQueryPrefix} "${query}")` : ""}
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
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                    {SEARCH_CATEGORY_LABELS[item.category][lang]}
                  </span>
                  <h3 className="mt-1 text-sm font-extrabold text-[var(--sn-text-main)]">
                    {item.localizedTitle[lang]}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
                    {item.localizedSubtitle[lang]}
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
