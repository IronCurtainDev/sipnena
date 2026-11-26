import type { AppLanguage } from "@/lib/language";

export type LegalDocKind = "terms" | "privacy" | "refund";

export const LEGAL_DOCS_TRANSLATED: Record<
  LegalDocKind,
  Record<
    AppLanguage,
    {
      title: string;
      updated: string;
      sections: Array<{ heading: string; body: string }>;
    }
  >
> = {
  terms: {
    en: {
      title: "Terms of Service",
      updated: "November 2026",
      sections: [
        {
          heading: "1. Student & Parent Accounts",
          body: "SipNena serves Sri Lankan Grade 6–11 students and their guardians. Free curriculum previews require no payment, while monthly Class Cards grant personal study access for one enrolled student.",
        },
        {
          heading: "2. Academic Integrity & NIE Materials",
          body: "Lesson tutes, short notes, and past paper marking schemes are provided for personal exam revision and classroom support. Commercial redistribution is prohibited.",
        },
        {
          heading: "3. Bank Slip & LankaQR Verification",
          body: "Bank deposit activations are verified manually against bank references. Altered or duplicate slips result in rejection and manual review.",
        },
      ],
    },
    si: {
      title: "සේවා කොන්දේසි",
      updated: "2026 නොවැම්බර්",
      sections: [
        {
          heading: "1. ශිෂ්‍ය සහ දෙමාපිය ගිණුම්",
          body: "සිප්නැණ ශ්‍රී ලංකාවේ 6–11 ශ්‍රේණි සිසුන් සහ දෙමාපියන් සඳහා සේවය කරයි. නොමිලේ පෙරදසුන් සඳහා ගෙවීම් අවශ්‍ය නොවේ.",
        },
        {
          heading: "2. NIE අධ්‍යයන ද්‍රව්‍ය භාවිතය",
          body: "පාඩම් ටියුට්, කෙටි සටහන් සහ ලකුණු දීමේ පටිපාටි පෞද්ගලික විභාග පුහුණුව සඳහා පමණි.",
        },
        {
          heading: "3. බැංකු රිසිට්පත් සහ LankaQR තහවුරු කිරීම",
          body: "බැංකු තැන්පතු යොමු අංක හරහා අතින් පරීක්ෂා කර සක්‍රිය කෙරේ.",
        },
      ],
    },
    ta: {
      title: "சேவை விதிமுறைகள்",
      updated: "நவம்பர் 2026",
      sections: [
        {
          heading: "1. மாணவர் & பெற்றோர் கணக்குகள்",
          body: "சிப்நென இலங்கையின் தரம் 6–11 மாணவர்கள் மற்றும் பெற்றோர்களுக்குச் சேவை செய்கிறது. இலவச முன்னோட்டப் பாடங்களுக்குக் கட்டணம் இல்லை.",
        },
        {
          heading: "2. NIE கல்வி வளங்களின் பயன்பாடு",
          body: "பாட டியூட்கள், சுருக்கக் குறிப்புகள் மற்றும் புள்ளித்திட்டங்கள் தனிப்பட்ட பரீட்சை மீள்பார்வைக்கு மட்டுமே.",
        },
        {
          heading: "3. வங்கி ரசீது & LankaQR சரிபார்ப்பு",
          body: "வங்கி வைப்பு ரசீதுகள் குறிப்பு எண்கள் மூலம் சரிபார்க்கப்பட்டு செயலாக்கப்படும்.",
        },
      ],
    },
  },
  privacy: {
    en: {
      title: "Child-Safe Privacy Policy",
      updated: "November 2026",
      sections: [
        {
          heading: "1. Zero Distracting Ads & Student Safety",
          body: "SipNena displays zero third-party ad networks or behavioral trackers to Grade 6–11 students. Progress is shared only with linked guardians and teachers.",
        },
        {
          heading: "2. Minimal Data Collection",
          body: "We store your chosen grade, study medium (Sinhala, Tamil, English), subject baskets, and offline preferences to personalize your study plan.",
        },
        {
          heading: "3. Parent Controls",
          body: "Parents may review weekly watch time, quiz scores, and attendance in the Parent Dashboard or request data deletion via WhatsApp support.",
        },
      ],
    },
    si: {
      title: "දරුවන්ට ආරක්ෂිත රහස්‍යතා ප්‍රතිපත්තිය",
      updated: "2026 නොවැම්බර්",
      sections: [
        {
          heading: "1. වෙළඳ දැන්වීම් වලින් තොර ආරක්ෂිත ඉගෙනුම",
          body: "සිප්නැණ 6–11 ශ්‍රේණි සිසුන්ට කිසිදු බාහිර දැන්වීමක් නොපෙන්වයි. ප්‍රගතිය දෙමාපියන් හා ගුරුවරුන් සමඟ පමණක් බෙදා ගැනේ.",
        },
        {
          heading: "2. අවම දත්ත රැස් කිරීම",
          body: "ඔබේ ශ්‍රේණිය, මාධ්‍යය (සිංහල, දෙමළ, ඉංග්‍රීසි) සහ විෂය තේරීම් පමණක් අධ්‍යයන සැලසුම සඳහා භාවිත කෙරේ.",
        },
        {
          heading: "3. දෙමාපිය පාලනය",
          body: "දෙමාපිය පාලක පුවරුව මඟින් සතිපතා ප්‍රගතිය පරීක්ෂා කළ හැකි අතර WhatsApp ඔස්සේ සහාය ලබා ගත හැක.",
        },
      ],
    },
    ta: {
      title: "குழந்தை பாதுகாப்புத் தனியுரிமைக் கொள்கை",
      updated: "நவம்பர் 2026",
      sections: [
        {
          heading: "1. விளம்பரமற்ற பாதுகாப்பான கற்றல்",
          body: "தரம் 6–11 மாணவர்களுக்கு மூன்றாம் தரப்பு விளம்பரங்கள் எதுவும் காட்டப்படுவதில்லை. முன்னேற்றம் பெற்றோர் மற்றும் ஆசிரியர்களுடன் மட்டுமே பகிரப்படும்.",
        },
        {
          heading: "2. குறைந்தபட்ச தரவு சேகரிப்பு",
          body: "உங்கள் தரம், கல்வி ஊடகம் (தமிழ், சிங்களம், ஆங்கிலம்) மற்றும் பாடத் தேர்வுகள் மட்டுமே சேமிக்கப்படும்.",
        },
        {
          heading: "3. பெற்றோர் கட்டுப்பாடு",
          body: "பெற்றோர் பலகையில் வாராந்த கற்றல் நேரம் மற்றும் மதிப்பெண்களைப் பார்வையிடலாம்.",
        },
      ],
    },
  },
  refund: {
    en: {
      title: "Refund & Class Card Policy",
      updated: "November 2026",
      sections: [
        {
          heading: "1. 7-Day Class Card Satisfaction Guarantee",
          body: "If a student purchases the wrong grade or medium Class Card, contact WhatsApp support within 7 days for an instant free switch or full refund.",
        },
        {
          heading: "2. Duplicate Bank Deposit Refunds",
          body: "Accidental double deposits are refunded to the original BOC, Commercial Bank, or Sampath account within 3 working days.",
        },
        {
          heading: "3. No Surprise Auto-Deductions",
          body: "Monthly Class Cards never auto-charge your bank card without explicit parent confirmation.",
        },
      ],
    },
    si: {
      title: "මුදල් ආපසු ගෙවීමේ සහ පන්ති කාඩ්පත් ප්‍රතිපත්තිය",
      updated: "2026 නොවැම්බර්",
      sections: [
        {
          heading: "1. දින 7ක පන්ති කාඩ්පත් වෙනස් කිරීමේ සහතිකය",
          body: "වැරදි ශ්‍රේණියක් හෝ මාධ්‍යයක් මිලදී ගත්තේ නම් දින 7ක් ඇතුළත WhatsApp මඟින් නොමිලේ මාරු කර හෝ මුදල් ආපසු ලබා ගත හැක.",
        },
        {
          heading: "2. ද්විත්ව බැංකු තැන්පතු ආපසු ගෙවීම",
          body: "අත්වැරදීමකින් දෙවරක් ගෙවූ මුදල් වැඩ කරන දින 3ක් ඇතුළත මුල් බැංකු ගිණුමට ආපසු ලබා දෙනු ලැබේ.",
        },
        {
          heading: "3. ස්වයංක්‍රීය මුදල් කැපීම් නැත",
          body: "දෙමාපිය අනුමැතියකින් තොරව කාඩ්පත් වලින් ස්වයංක්‍රීයව මුදල් අය නොකෙරේ.",
        },
      ],
    },
    ta: {
      title: "பணம் திரும்பப் பெறும் & வகுப்பு அட்டைக் கொள்கை",
      updated: "நவம்பர் 2026",
      sections: [
        {
          heading: "1. 7-நாள் வகுப்பு அட்டை மாற்றல் உத்தரவாதம்",
          body: "தவறான தரம் அல்லது ஊடகம் வாங்கப்பட்டால் 7 நாட்களுக்குள் WhatsApp மூலம் இலவசமாக மாற்றலாம் அல்லது பணம் திரும்பப் பெறலாம்.",
        },
        {
          heading: "2. இரட்டை வங்கி வைப்புத் திருப்பம்",
          body: "தவறுதலாக இருமுறை செலுத்தப்பட்ட தொகை 3 வேலை நாட்களுக்குள் मूल வங்கிக் கணக்கிற்குத் திருப்பப்படும்.",
        },
        {
          heading: "3. தானியங்கிப் பணம் பிடித்தம் இல்லை",
          body: "பெற்றோர் அனுமதியின்றி மாதாந்த அட்டைகளுக்குத் தானியங்கியாகப் பணம் அறவிடப்படாது.",
        },
      ],
    },
  },
};
