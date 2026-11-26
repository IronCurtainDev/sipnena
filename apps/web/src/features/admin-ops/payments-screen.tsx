import { useState } from "react";
import { Check, Eye, ShieldCheck, XCircle } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { formatGradeShort } from "@/lib/i18n-common";
import {
  localizeBankName,
  localizeSlipCourseTitle,
  localizeTimestamp,
} from "@/lib/prototype-i18n";
import {
  usePrototypeState,
  type PaymentVerificationStatus,
  type PrototypeBankSlip,
} from "@/lib/prototype-state";
import { SlipPreviewModal } from "./slip-preview-modal";
import { ADMIN_OPS_COPY } from "./strings";

export function AdminPaymentsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, setSlipStatus } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const copy = ADMIN_OPS_COPY[lang];

  const [filter, setFilter] = useState<"all" | PaymentVerificationStatus>(
    "all",
  );
  const [previewSlip, setPreviewSlip] = useState<PrototypeBankSlip | null>(
    null,
  );
  const [rejectNote, setRejectNote] = useState("");

  const statusLabels = {
    pending: copy.statusPending,
    approved: copy.statusApproved,
    rejected: copy.statusRejected,
  };

  const pendingCount = state.bankSlips.filter(
    (s) => s.status === "pending",
  ).length;
  const approvedList = state.bankSlips.filter((s) => s.status === "approved");
  const rejectedCount = state.bankSlips.filter(
    (s) => s.status === "rejected",
  ).length;
  const verifiedTotal = approvedList.reduce((sum, s) => sum + s.amount, 0);
  const visibleSlips = state.bankSlips.filter((s) =>
    filter === "all" ? true : s.status === filter,
  );

  const handleApprove = (slip: PrototypeBankSlip) => {
    setSlipStatus(slip.id, "approved");
    setPreviewSlip(null);
    showToast(
      `${copy.approvedToastPrefix} ${slip.referenceCode} (${slip.studentName})`,
    );
  };

  const handleReject = (slip: PrototypeBankSlip) => {
    setSlipStatus(
      slip.id,
      "rejected",
      rejectNote.trim() || copy.rejectReasonDefault,
    );
    setRejectNote("");
    setPreviewSlip(null);
    showToast(
      `${copy.rejectedToastPrefix} ${slip.referenceCode} ${copy.rejectedToastSuffix}`,
    );
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.paymentsPageTitle}
      roleOverride="admin"
      toastMessage={toast}
    >
      <section className="rounded-3xl bg-[#111827] p-5 text-white shadow-sm sm:p-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{copy.openDeskBadge}</span>
        </span>
        <h2 className="mt-2 text-lg font-extrabold sm:text-xl">
          {copy.opsGreeting}
        </h2>
        <p className="mt-0.5 text-xs text-slate-300">{copy.opsSub}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-[11px] font-bold text-amber-300">
              {copy.kpiPendingLabel}
            </p>
            <p className="mt-1 text-xl font-black">{pendingCount}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-[11px] font-bold text-emerald-300">
              {copy.kpiApprovedLabel}
            </p>
            <p className="mt-1 text-xl font-black">{approvedList.length}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-[11px] font-bold text-rose-300">
              {copy.kpiRejectedLabel}
            </p>
            <p className="mt-1 text-xl font-black">{rejectedCount}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-[11px] font-bold text-slate-300">
              {copy.kpiTotalValueLabel}
            </p>
            <p className="mt-1 text-xl font-black">
              Rs. {verifiedTotal.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-300 bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-extrabold text-[var(--sn-text-main)]">
            {copy.uploadsHeading} ({visibleSlips.length})
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: "all", label: copy.tabAll },
                { id: "pending", label: copy.statusPending },
                { id: "approved", label: copy.statusApproved },
                { id: "rejected", label: copy.statusRejected },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter(t.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                  filter === t.id
                    ? "bg-[#111827] text-amber-300"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead className="border-b border-slate-200 text-[11px] uppercase text-[var(--sn-text-muted)]">
              <tr>
                <th className="py-2.5 pr-3">{copy.colStudentCourse}</th>
                <th className="py-2.5 pr-3">{copy.colBankRef}</th>
                <th className="py-2.5 pr-3">{copy.colAmount}</th>
                <th className="py-2.5 pr-3">{copy.colStatus}</th>
                <th className="py-2.5 text-right">{copy.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleSlips.map((slip) => (
                <tr key={slip.id}>
                  <td className="py-3 pr-3">
                    <p className="font-extrabold text-[var(--sn-text-main)]">
                      {slip.studentName} ({formatGradeShort(lang, slip.grade)})
                    </p>
                    <p className="text-[11px] text-[var(--sn-text-muted)]">
                      {localizeSlipCourseTitle(slip, lang)}
                    </p>
                  </td>
                  <td className="py-3 pr-3">
                    <p className="font-bold">
                      {localizeBankName(slip.bankName, lang)}
                    </p>
                    <p className="font-mono text-[11px] text-[var(--sn-text-muted)]">
                      {slip.referenceCode} •{" "}
                      {localizeTimestamp(slip.uploadedAt, lang)}
                    </p>
                  </td>
                  <td className="py-3 pr-3 font-extrabold">
                    Rs. {slip.amount.toLocaleString()}
                  </td>
                  <td className="py-3 pr-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        slip.status === "approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : slip.status === "rejected"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {statusLabels[slip.status]}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setRejectNote("");
                          setPreviewSlip(slip);
                        }}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-bold text-slate-700"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>{copy.slipBtn}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(slip)}
                        className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-2.5 py-1.5 text-[11px] font-bold text-white"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>{copy.approveBtn}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(slip)}
                        className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-2.5 py-1.5 text-[11px] font-bold text-white"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>{copy.rejectBtn}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <SlipPreviewModal
        lang={lang}
        slip={previewSlip}
        rejectNote={rejectNote}
        onRejectNoteChange={setRejectNote}
        onClose={() => setPreviewSlip(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </SipNenaPortalShell>
  );
}
