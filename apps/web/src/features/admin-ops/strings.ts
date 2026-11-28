import type { AppLanguage } from "@/lib/language";

export interface AdminOpsCopy {
  paymentsPageTitle: string;
  openDeskBadge: string;
  opsGreeting: string;
  opsSub: string;
  kpiPendingLabel: string;
  kpiApprovedLabel: string;
  kpiRejectedLabel: string;
  kpiTotalValueLabel: string;
  tabAll: string;
  uploadsHeading: string;
  colStudentCourse: string;
  colBankRef: string;
  colAmount: string;
  colStatus: string;
  colActions: string;
  statusPending: string;
  statusApproved: string;
  statusRejected: string;
  slipBtn: string;
  approveBtn: string;
  rejectBtn: string;
  approvedToastPrefix: string;
  rejectedToastPrefix: string;
  rejectedToastSuffix: string;
  rejectReasonDefault: string;
  rejectReasonField: string;
  closePreviewAria: string;
  slipPreviewPrefix: string;
  verifiedStamp: string;
  payeeLine: string;
  depositorPrefix: string;
  refNoPrefix: string;
  amountLkrPrefix: string;
  rejectSlipModalBtn: string;
  approveUnlockModalBtn: string;
  syllabusPageTitle: string;
  treeBadge: string;
  syllabusHeading: string;
  newUnitPlaceholder: string;
  addUnitBtn: string;
  unitAddedToast: string;
  unitStatusToast: string;
  olSuffix: string;
  publishedBadge: string;
  draftBadge: string;
}

export const ADMIN_OPS_COPY: Record<AppLanguage, AdminOpsCopy> = {
  en: {
    paymentsPageTitle: "Admin Operations — Bank Slip Approval Queue",
    openDeskBadge: "SipNena Verification & Operations Lead",
    opsGreeting: "Payment verification desk",
    opsSub:
      "Review student/parent bank deposit receipts, approve enrollments, or flag illegible slips.",
    kpiPendingLabel: "Pending Review",
    kpiApprovedLabel: "Approved",
    kpiRejectedLabel: "Rejected",
    kpiTotalValueLabel: "Verified Total",
    tabAll: "All",
    uploadsHeading: "Bank Slip Queue",
    colStudentCourse: "Student & Course",
    colBankRef: "Bank & Ref",
    colAmount: "Amount",
    colStatus: "Status",
    colActions: "Actions",
    statusPending: "Pending",
    statusApproved: "Approved",
    statusRejected: "Rejected",
    slipBtn: "Inspect",
    approveBtn: "Approve",
    rejectBtn: "Reject",
    approvedToastPrefix: "Approved",
    rejectedToastPrefix: "Rejected",
    rejectedToastSuffix: "— student notified to re-upload",
    rejectReasonDefault:
      "Bank stamp or reference number illegible. Please re-upload full slip.",
    rejectReasonField: "Rejection Note (if rejecting)",
    closePreviewAria: "Close slip preview",
    slipPreviewPrefix: "Bank Slip Preview —",
    verifiedStamp: "VERIFIED STAMP",
    payeeLine: "PAYEE: SIPNENA EDUCATION (PVT) LTD",
    depositorPrefix: "DEPOSITOR:",
    refNoPrefix: "REF NO:",
    amountLkrPrefix: "AMOUNT: LKR",
    rejectSlipModalBtn: "Reject Slip",
    approveUnlockModalBtn: "Approve & Unlock",
    syllabusPageTitle: "Admin Operations — NIE Syllabus Manager",
    treeBadge: "Grades → Subjects → Terms → Units Tree View",
    syllabusHeading: "Sri Lankan National Syllabus Curriculum Tree",
    newUnitPlaceholder: "New G8 Science Term 2 unit...",
    addUnitBtn: "Add Unit",
    unitAddedToast: "Added new NIE syllabus unit to Grade 8 Science Term 2",
    unitStatusToast: "Updated unit publish status",
    olSuffix: " (G.C.E. O/L)",
    publishedBadge: "Published",
    draftBadge: "Draft",
  },
  si: {
    paymentsPageTitle: "පරිපාලක මෙහෙයුම් — බැංකු රිසිට්පත් අනුමැතිය",
    openDeskBadge: "සිප්නැණ ගෙවීම් සහ මෙහෙයුම් ප්‍රධානී",
    opsGreeting: "කමල් ජයසිංහ — කොළඹ ගෙවීම් තහවුරු කිරීමේ අංශය",
    opsSub:
      "බැංකු තැන්පතු රිසිට්පත් පරීක්ෂා කර අනුමත කිරීම හෝ පැහැදිලි රිසිට්පත් නැවත ඉල්ලා සිටීම මෙහි සිදු කරන්න.",
    kpiPendingLabel: "පරීක්ෂාවට නියමිත",
    kpiApprovedLabel: "අනුමත කළ",
    kpiRejectedLabel: "ප්‍රතික්ෂේප කළ",
    kpiTotalValueLabel: "තහවුරු කළ මුළු මුදල",
    tabAll: "සියල්ල",
    uploadsHeading: "බැංකු රිසිට්පත් පෝලිම",
    colStudentCourse: "ශිෂ්‍යයා සහ පාඨමාලාව",
    colBankRef: "බැංකුව සහ යොමු අංකය",
    colAmount: "මුදල",
    colStatus: "තත්ත්වය",
    colActions: "ක්‍රියාමාර්ග",
    statusPending: "පොරොත්තු",
    statusApproved: "අනුමතයි",
    statusRejected: "ප්‍රතික්ෂේපිතයි",
    slipBtn: "පරීක්ෂා",
    approveBtn: "අනුමත කරන්න",
    rejectBtn: "ප්‍රතික්ෂේප කරන්න",
    approvedToastPrefix: "අනුමත කෙරිණි:",
    rejectedToastPrefix: "ප්‍රතික්ෂේප කෙරිණි:",
    rejectedToastSuffix: "— නැවත උඩුගත කිරීමට සිසුවාට දැනුම් දෙන ලදී",
    rejectReasonDefault:
      "බැංකු මුද්‍රාව හෝ යොමු අංකය අපැහැදිලිය. සම්පූර්ණ රිසිට්පත නැවත උඩුගත කරන්න.",
    rejectReasonField: "ප්‍රතික්ෂේප කිරීමේ හේතුව",
    closePreviewAria: "රිසිට්පත් පෙරදසුන වසන්න",
    slipPreviewPrefix: "බැංකු රිසිට්පත් පෙරදසුන —",
    verifiedStamp: "තහවුරු මුද්‍රාව",
    payeeLine: "ලබන්නා: සිප්නැණ අධ්‍යාපන ආයතනය",
    depositorPrefix: "තැන්පත්කරු:",
    refNoPrefix: "යොමු අංකය:",
    amountLkrPrefix: "මුදල: රු.",
    rejectSlipModalBtn: "රිසිට්පත ප්‍රතික්ෂේප කරන්න",
    approveUnlockModalBtn: "අනුමත කර ප්‍රවේශය විවෘත කරන්න",
    syllabusPageTitle: "පරිපාලක මෙහෙයුම් — NIE විෂය නිර්දේශ කළමනාකරු",
    treeBadge: "ශ්‍රේණි → විෂයයන් → වාර → ඒකක ව්‍යුහය",
    syllabusHeading: "ශ්‍රී ලංකා ජාතික විෂය නිර්දේශ පද්ධතිය",
    newUnitPlaceholder: "8 ශ්‍රේණිය විද්‍යාව 2 වන වාර නව ඒකකය...",
    addUnitBtn: "ඒකකය එක් කරන්න",
    unitAddedToast: "8 ශ්‍රේණිය විද්‍යාව 2 වන වාරයට නව ඒකකය එක් කෙරිණි",
    unitStatusToast: "ඒකක ප්‍රකාශන තත්ත්වය යාවත්කාලීන කෙරිණි",
    olSuffix: " (අ.පො.ස. සා/පෙළ)",
    publishedBadge: "ප්‍රකාශිතයි",
    draftBadge: "කෙටුම්පත",
  },
  ta: {
    paymentsPageTitle: "நிர்வாகச் செயற்பாடுகள் — வங்கி ரசீது அங்கீகார வரிசை",
    openDeskBadge: "சிப்நென சரிபார்ப்பு & செயற்பாட்டுப் பிரிவு",
    opsGreeting: "கமல் ஜயசிங்க — கொழும்பு கட்டணச் சரிபார்ப்பு மையம்",
    opsSub:
      "மாணவர்/பெற்றோர் வங்கி வைப்பு ரசீதுகளைச் சரிபார்த்து அங்கீகரிக்கவும் அல்லது மீளக் கோரவும்.",
    kpiPendingLabel: "சரிபார்ப்பு நிலுவை",
    kpiApprovedLabel: "அங்கீகரிக்கப்பட்டவை",
    kpiRejectedLabel: "நிராகரிக்கப்பட்டவை",
    kpiTotalValueLabel: "சரிபார்த்த மொத்தம்",
    tabAll: "அனைத்தும்",
    uploadsHeading: "வங்கி ரசீது வரிசை",
    colStudentCourse: "மாணவர் & பாடநெறி",
    colBankRef: "வங்கி & குறிப்பு எண்",
    colAmount: "தொகை",
    colStatus: "நிலை",
    colActions: "செயல்கள்",
    statusPending: "நிலுவையில்",
    statusApproved: "அங்கீகரிக்கப்பட்டது",
    statusRejected: "நிராகரிக்கப்பட்டது",
    slipBtn: "ஆய்வு",
    approveBtn: "அங்கீகரி",
    rejectBtn: "நிராகரி",
    approvedToastPrefix: "அங்கீகரிக்கப்பட்டது:",
    rejectedToastPrefix: "நிராகரிக்கப்பட்டது:",
    rejectedToastSuffix: "— மீளப் பதிவேற்ற மாணவருக்கு அறிவிக்கப்பட்டது",
    rejectReasonDefault:
      "வங்கி முத்திரை அல்லது குறிப்பு எண் தெளிவற்றது. முழு ரசீதை மீளப் பதிவேற்றவும்.",
    rejectReasonField: "நிராகரிப்புக் காரணம்",
    closePreviewAria: "ரசீது முன்னோட்டத்தை மூடுக",
    slipPreviewPrefix: "வங்கி ரசீது முன்னோட்டம் —",
    verifiedStamp: "சரிபார்க்கப்பட்ட முத்திரை",
    payeeLine: "பெறுநர்: சிப்நென கல்வி நிறுவனம்",
    depositorPrefix: "வைப்பாளர்:",
    refNoPrefix: "குறிப்பு எண்:",
    amountLkrPrefix: "தொகை: ரூ.",
    rejectSlipModalBtn: "ரசீதை நிராகரி",
    approveUnlockModalBtn: "அங்கீகரித்துத் திற",
    syllabusPageTitle: "நிர்வாகச் செயற்பாடுகள் — NIE பாடத்திட்ட மேலாளர்",
    treeBadge: "தரங்கள் → பாடங்கள் → தவணைகள் → அலகுகள் கட்டமைப்பு",
    syllabusHeading: "இலங்கை தேசியப் பாடத்திட்டக் கிளை அமைப்பு",
    newUnitPlaceholder: "புதிய தரம் 8 விஞ்ஞானம் தவணை 2 அலகு...",
    addUnitBtn: "அலகைச் சேர்",
    unitAddedToast:
      "தரம் 8 விஞ்ஞானம் தவணை 2 இல் புதிய NIE அலகு சேர்க்கப்பட்டது",
    unitStatusToast: "அலகு வெளியீட்டு நிலை புதுப்பிக்கப்பட்டது",
    olSuffix: " (க.பொ.த. சா/த)",
    publishedBadge: "வெளியிடப்பட்டது",
    draftBadge: "வரைவு",
  },
};
