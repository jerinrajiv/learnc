"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

/** Reads headings from the rendered article and highlights the one in view. */
export function TableOfContents({
  containerId = "lesson-body",
}: {
  containerId?: string;
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const nodes = Array.from(
      container.querySelectorAll("h2, h3"),
    ) as HTMLHeadingElement[];

    const items: Heading[] = nodes
      .filter((n) => n.id)
      .map((n) => ({
        id: n.id,
        text: n.textContent ?? "",
        level: n.tagName === "H2" ? 2 : 3,
      }));
    setHeadings(items);

    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((n) => n.id && observer.observe(n));
    return () => observer.disconnect();
  }, [containerId]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-wide text-fg-subtle">
        <List className="h-3.5 w-3.5" aria-hidden />
        On this page
      </p>
      <ul className="flex flex-col gap-1 border-l border-border">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`-ml-px block border-l-2 py-1 leading-snug transition-colors ${
                  h.level === 3 ? "pl-6" : "pl-3"
                } ${
                  active
                    ? "border-primary font-medium text-primary"
                    : "border-transparent text-fg-subtle hover:border-border-strong hover:text-fg"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
