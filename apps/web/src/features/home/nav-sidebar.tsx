import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  HelpCircle,
  MessageCircleQuestion,
  Radio,
  Search,
} from "lucide-react";
import type { LocalizedText } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import { NAV_ITEMS } from "./mock-data";
import { HOME_STRINGS } from "./strings";

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  lang: AppLanguage;
}

const EXPLORE_HEADER: LocalizedText = {
  en: "Exam Prep & Tools",
  si: "විභාග සූදානම සහ මෙවලම්",
  ta: "பரீட்சை & கருவிகள்",
};

const EXPLORE_LINKS: Array<{
  to: string;
  label: LocalizedText;
  icon: typeof FileCheck2;
}> = [
  {
    to: "/past-papers",
    label: {
      en: "Past Papers",
      si: "පසුගිය ප්‍රශ්න පත්‍ර",
      ta: "கடந்த வினாத்தாள்கள்",
    },
    icon: FileCheck2,
  },
  {
    to: "/term-tests",
    label: { en: "Term Tests", si: "වාර විභාග", ta: "தவணைப் பரீட்சைகள்" },
    icon: FileSpreadsheet,
  },
  {
    to: "/notes",
    label: { en: "Tutes & Notes", si: "ටියුට් සහ සටහන්", ta: "குறிப்புகள்" },
    icon: FileText,
  },
  {
    to: "/live",
    label: { en: "Live Classes", si: "සජීවී පන්ති", ta: "நேரலை வகுப்புகள்" },
    icon: Radio,
  },
  {
    to: "/schedule",
    label: { en: "Timetable", si: "කාලසටහන", ta: "நேர அட்டவணை" },
    icon: Calendar,
  },
  {
    to: "/doubts",
    label: { en: "Ask Doubts", si: "ප්‍රශ්න අහන්න", ta: "சந்தேகங்கள்" },
    icon: MessageCircleQuestion,
  },
  {
    to: "/progress",
    label: {
      en: "Progress & Mistakes",
      si: "ප්‍රගතිය සහ වැරදි",
      ta: "முன்னேற்றம்",
    },
    icon: BarChart3,
  },
  {
    to: "/downloads",
    label: { en: "Downloads & Data", si: "බාගැනීම්", ta: "பதிவிறக்கம்" },
    icon: Download,
  },
  {
    to: "/billing",
    label: { en: "Class Cards", si: "පන්ති කාඩ්පත්", ta: "வகுப்பு அட்டைகள்" },
    icon: CreditCard,
  },
  {
    to: "/search",
    label: { en: "Search", si: "සොයන්න", ta: "தேடுக" },
    icon: Search,
  },
  {
    to: "/notifications",
    label: { en: "Alerts", si: "දැනුම්දීම්", ta: "அறிவிப்புகள்" },
    icon: Bell,
  },
  {
    to: "/help",
    label: { en: "Help & Legal", si: "උදව් සහ නීති", ta: "உதவி & கொள்கை" },
    icon: HelpCircle,
  },
];

export function DesktopSidebar({
  activeTab,
  onTabChange,
  lang,
}: DesktopSidebarProps) {
  const t = HOME_STRINGS[lang];

  return (
    <aside
      aria-label="Primary desktop navigation"
      className="sticky top-0 hidden h-svh w-[280px] shrink-0 flex-col justify-between overflow-y-auto border-r border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:flex"
    >
      <div className="space-y-5">
        <div className="px-2 pt-2">
          <div className="truncate text-lg font-black leading-tight text-[var(--sn-text-main)]">
            {lang === "si" ? "සිප්නැණ" : lang === "ta" ? "சிப்நென" : "SipNena"}
          </div>
          <div className="truncate text-xs font-medium text-[var(--sn-text-muted)]">
            {t.brandSubtitle}
          </div>
        </div>

        <nav className="space-y-1" aria-label="Main menu">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-[46px] w-full items-center gap-3 rounded-xl px-4 text-left text-sm font-bold leading-normal transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                  isActive
                    ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                    : "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)] active:scale-[0.99]"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1 leading-normal">
                  {t[item.labelKey]}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-[var(--sn-border)] pt-3">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[var(--sn-text-muted)]">
            {EXPLORE_HEADER[lang]}
          </p>
          {EXPLORE_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="flex min-h-[38px] items-center gap-2.5 rounded-xl px-3 text-xs font-bold text-[var(--sn-text-secondary)] transition hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)]"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{link.label[lang]}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-4 space-y-1.5 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-selected)] p-4">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--sn-primary)]">
            <GraduationCap className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{t.examFocusTitle}</span>
          </div>
          <span className="rounded-full bg-[var(--sn-primary)] px-2.5 py-0.5 text-[10px] font-bold text-white">
            {t.termBadge}
          </span>
        </div>
        <p className="text-xs font-medium leading-relaxed text-[var(--sn-text-secondary)] sm:text-sm">
          {t.examFocusDesc}
        </p>
      </div>
    </aside>
  );
}
