"use client";

import { useEffect, useState } from "react";
import { Menu, X, Search, Slash } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { SidebarNav } from "./sidebar-nav";
import { SearchDialog } from "./search-dialog";
import { CourseProgressBar } from "./course-progress";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Global shortcut: Cmd/Ctrl+K opens search.
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

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-dvh">
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-fg"
      >
        Skip to main content
      </a>

      {/* ---------------- Header ---------------- */}
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>

          <Logo />

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
      </header>

      <div className="mx-auto flex w-full max-w-[100rem]">
        {/* ---------------- Desktop sidebar ---------------- */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-72 shrink-0 flex-col border-r border-border lg:flex">
          <div className="border-b border-border px-4 py-3">
            <CourseProgressBar />
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <SidebarNav />
          </div>
        </aside>

        {/* ---------------- Main ---------------- */}
        <main id="main-content" className="min-w-0 flex-1">
          {children}
        </main>
      </div>

      {/* ---------------- Mobile drawer ---------------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[900] lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-80 flex-col bg-bg shadow-2xl">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <Logo />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="border-b border-border px-4 py-3">
              <CourseProgressBar />
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <SidebarNav onNavigate={() => setDrawerOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
