import type { AppLanguage } from "@/lib/language";

export interface VideoLessonStrings {
  topContext: string;
  termBadge: string;
  breadcrumbBack: string;
  breadcrumbSubject: string;
  breadcrumbTopic: string;
  breadcrumbUnit: string;
  unitSubtitle: string;
  lessonPill: string;
  lessonTitle: string;
  lessonSubtitle: string;
  markAsDone: string;
  markedDone: string;
  notePdf: string;
  helpAria: string;
  tabOverview: string;
  tabNotes: string;
  tabDiscussion: string;
  tabDownloads: string;
  mobileTabLessons: string;
  mobileTabNotes: string;
  mobileTabFiles: string;
  ruleCardTitle: string;
  ruleCardBody: string;
  formulaBox: string;
  essentialRulesHeading: string;
  rule1Title: string;
  rule1Desc: string;
  rule2Title: string;
  rule2Desc: string;
  rule3Title: string;
  rule3Desc: string;
  rule4Title: string;
  rule4Desc: string;
  educatorHeading: string;
  educatorQuote: string;
  playlistTitle: string;
  playlistProgress: string;
  playlistRemaining: string;
  playlistTabLessons: string;
  playlistTabNotes: string;
  playlistTabQuizzes: string;
  partAHeading: string;
  partAStatus: string;
  partBHeading: string;
  partBStatus: string;
  partCHeading: string;
  partCStatus: string;
  nowPlaying: string;
  curriculumBadge: string;
  videoAudioMeta: string;
  ccOn: string;
  speed: string;
  quality: string;
  downloadSuccess: string;
  savedToBookmarks: string;
}

export const VIDEO_LESSON_STRINGS: Record<AppLanguage, VideoLessonStrings> = {
  en: {
    topContext: "Sri Lankan General Education • Grades 6-11",
    termBadge: "Grade 8 Science • Term 2",
    breadcrumbBack: "Back to Course",
    breadcrumbSubject: "Science (Grades 6-11)",
    breadcrumbTopic: "Light, Reflection & Spherical Mirrors",
    breadcrumbUnit: "Unit 1: Fundamentals",
    unitSubtitle: "Unit 1: Fundamentals of Light & Reflection",
    lessonPill: "Lesson 3 of 12",
    lessonTitle: "Spherical Mirrors & Ray Construction",
    lessonSubtitle:
      "ගෝලීය දර්පණ හා කිරණ සටහන් නිර්මාණය • கோள ஆடிகள் மற்றும் கதிர் படங்கள்",
    markAsDone: "Mark as done",
    markedDone: "Completed ✓",
    notePdf: "Note (PDF)",
    helpAria: "Help & guidelines",
    tabOverview: "Overview & Summary",
    tabNotes: "Lesson Notes (පාඩම් සටහන්)",
    tabDiscussion: "Discussion (4)",
    tabDownloads: "Downloads (3)",
    mobileTabLessons: "Lessons",
    mobileTabNotes: "Notes",
    mobileTabFiles: "Files (3)",
    ruleCardTitle: "Core Rule: Focal Length vs. Radius of Curvature",
    ruleCardBody:
      "The principal focus (F) is located exactly halfway between the mirror pole (P) and the center of curvature (C). Hence for all spherical mirrors:",
    formulaBox: "f = R / 2  (focal length is half of radius)",
    essentialRulesHeading: "Essential Ray Tracing Rules for Concave Mirrors",
    rule1Title: "1. Parallel Ray Rule",
    rule1Desc:
      "Any incident ray parallel to the principal axis reflects directly through the Principal Focus (F).",
    rule2Title: "2. Focal Ray Rule",
    rule2Desc:
      "Any incident ray passing through the focus (F) reflects parallel to the principal axis.",
    rule3Title: "3. Center of Curvature (C) Rule",
    rule3Desc:
      "A ray striking through C hits normally (90°) and bounces back along its exact same path.",
    rule4Title: "4. Pole Ray Rule",
    rule4Desc:
      "A ray incident at the pole (P) reflects symmetrically such that the angle of incidence equals the angle of reflection (i = r).",
    educatorHeading:
      "Note from Ms. Menaka Jayawardena (Senior Science Educator):",
    educatorQuote:
      '"Be ready with your 30cm ruler, sharp HB pencil, and compass before attempting Lesson 4\'s interactive quiz. Accurate ray sketches prevent negative sign convention errors in G.C.E. O/L exams!"',
    playlistTitle: "Course Playlist",
    playlistProgress: "25% Complete",
    playlistRemaining: "3 of 12 lessons completed • 9 remaining",
    playlistTabLessons: "Lessons (12)",
    playlistTabNotes: "Notes (8)",
    playlistTabQuizzes: "Quizzes (3)",
    partAHeading: "PART A • LIGHT BASICS & PLANE MIRRORS",
    partAStatus: "2 / 2 completed",
    partBHeading: "PART B • CURVED MIRRORS & IMAGES",
    partBStatus: "1 in progress",
    partCHeading: "PART C • REFRACTION & OPTICAL INSTRUMENTS",
    partCStatus: "Locked",
    nowPlaying: "Now Playing",
    curriculumBadge:
      "Sri Lanka National Curriculum • NIE Aligned & Department of Examinations Accredited",
    videoAudioMeta: "HD 720p • Sinhala & English Audio",
    ccOn: "CC: On",
    speed: "1.0x",
    quality: "720p HD",
    downloadSuccess: "Downloading: Lesson_3_Ray_Optics_Notes.pdf",
    savedToBookmarks: "Saved lesson to bookmarks",
  },
  si: {
    topContext: "ශ්‍රී ලංකා ජාතික අධ්‍යාපන විෂය නිර්දේශය • 6-11 ශ්‍රේණි",
    termBadge: "8 ශ්‍රේණිය විද්‍යාව • 2 වන වාරය",
    breadcrumbBack: "පාඨමාලාව වෙත ආපසු",
    breadcrumbSubject: "විද්‍යාව (6-11 ශ්‍රේණි)",
    breadcrumbTopic: "ආලෝකය, පරාවර්තනය සහ ගෝලීය දර්පණ",
    breadcrumbUnit: "1 වන ඒකකය: මූලධර්ම",
    unitSubtitle: "1 වන ඒකකය: ආලෝකයේ මූලධර්ම සහ පරාවර්තනය",
    lessonPill: "පාඩම 3 / 12",
    lessonTitle: "ගෝලීය දර්පණ හා කිරණ සටහන් නිර්මාණය",
    lessonSubtitle: "Spherical Mirrors & Ray Construction",
    markAsDone: "සම්පූර්ණයි ලෙස සලකුණු කරන්න",
    markedDone: "සම්පූර්ණයි ✓",
    notePdf: "සටහන (PDF)",
    helpAria: "උපකාර හා මාර්ගෝපදේශ",
    tabOverview: "සමාලෝචනය හා සාරාංශය",
    tabNotes: "පාඩම් සටහන්",
    tabDiscussion: "සාකච්ඡා (4)",
    tabDownloads: "බාගැනීම් (3)",
    mobileTabLessons: "පාඩම් මාලාව",
    mobileTabNotes: "සටහන්",
    mobileTabFiles: "ගොනු (3)",
    ruleCardTitle: "මූලික නීතිය: නාභීය දුර සහ වක්‍රතා අරය අතර සම්බන්ධය",
    ruleCardBody:
      "ප්‍රධාන නාභිය (F) පිහිටා ඇත්තේ දර්පණ ධ්‍රැවය (P) සහ වක්‍රතා කේන්ද්‍රය (C) අතර හරියටම මැද ය. එබැවින් සියලුම ගෝලීය දර්පණ සඳහා:",
    formulaBox: "f = R / 2  (නාභීය දුර යනු වක්‍රතා අරයෙන් අඩකි)",
    essentialRulesHeading: "අවතල දර්පණ සඳහා අත්‍යවශ්‍ය කිරණ ඇඳීමේ නීති 4",
    rule1Title: "1. සමාන්තර කිරණ නීතිය",
    rule1Desc:
      "ප්‍රධාන අක්ෂයට සමාන්තරව පැමිණෙන ඕනෑම ආලෝක කිරණයක් පරාවර්තනයෙන් පසු ප්‍රධාන නාභිය (F) හරහා ගමන් කරයි.",
    rule2Title: "2. නාභීය කිරණ නීතිය",
    rule2Desc:
      "ප්‍රධාන නාභිය (F) හරහා පැමිණෙන ඕනෑම ආලෝක කිරණයක් පරාවර්තනයෙන් පසු ප්‍රධාන අක්ෂයට සමාන්තරව ගමන් කරයි.",
    rule3Title: "3. වක්‍රතා කේන්ද්‍ර (C) නීතිය",
    rule3Desc:
      "වක්‍රතා කේන්ද්‍රය (C) හරහා ගමන් කරන කිරණයක් දර්පණය මත ලම්බකව (90°) පතිත වී එම මාර්ගයේම ආපසු පරාවර්තනය වේ.",
    rule4Title: "4. ධ්‍රැව (P) නීතිය",
    rule4Desc:
      "දර්පණ ධ්‍රැවය (P) මත පතිත වන කිරණයක් පතන කෝණය = පරාවර්තන කෝණය (i = r) වන පරිදි සමමිතිකව පරාවර්තනය වේ.",
    educatorHeading:
      "මේනකා ජයවර්ධන ගුරුතුමියගේ විශේෂ සටහන (ජ්‍යෙෂ්ඨ විද්‍යා ආචාරිනී):",
    educatorQuote:
      '"පාඩම 4 ප්‍රශ්නාවලියට පෙර ඔබේ සෙන්ටිමීටර 30 රූල, තියුණු HB පැන්සල සහ කවකටුව සූදානම් කර ගන්න. නිවැරදි කිරණ සටහන් මඟින් අ.පො.ස. සාමාන්‍ය පෙළ විභාගයේ ලකුණු උපරිම කරගත හැක!"',
    playlistTitle: "පාඨමාලා අන්තර්ගතය",
    playlistProgress: "25% සම්පූර්ණයි",
    playlistRemaining: "පාඩම් 12න් 3ක් අවසන් • තවත් 9ක් ඉතිරිව ඇත",
    playlistTabLessons: "පාඩම් (12)",
    playlistTabNotes: "සටහන් (8)",
    playlistTabQuizzes: "ප්‍රශ්නාවලි (3)",
    partAHeading: "කොටස A • ආලෝක මූලධර්ම සහ තල දර්පණ",
    partAStatus: "2 / 2 අවසන්",
    partBHeading: "කොටස B • වක්‍ර දර්පණ සහ ප්‍රතිබිම්බ",
    partBStatus: "1 ක් ක්‍රියාත්මකයි",
    partCHeading: "කොටස C • ආලෝක වර්තනය සහ උපකරණ",
    partCStatus: "අගුළු දමා ඇත",
    nowPlaying: "දැන් වාදනය වේ",
    curriculumBadge:
      "ශ්‍රී ලංකා ජාතික විෂය මාලාව • ජාතික අධ්‍යාපන ආයතනය (NIE) අනුමතයි",
    videoAudioMeta: "HD 720p • සිංහල සහ ඉංග්‍රීසි හඬ",
    ccOn: "උපසිරැසි: සක්‍රියයි",
    speed: "1.0x",
    quality: "720p HD",
    downloadSuccess: "බාගත වෙමින් පවතී: Lesson_3_Ray_Optics_Notes.pdf",
    savedToBookmarks: "පාඩම සුරැකි ලැයිස්තුවට එක් කරන ලදී",
  },
  ta: {
    topContext: "இலங்கை தேசிய கல்விப் பாடத்திட்டம் • தரம் 6-11",
    termBadge: "தரம் 8 விஞ்ஞானம் • தவணை 2",
    breadcrumbBack: "பாடநெறிக்கு திரும்பு",
    breadcrumbSubject: "விஞ்ஞானம் (தரம் 6-11)",
    breadcrumbTopic: "ஒளி, பிரதிபலிப்பு மற்றும் கோள ஆடிகள்",
    breadcrumbUnit: "அலகு 1: அடிப்படைகள்",
    unitSubtitle: "அலகு 1: ஒளியின் அடிப்படைகள் மற்றும் பிரதிபலிப்பு",
    lessonPill: "பாடம் 3 / 12",
    lessonTitle: "கோள ஆடிகள் மற்றும் கதிர் படங்கள் வரைதல்",
    lessonSubtitle: "Spherical Mirrors & Ray Construction",
    markAsDone: "முடிந்தது என குறிக்க",
    markedDone: "முடிந்தது ✓",
    notePdf: "குறிப்பு (PDF)",
    helpAria: "உதவி மற்றும் வழிகாட்டுதல்கள்",
    tabOverview: "கண்ணோட்டம் & சுருக்கம்",
    tabNotes: "பாடக் குறிப்புகள்",
    tabDiscussion: "கலந்துரையாடல் (4)",
    tabDownloads: "பதிவிறக்கங்கள் (3)",
    mobileTabLessons: "பாடங்கள்",
    mobileTabNotes: "குறிப்புகள்",
    mobileTabFiles: "கோப்புகள் (3)",
    ruleCardTitle: "முக்கிய விதி: குவியத் தூரம் மற்றும் வளைவு ஆரை",
    ruleCardBody:
      "முதன்மை குவியம் (F) ஆடியின் முனை (P) மற்றும் வளைவு மையம் (C) ஆகியவற்றுக்கு நடுவில் அமைந்துள்ளது. எனவே அனைத்து கோள ஆடிகளுக்கும்:",
    formulaBox: "f = R / 2  (குவியத் தூரம் வளைவு ஆரையின் பாதியாகும்)",
    essentialRulesHeading:
      "குழிவு ஆடிகளுக்கான 4 அத்தியாவசிய கதிர் வரைபட விதிகள்",
    rule1Title: "1. சமாந்தர கதிர் விதி",
    rule1Desc:
      "முதன்மை அச்சுக்கு சமாந்தரமாக வரும் எந்தவொரு படுகதிரும் பிரதிபலிப்பின் பின் முதன்மை குவியம் (F) ஊடாக செல்லும்.",
    rule2Title: "2. குவியக் கதிர் விதி",
    rule2Desc:
      "முதன்மை குவியம் (F) ஊடாக செல்லும் கதிர் பிரதிபலிப்பின் பின் முதன்மை அச்சுக்கு சமாந்தரமாக செல்லும்.",
    rule3Title: "3. வளைவு மையம் (C) விதி",
    rule3Desc:
      "வளைவு மையம் (C) ஊடாக செல்லும் கதிர் செங்குத்தாக பட்டு அதே பாதையில் மீண்டும் பிரதிபலிக்கும்.",
    rule4Title: "4. முனை (P) விதி",
    rule4Desc:
      "ஆடியின் முனை (P) இல் படும் கதிர் படுகோணம் = பிரதிபலிப்புக் கோணம் (i = r) என்றவாறு சமச்சீராக பிரதிபலிக்கும்.",
    educatorHeading:
      "ஆசிரியை மேனகா ஜயவர்தன அவர்களின் விசேட குறிப்பு (சிரேஷ்ட விஞ்ஞான விரிவுரையாளர்):",
    educatorQuote:
      '"பாடம் 4 வினாடி வினாவைத் தொடங்குவதற்கு முன் உங்களின் 30cm அளவுகோல் மற்றும் கூரிய HB பென்சிலை தயார் நிலையில் வைத்திருங்கள்."',
    playlistTitle: "பாடநெறி பட்டியல்",
    playlistProgress: "25% நிறைவடைந்தது",
    playlistRemaining: "12 பாடங்களில் 3 முடிந்தது • 9 மீதமுள்ளது",
    playlistTabLessons: "பாடங்கள் (12)",
    playlistTabNotes: "குறிப்புகள் (8)",
    playlistTabQuizzes: "வினாடி வினா (3)",
    partAHeading: "பகுதி A • ஒளி அடிப்படைகள் & சமதள ஆடிகள்",
    partAStatus: "2 / 2 முடிந்தது",
    partBHeading: "பகுதி B • வளைந்த ஆடிகள் மற்றும் பிம்பங்கள்",
    partBStatus: "1 செயலில் உள்ளது",
    partCHeading: "பகுதி C • ஒளிமுறிவு & ஒளியியல் கருவிகள்",
    partCStatus: "பூட்டப்பட்டுள்ளது",
    nowPlaying: "தற்போது ஓடுகிறது",
    curriculumBadge: "இலங்கை தேசிய பாடத்திட்டம் • NIE அங்கீகரிக்கப்பட்டது",
    videoAudioMeta: "HD 720p • சிங்களம் மற்றும் ஆங்கில ஆடியோ",
    ccOn: "வசனம்: இயக்கத்தில் உள்ளது",
    speed: "1.0x",
    quality: "720p HD",
    downloadSuccess: "பதிவிறக்கம்: Lesson_3_Ray_Optics_Notes.pdf",
    savedToBookmarks: "பாடம் சேமிக்கப்பட்டது",
  },
};
