import type { StudyMedium } from "./language-types";

export type DemoRole = "student" | "parent" | "teacher" | "admin";
export type DataSaverQuality = "low" | "medium" | "high";
export type PaymentVerificationStatus = "pending" | "approved" | "rejected";

export interface PrototypeBankSlip {
  id: string;
  studentName: string;
  grade: number;
  courseTitle: string;
  bankName: string;
  referenceCode: string;
  amount: number;
  uploadedAt: string;
  status: PaymentVerificationStatus;
  reason?: string;
  slipFileName: string;
}

export interface PrototypeDoubt {
  id: string;
  studentName: string;
  grade: number;
  subject: string;
  courseId: string;
  lessonTitle: string;
  timestampTag?: string;
  question: string;
  photoLabel?: string;
  createdAt: string;
  status: "answered" | "pending";
  upvotes: number;
  upvoted?: boolean;
  reply?: {
    teacherName: string;
    text: string;
    repliedAt: string;
  };
}

export interface TeacherLessonDraft {
  id: string;
  title: string;
  subject: string;
  grade: number;
  term: "Term 1" | "Term 2" | "Term 3";
  videoUrl: string;
  tuteName: string;
  duration: string;
  published: boolean;
}

export interface QuizQuestionDraft {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface TeacherQuizDraft {
  id: string;
  title: string;
  subject: string;
  grade: number;
  questions: QuizQuestionDraft[];
}

export interface PrototypeState {
  role: DemoRole;
  grade: number;
  medium: StudyMedium;
  studentName: string;
  selectedSubjects: string[];
  olBaskets: {
    basket1: string;
    basket2: string;
    basket3: string;
  };
  bookmarkedIds: string[];
  downloadedIds: string[];
  dataSaverQuality: DataSaverQuality;
  wifiOnlyDownloads: boolean;
  recentSearches: string[];
  readNotificationIds: string[];
  bankSlips: PrototypeBankSlip[];
  doubts: PrototypeDoubt[];
  teacherLessons: TeacherLessonDraft[];
  teacherQuizzes: TeacherQuizDraft[];
  activeChildId: string;
}

export const INITIAL_PROTOTYPE_STATE: PrototypeState = {
  role: "student",
  grade: 8,
  medium: "si",
  studentName: "Kasun Perera",
  selectedSubjects: [
    "maths",
    "science",
    "english",
    "firstLang",
    "history",
    "ict",
  ],
  olBaskets: {
    basket1: "commerce",
    basket2: "art",
    basket3: "ict",
  },
  bookmarkedIds: [
    "les-light-4",
    "note-light-short",
    "pp-2023-sci-mcq-12",
    "note-algebra-formula",
  ],
  downloadedIds: ["tute-light-pdf", "textbook-sci-g8", "video-mirrors-4"],
  dataSaverQuality: "medium",
  wifiOnlyDownloads: true,
  recentSearches: ["Alokaya", "Quadratic equations", "ගණිතය 2023", "Newton"],
  readNotificationIds: ["notif-4"],
  activeChildId: "kasun",
  bankSlips: [
    {
      id: "slip-101",
      studentName: "Kasun Perera",
      grade: 8,
      courseTitle: "Grade 8 Science: Full Year Masterclass",
      bankName: "Bank of Ceylon (BOC)",
      referenceCode: "BOC-2026-44190",
      amount: 1500,
      uploadedAt: "Today, 10:42 AM",
      status: "pending",
      slipFileName: "boc_deposit_kasun_g8.jpg",
    },
    {
      id: "slip-102",
      studentName: "Nethmi Fernando",
      grade: 11,
      courseTitle: "G.C.E. O/L Mathematics Past Paper Clinic",
      bankName: "Commercial Bank of Ceylon",
      referenceCode: "COMB-2026-78214",
      amount: 2200,
      uploadedAt: "Yesterday, 4:15 PM",
      status: "pending",
      slipFileName: "comb_transfer_nethmi_ol.png",
    },
    {
      id: "slip-103",
      studentName: "Kavindu Silva",
      grade: 9,
      courseTitle: "Grade 9 Term 2 Science + Maths Bundle",
      bankName: "Sampath Bank",
      referenceCode: "SAMP-2026-11904",
      amount: 1800,
      uploadedAt: "2 days ago",
      status: "approved",
      slipFileName: "sampath_vishwa_kavindu.jpg",
    },
  ],
  doubts: [
    {
      id: "doubt-1",
      studentName: "Kasun Perera",
      grade: 8,
      subject: "Science",
      courseId: "sci-g8-full",
      lessonTitle: "Mirrors & Image Formation",
      timestampTag: "08:24",
      question:
        "If an object is placed between the focal point (F) and pole (P) of a concave mirror, why is the image virtual and upright?",
      photoLabel: "ray_diagram_sketch.jpg",
      createdAt: "2 hours ago",
      status: "answered",
      upvotes: 14,
      reply: {
        teacherName: "Ms. Menaka Jayawardena",
        text: "When the object is inside the focal length (between F and P), reflected rays diverge and only appear to meet behind the mirror. That is why a shaving/makeup mirror shows an enlarged upright virtual image!",
        repliedAt: "45 mins ago",
      },
    },
    {
      id: "doubt-2",
      studentName: "Nethmi Fernando",
      grade: 11,
      subject: "Mathematics",
      courseId: "math-ol-rev",
      lessonTitle: "Quadratic Equations & Graphs",
      timestampTag: "14:10",
      question:
        "In 2022 O/L Part II Question 3(b), should we give the roots of x² - 5x + 3 = 0 rounded to 1 decimal place using the graph or formula?",
      createdAt: "4 hours ago",
      status: "pending",
      upvotes: 6,
    },
    {
      id: "doubt-3",
      studentName: "Sahan Bandara",
      grade: 10,
      subject: "ICT",
      courseId: "ict-g10-logic",
      lessonTitle: "Logic Gates & Truth Tables",
      timestampTag: "05:40",
      question:
        "How do I quickly draw a NAND gate equivalent of an OR gate for structured essay questions?",
      createdAt: "Yesterday",
      status: "answered",
      upvotes: 11,
      reply: {
        teacherName: "Ms. Dilani Silva",
        text: "Invert both inputs A and B using two single-input NAND gates, then feed those two outputs into a third NAND gate (De Morgan's law: A + B = (A' · B')').",
        repliedAt: "Yesterday",
      },
    },
  ],
  teacherLessons: [
    {
      id: "tl-1",
      title: "Unit 7.1 — Laws of Reflection & Plane Mirrors",
      subject: "Science",
      grade: 8,
      term: "Term 2",
      videoUrl: "https://media.sipnena.lk/g8-sci-u7-reflection.mp4",
      tuteName: "G8_Science_Unit7_Tute_SI_EN.pdf",
      duration: "18 mins",
      published: true,
    },
    {
      id: "tl-2",
      title: "O/L Circle Theorems — Angle at the Centre",
      subject: "Mathematics",
      grade: 11,
      term: "Term 2",
      videoUrl: "https://media.sipnena.lk/g11-math-circle-theorems.mp4",
      tuteName: "OL_Maths_Circle_Theorems_ShortNote.pdf",
      duration: "24 mins",
      published: true,
    },
  ],
  teacherQuizzes: [
    {
      id: "tq-1",
      title: "Term 2 Checkpoint — Light & Mirrors",
      subject: "Science",
      grade: 8,
      questions: [
        {
          id: "q1",
          prompt:
            "If the angle of incidence on a plane mirror is 35°, what is the angle between the incident ray and reflected ray?",
          options: ["35°", "55°", "70°", "90°"],
          correctIndex: 2,
          explanation:
            "Angle of reflection equals angle of incidence (35°), so total angle = 35° + 35° = 70°.",
        },
        {
          id: "q2",
          prompt: "Which mirror is used as a vehicle side rear-view mirror?",
          options: [
            "Concave mirror",
            "Convex mirror",
            "Plane mirror",
            "Parabolic mirror",
          ],
          correctIndex: 1,
          explanation:
            "A convex mirror gives a wider field of view and always forms an upright diminished image.",
        },
      ],
    },
  ],
};
