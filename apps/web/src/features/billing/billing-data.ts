import type { LocalizedText } from "@/lib/i18n-common";

export interface ClassCardItem {
  id: string;
  localizedTitle: LocalizedText;
  teacher: string;
  localizedType: LocalizedText;
  localizedRenewalDate: LocalizedText;
  price: number;
  statusKey: "Active" | "Expiring Soon";
  localizedStatus: LocalizedText;
}

export interface PaymentRecord {
  id: string;
  localizedDate: LocalizedText;
  localizedDescription: LocalizedText;
  localizedMethod: LocalizedText;
  amount: number;
  receiptNo: string;
}

export const CLASS_CARDS: ClassCardItem[] = [
  {
    id: "card-sci-g8",
    localizedTitle: {
      en: "Grade 8 Science — Full Syllabus Card",
      si: "8 ශ්‍රේණිය විද්‍යාව — සම්පූර්ණ විෂය නිර්දේශ කාඩ්පත",
      ta: "தரம் 8 விஞ்ஞானம் — முழுப் பாடத்திட்ட அட்டை",
    },
    teacher: "Ms. Menaka Jayawardena",
    localizedType: {
      en: "Monthly Class Card",
      si: "මාසික පන්ති කාඩ්පත",
      ta: "மாதாந்த வகுப்பு அட்டை",
    },
    localizedRenewalDate: {
      en: "15 Dec 2026",
      si: "2026 දෙසැ. 15",
      ta: "15 டிச. 2026",
    },
    price: 1500,
    statusKey: "Active",
    localizedStatus: { en: "Active", si: "සක්‍රියයි", ta: "செயலில்" },
  },
  {
    id: "card-math-term2",
    localizedTitle: {
      en: "Term 2 Mathematics + Past Paper Clinic",
      si: "2 වන වාර ගණිතය + පසුගිය ප්‍රශ්න පත්‍ර පන්තිය",
      ta: "தவணை 2 கணிதம் + கடந்த கால வினாத்தாள் பயிற்சி",
    },
    teacher: "Mr. Anura Perera",
    localizedType: { en: "Term Bundle", si: "වාර පැකේජය", ta: "தவணைப் பொதி" },
    localizedRenewalDate: {
      en: "02 Dec 2026",
      si: "2026 දෙසැ. 02",
      ta: "02 டிச. 2026",
    },
    price: 2200,
    statusKey: "Expiring Soon",
    localizedStatus: {
      en: "Expiring Soon",
      si: "ළඟදී කල් ඉකුත් වේ",
      ta: "விரைவில் காலாவதியாகிறது",
    },
  },
];

export const PAYMENT_HISTORY: PaymentRecord[] = [
  {
    id: "ph-1",
    localizedDate: {
      en: "15 Nov 2026",
      si: "2026 නොවැ. 15",
      ta: "15 நவ. 2026",
    },
    localizedDescription: {
      en: "Grade 8 Science — November Class Card",
      si: "8 ශ්‍රේණිය විද්‍යාව — නොවැම්බර් පන්ති කාඩ්පත",
      ta: "தரம் 8 விஞ்ஞானம் — நவம்பர் வகுப்பு அட்டை",
    },
    localizedMethod: {
      en: "Sampath Bank (Slip)",
      si: "සම්පත් බැංකුව (රිසිට්පත)",
      ta: "சம்பத் வங்கி (ரசீது)",
    },
    amount: 1500,
    receiptNo: "SN-RCP-2026-9914",
  },
  {
    id: "ph-2",
    localizedDate: {
      en: "02 Oct 2026",
      si: "2026 ඔක්. 02",
      ta: "02 அக். 2026",
    },
    localizedDescription: {
      en: "Term 2 Mathematics + Past Paper Bundle",
      si: "2 වන වාර ගණිතය + පසුගිය ප්‍රශ්න පත්‍ර පැකේජය",
      ta: "தவணை 2 கணிதம் + கடந்த கால வினாத்தாள் பொதி",
    },
    localizedMethod: {
      en: "LankaQR (FriMi)",
      si: "LankaQR (FriMi)",
      ta: "LankaQR (FriMi)",
    },
    amount: 2200,
    receiptNo: "SN-RCP-2026-8410",
  },
  {
    id: "ph-3",
    localizedDate: {
      en: "05 Sep 2026",
      si: "2026 සැප්. 05",
      ta: "05 செப். 2026",
    },
    localizedDescription: {
      en: "Grade 8 ICT Coding Module",
      si: "8 ශ්‍රේණිය ICT කේතන මොඩියුලය",
      ta: "தரம் 8 ICT குறியீட்டு அலகு",
    },
    localizedMethod: {
      en: "Commercial Bank (Slip)",
      si: "කොමර්ෂල් බැංකුව (රිසිට්පත)",
      ta: "கொமர்ஷல் வங்கி (ரசீது)",
    },
    amount: 1200,
    receiptNo: "SN-RCP-2026-7102",
  },
];

export const VALID_VOUCHERS: Record<
  string,
  { localizedLabel: LocalizedText; discount: number }
> = {
  SIPNENA25: {
    localizedLabel: {
      en: "25% Term 2 Study Discount",
      si: "25% 2 වන වාර අධ්‍යයන වට්ටම",
      ta: "25% தவணை 2 கற்றல் தள்ளுபடி",
    },
    discount: 375,
  },
  SCHOLAR50: {
    localizedLabel: {
      en: "50% Merit Scholarship Voucher",
      si: "50% කුසලතා ශිෂ්‍යත්ව වවුචරය",
      ta: "50% திறமைப் புலமைப்பரிசில் வவுச்சர்",
    },
    discount: 750,
  },
  OLPASS: {
    localizedLabel: {
      en: "Rs. 500 O/L Booster Credit",
      si: "රු. 500 සා/පෙළ දිරිගැන්වීමේ වට්ටම",
      ta: "ரூ. 500 சா/த ஊக்குவிப்புக் கழிவு",
    },
    discount: 500,
  },
};
