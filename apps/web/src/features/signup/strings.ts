import type { AppLanguage } from "@/lib/language";

export interface SignupStrings {
  brandSubtitle: string;
  topBadge: string;
  backBtn: string;
  leftTitle: string;
  leftSubline: string;
  ben_curriculum_title: string;
  ben_curriculum_desc: string;
  ben_safe_title: string;
  ben_safe_desc: string;
  ben_progress_title: string;
  ben_progress_desc: string;
  trustFooter: string;
  formTitle: string;
  formSubtitle: string;
  googleBtn: string;
  dividerText: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  passwordHint: string;
  showPasswordAria: string;
  hidePasswordAria: string;
  submitBtn: string;
  pendingBtn: string;
  alreadyAccountPrompt: string;
  signInLink: string;
  pageBottomFooter: string;
  langSwitcherAria: string;
  nameRequiredErr: string;
  emailInvalidErr: string;
  passwordShortErr: string;
  signupUnavailableErr: string;
  googleStatusMsg: string;
}

export const SIGNUP_STRINGS: Record<AppLanguage, SignupStrings> = {
  en: {
    brandSubtitle: "School Learning App",
    topBadge: "Sri Lankan School Syllabus • Grades 6–11",
    backBtn: "Back",
    leftTitle: "Create your SipNena account",
    leftSubline: "Join Sri Lanka's Grade 6–11 O/L learning space",
    ben_curriculum_title: "Full NIE school syllabus",
    ben_curriculum_desc:
      "Video lessons, short notes, past papers, and unit quizzes for Grades 6–11.",
    ben_safe_title: "Safe & calm study space",
    ben_safe_desc:
      "No ads, no distractions, built for Sri Lankan students and parents.",
    ben_progress_title: "Track progress everywhere",
    ben_progress_desc:
      "Save bookmarks, quiz marks, and revision notes across your devices.",
    trustFooter: "Trusted by students, parents, and teachers across Sri Lanka",
    formTitle: "Create your account",
    formSubtitle: "Register with your email to save your lessons and progress.",
    googleBtn: "Continue with Google",
    dividerText: "or register with email",
    nameLabel: "Name",
    namePlaceholder: "Kasun Perera",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "At least 8 characters",
    passwordHint: "Use at least 8 characters",
    showPasswordAria: "Show password",
    hidePasswordAria: "Hide password",
    submitBtn: "Create account",
    pendingBtn: "Please wait…",
    alreadyAccountPrompt: "Already have an account?",
    signInLink: "Sign in",
    pageBottomFooter:
      "Made for Sri Lankan school students (Grades 6–11) • Simple & Safe Learning",
    langSwitcherAria: "Change language",
    nameRequiredErr: "Please enter your name.",
    emailInvalidErr: "Please enter a valid email address.",
    passwordShortErr: "Password must be at least 8 characters.",
    signupUnavailableErr:
      "Sign-up is temporarily unavailable. Please try again later.",
    googleStatusMsg: "Opening Google sign-in...",
  },
  si: {
    brandSubtitle: "පාසල් ඉගෙනුම් ඇප් එක",
    topBadge: "රජයේ පාසල් විෂය නිර්දේශය • 6–11 ශ්‍රේණි",
    backBtn: "ආපසු",
    leftTitle: "ඔබේ සිප්නැණ ගිණුම සාදන්න",
    leftSubline: "6–11 ශ්‍රේණි සා/පෙළ පාසල් ඉගෙනුම් අවකාශයට එක්වන්න",
    ben_curriculum_title: "සම්පූර්ණ NIE විෂය නිර්දේශය",
    ben_curriculum_desc:
      "6–11 ශ්‍රේණි සඳහා වීඩියෝ පාඩම්, කෙටි සටහන්, පසුගිය ප්‍රශ්න පත්‍ර සහ ප්‍රශ්නාවලි.",
    ben_safe_title: "දරුවන්ට ආරක්ෂිත පරිසරයක්",
    ben_safe_desc:
      "වෙළඳ දැන්වීම් නැති, ශ්‍රී ලාංකික සිසුන් සහ දෙමාපියන් වෙනුවෙන්ම සැකසූ අවකාශය.",
    ben_progress_title: "සෑම උපාංගයකින්ම ප්‍රගතිය",
    ben_progress_desc:
      "සුරැකි පාඩම්, ප්‍රශ්නාවලි ලකුණු සහ කෙටි සටහන් සුරක්ෂිතව තබාගන්න.",
    trustFooter: "ශ්‍රී ලංකාව පුරා සිසුන්, දෙමාපියන් සහ ගුරුවරුන්ගේ විශ්වාසය",
    formTitle: "ඔබේ ගිණුම සාදන්න",
    formSubtitle:
      "පාඩම් සහ ප්‍රගතිය සුරැකීමට ඔබේ ඊමේල් ලිපිනයෙන් ලියාපදිංචි වන්න.",
    googleBtn: "Google ගිණුමෙන් ඉදිරියට යන්න",
    dividerText: "නැත්නම් ඊමේල් ලිපිනයෙන් ලියාපදිංචි වන්න",
    nameLabel: "නම",
    namePlaceholder: "කසුන් පෙරේරා",
    emailLabel: "ඊමේල් ලිපිනය",
    emailPlaceholder: "you@example.com",
    passwordLabel: "මුරපදය",
    passwordPlaceholder: "අවම වශයෙන් අකුරු 8ක්",
    passwordHint: "අවම වශයෙන් අකුරු 8ක් භාවිතා කරන්න",
    showPasswordAria: "මුරපදය පෙන්වන්න",
    hidePasswordAria: "මුරපදය සඟවන්න",
    submitBtn: "ගිණුම සාදන්න",
    pendingBtn: "කරුණාකර රැඳී සිටින්න…",
    alreadyAccountPrompt: "දැනටමත් ගිණුමක් තිබේද?",
    signInLink: "ඇතුළු වන්න",
    pageBottomFooter:
      "ශ්‍රී ලාංකික පාසල් සිසුන් සඳහා (6–11 ශ්‍රේණි) • සරල සහ ආරක්ෂිත ඉගෙනුම",
    langSwitcherAria: "භාෂාව මාරු කරන්න",
    nameRequiredErr: "කරුණාකර ඔබේ නම ඇතුළත් කරන්න.",
    emailInvalidErr: "කරුණාකර නිවැරදි ඊමේල් ලිපිනයක් ඇතුළත් කරන්න.",
    passwordShortErr: "මුරපදය අවම වශයෙන් අකුරු 8ක් විය යුතුය.",
    signupUnavailableErr:
      "ලියාපදිංචි වීම තාවකාලිකව ලබාගත නොහැක. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
    googleStatusMsg: "Google ගිණුම සමඟ සම්බන්ධ වෙමින්...",
  },
  ta: {
    brandSubtitle: "பாடசாலை கற்றல் தளம்",
    topBadge: "அரச பாடத்திட்டம் • தரம் 6–11",
    backBtn: "பின்செல்ல",
    leftTitle: "உங்கள் சிப்நென கணக்கை உருவாக்குங்கள்",
    leftSubline: "இலங்கை தரம் 6–11 சா/த கற்றல் தளத்தில் இணையுங்கள்",
    ben_curriculum_title: "முழுமையான NIE பாடத்திட்டம்",
    ben_curriculum_desc:
      "தரம் 6–11 க்கான வீடியோ பாடங்கள், சுருக்கக் குறிப்புகள், கடந்த வினாத்தாள்கள் & வினாடிகள்.",
    ben_safe_title: "பாதுகாப்பான கற்றல் தளம்",
    ben_safe_desc:
      "விளம்பரங்கள் இன்றி இலங்கை மாணவர்கள் மற்றும் பெற்றோருக்காக உருவாக்கப்பட்டது.",
    ben_progress_title: "எல்லா சாதனங்களிலும் முன்னேற்றம்",
    ben_progress_desc:
      "சேமித்த பாடங்கள், வினாடி மதிப்பெண்கள் மற்றும் குறிப்புகளைப் பாதுகாப்பாக வையுங்கள்.",
    trustFooter:
      "மாணவர்கள், பெற்றோர் மற்றும் ஆசிரியர்களின் நம்பிக்கையைப் பெற்றது",
    formTitle: "கணக்கை உருவாக்குங்கள்",
    formSubtitle:
      "பாடங்கள் மற்றும் முன்னேற்றத்தைச் சேமிக்க மின்னஞ்சலால் பதிவு செய்யுங்கள்.",
    googleBtn: "Google மூலம் தொடரவும்",
    dividerText: "அல்லது மின்னஞ்சல் மூலம் பதிவு செய்க",
    nameLabel: "பெயர்",
    namePlaceholder: "கசுன் பெரேரா",
    emailLabel: "மின்னஞ்சல்",
    emailPlaceholder: "you@example.com",
    passwordLabel: "கடவுச்சொல்",
    passwordPlaceholder: "குறைந்தது 8 எழுத்துகள்",
    passwordHint: "குறைந்தது 8 எழுத்துகளைப் பயன்படுத்தவும்",
    showPasswordAria: "கடவுச்சொல்லைக் காட்டு",
    hidePasswordAria: "கடவுச்சொல்லை மறை",
    submitBtn: "கணக்கை உருவாக்கு",
    pendingBtn: "காத்திருக்கவும்…",
    alreadyAccountPrompt: "ஏற்கனவே கணக்கு உள்ளதா?",
    signInLink: "உள்நுழைய",
    pageBottomFooter:
      "இலங்கை பாடசாலை மாணவர்களுக்கானது (தரம் 6–11) • எளிய & பாதுகாப்பான கற்றல்",
    langSwitcherAria: "மொழியை மாற்றுக",
    nameRequiredErr: "உங்கள் பெயரை உள்ளிடவும்.",
    emailInvalidErr: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.",
    passwordShortErr: "கடவுச்சொல் குறைந்தது 8 எழுத்துகள் இருக்க வேண்டும்.",
    signupUnavailableErr:
      "பதிவு சேவை தற்காலிகமாக கிடைக்கவில்லை. பின்னர் மீண்டும் முயற்சிக்கவும்.",
    googleStatusMsg: "Google கணக்குடன் இணைகிறது...",
  },
};
