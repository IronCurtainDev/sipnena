import type { AppLanguage } from "@/lib/language";

export interface CourseLessonCopy {
  emptyOverview: string;
  emptyNotes: string;
  emptyFiles: string;
  emptyPlaylist: string;
  labKicker: string;
  scoreLabel: string;
  lessonsTab: string;
}

export const COURSE_LESSON_COPY: Record<AppLanguage, CourseLessonCopy> = {
  en: {
    emptyOverview: "No overview for this lesson yet.",
    emptyNotes: "No revision notes for this lesson yet.",
    emptyFiles: "No files for this lesson yet.",
    emptyPlaylist: "This course has no lessons yet.",
    labKicker: "Lab activity",
    scoreLabel: "Correct",
    lessonsTab: "Lessons",
  },
  si: {
    emptyOverview: "මෙම පාඩමට තවම දළ විශ්ලේෂණයක් නැත.",
    emptyNotes: "මෙම පාඩමට තවම පුනරීක්ෂණ සටහන් නැත.",
    emptyFiles: "මෙම පාඩමට තවම ගොනු නැත.",
    emptyPlaylist: "මෙම පාඨමාලාවට තවම පාඩම් නැත.",
    labKicker: "රසායනාගාර ක්‍රියාකාරකම",
    scoreLabel: "නිවැරදි",
    lessonsTab: "පාඩම්",
  },
  ta: {
    emptyOverview: "இந்தப் பாடத்துக்கு இன்னும் மேலோட்டம் இல்லை.",
    emptyNotes: "இந்தப் பாடத்துக்கு இன்னும் மீள்பார்வைக் குறிப்புகள் இல்லை.",
    emptyFiles: "இந்தப் பாடத்துக்கு இன்னும் கோப்புகள் இல்லை.",
    emptyPlaylist: "இந்தப் பாடநெறியில் இன்னும் பாடங்கள் இல்லை.",
    labKicker: "ஆய்வுச் செயல்",
    scoreLabel: "சரி",
    lessonsTab: "பாடங்கள்",
  },
};
