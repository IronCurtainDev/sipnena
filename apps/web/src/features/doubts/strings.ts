import type { AppLanguage } from "@/lib/language";

export interface DoubtsCopy {
  pageTitle: string;
  courseQaTitle: string;
  backToCourse: string;
  viewMaterials: string;
  heroTitle: string;
  heroSub: string;
  askDoubtBtn: string;
  statusAll: string;
  statusAnswered: string;
  statusPending: string;
  answeredBadge: string;
  pendingBadge: string;
  helpfulLabel: string;
  attachedPhotoPrefix: string;
  verifiedTeacherBadge: string;
  postedToast: string;
  closeModalAria: string;
  modalTitle: string;
  modalSub: string;
  subjectField: string;
  timestampField: string;
  timestampPlaceholder: string;
  lessonTopicField: string;
  defaultLessonTopic: string;
  questionField: string;
  questionPlaceholder: string;
  attachPhotoLabel: string;
  clearBtn: string;
  cancelBtn: string;
  submitBtn: string;
}

export const DOUBTS_COPY: Record<AppLanguage, DoubtsCopy> = {
  en: {
    pageTitle: "Doubt Solving & Teacher Q&A",
    courseQaTitle: "Course Q&A",
    backToCourse: "Back to Course Details",
    viewMaterials: "View Course Tutes & Materials",
    heroTitle: "Ask Any Syllabus Question & Get Verified Teacher Replies",
    heroSub:
      "Get verified explanations from qualified subject teachers within hours.",
    askDoubtBtn: "Ask a Doubt",
    statusAll: "All",
    statusAnswered: "Answered",
    statusPending: "Pending",
    answeredBadge: "Answered",
    pendingBadge: "Pending Teacher Reply",
    helpfulLabel: "Helpful",
    attachedPhotoPrefix: "Attached photo:",
    verifiedTeacherBadge: "Verified Teacher",
    postedToast: "Your question was submitted to your subject teacher!",
    closeModalAria: "Close modal",
    modalTitle: "Ask a Teacher Doubt",
    modalSub:
      "Tag a lesson timestamp or attach a photo of your math/science exercise.",
    subjectField: "Subject",
    timestampField: "Lesson Timestamp Tag",
    timestampPlaceholder: "e.g. 12:40",
    lessonTopicField: "Lesson or Past Paper Topic",
    defaultLessonTopic: "Mirrors & Image Formation",
    questionField: "Your Question",
    questionPlaceholder:
      "Explain where you got stuck (Sinhala, Tamil, or English)...",
    attachPhotoLabel: "Attach Notebook / Question Photo (Optional)",
    clearBtn: "Clear",
    cancelBtn: "Cancel",
    submitBtn: "Submit Doubt",
  },
  si: {
    pageTitle: "ගැටළු විසඳුම් සහ ගුරු ප්‍රශ්න-පිළිතුරු",
    courseQaTitle: "පාඨමාලා ප්‍රශ්න හා පිළිතුරු",
    backToCourse: "පාඨමාලා විස්තර වෙත ආපසු",
    viewMaterials: "පාඨමාලා ටියුට් සහ සටහන් බලන්න",
    heroTitle: "ඕනෑම විෂය නිර්දේශ ගැටළුවක් අසා ගුරු පිළිතුරු ලබාගන්න",
    heroSub:
      "මෙහි අසන ප්‍රශ්න ගුරු මැදිරියේ (Teacher Studio) පෝලිමටද ක්ෂණිකව එක් වේ.",
    askDoubtBtn: "ගැටළුවක් අසන්න",
    statusAll: "සියල්ල",
    statusAnswered: "පිළිතුරු දුන්",
    statusPending: "පොරොත්තු",
    answeredBadge: "පිළිතුරු සපයා ඇත",
    pendingBadge: "ගුරු පිළිතුර බලාපොරොත්තුවෙන්",
    helpfulLabel: "ප්‍රයෝජනවත්",
    attachedPhotoPrefix: "ඇමිණූ ඡායාරූපය:",
    verifiedTeacherBadge: "තහවුරු කළ ගුරුවරයා",
    postedToast:
      "ගැටළුව යොමු කෙරිණි! ගුරු මැදිරිය → සිසු ගැටළු වෙතින් පිළිතුරු දිය හැක.",
    closeModalAria: "කවුළුව වසන්න",
    modalTitle: "ගුරුවරයෙකුගෙන් ගැටළුවක් අසන්න",
    modalSub:
      "පාඩමේ වේලා සටහනක් (Timestamp) හෝ ඔබේ සටහන් පොතේ ඡායාරූපයක් එක් කරන්න.",
    subjectField: "විෂයය",
    timestampField: "පාඩමේ වේලා සටහන",
    timestampPlaceholder: "උදා: 12:40",
    lessonTopicField: "පාඩම හෝ ප්‍රශ්න පත්‍ර මාතෘකාව",
    defaultLessonTopic: "දර්පණ සහ ප්‍රතිබිම්බ සෑදීම",
    questionField: "ඔබේ ප්‍රශ්නය",
    questionPlaceholder:
      "ඔබට නොතේරුණු තැන සිංහල, දෙමළ හෝ ඉංග්‍රීසියෙන් ලියන්න...",
    attachPhotoLabel: "සටහන් පොතේ / ප්‍රශ්නයේ ඡායාරූපයක් අමුණන්න (විකල්ප)",
    clearBtn: "මකන්න",
    cancelBtn: "අවලංගු කරන්න",
    submitBtn: "ගැටළුව යොමු කරන්න",
  },
  ta: {
    pageTitle: "சந்தேகத் தீர்வு & ஆசிரியர் கேள்வி-பதில்",
    courseQaTitle: "பாடநெறி கேள்வி-பதில்",
    backToCourse: "பாடநெறி விவரங்களுக்குத் திரும்பு",
    viewMaterials: "பாடநெறி டியூட்கள் & குறிப்புகளைப் பார்",
    heroTitle:
      "எந்தப் பாடத்திட்டக் கேள்வியையும் கேட்டு ஆசிரியர் பதில்களைப் பெறுங்கள்",
    heroSub:
      "இங்கே கேட்கப்படும் கேள்விகள் ஆசிரியர் ஸ்டுடியோ வரிசையிலும் உடனடியாகத் தோன்றும்.",
    askDoubtBtn: "கேள்வி கேட்கவும்",
    statusAll: "அனைத்தும்",
    statusAnswered: "பதிலளிக்கப்பட்டது",
    statusPending: "நிலுவையில்",
    answeredBadge: "பதிலளிக்கப்பட்டது",
    pendingBadge: "ஆசிரியர் பதிலுக்காகக் காத்திருக்கிறது",
    helpfulLabel: "பயனுள்ளது",
    attachedPhotoPrefix: "இணைக்கப்பட்ட படம்:",
    verifiedTeacherBadge: "சரிபார்க்கப்பட்ட ஆசிரியர்",
    postedToast:
      "சந்தேகம் அனுப்பப்பட்டது! ஆசிரியர் ஸ்டுடியோ → மாணவர் சந்தேகங்களில் பதிலளிக்கலாம்.",
    closeModalAria: "சாளரத்தை மூடுக",
    modalTitle: "ஆசிரியரிடம் சந்தேகம் கேட்கவும்",
    modalSub:
      "பாட நேரக் குறியீடு (Timestamp) அல்லது உங்கள் பயிற்சிப் புத்தகப் படத்தை இணைக்கவும்.",
    subjectField: "பாடம்",
    timestampField: "பாட நேரக் குறியீடு",
    timestampPlaceholder: "உ-ம்: 12:40",
    lessonTopicField: "பாடம் அல்லது வினாத்தாள் தலைப்பு",
    defaultLessonTopic: "ஆடிகள் & விம்ப உருவாக்கம்",
    questionField: "உங்கள் கேள்வி",
    questionPlaceholder: "உங்களுக்குப் புரியாத பகுதியை விளக்கமாக எழுதவும்...",
    attachPhotoLabel:
      "பயிற்சிப் புத்தக / வினாப் படத்தை இணைக்கவும் (விருப்பத் தேர்வு)",
    clearBtn: "அழிக்கவும்",
    cancelBtn: "ரத்து செய்",
    submitBtn: "சந்தேகத்தைச் சமர்ப்பி",
  },
};
