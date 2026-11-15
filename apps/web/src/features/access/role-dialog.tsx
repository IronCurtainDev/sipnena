import {
  PERMISSION_NAMES,
  SUPER_ADMIN_ROLE,
  isPermission,
  type Permission,
  type Role,
} from "@repo/contracts";
import { useState, type FormEvent, type ReactNode } from "react";
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
import { useAction } from "@/hooks/use-action";
import { createRole, updateRole } from "./api";
import { PermissionChecklist } from "./permission-checklist";

const grantedBy = (role?: Role): Permission[] =>
  role?.name === SUPER_ADMIN_ROLE
    ? [...PERMISSION_NAMES]
    : (role?.permissions.filter(isPermission) ?? []);

export function RoleDialog({
  role,
  trigger,
  onSaved,
  allowedPermissions,
}: {
  role?: Role;
  trigger: ReactNode;
  onSaved: (message: string) => void;
  allowedPermissions: readonly Permission[];
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const action = useAction();
  const superAdmin = role?.name === SUPER_ADMIN_ROLE;

  function changeOpen(next: boolean) {
    if (action.pending) return;
    if (next) {
      setName(role?.name ?? "");
      setDescription(role?.description ?? "");
      setPermissions(grantedBy(role));
    }
    setOpen(next);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void action
      .run(() =>
        role
          ? updateRole(role.id, {
              description,
              ...(superAdmin ? {} : { permissions }),
            })
          : createRole({ name, description, permissions }),
      )
      .then((saved) => {
        if (!saved) return;
        setOpen(false);
        onSaved(
          role ? `Role “${role.name}” updated.` : `Role “${name}” created.`,
        );
      });
  }

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-2xl">
        <form className="grid gap-5" onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>{role ? `Edit ${role.name}` : "New role"}</DialogTitle>
            <DialogDescription>
              {superAdmin
                ? "The admin role always has every permission, including ones added later."
                : "Choose what people with this role can do. Changes apply on their next request."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-[14rem_1fr]">
            <Field
              label="Role name"
              value={name}
              onChange={(event) => setName(event.target.value.toLowerCase())}
              description={
                role ? "Names cannot change." : "Lowercase, e.g. billing-team."
              }
              pattern="[a-z][a-z0-9\-]{1,31}"
              disabled={Boolean(role)}
              autoComplete="off"
              required
            />
            <Field
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={200}
              placeholder="What this role is for"
            />
          </div>
          <PermissionChecklist
            value={permissions}
            onChange={setPermissions}
            disabled={superAdmin}
            allowed={allowedPermissions}
          />
          {open && <Feedback error={action.error} />}
          <DialogFooter>
            <Button type="submit" disabled={action.pending}>
              {action.pending ? "Saving…" : role ? "Save role" : "Create role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
