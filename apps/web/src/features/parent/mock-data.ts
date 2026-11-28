import type { LocalizedText } from "@/lib/i18n-common";

export interface ParentChildProfile {
  id: string;
  localizedName: LocalizedText;
  grade: number;
  localizedMedium: LocalizedText;
  localizedSchool: LocalizedText;
  localizedWatchTime: LocalizedText;
  lessonsCompletedWeek: number;
  liveAttendancePct: number;
  localizedCardTitle: LocalizedText;
  localizedRenewalDate: LocalizedText;
  recentQuizzes: Array<{
    id: string;
    subject: string;
    localizedTitle: LocalizedText;
    scorePct: number;
    localizedDate: LocalizedText;
  }>;
  examAlerts: Array<{
    id: string;
    localizedTitle: LocalizedText;
    localizedDateLabel: LocalizedText;
    urgency: "high" | "normal";
  }>;
}

/** Children come from linked localStorage students — none by default. */
export const PARENT_CHILDREN: ParentChildProfile[] = [];
