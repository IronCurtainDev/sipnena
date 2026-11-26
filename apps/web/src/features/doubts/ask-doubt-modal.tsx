import { useState, type FormEvent } from "react";
import { Camera, Clock, Send, X } from "lucide-react";

interface AskDoubtModalProps {
  isOpen: boolean;
  defaultCourseId?: string;
  onClose: () => void;
  onSubmit: (payload: {
    subject: string;
    lessonTitle: string;
    timestampTag?: string;
    question: string;
    photoLabel?: string;
    courseId: string;
  }) => void;
}

const SAMPLE_PHOTOS = [
  "maths_geometry_sketch.jpg",
  "science_mirror_notebook.jpg",
  "past_paper_q3_photo.png",
];

export function AskDoubtModal({
  isOpen,
  defaultCourseId = "sci-g8-full",
  onClose,
  onSubmit,
}: AskDoubtModalProps) {
  const [subject, setSubject] = useState("Science");
  const [lessonTitle, setLessonTitle] = useState("Mirrors & Image Formation");
  const [timestampTag, setTimestampTag] = useState("08:15");
  const [question, setQuestion] = useState("");
  const [photoLabel, setPhotoLabel] = useState<string | undefined>(undefined);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSubmit({
      subject,
      lessonTitle: lessonTitle.trim() || "General Syllabus Question",
      timestampTag: timestampTag.trim() || undefined,
      question: question.trim(),
      photoLabel,
      courseId: defaultCourseId,
    });
    setQuestion("");
    setPhotoLabel(undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-doubt-title"
        className="relative w-full max-w-lg rounded-3xl border border-[var(--sn-border)] bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>

        <h3
          id="ask-doubt-title"
          className="text-lg font-extrabold text-[var(--sn-text-main)]"
        >
          Ask a Teacher Doubt
        </h3>
        <p className="text-xs text-[var(--sn-text-muted)]">
          Tag a lesson timestamp or attach a photo of your math/science
          exercise.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block text-xs font-bold text-[var(--sn-text-main)]">
              <span className="mb-1 block">Subject</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold"
              >
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="ICT">ICT</option>
                <option value="English">English</option>
                <option value="History">History</option>
              </select>
            </label>

            <label className="block text-xs font-bold text-[var(--sn-text-main)]">
              <span className="mb-1 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Lesson Timestamp Tag
              </span>
              <input
                type="text"
                value={timestampTag}
                onChange={(e) => setTimestampTag(e.target.value)}
                placeholder="e.g. 12:40"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
            </label>
          </div>

          <label className="block text-xs font-bold text-[var(--sn-text-main)]">
            <span className="mb-1 block">Lesson or Past Paper Topic</span>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
            />
          </label>

          <label className="block text-xs font-bold text-[var(--sn-text-main)]">
            <span className="mb-1 block">Your Question</span>
            <textarea
              rows={3}
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Explain where you got stuck (Sinhala, Tamil, or English)..."
              className="w-full rounded-xl border border-slate-200 p-3 text-xs"
            />
          </label>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Camera className="h-4 w-4 text-[var(--sn-primary)]" />
                <span>Attach Notebook / Question Photo (Optional)</span>
              </span>
              {photoLabel && (
                <button
                  type="button"
                  onClick={() => setPhotoLabel(undefined)}
                  className="text-[11px] font-bold text-rose-600"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {SAMPLE_PHOTOS.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setPhotoLabel(sample)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${
                    photoLabel === sample
                      ? "bg-[var(--sn-primary)] text-white"
                      : "border border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] py-2.5 text-xs font-bold text-white"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Doubt</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
