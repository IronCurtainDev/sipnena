import { useState, type FormEvent, type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Feedback } from "./feedback";

export const solidDestructive =
  "bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive/80 dark:hover:bg-destructive/70";

type ConfirmDialogProps = {
  title: string;
  description: ReactNode;
  confirmLabel: string;
  pendingLabel?: string;
  destructive?: boolean;
  pending?: boolean;
  error?: string;
  /** Return false to keep the dialog open, for example after a failed request. */
  onConfirm: () => Promise<boolean | void> | boolean | void;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  pendingLabel = "Working…",
  destructive = false,
  pending = false,
  error,
  onConfirm,
  trigger,
  open,
  onOpenChange,
  children,
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  async function submit(event: FormEvent) {
    event.preventDefault();
    if ((await onConfirm()) !== false) setOpen(false);
  }
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(next) => {
        if (!pending) setOpen(next);
      }}
    >
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <form className="grid gap-4" onSubmit={(event) => void submit(event)}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          {children}
          {isOpen && <Feedback error={error} />}
          <AlertDialogFooter>
            <AlertDialogCancel type="button" disabled={pending}>
              Cancel
            </AlertDialogCancel>
            <Button
              type="submit"
              disabled={pending}
              className={destructive ? solidDestructive : undefined}
            >
              {pending ? pendingLabel : confirmLabel}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
