import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";
import type { MaterialCategory } from "./mock-data";

export interface NotesCopy {
  pageTitle: string;
  courseMaterialsTitle: string;
  backToCourse: string;
  courseQa: string;
  openVideoLesson: string;
  libraryBadge: string;
  libraryHeading: string;
  filterSubjectAria: string;
  pagesWord: string;
  previewPdfBtn: string;
  savedOfflineBtn: string;
  saveOfflineBtn: string;
  savedToastPrefix: string;
  removedOfflineToastPrefix: string;
  removedBookmarkToast: string;
  addedBookmarkToast: string;
  closePreviewAria: string;
  docPreviewPrefix: string;
  highlightsHeading: string;
  bookmarkedBtn: string;
  bookmarkBtn: string;
  savedOfflineModalBtn: string;
  saveOfflineModalBtn: string;
}

export const NOTES_COPY: Record<AppLanguage, NotesCopy> = {
  en: {
    pageTitle: "Tutes, Short Notes & NIE Textbooks",
    courseMaterialsTitle: "Course Materials",
    backToCourse: "Back to Course Details",
    courseQa: "Course Q&A",
    openVideoLesson: "Open Video Lesson",
    libraryBadge: "Categorized Revision Library",
    libraryHeading: "Lesson Tutes, Short Notes, Formula Sheets & NIE Textbooks",
    filterSubjectAria: "Filter materials by subject",
    pagesWord: "pages",
    previewPdfBtn: "Preview PDF",
    savedOfflineBtn: "Saved Offline",
    saveOfflineBtn: "Save Offline",
    savedToastPrefix: "Saved for offline study:",
    removedOfflineToastPrefix: "Removed from offline storage:",
    removedBookmarkToast: "Removed from Saved bookmarks",
    addedBookmarkToast: "Bookmarked for exam revision!",
    closePreviewAria: "Close preview",
    docPreviewPrefix: "Document Preview • Page 1 of",
    highlightsHeading: "Key Highlights Inside This Resource:",
    bookmarkedBtn: "Bookmarked",
    bookmarkBtn: "Bookmark",
    savedOfflineModalBtn: "Saved Offline (Remove)",
    saveOfflineModalBtn: "Save for Offline / Download",
  },
  si: {
    pageTitle: "ටියුට්, කෙටි සටහන් සහ NIE පෙළපොත්",
    courseMaterialsTitle: "පාඨමාලා අධ්‍යයන ද්‍රව්‍ය",
    backToCourse: "පාඨමාලා විස්තර වෙත ආපසු",
    courseQa: "පාඨමාලා ප්‍රශ්න හා පිළිතුරු",
    openVideoLesson: "වීඩියෝ පාඩම විවෘත කරන්න",
    libraryBadge: "වර්ගීකරණය කළ පුනරීක්ෂණ පුස්තකාලය",
    libraryHeading: "පාඩම් ටියුට්, කෙටි සටහන්, සූත්‍ර පත්‍ර සහ NIE පෙළපොත්",
    filterSubjectAria: "විෂය අනුව අධ්‍යයන ද්‍රව්‍ය පෙරන්න",
    pagesWord: "පිටු",
    previewPdfBtn: "PDF පෙරදසුන",
    savedOfflineBtn: "නොබැඳිව සුරැකිණි",
    saveOfflineBtn: "නොබැඳිව සුරකින්න",
    savedToastPrefix: "නොබැඳි අධ්‍යයනයට සුරකින ලදී:",
    removedOfflineToastPrefix: "නොබැඳි ගබඩාවෙන් ඉවත් කරන ලදී:",
    removedBookmarkToast: "සුරැකි දෑ වලින් ඉවත් කරන ලදී",
    addedBookmarkToast: "විභාග පුනරීක්ෂණයට සුරැකිණි!",
    closePreviewAria: "පෙරදසුන වසන්න",
    docPreviewPrefix: "ලේඛන පෙරදසුන • පිටු 1 /",
    highlightsHeading: "මෙම සම්පතෙහි ප්‍රධාන කරුණු:",
    bookmarkedBtn: "සුරැකිණි",
    bookmarkBtn: "සුරකින්න",
    savedOfflineModalBtn: "නොබැඳිව සුරැකිණි (ඉවත් කරන්න)",
    saveOfflineModalBtn: "නොබැඳිව සුරකින්න / බාගන්න",
  },
  ta: {
    pageTitle: "டியூட்கள், சுருக்கக் குறிப்புகள் & NIE பாடநூல்கள்",
    courseMaterialsTitle: "பாடநெறி வளங்கள்",
    backToCourse: "பாடநெறி விவரங்களுக்குத் திரும்பு",
    courseQa: "பாடநெறி கேள்வி-பதில்",
    openVideoLesson: "வீடியோ பாடத்தைத் திறக்கவும்",
    libraryBadge: "வகைப்படுத்தப்பட்ட மீள்பார்வை நூலகம்",
    libraryHeading:
      "பாட டியூட்கள், சுருக்கக் குறிப்புகள், சூத்திரத் தாள்கள் & NIE பாடநூல்கள்",
    filterSubjectAria: "பாடம் வாரியாக வளங்களை வடிகட்டுக",
    pagesWord: "பக்கங்கள்",
    previewPdfBtn: "PDF முன்னோட்டம்",
    savedOfflineBtn: "ஆஃப்லைனில் சேமிக்கப்பட்டது",
    saveOfflineBtn: "ஆஃப்லைனில் சேமிக்கவும்",
    savedToastPrefix: "ஆஃப்லைன் படிப்புக்காகச் சேமிக்கப்பட்டது:",
    removedOfflineToastPrefix: "ஆஃப்லைன் சேமிப்பிலிருந்து நீக்கப்பட்டது:",
    removedBookmarkToast: "சேமித்தவற்றிலிருந்து நீக்கப்பட்டது",
    addedBookmarkToast: "பரீட்சை மீள்பார்வைக்குச் சேமிக்கப்பட்டது!",
    closePreviewAria: "முன்னோட்டத்தை மூடுக",
    docPreviewPrefix: "ஆவண முன்னோட்டம் • பக்கம் 1 /",
    highlightsHeading: "இந்த வளத்தின் முக்கிய அம்சங்கள்:",
    bookmarkedBtn: "சேமிக்கப்பட்டது",
    bookmarkBtn: "சேமிக்கவும்",
    savedOfflineModalBtn: "ஆஃப்லைனில் உள்ளது (நீக்கவும்)",
    saveOfflineModalBtn: "ஆஃப்லைனில் சேமிக்கவும் / பதிவிறக்கவும்",
  },
};

export const CATEGORY_LABELS: Record<"All" | MaterialCategory, LocalizedText> =
  {
    All: { en: "All", si: "සියල්ල", ta: "அனைத்தும்" },
    "Lesson Tutes": {
      en: "Lesson Tutes",
      si: "පාඩම් ටියුට්",
      ta: "பாட டியூட்கள்",
    },
    "Short Notes": {
      en: "Short Notes",
      si: "කෙටි සටහන්",
      ta: "சுருக்கக் குறிப்புகள்",
    },
    "Formula Sheets": {
      en: "Formula Sheets",
      si: "සූත්‍ර පත්‍ර",
      ta: "சூத்திரத் தாள்கள்",
    },
    "Mind Maps": {
      en: "Mind Maps",
      si: "මනෝ සිතියම්",
      ta: "மன வரைபடங்கள்",
    },
    "NIE Textbooks": {
      en: "NIE Textbooks",
      si: "NIE පෙළපොත්",
      ta: "NIE பாடநூல்கள்",
    },
  };
