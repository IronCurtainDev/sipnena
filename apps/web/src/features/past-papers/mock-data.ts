import type { StudyMedium } from "@/lib/language-types";

export type PaperType = "Part I MCQ" | "Part II Structured & Essay";

export interface McqQuestionItem {
  id: string;
  number: number;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface PartTwoQuestionItem {
  id: string;
  number: string;
  title: string;
  marks: number;
  prompt: string;
  markingScheme: string[];
}

export interface PastPaperItem {
  id: string;
  title: string;
  subject: string;
  grade: number;
  year: number;
  medium: StudyMedium;
  paperType: PaperType;
  durationMinutes: number;
  totalMarks: number;
  mcqs: McqQuestionItem[];
  partTwo: PartTwoQuestionItem[];
}

const DEFAULT_MCQS: McqQuestionItem[] = [
  {
    id: "pp-2023-sci-mcq-12",
    number: 1,
    prompt:
      "Which lens always produces a virtual, upright, and diminished image of a real object placed anywhere in front of it?",
    options: [
      "Convex lens",
      "Concave lens",
      "Plano-convex lens",
      "Cylindrical lens",
    ],
    correctIndex: 1,
    explanation:
      "A concave (diverging) lens always forms a virtual, upright, and diminished image between F and the optical centre.",
  },
  {
    id: "pp-mcq-2",
    number: 2,
    prompt: "What is the SI unit of electric current?",
    options: ["Volt (V)", "Ohm (Ω)", "Ampere (A)", "Watt (W)"],
    correctIndex: 2,
    explanation:
      "Electric current is measured in Amperes (A). Volt measures potential difference and Ohm measures resistance.",
  },
  {
    id: "pp-mcq-3",
    number: 3,
    prompt:
      "In the periodic table, which element belongs to Group VII (Halogens)?",
    options: ["Sodium (Na)", "Chlorine (Cl)", "Argon (Ar)", "Magnesium (Mg)"],
    correctIndex: 1,
    explanation:
      "Chlorine has 7 valence electrons (2,8,7), placing it in Group VII.",
  },
  {
    id: "pp-mcq-4",
    number: 4,
    prompt:
      "Which cell organelle is responsible for aerobic cellular respiration to release ATP energy?",
    options: ["Chloroplast", "Ribosome", "Mitochondrion", "Golgi body"],
    correctIndex: 2,
    explanation:
      "Mitochondria carry out aerobic respiration and generate ATP for cell activities.",
  },
];

const DEFAULT_PART_TWO: PartTwoQuestionItem[] = [
  {
    id: "p2-q1",
    number: "Question 1 (Structured)",
    title: "Ray Diagrams & Spherical Mirrors",
    marks: 10,
    prompt:
      "(a) State the two laws of reflection of light. (4 marks)\n(b) A concave mirror has a focal length of 15 cm. An object is placed 30 cm in front of the mirror. Calculate the radius of curvature and state two characteristics of the image formed. (6 marks)",
    markingScheme: [
      "(a) Incident ray, reflected ray, and normal at the point of incidence all lie in the same plane [2 marks].",
      "(a) Angle of incidence (i) equals angle of reflection (r) [2 marks].",
      "(b) R = 2f = 2 × 15 cm = 30 cm (Object is placed at C) [2 marks].",
      "(b) Image characteristics: Real, inverted, same size as object (any two valid points) [4 marks].",
    ],
  },
  {
    id: "p2-q2",
    number: "Question 2 (Essay)",
    title: "Photosynthesis & Gas Exchange in Plants",
    marks: 15,
    prompt:
      "(a) Write the balanced word equation for photosynthesis. (4 marks)\n(b) Describe a simple school laboratory test to show that starch is produced in a green leaf exposed to sunlight. (11 marks)",
    markingScheme: [
      "(a) Carbon dioxide + Water —(Light, Chlorophyll)→ Glucose + Oxygen [4 marks].",
      "(b) Boil leaf in water to kill cells and soften [3 marks]; boil in methylated spirit/alcohol in a water bath to remove chlorophyll [4 marks].",
      "(b) Rinse in warm water and add iodine solution; blue-black colour confirms starch [4 marks].",
    ],
  },
];

export const PAST_PAPERS: PastPaperItem[] = [
  {
    id: "ol-2024-science-p1",
    title: "G.C.E. O/L Science — 2024 Part I",
    subject: "Science",
    grade: 11,
    year: 2024,
    medium: "en",
    paperType: "Part I MCQ",
    durationMinutes: 60,
    totalMarks: 40,
    mcqs: DEFAULT_MCQS,
    partTwo: DEFAULT_PART_TWO,
  },
  {
    id: "ol-2023-maths-p2",
    title: "G.C.E. O/L Mathematics — 2023 Part II (සිංහල)",
    subject: "Mathematics",
    grade: 11,
    year: 2023,
    medium: "si",
    paperType: "Part II Structured & Essay",
    durationMinutes: 180,
    totalMarks: 100,
    mcqs: [
      {
        id: "math-mcq-1",
        number: 1,
        prompt: "If 3x + 5 = 20, what is the value of x?",
        options: ["3", "5", "7", "15"],
        correctIndex: 1,
        explanation: "3x = 20 - 5 = 15, therefore x = 5.",
      },
      {
        id: "math-mcq-2",
        number: 2,
        prompt:
          "What is the area of a triangle with base 12 cm and height 7 cm?",
        options: ["19 cm²", "38 cm²", "42 cm²", "84 cm²"],
        correctIndex: 2,
        explanation: "Area = ½ × base × height = ½ × 12 × 7 = 42 cm².",
      },
    ],
    partTwo: [
      {
        id: "math-p2-1",
        number: "Part A — Question 1",
        title: "Percentages & Simple Interest",
        marks: 10,
        prompt:
          "Nimal deposits Rs. 50,000 in a bank paying 8% annual simple interest. Calculate the total interest earned after 3 years and the final balance.",
        markingScheme: [
          "Annual interest = 50,000 × 8 / 100 = Rs. 4,000 [4 marks].",
          "Interest for 3 years = 4,000 × 3 = Rs. 12,000 [3 marks].",
          "Final balance = 50,000 + 12,000 = Rs. 62,000 [3 marks].",
        ],
      },
    ],
  },
  {
    id: "ol-2022-ict-p1",
    title: "G.C.E. O/L ICT — 2022 Part I & II (தமிழ்)",
    subject: "ICT",
    grade: 11,
    year: 2022,
    medium: "ta",
    paperType: "Part I MCQ",
    durationMinutes: 60,
    totalMarks: 40,
    mcqs: [
      {
        id: "ict-mcq-1",
        number: 1,
        prompt: "What is the binary equivalent of decimal number 13?",
        options: ["1011", "1101", "1110", "1001"],
        correctIndex: 1,
        explanation: "13 = 8 + 4 + 0 + 1 = 1101 in base 2.",
      },
      {
        id: "ict-mcq-2",
        number: 2,
        prompt: "Which HTML tag creates a hyperlink to another web page?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctIndex: 1,
        explanation: "The anchor tag <a href='...'> defines a hyperlink.",
      },
    ],
    partTwo: DEFAULT_PART_TWO,
  },
  {
    id: "ol-2025-history-p2",
    title: "G.C.E. O/L History — 2025 Model & Past Paper",
    subject: "History",
    grade: 11,
    year: 2025,
    medium: "si",
    paperType: "Part II Structured & Essay",
    durationMinutes: 120,
    totalMarks: 60,
    mcqs: DEFAULT_MCQS.slice(0, 2),
    partTwo: [
      {
        id: "hist-p2-1",
        number: "Question 1 (Map & Sources)",
        title: "Anuradhapura Irrigation Systems",
        marks: 12,
        prompt:
          "Name three major tanks built during the Anuradhapura period and explain two ways Bisokotuwa technology prevented tank bund erosion.",
        markingScheme: [
          "Any three valid tanks: Kala Wewa, Minneriya, Abhaya Wewa, Tissa Wewa, Padaviya [6 marks].",
          "Bisokotuwa (valve pit) regulated water pressure before releasing water through the sluice gate, preventing structural damage to the earthen bund [6 marks].",
        ],
      },
    ],
  },
  {
    id: "g8-2021-science-p1",
    title: "Grade 8 National Science — 2021 Assessment",
    subject: "Science",
    grade: 8,
    year: 2021,
    medium: "en",
    paperType: "Part I MCQ",
    durationMinutes: 45,
    totalMarks: 30,
    mcqs: DEFAULT_MCQS,
    partTwo: DEFAULT_PART_TWO,
  },
  {
    id: "ol-2019-english-p2",
    title: "G.C.E. O/L English Language — 2019 Part II",
    subject: "English",
    grade: 11,
    year: 2019,
    medium: "en",
    paperType: "Part II Structured & Essay",
    durationMinutes: 120,
    totalMarks: 60,
    mcqs: DEFAULT_MCQS.slice(0, 2),
    partTwo: DEFAULT_PART_TWO,
  },
  {
    id: "ol-2016-maths-p1",
    title: "G.C.E. O/L Mathematics — 2016 Classic Revision",
    subject: "Mathematics",
    grade: 11,
    year: 2016,
    medium: "si",
    paperType: "Part I MCQ",
    durationMinutes: 120,
    totalMarks: 50,
    mcqs: DEFAULT_MCQS,
    partTwo: DEFAULT_PART_TWO,
  },
];
