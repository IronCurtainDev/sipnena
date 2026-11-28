import { useEffect, useState } from "react";
import type { CourseStoreState } from "./course-types";
import { INITIAL_COURSE_STORE } from "./courses-seed-extra";
import { migrateFromLegacyV1 } from "./courses-migration";
import { isRecord, normalizeCourseStore } from "./courses-store-sanitize";
import { stripCatalogSeedCourses } from "./courses-store-strip";
import type { PrototypeState } from "@/lib/prototype-seed";

export const COURSE_STORE_KEY = "sipnena_state_v2";
const LEGACY_STATE_KEY = "sipnena_prototype_state_v1";
const COURSE_STORE_EVENT = "sipnena:courses-updated";

/** Resolves the signed-in localStorage student, or empty when none. */
export function resolveActiveStudentId(
  activeStudentId: string | null | undefined,
): string {
  return activeStudentId ?? "";
}

export const DEFAULT_STUDENT_ID = "";
export const DEFAULT_TEACHER_ID = "";

let lastUndoSnapshot: CourseStoreState | null = null;

function isValidStore(raw: unknown): raw is CourseStoreState {
  if (!isRecord(raw)) return false;
  return (
    Array.isArray(raw.courses) &&
    Array.isArray(raw.units) &&
    Array.isArray(raw.lessons) &&
    Array.isArray(raw.quizzes) &&
    Array.isArray(raw.questions)
  );
}

export function loadCourseStoreState(): CourseStoreState {
  if (typeof window === "undefined") return INITIAL_COURSE_STORE;
  try {
    const raw = window.localStorage.getItem(COURSE_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (isValidStore(parsed)) {
        const normalized = normalizeCourseStore(parsed);
        const stripped = stripCatalogSeedCourses(normalized);
        if (stripped !== normalized) {
          saveCourseStoreState(stripped);
        }
        return stripped;
      }
    }
    const legacyRaw = window.localStorage.getItem(LEGACY_STATE_KEY);
    if (legacyRaw) {
      const legacyParsed = JSON.parse(legacyRaw) as Partial<PrototypeState>;
      const migrated = stripCatalogSeedCourses(
        normalizeCourseStore(migrateFromLegacyV1(legacyParsed)),
      );
      saveCourseStoreState(migrated);
      return migrated;
    }
  } catch {
    // Fall back cleanly to initial store when localStorage cannot be parsed.
  }
  saveCourseStoreState(INITIAL_COURSE_STORE);
  return INITIAL_COURSE_STORE;
}

export function saveCourseStoreState(next: CourseStoreState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COURSE_STORE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage quota errors in sandbox/private mode.
  }
  window.dispatchEvent(new CustomEvent(COURSE_STORE_EVENT));
}

export function updateCourseStore(
  updater: (prev: CourseStoreState) => CourseStoreState,
  options?: { recordUndo?: boolean },
): CourseStoreState {
  const prev = loadCourseStoreState();
  if (options?.recordUndo) {
    lastUndoSnapshot = prev;
  }
  const next = updater(prev);
  saveCourseStoreState(next);
  return next;
}

export function canRestoreCourseUndo(): boolean {
  return lastUndoSnapshot !== null;
}

export function restoreLastCourseUndo(): boolean {
  if (!lastUndoSnapshot) return false;
  const snapshot = lastUndoSnapshot;
  lastUndoSnapshot = null;
  saveCourseStoreState(snapshot);
  return true;
}

export function useCoursesStore() {
  const [store, setStore] = useState<CourseStoreState>(loadCourseStoreState);

  useEffect(() => {
    const sync = () => setStore(loadCourseStoreState());
    window.addEventListener(COURSE_STORE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(COURSE_STORE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = (
    updater: (prev: CourseStoreState) => CourseStoreState,
    options?: { recordUndo?: boolean },
  ) => {
    const next = updateCourseStore(updater, options);
    setStore(next);
    return next;
  };

  return { store, update, restoreUndo: restoreLastCourseUndo };
}
