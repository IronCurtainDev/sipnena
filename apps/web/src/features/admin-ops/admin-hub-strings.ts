import type { AppLanguage } from "@/lib/language";

export const ADMIN_HUB_COPY: Record<
  AppLanguage,
  {
    pageTitle: string;
    heroBadge: string;
    heroTitle: string;
    heroSub: string;
    paymentsTitle: string;
    paymentsDesc: string;
    paymentsCta: string;
    pendingCountLabel: string;
    syllabusTitle: string;
    syllabusDesc: string;
    syllabusCta: string;
    teachersTitle: string;
    teachersDesc: string;
    teachersCta: string;
    teacherCountLabel: string;
    accountHeading: string;
    accountDesc: string;
    signInLink: string;
    noAccessTitle: string;
    noAccessDesc: string;
  }
> = {
  en: {
    pageTitle: "Admin Home",
    heroBadge: "SipNena Operations",
    heroTitle: "Admin & Operations Desk",
    heroSub:
      "Review bank deposit slips, manage the NIE curriculum tree, and administer user roles.",
    paymentsTitle: "Bank slip queue",
    paymentsDesc:
      "Verify uploaded bank receipts and unlock student class cards.",
    paymentsCta: "Open Bank slip queue",
    pendingCountLabel: "pending",
    syllabusTitle: "Syllabus manager",
    syllabusDesc:
      "Maintain the Grade 6–11 NIE Subject, Term, and Unit curriculum tree.",
    syllabusCta: "Open Syllabus manager",
    teachersTitle: "Teacher registry",
    teachersDesc:
      "Create teacher accounts for the course studio. Teachers pick their account via the demo role switcher.",
    teachersCta: "Open Teachers",
    teacherCountLabel: "teachers",
    accountHeading: "Admin dashboard",
    accountDesc:
      "Sign in with an administrator account to manage users, files, and roles.",
    signInLink: "Sign in to admin account",
    noAccessTitle: "You do not have access to the admin dashboard.",
    noAccessDesc:
      "Ask an administrator to give your account a role with admin permissions.",
  },
  si: {
    pageTitle: "පරිපාලක මුල් පිටුව",
    heroBadge: "සිප්නැණ මෙහෙයුම්",
    heroTitle: "පරිපාලක සහ මෙහෙයුම් මධ්‍යස්ථානය",
    heroSub:
      "බැංකු රිසිට්පත් පරීක්ෂාව, NIE විෂය නිර්දේශ කළමනාකරණය සහ ගිණුම් පරිපාලනය මෙතැනින් සිදු කරන්න.",
    paymentsTitle: "බැංකු රිසිට්පත් පෝලිම",
    paymentsDesc:
      "උඩුගත කළ බැංකු රිසිට්පත් තහවුරු කර සිසු පන්ති කාඩ්පත් විවෘත කරන්න.",
    paymentsCta: "බැංකු රිසිට්පත් පෝලිම විවෘත කරන්න",
    pendingCountLabel: "පොරොත්තු",
    syllabusTitle: "විෂය නිර්දේශ කළමනාකරු",
    syllabusDesc:
      "6–11 ශ්‍රේණි NIE විෂය, වාර සහ ඒකක ව්‍යුහය යාවත්කාලීනව පවත්වා ගන්න.",
    syllabusCta: "විෂය නිර්දේශ කළමනාකරු විවෘත කරන්න",
    teachersTitle: "ගුරු ලේඛනය",
    teachersDesc:
      "පාඨමාලා මැදිරිය සඳහා ගුරු ගිණුම් සාදන්න. ගුරුවරු demo role switcher මගින් තම ගිණුම තෝරයි.",
    teachersCta: "ගුරුවරුන් විවෘත කරන්න",
    teacherCountLabel: "ගුරුවරු",
    accountHeading: "පරිපාලක පුවරුව",
    accountDesc:
      "පරිශීලකයන්, ගොනු සහ භූමිකා කළමනාකරණය සඳහා පරිපාලක ගිණුමකට ඇතුළු වන්න.",
    signInLink: "පරිපාලක ගිණුමට ඇතුළු වන්න",
    noAccessTitle: "පරිපාලක පුවරුවට ඔබට ප්‍රවේශය නැත.",
    noAccessDesc:
      "පරිපාලක අවසර සහිත භූමිකාවක් ලබා ගැනීමට පද්ධති පරිපාලකයෙකුගෙන් විමසන්න.",
  },
  ta: {
    pageTitle: "நிர்வாக முகப்பு",
    heroBadge: "சிப்நென செயற்பாடுகள்",
    heroTitle: "நிர்வாகம் & செயற்பாட்டு மையம்",
    heroSub:
      "வங்கி ரசீதுகளைச் சரிபார்க்கவும், NIE பாடத்திட்டத்தை நிர்வகிக்கவும், பயனர் பாத்திரங்களைக் கையாளவும்.",
    paymentsTitle: "வங்கி ரசீது வரிசை",
    paymentsDesc:
      "பதிவேற்றப்பட்ட வங்கி ரசீதுகளைச் சரிபார்த்து மாணவர் வகுப்பு அட்டைகளைத் திறக்கவும்.",
    paymentsCta: "வங்கி ரசீது வரிசையைத் திறக்கவும்",
    pendingCountLabel: "நிலுவை",
    syllabusTitle: "பாடத்திட்ட நிர்வாகி",
    syllabusDesc:
      "தரம் 6–11 NIE பாடம், தவணை மற்றும் அலகு பாடத்திட்டக் கிளையைப் பராமரிக்கவும்.",
    syllabusCta: "பாடத்திட்ட நிர்வாகியைத் திறக்கவும்",
    teachersTitle: "ஆசிரியர் பதிவேடு",
    teachersDesc:
      "பாடநெறி ஸ்டுடியோவுக்கான ஆசிரியர் கணக்குகளை உருவாக்கவும். ஆசிரியர்கள் demo role switcher வழியாகத் தங்கள் கணக்கைத் தேர்ந்தெடுக்கின்றனர்.",
    teachersCta: "ஆசிரியர்களைத் திற",
    teacherCountLabel: "ஆசிரியர்கள்",
    accountHeading: "நிர்வாகப் பலகை",
    accountDesc:
      "பயனர்கள், கோப்புகள் மற்றும் பாத்திரங்களை நிர்வகிக்க நிர்வாகி கணக்கில் உள்நுழையவும்.",
    signInLink: "நிர்வாகி கணக்கில் உள்நுழையவும்",
    noAccessTitle: "நிர்வாகப் பலகைக்கான அணுகல் உங்களுக்கு இல்லை.",
    noAccessDesc:
      "நிர்வாக அனுமதிகள் கொண்ட பாத்திரத்தை வழங்குமாறு நிர்வாகியிடம் கேட்கவும்.",
  },
};
