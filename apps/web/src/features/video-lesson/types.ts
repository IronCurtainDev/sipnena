export interface LessonPlaylistItem {
  id: string;
  number: number;
  titleKey: string;
  duration: string;
  typeKey: string;
  isCompleted?: boolean;
  isNowPlaying?: boolean;
  isLocked?: boolean;
  iconType:
    "video" | "quiz" | "lab" | "assignment" | "reading" | "pdf" | "live";
  status?: "draft" | "scheduled" | "published";
}

export interface PlaylistSection {
  id: string;
  titleKey: string;
  statusBadgeKey: string;
  statusColor: "green" | "blue" | "gray";
  totalDuration?: string;
  lessons: LessonPlaylistItem[];
  status?: "draft" | "scheduled" | "published";
}

export interface RayTracingRule {
  num: number;
  titleKey: string;
  descriptionKey: string;
}
