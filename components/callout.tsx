import type { ReactNode } from "react";
import {
  Lightbulb,
  AlertTriangle,
  Info,
  ShieldCheck,
  CircleAlert,
  Star,
} from "lucide-react";

type Variant = "tip" | "warning" | "note" | "best-practice" | "rule" | "key";

const CONFIG: Record<
  Variant,
  { label: string; icon: typeof Info; className: string; iconClass: string }
> = {
  tip: {
    label: "Tip",
    icon: Lightbulb,
    className:
      "border-info-border bg-info-soft [--co-fg:var(--info)]",
    iconClass: "text-info",
  },
  note: {
    label: "Note",
    icon: Info,
    className: "border-border-strong bg-bg-subtle [--co-fg:var(--fg-muted)]",
    iconClass: "text-fg-subtle",
  },
  warning: {
    label: "Warning",
    icon: AlertTriangle,
    className:
      "border-warning-border bg-warning-soft [--co-fg:var(--warning)]",
    iconClass: "text-warning",
  },
  "best-practice": {
    label: "Best practice",
    icon: ShieldCheck,
    className:
      "border-accent-soft-fg/25 bg-accent-soft [--co-fg:var(--accent-soft-fg)]",
    iconClass: "text-accent",
  },
  rule: {
    label: "Rule",
    icon: CircleAlert,
    className:
      "border-danger-border bg-danger-soft [--co-fg:var(--danger)]",
    iconClass: "text-danger",
  },
  key: {
    label: "Key insight",
    icon: Star,
    className:
      "border-primary-soft-fg/25 bg-primary-soft [--co-fg:var(--primary-soft-fg)]",
    iconClass: "text-primary",
  },
};

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const cfg = CONFIG[variant];
  const Icon = cfg.icon;
  return (
    <aside
      className={`not-prose my-6 rounded-xl border p-4 sm:p-5 ${cfg.className}`}
      role="note"
    >
      <div className="mb-1.5 flex items-center gap-2">
        <Icon className={`h-4.5 w-4.5 shrink-0 ${cfg.iconClass}`} aria-hidden />
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--co-fg)" }}
        >
          {title ?? cfg.label}
        </span>
      </div>
      <div className="callout-body pl-6.5 text-[0.95rem] leading-relaxed text-fg-muted">
        {children}
      </div>
    </aside>
  );
}
