"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CircleCheck } from "lucide-react";
import { useProgress } from "@/lib/progress";
import type { FlatLesson } from "@/lib/curriculum";

export function LessonFooter({
  slug,
  prev,
  next,
}: {
  slug: string;
  prev?: FlatLesson;
  next?: FlatLesson;
}) {
  const { isDone, toggle } = useProgress();
  const done = isDone(slug);

  return (
    <div className="mt-12 border-t border-border pt-8">
      {/* Mark complete */}
      <div className="mb-8 flex flex-col items-center gap-3 rounded-2xl border border-border bg-bg-subtle px-6 py-6 text-center">
        <p className="text-sm text-fg-muted">
          {done
            ? "Nice work — this lesson is marked complete."
            : "Finished reading? Mark this lesson complete to track your progress."}
        </p>
        <button
          type="button"
          onClick={() => toggle(slug)}
          aria-pressed={done}
          className={`flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
            done
              ? "border border-accent bg-accent-soft text-accent-soft-fg hover:bg-accent-soft/70"
              : "bg-accent text-accent-fg hover:bg-accent-hover"
          }`}
        >
          {done ? (
            <>
              <CircleCheck className="h-4 w-4" aria-hidden />
              Completed
            </>
          ) : (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Mark as complete
            </>
          )}
        </button>
      </div>

      {/* Prev / next */}
      <nav
        aria-label="Lesson navigation"
        className="grid gap-3 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/learn/${prev.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary hover:bg-bg-subtle"
          >
            <span className="flex items-center gap-1.5 text-xs font-medium text-fg-subtle">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Previous
            </span>
            <span className="mt-1 text-sm font-semibold text-fg group-hover:text-primary">
              <span className="font-mono text-xs opacity-70">{prev.num}</span>{" "}
              {prev.title}
            </span>
          </Link>
        ) : (
          <span aria-hidden />
        )}

        {next ? (
          <Link
            href={`/learn/${next.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-surface p-4 text-right transition-colors hover:border-primary hover:bg-bg-subtle"
          >
            <span className="flex items-center justify-end gap-1.5 text-xs font-medium text-fg-subtle">
              Next
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="mt-1 text-sm font-semibold text-fg group-hover:text-primary">
              <span className="font-mono text-xs opacity-70">{next.num}</span>{" "}
              {next.title}
            </span>
          </Link>
        ) : (
          <span aria-hidden />
        )}
      </nav>
    </div>
  );
}
