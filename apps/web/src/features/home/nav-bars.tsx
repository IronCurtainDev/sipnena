import {
  Bell,
  BookOpen,
  FileCheck2,
  Home,
  Radio,
  Search,
  User,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { AppLanguage } from "@/lib/language";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { isDemoModeEnabled } from "@/features/portal-shell/demo-mode";
import { PrototypeRoleSwitcher } from "@/features/portal-shell/role-switcher";
import { ROLE_VISUAL_CONFIG } from "@/features/portal-shell/role-themes";
import { getActiveStudent } from "@/data/courses";
import { usePrototypeState } from "@/lib/prototype-state";
import { HOME_STRINGS } from "./strings";

interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  lang: AppLanguage;
}

const COMPACT_LINKS = [
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
    label: { en: "Exams", si: "විභාග", ta: "பரீட்சை" },
  },
  {
    id: "live-ask",
    to: "/live-ask",
    icon: Radio,
    label: { en: "Live", si: "සජීවී", ta: "நேரலை" },
  },
  {
    id: "me",
    to: "/me",
    icon: User,
    label: { en: "Me", si: "මම", ta: "நான்" },
  },
] as const;

export function TabletRail({ activeTab, lang }: NavProps) {
  return (
    <aside
      aria-label="Primary tablet navigation"
      className="sticky top-0 hidden h-svh w-20 shrink-0 flex-col items-center justify-between overflow-y-auto border-r border-[var(--sn-border)] bg-[var(--sn-surface)] py-5 sm:flex lg:hidden"
    >
      <div className="flex w-full flex-col items-center gap-5 px-1.5">
        <div className="px-1 text-center text-xs font-black leading-tight text-[var(--sn-primary)]">
          Sip
          <br />
          Nena
        </div>

        <nav className="flex w-full flex-col gap-1.5">
          {COMPACT_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                to={item.to}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-[56px] w-full flex-col items-center justify-center gap-1 rounded-xl px-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
                  isActive
                    ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                    : "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)]"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="line-clamp-1 text-center leading-tight">
                  {item.label[lang]}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-4 px-2 text-center">
        <span className="rounded-md bg-[var(--sn-surface-selected)] px-2 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
          O/L
        </span>
      </div>
    </aside>
  );
}

export function MobileBottomNav({ activeTab, lang }: NavProps) {
  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 gap-1 border-t border-[var(--sn-border)] bg-[var(--sn-surface)]/95 px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md sm:hidden"
    >
      {COMPACT_LINKS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <Link
            key={item.id}
            to={item.to}
            aria-current={isActive ? "page" : undefined}
            className={`flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] ${
              isActive
                ? "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                : "text-[var(--sn-text-muted)] hover:text-[var(--sn-text-main)]"
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="max-w-full truncate">{item.label[lang]}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function HomeTopBar({
  lang,
  onLanguageChange,
  onProfileClick,
}: {
  lang: AppLanguage;
  onLanguageChange: (l: AppLanguage) => void;
  onProfileClick: () => void;
}) {
  const t = HOME_STRINGS[lang];
  const studentTheme = ROLE_VISUAL_CONFIG.student;
  const demo = isDemoModeEnabled();
  const { state } = usePrototypeState();
  const activeStudent = getActiveStudent();
  const displayName =
    activeStudent?.name ||
    state.studentName ||
    (lang === "si" ? "ශිෂ්‍ය" : lang === "ta" ? "மாணவர்" : "Student");
  const displayInitial = displayName.trim().charAt(0).toUpperCase() || "S";
  const shortName =
    displayName.length > 14 ? `${displayName.slice(0, 12)}…` : displayName;

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--sn-border)] bg-[var(--sn-surface)]/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:hidden">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-extrabold ${studentTheme.badgePillCls}`}
          >
            {studentTheme.portalBadge[lang]}
          </span>
          <h1 className="text-base font-bold tracking-tight text-[var(--sn-text-main)]">
            {t.mobileHeaderTitle}
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            to="/search"
            aria-label={
              lang === "si" ? "සොයන්න" : lang === "ta" ? "தேடு" : "Search"
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)]"
          >
            <Search className="h-4 w-4" />
          </Link>
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
            ariaLabel={t.langGroupAria}
            size="sm"
          />
          <button
            type="button"
            onClick={onProfileClick}
            aria-label={t.profileAria}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            <User className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {demo ? (
        <div className="border-t border-[var(--sn-border)] bg-emerald-50/70 px-4 py-1.5 sm:hidden">
          <PrototypeRoleSwitcher
            lang={lang}
            activeRoleOverride="student"
            compact
          />
        </div>
      ) : null}

      <div className="hidden h-16 shrink-0 items-center justify-between gap-2 px-6 sm:flex lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wide ${studentTheme.badgePillCls}`}
          >
            {studentTheme.portalBadge[lang]}
          </span>
          <div className="hidden items-center gap-2 rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--sn-text-secondary)] xl:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sn-primary)]" />
            <span>{t.topContextPill}</span>
          </div>
          {demo ? (
            <PrototypeRoleSwitcher lang={lang} activeRoleOverride="student" />
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/search"
            aria-label={
              lang === "si" ? "සොයන්න" : lang === "ta" ? "தேடு" : "Search"
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)]"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            to="/notifications"
            aria-label={
              lang === "si"
                ? "දැනුම්දීම්"
                : lang === "ta"
                  ? "அறிவிப்புகள்"
                  : "Notifications"
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)]"
          >
            <Bell className="h-4 w-4" />
          </Link>
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
            ariaLabel={t.langGroupAria}
          />

          <button
            type="button"
            onClick={onProfileClick}
            aria-label={t.profileAria}
            className="flex min-h-11 items-center gap-2.5 rounded-full p-1 transition hover:bg-[var(--sn-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sn-primary)] font-bold text-white shadow-xs">
              {displayInitial}
            </span>
            <span className="hidden text-left text-xs sm:block">
              <span className="block font-bold text-[var(--sn-text-main)]">
                {shortName}
              </span>
              <span className="block font-semibold text-[var(--sn-primary)]">
                {t.gradeLabel}
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
