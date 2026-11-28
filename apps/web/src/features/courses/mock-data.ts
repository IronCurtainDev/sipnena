export type CourseMedium = "si" | "ta" | "en";
export type PriceFilter = "all" | "free" | "paid";
export type SortOption = "popular" | "lessons";

export interface CourseItem {
  id: string;
  key:
    | "humanBody"
    | "opticsMirrors"
    | "plantNutrition"
    | "matterReactions"
    | "dynamic";
  grade: string;
  medium: CourseMedium;
  isFree: boolean;
  price: string | null;
  videosCount: number;
  lessonsCount: number;
  unitsCount?: number;
  hours: string;
  rating: string;
  reviews: number;
  teacher: string;
  teacherInitials: string;
  avatarClass: string;
  unitKey:
    | "unit_lifeProcesses"
    | "unit_wavesOptics"
    | "unit_plantBiology"
    | "unit_chemistryMatter";
  mediumBadgeKey: "mediumSinhala" | "mediumTamil" | "mediumEnglish";
  popularRank: number;
  title?: string;
  desc?: string;
  unitLabel?: string;
  mediumLabel?: string;
  mediumDesktopLabel?: string;
  isAssigned?: boolean;
  progressPercent?: number;
  searchBlob?: string;
  coverImageUrl?: string;
}

export const GRADES = ["6", "7", "8", "9", "10", "11"] as const;
