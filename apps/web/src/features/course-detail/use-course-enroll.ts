import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  enrollActiveStudentInCourse,
  getActiveStudent,
  isStudentEnrolled,
  StudentMutationError,
} from "@/data/courses";

/** Opens enroll modal, or redirects to create-account when unsigned. */
export function useCourseEnroll(
  courseId: string | undefined,
  showToast: (msg: string) => void,
  setModal: (open: boolean) => void,
  setSuccess: (ok: boolean) => void,
) {
  const navigate = useNavigate();

  const beginEnroll = useCallback(() => {
    if (!courseId) return;
    const student = getActiveStudent();
    if (!student) {
      void navigate({
        to: "/create-account",
        search: { redirect: `/courses/${courseId}` },
      });
      return;
    }
    if (isStudentEnrolled(student.id, courseId)) {
      setModal(true);
      setSuccess(true);
      return;
    }
    setModal(true);
    setSuccess(false);
  }, [courseId, navigate, setModal, setSuccess]);

  const confirmEnroll = useCallback(() => {
    if (!courseId) return;
    try {
      enrollActiveStudentInCourse(courseId);
      setSuccess(true);
    } catch (err) {
      if (err instanceof StudentMutationError) {
        showToast(err.message);
        if (err.message.toLowerCase().includes("create an account")) {
          void navigate({
            to: "/create-account",
            search: { redirect: `/courses/${courseId}` },
          });
        }
      }
    }
  }, [courseId, navigate, setSuccess, showToast]);

  return { beginEnroll, confirmEnroll };
}
