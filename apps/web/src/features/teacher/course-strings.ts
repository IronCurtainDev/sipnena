import type { AppLanguage } from "@/lib/language";

export interface TeacherCourseCopy {
  libraryTitle: string;
  librarySubtitle: string;
  newCourseBtn: string;
  searchPlaceholder: string;
  filterAll: string;
  filterDraft: string;
  filterPublished: string;
  emptyCourses: string;
  emptyCoursesHeading: string;
  noMatchCourses: string;
  clearFiltersBtn: string;
  editCurriculumBtn: string;
  deleteCourseBtn: string;
  deleteConfirm: string;
  lessonCountLabel: string;
  freeLabel: string;
  paidLabel: string;
  publishedLabel: string;
  draftLabel: string;
  courseCreatedToast: string;
  courseDeletedToast: string;
  courseSavedToast: string;
  backToLibrary: string;
  tabCurriculum: string;
  tabCourseInfo: string;
  previewBtn: string;
  previewToast: string;
  addSectionBtn: string;
  addLectureBtn: string;
  sectionTitlePlaceholder: string;
  noSections: string;
  selectLectureHint: string;
  lectureEditorHeading: string;
  removeLectureBtn: string;
  lessonDeletedToast: string;
  lessonSavedToast: string;
  sectionAddedToast: string;
  lectureAddedToast: string;
  titleField: string;
  descriptionField: string;
  descriptionPlaceholder: string;
  mediumField: string;
  pricingField: string;
  priceField: string;
  pricePlaceholder: string;
  coverImageField: string;
  coverImageHint: string;
  coverImageClear: string;
  saveCourseInfoBtn: string;
  publishToggleHint: string;
  defaultSectionTitle: string;
  defaultLectureTitle: string;
  defaultDuration: string;
}

export const TEACHER_COURSE_COPY: Record<AppLanguage, TeacherCourseCopy> = {
  en: {
    libraryTitle: "My Courses",
    librarySubtitle: "Build and publish your Grade 6–11 courses.",
    newCourseBtn: "New course",
    searchPlaceholder: "Search courses…",
    filterAll: "All",
    filterDraft: "Draft",
    filterPublished: "Published",
    emptyCourses: "Open the builder and add sections, lectures, and quizzes.",
    emptyCoursesHeading: "Create your first course",
    noMatchCourses: "No courses match your search or filter.",
    clearFiltersBtn: "Clear filters",
    editCurriculumBtn: "Edit",
    deleteCourseBtn: "Delete course",
    deleteConfirm: "Delete this course, its sections, and lessons?",
    lessonCountLabel: "lectures",
    freeLabel: "Free",
    paidLabel: "Paid",
    publishedLabel: "Published",
    draftLabel: "Draft",
    courseCreatedToast: "Course created — open the curriculum builder.",
    courseDeletedToast: "Course deleted.",
    courseSavedToast: "Course saved.",
    backToLibrary: "My Courses",
    tabCurriculum: "Curriculum",
    tabCourseInfo: "Course info",
    previewBtn: "Preview",
    previewToast: "Preview opens for students when published (demo).",
    addSectionBtn: "Add section",
    addLectureBtn: "Add lecture",
    sectionTitlePlaceholder: "Section title",
    noSections: "Add a section to start your curriculum.",
    selectLectureHint: "Select a lecture in the curriculum to edit it here.",
    lectureEditorHeading: "Lecture",
    removeLectureBtn: "Remove lecture",
    lessonDeletedToast: "Lecture removed.",
    lessonSavedToast: "Lecture saved.",
    sectionAddedToast: "Section added.",
    lectureAddedToast: "Lecture added.",
    titleField: "Course title",
    descriptionField: "Short description",
    descriptionPlaceholder: "What students will learn…",
    mediumField: "Medium",
    pricingField: "Pricing",
    priceField: "Price",
    pricePlaceholder: "Rs. 1,200",
    coverImageField: "Preview image",
    coverImageHint: "Choose a JPG or PNG cover for the student catalog",
    coverImageClear: "Remove preview image",
    saveCourseInfoBtn: "Save course info",
    publishToggleHint: "Students only see published courses.",
    defaultSectionTitle: "Section 1",
    defaultLectureTitle: "New lecture",
    defaultDuration: "20 mins",
  },
  si: {
    libraryTitle: "මගේ පාඨමාලා",
    librarySubtitle: "6–11 ශ්‍රේණි පාඨමාලා සාදා පළ කරන්න.",
    newCourseBtn: "නව පාඨමාලාව",
    searchPlaceholder: "පාඨමාලා සොයන්න…",
    filterAll: "සියල්ල",
    filterDraft: "කෙටුම්පත",
    filterPublished: "පළ කළ",
    emptyCourses: "නිර්මාණකය විවෘත කර කොටස්, පාඩම් සහ ප්‍රශ්නාවලි එක් කරන්න.",
    emptyCoursesHeading: "පළමු පාඨමාලාව සාදන්න",
    noMatchCourses: "ඔබේ සෙවුමට හෝ පෙරහනට ගැලපෙන පාඨමාලා නැත.",
    clearFiltersBtn: "පෙරහන් ඉවත් කරන්න",
    editCurriculumBtn: "සංස්කරණය",
    deleteCourseBtn: "පාඨමාලාව මකන්න",
    deleteConfirm: "මෙම පාඨමාලාව, කොටස් සහ පාඩම් මකන්නද?",
    lessonCountLabel: "පාඩම්",
    freeLabel: "නොමිලේ",
    paidLabel: "ගෙවන",
    publishedLabel: "පළ කළ",
    draftLabel: "කෙටුම්පත",
    courseCreatedToast: "පාඨමාලාව සාදන ලදී — නිර්මාණකය විවෘතයි.",
    courseDeletedToast: "පාඨමාලාව මකන ලදී.",
    courseSavedToast: "පාඨමාලාව සුරකිණි.",
    backToLibrary: "මගේ පාඨමාලා",
    tabCurriculum: "විෂය නිර්දේශය",
    tabCourseInfo: "පාඨමාලා තොරතුරු",
    previewBtn: "පෙරදසුන",
    previewToast: "පළ කළ විට සිසුන්ට පෙරදසුන ලැබේ (ආදර්ශ).",
    addSectionBtn: "කොටසක් එක් කරන්න",
    addLectureBtn: "පාඩමක් එක් කරන්න",
    sectionTitlePlaceholder: "කොටසේ මාතෘකාව",
    noSections: "විෂය නිර්දේශය අරඹන්නට කොටසක් එක් කරන්න.",
    selectLectureHint: "සංස්කරණයට වම් පැත්තෙන් පාඩමක් තෝරන්න.",
    lectureEditorHeading: "පාඩම",
    removeLectureBtn: "පාඩම ඉවත් කරන්න",
    lessonDeletedToast: "පාඩම ඉවත් කෙරිණි.",
    lessonSavedToast: "පාඩම සුරකිණි.",
    sectionAddedToast: "කොටස එක් කෙරිණි.",
    lectureAddedToast: "පාඩම එක් කෙරිණි.",
    titleField: "පාඨමාලා මාතෘකාව",
    descriptionField: "කෙටි විස්තරය",
    descriptionPlaceholder: "සිසුන් ඉගෙන ගන්නේ කුමක්ද…",
    mediumField: "මාධ්‍යය",
    pricingField: "මිල",
    priceField: "මිල ගණන",
    pricePlaceholder: "රු. 1,200",
    coverImageField: "පෙරදසුන් රූපය",
    coverImageHint: "සිසු කැටලොගයට JPG හෝ PNG කවරයක් තෝරන්න",
    coverImageClear: "පෙරදසුන් රූපය ඉවත් කරන්න",
    saveCourseInfoBtn: "තොරතුරු සුරකින්න",
    publishToggleHint: "සිසුන්ට පෙනෙන්නේ පළ කළ පාඨමාලා පමණි.",
    defaultSectionTitle: "1 වන කොටස",
    defaultLectureTitle: "නව පාඩම",
    defaultDuration: "මිනි. 20",
  },
  ta: {
    libraryTitle: "என் பாடநெறிகள்",
    librarySubtitle: "தரம் 6–11 பாடநெறிகளை உருவாக்கி வெளியிடுங்கள்.",
    newCourseBtn: "புதிய பாடநெறி",
    searchPlaceholder: "பாடநெறிகளைத் தேடுக…",
    filterAll: "அனைத்தும்",
    filterDraft: "வரைவு",
    filterPublished: "வெளியிடப்பட்டது",
    emptyCourses:
      "உருவாக்கியைத் திறந்து பிரிவுகள், பாடங்கள் மற்றும் வினாடிகளைச் சேருங்கள்.",
    emptyCoursesHeading: "முதல் பாடநெறியை உருவாக்குக",
    noMatchCourses:
      "உங்கள் தேடல் அல்லது வடிகட்டிக்குப் பொருந்தும் பாடநெறிகள் இல்லை.",
    clearFiltersBtn: "வடிகட்டிகளை அழிக்க",
    editCurriculumBtn: "திருத்து",
    deleteCourseBtn: "பாடநெறியை நீக்குக",
    deleteConfirm: "இந்த பாடநெறி, பிரிவுகள் மற்றும் பாடங்களை நீக்கவா?",
    lessonCountLabel: "பாடங்கள்",
    freeLabel: "இலவசம்",
    paidLabel: "கட்டணம்",
    publishedLabel: "வெளியிடப்பட்டது",
    draftLabel: "வரைவு",
    courseCreatedToast: "பாடநெறி உருவாக்கப்பட்டது — உருவாக்கி திறக்கிறது.",
    courseDeletedToast: "பாடநெறி நீக்கப்பட்டது.",
    courseSavedToast: "பாடநெறி சேமிக்கப்பட்டது.",
    backToLibrary: "என் பாடநெறிகள்",
    tabCurriculum: "பாடத்திட்டம்",
    tabCourseInfo: "பாடநெறி தகவல்",
    previewBtn: "முன்னோட்டம்",
    previewToast: "வெளியிட்ட பின் மாணவர்களுக்கு முன்னோட்டம் (டெமோ).",
    addSectionBtn: "பிரிவு சேர்க்க",
    addLectureBtn: "பாடம் சேர்க்க",
    sectionTitlePlaceholder: "பிரிவு தலைப்பு",
    noSections: "பாடத்திட்டத்தைத் தொடங்க ஒரு பிரிவைச் சேர்க்கவும்.",
    selectLectureHint: "திருத்த இடதுபுறம் ஒரு பாடத்தைத் தேர்ந்தெடுக்கவும்.",
    lectureEditorHeading: "பாடம்",
    removeLectureBtn: "பாடத்தை நீக்குக",
    lessonDeletedToast: "பாடம் நீக்கப்பட்டது.",
    lessonSavedToast: "பாடம் சேமிக்கப்பட்டது.",
    sectionAddedToast: "பிரிவு சேர்க்கப்பட்டது.",
    lectureAddedToast: "பாடம் சேர்க்கப்பட்டது.",
    titleField: "பாடநெறி தலைப்பு",
    descriptionField: "சுருக்க விளக்கம்",
    descriptionPlaceholder: "மாணவர்கள் கற்பது…",
    mediumField: "ஊடகம்",
    pricingField: "கட்டணம்",
    priceField: "விலை",
    pricePlaceholder: "ரூ. 1,200",
    coverImageField: "முன்னோட்டப் படம்",
    coverImageHint: "மாணவர் பட்டியலுக்கு JPG அல்லது PNG அட்டையைத் தேர்ந்தெடுக்க",
    coverImageClear: "முன்னோட்டப் படத்தை நீக்கு",
    saveCourseInfoBtn: "தகவலைச் சேமி",
    publishToggleHint:
      "மாணவர்களுக்கு வெளியிடப்பட்ட பாடநெறிகள் மட்டுமே தெரியும்.",
    defaultSectionTitle: "பிரிவு 1",
    defaultLectureTitle: "புதிய பாடம்",
    defaultDuration: "20 நிமி.",
  },
};
