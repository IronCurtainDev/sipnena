import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useCoursesStore } from "@/data/courses";
import { MobileBottomNav, TabletRail } from "@/features/home/nav-bars";
import { DesktopSidebar } from "@/features/home/nav-sidebar";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { buildCourseDetailFromStore } from "./course-detail-adapter";
import { CourseBreadcrumbBar } from "./course-breadcrumb-bar";
import { CourseDetailTopBar } from "./course-detail-top-bar";
import { CourseEnrollModal } from "./course-enroll-modal";
import { CourseInstructorSection } from "./course-instructor-section";
import { CourseMobileEnrollBar } from "./course-mobile-enroll-bar";
import { CourseOverviewSection } from "./course-overview-section";
import { CoursePreviewModal } from "./course-preview-modal";
import { CoursePurchaseSidebar } from "./course-purchase-sidebar";
import { CourseStateViews } from "./course-state-views";
import { CourseSyllabusSection } from "./course-syllabus-section";
import { type LessonItem } from "./mock-data";
import { COURSE_DETAIL_STRINGS } from "./strings";
import { useCourseEnroll } from "./use-course-enroll";

export function SipNenaCourseDetailScreen(props?: {
  courseIdOverride?: string;
  includeDrafts?: boolean;
}) {
  const navigate = useNavigate();
  const { courseId: routeCourseId } = useParams({ strict: false });
  const { store } = useCoursesStore();
  const [lang, handleLanguageChange] = useSipNenaLanguage();
  const [activeTab, setActiveTab] = useState("courses");
  const [isSaved, setIsSaved] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [openModuleIds, setOpenModuleIds] = useState<string[]>([]);
  const [previewLesson, setPreviewLesson] = useState<LessonItem | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isEnrollSuccess, setIsEnrollSuccess] = useState(false);
  const [statusToast, setStatusToast] = useState<string | null>(null);

  const t = COURSE_DETAIL_STRINGS[lang];
  const targetCourseId = props?.courseIdOverride ?? routeCourseId;
  const course = useMemo(
    () =>
      buildCourseDetailFromStore(store, targetCourseId, lang, {
        includeDrafts: props?.includeDrafts,
      }),
    [store, targetCourseId, lang, props?.includeDrafts],
  );

  useEffect(() => {
    if (!course) return;
    setOpenModuleIds(course.modules[0] ? [course.modules[0].id] : []);
  }, [course?.id]);

  const allExpanded = course
    ? openModuleIds.length >= course.modules.length && course.modules.length > 0
    : false;

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
    else showToast(tab.toUpperCase());
  };

  const handleBackToCourses = () => {
    void navigate({ to: "/courses" });
  };

  const { beginEnroll, confirmEnroll } = useCourseEnroll(
    course?.id,
    showToast,
    setIsEnrollModalOpen,
    setIsEnrollSuccess,
  );

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

      <div className="flex min-w-0 flex-1 flex-col pb-36 sm:pb-6">
        <CourseDetailTopBar
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onProfileClick={() => void navigate({ to: "/me" })}
          onBack={handleBackToCourses}
          t={t}
        />

        <main className="w-full flex-1 space-y-4 px-4 py-4 sm:px-6 sm:py-5 xl:px-8">
          {!course ? (
            <CourseStateViews
              demoState="empty"
              onRetry={handleBackToCourses}
              t={t}
            />
          ) : (
            <div className="space-y-4">
              <CourseBreadcrumbBar
                t={t}
                courseTitle={course.title}
                subjectLabel={course.subjectGradePill}
                isSaved={isSaved}
                onBackToCourses={handleBackToCourses}
                onShare={() => showToast(t.parentShareMsg)}
                onToggleSave={() => {
                  setIsSaved((prev) => {
                    const next = !prev;
                    showToast(
                      `${next ? t.savedCourseMsg : t.removedCourseMsg} ${course.title ?? ""}`,
                    );
                    return next;
                  });
                }}
              />

              <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.95fr)] xl:grid-cols-[minmax(0,1.4fr)_minmax(420px,1fr)]">
                <div className="min-w-0 space-y-4">
                  {course.coverImageUrl ? (
                    <div className="overflow-hidden rounded-2xl border border-[var(--sn-border)] sm:hidden">
                      <img
                        src={course.coverImageUrl}
                        alt=""
                        className="aspect-[16/9] w-full object-cover"
                      />
                    </div>
                  ) : null}

                  <CourseOverviewSection
                    course={course}
                    t={t}
                    isDescExpanded={isDescExpanded}
                    onToggleDesc={() => setIsDescExpanded((prev) => !prev)}
                  />

                  <CourseSyllabusSection
                    modules={course.modules}
                    openModuleIds={openModuleIds}
                    allExpanded={allExpanded}
                    onToggleModule={(modId) =>
                      setOpenModuleIds((prev) =>
                        prev.includes(modId)
                          ? prev.filter((id) => id !== modId)
                          : [...prev, modId],
                      )
                    }
                    onExpandCollapseAll={() =>
                      setOpenModuleIds(
                        allExpanded ? [] : course.modules.map((m) => m.id),
                      )
                    }
                    onLessonClick={(lesson: LessonItem) => {
                      void navigate({
                        to: "/courses/$courseId/lesson",
                        params: { courseId: course.id },
                        search: { lessonId: lesson.id },
                      });
                    }}
                    t={t}
                  />

                  {course.instructor.name ? (
                    <CourseInstructorSection
                      instructor={course.instructor}
                      t={t}
                    />
                  ) : null}
                </div>

                <CoursePurchaseSidebar
                  course={course}
                  lang={lang}
                  t={t}
                  onWatchPreview={() =>
                    void navigate({
                      to: "/courses/$courseId/lesson",
                      params: { courseId: course.id },
                    })
                  }
                  onEnroll={beginEnroll}
                  onSendToParent={() => {
                    void navigate({
                      to: "/checkout",
                      search: { mode: "parent_pay" },
                    });
                  }}
                  onContactDesk={() => showToast(t.contactDeskMsg)}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {course ? (
        <CourseMobileEnrollBar
          course={course}
          t={t}
          onEnroll={beginEnroll}
        />
      ) : null}

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

      {course ? (
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
          onConfirmJoin={confirmEnroll}
          onStartFirstLesson={() => {
            setIsEnrollModalOpen(false);
            setIsEnrollSuccess(false);
            void navigate({
              to: "/courses/$courseId/lesson",
              params: { courseId: course.id },
            });
          }}
          onGoToCourses={() => {
            setIsEnrollModalOpen(false);
            setIsEnrollSuccess(false);
            void navigate({ to: "/courses" });
          }}
        />
      ) : null}

      {statusToast ? (
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
      ) : null}
    </div>
  );
}
