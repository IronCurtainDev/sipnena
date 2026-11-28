import { CourseCoverField } from "./course-cover-field";
import type { TeacherCourseCopy } from "./course-strings";
import { formatGrade, formatSubject } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { Grade } from "@/data/courses";

interface NewCourseDetailsFieldsProps {
  lang: AppLanguage;
  copy: TeacherCourseCopy;
  grade: Grade;
  subject: string;
  titleText: string;
  descText: string;
  isFree: boolean;
  priceLkr: string;
  coverImageUrl?: string;
  onTitleChange: (value: string) => void;
  onDescChange: (value: string) => void;
  onFreeChange: (isFree: boolean) => void;
  onPriceChange: (value: string) => void;
  onCoverChange: (value: string | undefined) => void;
}

export function NewCourseDetailsFields({
  lang,
  copy,
  grade,
  subject,
  titleText,
  descText,
  isFree,
  priceLkr,
  coverImageUrl,
  onTitleChange,
  onDescChange,
  onFreeChange,
  onPriceChange,
  onCoverChange,
}: NewCourseDetailsFieldsProps) {
  return (
    <div className="space-y-3">
      <label className="block space-y-1 text-sm font-bold">
        <span>{copy.titleField}</span>
        <input
          type="text"
          value={titleText}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={`${formatGrade(lang, grade)} ${formatSubject(lang, subject)}`}
          className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
        />
      </label>
      <label className="block space-y-1 text-sm font-bold">
        <span>{copy.descriptionField}</span>
        <textarea
          rows={3}
          value={descText}
          onChange={(e) => onDescChange(e.target.value)}
          className="w-full rounded-xl border border-[var(--sn-border)] p-3 text-base"
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-[var(--sn-border)] px-3 text-sm font-bold">
          <input
            type="radio"
            checked={isFree}
            onChange={() => onFreeChange(true)}
          />
          <span>{copy.freeLabel}</span>
        </label>
        <label className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-[var(--sn-border)] px-3 text-sm font-bold">
          <input
            type="radio"
            checked={!isFree}
            onChange={() => onFreeChange(false)}
          />
          <span>{copy.paidLabel}</span>
        </label>
      </div>
      {!isFree ? (
        <label className="block space-y-1 text-sm font-bold">
          <span>{copy.priceField} (Rs.)</span>
          <input
            type="number"
            value={priceLkr}
            onChange={(e) => onPriceChange(e.target.value)}
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
          />
        </label>
      ) : null}
      <CourseCoverField
        label={copy.coverImageField}
        hint={copy.coverImageHint}
        clearLabel={copy.coverImageClear}
        value={coverImageUrl}
        onChange={onCoverChange}
      />
    </div>
  );
}
