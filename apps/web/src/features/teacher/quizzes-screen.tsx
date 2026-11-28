import { useMemo, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import {
  addLessonToUnit,
  makeLocalized,
  saveQuizRecord,
  updateLessonFields,
  useCoursesStore,
  type Grade,
  type PublishStatus,
  type Question,
  type Quiz,
} from "@/data/courses";
import { formatGrade, formatSubject } from "@/lib/i18n-common";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { COURSE_CONTENT_COPY } from "./course-content-strings";
import { QuestionBankTab } from "./question-bank-tab";
import { QuizAnalyticsPanel } from "./quiz-analytics-panel";
import { QuizCreateForm, type NewQuizInput } from "./quiz-create-form";
import { QuizEditPanel } from "./quiz-edit-panel";
import { QuizLibraryCard } from "./quiz-library-card";
import { TEACHER_COPY } from "./strings";

type ScreenMode = "list" | "create" | "edit" | "analytics";
const GRADES = [6, 7, 8, 9, 10, 11] as const;
const SUBJECTS = ["All", "Science", "Mathematics", "ICT", "History"] as const;

export function TeacherQuizzesScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { store } = useCoursesStore();
  const { toast, showToast } = useToastMessage();
  const copy = TEACHER_COPY[lang];
  const content = COURSE_CONTENT_COPY[lang];
  const [tab, setTab] = useState<"quizzes" | "bank">("quizzes");
  const [mode, setMode] = useState<ScreenMode>("list");
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [analyticsQuizId, setAnalyticsQuizId] = useState<string | null>(null);
  const [gradeFilter, setGradeFilter] = useState<"all" | number>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("All");

  const editingQuiz = store.quizzes.find((q) => q.id === editingQuizId) ?? null;

  const filteredQuizzes = useMemo(
    () =>
      store.quizzes.filter((quiz) => {
        if (gradeFilter !== "all" && quiz.grade !== gradeFilter) return false;
        if (subjectFilter !== "All" && quiz.subject !== subjectFilter)
          return false;
        return true;
      }),
    [gradeFilter, store.quizzes, subjectFilter],
  );

  const backToList = () => {
    setMode("list");
    setEditingQuizId(null);
    setAnalyticsQuizId(null);
  };

  const handleCreateQuiz = (input: NewQuizInput) => {
    const status: PublishStatus = input.status;
    const qId = `q-${Date.now()}`;
    const quizId = `tq-${Date.now()}`;
    const question: Question = {
      id: qId,
      prompt: makeLocalized(input.prompt),
      options: input.options.map((opt) => makeLocalized(opt)),
      correctIndex: input.correctIndex,
      explanation: makeLocalized(input.explanation),
      subject: input.subject,
      grade: (input.grade as Grade) || 8,
      source: "teacher",
      difficulty: 2,
    };
    const newQuiz: Quiz = {
      id: quizId,
      title: input.title,
      subject: input.subject,
      grade: (input.grade as Grade) || 8,
      courseId: input.courseId,
      unitId: input.sectionId,
      questionIds: [qId],
      passMark: 1,
      retriesAllowed: "unlimited",
      status,
    };
    saveQuizRecord(newQuiz, [question]);
    const lessonId = addLessonToUnit(
      input.courseId,
      input.sectionId,
      "quiz",
      input.title,
    );
    updateLessonFields(lessonId, { quizId, status });
    backToList();
    showToast(
      status === "published" ? copy.quizPublishedToast : copy.quizDraftToast,
    );
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.quizzesPageTitle}
      roleOverride="teacher"
      toastMessage={toast}
    >
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-[#0B3B3C] p-6 text-white shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold sm:text-2xl">
            {copy.publishedQuizzesHeading}
          </h2>
          <p className="mt-1 text-sm text-teal-100/85">{copy.modQuizDesc}</p>
        </div>
        {mode === "list" && tab === "quizzes" ? (
          <button
            type="button"
            onClick={() => setMode("create")}
            data-testid="teacher-quizzes-create-btn"
            className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-teal-400 px-5 text-sm font-extrabold text-slate-950 hover:bg-teal-300"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>{copy.createQuizBtn}</span>
          </button>
        ) : null}
      </section>

      {mode === "list" ? (
        <div className="flex gap-2 border-b border-[var(--sn-border)]">
          {(
            [
              ["quizzes", `${copy.quizzesTab} (${store.quizzes.length})`],
              ["bank", `${copy.bankTab} (${store.questions.length})`],
            ] as const
          ).map(([id, text]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`min-h-12 border-b-2 px-4 text-base font-bold ${
                tab === id
                  ? "border-[var(--sn-primary)] text-[var(--sn-primary)]"
                  : "border-transparent text-[var(--sn-text-secondary)]"
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={backToList}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[var(--sn-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {copy.backToQuizList}
        </button>
      )}

      {tab === "bank" && mode === "list" ? (
        <QuestionBankTab lang={lang} onToast={showToast} />
      ) : null}

      {mode === "create" ? (
        <QuizCreateForm
          lang={lang}
          copy={copy}
          content={content}
          courses={store.courses}
          sections={store.units}
          onCreate={handleCreateQuiz}
          onCancel={backToList}
        />
      ) : null}

      {mode === "edit" && editingQuiz ? (
        <QuizEditPanel
          lang={lang}
          copy={copy}
          content={content}
          quiz={editingQuiz}
          onSave={() => {
            backToList();
            showToast(content.quizUpdated);
          }}
          onCancel={backToList}
        />
      ) : null}

      {mode === "analytics" && analyticsQuizId ? (
        <QuizAnalyticsPanel
          lang={lang}
          quizId={analyticsQuizId}
          onClose={backToList}
        />
      ) : null}

      {mode === "list" && tab === "quizzes" ? (
        <section data-testid="teacher-quiz-list" className="space-y-4">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <p className="mb-1.5 text-xs font-bold text-[var(--sn-text-secondary)]">
                {copy.gradeColon}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setGradeFilter("all")}
                  className={`min-h-11 rounded-xl px-3 text-sm font-bold ${
                    gradeFilter === "all"
                      ? "bg-[var(--sn-primary)] text-white"
                      : "bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                  }`}
                >
                  {copy.allGradesFilter}
                </button>
                {GRADES.map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setGradeFilter(grade)}
                    className={`min-h-11 rounded-xl px-3 text-sm font-bold ${
                      gradeFilter === grade
                        ? "bg-[var(--sn-primary)] text-white"
                        : "bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                    }`}
                  >
                    {formatGrade(lang, grade)}
                  </button>
                ))}
              </div>
            </div>
            <label className="block text-xs font-bold text-[var(--sn-text-secondary)]">
              <span className="mb-1.5 block">{copy.subjectField}</span>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-sm font-semibold"
              >
                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === "All"
                      ? copy.allSubjectsFilter
                      : formatSubject(lang, subject)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filteredQuizzes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--sn-border)] bg-[var(--sn-surface)] p-8 text-center text-base text-[var(--sn-text-secondary)]">
              {copy.emptyQuizzes}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredQuizzes.map((quiz) => (
                <QuizLibraryCard
                  key={quiz.id}
                  lang={lang}
                  quiz={quiz}
                  course={store.courses.find((c) => c.id === quiz.courseId)}
                  unit={store.units.find((u) => u.id === quiz.unitId)}
                  attemptsCount={
                    store.progress.flatMap((p) =>
                      (p.quizAttempts ?? []).filter(
                        (a) => a.quizId === quiz.id,
                      ),
                    ).length
                  }
                  questionsWord={content.questionsWord}
                  editLabel={content.editQuestions}
                  analyticsLabel={copy.analyticsBtn}
                  publishedLabel={copy.publishedLabel}
                  draftLabel={copy.draftLabel}
                  unassignedLabel={copy.unassignedLabel}
                  onEdit={() => {
                    setAnalyticsQuizId(null);
                    setEditingQuizId(quiz.id);
                    setMode("edit");
                  }}
                  onAnalytics={() => {
                    setEditingQuizId(null);
                    setAnalyticsQuizId(quiz.id);
                    setMode("analytics");
                  }}
                />
              ))}
            </div>
          )}
        </section>
      ) : null}
    </SipNenaPortalShell>
  );
}
