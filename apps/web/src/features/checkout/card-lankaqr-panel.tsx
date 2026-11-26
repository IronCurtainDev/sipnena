import { useState } from "react";
import { CreditCard, Lock, QrCode, Smartphone } from "lucide-react";

interface CardLankaQrPanelProps {
  amount: number;
  onPayInstant: (methodName: string) => void;
}

export function CardLankaQrPanel({
  amount,
  onPayInstant,
}: CardLankaQrPanelProps) {
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
            Scan with FriMi, Genie, Solo, ComBank Q+, or BOC SmartPay
          </p>
          <div className="mx-auto my-3 flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-[var(--sn-primary)] bg-[var(--sn-page-bg)]">
            <QrCode className="h-24 w-24 text-[var(--sn-primary)]" />
          </div>
          <p className="flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-700">
            <Smartphone className="h-3.5 w-3.5" />
            <span>
              Amount: Rs. {amount.toLocaleString()} • Instant Activation
            </span>
          </p>
          <button
            type="button"
            onClick={() => onPayInstant("LankaQR (Instant)")}
            className="mt-3 w-full rounded-2xl bg-[var(--sn-primary)] py-3.5 text-sm font-bold text-white hover:bg-[var(--sn-primary-hover)]"
          >
            Confirm LankaQR Payment →
          </button>
        </div>
      ) : (
        <div className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--sn-text-main)]">
            <Lock className="h-4 w-4 text-emerald-700" />
            <span>256-bit Encrypted Sri Lankan Gateway</span>
          </div>
          <input
            type="text"
            defaultValue="4532 •••• •••• 8819"
            aria-label="Card number"
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-mono"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              defaultValue="09/28"
              aria-label="Expiry date"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-mono"
            />
            <input
              type="text"
              defaultValue="742"
              aria-label="CVC"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-mono"
            />
          </div>
          <button
            type="button"
            onClick={() => onPayInstant("Visa / Mastercard")}
            className="w-full rounded-2xl bg-[var(--sn-primary)] py-3.5 text-sm font-bold text-white hover:bg-[var(--sn-primary-hover)]"
          >
            Pay Rs. {amount.toLocaleString()} Securely →
          </button>
        </div>
      )}
    </div>
  );
}
