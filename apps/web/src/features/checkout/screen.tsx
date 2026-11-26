import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { BankSlipModal } from "./bank-slip-modal";
import { CheckoutTopBar } from "./checkout-top-bar";
import {
  MOCK_ENROLLMENT_COURSE,
  MOCK_INITIAL_RECEIPT,
  MOCK_STUDENT_PROFILE,
} from "./mock-data";
import { ParentApprovalPortalView } from "./parent-approval-portal-view";
import { PaymentFailedView } from "./payment-failed-view";
import { PaymentPendingView } from "./payment-pending-view";
import { PaymentSuccessView } from "./payment-success-view";
import { CHECKOUT_STRINGS } from "./strings";
import { StudentEnrollView } from "./student-enroll-view";
import type { CheckoutViewMode, ReceiptInfo } from "./types";

export function SipNenaCheckoutScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<AppLanguage>(getSavedLanguage);
  const [viewMode, setViewMode] = useState<CheckoutViewMode>(() => {
    if (typeof window === "undefined") return "student_intro";
    const mode = new URLSearchParams(window.location.search).get("mode");
    if (mode === "parent_pay") return "parent_pay";
    if (mode === "payment_failed") return "payment_failed";
    if (mode === "payment_success") return "payment_success";
    if (mode === "payment_pending") return "payment_pending";
    return "student_intro";
  });
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptInfo>(MOCK_INITIAL_RECEIPT);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const t = CHECKOUT_STRINGS[lang];
  const course = MOCK_ENROLLMENT_COURSE;
  const student = MOCK_STUDENT_PROFILE;

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<AppLanguage>;
      if (customEvent.detail) setLang(customEvent.detail);
    };
    window.addEventListener("sipnena_language_change", handleSync);
    return () =>
      window.removeEventListener("sipnena_language_change", handleSync);
  }, []);

  const handleLanguageChange = (nextLang: AppLanguage) => {
    setLang(nextLang);
    saveLanguage(nextLang);
  };

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    const timer = setTimeout(() => setToastMsg(null), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    if (viewMode === "student_intro") {
      void navigate({ to: "/course" });
    } else {
      setViewMode("student_intro");
    }
  };

  const handleSendToParent = () => {
    showToast(t.shareParentToast);
    setTimeout(() => setViewMode("parent_pay"), 800);
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(
        `${window.location.origin}/checkout?mode=parent_pay`,
      );
    }
    showToast(t.linkCopiedToast);
  };

  const handlePayCard = () => {
    setReceipt((prev) => ({
      ...prev,
      paymentMethodName: "Visa / Mastercard",
      receiptNumber: `TN-PAY-${Math.floor(100000 + Math.random() * 900000)}`,
    }));
    setViewMode("payment_success");
  };

  const handleSubmitSlip = (bankName: string, ref: string) => {
    setReceipt((prev) => ({
      ...prev,
      paymentMethodName: `${bankName} (Slip)`,
      referenceCode:
        ref || `TN-REF-${Math.floor(10000 + Math.random() * 90000)}`,
    }));
    showToast(t.slipUploadedToast);
    setViewMode("payment_pending");
  };

  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/94771234567", "_blank");
  };

  return (
    <div className="sipnena-onboarding relative min-h-svh bg-[var(--sn-page-bg)] text-[var(--sn-text-main)] antialiased">
      <CheckoutTopBar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onBack={handleBack}
        onProfileClick={() => void navigate({ to: "/me" })}
        t={t}
      />

      <main className="pb-10">
        {viewMode === "student_intro" && (
          <StudentEnrollView
            course={course}
            t={t}
            onSendToParent={handleSendToParent}
            onCopyLink={handleCopyLink}
            onWatchPreviews={() => void navigate({ to: "/lesson" })}
            onOpenParentPortal={() => setViewMode("parent_pay")}
          />
        )}

        {viewMode === "parent_pay" && (
          <ParentApprovalPortalView
            course={course}
            student={student}
            t={t}
            onPayCard={handlePayCard}
            onPayBankTransfer={() => setIsSlipModalOpen(true)}
            onSimulateFail={() => setViewMode("payment_failed")}
            onWhatsAppHelp={handleOpenWhatsApp}
          />
        )}

        {viewMode === "payment_failed" && (
          <PaymentFailedView
            course={course}
            student={student}
            t={t}
            onTryAgain={() => setViewMode("parent_pay")}
            onChooseOtherMethod={() => setViewMode("parent_pay")}
            onWhatsAppHelp={handleOpenWhatsApp}
          />
        )}

        {viewMode === "payment_success" && (
          <PaymentSuccessView
            course={course}
            student={student}
            receipt={receipt}
            t={t}
            onOpenCourse={() => void navigate({ to: "/lesson" })}
            onDownloadReceipt={() =>
              showToast("Downloading official PDF receipt...")
            }
            onWhatsAppHelp={handleOpenWhatsApp}
          />
        )}

        {viewMode === "payment_pending" && (
          <PaymentPendingView
            course={course}
            student={student}
            receipt={receipt}
            t={t}
            onGoToCourses={() => void navigate({ to: "/courses" })}
            onWatchPreviews={() => void navigate({ to: "/lesson" })}
            onReUploadSlip={() => setIsSlipModalOpen(true)}
            onCopyRef={() => {
              if (navigator.clipboard)
                void navigator.clipboard.writeText(receipt.referenceCode);
              showToast("Reference code copied!");
            }}
            onWhatsAppHelp={handleOpenWhatsApp}
          />
        )}
      </main>

      <BankSlipModal
        isOpen={isSlipModalOpen}
        onClose={() => setIsSlipModalOpen(false)}
        onSubmitSlip={handleSubmitSlip}
      />

      {toastMsg && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-4 z-50 flex max-w-sm items-center gap-2 rounded-2xl bg-[var(--sn-text-main)] px-4 py-3 text-xs font-semibold text-white shadow-xl sm:right-6"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--sn-primary)]" />
          <span>{toastMsg}</span>
        </aside>
      )}
    </div>
  );
}
