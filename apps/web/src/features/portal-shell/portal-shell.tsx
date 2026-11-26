import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Menu, Search, User } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import type { AppLanguage } from "@/lib/language";
import { usePrototypeState, type DemoRole } from "@/lib/prototype-state";
import { MOBILE_TABS_BY_ROLE, PORTAL_NAV_GROUPS } from "./nav-config";
import { PortalDesktopNav, PortalMobileDrawer } from "./portal-nav";
import { PrototypeRoleSwitcher } from "./role-switcher";

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
  const { state } = usePrototypeState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const activeRole = roleOverride ?? state.role;
  const navGroups = PORTAL_NAV_GROUPS[activeRole];
  const mobileTabs = MOBILE_TABS_BY_ROLE[activeRole];
  const unreadCount = Math.max(
    0,
    TOTAL_NOTIFICATIONS - state.readNotificationIds.length,
  );

  return (
    <div className="sipnena-onboarding flex min-h-svh flex-col bg-[var(--sn-page-bg)] text-[var(--sn-text-main)] antialiased sm:flex-row">
      <PortalDesktopNav
        lang={lang}
        grade={state.grade}
        medium={state.medium}
        pathname={pathname}
        navGroups={navGroups}
      />

      <div className="flex min-w-0 flex-1 flex-col pb-24 sm:pb-6">
        <header className="sticky top-0 z-30 border-b border-[var(--sn-border)] bg-[var(--sn-surface)]/95 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between gap-2 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-2.5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
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
              <Link
                to="/search"
                aria-label="Search lessons and past papers"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)]"
              >
                <Search className="h-4 w-4" />
              </Link>
              <Link
                to="/notifications"
                aria-label="Notifications"
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)]"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <CompactLanguageSwitcher
                selectedLang={lang}
                onLanguageChange={onLanguageChange}
                size="sm"
                showLabel={false}
              />
              <Link
                to="/me"
                aria-label="Profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sn-primary)] text-xs font-bold text-white"
              >
                <User className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="border-t border-[var(--sn-border)] px-4 py-1.5 xl:hidden">
            <PrototypeRoleSwitcher
              lang={lang}
              activeRoleOverride={activeRole}
              compact
            />
          </div>
        </header>

        <main
          id="main-content"
          className="mx-auto w-full max-w-6xl flex-1 space-y-5 px-4 py-4 sm:px-6 sm:py-6"
        >
          {children}
        </main>
      </div>

      <nav
        aria-label="Mobile quick navigation"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 gap-1 border-t border-[var(--sn-border)] bg-[var(--sn-surface)]/95 px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md sm:hidden"
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
              className={`flex min-h-[50px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[11px] font-bold ${
                active
                  ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                  : "text-[var(--sn-text-muted)]"
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
        isOpen={mobileMenuOpen}
        lang={lang}
        grade={state.grade}
        medium={state.medium}
        pathname={pathname}
        navGroups={navGroups}
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
