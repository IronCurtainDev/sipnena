import { useState, type FormEvent } from "react";
import { Feedback } from "@/components/app/feedback";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PasswordField } from "@/features/auth/password-field";
import { setAdminPassword, type AdminUser } from "./api";
import type { RowAction } from "./use-row-action";

export function SetPasswordDialog({
  user,
  action,
  open,
  onOpenChange,
}: {
  user: AdminUser;
  action: RowAction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [password, setPassword] = useState("");
  const key = `password:${user.id}`;
  const pending = action.busy(key);
  function close(next: boolean) {
    if (pending) return;
    if (!next) setPassword("");
    onOpenChange(next);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void action
      .run(key, () => setAdminPassword(user.id, password), "Password updated.")
      .then((saved) => {
        if (saved) close(false);
      });
  }
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <form className="grid gap-4" onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Set a new password</DialogTitle>
            <DialogDescription>
              Choose a new password for{" "}
              <span className="font-medium break-all text-foreground">
                {user.email}
              </span>
              . Share it with them through a secure channel.
            </DialogDescription>
          </DialogHeader>
          <PasswordField
            label="New password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            description="At least 8 characters."
            required
          />
          {open && <Feedback error={action.error} />}
          <DialogFooter>
            <Button type="submit" disabled={pending || password.length < 8}>
              {pending ? "Saving…" : "Set password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
