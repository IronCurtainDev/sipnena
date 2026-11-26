import { useState } from "react";
import { Building2, Check, Eye, ShieldCheck, X, XCircle } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import {
  usePrototypeState,
  type PrototypeBankSlip,
} from "@/lib/prototype-state";

export function AdminPaymentsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, setSlipStatus } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const [previewSlip, setPreviewSlip] = useState<PrototypeBankSlip | null>(
    null,
  );

  const handleApprove = (slip: PrototypeBankSlip) => {
    setSlipStatus(slip.id, "approved");
    setPreviewSlip(null);
    showToast(`Approved ${slip.referenceCode} (${slip.studentName})`);
  };

  const handleReject = (slip: PrototypeBankSlip) => {
    setSlipStatus(
      slip.id,
      "rejected",
      "Bank stamp or reference number illegible. Please re-upload full slip.",
    );
    setPreviewSlip(null);
    showToast(`Rejected ${slip.referenceCode} — student notified to re-upload`);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Admin Operations — Bank Slip Approval Queue"
      roleOverride="admin"
      toastMessage={toast}
    >
      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Open Demo Verification Desk</span>
            </span>
            <h2 className="mt-2 text-lg font-extrabold text-[var(--sn-text-main)]">
              Pending &amp; Recent Bank Slip Uploads ({state.bankSlips.length})
            </h2>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead className="border-b border-slate-200 text-[11px] uppercase text-[var(--sn-text-muted)]">
              <tr>
                <th className="py-2.5 pr-3">Student &amp; Course</th>
                <th className="py-2.5 pr-3">Bank &amp; Ref</th>
                <th className="py-2.5 pr-3">Amount</th>
                <th className="py-2.5 pr-3">Status</th>
                <th className="py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {state.bankSlips.map((slip) => (
                <tr key={slip.id}>
                  <td className="py-3 pr-3">
                    <p className="font-extrabold text-[var(--sn-text-main)]">
                      {slip.studentName} (G{slip.grade})
                    </p>
                    <p className="text-[11px] text-[var(--sn-text-muted)]">
                      {slip.courseTitle}
                    </p>
                  </td>
                  <td className="py-3 pr-3">
                    <p className="font-bold">{slip.bankName}</p>
                    <p className="font-mono text-[11px] text-[var(--sn-text-muted)]">
                      {slip.referenceCode} • {slip.uploadedAt}
                    </p>
                  </td>
                  <td className="py-3 pr-3 font-extrabold">
                    Rs. {slip.amount.toLocaleString()}
                  </td>
                  <td className="py-3 pr-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${
                        slip.status === "approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : slip.status === "rejected"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {slip.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewSlip(slip)}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-bold text-slate-700"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Slip</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(slip)}
                        className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-2.5 py-1.5 text-[11px] font-bold text-white"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(slip)}
                        className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-2.5 py-1.5 text-[11px] font-bold text-white"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Slip Image Preview Modal */}
      {previewSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-3xl border border-[var(--sn-border)] bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setPreviewSlip(null)}
              aria-label="Close slip preview"
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-extrabold text-[var(--sn-text-main)]">
              Bank Slip Preview — {previewSlip.slipFileName}
            </h3>

            {/* Stylized Mock Bank Slip Graphic */}
            <div className="mt-4 rounded-2xl border-2 border-dashed border-emerald-300 bg-[var(--sn-page-bg)] p-4 text-xs">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="flex items-center gap-1.5 font-extrabold text-[var(--sn-primary)]">
                  <Building2 className="h-4 w-4" />
                  {previewSlip.bankName}
                </span>
                <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-900">
                  VERIFIED STAMP
                </span>
              </div>
              <div className="mt-3 space-y-1.5 font-mono text-[11px]">
                <p>PAYEE: SIPNENA EDUCATION (PVT) LTD</p>
                <p>DEPOSITOR: {previewSlip.studentName.toUpperCase()}</p>
                <p>REF NO: {previewSlip.referenceCode}</p>
                <p className="text-sm font-black text-[var(--sn-primary)]">
                  AMOUNT: LKR {previewSlip.amount.toLocaleString()}.00
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => handleReject(previewSlip)}
                className="flex-1 rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white"
              >
                Reject Slip
              </button>
              <button
                type="button"
                onClick={() => handleApprove(previewSlip)}
                className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white"
              >
                Approve &amp; Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </SipNenaPortalShell>
  );
}
