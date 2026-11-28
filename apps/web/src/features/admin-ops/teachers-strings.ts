import type { AppLanguage } from "@/lib/language";

export interface AdminTeachersCopy {
  pageTitle: string;
  heading: string;
  sub: string;
  createBtn: string;
  emptyTitle: string;
  emptyDesc: string;
  colName: string;
  colEmail: string;
  colSubjects: string;
  colStatus: string;
  colActions: string;
  statusActive: string;
  statusDisabled: string;
  editBtn: string;
  disableBtn: string;
  enableBtn: string;
  dialogCreateTitle: string;
  dialogEditTitle: string;
  nameLabel: string;
  emailLabel: string;
  passwordLabel: string;
  passwordHint: string;
  passwordEditHint: string;
  subjectsLabel: string;
  subjectsHint: string;
  bioLabel: string;
  phoneLabel: string;
  initialsLabel: string;
  saveBtn: string;
  cancelBtn: string;
  createdToast: string;
  updatedToast: string;
  disabledToast: string;
  enabledToast: string;
  errorGeneric: string;
  hubTitle: string;
  hubDesc: string;
  hubCta: string;
  teacherCountLabel: string;
}

export const ADMIN_TEACHERS_COPY: Record<AppLanguage, AdminTeachersCopy> = {
  en: {
    pageTitle: "Teachers",
    heading: "Teacher registry",
    sub: "Create teacher accounts with email and password. Teachers sign in on the login page to create courses.",
    createBtn: "Add teacher",
    emptyTitle: "No teachers yet",
    emptyDesc: "Add a teacher so they can create courses for students.",
    colName: "Name",
    colEmail: "Email",
    colSubjects: "Subjects",
    colStatus: "Status",
    colActions: "Actions",
    statusActive: "Active",
    statusDisabled: "Disabled",
    editBtn: "Edit",
    disableBtn: "Disable",
    enableBtn: "Enable",
    dialogCreateTitle: "Add teacher",
    dialogEditTitle: "Edit teacher",
    nameLabel: "Full name",
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordHint: "At least 8 characters. Teacher uses this on /login.",
    passwordEditHint: "Leave blank to keep the current password.",
    subjectsLabel: "Subjects",
    subjectsHint: "Comma-separated, e.g. Science, Mathematics",
    bioLabel: "Bio",
    phoneLabel: "Phone",
    initialsLabel: "Initials",
    saveBtn: "Save",
    cancelBtn: "Cancel",
    createdToast: "Teacher created",
    updatedToast: "Teacher updated",
    disabledToast: "Teacher disabled",
    enabledToast: "Teacher enabled",
    errorGeneric: "Could not save teacher",
    hubTitle: "Teacher registry",
    hubDesc: "Create and manage teacher accounts for the course studio.",
    hubCta: "Open Teachers",
    teacherCountLabel: "teachers",
  },
  si: {
    pageTitle: "ගුරුවරුන්",
    heading: "ගුරු ලේඛනය",
    sub: "විද්‍යුත් තැපෑල සහ මුරපදය සමඟ ගුරු ගිණුම් සාදන්න. ගුරුවරු login පිටුවෙන් පිවිසී පාඨමාලා සාදයි.",
    createBtn: "ගුරුවරයා එකතු කරන්න",
    emptyTitle: "තවම ගුරුවරුන් නැත",
    emptyDesc: "පාඨමාලා සෑදීමට ගුරුවරයෙකු එකතු කරන්න.",
    colName: "නම",
    colEmail: "විද්‍යුත් තැපෑල",
    colSubjects: "විෂයයන්",
    colStatus: "තත්ත්වය",
    colActions: "ක්‍රියා",
    statusActive: "සක්‍රිය",
    statusDisabled: "අක්‍රිය",
    editBtn: "සංස්කරණය",
    disableBtn: "අක්‍රිය කරන්න",
    enableBtn: "සක්‍රිය කරන්න",
    dialogCreateTitle: "ගුරුවරයා එකතු කරන්න",
    dialogEditTitle: "ගුරුවරයා සංස්කරණය",
    nameLabel: "සම්පූර්ණ නම",
    emailLabel: "විද්‍යුත් තැපෑල",
    passwordLabel: "මුරපදය",
    passwordHint: "අවම අක්ෂර 8ක්. ගුරුවරයා /login හි මෙය භාවිතා කරයි.",
    passwordEditHint: "වත්මන් මුරපදය තබා ගැනීමට හිස්ව තබන්න.",
    subjectsLabel: "විෂයයන්",
    subjectsHint: "කොමාවෙන් වෙන් කරන්න, උදා. Science, Mathematics",
    bioLabel: "හැඳින්වීම",
    phoneLabel: "දුරකථනය",
    initialsLabel: "මුලකුරු",
    saveBtn: "සුරකින්න",
    cancelBtn: "අවලංගු",
    createdToast: "ගුරුවරයා එකතු විය",
    updatedToast: "ගුරුවරයා යාවත්කාලීන විය",
    disabledToast: "ගුරුවරයා අක්‍රිය කෙරිණි",
    enabledToast: "ගුරුවරයා සක්‍රිය කෙරිණි",
    errorGeneric: "ගුරුවරයා සුරැකීමට නොහැකි විය",
    hubTitle: "ගුරු ලේඛනය",
    hubDesc: "පාඨමාලා මැදිරිය සඳහා ගුරු ගිණුම් සාදා කළමනාකරණය කරන්න.",
    hubCta: "ගුරුවරුන් විවෘත කරන්න",
    teacherCountLabel: "ගුරුවරු",
  },
  ta: {
    pageTitle: "ஆசிரியர்கள்",
    heading: "ஆசிரியர் பதிவேடு",
    sub: "மின்னஞ்சல் மற்றும் கடவுச்சொல்லுடன் ஆசிரியர் கணக்குகளை உருவாக்கவும். ஆசிரியர்கள் login பக்கத்தில் உள்நுழைந்து பாடநெறிகளை உருவாக்குவர்.",
    createBtn: "ஆசிரியரைச் சேர்",
    emptyTitle: "இன்னும் ஆசிரியர்கள் இல்லை",
    emptyDesc: "பாடநெறிகள் உருவாக்க ஒரு ஆசிரியரைச் சேர்க்கவும்.",
    colName: "பெயர்",
    colEmail: "மின்னஞ்சல்",
    colSubjects: "பாடங்கள்",
    colStatus: "நிலை",
    colActions: "செயல்கள்",
    statusActive: "செயலில்",
    statusDisabled: "முடக்கப்பட்டது",
    editBtn: "திருத்து",
    disableBtn: "முடக்கு",
    enableBtn: "செயல்படுத்து",
    dialogCreateTitle: "ஆசிரியரைச் சேர்",
    dialogEditTitle: "ஆசிரியரைத் திருத்து",
    nameLabel: "முழுப் பெயர்",
    emailLabel: "மின்னஞ்சல்",
    passwordLabel: "கடவுச்சொல்",
    passwordHint: "குறைந்தது 8 எழுத்துகள். ஆசிரியர் /login இல் இதைப் பயன்படுத்துவார்.",
    passwordEditHint: "தற்போதைய கடவுச்சொல்லை வைத்திருக்க காலியாக விடவும்.",
    subjectsLabel: "பாடங்கள்",
    subjectsHint: "காற்புள்ளியால் பிரிக்கவும், எ.கா. Science, Mathematics",
    bioLabel: "சுயவிவரம்",
    phoneLabel: "தொலைபேசி",
    initialsLabel: "முதலெழுத்துகள்",
    saveBtn: "சேமி",
    cancelBtn: "ரத்து",
    createdToast: "ஆசிரியர் சேர்க்கப்பட்டார்",
    updatedToast: "ஆசிரியர் புதுப்பிக்கப்பட்டார்",
    disabledToast: "ஆசிரியர் முடக்கப்பட்டார்",
    enabledToast: "ஆசிரியர் செயல்படுத்தப்பட்டார்",
    errorGeneric: "ஆசிரியரைச் சேமிக்க முடியவில்லை",
    hubTitle: "ஆசிரியர் பதிவேடு",
    hubDesc: "பாடநெறி ஸ்டுடியோவுக்கான ஆசிரியர் கணக்குகளை உருவாக்கி நிர்வகிக்கவும்.",
    hubCta: "ஆசிரியர்களைத் திற",
    teacherCountLabel: "ஆசிரியர்கள்",
  },
};
