import { Download, Printer, X } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import type { PaymentRecord } from "./billing-data";
import { BILLING_COPY } from "./strings";

interface ReceiptModalProps {
  lang: AppLanguage;
  receipt: PaymentRecord | null;
  onClose: () => void;
  onDownload: (receiptNo: string) => void;
  onPrint: () => void;
}

export function ReceiptModal({
  lang,
  receipt,
  onClose,
  onDownload,
  onPrint,
}: ReceiptModalProps) {
  if (!receipt) return null;
  const copy = BILLING_COPY[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-3xl border border-[var(--sn-border)] bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.closeReceiptAria}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="text-center">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
            {copy.officialReceiptBadge}
          </span>
          <h4 className="mt-2 text-lg font-extrabold text-[var(--sn-text-main)]">
            {receipt.receiptNo}
          </h4>
        </div>
        <dl className="mt-4 space-y-2 rounded-2xl bg-[var(--sn-page-bg)] p-4 text-xs">
          <div className="flex justify-between gap-2">
            <dt className="text-[var(--sn-text-muted)]">
              {copy.receiptItemLabel}
            </dt>
            <dd className="text-right font-bold text-[var(--sn-text-main)]">
              {receipt.localizedDescription[lang]}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">
              {copy.receiptDateLabel}
            </dt>
            <dd className="font-semibold">{receipt.localizedDate[lang]}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">
              {copy.receiptMethodLabel}
            </dt>
            <dd className="font-semibold">{receipt.localizedMethod[lang]}</dd>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2">
            <dt className="font-bold">{copy.receiptTotalLabel}</dt>
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
            <span>{copy.downloadPdfBtn}</span>
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700"
          >
            <Printer className="h-4 w-4" />
            <span>{copy.printBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
