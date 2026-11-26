import { Link } from "@tanstack/react-router";
import { Bookmark, BookOpen, FileCheck2, FileText, Trash2 } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { formatSubject } from "@/lib/i18n-common";
import { usePrototypeState } from "@/lib/prototype-state";
import {
  BOOKMARKABLE_CATALOG,
  SAVED_COPY,
  type SavedCatalogItem,
} from "./strings";

export function SavedBookmarksScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, toggleBookmark } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const copy = SAVED_COPY[lang];

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
      title={copy.pageTitle}
      roleOverride="student"
      toastMessage={toast}
    >
      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-[var(--sn-text-main)]">
              <Bookmark className="h-5 w-5 text-[var(--sn-primary)]" />
              <span>
                {copy.heading} ({savedItems.length})
              </span>
            </h2>
            <p className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
              {copy.subtitle}
            </p>
          </div>
          <Link
            to="/notes"
            className="rounded-xl bg-[var(--sn-olive)] px-3.5 py-2 text-xs font-bold text-[var(--sn-primary)]"
          >
            {copy.browseNotesBtn}
          </Link>
        </div>
      </section>

      {savedItems.length === 0 ? (
        <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-8 text-center">
          <p className="text-sm font-bold text-[var(--sn-text-main)]">
            {copy.emptyText}
          </p>
          <Link
            to="/past-papers"
            className="mt-3 inline-block rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white"
          >
            {copy.bookmarkPapersBtn}
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
                {formatSubject(lang, subject)} ({items.length})
              </h3>
              <div className="mt-3 space-y-2.5">
                {items.map((item) => {
                  const Icon =
                    item.kindKey === "paper"
                      ? FileCheck2
                      : item.kindKey === "note"
                        ? FileText
                        : BookOpen;
                  const title = item.localizedTitle[lang];
                  return (
                    <div
                      key={item.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-[var(--sn-page-bg)]/50 p-3.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase text-[var(--sn-text-muted)]">
                            {item.localizedType[lang]}
                          </span>
                          <p className="truncate text-xs font-extrabold text-[var(--sn-text-main)] sm:text-sm">
                            {title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={item.to}
                          className="rounded-xl bg-[var(--sn-primary)] px-3 py-1.5 text-xs font-bold text-white"
                        >
                          {copy.openBtn}
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            toggleBookmark(item.id);
                            showToast(copy.removedToast);
                          }}
                          aria-label={title}
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
