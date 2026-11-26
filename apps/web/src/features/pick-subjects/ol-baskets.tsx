import { Check } from "lucide-react";

export interface OlBasketGroup {
  id: "basket1" | "basket2" | "basket3";
  title: string;
  subtitle: string;
  options: Array<{ id: string; label: string; native: string }>;
}

export const OL_CORE_SUBJECTS = [
  { id: "ol-maths", label: "Mathematics", native: "ගණිතය • கணிதம்" },
  { id: "ol-science", label: "Science", native: "විද්‍යාව • விஞ்ஞானம்" },
  { id: "ol-first", label: "Sinhala / Tamil", native: "මව්බස • தாய்மொழி" },
  {
    id: "ol-english",
    label: "English Language",
    native: "ඉංග්‍රීසි • ஆங்கிலம்",
  },
  { id: "ol-history", label: "History", native: "ඉතිහාසය • வரலாறு" },
  { id: "ol-religion", label: "Religion", native: "ආගම • சமயம்" },
];

export const OL_BASKET_GROUPS: OlBasketGroup[] = [
  {
    id: "basket1",
    title: "Category I (Basket 1)",
    subtitle: "Pick 1 Commerce, Civic, Geography, or 2nd Language subject",
    options: [
      {
        id: "commerce",
        label: "Business & Accounting",
        native: "ව්‍යාපාර හා ගිණුම්කරණය",
      },
      { id: "civic", label: "Civic Education", native: "පුරවැසි අධ්‍යාපනය" },
      { id: "geography", label: "Geography", native: "භූගෝල විද්‍යාව" },
      {
        id: "second-lang",
        label: "2nd National Language",
        native: "දෙවන ජාතික භාෂාව",
      },
    ],
  },
  {
    id: "basket2",
    title: "Category II (Basket 2)",
    subtitle: "Pick 1 Aesthetic or Literature subject",
    options: [
      { id: "art", label: "Art", native: "චිත්‍ර කලාව" },
      { id: "dancing", label: "Dancing", native: "නර්තනය" },
      { id: "music", label: "Eastern / Western Music", native: "සංගීතය" },
      {
        id: "lit",
        label: "Appreciation of Literature",
        native: "සාහිත්‍ය රසාස්වාදය",
      },
    ],
  },
  {
    id: "basket3",
    title: "Category III (Basket 3)",
    subtitle: "Pick 1 Technical or Practical subject",
    options: [
      { id: "ict", label: "ICT", native: "තොරතුරු තාක්ෂණය" },
      {
        id: "health",
        label: "Health & Physical Ed.",
        native: "සෞඛ්‍ය හා ශාරීරික අධ්‍යාපනය",
      },
      { id: "agri", label: "Agriculture & Food Tech", native: "කෘෂිකර්මය" },
      { id: "home-ec", label: "Home Economics", native: "ගෘහ ආර්ථික විද්‍යාව" },
    ],
  },
];

interface OlBasketsPickerProps {
  baskets: { basket1: string; basket2: string; basket3: string };
  onSelectBasket: (
    basketId: "basket1" | "basket2" | "basket3",
    optionId: string,
  ) => void;
}

export function OlBasketsPicker({
  baskets,
  onSelectBasket,
}: OlBasketsPickerProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/50 p-3.5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[var(--sn-primary)]">
            Compulsory Core Subjects (6)
          </h2>
          <span className="rounded-full bg-[var(--sn-primary)] px-2.5 py-0.5 text-[10px] font-bold text-white">
            Included
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {OL_CORE_SUBJECTS.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-white px-2.5 py-2"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-[var(--sn-primary)] stroke-[2.5]" />
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-[var(--sn-text-main)]">
                  {sub.label}
                </p>
                <p className="truncate text-[10px] text-[var(--sn-text-muted)]">
                  {sub.native}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {OL_BASKET_GROUPS.map((group) => {
        const chosen = baskets[group.id];
        return (
          <div
            key={group.id}
            className="rounded-2xl border border-slate-200 bg-white p-3.5"
          >
            <h3 className="text-sm font-extrabold text-[var(--sn-text-main)]">
              {group.title}
            </h3>
            <p className="text-xs text-[var(--sn-text-muted)]">
              {group.subtitle}
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {group.options.map((opt) => {
                const isSelected = chosen === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onSelectBasket(group.id, opt.id)}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left transition ${
                      isSelected
                        ? "border-2 border-[var(--sn-primary)] bg-[var(--sn-surface-selected)]"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-[var(--sn-text-main)]">
                        {opt.label}
                      </p>
                      <p className="truncate text-[10px] text-[var(--sn-text-muted)]">
                        {opt.native}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-[var(--sn-primary)] stroke-[3]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
