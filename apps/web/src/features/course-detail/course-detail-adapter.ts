import {
  getCourseById,
  getLessonsForUnit,
  getUnitsForCourse,
  isCourseAssignedToStudent,
  pickLocalized,
  resolveActiveStudentId,
  type CourseStoreState,
  type ItemKind,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import type { CourseDetailData, LessonType } from "./mock-data";

const KIND_LABELS: Record<AppLanguage, Record<ItemKind, string>> = {
  en: {
    video: "Video lesson",
    quiz: "Checkpoint quiz",
    lab: "Interactive activity",
    reading: "Reading",
    pdf: "Worksheet PDF",
    assignment: "Assignment",
    live: "Live class",
  },
  si: {
    video: "වීඩියෝ පාඩම",
    quiz: "ඇගයීම් ප්‍රශ්නාවලිය",
    lab: "ක්‍රියාකාරකම",
    reading: "කියවීම් සටහන",
    pdf: "PDF පත්‍රිකාව",
    assignment: "පැවරුම",
    live: "සජීවී පන්තිය",
  },
  ta: {
    video: "வீடியோ பாடம்",
    quiz: "மதிப்பீட்டு வினாடி",
    lab: "செயல்பாடு",
    reading: "வாசிப்புக் குறிப்பு",
    pdf: "PDF பயிற்சி",
    assignment: "ஒப்படைப்பு",
    live: "நேரலை வகுப்பு",
  },
};

function mapKindToLessonType(kind: ItemKind): LessonType {
  if (kind === "quiz") return "quiz";
  if (kind === "reading" || kind === "pdf") return "note";
  if (kind === "assignment" || kind === "lab") return kind;
  return "video";
}

function initialsFromName(name: string): string {
  const parts = name
    .replace(/^(Ms\.|Mr\.|Dr\.)\s*/i, "")
    .trim()
    .split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "SN";
}

function formatDurationMinutes(totalMin: number): string {
  if (totalMin <= 0) return "0m";
  const hrs = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
}

function mediumLabel(lang: AppLanguage, medium: "si" | "ta" | "en"): string {
  if (lang === "si") {
    if (medium === "si") return "සිංහල මාධ්‍යය";
    if (medium === "ta") return "දෙමළ මාධ්‍යය";
    return "ඉංග්‍රීසි මාධ්‍යය";
  }
  if (lang === "ta") {
    if (medium === "ta") return "தமிழ் மொழி";
    if (medium === "si") return "சிங்கள மொழி";
    return "ஆங்கில மொழி";
  }
  if (medium === "si") return "Sinhala Medium";
  if (medium === "ta") return "Tamil Medium";
  return "English Medium";
}

/** Build detail view from localStorage store only — no mock catalog merge. */
export function buildCourseDetailFromStore(
  state: CourseStoreState,
  rawCourseId: string | undefined,
  lang: AppLanguage,
  options?: { includeDrafts?: boolean },
): CourseDetailData | null {
  const course = getCourseById(state, rawCourseId);
  if (!course) return null;

  const includeDrafts = options?.includeDrafts ?? false;
  const units = getUnitsForCourse(state, course.id, { includeDrafts });
  const unitWord = lang === "si" ? "ඒකකය" : lang === "ta" ? "அலகு" : "Unit";
  const lessonWord =
    lang === "si" ? "පාඩම්" : lang === "ta" ? "பாடங்கள்" : "lessons";
  const minWord = lang === "si" ? "මි." : lang === "ta" ? "நிமி" : "min";
  const freeLabel =
    lang === "si" ? "නොමිලේ" : lang === "ta" ? "இலவசம்" : "Free";

  let totalLessons = 0;
  let totalMin = 0;
  const isAssigned = isCourseAssignedToStudent(
    state,
    course.id,
    resolveActiveStudentId(state.activeStudentId),
  );

  const modules = units.map((unit, uIdx) => {
    const lessons = getLessonsForUnit(state, unit.id, { includeDrafts });
    totalLessons += lessons.length;
    const unitMinutes = lessons.reduce(
      (acc, l) => acc + (l.durationMin ?? 0),
      0,
    );
    totalMin += unitMinutes;

    return {
      id: unit.id,
      number: uIdx + 1,
      locked: false,
      title: pickLocalized(unit.title, lang, `${unitWord} ${uIdx + 1}`),
      meta: `${lessons.length} ${lessonWord} · ${formatDurationMinutes(unitMinutes)}`,
      status: unit.status,
      lessons: lessons.map((lesson) => {
        const isFreePreview = Boolean(lesson.isFreePreview);
        return {
          id: lesson.id,
          type: mapKindToLessonType(lesson.kind),
          isFreePreview,
          accessible: course.isFree || isAssigned || isFreePreview,
          mins: lesson.durationMin ?? 0,
          title: pickLocalized(lesson.title, lang),
          meta: `${KIND_LABELS[lang][lesson.kind]} · ${lesson.durationMin ?? 0} ${minWord}`,
          quizId: lesson.quizId,
          status: lesson.status,
        };
      }),
    };
  });

  const teacherName = course.teacherName?.trim() || "";
  const priceCurrent =
    course.isFree || !course.priceLkr
      ? freeLabel
      : `Rs. ${course.priceLkr.toLocaleString("en-LK")}`;

  return {
    id: course.id,
    grade: String(course.grade),
    rating: course.rating ?? "",
    reviewsCount: course.reviewsCount ?? 0,
    duration: formatDurationMinutes(totalMin),
    lessonsTotal: totalLessons,
    studentsEnrolled: "",
    trailerLength: "",
    priceCurrent,
    priceOriginal: "",
    discountLabel: course.isFree ? freeLabel : "",
    outcomes: [],
    modules,
    instructor: {
      name: teacherName,
      initials: initialsFromName(teacherName || "SN"),
      rating: course.rating ?? "",
      studentsTaught: "",
      yearsTeaching: "",
    },
    reviews: [],
    inclusions: [],
    title: pickLocalized(course.title, lang),
    description: pickLocalized(course.description, lang),
    subjectGradePill: `${course.subject} · ${
      lang === "si"
        ? `${course.grade} ශ්‍රේණිය`
        : lang === "ta"
          ? `தரம் ${course.grade}`
          : `Grade ${course.grade}`
    }`,
    mediumPill: mediumLabel(lang, course.medium),
    isFree: course.isFree,
    isAssigned,
    coverImageUrl: course.coverImageUrl,
  };
}
