"use client";

import { useState, useMemo } from "react";
import { Check, Copy, Terminal } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  A small, dependency-free C++ syntax highlighter.                   */
/*  Tokenizes into spans with semantic classes; colors come from CSS   */
/*  variables so it adapts to light/dark automatically.                */
/* ------------------------------------------------------------------ */

const KEYWORDS = new Set([
  "alignas","alignof","and","and_eq","asm","auto","bitand","bitor","bool","break",
  "case","catch","char","char8_t","char16_t","char32_t","class","compl","concept",
  "const","consteval","constexpr","constinit","const_cast","continue","co_await",
  "co_return","co_yield","decltype","default","delete","do","double","dynamic_cast",
  "else","enum","explicit","export","extern","false","float","for","friend","goto",
  "if","inline","int","long","mutable","namespace","new","noexcept","not","not_eq",
  "nullptr","operator","or","or_eq","private","protected","public","register",
  "reinterpret_cast","requires","return","short","signed","sizeof","static",
  "static_assert","static_cast","struct","switch","template","this","thread_local",
  "throw","true","try","typedef","typeid","typename","union","unsigned","using",
  "virtual","void","volatile","wchar_t","while","xor","xor_eq","override","final",
]);

const KNOWN_TYPES = new Set([
  "std","string","vector","array","cout","cin","cerr","endl","size_t","uint8_t",
  "int8_t","int16_t","int32_t","int64_t","uint16_t","uint32_t","uint64_t","string_view",
  "ostream","istream","ostringstream","istringstream","map","unordered_map","set",
  "pair","optional","variant","tuple","unique_ptr","shared_ptr","move","initializer_list",
]);

type Tok = { text: string; cls: string };

function tokenizeLine(line: string): Tok[] {
  const tokens: Tok[] = [];
  let i = 0;
  const n = line.length;

  const push = (text: string, cls: string) => tokens.push({ text, cls });

  while (i < n) {
    const c = line[i];

    // Line comment
    if (c === "/" && line[i + 1] === "/") {
      push(line.slice(i), "tok-comment");
      break;
    }
    // Preprocessor directive
    if (c === "#" && (i === 0 || /^\s*$/.test(line.slice(0, i)))) {
      // include the rest but keep <...> / "..." recognizable
      push(line.slice(i), "tok-preproc");
      break;
    }
    // String / char literal
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < n && line[j] !== c) {
        if (line[j] === "\\") j++;
        j++;
      }
      j = Math.min(j + 1, n);
      push(line.slice(i, j), "tok-string");
      i = j;
      continue;
    }
    // Number
    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(line[i + 1] ?? ""))) {
      let j = i;
      while (j < n && /[0-9a-fA-FxXbBoO._']/.test(line[j])) j++;
      // allow trailing f/u/l suffixes already covered
      push(line.slice(i, j), "tok-number");
      i = j;
      continue;
    }
    // Identifier / keyword
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_]/.test(line[j])) j++;
      const word = line.slice(i, j);
      // function call?  word(
      const nextNonSpace = line.slice(j).match(/^\s*\(/);
      if (KEYWORDS.has(word)) push(word, "tok-keyword");
      else if (KNOWN_TYPES.has(word)) push(word, "tok-type");
      else if (nextNonSpace) push(word, "tok-func");
      else push(word, "tok-ident");
      i = j;
      continue;
    }
    // Operators / punctuation
    if (/[{}()[\];,]/.test(c)) {
      push(c, "tok-punc");
      i++;
      continue;
    }
    if (/[+\-*/%=<>!&|^~?:.]/.test(c)) {
      let j = i;
      while (j < n && /[+\-*/%=<>!&|^~?:.]/.test(line[j])) j++;
      push(line.slice(i, j), "tok-op");
      i = j;
      continue;
    }
    // Whitespace / other
    let j = i;
    while (j < n && /\s/.test(line[j])) j++;
    if (j > i) {
      push(line.slice(i, j), "tok-ws");
      i = j;
    } else {
      push(c, "tok-ident");
      i++;
    }
  }
  return tokens;
}

export interface CodeBlockProps {
  code: string;
  /** language label shown in the header (default C++) */
  lang?: string;
  /** optional filename shown instead of language */
  filename?: string;
  /** show line numbers */
  lineNumbers?: boolean;
  /** simulated program output rendered under the code */
  output?: string;
  /** 1-based line numbers to highlight */
  highlight?: number[];
}

export function CodeBlock({
  code,
  lang = "cpp",
  filename,
  lineNumbers = true,
  output,
  highlight = [],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.replace(/^\n/, "").replace(/\s+$/, "");
  const lines = useMemo(() => trimmed.split("\n"), [trimmed]);
  const hl = new Set(highlight);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  const label = filename ?? (lang === "cpp" ? "C++" : lang);

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-code-border bg-code-bg shadow-sm">
      <figcaption className="flex items-center justify-between border-b border-code-border bg-bg-muted/60 px-4 py-2">
        <span className="flex items-center gap-2 font-mono text-xs font-medium text-fg-subtle">
          <Terminal className="h-3.5 w-3.5" aria-hidden />
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-fg-subtle transition-colors hover:bg-bg-muted hover:text-fg focus-visible:text-fg"
          aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-accent" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden />
              Copy
            </>
          )}
        </button>
      </figcaption>

      <div className="overflow-x-auto">
        <pre className="cb-pre min-w-full py-4 font-mono text-[0.86rem] leading-relaxed">
          <code>
            {lines.map((line, idx) => (
              <span
                key={idx}
                className={`cb-line ${hl.has(idx + 1) ? "cb-line-hl" : ""}`}
              >
                {lineNumbers && (
                  <span className="cb-ln" aria-hidden>
                    {idx + 1}
                  </span>
                )}
                <span className="cb-code">
                  {line.length === 0 ? (
                    " "
                  ) : (
                    tokenizeLine(line).map((t, ti) => (
                      <span key={ti} className={t.cls}>
                        {t.text}
                      </span>
                    ))
                  )}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>

      {output !== undefined && (
        <div className="border-t border-code-border bg-bg-subtle">
          <div className="px-4 pt-2 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-fg-subtle">
            Output
          </div>
          <pre className="overflow-x-auto px-4 pb-3 pt-1 font-mono text-[0.82rem] leading-relaxed text-fg">
            {output.replace(/^\n/, "").replace(/\s+$/, "")}
          </pre>
        </div>
      )}
    </figure>
  );
}
