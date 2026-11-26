import { useState, type FormEvent } from "react";
import { CheckCircle2, Plus } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { usePrototypeState } from "@/lib/prototype-state";

export function TeacherQuizzesScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, update } = usePrototypeState();
  const { toast, showToast } = useToastMessage();

  const [quizTitle, setQuizTitle] = useState("Term 2 Past Paper Mini Quiz");
  const [subject, setSubject] = useState("Science");
  const [grade, setGrade] = useState(8);
  const [prompt, setPrompt] = useState("");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState("");

  const handleCreateQuiz = (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !optA.trim() || !optB.trim()) return;
    const newQuestion = {
      id: `q-${Date.now()}`,
      prompt: prompt.trim(),
      options: [
        optA.trim(),
        optB.trim(),
        optC.trim() || "None of the above",
        optD.trim() || "All of the above",
      ] as [string, string, string, string],
      correctIndex,
      explanation: explanation.trim() || "Review the unit summary note.",
    };

    update((prev) => ({
      ...prev,
      teacherQuizzes: [
        {
          id: `tq-${Date.now()}`,
          title: quizTitle.trim() || "New MCQ Quiz",
          subject,
          grade,
          questions: [newQuestion],
        },
        ...prev.teacherQuizzes,
      ],
    }));
    setPrompt("");
    setOptA("");
    setOptB("");
    setOptC("");
    setOptD("");
    setExplanation("");
    showToast("MCQ Quiz saved to student quizzes!");
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Teacher Studio — MCQ Quiz Builder"
      roleOverride="teacher"
      toastMessage={toast}
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <form
          onSubmit={handleCreateQuiz}
          className="space-y-3 rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs lg:col-span-6"
        >
          <h2 className="text-base font-extrabold text-[var(--sn-text-main)]">
            Build New MCQ Question &amp; Quiz
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="Quiz Title"
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs sm:col-span-2"
            />
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs"
            >
              <option value="Science">Science</option>
              <option value="Mathematics">Maths</option>
              <option value="ICT">ICT</option>
              <option value="History">History</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span>Grade:</span>
            {[6, 7, 8, 9, 10, 11].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGrade(g)}
                className={`rounded-lg px-2.5 py-1 ${
                  grade === g
                    ? "bg-[var(--sn-primary)] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <textarea
            rows={2}
            required
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter MCQ question prompt..."
            className="w-full rounded-xl border border-slate-200 p-3 text-xs"
          />

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { val: optA, set: setOptA, label: "Option A", idx: 0 },
              { val: optB, set: setOptB, label: "Option B", idx: 1 },
              { val: optC, set: setOptC, label: "Option C", idx: 2 },
              { val: optD, set: setOptD, label: "Option D", idx: 3 },
            ].map((opt) => (
              <div
                key={opt.label}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-2.5 py-1.5"
              >
                <input
                  type="radio"
                  name="correctOption"
                  checked={correctIndex === opt.idx}
                  onChange={() => setCorrectIndex(opt.idx)}
                  aria-label={`Mark ${opt.label} correct`}
                />
                <input
                  type="text"
                  required={opt.idx < 2}
                  value={opt.val}
                  onChange={(e) => opt.set(e.target.value)}
                  placeholder={opt.label}
                  className="w-full text-xs focus:outline-none"
                />
              </div>
            ))}
          </div>

          <input
            type="text"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Marking explanation shown after student answers..."
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
          />

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] py-2.5 text-xs font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            <span>Publish MCQ Quiz</span>
          </button>
        </form>

        <section className="space-y-3 lg:col-span-6">
          <h2 className="text-base font-extrabold text-[var(--sn-text-main)]">
            Published MCQ Quizzes ({state.teacherQuizzes.length})
          </h2>
          {state.teacherQuizzes.map((quiz) => (
            <article
              key={quiz.id}
              className="rounded-3xl border border-[var(--sn-border)] bg-white p-4 shadow-xs"
            >
              <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--sn-primary)]">
                Grade {quiz.grade} • {quiz.subject} • {quiz.questions.length} Qs
              </span>
              <h3 className="mt-2 text-sm font-extrabold text-[var(--sn-text-main)]">
                {quiz.title}
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs text-[var(--sn-text-secondary)]">
                {quiz.questions.map((q) => (
                  <li key={q.id} className="rounded-xl bg-slate-50 p-2.5">
                    <p className="font-bold text-[var(--sn-text-main)]">
                      {q.prompt}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Correct: {q.options[q.correctIndex]}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </SipNenaPortalShell>
  );
}
