import { Bookmark, Check, Download, FileText, X } from "lucide-react";
import type { StudyMaterialItem } from "./mock-data";

interface MaterialPreviewModalProps {
  item: StudyMaterialItem | null;
  isDownloaded: boolean;
  isBookmarked: boolean;
  onClose: () => void;
  onToggleDownload: (item: StudyMaterialItem) => void;
  onToggleBookmark: (item: StudyMaterialItem) => void;
}

export function MaterialPreviewModal({
  item,
  isDownloaded,
  isBookmarked,
  onClose,
  onToggleDownload,
  onToggleBookmark,
}: MaterialPreviewModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="material-preview-title"
        className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--sn-olive)] text-[var(--sn-primary)]">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <span className="rounded-full bg-[var(--sn-surface-selected)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--sn-primary)]">
                {item.category} • {item.pages} Pages • {item.sizeLabel}
              </span>
              <h3
                id="material-preview-title"
                className="mt-1 text-base font-extrabold text-[var(--sn-text-main)]"
              >
                {item.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto bg-[var(--sn-page-bg)]/40 p-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--sn-text-muted)]">
              Document Preview • Page 1 of {item.pages}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sn-text-secondary)]">
              {item.previewSummary}
            </p>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
              <p className="text-xs font-extrabold text-[var(--sn-primary)]">
                Key Highlights Inside This Resource:
              </p>
              <ul className="list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-[var(--sn-text-main)]">
                {item.previewBullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-white p-4">
          <button
            type="button"
            onClick={() => onToggleBookmark(item)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold ${
              isBookmarked
                ? "border-[var(--sn-primary)] bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
            <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleDownload(item)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-5 py-2.5 text-xs font-bold text-white hover:bg-[var(--sn-primary-hover)] sm:flex-none"
          >
            {isDownloaded ? (
              <>
                <Check className="h-4 w-4" />
                <span>Saved Offline (Remove)</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Save for Offline / Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
