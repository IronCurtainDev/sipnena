export interface SubjectProgressItem {
  subject: string;
  completedUnits: number;
  totalUnits: number;
  pct: number;
}

export interface QuizHistoryItem {
  id: string;
  date: string;
  subject: string;
  title: string;
  score: string;
  pct: number;
  trend: string;
}

export interface MistakeBankQuestion {
  id: string;
  subject: string;
  source: string;
  prompt: string;
  yourWrongAnswer: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export const SUBJECT_PROGRESS: SubjectProgressItem[] = [
  { subject: "Science", completedUnits: 8, totalUnits: 12, pct: 67 },
  { subject: "Mathematics", completedUnits: 9, totalUnits: 12, pct: 75 },
  { subject: "ICT", completedUnits: 6, totalUnits: 10, pct: 60 },
  { subject: "History", completedUnits: 5, totalUnits: 9, pct: 56 },
  { subject: "English", completedUnits: 7, totalUnits: 10, pct: 70 },
];

export const QUIZ_HISTORY_ITEMS: QuizHistoryItem[] = [
  {
    id: "qh-1",
    date: "Yesterday",
    subject: "Science",
    title: "Mirrors & Spherical Reflection Checkpoint",
    score: "17 / 20",
    pct: 85,
    trend: "+10%",
  },
  {
    id: "qh-2",
    date: "3 days ago",
    subject: "Mathematics",
    title: "Geometry: Parallel Lines & Triangles",
    score: "14 / 20",
    pct: 70,
    trend: "+5%",
  },
  {
    id: "qh-3",
    date: "Last week",
    subject: "ICT",
    title: "Binary Conversion & Logic Gates",
    score: "18 / 20",
    pct: 90,
    trend: "+12%",
  },
  {
    id: "qh-4",
    date: "2 weeks ago",
    subject: "Science",
    title: "Microorganisms & Food Preservation",
    score: "15 / 20",
    pct: 75,
    trend: "Baseline",
  },
];

export const MISTAKE_BANK_ITEMS: MistakeBankQuestion[] = [
  {
    id: "mb-1",
    subject: "Science",
    source: "Unit 7 Light Quiz • Q4",
    prompt:
      "When an object is placed at the centre of curvature (C) of a concave mirror, where is the image formed?",
    yourWrongAnswer: "Between F and P",
    options: [
      "At infinity",
      "At C, real & inverted, same size",
      "Behind the mirror",
      "Between F and P",
    ],
    correctIndex: 1,
    explanation:
      "At C (2f), reflected rays converge back at C forming a real, inverted image of the exact same size.",
  },
  {
    id: "mb-2",
    subject: "Mathematics",
    source: "Term 2 Geometry • Q7",
    prompt: "The interior angles of a pentagon add up to how many degrees?",
    yourWrongAnswer: "360°",
    options: ["360°", "540°", "720°", "180°"],
    correctIndex: 1,
    explanation:
      "Sum of interior angles = (n - 2) × 180° = (5 - 2) × 180° = 540°.",
  },
  {
    id: "mb-3",
    subject: "ICT",
    source: "O/L 2022 Paper • Q11",
    prompt: "Which logic gate outputs 0 ONLY when both inputs are 1?",
    yourWrongAnswer: "NOR gate",
    options: ["XOR gate", "NAND gate", "NOR gate", "AND gate"],
    correctIndex: 1,
    explanation:
      "NAND is NOT-AND: 1 AND 1 = 1, inverted gives 0. All other input pairs produce 1.",
  },
];
