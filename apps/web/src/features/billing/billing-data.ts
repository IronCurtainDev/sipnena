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

export const CLASS_CARDS: ClassCardItem[] = [];
export const PAYMENT_HISTORY: PaymentRecord[] = [];
export const VALID_VOUCHERS: Record<
  string,
  { discount: number; localizedLabel: LocalizedText }
> = {};
