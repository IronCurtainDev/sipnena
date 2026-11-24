import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MobileBottomNav, TabletRail } from "@/features/home/nav-bars";
import { DesktopSidebar } from "@/features/home/nav-sidebar";
import {
  getSavedLanguage,
  saveLanguage,
  type AppLanguage,
} from "@/lib/language";
import { CourseBreadcrumbBar } from "./course-breadcrumb-bar";
import { CourseDetailTopBar } from "./course-detail-top-bar";
import { CourseEnrollModal } from "./course-enroll-modal";
import { CourseInstructorSection } from "./course-instructor-section";
import { CourseMobileEnrollBar } from "./course-mobile-enroll-bar";
import { CourseOutcomesSection } from "./course-outcomes-section";
import { CourseOverviewSection } from "./course-overview-section";
import { CoursePreviewModal } from "./course-preview-modal";
import { CoursePurchaseSidebar } from "./course-purchase-sidebar";
import { CourseReviewsSection } from "./course-reviews-section";
import { CourseStateViews } from "./course-state-views";
import { CourseSyllabusSection } from "./course-syllabus-section";
import { TrailerVideoThumbnail } from "./course-trailer-thumbnail";
import { COURSE_DETAIL_MOCK, type LessonItem } from "./mock-data";
import { COURSE_DETAIL_STRINGS } from "./strings";

export function SipNenaCourseDetailScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<AppLanguage>(getSavedLanguage);
  const [activeTab, setActiveTab] = useState("courses");
  const [isSaved, setIsSaved] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [openModuleIds, setOpenModuleIds] = useState<string[]>(["mod1"]);
  const [previewLesson, setPreviewLesson] = useState<LessonItem | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isEnrollSuccess, setIsEnrollSuccess] = useState(false);
  const [statusToast, setStatusToast] = useState<string | null>(null);
  const [demoState, setDemoState] = useState<
    "ready" | "loading" | "empty" | "error"
  >("ready");

  const t = COURSE_DETAIL_STRINGS[lang];
  const course = COURSE_DETAIL_MOCK;
  const allExpanded = openModuleIds.length === course.modules.length;

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
    else if (tab === "courses") void navigate({ to: "/courses" });
    else showToast(tab.toUpperCase());
  };

  const handleBackToCourses = () => {
    void navigate({ to: "/courses" });
  };

  const toggleModule = (modId: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(modId)
        ? prev.filter((id) => id !== modId)
        : [...prev, modId],
    );
  };

  const handleExpandCollapseAll = () => {
    if (allExpanded) {
      setOpenModuleIds([]);
    } else {
      setOpenModuleIds(course.modules.map((m) => m.id));
    }
  };

  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev;
      showToast(
        `${next ? t.savedCourseMsg : t.removedCourseMsg} ${t.courseTitle}`,
      );
      return next;
    });
  };

  const handleLessonClick = (lesson: LessonItem) => {
    showToast(lesson.id);
    void navigate({ to: "/lesson" });
  };

  return (
    <div className="sipnena-onboarding flex min-h-svh flex-col bg-[var(--sn-page-bg)] font-sans text-[var(--sn-text-main)] antialiased sm:flex-row">
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

      <div className="flex min-w-0 flex-1 flex-col pb-36 sm:pb-10">
        <CourseDetailTopBar
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onProfileClick={() => showToast(t.profileAria)}
          t={t}
        />

        <main className="mx-auto w-full max-w-[1200px] flex-1 space-y-6 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          {demoState !== "ready" ? (
            <CourseStateViews
              demoState={demoState}
              onRetry={() => setDemoState("ready")}
              t={t}
            />
          ) : (
            <div className="space-y-6">
              <CourseBreadcrumbBar
                t={t}
                isSaved={isSaved}
                onBackToCourses={handleBackToCourses}
                onShare={() => showToast(t.parentShareMsg)}
                onToggleSave={handleToggleSave}
              />

              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="min-w-0 space-y-6">
                  {/* Mobile Top Trailer Preview Card (< 640px) */}
                  <div className="overflow-hidden rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] sm:hidden">
                    <TrailerVideoThumbnail
                      t={t}
                      onWatchPreview={() => void navigate({ to: "/lesson" })}
                    />
                  </div>

                  <CourseOverviewSection
                    course={course}
                    t={t}
                    isDescExpanded={isDescExpanded}
                    onToggleDesc={() => setIsDescExpanded((prev) => !prev)}
                  />

                  <CourseOutcomesSection outcomes={course.outcomes} t={t} />

                  <CourseSyllabusSection
                    modules={course.modules}
                    openModuleIds={openModuleIds}
                    allExpanded={allExpanded}
                    onToggleModule={toggleModule}
                    onExpandCollapseAll={handleExpandCollapseAll}
                    onLessonClick={handleLessonClick}
                    t={t}
                  />

                  <CourseInstructorSection
                    instructor={course.instructor}
                    t={t}
                  />

                  <CourseReviewsSection
                    reviews={course.reviews}
                    gradeBadge={t.gradeBadge}
                    t={t}
                  />
                </div>

                <CoursePurchaseSidebar
                  course={course}
                  t={t}
                  onWatchPreview={() => void navigate({ to: "/lesson" })}
                  onEnroll={() => {
                    setIsEnrollModalOpen(true);
                    setIsEnrollSuccess(false);
                  }}
                  onSendToParent={() => showToast(t.parentShareMsg)}
                  onContactDesk={() => showToast(t.contactDeskMsg)}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {demoState === "ready" && (
        <CourseMobileEnrollBar
          course={course}
          t={t}
          onEnroll={() => {
            setIsEnrollModalOpen(true);
            setIsEnrollSuccess(false);
          }}
        />
      )}

      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        lang={lang}
      />

      <CoursePreviewModal
        previewLesson={previewLesson}
        onClose={() => setPreviewLesson(null)}
        onEnroll={() => {
          setPreviewLesson(null);
          setIsEnrollModalOpen(true);
          setIsEnrollSuccess(false);
        }}
        t={t}
      />

      <CourseEnrollModal
        isOpen={isEnrollModalOpen}
        isSuccess={isEnrollSuccess}
        course={course}
        lang={lang}
        t={t}
        onClose={() => {
          setIsEnrollModalOpen(false);
          setIsEnrollSuccess(false);
        }}
        onConfirmJoin={() => {
          setIsEnrollSuccess(true);
        }}
        onStartFirstLesson={() => {
          setIsEnrollModalOpen(false);
          setIsEnrollSuccess(false);
          void navigate({ to: "/lesson" });
        }}
        onGoToCourses={() => {
          setIsEnrollModalOpen(false);
          setIsEnrollSuccess(false);
          void navigate({ to: "/courses" });
        }}
      />

      {statusToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-28 right-4 z-50 flex max-w-sm items-center gap-2 rounded-xl bg-[var(--sn-text-main)] px-4 py-3 text-xs font-semibold text-white shadow-lg sm:bottom-6 sm:right-6"
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
