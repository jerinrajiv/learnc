"use client";

import { useProgress } from "@/lib/progress";
import { TOTAL_LESSONS } from "@/lib/curriculum";
import { Trophy } from "lucide-react";

export function CourseProgressBar() {
  const { completed, ready } = useProgress();
  const done = completed.size;
  const pct = TOTAL_LESSONS ? Math.round((done / TOTAL_LESSONS) * 100) : 0;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-fg">
          <Trophy className="h-3.5 w-3.5 text-accent" aria-hidden />
          Your progress
        </span>
        <span className="font-mono text-[0.78rem] tabular-nums text-fg-subtle">
          {ready ? `${done}/${TOTAL_LESSONS}` : "—"}
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course completion"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: ready ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}
