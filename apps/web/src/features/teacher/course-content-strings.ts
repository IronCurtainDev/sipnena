import type { AppLanguage } from "@/lib/language";

export interface CourseContentCopy {
  addVideo: string;
  addQuiz: string;
  addLab: string;
  videoAdded: string;
  quizPlaced: string;
  labAdded: string;
  pickerHeading: string;
  pickerEmpty: string;
  createNewQuiz: string;
  placeQuiz: string;
  editQuestions: string;
  saveQuestions: string;
  cancelEdit: string;
  quizCreated: string;
  quizUpdated: string;
  quizSlotHeading: string;
  questionsWord: string;
  noQuizLinked: string;
  labHeading: string;
  labPromptLabel: string;
  labPromptPlaceholder: string;
  defaultLabPrompt: string;
  overviewHeading: string;
  overviewTitle: string;
  overviewBody: string;
  formulaLabel: string;
  educatorNote: string;
  rulesHeading: string;
  addRule: string;
  ruleTitle: string;
  ruleBody: string;
  notesHeading: string;
  addNote: string;
  noteTitle: string;
  noteBody: string;
  filesHeading: string;
  addFile: string;
  fileTitle: string;
  fileName: string;
  removeRow: string;
  courseField: string;
  sectionField: string;
  chooseCourse: string;
  chooseSection: string;
  noSections: string;
  notPlaced: string;
  placementMissing: string;
}

export const COURSE_CONTENT_COPY: Record<AppLanguage, CourseContentCopy> = {
  en: {
    addVideo: "Add video",
    addQuiz: "Add quiz",
    addLab: "Add lab",
    videoAdded: "Video lesson added.",
    quizPlaced: "Quiz added to this section.",
    labAdded: "Lab added.",
    pickerHeading: "Choose a quiz for this section",
    pickerEmpty: "No quizzes yet. Create one for this section.",
    createNewQuiz: "Create new quiz",
    placeQuiz: "Place in this section",
    editQuestions: "Edit questions",
    saveQuestions: "Save questions",
    cancelEdit: "Cancel",
    quizCreated: "Quiz created and added to this section.",
    quizUpdated: "Quiz questions saved.",
    quizSlotHeading: "Section quiz",
    questionsWord: "questions",
    noQuizLinked: "This quiz is no longer in the quiz list.",
    labHeading: "Lab activity",
    labPromptLabel: "Instructions",
    labPromptPlaceholder: "What should the student do?",
    defaultLabPrompt: "Follow the steps, then mark this activity done.",
    overviewHeading: "Overview",
    overviewTitle: "Overview title",
    overviewBody: "Overview",
    formulaLabel: "Formula",
    educatorNote: "Teacher note",
    rulesHeading: "Rules",
    addRule: "Add rule",
    ruleTitle: "Rule title",
    ruleBody: "Rule",
    notesHeading: "Revision notes",
    addNote: "Add note",
    noteTitle: "Note title",
    noteBody: "Note",
    filesHeading: "Files",
    addFile: "Add file",
    fileTitle: "File title",
    fileName: "File name",
    removeRow: "Remove",
    courseField: "Course",
    sectionField: "Section",
    chooseCourse: "Choose a course",
    chooseSection: "Choose a section",
    noSections: "Add a section in the course builder before saving this quiz.",
    notPlaced: "Not in a section yet",
    placementMissing: "Choose a course and a section.",
  },
  si: {
    addVideo: "වීඩියෝව",
    addQuiz: "ප්‍රශ්නාවලිය",
    addLab: "රසායනාගාරය",
    videoAdded: "වීඩියෝ පාඩම එක් කෙරිණි.",
    quizPlaced: "ප්‍රශ්නාවලිය මෙම කොටසට එක් කෙරිණි.",
    labAdded: "රසායනාගාර ක්‍රියාකාරකම එක් කෙරිණි.",
    pickerHeading: "මෙම කොටසට ප්‍රශ්නාවලියක් තෝරන්න",
    pickerEmpty: "තවම ප්‍රශ්නාවලි නැත. මෙම කොටසට එකක් සාදන්න.",
    createNewQuiz: "නව ප්‍රශ්නාවලියක් සාදන්න",
    placeQuiz: "මෙම කොටසට එක් කරන්න",
    editQuestions: "ප්‍රශ්න සංස්කරණය",
    saveQuestions: "ප්‍රශ්න සුරකින්න",
    cancelEdit: "අවලංගු කරන්න",
    quizCreated: "ප්‍රශ්නාවලිය සාදා මෙම කොටසට එක් කෙරිණි.",
    quizUpdated: "ප්‍රශ්න සුරැකිණි.",
    quizSlotHeading: "කොටසේ ප්‍රශ්නාවලිය",
    questionsWord: "ප්‍රශ්න",
    noQuizLinked: "මෙම ප්‍රශ්නාවලිය ලැයිස්තුවේ නැත.",
    labHeading: "රසායනාගාර ක්‍රියාකාරකම",
    labPromptLabel: "උපදෙස්",
    labPromptPlaceholder: "සිසුවා කළ යුත්තේ කුමක්ද?",
    defaultLabPrompt: "පියවර අනුගමනය කර මෙය නිම කළ බව සලකුණු කරන්න.",
    overviewHeading: "දළ විශ්ලේෂණය",
    overviewTitle: "දළ විශ්ලේෂණ මාතෘකාව",
    overviewBody: "දළ විශ්ලේෂණය",
    formulaLabel: "සූත්‍රය",
    educatorNote: "ගුරු සටහන",
    rulesHeading: "නීති",
    addRule: "නීතියක් එක් කරන්න",
    ruleTitle: "නීතියේ මාතෘකාව",
    ruleBody: "නීතිය",
    notesHeading: "පුනරීක්ෂණ සටහන්",
    addNote: "සටහනක් එක් කරන්න",
    noteTitle: "සටහන් මාතෘකාව",
    noteBody: "සටහන",
    filesHeading: "ගොනු",
    addFile: "ගොනුවක් එක් කරන්න",
    fileTitle: "ගොනු මාතෘකාව",
    fileName: "ගොනු නාමය",
    removeRow: "ඉවත් කරන්න",
    courseField: "පාඨමාලාව",
    sectionField: "කොටස",
    chooseCourse: "පාඨමාලාවක් තෝරන්න",
    chooseSection: "කොටසක් තෝරන්න",
    noSections: "මෙය සුරැකීමට පෙර පාඨමාලා නිර්මාණකයේ කොටසක් එක් කරන්න.",
    notPlaced: "තවම කොටසක නැත",
    placementMissing: "පාඨමාලාවක් සහ කොටසක් තෝරන්න.",
  },
  ta: {
    addVideo: "வீடியோ",
    addQuiz: "வினாடி",
    addLab: "ஆய்வு",
    videoAdded: "வீடியோ பாடம் சேர்க்கப்பட்டது.",
    quizPlaced: "வினாடி இந்தப் பிரிவில் சேர்க்கப்பட்டது.",
    labAdded: "ஆய்வுச் செயல் சேர்க்கப்பட்டது.",
    pickerHeading: "இந்தப் பிரிவுக்கு ஒரு வினாடியைத் தேர்ந்தெடுக்கவும்",
    pickerEmpty: "வினாடிகள் இல்லை. இந்தப் பிரிவுக்கு ஒன்றை உருவாக்கவும்.",
    createNewQuiz: "புதிய வினாடி உருவாக்குக",
    placeQuiz: "இந்தப் பிரிவில் வைக்க",
    editQuestions: "வினாக்களைத் திருத்துக",
    saveQuestions: "வினாக்களைச் சேமிக்க",
    cancelEdit: "ரத்து",
    quizCreated: "வினாடி உருவாக்கப்பட்டு இந்தப் பிரிவில் சேர்க்கப்பட்டது.",
    quizUpdated: "வினாக்கள் சேமிக்கப்பட்டன.",
    quizSlotHeading: "பிரிவு வினாடி",
    questionsWord: "வினாக்கள்",
    noQuizLinked: "இந்த வினாடி பட்டியலில் இல்லை.",
    labHeading: "ஆய்வுச் செயல்",
    labPromptLabel: "வழிமுறை",
    labPromptPlaceholder: "மாணவர் என்ன செய்ய வேண்டும்?",
    defaultLabPrompt: "படிகளைப் பின்பற்றி இதை முடித்ததாகக் குறிக்கவும்.",
    overviewHeading: "மேலோட்டம்",
    overviewTitle: "மேலோட்டத் தலைப்பு",
    overviewBody: "மேலோட்டம்",
    formulaLabel: "சூத்திரம்",
    educatorNote: "ஆசிரியர் குறிப்பு",
    rulesHeading: "விதிகள்",
    addRule: "விதி சேர்க்க",
    ruleTitle: "விதித் தலைப்பு",
    ruleBody: "விதி",
    notesHeading: "மீள்பார்வைக் குறிப்புகள்",
    addNote: "குறிப்பு சேர்க்க",
    noteTitle: "குறிப்புத் தலைப்பு",
    noteBody: "குறிப்பு",
    filesHeading: "கோப்புகள்",
    addFile: "கோப்பு சேர்க்க",
    fileTitle: "கோப்புத் தலைப்பு",
    fileName: "கோப்புப் பெயர்",
    removeRow: "நீக்குக",
    courseField: "பாடநெறி",
    sectionField: "பிரிவு",
    chooseCourse: "பாடநெறியைத் தேர்ந்தெடுக்கவும்",
    chooseSection: "பிரிவைத் தேர்ந்தெடுக்கவும்",
    noSections:
      "இதைச் சேமிக்கும் முன் பாடநெறி உருவாக்கியில் ஒரு பிரிவைச் சேர்க்கவும்.",
    notPlaced: "இன்னும் ஒரு பிரிவில் இல்லை",
    placementMissing: "பாடநெறியையும் பிரிவையும் தேர்ந்தெடுக்கவும்.",
  },
};
