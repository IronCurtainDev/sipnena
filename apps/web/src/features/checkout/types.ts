export type CheckoutViewMode =
  | "student_intro"
  | "parent_pay"
  | "payment_failed"
  | "payment_success"
  | "payment_pending";

export type PaymentMethodType = "card" | "bank_transfer";

export interface EnrollmentCourseInfo {
  id: string;
  gradeBadge: string;
  unitBadge: string;
  title: string;
  teacher: string;
  teacherRole: string;
  medium: string;
  terms: string;
  feeAmount: number;
  originalFeeAmount: number;
  totalLessons: number;
  totalQuizzes: number;
  hasOfflineStudy: boolean;
  freePreviewsCount: number;
  whatsIncluded: Array<{
    id: string;
    icon: "video" | "test" | "pdf";
    title: string;
  }>;
}

export interface StudentProfileInfo {
  name: string;
  grade: string;
  medium: string;
  phoneMasked: string;
  avatarSeed: string;
}

export interface ReceiptInfo {
  receiptNumber: string;
  referenceCode: string;
  date: string;
  time: string;
  amount: number;
  paymentMethodName: string;
}
