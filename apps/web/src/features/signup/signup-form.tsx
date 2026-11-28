import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { GoogleIcon } from "@/components/ui/google-icon";
import { useAction } from "@/hooks/use-action";
import { useAppConfig } from "@/lib/api/config";
import { authClient, checkAuth } from "@/lib/auth/client";
import { safeRedirect, searchParam } from "@/lib/auth/redirect";
import type { AppLanguage } from "@/lib/language";
import type { SignupStrings } from "./strings";

function formatSignupError(raw: string, t: SignupStrings): string {
  const lower = raw.toLowerCase();
  if (
    lower.includes("api key") ||
    lower.includes("not configured") ||
    lower.includes("fetch") ||
    lower.includes("network") ||
    lower.includes("timeout")
  ) {
    return t.signupUnavailableErr;
  }
  return raw;
}

export function SipNenaSignupForm({
  t,
  selectedLang,
}: {
  t: SignupStrings;
  selectedLang: AppLanguage;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);
  const action = useAction();
  const config = useAppConfig();

  const destination = safeRedirect(searchParam("redirect"));
  const callbackURL = `${window.location.origin}${destination}`;
  const redirectQuery = `redirect=${encodeURIComponent(destination)}`;
  const verifyHref = `/verify-email?email=${encodeURIComponent(email)}&${redirectQuery}&sent=1`;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLocalErr(null);
    if (!name.trim()) {
      setLocalErr(t.nameRequiredErr);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setLocalErr(t.emailInvalidErr);
      return;
    }
    if (password.length < 8) {
      setLocalErr(t.passwordShortErr);
      return;
    }
    void action.run(async () => {
      checkAuth(
        await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim(),
          callbackURL,
        }),
      );
      window.location.assign(verifyHref);
    });
  };

  const handleGoogle = () => {
    setLocalErr(null);
    void action.run(async () => {
      checkAuth(
        await authClient.signIn.social({
          provider: "google",
          callbackURL,
          errorCallbackURL: `${window.location.origin}/signup`,
        }),
      );
    });
  };

  const configUnavailable = config.isError;
  const displayError =
    localErr ||
    (action.error ? formatSignupError(action.error, t) : null) ||
    (configUnavailable ? t.signupUnavailableErr : null);

  return (
    <section
      key={selectedLang}
      aria-labelledby="signup-heading"
      data-testid="sipnena-signup-form"
      className="flex flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 md:col-span-7 lg:px-10 animate-lang-switch"
    >
      <div>
        <div className="space-y-1">
          <h1
            id="signup-heading"
            data-testid="signup-heading"
            className="text-[26px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl"
          >
            {t.formTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">
            {t.formSubtitle}
          </p>
        </div>

        {config.data?.googleEnabled ? (
          <>
            <div className="mt-5">
              <button
                type="button"
                disabled={action.pending}
                onClick={handleGoogle}
                className="flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-xs transition-colors hover:bg-slate-50 sm:text-base"
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
          </>
        ) : (
          <div className="mt-5" />
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="signup-name"
              className="mb-1.5 block text-sm font-semibold text-slate-900"
            >
              {t.nameLabel}
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              data-testid="signup-name"
              maxLength={100}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (localErr) setLocalErr(null);
              }}
              placeholder={t.namePlaceholder}
              required
              className="min-h-[46px] w-full rounded-xl border border-transparent bg-slate-100 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-[var(--sn-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sn-primary)]/20 sm:text-base"
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-1.5 block text-sm font-semibold text-slate-900"
            >
              {t.emailLabel}
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              data-testid="signup-email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (localErr) setLocalErr(null);
              }}
              placeholder={t.emailPlaceholder}
              required
              className="min-h-[46px] w-full rounded-xl border border-transparent bg-slate-100 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-[var(--sn-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sn-primary)]/20 sm:text-base"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label
                htmlFor="signup-password"
                className="text-sm font-semibold text-slate-900"
              >
                {t.passwordLabel}
              </label>
              <span className="text-xs text-slate-500">{t.passwordHint}</span>
            </div>
            <div className="relative">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                data-testid="signup-password"
                minLength={8}
                maxLength={128}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (localErr) setLocalErr(null);
                }}
                placeholder={t.passwordPlaceholder}
                required
                className="min-h-[46px] w-full rounded-xl border border-transparent bg-slate-100 pl-3.5 pr-11 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-[var(--sn-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sn-primary)]/20 sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? t.hidePasswordAria : t.showPasswordAria
                }
                className="absolute right-0.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 hover:text-slate-800"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {displayError ? (
            <div
              role="alert"
              className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs font-medium text-amber-900 sm:text-sm"
            >
              {displayError}
            </div>
          ) : null}

          <button
            type="submit"
            data-testid="signup-submit"
            disabled={action.pending}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-6 text-base font-semibold text-white shadow-xs transition-colors hover:bg-[var(--sn-primary-hover)] disabled:opacity-50"
          >
            <span>{action.pending ? t.pendingBtn : t.submitBtn}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4 text-center">
        <p className="text-xs text-slate-600 sm:text-sm">
          {t.alreadyAccountPrompt}{" "}
          <Link
            to="/login"
            search={destination !== "/" ? { redirect: destination } : undefined}
            className="font-semibold text-[var(--sn-primary)] hover:underline"
          >
            {t.signInLink}
          </Link>
        </p>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
          <span>{t.trustFooter}</span>
        </div>
      </div>
    </section>
  );
}
