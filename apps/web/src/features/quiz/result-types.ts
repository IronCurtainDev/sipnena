export interface QuestionResultItem {
  id: number;
  questionNumber: number;
  title: string;
  topicTitle: string;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  teacherTip: string;
  lessonRef: string;
  marks: number;
}

export interface QuizResultSummary {
  score: number;
  totalQuestions: number;
  passScore: number;
  isPassed: boolean;
  timeSpent: string;
  attemptsUsed: number;
  unitTitle: string;
  unlockedLessonTitle?: string;
  scienceTip: string;
  questions: QuestionResultItem[];
}
