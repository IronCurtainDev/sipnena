import { MessageCircle } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import type { LandingStrings } from "./strings.types";

interface LandingFooterProps {
  onLanguageChange: (lang: AppLanguage) => void;
  onWhatsAppHelp: () => void;
  t: LandingStrings;
}

export function LandingFooter({
  onLanguageChange,
  onWhatsAppHelp,
  t,
}: LandingFooterProps) {
  return (
    <footer className="border-t border-[var(--sn-border)] bg-[var(--sn-surface)] py-10 sm:py-12">
      <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-left focus:outline-none"
          >
            <span className="text-sm font-extrabold text-[var(--sn-text-main)] sm:text-base">
              {t.brandName}
            </span>
            <p className="text-[11px] text-[var(--sn-text-muted)]">
              {t.footerTagline}
            </p>
          </button>

          {/* Language selector in footer */}
          <div className="flex items-center gap-3 text-xs font-semibold text-[var(--sn-text-secondary)]">
            <button
              type="button"
              onClick={() => onLanguageChange("si")}
              className="hover:text-[var(--sn-primary)]"
            >
              සිංහල
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onLanguageChange("ta")}
              className="hover:text-[var(--sn-primary)]"
            >
              தமிழ்
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className="hover:text-[var(--sn-primary)]"
            >
              English
            </button>
          </div>
        </div>

        {/* WhatsApp Contact Hotline */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row">
          <button
            type="button"
            onClick={onWhatsAppHelp}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span>{t.whatsappContact}</span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[var(--sn-text-muted)]">
            <span>{t.privacyPolicy}</span>
            <span>•</span>
            <span>{t.termsOfService}</span>
            <span>•</span>
            <span>{t.forTeachers}</span>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-400">
          {t.curriculumAccreditation}
        </p>
      </div>
    </footer>
  );
}
