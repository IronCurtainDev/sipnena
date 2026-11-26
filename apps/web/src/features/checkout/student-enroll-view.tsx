import {
  Copy,
  FileText,
  HelpCircle,
  Play,
  Share2,
  ShieldCheck,
  UserCheck,
  Video,
} from "lucide-react";
import type { EnrollmentCourseInfo } from "./types";
import type { CheckoutStrings } from "./strings.types";

interface StudentEnrollViewProps {
  course: EnrollmentCourseInfo;
  t: CheckoutStrings;
  onSendToParent: () => void;
  onCopyLink: () => void;
  onWatchPreviews: () => void;
  onOpenParentPortal: () => void;
}

export function StudentEnrollView({
  course,
  t,
  onSendToParent,
  onCopyLink,
  onWatchPreviews,
  onOpenParentPortal,
}: StudentEnrollViewProps) {
  return (
    <div className="mx-auto w-full px-4 py-5 sm:px-6 sm:py-6 xl:px-8">
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.95fr)] xl:grid-cols-[minmax(0,1.4fr)_minmax(420px,1fr)]">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sn-border)] bg-[var(--sn-olive)] px-3 py-1 text-sm font-semibold text-[var(--sn-primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--sn-primary)]" />
              <span>{course.gradeBadge}</span>
            </span>
            <span className="rounded-full bg-[var(--sn-surface-muted)] px-2.5 py-0.5 text-sm font-bold text-[var(--sn-text-secondary)]">
              {course.unitBadge}
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)]">
            <div className="flex items-center justify-center bg-[var(--sn-olive)]/80 px-6 py-8">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] shadow-sm">
                <svg
                  viewBox="0 0 64 64"
                  className="h-16 w-16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect width="64" height="64" rx="16" fill="#E9EDC9" />
                  <path
                    d="M24 16h16v8l8 24H16l8-24v-8z"
                    stroke="#01472E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 40h24M22 34h20"
                    stroke="#A3B18A"
                    strokeWidth="2"
                    strokeDasharray="2 3"
                  />
                  <circle cx="28" cy="42" r="2" fill="#01472E" />
                  <circle cx="36" cy="44" r="1.5" fill="#01472E" />
                </svg>
              </div>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-bold leading-normal text-[var(--sn-text-main)] sm:text-2xl">
                  {course.title}
                </h2>
                <p className="mt-1 text-base text-[var(--sn-text-secondary)]">
                  <span className="font-semibold">{course.teacher}</span>
                  <span className="text-[var(--sn-text-muted)]">
                    {" "}
                    · {course.teacherRole}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-4">
                <div>
                  <span className="block text-sm font-bold text-[var(--sn-text-muted)]">
                    {t.totalCourseFee}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[var(--sn-text-main)]">
                      Rs. {course.feeAmount.toLocaleString()}
                    </span>
                    <span className="text-sm text-[var(--sn-text-muted)] line-through">
                      Rs. {course.originalFeeAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-sm font-bold text-[var(--sn-primary)]">
                    {t.oneTimePayment}
                  </span>
                  <p className="mt-1 text-sm text-[var(--sn-text-muted)]">
                    {t.lifetimeAccess}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--sn-text-muted)]">
                  {t.whatsIncludedTitle}
                </h3>
                <ul className="mt-3 space-y-3">
                  {course.whatsIncluded.map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)]">
                        {item.icon === "video" && <Video className="h-4 w-4" />}
                        {item.icon === "test" && (
                          <HelpCircle className="h-4 w-4" />
                        )}
                        {item.icon === "pdf" && <FileText className="h-4 w-4" />}
                      </div>
                      <span className="pt-2 text-base font-medium leading-normal text-[var(--sn-text-main)]">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-5 lg:h-[calc(100svh-2.5rem)] lg:overflow-y-auto">
          <div className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5">
            <div className="rounded-xl border border-[#9A3412]/25 bg-[#FFF7ED] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-primary)] text-[var(--sn-cream)]">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold leading-normal text-[var(--sn-text-main)]">
                    {t.parentPayTitle}
                  </h3>
                  <p className="text-sm leading-normal text-[var(--sn-text-secondary)]">
                    {t.parentPayDesc}
                  </p>
                  <p className="pt-1 text-sm font-medium text-[var(--sn-text-main)]">
                    {t.supportedMethodsLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={onSendToParent}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] text-base font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
              >
                <Share2 className="h-5 w-5" />
                <span>{t.sendToParentBtn}</span>
              </button>

              <button
                type="button"
                onClick={onCopyLink}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] text-sm font-bold text-[var(--sn-text-main)] transition hover:bg-[var(--sn-olive)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
              >
                <Copy className="h-4 w-4 text-[var(--sn-text-muted)]" />
                <span>{t.copyEnrollmentLinkBtn}</span>
              </button>

              <button
                type="button"
                onClick={onOpenParentPortal}
                className="w-full py-2 text-center text-sm font-semibold text-[var(--sn-primary)] hover:underline"
              >
                {t.parentPortalBanner} →
              </button>

              <button
                type="button"
                onClick={onWatchPreviews}
                className="inline-flex w-full items-center justify-center gap-1.5 py-2 text-sm font-bold text-[var(--sn-primary)] transition hover:underline"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>{t.watchFreePreviewsBtn}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)]/60 p-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-bold text-[var(--sn-primary)]">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                {t.childSafeBadge}
              </span>
              <span>·</span>
              <span>{t.registeredTeacherBadge}</span>
              <span>·</span>
              <span>{t.noAutoDeductionBadge}</span>
            </div>
            <p className="text-sm text-[var(--sn-text-muted)]">
              {t.calmStudyNote}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
