import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, Eye, EyeOff, Lightbulb } from "lucide-react";
import { GoogleIcon } from "@/components/ui/google-icon";
import { GradeSelector } from "./grade-selector";
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
  const navigate = useNavigate();
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
      localStorage.setItem("sipnena_student_name", firstName.trim());
      localStorage.setItem("sipnena_student_grade", String(selectedGrade));
    } catch {
      // Ignore storage restrictions
    }
    setFormFeedback({ type: "info", text: t.signupComingNextMsg });
    setTimeout(() => {
      void navigate({ to: "/pick-subjects" });
    }, 600);
  };

  return (
    <section
      key={selectedLang}
      aria-labelledby="create-account-heading"
      className="md:col-span-7 px-5 sm:px-8 lg:px-10 py-6 sm:py-8 animate-lang-switch"
    >
      <div className="space-y-1">
        <h1
          id="create-account-heading"
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight"
        >
          {t.formTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          {t.formSubtitle}
        </p>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={() =>
            setFormFeedback({ type: "info", text: t.googleStatusMsg })
          }
          className="w-full min-h-[48px] px-4 rounded-xl bg-white border border-slate-200 flex items-center justify-center gap-3 text-sm sm:text-base font-semibold text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--sn-primary)] shadow-xs"
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

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="student-first-name"
            className="flex flex-wrap items-baseline gap-1.5 mb-1.5"
          >
            <span className="text-sm font-semibold text-slate-900">
              {t.firstNameLabel}
            </span>
            <span className="text-xs text-slate-500 font-normal">
              {t.firstNameHint}
            </span>
          </label>
          <input
            id="student-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (formFeedback) setFormFeedback(null);
            }}
            placeholder={t.firstNamePlaceholder}
            className="w-full min-h-[46px] px-3.5 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-slate-100 border border-transparent focus:border-[var(--sn-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sn-primary)]/20 transition-colors"
          />
        </div>

        <GradeSelector
          selectedGrade={selectedGrade}
          onSelectGrade={setSelectedGrade}
          gradeLabel={t.gradeLabel}
          olBadge={t.olBadge}
          gradeItem={t.gradeItem}
          selectedLang={selectedLang}
        />

        <div>
          <label
            htmlFor="student-email"
            className="block mb-1.5 text-sm font-semibold text-slate-900"
          >
            {t.emailLabel}
          </label>
          <div className="relative">
            <input
              id="student-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (formFeedback) setFormFeedback(null);
              }}
              aria-invalid={showEmailWarning}
              placeholder={t.emailPlaceholder}
              className={`w-full min-h-[46px] pl-3.5 pr-10 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 border focus:outline-none focus:ring-2 transition-colors ${
                showEmailWarning
                  ? "bg-amber-50 border-amber-400 text-amber-900"
                  : "bg-slate-100 border-transparent focus:border-[var(--sn-primary)] focus:bg-white"
              }`}
            />
            {showEmailWarning && (
              <AlertCircle
                className="w-4 h-4 text-amber-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
            )}
          </div>
          {showEmailWarning && (
            <p
              role="alert"
              className="mt-1.5 text-xs text-amber-700 font-medium"
            >
              {t.emailErrorMsg}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="student-password"
              className="text-sm font-semibold text-slate-900"
            >
              {t.passwordLabel}
            </label>
            <span className="text-xs text-slate-500 font-normal">
              {t.passwordHint}
            </span>
          </div>
          <div className="relative">
            <input
              id="student-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (formFeedback) setFormFeedback(null);
              }}
              placeholder={t.passwordPlaceholder}
              className="w-full min-h-[46px] pl-3.5 pr-11 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-slate-100 border border-transparent focus:border-[var(--sn-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sn-primary)]/20 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={
                showPassword ? t.hidePasswordAria : t.showPasswordAria
              }
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 absolute right-0.5 top-1/2 -translate-y-1/2 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="rounded-xl p-3 flex items-start gap-2.5 bg-slate-50 border border-slate-200">
          <span
            aria-hidden="true"
            className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5 text-amber-700"
          >
            <Lightbulb className="w-3.5 h-3.5" />
          </span>
          <p className="text-xs text-slate-700 leading-relaxed">
            <span className="sm:hidden">{t.parentCalloutMobile}</span>
            <span className="hidden sm:inline">{t.parentCalloutDesktop}</span>
          </p>
        </div>

        {formFeedback && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium border ${
              formFeedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : formFeedback.type === "warning"
                  ? "bg-amber-50 border-amber-200 text-amber-800"
                  : "bg-[var(--sn-olive)] border-[var(--sn-border)] text-[var(--sn-text-main)]"
            }`}
          >
            {formFeedback.text}
          </div>
        )}

        <button
          type="submit"
          className="w-full min-h-[48px] px-6 rounded-xl text-base font-semibold text-white inline-flex items-center justify-center gap-2 bg-[var(--sn-primary)] hover:bg-[var(--sn-primary-hover)] transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
        >
          <span>{t.submitBtn}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>

      <div className="mt-4 text-center space-y-1">
        <p className="text-xs sm:text-sm text-slate-600">
          {t.alreadyHaveDesktop}{" "}
          <button
            type="button"
            onClick={onLoginClick}
            className="font-semibold text-[var(--sn-primary)] hover:underline focus:outline-none rounded px-1 py-0.5"
          >
            {t.logInLink}
          </button>
        </p>
        <p className="text-xs text-slate-500">
          Need full account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[var(--sn-primary)] hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </section>
  );
}
