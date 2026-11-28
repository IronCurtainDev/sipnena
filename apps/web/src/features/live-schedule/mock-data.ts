import type { LocalizedText } from "@/lib/i18n-common";

export interface TimetableSession {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  time: string;
  subject: string;
  grade: number;
  localizedTopic: LocalizedText;
  teacher: string;
  localizedMedium: LocalizedText;
  channel: "Zoom Live" | "YouTube Live";
  isLiveNow?: boolean;
}

export interface RecordedSession {
  id: string;
  localizedTitle: LocalizedText;
  subject: string;
  teacher: string;
  grade: number;
  localizedRecordedOn: LocalizedText;
  localizedDuration: LocalizedText;
}

export const WEEKLY_TIMETABLE: TimetableSession[] = [];

export const PAST_RECORDINGS: RecordedSession[] = [];
