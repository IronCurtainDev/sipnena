import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { readCoverImageFile } from "./read-cover-image";

interface CourseCoverFieldProps {
  label: string;
  hint: string;
  clearLabel: string;
  value?: string;
  onChange: (next: string | undefined) => void;
}

export function CourseCoverField({
  label,
  hint,
  clearLabel,
  value,
  onChange,
}: CourseCoverFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onPick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await readCoverImageFile(file));
    } catch {
      setError(hint);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-[var(--sn-text-main)]">{label}</p>
      <div className="overflow-hidden rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)]">
        {value ? (
          <div className="relative aspect-[16/9] w-full">
            <img
              src={value}
              alt=""
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => onChange(undefined)}
              aria-label={clearLabel}
              className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] text-[var(--sn-text-main)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="flex min-h-28 w-full flex-col items-center justify-center gap-2 px-4 py-6 text-center text-sm font-semibold text-[var(--sn-text-secondary)]"
          >
            <ImagePlus className="h-6 w-6 text-[var(--sn-primary)]" />
            <span>{busy ? "…" : hint}</span>
          </button>
        )}
      </div>
      {value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-sm font-bold text-[var(--sn-primary)]"
        >
          {hint}
        </button>
      ) : null}
      {error ? (
        <p className="text-sm font-medium text-rose-700">{error}</p>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => void onPick(e.target.files?.[0])}
      />
    </div>
  );
}
