export interface QuizOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  subtext?: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id: number;
  questionNumber: number;
  totalQuestions: number;
  gradeBadge: string;
  subjectBadge: string;
  title: string;
  diagramType: "plane_reflection" | "concave_focus" | "convex_diverge";
  incidentAngle?: number;
  reflectedAngle?: number;
  showLawBadge?: boolean;
  showDiagram?: boolean;
  options: QuizOption[];
  explanation: {
    title: string;
    body: string;
    formula?: string;
    textbookRef?: string;
  };
}

export interface QuizOverviewData {
  title: string;
  subtitle: string;
  unitBadge: string;
  gradeBadge: string;
  termBadge: string;
  bilingualSubtitle: string;
  moduleName: string;
  moduleSinhala: string;
  totalQuestions: number;
  estMinutes: number;
  passScore: number;
  nationalAvgTarget: number;
  teacherNote: {
    author: string;
    quote: string;
  };
  topics: Array<{
    id: number;
    title: string;
    subtitle: string;
  }>;
}
