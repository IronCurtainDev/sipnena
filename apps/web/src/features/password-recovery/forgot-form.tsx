import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, CheckCircle2, KeyRound } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { authClient, checkAuth } from "@/lib/auth/client";
import type { PasswordStrings } from "./strings";

interface Props {
  t: PasswordStrings;
}

export function ForgotPasswordForm({ t }: Props) {
  const action = useAction();
  const [email, setEmail] = useState("");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validate = () => {
    if (!email.trim() || !email.includes("@")) {
      setEmailError(t.emailInvalidErr);
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    void action.run(async () => {
      checkAuth(
        await authClient.requestPasswordReset({
          email: email.trim(),
          redirectTo: `${window.location.origin}/reset-password`,
        }),
      );
      setSubmittedSuccess(true);
    });
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-6">
        <div>
          <div className="w-10 h-10 rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)] flex items-center justify-center mb-4">
            <KeyRound className="w-5 h-5" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.forgotTitle}
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {t.forgotSubtitle}
          </p>
        </div>

        {submittedSuccess ? (
          <div className="space-y-6 animate-page-enter">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{t.forgotSuccessTitle}</p>
                <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                  {t.forgotSuccessDesc}
                </p>
              </div>
            </div>

            <Link
              to="/login"
              className="w-full min-h-[48px] rounded-xl font-bold flex items-center justify-center gap-2 bg-[var(--sn-primary)] text-white hover:bg-[var(--sn-primary-hover)] transition-all shadow-xs"
            >
              <span>{t.backToLoginLink}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="forgot-email"
                className="block text-sm font-semibold text-slate-900 mb-1.5"
              >
                {t.emailLabel}
              </label>
              <div className="relative">
                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder={t.emailPlaceholder}
                  className={`w-full min-h-[46px] pl-3.5 pr-10 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 border focus:outline-none focus:ring-2 transition-colors ${
                    emailError
                      ? "bg-amber-50 border-amber-400 text-amber-900"
                      : "bg-slate-100 border-transparent focus:border-[var(--sn-primary)] focus:bg-white focus:ring-[var(--sn-primary)]/20"
                  }`}
                />
                {emailError ? (
                  <AlertCircle
                    className="w-4 h-4 text-amber-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              {emailError ? (
                <p
                  role="alert"
                  className="mt-1.5 text-xs text-amber-700 font-medium"
                >
                  {emailError}
                </p>
              ) : null}
            </div>

            {action.error ? (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{action.error}</span>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={action.pending}
              className="w-full min-h-[48px] rounded-xl font-bold flex items-center justify-center gap-2 bg-[var(--sn-primary)] text-white hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              <span>{action.pending ? t.sendingBtn : t.sendLinkBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 border-t border-slate-200 text-center">
              <p className="text-xs sm:text-sm text-slate-600">
                {t.rememberPasswordPrompt}{" "}
                <Link
                  to="/login"
                  className="font-bold text-[var(--sn-primary)] hover:text-[var(--sn-primary)] hover:underline inline-flex items-center gap-1"
                >
                  {t.backToLoginLink}
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
