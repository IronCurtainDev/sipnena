import type {
  LandingFeatureItem,
  LandingGradeItem,
  LandingParentCheckItem,
  LandingSampleCourse,
  LandingStepItem,
  LandingSubjectItem,
} from "./types";

export { LANDING_FAQS } from "./faq-data";

export const LANDING_GRADES: LandingGradeItem[] = [
  {
    id: "g6",
    gradeNumber: 6,
    labelEn: "Grade 6",
    labelSi: "6 ශ්‍රේණිය",
    labelTa: "தரம் 6",
  },
  {
    id: "g7",
    gradeNumber: 7,
    labelEn: "Grade 7",
    labelSi: "7 ශ්‍රේණිය",
    labelTa: "தரம் 7",
  },
  {
    id: "g8",
    gradeNumber: 8,
    labelEn: "Grade 8",
    labelSi: "8 ශ්‍රේණිය",
    labelTa: "தரம் 8",
  },
  {
    id: "g9",
    gradeNumber: 9,
    labelEn: "Grade 9",
    labelSi: "9 ශ්‍රේණිය",
    labelTa: "தரம் 9",
  },
  {
    id: "g10",
    gradeNumber: 10,
    labelEn: "Grade 10",
    labelSi: "10 ශ්‍රේණිය (O/L)",
    labelTa: "தரம் 10 (O/L)",
    isOL: true,
  },
  {
    id: "g11",
    gradeNumber: 11,
    labelEn: "Grade 11",
    labelSi: "11 ශ්‍රේණිය (O/L)",
    labelTa: "தரம் 11 (O/L)",
    isOL: true,
  },
];

export const LANDING_SUBJECTS: LandingSubjectItem[] = [
  {
    id: "maths",
    titleEn: "Maths",
    titleSi: "ගණිතය",
    titleTa: "கணிதம்",
    colorClass: "text-rose-600",
    iconBg: "bg-rose-50 border-rose-200",
  },
  {
    id: "science",
    titleEn: "Science",
    titleSi: "විද්‍යාව",
    titleTa: "அறிவியல்",
    colorClass: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-200",
  },
  {
    id: "english",
    titleEn: "English",
    titleSi: "ඉංග්‍රීසි",
    titleTa: "ஆங்கிலம்",
    colorClass: "text-[var(--sn-text-secondary)]",
    iconBg: "bg-[var(--sn-sage)] border-[var(--sn-border)]",
  },
  {
    id: "first-lang",
    titleEn: "First Language",
    titleSi: "මව්බස",
    titleTa: "தாய்மொழி",
    colorClass: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-200",
  },
  {
    id: "history",
    titleEn: "History",
    titleSi: "ඉතිහාසය",
    titleTa: "வரலாறு",
    colorClass: "text-orange-600",
    iconBg: "bg-orange-50 border-orange-200",
  },
  {
    id: "geography",
    titleEn: "Geography",
    titleSi: "භූගෝලය",
    titleTa: "புவியியல்",
    colorClass: "text-teal-600",
    iconBg: "bg-teal-50 border-teal-200",
  },
  {
    id: "ict",
    titleEn: "ICT / Computer Studies",
    titleSi: "තොරතුරු තාක්ෂණය",
    titleTa: "தகவல் தொடர்பு",
    colorClass: "text-[var(--sn-primary)]",
    iconBg: "bg-[var(--sn-olive)] border-[var(--sn-border)]",
  },
];

export const LANDING_STEPS: LandingStepItem[] = [
  {
    step: 1,
    titleEn: "Choose a course.",
    titleSi: "ඔබට අවශ්‍ය පාඩම තෝරන්න.",
    descEn: "Pick any lesson or term subject aligned with your term syllabus.",
    descSi: "පාසල් වාර විභාගයට අදාළ නිවැරදි විෂය නිර්දේශය තෝරාගන්න.",
    badgeBg: "bg-[var(--sn-sage)] text-[var(--sn-primary)]",
  },
  {
    step: 2,
    titleEn: "Watch short lessons.",
    titleSi: "කෙටි වීඩියෝ පාඩම් බලන්න.",
    descEn: "5 to 15 minute lessons explained clearly in your chosen language.",
    descSi: "තේරුම් ගැනීමට පහසු භාෂාවකින් විනාඩි 5-15ක කෙටි පැහැදිලි කිරීම්.",
    badgeBg: "bg-amber-100 text-amber-800",
  },
  {
    step: 3,
    titleEn: "Take quizzes and get a certificate.",
    titleSi: "ප්‍රශ්න වලට පිළිතුරු දී සහතිකය ලබාගන්න.",
    descEn:
      "Practice with past-paper MCQs and earn official course completion badges.",
    descSi: "පසුගිය විභාග ප්‍රශ්න පුහුණු වී අධ්‍යාපන සහතිකය දිනාගන්න.",
    badgeBg: "bg-emerald-100 text-emerald-800",
  },
];

export const LANDING_FEATURES: LandingFeatureItem[] = [
  {
    id: "f-lang",
    iconName: "languages",
    titleEn: "Lessons in 3 languages.",
    titleSi: "භාෂා තුනින්ම ඉගෙන ගන්න.",
    descEn: "Switch between Sinhala, Tamil, and English at any moment.",
    descSi: "ඕනෑම මොහොතක සිංහල, දෙමළ හෝ ඉංග්‍රීසි භාෂාවට මාරු විය හැක.",
  },
  {
    id: "f-phone",
    iconName: "smartphone",
    titleEn: "Learn on your phone any time.",
    titleSi: "ඕනෑම වේලාවක දුරකථනයෙන්.",
    descEn: "Optimized for small screens and slow 3G mobile Internet.",
    descSi:
      "අඩු වියදම් දුරකථන සහ අඩු අන්තර්ජාල වේගයකින්ද බාධාවකින් තොරව ක්‍රියා කරයි.",
  },
  {
    id: "f-short",
    iconName: "list-checks",
    titleEn: "Short lessons and quizzes.",
    titleSi: "කෙටි පාඩම් සහ ප්‍රශ්න.",
    descEn: "Bite-size units prevent fatigue and build confidence.",
    descSi: "මනස වෙහෙස නොවන කෙටි පාඩම් මගින් විභාග බිය නැති කරයි.",
  },
  {
    id: "f-free",
    iconName: "play",
    titleEn: "Try free lessons first.",
    titleSi: "නොමිලේ මුලින්ම බලන්න.",
    descEn:
      "Preview 2-3 full video lessons before using your parent enrollment.",
    descSi: "දෙමාපියන් ගෙවීමට පෙර සම්පූර්ණ වීඩියෝ පාඩම් 3ක් නොමිලයේම නරඹන්න.",
  },
];

export const LANDING_PARENT_CHECKS: LandingParentCheckItem[] = [
  {
    id: "p-pay",
    titleEn: "Pay safely with a link.",
    titleSi: "ආරක්ෂිත සබැඳියකින් ගෙවන්න.",
    descEn:
      "Your child shares a WhatsApp checkout link; you approve via Card, FriMi, Genie, or Bank Transfer.",
    descSi:
      "දරුවා WhatsApp හරහා එවන සබැඳියෙන් කාඩ්පතින් හෝ බැංකු තැන්පතුවෙන් ආරක්ෂිතව ගෙවන්න.",
  },
  {
    id: "p-progress",
    titleEn: "See your child's progress.",
    titleSi: "දරුවාගේ ප්‍රගතිය නිරීක්ෂණය කරන්න.",
    descEn:
      "Direct notifications when quizzes are passed or chapters finished.",
    descSi:
      "ප්‍රශ්නාවලි සමත් වූ විට සහ පරිච්ඡේද අවසන් කළ විට ක්ෂණික දැනුම්දීම්.",
  },
  {
    id: "p-no-ads",
    titleEn: "No ads.",
    titleSi: "වෙළඳ දැන්වීම් කිසිවක් නැත.",
    descEn:
      "Clean learning without distractions of advertisements or external sponsor banners.",
    descSi: "දරුවාගේ අවධානය වෙනතකට නොයන පිරිසිදු පාසල් පරිසරයක්.",
  },
  {
    id: "p-no-chat",
    titleEn: "No private messages.",
    titleSi: "අනවශ්‍ය පුද්ගලික පණිවිඩ නැත.",
    descEn:
      "100% child-safe ecosystem. No open chats or contact between strangers.",
    descSi:
      "100% ළමා සුරක්ෂිත වේදිකාවකි. නාඳුනන පුද්ගලයන් සමඟ චැට් කිරීම් නැත.",
  },
];

export const LANDING_SAMPLE_COURSES: LandingSampleCourse[] = [
  {
    id: "sample-science",
    gradeBadge: "Grade 8",
    subjectBadge: "Science",
    title: "Light, Reflection & Spherical Mirrors",
    teacher: "Teacher Anura Jayasinghe • BSc, PGDE",
    thumbnailType: "science",
  },
  {
    id: "sample-maths",
    gradeBadge: "Grade 8",
    subjectBadge: "Maths",
    title: "Algebraic Fractions & Equations",
    teacher: "Teacher N. Gamage • BSc",
    thumbnailType: "maths",
  },
  {
    id: "sample-english",
    gradeBadge: "Grade 8",
    subjectBadge: "English",
    title: "Grammar & Sentence Writing",
    teacher: "Teacher S. Sivakumar • BA",
    thumbnailType: "english",
  },
];
