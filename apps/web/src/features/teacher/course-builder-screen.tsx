import { useState } from "react";
import { Navigate, useParams } from "@tanstack/react-router";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { CourseBuilderTopbar } from "./course-builder-topbar";
import { COURSE_CONTENT_COPY } from "./course-content-strings";
import { CourseCurriculumRail } from "./course-curriculum-rail";
import { CourseInfoPanel } from "./course-info-panel";
import { CourseItemEditor } from "./course-item-editor";
import { CourseQuizPicker } from "./course-quiz-picker";
import { TEACHER_COURSE_COPY } from "./course-strings";
import { QuizCreateForm } from "./quiz-create-form";
import { TEACHER_COPY } from "./strings";
import { useCourseBuilder } from "./use-course-builder";

type BuilderTab = "curriculum" | "info";

export function TeacherCourseBuilderScreen() {
  const { courseId } = useParams({ from: "/teacher/courses/$courseId" });
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const copy = TEACHER_COURSE_COPY[lang];
  const content = COURSE_CONTENT_COPY[lang];
  const shared = TEACHER_COPY[lang];
  const builder = useCourseBuilder(courseId, copy, content, showToast);
  const [tab, setTab] = useState<BuilderTab>("curriculum");

  if (!builder.course) return <Navigate to="/teacher/courses" />;

  const course = builder.course;
  const showCreate =
    Boolean(builder.pickerSectionId) && builder.creatingQuiz;
  const showPicker =
    Boolean(builder.pickerSectionId) && !builder.creatingQuiz;

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={course.title}
      roleOverride="teacher"
      toastMessage={toast}
    >
      <CourseBuilderTopbar
        copy={copy}
        courseId={course.id}
        title={course.title}
        published={course.published}
        onTitleChange={(title) => builder.patchCourse({ title })}
        onPublishedChange={(published) => builder.patchCourse({ published })}
      />

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
            onClick={() => setTab(id)}
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

      {tab === "info" ? (
        <CourseInfoPanel
          lang={lang}
          copy={copy}
          course={course}
          onSave={builder.patchCourse}
        />
      ) : (
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <CourseCurriculumRail
              lang={lang}
              copy={copy}
              content={content}
              sections={builder.sections}
              lessons={builder.lessons}
              selectedLessonId={builder.activeLessonId}
              onSelectLesson={builder.selectLesson}
              onAddSection={builder.addSection}
              onAddVideo={(sectionId) => builder.addItem(sectionId, "video")}
              onAddQuiz={builder.openQuizPicker}
              onAddLab={(sectionId) => builder.addItem(sectionId, "lab")}
              onRenameSection={builder.renameSection}
            />
          </div>
          <div className="lg:col-span-8">
            {showCreate && builder.pickerSectionId ? (
              <QuizCreateForm
                lang={lang}
                copy={shared}
                content={content}
                courses={[course]}
                sections={builder.sections}
                lockedPlacement={{
                  courseId: course.id,
                  sectionId: builder.pickerSectionId,
                  subject: course.subject,
                  grade: course.grade,
                }}
                onCreate={builder.createQuiz}
                onCancel={builder.cancelCreateQuiz}
              />
            ) : showPicker ? (
              <CourseQuizPicker
                lang={lang}
                copy={content}
                quizzes={builder.state.teacherQuizzes}
                onPlace={builder.placeQuiz}
                onCreateNew={builder.startCreateQuiz}
              />
            ) : (
              <CourseItemEditor
                lang={lang}
                copy={copy}
                content={content}
                lesson={builder.selectedLesson}
                quiz={builder.selectedQuiz}
                onSave={builder.saveLesson}
                onSaveQuiz={builder.saveQuiz}
                onRemove={builder.removeLesson}
              />
            )}
          </div>
        </div>
      )}
    </SipNenaPortalShell>
  );
}
