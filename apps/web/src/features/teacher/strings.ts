import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export interface TeacherCopy {
  homeTitle: string;
  activeStudentsLabel: string;
  activeStudentsSub: string;
  pendingDoubtsLabel: string;
  replyQueueLink: string;
  uploadedLessonsLabel: string;
  uploadLessonLink: string;
  modLessonsTitle: string;
  modLessonsDesc: string;
  modQuizTitle: string;
  modQuizDesc: string;
  modDoubtsTitle: string;
  modDoubtsDesc: string;
  coursesPageTitle: string;
  editLessonHeading: string;
  createLessonHeading: string;
  lessonTitleField: string;
  lessonTitlePlaceholder: string;
  subjectField: string;
  gradeField: string;
  termField: string;
  videoUrlField: string;
  pdfAttachmentLabel: string;
  browsePdfBtn: string;
  selectedFilePrefix: string;
  cancelBtn: string;
  saveChangesBtn: string;
  publishLessonBtn: string;
  lessonUpdatedToast: string;
  lessonCreatedToast: string;
  uploadedListHeading: string;
  editBtn: string;
  defaultDuration: string;
  quizzesPageTitle: string;
  buildQuizHeading: string;
  defaultQuizTitleInput: string;
  quizTitlePlaceholder: string;
  gradeColon: string;
  promptPlaceholder: string;
  optionPrefix: string;
  markCorrectPrefix: string;
  explanationPlaceholder: string;
  publishQuizBtn: string;
  publishedQuizzesHeading: string;
  qsWord: string;
  correctPrefix: string;
  quizSavedToast: string;
  defaultQuizFallbackTitle: string;
  defaultExplanation: string;
  doubtsPageTitle: string;
  filterQuestionsLabel: string;
  filterPending: string;
  filterAnswered: string;
  filterAll: string;
  photoPrefix: string;
  replyPlaceholder: string;
  sendReplyBtn: string;
  replySentToast: string;
}

export const TEACHER_COPY: Record<AppLanguage, TeacherCopy> = {
  en: {
    homeTitle: "Teacher / Tutor Studio",
    activeStudentsLabel: "Active Students",
    activeStudentsSub: "Grades 8–11 across 3 mediums",
    pendingDoubtsLabel: "Pending Doubts",
    replyQueueLink: "Reply to student queue →",
    uploadedLessonsLabel: "My Courses",
    uploadLessonLink: "Manage courses →",
    modLessonsTitle: "Courses",
    modLessonsDesc:
      "Create, edit, publish, or remove courses — then attach video lessons and PDF tutes by Term.",
    modQuizTitle: "MCQ Quiz Builder",
    modQuizDesc:
      "Build 4-option Term Test and O/L checkpoint MCQ quizzes with instant marking explanations.",
    modDoubtsTitle: "Reply to Student Doubts",
    modDoubtsDesc:
      "Review student notebook photos, timestamp tags, and publish verified teacher explanations.",
    coursesPageTitle: "Teacher Studio — Courses",
    editLessonHeading: "Edit Lesson & Tute",
    createLessonHeading: "Create New Lesson",
    lessonTitleField: "Lesson Title",
    lessonTitlePlaceholder: "e.g. Unit 8: Refraction & Prisms",
    subjectField: "Subject",
    gradeField: "Grade",
    termField: "Term",
    videoUrlField: "Video Stream URL",
    pdfAttachmentLabel: "PDF Tute Attachment",
    browsePdfBtn: "Browse PDF",
    selectedFilePrefix: "Selected:",
    cancelBtn: "Cancel",
    saveChangesBtn: "Save Changes",
    publishLessonBtn: "Publish Lesson",
    lessonUpdatedToast: "Lesson updated!",
    lessonCreatedToast: "New lesson & PDF tute uploaded!",
    uploadedListHeading: "Uploaded Lessons",
    editBtn: "Edit",
    defaultDuration: "22 mins",
    quizzesPageTitle: "Teacher Studio — MCQ Quiz Builder",
    buildQuizHeading: "Build New MCQ Question & Quiz",
    defaultQuizTitleInput: "Term 2 Past Paper Mini Quiz",
    quizTitlePlaceholder: "Quiz Title",
    gradeColon: "Grade:",
    promptPlaceholder: "Enter MCQ question prompt...",
    optionPrefix: "Option",
    markCorrectPrefix: "Mark correct:",
    explanationPlaceholder:
      "Marking explanation shown after student answers...",
    publishQuizBtn: "Publish MCQ Quiz",
    publishedQuizzesHeading: "Published MCQ Quizzes",
    qsWord: "Qs",
    correctPrefix: "Correct:",
    quizSavedToast: "MCQ Quiz saved to student quizzes!",
    defaultQuizFallbackTitle: "New MCQ Quiz",
    defaultExplanation: "Review the unit summary note.",
    doubtsPageTitle: "Teacher Studio — Student Doubts Queue",
    filterQuestionsLabel: "Filter Student Questions:",
    filterPending: "Pending",
    filterAnswered: "Answered",
    filterAll: "All",
    photoPrefix: "Photo:",
    replyPlaceholder: "Write verified explanation for student...",
    sendReplyBtn: "Send Reply",
    replySentToast: "Verified teacher reply sent! Visible on student /doubts.",
  },
  si: {
    homeTitle: "ගුරු මැදිරිය (Teacher Studio)",
    activeStudentsLabel: "සක්‍රිය සිසුන්",
    activeStudentsSub: "මාධ්‍ය 3ම ඔස්සේ 8–11 ශ්‍රේණි",
    pendingDoubtsLabel: "පිළිතුරු නොදුන් ගැටළු",
    replyQueueLink: "සිසු ගැටළු පෝලිමට පිළිතුරු දෙන්න →",
    uploadedLessonsLabel: "මගේ පාඨමාලා",
    uploadLessonLink: "පාඨමාලා කළමනාකරණය →",
    modLessonsTitle: "පාඨමාලා",
    modLessonsDesc:
      "පාඨමාලා සාදන්න, සංස්කරණය කරන්න, පළ කරන්න හෝ මකන්න — පසුව වීඩියෝ පාඩම් සහ PDF ටියුට් වාර අනුව අමුණන්න.",
    modQuizTitle: "MCQ ප්‍රශ්නාවලි නිර්මාපකය",
    modQuizDesc:
      "ක්ෂණික පැහැදිලි කිරීම් සහිතව වාර විභාග සහ සා/පෙළ MCQ ප්‍රශ්න 4-විකල්ප පත්‍ර සාදන්න.",
    modDoubtsTitle: "සිසු ගැටළු වලට පිළිතුරු දෙන්න",
    modDoubtsDesc:
      "සිසුන් එවූ සටහන් ඡායාරූප සහ වේලා සටහන් පරීක්ෂා කර තහවුරු කළ ගුරු පිළිතුරු පළ කරන්න.",
    coursesPageTitle: "ගුරු මැදිරිය — පාඨමාලා",
    editLessonHeading: "පාඩම සහ ටියුට් සංස්කරණය",
    createLessonHeading: "නව පාඩමක් සාදන්න",
    lessonTitleField: "පාඩමේ මාතෘකාව",
    lessonTitlePlaceholder: "උදා: 8 ඒකකය: වර්තනය සහ ප්‍රිස්ම",
    subjectField: "විෂයය",
    gradeField: "ශ්‍රේණිය",
    termField: "වාරය",
    videoUrlField: "වීඩියෝ සබැඳිය (URL)",
    pdfAttachmentLabel: "PDF ටියුට් ගොනුව",
    browsePdfBtn: "PDF තෝරන්න",
    selectedFilePrefix: "තෝරාගත්තේ:",
    cancelBtn: "අවලංගු කරන්න",
    saveChangesBtn: "වෙනස්කම් සුරකින්න",
    publishLessonBtn: "පාඩම පළ කරන්න",
    lessonUpdatedToast: "පාඩම යාවත්කාලීන කරන ලදී!",
    lessonCreatedToast: "නව පාඩම සහ PDF ටියුට් උඩුගත කෙරිණි!",
    uploadedListHeading: "උඩුගත කළ පාඩම්",
    editBtn: "සංස්කරණය",
    defaultDuration: "මිනි. 22",
    quizzesPageTitle: "ගුරු මැදිරිය — MCQ ප්‍රශ්නාවලි",
    buildQuizHeading: "නව MCQ ප්‍රශ්නයක් සහ ප්‍රශ්නාවලියක් සාදන්න",
    defaultQuizTitleInput: "2 වන වාර පසුගිය ප්‍රශ්න කෙටි පරීක්ෂණය",
    quizTitlePlaceholder: "ප්‍රශ්නාවලියේ නම",
    gradeColon: "ශ්‍රේණිය:",
    promptPlaceholder: "MCQ ප්‍රශ්නය මෙහි ලියන්න...",
    optionPrefix: "විකල්පය",
    markCorrectPrefix: "නිවැරදි පිළිතුර:",
    explanationPlaceholder: "සිසුවා පිළිතුරු දුන් පසු පෙන්වන පැහැදිලි කිරීම...",
    publishQuizBtn: "MCQ ප්‍රශ්නාවලිය පළ කරන්න",
    publishedQuizzesHeading: "පළ කළ MCQ ප්‍රශ්නාවලි",
    qsWord: "ප්‍රශ්න",
    correctPrefix: "නිවැරදි:",
    quizSavedToast: "MCQ ප්‍රශ්නාවලිය සිසුන් වෙත සුරැකිණි!",
    defaultQuizFallbackTitle: "නව MCQ ප්‍රශ්නාවලිය",
    defaultExplanation: "ඒකක සාරාංශ සටහන පරීක්ෂා කරන්න.",
    doubtsPageTitle: "ගුරු මැදිරිය — සිසු ගැටළු පෝලිම",
    filterQuestionsLabel: "සිසු ප්‍රශ්න පෙරන්න:",
    filterPending: "පොරොත්තු",
    filterAnswered: "පිළිතුරු දුන්",
    filterAll: "සියල්ල",
    photoPrefix: "ඡායාරූපය:",
    replyPlaceholder: "සිසුවා සඳහා තහවුරු කළ පැහැදිලි කිරීම ලියන්න...",
    sendReplyBtn: "පිළිතුර යවන්න",
    replySentToast: "ගුරු පිළිතුර යවන ලදී! සිසු /doubts පිටුවේ දිස්වේ.",
  },
  ta: {
    homeTitle: "ஆசிரியர் ஸ்டுடியோ (Teacher Studio)",
    activeStudentsLabel: "செயலில் உள்ள மாணவர்கள்",
    activeStudentsSub: "3 ஊடகங்களிலும் தரம் 8–11",
    pendingDoubtsLabel: "நிலுவையில் உள்ள சந்தேகங்கள்",
    replyQueueLink: "மாணவர் வரிசைக்குப் பதிலளிக்கவும் →",
    uploadedLessonsLabel: "என் பாடநெறிகள்",
    uploadLessonLink: "பாடநெறிகளை நிர்வகிக்க →",
    modLessonsTitle: "பாடநெறிகள்",
    modLessonsDesc:
      "பாடநெறிகளை உருவாக்க, திருத்த, வெளியிட அல்லது நீக்க — பின்னர் வீடியோ பாடங்கள் & PDF டியூட்களைத் தவணை வாரியாக இணைக்கவும்.",
    modQuizTitle: "MCQ வினாடி-வினா உருவாக்கி",
    modQuizDesc:
      "உடனடி விளக்கங்களுடன் 4-தெரிவு தவணைத் தேர்வு மற்றும் சா/த MCQ வினாடிகளை உருவாக்கவும்.",
    modDoubtsTitle: "மாணவர் சந்தேகங்களுக்குப் பதிலளிக்கவும்",
    modDoubtsDesc:
      "மாணவர் குறிப்புப் படங்கள், நேரக் குறியீடுகளைப் பார்த்து சரிபார்க்கப்பட்ட விளக்கங்களை வெளியிடவும்.",
    coursesPageTitle: "ஆசிரியர் ஸ்டுடியோ — பாடநெறிகள்",
    editLessonHeading: "பாடம் & டியூட்டைத் திருத்துக",
    createLessonHeading: "புதிய பாடத்தை உருவாக்குக",
    lessonTitleField: "பாடத் தலைப்பு",
    lessonTitlePlaceholder: "உ-ம்: அலகு 8: முறிவும் அரியங்களும்",
    subjectField: "பாடம்",
    gradeField: "தரம்",
    termField: "தவணை",
    videoUrlField: "வீடியோ இணைப்பு (URL)",
    pdfAttachmentLabel: "PDF டியூட் இணைப்பு",
    browsePdfBtn: "PDF தேர்ந்தெடு",
    selectedFilePrefix: "தேர்ந்தெடுத்தது:",
    cancelBtn: "ரத்து செய்",
    saveChangesBtn: "மாற்றங்களைச் சேமி",
    publishLessonBtn: "பாடத்தை வெளியிடுக",
    lessonUpdatedToast: "பாடம் புதுப்பிக்கப்பட்டது!",
    lessonCreatedToast: "புதிய பாடம் & PDF டியூட் பதிவேற்றப்பட்டது!",
    uploadedListHeading: "பதிவேற்றப்பட்ட பாடங்கள்",
    editBtn: "திருத்துக",
    defaultDuration: "22 நிமி.",
    quizzesPageTitle: "ஆசிரியர் ஸ்டுடியோ — MCQ வினாடி-வினா",
    buildQuizHeading: "புதிய MCQ வினா & வினாடி-வினாவை உருவாக்குக",
    defaultQuizTitleInput: "தவணை 2 கடந்த கால வினா குறுந்தேர்வு",
    quizTitlePlaceholder: "வினாடி-வினா தலைப்பு",
    gradeColon: "தரம்:",
    promptPlaceholder: "MCQ வினாவை இங்கே உள்ளிடவும்...",
    optionPrefix: "தெரிவு",
    markCorrectPrefix: "சரியான விடை:",
    explanationPlaceholder: "மாணவர் பதிலளித்த பின் காட்டப்படும் விளக்கம்...",
    publishQuizBtn: "MCQ வினாடி-வினாவை வெளியிடுக",
    publishedQuizzesHeading: "வெளியிடப்பட்ட MCQ வினாடி-வினாக்கள்",
    qsWord: "வினாக்கள்",
    correctPrefix: "சரியானது:",
    quizSavedToast: "MCQ வினாடி-வினா சேமிக்கப்பட்டது!",
    defaultQuizFallbackTitle: "புதிய MCQ வினாடி-வினா",
    defaultExplanation: "அலகு சுருக்கக் குறிப்பைப் பார்க்கவும்.",
    doubtsPageTitle: "ஆசிரியர் ஸ்டுடியோ — மாணவர் சந்தேக வரிசை",
    filterQuestionsLabel: "மாணவர் கேள்விகளை வடிகட்டுக:",
    filterPending: "நிலுவையில்",
    filterAnswered: "பதிலளிக்கப்பட்டது",
    filterAll: "அனைத்தும்",
    photoPrefix: "படம்:",
    replyPlaceholder: "மாணவருக்கான சரிபார்க்கப்பட்ட விளக்கத்தை எழுதுக...",
    sendReplyBtn: "பதிலை அனுப்புக",
    replySentToast: "ஆசிரியர் பதில் அனுப்பப்பட்டது! /doubts இல் காணலாம்.",
  },
};

export const SEEDED_QUIZ_PROMPTS: Record<
  string,
  { prompt: LocalizedText; options?: Record<AppLanguage, string[]> }
> = {
  q1: {
    prompt: {
      en: "If the angle of incidence on a plane mirror is 35°, what is the angle between the incident ray and reflected ray?",
      si: "තල දර්පණයක් මත පතන කෝණය 35° නම්, පතන කිරණය සහ පරාවර්තන කිරණය අතර කෝණය කීයද?",
      ta: "தள ஆடியில் படுகோணம் 35° எனில், படுகதிருக்கும் தெறிகதிருக்கும் இடைப்பட்ட கோணம் யாது?",
    },
  },
  q2: {
    prompt: {
      en: "Which mirror is used as a vehicle side rear-view mirror?",
      si: "වාහනවල පැති කණ්ණාඩි ලෙස භාවිතා කරන්නේ කුමන දර්පණයද?",
      ta: "வாகனங்களின் பக்கவாட்டுக் கண்ணாடியாகப் பயன்படுத்தப்படும் ஆடி எது?",
    },
    options: {
      en: [
        "Concave mirror",
        "Convex mirror",
        "Plane mirror",
        "Parabolic mirror",
      ],
      si: ["අවතල දර්පණය", "උත්තල දර්පණය", "තල දර්පණය", "පරාවලයික දර්පණය"],
      ta: ["குழிவு ஆடி", "குவிவு ஆடி", "தள ஆடி", "பரவளைய ஆடி"],
    },
  },
};
