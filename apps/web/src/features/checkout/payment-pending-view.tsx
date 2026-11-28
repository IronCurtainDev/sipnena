import {
  ArrowRight,
  Clock,
  Copy,
  FileUp,
  Lightbulb,
  MessageCircle,
  Play,
} from "lucide-react";
import type {
  EnrollmentCourseInfo,
  ReceiptInfo,
  StudentProfileInfo,
} from "./types";
import type { CheckoutStrings } from "./strings.types";

interface PaymentPendingViewProps {
  course: EnrollmentCourseInfo;
  student: StudentProfileInfo;
  receipt: ReceiptInfo;
  t: CheckoutStrings;
  onGoToCourses: () => void;
  onWatchPreviews: () => void;
  onReUploadSlip: () => void;
  onCopyRef: () => void;
  onWhatsAppHelp: () => void;
}

export function PaymentPendingView({
  course,
  student,
  receipt,
  t,
  onGoToCourses,
  onWatchPreviews,
  onReUploadSlip,
  onCopyRef,
  onWhatsAppHelp,
}: PaymentPendingViewProps) {
  return (
    <div className="mx-auto w-full max-w-lg space-y-4 px-4 py-5 sm:py-6">
      {/* Pending Verification Banner */}
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/80 p-2.5 text-xs font-semibold text-[var(--sn-text-main)]">
        <Clock className="h-4 w-4 text-[var(--sn-primary)]" />
        <span>{t.checkingPaymentBadge}</span>
      </div>

      {/* Clock Icon & Headline */}
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 ring-8 ring-amber-50">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
            <Clock className="h-8 w-8 stroke-[2.5]" />
          </div>
        </div>

        <h2 className="mt-4 text-2xl font-extrabold text-[var(--sn-text-main)] sm:text-3xl">
          {t.checkingPaymentTitle}
        </h2>
        <p className="mt-1 text-xs font-semibold text-amber-800">
          {t.checkingPaymentSub}
        </p>
        <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[var(--sn-text-secondary)]">
          {t.checkingPaymentDesc}
        </p>
      </div>

      {/* Start Studying Without Waiting Card */}
      <div className="rounded-2xl border border-amber-200/90 bg-amber-50/70 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-amber-950">
              {t.startStudyingTipTitle}
            </h4>
            <p className="leading-relaxed text-amber-900/90">
              {t.startStudyingTipDesc}
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onWatchPreviews}
                className="inline-flex items-center gap-1.5 font-bold text-amber-900 underline hover:text-amber-950"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>{t.watchFreePreviewsBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Overview Card */}
      <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold tracking-wider text-[var(--sn-text-muted)] uppercase">
            {t.receiptOverviewTitle}
          </span>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
            {t.underReviewBadge}
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
            <dt className="text-[var(--sn-text-muted)]">Enrolled Course</dt>
            <dd className="max-w-[200px] truncate text-right font-medium text-[var(--sn-text-main)]">
              {course.title}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">{t.amountPaidLabel}</dt>
            <dd className="font-extrabold text-[var(--sn-text-main)]">
              Rs. {receipt.amount.toLocaleString()}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--sn-text-muted)]">
              {t.paymentMethodLabel}
            </dt>
            <dd className="text-right text-[var(--sn-text-main)]">
              BOC / Commercial Bank Transfer
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-[var(--sn-text-muted)]">
              {t.referenceCodeLabel}
            </dt>
            <dd className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800">
              <span>{receipt.referenceCode}</span>
              <button
                type="button"
                onClick={onCopyRef}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Copy reference"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </dd>
          </div>
        </dl>
      </div>

      {/* Need to update slip box */}
      <div className="flex items-center justify-between rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <FileUp className="h-5 w-5 text-[var(--sn-primary)]" />
          <div className="text-xs">
            <div className="font-bold text-[var(--sn-text-main)]">
              Need to update bank slip?
            </div>
            <div className="text-xs text-[var(--sn-text-muted)]">
              Blurry or partial photo uploaded?
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onReUploadSlip}
          className="rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)] px-3 py-1.5 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-sage)]"
        >
          {t.reUploadBtn}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGoToCourses}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99]"
        >
          <span>{t.goToMyCoursesBtn}</span>
          <ArrowRight className="h-4 w-4" />
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
          <span>{t.whatsappSupport} • Free hotline</span>
        </button>
        <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
          National Educational Curriculum Platform • Sri Lanka
        </p>
      </div>
    </div>
  );
}
