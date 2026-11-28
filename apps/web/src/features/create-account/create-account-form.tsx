import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { GoogleIcon } from "@/components/ui/google-icon";
import {
  createStudentAccount,
  type Grade,
  StudentMutationError,
} from "@/data/courses";
import { safeRedirect, searchParam } from "@/lib/auth/redirect";
import { updatePrototypeState } from "@/lib/prototype-state";
import { CreateAccountFields } from "./create-account-fields";
import { CREATE_ACCOUNT_CONFIG } from "./strings";
import type { CreateAccountStrings } from "./strings";

interface FormProps {
  t: CreateAccountStrings;
  selectedLang: "en" | "si" | "ta";
  onLoginClick: () => void;
  formFeedback: { type: "info" | "warning" | "success"; text: string } | null;
  setFormFeedback: (
    fb: { type: "info" | "warning" | "success"; text: string } | null,
  ) => void;
}

export function CreateAccountForm({
  t,
  selectedLang,
  onLoginClick,
  formFeedback,
  setFormFeedback,
}: FormProps) {
  const [firstName, setFirstName] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number>(
    CREATE_ACCOUNT_CONFIG.defaultGrade,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const showEmailWarning = email.trim().length > 0 && !isEmailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setFormFeedback({ type: "warning", text: t.firstNameRequiredErr });
      return;
    }
    if (!isEmailValid) {
      setFormFeedback({ type: "warning", text: t.emailErrorMsg });
      return;
    }
    if (password.length < 8) {
      setFormFeedback({ type: "warning", text: t.passwordShortErr });
      return;
    }
    try {
      const grade = selectedGrade as Grade;
      createStudentAccount({
        name: firstName.trim(),
        email: email.trim(),
        password,
        grade,
      });
      updatePrototypeState((prev) => ({
        ...prev,
        role: "student",
        grade,
      }));
      try {
        localStorage.setItem("sipnena_student_name", firstName.trim());
        localStorage.setItem("sipnena_student_grade", String(selectedGrade));
      } catch {
        // Ignore storage restrictions
      }
      setFormFeedback({ type: "success", text: t.accountCreatedMsg });
      const redirectTo = safeRedirect(searchParam("redirect")) || "/courses";
      setTimeout(() => {
        window.location.assign(redirectTo);
      }, 500);
    } catch (err) {
      setFormFeedback({
        type: "warning",
        text:
          err instanceof StudentMutationError
            ? err.message
            : t.firstNameRequiredErr,
      });
    }
  };

  return (
    <section
      key={selectedLang}
      aria-labelledby="create-account-heading"
      className="md:col-span-7 flex flex-col justify-between px-5 py-6 animate-lang-switch sm:px-8 sm:py-8 lg:px-10"
    >
      <div>
        <div className="space-y-1">
          <h1
            id="create-account-heading"
            className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl"
          >
            {t.formTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">
            {t.formSubtitle}
          </p>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={() =>
              setFormFeedback({ type: "info", text: t.googleStatusMsg })
            }
            className="flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-xs transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] focus-visible:ring-offset-2 sm:text-base"
          >
            <GoogleIcon />
            <span>{t.googleBtn}</span>
          </button>
        </div>

        <div className="relative my-4 flex items-center">
          <div className="flex-1 border-t border-slate-200" />
          <span className="px-3 text-xs font-medium text-slate-500">
            {t.dividerText}
          </span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        <CreateAccountFields
          t={t}
          selectedLang={selectedLang}
          firstName={firstName}
          setFirstName={setFirstName}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showEmailWarning={showEmailWarning}
          formFeedback={formFeedback}
          setFormFeedback={setFormFeedback}
          onSubmit={handleSubmit}
        />
      </div>

      <div className="mt-4 space-y-1 text-center">
        <p className="text-xs text-slate-600 sm:text-sm">
          {t.alreadyHaveDesktop}{" "}
          <button
            type="button"
            onClick={onLoginClick}
            className="rounded px-1 py-0.5 font-semibold text-[var(--sn-primary)] hover:underline focus:outline-none"
          >
            {t.logInLink}
          </button>
        </p>
        <p className="text-xs text-slate-500">
          {selectedLang === "si"
            ? "සම්පූර්ණ ගිණුමක් අවශ්‍යද? "
            : selectedLang === "ta"
              ? "முழு கணக்கு தேவையா? "
              : "Need full account? "}
          <Link
            to="/signup"
            className="font-semibold text-[var(--sn-primary)] hover:underline"
          >
            {selectedLang === "si"
              ? "මෙතැනින් ලියාපදිංචි වන්න"
              : selectedLang === "ta"
                ? "இங்கே பதிவு செய்யுங்கள்"
                : "Sign up here"}
          </Link>
        </p>
      </div>
    </section>
  );
}
