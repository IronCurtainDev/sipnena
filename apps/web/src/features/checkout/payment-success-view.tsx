import {
  ArrowRight,
  BookOpen,
  Check,
  Download,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import type {
  EnrollmentCourseInfo,
  ReceiptInfo,
  StudentProfileInfo,
} from "./types";
import type { CheckoutStrings } from "./strings.types";

interface PaymentSuccessViewProps {
  course: EnrollmentCourseInfo;
  student: StudentProfileInfo;
  receipt: ReceiptInfo;
  t: CheckoutStrings;
  onOpenCourse: () => void;
  onDownloadReceipt: () => void;
  onWhatsAppHelp: () => void;
}

export function PaymentSuccessView({
  course,
  student,
  receipt,
  t,
  onOpenCourse,
  onDownloadReceipt,
  onWhatsAppHelp,
}: PaymentSuccessViewProps) {
  return (
    <div className="mx-auto w-full max-w-lg space-y-4 px-4 py-5 sm:py-6">
      {/* Official Receipt Pill */}
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-200/90 bg-emerald-50/80 p-2.5 text-xs font-semibold text-emerald-800">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        <span>{t.paymentReceivedBadge}</span>
      </div>

      {/* Success Badge & Headline */}
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
            <Check className="h-8 w-8 stroke-[3]" />
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[var(--sn-primary)] shadow-xs">
              <BookOpen className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        <h2 className="mt-4 text-2xl font-extrabold text-[var(--sn-text-main)] sm:text-3xl">
          {t.paymentReceivedTitle}
        </h2>
        <p className="mt-1 text-xs font-semibold text-emerald-700">
          {t.paymentReceivedSub}
        </p>
        <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[var(--sn-text-secondary)]">
          Thank you!{" "}
          <strong className="text-[var(--sn-text-main)]">{student.name}</strong>{" "}
          is now enrolled with full lifetime access to{" "}
          <span className="font-semibold">{course.title}</span>.
        </p>
      </div>

      {/* Receipt Card */}
      <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-[var(--sn-text-muted)] uppercase">
              {t.courseEnrollmentLabel}
            </span>
            <h4 className="text-sm font-bold text-[var(--sn-text-main)]">
              {course.title}
            </h4>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
            Active
          </span>
        </div>

        <dl className="mt-3.5 space-y-2.5 text-xs">
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">
              {t.studentNameLabel}
            </dt>
            <dd className="font-bold text-[var(--sn-text-main)]">
              {student.name} ({student.grade})
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">{t.amountPaidLabel}</dt>
            <dd className="font-extrabold text-[var(--sn-text-main)]">
              Rs. {receipt.amount.toLocaleString()}{" "}
              <span className="font-normal text-[var(--sn-text-muted)]">
                ({t.oneTimePayment})
              </span>
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">
              {t.paymentMethodLabel}
            </dt>
            <dd className="font-medium text-[var(--sn-text-main)]">
              {receipt.paymentMethodName}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">
              {t.receiptNumberLabel}
            </dt>
            <dd className="font-mono text-xs font-bold text-slate-700">
              {receipt.receiptNumber}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">{t.dateTimeLabel}</dt>
            <dd className="text-[var(--sn-text-secondary)]">
              {receipt.date}, {receipt.time}
            </dd>
          </div>
        </dl>
      </div>

      {/* Dispatched Notification Card */}
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200/90 bg-emerald-50/70 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div className="space-y-0.5 text-xs">
          <h4 className="font-bold text-emerald-950">
            {t.smsReceiptDispatchedTitle}
          </h4>
          <p className="leading-relaxed text-emerald-900/90">
            Sent to {student.phoneMasked} with {student.name.split(" ")[0]}
            &apos;s instant portal login and lesson unlock credentials.
          </p>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <button
          type="button"
          onClick={onOpenCourse}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
        >
          <span>{t.openCourseBtn}</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onDownloadReceipt}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] py-3 text-xs font-bold text-[var(--sn-text-main)] shadow-2xs transition hover:bg-[var(--sn-surface-muted)]"
        >
          <Download className="h-4 w-4 text-[var(--sn-text-muted)]" />
          <span>{t.downloadPdfReceiptBtn}</span>
        </button>
      </div>

      {/* Footer Support */}
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
          Sri Lanka National Educational Curriculum Platform • MoE Aligned
        </p>
      </div>
    </div>
  );
}
