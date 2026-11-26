import { useCallback, useEffect, useState } from "react";
import {
  INITIAL_PROTOTYPE_STATE,
  type DataSaverQuality,
  type DemoRole,
  type PaymentVerificationStatus,
  type PrototypeBankSlip,
  type PrototypeDoubt,
  type PrototypeState,
  type LessonTextBlock,
  type TeacherCourseDraft,
  type TeacherCourseSection,
  type TeacherCourseTerm,
  type TeacherItemKind,
  type TeacherLessonDraft,
  type TeacherLiveChannel,
  type TeacherLiveDay,
  type TeacherLiveSession,
  type TeacherQuizDraft,
} from "./prototype-seed";
import type { StudyMedium } from "./language-types";
import { normalizeStoredTeacherDrafts } from "./normalize-teacher-drafts";

export type {
  DataSaverQuality,
  DemoRole,
  PaymentVerificationStatus,
  PrototypeBankSlip,
  PrototypeDoubt,
  PrototypeState,
  LessonTextBlock,
  TeacherCourseDraft,
  TeacherCourseSection,
  TeacherCourseTerm,
  TeacherItemKind,
  TeacherLessonDraft,
  TeacherLiveChannel,
  TeacherLiveDay,
  TeacherLiveSession,
  TeacherQuizDraft,
};

const STORAGE_KEY = "sipnena_prototype_state_v1";
const SYNC_EVENT = "sipnena_prototype_state_change";

export function readPrototypeState(): PrototypeState {
  if (typeof window === "undefined") return INITIAL_PROTOTYPE_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const legacyGrade = Number(localStorage.getItem("sipnena_student_grade"));
      return Number.isFinite(legacyGrade) &&
        legacyGrade >= 6 &&
        legacyGrade <= 11
        ? { ...INITIAL_PROTOTYPE_STATE, grade: legacyGrade }
        : INITIAL_PROTOTYPE_STATE;
    }
    const parsed = JSON.parse(raw) as Partial<PrototypeState>;
    const merged = { ...INITIAL_PROTOTYPE_STATE, ...parsed };
    const courses = Array.isArray(parsed.teacherCourses)
      ? parsed.teacherCourses
      : INITIAL_PROTOTYPE_STATE.teacherCourses;
    const sections = Array.isArray(parsed.teacherCourseSections)
      ? [...parsed.teacherCourseSections]
      : [...INITIAL_PROTOTYPE_STATE.teacherCourseSections];
    const drafts = normalizeStoredTeacherDrafts({
      courses,
      sections,
      lessons: parsed.teacherLessons,
      quizzes: parsed.teacherQuizzes,
      fallbackLessons: INITIAL_PROTOTYPE_STATE.teacherLessons,
      fallbackQuizzes: INITIAL_PROTOTYPE_STATE.teacherQuizzes,
    });
    const teacherLiveSessions = Array.isArray(parsed.teacherLiveSessions)
      ? (parsed.teacherLiveSessions as TeacherLiveSession[]).map((session) => ({
          ...session,
          meetingUrl:
            typeof session.meetingUrl === "string" ? session.meetingUrl : "",
        }))
      : INITIAL_PROTOTYPE_STATE.teacherLiveSessions;
    return {
      ...merged,
      teacherCourses: courses,
      teacherCourseSections: drafts.sections,
      teacherLessons: drafts.lessons,
      teacherQuizzes: drafts.quizzes,
      teacherLiveSessions,
    };
  } catch {
    return INITIAL_PROTOTYPE_STATE;
  }
}

export function writePrototypeState(next: PrototypeState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    localStorage.setItem("sipnena_student_grade", String(next.grade));
    localStorage.setItem("sipnena_study_medium", next.medium);
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: next }));
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}

export function updatePrototypeState(
  updater: (prev: PrototypeState) => PrototypeState,
): PrototypeState {
  const next = updater(readPrototypeState());
  writePrototypeState(next);
  return next;
}

export function usePrototypeState() {
  const [state, setState] = useState<PrototypeState>(readPrototypeState);

  useEffect(() => {
    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<PrototypeState>;
      setState(custom.detail ?? readPrototypeState());
    };
    window.addEventListener(SYNC_EVENT, handleSync);
    return () => window.removeEventListener(SYNC_EVENT, handleSync);
  }, []);

  const update = useCallback(
    (updater: (prev: PrototypeState) => PrototypeState) => {
      const next = updatePrototypeState(updater);
      setState(next);
    },
    [],
  );

  const setRole = useCallback(
    (role: DemoRole) => update((prev) => ({ ...prev, role })),
    [update],
  );

  const setGrade = useCallback(
    (grade: number) => update((prev) => ({ ...prev, grade })),
    [update],
  );

  const setMedium = useCallback(
    (medium: StudyMedium) => update((prev) => ({ ...prev, medium })),
    [update],
  );

  const toggleBookmark = useCallback(
    (id: string) =>
      update((prev) => ({
        ...prev,
        bookmarkedIds: prev.bookmarkedIds.includes(id)
          ? prev.bookmarkedIds.filter((item) => item !== id)
          : [id, ...prev.bookmarkedIds],
      })),
    [update],
  );

  const toggleDownload = useCallback(
    (id: string) =>
      update((prev) => ({
        ...prev,
        downloadedIds: prev.downloadedIds.includes(id)
          ? prev.downloadedIds.filter((item) => item !== id)
          : [id, ...prev.downloadedIds],
      })),
    [update],
  );

  const setDataSaver = useCallback(
    (quality: DataSaverQuality, wifiOnly?: boolean) =>
      update((prev) => ({
        ...prev,
        dataSaverQuality: quality,
        wifiOnlyDownloads: wifiOnly ?? prev.wifiOnlyDownloads,
      })),
    [update],
  );

  const submitBankSlip = useCallback(
    (slip: Omit<PrototypeBankSlip, "id" | "uploadedAt" | "status">) =>
      update((prev) => ({
        ...prev,
        bankSlips: [
          {
            ...slip,
            id: `slip-${Date.now()}`,
            uploadedAt: "Just now",
            status: "pending",
          },
          ...prev.bankSlips,
        ],
      })),
    [update],
  );

  const setSlipStatus = useCallback(
    (id: string, status: PaymentVerificationStatus, reason?: string) =>
      update((prev) => ({
        ...prev,
        bankSlips: prev.bankSlips.map((s) =>
          s.id === id ? { ...s, status, reason } : s,
        ),
      })),
    [update],
  );

  const addDoubt = useCallback(
    (
      doubt: Omit<
        PrototypeDoubt,
        "id" | "createdAt" | "status" | "upvotes" | "upvoted"
      >,
    ) =>
      update((prev) => ({
        ...prev,
        doubts: [
          {
            ...doubt,
            id: `doubt-${Date.now()}`,
            createdAt: "Just now",
            status: "pending",
            upvotes: 1,
            upvoted: true,
          },
          ...prev.doubts,
        ],
      })),
    [update],
  );

  const upvoteDoubt = useCallback(
    (id: string) =>
      update((prev) => ({
        ...prev,
        doubts: prev.doubts.map((d) =>
          d.id === id
            ? {
                ...d,
                upvotes: d.upvoted ? d.upvotes - 1 : d.upvotes + 1,
                upvoted: !d.upvoted,
              }
            : d,
        ),
      })),
    [update],
  );

  const replyToDoubt = useCallback(
    (id: string, teacherName: string, text: string) =>
      update((prev) => ({
        ...prev,
        doubts: prev.doubts.map((d) =>
          d.id === id
            ? {
                ...d,
                status: "answered",
                reply: { teacherName, text, repliedAt: "Just now" },
              }
            : d,
        ),
      })),
    [update],
  );

  return {
    state,
    update,
    setRole,
    setGrade,
    setMedium,
    toggleBookmark,
    toggleDownload,
    setDataSaver,
    submitBankSlip,
    setSlipStatus,
    addDoubt,
    upvoteDoubt,
    replyToDoubt,
  };
}
