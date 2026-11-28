import { APP_LANGUAGES, type AppLanguage, saveLanguage } from "@/lib/language";

interface Props {
  selectedLang: AppLanguage;
  onLanguageChange?: (lang: AppLanguage) => void;
  ariaLabel?: string;
  size?: "sm" | "md";
  /** When false, only the short badge (සි / த / En) is shown — no native title label */
  showLabel?: boolean;
  className?: string;
}

export function CompactLanguageSwitcher({
  selectedLang,
  onLanguageChange,
  ariaLabel = "Change language",
  size = "md",
  showLabel = true,
  className = "",
}: Props) {
  const handleClick = (code: AppLanguage) => {
    saveLanguage(code);
    if (onLanguageChange) {
      onLanguageChange(code);
    }
  };

  const isSmall = size === "sm";

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`inline-flex items-stretch rounded-full p-0.5 border bg-slate-100 shrink-0 border-slate-200 min-w-0 ${className}`}
    >
      {APP_LANGUAGES.map((lang) => {
        const code = lang.code;
        const isSelected = selectedLang === code;

        return (
          <button
            key={code}
            type="button"
            onClick={() => handleClick(code)}
            aria-pressed={isSelected}
            aria-label={`${lang.nativeTitle} (${lang.badge})`}
            className={`cursor-pointer rounded-full font-medium transition-all duration-150 flex items-center justify-center gap-1 min-h-[32px] sm:min-h-[36px] ${
              isSmall
                ? "px-2 py-0.5 text-xs"
                : "px-2.5 sm:px-3 py-1 text-xs sm:text-sm"
            } ${
              isSelected
                ? "bg-white text-slate-900 font-bold shadow-xs ring-1 ring-black/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <span
              className={`font-semibold shrink-0 text-xs sm:text-xs rounded px-1 py-0.5 ${
                showLabel ? "min-[420px]:hidden" : ""
              } ${
                isSelected
                  ? "bg-[var(--sn-olive,#e9edc9)] text-[var(--sn-primary,#01472e)] font-bold"
                  : "text-slate-500"
              }`}
            >
              {lang.badge}
            </span>
            <span
              className={
                showLabel ? "hidden min-[420px]:inline truncate" : "hidden"
              }
            >
              {lang.nativeTitle}
            </span>
          </button>
        );
      })}
    </div>
  );
}
