import type { AppLanguage } from "@/lib/language";

export interface TeacherScheduleCopy {
  tutorBannerBadge: string;
  tutorTitleLine: string;
  tutorSubLine: string;
  quickUploadBtn: string;
  quickQuizBtn: string;
  schedulePageTitle: string;
  scheduleHeading: string;
  scheduleSub: string;
  newSessionBtn: string;
  emptyHeading: string;
  emptyBody: string;
  editSessionBtn: string;
  deleteSessionBtn: string;
  deleteConfirm: string;
  materialsReady: string;
  markReady: string;
  copyKeyBtn: string;
  keyCopiedToast: string;
  startBroadcastBtn: string;
  hostLaunchToast: string;
  sessionSavedToast: string;
  sessionDeletedToast: string;
  formCreateHeading: string;
  formEditHeading: string;
  topicField: string;
  topicPlaceholder: string;
  dayField: string;
  timeField: string;
  timePlaceholder: string;
  subjectField: string;
  gradeField: string;
  mediumField: string;
  mediumPlaceholder: string;
  channelField: string;
  meetingUrlField: string;
  meetingUrlPlaceholderZoom: string;
  meetingUrlPlaceholderYoutube: string;
  meetingUrlMissing: string;
  openMeetingBtn: string;
  meetingOpenedToast: string;
  saveSessionBtn: string;
  cancelBtn: string;
  upcomingClassesTitle: string;
  manageScheduleLink: string;
  pendingInboxTitle: string;
  viewAllDoubtsLink: string;
  answerNowBtn: string;
  noPendingDoubts: string;
}

export const TEACHER_EXTRA_COPY: Record<AppLanguage, TeacherScheduleCopy> = {
  en: {
    tutorBannerBadge: "Registered Educator Workspace",
    tutorTitleLine: "Welcome to your teacher studio",
    tutorSubLine: "Create courses, live sessions, and quizzes for your students",
    quickUploadBtn: "+ New Course",
    quickQuizBtn: "+ Build MCQ Quiz",
    schedulePageTitle: "Live sessions",
    scheduleHeading: "Live sessions",
    scheduleSub:
      "Schedule, edit, and host your online Zoom or YouTube classes.",
    newSessionBtn: "New session",
    emptyHeading: "Schedule your first live session",
    emptyBody: "Add a day, time, and topic so students can join on time.",
    editSessionBtn: "Edit",
    deleteSessionBtn: "Delete session",
    deleteConfirm: "Delete this live session?",
    materialsReady: "Tutes ready",
    markReady: "Mark tutes ready",
    copyKeyBtn: "Copy stream key",
    keyCopiedToast: "Stream key copied.",
    startBroadcastBtn: "Start live",
    hostLaunchToast: "Opening host room (demo)…",
    sessionSavedToast: "Live session saved.",
    sessionDeletedToast: "Live session deleted.",
    formCreateHeading: "New live session",
    formEditHeading: "Edit live session",
    topicField: "Topic",
    topicPlaceholder: "What will you teach?",
    dayField: "Day",
    timeField: "Time",
    timePlaceholder: "04:30 PM",
    subjectField: "Subject",
    gradeField: "Grade",
    mediumField: "Medium",
    mediumPlaceholder: "Sinhala & English",
    channelField: "Channel",
    meetingUrlField: "Meeting / live link",
    meetingUrlPlaceholderZoom: "https://zoom.us/j/…",
    meetingUrlPlaceholderYoutube: "https://youtube.com/live/…",
    meetingUrlMissing: "Add a Zoom or YouTube link in Edit.",
    openMeetingBtn: "Open link",
    meetingOpenedToast: "Opening meeting link…",
    saveSessionBtn: "Save session",
    cancelBtn: "Cancel",
    upcomingClassesTitle: "My Upcoming Live Sessions",
    manageScheduleLink: "Manage sessions →",
    pendingInboxTitle: "Students Waiting for Your Reply",
    viewAllDoubtsLink: "Open Full Queue →",
    answerNowBtn: "Reply Now",
    noPendingDoubts: "All student questions have been answered!",
  },
  si: {
    tutorBannerBadge: "ලියාපදිංචි ගුරු වැඩබිම",
    tutorTitleLine: "ආයුබෝවන්, ඔබේ ගුරු මැදිරියට",
    tutorSubLine: "පාඨමාලා, සජීවී පන්ති සහ ප්‍රශ්නාවලි සාදන්න",
    quickUploadBtn: "+ නව පාඨමාලාව",
    quickQuizBtn: "+ MCQ ප්‍රශ්නාවලිය",
    schedulePageTitle: "සජීවී පන්ති",
    scheduleHeading: "සජීවී පන්ති",
    scheduleSub:
      "Zoom හෝ YouTube සජීවී පන්ති සැලසුම් කර, සංස්කරණය කර, සත්කාරකත්වය කරන්න.",
    newSessionBtn: "නව පන්තිය",
    emptyHeading: "පළමු සජීවී පන්තිය සැලසුම් කරන්න",
    emptyBody:
      "දිනය, වේලාව සහ මාතෘකාව එක් කර සිසුන්ට නියමිත වේලාවට සම්බන්ධ වීමට ඉඩ දෙන්න.",
    editSessionBtn: "සංස්කරණය",
    deleteSessionBtn: "පන්තිය මකන්න",
    deleteConfirm: "මෙම සජීවී පන්තිය මකන්නද?",
    materialsReady: "ටියුට් සූදානම්",
    markReady: "සූදානම් ලෙස ලකුණු කරන්න",
    copyKeyBtn: "Stream key පිටපත්",
    keyCopiedToast: "Stream key පිටපත් කෙරිණි.",
    startBroadcastBtn: "සජීවී අරඹන්න",
    hostLaunchToast: "සත්කාරක කාමරය විවෘත වෙමින්…",
    sessionSavedToast: "සජීවී පන්තිය සුරකිණි.",
    sessionDeletedToast: "සජීවී පන්තිය මකන ලදී.",
    formCreateHeading: "නව සජීවී පන්තිය",
    formEditHeading: "සජීවී පන්තිය සංස්කරණය",
    topicField: "මාතෘකාව",
    topicPlaceholder: "ඔබ උගන්වන්නේ කුමක්ද?",
    dayField: "දිනය",
    timeField: "වේලාව",
    timePlaceholder: "04:30 PM",
    subjectField: "විෂය",
    gradeField: "ශ්‍රේණිය",
    mediumField: "මාධ්‍යය",
    mediumPlaceholder: "සිංහල සහ ඉංග්‍රීසි",
    channelField: "නාලිකාව",
    meetingUrlField: "රැස්වීම / සජීවී සබැඳිය",
    meetingUrlPlaceholderZoom: "https://zoom.us/j/…",
    meetingUrlPlaceholderYoutube: "https://youtube.com/live/…",
    meetingUrlMissing: "සංස්කරණයෙන් Zoom හෝ YouTube සබැඳියක් එක් කරන්න.",
    openMeetingBtn: "සබැඳිය විවෘත කරන්න",
    meetingOpenedToast: "රැස්වීම් සබැඳිය විවෘත වෙමින්…",
    saveSessionBtn: "පන්තිය සුරකින්න",
    cancelBtn: "අවලංගු කරන්න",
    upcomingClassesTitle: "මගේ ඉදිරි සජීවී පන්ති",
    manageScheduleLink: "පන්ති කළමනාකරණය →",
    pendingInboxTitle: "ඔබේ පිළිතුර බලාපොරොත්තු වන සිසුන්",
    viewAllDoubtsLink: "සියලු ගැටළු →",
    answerNowBtn: "දැන් පිළිතුරු දෙන්න",
    noPendingDoubts: "සියලු සිසු ගැටළු වලට පිළිතුරු සපයා ඇත!",
  },
  ta: {
    tutorBannerBadge: "பதிவுசெய்யப்பட்ட ஆசிரியர் பணியிடம்",
    tutorTitleLine: "உங்கள் ஆசிரியர் ஸ்டுடியோவிற்கு வரவேற்கிறோம்",
    tutorSubLine: "பாடநெறிகள், நேரலை வகுப்புகள் மற்றும் வினாடி வினாக்களை உருவாக்குங்கள்",
    quickUploadBtn: "+ புதிய பாடநெறி",
    quickQuizBtn: "+ MCQ வினா",
    schedulePageTitle: "நேரலை வகுப்புகள்",
    scheduleHeading: "நேரலை வகுப்புகள்",
    scheduleSub:
      "Zoom அல்லது YouTube நேரலை வகுப்புகளைத் திட்டமிட்டு திருத்தி நடத்துங்கள்.",
    newSessionBtn: "புதிய வகுப்பு",
    emptyHeading: "முதல் நேரலை வகுப்பைத் திட்டமிடுக",
    emptyBody:
      "நாள், நேரம் மற்றும் தலைப்பைச் சேர்த்து மாணவர்கள் சரியான நேரத்தில் இணையட்டும்.",
    editSessionBtn: "திருத்துக",
    deleteSessionBtn: "வகுப்பை நீக்குக",
    deleteConfirm: "இந்த நேரலை வகுப்பை நீக்கவா?",
    materialsReady: "டியூட் தயார்",
    markReady: "தயார் எனக் குறி",
    copyKeyBtn: "Stream key நகலெடு",
    keyCopiedToast: "Stream key நகலெடுக்கப்பட்டது.",
    startBroadcastBtn: "நேரலையைத் தொடங்குக",
    hostLaunchToast: "ஹோஸ்ட் அறை திறக்கப்படுகிறது…",
    sessionSavedToast: "நேரலை வகுப்பு சேமிக்கப்பட்டது.",
    sessionDeletedToast: "நேரலை வகுப்பு நீக்கப்பட்டது.",
    formCreateHeading: "புதிய நேரலை வகுப்பு",
    formEditHeading: "நேரலை வகுப்பைத் திருத்துக",
    topicField: "தலைப்பு",
    topicPlaceholder: "நீங்கள் என்ன கற்பிக்கிறீர்கள்?",
    dayField: "நாள்",
    timeField: "நேரம்",
    timePlaceholder: "04:30 PM",
    subjectField: "பாடம்",
    gradeField: "தரம்",
    mediumField: "ஊடகம்",
    mediumPlaceholder: "சிங்களம் & ஆங்கிலம்",
    channelField: "சேனல்",
    meetingUrlField: "சந்திப்பு / நேரலை இணைப்பு",
    meetingUrlPlaceholderZoom: "https://zoom.us/j/…",
    meetingUrlPlaceholderYoutube: "https://youtube.com/live/…",
    meetingUrlMissing:
      "திருத்தத்தில் Zoom அல்லது YouTube இணைப்பைச் சேர்க்கவும்.",
    openMeetingBtn: "இணைப்பைத் திறக்க",
    meetingOpenedToast: "சந்திப்பு இணைப்பு திறக்கப்படுகிறது…",
    saveSessionBtn: "வகுப்பைச் சேமி",
    cancelBtn: "ரத்து",
    upcomingClassesTitle: "எனது வரவிருக்கும் நேரலை வகுப்புகள்",
    manageScheduleLink: "வகுப்புகளை நிர்வகி →",
    pendingInboxTitle: "உங்கள் பதிலுக்காகக் காத்திருக்கும் மாணவர்கள்",
    viewAllDoubtsLink: "அனைத்துக் கேள்விகள் →",
    answerNowBtn: "பதிலளிக்கவும்",
    noPendingDoubts: "அனைத்து மாணவர் கேள்விகளுக்கும் பதிலளிக்கப்பட்டது!",
  },
};
