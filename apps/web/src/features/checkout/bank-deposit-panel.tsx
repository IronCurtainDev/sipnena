import { useState, type DragEvent, type FormEvent } from "react";
import { Building2, Check, Copy, UploadCloud } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { localizeBankName } from "@/lib/prototype-i18n";
import { BANK_BRANCH_LABELS, CHECKOUT_EXTRA_COPY } from "./extra-strings";

export interface SriLankanBankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
}

export const SRI_LANKAN_BANK_ACCOUNTS: SriLankanBankAccount[] = [
  {
    id: "boc",
    bankName: "Bank of Ceylon (BOC)",
    accountName: "SipNena Education (Pvt) Ltd",
    accountNumber: "0089412755",
    branch: "Colombo 07 Corporate Branch",
  },
  {
    id: "comb",
    bankName: "Commercial Bank of Ceylon",
    accountName: "SipNena Education (Pvt) Ltd",
    accountNumber: "1000492817",
    branch: "Nugegoda Super Branch",
  },
  {
    id: "sampath",
    bankName: "Sampath Bank",
    accountName: "SipNena Education (Pvt) Ltd",
    accountNumber: "002910048821",
    branch: "Kandy City Centre Branch",
  },
];

interface BankDepositPanelProps {
  lang: AppLanguage;
  amount: number;
  onSubmitSlip: (bankName: string, ref: string, fileName: string) => void;
  onCopy: (label: string, value: string) => void;
}

export function BankDepositPanel({
  lang,
  amount,
  onSubmitSlip,
  onCopy,
}: BankDepositPanelProps) {
  const extra = CHECKOUT_EXTRA_COPY[lang];
  const [selectedBankId, setSelectedBankId] = useState("boc");
  const [refNumber, setRefNumber] = useState("BOC-2026-88412");
  const [fileName, setFileName] = useState("bank_deposit_slip.jpg");
  const [isDragging, setIsDragging] = useState(false);

  const selectedBank =
    SRI_LANKAN_BANK_ACCOUNTS.find((b) => b.id === selectedBankId) ??
    SRI_LANKAN_BANK_ACCOUNTS[0]!;

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitSlip(selectedBank.bankName, refNumber.trim(), fileName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-bold text-[var(--sn-text-main)]">
          {extra.bankStep1Prefix} {amount.toLocaleString()}{" "}
          {extra.bankStep1Suffix}
        </p>
        <div className="space-y-2">
          {SRI_LANKAN_BANK_ACCOUNTS.map((bank) => {
            const active = bank.id === selectedBankId;
            const bankLabel = localizeBankName(bank.bankName, lang);
            return (
              <div
                key={bank.id}
                onClick={() => setSelectedBankId(bank.id)}
                className={`cursor-pointer rounded-2xl border p-3.5 transition ${
                  active
                    ? "border-2 border-[var(--sn-primary)] bg-[var(--sn-olive)]/60"
                    : "border-[var(--sn-border)] bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[var(--sn-primary)]" />
                    <span className="text-xs font-extrabold text-[var(--sn-text-main)]">
                      {bankLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[var(--sn-text-muted)]">
                    {BANK_BRANCH_LABELS[bank.branch]?.[lang] ?? bank.branch}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[var(--sn-text-muted)]">
                      {extra.accNoLabel}{" "}
                    </span>
                    <span className="font-mono font-extrabold text-[var(--sn-text-main)]">
                      {bank.accountNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopy(
                        `${bankLabel} ${extra.accountNoCopySuffix}`,
                        bank.accountNumber,
                      );
                    }}
                    className="inline-flex items-center gap-1 rounded-lg bg-[var(--sn-surface-muted)] px-2.5 py-1 text-[11px] font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-sage)]"
                  >
                    <Copy className="h-3 w-3" />
                    <span>{extra.copyBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="checkout-slip-ref"
          className="mb-1 block text-xs font-bold text-[var(--sn-text-main)]"
        >
          {extra.bankStep2Label}
        </label>
        <input
          id="checkout-slip-ref"
          type="text"
          required
          value={refNumber}
          onChange={(e) => setRefNumber(e.target.value)}
          className="w-full rounded-xl border border-[var(--sn-border)] bg-white px-3 py-2.5 text-xs font-semibold text-[var(--sn-text-main)]"
          placeholder={extra.bankStep2Placeholder}
        />
      </div>

      <div>
        <p className="mb-1 text-xs font-bold text-[var(--sn-text-main)]">
          {extra.bankStep3Label}
        </p>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center transition ${
            isDragging
              ? "border-[var(--sn-primary)] bg-[var(--sn-olive)]"
              : "border-slate-300 bg-slate-50/80"
          }`}
        >
          <UploadCloud className="h-8 w-8 text-[var(--sn-primary)]" />
          <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-emerald-700">
            <Check className="h-3.5 w-3.5 stroke-[3]" />
            <span>{fileName}</span>
          </p>
          <label className="mt-2 cursor-pointer rounded-xl border border-[var(--sn-border)] bg-white px-3.5 py-1.5 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]">
            <span>{extra.choosePhotoBtn}</span>
            <input
              type="file"
              accept="image/*,.pdf"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFileName(file.name);
              }}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[var(--sn-primary-hover)]"
      >
        {extra.submitBankSlipBtn}
      </button>
    </form>
  );
}
