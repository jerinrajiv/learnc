"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "learncpp:completed";

interface ProgressCtx {
  completed: Set<string>;
  isDone: (slug: string) => boolean;
  toggle: (slug: string) => void;
  markDone: (slug: string) => void;
  reset: () => void;
  ready: boolean;
}

const Ctx = createContext<ProgressCtx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCompleted(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore corrupt/missing storage */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    setCompleted(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  const toggle = useCallback(
    (slug: string) => {
      const next = new Set(completed);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      persist(next);
    },
    [completed, persist],
  );

  const markDone = useCallback(
    (slug: string) => {
      if (completed.has(slug)) return;
      const next = new Set(completed);
      next.add(slug);
      persist(next);
    },
    [completed, persist],
  );

  const reset = useCallback(() => persist(new Set()), [persist]);

  const value = useMemo<ProgressCtx>(
    () => ({
      completed,
      isDone: (slug) => completed.has(slug),
      toggle,
      markDone,
      reset,
      ready,
    }),
    [completed, toggle, markDone, reset, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProgress(): ProgressCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
