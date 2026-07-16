"use client";

import { useState, type ReactNode } from "react";
import { Check, X, HelpCircle, ChevronDown } from "lucide-react";

/* ---- Multiple choice question ---- */
export interface ChoiceQuestion {
  prompt: ReactNode;
  options: string[];
  /** 0-based index of the correct option */
  answer: number;
  explanation?: ReactNode;
}

export function QuizChoice({ prompt, options, answer, explanation }: ChoiceQuestion) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="not-prose my-4 rounded-xl border border-border bg-surface p-4 sm:p-5">
      <p className="mb-3 font-medium text-fg">{prompt}</p>
      <div className="flex flex-col gap-2" role="radiogroup">
        {options.map((opt, i) => {
          const isCorrect = i === answer;
          const isChosen = i === selected;
          let state =
            "border-border bg-bg-subtle hover:border-border-strong hover:bg-bg-muted";
          if (answered && isCorrect)
            state = "border-accent bg-accent-soft text-accent-soft-fg";
          else if (answered && isChosen && !isCorrect)
            state = "border-danger bg-danger-soft text-danger";
          else if (answered) state = "border-border bg-bg-subtle opacity-70";

          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={isChosen}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[0.95rem] transition-colors disabled:cursor-default ${state}`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                {answered && isCorrect ? (
                  <Check className="h-3.5 w-3.5" aria-hidden />
                ) : answered && isChosen ? (
                  <X className="h-3.5 w-3.5" aria-hidden />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-3 rounded-lg bg-bg-muted px-3.5 py-3 text-sm text-fg-muted">
          <span
            className={`font-semibold ${
              selected === answer ? "text-accent" : "text-danger"
            }`}
          >
            {selected === answer ? "Correct. " : "Not quite. "}
          </span>
          {explanation}
        </div>
      )}
    </div>
  );
}

/* ---- Reveal-answer question (for open-ended / code writing) ---- */
export function QuizReveal({
  prompt,
  children,
}: {
  prompt: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="not-prose my-4 rounded-xl border border-border bg-surface">
      <div className="flex items-start gap-3 p-4 sm:p-5">
        <HelpCircle
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden
        />
        <div className="font-medium text-fg">{prompt}</div>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between border-t border-border px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-bg-subtle sm:px-5"
      >
        {open ? "Hide answer" : "Show answer"}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className="border-t border-border bg-bg-subtle px-4 py-4 sm:px-5 [&_.tok-ws]:whitespace-pre">
          {children}
        </div>
      )}
    </div>
  );
}

export function QuizSection({ children }: { children: ReactNode }) {
  return (
    <section className="not-prose mt-12 rounded-2xl border border-primary-soft-fg/20 bg-primary-soft/40 p-5 sm:p-6">
      <div className="mb-1 flex items-center gap-2">
        <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-primary-fg">
          Quiz
        </span>
        <h2 className="text-xl font-bold text-fg">Check your understanding</h2>
      </div>
      <p className="mb-4 text-sm text-fg-muted">
        Try each question before revealing the answer — active recall is how the
        material sticks.
      </p>
      {children}
    </section>
  );
}
