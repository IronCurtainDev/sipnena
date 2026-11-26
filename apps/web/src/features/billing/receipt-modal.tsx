import { Download, Printer, X } from "lucide-react";
import type { PaymentRecord } from "./billing-data";

interface ReceiptModalProps {
  receipt: PaymentRecord | null;
  onClose: () => void;
  onDownload: (receiptNo: string) => void;
  onPrint: () => void;
}

export function ReceiptModal({
  receipt,
  onClose,
  onDownload,
  onPrint,
}: ReceiptModalProps) {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-3xl border border-[var(--sn-border)] bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close receipt modal"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="text-center">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
            OFFICIAL SIPNENA RECEIPT
          </span>
          <h4 className="mt-2 text-lg font-extrabold text-[var(--sn-text-main)]">
            {receipt.receiptNo}
          </h4>
        </div>
        <dl className="mt-4 space-y-2 rounded-2xl bg-[var(--sn-page-bg)] p-4 text-xs">
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">Item</dt>
            <dd className="font-bold text-[var(--sn-text-main)]">
              {receipt.description}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">Paid Date</dt>
            <dd className="font-semibold">{receipt.date}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">Method</dt>
            <dd className="font-semibold">{receipt.method}</dd>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2">
            <dt className="font-bold">Total Paid</dt>
            <dd className="font-black text-[var(--sn-primary)]">
              Rs. {receipt.amount.toLocaleString()}
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onDownload(receipt.receiptNo)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] py-2.5 text-xs font-bold text-white"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
}
