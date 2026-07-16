"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Slash } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { SearchDialog } from "./search-dialog";

export function LandingHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Logo />
        <nav className="ml-4 hidden items-center gap-1 sm:flex" aria-label="Primary">
          <Link
            href="/learn"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg"
          >
            Curriculum
          </Link>
          <Link
            href="/learn/0-1-intro-to-cpp"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg"
          >
            Start learning
          </Link>
        </nav>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-fg-subtle transition-colors hover:bg-bg-muted hover:text-fg"
          aria-label="Search lessons"
        >
          <Search className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Search</span>
          <kbd className="ml-1 hidden items-center gap-0.5 rounded border border-border bg-bg-muted px-1.5 py-0.5 font-mono text-[0.68rem] text-fg-subtle sm:flex">
            <Slash className="h-2.5 w-2.5 rotate-90" aria-hidden />K
          </kbd>
        </button>

        <ThemeToggle />
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
