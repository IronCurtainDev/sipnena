import React, { useState } from "react";
import { Star, X, Check, ThumbsUp } from "lucide-react";
import type { CompletionStrings } from "./strings.types";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  strings: CompletionStrings;
}

const TAG_OPTIONS = [
  "Clear ray diagrams (පැහැදිලි කිරණ සටහන්)",
  "Simple language (සරල පැහැදිලි කිරීම්)",
  "Helpful teacher tips (ගුරු උපදෙස්)",
  "Fun checkpoint quizzes (විනෝදජනක ප්‍රශ්න)",
  "Exam focused (විභාගයට උදවු)",
];

export function RatingModal({ isOpen, onClose, strings }: RatingModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Clear ray diagrams (පැහැදිලි කිරණ සටහන්)",
    "Simple language (සරල පැහැදිලි කිරීම්)",
  ]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex w-full max-w-lg flex-col rounded-3xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95 duration-200">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              ස්තූතියි, කසුන්! Thank you!
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Your feedback helps your teachers improve upcoming lessons.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                <ThumbsUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {strings.ratingModalTitle}
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                {strings.ratingModalPrompt}
              </p>
            </div>

            {/* Star Selector */}
            <div className="flex items-center justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled =
                  hoverRating > 0 ? star <= hoverRating : star <= rating;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    aria-label={`${star} star`}
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        filled
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-100 text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Quick Tag Pills */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                What did you like best? (ඔබ වඩාත් කැමති වූ කරුණු)
              </p>
              <div className="flex flex-wrap gap-2">
                {TAG_OPTIONS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        isSelected
                          ? "bg-[var(--sn-primary)] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional note */}
            <div>
              <label
                htmlFor="feedback-comment"
                className="mb-1 block text-xs font-medium text-slate-700"
              >
                Note for Teacher Menaka (ගුරුතුමියට පණිවිඩයක් - විකල්ප)
              </label>
              <textarea
                id="feedback-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="I really understood concave mirror reflections clearly!"
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[var(--sn-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--sn-primary)]"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-[var(--sn-primary)] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--sn-primary-hover)]"
            >
              {strings.submitFeedback}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
