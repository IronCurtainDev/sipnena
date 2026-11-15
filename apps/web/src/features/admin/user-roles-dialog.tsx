import { DEFAULT_ROLE, parseRoles } from "@repo/contracts";
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
import { RolePicker } from "@/features/access/role-picker";
import { setUserRoles, type AdminUser } from "./api";
import type { RowAction } from "./use-row-action";

export const userRoles = (user: AdminUser) => {
  const roles = parseRoles(user.role);
  return roles.length ? roles : [DEFAULT_ROLE];
};

export function UserRolesDialog({
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
  const [roles, setRoles] = useState(() => userRoles(user));
  const key = `role:${user.id}`;
  const pending = action.busy(key);
  function close(next: boolean) {
    if (pending) return;
    if (!next) setRoles(userRoles(user));
    onOpenChange(next);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void action
      .run(key, () => setUserRoles(user.id, roles), "Roles updated.")
      .then((saved) => {
        if (saved) onOpenChange(false);
      });
  }
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-md">
        <form className="grid gap-4" onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Change roles</DialogTitle>
            <DialogDescription>
              Choose the roles for{" "}
              <span className="font-medium break-all text-foreground">
                {user.email}
              </span>
              . Their permissions combine.
            </DialogDescription>
          </DialogHeader>
          {open && <RolePicker value={roles} onChange={setRoles} />}
          {open && <Feedback error={action.error} />}
          <DialogFooter>
            <Button type="submit" disabled={pending || !roles.length}>
              {pending ? "Saving…" : "Save roles"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
