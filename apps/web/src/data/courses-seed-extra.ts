import type { CourseStoreState } from "./course-types";

/** Fresh store — no demo students, classes, or courses. */
export const INITIAL_COURSE_STORE: CourseStoreState = {
  version: 2,
  activeStudentId: null,
  activeTeacherId: null,
  teachers: [],
  courses: [],
  units: [],
  lessons: [],
  quizzes: [],
  questions: [],
  classes: [],
  students: [],
  enrollments: [],
  progress: [],
  assignments: [],
  submissions: [],
  announcements: [],
  streakDays: 0,
  streakFreezeUsedThisWeek: false,
  lastStudyDate: "",
  leaderboardOptIn: false,
};
