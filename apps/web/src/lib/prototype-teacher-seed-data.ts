import {
  emptyLessonContent,
  type TeacherCourseDraft,
  type TeacherCourseSection,
  type TeacherLessonDraft,
  type TeacherLiveSession,
  type TeacherQuizDraft,
} from "./prototype-teacher-seed";

export const SEED_TEACHER_COURSES: TeacherCourseDraft[] = [
  {
    id: "tc-1",
    title: "Grade 8 Science — Light & Optics",
    subject: "Science",
    grade: 8,
    medium: "si",
    term: "Term 2",
    description:
      "Reflection, refraction, and mirror image formation for Grade 8 Term 2.",
    isFree: false,
    price: "Rs. 1,200",
    published: true,
    createdAt: "2026-03-01",
  },
  {
    id: "tc-2",
    title: "O/L Maths — Circle Theorems Clinic",
    subject: "Mathematics",
    grade: 11,
    medium: "en",
    term: "Term 2",
    description:
      "Angle at the centre, cyclic quads, and past-paper drill for O/L Maths.",
    isFree: true,
    price: null,
    published: true,
    createdAt: "2026-03-05",
  },
  {
    id: "tc-3",
    title: "Grade 9 ICT — Logic Gates Draft",
    subject: "ICT",
    grade: 9,
    medium: "ta",
    term: "Term 1",
    description: "Truth tables and NAND/NOR equivalents — draft for review.",
    isFree: true,
    price: null,
    published: false,
    createdAt: "2026-03-12",
  },
];

export const SEED_TEACHER_SECTIONS: TeacherCourseSection[] = [
  {
    id: "ts-1",
    courseId: "tc-1",
    title: "Section 1: Reflection",
    order: 0,
  },
  {
    id: "ts-2",
    courseId: "tc-1",
    title: "Section 2: Refraction",
    order: 1,
  },
  {
    id: "ts-3",
    courseId: "tc-2",
    title: "Section 1: Circle Theorems",
    order: 0,
  },
  {
    id: "ts-4",
    courseId: "tc-3",
    title: "Section 1: Logic Gates",
    order: 0,
  },
];

export const SEED_TEACHER_LESSONS: TeacherLessonDraft[] = [
  {
    ...emptyLessonContent(),
    id: "tl-1",
    courseId: "tc-1",
    sectionId: "ts-1",
    order: 0,
    title: "Unit 7.1 — Laws of Reflection & Plane Mirrors",
    subject: "Science",
    grade: 8,
    term: "Term 2",
    videoUrl: "https://media.sipnena.lk/g8-sci-u7-reflection.mp4",
    tuteName: "G8_Science_Unit7_Tute_SI_EN.pdf",
    duration: "18 mins",
    published: true,
    overviewTitle: "Laws of reflection",
    overviewBody:
      "The angle of incidence equals the angle of reflection. Both angles are measured from the normal.",
    formula: "i = r",
    educatorNote:
      "Measure both angles from the normal, not from the mirror surface.",
    rules: [
      {
        id: "r1",
        title: "Incident ray",
        body: "The ray that travels toward the mirror and meets it.",
      },
      {
        id: "r2",
        title: "Equal angles",
        body: "Angle of incidence equals angle of reflection.",
      },
    ],
    revisionNotes: [
      {
        id: "n1",
        title: "Normal line",
        body: "An imaginary line at 90° to the mirror at the point of incidence.",
      },
      {
        id: "n2",
        title: "Plane mirror",
        body: "The image is upright, virtual, and the same size as the object.",
      },
    ],
    files: [
      {
        id: "f1",
        title: "Unit 7 tute",
        meta: "PDF · G8_Science_Unit7_Tute_SI_EN.pdf",
      },
    ],
  },
  {
    ...emptyLessonContent(),
    id: "tl-quiz-1",
    courseId: "tc-1",
    sectionId: "ts-1",
    order: 1,
    kind: "quiz",
    title: "Term 2 Checkpoint — Light & Mirrors",
    subject: "Science",
    grade: 8,
    term: "Term 2",
    videoUrl: "",
    tuteName: "",
    duration: "",
    published: true,
    quizId: "tq-1",
  },
  {
    ...emptyLessonContent(),
    id: "tl-1b",
    courseId: "tc-1",
    sectionId: "ts-2",
    order: 0,
    title: "Unit 7.2 — Refraction through a Glass Slab",
    subject: "Science",
    grade: 8,
    term: "Term 2",
    videoUrl: "https://media.sipnena.lk/g8-sci-u7-refraction.mp4",
    tuteName: "G8_Science_Unit7_Refraction.pdf",
    duration: "20 mins",
    published: true,
  },
  {
    ...emptyLessonContent(),
    id: "tl-2",
    courseId: "tc-2",
    sectionId: "ts-3",
    order: 0,
    title: "O/L Circle Theorems — Angle at the Centre",
    subject: "Mathematics",
    grade: 11,
    term: "Term 2",
    videoUrl: "https://media.sipnena.lk/g11-math-circle-theorems.mp4",
    tuteName: "OL_Maths_Circle_Theorems_ShortNote.pdf",
    duration: "24 mins",
    published: true,
  },
];

export const SEED_TEACHER_QUIZZES: TeacherQuizDraft[] = [
  {
    id: "tq-1",
    title: "Term 2 Checkpoint — Light & Mirrors",
    subject: "Science",
    grade: 8,
    courseId: "tc-1",
    sectionId: "ts-1",
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
];

export const SEED_TEACHER_LIVE_SESSIONS: TeacherLiveSession[] = [
  {
    id: "live-mon-sci",
    day: "Mon",
    time: "04:30 PM",
    subject: "Science",
    grade: 8,
    topic: "Mirrors, Ray Diagrams & Focal Length Lab",
    mediumLabel: "Sinhala & English",
    channel: "Zoom Live",
    meetingUrl: "https://zoom.us/j/81234567890",
    materialsReady: true,
    streamKey: "sn-demo-mon-sci-8k2p",
  },
  {
    id: "live-sat-ol",
    day: "Sat",
    time: "08:30 AM",
    subject: "Science",
    grade: 11,
    topic: "G.C.E. O/L 2024 Part II Timed Workshop",
    mediumLabel: "All Mediums",
    channel: "YouTube Live",
    meetingUrl: "https://youtube.com/live/dQwSipNenaOL",
    materialsReady: false,
    streamKey: "sn-demo-sat-ol-4m9q",
  },
];
