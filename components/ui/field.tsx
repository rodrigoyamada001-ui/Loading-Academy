import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number | null;
  className?: string;
};

export function Field({ label, name, type = "text", placeholder, required, defaultValue, className }: FieldProps) {
  return (
    <label className={cn("grid gap-2 text-sm text-slate-300", className)}>
      <span>{label}</span>
      <input
        className="min-h-11 rounded-md border border-premium-line/75 bg-premium-base/55 px-3 text-premium-mist outline-none transition placeholder:text-slate-400 focus:border-premium-cyan"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue ?? undefined}
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  placeholder,
  required,
  defaultValue,
  rows = 5
}: FieldProps & { rows?: number }) {
  return (
    <label className="grid gap-2 text-sm text-slate-300">
      <span>{label}</span>
      <textarea
        className="min-h-32 rounded-md border border-premium-line/75 bg-premium-base/55 px-3 py-3 text-premium-mist outline-none transition placeholder:text-slate-400 focus:border-premium-cyan"
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue ?? undefined}
        rows={rows}
      />
    </label>
  );
}

export function Select({
  label,
  name,
  defaultValue,
  children
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm text-slate-300">
      <span>{label}</span>
      <select
        className="min-h-11 rounded-md border border-premium-line/75 bg-premium-base/55 px-3 text-premium-mist outline-none transition focus:border-premium-cyan"
        name={name}
        defaultValue={defaultValue ?? undefined}
      >
        {children}
      </select>
    </label>
  );
}
