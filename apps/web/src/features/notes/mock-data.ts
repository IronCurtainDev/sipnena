export type MaterialCategory =
  | "Lesson Tutes"
  | "Short Notes"
  | "Formula Sheets"
  | "Mind Maps"
  | "NIE Textbooks";

export interface StudyMaterialItem {
  id: string;
  category: MaterialCategory;
  title: string;
  subject: string;
  grade: number;
  medium: string;
  courseId: string;
  sizeLabel: string;
  pages: number;
  previewSummary: string;
  previewBullets: string[];
}

export const MATERIAL_CATEGORIES: Array<"All" | MaterialCategory> = [
  "All",
  "Lesson Tutes",
  "Short Notes",
  "Formula Sheets",
  "Mind Maps",
  "NIE Textbooks",
];

export const STUDY_MATERIALS: StudyMaterialItem[] = [
  {
    id: "tute-light-pdf",
    category: "Lesson Tutes",
    title: "Unit 7: Light, Mirrors & Ray Diagrams Tute (PDF)",
    subject: "Science",
    grade: 8,
    medium: "Sinhala & English",
    courseId: "sci-g8-full",
    sizeLabel: "1.8 MB",
    pages: 14,
    previewSummary:
      "Complete printable tuition tute covering Plane, Concave & Convex mirrors with 12 step-by-step ray diagrams.",
    previewBullets: [
      "Laws of reflection: Angle of incidence (i) = Angle of reflection (r)",
      "Concave mirror image cases: Object beyond C, at C, between C & F, and between F & P",
      "5 structured exam questions with grid spaces for school notebook drawing",
    ],
  },
  {
    id: "note-light-short",
    category: "Short Notes",
    title: "O/L Science — Electricity & Ohm's Law One-Page Note",
    subject: "Science",
    grade: 11,
    medium: "English & Tamil",
    courseId: "sci-g8-full",
    sizeLabel: "640 KB",
    pages: 2,
    previewSummary:
      "High-yield revision summary designed for night-before term test cramming.",
    previewBullets: [
      "V = IR (Potential Difference = Current × Resistance)",
      "Series circuit: Same current (I), voltage divides (V = V1 + V2)",
      "Parallel circuit: Same voltage (V), current divides (I = I1 + I2)",
    ],
  },
  {
    id: "note-algebra-formula",
    category: "Formula Sheets",
    title: "G.C.E. O/L Mathematics Master Formula Sheet (All 3 Terms)",
    subject: "Mathematics",
    grade: 11,
    medium: "Sinhala Medium (සිංහල)",
    courseId: "math-ol-rev",
    sizeLabel: "920 KB",
    pages: 4,
    previewSummary:
      "Every perimeter, area, volume, quadratic, trigonometry, and circle theorem formula tested in O/L Part I & II.",
    previewBullets: [
      "Cylinder TSA = 2πr(r + h) | Volume = πr²h",
      "Cone Curved Surface = πrl | Volume = ⅓πr²h",
      "Quadratic formula: x = (-b ± √(b² - 4ac)) / 2a",
    ],
  },
  {
    id: "mindmap-history-anuradhapura",
    category: "Mind Maps",
    title: "Anuradhapura Kingdom & Irrigation Kings Visual Mind Map",
    subject: "History",
    grade: 8,
    medium: "Sinhala & Tamil",
    courseId: "hist-g8-anu",
    sizeLabel: "1.1 MB",
    pages: 1,
    previewSummary:
      "Color-coded memory branch linking King Pandukabhaya, Devanampiya Tissa, Dutugemunu, Vasabha, and Mahasen.",
    previewBullets: [
      "King Vasabha: 11 tanks & 12 canals (Elahera canal)",
      "King Mahasen: Minneriya Wewa (Minneri Deviyo)",
      "King Dhatusena: Kala Wewa & Yoda Ela (54 miles, 6 inches/mile slope)",
    ],
  },
  {
    id: "textbook-sci-g8",
    category: "NIE Textbooks",
    title: "NIE Official Grade 8 Science Part II Textbook",
    subject: "Science",
    grade: 8,
    medium: "Sinhala / Tamil / English",
    courseId: "sci-g8-full",
    sizeLabel: "14.2 MB",
    pages: 168,
    previewSummary:
      "Official Department of Educational Publications school textbook compressed for fast Sri Lankan 4G mobile download.",
    previewBullets: [
      "Unit 7: Light & Reflection (Page 42–67)",
      "Unit 8: Human Organ Systems & Nervous Coordination",
      "Unit 9: Changes in Matter & Everyday Chemical Reactions",
    ],
  },
  {
    id: "tute-ict-logic",
    category: "Lesson Tutes",
    title: "Grade 10–11 ICT Logic Gates & Truth Tables Workbook",
    subject: "ICT",
    grade: 10,
    medium: "English Medium",
    courseId: "ict-g10-logic",
    sizeLabel: "1.3 MB",
    pages: 10,
    previewSummary:
      "AND, OR, NOT, NAND, NOR gate symbols, Boolean algebra identities, and 15 past O/L exercises.",
    previewBullets: [
      "Universal gates: Building NOT, AND, OR purely from NAND gates",
      "De Morgan's Laws: (A + B)' = A' · B' and (A · B)' = A' + B'",
      "3-input truth table step verification checklist",
    ],
  },
];
