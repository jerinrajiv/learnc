import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ChevronRight, BookOpen } from "lucide-react";
import {
  FLAT_LESSONS,
  getLesson,
  getAdjacent,
} from "@/lib/curriculum";
import { getLessonBody } from "@/lib/lesson-content";
import { LessonFooter } from "@/components/lesson-footer";
import { TableOfContents } from "@/components/toc";
import { LessonProgressOnView } from "@/components/lesson-progress-on-view";

export function generateStaticParams() {
  return FLAT_LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lesson not found" };
  return {
    title: `${lesson.num} — ${lesson.title}`,
    description: lesson.summary,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const Body = getLessonBody(slug);
  const { prev, next } = getAdjacent(slug);

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:px-10">
      <article className="min-w-0 max-w-3xl flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.8rem] text-fg-subtle">
            <li>
              <Link href="/" className="hover:text-fg">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <li>
              <Link href="/learn" className="hover:text-fg">
                Curriculum
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <li className="font-medium text-fg-muted">
              Chapter {lesson.chapterNum}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8 border-b border-border pb-6">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-[0.8rem]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 font-mono font-semibold text-primary-soft-fg">
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              Lesson {lesson.num}
            </span>
            <span className="inline-flex items-center gap-1.5 text-fg-subtle">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {lesson.minutes} min read
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-fg-muted">
            {lesson.summary}
          </p>
        </header>

        {/* Body */}
        <div id="lesson-body" className="prose animate-fade-up">
          {Body ? <Body /> : <p>This lesson&rsquo;s content is coming soon.</p>}
        </div>

        <LessonFooter slug={slug} prev={prev} next={next} />
        <LessonProgressOnView slug={slug} />
      </article>

      {/* Right rail: table of contents */}
      <aside className="sticky top-[4.5rem] hidden h-fit w-56 shrink-0 xl:block">
        <TableOfContents />
      </aside>
    </div>
  );
}
