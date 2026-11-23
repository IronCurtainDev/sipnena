export interface LoginStrings {
  brandSubtitle: string;
  topBadge: string;
  backBtn: string;
  leftTitle: string;
  leftSubline: string;
  ben_resume_title: string;
  ben_resume_desc: string;
  ben_safe_title: string;
  ben_safe_desc: string;
  ben_sync_title: string;
  ben_sync_desc: string;
  trustFooter: string;
  formTitle: string;
  formSubtitle: string;
  googleBtn: string;
  dividerText: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  forgotPasswordBtn: string;
  showPasswordAria: string;
  hidePasswordAria: string;
  safetyBannerText: string;
  submitBtn: string;
  noAccountPrompt: string;
  createAccountLink: string;
  pageBottomFooter: string;
  langSwitcherAria: string;
  emailInvalidErr: string;
  passwordEmptyErr: string;
  loginSuccessMsg: string;
  googleStatusMsg: string;
}

export const LOGIN_STRINGS: Record<"en" | "si" | "ta", LoginStrings> = {
  en: {
    brandSubtitle: "School Learning App",
    topBadge: "Sri Lankan School Syllabus • Grades 6–11",
    backBtn: "Back",
    leftTitle: "Welcome back to SipNena",
    leftSubline: "Let's continue your studies right where you paused",
    ben_resume_title: "Pick up where you left off",
    ben_resume_desc:
      "All your short notes, quiz marks, and saved lessons are safe.",
    ben_safe_title: "100% child-safe learning",
    ben_safe_desc: "Zero advertisements, no pop-ups, safe study space.",
    ben_sync_title: "Use on phone or computer",
    ben_sync_desc: "Learn seamlessly on mobile or computer anytime.",
    trustFooter: "Trusted by parents and teachers across Sri Lanka",
    formTitle: "Student Log in",
    formSubtitle: "Enter your email and password to open your lessons.",
    googleBtn: "Continue with Google",
    dividerText: "or log in with email",
    emailLabel: "Email address",
    emailPlaceholder: "e.g. parent or student email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPasswordBtn: "Forgot password?",
    showPasswordAria: "Show password",
    hidePasswordAria: "Hide password",
    safetyBannerText: "Your study notes, progress, and marks are safely saved.",
    submitBtn: "Log in & continue",
    noAccountPrompt: "Don't have an account?",
    createAccountLink: "Create an account",
    pageBottomFooter:
      "Made for Sri Lankan school students (Grades 6–11) • Simple & Safe Learning",
    langSwitcherAria: "Change language",
    emailInvalidErr: "Please enter a valid email address.",
    passwordEmptyErr: "Please enter your password.",
    loginSuccessMsg: "Welcome back! Opening your lessons...",
    googleStatusMsg: "Opening Google sign-in...",
  },
  si: {
    brandSubtitle: "පාසල් ඉගෙනුම් ඇප් එක",
    topBadge: "රජයේ පාසල් විෂය නිර්දේශය • 6–11 ශ්‍රේණි",
    backBtn: "ආපසු",
    leftTitle: "නැවතත් සාදරයෙන් පිළිගනිමු",
    leftSubline: "නැවැත්තුව තැන ඉඳන්ම පාඩම් ටික කරගෙන යමු",
    ben_resume_title: "නැවැත්තුව තැන ඉඳන්ම පටන් ගන්න",
    ben_resume_desc:
      "ඔබේ කෙටි සටහන්, පසුගිය ලකුණු සහ සුරැකි පාඩම් සියල්ල සුරක්ෂිතයි.",
    ben_safe_title: "දරුවන්ට 100% ආරක්ෂිත පරිසරයක්",
    ben_safe_desc: "වෙළඳ දැන්වීම් නැති, පාඩමට පමණක් අවධානය දෙන තැනක්.",
    ben_sync_title: "දුරකථනයෙන් හා පරිගණකයෙන්ම",
    ben_sync_desc: "කැමති වෙලාවක ෆෝන් එකෙන් හරි කොම්පියුටරෙන් හරි බලන්න.",
    trustFooter: "ශ්‍රී ලංකාව පුරා දෙමාපියන් සහ ගුරුවරුන්ගේ විශ්වාසය",
    formTitle: "ගිණුමට ඇතුළු වෙන්න",
    formSubtitle: "පාඩම් දිගටම කරගෙන යන්න ඔබේ විස්තර ඇතුළත් කරන්න.",
    googleBtn: "Google ගිණුමෙන් ඇතුළු වෙන්න",
    dividerText: "නැත්නම් ඊමේල් ලිපිනයෙන් ඇතුළු වෙන්න",
    emailLabel: "ඊමේල් ලිපිනය (Email)",
    emailPlaceholder: "උදා: දරුවාගේ හෝ දෙමාපියන්ගේ ඊමේල් ලිපිනය",
    passwordLabel: "මුරපදය (Password)",
    passwordPlaceholder: "ඔබේ මුරපදය ලියන්න",
    forgotPasswordBtn: "මුරපදය අමතකද?",
    showPasswordAria: "මුරපදය පෙන්වන්න",
    hidePasswordAria: "මුරපදය සඟවන්න",
    safetyBannerText: "ඔබේ කෙටි සටහන් සහ පාඩම් ප්‍රගතිය සුරැකිව තබා ඇත.",
    submitBtn: "ඇතුළු වෙන්න",
    noAccountPrompt: "තවම ගිණුමක් හැදුවේ නැද්ද?",
    createAccountLink: "අලුත් ගිණුමක් හදන්න",
    pageBottomFooter:
      "ශ්‍රී ලාංකික පාසල් සිසුන් සඳහා (6–11 ශ්‍රේණි) • සරල සහ ආරක්ෂිත ඉගෙනුම",
    langSwitcherAria: "භාෂාව මාරු කරන්න",
    emailInvalidErr: "කරුණාකර නිවැරදි ඊමේල් ලිපිනයක් ඇතුළත් කරන්න.",
    passwordEmptyErr: "කරුණාකර ඔබේ මුරපදය ලියන්න.",
    loginSuccessMsg: "සාදරයෙන් පිළිගනිමු! ඔබේ පාඩම් විවෘත වෙමින්...",
    googleStatusMsg: "Google ගිණුම සමඟ සම්බන්ධ වෙමින්...",
  },
  ta: {
    brandSubtitle: "பாடசாலை கற்றல் தளம்",
    topBadge: "அரச பாடத்திட்டம் • தரம் 6–11",
    backBtn: "பின்செல்ல",
    leftTitle: "மீண்டும் நல்வரவு",
    leftSubline: "நிறுத்திய இடத்திலிருந்தே பாடங்களைத் தொடங்குவோம்",
    ben_resume_title: "நிறுத்திய இடத்திலிருந்தே தொடரலாம்",
    ben_resume_desc:
      "உங்கள் குறிப்புகள், மதிப்பெண்கள் அனைத்தும் பாதுகாக்கப்பட்டுள்ளன.",
    ben_safe_title: "மாணவர்களுக்கு 100% பாதுகாப்பானது",
    ben_safe_desc: "விளம்பரங்கள் இல்லை, அமைதியாகப் படிக்கலாம்.",
    ben_sync_title: "போன் அல்லது கணினியில் கற்கலாம்",
    ben_sync_desc: "விரும்பிய நேரத்தில் மொபைல் அல்லது கணினியில் படிக்கலாம்.",
    trustFooter: "பெற்றோர் மற்றும் ஆசிரியர்களின் நம்பிக்கையைப் பெற்றது",
    formTitle: "உள்நுழைக",
    formSubtitle: "படிப்பைத் தொடர உங்கள் விவரங்களை உள்ளிடுக.",
    googleBtn: "Google மூலம் தொடரவும்",
    dividerText: "அல்லது Email மூலம் உள்நுழைக",
    emailLabel: "மின்னஞ்சல் (Email)",
    emailPlaceholder: "உ-ம்: பெற்றோர் அல்லது மாணவரின் Email",
    passwordLabel: "கடவுச்சொல் (Password)",
    passwordPlaceholder: "கடவுச்சொல்லை உள்ளிடுக",
    forgotPasswordBtn: "கடவுச்சொல் மறந்துவிட்டதா?",
    showPasswordAria: "கடவுச்சொல்லைக் காட்டு",
    hidePasswordAria: "கடவுச்சொல்லை மறை",
    safetyBannerText:
      "உங்கள் படிப்புக் குறிப்புகள் மற்றும் முன்னேற்றம் பாதுகாப்பாக உள்ளன.",
    submitBtn: "உள்நுழைக",
    noAccountPrompt: "இன்னும் கணக்கு இல்லையா?",
    createAccountLink: "கணக்கை உருவாக்குக",
    pageBottomFooter:
      "இலங்கை பாடசாலை மாணவர்களுக்கானது (தரம் 6–11) • எளிய & பாதுகாப்பான கற்றல்",
    langSwitcherAria: "மொழியை மாற்றுக",
    emailInvalidErr: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடுக.",
    passwordEmptyErr: "உங்கள் கடவுச்சொல்லை உள்ளிடுக.",
    loginSuccessMsg: "நல்வரவு! பாடங்கள் திறக்கப்படுகின்றன...",
    googleStatusMsg: "Google கணக்குடன் இணைகிறது...",
  },
};
