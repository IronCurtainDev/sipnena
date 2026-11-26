import { Link } from "@tanstack/react-router";
import { GraduationCap, MessageCircle, ShieldCheck } from "lucide-react";
import { formatGrade, formatMedium } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { StudyMedium } from "@/lib/language-types";
import type { DemoRole } from "@/lib/prototype-state";
import { ROLE_ENTRY_ROUTE, type PortalNavGroup } from "./nav-config";
import { isPortalRouteActive, SHELL_NAV_LABELS } from "./portal-mobile-drawer";
import { getBrandTitle, ROLE_VISUAL_CONFIG } from "./role-themes";

export { PortalMobileDrawer } from "./portal-mobile-drawer";

export function PortalDesktopNav({
  activeRole,
  lang,
  grade,
  medium,
  pathname,
  navGroups,
  onNavClick,
}: {
  activeRole: DemoRole;
  lang: AppLanguage;
  grade: number;
  medium: StudyMedium;
  pathname: string;
  navGroups: PortalNavGroup[];
  onNavClick: () => void;
}) {
  const labels = SHELL_NAV_LABELS[lang];
  const theme = ROLE_VISUAL_CONFIG[activeRole];
  const isStudent = activeRole === "student";
  const gradeLabel = formatGrade(lang, grade);
  const mediumLabel = formatMedium(lang, medium);
  const entryRoute = ROLE_ENTRY_ROUTE[activeRole];

  return (
    <>
      <aside
        aria-label="Primary portal navigation"
        className={`sticky top-0 hidden h-svh w-[272px] shrink-0 flex-col justify-between overflow-y-auto border-r p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex ${theme.sidebarBgCls} ${theme.sidebarBorderCls}`}
      >
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-2 px-2 pt-1">
            <Link to={entryRoute} onClick={onNavClick} className="min-w-0">
              <div
                className={`truncate text-lg font-black leading-tight ${theme.brandTitleCls}`}
              >
                {getBrandTitle(lang)}
              </div>
              <div
                className={`mt-0.5 truncate text-[11px] font-semibold ${theme.brandSubCls}`}
              >
                {isStudent
                  ? `${gradeLabel} • ${mediumLabel}`
                  : theme.personaName[lang]}
              </div>
              {!isStudent && (
                <div
                  className={`truncate text-[10px] font-medium opacity-80 ${theme.brandSubCls}`}
                >
                  {theme.personaRoleLine[lang]}
                </div>
              )}
            </Link>

            {isStudent ? (
              <Link
                to="/select-grade"
                className="shrink-0 rounded-lg bg-[var(--sn-olive)] px-2 py-1 text-[10px] font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-sage)]"
              >
                {grade >= 10 ? labels.olBadge : gradeLabel}
              </Link>
            ) : (
              <span
                className={`shrink-0 rounded-lg px-2 py-1 text-[10px] font-extrabold ${theme.footerBadgeCls}`}
              >
                {theme.footerBadge[lang]}
              </span>
            )}
          </div>

          <nav className="space-y-4" aria-label="Portal sections">
            {navGroups.map((group) => (
              <div key={group.title.en} className="space-y-1">
                <p
                  className={`px-3 text-[10px] font-bold uppercase tracking-wider ${theme.groupTitleCls}`}
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
                      onClick={onNavClick}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-[42px] items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${
                        active ? theme.activeNavCls : theme.inactiveNavCls
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="truncate">{item.label[lang]}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        <div
          className={`mt-4 space-y-2 rounded-2xl border p-3.5 ${theme.footerCardCls}`}
        >
          <div
            className={`flex items-center justify-between text-xs font-bold ${theme.footerTextCls}`}
          >
            <span className="flex items-center gap-1.5">
              {isStudent ? (
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              )}
              <span>{theme.footerTitle[lang]}</span>
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${theme.footerBadgeCls}`}
            >
              {theme.footerBadge[lang]}
            </span>
          </div>
          {isStudent || activeRole === "parent" ? (
            <Link
              to="/help"
              onClick={onNavClick}
              className={`flex items-center gap-1.5 text-xs font-semibold hover:underline ${theme.footerTextCls}`}
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{labels.whatsapp}</span>
            </Link>
          ) : (
            <p className={`text-[11px] font-medium ${theme.brandSubCls}`}>
              {theme.portalBadge[lang]}
            </p>
          )}
        </div>
      </aside>

      <aside
        aria-label="Tablet navigation"
        className={`sticky top-0 hidden h-svh w-20 shrink-0 flex-col items-center justify-between overflow-y-auto border-r py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex lg:hidden ${theme.sidebarBgCls} ${theme.sidebarBorderCls}`}
      >
        <div className="flex w-full flex-col items-center gap-3 px-1.5">
          <Link
            to={entryRoute}
            onClick={onNavClick}
            className={`text-center text-[11px] font-black leading-tight ${theme.tabletTextCls}`}
          >
            {lang === "si"
              ? "සිප්\nනැණ"
              : lang === "ta"
                ? "சிப்\nநென"
                : "Sip\nNena"}
          </Link>
          <nav className="flex w-full flex-col gap-1">
            {navGroups
              .flatMap((g) => g.items)
              .slice(0, 7)
              .map((item) => {
                const Icon = item.icon;
                const active = isPortalRouteActive(pathname, item);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onNavClick}
                    className={`flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[10px] font-bold ${
                      active ? theme.activeNavCls : theme.inactiveNavCls
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="line-clamp-1 text-center">
                      {item.label[lang]}
                    </span>
                  </Link>
                );
              })}
          </nav>
        </div>
      </aside>
    </>
  );
}
