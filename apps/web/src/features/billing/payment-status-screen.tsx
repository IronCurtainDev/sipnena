import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MessageCircle,
  RefreshCw,
  UploadCloud,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import {
  localizeBankName,
  localizeSlipCourseTitle,
} from "@/lib/prototype-i18n";
import {
  usePrototypeState,
  type PaymentVerificationStatus,
} from "@/lib/prototype-state";
import { BILLING_COPY } from "./strings";

export function PaymentStatusScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, setSlipStatus } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const copy = BILLING_COPY[lang];

  const latestSlip = state.bankSlips[0];
  const [previewOverride, setPreviewOverride] =
    useState<PaymentVerificationStatus | null>(null);

  const activeStatus: PaymentVerificationStatus =
    previewOverride ?? latestSlip?.status ?? "pending";

  const statusLabels: Record<PaymentVerificationStatus, string> = {
    pending: copy.statusPendingLabel,
    approved: copy.statusApprovedLabel,
    rejected: copy.statusRejectedLabel,
  };

  const handleStatusSwitch = (next: PaymentVerificationStatus) => {
    setPreviewOverride(next);
    if (latestSlip) {
      setSlipStatus(
        latestSlip.id,
        next,
        next === "rejected" ? copy.rejectedSyncReason : undefined,
      );
    }
    showToast(`${copy.statusSwitchedToastPrefix} ${statusLabels[next]}`);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.paymentStatusPageTitle}
      toastMessage={toast}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--sn-border)] bg-white p-4 shadow-xs">
        <p className="text-xs font-bold text-[var(--sn-text-secondary)]">
          {copy.demoSwitcherLabel}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(["pending", "approved", "rejected"] as const).map((statusKey) => (
            <button
              key={statusKey}
              type="button"
              onClick={() => handleStatusSwitch(statusKey)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                activeStatus === statusKey
                  ? "bg-[var(--sn-primary)] text-white"
                  : "bg-[var(--sn-surface-muted)] text-[var(--sn-text-secondary)]"
              }`}
            >
              {statusLabels[statusKey]}
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-2xl rounded-3xl border border-[var(--sn-border)] bg-white p-6 text-center shadow-xs sm:p-8">
        {activeStatus === "pending" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Clock className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-[var(--sn-text-main)]">
              {copy.pendingTitle}
            </h2>
            <p className="mt-2 text-sm text-[var(--sn-text-secondary)]">
              {copy.pendingDesc}
            </p>
          </>
        )}

        {activeStatus === "approved" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-emerald-900">
              {copy.approvedTitle}
            </h2>
            <p className="mt-2 text-sm text-[var(--sn-text-secondary)]">
              {copy.approvedDesc}
            </p>
          </>
        )}

        {activeStatus === "rejected" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-700">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-rose-900">
              {copy.rejectedTitle}
            </h2>
            <p className="mt-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800">
              {latestSlip?.reason || copy.rejectedDefaultReason}
            </p>
          </>
        )}

        {latestSlip && (
          <dl className="mt-6 space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left text-xs">
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--sn-text-muted)]">
                {copy.courseCardLabel}
              </dt>
              <dd className="text-right font-bold text-[var(--sn-text-main)]">
                {localizeSlipCourseTitle(latestSlip, lang)}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--sn-text-muted)]">
                {copy.bankFileLabel}
              </dt>
              <dd className="text-right font-semibold text-[var(--sn-text-main)]">
                {localizeBankName(latestSlip.bankName, lang)} (
                {latestSlip.slipFileName})
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--sn-text-muted)]">
                {copy.refCodeLabel}
              </dt>
              <dd className="font-mono font-bold text-[var(--sn-text-main)]">
                {latestSlip.referenceCode}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--sn-text-muted)]">
                {copy.amountLabel}
              </dt>
              <dd className="font-extrabold text-[var(--sn-text-main)]">
                Rs. {latestSlip.amount.toLocaleString()}
              </dd>
            </div>
          </dl>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {activeStatus === "rejected" || activeStatus === "pending" ? (
            <Link
              to="/checkout"
              className="inline-flex items-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-5 py-3 text-xs font-bold text-white"
            >
              <UploadCloud className="h-4 w-4" />
              <span>
                {activeStatus === "rejected"
                  ? copy.reuploadSlipBtn
                  : copy.uploadAnotherSlipBtn}
              </span>
            </Link>
          ) : (
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-5 py-3 text-xs font-bold text-white"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{copy.startStudyingBtn}</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => showToast(copy.whatsappDeskToast)}
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-3 text-xs font-bold text-emerald-800"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{copy.whatsappSupportBtn}</span>
          </button>
        </div>
      </section>
    </SipNenaPortalShell>
  );
}
