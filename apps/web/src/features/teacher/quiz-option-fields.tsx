import { CheckCircle2 } from "lucide-react";

interface QuizOptionFieldsProps {
  options: string[];
  correctIndex: number;
  radioName: string;
  optionPrefix: string;
  markCorrectPrefix: string;
  onCorrectChange: (index: number) => void;
  onOptionChange: (index: number, value: string) => void;
}

export function QuizOptionFields({
  options,
  correctIndex,
  radioName,
  optionPrefix,
  markCorrectPrefix,
  onCorrectChange,
  onOptionChange,
}: QuizOptionFieldsProps) {
  return (
    <div className="space-y-3">
      {options.map((value, index) => {
        const letter = String.fromCharCode(65 + index);
        const selected = correctIndex === index;
        return (
          <label
            key={letter}
            className={`flex min-h-12 items-center gap-3 rounded-2xl border px-4 py-3 text-base ${
              selected
                ? "border-[var(--sn-primary)] bg-[var(--sn-olive)]/70"
                : "border-[var(--sn-border)] bg-[var(--sn-surface)]"
            }`}
          >
            <input
              type="radio"
              name={radioName}
              checked={selected}
              onChange={() => onCorrectChange(index)}
              aria-label={`${markCorrectPrefix} ${letter}`}
            />
            <span className="font-bold text-[var(--sn-primary)]">{letter}</span>
            <input
              type="text"
              required={index < 2}
              value={value}
              onChange={(event) => onOptionChange(index, event.target.value)}
              placeholder={`${optionPrefix} ${letter}`}
              aria-label={`${optionPrefix} ${letter}`}
              className="w-full bg-transparent text-base focus:outline-none"
            />
            {selected ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--sn-primary)]" />
            ) : null}
          </label>
        );
      })}
    </div>
  );
}
