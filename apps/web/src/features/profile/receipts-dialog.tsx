import React from "react";
import { Download, Receipt, X, CheckCircle2 } from "lucide-react";
import { STUDENT_RECEIPTS } from "./mock-data";
import type { ProfileStrings } from "./strings.types";

interface ReceiptsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  strings: ProfileStrings;
  onDownloadReceipt: (title: string) => void;
}

export function ReceiptsDialog({
  isOpen,
  onClose,
  strings,
  onDownloadReceipt,
}: ReceiptsDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="sipnena-onboarding fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex w-full max-w-lg flex-col rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 shadow-2xl">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 rounded-full p-2 text-[var(--sn-text-muted)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Receipt className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
              {strings.receiptsCardTitle}
            </h3>
            <span className="rounded-full bg-emerald-100/80 px-2 py-0.5 text-xs font-bold text-emerald-800">
              {strings.receiptsPaidBadge}
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {STUDENT_RECEIPTS.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)]/60 p-4"
            >
              <div>
                <h4 className="text-xs font-bold text-[var(--sn-text-main)] sm:text-sm">
                  {item.courseTitle}
                </h4>
                <p className="mt-0.5 text-xs font-medium text-[var(--sn-text-secondary)]">
                  {item.amount} • {item.packName}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>
                    Paid on {item.date} via {item.bankMethod}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDownloadReceipt(item.courseTitle)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] text-[var(--sn-text-main)] shadow-xs hover:bg-[var(--sn-surface-muted)]"
                aria-label="Download receipt"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-[var(--sn-text-muted)]">
          ✓ {strings.receiptPaidParentNote}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-2xl bg-[var(--sn-primary)] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--sn-primary-hover)]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
