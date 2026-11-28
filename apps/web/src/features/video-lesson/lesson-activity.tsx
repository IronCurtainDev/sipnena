import type { AppLanguage } from "@/lib/language";
import type { CourseLessonCopy } from "./course-lesson-copy";
import {
  nextItemId,
  type AuthoredLessonView,
  type CourseLessonBundle,
} from "./course-lesson-model";
import { InlineQuizPlayer } from "./inline-quiz-player";
import { SectionQuizBanner } from "./section-quiz-banner";
import type { VideoLessonStrings } from "./strings";
import type { LessonPlaylistItem, PlaylistSection } from "./types";

export function LabPanel({
  kicker,
  title,
  prompt,
  className,
}: {
  kicker?: string;
  title: string;
  prompt: string;
  className: string;
}) {
  return (
    <section className={className}>
      <p className="text-sm font-semibold text-[var(--sn-primary)]">{kicker}</p>
      <h2 className="text-2xl font-bold text-[var(--sn-text-main)]">{title}</h2>
      <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
        {prompt}
      </p>
    </section>
  );
}

export function CourseInlineQuiz({
  activeLessonId,
  lang,
  authored,
  bundle,
  playlist,
  lessonCopy,
  onSelectLesson,
  onQuizCompleted,
  onToast,
}: {
  activeLessonId: string;
  lang: AppLanguage;
  authored?: AuthoredLessonView;
  bundle?: CourseLessonBundle;
  playlist: PlaylistSection[];
  lessonCopy?: CourseLessonCopy;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
  onQuizCompleted?: (
    score: number,
    total: number,
    passed: boolean,
    answers: Record<number, string>,
  ) => void;
  onToast: (msg: string) => void;
}) {
  return (
    <InlineQuizPlayer
      key={activeLessonId}
      quizId={activeLessonId}
      lang={lang}
      questions={
        authored?.kind === "quiz" ? (authored.questions ?? []) : undefined
      }
      introTitle={authored?.quizTitle}
      scoreLabel={lessonCopy?.scoreLabel}
      onQuizCompleted={(result, answers) =>
        onQuizCompleted?.(
          result.score,
          result.totalQuestions,
          result.isPassed,
          answers,
        )
      }
      onNextLesson={() => {
        if (!bundle) {
          onSelectLesson(
            activeLessonId === "quiz-sec2" ? "course-completed" : "les5",
          );
          return;
        }
        onSelectLesson(
          nextItemId(playlist, activeLessonId) ?? "course-completed",
        );
      }}
      onToast={onToast}
    />
  );
}

export function FollowQuizBanner({
  t,
  bundle,
  followQuiz,
  sampleDetail,
  onSelectLesson,
}: {
  t: VideoLessonStrings;
  bundle?: CourseLessonBundle;
  followQuiz: LessonPlaylistItem | null;
  sampleDetail: string;
  onSelectLesson: (id: string, isLocked?: boolean) => void;
}) {
  if (bundle && !followQuiz) return null;
  const authored = followQuiz ? bundle?.byId[followQuiz.id] : undefined;
  return (
    <SectionQuizBanner
      eyebrow={t.sectionQuizEyebrow}
      quizTitle={
        authored?.quizTitle ?? followQuiz?.titleKey ?? t.sectionQuizTitle
      }
      detail={followQuiz ? `${authored?.questions?.length ?? 0}` : sampleDetail}
      ctaLabel={t.sectionQuizCta}
      onTakeQuiz={() => onSelectLesson(followQuiz?.id ?? "quiz-sec2")}
    />
  );
}
