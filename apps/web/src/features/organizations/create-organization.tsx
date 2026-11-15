import { Plus } from "lucide-react";
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
import { useAction } from "@/hooks/use-action";
import { queryClient } from "@/lib/api/query-client";
import { authClient, checkAuth } from "@/lib/auth/client";
import { slugify } from "@/lib/format";

export function CreateOrganizationDialog({
  triggerLabel = "New organization",
}: {
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const action = useAction();
  function submit(event: FormEvent) {
    event.preventDefault();
    void action.run(async () => {
      if (!name.trim()) throw new Error("Please enter an organization name.");
      const result = checkAuth(
        await authClient.organization.create({
          name: name.trim(),
          slug,
          keepCurrentActiveOrganization: true,
        }),
      );
      await queryClient.invalidateQueries({ queryKey: ["organizations"] });
      if (result.data)
        window.location.assign(
          `/organizations/${encodeURIComponent(result.data.id)}`,
        );
    });
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => !action.pending && setOpen(next)}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form className="grid gap-4" onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Create an organization</DialogTitle>
            <DialogDescription>
              A shared space for people working together. Files stay personal.
            </DialogDescription>
          </DialogHeader>
          <Field
            label="Organization name"
            placeholder="Acme Inc."
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (!slugEdited) setSlug(slugify(event.target.value));
            }}
            maxLength={100}
            required
          />
          <Field
            label="Organization slug"
            value={slug}
            onChange={(event) => {
              setSlugEdited(true);
              setSlug(event.target.value);
            }}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            maxLength={64}
            title="Lowercase letters and numbers, separated by hyphens"
            placeholder="acme-inc"
            description="Lowercase letters, numbers, and hyphens. Must be unique."
            required
          />
          <Feedback error={action.error} />
          <DialogFooter>
            <Button type="submit" disabled={action.pending}>
              {action.pending ? "Creating…" : "Create organization"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
