import type { AppLanguage } from "@/lib/language";

export interface BillingCopy {
  billingPageTitle: string;
  activeCardsHeading: string;
  viewSlipStatusLink: string;
  nextRenewalPrefix: string;
  renewCardBtn: string;
  voucherHeading: string;
  voucherHintPrefix: string;
  voucherHintOr: string;
  voucherPlaceholder: string;
  applyVoucherBtn: string;
  voucherActivePrefix: string;
  voucherRemoveBtn: string;
  voucherInvalidToast: string;
  voucherAppliedToastPrefix: string;
  historyHeading: string;
  colDate: string;
  colCardBundle: string;
  colMethod: string;
  colAmount: string;
  colReceipt: string;
  viewReceiptBtn: string;
  downloadedPdfToastPrefix: string;
  printerToast: string;
  closeReceiptAria: string;
  officialReceiptBadge: string;
  receiptItemLabel: string;
  receiptDateLabel: string;
  receiptMethodLabel: string;
  receiptTotalLabel: string;
  downloadPdfBtn: string;
  printBtn: string;
  paymentStatusPageTitle: string;
  demoSwitcherLabel: string;
  statusPendingLabel: string;
  statusApprovedLabel: string;
  statusRejectedLabel: string;
  statusSwitchedToastPrefix: string;
  pendingTitle: string;
  pendingDesc: string;
  approvedTitle: string;
  approvedDesc: string;
  rejectedTitle: string;
  rejectedDefaultReason: string;
  rejectedSyncReason: string;
  courseCardLabel: string;
  bankFileLabel: string;
  refCodeLabel: string;
  amountLabel: string;
  reuploadSlipBtn: string;
  uploadAnotherSlipBtn: string;
  startStudyingBtn: string;
  whatsappDeskToast: string;
  whatsappSupportBtn: string;
}

export const BILLING_COPY: Record<AppLanguage, BillingCopy> = {
  en: {
    billingPageTitle: "Billing & Monthly Class Cards",
    activeCardsHeading: "Active Monthly Class Cards & Term Bundles",
    viewSlipStatusLink: "View Bank Slip Verification Status →",
    nextRenewalPrefix: "Next renewal:",
    renewCardBtn: "Renew Class Card",
    voucherHeading: "Redeem Promo Code or Scholarship Voucher",
    voucherHintPrefix: "Try sample codes:",
    voucherHintOr: "or",
    voucherPlaceholder: "Enter scholarship or promo code...",
    applyVoucherBtn: "Apply Voucher",
    voucherActivePrefix: "active —",
    voucherRemoveBtn: "Remove",
    voucherInvalidToast: "Try demo codes: SIPNENA25, SCHOLAR50, or OLPASS",
    voucherAppliedToastPrefix: "Applied voucher",
    historyHeading: "Payment History & Receipts",
    colDate: "Date",
    colCardBundle: "Class Card / Bundle",
    colMethod: "Method",
    colAmount: "Amount",
    colReceipt: "Receipt",
    viewReceiptBtn: "View Receipt",
    downloadedPdfToastPrefix: "Downloaded PDF:",
    printerToast: "Sent to printer preview",
    closeReceiptAria: "Close receipt modal",
    officialReceiptBadge: "OFFICIAL SIPNENA RECEIPT",
    receiptItemLabel: "Item",
    receiptDateLabel: "Paid Date",
    receiptMethodLabel: "Method",
    receiptTotalLabel: "Total Paid",
    downloadPdfBtn: "Download PDF",
    printBtn: "Print",
    paymentStatusPageTitle: "Payment Verification Status",
    demoSwitcherLabel: "Preview Verification State:",
    statusPendingLabel: "Pending Verification",
    statusApprovedLabel: "Approved",
    statusRejectedLabel: "Rejected (Re-upload)",
    statusSwitchedToastPrefix: "Status preview switched to:",
    pendingTitle: "Pending Verification",
    pendingDesc:
      "Our Colombo verification desk is checking your bank slip. Slips are verified within 15–30 minutes (8:00 AM – 9:00 PM).",
    approvedTitle: "Approved — Class Card Activated!",
    approvedDesc:
      "Your bank deposit was verified. Full Term 2 videos, tutes, and live classes are now unlocked.",
    rejectedTitle: "Rejected (Re-upload Required)",
    rejectedDefaultReason:
      "Reference number or stamp on the bank slip was blurry. Please upload a clear photo.",
    rejectedSyncReason:
      "Reference number partially cropped. Please re-upload a clearer photo of the full BOC slip.",
    courseCardLabel: "Course / Card",
    bankFileLabel: "Bank & File",
    refCodeLabel: "Reference Code",
    amountLabel: "Amount",
    reuploadSlipBtn: "Re-upload Bank Slip",
    uploadAnotherSlipBtn: "Upload Another Slip",
    startStudyingBtn: "Start Studying Now",
    whatsappDeskToast:
      "Opening WhatsApp Verification Desk (+94 77 123 4567)...",
    whatsappSupportBtn: "WhatsApp Support",
  },
  si: {
    billingPageTitle: "ගෙවීම් සහ මාසික පන්ති කාඩ්පත්",
    activeCardsHeading: "සක්‍රිය මාසික පන්ති කාඩ්පත් සහ වාර පැකේජ",
    viewSlipStatusLink: "බැංකු රිසිට්පත් තහවුරු තත්ත්වය බලන්න →",
    nextRenewalPrefix: "ඊළඟ අලුත් කිරීම:",
    renewCardBtn: "පන්ති කාඩ්පත අලුත් කරන්න",
    voucherHeading: "ප්‍රවර්ධන කේතය හෝ ශිෂ්‍යත්ව වවුචරය යොදන්න",
    voucherHintPrefix: "නියැදි කේත උත්සාහ කරන්න:",
    voucherHintOr: "හෝ",
    voucherPlaceholder: "ශිෂ්‍යත්ව හෝ ප්‍රවර්ධන කේතය ඇතුළත් කරන්න...",
    applyVoucherBtn: "වවුචරය යොදන්න",
    voucherActivePrefix: "සක්‍රියයි —",
    voucherRemoveBtn: "ඉවත් කරන්න",
    voucherInvalidToast:
      "නියැදි කේත උත්සාහ කරන්න: SIPNENA25, SCHOLAR50, හෝ OLPASS",
    voucherAppliedToastPrefix: "වවුචරය යොදන ලදී:",
    historyHeading: "ගෙවීම් ඉතිහාසය සහ රිසිට්පත්",
    colDate: "දිනය",
    colCardBundle: "පන්ති කාඩ්පත / පැකේජය",
    colMethod: "ක්‍රමය",
    colAmount: "මුදල",
    colReceipt: "රිසිට්පත",
    viewReceiptBtn: "රිසිට්පත බලන්න",
    downloadedPdfToastPrefix: "PDF බාගත කෙරිණි:",
    printerToast: "මුද්‍රණ පෙරදසුන වෙත යොමු කෙරිණි",
    closeReceiptAria: "රිසිට්පත් කවුළුව වසන්න",
    officialReceiptBadge: "නිල සිප්නැණ ගෙවීම් රිසිට්පත",
    receiptItemLabel: "විස්තරය",
    receiptDateLabel: "ගෙවූ දිනය",
    receiptMethodLabel: "ගෙවීම් ක්‍රමය",
    receiptTotalLabel: "මුළු ගෙවූ මුදල",
    downloadPdfBtn: "PDF බාගන්න",
    printBtn: "මුද්‍රණය කරන්න",
    paymentStatusPageTitle: "ගෙවීම් තහවුරු කිරීමේ තත්ත්වය",
    demoSwitcherLabel: "පෙරදසුන් තත්ත්ව මාරුව:",
    statusPendingLabel: "තහවුරු කිරීමට නියමිතයි",
    statusApprovedLabel: "අනුමත කෙරිණි",
    statusRejectedLabel: "ප්‍රතික්ෂේපිතයි (නැවත එවන්න)",
    statusSwitchedToastPrefix: "තත්ත්ව පෙරදසුන වෙනස් කෙරිණි:",
    pendingTitle: "තහවුරු කිරීමට නියමිතයි",
    pendingDesc:
      "අපගේ කොළඹ කණ්ඩායම ඔබේ බැංකු රිසිට්පත පරීක්ෂා කරමින් සිටී (පෙ.ව. 8:00 – ප.ව. 9:00 අතර මිනි. 15–30 කින් තහවුරු කෙරේ).",
    approvedTitle: "අනුමතයි — පන්ති කාඩ්පත සක්‍රිය කෙරිණි!",
    approvedDesc:
      "ඔබේ බැංකු තැන්පතුව තහවුරු කෙරිණි. 2 වන වාර වීඩියෝ, ටියුට් සහ සජීවී පන්ති දැන් විවෘතයි.",
    rejectedTitle: "ප්‍රතික්ෂේප විය (නැවත උඩුගත කිරීම අවශ්‍යයි)",
    rejectedDefaultReason:
      "බැංකු රිසිට්පතේ යොමු අංකය හෝ මුද්‍රාව අපැහැදිලි විය. කරුණාකර පැහැදිලි ඡායාරූපයක් එවන්න.",
    rejectedSyncReason:
      "BOC රිසිට්පතේ යොමු අංකය කොටසක් කැපී ගොස් ඇත. කරුණාකර සම්පූර්ණ පැහැදිලි රිසිට්පතක් එවන්න.",
    courseCardLabel: "පාඨමාලාව / කාඩ්පත",
    bankFileLabel: "බැංකුව සහ ගොනුව",
    refCodeLabel: "යොමු අංකය",
    amountLabel: "මුදල",
    reuploadSlipBtn: "බැංකු රිසිට්පත නැවත උඩුගත කරන්න",
    uploadAnotherSlipBtn: "තවත් රිසිට්පතක් උඩුගත කරන්න",
    startStudyingBtn: "දැන් පාඩම් ආරම්භ කරන්න",
    whatsappDeskToast:
      "WhatsApp ගෙවීම් තහවුරු කිරීමේ සේවාව විවෘත වේ (+94 77 123 4567)...",
    whatsappSupportBtn: "WhatsApp සහාය",
  },
  ta: {
    billingPageTitle: "கட்டணம் & மாதாந்த வகுப்பு அட்டைகள்",
    activeCardsHeading:
      "செயலில் உள்ள மாதாந்த வகுப்பு அட்டைகள் & தவணைப் பொதிகள்",
    viewSlipStatusLink: "வங்கி ரசீது சரிபார்ப்பு நிலையைப் பார் →",
    nextRenewalPrefix: "அடுத்த புதுப்பிப்பு:",
    renewCardBtn: "வகுப்பு அட்டையைப் புதுப்பிக்கவும்",
    voucherHeading:
      "சலுகைக் குறியீடு அல்லது புலமைப்பரிசில் வவுச்சரைப் பயன்படுத்துக",
    voucherHintPrefix: "மாதிரிக் குறியீடுகளை முயற்சிக்கவும்:",
    voucherHintOr: "அல்லது",
    voucherPlaceholder: "புலமைப்பரிசில் அல்லது சலுகைக் குறியீட்டை உள்ளிடுக...",
    applyVoucherBtn: "வவுச்சரைப் பயன்படுத்துக",
    voucherActivePrefix: "செயலில் —",
    voucherRemoveBtn: "நீக்குக",
    voucherInvalidToast:
      "மாதிரிக் குறியீடுகளை முயற்சிக்கவும்: SIPNENA25, SCHOLAR50, அல்லது OLPASS",
    voucherAppliedToastPrefix: "வவுச்சர் பயன்படுத்தப்பட்டது:",
    historyHeading: "கட்டண வரலாறு & ரசீதுகள்",
    colDate: "திகதி",
    colCardBundle: "வகுப்பு அட்டை / பொதி",
    colMethod: "முறை",
    colAmount: "தொகை",
    colReceipt: "ரசீது",
    viewReceiptBtn: "ரசீதைப் பார்",
    downloadedPdfToastPrefix: "PDF பதிவிறக்கப்பட்டது:",
    printerToast: "அச்சு முன்னோட்டத்திற்கு அனுப்பப்பட்டது",
    closeReceiptAria: "ரசீது சாளரத்தை மூடுக",
    officialReceiptBadge: "உத்தியோகபூர்வ சிப்நென ரசீது",
    receiptItemLabel: "விவரம்",
    receiptDateLabel: "செலுத்திய திகதி",
    receiptMethodLabel: "கட்டண முறை",
    receiptTotalLabel: "மொத்தத் தொகை",
    downloadPdfBtn: "PDF பதிவிறக்குக",
    printBtn: "அச்சிடுக",
    paymentStatusPageTitle: "கட்டணச் சரிபார்ப்பு நிலை",
    demoSwitcherLabel: "நிலை முன்னோட்டம்:",
    statusPendingLabel: "சரிபார்ப்பு நிலுவையில்",
    statusApprovedLabel: "அங்கீகரிக்கப்பட்டது",
    statusRejectedLabel: "நிராகரிக்கப்பட்டது (மீளப் பதிவேற்றவும்)",
    statusSwitchedToastPrefix: "நிலை முன்னோட்டம் மாற்றப்பட்டது:",
    pendingTitle: "சரிபார்ப்பு நிலுவையில்",
    pendingDesc:
      "எமது கொழும்பு சரிபார்ப்புக் குழு உங்கள் வங்கி ரசீதைச் சரிபார்க்கிறது (மு.ப. 8:00 – பி.ப. 9:00 க்குள் 15–30 நிமிடங்களில் சரிபார்க்கப்படும்).",
    approvedTitle: "அங்கீகரிக்கப்பட்டது — வகுப்பு அட்டை செயலாக்கப்பட்டது!",
    approvedDesc:
      "உங்கள் வங்கி வைப்பு சரிபார்க்கப்பட்டது. தவணை 2 வீடியோக்கள், டியூட்கள் மற்றும் நேரலை வகுப்புகள் இப்போது திறக்கப்பட்டுள்ளன.",
    rejectedTitle: "நிராகரிக்கப்பட்டது (மீளப் பதிவேற்றுவது அவசியம்)",
    rejectedDefaultReason:
      "வங்கி ரசீதில் உள்ள குறிப்பு எண் அல்லது முத்திரை தெளிவற்றதாக உள்ளது. தெளிவான படத்தைப் பதிவேற்றவும்.",
    rejectedSyncReason:
      "BOC ரசீது குறிப்பு எண் பகுதியாக வெட்டப்பட்டுள்ளது. முழு ரசீதின் தெளிவான படத்தைப் பதிவேற்றவும்.",
    courseCardLabel: "பாடநெறி / அட்டை",
    bankFileLabel: "வங்கி & கோப்பு",
    refCodeLabel: "குறிப்பு எண்",
    amountLabel: "தொகை",
    reuploadSlipBtn: "வங்கி ரசீதை மீளப் பதிவேற்றுக",
    uploadAnotherSlipBtn: "மற்றொரு ரசீதைப் பதிவேற்றுக",
    startStudyingBtn: "இப்போது கற்கத் தொடங்குங்கள்",
    whatsappDeskToast:
      "WhatsApp சரிபார்ப்புச் சேவை திறக்கப்படுகிறது (+94 77 123 4567)...",
    whatsappSupportBtn: "WhatsApp உதவி",
  },
};
