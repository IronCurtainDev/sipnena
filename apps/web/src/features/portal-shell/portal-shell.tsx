import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  FileCheck2,
  Menu,
  MessageCircleQuestion,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import type { AppLanguage } from "@/lib/language";
import { usePrototypeState, type DemoRole } from "@/lib/prototype-state";
import { mobileTabGridClass } from "./mobile-tabs";
import { MOBILE_TABS_BY_ROLE, PORTAL_NAV_GROUPS } from "./nav-config";
import { PortalDesktopNav, PortalMobileDrawer } from "./portal-nav";
import { PrototypeRoleSwitcher } from "./role-switcher";
import { ROLE_VISUAL_CONFIG } from "./role-themes";

interface PortalShellProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  title: string;
  roleOverride?: DemoRole;
  toastMessage?: string | null;
  children: ReactNode;
}

const TOTAL_NOTIFICATIONS = 6;

export function SipNenaPortalShell({
  lang,
  onLanguageChange,
  title,
  roleOverride,
  toastMessage,
  children,
}: PortalShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state, setRole } = usePrototypeState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const activeRole = roleOverride ?? state.role;
  const theme = ROLE_VISUAL_CONFIG[activeRole];
  const navGroups = PORTAL_NAV_GROUPS[activeRole];
  const mobileTabs = MOBILE_TABS_BY_ROLE[activeRole];
  const unreadCount = Math.max(
    0,
    TOTAL_NOTIFICATIONS - state.readNotificationIds.length,
  );
  const pendingSlipsCount = state.bankSlips.filter(
    (s) => s.status === "pending",
  ).length;
  const pendingDoubtsCount = state.doubts.filter(
    (d) => d.status === "pending",
  ).length;

  const lockRole = () => {
    if (roleOverride && state.role !== roleOverride) {
      setRole(roleOverride);
    }
  };

  return (
    <div
      className={`sipnena-onboarding flex min-h-svh flex-col text-[var(--sn-text-main)] antialiased sm:flex-row ${theme.pageBgCls}`}
    >
      <PortalDesktopNav
        activeRole={activeRole}
        lang={lang}
        grade={state.grade}
        medium={state.medium}
        pathname={pathname}
        navGroups={navGroups}
        onNavClick={lockRole}
      />

      <div className="flex min-w-0 flex-1 flex-col pb-24 sm:pb-6">
        <header className="sticky top-0 z-30 border-b border-[var(--sn-border)] bg-[var(--sn-surface)]/95 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between gap-2 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-2.5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label={
                  lang === "si"
                    ? "මෙනුව විවෘත කරන්න"
                    : lang === "ta"
                      ? "பட்டியலைத் திற"
                      : "Open navigation menu"
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
              <span
                className={`hidden shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide sm:inline-flex ${theme.badgePillCls}`}
              >
                {theme.portalBadge[lang]}
              </span>
              <h1 className="truncate text-base font-extrabold text-[var(--sn-text-main)] sm:text-lg">
                {title}
              </h1>
            </div>

            <div className="hidden xl:block">
              <PrototypeRoleSwitcher
                lang={lang}
                activeRoleOverride={activeRole}
              />
            </div>

            <div className="flex items-center gap-2">
              {activeRole === "student" && (
                <>
                  <Link
                    to="/search"
                    onClick={lockRole}
                    aria-label={
                      lang === "si"
                        ? "පාඩම් සහ ප්‍රශ්න පත්‍ර සොයන්න"
                        : lang === "ta"
                          ? "பாடங்கள் மற்றும் வினாத்தாள்களைத் தேடு"
                          : "Search lessons and past papers"
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)]"
                  >
                    <Search className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/notifications"
                    onClick={lockRole}
                    aria-label={
                      lang === "si"
                        ? "දැනුම්දීම්"
                        : lang === "ta"
                          ? "அறிவிப்புகள்"
                          : "Notifications"
                    }
                    className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)]"
                  >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {activeRole === "parent" && (
                <Link
                  to="/payment-status"
                  onClick={lockRole}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 text-xs font-bold text-[#0F2744]"
                >
                  <FileCheck2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">
                    {lang === "si"
                      ? "ගෙවීම් තත්ත්වය"
                      : lang === "ta"
                        ? "கட்டண நிலை"
                        : "Slip Status"}
                  </span>
                </Link>
              )}

              {activeRole === "teacher" && (
                <Link
                  to="/teacher/doubts"
                  onClick={lockRole}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 text-xs font-bold text-[#0B3B3C]"
                >
                  <MessageCircleQuestion className="h-3.5 w-3.5" />
                  <span>{pendingDoubtsCount}</span>
                </Link>
              )}

              {activeRole === "admin" && (
                <Link
                  to="/admin/payments"
                  onClick={lockRole}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 text-xs font-bold text-amber-950"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{pendingSlipsCount}</span>
                </Link>
              )}

              <CompactLanguageSwitcher
                selectedLang={lang}
                onLanguageChange={onLanguageChange}
                size="sm"
                showLabel={false}
              />

              {activeRole === "student" ? (
                <Link
                  to="/me"
                  onClick={lockRole}
                  aria-label={theme.personaName[lang]}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${theme.avatarBtnCls}`}
                >
                  <User className="h-4 w-4" />
                </Link>
              ) : (
                <span
                  className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold sm:inline-flex ${theme.avatarBtnCls}`}
                >
                  {theme.personaShort[lang]}
                </span>
              )}
            </div>
          </div>

          <div
            className={`border-t px-4 py-1.5 xl:hidden ${theme.topStripCls}`}
          >
            <PrototypeRoleSwitcher
              lang={lang}
              activeRoleOverride={activeRole}
              compact
            />
          </div>
        </header>

        <main
          id="main-content"
          className="mx-auto w-full max-w-7xl flex-1 space-y-5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
        >
          {children}
        </main>
      </div>

      <nav
        aria-label="Mobile quick navigation"
        className={`fixed inset-x-0 bottom-0 z-30 grid gap-1 border-t border-[var(--sn-border)] bg-[var(--sn-surface)]/95 px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md sm:hidden ${mobileTabGridClass(mobileTabs.length)}`}
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
              onClick={lockRole}
              className={`flex min-h-[50px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[11px] font-bold ${
                active ? theme.badgePillCls : "text-[var(--sn-text-muted)]"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="max-w-full truncate">{item.label[lang]}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex min-h-[50px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[11px] font-bold text-[var(--sn-text-muted)]"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
          <span>
            {lang === "si" ? "සියල්ල" : lang === "ta" ? "மேலும்" : "More"}
          </span>
        </button>
      </nav>

      <PortalMobileDrawer
        activeRole={activeRole}
        isOpen={mobileMenuOpen}
        lang={lang}
        grade={state.grade}
        medium={state.medium}
        pathname={pathname}
        navGroups={navGroups}
        onNavClick={lockRole}
        onClose={() => setMobileMenuOpen(false)}
      />

      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-4 z-50 flex max-w-sm items-center gap-2 rounded-xl bg-[var(--sn-text-main)] px-4 py-3 text-xs font-semibold text-white shadow-xl sm:bottom-6 sm:right-6"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </aside>
      )}
    </div>
  );
}
