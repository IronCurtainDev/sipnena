import type { AppLanguage } from "@/lib/language";

export interface ParentCopy {
  pageTitle: string;
  guardianBadge: string;
  guardianGreeting: string;
  guardianSub: string;
  switchChildPrompt: string;
  olBadge: string;
  weeklyWatchTime: string;
  vsLastWeek: string;
  lessonsCompleted: string;
  lessonsWord: string;
  acrossTerm2: string;
  liveAttendance: string;
  recentQuizScores: string;
  fullAnalyticsLink: string;
  completedPrefix: string;
  examAlertsHeading: string;
  activeClassCardHeading: string;
  validUntilPrefix: string;
  supportedPaymentSuffix: string;
  renewCardBtn: string;
  slipStatusBtn: string;
  timetableHeading: string;
  fullTimetableLink: string;
}

export const PARENT_COPY: Record<AppLanguage, ParentCopy> = {
  en: {
    pageTitle: "Parent / Guardian Dashboard",
    guardianBadge: "Family Monitoring & Fee Approvals",
    guardianGreeting: "Guardian Overview",
    guardianSub:
      "Monitor attendance, term exam readiness, and Class Card slips for your children.",
    switchChildPrompt: "Select Child Profile (Grades 6–11)",
    olBadge: " (G.C.E. O/L)",
    weeklyWatchTime: "Weekly Watch Time",
    vsLastWeek: "+18% vs last week",
    lessonsCompleted: "Lessons Completed",
    lessonsWord: "lessons",
    acrossTerm2: "Across Term 2 school units",
    liveAttendance: "Live Class Attendance",
    recentQuizScores: "Recent Quiz & Past Paper Scores",
    fullAnalyticsLink: "Full Analytics →",
    completedPrefix: "Completed",
    examAlertsHeading: "Upcoming Exam & Term Test Alerts",
    activeClassCardHeading: "Active Class Card",
    validUntilPrefix: "Valid until",
    supportedPaymentSuffix: "Bank Slip & LankaQR supported",
    renewCardBtn: "Renew Class Card",
    slipStatusBtn: "Slip Status",
    timetableHeading: "Child's Upcoming Tuition Classes",
    fullTimetableLink: "Full Schedule →",
  },
  si: {
    pageTitle: "දෙමාපිය / භාරකරු පාලක පුවරුව",
    guardianBadge: "පවුල් අධීක්ෂණය සහ ගාස්තු අනුමැතිය",
    guardianGreeting: "ප්‍රියානි පෙරේරා මහත්මිය — දෙමාපිය ද්වාරය",
    guardianSub:
      "ඔබේ දරුවන්ගේ පැමිණීම, වාර විභාග සූදානම සහ පන්ති කාඩ්පත් මෙහි බලන්න.",
    switchChildPrompt: "දරුවාගේ ගිණුම තෝරන්න (6–11 ශ්‍රේණි)",
    olBadge: " (අ.පො.ස. සා/පෙළ)",
    weeklyWatchTime: "සතිපතා නැරඹුම් කාලය",
    vsLastWeek: "පසුගිය සතියට වඩා +18%",
    lessonsCompleted: "අවසන් කළ පාඩම්",
    lessonsWord: "පාඩම්",
    acrossTerm2: "2 වන වාර පාසල් ඒකක ඇසුරින්",
    liveAttendance: "සජීවී පන්ති පැමිණීම",
    recentQuizScores: "මෑත ප්‍රශ්නාවලි සහ පසුගිය ප්‍රශ්න පත්‍ර ලකුණු",
    fullAnalyticsLink: "සම්පූර්ණ විශ්ලේෂණය →",
    completedPrefix: "සම්පූර්ණ කළේ",
    examAlertsHeading: "ඉදිරි විභාග සහ වාර පරීක්ෂණ දැනුම්දීම්",
    activeClassCardHeading: "සක්‍රිය පන්ති කාඩ්පත",
    validUntilPrefix: "වලංගු දිනය:",
    supportedPaymentSuffix: "බැංකු රිසිට්පත් සහ LankaQR සහාය දක්වයි",
    renewCardBtn: "පන්ති කාඩ්පත අලුත් කරන්න",
    slipStatusBtn: "රිසිට්පත් තත්ත්වය",
    timetableHeading: "දරුවාගේ ඉදිරි උපකාරක පන්ති",
    fullTimetableLink: "සම්පූර්ණ කාලසටහන →",
  },
  ta: {
    pageTitle: "பெற்றோர் / பாதுகாவலர் கட்டுப்பாட்டுப் பலகை",
    guardianBadge: "குடும்பக் கண்காணிப்பு & கட்டண அனுமதி",
    guardianGreeting: "திருமதி பிரியானி பெரேரா — பெற்றோர் பார்வை",
    guardianSub:
      "உங்கள் பிள்ளைகளின் வருகை, தவணைப் பரீட்சை ஆயத்தம் மற்றும் அட்டைகளைக் கண்காணிக்கவும்.",
    switchChildPrompt: "பிள்ளையின் சுயவிவரத்தைத் தேர்ந்தெடுக்கவும் (தரம் 6–11)",
    olBadge: " (க.பொ.த. சா/த)",
    weeklyWatchTime: "வாராந்த கற்றல் நேரம்",
    vsLastWeek: "கடந்த வாரத்தை விட +18%",
    lessonsCompleted: "முடித்த பாடங்கள்",
    lessonsWord: "பாடங்கள்",
    acrossTerm2: "தவணை 2 பாடசாலை அலகுகளில்",
    liveAttendance: "நேரலை வகுப்பு வருகை",
    recentQuizScores: "சமீபத்திய வினாடி-வினா & கடந்த வினாத்தாள் மதிப்பெண்கள்",
    fullAnalyticsLink: "முழுப் பகுப்பாய்வு →",
    completedPrefix: "நிறைவடைந்தது",
    examAlertsHeading: "வரவிருக்கும் பரீட்சை & தவணைத் தேர்வு அறிவிப்புகள்",
    activeClassCardHeading: "செயலில் உள்ள வகுப்பு அட்டை",
    validUntilPrefix: "செல்லுபடியாகும் திகதி:",
    supportedPaymentSuffix: "வங்கி ரசீது & LankaQR ஆதரவு",
    renewCardBtn: "வகுப்பு அட்டையைப் புதுப்பிக்கவும்",
    slipStatusBtn: "ரசீது நிலை",
    timetableHeading: "பிள்ளையின் வரவிருக்கும் வகுப்புகள்",
    fullTimetableLink: "முழு அட்டவணை →",
  },
};
