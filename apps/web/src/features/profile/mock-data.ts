export interface StudentAvatar {
  id: string;
  name: string;
  role: string;
  accentColor: string;
  bgColor: string;
}

export const STUDENT_AVATARS: StudentAvatar[] = [
  {
    id: "kasun",
    name: "Kasun (Current)",
    role: "Junior Secondary Student",
    accentColor: "#2563EB",
    bgColor: "#EFF6FF",
  },
  {
    id: "scholar-girl",
    name: "Scholar Girl",
    role: "Diligent Learner",
    accentColor: "#DC2626",
    bgColor: "#FEF2F2",
  },
  {
    id: "junior-cap",
    name: "Junior Cap",
    role: "Academic Achiever",
    accentColor: "#0D9488",
    bgColor: "#F0FDFA",
  },
  {
    id: "prefect",
    name: "Prefect",
    role: "Student Leader",
    accentColor: "#4F46E5",
    bgColor: "#EEF2FF",
  },
  {
    id: "explorer",
    name: "Explorer",
    role: "Young Scientist",
    accentColor: "#D97706",
    bgColor: "#FFFBEB",
  },
  {
    id: "reader",
    name: "Reader",
    role: "Book Enthusiast",
    accentColor: "#059669",
    bgColor: "#ECFDF5",
  },
];

export interface StudentReceipt {
  id: string;
  courseTitle: string;
  packName: string;
  amount: string;
  date: string;
  bankMethod: string;
  status: "Paid";
}

export const STUDENT_RECEIPTS: StudentReceipt[] = [
  {
    id: "rec-1",
    courseTitle: "Science: Light & Curved Mirrors",
    packName: "Term 1 Study Pack",
    amount: "Rs. 1,500",
    date: "12 Jan 2024",
    bankMethod: "Commercial Bank / Genie",
    status: "Paid",
  },
  {
    id: "rec-2",
    courseTitle: "Grade 8 Mathematics Term 1",
    packName: "Term 1 Geometry Pack",
    amount: "Rs. 1,500",
    date: "15 Jan 2024",
    bankMethod: "Commercial Bank / Genie",
    status: "Paid",
  },
];

export interface GradeOption {
  value: string;
  label: string;
  sub: string;
  isCurrent?: boolean;
}

export const GRADE_OPTIONS: GradeOption[] = [
  { value: "6", label: "Grade 6", sub: "Junior Secondary (NIE Foundation)" },
  { value: "7", label: "Grade 7", sub: "Junior Secondary (NIE Foundation)" },
  {
    value: "8",
    label: "Grade 8",
    sub: "Junior Secondary (Current Grade)",
    isCurrent: true,
  },
  { value: "9", label: "Grade 9", sub: "Junior Secondary (Pre-O/L Prep)" },
  {
    value: "10",
    label: "Grade 10",
    sub: "Senior Secondary (G.C.E. O/L Foundation)",
  },
  {
    value: "11",
    label: "Grade 11",
    sub: "Senior Secondary (G.C.E. O/L Exam Year)",
  },
];
