import { useMemo, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  BookOpen,
  Check,
  Download,
  Eye,
  FileText,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { usePrototypeState } from "@/lib/prototype-state";
import {
  MATERIAL_CATEGORIES,
  STUDY_MATERIALS,
  type MaterialCategory,
  type StudyMaterialItem,
} from "./mock-data";
import { MaterialPreviewModal } from "./preview-modal";

export function NotesAndMaterialsScreen({
  courseScoped = false,
}: {
  courseScoped?: boolean;
}) {
  const { courseId } = useParams({ strict: false });
  const [lang, setLang] = useSipNenaLanguage();
  const { state, toggleBookmark, toggleDownload } = usePrototypeState();
  const { toast, showToast } = useToastMessage();

  const [category, setCategory] = useState<"All" | MaterialCategory>("All");
  const [subject, setSubject] = useState("All");
  const [previewItem, setPreviewItem] = useState<StudyMaterialItem | null>(
    null,
  );

  const materials = useMemo(
    () =>
      STUDY_MATERIALS.filter((item) => {
        if (category !== "All" && item.category !== category) return false;
        if (subject !== "All" && item.subject !== subject) return false;
        return true;
      }),
    [category, subject],
  );

  const handleToggleDownload = (item: StudyMaterialItem) => {
    const exists = state.downloadedIds.includes(item.id);
    toggleDownload(item.id);
    showToast(
      exists
        ? `Removed "${item.title}" from offline storage`
        : `Saved "${item.title}" for offline study!`,
    );
  };

  const handleToggleBookmark = (item: StudyMaterialItem) => {
    const exists = state.bookmarkedIds.includes(item.id);
    toggleBookmark(item.id);
    showToast(
      exists ? "Removed from Saved bookmarks" : "Bookmarked for exam revision!",
    );
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={
        courseScoped
          ? `Course Materials (${courseId ?? "Science"})`
          : "Tutes, Short Notes & NIE Textbooks"
      }
      roleOverride="student"
      toastMessage={toast}
    >
      {courseScoped && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            to="/course"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--sn-primary)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Course Details</span>
          </Link>
          <div className="flex gap-2">
            <Link
              to="/courses/$courseId/qa"
              params={{ courseId: courseId ?? "sci-g8-full" }}
              className="rounded-xl border border-[var(--sn-border)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--sn-primary)]"
            >
              Course Q&amp;A
            </Link>
            <Link
              to="/lesson"
              className="rounded-xl bg-[var(--sn-primary)] px-3 py-1.5 text-xs font-bold text-white"
            >
              Open Video Lesson
            </Link>
          </div>
        </div>
      )}

      <section className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Categorized Revision Library</span>
            </span>
            <h2 className="mt-2 text-xl font-extrabold text-[var(--sn-text-main)]">
              Lesson Tutes, Short Notes, Formula Sheets &amp; NIE Textbooks
            </h2>
          </div>

          <select
            aria-label="Filter materials by subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-xl border border-[var(--sn-border)] bg-white px-3 py-2 text-xs font-bold text-[var(--sn-text-main)]"
          >
            <option value="All">All Subjects</option>
            <option value="Science">Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="ICT">ICT</option>
            <option value="History">History</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {MATERIAL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                category === cat
                  ? "bg-[var(--sn-primary)] text-white"
                  : "border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-secondary)] hover:bg-[var(--sn-sage)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {materials.map((item) => {
          const downloaded = state.downloadedIds.includes(item.id);
          const bookmarked = state.bookmarkedIds.includes(item.id);
          return (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--sn-primary)]">
                      {item.category}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                      Grade {item.grade} • {item.subject}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleBookmark(item)}
                    aria-label={`Bookmark ${item.title}`}
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

                <div className="mt-3 flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold text-[var(--sn-text-main)] sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
                      {item.medium} • {item.pages} pages • {item.sizeLabel}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-[var(--sn-text-secondary)]">
                  {item.previewSummary}
                </p>
              </div>

              <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setPreviewItem(item)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] py-2.5 text-xs font-bold text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)]"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleDownload(item)}
                  className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition ${
                    downloaded
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-[var(--sn-primary)] text-white hover:bg-[var(--sn-primary-hover)]"
                  }`}
                >
                  {downloaded ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Saved Offline</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Save Offline</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <MaterialPreviewModal
        item={previewItem}
        isDownloaded={
          previewItem ? state.downloadedIds.includes(previewItem.id) : false
        }
        isBookmarked={
          previewItem ? state.bookmarkedIds.includes(previewItem.id) : false
        }
        onClose={() => setPreviewItem(null)}
        onToggleDownload={handleToggleDownload}
        onToggleBookmark={handleToggleBookmark}
      />
    </SipNenaPortalShell>
  );
}
