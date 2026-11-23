import { Check, GraduationCap } from "lucide-react";
import { AnimatedStudentsScene } from "@/components/app/animated-students-scene";
import type { PickSubjectsStrings } from "./strings";

interface Props {
  t: PickSubjectsStrings;
}

export function PickSubjectsHighlightCard({ t }: Props) {
  const highlights = [
    {
      title: t.hl_syllabus_title,
      desc: t.hl_syllabus_desc,
    },
    {
      title: t.hl_materials_title,
      desc: t.hl_materials_desc,
    },
    {
      title: t.hl_free_title,
      desc: t.hl_free_desc,
    },
  ];

  return (
    <aside
      aria-label="Study plan overview"
      className="hidden md:flex md:col-span-5 flex-col justify-between p-6 lg:p-7 bg-gradient-to-b from-slate-50 to-blue-50/40 border-b md:border-b-0 md:border-r border-slate-200"
    >
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-blue-100 text-blue-700">
          <GraduationCap className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{t.curriculumEyebrow}</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
            {t.heading}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-blue-600">
            {t.nativeSubheading}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t.desktopDescription}
        </p>

        <div className="pt-1">
          <AnimatedStudentsScene />
        </div>
      </div>

      <ul className="space-y-3 pt-4 border-t border-slate-200/80">
        {highlights.map((item) => (
          <li key={item.title} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-emerald-100 text-emerald-700"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <div className="space-y-0.5">
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                {item.title}
              </div>
              <p className="text-xs text-slate-600 leading-snug">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
