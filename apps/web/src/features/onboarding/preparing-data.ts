export interface Step {
  si: string;
  ta: string;
  en: string;
}

export const PREPARING_STEPS: Step[] = [
  {
    si: "ඔබේ ශ්‍රේණියට ගැලපෙන පාඩම් තෝරමින්...",
    ta: "உங்கள் தரத்திற்கான பாடங்கள் தெரிவு செய்யப்படுகின்றன...",
    en: "Choosing lessons for your grade...",
  },
  {
    si: "කෙටි සටහන් සහ අභ්‍යාස සූදානම් කරමින්...",
    ta: "சுருக்கக் குறிப்புகள் தயாராகின்றன...",
    en: "Getting short notes and practice ready...",
  },
  {
    si: "ඔබේ ඉගෙනුම් පිටුව සකසමින්...",
    ta: "உங்கள் கற்றல் பக்கம் தயாராகிறது...",
    en: "Setting up your study page...",
  },
  {
    si: "සූදානම්! ඉගෙනීම අරඹමු!",
    ta: "தயார்! கற்கத் தொடங்குவோம்!",
    en: "Ready! Let's start learning!",
  },
];

export const STUDY_FACTS = [
  {
    en: "Did you know? Short, daily 15-minute study sessions help your brain remember 80% more than cramming before exams!",
    si: "ඔබ දන්නවාද? විභාගයට කලින් එකදිගට පාඩම් කරනවාට වඩා දිනපතා විනාඩි 15 බැගින් කෙටි සටහන් බැලීමෙන් මතක ශක්තිය 80% කින් වැඩි කරගත හැක!",
    ta: "உங்களுக்குத் தெரியுமா? தேர்வுக்கு முன் நீண்ட நேரம் படிப்பதைக் காட்டிலும், தினமும் 15 நிமிடங்கள் படிப்பது 80% கூடுதல் நினைவாற்றலைத் தரும்!",
  },
  {
    en: "Pro Tip: Solving just 3 past-paper questions after every chapter boosts your confidence tremendously.",
    si: "විශේෂ උපදෙසක්: සෑම පාඩමක් අවසානයේදීම පසුගිය විභාග ප්‍රශ්න 3කට පිළිතුරු ලිවීම ඔබේ ආත්මවිශ්වාසය දෙගුණ කරයි.",
    ta: "சிறந்த குறிப்பு: ஒவ்வொரு பாடத்தின் முடிவிலும் 3 கடந்தகால வினாக்களுக்கு விடையளிப்பது உங்கள் தன்னம்பிக்கையை உயர்த்தும்.",
  },
  {
    en: "Fun Fact: SipNena short notes are structured specifically following the official Sri Lankan government syllabus.",
    si: "සිප්නෙන කෙටි සටහන් සකස් කර ඇත්තේ රජයේ පාසල් විෂය නිර්දේශයේ ප්‍රධාන කරුණු වලට මුල්තැන දෙමිනි.",
    ta: "சிப்நெனா சுருக்கக் குறிப்புகள் இலங்கை அரச பாடத்திட்டத்தின் முக்கிய விடயங்களை அடிப்படையாகக் கொண்டு தயாரிக்கப்பட்டுள்ளன.",
  },
];
