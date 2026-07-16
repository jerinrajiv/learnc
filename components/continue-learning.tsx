"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, RotateCcw } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { FLAT_LESSONS, TOTAL_LESSONS } from "@/lib/curriculum";

export function ContinueLearning() {
  const { completed, isDone, ready } = useProgress();

  if (!ready) {
    // Reserve space to avoid layout shift while progress loads.
    return <div className="h-[68px]" aria-hidden />;
  }

  const done = completed.size;
  const nextLesson =
    FLAT_LESSONS.find((l) => !isDone(l.slug)) ?? FLAT_LESSONS[0];
  const started = done > 0;
  const pct = Math.round((done / TOTAL_LESSONS) * 100);

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <Link
        href={`/learn/${nextLesson.slug}`}
        className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-fg shadow-sm transition-all hover:bg-primary-hover hover:shadow-md"
      >
        {started ? (
          <RotateCcw className="h-5 w-5" aria-hidden />
        ) : (
          <PlayCircle className="h-5 w-5" aria-hidden />
        )}
        {started ? "Continue learning" : "Start the course"}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>

      {started && (
        <span className="text-sm text-fg-muted">
          <span className="font-semibold text-fg">{pct}%</span> complete ·
          up next{" "}
          <span className="font-mono text-fg-muted">{nextLesson.num}</span>
        </span>
      )}
    </div>
  );
}
