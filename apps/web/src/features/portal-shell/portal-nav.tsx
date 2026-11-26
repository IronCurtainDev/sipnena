import { Link } from "@tanstack/react-router";
import { GraduationCap, MessageCircle, X } from "lucide-react";
import type { AppLanguage } from "@/lib/language";
import type { StudyMedium } from "@/lib/language-types";
import type { PortalNavGroup, PortalNavLink } from "./nav-config";

function isRouteActive(pathname: string, item: PortalNavLink): boolean {
  if (pathname === item.to) return true;
  if (item.matchPrefix && pathname.startsWith(item.matchPrefix)) return true;
  return false;
}

export function PortalDesktopNav({
  lang,
  grade,
  medium,
  pathname,
  navGroups,
}: {
  lang: AppLanguage;
  grade: number;
  medium: StudyMedium;
  pathname: string;
  navGroups: PortalNavGroup[];
}) {
  const mediumShort = medium === "si" ? "SI" : medium === "ta" ? "TA" : "EN";

  return (
    <>
      <aside
        aria-label="Primary portal navigation"
        className="sticky top-0 hidden h-svh w-[272px] shrink-0 flex-col justify-between overflow-y-auto border-r border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex"
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-2 px-2 pt-1">
            <Link to="/home" className="min-w-0">
              <div className="truncate text-lg font-black leading-tight text-[var(--sn-text-main)]">
                SipNena
              </div>
              <div className="truncate text-[11px] font-semibold text-[var(--sn-text-muted)]">
                Grade {grade} • {mediumShort} Medium
              </div>
            </Link>
            <Link
              to="/select-grade"
              className="rounded-lg bg-[var(--sn-olive)] px-2 py-1 text-[10px] font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-sage)]"
            >
              {grade >= 10 ? "O/L" : `G${grade}`}
            </Link>
          </div>

          <nav className="space-y-4" aria-label="Portal sections">
            {navGroups.map((group) => (
              <div key={group.title.en} className="space-y-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[var(--sn-text-muted)]">
                  {group.title[lang]}
                </p>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isRouteActive(pathname, item);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-[42px] items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${
                        active
                          ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                          : "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)]"
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

        <div className="mt-4 space-y-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/70 p-3.5">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--sn-primary)]">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              <span>NIE 2026</span>
            </span>
            <span className="rounded-full bg-[var(--sn-primary)] px-2 py-0.5 text-[10px] text-white">
              Term 2
            </span>
          </div>
          <Link
            to="/help"
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:underline"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>WhatsApp Support</span>
          </Link>
        </div>
      </aside>

      <aside
        aria-label="Tablet navigation"
        className="sticky top-0 hidden h-svh w-20 shrink-0 flex-col items-center justify-between overflow-y-auto border-r border-[var(--sn-border)] bg-[var(--sn-surface)] py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex lg:hidden"
      >
        <div className="flex w-full flex-col items-center gap-3 px-1.5">
          <Link
            to="/home"
            className="text-center text-[11px] font-black leading-tight text-[var(--sn-primary)]"
          >
            Sip
            <br />
            Nena
          </Link>
          <nav className="flex w-full flex-col gap-1">
            {navGroups
              .flatMap((g) => g.items)
              .slice(0, 7)
              .map((item) => {
                const Icon = item.icon;
                const active = isRouteActive(pathname, item);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[10px] font-bold ${
                      active
                        ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                        : "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)]"
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

export function PortalMobileDrawer({
  isOpen,
  lang,
  grade,
  medium,
  pathname,
  navGroups,
  onClose,
}: {
  isOpen: boolean;
  lang: AppLanguage;
  grade: number;
  medium: StudyMedium;
  pathname: string;
  navGroups: PortalNavGroup[];
  onClose: () => void;
}) {
  if (!isOpen) return null;
  const mediumShort = medium === "si" ? "SI" : medium === "ta" ? "TA" : "EN";

  return (
    <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs lg:hidden">
      <div className="flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-[var(--sn-surface)] p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--sn-border)] pb-3">
          <div>
            <p className="text-base font-black text-[var(--sn-text-main)]">
              SipNena
            </p>
            <p className="text-xs text-[var(--sn-text-muted)]">
              Grade {grade} • {mediumShort} Medium
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-xl p-2 text-[var(--sn-text-muted)] hover:bg-[var(--sn-surface-muted)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {navGroups.map((group) => (
            <div key={group.title.en} className="space-y-1">
              <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-[var(--sn-text-muted)]">
                {group.title[lang]}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isRouteActive(pathname, item);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-bold ${
                      active
                        ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                        : "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)]"
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
        aria-label="Dismiss navigation"
        className="flex-1"
        onClick={onClose}
      />
    </div>
  );
}
