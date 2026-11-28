import type { AppLanguage } from "@/lib/language";

export interface BuilderExtraCopy {
  previewBannerDrafts: string;
  previewBannerPublished: string;
  backToBuilder: string;
  viewCoursePage: string;
  viewLessonPlayer: string;
  desktopFrame: string;
  phoneFrame: string;
  includeDraftsLabel: string;
  statusDraft: string;
  statusScheduled: string;
  statusPublished: string;
  releaseAtLabel: string;
  colomboHint: string;
  duplicateCourseBtn: string;
  duplicateMediumPrompt: string;
  duplicateUnit: string;
  duplicateLesson: string;
  moveUp: string;
  moveDown: string;
  moveToUnit: string;
  deleteItem: string;
  deleteConfirmTitle: string;
  deleteUnitWarning: (count: number) => string;
  undoAction: string;
  deletedUndoToast: string;
  restoredToast: string;
  movedAnnouncement: (name: string) => string;
  dragHandleLabel: string;
  assignBtn: string;
  assignDialogTitle: string;
  noClassesYet: string;
  manageClassesLink: string;
  startDateLabel: string;
  unitDueDatesLabel: string;
  assignSaveBtn: string;
  assignedToast: string;
  savedJustNow: string;
  savingNow: string;
  unsavedChanges: string;
  addAssignment: string;
  tabBasics: string;
  tabVideo: string;
  tabNotes: string;
  tabFiles: string;
  newCourseSteps: [string, string, string];
  stepNext: string;
  stepBack: string;
  createCourseSubmit: string;
  useNieSyllabus: string;
  syllabusPreviewHint: string;
  noSyllabusHint: string;
  mobileBackToTree: string;
  classesPageTitle: string;
  classesSubtitle: string;
  createClassTitle: string;
  classNameLabel: string;
  classYearLabel: string;
  createClassBtn: string;
  inviteCodeLabel: string;
  addStudentBtn: string;
  studentNamePlaceholder: string;
  postAnnouncementLabel: string;
  announcementPlaceholder: string;
  postAnnouncementBtn: string;
  copyWhatsappNudge: string;
  copiedToast: string;
}

export const BUILDER_EXTRA_COPY: Record<AppLanguage, BuilderExtraCopy> = {
  en: {
    previewBannerDrafts: "Preview — students can't see draft items yet",
    previewBannerPublished: "Student view — only published & released items",
    backToBuilder: "Back to builder",
    viewCoursePage: "Course overview",
    viewLessonPlayer: "Lesson player",
    desktopFrame: "Desktop (1280px)",
    phoneFrame: "Phone (390×844)",
    includeDraftsLabel: "Show drafts",
    statusDraft: "Draft",
    statusScheduled: "Scheduled",
    statusPublished: "Published",
    releaseAtLabel: "Release date & time",
    colomboHint: "Asia/Colombo (UTC+5:30)",
    duplicateCourseBtn: "Duplicate",
    duplicateMediumPrompt: "Copy medium",
    duplicateUnit: "Duplicate unit",
    duplicateLesson: "Duplicate lesson",
    moveUp: "Move up",
    moveDown: "Move down",
    moveToUnit: "Move to unit…",
    deleteItem: "Delete",
    deleteConfirmTitle: "Confirm delete",
    deleteUnitWarning: (count) =>
      `This unit has ${count} lesson(s). Deleting it removes all its lessons.`,
    undoAction: "Undo",
    deletedUndoToast: "Deleted.",
    restoredToast: "Restored.",
    movedAnnouncement: (name) => `Moved "${name}".`,
    dragHandleLabel: "Drag to reorder",
    assignBtn: "Assign",
    assignDialogTitle: "Assign course to classes",
    noClassesYet: "No classes yet. Create a class first.",
    manageClassesLink: "Manage classes",
    startDateLabel: "Start date",
    unitDueDatesLabel: "Optional unit due dates",
    assignSaveBtn: "Assign to selected classes",
    assignedToast: "Course assigned to selected classes",
    savedJustNow: "Saved · just now",
    savingNow: "Saving…",
    unsavedChanges: "Unsaved changes",
    addAssignment: "Assignment",
    tabBasics: "Basics",
    tabVideo: "Video",
    tabNotes: "Notes",
    tabFiles: "Files",
    newCourseSteps: [
      "Grade & Subject",
      "Title & Pricing",
      "NIE Syllabus Units",
    ],
    stepNext: "Next",
    stepBack: "Back",
    createCourseSubmit: "Create course",
    useNieSyllabus: "Create units from NIE syllabus",
    syllabusPreviewHint: "These published NIE syllabus units will be created:",
    noSyllabusHint:
      "No published NIE units for this selection. Create the course, then add your own units.",
    mobileBackToTree: "Curriculum list",
    classesPageTitle: "My Classes & Students",
    classesSubtitle:
      "Organize student cohorts, assign courses, and post class nudges.",
    createClassTitle: "Create a class",
    classNameLabel: "Class name (e.g. 8A Sinhala 2026)",
    classYearLabel: "Year",
    createClassBtn: "Create class",
    inviteCodeLabel: "Invite code",
    addStudentBtn: "Add demo student",
    studentNamePlaceholder: "Student full name",
    postAnnouncementLabel: "Class announcement / WhatsApp nudge",
    announcementPlaceholder:
      "Share upcoming live time, unit reminder, or quiz note...",
    postAnnouncementBtn: "Post notice",
    copyWhatsappNudge: "Copy WhatsApp text",
    copiedToast: "Copied notice text",
  },
  si: {
    previewBannerDrafts: "පෙරදසුන — කෙටුම්පත් පාඩම් සිසුන්ට තවම නොපෙනේ",
    previewBannerPublished: "ශිෂ්‍ය දසුන — ප්‍රකාශිත පාඩම් පමණි",
    backToBuilder: "සංස්කරණය වෙත",
    viewCoursePage: "පාඨමාලා පිටුව",
    viewLessonPlayer: "පාඩම් වාදකය",
    desktopFrame: "පරිගණක (1280px)",
    phoneFrame: "දුරකථන (390×844)",
    includeDraftsLabel: "කෙටුම්පත් පෙන්වන්න",
    statusDraft: "කෙටුම්පත",
    statusScheduled: "කාලසටහන්",
    statusPublished: "ප්‍රකාශිතයි",
    releaseAtLabel: "මුදාහරින දිනය හා වේලාව",
    colomboHint: "ශ්‍රී ලංකා වේලාව (UTC+5:30)",
    duplicateCourseBtn: "පිටපත් කරන්න",
    duplicateMediumPrompt: "මාධ්‍යය තෝරන්න",
    duplicateUnit: "ඒකකය පිටපත් කරන්න",
    duplicateLesson: "පාඩම පිටපත් කරන්න",
    moveUp: "ඉහළට ගෙන යන්න",
    moveDown: "පහළට ගෙන යන්න",
    moveToUnit: "වෙනත් ඒකකයකට…",
    deleteItem: "මකන්න",
    deleteConfirmTitle: "මැකීම තහවුරු කරන්න",
    deleteUnitWarning: (count) =>
      `මෙම ඒකකයේ පාඩම් ${count}ක් ඇත. මැකීමෙන් එම පාඩම්ද ඉවත් වේ.`,
    undoAction: "ආපසු ගන්න",
    deletedUndoToast: "මකා දමන ලදී.",
    restoredToast: "නැවත සකසන ලදී.",
    movedAnnouncement: (name) => `"${name}" ස්ථානගත කළා.`,
    dragHandleLabel: "ඇදගෙන පෙළගස්වන්න",
    assignBtn: "පන්තිවලට දෙන්න",
    assignDialogTitle: "පන්ති සඳහා පාඨමාලාව පවරන්න",
    noClassesYet: "තවම පන්ති නැත. පළමුව පන්තියක් සාදන්න.",
    manageClassesLink: "පන්ති කළමනාකරණය",
    startDateLabel: "ආරම්භක දිනය",
    unitDueDatesLabel: "ඒකක භාරදිය යුතු දින (විකල්ප)",
    assignSaveBtn: "තෝරාගත් පන්තිවලට පවරන්න",
    assignedToast: "පන්තිවලට පාඨමාලාව පවරන ලදී",
    savedJustNow: "සුරැකිණි · දැන්",
    savingNow: "සුරකිමින්…",
    unsavedChanges: "නොසුරැකි වෙනස්කම්",
    addAssignment: "පැවරුම",
    tabBasics: "මූලික",
    tabVideo: "වීඩියෝ",
    tabNotes: "සටහන්",
    tabFiles: "ගොනු",
    newCourseSteps: [
      "ශ්‍රේණිය සහ විෂය",
      "නම සහ ගාස්තු",
      "NIE විෂය නිර්දේශ ඒකක",
    ],
    stepNext: "ඊළඟ",
    stepBack: "ආපසු",
    createCourseSubmit: "පාඨමාලාව සාදන්න",
    useNieSyllabus: "NIE විෂය නිර්දේශයෙන් ඒකක සාදන්න",
    syllabusPreviewHint: "පහත ප්‍රකාශිත NIE ඒකක ස්වයංක්‍රීයව සැකසේ:",
    noSyllabusHint:
      "මෙම තේරීමට ප්‍රකාශිත NIE ඒකක නැත. පාඨමාලාව සාදා ඔබේ ඒකක එක් කරන්න.",
    mobileBackToTree: "විෂය මාලාවට",
    classesPageTitle: "මගේ පන්ති සහ සිසුන්",
    classesSubtitle: "සිසු කණ්ඩායම් සංවිධානය කර පාඨමාලා පවරන්න.",
    createClassTitle: "නව පන්තියක් සාදන්න",
    classNameLabel: "පන්තියේ නම (උදා: 8A සිංහල 2026)",
    classYearLabel: "වර්ෂය",
    createClassBtn: "පන්තිය සාදන්න",
    inviteCodeLabel: "ආරාධනා කේතය",
    addStudentBtn: "සිසුවෙකු එක් කරන්න",
    studentNamePlaceholder: "සිසුවාගේ නම",
    postAnnouncementLabel: "පන්ති දැන්වීම / WhatsApp පණිවිඩය",
    announcementPlaceholder: "පන්ති වේලාවන් හෝ පැවරුම් මතක් කිරීමක් ලියන්න...",
    postAnnouncementBtn: "දැන්වීම පළ කරන්න",
    copyWhatsappNudge: "WhatsApp පෙළ පිටපත් කරන්න",
    copiedToast: "පණිවිඩය පිටපත් කළා",
  },
  ta: {
    previewBannerDrafts:
      "முன்னோட்டம் — வரைவுப் பாடங்கள் மாணவர்களுக்குத் தெரியாது",
    previewBannerPublished: "மாணவர் பார்வை — வெளியிட்ட பாடங்கள் மட்டும்",
    backToBuilder: "உருவாக்கிக்குத் திரும்பு",
    viewCoursePage: "பாடநெறிப் பக்கம்",
    viewLessonPlayer: "பாட இயக்கி",
    desktopFrame: "கணினி (1280px)",
    phoneFrame: "தொலைபேசி (390×844)",
    includeDraftsLabel: "வரைவுகளைக் காட்டு",
    statusDraft: "வரைவு",
    statusScheduled: "திட்டமிட்டது",
    statusPublished: "வெளியிடப்பட்டது",
    releaseAtLabel: "வெளியிடும் திகதி & நேரம்",
    colomboHint: "இலங்கை நேரம் (UTC+5:30)",
    duplicateCourseBtn: "நகலெடு",
    duplicateMediumPrompt: "மொழியைத் தேர்வு செய்க",
    duplicateUnit: "அலகை நகலெடு",
    duplicateLesson: "பாடத்தை நகலெடு",
    moveUp: "மேலே நகர்த்து",
    moveDown: "கீழே நகர்த்து",
    moveToUnit: "அலகிற்கு மாற்று…",
    deleteItem: "நீக்கு",
    deleteConfirmTitle: "நீக்குதலை உறுதிசெய்",
    deleteUnitWarning: (count) =>
      `இந்த அலகில் ${count} பாடம்(கள்) உள்ளன. நீக்கினால் அவையும் நீங்கும்.`,
    undoAction: "மீளமை",
    deletedUndoToast: "நீக்கப்பட்டது.",
    restoredToast: "மீட்டெடுக்கப்பட்டது.",
    movedAnnouncement: (name) => `"${name}" மாற்றப்பட்டது.`,
    dragHandleLabel: "வரிசைப்படுத்த இழுக்கவும்",
    assignBtn: "வகுப்புகளுக்கு வழங்கு",
    assignDialogTitle: "வகுப்புகளுக்குப் பாடநெறியை வழங்கு",
    noClassesYet: "வகுப்புகள் இல்லை. முதலில் ஒரு வகுப்பை உருவாக்கவும்.",
    manageClassesLink: "வகுப்புகளை நிர்வகி",
    startDateLabel: "தொடங்கும் திகதி",
    unitDueDatesLabel: "அலகு முடிவுத் திகதிகள் (விருப்பம்)",
    assignSaveBtn: "தேர்ந்த வகுப்புகளுக்கு வழங்கு",
    assignedToast: "வகுப்புகளுக்குப் பாடநெறி வழங்கப்பட்டது",
    savedJustNow: "சேமிக்கப்பட்டது · இப்போது",
    savingNow: "சேமிக்கிறது…",
    unsavedChanges: "சேமிக்கப்படாத மாற்றங்கள்",
    addAssignment: "ஒப்படைப்பு",
    tabBasics: "அடிப்படை",
    tabVideo: "வீடியோ",
    tabNotes: "குறிப்புகள்",
    tabFiles: "கோப்புகள்",
    newCourseSteps: [
      "தரம் & பாடம்",
      "தலைப்பு & கட்டணம்",
      "NIE பாடத்திட்ட அலகுகள்",
    ],
    stepNext: "அடுத்தது",
    stepBack: "பின்",
    createCourseSubmit: "பாடநெறியை உருவாக்கு",
    useNieSyllabus: "NIE பாடத்திட்டத்திலிருந்து அலகுகளை உருவாக்கு",
    syllabusPreviewHint: "வெளியிடப்பட்ட NIE அலகுகள் உருவாக்கப்படும்:",
    noSyllabusHint:
      "இந்தத் தேர்வுக்கு வெளியிடப்பட்ட NIE அலகுகள் இல்லை. பாடநெறியை உருவாக்கி உங்கள் அலகுகளைச் சேர்க்கவும்.",
    mobileBackToTree: "பாடத்திட்டப் பட்டியல்",
    classesPageTitle: "என் வகுப்புகள் & மாணவர்கள்",
    classesSubtitle: "மாணவர் குழுக்களை நிர்வகித்து பாடநெறிகளை வழங்கவும்.",
    createClassTitle: "புதிய வகுப்பு உருவாக்கு",
    classNameLabel: "வகுப்பு பெயர் (எ.கா. 8A தமிழ் 2026)",
    classYearLabel: "ஆண்டு",
    createClassBtn: "வகுப்பை உருவாக்கு",
    inviteCodeLabel: "அழைப்புக் குறியீடு",
    addStudentBtn: "மாணவரைச் சேர்",
    studentNamePlaceholder: "மாணவர் முழுப்பெயர்",
    postAnnouncementLabel: "வகுப்பு அறிவிப்பு / WhatsApp தகவல்",
    announcementPlaceholder:
      "நேரலை நேரம் அல்லது ஒப்படைப்பு நினைவூட்டலை எழுதுக...",
    postAnnouncementBtn: "அறிவிப்பை இடு",
    copyWhatsappNudge: "WhatsApp உரையை நகலெடு",
    copiedToast: "அறிவிப்பு நகலெடுக்கப்பட்டது",
  },
};
