import {
  getCourseProgressPercent,
  getLessonsForCourse,
  getUnitsForCourse,
  isCourseAssignedToStudent,
  pickLocalized,
  resolveActiveStudentId,
  type CourseStoreState,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";
import type { CourseItem } from "./mock-data";

export const CATALOG_EXTRA_COPY: Record<
  AppLanguage,
  {
    allGrades: string;
    fromTeacher: string;
    unitsWord: string;
    completedWord: string;
    mediumNames: Record<"si" | "ta" | "en", string>;
    mediumShort: Record<"si" | "ta" | "en", string>;
    termWord: (term: number) => string;
  }
> = {
  en: {
    allGrades: "All Grades",
    fromTeacher: "From my teacher",
    unitsWord: "units",
    completedWord: "done",
    mediumNames: {
      si: "Sinhala Medium",
      ta: "Tamil Medium",
      en: "English Medium",
    },
    mediumShort: { si: "Sinhala", ta: "Tamil", en: "English" },
    termWord: (term) => `Term ${term}`,
  },
  si: {
    allGrades: "සියලු ශ්‍රේණි",
    fromTeacher: "ගුරුවරයාගෙන්",
    unitsWord: "ඒකක",
    completedWord: "අවසන්",
    mediumNames: {
      si: "සිංහල මාධ්‍යය",
      ta: "දෙමළ මාධ්‍යය",
      en: "ඉංග්‍රීසි මාධ්‍යය",
    },
    mediumShort: { si: "සිංහල", ta: "දෙමළ", en: "ඉංග්‍රීසි" },
    termWord: (term) => `${term} වන වාරය`,
  },
  ta: {
    allGrades: "அனைத்து தரங்களும்",
    fromTeacher: "ஆசிரியரிடமிருந்து",
    unitsWord: "அலகுகள்",
    completedWord: "முடிந்தது",
    mediumNames: {
      si: "சிங்கள மொழி",
      ta: "தமிழ் மொழி",
      en: "ஆங்கில மொழி",
    },
    mediumShort: { si: "சிங்களம்", ta: "தமிழ்", en: "ஆங்கிலம்" },
    termWord: (term) => `தவணை ${term}`,
  },
};

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

export function buildCatalogCourses(
  state: CourseStoreState,
  lang: AppLanguage,
): CourseItem[] {
  const extra = CATALOG_EXTRA_COPY[lang];
  return state.courses
    .filter((c) => c.status === "published")
    .map((course, idx) => {
      const units = getUnitsForCourse(state, course.id, {
        includeDrafts: false,
      });
      const lessons = getLessonsForCourse(state, course.id, {
        includeDrafts: false,
      });
      const videosCount = lessons.filter((l) => l.kind === "video").length;
      const totalMin = lessons.reduce(
        (sum, l) => sum + (l.durationMin ?? 0),
        0,
      );
      const computedHours =
        totalMin > 0
          ? Math.max(0.5, Math.round((totalMin / 60) * 10) / 10).toFixed(1)
          : (course.hoursLabel ?? "0");
      const studentId = resolveActiveStudentId(state.activeStudentId);
      const progress = getCourseProgressPercent(state, studentId, course.id);
      const isAssigned = isCourseAssignedToStudent(
        state,
        course.id,
        studentId,
      );
      const mediumBadgeKey =
        course.medium === "si"
          ? "mediumSinhala"
          : course.medium === "ta"
            ? "mediumTamil"
            : "mediumEnglish";
      const teacher = course.teacherName?.trim() || "";

      return {
        id: course.id,
        key: "dynamic",
        grade: String(course.grade),
        medium: course.medium,
        isFree: course.isFree,
        price:
          !course.isFree && course.priceLkr
            ? `Rs. ${course.priceLkr.toLocaleString("en-LK")}`
            : null,
        videosCount: videosCount || lessons.length,
        lessonsCount: lessons.length,
        unitsCount: units.length,
        hours: computedHours,
        rating: course.rating ?? "",
        reviews: course.reviewsCount ?? 0,
        teacher,
        teacherInitials: initialsFromName(teacher || "SN"),
        avatarClass: "bg-[var(--sn-sage)] text-[var(--sn-text-main)]",
        unitKey: "unit_wavesOptics",
        mediumBadgeKey,
        popularRank: isAssigned ? idx : idx + 10,
        title: pickLocalized(course.title, lang),
        desc: pickLocalized(course.description, lang),
        unitLabel: `${course.subject} · ${extra.termWord(course.term)}`,
        mediumLabel: extra.mediumShort[course.medium],
        mediumDesktopLabel: extra.mediumNames[course.medium],
        isAssigned,
        progressPercent: progress.percent,
        coverImageUrl: course.coverImageUrl,
        searchBlob: [
          course.title.en,
          course.title.si,
          course.title.ta,
          course.subject,
          course.teacherName,
          course.description.en,
          course.description.si,
          course.description.ta,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      };
    });
}
