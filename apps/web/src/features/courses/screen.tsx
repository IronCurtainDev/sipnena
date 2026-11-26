import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { DesktopSidebar } from "@/features/home/nav-sidebar";
import { MobileBottomNav, TabletRail } from "@/features/home/nav-bars";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { CourseCatalogGrid } from "./course-catalog-grid";
import { CourseFilterBar } from "./course-filter-bar";
import { BreadcrumbTrustRow, CourseHero } from "./course-hero";
import { CourseModal } from "./course-modal";
import { CourseSidebar } from "./course-sidebar";
import { CourseStateViews } from "./course-state-views";
import { CoursesTopBar } from "./courses-top-bar";
import { EmptyFilterView } from "./empty-filter-view";
import {
  COURSES_DATA,
  type CourseItem,
  type PriceFilter,
  type SortOption,
} from "./mock-data";
import { COURSES_STRINGS, formatCourseString } from "./strings";

export function SipNenaCoursesScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<AppLanguage>(getSavedLanguage);
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedGrade, setSelectedGrade] = useState("8");
  const [selectedMedium, setSelectedMedium] = useState("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [savedIds, setSavedIds] = useState<string[]>(["human-body"]);
  const [openTermIds, setOpenTermIds] = useState<string[]>(["term1"]);
  const [selectedUnitId, setSelectedUnitId] = useState("u2");
  const [activeCourseModal, setActiveCourseModal] = useState<CourseItem | null>(
    null,
  );
  const [statusToast, setStatusToast] = useState<string | null>(null);
  const [demoState, setDemoState] = useState<
    "ready" | "loading" | "empty" | "error"
  >("ready");

  const t = COURSES_STRINGS[lang];

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<AppLanguage>;
      if (customEvent.detail) setLang(customEvent.detail);
    };
    window.addEventListener("sipnena_language_change", handleSync);
    return () =>
      window.removeEventListener("sipnena_language_change", handleSync);
  }, []);

  const handleLanguageChange = (nextLang: AppLanguage) => {
    setLang(nextLang);
    saveLanguage(nextLang);
  };

  const showToast = useCallback((msg: string) => {
    setStatusToast(msg);
    const timer = setTimeout(() => setStatusToast(null), 3200);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") void navigate({ to: "/home" });
    else if (tab === "courses" || tab === "saved")
      void navigate({ to: "/courses" });
    else if (tab === "me" || tab === "profile") void navigate({ to: "/me" });
    else showToast(`${tab.toUpperCase()} ${t.comingSoonBadge}`);
  };

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = COURSES_DATA.filter((course) => {
      if (course.grade !== selectedGrade) return false;
      if (selectedMedium !== "all" && course.medium !== selectedMedium)
        return false;
      if (priceFilter === "free" && !course.isFree) return false;
      if (priceFilter === "paid" && course.isFree) return false;

      if (q) {
        const textToSearch = [
          COURSES_STRINGS.en[`course_${course.key}_title`],
          COURSES_STRINGS.si[`course_${course.key}_title`],
          COURSES_STRINGS.ta[`course_${course.key}_title`],
          COURSES_STRINGS.en[course.unitKey],
          COURSES_STRINGS.si[course.unitKey],
          COURSES_STRINGS.ta[course.unitKey],
          course.teacher,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!textToSearch.includes(q)) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === "lessons") return b.lessonsCount - a.lessonsCount;
      return a.popularRank - b.popularRank;
    });
  }, [searchQuery, selectedGrade, selectedMedium, priceFilter, sortBy]);

  const toggleSaveCourse = (courseId: string, courseTitle: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(courseId);
      if (exists) {
        showToast(`${t.removedCourseBanner} ${courseTitle}`);
        return prev.filter((id) => id !== courseId);
      }
      showToast(`${t.savedCourseBanner} ${courseTitle}`);
      return [...prev, courseId];
    });
  };

  const resetAllFilters = () => {
    setSelectedGrade("8");
    setSelectedMedium("all");
    setPriceFilter("all");
    setSearchQuery("");
    showToast(t.filtersResetBanner);
  };

  const isZeroResults = filteredCourses.length === 0;

  return (
    <div className="sipnena-onboarding flex min-h-svh flex-col bg-[var(--sn-page-bg)] text-[var(--sn-text-main)] antialiased sm:flex-row">
      <DesktopSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        lang={lang}
      />
      <TabletRail
        activeTab={activeTab}
        onTabChange={handleTabChange}
        lang={lang}
      />

      <div className="flex min-w-0 flex-1 flex-col pb-28 sm:pb-6">
        <CoursesTopBar
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onProfileClick={() => void navigate({ to: "/me" })}
          t={t}
        />

        <main className="w-full flex-1 space-y-4 px-4 py-4 sm:px-6 sm:py-5 xl:px-8">
          {demoState !== "ready" ? (
            <CourseStateViews
              demoState={demoState}
              onRetry={() => setDemoState("ready")}
              t={t}
            />
          ) : (
            <div className="space-y-4">
              <BreadcrumbTrustRow
                t={t}
                isZeroResults={isZeroResults}
                onResetFilters={resetAllFilters}
              />

              {isZeroResults ? (
                <EmptyFilterView
                  selectedGrade={selectedGrade}
                  selectedMedium={selectedMedium}
                  priceFilter={priceFilter}
                  onResetGrade={() => setSelectedGrade("8")}
                  onResetMedium={() => setSelectedMedium("all")}
                  onResetPrice={() => setPriceFilter("all")}
                  onResetAll={resetAllFilters}
                  onSeeAllSubjects={() => {
                    resetAllFilters();
                  }}
                  onRequestModule={() =>
                    showToast(
                      formatCourseString(t.requestSentFeedback, {
                        grade: selectedGrade,
                      }),
                    )
                  }
                  t={t}
                />
              ) : (
                <div className="space-y-4">
                  <CourseHero t={t} />

                  <CourseFilterBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedGrade={selectedGrade}
                    onGradeChange={setSelectedGrade}
                    selectedMedium={selectedMedium}
                    onMediumChange={setSelectedMedium}
                    priceFilter={priceFilter}
                    onPriceFilterChange={setPriceFilter}
                    sortBy={sortBy}
                    onSortToggle={() =>
                      setSortBy((prev) =>
                        prev === "popular" ? "lessons" : "popular",
                      )
                    }
                    courseCount={filteredCourses.length}
                    t={t}
                    lang={lang}
                  />

                  <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(400px,0.95fr)] xl:grid-cols-[minmax(0,1.4fr)_minmax(420px,1fr)]">
                    <CourseCatalogGrid
                      courses={filteredCourses}
                      savedIds={savedIds}
                      onToggleSave={toggleSaveCourse}
                      onOpenModal={setActiveCourseModal}
                      onViewManual={() => showToast(t.labManualBanner)}
                      t={t}
                    />

                    <CourseSidebar
                      selectedGrade={selectedGrade}
                      openTermIds={openTermIds}
                      onToggleTerm={(id) =>
                        setOpenTermIds((p) =>
                          p.includes(id)
                            ? p.filter((x) => x !== id)
                            : [...p, id],
                        )
                      }
                      selectedUnitId={selectedUnitId}
                      onSelectUnit={setSelectedUnitId}
                      onAskTeacher={() => showToast(t.askTeacherBanner)}
                      t={t}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        lang={lang}
      />

      <CourseModal
        course={activeCourseModal}
        onClose={() => setActiveCourseModal(null)}
        onBeginLesson={() => {
          setActiveCourseModal(null);
          void navigate({ to: "/course" });
        }}
        t={t}
      />

      {statusToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-4 z-50 flex max-w-sm items-center gap-2 rounded-xl bg-[var(--sn-text-main)] px-4 py-3 text-xs font-semibold text-white shadow-lg sm:bottom-6 sm:right-6"
        >
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--sn-primary)]"
            aria-hidden="true"
          />
          <span>{statusToast}</span>
        </aside>
      )}
    </div>
  );
}
