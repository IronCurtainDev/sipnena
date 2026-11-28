import { Building2, X } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { localizeBankName } from "@/lib/prototype-i18n";
import type { PrototypeBankSlip } from "@/lib/prototype-state";
import { ADMIN_OPS_COPY } from "./strings";

interface SlipPreviewModalProps {
  lang: AppLanguage;
  slip: PrototypeBankSlip | null;
  rejectNote: string;
  onRejectNoteChange: (val: string) => void;
  onClose: () => void;
  onApprove: (slip: PrototypeBankSlip) => void;
  onReject: (slip: PrototypeBankSlip) => void;
}

export function SlipPreviewModal({
  lang,
  slip,
  rejectNote,
  onRejectNoteChange,
  onClose,
  onApprove,
  onReject,
}: SlipPreviewModalProps) {
  if (!slip) return null;
  const copy = ADMIN_OPS_COPY[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-300 bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.closePreviewAria}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-base font-extrabold text-[var(--sn-text-main)]">
          {copy.slipPreviewPrefix} {slip.slipFileName}
        </h3>

        <div className="mt-4 rounded-2xl border-2 border-dashed border-amber-400 bg-slate-50 p-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="flex items-center gap-1.5 font-extrabold text-[#111827]">
              <Building2 className="h-4 w-4" />
              {localizeBankName(slip.bankName, lang)}
            </span>
            <span className="rounded bg-amber-100 px-2 py-0.5 font-mono text-xs font-bold text-amber-900">
              {copy.verifiedStamp}
            </span>
          </div>
          <div className="mt-3 space-y-1.5 font-mono text-xs">
            <p>{copy.payeeLine}</p>
            <p>
              {copy.depositorPrefix} {slip.studentName.toUpperCase()}
            </p>
            <p>
              {copy.refNoPrefix} {slip.referenceCode}
            </p>
            <p className="text-sm font-black text-[#111827]">
              {copy.amountLkrPrefix} {slip.amount.toLocaleString()}.00
            </p>
          </div>
        </div>

        <label className="mt-3 block text-xs font-bold text-[var(--sn-text-main)]">
          <span className="mb-1 block">{copy.rejectReasonField}</span>
          <input
            type="text"
            value={rejectNote}
            onChange={(e) => onRejectNoteChange(e.target.value)}
            placeholder={copy.rejectReasonDefault}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
          />
        </label>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onReject(slip)}
            className="flex-1 rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white"
          >
            {copy.rejectSlipModalBtn}
          </button>
          <button
            type="button"
            onClick={() => onApprove(slip)}
            className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white"
          >
            {copy.approveUnlockModalBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
