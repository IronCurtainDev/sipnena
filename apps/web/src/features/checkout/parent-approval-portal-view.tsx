import { useState } from "react";
import {
  Building2,
  Check,
  CreditCard,
  DownloadCloud,
  HelpCircle,
  Lock,
  MessageCircle,
  Shield,
  Video,
} from "lucide-react";
import type {
  EnrollmentCourseInfo,
  PaymentMethodType,
  StudentProfileInfo,
} from "./types";
import type { CheckoutStrings } from "./strings.types";

interface ParentApprovalPortalViewProps {
  course: EnrollmentCourseInfo;
  student: StudentProfileInfo;
  t: CheckoutStrings;
  onPayCard: () => void;
  onPayBankTransfer: () => void;
  onSimulateFail: () => void;
  onWhatsAppHelp: () => void;
}

export function ParentApprovalPortalView({
  course,
  student,
  t,
  onPayCard,
  onPayBankTransfer,
  onSimulateFail,
  onWhatsAppHelp,
}: ParentApprovalPortalViewProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType>("card");

  const handlePay = () => {
    if (selectedMethod === "card") {
      onPayCard();
    } else {
      onPayBankTransfer();
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg space-y-4 px-4 py-5 sm:py-6">
      {/* Official Parent Approval Portal Pill */}
      <div className="flex items-center gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/80 p-3 text-xs font-semibold text-[var(--sn-text-main)]">
        <Shield className="h-4 w-4 shrink-0 text-[var(--sn-primary)]" />
        <span className="truncate">{t.parentPortalBanner}</span>
      </div>

      {/* Student Request Card */}
      <div className="flex items-center gap-3.5 rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 shadow-xs">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--sn-sage)] text-[var(--sn-primary)]">
          <span className="text-base font-extrabold">
            {student.name.charAt(0)}
          </span>
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
            <Check className="h-3 w-3 stroke-[3]" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span>{student.grade} Student</span>
          </div>
          <h3 className="truncate text-sm font-bold text-[var(--sn-text-main)]">
            {t.studentWantsToJoin}
          </h3>
          <p className="truncate text-xs text-[var(--sn-text-muted)]">
            කසුන් මෙම පාඨමාලාවට සම්බන්ධ වීමට කැමතියි
          </p>
        </div>
      </div>

      {/* Course Details Card */}
      <div className="overflow-hidden rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] shadow-xs">
        <div className="border-b border-[var(--sn-border)] bg-linear-to-r from-[var(--sn-olive)] to-[var(--sn-sage)]/40 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
              {t.nieAlignedBadge}
            </span>
            <span className="rounded-full bg-[var(--sn-sage)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--sn-text-main)]">
              {course.terms}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
              {course.medium}
            </span>
          </div>
          <h3 className="mt-2 text-base font-bold text-[var(--sn-text-main)] sm:text-lg">
            {course.title}
          </h3>
          <p className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
            {course.teacher} • {course.teacherRole}
          </p>
        </div>

        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/50 p-3 text-center text-xs">
          <div className="flex items-center justify-center gap-1.5 font-medium text-[var(--sn-text-secondary)]">
            <Video className="h-3.5 w-3.5 text-[var(--sn-primary)]" />
            <span>{t.lessonsCountLabel}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 font-medium text-[var(--sn-text-secondary)]">
            <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
            <span>{t.quizzesCountLabel}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 font-medium text-[var(--sn-text-secondary)]">
            <DownloadCloud className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t.offlineStudyLabel}</span>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="flex items-center justify-between p-4">
          <div>
            <span className="block text-[11px] font-bold text-[var(--sn-text-muted)] uppercase">
              {t.totalCourseFee}
            </span>
            <span className="text-2xl font-extrabold text-[var(--sn-text-main)]">
              Rs. {course.feeAmount.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="inline-block rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
              {t.lifetimeAccess}
            </span>
            <p className="mt-0.5 text-[11px] text-emerald-700 font-medium">
              ✓ {t.oneTimePayment}
            </p>
          </div>
        </div>
      </div>

      {/* Select Payment Method */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold text-[var(--sn-text-main)]">
          {t.selectPaymentMethod} / ගෙවීම් ක්‍රමය තෝරන්න
        </label>

        <button
          type="button"
          onClick={() => setSelectedMethod("card")}
          className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
            selectedMethod === "card"
              ? "border-[var(--sn-primary)] bg-[var(--sn-surface-selected)] shadow-xs"
              : "border-[var(--sn-border)] bg-[var(--sn-surface)] hover:bg-[var(--sn-surface-muted)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-primary)] text-white">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--sn-text-main)]">
                {t.cardMethodTitle}
              </div>
              <div className="text-xs text-[var(--sn-text-muted)]">
                {t.cardMethodDesc}
              </div>
            </div>
          </div>
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border ${
              selectedMethod === "card"
                ? "border-[var(--sn-primary)] bg-[var(--sn-primary)] text-white"
                : "border-slate-300 bg-white"
            }`}
          >
            {selectedMethod === "card" && (
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setSelectedMethod("bank_transfer")}
          className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
            selectedMethod === "bank_transfer"
              ? "border-[var(--sn-primary)] bg-[var(--sn-surface-selected)] shadow-xs"
              : "border-[var(--sn-border)] bg-[var(--sn-surface)] hover:bg-[var(--sn-surface-muted)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--sn-text-main)]">
                {t.bankMethodTitle}
              </div>
              <div className="text-xs text-[var(--sn-text-muted)]">
                {t.bankMethodDesc}
              </div>
            </div>
          </div>
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border ${
              selectedMethod === "bank_transfer"
                ? "border-[var(--sn-primary)] bg-[var(--sn-primary)] text-white"
                : "border-slate-300 bg-white"
            }`}
          >
            {selectedMethod === "bank_transfer" && (
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            )}
          </div>
        </button>
      </div>

      {/* SSL Gateway Compliance Note */}
      <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-950">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
        <p className="leading-relaxed">{t.sslSecurityNote}</p>
      </div>

      {/* Main Action Button */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          onClick={handlePay}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
        >
          <span>{t.paySecurelyBtn}</span>
          <span>→</span>
        </button>

        <p className="text-center text-[11px] text-[var(--sn-text-muted)]">
          {t.confirmationNotice}
        </p>

        {/* Demo trigger: Test Payment Failure Scenario */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onSimulateFail}
            className="text-[11px] font-semibold text-slate-400 hover:text-rose-600 hover:underline"
          >
            [Demo: Test "Payment did not go through" screen]
          </button>
        </div>
      </div>

      {/* Support and Safety footer */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onWhatsAppHelp}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{t.whatsappSupport}</span>
        </button>
        <p className="mt-1 text-[10px] text-[var(--sn-text-muted)]">
          Sri Lanka National Educational Curriculum Platform • ISO 27001
          Certified Safe
        </p>
      </div>
    </div>
  );
}
