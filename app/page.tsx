import Link from "next/link";
import {
  BookOpen,
  Code2,
  ListChecks,
  Moon,
  Search,
  TerminalSquare,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { LandingHeader } from "@/components/landing-header";
import { ContinueLearning } from "@/components/continue-learning";
import { CodeBlock } from "@/components/code-block";
import {
  CURRICULUM,
  TOTAL_LESSONS,
  TOTAL_CHAPTERS,
} from "@/lib/curriculum";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Clear, beginner-first lessons",
    body: "Every concept explained from scratch in plain language, in the right order — no prior programming assumed.",
  },
  {
    icon: TerminalSquare,
    title: "Runnable code examples",
    body: "Hundreds of syntax-highlighted snippets with expected output, so you always see what a program does.",
  },
  {
    icon: ListChecks,
    title: "Quizzes that check understanding",
    body: "Active-recall questions and reveal-answer exercises at the end of each lesson to make the material stick.",
  },
  {
    icon: GraduationCap,
    title: "Progress tracking",
    body: "Mark lessons complete and watch your progress fill in. Your place is saved right in your browser.",
  },
  {
    icon: Moon,
    title: "Light & dark mode",
    body: "A comfortable reading experience day or night, with careful contrast in both themes.",
  },
  {
    icon: Search,
    title: "Instant search",
    body: "Jump to any lesson in a keystroke with the ⌘K command palette — no hunting through menus.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <LandingHeader />

      <main className="flex-1">
        {/* ---------------- Hero ---------------- */}
        <section className="relative overflow-hidden border-b border-border">
          {/* subtle grid backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg-muted">
                <span className="flex h-2 w-2 rounded-full bg-accent" aria-hidden />
                Free · Modern C++20 / C++23 · {TOTAL_LESSONS} lessons
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-fg sm:text-5xl lg:text-6xl">
                Learn{" "}
                <span className="font-mono text-primary">C++</span>, the
                right way — from zero.
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
                A free, comprehensive tutorial that takes you from your very
                first program to writing your own classes and containers. Clear
                explanations, real examples you can run, and quizzes to prove it
                stuck.
              </p>

              <div className="mt-8">
                <ContinueLearning />
              </div>

              <dl className="mt-10 flex gap-8">
                <div>
                  <dt className="text-sm text-fg-subtle">Chapters</dt>
                  <dd className="font-mono text-2xl font-bold text-fg">
                    {TOTAL_CHAPTERS}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-fg-subtle">Lessons</dt>
                  <dd className="font-mono text-2xl font-bold text-fg">
                    {TOTAL_LESSONS}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-fg-subtle">Price</dt>
                  <dd className="font-mono text-2xl font-bold text-accent">
                    $0
                  </dd>
                </div>
              </dl>
            </div>

            {/* Code preview */}
            <div className="lg:pl-6">
              <CodeBlock
                filename="hello.cpp"
                code={`#include <iostream>

int main()
{
    std::cout << "Hello, world!\\n";

    // Your journey starts with one line of output —
    // and ends with you building real programs.
    return 0;
}`}
                output={`Hello, world!`}
              />
            </div>
          </div>
        </section>

        {/* ---------------- Features ---------------- */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-fg">
              Everything you need to actually learn
            </h2>
            <p className="mt-3 text-lg text-fg-muted">
              Not just reference material — a guided path designed so each lesson
              builds naturally on the last.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-[1.35rem] w-[1.35rem]" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-fg">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-fg-muted">
                    {f.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- Curriculum overview ---------------- */}
        <section className="border-y border-border bg-bg-subtle">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 flex items-center gap-2 font-mono text-sm font-semibold text-primary">
                  <Code2 className="h-4 w-4" aria-hidden />
                  The path
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-fg">
                  A curriculum, not a pile of articles
                </h2>
                <p className="mt-2 max-w-xl text-lg text-fg-muted">
                  Follow it start to finish, and you&rsquo;ll go from
                  &ldquo;what&rsquo;s a compiler?&rdquo; to writing your own
                  classes.
                </p>
              </div>
              <Link
                href="/learn"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-primary"
              >
                View full curriculum
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CURRICULUM.map((ch) => (
                <Link
                  key={ch.num}
                  href={`/learn/${ch.lessons[0].slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-fg">
                      {ch.num}
                    </span>
                    <h3 className="text-[0.98rem] font-semibold leading-tight text-fg group-hover:text-primary">
                      {ch.title}
                    </h3>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                    {ch.intro}
                  </p>
                  <span className="mt-4 font-mono text-xs text-fg-subtle">
                    {ch.lessons.length} lesson
                    {ch.lessons.length === 1 ? "" : "s"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Final CTA ---------------- */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-primary px-6 py-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-fg sm:text-4xl">
              Ready to write some C++?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-primary-fg/85">
              It&rsquo;s free, it&rsquo;s thorough, and it starts with a single
              line of code. No account required.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/learn/0-1-intro-to-cpp"
                className="group inline-flex items-center gap-2 rounded-xl bg-surface px-7 py-3.5 text-base font-semibold text-primary shadow-lg transition-transform hover:scale-[1.02]"
              >
                Begin Lesson 0.1
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-fg-subtle sm:flex-row sm:px-6">
          <p>
            An independent, original C++ learning resource. Built for learners,
            free forever.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/learn" className="hover:text-fg">
              Curriculum
            </Link>
            <Link href="/learn/0-1-intro-to-cpp" className="hover:text-fg">
              Start
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
