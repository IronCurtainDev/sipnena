import { BookMarked, GraduationCap } from "lucide-react";
import type { CompletionStrings } from "./strings.types";

interface CompletionSidebarWidgetsProps {
  strings: CompletionStrings;
  onFindNextCourse: () => void;
}

export function CompletionSidebarWidgets({
  strings,
  onFindNextCourse,
}: CompletionSidebarWidgetsProps) {
  return (
    <div className="space-y-6">
      {/* Notebook Update Widget */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <BookMarked className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {strings.notebookUpdatedTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {strings.notebookUpdatedDesc}
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
            />
            <span>Saved items:</span>
          </div>
          <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs text-slate-600">
            <li>Law of Reflection formula (\(i = r\))</li>
            <li>Plane mirror normal ray diagram</li>
            <li>Concave focal point derivation (\(f = R/2\))</li>
            <li>Checkpoint quiz review flashcards</li>
          </ul>
        </div>
      </div>

      {/* Teacher Mentor Praise */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--sn-sage)] text-[var(--sn-primary)] font-bold text-sm">
            MJ
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Ms. Menaka Jayawardena
            </h4>
            <p className="text-xs text-slate-500">
              Science Specialist • Colombo Educational Zone
            </p>
          </div>
        </div>
        <blockquote className="mt-3 rounded-2xl bg-[var(--sn-olive)]/50 p-3.5 text-xs italic leading-relaxed text-slate-700">
          &ldquo;සුබ පැතුම් කසුන්! Excellent perseverance. You have fully
          mastered the angle laws and ray constructions. Make sure to download
          your certificate and share your achievement with parents!&rdquo;
        </blockquote>
      </div>

      {/* Next Course Unit Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--sn-primary)]">
            Next in Syllabus
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
            Unlocked
          </span>
        </div>
        <h4 className="mt-2 text-sm font-bold text-slate-900">
          Unit 2: Curved Mirrors & Spherical Lenses
        </h4>
        <p className="mt-1 text-xs text-slate-500">
          8 Lessons • Real vs Virtual image formation for O/L readiness.
        </p>
        <button
          type="button"
          onClick={onFindNextCourse}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-olive)] py-2.5 text-xs font-semibold text-[var(--sn-text-main)] hover:bg-[var(--sn-sage)]"
        >
          <GraduationCap className="h-4 w-4" />
          <span>Start Unit 2</span>
        </button>
      </div>
    </div>
  );
}
