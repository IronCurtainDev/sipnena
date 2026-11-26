export interface ClassCardItem {
  id: string;
  title: string;
  teacher: string;
  type: "Monthly Class Card" | "Term Bundle";
  renewalDate: string;
  price: number;
  status: "Active" | "Expiring Soon";
}

export interface PaymentRecord {
  id: string;
  date: string;
  description: string;
  method: string;
  amount: number;
  receiptNo: string;
}

export const CLASS_CARDS: ClassCardItem[] = [
  {
    id: "card-sci-g8",
    title: "Grade 8 Science — Full Syllabus Card",
    teacher: "Ms. Menaka Jayawardena",
    type: "Monthly Class Card",
    renewalDate: "15 Dec 2026",
    price: 1500,
    status: "Active",
  },
  {
    id: "card-math-term2",
    title: "Term 2 Mathematics + Past Paper Clinic",
    teacher: "Mr. Anura Perera",
    type: "Term Bundle",
    renewalDate: "02 Dec 2026",
    price: 2200,
    status: "Expiring Soon",
  },
];

export const PAYMENT_HISTORY: PaymentRecord[] = [
  {
    id: "ph-1",
    date: "15 Nov 2026",
    description: "Grade 8 Science — November Class Card",
    method: "Sampath Bank (Slip)",
    amount: 1500,
    receiptNo: "SN-RCP-2026-9914",
  },
  {
    id: "ph-2",
    date: "02 Oct 2026",
    description: "Term 2 Mathematics + Past Paper Bundle",
    method: "LankaQR (FriMi)",
    amount: 2200,
    receiptNo: "SN-RCP-2026-8410",
  },
  {
    id: "ph-3",
    date: "05 Sep 2026",
    description: "Grade 8 ICT Coding Module",
    method: "Commercial Bank (Slip)",
    amount: 1200,
    receiptNo: "SN-RCP-2026-7102",
  },
];

export const VALID_VOUCHERS: Record<
  string,
  { label: string; discount: number }
> = {
  SIPNENA25: { label: "25% Term 2 Study Discount", discount: 375 },
  SCHOLAR50: { label: "50% Merit Scholarship Voucher", discount: 750 },
  OLPASS: { label: "Rs. 500 O/L Booster Credit", discount: 500 },
};
