import { useState } from "react";
import { GraduationCap, Lightbulb, RefreshCw } from "lucide-react";
import { AnimatedStudentsScene } from "@/components/app/animated-students-scene";
import { SUBJECTS_CONFIG } from "@/features/pick-subjects/config";
import type { AppLanguage } from "@/lib/language";
import { STUDY_FACTS } from "./preparing-data";

interface Props {
  lang: AppLanguage;
  chosenSubjectIds: string[];
}

export function PreparingCardSidebar({ lang, chosenSubjectIds }: Props) {
  const [factIndex, setFactIndex] = useState(0);

  const activeSubjects = SUBJECTS_CONFIG.filter((s) =>
    chosenSubjectIds.includes(s.id),
  );

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % STUDY_FACTS.length);
  };

  const item = STUDY_FACTS[factIndex] ?? STUDY_FACTS[0]!;
  const currentFact = item[lang];

  return (
    <div className="md:col-span-5 space-y-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 pb-5 md:pb-0 md:pr-6">
      <div className="space-y-3">
        <AnimatedStudentsScene />

        {/* Selected Subject Pills */}
        <div className="space-y-1.5 pt-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>
              {lang === "si"
                ? "තෝරාගත් විෂයයන්"
                : lang === "ta"
                  ? "தேர்ந்தெடுக்கப்பட்ட பாடங்கள்"
                  : "Your selected subjects"}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeSubjects.map((sub) => {
              const Icon = sub.icon;
              return (
                <span
                  key={sub.id}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sub.tagBg}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sub.scriptLine.split(" • ")[0]}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Quick Study Tip Card */}
      <div className="rounded-2xl p-3.5 bg-amber-50/70 border border-amber-200/80 text-amber-950 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-amber-800">
          <span className="flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>
              {lang === "si"
                ? "දැනගැනීම සඳහා"
                : lang === "ta"
                  ? "பயனுள்ள குறிப்பு"
                  : "Quick Study Tip"}
            </span>
          </span>
          <button
            type="button"
            onClick={nextFact}
            aria-label="Next tip"
            className="p-1 rounded-lg hover:bg-amber-100 text-amber-700 transition-colors cursor-pointer flex items-center gap-1 text-xs"
          >
            <RefreshCw className="w-3 h-3" />
            <span>
              {lang === "si" ? "තව එකක්" : lang === "ta" ? "அடுத்தது" : "Next"}
            </span>
          </button>
        </div>
        <p className="text-xs leading-relaxed text-amber-900 font-medium">
          {currentFact}
        </p>
      </div>
    </div>
  );
}
