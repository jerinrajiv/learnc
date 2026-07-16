"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Check, Circle } from "lucide-react";
import { CURRICULUM } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { isDone, ready } = useProgress();
  const activeSlug = pathname.startsWith("/learn/")
    ? pathname.replace("/learn/", "")
    : null;

  // Which chapter contains the active lesson — start it open.
  const activeChapter = CURRICULUM.find((ch) =>
    ch.lessons.some((l) => l.slug === activeSlug),
  )?.num;

  const [open, setOpen] = useState<Set<number>>(
    () => new Set(activeChapter !== undefined ? [activeChapter] : [0]),
  );

  // Keep the active chapter expanded when navigation changes.
  useEffect(() => {
    if (activeChapter !== undefined) {
      setOpen((prev) => {
        if (prev.has(activeChapter)) return prev;
        const next = new Set(prev);
        next.add(activeChapter);
        return next;
      });
    }
  }, [activeChapter]);

  const toggleChapter = (num: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });

  const activeRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeSlug]);

  return (
    <nav aria-label="Course chapters" className="flex flex-col gap-1 pb-8">
      {CURRICULUM.map((ch) => {
        const isOpen = open.has(ch.num);
        const doneCount = ch.lessons.filter((l) => isDone(l.slug)).length;
        const allDone = ready && doneCount === ch.lessons.length;

        return (
          <div key={ch.num}>
            <button
              type="button"
              onClick={() => toggleChapter(ch.num)}
              aria-expanded={isOpen}
              className="group flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-bg-muted"
            >
              <ChevronRight
                className={`h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
                aria-hidden
              />
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-bg-muted font-mono text-[0.7rem] font-bold text-fg-subtle group-hover:bg-surface">
                {ch.num}
              </span>
              <span className="flex-1 text-[0.82rem] font-semibold leading-tight text-fg">
                {ch.title}
              </span>
              {ready && (
                <span
                  className={`shrink-0 font-mono text-[0.7rem] tabular-nums ${
                    allDone ? "text-accent" : "text-fg-subtle"
                  }`}
                  aria-label={`${doneCount} of ${ch.lessons.length} complete`}
                >
                  {doneCount}/{ch.lessons.length}
                </span>
              )}
            </button>

            {isOpen && (
              <ul className="mb-1 ml-[1.15rem] flex flex-col border-l border-border pl-2">
                {ch.lessons.map((l) => {
                  const active = l.slug === activeSlug;
                  const done = isDone(l.slug);
                  return (
                    <li key={l.slug}>
                      <Link
                        ref={active ? activeRef : undefined}
                        href={`/learn/${l.slug}`}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-start gap-2 rounded-md px-2.5 py-1.5 text-[0.82rem] leading-snug transition-colors ${
                          active
                            ? "bg-primary-soft font-semibold text-primary-soft-fg"
                            : "text-fg-muted hover:bg-bg-muted hover:text-fg"
                        }`}
                      >
                        <span className="mt-0.5 shrink-0">
                          {done ? (
                            <Check
                              className="h-3.5 w-3.5 text-accent"
                              aria-label="Completed"
                            />
                          ) : (
                            <Circle
                              className={`h-3.5 w-3.5 ${
                                active ? "text-primary" : "text-border-strong"
                              }`}
                              aria-hidden
                            />
                          )}
                        </span>
                        <span>
                          <span className="font-mono text-[0.72rem] opacity-70">
                            {l.num}
                          </span>{" "}
                          {l.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
