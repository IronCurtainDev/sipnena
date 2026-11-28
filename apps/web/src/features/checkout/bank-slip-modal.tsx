import { useState, type FormEvent } from "react";
import { Building2, Check, UploadCloud, X } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { CHECKOUT_EXTRA_COPY, EXTRA_BANK_NAMES } from "./extra-strings";

interface BankSlipModalProps {
  lang: AppLanguage;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSlip: (bankName: string, ref: string) => void;
}

const SRI_LANKAN_BANKS = [
  "Bank of Ceylon (BOC)",
  "Commercial Bank of Ceylon",
  "Sampath Bank",
  "People's Bank",
  "FriMi / Nations Trust",
  "Genie / Dialog Finance",
];

export function BankSlipModal({
  lang,
  isOpen,
  onClose,
  onSubmitSlip,
}: BankSlipModalProps) {
  const extra = CHECKOUT_EXTRA_COPY[lang];
  const [selectedBank, setSelectedBank] = useState<string>(
    SRI_LANKAN_BANKS[0] ?? "Bank of Ceylon (BOC)",
  );
  const [refNumber, setRefNumber] = useState("TXN-2026-99182");
  const [fileAttached, setFileAttached] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitSlip(selectedBank, refNumber);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex w-full max-w-md flex-col rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[var(--sn-text-muted)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)]"
          aria-label={extra.modalCloseAria}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--sn-text-main)] sm:text-lg">
              {extra.modalTitle}
            </h3>
            <p className="text-xs text-[var(--sn-text-muted)]">
              {extra.modalSub}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="bank-select"
              className="block text-xs font-semibold text-[var(--sn-text-main)]"
            >
              {extra.modalBankLabel}
            </label>
            <select
              id="bank-select"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-2.5 text-xs text-[var(--sn-text-main)] focus:border-[var(--sn-primary)] focus:outline-none"
            >
              {SRI_LANKAN_BANKS.map((b) => (
                <option key={b} value={b}>
                  {EXTRA_BANK_NAMES[b]?.[lang] ?? b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="bank-ref"
              className="block text-xs font-semibold text-[var(--sn-text-main)]"
            >
              {extra.modalRefLabel}
            </label>
            <input
              id="bank-ref"
              type="text"
              required
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-2.5 text-xs text-[var(--sn-text-main)] focus:border-[var(--sn-primary)] focus:outline-none"
              placeholder={extra.modalRefPlaceholder}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--sn-text-main)]">
              {extra.modalFileLabel}
            </label>
            <div
              onClick={() => setFileAttached(true)}
              className="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 text-center hover:bg-slate-100"
            >
              <UploadCloud className="h-8 w-8 text-[var(--sn-primary)]" />
              {fileAttached ? (
                <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                  <span>{extra.modalFileSelected}</span>
                </div>
              ) : (
                <p className="mt-1 text-xs text-slate-600">
                  {extra.modalFilePrompt}
                </p>
              )}
              <span className="mt-0.5 text-xs text-slate-400">
                {extra.modalFileHint}
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] py-3 text-xs font-semibold text-[var(--sn-text-main)] hover:bg-slate-200"
            >
              {extra.modalCancelBtn}
            </button>
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-[var(--sn-primary)] py-3 text-xs font-bold text-white shadow-sm hover:bg-[var(--sn-primary-hover)]"
            >
              {extra.modalSubmitBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
