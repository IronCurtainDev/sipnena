import {
  getCompletedLessonIds,
  pickLocalized,
  type CourseStoreState,
  type StudentAccount,
  type Unit,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";

interface StudentHeatmapProps {
  lang: AppLanguage;
  store: CourseStoreState;
  students: StudentAccount[];
  units: Unit[];
  onSelectStudent: (id: string) => void;
}

export function StudentHeatmap({
  lang,
  store,
  students,
  units,
  onSelectStudent,
}: StudentHeatmapProps) {
  if (units.length === 0 || students.length === 0) return null;

  return (
    <section className="space-y-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
      <h2 className="text-lg font-bold text-[var(--sn-text-main)]">
        {lang === "si"
          ? "ඒකක සම්පූර්ණ කිරීමේ වගුව"
          : lang === "ta"
            ? "அலகு நிறைவு அட்டவணை"
            : "Unit Completion Heatmap"}
      </h2>
      <div className="overflow-x-auto pb-2">
        <table className="min-w-full border-separate border-spacing-1 text-left text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-[var(--sn-surface)] px-3 py-2 font-bold text-[var(--sn-text-main)]">
                Student
              </th>
              {units.map((u) => (
                <th
                  key={u.id}
                  className="min-w-[110px] px-2 py-2 font-bold text-[var(--sn-text-muted)]"
                >
                  <span className="line-clamp-2">
                    {pickLocalized(u.title, lang)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => {
              const doneSet = new Set(getCompletedLessonIds(store, stu.id));

              return (
                <tr key={stu.id}>
                  <td className="sticky left-0 z-10 bg-[var(--sn-surface)] px-3 py-2 font-bold">
                    <button
                      type="button"
                      onClick={() => onSelectStudent(stu.id)}
                      className="min-h-10 text-left font-bold text-[var(--sn-primary)] hover:underline"
                    >
                      {stu.name}
                    </button>
                  </td>
                  {units.map((u) => {
                    const unitLessons = store.lessons.filter(
                      (l) => l.unitId === u.id,
                    );
                    const total = unitLessons.length;
                    const done = unitLessons.filter((l) =>
                      doneSet.has(l.id),
                    ).length;
                    const pct =
                      total > 0 ? Math.round((done / total) * 100) : 0;
                    const tone =
                      pct === 100
                        ? "bg-emerald-600 text-white"
                        : pct >= 50
                          ? "bg-emerald-100 text-emerald-900"
                          : pct > 0
                            ? "bg-amber-100 text-amber-900"
                            : "bg-slate-100 text-slate-600";

                    return (
                      <td key={u.id} className="px-2 py-1">
                        <span
                          className={`inline-flex min-h-9 w-full items-center justify-center rounded-lg px-2 font-bold ${tone}`}
                        >
                          {done}/{total} ({pct}%)
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
