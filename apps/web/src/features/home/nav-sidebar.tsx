import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { HOME_STRINGS } from "./strings";
import {
  BookOpen,
  ClipboardList,
  FileCheck2,
  Home,
  Radio,
  User,
} from "lucide-react";

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  lang: AppLanguage;
}

const TOP_LINKS = [
  {
    id: "home",
    to: "/home",
    icon: Home,
    label: { en: "Today", si: "අද", ta: "இன்று" },
  },
  {
    id: "courses",
    to: "/courses",
    icon: BookOpen,
    label: { en: "Subjects", si: "විෂයන්", ta: "பாடங்கள்" },
  },
  {
    id: "exam-prep",
    to: "/exam-prep",
    icon: FileCheck2,
    label: { en: "Exam prep", si: "විභාග සූදානම", ta: "பரீட்சை" },
  },
  {
    id: "assignments",
    to: "/assignments",
    icon: ClipboardList,
    label: { en: "Assignments", si: "පැවරුම්", ta: "ஒப்படைப்புகள்" },
  },
  {
    id: "live-ask",
    to: "/live-ask",
    icon: Radio,
    label: { en: "Live & Ask", si: "සජීවී සහ ප්‍රශ්න", ta: "நேரலை & கேள்வி" },
  },
  {
    id: "me",
    to: "/me",
    icon: User,
    label: { en: "Me", si: "මම", ta: "நான்" },
  },
] as const;

export function DesktopSidebar({ activeTab, lang }: DesktopSidebarProps) {
  const t = HOME_STRINGS[lang];

  return (
    <aside
      aria-label="Primary desktop navigation"
      className="sticky top-0 hidden h-svh w-[260px] shrink-0 flex-col justify-between overflow-y-auto border-r border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 lg:flex"
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

        <nav className="space-y-1.5" aria-label="Main menu">
          {TOP_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                to={item.to}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-[46px] w-full items-center gap-3 rounded-xl px-4 text-left text-sm font-bold leading-normal transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                  isActive
                    ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                    : "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)]"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1 leading-normal">
                  {item.label[lang]}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-4 space-y-1.5 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-selected)] p-4">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--sn-primary)]">
            <GraduationCap className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{t.examFocusTitle}</span>
          </div>
          <span className="rounded-full bg-[var(--sn-primary)] px-2.5 py-0.5 text-xs font-bold text-white">
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
