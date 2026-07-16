import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 rounded-lg focus-visible:outline-2 ${className}`}
      aria-label="LearnCpp home"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-fg shadow-sm">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {/* terminal-style chevron + line, evoking code */}
          <path d="m7 8 4 4-4 4" />
          <path d="M13 16h4" />
        </svg>
      </span>
      <span className="flex items-baseline gap-0.5 font-mono text-[1.05rem] font-bold tracking-tight text-fg">
        Learn
        <span className="text-primary">Cpp</span>
      </span>
    </Link>
  );
}
