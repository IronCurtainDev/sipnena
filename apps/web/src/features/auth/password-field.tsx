import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { FieldShell } from "@/components/app/field";
import { Input } from "@/components/ui/input";

export function PasswordField({
  label = "Password",
  labelAction,
  description,
  ...props
}: Omit<ComponentProps<"input">, "type"> & {
  label?: string;
  labelAction?: ReactNode;
  description?: ReactNode;
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return (
    <FieldShell
      id={id}
      label={label}
      labelAction={labelAction}
      description={description}
    >
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          className="h-9 pr-10"
          aria-describedby={description ? `${id}-description` : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 grid w-9 place-items-center rounded-r-lg text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </FieldShell>
  );
}
