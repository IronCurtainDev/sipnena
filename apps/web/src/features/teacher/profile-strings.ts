import type { AppLanguage } from "@/lib/language";

export const TEACHER_PROFILE_COPY: Record<
  AppLanguage,
  {
    pageTitle: string;
    heading: string;
    sub: string;
    noTeacherTitle: string;
    noTeacherDesc: string;
    disabledTitle: string;
    disabledDesc: string;
    nameLabel: string;
    emailLabel: string;
    emailHint: string;
    subjectsLabel: string;
    subjectsHint: string;
    bioLabel: string;
    phoneLabel: string;
    initialsLabel: string;
    saveBtn: string;
    logoutBtn: string;
    savedToast: string;
    errorGeneric: string;
  }
> = {
  en: {
    pageTitle: "My profile",
    heading: "Teacher profile",
    sub: "Update how students see you on your courses.",
    noTeacherTitle: "No teacher account selected",
    noTeacherDesc:
      "Ask an admin to create your teacher account, then sign in on /login with that email and password.",
    disabledTitle: "This teacher is disabled",
    disabledDesc: "Ask an admin to re-enable your account before editing.",
    nameLabel: "Display name",
    emailLabel: "Email",
    emailHint: "Used to identify your account in the registry.",
    subjectsLabel: "Subjects",
    subjectsHint: "Comma-separated",
    bioLabel: "Bio",
    phoneLabel: "Phone",
    initialsLabel: "Initials",
    saveBtn: "Save profile",
    logoutBtn: "Sign out",
    savedToast: "Profile saved",
    errorGeneric: "Could not save profile",
  },
  si: {
    pageTitle: "මගේ පැතිකඩ",
    heading: "ගුරු පැතිකඩ",
    sub: "ඔබේ පාඨමාලාවල සිසුන්ට පෙනෙන ආකාරය යාවත්කාලීන කරන්න.",
    noTeacherTitle: "ගුරු ගිණුමක් තෝරා නැත",
    noTeacherDesc:
      "පරිපාලකගෙන් ගුරු ගිණුමක් සාදා ගෙන /login හි ඊමේල් සහ මුරපදයෙන් පිවිසෙන්න.",
    disabledTitle: "මෙම ගුරුවරයා අක්‍රියයි",
    disabledDesc: "සංස්කරණයට පෙර පරිපාලකගෙන් ගිණුම නැවත සක්‍රිය කරන්න.",
    nameLabel: "ප්‍රදර්ශන නම",
    emailLabel: "විද්‍යුත් තැපෑල",
    emailHint: "ලේඛනයේ ඔබේ ගිණුම හඳුනා ගැනීමට යොදා ගනී.",
    subjectsLabel: "විෂයයන්",
    subjectsHint: "කොමාවෙන් වෙන් කරන්න",
    bioLabel: "හැඳින්වීම",
    phoneLabel: "දුරකථනය",
    initialsLabel: "මුලකුරු",
    saveBtn: "පැතිකඩ සුරකින්න",
    logoutBtn: "ඉවත් වන්න",
    savedToast: "පැතිකඩ සුරකින ලදී",
    errorGeneric: "පැතිකඩ සුරැකීමට නොහැකි විය",
  },
  ta: {
    pageTitle: "என் சுயவிவரம்",
    heading: "ஆசிரியர் சுயவிவரம்",
    sub: "உங்கள் பாடநெறிகளில் மாணவர்கள் உங்களைப் பார்க்கும் விதத்தைப் புதுப்பிக்கவும்.",
    noTeacherTitle: "ஆசிரியர் கணக்கு தேர்ந்தெடுக்கப்படவில்லை",
    noTeacherDesc:
      "நிர்வாகி ஆசிரியர் கணக்கை உருவாக்கிய பின் /login இல் மின்னஞ்சல் மற்றும் கடவுச்சொல்லால் உள்நுழையவும்.",
    disabledTitle: "இந்த ஆசிரியர் முடக்கப்பட்டுள்ளார்",
    disabledDesc: "திருத்துவதற்கு முன் நிர்வாகி உங்கள் கணக்கை மீண்டும் இயக்கட்டும்.",
    nameLabel: "காட்சிப் பெயர்",
    emailLabel: "மின்னஞ்சல்",
    emailHint: "பதிவேட்டில் உங்கள் கணக்கை அடையாளம் காணப் பயன்படும்.",
    subjectsLabel: "பாடங்கள்",
    subjectsHint: "காற்புள்ளியால் பிரிக்கவும்",
    bioLabel: "சுயவிவரம்",
    phoneLabel: "தொலைபேசி",
    initialsLabel: "முதலெழுத்துகள்",
    saveBtn: "சுயவிவரத்தைச் சேமி",
    logoutBtn: "வெளியேறு",
    savedToast: "சுயவிவரம் சேமிக்கப்பட்டது",
    errorGeneric: "சுயவிவரத்தைச் சேமிக்க முடியவில்லை",
  },
};
