import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export interface SavedCopy {
  pageTitle: string;
  heading: string;
  subtitle: string;
  browseNotesBtn: string;
  emptyText: string;
  bookmarkPapersBtn: string;
  openBtn: string;
  removedToast: string;
}

export const SAVED_COPY: Record<AppLanguage, SavedCopy> = {
  en: {
    pageTitle: "Saved & Exam-Week Bookmarks",
    heading: "Revision Bookmarks",
    subtitle:
      "Bookmarked lessons, tricky past paper questions, and short notes grouped by subject.",
    browseNotesBtn: "+ Browse More Notes",
    emptyText: "No revision bookmarks saved yet.",
    bookmarkPapersBtn: "Bookmark Past Papers",
    openBtn: "Open",
    removedToast: "Removed from bookmarks",
  },
  si: {
    pageTitle: "සුරැකි සහ විභාග සති සටහන්",
    heading: "පුනරීක්ෂණ සුරැකි දෑ",
    subtitle: "විෂය අනුව වර්ග කළ පාඩම්, වැදගත් පසුගිය ප්‍රශ්න සහ කෙටි සටහන්.",
    browseNotesBtn: "+ තවත් සටහන් බලන්න",
    emptyText: "තවමත් පුනරීක්ෂණ සුරැකුම් කිසිවක් නොමැත.",
    bookmarkPapersBtn: "ප්‍රශ්න පත්‍ර සුරකින්න",
    openBtn: "විවෘත කරන්න",
    removedToast: "සුරැකුම් වලින් ඉවත් කරන ලදී",
  },
  ta: {
    pageTitle: "சேமித்தவை & பரீட்சை வாரக் குறிப்புகள்",
    heading: "மீள்பார்வை சேமிப்புகள்",
    subtitle:
      "பாடம் வாரியாகப் பிரிக்கப்பட்ட பாடங்கள், முக்கிய வினாத்தாள் கேள்விகள் மற்றும் சுருக்கக் குறிப்புகள்.",
    browseNotesBtn: "+ மேலும் குறிப்புகளைப் பார்",
    emptyText: "மீள்பார்வை சேமிப்புகள் எதுவும் இன்னும் இல்லை.",
    bookmarkPapersBtn: "கடந்த வினாத்தாள்களைச் சேமிக்கவும்",
    openBtn: "திறக்கவும்",
    removedToast: "சேமிப்புகளிலிருந்து நீக்கப்பட்டது",
  },
};

export interface SavedCatalogItem {
  id: string;
  subject: string;
  localizedType: LocalizedText;
  kindKey: "lesson" | "paper" | "note";
  localizedTitle: LocalizedText;
  to: string;
}

export const BOOKMARKABLE_CATALOG: SavedCatalogItem[] = [
  {
    id: "les-light-4",
    subject: "Science",
    kindKey: "lesson",
    localizedType: { en: "Lesson", si: "පාඩම", ta: "பாடம்" },
    localizedTitle: {
      en: "Lesson 4: Mirrors & Image Formation (Unit 7)",
      si: "4 වන පාඩම: දර්පණ සහ ප්‍රතිබිම්බ සෑදීම (7 ඒකකය)",
      ta: "பாடம் 4: ஆடிகள் & விம்ப உருவாக்கம் (அலகு 7)",
    },
    to: "/lesson",
  },
  {
    id: "note-light-short",
    subject: "Science",
    kindKey: "note",
    localizedType: {
      en: "Short Note",
      si: "කෙටි සටහන",
      ta: "சுருக்கக் குறிப்பு",
    },
    localizedTitle: {
      en: "O/L Science — Electricity & Ohm's Law One-Page Note",
      si: "සා/පෙළ විද්‍යාව — විදුලිය සහ ඕම්ගේ නියමය කෙටි සටහන",
      ta: "சா/த விஞ்ஞானம் — மின்னியல் & ஓமின் விதி ஒரு பக்கக் குறிப்பு",
    },
    to: "/notes",
  },
  {
    id: "pp-2023-sci-mcq-12",
    subject: "Science",
    kindKey: "paper",
    localizedType: {
      en: "Past Paper Question",
      si: "පසුගිය ප්‍රශ්න පත්‍ර ප්‍රශ්නය",
      ta: "கடந்த வினாத்தாள் கேள்வி",
    },
    localizedTitle: {
      en: "2024 O/L Science MCQ #1 — Concave vs Convex Lens Image",
      si: "2024 සා/පෙළ විද්‍යාව MCQ #1 — අවතල හා උත්තල කාච ප්‍රතිබිම්බ",
      ta: "2024 சா/த விஞ்ஞானம் MCQ #1 — குழிவு & குவிவு வில்லை விம்பம்",
    },
    to: "/past-papers",
  },
  {
    id: "note-algebra-formula",
    subject: "Mathematics",
    kindKey: "note",
    localizedType: {
      en: "Short Note",
      si: "සූත්‍ර පත්‍රය",
      ta: "சூத்திரத் தாள்",
    },
    localizedTitle: {
      en: "G.C.E. O/L Mathematics Master Formula Sheet (All 3 Terms)",
      si: "අ.පො.ස. සා/පෙළ ගණිතය ප්‍රධාන සූත්‍ර පත්‍රය (වාර 3ම)",
      ta: "க.பொ.த. சா/த கணிதம் முதன்மை சூத்திரத் தாள் (3 தவணைகளும்)",
    },
    to: "/notes",
  },
  {
    id: "ol-2024-science-p1",
    subject: "Science",
    kindKey: "paper",
    localizedType: {
      en: "Past Paper Question",
      si: "පසුගිය ප්‍රශ්න පත්‍රය",
      ta: "கடந்த வினாத்தாள்",
    },
    localizedTitle: {
      en: "G.C.E. O/L Science — 2024 Part I Paper",
      si: "අ.පො.ස. සා/පෙළ විද්‍යාව — 2024 I කොටස",
      ta: "க.பொ.த. சா/த விஞ்ஞானம் — 2024 பகுதி I",
    },
    to: "/past-papers",
  },
  {
    id: "ol-2023-maths-p2",
    subject: "Mathematics",
    kindKey: "paper",
    localizedType: {
      en: "Past Paper Question",
      si: "පසුගිය ප්‍රශ්න පත්‍රය",
      ta: "கடந்த வினாத்தாள்",
    },
    localizedTitle: {
      en: "G.C.E. O/L Mathematics — 2023 Part II",
      si: "අ.පො.ස. සා/පෙළ ගණිතය — 2023 II කොටස",
      ta: "க.பொ.த. சா/த கணிதம் — 2023 பகுதி II",
    },
    to: "/past-papers",
  },
];
