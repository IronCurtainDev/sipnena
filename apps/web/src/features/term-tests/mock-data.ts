import type { LocalizedText } from "@/lib/i18n-common";

export interface TermTestPack {
  id: string;
  term: "Term 1" | "Term 2" | "Term 3";
  localizedTitle: LocalizedText;
  subject: string;
  grade: number;
  province: string;
  school: string;
  localizedDuration: LocalizedText;
  difficulty: "Easy" | "Standard" | "Challenging";
  completed: boolean;
  paperLinkId: string;
}

export const PROVINCES: string[] = [];

export const LEADING_SCHOOLS: string[] = [];

export const TERM_TEST_PACKS: TermTestPack[] = [];
