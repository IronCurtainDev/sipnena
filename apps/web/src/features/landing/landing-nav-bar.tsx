import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import {
  ROLE_ENTRY_ROUTE,
  ROLE_LABELS,
} from "@/features/portal-shell/nav-config";
import { ROLE_VISUAL_CONFIG } from "@/features/portal-shell/role-themes";
import type { AppLanguage } from "@/lib/language";
import { loadCourseStoreState } from "@/data/courses";
import {
  applySingleTeacher,
  resolveTeacherActivation,
} from "@/features/portal-shell/activate-teacher-role";
import { updatePrototypeState, type DemoRole } from "@/lib/prototype-state";
import type { LandingStrings } from "./strings.types";

const DEMO_ROLES: DemoRole[] = ["student", "parent", "teacher", "admin"];

interface LandingNavBarProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onStartFree: () => void;
  onLogin: () => void;
  onScrollToSection: (sectionId: string) => void;
  onExploreCourses?: () => void;
  t: LandingStrings;
}

export function LandingNavBar({
  lang,
  onLanguageChange,
  onStartFree,
  onLogin,
  onScrollToSection,
  t,
}: LandingNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  const portalStripLabel =
    lang === "si"
      ? "භූමිකාව අනුව පිවිසෙන්න:"
      : lang === "ta"
        ? "பங்கு வாரியான தளம்:"
        : "Separate Portals:";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--sn-border)] bg-[var(--sn-cream)]/95 backdrop-blur-md">
      <div className="border-b border-[var(--sn-border)]/70 bg-[var(--sn-surface-muted)] px-4 py-1.5 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-[var(--sn-text-secondary)]">
            {portalStripLabel}
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {DEMO_ROLES.map((role) => (
              <Link
                key={role}
                to={ROLE_ENTRY_ROUTE[role]}
                onClick={() => {
                  updatePrototypeState((prev) => ({ ...prev, role }));
                  if (role !== "teacher") return;
                  const preferred = loadCourseStoreState().activeTeacherId;
                  const result = resolveTeacherActivation(preferred);
                  if (result.kind === "single") {
                    applySingleTeacher(result.teacher);
                  } else if (
                    result.kind === "many" &&
                    result.preferredId
                  ) {
                    applySingleTeacher(
                      result.teachers.find((t) => t.id === result.preferredId)!,
                    );
                  }
                }}
                data-testid={`landing-portal-${role}`}
                className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold transition ${ROLE_VISUAL_CONFIG[role].badgePillCls} hover:opacity-90`}
              >
                {ROLE_LABELS[role][lang]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left focus:outline-none"
        >
          <span className="text-lg font-black tracking-tight text-[var(--sn-text-main)] sm:text-xl">
            {t.brandName}
          </span>
        </button>

        <nav
          aria-label="Main menu"
          className="hidden items-center gap-8 text-sm font-medium text-[var(--sn-text-secondary)] lg:flex"
        >
          <button
            type="button"
            onClick={() => handleNavClick("grades")}
            className="hover:text-[var(--sn-primary)]"
          >
            {t.navGrades}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("subjects")}
            className="hover:text-[var(--sn-primary)]"
          >
            {t.navSubjects}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("parents")}
            className="hover:text-[var(--sn-primary)]"
          >
            {t.navParents}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("why-easy")}
            className="hover:text-[var(--sn-primary)]"
          >
            {t.navGuarantee}
          </button>
        </nav>

        <div className="flex items-center gap-2.5">
          <CompactLanguageSwitcher
            selectedLang={lang}
            onLanguageChange={onLanguageChange}
            size="sm"
            showLabel={false}
          />

          <button
            type="button"
            onClick={onLogin}
            className="hidden text-sm font-bold text-[var(--sn-text-main)] hover:text-[var(--sn-primary)] lg:block"
          >
            {t.navLogin}
          </button>

          <button
            type="button"
            onClick={onStartFree}
            className="rounded-2xl bg-[var(--sn-primary)] px-4 py-2.5 text-xs font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.98]"
          >
            {t.startFreeBtn}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--sn-border)] text-[var(--sn-text-main)] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 pb-5 pt-4 shadow-lg lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {[
              { id: "grades", label: t.navGrades },
              { id: "subjects", label: t.navSubjects },
              { id: "parents", label: t.navParents },
              { id: "why-easy", label: t.navGuarantee },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className="rounded-xl bg-[var(--sn-olive)] px-3 py-2.5 text-left text-sm font-semibold text-[var(--sn-text-main)] transition hover:bg-[var(--sn-sage)] active:scale-[0.98]"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onLogin();
              }}
              className="flex-1 rounded-xl border border-[var(--sn-border)] py-2.5 text-sm font-bold text-[var(--sn-text-main)] transition"
            >
              {t.navLogin}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartFree();
              }}
              className="flex-1 rounded-xl bg-[var(--sn-primary)] py-2.5 text-sm font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] active:scale-[0.98]"
            >
              {t.startFreeBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
