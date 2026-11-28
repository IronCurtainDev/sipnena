export interface CreateAccountStrings {
  brandSubtitle: string;
  topBadge: string;
  backBtn: string;
  stepLabel: string;
  gradePill: string;
  leftTitle: string;
  leftDesc: string;
  leftDescSinhala: string;
  feat_safe_title: string;
  feat_safe_desc: string;
  feat_syllabus_title: string;
  feat_syllabus_desc: string;
  feat_preview_title: string;
  feat_preview_desc: string;
  trustFooter: string;
  formTitle: string;
  formSubtitle: string;
  googleBtn: string;
  dividerText: string;
  firstNameLabel: string;
  firstNameHint: string;
  firstNamePlaceholder: string;
  gradeLabel: string;
  olBadge: string;
  gradeItem: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailErrorMsg: string;
  passwordLabel: string;
  passwordHint: string;
  passwordPlaceholder: string;
  showPasswordAria: string;
  hidePasswordAria: string;
  parentCalloutDesktop: string;
  parentCalloutMobile: string;
  submitBtn: string;
  alreadyHaveDesktop: string;
  logInLink: string;
  alreadyHaveMobile: string;
  pageBottomFooter: string;
  langSwitcherAria: string;
  gradeGroupAria: string;
  firstNameRequiredErr: string;
  passwordShortErr: string;
  signupComingNextMsg: string;
  accountCreatedMsg: string;
  googleStatusMsg: string;
  backStatusMsg: string;
  loginStatusMsg: string;
  emptyTitle: string;
  emptyDesc: string;
  errorTitle: string;
  errorDesc: string;
  retryBtn: string;
}

export const CREATE_ACCOUNT_CONFIG = {
  brandName: "SipNena",
  grades: [6, 7, 8, 9, 10, 11] as const,
  defaultGrade: 9,
  features: [
    { id: "safe" as const },
    { id: "syllabus" as const },
    { id: "preview" as const },
  ],
  languages: [
    { code: "si", label: "සිංහල", badge: "සි" },
    { code: "ta", label: "தமிழ்", badge: "த" },
    { code: "en", label: "English", badge: "En" },
  ],
};

export const CREATE_ACCOUNT_STRINGS: Record<
  "en" | "si" | "ta",
  CreateAccountStrings
> = {
  en: {
    brandSubtitle: "School Learning App",
    topBadge: "Sri Lankan School Syllabus • Grades 6–11",
    backBtn: "Back",
    stepLabel: "Step 2 of 2",
    gradePill: "Grades 6 – 11 • ශ්‍රේණි 6-11",
    leftTitle: "Join SipNena",
    leftDesc: "Easy short notes, past papers, and lessons for Grades 6 to 11.",
    leftDescSinhala: "",
    feat_safe_title: "Safe for children",
    feat_safe_desc: "No ads or pop-ups — just lessons.",
    feat_syllabus_title: "Matches school lessons",
    feat_syllabus_desc: "Clear lessons in Sinhala, Tamil, and English.",
    feat_preview_title: "Try lessons first",
    feat_preview_desc: "Look at Maths, Science, History, and more for free.",
    trustFooter: "Made for Sri Lankan students and parents",
    formTitle: "Create your account",
    formSubtitle: "Enter a few details to start studying.",
    googleBtn: "Continue with Google",
    dividerText: "or sign up with email",
    firstNameLabel: "First name",
    firstNameHint: "(your first name or call name)",
    firstNamePlaceholder: "e.g. Kasun or Nimali",
    gradeLabel: "Select your Grade",
    olBadge: "Grades 10–11",
    gradeItem: "Grade",
    emailLabel: "Email address",
    emailPlaceholder: "e.g. parent.name@gmail.com",
    emailErrorMsg:
      "Please enter a valid email to keep your notes and lessons safe.",
    passwordLabel: "Password",
    passwordHint: "At least 8 characters",
    passwordPlaceholder: "Create a password (min 8 characters)",
    showPasswordAria: "Show password",
    hidePasswordAria: "Hide password",
    parentCalloutDesktop:
      "Student doesn't have an email? Parents can enter their email address. You can update it anytime in Settings.",
    parentCalloutMobile: "No email? Parents can enter their email address.",
    submitBtn: "Continue",
    alreadyHaveDesktop: "Already have an account?",
    logInLink: "Log in here",
    alreadyHaveMobile: "I already have an account",
    pageBottomFooter:
      "Made for Sri Lankan school students (Grades 6–11) • Simple & Safe Learning",
    langSwitcherAria: "Change language",
    gradeGroupAria: "Select your school grade",
    firstNameRequiredErr: "Please type your first name to continue.",
    passwordShortErr: "Please use at least 8 characters for your password.",
    signupComingNextMsg:
      "Account signup connects next. For now, open Log in if you already have an account, or use the Sign up page.",
    accountCreatedMsg: "Account created. You can enroll in courses now.",
    googleStatusMsg: "Google sign-in will connect in a later update.",
    backStatusMsg: "Going back to language selection.",
    loginStatusMsg: "Opening student sign-in...",
    emptyTitle: "Sign-up is temporarily unavailable",
    emptyDesc: "Please check back soon while we update the system.",
    errorTitle: "Couldn't load sign-up page",
    errorDesc: "Please check your internet connection and try again.",
    retryBtn: "Try again",
  },
  si: {
    brandSubtitle: "පාසල් ඉගෙනුම් ඇප් එක",
    topBadge: "රජයේ පාසල් විෂය නිර්දේශය • 6–11 ශ්‍රේණි",
    backBtn: "ආපසු",
    stepLabel: "පියවර 2 / 2",
    gradePill: "6 – 11 ශ්‍රේණි • Grades 6–11",
    leftTitle: "SipNena සමඟ එකතු වෙමු",
    leftDesc:
      "6 සිට 11 ශ්‍රේණි දක්වා පාඩම්, කෙටි සටහන් සහ විභාග ප්‍රශ්න පත්‍ර පහසුවෙන්ම ඉගෙන ගන්න.",
    leftDescSinhala: "පාඩම්, සටහන් සහ අභ්‍යාස නිදහසේ ඉගෙන ගන්න.",
    feat_safe_title: "දරුවන්ට 100% ආරක්ෂිතයි",
    feat_safe_desc: "වෙළඳ දැන්වීම් හෝ අනවශ්‍ය බාධා කිසිවක් නැත.",
    feat_syllabus_title: "පාසල් විෂය නිර්දේශයටම ගැලපේ",
    feat_syllabus_desc:
      "සිංහල, දෙමළ සහ ඉංග්‍රීසි මාධ්‍ය තුනෙන්ම පැහැදිලි පාඩම්.",
    feat_preview_title: "නොමිලේ පාඩම් කිහිපයක් බලන්න පුළුවන්",
    feat_preview_desc:
      "ගණිතය, විද්‍යාව, ඉතිහාසය ඇතුළු විෂයයන් රැසක් නොමිලේ බලන්න.",
    trustFooter:
      "ලංකාව පුරා දෙමාපියන්ගේ සහ ගුරුවරුන්ගේ විශ්වාසය දිනූ අධ්‍යාපන සේවාවකි",
    formTitle: "ගිණුමක් හදමු",
    formSubtitle: "පාඩම් කරන්න අදම ලියාපදිංචි වෙන්න.",
    googleBtn: "Google ගිණුමෙන් ඉදිරියට යන්න",
    dividerText: "නැතහොත් විස්තර පුරවන්න",
    firstNameLabel: "මුල් නම (නම)",
    firstNameHint: "(ඔබට කතා කරන නම ලියන්න)",
    firstNamePlaceholder: "උදා: කසුන් හෝ නිමාලි",
    gradeLabel: "ඔබේ ශ්‍රේණිය තෝරන්න",
    olBadge: "සාමාන්‍ය පෙළ (10–11 ශ්‍රේණි)",
    gradeItem: "ශ්‍රේණිය",
    emailLabel: "ඊමේල් ලිපිනය (Email)",
    emailPlaceholder: "උදා: parent.name@gmail.com",
    emailErrorMsg:
      "ඔබේ පාඩම් සටහන් සුරැකීමට නිවැරදි ඊමේල් ලිපිනයක් ඇතුළත් කරන්න.",
    passwordLabel: "මුරපදයක් (Password)",
    passwordHint: "අවම වශයෙන් අකුරු 8ක්",
    passwordPlaceholder: "මුරපදයක් ඇතුළත් කරන්න (අකුරු 8ක්)",
    showPasswordAria: "මුරපදය පෙන්වන්න",
    hidePasswordAria: "මුරපදය සඟවන්න",
    parentCalloutDesktop:
      "දරුවාට ඊමේල් එකක් නැද්ද? දෙමාපියන්ගේ ඊමේල් ලිපිනය යොදන්න පුළුවන්. ඕනෑම වෙලාවක Settings වලින් වෙනස් කරන්නත් පුළුවන්.",
    parentCalloutMobile:
      "ඊමේල් නැද්ද? දෙමාපියන්ගේ ඊමේල් ලිපිනය යොදන්න පුළුවන්.",
    submitBtn: "ඉදිරියට යන්න",
    alreadyHaveDesktop: "දැනටමත් ගිණුමක් තිබේද?",
    logInLink: "මෙතැනින් ඇතුල් වන්න",
    alreadyHaveMobile: "දැනටමත් මට ගිණුමක් තිබේ",
    pageBottomFooter:
      "ශ්‍රී ලාංකික පාසල් සිසුන් වෙනුවෙන්ම සැකසූ සරල අධ්‍යාපනික අත්දැකීමක් (6–11 ශ්‍රේණි)",
    langSwitcherAria: "භාෂාව මාරු කරන්න",
    gradeGroupAria: "ඔබේ පාසල් ශ්‍රේණිය තෝරන්න",
    firstNameRequiredErr: "ඉදිරියට යාමට කරුණාකර ඔබේ නම ලියන්න.",
    passwordShortErr: "මුරපදය සඳහා අවම වශයෙන් අකුරු 8ක්වත් ඇතුළත් කරන්න.",
    signupComingNextMsg:
      "ගිණුම සෑදීම ඉදිරියේදී සම්බන්ධ වේ. දැනට ගිණුමක් තිබේ නම් ඇතුළු වන්න, නැත්නම් Sign up පිටුව භාවිතා කරන්න.",
    accountCreatedMsg: "ගිණුම සාදන ලදී. දැන් පාඨමාලාවලට එකතු විය හැක.",
    googleStatusMsg: "Google ඇතුළු වීම ඉදිරියේදී සම්බන්ධ වේ.",
    backStatusMsg: "භාෂාව තෝරාගැනීමේ පිටුවට ආපසු යොමු විය.",
    loginStatusMsg: "ගිණුමට ඇතුල් වීමේ පිටුව විවෘත වේ...",
    emptyTitle: "නව ගිණුම් සෑදීම තාවකාලිකව නවතා ඇත",
    emptyDesc:
      "නව වාරයේ පාඩම් යාවත්කාලීන වන තෙක් මද වේලාවකින් නැවත උත්සාහ කරන්න.",
    errorTitle: "මෙම පිටුව පෙන්වීමට නොහැකි වුණා",
    errorDesc: "ඔබේ අන්තර්ජාල සම්බන්ධතාව පරීක්ෂා කර නැවත උත්සාහ කරන්න.",
    retryBtn: "නැවත උත්සාහ කරන්න",
  },
  ta: {
    brandSubtitle: "பாடசாலை கற்றல் தளம்",
    topBadge: "அரச பாடத்திட்டம் • தரம் 6–11",
    backBtn: "பின்செல்ல",
    stepLabel: "படி 2 / 2",
    gradePill: "தரம் 6–11 • Grades 6–11",
    leftTitle: "SipNena உடன் இணைவோம்",
    leftDesc:
      "தரம் 6–11 சுருக்கக் குறிப்புகள், வினாத்தாள்கள் மற்றும் எளிய பாடங்கள்.",
    leftDescSinhala: "",
    feat_safe_title: "மாணவர்களுக்கு பாதுகாப்பானது",
    feat_safe_desc: "விளம்பரங்கள் இல்லை — பாடங்கள் மட்டும்.",
    feat_syllabus_title: "பாடசாலைப் பாடங்களுக்கு ஏற்ப",
    feat_syllabus_desc: "தமிழ், சிங்களம் & ஆங்கிலத்தில் எளிய விளக்கங்கள்.",
    feat_preview_title: "முதலில் பார்த்துப் படிக்கலாம்",
    feat_preview_desc:
      "கணிதம், விஞ்ஞானம் உள்ளிட்ட பாடங்களை இலவசமாகப் பார்க்கலாம்.",
    trustFooter: "இலங்கை மாணவர்கள் மற்றும் பெற்றோருக்கானது",
    formTitle: "கணக்கை உருவாக்குவோம்",
    formSubtitle: "படிக்கத் தொடங்க விவரங்களை உள்ளிடுக.",
    googleBtn: "Google மூலம் தொடரவும்",
    dividerText: "அல்லது மின்னஞ்சல் மூலம் சேருங்கள்",
    firstNameLabel: "முதல் பெயர்",
    firstNameHint: "(அழைக்கும் பெயர்)",
    firstNamePlaceholder: "உ-ம்: கவின் அல்லது நிலானி",
    gradeLabel: "உங்கள் தரம்",
    olBadge: "தரம் 10–11",
    gradeItem: "தரம்",
    emailLabel: "மின்னஞ்சல் (Email)",
    emailPlaceholder: "உ-ம்: parent@gmail.com",
    emailErrorMsg: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடுக.",
    passwordLabel: "கடவுச்சொல் (Password)",
    passwordHint: "குறைந்தது 8 எழுத்துக்கள்",
    passwordPlaceholder: "குறைந்தது 8 எழுத்துக்கள்",
    showPasswordAria: "கடவுச்சொல்லைக் காட்டு",
    hidePasswordAria: "கடவுச்சொல்லை மறை",
    parentCalloutDesktop:
      "மின்னஞ்சல் இல்லையா? பெற்றோரின் Email முகவரியைப் பயன்படுத்தலாம். இதை Settings இல் எப்போது வேண்டுமானாலும் மாற்றலாம்.",
    parentCalloutMobile:
      "மின்னஞ்சல் இல்லையா? பெற்றோரின் Email ஐப் பயன்படுத்தலாம்.",
    submitBtn: "தொடரவும்",
    alreadyHaveDesktop: "ஏற்கனவே கணக்கு உள்ளதா?",
    logInLink: "உள்நுழைக",
    alreadyHaveMobile: "ஏற்கனவே கணக்கு உள்ளது",
    pageBottomFooter:
      "இலங்கை பாடசாலை மாணவர்களுக்கானது (தரம் 6–11) • எளிய & பாதுகாப்பான கற்றல்",
    langSwitcherAria: "மொழியை மாற்றுக",
    gradeGroupAria: "உங்கள் தரத்தைத் தெரிவுசெய்க",
    firstNameRequiredErr: "தொடர உங்கள் பெயரை உள்ளிடுக.",
    passwordShortErr: "கடவுச்சொல்லுக்கு குறைந்தது 8 எழுத்துக்கள் தேவை.",
    signupComingNextMsg:
      "கணக்கு உருவாக்கம் அடுத்ததாக இணைக்கப்படும். இப்போது கணக்கு இருந்தால் உள்நுழையவும், இல்லையெனில் Sign up பக்கத்தைப் பயன்படுத்தவும்.",
    accountCreatedMsg: "கணக்கு உருவாக்கப்பட்டது. இப்போது பாடநெறிகளில் சேரலாம்.",
    googleStatusMsg: "Google உள்நுழைவு பின்னர் இணைக்கப்படும்.",
    backStatusMsg: "மொழித் தெரிவுக்குத் திரும்பியது.",
    loginStatusMsg: "உள்நுழைவுப் பக்கம் திறக்கப்படுகிறது...",
    emptyTitle: "கணக்கு உருவாக்கம் தற்காலிகமாக நிறுத்தப்பட்டுள்ளது",
    emptyDesc: "சிறிது நேரத்தில் மீண்டும் பார்க்கவும்.",
    errorTitle: "பக்கத்தைத் திறக்க முடியவில்லை",
    errorDesc: "இணைய இணைப்பைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
    retryBtn: "மீண்டும் முயற்சிக்குக",
  },
};
