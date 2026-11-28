import { useState } from "react";
import { CreditCard, Lock, QrCode, Smartphone } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { CHECKOUT_EXTRA_COPY } from "./extra-strings";

interface CardLankaQrPanelProps {
  lang: AppLanguage;
  amount: number;
  onPayInstant: (methodName: string) => void;
}

export function CardLankaQrPanel({
  lang,
  amount,
  onPayInstant,
}: CardLankaQrPanelProps) {
  const extra = CHECKOUT_EXTRA_COPY[lang];
  const [subMode, setSubMode] = useState<"lankaqr" | "card">("lankaqr");

  return (
    <div className="space-y-4">
      <div className="inline-flex w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => setSubMode("lankaqr")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 ${
            subMode === "lankaqr"
              ? "bg-white text-[var(--sn-primary)] shadow-xs"
              : "text-[var(--sn-text-secondary)]"
          }`}
        >
          <QrCode className="h-3.5 w-3.5" />
          <span>LankaQR</span>
        </button>
        <button
          type="button"
          onClick={() => setSubMode("card")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 ${
            subMode === "card"
              ? "bg-white text-[var(--sn-primary)] shadow-xs"
              : "text-[var(--sn-text-secondary)]"
          }`}
        >
          <CreditCard className="h-3.5 w-3.5" />
          <span>Visa / Mastercard</span>
        </button>
      </div>

      {subMode === "lankaqr" ? (
        <div className="rounded-2xl border border-[var(--sn-border)] bg-white p-4 text-center">
          <p className="text-xs font-bold text-[var(--sn-text-main)]">
            {extra.scanWithApps}
          </p>
          <div className="mx-auto my-3 flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-[var(--sn-primary)] bg-[var(--sn-page-bg)]">
            <QrCode className="h-24 w-24 text-[var(--sn-primary)]" />
          </div>
          <p className="flex items-center justify-center gap-1 text-xs font-semibold text-emerald-700">
            <Smartphone className="h-3.5 w-3.5" />
            <span>
              {extra.amountWord} {amount.toLocaleString()} •{" "}
              {extra.instantActivation}
            </span>
          </p>
          <button
            type="button"
            onClick={() => onPayInstant("LankaQR")}
            className="mt-3 w-full rounded-2xl bg-[var(--sn-primary)] py-3.5 text-sm font-bold text-white hover:bg-[var(--sn-primary-hover)]"
          >
            {extra.confirmLankaQrBtn}
          </button>
        </div>
      ) : (
        <div className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-main)]">
            <Lock className="h-4 w-4 text-emerald-700" />
            <span>{extra.encryptedGateway}</span>
          </div>
          <input
            type="text"
            defaultValue="4532 •••• •••• 8819"
            aria-label={extra.cardNumberAria}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-mono"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              defaultValue="09/28"
              aria-label={extra.expiryAria}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-mono"
            />
            <input
              type="text"
              defaultValue="742"
              aria-label={extra.cvcAria}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-mono"
            />
          </div>
          <button
            type="button"
            onClick={() => onPayInstant("Visa / Mastercard")}
            className="w-full rounded-2xl bg-[var(--sn-primary)] py-3.5 text-sm font-bold text-white hover:bg-[var(--sn-primary-hover)]"
          >
            {extra.payPrefix} {amount.toLocaleString()} {extra.paySuffix}
          </button>
        </div>
      )}
    </div>
  );
}
