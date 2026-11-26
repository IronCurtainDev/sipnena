import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Info,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import type { EnrollmentCourseInfo, StudentProfileInfo } from "./types";
import type { CheckoutStrings } from "./strings.types";

interface PaymentFailedViewProps {
  course: EnrollmentCourseInfo;
  student: StudentProfileInfo;
  t: CheckoutStrings;
  onTryAgain: () => void;
  onChooseOtherMethod: () => void;
  onWhatsAppHelp: () => void;
}

export function PaymentFailedView({
  course,
  student,
  t,
  onTryAgain,
  onChooseOtherMethod,
  onWhatsAppHelp,
}: PaymentFailedViewProps) {
  return (
    <div className="mx-auto w-full max-w-lg space-y-4 px-4 py-5 sm:py-6">
      {/* Transaction Notice Banner */}
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-amber-200/90 bg-amber-50/80 p-2.5 text-xs font-semibold text-amber-800">
        <Info className="h-4 w-4 text-amber-600" />
        <span>{t.paymentFailedNotice}</span>
      </div>

      {/* Warning Icon & Headline */}
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 ring-8 ring-amber-50">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
            <AlertTriangle className="h-8 w-8 stroke-[2.5]" />
          </div>
        </div>

        <h2 className="mt-4 text-2xl font-extrabold text-[var(--sn-text-main)] sm:text-3xl">
          {t.paymentFailedTitle}
        </h2>
        <p className="mt-1 text-xs font-semibold text-amber-800">
          {t.paymentFailedSub}
        </p>
        <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[var(--sn-text-secondary)]">
          {t.paymentFailedDesc}
        </p>
      </div>

      {/* Seat Reserved Reassurance Card */}
      <div className="flex items-start gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/70 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-primary)] text-white">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="space-y-0.5 text-xs">
          <h4 className="font-bold text-[var(--sn-text-main)]">
            {t.seatReservedTitle}
          </h4>
          <p className="leading-relaxed text-[var(--sn-text-main)]/90">
            Your student enrollment is safely held. {student.name.split(" ")[0]}{" "}
            won&apos;t lose their place in this batch while you retry.
          </p>
        </div>
      </div>

      {/* Target Module Row */}
      <div className="flex items-center justify-between rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-1.5 rounded-full bg-emerald-500" />
          <div>
            <span className="block text-[11px] font-bold text-[var(--sn-text-muted)] uppercase">
              Target Module
            </span>
            <span className="text-xs font-bold text-[var(--sn-text-main)] sm:text-sm">
              {course.title}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm font-extrabold text-[var(--sn-text-main)]">
            Rs. {course.feeAmount.toLocaleString()}
          </span>
          <span className="block text-[11px] font-semibold text-emerald-700">
            0.00 charged
          </span>
        </div>
      </div>

      {/* Helpful Checklist Before Retrying */}
      <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
        <h3 className="text-xs font-bold tracking-wider text-[var(--sn-text-muted)] uppercase">
          {t.helpfulChecklistTitle}
        </h3>
        <ul className="mt-3.5 space-y-2.5 text-xs">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <span className="text-[var(--sn-text-secondary)]">
              {t.checkItemOtp}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <span className="text-[var(--sn-text-secondary)]">
              {t.checkItemLimit}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <span className="text-[var(--sn-text-secondary)]">
              {t.checkItemAlternative}
            </span>
          </li>
        </ul>

        {/* Bank transfer slip accepted notice */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Building2 className="h-4 w-4 text-emerald-600" />
            <span>Bank transfer slip upload accepted</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
            Supported
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <button
          type="button"
          onClick={onTryAgain}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
        >
          <RefreshCw className="h-4 w-4" />
          <span>{t.tryAgainBtn}</span>
        </button>

        <button
          type="button"
          onClick={onChooseOtherMethod}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] py-3 text-xs font-bold text-[var(--sn-text-main)] shadow-2xs transition hover:bg-[var(--sn-surface-muted)]"
        >
          <span>{t.chooseOtherMethodBtn}</span>
        </button>
      </div>

      {/* Support footer */}
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
          Available 8:00 AM – 8:00 PM (Mon–Sat)
        </p>
      </div>
    </div>
  );
}
