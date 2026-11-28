import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, FileText, ImagePlus, Send } from "lucide-react";
import {
  getLatestSubmission,
  resolveActiveStudentId,
  submitStudentAssignment,
  useCoursesStore,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";

interface AssignmentLessonPanelProps {
  lessonId: string;
  courseId: string;
  title: string;
  instructions: string;
  dueAt?: string;
  maxScore: number;
  submissionMode?: "both" | "text_only" | "image_only";
  lang: AppLanguage;
  onToast: (msg: string) => void;
}

const COPY: Record<
  AppLanguage,
  {
    kicker: string;
    dueLabel: string;
    maxScoreLabel: string;
    answerLabel: string;
    answerPlaceholder: string;
    attachPhoto: string;
    submitBtn: string;
    updateBtn: string;
    editAgainBtn: string;
    submittedBanner: string;
    gradedLabel: string;
    teacherNoteLabel: string;
  }
> = {
  en: {
    kicker: "Lesson Assignment",
    dueLabel: "Due",
    maxScoreLabel: "Marks",
    answerLabel: "Your written answer or explanation",
    answerPlaceholder: "Write your steps, observations, or key points here...",
    attachPhoto: "Attach notebook photo (optional)",
    submitBtn: "Submit assignment",
    updateBtn: "Update submission",
    editAgainBtn: "Edit answer",
    submittedBanner: "Submitted to your teacher",
    gradedLabel: "Teacher Score",
    teacherNoteLabel: "Teacher comment",
  },
  si: {
    kicker: "පාඩම් පැවරුම",
    dueLabel: "භාරදිය යුතු දිනය",
    maxScoreLabel: "ලකුණු",
    answerLabel: "ඔබේ පිළිතුර හෝ පැහැදිලි කිරීම",
    answerPlaceholder: "ඔබේ පියවර, නිරීක්ෂණ හෝ සාරාංශය මෙහි ලියන්න...",
    attachPhoto: "අභ්‍යාස පොතේ ඡායාරූපයක් එක් කරන්න (විකල්ප)",
    submitBtn: "පැවරුම භාර දෙන්න",
    updateBtn: "භාරදීම යාවත්කාලීන කරන්න",
    editAgainBtn: "පිළිතුර සංස්කරණය",
    submittedBanner: "ගුරුවරයා වෙත යොමු කරන ලදී",
    gradedLabel: "ගුරුවරයා දුන් ලකුණු",
    teacherNoteLabel: "ගුරුවරයාගේ සටහන",
  },
  ta: {
    kicker: "பாட ஒப்படைப்பு",
    dueLabel: "கடைசித் திகதி",
    maxScoreLabel: "மதிப்பெண்கள்",
    answerLabel: "உங்கள் பதில் அல்லது விளக்கம்",
    answerPlaceholder: "உங்கள் படிகள் அல்லது சுருக்கத்தை இங்கே எழுதவும்...",
    attachPhoto: "பயிற்சிப் புத்தகப் படம் இணைக்கவும் (விருப்பம்)",
    submitBtn: "ஒப்படைப்பைச் சமர்ப்பி",
    updateBtn: "சமர்ப்பிப்பைப் புதுப்பி",
    editAgainBtn: "பதிலைத் திருத்து",
    submittedBanner: "ஆசிரியரிடம் சமர்ப்பிக்கப்பட்டது",
    gradedLabel: "ஆசிரியர் மதிப்பெண்",
    teacherNoteLabel: "ஆசிரியர் கருத்து",
  },
};

export function AssignmentLessonPanel({
  lessonId,
  courseId,
  title,
  instructions,
  dueAt,
  maxScore,
  submissionMode = "both",
  lang,
  onToast,
}: AssignmentLessonPanelProps) {
  const t = COPY[lang];
  const { store } = useCoursesStore();
  const studentId = resolveActiveStudentId(store.activeStudentId);
  const latestSubmission = getLatestSubmission(store, lessonId, studentId);
  const isGraded = Boolean(latestSubmission?.gradedAt);
  const [editing, setEditing] = useState(!latestSubmission);
  const [textAnswer, setTextAnswer] = useState(latestSubmission?.text ?? "");
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(
    latestSubmission?.imageDataUrl,
  );

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!textAnswer.trim() && !imageDataUrl) return;
    submitStudentAssignment({
      lessonId,
      courseId,
      studentId,
      textAnswer,
      maxScore,
      imageDataUrl,
    });
    setEditing(false);
    onToast(t.submittedBanner);
  };

  return (
    <section className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sn-olive)] px-3 py-1 text-xs font-bold text-[var(--sn-primary)]">
          <FileText className="h-4 w-4" aria-hidden="true" />
          {t.kicker}
        </span>
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--sn-text-muted)]">
          <span>
            {t.maxScoreLabel}: {maxScore}
          </span>
          {dueAt ? (
            <span>
              {t.dueLabel}: {dueAt.slice(0, 10)}
            </span>
          ) : null}
        </div>
      </div>

      <h2 className="text-xl font-bold text-[var(--sn-text-main)]">{title}</h2>
      <p className="text-base leading-relaxed text-[var(--sn-text-secondary)]">
        {instructions}
      </p>

      {isGraded ? (
        <div className="space-y-1.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
          <p className="font-bold">
            {t.gradedLabel}: {latestSubmission?.score ?? 0} / {maxScore}
          </p>
          {latestSubmission?.teacherComment ? (
            <p>
              <span className="font-semibold">{t.teacherNoteLabel}: </span>
              {latestSubmission.teacherComment}
            </p>
          ) : null}
        </div>
      ) : latestSubmission && !editing ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{t.submittedBanner}</span>
          </span>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="min-h-10 rounded-xl border border-emerald-300 bg-white px-3 text-xs font-bold text-emerald-950"
          >
            {t.editAgainBtn}
          </button>
        </div>
      ) : null}

      {!isGraded && editing ? (
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          {submissionMode !== "image_only" ? (
            <label className="block space-y-1.5">
              <span className="text-sm font-bold text-[var(--sn-text-main)]">
                {t.answerLabel}
              </span>
              <textarea
                rows={4}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder={t.answerPlaceholder}
                className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-3 text-base text-[var(--sn-text-main)] focus:bg-[var(--sn-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
              />
            </label>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            {submissionMode !== "text_only" ? (
              <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3.5 text-sm font-semibold text-[var(--sn-text-main)] hover:bg-[var(--sn-olive)]">
                <ImagePlus
                  className="h-4 w-4 text-[var(--sn-primary)]"
                  aria-hidden="true"
                />
                <span>{t.attachPhoto}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="sr-only"
                />
              </label>
            ) : (
              <span />
            )}

            <button
              type="submit"
              disabled={
                submissionMode === "image_only"
                  ? !imageDataUrl
                  : submissionMode === "text_only"
                    ? !textAnswer.trim()
                    : !textAnswer.trim() && !imageDataUrl
              }
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--sn-primary)] px-5 text-sm font-bold text-[var(--sn-cream)] transition hover:bg-[var(--sn-primary-hover)] disabled:opacity-50"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>{latestSubmission ? t.updateBtn : t.submitBtn}</span>
            </button>
          </div>

          {imageDataUrl ? (
            <img
              src={imageDataUrl}
              alt="Submitted work"
              className="max-h-56 rounded-xl border border-[var(--sn-border)] object-contain"
            />
          ) : null}
        </form>
      ) : null}

      {!isGraded && !editing && latestSubmission?.imageDataUrl ? (
        <img
          src={latestSubmission.imageDataUrl}
          alt="Submitted work"
          className="max-h-56 rounded-xl border border-[var(--sn-border)] object-contain"
        />
      ) : null}
    </section>
  );
}
