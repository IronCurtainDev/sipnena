export interface LanguageOption {
  code: string;
  badge: string;
  nativeTitle: string;
  nativeDesktopTitle: string;
}

export const TOKENS = {
  colors: {
    pageBg: "#FEFAE0",
    surface: "#FFFFFF",
    surfaceMuted: "#E9EDC9",
    surfaceSelected: "#CCD5AE",
    primary: "#01472E",
    primaryHover: "#013825",
    primarySoft: "#CCD5AE",
    sage: "#CCD5AE",
    olive: "#E9EDC9",
    cream: "#FEFAE0",
    moss: "#A3B18A",
    textMain: "#01472E",
    textSecondary: "#4A5D4E",
    textMuted: "#4A5D4E",
    border: "rgb(1 71 46 / 12%)",
    borderSelected: "#01472E",
    successText: "#01472E",
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
