import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import { mobileTabGridClass } from "./mobile-tabs";
import type { PortalNavLink } from "./nav-config";
import type { RoleVisualConfig } from "./role-themes";

export function PortalMobileBottomBar({
  lang,
  pathname,
  mobileTabs,
  theme,
  onTabClick,
  onOpenMenu,
}: {
  lang: AppLanguage;
  pathname: string;
  mobileTabs: PortalNavLink[];
  theme: RoleVisualConfig;
  onTabClick: () => void;
  onOpenMenu: () => void;
}) {
  const slots = mobileTabs.length + 1;
  return (
    <nav
      aria-label="Mobile quick navigation"
      className={`fixed inset-x-0 bottom-0 z-30 grid grid-flow-col gap-1 border-t border-[var(--sn-border)] bg-[var(--sn-surface)]/95 px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md sm:hidden ${mobileTabGridClass(slots)}`}
    >
      {mobileTabs.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.to ||
          (item.matchPrefix ? pathname.startsWith(item.matchPrefix) : false);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onTabClick}
            className={`flex min-h-[48px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-xs font-bold ${
              active ? theme.badgePillCls : "text-[var(--sn-text-muted)]"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="max-w-full truncate">{item.label[lang]}</span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={onOpenMenu}
        className="flex min-h-[48px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-xs font-bold text-[var(--sn-text-muted)]"
      >
        <Menu className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="max-w-full truncate">
          {lang === "si" ? "සියල්ල" : lang === "ta" ? "மேலும்" : "More"}
        </span>
      </button>
    </nav>
  );
}
