import type { LocalizedText } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";

export type NotifCategory = "all" | "live" | "payment" | "doubt" | "exam";

export interface NotificationItem {
  id: string;
  category: Exclude<NotifCategory, "all">;
  localizedTitle: LocalizedText;
  localizedBody: LocalizedText;
  localizedTime: LocalizedText;
  to: string;
}

export const NOTIF_COPY: Record<
  AppLanguage,
  {
    pageTitle: string;
    catAll: string;
    catLive: string;
    catPayment: string;
    catDoubt: string;
    catExam: string;
    markAllBtn: string;
    markedToast: string;
  }
> = {
  en: {
    pageTitle: "Notifications Center",
    catAll: "All",
    catLive: "Live Classes",
    catPayment: "Bank Slips",
    catDoubt: "Doubt Replies",
    catExam: "Exam Countdowns",
    markAllBtn: "Mark all as read",
    markedToast: "All notifications marked as read",
  },
  si: {
    pageTitle: "දැනුම්දීම් මධ්‍යස්ථානය",
    catAll: "සියල්ල",
    catLive: "සජීවී පන්ති",
    catPayment: "බැංකු රිසිට්පත්",
    catDoubt: "ගැටළු පිළිතුරු",
    catExam: "විභාග දින ගණන්",
    markAllBtn: "සියල්ල කියවූ ලෙස ලකුණු කරන්න",
    markedToast: "සියලු දැනුම්දීම් කියවූ ලෙස ලකුණු කෙරිණි",
  },
  ta: {
    pageTitle: "அறிவிப்புகள் மையம்",
    catAll: "அனைத்தும்",
    catLive: "நேரலை வகுப்புகள்",
    catPayment: "வங்கி ரசீதுகள்",
    catDoubt: "சந்தேகப் பதில்கள்",
    catExam: "பரீட்சை நாட்கள்",
    markAllBtn: "அனைத்தையும் படித்ததாகக் குறிக்கவும்",
    markedToast: "அனைத்து அறிவிப்புகளும் படித்ததாகக் குறிக்கப்பட்டன",
  },
};

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    category: "live",
    localizedTitle: {
      en: "Live Science Class Starting in 15 mins",
      si: "සජීවී විද්‍යා පන්තිය මිනිත්තු 15කින් ඇරඹේ",
      ta: "நேரலை விஞ்ஞான வகுப்பு 15 நிமிடங்களில் ஆரம்பம்",
    },
    localizedBody: {
      en: "Ms. Menaka Jayawardena is starting Mirrors & Ray Diagrams Lab on Zoom Live.",
      si: "මේනකා ජයවර්ධන මිය විසින් දර්පණ සහ කිරණ සටහන් Zoom සජීවී පන්තිය අරඹයි.",
      ta: "திருமதி மேனகா ஜயவர்தன Zoom நேரலையில் ஆடிகள் & கதிர் வரைபட வகுப்பைத் தொடங்குகிறார்.",
    },
    localizedTime: {
      en: "5 mins ago",
      si: "මිනි. 5කට පෙර",
      ta: "5 நிமி. முன்",
    },
    to: "/live",
  },
  {
    id: "notif-2",
    category: "payment",
    localizedTitle: {
      en: "Bank Slip Verification Update",
      si: "බැංකු රිසිට්පත් තහවුරු කිරීමේ යාවත්කාලීනය",
      ta: "வங்கி ரசீது சரிபார்ப்புத் தகவல்",
    },
    localizedBody: {
      en: "Sampath Bank slip SAMP-2026-11904 was approved. Term 2 Mathematics is unlocked.",
      si: "සම්පත් බැංකු රිසිට්පත SAMP-2026-11904 අනුමත කෙරිණි. 2 වන වාර ගණිතය විවෘතයි.",
      ta: "சம்பத் வங்கி ரசீது SAMP-2026-11904 அங்கீகரிக்கப்பட்டது. தவணை 2 கணிதம் திறக்கப்பட்டது.",
    },
    localizedTime: { en: "1 hour ago", si: "පැය 1කට පෙර", ta: "1 மணி முன்" },
    to: "/payment-status",
  },
  {
    id: "notif-3",
    category: "doubt",
    localizedTitle: {
      en: "Verified Teacher Replied to Your Doubt",
      si: "තහවුරු කළ ගුරුවරයා ඔබේ ගැටළුවට පිළිතුරු දුන්නේය",
      ta: "சரிபார்க்கப்பட்ட ஆசிரியர் உங்கள் கேள்விக்குப் பதிலளித்தார்",
    },
    localizedBody: {
      en: "Ms. Menaka replied to your question on Concave Mirror focal length image formation.",
      si: "අවතල දර්පණ නාභි දුර ප්‍රතිබිම්බ පිළිබඳ ඔබේ ප්‍රශ්නයට මේනකා මිය පිළිතුරු දුන්නාය.",
      ta: "குழிவு ஆடி குவியத்தூர விம்ப உருவாக்கம் குறித்த உங்கள் கேள்விக்கு மேனகா மிய பதிலளித்தார்.",
    },
    localizedTime: { en: "2 hours ago", si: "පැය 2කට පෙර", ta: "2 மணி முன்" },
    to: "/doubts",
  },
  {
    id: "notif-4",
    category: "exam",
    localizedTitle: {
      en: "Term 2 Western Province Test Countdown",
      si: "2 වන වාර බස්නාහිර පළාත් විභාග දින ගණන",
      ta: "தவணை 2 மேல் மாகாணப் பரீட்சை நினைவூட்டல்",
    },
    localizedBody: {
      en: "9 days remaining — try the Visakha & Royal Term 2 Science model packs.",
      si: "තව දින 9යි — විශාඛා සහ රාජකීය 2 වන වාර විද්‍යා ආදර්ශ පත්‍ර උත්සාහ කරන්න.",
      ta: "இன்னும் 9 நாட்கள் — விசாகா & ரோயல் தவணை 2 விஞ்ஞான மாதிரிப் பொதிகளை முயற்சிக்கவும்.",
    },
    localizedTime: { en: "Yesterday", si: "ඊයේ", ta: "நேற்று" },
    to: "/term-tests",
  },
  {
    id: "notif-5",
    category: "exam",
    localizedTitle: {
      en: "G.C.E. O/L 2024 Past Paper Added",
      si: "අ.පො.ස. සා/පෙළ 2024 පසුගිය ප්‍රශ්න පත්‍රය එක් කෙරිණි",
      ta: "க.பொ.த. சா/த 2024 கடந்த கால வினாத்தாள் சேர்க்கப்பட்டது",
    },
    localizedBody: {
      en: "Auto-graded MCQ sheet and Part II marking scheme are now available.",
      si: "ස්වයංක්‍රීය MCQ පිළිතුරු පත්‍රය සහ II කොටස ලකුණු දීමේ පටිපාටිය දැන් ලබා ගත හැක.",
      ta: "தானியங்கி MCQ விடைத்தாளும் பகுதி II புள்ளித்திட்டமும் இப்போது கிடைக்கின்றன.",
    },
    localizedTime: {
      en: "2 days ago",
      si: "දින 2කට පෙර",
      ta: "2 நாட்கள் முன்",
    },
    to: "/past-papers",
  },
  {
    id: "notif-6",
    category: "payment",
    localizedTitle: {
      en: "Monthly Class Card Renewal Reminder",
      si: "මාසික පන්ති කාඩ්පත අලුත් කිරීමේ සිහිකැඳවීම",
      ta: "மாதாந்த வகுப்பு அட்டை புதுப்பிப்பு நினைவூட்டல்",
    },
    localizedBody: {
      en: "Term 2 Mathematics + Past Paper bundle renews on 02 Dec 2026.",
      si: "2 වන වාර ගණිතය + පසුගිය ප්‍රශ්න පැකේජය 2026 දෙසැ. 02 අලුත් වේ.",
      ta: "தவணை 2 கணிதம் + கடந்த வினாப் பொதி 02 டிச. 2026 அன்று புதுப்பிக்கப்படும்.",
    },
    localizedTime: {
      en: "3 days ago",
      si: "දින 3කට පෙර",
      ta: "3 நாட்கள் முன்",
    },
    to: "/billing",
  },
];
