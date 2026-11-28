import type { AssignmentSubmission } from "./course-types";
import { updateCourseStore } from "./courses-store-core";

export function submitStudentAssignment(input: {
  lessonId: string;
  courseId: string;
  studentId: string;
  textAnswer: string;
  maxScore?: number;
  imageDataUrl?: string;
}) {
  updateCourseStore((prev) => {
    const stu = prev.students.find((s) => s.id === input.studentId);
    const existing = prev.submissions
      .filter(
        (s) =>
          s.lessonId === input.lessonId &&
          s.studentId === input.studentId &&
          !s.gradedAt,
      )
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))[0];
    const nextFields = {
      courseId: input.courseId,
      studentName: stu?.name ?? input.studentId,
      text: input.textAnswer.trim(),
      photoLabel: input.imageDataUrl ? "Photo attached" : undefined,
      imageDataUrl: input.imageDataUrl,
      submittedAt: new Date().toISOString(),
      maxScore: input.maxScore ?? 10,
    };
    if (existing) {
      return {
        ...prev,
        submissions: prev.submissions.map((s) =>
          s.id === existing.id ? { ...s, ...nextFields } : s,
        ),
      };
    }
    const submission: AssignmentSubmission = {
      id: `sub-${Date.now()}`,
      lessonId: input.lessonId,
      studentId: input.studentId,
      ...nextFields,
    };
    return {
      ...prev,
      submissions: [submission, ...prev.submissions],
    };
  });
}

export function gradeStudentAssignment(
  submissionId: string,
  score: number,
  comment: string,
) {
  updateCourseStore((prev) => ({
    ...prev,
    submissions: prev.submissions.map((s) =>
      s.id === submissionId
        ? {
            ...s,
            score,
            teacherComment: comment.trim(),
            gradedAt: new Date().toISOString(),
          }
        : s,
    ),
  }));
}
