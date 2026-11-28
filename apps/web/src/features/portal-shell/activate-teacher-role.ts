import {
  listActiveTeachers,
  setActiveTeacherId,
  type TeacherAccount,
} from "@/data/courses";

export type TeacherActivationResult =
  | { kind: "none" }
  | { kind: "single"; teacher: TeacherAccount }
  | { kind: "many"; teachers: TeacherAccount[]; preferredId: string | null };

/** Resolves how to activate the teacher demo role against the registry. */
export function resolveTeacherActivation(
  preferredId?: string | null,
): TeacherActivationResult {
  const teachers = listActiveTeachers();
  if (teachers.length === 0) return { kind: "none" };
  if (teachers.length === 1) {
    return { kind: "single", teacher: teachers[0]! };
  }
  const preferred =
    preferredId && teachers.some((t) => t.id === preferredId)
      ? preferredId
      : null;
  return { kind: "many", teachers, preferredId: preferred };
}

export function applySingleTeacher(teacher: TeacherAccount): void {
  setActiveTeacherId(teacher.id);
}
