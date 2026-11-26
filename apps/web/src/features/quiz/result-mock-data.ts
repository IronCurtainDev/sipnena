import type { QuestionResultItem, QuizResultSummary } from "./result-types";

export const SAMPLE_RESULT_QUESTIONS: QuestionResultItem[] = [
  {
    id: 1,
    questionNumber: 1,
    title: "What is a normal line in reflection?",
    topicTitle: "Rectilinear Propagation & Normal",
    isCorrect: true,
    userAnswer: "A dashed line perpendicular (90°) to mirror surface",
    correctAnswer: "A dashed line perpendicular (90°) to mirror surface",
    teacherTip:
      "Normal is drawn perpendicular (90°) at the point of incidence.",
    lessonRef: "Lesson 1: Introduction to Light & Rays",
    marks: 1,
  },
  {
    id: 2,
    questionNumber: 2,
    title: "Angle of incidence equals angle of reflection",
    topicTitle: "First Law of Regular Reflection",
    isCorrect: true,
    userAnswer: "Angle of incidence equals angle of reflection (i = r)",
    correctAnswer: "Angle of incidence equals angle of reflection (i = r)",
    teacherTip: "Always measure both angles starting from the normal line.",
    lessonRef: "Lesson 2: Laws of Reflection on Plane Mirrors",
    marks: 1,
  },
  {
    id: 3,
    questionNumber: 3,
    title: "When incident ray is 35°, angle of reflection is?",
    topicTitle: "First Law Angle Calculation",
    isCorrect: false,
    userAnswer: "At 55° (angle with mirror surface)",
    correctAnswer: "35° (equal to incidence, measured from normal)",
    teacherTip:
      "Don't measure against the mirror! Always measure from the 90° normal line.",
    lessonRef: "Lesson 2: Laws of Reflection & Ray Tracing",
    marks: 0,
  },
  {
    id: 4,
    questionNumber: 4,
    title: "Reflection from a smooth polished plane mirror",
    topicTitle: "Virtual Image Formation",
    isCorrect: true,
    userAnswer: "Forms an erect, virtual image with lateral inversion",
    correctAnswer: "Forms an erect, virtual image with lateral inversion",
    teacherTip:
      "Plane mirror images are virtual because rays only appear to meet behind.",
    lessonRef: "Lesson 2: Laws of Reflection on Plane Mirrors",
    marks: 1,
  },
  {
    id: 5,
    questionNumber: 5,
    title: "Identify principal axis on a concave mirror",
    topicTitle: "Curved Mirror Terminology",
    isCorrect: false,
    userAnswer: "The tangent line to the mirror surface at upper boundary",
    correctAnswer:
      "Straight line passing through both Center of Curvature (C) and Pole (P)",
    teacherTip:
      "The principal axis is the imaginary symmetry line cutting through C and P.",
    lessonRef: "Lesson 3: Spherical Mirrors & Ray Construction",
    marks: 0,
  },
  {
    id: 6,
    questionNumber: 6,
    title: "Parallel rays converge at focal point F",
    topicTitle: "Principal Focus of Concave Mirrors",
    isCorrect: false,
    userAnswer: "Rays diverge away toward infinity",
    correctAnswer:
      "Incoming parallel rays bounce inward and meet at Principal Focus (F)",
    teacherTip:
      "Concave mirrors are converging mirrors—they gather light rays.",
    lessonRef: "Lesson 3: Spherical Mirrors & Ray Construction",
    marks: 0,
  },
  {
    id: 7,
    questionNumber: 7,
    title: "Nature of image formed in a plane mirror",
    topicTitle: "Plane Mirror Characteristics",
    isCorrect: true,
    userAnswer: "Virtual, upright, same size, laterally inverted",
    correctAnswer: "Virtual, upright, same size, laterally inverted",
    teacherTip:
      "Left and right are swapped; distance in front equals distance behind.",
    lessonRef: "Lesson 2: Laws of Reflection on Plane Mirrors",
    marks: 1,
  },
  {
    id: 8,
    questionNumber: 8,
    title: "Relationship between radius R and focal length f",
    topicTitle: "Focal Formula (f = R / 2)",
    isCorrect: false,
    userAnswer: "f = 2 * R (focal length is double the radius)",
    correctAnswer: "f = R / 2 (focal length is exactly half of the radius)",
    teacherTip:
      "Principal focus (F) sits exactly midway between Pole (P) and Center (C).",
    lessonRef: "Lesson 3: Spherical Mirrors & Ray Construction",
    marks: 0,
  },
  {
    id: 9,
    questionNumber: 9,
    title: "Law of coplanar rays in reflection",
    topicTitle: "Second Law of Reflection",
    isCorrect: false,
    userAnswer: "Rays travel on separate 3D planes after bounce",
    correctAnswer:
      "Incident ray, reflected ray, and normal all lie on the exact same plane",
    teacherTip:
      "Imagine all three lines drawn on one flat sheet of drawing paper.",
    lessonRef: "Lesson 2: Laws of Reflection on Plane Mirrors",
    marks: 0,
  },
  {
    id: 10,
    questionNumber: 10,
    title: "Real vs virtual image characteristics",
    topicTitle: "Optical Ray Tracing Principles",
    isCorrect: false,
    userAnswer: "Virtual images can be caught on a cinema screen",
    correctAnswer: "Real images can be cast on a screen; virtual images cannot",
    teacherTip:
      "Real rays converge to create real images; virtual rays only appear to diverge.",
    lessonRef: "Lesson 3: Spherical Mirrors & Ray Construction",
    marks: 0,
  },
];

export const MOCK_FAIL_RESULT: QuizResultSummary = {
  score: 4,
  totalQuestions: 10,
  passScore: 6,
  isPassed: false,
  timeSpent: "11m 15s",
  attemptsUsed: 1,
  unitTitle: "Unit 1: Fundamentals of Light & Reflection",
  scienceTip:
    "Ray diagrams on curved mirrors often trip students up. Review Questions 3, 5, 6, and 8 before your next attempt!",
  questions: SAMPLE_RESULT_QUESTIONS,
};

export const MOCK_PASS_RESULT: QuizResultSummary = {
  score: 8,
  totalQuestions: 10,
  passScore: 6,
  isPassed: true,
  timeSpent: "8m 42s",
  attemptsUsed: 2,
  unitTitle: "Unit 1: Fundamentals of Light & Reflection",
  unlockedLessonTitle: "Lesson 4: Curved Mirrors & Real-World Ray Tracing",
  scienceTip:
    "Terrific job! You demonstrated strong mastery of reflection rules and ray construction.",
  questions: SAMPLE_RESULT_QUESTIONS.map((q, idx) => ({
    ...q,
    isCorrect: idx !== 4 && idx !== 7, // 8 correct, 2 need review
    marks: idx !== 4 && idx !== 7 ? 1 : 0,
  })),
};
