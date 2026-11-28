import type { AppLanguage } from "@/lib/language";

export interface PastPapersCopy {
  pageTitle: string;
  archiveBadge: string;
  catalogTitle: string;
  termTestsLink: string;
  gradeLabel: string;
  allGrades: string;
  subjectLabel: string;
  moreFilters: string;
  hideFilters: string;
  yearLabel: string;
  allYears: string;
  mediumLabel: string;
  allMediums: string;
  paperTypeLabel: string;
  allTypes: string;
  part1Label: string;
  part2Label: string;
  emptyText: string;
  resetBtn: string;
  minsWord: string;
  marksWord: string;
  openViewerBtn: string;
  savedToast: string;
  removedToast: string;
  backLink: string;
  notFoundTitle: string;
  notFoundText: string;
  examMode: string;
  practiceMode: string;
  untimedLabel: string;
  part1Title: string;
  part1Sub: string;
  scoreSummary: string;
  explanationPrefix: string;
  retryMcqBtn: string;
  submitGradeBtn: string;
  gradedToast: string;
  part2Title: string;
  part2Sub: string;
  showSchemeBtn: string;
  hideSchemeBtn: string;
  schemePointsTitle: string;
}

export const PAST_PAPERS_COPY: Record<AppLanguage, PastPapersCopy> = {
  en: {
    pageTitle: "Past papers",
    archiveBadge: "Grades 6–11 practice papers",
    catalogTitle: "Past papers for your grade",
    termTestsLink: "Term tests →",
    gradeLabel: "Your grade",
    allGrades: "All grades",
    subjectLabel: "Subject",
    moreFilters: "More filters",
    hideFilters: "Hide filters",
    yearLabel: "Year",
    allYears: "All years",
    mediumLabel: "Medium",
    allMediums: "All mediums",
    paperTypeLabel: "Paper type",
    allTypes: "All types",
    part1Label: "Part I — MCQ",
    part2Label: "Part II — Written",
    emptyText: "No papers for these filters. Try another grade or subject.",
    resetBtn: "Clear filters",
    minsWord: "mins",
    marksWord: "marks",
    openViewerBtn: "Start practice",
    savedToast: "Saved to your bookmarks",
    removedToast: "Removed from bookmarks",
    backLink: "Back to past papers",
    notFoundTitle: "Paper not found",
    notFoundText: "This paper is not in the practice list. Pick another one.",
    examMode: "Exam timer",
    practiceMode: "Practice",
    untimedLabel: "No timer — practise at your pace",
    part1Title: "Multiple choice",
    part1Sub: "Tap an answer, then check your score.",
    scoreSummary: "Your score",
    explanationPrefix: "Why:",
    retryMcqBtn: "Try again",
    submitGradeBtn: "Check my answers",
    gradedToast: "Answers checked!",
    part2Title: "Written questions",
    part2Sub: "Write on paper, then peek at the marking points.",
    showSchemeBtn: "Show marking points",
    hideSchemeBtn: "Hide marking points",
    schemePointsTitle: "Marking points",
  },
  si: {
    pageTitle: "පසුගිය ප්‍රශ්න පත්‍ර",
    archiveBadge: "6–11 ශ්‍රේණි පුහුණු ප්‍රශ්න පත්‍ර",
    catalogTitle: "ඔබේ ශ්‍රේණියට ප්‍රශ්න පත්‍ර",
    termTestsLink: "වාර විභාග →",
    gradeLabel: "ඔබේ ශ්‍රේණිය",
    allGrades: "සියලු ශ්‍රේණි",
    subjectLabel: "විෂයය",
    moreFilters: "තවත් පෙරහන්",
    hideFilters: "පෙරහන් සඟවන්න",
    yearLabel: "වසර",
    allYears: "සියලු වසර",
    mediumLabel: "මාධ්‍යය",
    allMediums: "සියලු මාධ්‍ය",
    paperTypeLabel: "පත්‍ර වර්ගය",
    allTypes: "සියලු වර්ග",
    part1Label: "I කොටස — බහුවරණ",
    part2Label: "II කොටස — ලිඛිත",
    emptyText: "මෙම පෙරහන්වලට පත්‍ර නැත. වෙනත් ශ්‍රේණියක් හෝ විෂයක් උත්සාහ කරන්න.",
    resetBtn: "පෙරහන් ඉවත් කරන්න",
    minsWord: "මිනි.",
    marksWord: "ලකුණු",
    openViewerBtn: "පුහුණුව අරඹන්න",
    savedToast: "සුරැකි දෑ වෙත එක් කළා",
    removedToast: "සුරැකි දෑ වලින් ඉවත් කළා",
    backLink: "ප්‍රශ්න පත්‍ර වෙත ආපසු",
    notFoundTitle: "පත්‍රය හමු නොවීය",
    notFoundText: "මෙම පත්‍රය ලැයිස්තුවේ නැත. වෙනත් එකක් තෝරන්න.",
    examMode: "විභාග ටයිමර්",
    practiceMode: "පුහුණුව",
    untimedLabel: "ටයිමර් නැත — ඔබේ වේගයෙන් පුහුණු වන්න",
    part1Title: "බහුවරණ ප්‍රශ්න",
    part1Sub: "පිළිතුරක් තෝරා ලකුණු පරීක්ෂා කරන්න.",
    scoreSummary: "ඔබේ ලකුණු",
    explanationPrefix: "හේතුව:",
    retryMcqBtn: "නැවත උත්සාහ කරන්න",
    submitGradeBtn: "පිළිතුරු පරීක්ෂා කරන්න",
    gradedToast: "පිළිතුරු පරීක්ෂා කළා!",
    part2Title: "ලිඛිත ප්‍රශ්න",
    part2Sub: "කොළයක ලියා ලකුණු කරුණු බලන්න.",
    showSchemeBtn: "ලකුණු කරුණු පෙන්වන්න",
    hideSchemeBtn: "ලකුණු කරුණු සඟවන්න",
    schemePointsTitle: "ලකුණු කරුණු",
  },
  ta: {
    pageTitle: "கடந்த வினாத்தாள்கள்",
    archiveBadge: "தரம் 6–11 பயிற்சி வினாத்தாள்கள்",
    catalogTitle: "உங்கள் தரத்திற்கான வினாத்தாள்கள்",
    termTestsLink: "தவணைப் பரீட்சைகள் →",
    gradeLabel: "உங்கள் தரம்",
    allGrades: "அனைத்து தரங்கள்",
    subjectLabel: "பாடம்",
    moreFilters: "மேலும் வடிகட்டிகள்",
    hideFilters: "வடிகட்டிகளை மறை",
    yearLabel: "ஆண்டு",
    allYears: "அனைத்து ஆண்டுகள்",
    mediumLabel: "மொழி மூலம்",
    allMediums: "அனைத்து ஊடகங்கள்",
    paperTypeLabel: "வினாத்தாள் வகை",
    allTypes: "அனைத்து வகைகள்",
    part1Label: "பகுதி I — பல்தேர்வு",
    part2Label: "பகுதி II — எழுத்து",
    emptyText:
      "இந்த வடிகட்டிகளுக்கு வினாத்தாள்கள் இல்லை. வேறு தரம் அல்லது பாடம் முயல்க.",
    resetBtn: "வடிகட்டிகளை அழி",
    minsWord: "நிமி.",
    marksWord: "புள்ளிகள்",
    openViewerBtn: "பயிற்சி தொடங்கு",
    savedToast: "சேமித்தவற்றில் சேர்க்கப்பட்டது",
    removedToast: "சேமித்தவற்றிலிருந்து நீக்கப்பட்டது",
    backLink: "வினாத்தாள்களுக்குத் திரும்பு",
    notFoundTitle: "வினாத்தாள் இல்லை",
    notFoundText: "இந்த வினாத்தாள் பட்டியலில் இல்லை. வேறொன்றைத் தேர்ந்தெடுக்கவும்.",
    examMode: "பரீட்சை நேரம்",
    practiceMode: "பயிற்சி",
    untimedLabel: "நேர வரம்பு இல்லை — உங்கள் வேகத்தில் பயிற்சி",
    part1Title: "பல்தேர்வு வினாக்கள்",
    part1Sub: "விடையைத் தேர்ந்தெடுத்துப் புள்ளிகளைப் பாருங்கள்.",
    scoreSummary: "உங்கள் மதிப்பெண்",
    explanationPrefix: "காரணம்:",
    retryMcqBtn: "மீண்டும் முயல்க",
    submitGradeBtn: "விடைகளைச் சரிபார்",
    gradedToast: "விடைகள் சரிபார்க்கப்பட்டன!",
    part2Title: "எழுத்து வினாக்கள்",
    part2Sub: "தாளில் எழுதி, புள்ளிக் குறிப்புகளைப் பாருங்கள்.",
    showSchemeBtn: "புள்ளிக் குறிப்புகளைக் காட்டு",
    hideSchemeBtn: "புள்ளிக் குறிப்புகளை மறை",
    schemePointsTitle: "புள்ளிக் குறிப்புகள்",
  },
};
