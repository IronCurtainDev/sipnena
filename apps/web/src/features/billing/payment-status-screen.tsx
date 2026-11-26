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
  usePrototypeState,
  type PaymentVerificationStatus,
} from "@/lib/prototype-state";

export function PaymentStatusScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, setSlipStatus } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const latestSlip = state.bankSlips[0];
  const [previewOverride, setPreviewOverride] =
    useState<PaymentVerificationStatus | null>(null);

  const activeStatus: PaymentVerificationStatus =
    previewOverride ?? latestSlip?.status ?? "pending";

  const handleStatusSwitch = (next: PaymentVerificationStatus) => {
    setPreviewOverride(next);
    if (latestSlip) {
      setSlipStatus(
        latestSlip.id,
        next,
        next === "rejected"
          ? "Reference number partially cropped. Please re-upload a clearer photo of the full BOC slip."
          : undefined,
      );
    }
    showToast(`Status preview switched to: ${next.toUpperCase()}`);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Payment Verification Status"
      toastMessage={toast}
    >
      {/* Demo State Toggle Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--sn-border)] bg-white p-4 shadow-xs">
        <p className="text-xs font-bold text-[var(--sn-text-secondary)]">
          Demo Verification State Switcher (syncs with Admin Queue):
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { id: "pending", label: "Pending Verification" },
              { id: "approved", label: "Approved" },
              { id: "rejected", label: "Rejected (Re-upload)" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleStatusSwitch(opt.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                activeStatus === opt.id
                  ? "bg-[var(--sn-primary)] text-white"
                  : "bg-[var(--sn-surface-muted)] text-[var(--sn-text-secondary)]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Status Card */}
      <section className="mx-auto max-w-2xl rounded-3xl border border-[var(--sn-border)] bg-white p-6 text-center shadow-xs sm:p-8">
        {activeStatus === "pending" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Clock className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-[var(--sn-text-main)]">
              Pending Verification
            </h2>
            <p className="mt-2 text-sm text-[var(--sn-text-secondary)]">
              Our Colombo verification desk is checking your bank slip. Slips
              are verified within 15–30 minutes (8:00 AM – 9:00 PM).
            </p>
          </>
        )}

        {activeStatus === "approved" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-emerald-900">
              Approved — Class Card Activated!
            </h2>
            <p className="mt-2 text-sm text-[var(--sn-text-secondary)]">
              Your bank deposit was verified. Full Term 2 videos, tutes, and
              live classes are now unlocked.
            </p>
          </>
        )}

        {activeStatus === "rejected" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-700">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-rose-900">
              Rejected (Re-upload Required)
            </h2>
            <p className="mt-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800">
              {latestSlip?.reason ||
                "Reference number or stamp on the bank slip was blurry. Please upload a clear photo."}
            </p>
          </>
        )}

        {latestSlip && (
          <dl className="mt-6 space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left text-xs">
            <div className="flex justify-between">
              <dt className="text-[var(--sn-text-muted)]">Course / Card</dt>
              <dd className="font-bold text-[var(--sn-text-main)]">
                {latestSlip.courseTitle}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--sn-text-muted)]">Bank &amp; File</dt>
              <dd className="font-semibold text-[var(--sn-text-main)]">
                {latestSlip.bankName} ({latestSlip.slipFileName})
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--sn-text-muted)]">Reference Code</dt>
              <dd className="font-mono font-bold text-[var(--sn-text-main)]">
                {latestSlip.referenceCode}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--sn-text-muted)]">Amount</dt>
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
                  ? "Re-upload Bank Slip"
                  : "Upload Another Slip"}
              </span>
            </Link>
          ) : (
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-5 py-3 text-xs font-bold text-white"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Start Studying Now</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() =>
              showToast(
                "Opening WhatsApp Verification Desk (+94 77 123 4567)...",
              )
            }
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-3 text-xs font-bold text-emerald-800"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp Support</span>
          </button>
        </div>
      </section>
    </SipNenaPortalShell>
  );
}
