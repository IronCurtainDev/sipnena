import {
  PERMISSIONS,
  PERMISSION_NAMES,
  type Permission,
} from "@repo/contracts";
import { Checkbox } from "@/components/ui/checkbox";

const groups = PERMISSION_NAMES.reduce<Map<string, Permission[]>>(
  (map, name) =>
    map.set(PERMISSIONS[name].group, [
      ...(map.get(PERMISSIONS[name].group) ?? []),
      name,
    ]),
  new Map(),
);

export function PermissionChecklist({
  value,
  onChange,
  disabled,
  allowed = PERMISSION_NAMES,
}: {
  value: Permission[];
  onChange: (next: Permission[]) => void;
  disabled?: boolean;
  allowed?: readonly Permission[];
}) {
  const selected = new Set(value);
  const allowedSet = new Set(allowed);
  const toggle = (names: Permission[], checked: boolean) => {
    const next = new Set(selected);
    for (const name of names.filter((name) => allowedSet.has(name))) {
      if (checked) next.add(name);
      else next.delete(name);
    }
    onChange(PERMISSION_NAMES.filter((name) => next.has(name)));
  };
  return (
    <div className="grid gap-4">
      {[...groups].map(([group, names]) => {
        const all = names.every((name) => selected.has(name));
        const some = names.some((name) => selected.has(name));
        return (
          <fieldset key={group} className="grid gap-2 rounded-lg border p-3">
            <legend className="sr-only">{group}</legend>
            <label className="flex items-center gap-2.5 text-sm font-medium">
              <Checkbox
                checked={all ? true : some ? "indeterminate" : false}
                disabled={
                  disabled || names.every((name) => !allowedSet.has(name))
                }
                onCheckedChange={(checked) => toggle(names, checked === true)}
                aria-label={`All ${group.toLowerCase()} permissions`}
              />
              {group}
            </label>
            <div className="grid gap-2 pl-6 sm:grid-cols-2">
              {names.map((name) => (
                <label
                  key={name}
                  className="flex items-start gap-2.5 text-sm leading-tight"
                >
                  <Checkbox
                    className="mt-0.5"
                    checked={selected.has(name)}
                    disabled={disabled || !allowedSet.has(name)}
                    onCheckedChange={(checked) =>
                      toggle([name], checked === true)
                    }
                  />
                  <span className="grid gap-0.5">
                    {PERMISSIONS[name].label}
                    <code className="font-mono text-xs text-muted-foreground">
                      {name}
                    </code>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
