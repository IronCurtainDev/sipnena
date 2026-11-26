import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export interface TermTestsCopy {
  pageTitle: string;
  heroTitle: string;
  heroSub: string;
  provinceFilter: string;
  schoolFilter: string;
  emptyForTermPrefix: string;
  emptyForTermSuffix: string;
  showAllPrefix: string;
  showAllSuffix: string;
  completedLabel: string;
  markDoneLabel: string;
  durationPrefix: string;
  downloadBtn: string;
  downloadingToastPrefix: string;
  attemptBtn: string;
}

export const TERM_TESTS_COPY: Record<AppLanguage, TermTestsCopy> = {
  en: {
    pageTitle: "Term Test Packs & Model Papers",
    heroTitle: "Provincial & Leading School Term Test Packs",
    heroSub:
      "Compare Western, Southern, Central, and national school papers across Terms 1–3.",
    provinceFilter: "Filter by Province",
    schoolFilter: "Filter by Leading School",
    emptyForTermPrefix: "No",
    emptyForTermSuffix: "papers match this province/school combination.",
    showAllPrefix: "Show All",
    showAllSuffix: "Packs",
    completedLabel: "Completed",
    markDoneLabel: "Mark Done",
    durationPrefix: "Duration:",
    downloadBtn: "Download PDF",
    downloadingToastPrefix: "Downloading PDF:",
    attemptBtn: "Attempt Now",
  },
  si: {
    pageTitle: "වාර විභාග ප්‍රශ්න පත්‍ර සහ ආදර්ශ පත්‍ර",
    heroTitle: "පළාත් සහ ප්‍රමුඛ පාසල් වාර විභාග ප්‍රශ්න පත්‍ර",
    heroSub:
      "1–3 වාර සඳහා බස්නාහිර, දකුණු, මධ්‍යම ඇතුළු පළාත් සහ ජාතික පාසල් ප්‍රශ්න පත්‍ර සසඳා බලන්න.",
    provinceFilter: "පළාත අනුව පෙරන්න",
    schoolFilter: "ප්‍රමුඛ පාසල අනුව පෙරන්න",
    emptyForTermPrefix: "",
    emptyForTermSuffix:
      "සඳහා මෙම පළාත්/පාසල් තේරීමට ගැළපෙන ප්‍රශ්න පත්‍ර නොමැත.",
    showAllPrefix: "සියලු",
    showAllSuffix: "ප්‍රශ්න පත්‍ර පෙන්වන්න",
    completedLabel: "සම්පූර්ණයි",
    markDoneLabel: "නිම කළා ලෙස ලකුණු කරන්න",
    durationPrefix: "කාලය:",
    downloadBtn: "PDF බාගන්න",
    downloadingToastPrefix: "PDF බාගත වෙමින් පවතී:",
    attemptBtn: "දැන් පිළිතුරු සපයන්න",
  },
  ta: {
    pageTitle: "தவணைப் பரீட்சைத் தொகுப்புகள் & மாதிரி வினாத்தாள்கள்",
    heroTitle: "மாகாண மற்றும் முன்னணி பாடசாலைத் தவணை வினாத்தாள்கள்",
    heroSub:
      "தவணை 1–3 க்கான மேல், தென், மத்திய மற்றும் தேசிய பாடசாலை வினாத்தாள்களை ஒப்பிட்டுப் பயிற்சி செய்க.",
    provinceFilter: "மாகாணம் வாரியாக வடிகட்டுக",
    schoolFilter: "முன்னணி பாடசாலை வாரியாக வடிகட்டுக",
    emptyForTermPrefix: "",
    emptyForTermSuffix:
      "இந்த மாகாண/பாடசாலைத் தேர்வுக்குப் பொருந்தும் வினாத்தாள்கள் இல்லை.",
    showAllPrefix: "அனைத்து",
    showAllSuffix: "தொகுப்புகளையும் காட்டு",
    completedLabel: "நிறைவடைந்தது",
    markDoneLabel: "முடித்ததாகக் குறிக்கவும்",
    durationPrefix: "கால அளவு:",
    downloadBtn: "PDF பதிவிறக்குக",
    downloadingToastPrefix: "PDF பதிவிறக்கப்படுகிறது:",
    attemptBtn: "இப்போது முயற்சிக்கவும்",
  },
};

export const PROVINCE_LABELS: Record<string, LocalizedText> = {
  "All Provinces": {
    en: "All Provinces",
    si: "සියලු පළාත්",
    ta: "அனைத்து மாகாணங்களும்",
  },
  "Western Province": {
    en: "Western Province",
    si: "බස්නාහිර පළාත",
    ta: "மேல் மாகாணம்",
  },
  "Southern Province": {
    en: "Southern Province",
    si: "දකුණු පළාත",
    ta: "தென் மாகாணம்",
  },
  "Central Province": {
    en: "Central Province",
    si: "මධ්‍යම පළාත",
    ta: "மத்திய மாகாணம்",
  },
  "North Western Province": {
    en: "North Western Province",
    si: "වයඹ පළාත",
    ta: "வடமேல் மாகாணம்",
  },
  "Sabaragamuwa Province": {
    en: "Sabaragamuwa Province",
    si: "සබරගමුව පළාත",
    ta: "சபரகமுவ மாகாணம்",
  },
  "Northern Province": {
    en: "Northern Province",
    si: "උතුරු පළාත",
    ta: "வட மாகாணம்",
  },
};

export const SCHOOL_LABELS: Record<string, LocalizedText> = {
  "All Schools": {
    en: "All Schools",
    si: "සියලු පාසල්",
    ta: "அனைத்துப் பாடசாலைகளும்",
  },
  "Royal College, Colombo": {
    en: "Royal College, Colombo",
    si: "රාජකීය විද්‍යාලය, කොළඹ",
    ta: "கொழும்பு ரோயல் கல்லூரி",
  },
  "Visakha Vidyalaya, Colombo": {
    en: "Visakha Vidyalaya, Colombo",
    si: "විශාඛා විද්‍යාලය, කොළඹ",
    ta: "கொழும்பு விசாகா வித்தியாலயம்",
  },
  "Richmond College, Galle": {
    en: "Richmond College, Galle",
    si: "රිච්මන්ඩ් විද්‍යාලය, ගාල්ල",
    ta: "காலி ரிச்மண்ட் கல்லூரி",
  },
  "Dharmaraja College, Kandy": {
    en: "Dharmaraja College, Kandy",
    si: "ධර්මරාජ විද්‍යාලය, මහනුවර",
    ta: "கண்டி தர்மராஜ கல்லூரி",
  },
  "Jaffna Hindu College": {
    en: "Jaffna Hindu College",
    si: "යාපනය හින්දු විද්‍යාලය",
    ta: "யாழ்ப்பாணம் இந்துக் கல்லூரி",
  },
  "Maliyadeva College, Kurunegala": {
    en: "Maliyadeva College, Kurunegala",
    si: "මලියදේව විද්‍යාලය, කුරුණෑගල",
    ta: "குருநாகல் மலியதேவ கல்லூரி",
  },
};

export const DIFFICULTY_LABELS: Record<
  "Easy" | "Standard" | "Challenging",
  LocalizedText
> = {
  Easy: { en: "Easy", si: "පහසු", ta: "எளிதானது" },
  Standard: { en: "Standard", si: "සම්මත", ta: "நடுத்தரம்" },
  Challenging: { en: "Challenging", si: "අභියෝගාත්මක", ta: "சவாலானது" },
};
