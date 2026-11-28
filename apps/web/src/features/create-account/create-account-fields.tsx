import { AlertCircle, ArrowRight, Eye, EyeOff, Lightbulb } from "lucide-react";
import { GradeSelector } from "./grade-selector";
import type { CreateAccountStrings } from "./strings";

interface Props {
  t: CreateAccountStrings;
  selectedLang: "en" | "si" | "ta";
  firstName: string;
  setFirstName: (v: string) => void;
  selectedGrade: number;
  setSelectedGrade: (g: number) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean | ((p: boolean) => boolean)) => void;
  showEmailWarning: boolean;
  formFeedback: { type: "info" | "warning" | "success"; text: string } | null;
  setFormFeedback: (
    fb: { type: "info" | "warning" | "success"; text: string } | null,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateAccountFields({
  t,
  selectedLang,
  firstName,
  setFirstName,
  selectedGrade,
  setSelectedGrade,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  showEmailWarning,
  formFeedback,
  setFormFeedback,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label
          htmlFor="student-first-name"
          className="mb-1.5 flex flex-wrap items-baseline gap-1.5"
        >
          <span className="text-sm font-semibold text-slate-900">
            {t.firstNameLabel}
          </span>
          <span className="text-xs font-normal text-slate-500">
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
          className="w-full min-h-[46px] rounded-xl border border-transparent bg-slate-100 px-3.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[var(--sn-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sn-primary)]/20 sm:text-base"
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
          className="mb-1.5 block text-sm font-semibold text-slate-900"
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
            className={`w-full min-h-[46px] rounded-xl border pl-3.5 pr-10 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 sm:text-base ${
              showEmailWarning
                ? "border-amber-400 bg-amber-50 text-amber-900"
                : "border-transparent bg-slate-100 focus:border-[var(--sn-primary)] focus:bg-white"
            }`}
          />
          {showEmailWarning ? (
            <AlertCircle
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600"
              aria-hidden="true"
            />
          ) : null}
        </div>
        {showEmailWarning ? (
          <p role="alert" className="mt-1.5 text-xs font-medium text-amber-700">
            {t.emailErrorMsg}
          </p>
        ) : null}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="student-password"
            className="text-sm font-semibold text-slate-900"
          >
            {t.passwordLabel}
          </label>
          <span className="text-xs font-normal text-slate-500">
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
            className="w-full min-h-[46px] rounded-xl border border-transparent bg-slate-100 pl-3.5 pr-11 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[var(--sn-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sn-primary)]/20 sm:text-base"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? t.hidePasswordAria : t.showPasswordAria}
            className="absolute right-0.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700"
        >
          <Lightbulb className="h-3.5 w-3.5" />
        </span>
        <p className="text-xs leading-relaxed text-slate-700">
          <span className="sm:hidden">{t.parentCalloutMobile}</span>
          <span className="hidden sm:inline">{t.parentCalloutDesktop}</span>
        </p>
      </div>

      {formFeedback ? (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-xl border px-3.5 py-2.5 text-xs font-medium sm:text-sm ${
            formFeedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : formFeedback.type === "warning"
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-[var(--sn-border)] bg-[var(--sn-olive)] text-[var(--sn-text-main)]"
          }`}
        >
          {formFeedback.text}
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-base font-semibold text-white shadow-xs transition-colors hover:bg-[var(--sn-primary-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)]"
      >
        <span>{t.submitBtn}</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
