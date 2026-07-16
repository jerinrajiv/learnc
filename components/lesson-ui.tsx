import type { ReactNode } from "react";
import { CircleCheck, BookMarked } from "lucide-react";

/** Bulleted "what you'll learn / key takeaways" panel. */
export function KeyTakeaways({
  title = "Key takeaways",
  items,
}: {
  title?: string;
  items: ReactNode[];
}) {
  return (
    <section className="not-prose my-8 rounded-2xl border border-border bg-bg-subtle p-5 sm:p-6">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-fg">
        <BookMarked className="h-5 w-5 text-primary" aria-hidden />
        {title}
      </h2>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-fg-muted">
            <CircleCheck
              className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent"
              aria-hidden
            />
            <span className="text-[0.95rem] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A term/definition pair styled as a highlighted box. */
export function Definition({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-5 rounded-lg border-l-4 border-primary bg-primary-soft/50 px-4 py-3">
      <dt className="font-mono text-sm font-semibold text-primary-soft-fg">
        {term}
      </dt>
      <dd className="mt-1 text-[0.95rem] leading-relaxed text-fg-muted">
        {children}
      </dd>
    </div>
  );
}

/** Two-column "do / don't" comparison. */
export function Compare({
  good,
  bad,
  goodLabel = "Prefer this",
  badLabel = "Avoid this",
}: {
  good: ReactNode;
  bad: ReactNode;
  goodLabel?: string;
  badLabel?: string;
}) {
  return (
    <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-accent-soft-fg/25 bg-accent-soft p-4">
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-accent-soft-fg">
          {goodLabel}
        </div>
        {good}
      </div>
      <div className="rounded-xl border border-danger-border bg-danger-soft p-4">
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-danger">
          {badLabel}
        </div>
        {bad}
      </div>
    </div>
  );
}
