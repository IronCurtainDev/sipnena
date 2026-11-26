import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, Receipt, Sparkles, Tag } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import {
  CLASS_CARDS,
  PAYMENT_HISTORY,
  VALID_VOUCHERS,
  type PaymentRecord,
} from "./billing-data";
import { ReceiptModal } from "./receipt-modal";

export function BillingScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const [promoInput, setPromoInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{
    code: string;
    label: string;
    discount: number;
  } | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<PaymentRecord | null>(
    null,
  );

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    const match = VALID_VOUCHERS[code];
    if (!match) {
      showToast("Try demo codes: SIPNENA25, SCHOLAR50, or OLPASS");
      return;
    }
    setAppliedVoucher({ code, ...match });
    showToast(`Applied voucher ${code}: -Rs. ${match.discount}`);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Billing & Monthly Class Cards"
      toastMessage={toast}
    >
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-extrabold text-[var(--sn-text-main)]">
            Active Monthly Class Cards &amp; Term Bundles
          </h2>
          <Link
            to="/payment-status"
            className="text-xs font-bold text-[var(--sn-primary)] hover:underline"
          >
            View Bank Slip Verification Status →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CLASS_CARDS.map((card) => (
            <article
              key={card.id}
              className="flex flex-col justify-between rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--sn-primary)]">
                    {card.type}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      card.status === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {card.status}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-extrabold text-[var(--sn-text-main)]">
                  {card.title}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
                  {card.teacher} • Next renewal: {card.renewalDate}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-lg font-black text-[var(--sn-text-main)]">
                  Rs.{" "}
                  {Math.max(
                    0,
                    card.price - (appliedVoucher?.discount ?? 0),
                  ).toLocaleString()}
                </span>
                <Link
                  to="/checkout"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Renew Class Card</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-[var(--sn-primary)]" />
          <h3 className="text-base font-extrabold text-[var(--sn-text-main)]">
            Redeem Promo Code or Scholarship Voucher
          </h3>
        </div>
        <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
          Try sample codes: <code>SIPNENA25</code>, <code>SCHOLAR50</code>, or{" "}
          <code>OLPASS</code>.
        </p>

        <form
          onSubmit={handleApplyPromo}
          className="mt-3 flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Enter scholarship or promo code..."
            className="flex-1 rounded-xl border border-[var(--sn-border)] px-3.5 py-2.5 text-xs font-semibold uppercase"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-5 py-2.5 text-xs font-bold text-white"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Apply Voucher</span>
          </button>
        </form>

        {appliedVoucher && (
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-900">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              {appliedVoucher.code} active — {appliedVoucher.label} (-Rs.{" "}
              {appliedVoucher.discount})
            </span>
            <button
              type="button"
              onClick={() => setAppliedVoucher(null)}
              className="text-rose-700 hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <h3 className="text-base font-extrabold text-[var(--sn-text-main)]">
          Payment History &amp; Receipts
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[540px] text-left text-xs">
            <thead className="border-b border-slate-200 text-[11px] uppercase text-[var(--sn-text-muted)]">
              <tr>
                <th className="py-2.5 pr-3">Date</th>
                <th className="py-2.5 pr-3">Class Card / Bundle</th>
                <th className="py-2.5 pr-3">Method</th>
                <th className="py-2.5 pr-3">Amount</th>
                <th className="py-2.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PAYMENT_HISTORY.map((row) => (
                <tr key={row.id}>
                  <td className="py-3 pr-3 font-medium text-[var(--sn-text-secondary)]">
                    {row.date}
                  </td>
                  <td className="py-3 pr-3 font-bold text-[var(--sn-text-main)]">
                    {row.description}
                  </td>
                  <td className="py-3 pr-3 text-[var(--sn-text-secondary)]">
                    {row.method}
                  </td>
                  <td className="py-3 pr-3 font-extrabold text-[var(--sn-text-main)]">
                    Rs. {row.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setActiveReceipt(row)}
                      className="inline-flex items-center gap-1 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-3 py-1.5 text-[11px] font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-sage)]"
                    >
                      <Receipt className="h-3.5 w-3.5" />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ReceiptModal
        receipt={activeReceipt}
        onClose={() => setActiveReceipt(null)}
        onDownload={(receiptNo) => {
          showToast(`Downloaded PDF: ${receiptNo}.pdf`);
          setActiveReceipt(null);
        }}
        onPrint={() => showToast("Sent to printer preview")}
      />
    </SipNenaPortalShell>
  );
}
