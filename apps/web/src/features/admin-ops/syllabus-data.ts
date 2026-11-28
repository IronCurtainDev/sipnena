import type { LocalizedText } from "@/lib/i18n-common";

export interface SyllabusUnitNode {
  id: string;
  localizedTitle: LocalizedText;
  published: boolean;
}

export interface SyllabusGradeNode {
  grade: number;
  subjects: Array<{
    id: string;
    localizedName: LocalizedText;
    terms: Array<{
      term: "Term 1" | "Term 2" | "Term 3";
      units: SyllabusUnitNode[];
    }>;
  }>;
}

export const INITIAL_SYLLABUS_TREE: SyllabusGradeNode[] = [];
