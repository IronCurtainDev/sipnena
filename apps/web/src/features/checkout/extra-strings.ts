import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export interface CheckoutExtraCopy {
  localizedCourseTitle: string;
  localizedTerms: string;
  checkSlipStatus: string;
  classCardsLink: string;
  shareWithParentBtn: string;
  methodTabsAria: string;
  tabCardQr: string;
  tabBankDeposit: string;
  demoFailTrigger: string;
  scanWithApps: string;
  amountWord: string;
  instantActivation: string;
  confirmLankaQrBtn: string;
  encryptedGateway: string;
  cardNumberAria: string;
  expiryAria: string;
  cvcAria: string;
  payPrefix: string;
  paySuffix: string;
  bankStep1Prefix: string;
  bankStep1Suffix: string;
  accNoLabel: string;
  copyBtn: string;
  accountNoCopySuffix: string;
  bankStep2Label: string;
  bankStep2Placeholder: string;
  bankStep3Label: string;
  choosePhotoBtn: string;
  submitBankSlipBtn: string;
  copiedToastSuffix: string;
  enrollmentLinkLabel: string;
  referenceLabel: string;
  downloadingReceiptToast: string;
  modalCloseAria: string;
  modalTitle: string;
  modalSub: string;
  modalBankLabel: string;
  modalRefLabel: string;
  modalRefPlaceholder: string;
  modalFileLabel: string;
  modalFileSelected: string;
  modalFilePrompt: string;
  modalFileHint: string;
  modalCancelBtn: string;
  modalSubmitBtn: string;
}

export const CHECKOUT_EXTRA_COPY: Record<AppLanguage, CheckoutExtraCopy> = {
  en: {
    localizedCourseTitle: "Grade 8 Science: Full Year Masterclass",
    localizedTerms: "Term 1, 2 & 3",
    checkSlipStatus: "Check Slip Status",
    classCardsLink: "Class Cards",
    shareWithParentBtn: "Share with Parent",
    methodTabsAria: "Payment method tabs",
    tabCardQr: "Card / LankaQR",
    tabBankDeposit: "Bank Deposit / Slip Upload",
    demoFailTrigger: '[Demo: Test "Payment did not go through" screen]',
    scanWithApps: "Scan with FriMi, Genie, Solo, ComBank Q+, or BOC SmartPay",
    amountWord: "Amount: Rs.",
    instantActivation: "Instant Activation",
    confirmLankaQrBtn: "Confirm LankaQR Payment →",
    encryptedGateway: "256-bit Encrypted Sri Lankan Gateway",
    cardNumberAria: "Card number",
    expiryAria: "Expiry date",
    cvcAria: "CVC",
    payPrefix: "Pay Rs.",
    paySuffix: "Securely →",
    bankStep1Prefix: "1. Transfer Rs.",
    bankStep1Suffix: "to any SipNena account:",
    accNoLabel: "Acc No:",
    copyBtn: "Copy",
    accountNoCopySuffix: "Account No",
    bankStep2Label: "2. Receipt Reference / Slip Number",
    bankStep2Placeholder: "e.g. BOC-2026-88412",
    bankStep3Label: "3. Drag & Drop Receipt / Bank Slip Image",
    choosePhotoBtn: "Choose Photo or PDF",
    submitBankSlipBtn: "Submit Bank Slip for Verification →",
    copiedToastSuffix: "copied!",
    enrollmentLinkLabel: "Enrollment link",
    referenceLabel: "Reference",
    downloadingReceiptToast: "Downloading official PDF receipt...",
    modalCloseAria: "Close",
    modalTitle: "Upload Bank Transfer Slip",
    modalSub: "Attach your counter slip or online transfer screenshot",
    modalBankLabel: "Select Bank / Payment Channel",
    modalRefLabel: "Transaction / Reference Number",
    modalRefPlaceholder: "e.g. BOC-1893201 or FriMi-Ref",
    modalFileLabel: "Slip Photo or PDF receipt",
    modalFileSelected: "bank_slip_deposit_receipt.jpg (Selected)",
    modalFilePrompt: "Click to choose file or snap photo from phone",
    modalFileHint: "JPEG, PNG or PDF up to 10MB",
    modalCancelBtn: "Cancel",
    modalSubmitBtn: "Submit for Verification",
  },
  si: {
    localizedCourseTitle: "8 ශ්‍රේණිය විද්‍යාව: සම්පූර්ණ වාර්ෂික පන්තිය",
    localizedTerms: "1, 2 සහ 3 වාර",
    checkSlipStatus: "රිසිට්පත් තත්ත්වය බලන්න",
    classCardsLink: "පන්ති කාඩ්පත්",
    shareWithParentBtn: "දෙමාපියන්ට යවන්න",
    methodTabsAria: "ගෙවීම් ක්‍රම පටිති",
    tabCardQr: "කාඩ්පත / LankaQR",
    tabBankDeposit: "බැංකු තැන්පතු / රිසිට්පත",
    demoFailTrigger: '[පෙරදසුන: "ගෙවීම අසාර්ථකයි" තිරය පරීක්ෂා කරන්න]',
    scanWithApps:
      "FriMi, Genie, Solo, ComBank Q+, හෝ BOC SmartPay මගින් ස්කෑන් කරන්න",
    amountWord: "මුදල: රු.",
    instantActivation: "ක්ෂණික සක්‍රිය වීම",
    confirmLankaQrBtn: "LankaQR ගෙවීම තහවුරු කරන්න →",
    encryptedGateway: "256-bit ආරක්ෂිත ශ්‍රී ලාංකික ගෙවීම් ද්වාරය",
    cardNumberAria: "කාඩ්පත් අංකය",
    expiryAria: "කල් ඉකුත්වන දිනය",
    cvcAria: "CVC අංකය",
    payPrefix: "රු.",
    paySuffix: "ක් ආරක්ෂිතව ගෙවන්න →",
    bankStep1Prefix: "1. රු.",
    bankStep1Suffix: "ක් පහත ඕනෑම සිප්නැණ ගිණුමකට බැර කරන්න:",
    accNoLabel: "ගිණුම් අංකය:",
    copyBtn: "පිටපත්",
    accountNoCopySuffix: "ගිණුම් අංකය",
    bankStep2Label: "2. රිසිට්පත් යොමු අංකය (Reference)",
    bankStep2Placeholder: "උදා: BOC-2026-88412",
    bankStep3Label: "3. බැංකු රිසිට්පතේ ඡායාරූපය මෙතැනට දමන්න",
    choosePhotoBtn: "ඡායාරූපය හෝ PDF තෝරන්න",
    submitBankSlipBtn: "තහවුරු කිරීම සඳහා රිසිට්පත යොමු කරන්න →",
    copiedToastSuffix: "පිටපත් කෙරිණි!",
    enrollmentLinkLabel: "ලියාපදිංචි සබැඳිය",
    referenceLabel: "යොමු අංකය",
    downloadingReceiptToast: "නිල PDF රිසිට්පත බාගත වෙමින් පවතී...",
    modalCloseAria: "වසන්න",
    modalTitle: "බැංකු තැන්පතු රිසිට්පත උඩුගත කරන්න",
    modalSub: "බැංකු රිසිට්පත හෝ මාර්ගගත ගෙවීම් තිර ඡායාරූපය අමුණන්න",
    modalBankLabel: "බැංකුව / ගෙවීම් නාලිකාව තෝරන්න",
    modalRefLabel: "ගනුදෙනු / යොමු අංකය",
    modalRefPlaceholder: "උදා: BOC-1893201 හෝ FriMi-Ref",
    modalFileLabel: "රිසිට්පත් ඡායාරූපය හෝ PDF ගොනුව",
    modalFileSelected: "bank_slip_deposit_receipt.jpg (තෝරන ලදී)",
    modalFilePrompt: "ගොනුව තේරීමට හෝ ඡායාරූප ගැනීමට ක්ලික් කරන්න",
    modalFileHint: "JPEG, PNG හෝ PDF (10MB දක්වා)",
    modalCancelBtn: "අවලංගු කරන්න",
    modalSubmitBtn: "තහවුරු කිරීමට යොමු කරන්න",
  },
  ta: {
    localizedCourseTitle: "தரம் 8 விஞ்ஞானம்: முழு ஆண்டுப் பாடநெறி",
    localizedTerms: "தவணை 1, 2 & 3",
    checkSlipStatus: "ரசீது நிலையைப் பார்",
    classCardsLink: "வகுப்பு அட்டைகள்",
    shareWithParentBtn: "பெற்றோருடன் பகிர்",
    methodTabsAria: "கட்டண முறைத் தாவல்கள்",
    tabCardQr: "அட்டை / LankaQR",
    tabBankDeposit: "வங்கி வைப்பு / ரசீது பதிவேற்றம்",
    demoFailTrigger: '[மாதிரி: "கட்டணம் தோல்வியடைந்தது" திரையைச் சோதி]',
    scanWithApps:
      "FriMi, Genie, Solo, ComBank Q+, அல்லது BOC SmartPay மூலம் ஸ்கேன் செய்க",
    amountWord: "தொகை: ரூ.",
    instantActivation: "உடனடிச் செயலாக்கம்",
    confirmLankaQrBtn: "LankaQR கட்டணத்தை உறுதிப்படுத்துக →",
    encryptedGateway: "256-bit பாதுகாப்பான இலங்கைக் கட்டண நுழைவாயில்",
    cardNumberAria: "அட்டை எண்",
    expiryAria: "காலாவதித் திகதி",
    cvcAria: "CVC",
    payPrefix: "ரூ.",
    paySuffix: "பாதுகாப்பாகச் செலுத்துக →",
    bankStep1Prefix: "1. ரூ.",
    bankStep1Suffix: "ஐ எந்தவொரு சிப்நென கணக்கிலும் வைப்பிலிடவும்:",
    accNoLabel: "கணக்கு எண்:",
    copyBtn: "நகலெடு",
    accountNoCopySuffix: "கணக்கு எண்",
    bankStep2Label: "2. ரசீது குறிப்பு / பற்றுச்சீட்டு எண்",
    bankStep2Placeholder: "உ-ம்: BOC-2026-88412",
    bankStep3Label: "3. வங்கி ரசீதுப் படத்தை இங்கே இழுத்து விடவும்",
    choosePhotoBtn: "படம் அல்லது PDF ஐத் தேர்ந்தெடு",
    submitBankSlipBtn: "சரிபார்ப்புக்கு வங்கி ரசீதைச் சமர்ப்பிக்கவும் →",
    copiedToastSuffix: "நகலெடுக்கப்பட்டது!",
    enrollmentLinkLabel: "பதிவு இணைப்பு",
    referenceLabel: "குறிப்பு எண்",
    downloadingReceiptToast: "உத்தியோகபூர்வ PDF ரசீது பதிவிறக்கப்படுகிறது...",
    modalCloseAria: "மூடுக",
    modalTitle: "வங்கிப் பரிமாற்ற ரசீதைப் பதிவேற்றுக",
    modalSub: "வங்கிப் பற்றுச்சீட்டு அல்லது இணையக் கட்டணப் படத்தை இணைக்கவும்",
    modalBankLabel: "வங்கி / கட்டண முறையைத் தேர்ந்தெடுக்கவும்",
    modalRefLabel: "பரிவர்த்தனை / குறிப்பு எண்",
    modalRefPlaceholder: "உ-ம்: BOC-1893201 அல்லது FriMi-Ref",
    modalFileLabel: "ரசீதுப் படம் அல்லது PDF கோப்பு",
    modalFileSelected: "bank_slip_deposit_receipt.jpg (தேர்ந்தெடுக்கப்பட்டது)",
    modalFilePrompt: "கோப்பைத் தேர்ந்தெடுக்க அல்லது படம் பிடிக்க கிளிக் செய்க",
    modalFileHint: "10MB வரையான JPEG, PNG அல்லது PDF",
    modalCancelBtn: "ரத்து செய்",
    modalSubmitBtn: "சரிபார்ப்புக்குச் சமர்ப்பி",
  },
};

export const BANK_BRANCH_LABELS: Record<string, LocalizedText> = {
  "Colombo 07 Corporate Branch": {
    en: "Colombo 07 Corporate Branch",
    si: "කොළඹ 07 ආයතනික ශාඛාව",
    ta: "கொழும்பு 07 பெருநிறுவனக் கிளை",
  },
  "Nugegoda Super Branch": {
    en: "Nugegoda Super Branch",
    si: "නුගේගොඩ සුපිරි ශාඛාව",
    ta: "நுகேகொடை சிறப்புக் கிளை",
  },
  "Kandy City Centre Branch": {
    en: "Kandy City Centre Branch",
    si: "මහනුවර නගර මධ්‍ය ශාඛාව",
    ta: "கண்டி நகர மையக் கிளை",
  },
};

export const EXTRA_BANK_NAMES: Record<string, LocalizedText> = {
  "Bank of Ceylon (BOC)": {
    en: "Bank of Ceylon (BOC)",
    si: "ලංකා බැංකුව (BOC)",
    ta: "இலங்கை வங்கி (BOC)",
  },
  "Commercial Bank of Ceylon": {
    en: "Commercial Bank of Ceylon",
    si: "කොමර්ෂල් බැංකුව",
    ta: "கொமர்ஷல் வங்கி",
  },
  "Sampath Bank": {
    en: "Sampath Bank",
    si: "සම්පත් බැංකුව",
    ta: "சம்பத் வங்கி",
  },
  "People's Bank": {
    en: "People's Bank",
    si: "මහජන බැංකුව",
    ta: "மக்கள் வங்கி",
  },
  "FriMi / Nations Trust": {
    en: "FriMi / Nations Trust",
    si: "FriMi / නේෂන්ස් ට්‍රස්ට්",
    ta: "FriMi / நேஷன்ஸ் டிரஸ்ட்",
  },
  "Genie / Dialog Finance": {
    en: "Genie / Dialog Finance",
    si: "Genie / ඩයලොග් ෆිනෑන්ස්",
    ta: "Genie / டயலொக் பினான்ஸ்",
  },
};
