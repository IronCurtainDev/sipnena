import type { AppLanguage } from "@/lib/language";

export interface PastPapersCopy {
  pageTitle: string;
  archiveBadge: string;
  catalogTitle: string;
  termTestsLink: string;
  subjectLabel: string;
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
    pageTitle: "Past Papers & Marking Schemes",
    archiveBadge: "Official G.C.E. O/L & Grade 6–11 Archive (2016–2025)",
    catalogTitle: "Practice Real Exam Papers with Auto-Grading",
    termTestsLink: "Browse Provincial Term Tests →",
    subjectLabel: "Subject",
    yearLabel: "Year (2016–2025)",
    allYears: "All Years",
    mediumLabel: "Medium",
    allMediums: "All Mediums",
    paperTypeLabel: "Paper Type",
    allTypes: "All Types",
    part1Label: "Part I MCQ",
    part2Label: "Part II Structured & Essay",
    emptyText: "No past papers matched those filters.",
    resetBtn: "Reset Filters",
    minsWord: "mins",
    marksWord: "marks",
    openViewerBtn: "Open Paper Viewer",
    savedToast: "Paper saved to Revision Bookmarks",
    removedToast: "Removed from Saved bookmarks",
    backLink: "Back to Past Papers",
    examMode: "Exam Mode",
    practiceMode: "Practice Mode",
    untimedLabel: "Untimed Practice",
    part1Title: "Part I — Interactive MCQ Answer Sheet",
    part1Sub:
      "Select answers below and grade instantly with official solutions.",
    scoreSummary: "Score Summary",
    explanationPrefix: "Explanation:",
    retryMcqBtn: "Retry MCQ Sheet",
    submitGradeBtn: "Submit & Auto-Grade MCQs",
    gradedToast: "MCQ sheet auto-graded!",
    part2Title: "Part II — Structured & Essay Questions",
    part2Sub:
      "Write answers on paper, then reveal the official NIE marking scheme.",
    showSchemeBtn: "Show Official Marking Scheme",
    hideSchemeBtn: "Hide Official Marking Scheme",
    schemePointsTitle: "Official Marking Scheme Points",
  },
  si: {
    pageTitle: "පසුගිය විභාග ප්‍රශ්න පත්‍ර සහ ලකුණු දීමේ පටිපාටි",
    archiveBadge: "නිල අ.පො.ස. සා/පෙළ සහ 6–11 ශ්‍රේණි එකතුව (2016–2025)",
    catalogTitle:
      "ස්වයංක්‍රීය ලකුණු ලබාදීම සමඟ විභාග ප්‍රශ්න පත්‍ර පුහුණු වන්න",
    termTestsLink: "පළාත් වාර විභාග බලන්න →",
    subjectLabel: "විෂයය",
    yearLabel: "වසර (2016–2025)",
    allYears: "සියලු වසර",
    mediumLabel: "මාධ්‍යය",
    allMediums: "සියලු මාධ්‍ය",
    paperTypeLabel: "ප්‍රශ්න පත්‍ර වර්ගය",
    allTypes: "සියලු වර්ග",
    part1Label: "I කොටස (බහුවරණ MCQ)",
    part2Label: "II කොටස (ව්‍යුහගත හා රචනා)",
    emptyText: "මෙම පෙරහන් වලට ගැළපෙන ප්‍රශ්න පත්‍ර නොමැත.",
    resetBtn: "පෙරහන් යළි සකසන්න",
    minsWord: "මිනි.",
    marksWord: "ලකුණු",
    openViewerBtn: "ප්‍රශ්න පත්‍රය විවෘත කරන්න",
    savedToast: "ප්‍රශ්න පත්‍රය සුරැකි දෑ වෙත එක් කරන ලදී",
    removedToast: "සුරැකි දෑ වලින් ඉවත් කරන ලදී",
    backLink: "පසුගිය ප්‍රශ්න පත්‍ර වෙත ආපසු",
    examMode: "විභාග ප්‍රකාරය",
    practiceMode: "පුහුණු ප්‍රකාරය",
    untimedLabel: "කාල සීමා රහිත පුහුණුව",
    part1Title: "I කොටස — අන්තර්ක්‍රියාකාරී MCQ පිළිතුරු පත්‍රය",
    part1Sub: "පිළිතුරු තෝරා නිල පැහැදිලි කිරීම් සමඟ ක්ෂණිකව ලකුණු බලන්න.",
    scoreSummary: "ලකුණු සාරාංශය",
    explanationPrefix: "පැහැදිලි කිරීම:",
    retryMcqBtn: "නැවත උත්සාහ කරන්න",
    submitGradeBtn: "පිළිතුරු යොමු කර ලකුණු බලන්න",
    gradedToast: "MCQ පිළිතුරු පත්‍රය ස්වයංක්‍රීයව ලකුණු කෙරිණි!",
    part2Title: "II කොටස — ව්‍යුහගත සහ රචනා ප්‍රශ්න",
    part2Sub: "කොළයක පිළිතුරු ලියා නිල ලකුණු දීමේ පටිපාටිය බලන්න.",
    showSchemeBtn: "නිල ලකුණු දීමේ පටිපාටිය පෙන්වන්න",
    hideSchemeBtn: "ලකුණු දීමේ පටිපාටිය සඟවන්න",
    schemePointsTitle: "නිල ලකුණු දීමේ කරුණු",
  },
  ta: {
    pageTitle: "கடந்த கால வினாத்தாள்கள் & புள்ளித்திட்டங்கள்",
    archiveBadge: "உத்தியோகபூர்வ சா/த மற்றும் தரம் 6–11 தொகுப்பு (2016–2025)",
    catalogTitle:
      "தானியங்கி மதிப்பீட்டுடன் பரீட்சை வினாத்தாள்களைப் பயிற்சி செய்க",
    termTestsLink: "மாகாண தவணைப் பரீட்சைகள் →",
    subjectLabel: "பாடம்",
    yearLabel: "ஆண்டு (2016–2025)",
    allYears: "அனைத்து ஆண்டுகளும்",
    mediumLabel: "மொழி மூலம்",
    allMediums: "அனைத்து ஊடகங்களும்",
    paperTypeLabel: "வினாத்தாள் வகை",
    allTypes: "அனைத்து வகைகளும்",
    part1Label: "பகுதி I (பல்தேர்வு MCQ)",
    part2Label: "பகுதி II (கட்டமைப்பு & கட்டுரை)",
    emptyText: "இந்த வடிகட்டிகளுக்குப் பொருந்தும் வினாத்தாள்கள் இல்லை.",
    resetBtn: "வடிகட்டிகளை மீட்டமை",
    minsWord: "நிமி.",
    marksWord: "புள்ளிகள்",
    openViewerBtn: "வினாத்தாளைத் திறக்கவும்",
    savedToast: "வினாத்தாள் சேமித்தவற்றில் சேர்க்கப்பட்டது",
    removedToast: "சேமித்தவற்றிலிருந்து நீக்கப்பட்டது",
    backLink: "கடந்த வினாத்தாள்களுக்குத் திரும்பு",
    examMode: "பரீட்சை முறை",
    practiceMode: "பயிற்சி முறை",
    untimedLabel: "நேர வரம்பற்ற பயிற்சி",
    part1Title: "பகுதி I — MCQ விடைத்தாள்",
    part1Sub: "கீழே விடைகளைத் தேர்ந்தெடுத்து உடனடியாகப் புள்ளிகளைப் பாருங்கள்.",
    scoreSummary: "மதிப்பெண் சுருக்கம்",
    explanationPrefix: "விளக்கம்:",
    retryMcqBtn: "மீண்டும் முயற்சி செய்க",
    submitGradeBtn: "சமர்ப்பித்துப் புள்ளிகளைப் பார்",
    gradedToast: "MCQ விடைத்தாள் மதிப்பீடு செய்யப்பட்டது!",
    part2Title: "பகுதி II — கட்டமைப்பு & கட்டுரை வினாக்கள்",
    part2Sub: "தாளில் விடை எழுதி, உத்தியோகபூர்வ புள்ளித்திட்டத்தைப் பாருங்கள்.",
    showSchemeBtn: "புள்ளித்திட்டத்தைக் காட்டு",
    hideSchemeBtn: "புள்ளித்திட்டத்தை மறை",
    schemePointsTitle: "உத்தியோகபூர்வ புள்ளி வழங்கும் குறிப்புகள்",
  },
};
