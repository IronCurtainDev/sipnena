import { useState } from "react";
import { ArrowLeft, Users } from "lucide-react";
import { Link, Navigate, useParams } from "@tanstack/react-router";
import { pickLocalized } from "@/data/courses";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { AssignCourseDialog } from "./assign-course-dialog";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";
import { CourseBuilderTopbar } from "./course-builder-topbar";
import { COURSE_CONTENT_COPY } from "./course-content-strings";
import { CourseCurriculumRail } from "./course-curriculum-rail";
import { CourseInfoPanel } from "./course-info-panel";
import { CourseItemEditor } from "./course-item-editor";
import { CourseQuizPicker } from "./course-quiz-picker";
import { TEACHER_COURSE_COPY } from "./course-strings";
import { QuizCreateForm } from "./quiz-create-form";
import { QuizEditPanel } from "./quiz-edit-panel";
import { TEACHER_COPY } from "./strings";
import { useCourseBuilder } from "./use-course-builder";

type BuilderTab = "curriculum" | "info";

export function TeacherCourseBuilderScreen() {
  const { courseId } = useParams({ from: "/teacher/courses/$courseId" });
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const copy = TEACHER_COURSE_COPY[lang];
  const extra = BUILDER_EXTRA_COPY[lang];
  const content = COURSE_CONTENT_COPY[lang];
  const shared = TEACHER_COPY[lang];
  const builder = useCourseBuilder(lang, courseId, copy, content, showToast);
  const [tab, setTab] = useState<BuilderTab>("curriculum");
  const [assignOpen, setAssignOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [mobileEditorOpen, setMobileEditorOpen] = useState(false);

  if (!builder.course) return <Navigate to="/teacher/courses" />;
  const course = builder.course;
  const courseTitle = pickLocalized(course.title, lang);
  const showCreate = Boolean(builder.pickerUnitId) && builder.creatingQuiz;
  const showPicker = Boolean(builder.pickerUnitId) && !builder.creatingQuiz;
  const editingQuiz = editingQuizId
    ? (builder.store.quizzes.find((q) => q.id === editingQuizId) ?? null)
    : null;

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={courseTitle}
      roleOverride="teacher"
      toastMessage={toast}
    >
      <CourseBuilderTopbar
        lang={lang}
        copy={copy}
        courseId={course.id}
        title={courseTitle}
        status={course.status}
        releaseAt={course.releaseAt}
        saveState={builder.saveState}
        counts={builder.counts}
        onTitleChange={(t) =>
          builder.patchCourse({ title: { ...course.title, [lang]: t } })
        }
        onStatusChange={(status, releaseAt) =>
          builder.patchCourse({ status, releaseAt })
        }
        onOpenAssign={() => setAssignOpen(true)}
      />

      {builder.undoVisible ? (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-950">
          <span>{extra.deletedUndoToast}</span>
          <button
            type="button"
            onClick={builder.triggerUndo}
            className="min-h-10 rounded-xl bg-amber-900 px-3.5 text-xs font-bold text-white"
          >
            {extra.undoAction}
          </button>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--sn-border)]">
        <div className="flex gap-2">
          {(
            [
              ["curriculum", copy.tabCurriculum],
              ["info", copy.tabCourseInfo],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setTab(id);
                setMobileEditorOpen(id === "info");
              }}
              className={`min-h-12 border-b-2 px-3 text-base font-bold ${
                tab === id
                  ? "border-[var(--sn-primary)] text-[var(--sn-primary)]"
                  : "border-transparent text-[var(--sn-text-secondary)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <Link
          to="/teacher/courses/$courseId/students"
          params={{ courseId: course.id }}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
        >
          <Users className="h-4 w-4" />
          <span>
            {lang === "si"
              ? "සිසුන්"
              : lang === "ta"
                ? "மாணவர்கள்"
                : "Students"}
          </span>
        </Link>
      </div>

      {tab === "info" ? (
        <CourseInfoPanel
          lang={lang}
          copy={copy}
          course={course}
          onSave={builder.patchCourse}
        />
      ) : (
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          <div
            className={`${mobileEditorOpen ? "hidden lg:block" : "block"} lg:col-span-5`}
          >
            <CourseCurriculumRail
              lang={lang}
              copy={copy}
              content={content}
              units={builder.units}
              lessons={builder.lessons}
              selectedLessonId={builder.activeLessonId}
              onSelectLesson={(id) => {
                setEditingQuizId(null);
                builder.selectLesson(id);
                setMobileEditorOpen(true);
              }}
              onAddUnit={builder.addUnit}
              onRenameUnit={builder.renameUnit}
              onMoveUnit={builder.moveUnit}
              onReorderUnits={builder.reorderUnits}
              onDuplicateUnit={builder.duplicateUnit}
              onUnitStatus={builder.setUnitStatus}
              onDeleteUnit={builder.deleteUnitWithUndo}
              onAddVideo={(u) => {
                builder.addItem(u, "video");
                setMobileEditorOpen(true);
              }}
              onAddQuiz={(u) => {
                builder.openQuizPicker(u);
                setMobileEditorOpen(true);
              }}
              onAddLab={(u) => {
                builder.addItem(u, "lab");
                setMobileEditorOpen(true);
              }}
              onAddAssignment={(u) => {
                builder.addItem(u, "assignment");
                setMobileEditorOpen(true);
              }}
              onMoveLesson={builder.moveLesson}
              onReorderLessons={builder.reorderUnitLessons}
              onMoveLessonToUnit={builder.moveLessonToOtherUnit}
              onDuplicateLesson={builder.duplicateLesson}
              onLessonStatus={builder.setLessonStatus}
              onDeleteLesson={builder.deleteLessonWithUndo}
            />
          </div>

          <div
            className={`${mobileEditorOpen ? "block" : "hidden lg:block"} lg:col-span-7`}
          >
            <button
              type="button"
              onClick={() => setMobileEditorOpen(false)}
              className="mb-3 inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-sm font-bold text-[var(--sn-primary)] lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{extra.mobileBackToTree}</span>
            </button>

            {showCreate && builder.pickerUnitId ? (
              <QuizCreateForm
                lang={lang}
                copy={shared}
                content={content}
                courses={[course]}
                sections={builder.units}
                lockedPlacement={{
                  courseId: course.id,
                  sectionId: builder.pickerUnitId,
                  subject: course.subject,
                  grade: course.grade,
                }}
                onCreate={builder.createInlineQuiz}
                onCancel={builder.cancelCreateQuiz}
              />
            ) : showPicker ? (
              <CourseQuizPicker
                lang={lang}
                copy={content}
                quizzes={builder.store.quizzes}
                onPlace={builder.placeQuiz}
                onCreateNew={builder.startCreateQuiz}
              />
            ) : editingQuiz ? (
              <QuizEditPanel
                lang={lang}
                copy={shared}
                content={content}
                quiz={editingQuiz}
                onSave={() => {
                  setEditingQuizId(null);
                  showToast(content.quizUpdated);
                }}
                onCancel={() => setEditingQuizId(null)}
              />
            ) : (
              <CourseItemEditor
                lang={lang}
                copy={copy}
                content={content}
                lesson={builder.selectedLesson}
                quiz={builder.selectedQuiz}
                onSave={builder.saveLesson}
                onDirtyChange={builder.setSaveState}
                onOpenQuizEditor={(qId) => setEditingQuizId(qId)}
                onRemove={(id) => {
                  builder.deleteLessonWithUndo(id);
                  setMobileEditorOpen(false);
                }}
              />
            )}
          </div>
        </div>
      )}

      <AssignCourseDialog
        lang={lang}
        courseId={course.id}
        units={builder.units}
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        onAssigned={showToast}
      />
    </SipNenaPortalShell>
  );
}
