import type { AppLanguage } from "@/lib/language";

export const HELP_COPY: Record<
  AppLanguage,
  {
    pageTitle: string;
    deskBadge: string;
    heroHeading: string;
    heroSub: string;
    whatsappToast: string;
    whatsappBtn: string;
    faqHeading: string;
    termsLink: string;
    privacyLink: string;
    refundLink: string;
    backHelpBtn: string;
    tabTerms: string;
    tabPrivacy: string;
    tabRefund: string;
    platformBadge: string;
    lastUpdatedPrefix: string;
    chatWhatsappBtn: string;
    faqs: Array<{ q: string; a: string }>;
  }
> = {
  en: {
    pageTitle: "Help, Support & FAQ",
    deskBadge: "SipNena Student & Parent Desk (8 AM – 9 PM)",
    heroHeading: "Need quick help with Bank Slips, Mediums, or Class Cards?",
    heroSub:
      "Message our trilingual Sri Lankan support desk on WhatsApp anytime.",
    whatsappToast: "Opening WhatsApp Support (+94 77 123 4567)...",
    whatsappBtn: "WhatsApp Support",
    faqHeading: "Frequently Asked Questions",
    termsLink: "Terms of Service →",
    privacyLink: "Child-Safe Privacy Policy →",
    refundLink: "Refund & Class Card Policy →",
    backHelpBtn: "← Help & FAQ",
    tabTerms: "Terms",
    tabPrivacy: "Privacy",
    tabRefund: "Refund Policy",
    platformBadge: "Sri Lanka General Education Platform",
    lastUpdatedPrefix: "Last updated:",
    chatWhatsappBtn: "Questions? Chat on WhatsApp",
    faqs: [
      {
        q: "How do I pay by Bank Deposit and upload my bank slip?",
        a: "Go to Checkout (/checkout), open the 'Bank Deposit / Slip Upload' tab, copy our BOC, Commercial Bank, or Sampath Bank account number, make your transfer or CDM deposit, and drop your slip photo. Verification takes 15–30 minutes.",
      },
      {
        q: "How do I switch between Sinhala, Tamil, and English medium?",
        a: "Use the top language toggle (සි / த / En) anywhere in SipNena, or open /select-medium to update your classroom medium for videos, past papers, and NIE tutes.",
      },
      {
        q: "How do G.C.E. O/L Basket 1, 2, and 3 subjects work?",
        a: "When you choose Grade 10 or 11 in /select-grade, /pick-subjects automatically shows the 6 compulsory Core subjects plus 1 subject choice each from O/L Basket 1, Basket 2, and Basket 3.",
      },
      {
        q: "Can I watch lessons on low mobile data or offline?",
        a: "Yes! Open /downloads to select Low (240p) or Medium (480p) Data Saver video quality and save PDF tutes & NIE textbooks for offline study.",
      },
    ],
  },
  si: {
    pageTitle: "උදව්, සහාය සහ නිතර අසන ප්‍රශ්න (FAQ)",
    deskBadge: "සිප්නැණ ශිෂ්‍ය සහ දෙමාපිය සහාය (පෙ.ව. 8 – ප.ව. 9)",
    heroHeading:
      "බැංකු රිසිට්පත්, මාධ්‍ය මාරු හෝ පන්ති කාඩ්පත් ගැන උදව් අවශ්‍යද?",
    heroSub:
      "සිංහල, දෙමළ සහ ඉංග්‍රීසි භාෂා ත්‍රිත්වයෙන්ම WhatsApp ඔස්සේ අප හා සම්බන්ධ වන්න.",
    whatsappToast: "WhatsApp සහාය සේවාව විවෘත වේ (+94 77 123 4567)...",
    whatsappBtn: "WhatsApp සහාය",
    faqHeading: "නිතර අසන ප්‍රශ්න",
    termsLink: "සේවා කොන්දේසි →",
    privacyLink: "දරුවන්ට ආරක්ෂිත රහස්‍යතා ප්‍රතිපත්තිය →",
    refundLink: "මුදල් ආපසු ගෙවීමේ ප්‍රතිපත්තිය →",
    backHelpBtn: "← උදව් සහ FAQ",
    tabTerms: "කොන්දේසි",
    tabPrivacy: "රහස්‍යතාව",
    tabRefund: "මුදල් ආපසු ප්‍රතිපත්තිය",
    platformBadge: "ශ්‍රී ලංකා පාසල් අධ්‍යාපන වේදිකාව",
    lastUpdatedPrefix: "අවසන් යාවත්කාලීනය:",
    chatWhatsappBtn: "ගැටළු තිබේද? WhatsApp ඔස්සේ අසන්න",
    faqs: [
      {
        q: "බැංකු තැන්පතුවකින් ගෙවා රිසිට්පත උඩුගත කරන්නේ කෙසේද?",
        a: "ගෙවීම් පිටුවට (/checkout) ගොස් 'බැංකු තැන්පතු / රිසිට්පත' පටිත්ත තෝරා BOC, කොමර්ෂල් හෝ සම්පත් බැංකු ගිණුම් අංකය පිටපත් කර ගෙවා රිසිට්පතේ ඡායාරූපය එවන්න. මිනි. 15–30 කින් තහවුරු කෙරේ.",
      },
      {
        q: "සිංහල, දෙමළ සහ ඉංග්‍රීසි මාධ්‍ය අතර මාරු වන්නේ කෙසේද?",
        a: "ඕනෑම පිටුවක ඉහළ ඇති භාෂා බොත්තම (සි / த / En) හෝ මාධ්‍ය තේරීමේ පිටුව (/select-medium) භාවිතා කර වීඩියෝ සහ ටියුට් මාධ්‍යය වෙනස් කරන්න.",
      },
      {
        q: "අ.පො.ස. සා/පෙළ කාණ්ඩ 1, 2 සහ 3 විෂයයන් තෝරන්නේ කෙසේද?",
        a: "10 හෝ 11 ශ්‍රේණිය තෝරා ගත් විට, විෂය තේරීමේ පිටුවේ (/pick-subjects) අනිවාර්ය විෂයයන් 6ට අමතරව 1, 2, 3 කාණ්ඩ වලින් එක් විෂයය බැගින් තෝරාගත හැක.",
      },
      {
        q: "අඩු ජංගම දත්ත වැයකින් හෝ නොබැඳිව පාඩම් බැලිය හැකිද?",
        a: "ඔව්! බාගත කිරීම් (/downloads) පිටුවෙන් 240p හෝ 480p දත්ත සුරැකුම් තෝරා PDF ටියුට් සහ පෙළපොත් නොබැඳිව සුරකින්න.",
      },
    ],
  },
  ta: {
    pageTitle: "உதவி, ஆதரவு & அடிக்கடி கேட்கப்படும் கேள்விகள்",
    deskBadge: "சிப்நென மாணவர் & பெற்றோர் உதவி மையம் (காலை 8 – இரவு 9)",
    heroHeading:
      "வங்கி ரசீதுகள், மொழி மூலம் அல்லது வகுப்பு அட்டைகளுக்கு விரைவான உதவி தேவையா?",
    heroSub:
      "தமிழ், சிங்களம், ஆங்கிலம் ஆகிய மும்மொழிகளிலும் WhatsApp மூலம் தொடர்பு கொள்ளுங்கள்.",
    whatsappToast: "WhatsApp உதவி மையம் திறக்கப்படுகிறது (+94 77 123 4567)...",
    whatsappBtn: "WhatsApp உதவி",
    faqHeading: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    termsLink: "சேவை விதிமுறைகள் →",
    privacyLink: "குழந்தை பாதுகாப்புத் தனியுரிமைக் கொள்கை →",
    refundLink: "பணம் திரும்பப் பெறும் கொள்கை →",
    backHelpBtn: "← உதவி & FAQ",
    tabTerms: "விதிமுறைகள்",
    tabPrivacy: "தனியுரிமை",
    tabRefund: "திருப்பிக் கொள்கை",
    platformBadge: "இலங்கைப் பொதுக் கல்வித் தளம்",
    lastUpdatedPrefix: "கடைசியாகப் புதுப்பிக்கப்பட்டது:",
    chatWhatsappBtn: "கேள்விகள் உள்ளனவா? WhatsApp இல் உரையாடுக",
    faqs: [
      {
        q: "வங்கி வைப்பு மூலம் செலுத்தி ரசீதை எவ்வாறு பதிவேற்றுவது?",
        a: "கட்டணப் பக்கத்தில் (/checkout) 'வங்கி வைப்பு / ரசீது' தாவலைத் திறந்து BOC, கொமர்ஷல் அல்லது சம்பத் வங்கி கணக்கு எண்ணை நகலெடுத்துப் பணம் செலுத்தி ரசீதுப் படத்தைச் சமர்ப்பிக்கவும். 15–30 நிமிடங்களில் சரிபார்க்கப்படும்.",
      },
      {
        q: "தமிழ், சிங்களம் மற்றும் ஆங்கில ஊடகங்களுக்கு இடையில் மாறுவது எப்படி?",
        a: "மேலுள்ள மொழிப் பொத்தானை (සි / த / En) பயன்படுத்தவும் அல்லது /select-medium பக்கத்தில் உங்கள் கல்வி ஊடகத்தைப் புதுப்பிக்கவும்.",
      },
      {
        q: "க.பொ.த. சா/த தொகுதி 1, 2, 3 பாடங்கள் எவ்வாறு செயல்படுகின்றன?",
        a: "தரம் 10 அல்லது 11 ஐத் தேர்ந்தெடுத்தால், 6 கட்டாயப் பாடங்களுடன் தொகுதி 1, 2, 3 இலிருந்து தலா ஒரு பாடத்தைத் தேர்வு செய்யலாம்.",
      },
      {
        q: "குறைந்த மொபைல் டேட்டாவில் அல்லது ஆஃப்லைனில் படிக்கலாமா?",
        a: "ஆம்! பதிவிறக்கங்கள் (/downloads) பக்கத்தில் 240p அல்லது 480p டேட்டா சேமிப்புத் தரத்தைத் தேர்ந்தெடுத்து PDF டியூட்களை ஆஃப்லைனில் சேமிக்கலாம்.",
      },
    ],
  },
};
