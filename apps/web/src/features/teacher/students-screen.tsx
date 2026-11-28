import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { AlertTriangle, Search, Users } from "lucide-react";
import {
  getCourseProgressPercent,
  getStudentLastActiveAt,
  getStudentQuizAttempts,
  pickLocalized,
  useCoursesStore,
} from "@/data/courses";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { formatGrade, formatMedium } from "@/lib/i18n-common";
import { StudentDetailDrawer } from "./student-detail-drawer";
import { StudentHeatmap } from "./student-heatmap";

function daysSince(iso: string | undefined): number {
  if (!iso) return 999;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

export function TeacherStudentsScreen() {
  const { courseId: routeCourseId } = useParams({ strict: false });
  const [lang, setLang] = useSipNenaLanguage();
  const { store } = useCoursesStore();
  const [courseFilter, setCourseFilter] = useState(
    routeCourseId ?? store.courses[0]?.id ?? "",
  );
  const [classFilter, setClassFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [mediumFilter, setMediumFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );

  const visibleStudents = store.students.filter((stu) => {
    if (gradeFilter !== "all" && String(stu.grade) !== gradeFilter)
      return false;
    if (mediumFilter !== "all" && stu.medium !== mediumFilter) return false;
    if (classFilter !== "all") {
      const cls = store.classes.find((c) => c.id === classFilter);
      if (!cls?.studentIds.includes(stu.id)) return false;
    }
    const q = query.trim().toLowerCase();
    if (q && !stu.name.toLowerCase().includes(q)) return false;
    return true;
  });

  const units = store.units
    .filter((u) => u.courseId === courseFilter)
    .sort((a, b) => a.order - b.order);

  const selectedStudent =
    store.students.find((s) => s.id === selectedStudentId) ?? null;

  const title =
    lang === "si"
      ? "සිසුන් සහ ප්‍රගතිය"
      : lang === "ta"
        ? "மாணவர்கள் & முன்னேற்றம்"
        : "Students & Progress Analytics";

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={title}
      roleOverride="teacher"
    >
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-cream)] p-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--sn-primary)]">
            {title}
          </h1>
          <p className="mt-1 text-sm text-[var(--sn-text-secondary)]">
            Click a student to view completed lessons, quiz scores, and doubts.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-sm font-bold text-[var(--sn-primary)]">
          <Users className="h-4 w-4" />
          {visibleStudents.length} students
        </span>
      </section>

      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 sm:grid-cols-5">
        <label className="relative col-span-2 flex items-center sm:col-span-1">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-[var(--sn-text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search student..."
            className="min-h-11 w-full rounded-xl border border-[var(--sn-border)] pl-9 pr-3 text-sm"
          />
        </label>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm"
        >
          {store.courses.map((c) => (
            <option key={c.id} value={c.id}>
              {pickLocalized(c.title, lang)}
            </option>
          ))}
        </select>
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm"
        >
          <option value="all">All classes</option>
          {store.classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm"
        >
          <option value="all">All grades</option>
          {[6, 7, 8, 9, 10, 11].map((g) => (
            <option key={g} value={g}>
              {formatGrade(lang, g)}
            </option>
          ))}
        </select>
        <select
          value={mediumFilter}
          onChange={(e) => setMediumFilter(e.target.value)}
          className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm"
        >
          <option value="all">All mediums</option>
          {(["si", "ta", "en"] as const).map((m) => (
            <option key={m} value={m}>
              {formatMedium(lang, m)}
            </option>
          ))}
        </select>
      </div>

      <section className="overflow-x-auto rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--sn-border)] text-xs uppercase text-[var(--sn-text-muted)]">
              <th className="py-2 pr-4">Student</th>
              <th className="py-2 pr-4">Grade / Medium</th>
              <th className="py-2 pr-4">Completed</th>
              <th className="py-2 pr-4">Avg Quiz</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--sn-border)]">
            {visibleStudents.map((stu) => {
              const prog = getCourseProgressPercent(
                store,
                stu.id,
                courseFilter,
              );
              const attempts = getStudentQuizAttempts(store, stu.id);
              const avgQuiz =
                attempts.length > 0
                  ? Math.round(
                      (attempts.reduce(
                        (s, a) => s + a.score / Math.max(1, a.total),
                        0,
                      ) /
                        attempts.length) *
                        100,
                    )
                  : null;
              const lastActive = getStudentLastActiveAt(store, stu.id);
              const inactiveDays = daysSince(lastActive);
              const atRisk =
                inactiveDays >= 7 || (avgQuiz !== null && avgQuiz < 50);

              return (
                <tr key={stu.id} className="hover:bg-[var(--sn-olive)]/30">
                  <td className="py-3 pr-4">
                    <button
                      type="button"
                      onClick={() => setSelectedStudentId(stu.id)}
                      className="min-h-11 font-bold text-[var(--sn-primary)] hover:underline"
                    >
                      {stu.name}
                    </button>
                  </td>
                  <td className="py-3 pr-4 text-[var(--sn-text-secondary)]">
                    {formatGrade(lang, stu.grade)} ·{" "}
                    {formatMedium(lang, stu.medium)}
                  </td>
                  <td className="py-3 pr-4 font-bold">{prog.percent}%</td>
                  <td className="py-3 pr-4 font-bold">
                    {avgQuiz !== null ? `${avgQuiz}%` : "—"}
                  </td>
                  <td className="py-3">
                    {atRisk ? (
                      <span
                        title={
                          inactiveDays >= 7
                            ? "Inactive for 7+ days"
                            : "Average quiz score below pass mark"
                        }
                        className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-950"
                      >
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>At-risk</span>
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-900">
                        On track
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <StudentHeatmap
        lang={lang}
        store={store}
        students={visibleStudents}
        units={units}
        onSelectStudent={setSelectedStudentId}
      />

      <StudentDetailDrawer
        lang={lang}
        student={selectedStudent}
        store={store}
        onClose={() => setSelectedStudentId(null)}
      />
    </SipNenaPortalShell>
  );
}
