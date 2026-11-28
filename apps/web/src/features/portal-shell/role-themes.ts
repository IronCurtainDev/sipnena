import type { LocalizedText } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { DemoRole } from "@/lib/prototype-state";

export interface RoleVisualConfig {
  portalBadge: LocalizedText;
  personaName: LocalizedText;
  personaShort: LocalizedText;
  personaRoleLine: LocalizedText;
  footerTitle: LocalizedText;
  footerBadge: LocalizedText;
  pageBgCls: string;
  sidebarBgCls: string;
  sidebarBorderCls: string;
  brandTitleCls: string;
  brandSubCls: string;
  groupTitleCls: string;
  activeNavCls: string;
  inactiveNavCls: string;
  footerCardCls: string;
  footerTextCls: string;
  footerBadgeCls: string;
  topStripCls: string;
  badgePillCls: string;
  avatarBtnCls: string;
  switcherBarCls: string;
  activeRoleBtnCls: string;
  inactiveRoleBtnCls: string;
  tabletTextCls: string;
}

export const ROLE_VISUAL_CONFIG: Record<DemoRole, RoleVisualConfig> = {
  student: {
    portalBadge: {
      en: "Student Space",
      si: "ශිෂ්‍ය අවකාශය",
      ta: "மாணவர் தளம்",
    },
    personaName: {
      en: "Student",
      si: "ශිෂ්‍ය",
      ta: "மாணவர்",
    },
    personaShort: { en: "Student", si: "ශිෂ්‍ය", ta: "மாணவர்" },
    personaRoleLine: {
      en: "Student Account",
      si: "ශිෂ්‍ය ගිණුම",
      ta: "மாணவர் கணக்கு",
    },
    footerTitle: { en: "NIE 2026", si: "NIE 2026", ta: "NIE 2026" },
    footerBadge: { en: "Term 2", si: "2 වන වාරය", ta: "2ஆம் தவணை" },
    pageBgCls: "bg-[var(--sn-page-bg)]",
    sidebarBgCls: "bg-[var(--sn-surface)]",
    sidebarBorderCls: "border-[var(--sn-border)]",
    brandTitleCls: "text-[var(--sn-text-main)]",
    brandSubCls: "text-[var(--sn-text-muted)]",
    groupTitleCls: "text-[var(--sn-text-muted)]",
    activeNavCls: "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]",
    inactiveNavCls:
      "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)]",
    footerCardCls: "border-[var(--sn-border)] bg-[var(--sn-olive)]/70",
    footerTextCls: "text-[var(--sn-primary)]",
    footerBadgeCls: "bg-[var(--sn-primary)] text-white",
    topStripCls: "bg-emerald-50/80 border-emerald-200/70",
    badgePillCls: "bg-[var(--sn-primary)] text-white",
    avatarBtnCls: "bg-[var(--sn-primary)] text-white",
    switcherBarCls: "border-[var(--sn-border)] bg-[var(--sn-surface-muted)]",
    activeRoleBtnCls: "bg-[var(--sn-primary)] text-white shadow-xs",
    inactiveRoleBtnCls:
      "text-[var(--sn-text-secondary)] hover:text-[var(--sn-text-main)]",
    tabletTextCls: "text-[var(--sn-primary)]",
  },
  parent: {
    portalBadge: {
      en: "Parent / Guardian Portal",
      si: "දෙමාපිය / භාරකරු ද්වාරය",
      ta: "பெற்றோர் / பாதுகாவலர் தளம்",
    },
    personaName: {
      en: "Parent / Guardian",
      si: "දෙමාපිය / භාරකරු",
      ta: "பெற்றோர் / பாதுகாவலர்",
    },
    personaShort: { en: "Parent", si: "දෙමාපිය", ta: "பெற்றோர்" },
    personaRoleLine: {
      en: "Guardian Account",
      si: "භාරකරු ගිණුම",
      ta: "பாதுகாவலர் கணக்கு",
    },
    footerTitle: {
      en: "Guardian Desk",
      si: "දෙමාපිය සහාය",
      ta: "பெற்றோர் சேவை",
    },
    footerBadge: {
      en: "Linked kids",
      si: "සම්බන්ධිත",
      ta: "இணைப்புகள்",
    },
    pageBgCls: "bg-sky-50/45",
    sidebarBgCls: "bg-[#0F2744] text-white",
    sidebarBorderCls: "border-[#1E3A5F]",
    brandTitleCls: "text-white",
    brandSubCls: "text-sky-200/85",
    groupTitleCls: "text-sky-300/80",
    activeNavCls: "bg-sky-500 text-white shadow-xs",
    inactiveNavCls: "text-sky-100/85 hover:bg-white/10 hover:text-white",
    footerCardCls: "border-[#1E3A5F] bg-[#16355C]",
    footerTextCls: "text-sky-100",
    footerBadgeCls: "bg-sky-400 text-slate-950",
    topStripCls: "bg-sky-50 border-sky-200",
    badgePillCls: "bg-[#0F2744] text-white",
    avatarBtnCls: "bg-[#0F2744] text-white",
    switcherBarCls: "border-sky-200 bg-white",
    activeRoleBtnCls: "bg-[#0F2744] text-white shadow-xs",
    inactiveRoleBtnCls: "text-slate-600 hover:text-[#0F2744]",
    tabletTextCls: "text-white",
  },
  teacher: {
    portalBadge: {
      en: "Teacher / Tutor Studio",
      si: "ගුරු මැදිරිය",
      ta: "ஆசிரியர் ஸ்டுடியோ",
    },
    personaName: {
      en: "Teacher",
      si: "ගුරුවරයා",
      ta: "ஆசிரியர்",
    },
    personaShort: { en: "Teacher", si: "ගුරු", ta: "ஆசிரியர்" },
    personaRoleLine: {
      en: "Teacher Account",
      si: "ගුරු ගිණුම",
      ta: "ஆசிரியர் கணக்கு",
    },
    footerTitle: {
      en: "Tutor Panel",
      si: "ලියාපදිංචි ගුරු",
      ta: "ஆசிரியர் குழு",
    },
    footerBadge: { en: "Verified", si: "තහවුරුයි", ta: "சரிபார்த்தல்" },
    pageBgCls: "bg-[var(--sn-page-bg)]",
    sidebarBgCls: "bg-[var(--sn-surface)]",
    sidebarBorderCls: "border-[var(--sn-border)]",
    brandTitleCls: "text-[var(--sn-text-main)]",
    brandSubCls: "text-[var(--sn-text-muted)]",
    groupTitleCls: "text-[var(--sn-text-muted)]",
    activeNavCls: "bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]",
    inactiveNavCls:
      "text-[var(--sn-text-secondary)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)]",
    footerCardCls: "border-[var(--sn-border)] bg-[var(--sn-olive)]/70",
    footerTextCls: "text-[var(--sn-primary)]",
    footerBadgeCls: "bg-[var(--sn-primary)] text-white",
    topStripCls: "bg-[var(--sn-cream)] border-[var(--sn-border)]",
    badgePillCls: "bg-[var(--sn-primary)] text-white",
    avatarBtnCls: "bg-[var(--sn-primary)] text-[var(--sn-cream)]",
    switcherBarCls: "border-[var(--sn-border)] bg-[var(--sn-surface-muted)]",
    activeRoleBtnCls: "bg-[var(--sn-primary)] text-white shadow-xs",
    inactiveRoleBtnCls:
      "text-[var(--sn-text-secondary)] hover:text-[var(--sn-text-main)]",
    tabletTextCls: "text-[var(--sn-primary)]",
  },
  admin: {
    portalBadge: {
      en: "Admin Operations Desk",
      si: "පරිපාලක මෙහෙයුම් මධ්‍යස්ථානය",
      ta: "நிர்வாகச் செயற்பாட்டு மையம்",
    },
    personaName: {
      en: "Admin",
      si: "පරිපාලක",
      ta: "நிர்வாகி",
    },
    personaShort: { en: "Ops Desk", si: "පරිපාලක", ta: "நிர்வாகம்" },
    personaRoleLine: {
      en: "Operations Desk",
      si: "මෙහෙයුම් මධ්‍යස්ථානය",
      ta: "செயற்பாட்டு மையம்",
    },
    footerTitle: {
      en: "Verification SLA",
      si: "තහවුරු කිරීමේ කාලය",
      ta: "சரிபார்ப்பு நேரம்",
    },
    footerBadge: { en: "15 mins", si: "මිනි. 15", ta: "15 நிமி." },
    pageBgCls: "bg-slate-100/80",
    sidebarBgCls: "bg-[#111827] text-white",
    sidebarBorderCls: "border-slate-800",
    brandTitleCls: "text-white",
    brandSubCls: "text-amber-300/90",
    groupTitleCls: "text-slate-400",
    activeNavCls: "bg-amber-500 text-slate-950 font-extrabold shadow-xs",
    inactiveNavCls: "text-slate-300 hover:bg-slate-800 hover:text-white",
    footerCardCls: "border-slate-800 bg-slate-800/70",
    footerTextCls: "text-amber-200",
    footerBadgeCls: "bg-amber-400 text-slate-950",
    topStripCls: "bg-amber-50/70 border-amber-200",
    badgePillCls: "bg-[#111827] text-amber-300",
    avatarBtnCls: "bg-[#111827] text-amber-300",
    switcherBarCls: "border-slate-300 bg-white",
    activeRoleBtnCls: "bg-[#111827] text-amber-300 shadow-xs",
    inactiveRoleBtnCls: "text-slate-600 hover:text-slate-900",
    tabletTextCls: "text-amber-300",
  },
};

export function getBrandTitle(lang: AppLanguage): string {
  if (lang === "si") return "සිප්නැණ";
  if (lang === "ta") return "சிப்நென";
  return "SipNena";
}
