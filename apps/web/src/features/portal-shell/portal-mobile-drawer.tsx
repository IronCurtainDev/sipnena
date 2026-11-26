import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { formatGrade, formatMedium } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { StudyMedium } from "@/lib/language-types";
import type { DemoRole } from "@/lib/prototype-state";
import type { PortalNavGroup, PortalNavLink } from "./nav-config";
import { getBrandTitle, ROLE_VISUAL_CONFIG } from "./role-themes";

export function isPortalRouteActive(
  pathname: string,
  item: PortalNavLink,
): boolean {
  if (pathname === item.to) return true;
  if (item.matchPrefix && pathname.startsWith(item.matchPrefix)) return true;
  return false;
}

export const SHELL_NAV_LABELS: Record<
  AppLanguage,
  {
    olBadge: string;
    whatsapp: string;
    closeMenu: string;
    dismissNav: string;
  }
> = {
  en: {
    olBadge: "O/L",
    whatsapp: "WhatsApp Support",
    closeMenu: "Close menu",
    dismissNav: "Dismiss navigation",
  },
  si: {
    olBadge: "සා/පෙළ",
    whatsapp: "WhatsApp සහය",
    closeMenu: "මෙනුව වසන්න",
    dismissNav: "සංචාලනය වසන්න",
  },
  ta: {
    olBadge: "சா/த",
    whatsapp: "WhatsApp உதவி",
    closeMenu: "பட்டியலை மூடு",
    dismissNav: "வழிசெலுத்தலை மூடு",
  },
};

export function PortalMobileDrawer({
  activeRole,
  isOpen,
  lang,
  grade,
  medium,
  pathname,
  navGroups,
  onNavClick,
  onClose,
}: {
  activeRole: DemoRole;
  isOpen: boolean;
  lang: AppLanguage;
  grade: number;
  medium: StudyMedium;
  pathname: string;
  navGroups: PortalNavGroup[];
  onNavClick: () => void;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  const labels = SHELL_NAV_LABELS[lang];
  const theme = ROLE_VISUAL_CONFIG[activeRole];
  const isStudent = activeRole === "student";

  return (
    <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs lg:hidden">
      <div
        className={`flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto p-4 shadow-2xl ${theme.sidebarBgCls}`}
      >
        <div
          className={`flex items-center justify-between border-b pb-3 ${theme.sidebarBorderCls}`}
        >
          <div>
            <p className={`text-base font-black ${theme.brandTitleCls}`}>
              {getBrandTitle(lang)} • {theme.portalBadge[lang]}
            </p>
            <p className={`text-xs ${theme.brandSubCls}`}>
              {isStudent
                ? `${formatGrade(lang, grade)} • ${formatMedium(lang, medium)}`
                : theme.personaName[lang]}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.closeMenu}
            className={`rounded-xl p-2 ${theme.inactiveNavCls}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {navGroups.map((group) => (
            <div key={group.title.en} className="space-y-1">
              <p
                className={`px-2 text-[10px] font-bold uppercase tracking-wider ${theme.groupTitleCls}`}
              >
                {group.title[lang]}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isPortalRouteActive(pathname, item);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      onNavClick();
                      onClose();
                    }}
                    className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-bold ${
                      active ? theme.activeNavCls : theme.inactiveNavCls
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label[lang]}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label={labels.dismissNav}
        className="flex-1"
        onClick={onClose}
      />
    </div>
  );
}
