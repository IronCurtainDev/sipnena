import type { AppLanguage } from "@/lib/language";

export interface AssignCopy {
  title: string;
  subtitle: string;
  submissionsLabel: string;
  empty: string;
  emptyPublished: string;
  graded: string;
  needsReview: string;
  overdue: string;
  scoreLabel: string;
  feedbackLabel: string;
  feedbackPlaceholder: string;
  saveGradeBtn: string;
  savedToast: string;
  reviewBtn: string;
  hideReviewBtn: string;
  studentWorkLabel: string;
  promptLabel: string;
  tabMarking: string;
  tabPublished: string;
  allGrades: string;
  createBtn: string;
  publishedToast: string;
  submittedCount: string;
  pendingMarkCount: string;
  missingHeading: string;
  noMissing: string;
  viewSubmissions: string;
  dueLabel: string;
  marksLabel: string;
}

export const ASSIGN_COPY: Record<AppLanguage, AssignCopy> = {
  en: {
    title: "Assignments",
    subtitle:
      "Send homework by grade, see who still needs to submit, then mark and send feedback.",
    submissionsLabel: "submissions",
    empty: "No submissions match these filters.",
    emptyPublished: "No published assignments for this grade yet.",
    graded: "Graded",
    needsReview: "Needs review",
    overdue: "Overdue",
    scoreLabel: "Score",
    feedbackLabel: "Teacher feedback",
    feedbackPlaceholder: "Well labeled! Watch the focal arrow direction...",
    saveGradeBtn: "Save grade",
    savedToast: "Saved grade and feedback",
    reviewBtn: "Review work",
    hideReviewBtn: "Close review",
    studentWorkLabel: "Student submission",
    promptLabel: "Assignment instructions",
    tabMarking: "Marking",
    tabPublished: "Published",
    allGrades: "All grades",
    createBtn: "Create assignment",
    publishedToast: "Assignment published",
    submittedCount: "Submitted",
    pendingMarkCount: "To mark",
    missingHeading: "Still missing",
    noMissing: "Everyone enrolled has submitted.",
    viewSubmissions: "Open marking",
    dueLabel: "Due",
    marksLabel: "Marks",
  },
  si: {
    title: "පැවරුම්",
    subtitle:
      "ශ්‍රේණිය අනුව පැවරුම් යවන්න, භාර නොදුන් අය බලන්න, ඉන්පසු ලකුණු හා ප්‍රතිචාර දෙන්න.",
    submissionsLabel: "භාරදීම්",
    empty: "මෙම පෙරහනට ගැලපෙන භාරදීම් නැත.",
    emptyPublished: "මෙම ශ්‍රේණියට පළ කළ පැවරුම් නැත.",
    graded: "ලකුණු දී ඇත",
    needsReview: "පරීක්ෂා කළ යුතුයි",
    overdue: "කල් ඉකුත්",
    scoreLabel: "ලකුණු",
    feedbackLabel: "ගුරුවරයාගේ ප්‍රතිචාරය",
    feedbackPlaceholder: "හොඳ උත්සාහයක්! රූප සටහනේ නාභිය ලකුණු කරන්න...",
    saveGradeBtn: "ලකුණු සුරකින්න",
    savedToast: "ලකුණු සහ ප්‍රතිචාරය සුරකින ලදී",
    reviewBtn: "පැවරුම බලන්න",
    hideReviewBtn: "වසන්න",
    studentWorkLabel: "ශිෂ්‍යයා භාර දුන් වැඩ",
    promptLabel: "පැවරුම් උපදෙස්",
    tabMarking: "ලකුණු දීම",
    tabPublished: "පළ කළ",
    allGrades: "සියලු ශ්‍රේණි",
    createBtn: "නව පැවරුමක්",
    publishedToast: "පැවරුම පළ කරන ලදී",
    submittedCount: "භාර දුන්",
    pendingMarkCount: "ලකුණු දිය යුතු",
    missingHeading: "තවම භාර නැත",
    noMissing: "ලියාපදිංචි සියල්ලෝ භාර දී ඇත.",
    viewSubmissions: "ලකුණු දීම විවෘත කරන්න",
    dueLabel: "භාරදිය යුතු දිනය",
    marksLabel: "ලකුණු",
  },
  ta: {
    title: "ஒப்படைப்புகள்",
    subtitle:
      "தரம் வாரியாக ஒப்படைப்பு அனுப்பி, சமர்ப்பிக்கவில்லை என்பவரைப் பார்த்து மதிப்பெண் வழங்கவும்.",
    submissionsLabel: "சமர்ப்பிப்புகள்",
    empty: "இந்த வடிகட்டிக்கு சமர்ப்பிப்புகள் இல்லை.",
    emptyPublished: "இந்த தரத்திற்கு வெளியிட்ட ஒப்படைப்புகள் இல்லை.",
    graded: "மதிப்பீடு செய்யப்பட்டது",
    needsReview: "மதிப்பீடு தேவை",
    overdue: "காலந்தவறியது",
    scoreLabel: "மதிப்பெண்",
    feedbackLabel: "ஆசிரியர் கருத்து",
    feedbackPlaceholder: "நன்று! குவியத் திசையைக் கவனிக்கவும்...",
    saveGradeBtn: "மதிப்பெண் சேமி",
    savedToast: "மதிப்பெண் மற்றும் கருத்து சேமிக்கப்பட்டது",
    reviewBtn: "பதிலைப் பார்",
    hideReviewBtn: "மூடு",
    studentWorkLabel: "மாணவர் சமர்ப்பிப்பு",
    promptLabel: "ஒப்படைப்பு வழிமுறைகள்",
    tabMarking: "மதிப்பீடு",
    tabPublished: "வெளியிட்டவை",
    allGrades: "அனைத்து தரங்கள்",
    createBtn: "புதிய ஒப்படைப்பு",
    publishedToast: "ஒப்படைப்பு வெளியிடப்பட்டது",
    submittedCount: "சமர்ப்பித்தது",
    pendingMarkCount: "மதிப்பிட வேண்டியது",
    missingHeading: "இன்னும் வரவில்லை",
    noMissing: "பதிவு செய்த அனைவரும் சமர்ப்பித்துள்ளனர்.",
    viewSubmissions: "மதிப்பீட்டைத் திற",
    dueLabel: "கடைசித் திகதி",
    marksLabel: "மதிப்பெண்கள்",
  },
};

export const CREATE_ASSIGNMENT_COPY: Record<
  AppLanguage,
  {
    heading: string;
    gradeLabel: string;
    courseLabel: string;
    unitLabel: string;
    titleLabel: string;
    titlePlaceholder: string;
    instructionsLabel: string;
    instructionsPlaceholder: string;
    maxScoreLabel: string;
    dueLabel: string;
    modeLabel: string;
    modeBoth: string;
    modeText: string;
    modeImage: string;
    submitBtn: string;
    cancelBtn: string;
    noCourses: string;
  }
> = {
  en: {
    heading: "Create new assignment",
    gradeLabel: "Grade",
    courseLabel: "Course",
    unitLabel: "Unit / section",
    titleLabel: "Assignment title",
    titlePlaceholder: "e.g. Ray diagram worksheet 1",
    instructionsLabel: "Question / instructions for students",
    instructionsPlaceholder:
      "Write the question or task. Students will submit a written answer and/or photo.",
    maxScoreLabel: "Max score",
    dueLabel: "Due date (optional)",
    modeLabel: "Student submission type",
    modeBoth: "Written answer + photo",
    modeText: "Typed answer only",
    modeImage: "Answer photo only",
    submitBtn: "Publish assignment",
    cancelBtn: "Cancel",
    noCourses: "Create a paid course with at least one unit for this grade first.",
  },
  si: {
    heading: "නව පැවරුමක් සාදන්න",
    gradeLabel: "ශ්‍රේණිය",
    courseLabel: "පාඨමාලාව",
    unitLabel: "ඒකකය",
    titleLabel: "පැවරුමේ නම",
    titlePlaceholder: "උදා: කිරණ සටහන් අභ්‍යාසය 1",
    instructionsLabel: "ශිෂ්‍යයන් සඳහා ප්‍රශ්නය / උපදෙස්",
    instructionsPlaceholder:
      "ප්‍රශ්නය මෙහි ලියන්න. සිසුන් පිළිතුර සහ ඡායාරූපය භාර දෙනු ඇත.",
    maxScoreLabel: "උපරිම ලකුණු",
    dueLabel: "භාරදිය යුතු දිනය (විකල්ප)",
    modeLabel: "ශිෂ්‍යයා භාර දෙන ආකාරය",
    modeBoth: "ලිඛිත පිළිතුර + ඡායාරූපය",
    modeText: "ලිඛිත පිළිතුර පමණයි",
    modeImage: "පිළිතුරු ඡායාරූපය පමණයි",
    submitBtn: "පැවරුම පළ කරන්න",
    cancelBtn: "අවලංගු කරන්න",
    noCourses: "පළමුව මෙම ශ්‍රේණියට ඒකකයක් සහිත ගෙවන පාඨමාලාවක් සාදන්න.",
  },
  ta: {
    heading: "புதிய ஒப்படைப்பு உருவாக்கு",
    gradeLabel: "தரம்",
    courseLabel: "பாடநெறி",
    unitLabel: "அலகு",
    titleLabel: "ஒப்படைப்பு தலைப்பு",
    titlePlaceholder: "எ.கா: கதிர் வரைபடம் பயிற்சி 1",
    instructionsLabel: "மாணவர்களுக்கான கேள்வி / வழிமுறைகள்",
    instructionsPlaceholder:
      "கேள்வியை இங்கே எழுதவும். மாணவர்கள் பதில் மற்றும் படம் சமர்ப்பிப்பர்.",
    maxScoreLabel: "அதிகபட்ச மதிப்பெண்",
    dueLabel: "கடைசித் திகதி (விருப்பம்)",
    modeLabel: "மாணவர் சமர்ப்பிப்பு முறை",
    modeBoth: "எழுத்து பதில் + படம்",
    modeText: "எழுத்து பதில் மட்டும்",
    modeImage: "பதில் படம் மட்டும்",
    submitBtn: "ஒப்படைப்பை வெளியிடு",
    cancelBtn: "ரத்து செய்",
    noCourses: "முதலில் இந்த தரத்திற்கு ஒரு அலகுடன் கூடிய கட்டணப் பாடநெறியை உருவாக்கவும்.",
  },
};
