import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { CURRICULUM, TOTAL_LESSONS, TOTAL_CHAPTERS } from "@/lib/curriculum";
import { ChapterCompletionBadge } from "@/components/chapter-completion-badge";

export const metadata = {
  title: "Full curriculum",
  description:
    "The complete C++ curriculum — every chapter and lesson from your first program to classes and containers.",
};

export default function CurriculumPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-10">
      <header className="mb-10">
        <p className="mb-2 font-mono text-sm font-semibold text-primary">
          The complete course
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          C++ Curriculum
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-fg-muted">
          {TOTAL_CHAPTERS} chapters and {TOTAL_LESSONS} lessons, ordered so each
          one builds on the last. Start at the top, or jump to whatever you need.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {CURRICULUM.map((ch) => (
          <section
            key={ch.num}
            className="overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div className="flex items-start gap-4 border-b border-border bg-bg-subtle px-5 py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary font-mono text-lg font-bold text-primary-fg">
                {ch.num}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold text-fg">{ch.title}</h2>
                <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">
                  {ch.intro}
                </p>
              </div>
              <ChapterCompletionBadge slugs={ch.lessons.map((l) => l.slug)} />
            </div>

            <ul className="divide-y divide-border">
              {ch.lessons.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/learn/${l.slug}`}
                    className="group flex items-center gap-4 px-5 py-3 transition-colors hover:bg-bg-subtle"
                  >
                    <span className="w-10 shrink-0 font-mono text-sm font-semibold text-fg-subtle">
                      {l.num}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-fg group-hover:text-primary">
                        {l.title}
                      </span>
                      <span className="block truncate text-sm text-fg-subtle">
                        {l.summary}
                      </span>
                    </span>
                    <span className="hidden shrink-0 items-center gap-1 text-xs text-fg-subtle sm:flex">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {l.minutes}m
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
