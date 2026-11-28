import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { DesktopProfileView } from "./desktop-profile-view";
import { GradeDialog } from "./grade-dialog";
import { MobileProfileView } from "./mobile-profile-view";
import { PasswordDialog } from "./password-dialog";
import { ReceiptsDialog } from "./receipts-dialog";
import { PROFILE_STRINGS } from "./strings";

export function SipNenaProfileScreen() {
  const navigate = useNavigate();
  const [lang, handleLanguageChange] = useSipNenaLanguage();
  const [avatarId, setAvatarId] = useState<string>("student");
  const [currentGrade, setCurrentGrade] = useState<string>("8");
  const [activeNavTab, setActiveNavTab] = useState<string>("me");

  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isReceiptsOpen, setIsReceiptsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const t = PROFILE_STRINGS[lang];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSelectAvatar = (id: string) => {
    setAvatarId(id);
    showToast(`Avatar updated! 🌟`);
  };

  const handleNavTab = (tab: string) => {
    setActiveNavTab(tab);
    if (tab === "home") void navigate({ to: "/home" });
    else if (tab === "courses") void navigate({ to: "/courses" });
    else if (tab === "saved") void navigate({ to: "/saved" });
    else if (tab === "me") void navigate({ to: "/me" });
    else showToast(`${tab.toUpperCase()}`);
  };

  const handleLogout = () => {
    showToast("Signed out. Returning to home...");
    setTimeout(() => {
      void navigate({ to: "/home" });
    }, 1000);
  };

  const handleDownloadReceipt = (courseTitle: string) => {
    showToast(`Downloaded receipt for: ${courseTitle}`);
  };

  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/94771234567", "_blank");
  };

  return (
    <div className="sipnena-onboarding relative min-h-svh bg-[var(--sn-page-bg)] text-[var(--sn-text-main)] antialiased">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in duration-200">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--sn-primary)]"
          />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Mobile View (< 640px) */}
      <div className="block sm:hidden">
        <MobileProfileView
          lang={lang}
          onLanguageChange={handleLanguageChange}
          strings={t}
          avatarId={avatarId}
          onSelectAvatar={handleSelectAvatar}
          currentGrade={currentGrade}
          onOpenGradeDialog={() => setIsGradeOpen(true)}
          onOpenPasswordDialog={() => setIsPasswordOpen(true)}
          onOpenReceiptsDialog={() => setIsReceiptsOpen(true)}
          onOpenHelpDialog={handleOpenWhatsApp}
          onLogout={handleLogout}
          activeNavTab={activeNavTab}
          onNavTab={handleNavTab}
        />
      </div>

      {/* Tablet & Desktop View (>= 640px) */}
      <div className="hidden sm:block">
        <DesktopProfileView
          lang={lang}
          onLanguageChange={handleLanguageChange}
          strings={t}
          avatarId={avatarId}
          onSelectAvatar={handleSelectAvatar}
          currentGrade={currentGrade}
          onOpenGradeDialog={() => setIsGradeOpen(true)}
          onOpenPasswordDialog={() => setIsPasswordOpen(true)}
          onOpenReceiptsDialog={() => setIsReceiptsOpen(true)}
          onDownloadReceipt={handleDownloadReceipt}
          onOpenWhatsApp={handleOpenWhatsApp}
          onLogout={handleLogout}
          activeNavTab={activeNavTab}
          onNavTab={handleNavTab}
        />
      </div>

      {/* Modals */}
      <GradeDialog
        isOpen={isGradeOpen}
        onClose={() => setIsGradeOpen(false)}
        currentGrade={currentGrade}
        onSelectGrade={(g) => {
          setCurrentGrade(g);
          showToast(`Grade updated to Grade ${g}`);
        }}
        strings={t}
      />

      <PasswordDialog
        isOpen={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
        strings={t}
        onSuccessToast={showToast}
      />

      <ReceiptsDialog
        isOpen={isReceiptsOpen}
        onClose={() => setIsReceiptsOpen(false)}
        strings={t}
        onDownloadReceipt={handleDownloadReceipt}
      />
    </div>
  );
}
