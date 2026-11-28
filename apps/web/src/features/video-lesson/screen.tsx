import { useCallback, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "@tanstack/react-router";
import {
  getCompletedLessonIds,
  markLessonCompleted,
  recordStudentQuizAttempt,
  resolveActiveStudentId,
  useCoursesStore,
} from "@/data/courses";
import { MobileBottomNav } from "@/features/home/nav-bars";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useMinWidth } from "@/hooks/use-min-width";
import { COURSE_LESSON_COPY } from "./course-lesson-copy";
import { DesktopLessonView } from "./desktop-lesson-view";
import { MobileLessonView } from "./mobile-lesson-view";
import { buildStoreCourseLessonBundle } from "./store-lesson-builder";
import { VIDEO_LESSON_STRINGS } from "./strings";

function readSearchParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

export function SipNenaVideoLessonScreen(props?: {
  courseIdOverride?: string;
  initialLessonId?: string;
  includeDrafts?: boolean;
}) {
  const navigate = useNavigate();
  const { courseId: paramCourseId } = useParams({ strict: false });
  const { store } = useCoursesStore();
  const [lang, handleLanguageChange] = useSipNenaLanguage();

  const includeDrafts =
    props?.includeDrafts ?? readSearchParam("preview") === "1";
  const targetCourseId = props?.courseIdOverride ?? paramCourseId ?? "";

  const bundle = useMemo(
    () =>
      buildStoreCourseLessonBundle(store, targetCourseId, lang, {
        includeDrafts,
      }),
    [store, targetCourseId, lang, includeDrafts],
  );

  const initialQueryLessonId =
    props?.initialLessonId ?? readSearchParam("lessonId");
  const [activeLessonId, setActiveLessonId] = useState(
    () => initialQueryLessonId ?? bundle?.firstId ?? "tl-1",
  );
  const [prevQueryLessonId, setPrevQueryLessonId] =
    useState(initialQueryLessonId);
  if (initialQueryLessonId !== prevQueryLessonId) {
    setPrevQueryLessonId(initialQueryLessonId);
    if (initialQueryLessonId && bundle?.byId[initialQueryLessonId]) {
      setActiveLessonId(initialQueryLessonId);
    }
  }
  const [activeTab, setActiveTab] = useState<
    "overview" | "notes" | "discussion" | "downloads"
  >("overview");
  const [activeNav, setActiveNav] = useState("courses");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const isDesktop = useMinWidth(1024);

  const resolvedCourseId = bundle?.resolvedCourseId ?? targetCourseId;
  const resolvedLessonId =
    bundle && !bundle.byId[activeLessonId]
      ? (bundle.firstId ?? activeLessonId)
      : activeLessonId;

  const studentId = resolveActiveStudentId(store.activeStudentId);
  const isDone = getCompletedLessonIds(
    store,
    studentId,
    resolvedCourseId,
  ).includes(resolvedLessonId);

  const t = VIDEO_LESSON_STRINGS[lang];
  const lessonCopy = COURSE_LESSON_COPY[lang];

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  }, []);

  if (paramCourseId && !bundle) return <Navigate to="/courses" />;

  const handleNavTab = (tab: string) => {
    setActiveNav(tab);
    if (tab === "home") void navigate({ to: "/home" });
    else if (tab === "courses") void navigate({ to: "/courses" });
    else if (tab === "saved") void navigate({ to: "/saved" });
    else if (tab === "me" || tab === "profile") void navigate({ to: "/me" });
    else showToast(tab.toUpperCase());
  };

  const handleSelectLesson = (id: string, isLocked?: boolean) => {
    if (id === "course-completed") {
      void navigate({ to: "/course-completed" });
      return;
    }
    if (isLocked) {
      showToast(
        "This lesson is locked. Complete previous unit quizzes to unlock.",
      );
      return;
    }
    setActiveLessonId(id);
    const kind = bundle?.byId[id]?.kind;
    setIsPlaying(kind === "video");
    showToast(
      kind === "quiz" ? "Started Section Checkpoint Quiz" : "Lesson loaded",
    );
  };

  const handleToggleDone = () => {
    if (!isDone) {
      markLessonCompleted(studentId, resolvedCourseId, resolvedLessonId);
      showToast("Marked as completed!");
    } else {
      showToast("Already completed");
    }
  };

  const handleQuizCompleted = (
    score: number,
    total: number,
    _passed: boolean,
    answers: Record<number, string>,
  ) => {
    const authored = bundle?.byId[resolvedLessonId];
    if (authored?.quizId) {
      const answerList = (authored.quizQuestionIds ?? []).map((_qid, idx) => {
        const letter = answers[idx + 1] ?? "A";
        return Math.max(0, letter.charCodeAt(0) - 65);
      });
      recordStudentQuizAttempt(
        studentId,
        resolvedCourseId,
        resolvedLessonId,
        {
          quizId: authored.quizId,
          score,
          total,
          answers: answerList,
        },
      );
    }
    markLessonCompleted(studentId, resolvedCourseId, resolvedLessonId);
  };

  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev;
      showToast(next ? t.savedToBookmarks : "Removed from bookmarks");
      return next;
    });
  };

  const goBackToCourse = () => {
    if (props?.courseIdOverride) {
      void navigate({
        to: "/teacher/courses/$courseId",
        params: { courseId: props.courseIdOverride },
      });
      return;
    }
    void navigate({
      to: "/courses/$courseId",
      params: { courseId: resolvedCourseId },
    });
  };

  return (
    <div className="sipnena-onboarding flex min-h-svh flex-col bg-[var(--sn-page-bg)] text-[var(--sn-text-main)] antialiased">
      {isDesktop ? (
        <DesktopLessonView
          t={t}
          lang={lang}
          onLanguageChange={handleLanguageChange}
          activeNav={activeNav}
          onNavTab={handleNavTab}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((prev) => !prev)}
          isDone={isDone}
          onToggleDone={handleToggleDone}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          activeLessonId={resolvedLessonId}
          onSelectLesson={handleSelectLesson}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onBackToCourse={goBackToCourse}
          onQuizCompleted={handleQuizCompleted}
          onToast={showToast}
          bundle={bundle ?? undefined}
          lessonCopy={bundle ? lessonCopy : undefined}
        />
      ) : (
        <>
          <MobileLessonView
            t={t}
            lang={lang}
            onLanguageChange={handleLanguageChange}
            isDone={isDone}
            onToggleDone={handleToggleDone}
            isSaved={isSaved}
            onToggleSave={handleToggleSave}
            activeLessonId={resolvedLessonId}
            onSelectLesson={handleSelectLesson}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying((prev) => !prev)}
            onBack={goBackToCourse}
            bundle={bundle ?? undefined}
            lessonCopy={bundle ? lessonCopy : undefined}
            onNavTab={handleNavTab}
            onQuizCompleted={handleQuizCompleted}
            onToast={showToast}
          />
          <MobileBottomNav
            activeTab={activeNav}
            onTabChange={handleNavTab}
            lang={lang}
          />
        </>
      )}

      {toastMsg && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-24 right-4 z-50 flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl sm:bottom-6 sm:right-6"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--sn-primary)]"
          />
          <span>{toastMsg}</span>
        </aside>
      )}
    </div>
  );
}
