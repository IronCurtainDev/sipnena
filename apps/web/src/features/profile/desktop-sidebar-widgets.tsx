import React from "react";
import {
  CheckCircle2,
  Download,
  KeyRound,
  LogOut,
  MessageCircle,
  Receipt,
} from "lucide-react";
import { STUDENT_RECEIPTS } from "./mock-data";
import type { ProfileStrings } from "./strings.types";

interface DesktopSidebarWidgetsProps {
  strings: ProfileStrings;
  onOpenPasswordDialog: () => void;
  onOpenReceiptsDialog: () => void;
  onDownloadReceipt: (title: string) => void;
  onOpenWhatsApp: () => void;
  onLogout: () => void;
}

export function DesktopSidebarWidgets({
  strings,
  onOpenPasswordDialog,
  onOpenReceiptsDialog,
  onDownloadReceipt,
  onOpenWhatsApp,
  onLogout,
}: DesktopSidebarWidgetsProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-[var(--sn-primary)]" />
          <h3 className="text-sm font-bold leading-normal text-[var(--sn-text-main)] sm:text-base">
            {strings.accountSecurityTitle}
          </h3>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2 rounded-xl bg-[var(--sn-surface-muted)] p-3">
            <div className="min-w-0">
              <p className="text-sm font-bold text-[var(--sn-text-main)]">
                {strings.settingPasswordTitle}
              </p>
              <p className="text-xs text-[var(--sn-text-muted)]">
                {strings.settingPasswordSub}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenPasswordDialog}
              className="shrink-0 text-xs font-bold text-[var(--sn-primary)] hover:underline"
            >
              {strings.updatePasswordBtn}
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 rounded-xl bg-[var(--sn-surface-muted)] p-3">
            <div className="min-w-0">
              <p className="text-sm font-bold text-[var(--sn-text-main)]">
                {strings.parentEmailLabel}
              </p>
              <p className="truncate text-xs text-[var(--sn-text-muted)]">
                {strings.parentEmailValue}
              </p>
            </div>
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--sn-primary)]" />
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onOpenReceiptsDialog}
            className="flex items-center gap-2 transition hover:opacity-80"
          >
            <Receipt className="h-5 w-5 text-[var(--sn-primary)]" />
            <h3 className="text-sm font-bold leading-normal text-[var(--sn-text-main)] sm:text-base">
              {strings.receiptsCardTitle}
            </h3>
          </button>
          <button
            type="button"
            onClick={onOpenReceiptsDialog}
            className="rounded-full bg-[var(--sn-surface-selected)] px-2 py-0.5 text-xs font-bold text-[var(--sn-primary)]"
          >
            {strings.receiptsPaidBadge}
          </button>
        </div>

        <div className="space-y-2">
          {STUDENT_RECEIPTS.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[var(--sn-text-main)]">
                  {r.courseTitle}
                </p>
                <p className="text-xs text-[var(--sn-text-muted)]">
                  {r.amount} · {r.packName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onDownloadReceipt(r.courseTitle)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--sn-border)] bg-[var(--sn-surface)] text-[var(--sn-text-main)] hover:bg-[var(--sn-olive)]"
                aria-label={strings.receiptsCardTitle}
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        <p className="text-xs text-[var(--sn-text-muted)]">
          {strings.receiptPaidParentNote}
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[var(--sn-primary)]">
          <MessageCircle className="h-4 w-4" />
          <span>{strings.needHelpTitle}</span>
        </div>
        <p className="text-sm leading-normal text-[var(--sn-text-secondary)]">
          {strings.needHelpDesc}
        </p>
        <button
          type="button"
          onClick={onOpenWhatsApp}
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] text-sm font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)]"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{strings.whatsappAdvisorBtn}</span>
        </button>
        <p className="text-xs text-[var(--sn-text-muted)]">
          {strings.ministryComplianceNote}
        </p>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] text-sm font-bold text-[var(--sn-text-main)] transition hover:bg-[var(--sn-olive)]"
      >
        <LogOut className="h-4 w-4" />
        <span>{strings.logoutBtnDesktop}</span>
      </button>

      <p className="text-center text-xs text-[var(--sn-text-muted)]">
        {strings.footerVersion}
      </p>
    </div>
  );
}
