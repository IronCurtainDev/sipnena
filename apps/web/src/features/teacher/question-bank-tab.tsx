import { useState, type ChangeEvent } from "react";
import { Upload } from "lucide-react";
import {
  makeLocalized,
  pickLocalized,
  updateCourseStore,
  upsertQuestionInBank,
  useCoursesStore,
  type Grade,
  type Question,
} from "@/data/courses";
import { formatGrade, formatSubject } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";

export function QuestionBankTab({
  lang,
  onToast,
}: {
  lang: AppLanguage;
  onToast: (msg: string) => void;
}) {
  const { store } = useCoursesStore();
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [newPrompt, setNewPrompt] = useState("");
  const [newOptA, setNewOptA] = useState("");
  const [newOptB, setNewOptB] = useState("");
  const [csvOpen, setCsvOpen] = useState(false);

  const filtered = store.questions.filter((q) => {
    if (subjectFilter !== "all" && q.subject !== subjectFilter) return false;
    if (gradeFilter !== "all" && String(q.grade) !== gradeFilter) return false;
    if (sourceFilter !== "all" && q.source !== sourceFilter) return false;
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return [q.prompt.en, q.prompt.si, q.prompt.ta, q.subject, q.nieUnitId]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const handleQuickAdd = () => {
    if (!newPrompt.trim() || !newOptA.trim() || !newOptB.trim()) return;
    upsertQuestionInBank({
      id: `q-${Date.now()}`,
      prompt: makeLocalized(newPrompt.trim()),
      options: [makeLocalized(newOptA.trim()), makeLocalized(newOptB.trim())],
      correctIndex: 0,
      explanation: makeLocalized("Check textbook summary."),
      subject: subjectFilter === "all" ? "Science" : subjectFilter,
      grade: Number(gradeFilter === "all" ? 8 : gradeFilter) as Grade,
      source: "teacher",
      difficulty: 2,
    });
    setNewPrompt("");
    setNewOptA("");
    setNewOptB("");
    onToast("Added question to bank");
  };

  const handleCsvUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const lines = reader.result.split(/\r?\n/).slice(1);
      const imported: Question[] = [];
      for (const line of lines) {
        const cols = line.split(",").map((c) => c.trim());
        if (cols.length < 4 || !cols[0]) continue;
        imported.push({
          id: `q-csv-${Date.now()}-${imported.length}`,
          prompt: makeLocalized(cols[0]),
          options: [cols[1], cols[2], cols[3], cols[4]]
            .filter(Boolean)
            .map((o) => makeLocalized(o!)),
          correctIndex: Math.max(0, Number(cols[5]) || 0),
          explanation: makeLocalized(cols[6] ?? ""),
          subject: cols[7] || "Science",
          grade: (Number(cols[8]) || 8) as Grade,
          source: "teacher",
          difficulty: 2,
        });
      }
      if (imported.length > 0) {
        updateCourseStore((prev) => ({
          ...prev,
          questions: [...imported, ...prev.questions],
        }));
        onToast(`Imported ${imported.length} question(s)`);
        setCsvOpen(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 sm:grid-cols-5">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="col-span-2 min-h-11 rounded-xl border border-[var(--sn-border)] px-3 text-sm"
        />
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm"
        >
          <option value="all">All Subjects</option>
          <option value="Science">Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="ICT">ICT</option>
        </select>
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm"
        >
          <option value="all">All Grades</option>
          {[6, 7, 8, 9, 10, 11].map((g) => (
            <option key={g} value={g}>
              {formatGrade(lang, g)}
            </option>
          ))}
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-2 text-sm"
        >
          <option value="all">All Sources</option>
          <option value="teacher">Teacher</option>
          <option value="past-paper">Past Paper</option>
          <option value="term-test">Term Test</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-cream)] p-4 sm:grid-cols-12">
        <input
          type="text"
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
          placeholder="Quick-add question prompt..."
          className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-white px-3 text-sm sm:col-span-5"
        />
        <input
          type="text"
          value={newOptA}
          onChange={(e) => setNewOptA(e.target.value)}
          placeholder="Correct option A"
          className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-white px-3 text-sm sm:col-span-2"
        />
        <input
          type="text"
          value={newOptB}
          onChange={(e) => setNewOptB(e.target.value)}
          placeholder="Distractor B"
          className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-white px-3 text-sm sm:col-span-2"
        />
        <div className="flex gap-2 sm:col-span-3">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="min-h-11 flex-1 rounded-xl bg-[var(--sn-primary)] px-3 text-xs font-bold text-white"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setCsvOpen((v) => !v)}
            className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-[var(--sn-border)] bg-white px-3 text-xs font-bold text-[var(--sn-primary)]"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {csvOpen ? (
        <div className="space-y-2 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4 text-sm">
          <p className="font-bold">
            CSV columns: prompt, optionA, optionB, optionC, optionD,
            correctIndex, explanation, subject, grade
          </p>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleCsvUpload}
          />
        </div>
      ) : null}

      <ul className="space-y-2">
        {filtered.map((q) => (
          <li
            key={q.id}
            className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[var(--sn-primary)]">
              <span>
                {formatGrade(lang, q.grade)} · {formatSubject(lang, q.subject)}{" "}
                {q.nieUnitId ? `· ${q.nieUnitId}` : ""}
              </span>
              <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5">
                {q.source} {q.sourceRef ? `(${q.sourceRef})` : ""}
              </span>
            </div>
            <p className="mt-1.5 text-base font-bold text-[var(--sn-text-main)]">
              {pickLocalized(q.prompt, lang)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
