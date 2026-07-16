"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg"
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle color theme"
      }
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted && isDark ? (
        <Sun className="h-[1.15rem] w-[1.15rem]" aria-hidden />
      ) : (
        <Moon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
      )}
    </button>
  );
}
