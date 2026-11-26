import React from "react";
import { Check, ShieldCheck } from "lucide-react";
import { AvatarIcon } from "./avatar-icon";
import { STUDENT_AVATARS } from "./mock-data";
import type { ProfileStrings } from "./strings.types";

interface AvatarPickerProps {
  currentAvatarId: string;
  onSelectAvatar: (id: string) => void;
  strings: ProfileStrings;
  isDesktop?: boolean;
}

export function AvatarPicker({
  currentAvatarId,
  onSelectAvatar,
  strings,
  isDesktop = false,
}: AvatarPickerProps) {
  return (
    <div className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold text-[var(--sn-text-main)] text-base sm:text-lg">
          {strings.avatarSectionTitle}
        </h3>
        <span className="rounded-full bg-[var(--sn-surface-selected)] px-2.5 py-0.5 text-xs font-semibold text-[var(--sn-primary)]">
          {strings.avatarChoicesCount}
          {isDesktop && " • Preset safe characters only"}
        </span>
      </div>

      <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
        {strings.avatarSubtitleMobile}
      </p>

      {/* Child Safe Policy Banner on Desktop or when expanded */}
      {isDesktop && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-selected)] p-3.5 text-xs leading-relaxed text-[var(--sn-text-main)]">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--sn-primary)]" />
          <div>
            <span className="font-bold">{strings.childSafePolicyTitle}: </span>
            <span>{strings.childSafePolicyDesc}</span>
          </div>
        </div>
      )}

      {/* Avatars Grid / Row */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-6 sm:gap-4 sm:overflow-visible sm:pb-0">
        {STUDENT_AVATARS.map((avatar) => {
          const isSelected = currentAvatarId === avatar.id;
          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() => onSelectAvatar(avatar.id)}
              className={`group relative flex flex-col items-center rounded-2xl p-2 transition-all focus:outline-none sm:p-2.5 ${
                isSelected
                  ? "bg-[var(--sn-surface-selected)] ring-2 ring-[var(--sn-primary)] shadow-xs"
                  : "hover:bg-[var(--sn-surface-muted)] active:scale-95"
              }`}
              aria-label={`Select avatar ${avatar.name}`}
            >
              <div className="relative">
                <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-sm sm:h-16 sm:w-16">
                  <AvatarIcon
                    id={avatar.id}
                    size={64}
                    className="h-full w-full"
                  />
                </div>
                {isSelected && (
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--sn-primary)] text-white shadow-sm ring-2 ring-white">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <span
                className={`mt-2 text-center text-xs font-medium truncate max-w-[70px] sm:max-w-none ${
                  isSelected
                    ? "font-bold text-[var(--sn-primary)]"
                    : "text-[var(--sn-text-main)]"
                }`}
              >
                {avatar.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
