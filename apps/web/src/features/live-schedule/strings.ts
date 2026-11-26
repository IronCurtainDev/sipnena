import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";
import type { TimetableSession } from "./mock-data";

export interface LiveScheduleCopy {
  timetablePageTitle: string;
  livePageTitle: string;
  liveNowBadge: string;
  nextQaPrefix: string;
  watchingCount: string;
  lowDataSupported: string;
  joinMockPlayerBtn: string;
  zoomBtn: string;
  youtubeBtn: string;
  zoomToast: string;
  youtubeToast: string;
  tabLive: string;
  tabTimetable: string;
  tabRecordings: string;
  watchRecordedBtn: string;
  reminderRemovedToast: string;
  reminderSetPrefix: string;
  reminderOnBtn: string;
  remindMeBtn: string;
  joinLiveBtn: string;
  openStreamBtn: string;
  liveStreamBadge: string;
  closePlayerAria: string;
  connectedClassroomPrefix: string;
  connectedClassroomSuffix: string;
  channelPrefix: string;
  dataSaverStreamNote: string;
  askDoubtLiveBtn: string;
  leaveRoomBtn: string;
}

export const LIVE_SCHEDULE_COPY: Record<AppLanguage, LiveScheduleCopy> = {
  en: {
    timetablePageTitle: "Weekly Class Timetable",
    livePageTitle: "Live Classes & Recordings",
    liveNowBadge: "LIVE NOW",
    nextQaPrefix: "Next Q&A Segment in",
    watchingCount: "342 students watching",
    lowDataSupported: "Low-data mode supported",
    joinMockPlayerBtn: "Join Mock Live Player",
    zoomBtn: "Zoom",
    youtubeBtn: "YouTube Live",
    zoomToast: "Opening Zoom Classroom link (Demo preview)...",
    youtubeToast: "Opening YouTube Live unlisted stream (Demo)...",
    tabLive: "Live & Upcoming",
    tabTimetable: "Weekly Timetable (Mon–Sun)",
    tabRecordings: "Past Recordings",
    watchRecordedBtn: "Watch Recorded Lesson",
    reminderRemovedToast: "Reminder removed",
    reminderSetPrefix: "Reminder set for",
    reminderOnBtn: "Reminder On",
    remindMeBtn: "Remind Me",
    joinLiveBtn: "Join Live",
    openStreamBtn: "Open Stream",
    liveStreamBadge: "LIVE STREAM",
    closePlayerAria: "Close live player",
    connectedClassroomPrefix: "Connected to",
    connectedClassroomSuffix: "Classroom",
    channelPrefix: "Channel:",
    dataSaverStreamNote: "Data Saver: 480p Smooth Stream",
    askDoubtLiveBtn: "Ask a Doubt Live",
    leaveRoomBtn: "Leave Room",
  },
  si: {
    timetablePageTitle: "සතිපතා පන්ති කාලසටහන",
    livePageTitle: "සජීවී පන්ති සහ පටිගත කිරීම්",
    liveNowBadge: "දැන් සජීවීව",
    nextQaPrefix: "ඊළඟ ප්‍රශ්න-පිළිතුරු කොටස",
    watchingCount: "සිසුන් 342 ක් නරඹති",
    lowDataSupported: "අඩු දත්ත මාදිලිය සහාය දක්වයි",
    joinMockPlayerBtn: "සජීවී පන්තියට සම්බන්ධ වන්න",
    zoomBtn: "Zoom",
    youtubeBtn: "YouTube සජීවී",
    zoomToast: "Zoom පන්ති කාමර සබැඳිය විවෘත වෙමින් පවතී (පෙරදසුන)...",
    youtubeToast: "YouTube සජීවී පන්තිය විවෘත වෙමින් පවතී (පෙරදසුන)...",
    tabLive: "සජීවී සහ ඉදිරි පන්ති",
    tabTimetable: "සතිපතා කාලසටහන (සඳුදා–ඉරිදා)",
    tabRecordings: "පෙර පටිගත කළ පාඩම්",
    watchRecordedBtn: "පටිගත කළ පාඩම බලන්න",
    reminderRemovedToast: "සිහිකැඳවීම ඉවත් කරන ලදී",
    reminderSetPrefix: "සිහිකැඳවීම තබන ලදී:",
    reminderOnBtn: "සිහිකැඳවීම සක්‍රියයි",
    remindMeBtn: "මට මතක් කරන්න",
    joinLiveBtn: "සජීවීව එක්වන්න",
    openStreamBtn: "විකාශනය විවෘත කරන්න",
    liveStreamBadge: "සජීවී විකාශනය",
    closePlayerAria: "සජීවී විකාශනය වසන්න",
    connectedClassroomPrefix: "සම්බන්ධ වූ පන්ති කාමරය:",
    connectedClassroomSuffix: "",
    channelPrefix: "නාලිකාව:",
    dataSaverStreamNote: "දත්ත සුරැකුම: 480p සුමට විකාශනය",
    askDoubtLiveBtn: "සජීවීව ගැටළුවක් අසන්න",
    leaveRoomBtn: "පන්තියෙන් පිටවන්න",
  },
  ta: {
    timetablePageTitle: "வாராந்த வகுப்பு நேர அட்டவணை",
    livePageTitle: "நேரலை வகுப்புகள் & பதிவுகள்",
    liveNowBadge: "இப்போது நேரலை",
    nextQaPrefix: "அடுத்த கேள்வி-பதில் பகுதி",
    watchingCount: "342 மாணவர்கள் பார்க்கின்றனர்",
    lowDataSupported: "குறைந்த டேட்டா முறை ஆதரவு",
    joinMockPlayerBtn: "நேரலை வகுப்பில் இணையவும்",
    zoomBtn: "Zoom",
    youtubeBtn: "YouTube நேரலை",
    zoomToast: "Zoom வகுப்பறை இணைப்பு திறக்கப்படுகிறது (மாதிரி)...",
    youtubeToast: "YouTube நேரலை வகுப்பு திறக்கப்படுகிறது (மாதிரி)...",
    tabLive: "நேரலை & வரவிருப்பவை",
    tabTimetable: "வாராந்த அட்டவணை (திங்கள்–ஞாயிறு)",
    tabRecordings: "கடந்த பதிவுகள்",
    watchRecordedBtn: "பதிவுசெய்த பாடத்தைப் பார்க்கவும்",
    reminderRemovedToast: "நினைவூட்டல் நீக்கப்பட்டது",
    reminderSetPrefix: "நினைவூட்டல் அமைக்கப்பட்டது:",
    reminderOnBtn: "நினைவூட்டல் இயங்குகிறது",
    remindMeBtn: "எனக்கு நினைவூட்டுக",
    joinLiveBtn: "நேரலையில் இணையவும்",
    openStreamBtn: "ஒளிபரப்பைத் திறக்கவும்",
    liveStreamBadge: "நேரலை ஒளிபரப்பு",
    closePlayerAria: "நேரலை இயக்ககத்தை மூடுக",
    connectedClassroomPrefix: "இணைக்கப்பட்ட வகுப்பறை:",
    connectedClassroomSuffix: "",
    channelPrefix: "அலைவரிசை:",
    dataSaverStreamNote: "டேட்டா சேமிப்பு: 480p சீரான ஒளிபரப்பு",
    askDoubtLiveBtn: "நேரலையில் கேள்வி கேட்கவும்",
    leaveRoomBtn: "வகுப்பிலிருந்து வெளியேறுக",
  },
};

export const DAY_LABELS: Record<TimetableSession["day"], LocalizedText> = {
  Mon: { en: "Mon", si: "සඳුදා", ta: "திங்கள்" },
  Tue: { en: "Tue", si: "අඟහ.", ta: "செவ்வாய்" },
  Wed: { en: "Wed", si: "බදාදා", ta: "புதன்" },
  Thu: { en: "Thu", si: "බ්‍රහස්.", ta: "வியாழன்" },
  Fri: { en: "Fri", si: "සිකු.", ta: "வெள்ளி" },
  Sat: { en: "Sat", si: "සෙන.", ta: "சனி" },
  Sun: { en: "Sun", si: "ඉරිදා", ta: "ஞாயிறு" },
};
