import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { DesktopSidebar } from "@/features/home/nav-sidebar";
import { MobileBottomNav, TabletRail } from "@/features/home/nav-bars";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useCoursesStore } from "@/data/courses";
import { CourseCatalogGrid } from "./course-catalog-grid";
import { CourseFilterBar } from "./course-filter-bar";
import { BreadcrumbTrustRow, CourseHero } from "./course-hero";
import { CourseModal } from "./course-modal";
import { CoursesTopBar } from "./courses-top-bar";
import { EmptyCatalogView } from "./empty-catalog-view";
import { buildCatalogCourses } from "./courses-adapter";
import {
  type CourseItem,
  type PriceFilter,
  type SortOption,
} from "./mock-data";
import { COURSES_STRINGS } from "./strings";

function getInitialGradeFilter(): string {
  if (typeof window === "undefined") return "all";
  try {
    const saved = window.localStorage.getItem("sipnena_student_grade");
    return saved && ["6", "7", "8", "9", "10", "11"].includes(saved)
      ? saved
      : "all";
  } catch {
    return "all";
  }
}

export function SipNenaCoursesScreen() {
  const navigate = useNavigate();
  const { store } = useCoursesStore();
  const [lang, handleLanguageChange] = useSipNenaLanguage();
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedGrade, setSelectedGrade] = useState(getInitialGradeFilter);
  const [selectedMedium, setSelectedMedium] = useState("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [activeCourseModal, setActiveCourseModal] = useState<CourseItem | null>(
    null,
  );
  const [statusToast, setStatusToast] = useState<string | null>(null);

  const t = COURSES_STRINGS[lang];

  const showToast = useCallback((msg: string) => {
    setStatusToast(msg);
    const timer = setTimeout(() => setStatusToast(null), 3200);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") void navigate({ to: "/home" });
    else if (tab === "courses") void navigate({ to: "/courses" });
    else if (tab === "saved") void navigate({ to: "/saved" });
    else if (tab === "me" || tab === "profile") void navigate({ to: "/me" });
    else showToast(`${tab.toUpperCase()} ${t.comingSoonBadge}`);
  };

  const catalogCourses = useMemo(
    () => buildCatalogCourses(store, lang),
    [store, lang],
  );

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = catalogCourses.filter((course) => {
      if (selectedGrade !== "all" && course.grade !== selectedGrade)
        return false;
      if (selectedMedium !== "all" && course.medium !== selectedMedium)
        return false;
      if (priceFilter === "free" && !course.isFree) return false;
      if (priceFilter === "paid" && course.isFree) return false;
      if (!q) return true;
      const textToSearch = [
        course.title,
        course.desc,
        course.unitLabel,
        course.teacher,
        course.searchBlob,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return textToSearch.includes(q);
    });

    return [...list].sort((a, b) => {
      if (sortBy === "lessons") return b.lessonsCount - a.lessonsCount;
      return a.popularRank - b.popularRank;
    });
  }, [
    catalogCourses,
    searchQuery,
    selectedGrade,
    selectedMedium,
    priceFilter,
    sortBy,
  ]);

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
    setSelectedGrade("all");
    setSelectedMedium("all");
    setPriceFilter("all");
    setSearchQuery("");
    showToast(t.filtersResetBanner);
  };

  const hasPublished = catalogCourses.length > 0;
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

        <main
          id="main-content"
          className="w-full flex-1 space-y-4 px-4 py-4 sm:px-6 sm:py-5 xl:px-8"
        >
          <BreadcrumbTrustRow
            t={t}
            isZeroResults={isZeroResults}
            onResetFilters={resetAllFilters}
          />

          {!hasPublished ? (
            <EmptyCatalogView t={t} kind="none" />
          ) : (
            <div className="space-y-4">
              <CourseHero t={t} courseCount={filteredCourses.length} />

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

              {isZeroResults ? (
                <EmptyCatalogView
                  t={t}
                  kind="filtered"
                  onResetFilters={resetAllFilters}
                />
              ) : (
                <CourseCatalogGrid
                  courses={filteredCourses}
                  lang={lang}
                  savedIds={savedIds}
                  onToggleSave={toggleSaveCourse}
                  onOpenModal={setActiveCourseModal}
                  t={t}
                />
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
        onBeginLesson={(course) => {
          setActiveCourseModal(null);
          void navigate({
            to: "/courses/$courseId",
            params: { courseId: course.id },
          });
        }}
        t={t}
      />

      {statusToast ? (
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
      ) : null}
    </div>
  );
}
