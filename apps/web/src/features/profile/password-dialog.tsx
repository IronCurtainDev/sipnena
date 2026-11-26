import React, { useState } from "react";
import { KeyRound, Check, X } from "lucide-react";
import type { ProfileStrings } from "./strings.types";

interface PasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  strings: ProfileStrings;
  onSuccessToast: (msg: string) => void;
}

export function PasswordDialog({
  isOpen,
  onClose,
  strings,
  onSuccessToast,
}: PasswordDialogProps) {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      onSuccessToast("Password updated successfully!");
      onClose();
      setDone(false);
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    }, 1000);
  };

  return (
    <div className="sipnena-onboarding fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex w-full max-w-md flex-col rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-6 shadow-2xl">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 rounded-full p-2 text-[var(--sn-text-muted)] hover:bg-[var(--sn-surface-muted)] hover:text-[var(--sn-text-main)]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-7 w-7 stroke-[3]" />
            </div>
            <h4 className="mt-3 text-base font-bold text-[var(--sn-text-main)]">
              Password Changed!
            </h4>
            <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
              Your SipNena account is secure.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]">
                <KeyRound className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--sn-text-main)]">
                  {strings.settingPasswordTitle}
                </h3>
                <p className="text-xs text-[var(--sn-text-muted)]">
                  {strings.settingPasswordSub}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label
                  htmlFor="cur-pw"
                  className="block text-xs font-semibold text-[var(--sn-text-main)]"
                >
                  Current Password
                </label>
                <input
                  id="cur-pw"
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-2.5 text-xs text-[var(--sn-text-main)] placeholder:text-[var(--sn-text-muted)] focus:border-[var(--sn-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--sn-primary)]"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="new-pw"
                  className="block text-xs font-semibold text-[var(--sn-text-main)]"
                >
                  New Password (at least 8 characters)
                </label>
                <input
                  id="new-pw"
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-2.5 text-xs text-[var(--sn-text-main)] placeholder:text-[var(--sn-text-muted)] focus:border-[var(--sn-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--sn-primary)]"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="conf-pw"
                  className="block text-xs font-semibold text-[var(--sn-text-main)]"
                >
                  Confirm New Password
                </label>
                <input
                  id="conf-pw"
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-2.5 text-xs text-[var(--sn-text-main)] placeholder:text-[var(--sn-text-muted)] focus:border-[var(--sn-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--sn-primary)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] py-3 text-xs font-semibold text-[var(--sn-text-main)] hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-2xl bg-[var(--sn-primary)] py-3 text-xs font-semibold text-white shadow-sm hover:bg-[var(--sn-primary-hover)]"
              >
                {strings.updatePasswordBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
