import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Monitor, Smartphone } from "lucide-react";
import { CompactLanguageSwitcher } from "@/components/app/compact-language-switcher";
import { SipNenaCourseDetailScreen } from "@/features/course-detail/screen";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { SipNenaVideoLessonScreen } from "@/features/video-lesson/screen";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";

export function TeacherCoursePreviewScreen() {
  const { courseId } = useParams({
    from: "/teacher/courses/$courseId/preview",
  });
  const [lang, setLang] = useSipNenaLanguage();
  const extra = BUILDER_EXTRA_COPY[lang];
  const [includeDrafts, setIncludeDrafts] = useState(true);
  const [viewMode, setViewMode] = useState<"lesson" | "course">("lesson");
  const [viewport, setViewport] = useState<"desktop" | "phone">("desktop");

  return (
    <div className="min-h-svh bg-[var(--sn-page-bg)] text-[var(--sn-text-main)]">
      <div className="sticky top-0 z-40 border-b border-amber-300 bg-amber-50 px-4 py-3 text-amber-950 shadow-xs sm:px-6 xl:px-8">
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/teacher/courses/$courseId"
              params={{ courseId }}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 text-sm font-bold text-[var(--sn-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{extra.backToBuilder}</span>
            </Link>
            <p className="text-sm font-bold" data-testid="preview-banner">
              {includeDrafts
                ? extra.previewBannerDrafts
                : extra.previewBannerPublished}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-amber-300 bg-white px-3 text-sm font-semibold">
              <input
                type="checkbox"
                checked={includeDrafts}
                onChange={(e) => setIncludeDrafts(e.target.checked)}
                className="h-4 w-4"
              />
              <span>{extra.includeDraftsLabel}</span>
            </label>

            <div className="inline-flex rounded-xl border border-amber-300 bg-white p-1">
              <button
                type="button"
                onClick={() => setViewMode("lesson")}
                className={`min-h-9 rounded-lg px-2.5 text-xs font-bold ${
                  viewMode === "lesson"
                    ? "bg-[var(--sn-primary)] text-white"
                    : "text-[var(--sn-text-main)]"
                }`}
              >
                {extra.viewLessonPlayer}
              </button>
              <button
                type="button"
                onClick={() => setViewMode("course")}
                className={`min-h-9 rounded-lg px-2.5 text-xs font-bold ${
                  viewMode === "course"
                    ? "bg-[var(--sn-primary)] text-white"
                    : "text-[var(--sn-text-main)]"
                }`}
              >
                {extra.viewCoursePage}
              </button>
            </div>

            <div className="hidden items-center rounded-xl border border-amber-300 bg-white p-1 md:inline-flex">
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                aria-label={extra.desktopFrame}
                className={`inline-flex min-h-9 items-center gap-1 rounded-lg px-2.5 text-xs font-bold ${
                  viewport === "desktop"
                    ? "bg-[var(--sn-primary)] text-white"
                    : "text-[var(--sn-text-main)]"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setViewport("phone")}
                aria-label={extra.phoneFrame}
                className={`inline-flex min-h-9 items-center gap-1 rounded-lg px-2.5 text-xs font-bold ${
                  viewport === "phone"
                    ? "bg-[var(--sn-primary)] text-white"
                    : "text-[var(--sn-text-main)]"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>390px</span>
              </button>
            </div>

            <CompactLanguageSwitcher
              selectedLang={lang}
              onLanguageChange={setLang}
            />
          </div>
        </div>
      </div>

      <div
        className={
          viewport === "phone"
            ? "mx-auto my-6 w-[390px] overflow-hidden rounded-[2rem] border-4 border-slate-800 shadow-2xl"
            : "w-full"
        }
      >
        {viewMode === "course" ? (
          <SipNenaCourseDetailScreen
            courseIdOverride={courseId}
            includeDrafts={includeDrafts}
          />
        ) : (
          <SipNenaVideoLessonScreen
            courseIdOverride={courseId}
            includeDrafts={includeDrafts}
          />
        )}
      </div>
    </div>
  );
}
