import type {
  EnrollmentCourseInfo,
  ReceiptInfo,
  StudentProfileInfo,
} from "./types";

export const MOCK_ENROLLMENT_COURSE: EnrollmentCourseInfo = {
  id: "sci-g8-full",
  gradeBadge: "Grade 8 Science • National Curriculum",
  unitBadge: "Unit 4",
  title: "Grade 8 Science: Full Year Masterclass",
  teacher: "Teacher Anura Jayasinghe",
  teacherRole: "BSc, PGDE • Senior Science Specialist",
  medium: "Sinhala & English Medium",
  terms: "Term 1, 2 & 3",
  feeAmount: 1500,
  originalFeeAmount: 2500,
  totalLessons: 32,
  totalQuizzes: 12,
  hasOfflineStudy: true,
  freePreviewsCount: 3,
  whatsIncluded: [
    {
      id: "inc-1",
      icon: "video",
      title: "32 Video Lessons + Sinhala & Tamil summaries",
    },
    {
      id: "inc-2",
      icon: "test",
      title: "12 Past Paper MCQ Tests with auto-marking",
    },
    {
      id: "inc-3",
      icon: "pdf",
      title: "Downloadable revision PDF short notes",
    },
  ],
};

export const MOCK_STUDENT_PROFILE: StudentProfileInfo = {
  name: "Kasun Perera",
  grade: "Grade 8",
  medium: "English Medium with Sinhala Vocabulary",
  phoneMasked: "077 ••• ••67",
  avatarSeed: "kasun",
};

export const MOCK_INITIAL_RECEIPT: ReceiptInfo = {
  receiptNumber: "TN-PAY-882910",
  referenceCode: "TN-REF-40918",
  date: "Today",
  time: "10:45 AM",
  amount: 1500,
  paymentMethodName: "Visa / Mastercard",
};
