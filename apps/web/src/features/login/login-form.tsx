import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { GoogleIcon } from "@/components/ui/google-icon";
import { useAction } from "@/hooks/use-action";
import { queryClient } from "@/lib/api/query-client";
import { authClient, checkAuth } from "@/lib/auth/client";
import { safeRedirect, searchParam } from "@/lib/auth/redirect";
import type { LoginStrings } from "./strings";

interface Props {
  t: LoginStrings;
  selectedLang: string;
  onCreateAccountClick: () => void;
}

export function LoginForm({ t, selectedLang, onCreateAccountClick }: Props) {
  const navigate = useNavigate();
  const action = useAction();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "info" | "warning" | "success";
    text: string;
  } | null>(null);

  const destination = safeRedirect(searchParam("redirect"));
  const callbackURL = `${window.location.origin}${destination}`;

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const showEmailWarning = email.trim().length > 0 && !isEmailValid;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !isEmailValid) {
      setStatusMsg({ type: "warning", text: t.emailInvalidErr });
      return;
    }
    if (!password) {
      setStatusMsg({ type: "warning", text: t.passwordEmptyErr });
      return;
    }

    void action.run(async () => {
      try {
        checkAuth(
          await authClient.signIn.email({ email, password, callbackURL }),
        );
        queryClient.clear();
        setStatusMsg({ type: "success", text: t.loginSuccessMsg });
        setTimeout(() => {
          if (destination && destination !== "/") {
            window.location.assign(destination);
          } else {
            void navigate({ to: "/account" });
          }
        }, 500);
      } catch (err: unknown) {
        const error = err as Error;
        setStatusMsg({
          type: "warning",
          text: error.message || t.passwordEmptyErr,
        });
      }
    });
  };

  const handleGoogle = () => {
    void action.run(async () => {
      setStatusMsg({ type: "info", text: t.googleStatusMsg });
      checkAuth(
        await authClient.signIn.social({
          provider: "google",
          callbackURL,
          errorCallbackURL: `${window.location.origin}/login`,
        }),
      );
    });
  };

  return (
    <section
      key={selectedLang}
      aria-labelledby="login-heading"
      data-testid="sipnena-login-form"
      className="md:col-span-7 px-5 sm:px-8 lg:px-10 py-6 sm:py-8 animate-lang-switch flex flex-col justify-between"
    >
      <div>
        <div className="space-y-1">
          <h1
            id="login-heading"
            data-testid="login-heading"
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
            onClick={handleGoogle}
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
              htmlFor="login-email"
              className="block mb-1.5 text-sm font-semibold text-slate-900"
            >
              {t.emailLabel}
            </label>
            <div className="relative">
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                data-testid="login-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (statusMsg) setStatusMsg(null);
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
            {showEmailWarning ? (
              <p
                role="alert"
                className="mt-1.5 text-xs text-amber-700 font-medium"
              >
                {t.emailInvalidErr}
              </p>
            ) : null}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="login-password"
                className="text-sm font-semibold text-slate-900"
              >
                {t.passwordLabel}
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-[var(--sn-primary)] hover:underline"
              >
                {t.forgotPasswordBtn}
              </Link>
            </div>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                data-testid="login-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (statusMsg) setStatusMsg(null);
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

          <div className="rounded-xl p-3 flex items-center gap-2.5 bg-[var(--sn-olive)]/60 border border-[var(--sn-border)]">
            <ShieldCheck className="w-4 h-4 text-[var(--sn-primary)] shrink-0" />
            <p className="text-xs text-slate-700 leading-snug">
              {t.safetyBannerText}
            </p>
          </div>

          {statusMsg && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium border ${
                statusMsg.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : statusMsg.type === "warning"
                    ? "bg-amber-50 border-amber-200 text-amber-800"
                    : "bg-[var(--sn-olive)] border-[var(--sn-border)] text-[var(--sn-text-main)]"
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          <button
            type="submit"
            data-testid="login-submit"
            disabled={action.pending}
            className="w-full min-h-[48px] px-6 rounded-xl text-base font-semibold text-white inline-flex items-center justify-center gap-2 bg-[var(--sn-primary)] hover:bg-[var(--sn-primary-hover)] transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sn-primary)] disabled:opacity-50"
          >
            <span>{t.submitBtn}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 text-center">
        <p className="text-xs sm:text-sm text-slate-600">
          {t.noAccountPrompt}{" "}
          <button
            type="button"
            onClick={onCreateAccountClick}
            className="font-semibold text-[var(--sn-primary)] hover:underline focus:outline-none rounded px-1 py-0.5"
          >
            {t.createAccountLink}
          </button>
        </p>
      </div>
    </section>
  );
}
