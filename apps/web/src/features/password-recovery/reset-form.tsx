import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { authClient, checkAuth } from "@/lib/auth/client";
import { searchParam } from "@/lib/auth/redirect";
import type { PasswordStrings } from "./strings";

interface Props {
  t: PasswordStrings;
}

export function ResetPasswordForm({ t }: Props) {
  const action = useAction();
  const token = searchParam("token");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const isInvalidToken = !token || Boolean(searchParam("error"));

  const validate = () => {
    if (password.length < 8) {
      setFieldError(t.passwordLengthErr);
      return false;
    }
    if (password !== confirmation) {
      setFieldError(t.passwordMismatchErr);
      return false;
    }
    setFieldError("");
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    void action.run(async () => {
      checkAuth(
        await authClient.resetPassword({
          newPassword: password,
          token: token ?? "",
        }),
      );
      setResetSuccess(true);
    });
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-6">
        <div>
          <div className="w-10 h-10 rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)] flex items-center justify-center mb-4">
            <LockKeyhole className="w-5 h-5" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.resetTitle}
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {t.resetSubtitle}
          </p>
        </div>

        {isInvalidToken ? (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{t.invalidTokenTitle}</p>
                <p className="text-rose-800 text-xs sm:text-sm leading-relaxed">
                  {t.invalidTokenDesc}
                </p>
              </div>
            </div>

            <Link
              to="/forgot-password"
              className="w-full min-h-[48px] rounded-xl font-bold flex items-center justify-center gap-2 bg-[var(--sn-primary)] text-white hover:bg-[var(--sn-primary-hover)] transition-all shadow-xs"
            >
              <span>{t.requestNewLinkBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : resetSuccess ? (
          <div className="space-y-6 animate-page-enter">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{t.resetSuccessTitle}</p>
                <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                  {t.resetSuccessDesc}
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
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-semibold text-slate-900 mb-1.5"
              >
                {t.newPasswordLabel}
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldError) setFieldError("");
                  }}
                  placeholder={t.newPasswordPlaceholder}
                  className="w-full min-h-[46px] pl-3.5 pr-11 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-slate-100 border border-transparent focus:border-[var(--sn-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sn-primary)]/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
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

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-semibold text-slate-900 mb-1.5"
              >
                {t.confirmPasswordLabel}
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmation}
                  onChange={(e) => {
                    setConfirmation(e.target.value);
                    if (fieldError) setFieldError("");
                  }}
                  placeholder={t.confirmPasswordPlaceholder}
                  className="w-full min-h-[46px] pl-3.5 pr-11 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-slate-100 border border-transparent focus:border-[var(--sn-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sn-primary)]/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 absolute right-0.5 top-1/2 -translate-y-1/2 focus:outline-none"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {fieldError ? (
              <p
                role="alert"
                className="text-xs text-amber-700 font-medium flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {fieldError}
              </p>
            ) : null}

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
              className="w-full min-h-[48px] rounded-xl font-bold flex items-center justify-center gap-2 bg-[var(--sn-primary)] text-white hover:bg-[var(--sn-primary-hover)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-xs mt-2"
            >
              <span>{action.pending ? t.savingBtn : t.savePasswordBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
