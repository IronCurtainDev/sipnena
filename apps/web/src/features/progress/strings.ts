import type { AppLanguage } from "@/lib/language";

export interface ProgressCopy {
  pageTitle: string;
  tabOverview: string;
  tabHistory: string;
  tabMistakes: string;
  overviewHeading: string;
  unitsWord: string;
  historyHeading: string;
  mistakesHeading: string;
  mistakesSub: string;
  retryWrongBtn: string;
  previousAnswerPrefix: string;
  correctAnswerPrefix: string;
  retryScorePrefix: string;
  selectOptionHint: string;
  retryGradedToast: string;
  checkRetryBtn: string;
}

export const PROGRESS_COPY: Record<AppLanguage, ProgressCopy> = {
  en: {
    pageTitle: "Progress Analytics & Mistake Bank",
    tabOverview: "Syllabus Completion",
    tabHistory: "Quiz History",
    tabMistakes: "Mistake Bank (3)",
    overviewHeading: "Subject-by-Subject Syllabus Completion",
    unitsWord: "units",
    historyHeading: "Quiz History & Score Trends",
    mistakesHeading: "Mistake Bank — Review & Clear Wrong Questions",
    mistakesSub:
      "Questions you missed in previous quizzes are saved here until you master them.",
    retryWrongBtn: "Retry Wrong Questions",
    previousAnswerPrefix: "Previous answer:",
    correctAnswerPrefix: "Correct:",
    retryScorePrefix: "Retry Score:",
    selectOptionHint: "Select an option for each question above.",
    retryGradedToast: "Mistake Bank retry graded!",
    checkRetryBtn: "Check Retry Answers",
  },
  si: {
    pageTitle: "ප්‍රගති විශ්ලේෂණය සහ වැරදි පිළිතුරු බැංකුව",
    tabOverview: "විෂය නිර්දේශ ප්‍රගතිය",
    tabHistory: "ප්‍රශ්නාවලි ඉතිහාසය",
    tabMistakes: "වැරදි පිළිතුරු බැංකුව (3)",
    overviewHeading: "විෂය අනුව විෂය නිර්දේශ සම්පූර්ණ කිරීම",
    unitsWord: "ඒකක",
    historyHeading: "ප්‍රශ්නාවලි ඉතිහාසය සහ ලකුණු ප්‍රවණතා",
    mistakesHeading: "වැරදි පිළිතුරු බැංකුව — පුනරීක්ෂණය සහ නිවැරදි කිරීම",
    mistakesSub:
      "පෙර ප්‍රශ්නාවලි වලදී වැරදුණු ප්‍රශ්න ඔබ ඒවා නිවැරදිව ප්‍රගුණ කරන තුරු මෙහි සුරැකේ.",
    retryWrongBtn: "වැරදුණු ප්‍රශ්න නැවත කරන්න",
    previousAnswerPrefix: "පෙර පිළිතුර:",
    correctAnswerPrefix: "නිවැරදි පිළිතුර:",
    retryScorePrefix: "නැවත උත්සාහ ලකුණු:",
    selectOptionHint: "ඉහත එක් එක් ප්‍රශ්නය සඳහා පිළිතුරක් තෝරන්න.",
    retryGradedToast: "වැරදි පිළිතුරු පුනරීක්ෂණය ලකුණු කෙරිණි!",
    checkRetryBtn: "නැවත පිළිතුරු පරීක්ෂා කරන්න",
  },
  ta: {
    pageTitle: "முன்னேற்றப் பகுப்பாய்வு & தவறுகள் வங்கி",
    tabOverview: "பாடத்திட்ட நிறைவு",
    tabHistory: "வினாடி-வினா வரலாறு",
    tabMistakes: "தவறுகள் வங்கி (3)",
    overviewHeading: "பாடம் வாரியான பாடத்திட்ட நிறைவு",
    unitsWord: "அலகுகள்",
    historyHeading: "வினாடி-வினா வரலாறு & மதிப்பெண் போக்கு",
    mistakesHeading: "தவறுகள் வங்கி — தவறான வினாக்களை மீளாய்வு செய்க",
    mistakesSub:
      "முந்தைய தேர்வுகளில் தவறவிட்ட கேள்விகள் நீங்கள் அவற்றைத் தேர்ச்சி பெறும் வரை இங்கே சேமிக்கப்படும்.",
    retryWrongBtn: "தவறான வினாக்களை மீண்டும் முயற்சி செய்க",
    previousAnswerPrefix: "முந்தைய பதில்:",
    correctAnswerPrefix: "சரியான பதில்:",
    retryScorePrefix: "மறுமுயற்சி மதிப்பெண்:",
    selectOptionHint:
      "மேலுள்ள ஒவ்வொரு கேள்விக்கும் ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
    retryGradedToast: "தவறுகள் வங்கி மறுமுயற்சி மதிப்பீடு செய்யப்பட்டது!",
    checkRetryBtn: "மறுமுயற்சி விடைகளைச் சரிபார்",
  },
};
