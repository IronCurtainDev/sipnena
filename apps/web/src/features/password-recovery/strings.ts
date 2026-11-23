export interface PasswordStrings {
  brandSubtitle: string;
  topBadge: string;
  backBtn: string;
  leftTitleForgot: string;
  leftSublineForgot: string;
  leftTitleReset: string;
  leftSublineReset: string;
  ben_fast_title: string;
  ben_fast_desc: string;
  ben_safe_title: string;
  ben_safe_desc: string;
  ben_help_title: string;
  ben_help_desc: string;
  trustFooter: string;

  // Forgot password form
  forgotTitle: string;
  forgotSubtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailInvalidErr: string;
  sendLinkBtn: string;
  sendingBtn: string;
  forgotSuccessTitle: string;
  forgotSuccessDesc: string;
  rememberPasswordPrompt: string;
  backToLoginLink: string;

  // Reset password form
  resetTitle: string;
  resetSubtitle: string;
  newPasswordLabel: string;
  newPasswordPlaceholder: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  passwordMismatchErr: string;
  passwordLengthErr: string;
  savePasswordBtn: string;
  savingBtn: string;
  resetSuccessTitle: string;
  resetSuccessDesc: string;
  invalidTokenTitle: string;
  invalidTokenDesc: string;
  requestNewLinkBtn: string;

  pageBottomFooter: string;
  langSwitcherAria: string;
}

export const PASSWORD_STRINGS: Record<"en" | "si" | "ta", PasswordStrings> = {
  en: {
    brandSubtitle: "School Learning App",
    topBadge: "Sri Lankan School Syllabus • Grades 6–11",
    backBtn: "Back",
    leftTitleForgot: "Can't remember your password?",
    leftSublineForgot:
      "Don't worry! We'll help you get back to your lessons quickly.",
    leftTitleReset: "Create a new password",
    leftSublineReset: "Set an easy-to-remember password to keep studying.",
    ben_fast_title: "Quick and easy",
    ben_fast_desc: "Get back to your lessons in just 2 minutes.",
    ben_safe_title: "Safe for students",
    ben_safe_desc: "We only send the link to your family's email.",
    ben_help_title: "Your notes stay safe",
    ben_help_desc: "All your marks, notes, and study progress are safe.",
    trustFooter: "Trusted by parents and teachers across Sri Lanka",

    forgotTitle: "Forgot password?",
    forgotSubtitle:
      "Enter the email you use for SipNena. We'll send you an easy link to set a new password.",
    emailLabel: "Email address",
    emailPlaceholder: "e.g. your or your parent's email",
    emailInvalidErr: "Please check your email address and try again.",
    sendLinkBtn: "Send reset link",
    sendingBtn: "Sending link...",
    forgotSuccessTitle: "Check your email!",
    forgotSuccessDesc:
      "We sent an email with an easy link to create a new password. Please check your inbox (and spam folder just in case).",
    rememberPasswordPrompt: "Remembered your password?",
    backToLoginLink: "Log in here",

    resetTitle: "Set a new password",
    resetSubtitle:
      "Type a new password below (use at least 8 letters or numbers).",
    newPasswordLabel: "New password",
    newPasswordPlaceholder: "Type your new password (at least 8 characters)",
    confirmPasswordLabel: "Type password again",
    confirmPasswordPlaceholder: "Type the same password again",
    passwordMismatchErr: "Both passwords must be the same.",
    passwordLengthErr: "Please make your password at least 8 characters long.",
    savePasswordBtn: "Save password & continue",
    savingBtn: "Saving...",
    resetSuccessTitle: "All done!",
    resetSuccessDesc:
      "Your password has been changed. You can now log in and continue your lessons.",
    invalidTokenTitle: "Link no longer works",
    invalidTokenDesc:
      "This link has expired or was already used. Please request a new one.",
    requestNewLinkBtn: "Get a new link",

    pageBottomFooter:
      "Made for Sri Lankan school students (Grades 6–11) • Simple & Safe Learning",
    langSwitcherAria: "Change language",
  },
  si: {
    brandSubtitle: "පාසල් ඉගෙනුම් ඇප් එක",
    topBadge: "රජයේ පාසල් විෂය නිර්දේශය • 6–11 ශ්‍රේණි",
    backBtn: "ආපසු",
    leftTitleForgot: "මුරපදය අමතක වුණාද?",
    leftSublineForgot:
      "බය වෙන්න එපා! ඉක්මනින්ම ආයෙත් පාඩම් වලට යන්න අපි උදව් කරන්නම්.",
    leftTitleReset: "අලුත් මුරපදයක් දාගන්න",
    leftSublineReset: "මතක තියාගන්න ලේසි මුරපදයක් දාලා දිගටම පාඩම් කරමු.",
    ben_fast_title: "ඉක්මන් සහ ලේසියි",
    ben_fast_desc: "විනාඩි 2කින් ආයෙත් පාඩම් වලට යන්න පුළුවන්.",
    ben_safe_title: "දරුවන්ට 100% ක් සුරක්ෂිතයි",
    ben_safe_desc: "සබැඳිය එවන්නේ ඔබ ලියාපදිංචි කළ ඊමේල් එකට විතරයි.",
    ben_help_title: "ඔබේ පාඩම් ඔක්කොම සුරක්ෂිතයි",
    ben_help_desc: "ලකුණු, කෙටි සටහන් කිසිවක් නැති වෙන්නේ නෑ.",
    trustFooter: "ශ්‍රී ලංකාව පුරා දෙමාපියන් සහ ගුරුවරුන්ගේ විශ්වාසය",

    forgotTitle: "මුරපදය අමතකද?",
    forgotSubtitle:
      "ඔබ ගිණුම හදන්න පාවිච්චි කරපු ඊමේල් ලිපිනය මෙතන ලියන්න. අලුත් මුරපදයක් හදාගන්න ලින්ක් එකක් අපි එවන්නම්.",
    emailLabel: "ඊමේල් ලිපිනය (Email)",
    emailPlaceholder: "දරුවාගේ හෝ දෙමාපියන්ගේ ඊමේල් ලිපිනය",
    emailInvalidErr: "ඊමේල් ලිපිනය නිවැරදිද කියා නැවත බලන්න.",
    sendLinkBtn: "මුරපදය හදන ලින්ක් එක එවන්න",
    sendingBtn: "ලින්ක් එක යවමින් පවතී...",
    forgotSuccessTitle: "ඊමේල් එක බලන්න!",
    forgotSuccessDesc:
      "අලුත් මුරපදයක් හදාගන්න ලින්ක් එකක් අපි ඔබේ ඊමේල් එකට එව්වා. කරුණාකර Inbox එක (නැත්නම් Spam එක) පරීක්ෂා කරන්න.",
    rememberPasswordPrompt: "මුරපදය මතක් වුණාද?",
    backToLoginLink: "මෙතැනින් ලොග් වෙන්න",

    resetTitle: "අලුත් මුරපදයක් දාන්න",
    resetSubtitle:
      "කැමති අලුත් මුරපදයක් මෙතන ලියන්න (අවම වශයෙන් අකුරු හෝ ඉලක්කම් 8ක්).",
    newPasswordLabel: "අලුත් මුරපදය (New Password)",
    newPasswordPlaceholder: "අලුත් මුරපදය මෙතන ලියන්න",
    confirmPasswordLabel: "මුරපදය ආයෙත් ලියන්න",
    confirmPasswordPlaceholder: "උඩ ලියපු මුරපදයම ආයෙත් ලියන්න",
    passwordMismatchErr: "මුරපද දෙක එක වගේ වෙන්න ඕන.",
    passwordLengthErr: "මුරපදයට අඩුම තරමේ අකුරු හෝ ඉලක්කම් 8ක් තියෙන්න ඕන.",
    savePasswordBtn: "මුරපදය සුරකින්න",
    savingBtn: "සුරකිමින් පවතී...",
    resetSuccessTitle: "වැඩේ හරි!",
    resetSuccessDesc:
      "ඔබේ අලුත් මුරපදය සාර්ථකව වෙනස් වුණා. දැන් ඔබට ගිණුමට ඇතුළු වෙලා පාඩම් කරන්න පුළුවන්.",
    invalidTokenTitle: "ලින්ක් එක වලංගු නෑ",
    invalidTokenDesc:
      "මෙම ලින්ක් එක කල් ඉකුත් වෙලා හෝ පාවිච්චි කරලා ඉවරයි. කරුණාකර අලුත් ලින්ක් එකක් ගන්න.",
    requestNewLinkBtn: "අලුත් ලින්ක් එකක් ගන්න",

    pageBottomFooter:
      "ශ්‍රී ලාංකික පාසල් දරුවන් (6–11 ශ්‍රේණි) වෙනුවෙන්ම සැකසූ සරල ඉගෙනුම",
    langSwitcherAria: "භාෂාව මාරු කරන්න",
  },
  ta: {
    brandSubtitle: "பள்ளி கல்விச் செயலி",
    topBadge: "இலங்கை பாடத்திட்டம் • தரங்கள் 6–11",
    backBtn: "பின்செல்க",
    leftTitleForgot: "கடவுச்சொல் மறந்துவிட்டதா?",
    leftSublineForgot:
      "கவலை வேண்டாம்! மீண்டும் விரைவாகப் படிக்க நாங்கள் உதவுவோம்.",
    leftTitleReset: "புதிய கடவுச்சொல் அமைக்கவும்",
    leftSublineReset:
      "எளிதாக நினைவில் இருக்கும் புதிய கடவுச்சொல்லை அமைத்து தொடர்ந்து படியுங்கள்.",
    ben_fast_title: "மிகவும் எளிதானது",
    ben_fast_desc: "2 நிமிடங்களில் உங்கள் பாடங்களை மீண்டும் தொடங்கலாம்.",
    ben_safe_title: "முழுக்க முழுக்கப் பாதுகாப்பானது",
    ben_safe_desc:
      "உங்கள் குடும்ப மின்னஞ்சல் முகவரிக்கு மட்டுமே இணைப்பு வரும்.",
    ben_help_title: "குறிப்புகள் பாதுகாப்பானது",
    ben_help_desc:
      "மதிப்பெண்களும் சுருக்கக் குறிப்புகளும் பத்திரமாக இருக்கும்.",
    trustFooter:
      "நாடு முழுவதுமுள்ள பெற்றோர்கள் மற்றும் ஆசிரியர்களின் நம்பிக்கை",

    forgotTitle: "கடவுச்சொல் மறந்துவிட்டதா?",
    forgotSubtitle:
      "சிப்நெனாவிற்கு நீங்கள் பயன்படுத்திய மின்னஞ்சலை உள்ளிடுங்கள். புதிய கடவுச்சொல் வைக்க எளிய இணைப்பை அனுப்புவோம்.",
    emailLabel: "மின்னஞ்சல் முகவரி (Email)",
    emailPlaceholder: "மாணவர் அல்லது பெற்றோரின் மின்னஞ்சல்",
    emailInvalidErr:
      "மின்னஞ்சல் முகவரியைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
    sendLinkBtn: "இணைப்பை அனுப்பவும்",
    sendingBtn: "அனுப்பப்படுகிறது...",
    forgotSuccessTitle: "மின்னஞ்சலைச் சரிபார்க்கவும்!",
    forgotSuccessDesc:
      "புதிய கடவுச்சொல் அமைப்பதற்கான இணைப்பு உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டுள்ளது. Inbox அல்லது Spam ஐப் பார்க்கவும்.",
    rememberPasswordPrompt: "கடவுச்சொல் நினைவுக்கு வந்ததா?",
    backToLoginLink: "இங்கே உள்நுழையவும்",

    resetTitle: "புதிய கடவுச்சොல்லை வைக்கவும்",
    resetSubtitle:
      "புதிய கடவுச்சொல்லை உள்ளிடவும் (குறைந்தது 8 எழுத்துக்கள் அல்லது எண்கள்).",
    newPasswordLabel: "புதிய கடவுச்சொல்",
    newPasswordPlaceholder: "புதிய கடவுச்சொல்லை உள்ளிடவும்",
    confirmPasswordLabel: "மீண்டும் கடவுச்சொல்லை உள்ளிடவும்",
    confirmPasswordPlaceholder: "அதே கடவுச்சொல்லை மீண்டும் உள்ளிடவும்",
    passwordMismatchErr: "இரண்டு கடவுச்சொற்களும் ஒன்றாக இருக்க வேண்டும்.",
    passwordLengthErr: "கடவுச்சොல் குறைந்தது 8 எழுத்துக்கள் இருக்க வேண்டும்.",
    savePasswordBtn: "கடவுச்சொல்லைச் சேமி",
    savingBtn: "சேமிக்கப்படுகிறது...",
    resetSuccessTitle: "வெற்றிகரமாக மாற்றப்பட்டது!",
    resetSuccessDesc:
      "உங்கள் கடவுச்சொல் மாற்றப்பட்டுவிட்டது. இப்போது உள்நுழைந்து படிக்கலாம்.",
    invalidTokenTitle: "இணைப்பு காலாவதியானது",
    invalidTokenDesc:
      "இந்த இணைப்பு காலாவதியாகிவிட்டது. புதிய இணைப்பைக் கோரவும்.",
    requestNewLinkBtn: "புதிய இணைப்பைப் பெறுக",

    pageBottomFooter:
      "இலங்கை மாணவர்களுக்காக உருவாக்கப்பட்டது (தரங்கள் 6–11) • எளிய மற்றும் பாதுகாப்பானது",
    langSwitcherAria: "மொழியை மாற்றவும்",
  },
};
