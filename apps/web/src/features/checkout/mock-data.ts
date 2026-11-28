import type {
  EnrollmentCourseInfo,
  ReceiptInfo,
  StudentProfileInfo,
} from "./types";

/** Placeholders only — checkout screen must fill from localStorage / route. */
export const EMPTY_ENROLLMENT_COURSE: EnrollmentCourseInfo = {
  id: "",
  gradeBadge: "",
  unitBadge: "",
  title: "No course selected",
  teacher: "",
  teacherRole: "",
  medium: "",
  terms: "",
  feeAmount: 0,
  originalFeeAmount: 0,
  totalLessons: 0,
  totalQuizzes: 0,
  hasOfflineStudy: false,
  freePreviewsCount: 0,
  whatsIncluded: [],
};

export const EMPTY_STUDENT_PROFILE: StudentProfileInfo = {
  name: "Student",
  grade: "",
  medium: "",
  phoneMasked: "",
  avatarSeed: "student",
};

export const EMPTY_RECEIPT: ReceiptInfo = {
  receiptNumber: "",
  referenceCode: "",
  date: "",
  time: "",
  amount: 0,
  paymentMethodName: "",
};

/** @deprecated Use EMPTY_* — kept so older imports compile during migration. */
export const MOCK_ENROLLMENT_COURSE = EMPTY_ENROLLMENT_COURSE;
export const MOCK_STUDENT_PROFILE = EMPTY_STUDENT_PROFILE;
export const MOCK_INITIAL_RECEIPT = EMPTY_RECEIPT;
