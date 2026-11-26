import { GraduationCap } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { NAV_ITEMS } from "./mock-data";
import { HOME_STRINGS } from "./strings";

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  lang: AppLanguage;
}

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
      <div className="space-y-6">
        <div className="px-2 pt-2">
          <div className="truncate text-lg font-black leading-tight text-[var(--sn-text-main)]">
            SipNena
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
                className={`flex min-h-[52px] w-full items-center gap-3 rounded-xl px-4 text-left text-base font-bold leading-normal transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                  isActive
                    ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                    : "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)] active:scale-[0.99]"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1 leading-normal">
                  {t[item.labelKey]}
                </span>
              </button>
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
