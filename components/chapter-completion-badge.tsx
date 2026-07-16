"use client";

import { CircleCheck } from "lucide-react";
import { useProgress } from "@/lib/progress";

export function ChapterCompletionBadge({ slugs }: { slugs: string[] }) {
  const { isDone, ready } = useProgress();
  if (!ready) return null;

  const done = slugs.filter((s) => isDone(s)).length;
  const all = done === slugs.length && slugs.length > 0;

  return (
    <span
      className={`hidden shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-flex ${
        all
          ? "bg-accent-soft text-accent-soft-fg"
          : "bg-bg-muted text-fg-subtle"
      }`}
    >
      {all && <CircleCheck className="h-3.5 w-3.5" aria-hidden />}
      {done}/{slugs.length}
    </span>
  );
}
