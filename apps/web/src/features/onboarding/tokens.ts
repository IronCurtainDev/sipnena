export interface LanguageOption {
  code: string;
  badge: string;
  nativeTitle: string;
  nativeDesktopTitle: string;
}

export const TOKENS = {
  colors: {
    pageBg: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceMuted: "#F1F5F9",
    surfaceSelected: "#EFF6FF",
    primary: "#0D5BD7",
    primaryHover: "#0A49B0",
    primarySoft: "#DBEAFE",
    textMain: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#64748B",
    border: "#E2E8F0",
    borderSelected: "#0D5BD7",
    successText: "#0F766E",
    warningBg: "#FFF7ED",
    warningBorder: "#FDBA74",
    warningText: "#9A3412",
  },
  typography: {
    title: "text-2xl sm:text-[28px] font-bold leading-tight tracking-tight",
    subtitle: "text-base font-medium leading-relaxed",
    body: "text-base leading-relaxed",
  },
} as const;

export const ONBOARDING_CONFIG = {
  brandName: "SipNena",
  gradesRange: "Grades 6–11",
  languages: [
    {
      code: "si",
      badge: "සි",
      nativeTitle: "සිංහල",
      nativeDesktopTitle: "සිංහල මාධ්‍යය",
    },
    {
      code: "ta",
      badge: "த",
      nativeTitle: "தமிழ்",
      nativeDesktopTitle: "தமிழ் மொழி மூலம்",
    },
    {
      code: "en",
      badge: "En",
      nativeTitle: "English",
      nativeDesktopTitle: "English Medium",
    },
  ] as LanguageOption[],
};
