import { Check } from "lucide-react";
import type { LocalizedText } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";

export interface OlBasketGroup {
  id: "basket1" | "basket2" | "basket3";
  title: LocalizedText;
  subtitle: LocalizedText;
  options: Array<{ id: string; label: LocalizedText }>;
}

export const OL_CORE_SUBJECTS: Array<{ id: string; label: LocalizedText }> = [
  { id: "ol-maths", label: { en: "Mathematics", si: "ගණිතය", ta: "கணிதம்" } },
  {
    id: "ol-science",
    label: { en: "Science", si: "විද්‍යාව", ta: "விஞ்ஞானம்" },
  },
  {
    id: "ol-first",
    label: { en: "First Language", si: "සිංහල / දෙමළ", ta: "தாய்மொழி" },
  },
  {
    id: "ol-english",
    label: { en: "English Language", si: "ඉංග්‍රීසි", ta: "ஆங்கிலம்" },
  },
  { id: "ol-history", label: { en: "History", si: "ඉතිහාසය", ta: "வரலாறு" } },
  { id: "ol-religion", label: { en: "Religion", si: "ආගම", ta: "சமயம்" } },
];

export const OL_BASKET_GROUPS: OlBasketGroup[] = [
  {
    id: "basket1",
    title: {
      en: "Category I (Basket 1)",
      si: "1 වන කාණ්ඩය (Basket 1)",
      ta: "பிரிவு I (கூடை 1)",
    },
    subtitle: {
      en: "Pick 1 Commerce, Civic, Geography, or 2nd Language subject",
      si: "ව්‍යාපාර, පුරවැසි, භූගෝල හෝ දෙවන භාෂාවෙන් 1ක් තෝරන්න",
      ta: "வணிகம், குடியியல், புவியியல் அல்லது 2ஆம் மொழியில் 1ஐத் தேர்ந்தெடுக்கவும்",
    },
    options: [
      {
        id: "commerce",
        label: {
          en: "Business & Accounting",
          si: "ව්‍යාපාර හා ගිණුම්කරණය",
          ta: "வணிகமும் கணக்கீடும்",
        },
      },
      {
        id: "civic",
        label: {
          en: "Civic Education",
          si: "පුරවැසි අධ්‍යාපනය",
          ta: "குடியியல் கல்வி",
        },
      },
      {
        id: "geography",
        label: { en: "Geography", si: "භූගෝල විද්‍යාව", ta: "புவியியல்" },
      },
      {
        id: "second-lang",
        label: {
          en: "2nd National Language",
          si: "දෙවන ජාතික භාෂාව",
          ta: "2ஆம் தேசிய மொழி",
        },
      },
    ],
  },
  {
    id: "basket2",
    title: {
      en: "Category II (Basket 2)",
      si: "2 වන කාණ්ඩය (Basket 2)",
      ta: "பிரிவு II (கூடை 2)",
    },
    subtitle: {
      en: "Pick 1 Aesthetic or Literature subject",
      si: "සෞන්දර්ය හෝ සාහිත්‍ය විෂයකින් 1ක් තෝරන්න",
      ta: "அழகியல் அல்லது இலக்கியப் பாடத்தில் 1ஐத் தேர்ந்தெடுக்கவும்",
    },
    options: [
      { id: "art", label: { en: "Art", si: "චිත්‍ර කලාව", ta: "சித்திரம்" } },
      { id: "dancing", label: { en: "Dancing", si: "නර්තනය", ta: "நடனம்" } },
      {
        id: "music",
        label: { en: "Eastern / Western Music", si: "සංගීතය", ta: "சங்கீதம்" },
      },
      {
        id: "lit",
        label: {
          en: "Appreciation of Literature",
          si: "සාහිත්‍ය රසාස්වාදය",
          ta: "இலக்கிய நயம்",
        },
      },
    ],
  },
  {
    id: "basket3",
    title: {
      en: "Category III (Basket 3)",
      si: "3 වන කාණ්ඩය (Basket 3)",
      ta: "பிரிவு III (கூடை 3)",
    },
    subtitle: {
      en: "Pick 1 Technical or Practical subject",
      si: "තාක්ෂණික හෝ ප්‍රායෝගික විෂයකින් 1ක් තෝරන්න",
      ta: "தொழில்நுட்ப அல்லது செய்முறைப் பாடத்தில் 1ஐத் தேர்ந்தெடுக்கவும்",
    },
    options: [
      {
        id: "ict",
        label: {
          en: "ICT",
          si: "තොරතුරු තාක්ෂණය (ICT)",
          ta: "தகவல் தொழிற்நுட்பம் (ICT)",
        },
      },
      {
        id: "health",
        label: {
          en: "Health & Physical Ed.",
          si: "සෞඛ්‍ය හා ශාරීරික අධ්‍යාපනය",
          ta: "சுகாதாரமும் உடற்கல்வியும்",
        },
      },
      {
        id: "agri",
        label: {
          en: "Agriculture & Food Tech",
          si: "කෘෂිකර්මය",
          ta: "விவசாயம்",
        },
      },
      {
        id: "home-ec",
        label: {
          en: "Home Economics",
          si: "ගෘහ ආර්ථික විද්‍යාව",
          ta: "மனைப்பொருளியல்",
        },
      },
    ],
  },
];

interface OlBasketsPickerProps {
  lang: AppLanguage;
  baskets: { basket1: string; basket2: string; basket3: string };
  onSelectBasket: (
    basketId: "basket1" | "basket2" | "basket3",
    optionId: string,
  ) => void;
}

export function OlBasketsPicker({
  lang,
  baskets,
  onSelectBasket,
}: OlBasketsPickerProps) {
  const coreTitle =
    lang === "si"
      ? "අනිවාර්ය ප්‍රධාන විෂයයන් (6)"
      : lang === "ta"
        ? "கட்டாயப் பாடங்கள் (6)"
        : "Compulsory Core Subjects (6)";
  const includedLabel =
    lang === "si" ? "ඇතුළත්" : lang === "ta" ? "சேர்க்கப்பட்டது" : "Included";

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/50 p-3.5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[var(--sn-primary)]">
            {coreTitle}
          </h2>
          <span className="rounded-full bg-[var(--sn-primary)] px-2.5 py-0.5 text-[10px] font-bold text-white">
            {includedLabel}
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {OL_CORE_SUBJECTS.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-white px-2.5 py-2"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-[var(--sn-primary)] stroke-[2.5]" />
              <p className="truncate text-xs font-bold text-[var(--sn-text-main)]">
                {sub.label[lang]}
              </p>
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
              {group.title[lang]}
            </h3>
            <p className="text-xs text-[var(--sn-text-muted)]">
              {group.subtitle[lang]}
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
                    <p className="truncate text-xs font-bold text-[var(--sn-text-main)]">
                      {opt.label[lang]}
                    </p>
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
