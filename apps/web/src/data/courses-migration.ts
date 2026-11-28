import type {
  Course,
  CourseStoreState,
  Grade,
  Item,
  Lesson,
  Question,
  Quiz,
  Unit,
} from "./course-types";
import { makeLocalized } from "./course-types";
import { INITIAL_COURSE_STORE } from "./courses-seed-extra";
import type { PrototypeState } from "@/lib/prototype-seed";

function toGrade(val: unknown): Grade {
  const n = Number(val);
  if (n === 6 || n === 7 || n === 8 || n === 9 || n === 10 || n === 11) {
    return n;
  }
  return 8;
}

function toTerm(val: unknown): 1 | 2 | 3 {
  if (val === "Term 1" || val === 1) return 1;
  if (val === "Term 3" || val === 3) return 3;
  return 2;
}

function parsePrice(val: string | null | undefined): number | null {
  if (!val) return null;
  const digits = val.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : null;
}

function parseDurationMin(val: string | undefined): number | undefined {
  if (!val) return undefined;
  const match = val.match(/\d+/);
  return match ? Number(match[0]) : undefined;
}

function mapLegacyItems(
  lesson: PrototypeState["teacherLessons"][number],
): Item[] {
  const items: Item[] = [];
  if (lesson.kind === "video" && lesson.videoUrl) {
    items.push({
      id: `${lesson.id}-vid`,
      type: "video",
      url: lesson.videoUrl,
      estimatedMb: 25,
    });
  }
  if (lesson.kind === "lab" && lesson.labPrompt) {
    items.push({
      id: `${lesson.id}-lab`,
      type: "lab",
      prompt: makeLocalized(lesson.labPrompt),
    });
  }
  if (lesson.overviewTitle || lesson.overviewBody) {
    items.push({
      id: `${lesson.id}-txt`,
      type: "text",
      heading: lesson.overviewTitle
        ? makeLocalized(lesson.overviewTitle)
        : undefined,
      body: makeLocalized(lesson.overviewBody || ""),
    });
  }
  if (lesson.formula) {
    items.push({
      id: `${lesson.id}-frm`,
      type: "formula",
      latexOrText: lesson.formula,
    });
  }
  if (lesson.educatorNote) {
    items.push({
      id: `${lesson.id}-tn`,
      type: "teacherNote",
      body: makeLocalized(lesson.educatorNote),
    });
  }
  for (const r of lesson.rules ?? []) {
    items.push({
      id: r.id,
      type: "rule",
      title: makeLocalized(r.title),
      body: makeLocalized(r.body),
    });
  }
  for (const n of lesson.revisionNotes ?? []) {
    items.push({
      id: n.id,
      type: "note",
      title: makeLocalized(n.title),
      body: makeLocalized(n.body),
    });
  }
  if (lesson.tuteName) {
    items.push({
      id: `${lesson.id}-tute`,
      type: "file",
      title: makeLocalized(lesson.tuteName),
      fileName: lesson.tuteName,
      url: `/files/${lesson.tuteName}`,
    });
  }
  for (const f of lesson.files ?? []) {
    if (f.title === lesson.tuteName) continue;
    items.push({
      id: f.id,
      type: "file",
      title: makeLocalized(f.title),
      fileName: f.meta || f.title,
      url: `/files/${f.id}`,
    });
  }
  return items;
}

export function migrateFromLegacyV1(
  v1: Partial<PrototypeState>,
): CourseStoreState {
  const seed = INITIAL_COURSE_STORE;
  const legacyCourses = v1.teacherCourses ?? [];
  const legacySections = v1.teacherCourseSections ?? [];
  const legacyLessons = v1.teacherLessons ?? [];
  const legacyQuizzes = v1.teacherQuizzes ?? [];

  const coursesMap = new Map<string, Course>(
    seed.courses.map((c) => [c.id, c]),
  );
  for (const c of legacyCourses) {
    const existing = coursesMap.get(c.id);
    coursesMap.set(c.id, {
      id: c.id,
      title: existing
        ? { ...existing.title, en: c.title, si: c.title }
        : makeLocalized(c.title),
      subject: c.subject || "Science",
      grade: toGrade(c.grade),
      medium: c.medium || "si",
      term: toTerm(c.term),
      description: existing
        ? { ...existing.description, en: c.description }
        : makeLocalized(c.description || ""),
      isFree: Boolean(c.isFree),
      priceLkr: c.isFree ? null : parsePrice(c.price),
      status: c.published ? "published" : "draft",
      teacherId: existing?.teacherId ?? "",
      teacherName: existing?.teacherName,
      createdAt: c.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  const unitsMap = new Map<string, Unit>(seed.units.map((u) => [u.id, u]));
  for (const s of legacySections) {
    const existing = unitsMap.get(s.id);
    unitsMap.set(s.id, {
      id: s.id,
      courseId: s.courseId,
      title: existing
        ? { ...existing.title, en: s.title, si: s.title }
        : makeLocalized(s.title),
      order: s.order,
      status: existing?.status ?? "published",
      nieUnitId: existing?.nieUnitId,
    });
  }

  const lessonsMap = new Map<string, Lesson>(
    seed.lessons.map((l) => [l.id, l]),
  );
  for (const l of legacyLessons) {
    const existing = lessonsMap.get(l.id);
    lessonsMap.set(l.id, {
      id: l.id,
      courseId: l.courseId,
      unitId: l.sectionId,
      order: l.order,
      kind: l.kind,
      title: existing
        ? { ...existing.title, en: l.title, si: l.title }
        : makeLocalized(l.title),
      durationMin: parseDurationMin(l.duration),
      status: l.published ? "published" : "draft",
      isFreePreview: existing?.isFreePreview,
      items: mapLegacyItems(l),
      quizId: l.quizId ?? undefined,
    });
  }

  const questionsMap = new Map<string, Question>(
    seed.questions.map((q) => [q.id, q]),
  );
  const quizzesMap = new Map<string, Quiz>(seed.quizzes.map((q) => [q.id, q]));
  for (const qz of legacyQuizzes) {
    const qIds: string[] = [];
    for (const q of qz.questions) {
      qIds.push(q.id);
      if (!questionsMap.has(q.id)) {
        questionsMap.set(q.id, {
          id: q.id,
          prompt: makeLocalized(q.prompt),
          options: q.options.map((opt) => makeLocalized(opt)),
          correctIndex: q.correctIndex,
          explanation: makeLocalized(q.explanation),
          subject: qz.subject || "Science",
          grade: toGrade(qz.grade),
          source: "teacher",
          difficulty: 2,
        });
      }
    }
    const existingQuiz = quizzesMap.get(qz.id);
    quizzesMap.set(qz.id, {
      id: qz.id,
      title: existingQuiz
        ? { ...existingQuiz.title, en: qz.title, si: qz.title }
        : makeLocalized(qz.title),
      subject: qz.subject,
      grade: toGrade(qz.grade),
      courseId: qz.courseId ?? undefined,
      unitId: qz.sectionId ?? undefined,
      questionIds: qIds,
      passMark:
        existingQuiz?.passMark ?? Math.max(1, Math.ceil(qIds.length * 0.6)),
      retriesAllowed: "unlimited",
      status: "published",
    });
  }

  return {
    ...seed,
    courses: [...coursesMap.values()],
    units: [...unitsMap.values()],
    lessons: [...lessonsMap.values()],
    questions: [...questionsMap.values()],
    quizzes: [...quizzesMap.values()],
  };
}
