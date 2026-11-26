export interface LandingGradeItem {
  id: string;
  gradeNumber: number;
  labelEn: string;
  labelSi: string;
  labelTa: string;
  isOL?: boolean;
}

export interface LandingSubjectItem {
  id: string;
  titleEn: string;
  titleSi: string;
  titleTa: string;
  colorClass: string;
  iconBg: string;
}

export interface LandingStepItem {
  step: number;
  titleEn: string;
  titleSi: string;
  descEn: string;
  descSi: string;
  badgeBg: string;
}

export interface LandingFeatureItem {
  id: string;
  iconName: "languages" | "smartphone" | "list-checks" | "play";
  titleEn: string;
  titleSi: string;
  descEn: string;
  descSi: string;
}

export interface LandingParentCheckItem {
  id: string;
  titleEn: string;
  titleSi: string;
  descEn: string;
  descSi: string;
}

export interface LandingSampleCourse {
  id: string;
  gradeBadge: string;
  subjectBadge: string;
  title: string;
  teacher: string;
  thumbnailType: "science" | "maths" | "english";
}

export interface LandingFaqItem {
  id: string;
  questionEn: string;
  questionSi: string;
  questionTa: string;
  answerEn: string;
  answerSi: string;
  answerTa: string;
}
