import type {
  Course,
  CourseStoreState,
  Grade,
  Localized,
  Medium,
  PublishStatus,
  Unit,
} from "./course-types";
import { makeLocalized } from "./course-types";
import { updateCourseStore } from "./courses-store-core";
import { requireActiveTeacher } from "./courses-teacher-mutations";

export interface CreateCourseInput {
  grade: Grade;
  subject: string;
  medium: Medium;
  term: 1 | 2 | 3;
  title: Localized;
  description: Localized;
  isFree: boolean;
  priceLkr: number | null;
  teacherId?: string;
  teacherName?: string;
  initialUnitTitles?: Localized[];
  syllabusRef?: string;
  coverImageUrl?: string;
}

export function createCourseWithUnits(input: CreateCourseInput): string {
  const activeTeacher = requireActiveTeacher();
  const teacherId = input.teacherId ?? activeTeacher.id;
  const teacherName = input.teacherName ?? activeTeacher.name;
  const now = new Date().toISOString();
  const courseId = `tc-${Date.now()}`;
  const unitTitles = input.initialUnitTitles ?? [];

  updateCourseStore((prev) => {
    const course: Course = {
      id: courseId,
      title: input.title,
      subject: input.subject,
      grade: input.grade,
      medium: input.medium,
      term: input.term,
      description: input.description,
      isFree: input.isFree,
      priceLkr: input.isFree ? null : input.priceLkr,
      status: "draft",
      teacherId,
      teacherName,
      reviewsCount: 0,
      hoursLabel: "1.0",
      syllabusRef: input.syllabusRef,
      coverImageUrl: input.coverImageUrl,
      createdAt: now,
      updatedAt: now,
    };
    const units: Unit[] = unitTitles.map((title, idx) => ({
      id: `ts-${Date.now()}-${idx}`,
      courseId,
      title,
      order: idx,
      status: "draft",
    }));
    return {
      ...prev,
      courses: [course, ...prev.courses],
      units: [...prev.units, ...units],
    };
  });

  return courseId;
}

export function updateCourseFields(courseId: string, patch: Partial<Course>) {
  const updatedAt = new Date().toISOString();
  updateCourseStore((prev) => {
    const courses = prev.courses.map((c) =>
      c.id === courseId ? { ...c, ...patch, updatedAt } : c,
    );
    // Publishing the course also releases draft units/lessons to students.
    if (patch.status !== "published") {
      return { ...prev, courses };
    }
    return {
      ...prev,
      courses,
      units: prev.units.map((u) =>
        u.courseId === courseId && u.status === "draft"
          ? { ...u, status: "published" as const }
          : u,
      ),
      lessons: prev.lessons.map((l) =>
        l.courseId === courseId && l.status === "draft"
          ? { ...l, status: "published" as const }
          : l,
      ),
    };
  });
}

export function duplicateCourse(
  sourceCourseId: string,
  targetMedium?: Medium,
): string | null {
  const newCourseId = `tc-${Date.now()}`;
  const now = new Date().toISOString();
  let created = false;
  updateCourseStore((prev) => {
    const source = prev.courses.find((c) => c.id === sourceCourseId);
    if (!source) return prev;
    created = true;
    const copyCourse: Course = {
      ...source,
      id: newCourseId,
      medium: targetMedium ?? source.medium,
      status: "draft",
      title: {
        en: `${source.title.en ?? ""} (Copy)`,
        si: `${source.title.si ?? ""} (පිටපත)`,
        ta: `${source.title.ta ?? ""} (நகல்)`,
      },
      createdAt: now,
      updatedAt: now,
    };
    const unitIdMap = new Map<string, string>();
    const copiedUnits = prev.units
      .filter((u) => u.courseId === sourceCourseId)
      .map((u, idx) => {
        const nextUnitId = `ts-${Date.now()}-u${idx}`;
        unitIdMap.set(u.id, nextUnitId);
        return {
          ...u,
          id: nextUnitId,
          courseId: newCourseId,
          status: "draft" as const,
        };
      });
    const copiedLessons = prev.lessons
      .filter((l) => l.courseId === sourceCourseId)
      .map((l, idx) => ({
        ...l,
        id: `tl-${Date.now()}-l${idx}`,
        courseId: newCourseId,
        unitId: unitIdMap.get(l.unitId) ?? copiedUnits[0]?.id ?? l.unitId,
        status: "draft" as const,
      }));
    return {
      ...prev,
      courses: [copyCourse, ...prev.courses],
      units: [...prev.units, ...copiedUnits],
      lessons: [...prev.lessons, ...copiedLessons],
    };
  });
  return created ? newCourseId : null;
}

export function addUnitToCourse(courseId: string, title?: Localized): string {
  const unitId = `ts-${Date.now()}`;
  updateCourseStore((prev) => {
    const existing = prev.units.filter((u) => u.courseId === courseId);
    const nextOrder = existing.length;
    const fallbackTitle = makeLocalized(`Unit ${nextOrder + 1}`);
    fallbackTitle.si = `${nextOrder + 1} වන ඒකකය`;
    fallbackTitle.ta = `அலகு ${nextOrder + 1}`;
    const unit: Unit = {
      id: unitId,
      courseId,
      title: title ?? fallbackTitle,
      order: nextOrder,
      status: "draft",
    };
    return { ...prev, units: [...prev.units, unit] };
  });
  return unitId;
}

export function updateUnitFields(unitId: string, patch: Partial<Unit>) {
  updateCourseStore((prev) => ({
    ...prev,
    units: prev.units.map((u) => (u.id === unitId ? { ...u, ...patch } : u)),
  }));
}

export function reorderCourseUnits(courseId: string, orderedUnitIds: string[]) {
  updateCourseStore((prev) => {
    const orderMap = new Map(orderedUnitIds.map((id, i) => [id, i]));
    return {
      ...prev,
      units: prev.units.map((u) =>
        u.courseId === courseId && orderMap.has(u.id)
          ? { ...u, order: orderMap.get(u.id)! }
          : u,
      ),
    };
  });
}

export function duplicateUnit(unitId: string): string | null {
  const newUnitId = `ts-${Date.now()}`;
  let ok = false;
  updateCourseStore((prev) => {
    const src = prev.units.find((u) => u.id === unitId);
    if (!src) return prev;
    ok = true;
    const siblingCount = prev.units.filter(
      (u) => u.courseId === src.courseId,
    ).length;
    const copiedUnit: Unit = {
      ...src,
      id: newUnitId,
      order: siblingCount,
      status: "draft",
      title: {
        en: `${src.title.en ?? ""} (Copy)`,
        si: `${src.title.si ?? ""} (පිටපත)`,
        ta: `${src.title.ta ?? ""} (நகல்)`,
      },
    };
    const copiedLessons = prev.lessons
      .filter((l) => l.unitId === unitId)
      .map((l, i) => ({
        ...l,
        id: `tl-${Date.now()}-${i}`,
        unitId: newUnitId,
        status: "draft" as const,
      }));
    return {
      ...prev,
      units: [...prev.units, copiedUnit],
      lessons: [...prev.lessons, ...copiedLessons],
    };
  });
  return ok ? newUnitId : null;
}

export function deleteUnit(unitId: string) {
  updateCourseStore(
    (prev) => ({
      ...prev,
      units: prev.units.filter((u) => u.id !== unitId),
      lessons: prev.lessons.filter((l) => l.unitId !== unitId),
    }),
    { recordUndo: true },
  );
}

export function setUnitStatus(
  unitId: string,
  status: PublishStatus,
  releaseAt?: string,
) {
  updateUnitFields(unitId, { status, releaseAt });
}

export type { CourseStoreState };
