import { useEffect, useState } from "react";
import {
  INITIAL_SYLLABUS_TREE,
  type SyllabusGradeNode,
  type SyllabusUnitNode,
} from "@/features/admin-ops/syllabus-data";
import type { Grade } from "./course-types";

const SYLLABUS_STORAGE_KEY = "sipnena_syllabus_v1";
const SYLLABUS_EVENT = "sipnena:syllabus-updated";

function isValidSyllabusTree(parsed: unknown): parsed is SyllabusGradeNode[] {
  if (!Array.isArray(parsed) || parsed.length === 0) return false;
  return parsed.every(
    (g) =>
      Boolean(g && typeof g === "object") &&
      typeof (g as SyllabusGradeNode).grade === "number" &&
      Array.isArray((g as SyllabusGradeNode).subjects) &&
      (g as SyllabusGradeNode).subjects.every(
        (s) =>
          Boolean(s && typeof s === "object") &&
          Boolean(s.localizedName && typeof s.localizedName === "object") &&
          Array.isArray(s.terms) &&
          s.terms.every(
            (t) =>
              Boolean(t && typeof t === "object") &&
              Array.isArray(t.units) &&
              t.units.every((u) =>
                Boolean(u && typeof u === "object" && u.localizedTitle),
              ),
          ),
      ),
  );
}

function loadSyllabusTree(): SyllabusGradeNode[] {
  if (typeof window === "undefined") return INITIAL_SYLLABUS_TREE;
  try {
    const raw = window.localStorage.getItem(SYLLABUS_STORAGE_KEY);
    if (!raw) return INITIAL_SYLLABUS_TREE;
    const parsed = JSON.parse(raw) as unknown;
    return isValidSyllabusTree(parsed) ? parsed : INITIAL_SYLLABUS_TREE;
  } catch {
    return INITIAL_SYLLABUS_TREE;
  }
}

export function saveSyllabusTree(next: SyllabusGradeNode[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SYLLABUS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage quota issues in demo mode.
  }
  window.dispatchEvent(new CustomEvent(SYLLABUS_EVENT));
}

export function useSyllabusStore() {
  const [tree, setTree] = useState<SyllabusGradeNode[]>(loadSyllabusTree);

  useEffect(() => {
    const onSync = () => setTree(loadSyllabusTree());
    window.addEventListener(SYLLABUS_EVENT, onSync);
    window.addEventListener("storage", onSync);
    return () => {
      window.removeEventListener(SYLLABUS_EVENT, onSync);
      window.removeEventListener("storage", onSync);
    };
  }, []);

  const updateTree = (
    updater: (prev: SyllabusGradeNode[]) => SyllabusGradeNode[],
  ) => {
    setTree((prev) => {
      const next = updater(prev);
      saveSyllabusTree(next);
      return next;
    });
  };

  return { tree, updateTree };
}

export function getPublishedSyllabusUnits(
  tree: SyllabusGradeNode[],
  grade: Grade,
  subject: string,
  term: 1 | 2 | 3,
): SyllabusUnitNode[] {
  const termName = term === 1 ? "Term 1" : term === 3 ? "Term 3" : "Term 2";
  const gradeNode = tree.find((g) => g.grade === grade);
  if (!gradeNode) return [];
  const lower = subject.toLowerCase();
  const subjectNode = gradeNode.subjects.find(
    (s) =>
      s.localizedName.en.toLowerCase().includes(lower) ||
      s.id.toLowerCase().includes(lower.slice(0, 4)),
  );
  if (!subjectNode) return [];
  const termNode = subjectNode.terms.find((t) => t.term === termName);
  if (!termNode) return [];
  return termNode.units.filter((u) => u.published);
}
