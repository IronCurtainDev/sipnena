import { DEFAULT_ROLE } from "@repo/contracts";
import { UserPlus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Feedback } from "@/components/app/feedback";
import { Field } from "@/components/app/field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RolePicker } from "@/features/access/role-picker";
import { PasswordField } from "@/features/auth/password-field";
import { createAdminUser } from "./api";
import type { RowAction } from "./use-row-action";

export function CreateUserDialog({ action }: { action: RowAction }) {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState([DEFAULT_ROLE]);
  const pending = action.busy("create");
  function changeOpen(next: boolean) {
    if (pending) return;
    if (next) setRoles([DEFAULT_ROLE]);
    setOpen(next);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => {
      const value = data.get(name);
      return typeof value === "string" ? value : "";
    };
    void action
      .run(
        "create",
        () =>
          createAdminUser({
            name: field("name"),
            email: field("email"),
            password: field("password"),
            role: roles,
          }),
        "User created.",
      )
      .then((created) => {
        if (created) setOpen(false);
      });
  }
  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus />
          Add user
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-md">
        <form className="grid gap-4" onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Add user</DialogTitle>
            <DialogDescription>
              Create an account directly. The user can change their password
              later.
            </DialogDescription>
          </DialogHeader>
          <Field label="Name" name="name" autoComplete="off" required />
          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="off"
            required
          />
          <PasswordField
            name="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            description="At least 8 characters."
            required
          />
          {open && <RolePicker value={roles} onChange={setRoles} />}
          {open && <Feedback error={action.error} />}
          <DialogFooter>
            <Button type="submit" disabled={pending || !roles.length}>
              {pending ? "Creating…" : "Create user"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
