import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { CertificateModal } from "./certificate-modal";
import { DesktopCompletionView } from "./desktop-completion-view";
import { MobileCompletionView } from "./mobile-completion-view";
import { RatingModal } from "./rating-modal";
import { COMPLETION_STRINGS } from "./strings";

export function CourseCompletionScreen() {
  const navigate = useNavigate();
  const [lang, handleLanguageChange] = useSipNenaLanguage();
  const [activeNav, setActiveNav] = useState("courses");
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const t = COMPLETION_STRINGS[lang];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleNavTab = (tab: string) => {
    setActiveNav(tab);
    if (tab === "home") void navigate({ to: "/home" });
    else if (tab === "courses" || tab === "saved")
      void navigate({ to: "/courses" });
    else if (tab === "me" || tab === "profile") void navigate({ to: "/me" });
    else showToast(tab.toUpperCase());
  };

  const handleBack = () => {
    void navigate({ to: "/course" });
  };

  const handleFindNextCourse = () => {
    void navigate({ to: "/courses" });
  };

  return (
    <div className="sipnena-onboarding relative min-h-svh bg-slate-50 text-slate-900 antialiased">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-amber-400"
          />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Mobile View */}
      <div className="block lg:hidden">
        <MobileCompletionView
          lang={lang}
          onLanguageChange={handleLanguageChange}
          strings={t}
          onBack={handleBack}
          onProfileClick={() => handleNavTab("me")}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          onOpenRating={() => setIsRatingOpen(true)}
          onFindNextCourse={handleFindNextCourse}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <DesktopCompletionView
          lang={lang}
          onLanguageChange={handleLanguageChange}
          strings={t}
          activeNav={activeNav}
          onNavTab={handleNavTab}
          onBack={handleBack}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          onOpenRating={() => setIsRatingOpen(true)}
          onFindNextCourse={handleFindNextCourse}
        />
      </div>

      {/* Modals */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        strings={t}
      />

      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        strings={t}
      />
    </div>
  );
}
