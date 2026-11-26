import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  Check,
  CreditCard,
  MessageCircle,
  Send,
  Shield,
} from "lucide-react";
import { BankDepositPanel } from "./bank-deposit-panel";
import { CardLankaQrPanel } from "./card-lankaqr-panel";
import type { CheckoutStrings } from "./strings.types";
import type { EnrollmentCourseInfo, StudentProfileInfo } from "./types";

interface ParentApprovalPortalViewProps {
  course: EnrollmentCourseInfo;
  student: StudentProfileInfo;
  t: CheckoutStrings;
  onPayCard: (methodName?: string) => void;
  onSubmitBankSlip: (bankName: string, ref: string, fileName: string) => void;
  onCopyInfo: (label: string, value: string) => void;
  onSendToParent: () => void;
  onSimulateFail: () => void;
  onWhatsAppHelp: () => void;
}

export function ParentApprovalPortalView({
  course,
  student,
  t,
  onPayCard,
  onSubmitBankSlip,
  onCopyInfo,
  onSendToParent,
  onSimulateFail,
  onWhatsAppHelp,
}: ParentApprovalPortalViewProps) {
  const [activeMethodTab, setActiveMethodTab] = useState<"card_qr" | "bank">(
    "bank",
  );

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 px-4 py-5 sm:py-6">
      {/* Top Status & Quick Links */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/80 p-3 text-xs font-semibold text-[var(--sn-text-main)]">
        <span className="flex items-center gap-2">
          <Shield className="h-4 w-4 shrink-0 text-[var(--sn-primary)]" />
          <span>{t.parentPortalBanner}</span>
        </span>
        <div className="flex items-center gap-2">
          <Link
            to="/payment-status"
            className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-[var(--sn-primary)] hover:underline"
          >
            Check Slip Status
          </Link>
          <Link
            to="/billing"
            className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-[var(--sn-primary)] hover:underline"
          >
            Class Cards
          </Link>
        </div>
      </div>

      {/* Student + Course Compact Summary */}
      <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--sn-sage)] font-extrabold text-[var(--sn-primary)]">
              {student.name.charAt(0)}
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-[var(--sn-text-main)]">
                {course.title}
              </p>
              <p className="truncate text-xs text-[var(--sn-text-muted)]">
                {student.name} ({student.grade}) • {course.terms}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-black text-[var(--sn-text-main)]">
              Rs. {course.feeAmount.toLocaleString()}
            </p>
            <button
              type="button"
              onClick={onSendToParent}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--sn-primary)] hover:underline"
            >
              <Send className="h-3 w-3" />
              <span>Share with Parent</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Method Tabs: Card / LankaQR vs Bank Deposit / Slip Upload */}
      <div className="rounded-3xl border border-[var(--sn-border)] bg-white p-4 shadow-xs sm:p-5">
        <div
          role="tablist"
          aria-label="Payment method tabs"
          className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeMethodTab === "card_qr"}
            onClick={() => setActiveMethodTab("card_qr")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
              activeMethodTab === "card_qr"
                ? "bg-[var(--sn-primary)] text-white shadow-xs"
                : "text-[var(--sn-text-secondary)] hover:text-[var(--sn-text-main)]"
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Card / LankaQR</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeMethodTab === "bank"}
            onClick={() => setActiveMethodTab("bank")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
              activeMethodTab === "bank"
                ? "bg-[var(--sn-primary)] text-white shadow-xs"
                : "text-[var(--sn-text-secondary)] hover:text-[var(--sn-text-main)]"
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Bank Deposit / Slip Upload</span>
          </button>
        </div>

        {activeMethodTab === "card_qr" ? (
          <CardLankaQrPanel
            amount={course.feeAmount}
            onPayInstant={(method) => onPayCard(method)}
          />
        ) : (
          <BankDepositPanel
            amount={course.feeAmount}
            onCopy={onCopyInfo}
            onSubmitSlip={onSubmitBankSlip}
          />
        )}
      </div>

      {/* Demo Failure Trigger + WhatsApp */}
      <div className="flex flex-col items-center gap-2 text-center">
        <button
          type="button"
          onClick={onSimulateFail}
          className="text-[11px] font-semibold text-slate-400 hover:text-rose-600 hover:underline"
        >
          [Demo: Test &quot;Payment did not go through&quot; screen]
        </button>
        <button
          type="button"
          onClick={onWhatsAppHelp}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{t.whatsappSupport}</span>
        </button>
      </div>
    </div>
  );
}
