import Link from "next/link";
import { Home, BookOpen } from "lucide-react";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <Logo />
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="text-center">
          <p className="font-mono text-6xl font-bold text-primary">404</p>
          <h1 className="mt-4 text-2xl font-bold text-fg">
            This page took an unexpected branch
          </h1>
          <p className="mx-auto mt-2 max-w-md text-fg-muted">
            The lesson or page you&rsquo;re looking for doesn&rsquo;t exist. Let&rsquo;s
            get you back on the path.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg transition-colors hover:bg-primary-hover"
            >
              <Home className="h-4 w-4" aria-hidden />
              Home
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-primary"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Browse curriculum
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
