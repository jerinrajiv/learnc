import type { ReactNode } from "react";
import {
  CodeBlock,
  Callout,
  Definition,
  KeyTakeaways,
  QuizSection,
  QuizChoice,
} from "./_components";

/* Small helper to keep each lesson consistent without repetition. */
function Q(
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
) {
  return (
    <QuizChoice
      prompt={prompt}
      options={options}
      answer={answer}
      explanation={explanation}
    />
  );
}

/* ===================== Chapter 3 — Debugging ===================== */

function L31() {
  return (
    <>
      <p>
        Errors come in two broad flavors, and telling them apart is the first
        step to fixing them quickly.
      </p>
      <h2 id="syntax">Syntax errors</h2>
      <p>
        A <strong>syntax error</strong> breaks the grammar of C++ — a missing
        semicolon, an unmatched brace, a misspelled keyword. The compiler catches
        these and refuses to build, pointing you (roughly) at the location.
      </p>
      <CodeBlock
        code={`std::cout << "Hello"   // missing semicolon → syntax error`}
        lineNumbers={false}
      />
      <h2 id="semantic">Semantic errors</h2>
      <p>
        A <strong>semantic error</strong> is code that compiles but does the wrong
        thing. The grammar is valid; the <em>meaning</em> is wrong. These are the
        harder, more interesting bugs.
      </p>
      <CodeBlock
        code={`// Compiles fine, but the logic is wrong:
int average { (a + b) / 2 };  // integer division may truncate unexpectedly`}
        lineNumbers={false}
      />
      <Definition term="semantic error">
        A defect where the program runs but produces incorrect results because the
        logic doesn&rsquo;t match the intent.
      </Definition>
      <KeyTakeaways
        items={[
          "Syntax errors violate C++'s grammar and are caught by the compiler.",
          "Semantic errors compile but behave incorrectly.",
          "The compiler finds syntax errors for you; semantic errors require testing and debugging.",
        ]}
      />
      <QuizSection>
        {Q(
          "A program compiles but prints the wrong total. What kind of error is this?",
          ["Syntax error", "Semantic error", "Linker error", "Preprocessor error"],
          1,
          "It builds successfully but the logic is wrong — that's a semantic error.",
        )}
      </QuizSection>
    </>
  );
}

function L32() {
  return (
    <>
      <p>
        Debugging feels like magic until you have a process. Here&rsquo;s a
        reliable loop that turns &ldquo;it&rsquo;s broken&rdquo; into a found and
        fixed bug.
      </p>
      <h2 id="steps">A repeatable process</h2>
      <ol>
        <li>
          <strong>Reproduce it reliably.</strong> Find the exact steps that
          trigger the bug every time. An intermittent bug you can&rsquo;t
          reproduce is nearly impossible to fix.
        </li>
        <li>
          <strong>Locate it.</strong> Narrow down <em>where</em> the problem is by
          cutting the search space in half repeatedly (a binary search through
          your code).
        </li>
        <li>
          <strong>Understand it.</strong> Figure out <em>why</em> the code does
          the wrong thing, not just where.
        </li>
        <li>
          <strong>Fix and verify.</strong> Make the change, then confirm the bug
          is gone and nothing else broke.
        </li>
      </ol>
      <Callout variant="key" title="Find the cause, not a symptom">
        The most common debugging mistake is patching what you see rather than the
        underlying cause. If a value is wrong, trace back to where it first became
        wrong.
      </Callout>
      <Callout variant="best-practice" title="Change one thing at a time">
        When experimenting, change a single variable and re-test. Changing several
        things at once makes it impossible to know which one mattered.
      </Callout>
      <KeyTakeaways
        items={[
          "Debugging is a process: reproduce, locate, understand, fix, verify.",
          "A reliably reproducible bug is a nearly-solved bug.",
          "Halve the search space repeatedly to locate the fault.",
          "Fix the root cause, and change one thing at a time.",
        ]}
      />
      <QuizSection>
        {Q(
          "What's the best first step when tackling a bug?",
          [
            "Rewrite the whole function",
            "Make it reliably reproducible",
            "Add lots of new features",
            "Delete the failing code",
          ],
          1,
          "You can't reliably fix or verify a bug you can't reproduce on demand.",
        )}
      </QuizSection>
    </>
  );
}

function L33() {
  return (
    <>
      <p>
        Before reaching for a debugger, a few simple tactics resolve most everyday
        bugs.
      </p>
      <h2 id="print">Print statements</h2>
      <p>
        Temporarily printing values shows you what the program actually believes
        at a given moment — often revealing the exact point where reality diverges
        from your expectation.
      </p>
      <CodeBlock
        code={`std::cout << "DEBUG: x = " << x << ", y = " << y << '\\n';`}
        lineNumbers={false}
      />
      <h2 id="comment-out">Commenting out code</h2>
      <p>
        Disable sections by commenting them out to see whether the problem
        disappears. This quickly isolates which part is responsible.
      </p>
      <h2 id="assumptions">Validate your assumptions</h2>
      <p>
        Most bugs hide in an assumption you didn&rsquo;t question — &ldquo;this
        value is never zero,&rdquo; &ldquo;this function always succeeds.&rdquo;
        Print or check those assumptions explicitly and one will prove false.
      </p>
      <Callout variant="warning" title="Clean up your debug output">
        Debug prints are scaffolding, not architecture. Remove them once the bug
        is fixed so they don&rsquo;t clutter output or mislead later.
      </Callout>
      <KeyTakeaways
        items={[
          "Print statements reveal a program's actual state at a point in time.",
          "Commenting out code isolates which section causes a problem.",
          "Bugs usually live in an unexamined assumption — test them explicitly.",
          "Remove temporary debug output once you're done.",
        ]}
      />
      <QuizSection>
        {Q(
          "Why temporarily comment out a block of code while debugging?",
          [
            "To make the program faster",
            "To see whether that block is causing the problem",
            "To permanently remove features",
            "To fix syntax errors",
          ],
          1,
          "If the symptom vanishes with the block disabled, you've isolated the culprit.",
        )}
      </QuizSection>
    </>
  );
}

function L34() {
  return (
    <>
      <p>
        An <strong>integrated debugger</strong> lets you pause a running program
        and inspect it from the inside — far more powerful than print statements
        once you&rsquo;re comfortable with it.
      </p>
      <h2 id="tools">The core tools</h2>
      <ul>
        <li>
          <strong>Breakpoint</strong> — mark a line; execution pauses there so you
          can look around.
        </li>
        <li>
          <strong>Step over</strong> — run the current line and stop on the next
          one.
        </li>
        <li>
          <strong>Step into</strong> — dive into a function call to debug inside
          it.
        </li>
        <li>
          <strong>Watch / locals</strong> — view variable values live as you step.
        </li>
      </ul>
      <Callout variant="key" title="Watch the value change">
        Set a breakpoint just before the suspicious line, then step forward one
        line at a time, watching your variables. The instant a value becomes wrong
        is the instant you&rsquo;ve found the bug&rsquo;s origin.
      </Callout>
      <Callout variant="best-practice" title="Build in Debug mode">
        Compile with debug information (a &ldquo;Debug&rdquo; build, or{" "}
        <code>-g</code> on g++/clang) so the debugger can map machine code back to
        your source lines and variable names.
      </Callout>
      <KeyTakeaways
        items={[
          "A debugger pauses your program so you can inspect it running.",
          "Breakpoints, step over, step into, and variable watches are the essentials.",
          "Step through and watch for the moment a value turns wrong.",
          "Use a Debug build (-g) so the debugger sees your source.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does a breakpoint do?",
          [
            "Deletes a line of code",
            "Pauses execution at that line so you can inspect state",
            "Fixes the bug automatically",
            "Skips the line",
          ],
          1,
          "Execution halts at the breakpoint, letting you examine variables and step forward.",
        )}
      </QuizSection>
    </>
  );
}

/* ============== Chapter 4 — Fundamental data types ============== */

function L41() {
  return (
    <>
      <p>
        Every value in a C++ program has a <strong>type</strong>, and the type
        determines two things: what kind of value can be stored (a whole number? a
        fraction? a character?) and how the pattern of bits in memory should be
        interpreted. The same bits mean different things depending on the type
        stamped on them. C++ ships with a family of built-in{" "}
        <strong>fundamental types</strong> for the most common kinds of data.
      </p>

      <Definition term="fundamental (built-in) type">
        A type provided directly by the C++ language, with no library or header
        needed. Examples include <code>int</code>, <code>double</code>,{" "}
        <code>bool</code>, and <code>char</code>.
      </Definition>

      <h2 id="categories">The categories at a glance</h2>
      <p>
        The fundamental types fall into a few groups. You&rsquo;ll spend the next
        several lessons on each in turn; this is the map.
      </p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Types</th>
            <th>Stores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Integer</td>
            <td>
              <code>short</code>, <code>int</code>, <code>long</code>,{" "}
              <code>long long</code>
            </td>
            <td>Whole numbers, e.g. -3, 0, 42</td>
          </tr>
          <tr>
            <td>Floating point</td>
            <td>
              <code>float</code>, <code>double</code>, <code>long double</code>
            </td>
            <td>Real numbers, e.g. 3.14, -0.5</td>
          </tr>
          <tr>
            <td>Boolean</td>
            <td>
              <code>bool</code>
            </td>
            <td>
              <code>true</code> or <code>false</code>
            </td>
          </tr>
          <tr>
            <td>Character</td>
            <td>
              <code>char</code>, <code>wchar_t</code>, <code>char8_t</code>…
            </td>
            <td>A single character, e.g. &apos;A&apos;</td>
          </tr>
          <tr>
            <td>Null pointer</td>
            <td>
              <code>std::nullptr_t</code>
            </td>
            <td>The value <code>nullptr</code> (Chapter 12)</td>
          </tr>
          <tr>
            <td>Void</td>
            <td>
              <code>void</code>
            </td>
            <td>No type / no value</td>
          </tr>
        </tbody>
      </table>
      <p>
        The integer and character types together are called{" "}
        <strong>integral types</strong> because internally they all store whole
        numbers.
      </p>

      <h2 id="bits">Bits, bytes, and why size matters</h2>
      <Definition term="bit / byte">
        A <strong>bit</strong> is a single binary digit — a 0 or a 1. A{" "}
        <strong>byte</strong> is a group of 8 bits and is the smallest unit of
        memory a program normally addresses. A type&rsquo;s size is measured in
        bytes.
      </Definition>
      <p>
        A type&rsquo;s size directly controls its <strong>range</strong> — how many
        distinct values it can represent. With <em>n</em> bits you can encode
        2<sup>n</sup> different patterns. So an 8-bit byte has 256 possible
        values, and a 4-byte (32-bit) <code>int</code> has over 4 billion. Bigger
        types hold a wider range but use more memory; the art is picking a type
        just big enough for the job.
      </p>

      <h2 id="defining">Defining a variable of each type</h2>
      <CodeBlock
        code={`int      count { 42 };       // whole number
double   price { 19.99 };    // real number
bool     ready { true };     // true / false
char     grade { 'A' };      // single character`}
      />

      <Callout variant="best-practice" title="Reach for int and double first">
        Ninety percent of the time you want <code>int</code> for whole numbers and{" "}
        <code>double</code> for fractional ones. Only switch to a more specific
        type when you have a concrete reason (a wider range, tighter memory, a
        single character, and so on).
      </Callout>

      <KeyTakeaways
        items={[
          "Every value has a type that dictates what it stores and how its bits are read.",
          "Fundamental types are built into the language: integer, floating point, boolean, character, void, and null-pointer.",
          "Integer and character types together are the integral types.",
          "A type's size in bytes determines its range: n bits encode 2^n values.",
          "Default to int for whole numbers and double for real numbers.",
        ]}
      />
      <QuizSection>
        {Q(
          "Which fundamental type would you choose to store someone's age in whole years?",
          ["double", "bool", "int", "char"],
          2,
          "Whole numbers call for an integer type; int is the default choice.",
        )}
        {Q(
          "How many distinct values can a single 8-bit byte represent?",
          ["8", "16", "256", "Unlimited"],
          2,
          "n bits give 2^n patterns, and 2^8 = 256.",
        )}
        {Q(
          "Which group do char and int both belong to?",
          ["Floating-point types", "Integral types", "Boolean types", "Void types"],
          1,
          "Both store whole numbers internally, so they're integral types.",
        )}
      </QuizSection>
    </>
  );
}

function L42() {
  return (
    <>
      <p>
        Two odds and ends round out the type picture: the <code>void</code>{" "}
        &ldquo;no type&rdquo; and how to measure a type&rsquo;s size with{" "}
        <code>sizeof</code>.
      </p>
      <h2 id="void">void</h2>
      <p>
        <code>void</code> means &ldquo;no type / no value.&rdquo; Its main use is a
        function return type meaning &ldquo;returns nothing,&rdquo; as
        you&rsquo;ve already seen with <code>void sayHello()</code>.
      </p>
      <h2 id="sizeof">Measuring sizes</h2>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    std::cout << "int:    " << sizeof(int)    << " bytes\\n";
    std::cout << "double: " << sizeof(double) << " bytes\\n";
    std::cout << "char:   " << sizeof(char)   << " bytes\\n";
    return 0;
}`}
        output={`int:    4 bytes\ndouble: 8 bytes\nchar:   1 bytes`}
      />
      <Callout variant="note" title="Sizes can vary">
        The C++ standard guarantees minimum sizes and relative ordering, not exact
        sizes. <code>int</code> is 4 bytes on virtually all modern desktop
        platforms, but portable code shouldn&rsquo;t assume it.
      </Callout>
      <KeyTakeaways
        items={[
          "void means 'no type', most often a function returning nothing.",
          "sizeof(type) reports how many bytes a type occupies.",
          "Exact sizes are platform-dependent; only minimums are guaranteed.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does sizeof(double) return?",
          ["Always 4", "The number of bytes a double occupies (commonly 8)", "The value of the double", "A boolean"],
          1,
          "sizeof yields the size in bytes; double is typically 8.",
        )}
      </QuizSection>
    </>
  );
}

function L43() {
  return (
    <>
      <p>
        <strong>Signed integers</strong> store whole numbers that may be positive,
        negative, or zero. There are four signed integer types, differing only in
        how much memory they use — and therefore how large a value they can hold.
        By default, all of them are signed, so <code>int</code> and{" "}
        <code>signed int</code> mean the same thing.
      </p>

      <Definition term="signed">
        A signed type reserves the ability to represent negative numbers. One bit
        conceptually tracks the sign, and the rest encode the magnitude.
      </Definition>

      <h2 id="the-four">The four signed integer types</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Minimum size</th>
            <th>Typical range (if that size)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>short</code>
            </td>
            <td>2 bytes</td>
            <td>-32,768 to 32,767</td>
          </tr>
          <tr>
            <td>
              <code>int</code>
            </td>
            <td>2 bytes (usually 4)</td>
            <td>-2,147,483,648 to 2,147,483,647</td>
          </tr>
          <tr>
            <td>
              <code>long</code>
            </td>
            <td>4 bytes</td>
            <td>±2.1 billion (or more)</td>
          </tr>
          <tr>
            <td>
              <code>long long</code>
            </td>
            <td>8 bytes</td>
            <td>about ±9.2 quintillion</td>
          </tr>
        </tbody>
      </table>
      <p>
        Notice the standard specifies <em>minimums</em>, not exact sizes. On
        virtually every modern desktop, <code>int</code> is 4 bytes — but portable
        code shouldn&rsquo;t assume it.
      </p>

      <h2 id="ranges">Finding the exact range</h2>
      <p>
        The <code>&lt;limits&gt;</code> header lets you query the actual limits on
        your platform rather than guessing:
      </p>
      <CodeBlock
        code={`#include <iostream>
#include <limits>

int main()
{
    std::cout << "int min: " << std::numeric_limits<int>::min() << '\\n';
    std::cout << "int max: " << std::numeric_limits<int>::max() << '\\n';
    return 0;
}`}
        output={`int min: -2147483648\nint max: 2147483647`}
      />

      <h2 id="overflow">Overflow: running off the edge</h2>
      <p>
        If a calculation produces a value outside a type&rsquo;s range, you get{" "}
        <strong>overflow</strong>. For signed integers this is{" "}
        <strong>undefined behavior</strong> — the standard makes no promise about
        what happens, so you must never let it occur.
      </p>
      <CodeBlock
        code={`#include <iostream>
#include <limits>

int main()
{
    int big { std::numeric_limits<int>::max() }; // the largest int
    std::cout << big << '\\n';                    // 2147483647
    std::cout << big + 1 << '\\n';                // undefined behavior!
    return 0;
}`}
      />
      <Callout variant="rule" title="Signed overflow is undefined behavior">
        Don&rsquo;t rely on signed integers wrapping around to the minimum. If a
        result might exceed the range, use a wider type (<code>long long</code>)
        or check before you compute.
      </Callout>

      <h2 id="fixed-width">Fixed-width integers</h2>
      <p>
        When you need a guaranteed exact size — for file formats, networking, or
        embedded work — use the <strong>fixed-width integer</strong> types from{" "}
        <code>&lt;cstdint&gt;</code>. Their names state their bit count:
      </p>
      <CodeBlock
        code={`#include <cstdint>

std::int8_t  a { 100 };   // exactly 8 bits, signed
std::int16_t b { 30000 }; // exactly 16 bits
std::int32_t c { 0 };     // exactly 32 bits
std::int64_t d { 0 };     // exactly 64 bits`}
      />
      <Callout variant="best-practice" title="Prefer int for general use">
        Reach for plain <code>int</code> in ordinary code — it&rsquo;s the fast,
        natural size for the platform. Use fixed-width types only when the exact
        number of bits genuinely matters.
      </Callout>

      <KeyTakeaways
        items={[
          "Integer types are signed by default: short, int, long, and long long.",
          "The standard sets minimum sizes, not exact ones; int is usually 4 bytes.",
          "Query real limits with std::numeric_limits from <limits>.",
          "Signed overflow is undefined behavior — never rely on wrap-around.",
          "Use fixed-width types (int32_t, etc.) from <cstdint> when the exact size matters.",
        ]}
      />
      <QuizSection>
        {Q(
          "What happens if a signed int calculation exceeds its maximum value?",
          ["It wraps to the minimum reliably", "Undefined behavior", "It becomes a double", "The program pauses"],
          1,
          "Signed overflow is undefined behavior in C++; never depend on wrap-around.",
        )}
        {Q(
          "Which header gives you std::int32_t and other fixed-width integers?",
          ["<limits>", "<cstdint>", "<iostream>", "<vector>"],
          1,
          "The fixed-width integer types live in <cstdint>.",
        )}
        {Q(
          "Which type is guaranteed to be at least 8 bytes?",
          ["short", "int", "long", "long long"],
          3,
          "long long has a minimum size of 8 bytes.",
        )}
      </QuizSection>
    </>
  );
}

function L44() {
  return (
    <>
      <p>
        Every integer type has an <strong>unsigned</strong> counterpart, written
        with the <code>unsigned</code> keyword. Unsigned integers hold only
        non-negative values (0 and up). By giving up the ability to store
        negatives, they roughly double the maximum positive value for the same
        number of bytes.
      </p>
      <CodeBlock
        code={`unsigned int   count { 5 };
unsigned short small { 200 };
unsigned long long huge { 0 };`}
      />
      <p>
        A 4-byte signed <code>int</code> tops out near 2.1 billion; the unsigned
        version reaches about 4.3 billion — but can never be negative.
      </p>

      <h2 id="wrap">Wrap-around is defined (and dangerous)</h2>
      <p>
        Signed overflow is undefined behavior. Unsigned integers are different:
        when they exceed their range, they <strong>wrap around</strong> — this is
        well-defined, but it&rsquo;s rarely what you want. Subtracting past zero
        produces an enormous number instead of a negative one:
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    unsigned int x { 0 };
    std::cout << x - 1 << '\\n';  // NOT -1 — wraps to the maximum value
    return 0;
}`}
        output={`4294967295`}
      />

      <h2 id="mixing">The mixing trap</h2>
      <p>
        The real hazard shows up when you combine signed and unsigned values in one
        expression. C++ converts the signed operand to unsigned, which can turn a
        harmless negative number into a giant positive one — silently:
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    unsigned int u { 3 };
    int          s { -5 };

    // s is converted to a huge unsigned value before the comparison
    std::cout << (s < u) << '\\n';  // prints 0 (false)?! -5 is "greater" than 3
    return 0;
}`}
        output={`0`}
      />
      <p>
        Logically <code>-5 &lt; 3</code> is true, but because <code>s</code> is
        converted to unsigned first, the comparison gives the wrong answer. Bugs
        like this are notoriously hard to spot.
      </p>

      <Callout variant="best-practice" title="Prefer signed integers">
        For everyday counting and arithmetic, use signed <code>int</code>. Reserve
        unsigned types for the cases that genuinely need them: bit manipulation,
        and situations where wrap-around is the intended, documented behavior.
      </Callout>
      <Callout variant="warning" title="Watch out for .size()">
        Some standard library functions, like a container&rsquo;s{" "}
        <code>.size()</code>, return an unsigned type. Be careful when mixing those
        results with signed values in arithmetic or comparisons.
      </Callout>

      <KeyTakeaways
        items={[
          "Unsigned integers store only non-negative values and roughly double the positive range.",
          "Unsigned overflow wraps around (defined), so 0u - 1 becomes the maximum value.",
          "Mixing signed and unsigned converts the signed value to unsigned — a common source of bugs.",
          "Default to signed int; use unsigned deliberately for bit work or intentional wrap-around.",
        ]}
      />
      <QuizSection>
        {Q(
          "For an unsigned int x = 0, what is x - 1?",
          ["-1", "0", "A very large positive number (wrap-around)", "Undefined behavior"],
          2,
          "Unsigned arithmetic wraps around, so 0 - 1 becomes the type's maximum value.",
        )}
        {Q(
          "Why can comparing a negative int with an unsigned int give the wrong result?",
          [
            "Comparisons don't work on integers",
            "The signed value is converted to a large unsigned value first",
            "Unsigned values are always negative",
            "The compiler rejects it",
          ],
          1,
          "The signed operand converts to unsigned, turning a small negative into a huge positive.",
        )}
        {Q(
          "For general-purpose counting, which should you prefer?",
          ["unsigned int", "signed int", "It never matters", "unsigned long"],
          1,
          "Signed int avoids the wrap-around and conversion pitfalls of unsigned types.",
        )}
      </QuizSection>
    </>
  );
}

function L45() {
  return (
    <>
      <p>
        <strong>Floating point</strong> types store real numbers — values that can
        have a fractional part, like <code>3.14</code>, <code>-0.5</code>, or{" "}
        <code>6.02e23</code>. The name comes from the way the decimal point can
        &ldquo;float&rdquo; to represent very large and very small numbers with the
        same handful of bytes.
      </p>

      <h2 id="the-three">The three floating-point types</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Typical size</th>
            <th>Typical precision</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>float</code>
            </td>
            <td>4 bytes</td>
            <td>~6–7 significant digits</td>
          </tr>
          <tr>
            <td>
              <code>double</code>
            </td>
            <td>8 bytes</td>
            <td>~15–16 significant digits</td>
          </tr>
          <tr>
            <td>
              <code>long double</code>
            </td>
            <td>8, 12, or 16 bytes</td>
            <td>platform-dependent</td>
          </tr>
        </tbody>
      </table>
      <Callout variant="best-practice" title="Default to double">
        <code>double</code> gives roughly twice the precision of <code>float</code>{" "}
        for little extra cost on modern hardware. Use <code>double</code> unless
        you have a specific reason (like tight memory) to choose <code>float</code>.
      </Callout>

      <h2 id="literals">Writing floating-point literals</h2>
      <CodeBlock
        code={`double pi   { 3.14159 };
double big  { 1.5e6 };    // scientific notation → 1,500,000
double tiny { 2.0e-3 };   // → 0.002
float  f    { 3.14f };    // the 'f' suffix makes it a float literal`}
      />
      <Callout variant="note" title="A bare decimal literal is a double">
        <code>3.14</code> is a <code>double</code> by default. Add the{" "}
        <code>f</code> suffix (<code>3.14f</code>) when you specifically want a{" "}
        <code>float</code> literal.
      </Callout>

      <h2 id="precision">Precision and rounding error</h2>
      <p>
        Floating-point values are stored in binary, and just as <code>1/3</code>{" "}
        can&rsquo;t be written exactly in decimal (0.3333…), many decimals
        can&rsquo;t be represented exactly in binary. The result is small,
        unavoidable <strong>rounding errors</strong>. The most famous example:
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    double result { 0.1 + 0.2 };
    std::cout << result << '\\n';           // looks like 0.3
    std::cout << (result == 0.3) << '\\n';  // but this prints 0 (false)!
    return 0;
}`}
        output={`0.3\n0`}
      />
      <p>
        The sum is actually 0.30000000000000004, which isn&rsquo;t exactly equal to
        the stored value of <code>0.3</code>. The console rounds it for display, so
        it merely <em>looks</em> right.
      </p>
      <Callout variant="rule" title="Never compare floats with ==">
        Because of rounding, two floating-point values that mathematically should
        be equal often differ in their last bits. Instead of <code>a == b</code>,
        test whether they&rsquo;re close enough — that the absolute difference is
        below a tiny tolerance.
      </Callout>

      <h2 id="special">Infinity and NaN</h2>
      <p>
        Floating-point types can also represent a few special values:{" "}
        positive and negative <strong>infinity</strong> (from things like dividing
        by zero in floating point) and <strong>NaN</strong> — &ldquo;not a
        number&rdquo; — the result of undefined operations like{" "}
        <code>0.0 / 0.0</code>. A curious property: <code>NaN</code> is not equal
        to anything, not even itself.
      </p>

      <h2 id="output-precision">Controlling display precision</h2>
      <p>
        By default <code>std::cout</code> shows about six significant digits. Use{" "}
        <code>std::setprecision</code> from <code>&lt;iomanip&gt;</code> to show
        more:
      </p>
      <CodeBlock
        code={`#include <iostream>
#include <iomanip>

int main()
{
    std::cout << std::setprecision(12);
    std::cout << 1.0 / 3.0 << '\\n';  // 0.333333333333
    return 0;
}`}
        output={`0.333333333333`}
      />

      <KeyTakeaways
        items={[
          "Floating-point types store real numbers: float, double, and long double.",
          "Default to double; it has far more precision than float.",
          "A bare literal like 3.14 is a double; 3.14f is a float.",
          "Binary storage means many decimals round slightly — never compare floats with ==.",
          "Special values include ±infinity and NaN (which isn't equal to anything).",
          "std::setprecision from <iomanip> controls how many digits print.",
        ]}
      />
      <QuizSection>
        {Q(
          "Why can (0.1 + 0.2 == 0.3) be false in C++?",
          [
            "Because addition is broken",
            "Because floating-point values are stored with tiny rounding errors",
            "Because 0.3 isn't a valid number",
            "Because == doesn't work on doubles at all",
          ],
          1,
          "These decimals can't be represented exactly in binary, so the sums differ slightly.",
        )}
        {Q(
          "What type is the literal 3.14 by default?",
          ["float", "double", "long double", "int"],
          1,
          "Bare floating-point literals are doubles; add an f suffix for a float.",
        )}
        {Q(
          "What is the result of comparing NaN == NaN?",
          ["true", "false", "It won't compile", "NaN"],
          1,
          "NaN compares unequal to everything, including itself, so NaN == NaN is false.",
        )}
      </QuizSection>
    </>
  );
}

function L46() {
  return (
    <>
      <p>
        A <strong>boolean</strong> (<code>bool</code>) holds one of two values:{" "}
        <code>true</code> or <code>false</code>. Booleans are the backbone of
        every decision your program makes.
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    bool isRaining { true };
    bool isSunny { false };

    std::cout << isRaining << '\\n';  // prints 1
    std::cout << std::boolalpha;      // switch to word form
    std::cout << isSunny << '\\n';    // prints false
    return 0;
}`}
        output={`1\nfalse`}
      />
      <Callout variant="tip" title="true prints as 1 by default">
        By default <code>std::cout</code> shows booleans as <code>1</code>/
        <code>0</code>. Insert <code>std::boolalpha</code> to print{" "}
        <code>true</code>/<code>false</code> instead.
      </Callout>
      <p>
        Booleans are produced by comparison operators (<code>==</code>,{" "}
        <code>&lt;</code>, <code>&gt;</code>) and consumed by <code>if</code>{" "}
        statements — the subject of Chapter 8.
      </p>
      <KeyTakeaways
        items={[
          "bool holds true or false.",
          "cout prints booleans as 1/0 unless you use std::boolalpha.",
          "Comparisons produce booleans, which drive if statements and loops.",
        ]}
      />
      <QuizSection>
        {Q(
          "By default, what does std::cout print for a bool that is true?",
          ["true", "1", "yes", "T"],
          1,
          "Without std::boolalpha, true prints as 1 and false as 0.",
        )}
      </QuizSection>
    </>
  );
}

function L47() {
  return (
    <>
      <p>
        A <code>char</code> stores a single character, like <code>&apos;A&apos;</code>,{" "}
        <code>&apos;7&apos;</code>, or <code>&apos;?&apos;</code>. It&rsquo;s a
        one-byte integral type, and that&rsquo;s the key insight: a character is
        really stored as a small integer, and a standard table called{" "}
        <strong>ASCII</strong> maps each number to a character.
      </p>

      <h2 id="encoding">Characters are numbers</h2>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    char letter { 'A' };
    std::cout << letter << '\\n';                 // A
    std::cout << static_cast<int>(letter) << '\\n'; // 65 — its ASCII code
    return 0;
}`}
        output={`A\n65`}
      />
      <p>
        In ASCII, <code>&apos;A&apos;</code> is 65, <code>&apos;B&apos;</code> is
        66, and so on; the lowercase letters start at <code>&apos;a&apos;</code> =
        97, and the digit characters <code>&apos;0&apos;</code>–
        <code>&apos;9&apos;</code> run from 48 to 57. Because a <code>char</code>{" "}
        is a number, you can do arithmetic on it: <code>&apos;A&apos; + 1</code>{" "}
        yields the code for <code>&apos;B&apos;</code>.
      </p>

      <Callout variant="note" title="Single quotes for char, double for strings">
        <code>&apos;A&apos;</code> is a single character (type <code>char</code>).{" "}
        <code>&quot;A&quot;</code> is a string that happens to contain one
        character — a different type entirely. Mixing them up is a common beginner
        error.
      </Callout>

      <h2 id="escape">Escape sequences</h2>
      <p>
        Some characters can&rsquo;t be typed directly — a newline, a tab, a quote
        inside a quoted string. For these, C++ uses <strong>escape
        sequences</strong> that begin with a backslash:
      </p>
      <table>
        <thead>
          <tr>
            <th>Escape</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>\n</code>
            </td>
            <td>newline</td>
          </tr>
          <tr>
            <td>
              <code>\t</code>
            </td>
            <td>horizontal tab</td>
          </tr>
          <tr>
            <td>
              <code>\&apos;</code>
            </td>
            <td>single quote</td>
          </tr>
          <tr>
            <td>
              <code>\&quot;</code>
            </td>
            <td>double quote</td>
          </tr>
          <tr>
            <td>
              <code>\\</code>
            </td>
            <td>a literal backslash</td>
          </tr>
          <tr>
            <td>
              <code>\0</code>
            </td>
            <td>null character</td>
          </tr>
        </tbody>
      </table>
      <CodeBlock
        code={`std::cout << "Name:\\tAda\\n";        // tab between label and value
std::cout << "She said \\"hi\\".\\n";   // embedded quotes`}
        output={`Name:\tAda\nShe said "hi".`}
        lineNumbers={false}
      />

      <h2 id="reading">Reading a character</h2>
      <p>
        <code>std::cin</code> can read a single character into a <code>char</code>{" "}
        just like any other value:
      </p>
      <CodeBlock
        code={`char c {};
std::cout << "Enter a character: ";
std::cin >> c;
std::cout << "Its ASCII code is " << static_cast<int>(c) << '\\n';`}
        lineNumbers={false}
      />

      <KeyTakeaways
        items={[
          "char is a one-byte integral type holding a single character.",
          "Characters are stored as integers via the ASCII table ('A' is 65).",
          "Use single quotes for chars, double quotes for strings.",
          "Escape sequences like \\n, \\t, \\\", and \\\\ encode special characters.",
          "static_cast<int>(ch) reveals a character's numeric code.",
        ]}
      />
      <QuizSection>
        {Q(
          "What's the difference between 'A' and \"A\"?",
          [
            "Nothing, they're identical",
            "'A' is a char; \"A\" is a string",
            "'A' is a string; \"A\" is a char",
            "Both are integers",
          ],
          1,
          "Single quotes make a single char; double quotes make a string literal.",
        )}
        {Q(
          "If 'A' has ASCII code 65, what does 'A' + 2 evaluate to?",
          ["'C'", "67", "'AA'", "It won't compile"],
          1,
          "char arithmetic happens as integers, so 'A' + 2 is 67 (the code for 'C').",
        )}
        {Q(
          "Which escape sequence prints a literal backslash?",
          ["\\b", "\\\\", "\\/", "\\0"],
          1,
          "A double backslash \\\\ produces one literal backslash.",
        )}
      </QuizSection>
    </>
  );
}

function L48() {
  return (
    <>
      <p>
        Values often need to change type — an <code>int</code> used where a{" "}
        <code>double</code> is expected, for instance. This lesson previews{" "}
        <strong>type conversion</strong> and introduces a compact decision tool,
        the <strong>conditional operator</strong>.
      </p>
      <h2 id="conversion">Type conversion</h2>
      <p>
        C++ often converts between types automatically (<em>implicit
        conversion</em>). Widening conversions like <code>int → double</code> are
        safe; narrowing ones like <code>double → int</code> lose information and
        should be made explicit with <code>static_cast</code> (Chapter 10).
      </p>
      <CodeBlock
        code={`double d { 5 };                 // int 5 widened to 5.0 — fine
int n { static_cast<int>(3.9) }; // explicit narrowing → 3 (truncated)`}
      />
      <h2 id="promotion-vs-narrowing">Promotions vs. narrowing</h2>
      <p>
        Conversions come in two flavors. A <strong>promotion</strong> moves a value
        into a larger type that can hold every possible value — <code>int</code> to{" "}
        <code>long</code>, <code>float</code> to <code>double</code> — and is always
        safe. A <strong>narrowing conversion</strong> goes to a type that
        can&rsquo;t hold every value (<code>double</code> to <code>int</code>,{" "}
        <code>long</code> to <code>short</code>) and may lose data.
      </p>
      <Callout variant="rule" title="Brace initialization blocks narrowing">
        This is a concrete payoff of the <code>{`{ }`}</code> style you learned in
        Chapter 1: <code>int x{`{3.9}`};</code> is a compile error because it would
        silently drop the <code>.9</code>. The old <code>int x = 3.9;</code>{" "}
        compiles and quietly truncates to 3.
      </Callout>

      <h2 id="ternary">The conditional operator</h2>
      <p>
        The conditional (or &ldquo;ternary&rdquo;) operator <code>?:</code> chooses
        between two values based on a condition — a concise alternative to a small{" "}
        <code>if</code>/<code>else</code>. Read <code>c ? a : b</code> as &ldquo;if{" "}
        <code>c</code> is true, use <code>a</code>, otherwise use <code>b</code>.&rdquo;
      </p>
      <CodeBlock
        code={`int a { 4 };
int b { 7 };
int max { (a > b) ? a : b };   // if a > b use a, else b → 7`}
        lineNumbers={false}
      />
      <p>
        Because it produces a <em>value</em> (unlike an <code>if</code> statement),
        it can be used right inside an initializer or a larger expression, which is
        its main advantage:
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    int age { 20 };
    std::cout << "You are " << ((age >= 18) ? "an adult" : "a minor") << '\\n';
    return 0;
}`}
        output={`You are an adult`}
      />
      <Callout variant="best-practice" title="Keep it simple, and parenthesize">
        The conditional operator shines for short, simple choices. Wrap the whole
        expression in parentheses when embedding it in output, and if either branch
        is complex, a regular <code>if</code> statement reads more clearly.
      </Callout>

      <KeyTakeaways
        items={[
          "C++ converts types implicitly; a promotion (to a larger type) is always safe.",
          "A narrowing conversion can lose data — make it explicit with static_cast.",
          "Brace initialization refuses narrowing conversions at compile time.",
          "condition ? a : b evaluates to a when the condition is true, else b.",
          "The conditional operator produces a value, so it fits inside expressions; prefer if for complex logic.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does (x < 0) ? -x : x compute?",
          ["Always -x", "The absolute value of x", "Always x", "Zero"],
          1,
          "If x is negative it returns -x, otherwise x — that's the absolute value.",
        )}
        {Q(
          "Why does int x{3.9}; fail to compile while int x = 3.9; succeeds?",
          [
            "Braces are invalid syntax here",
            "Brace initialization forbids narrowing conversions that lose data",
            "3.9 is not a number",
            "= is faster than braces",
          ],
          1,
          "Brace init rejects the narrowing double→int conversion; copy init silently truncates.",
        )}
        {Q(
          "Which is a safe promotion (no data loss)?",
          ["double → int", "long → short", "int → double", "double → float"],
          2,
          "int → double is a widening promotion; the others can lose information.",
        )}
      </QuizSection>
    </>
  );
}

/* ============ Chapter 5 — Constants and strings ============ */

function L51() {
  return (
    <>
      <p>
        A <strong>constant</strong> is a value that never changes. Marking a
        variable <code>const</code> tells the compiler to reject any attempt to
        modify it — turning a potential bug into a compile error.
      </p>
      <CodeBlock
        code={`const int maxPlayers { 4 };
maxPlayers = 5;   // ERROR: cannot modify a const variable`}
        lineNumbers={false}
      />
      <Callout variant="rule" title="const must be initialized">
        A <code>const</code> variable has to be given its value when defined —
        there&rsquo;s no way to set it later, since it can never be assigned to.
      </Callout>
      <Callout variant="best-practice" title="Make everything const that can be">
        If a variable shouldn&rsquo;t change after initialization, mark it{" "}
        <code>const</code>. It documents intent and lets the compiler catch
        accidental modifications.
      </Callout>
      <KeyTakeaways
        items={[
          "const makes a variable unmodifiable after initialization.",
          "A const variable must be initialized when defined.",
          "Prefer const for any value that shouldn't change — it prevents bugs.",
        ]}
      />
      <QuizSection>
        {Q(
          "What happens if you try to assign a new value to a const variable?",
          ["It silently changes", "A compile error", "Undefined behavior", "It wraps around"],
          1,
          "The compiler rejects modifications of a const variable.",
        )}
      </QuizSection>
    </>
  );
}

function L52() {
  return (
    <>
      <p>
        A <strong>literal</strong> is a fixed value written directly in code, like{" "}
        <code>42</code> or <code>&quot;hi&quot;</code>. When an unexplained literal
        appears in logic, it&rsquo;s called a <strong>magic number</strong> — and
        those hurt readability and maintenance.
      </p>
      <h2 id="magic">The problem with magic numbers</h2>
      <CodeBlock
        code={`// What is 3600? Why 1.08? A reader can only guess.
int seconds { hours * 3600 };
double total { price * 1.08 };`}
      />
      <h2 id="fix">Name your constants</h2>
      <CodeBlock
        code={`const int secondsPerHour { 3600 };
const double taxRate { 1.08 };

int seconds { hours * secondsPerHour };
double total { price * taxRate };`}
      />
      <Callout variant="best-practice" title="Give meaning a name">
        Replacing a bare number with a well-named constant makes the code
        self-documenting and means you change the value in exactly one place.
      </Callout>
      <KeyTakeaways
        items={[
          "A literal is a fixed value written into the source.",
          "Unexplained literals in logic are 'magic numbers' that obscure intent.",
          "Replace them with named const variables for clarity and single-point changes.",
        ]}
      />
      <QuizSection>
        {Q(
          "Why replace a magic number like 3600 with a named constant?",
          [
            "It runs faster",
            "It documents meaning and centralizes the value for easy changes",
            "It uses less memory",
            "It's required by the compiler",
          ],
          1,
          "Named constants make code self-explanatory and easy to update in one place.",
        )}
      </QuizSection>
    </>
  );
}

function L53() {
  return (
    <>
      <p>
        Some constants can be computed by the compiler before the program even
        runs. Marking them <code>constexpr</code> guarantees this{" "}
        <strong>compile-time</strong> evaluation, which enables optimizations and
        lets the value be used where a compile-time constant is required.
      </p>
      <CodeBlock
        code={`constexpr double pi { 3.14159 };
constexpr int daysPerWeek { 7 };
constexpr int hoursPerWeek { daysPerWeek * 24 }; // computed at compile time`}
      />
      <Definition term="constexpr">
        A constant whose value is known and fixed at compile time. Prefer it over
        plain <code>const</code> for values that qualify.
      </Definition>
      <Callout variant="best-practice" title="constexpr for compile-time values">
        If a constant&rsquo;s value is a compile-time literal or computed from
        other compile-time constants, make it <code>constexpr</code>. Use plain{" "}
        <code>const</code> when the value is only known at run time.
      </Callout>
      <KeyTakeaways
        items={[
          "constexpr constants are evaluated by the compiler before the program runs.",
          "They can be built from other compile-time constants.",
          "Prefer constexpr over const when the value is known at compile time.",
        ]}
      />
      <QuizSection>
        {Q(
          "What distinguishes constexpr from const?",
          [
            "constexpr can change; const cannot",
            "constexpr guarantees the value is known at compile time",
            "They are identical",
            "const is faster",
          ],
          1,
          "constexpr requires a compile-time-known value, enabling extra guarantees and optimizations.",
        )}
      </QuizSection>
    </>
  );
}

function L54() {
  return (
    <>
      <p>
        For text, C++ gives you <code>std::string</code> from the{" "}
        <code>&lt;string&gt;</code> library — a friendly type that manages its own
        memory and grows as needed.
      </p>
      <CodeBlock
        code={`#include <iostream>
#include <string>

int main()
{
    std::string name { "Ada" };
    name += " Lovelace";                 // concatenation
    std::cout << "Hello, " << name << '\\n';
    std::cout << "Length: " << name.length() << '\\n';
    return 0;
}`}
        output={`Hello, Ada Lovelace\nLength: 12`}
      />
      <h2 id="operations">Common operations</h2>
      <p>
        A <code>std::string</code> comes with a rich set of built-in operations.
        Here are the ones you&rsquo;ll reach for constantly:
      </p>
      <table>
        <thead>
          <tr>
            <th>Operation</th>
            <th>Does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>s.length()</code> / <code>s.size()</code>
            </td>
            <td>Number of characters</td>
          </tr>
          <tr>
            <td>
              <code>s.empty()</code>
            </td>
            <td>True if the string has no characters</td>
          </tr>
          <tr>
            <td>
              <code>s[i]</code>
            </td>
            <td>The character at index i (0-based)</td>
          </tr>
          <tr>
            <td>
              <code>s + t</code> / <code>s += t</code>
            </td>
            <td>Concatenate strings</td>
          </tr>
          <tr>
            <td>
              <code>s.substr(pos, len)</code>
            </td>
            <td>A substring starting at pos</td>
          </tr>
          <tr>
            <td>
              <code>s == t</code>
            </td>
            <td>Compare two strings for equality</td>
          </tr>
        </tbody>
      </table>
      <CodeBlock
        code={`#include <iostream>
#include <string>

int main()
{
    std::string s { "Hello" };
    std::cout << s[0] << '\\n';          // H  (index 0)
    std::cout << s.substr(1, 3) << '\\n'; // ell (3 chars from index 1)
    std::cout << (s == "Hello") << '\\n'; // 1  (true)
    return 0;
}`}
        output={`H\nell\n1`}
      />

      <h2 id="input">Reading text from the user</h2>
      <p>
        <code>std::cin &gt;&gt; s</code> reads a single word — it stops at the
        first whitespace. To capture a whole line including spaces, use{" "}
        <code>std::getline</code>:
      </p>
      <CodeBlock
        code={`#include <iostream>
#include <string>

int main()
{
    std::cout << "Enter your full name: ";
    std::string name {};
    std::getline(std::cin >> std::ws, name); // reads the entire line
    std::cout << "Hello, " << name << '\\n';
    return 0;
}`}
        output={`Enter your full name: Ada Lovelace\nHello, Ada Lovelace`}
      />
      <Callout variant="tip" title="std::ws skips leading whitespace">
        The <code>std::ws</code> manipulator tells the stream to discard any
        leftover whitespace (like the newline left behind by a previous{" "}
        <code>std::cin &gt;&gt;</code>) before <code>getline</code> reads. Without
        it, <code>getline</code> can appear to &ldquo;skip&rdquo; the prompt.
      </Callout>

      <Callout variant="note" title="std::string is a class, not a fundamental type">
        Unlike <code>int</code> or <code>double</code>, <code>std::string</code>{" "}
        comes from the standard library (hence the <code>#include</code> and the{" "}
        <code>std::</code>). It&rsquo;s your first taste of the powerful class types
        you&rsquo;ll build yourself in Chapter 14.
      </Callout>

      <KeyTakeaways
        items={[
          "std::string (from <string>) stores and manages text, growing as needed.",
          "Use + / += to concatenate, [] to index, .length()/.size(), .substr(), and == to compare.",
          "cin >> reads a single word; std::getline reads a full line.",
          "Use std::ws before getline to skip leftover whitespace.",
          "std::string is a library class type, not a fundamental type.",
        ]}
      />
      <QuizSection>
        {Q(
          "Which reads an entire line of text, including spaces?",
          ["std::cin >> s", "std::getline(std::cin, s)", "s.length()", "std::ws"],
          1,
          "cin >> stops at whitespace; std::getline captures the whole line.",
        )}
        {Q(
          "For std::string s{\"Hello\"}, what is s.substr(1, 3)?",
          ["\"Hel\"", "\"ell\"", "\"llo\"", "\"ello\""],
          1,
          "substr(1, 3) takes 3 characters starting at index 1: 'e', 'l', 'l'.",
        )}
        {Q(
          "Which header must you include to use std::string?",
          ["<iostream>", "<string>", "<text>", "<cstring>"],
          1,
          "std::string lives in the <string> header.",
        )}
      </QuizSection>
    </>
  );
}

function L55() {
  return (
    <>
      <p>
        <code>std::string_view</code> (from <code>&lt;string_view&gt;</code>) is a
        lightweight, read-only <em>view</em> of existing text. It doesn&rsquo;t own
        or copy the characters, which makes it ideal for function parameters that
        only need to read a string.
      </p>
      <CodeBlock
        code={`#include <iostream>
#include <string_view>

void greet(std::string_view name)  // no copy made
{
    std::cout << "Hi, " << name << '\\n';
}

int main()
{
    greet("world");          // works with a literal
    std::string s { "Ada" };
    greet(s);                // and with a std::string
    return 0;
}`}
        output={`Hi, world\nHi, Ada`}
      />
      <Callout variant="best-practice" title="Prefer string_view for read-only parameters">
        When a function only needs to <em>read</em> a string, take a{" "}
        <code>std::string_view</code>. It avoids an unnecessary copy and accepts
        both string literals and <code>std::string</code>s.
      </Callout>
      <Callout variant="warning" title="Don't outlive the data">
        A <code>string_view</code> points at characters it doesn&rsquo;t own. If
        the underlying string is destroyed or changed, the view becomes invalid —
        so don&rsquo;t store one longer than the data it references.
      </Callout>
      <KeyTakeaways
        items={[
          "std::string_view is a non-owning, read-only view of text.",
          "It avoids copies — ideal for read-only function parameters.",
          "It accepts both literals and std::strings.",
          "Never let a string_view outlive the data it points to.",
        ]}
      />
      <QuizSection>
        {Q(
          "When is std::string_view the best choice for a function parameter?",
          [
            "When the function needs to modify and keep the string",
            "When the function only needs to read the string",
            "When you need to store the string forever",
            "Never — always use std::string",
          ],
          1,
          "string_view is a non-owning read-only view, perfect for read-only access without copying.",
        )}
      </QuizSection>
    </>
  );
}

/* ================= Chapter 6 — Operators ================= */

function L61() {
  return (
    <>
      <p>
        When an expression mixes operators, <strong>precedence</strong> decides
        which run first and <strong>associativity</strong> breaks ties between
        operators of equal precedence.
      </p>
      <CodeBlock
        code={`int r { 2 + 3 * 4 };   // * before + → 2 + 12 → 14
int s { (2 + 3) * 4 }; // parentheses force + first → 20`}
      />
      <Callout variant="best-practice" title="Parenthesize for clarity">
        You don&rsquo;t need to memorize the whole precedence table. When an
        expression could be misread, add parentheses — they make intent obvious to
        every reader.
      </Callout>
      <KeyTakeaways
        items={[
          "Precedence determines which operators evaluate first.",
          "Associativity resolves ties between equal-precedence operators.",
          "Use parentheses to make evaluation order explicit and readable.",
        ]}
      />
      <QuizSection>
        {Q(
          "What is the value of 2 + 3 * 4?",
          ["20", "14", "24", "9"],
          1,
          "Multiplication has higher precedence, so 3*4 runs first: 2 + 12 = 14.",
        )}
      </QuizSection>
    </>
  );
}

function L62() {
  return (
    <>
      <p>
        The arithmetic operators are <code>+</code>, <code>-</code>,{" "}
        <code>*</code>, <code>/</code>, and <code>%</code> (remainder). Two
        behaviors surprise beginners: integer division and the modulo operator.
      </p>
      <h2 id="int-division">Integer division truncates</h2>
      <CodeBlock
        code={`std::cout << 7 / 2 << '\\n';    // 3, not 3.5 — the fraction is dropped
std::cout << 7.0 / 2 << '\\n';  // 3.5 — one operand is a double`}
      />
      <h2 id="modulo">The modulo operator</h2>
      <p>
        <code>%</code> gives the remainder of integer division — handy for testing
        divisibility or wrapping values:
      </p>
      <CodeBlock
        code={`std::cout << 7 % 3 << '\\n';   // 1
bool isEven { (n % 2) == 0 };  // true when n divides evenly by 2`}
      />
      <Callout variant="rule" title="Integer / integer stays an integer">
        If both operands are integers, division discards the fractional part. Make
        one operand a floating-point value to get a fractional result.
      </Callout>
      <KeyTakeaways
        items={[
          "Arithmetic operators: + - * / and % (remainder).",
          "Integer division truncates: 7 / 2 is 3.",
          "Make an operand a double to get a fractional result.",
          "% gives the remainder — great for divisibility checks.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does 7 / 2 evaluate to in C++?",
          ["3.5", "3", "4", "1"],
          1,
          "Both operands are ints, so the result is integer division: 3 (the .5 is dropped).",
        )}
      </QuizSection>
    </>
  );
}

function L63() {
  return (
    <>
      <p>
        The <strong>increment</strong> (<code>++</code>) and{" "}
        <strong>decrement</strong> (<code>--</code>) operators add or subtract 1.
        Each has a prefix and postfix form with a subtle difference.
      </p>
      <CodeBlock
        code={`int x { 5 };
std::cout << ++x << '\\n'; // pre-increment: increment first → 6
std::cout << x++ << '\\n'; // post-increment: use value (6), then increment → 6
std::cout << x   << '\\n'; // now 7`}
        output={`6\n6\n7`}
      />
      <Callout variant="warning" title="Beware side effects in one expression">
        Using a variable more than once in an expression where it&rsquo;s also
        incremented — like <code>x + x++</code> — can be undefined or confusing.
        Keep increments on their own line.
      </Callout>
      <KeyTakeaways
        items={[
          "++ and -- add or subtract 1.",
          "Pre-increment (++x) changes first, then yields the new value.",
          "Post-increment (x++) yields the old value, then changes.",
          "Avoid combining an increment with other uses of the same variable in one expression.",
        ]}
      />
      <QuizSection>
        {Q(
          "If x is 5, what does x++ evaluate to, and what is x afterward?",
          ["6, and x is 6", "5, and x is 6", "5, and x is 5", "6, and x is 5"],
          1,
          "Post-increment yields the old value (5), then increments x to 6.",
        )}
      </QuizSection>
    </>
  );
}

function L64() {
  return (
    <>
      <p>
        To make decisions, programs ask yes/no questions and combine the answers.{" "}
        <strong>Comparison operators</strong> produce a <code>bool</code>, and{" "}
        <strong>logical operators</strong> combine those booleans into richer
        conditions.
      </p>

      <h2 id="comparison">The six comparison operators</h2>
      <table>
        <thead>
          <tr>
            <th>Operator</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>==</code>
            </td>
            <td>equal to</td>
          </tr>
          <tr>
            <td>
              <code>!=</code>
            </td>
            <td>not equal to</td>
          </tr>
          <tr>
            <td>
              <code>&lt;</code> / <code>&gt;</code>
            </td>
            <td>less than / greater than</td>
          </tr>
          <tr>
            <td>
              <code>&lt;=</code> / <code>&gt;=</code>
            </td>
            <td>less/greater than or equal to</td>
          </tr>
        </tbody>
      </table>

      <h2 id="logical">The three logical operators</h2>
      <CodeBlock
        code={`bool a { 5 > 3 };    // true
bool b { 5 == 4 };   // false
bool c { a && b };   // AND: true only if BOTH are true → false
bool d { a || b };   // OR:  true if EITHER is true → true
bool e { !b };       // NOT: flips the value → true`}
      />
      <p>
        <code>&amp;&amp;</code> (and) is true only when both operands are true;{" "}
        <code>||</code> (or) is true when at least one is; <code>!</code> (not)
        flips a boolean.
      </p>

      <Callout variant="key" title="Short-circuit evaluation">
        <code>&amp;&amp;</code> stops the moment it sees a false operand, and{" "}
        <code>||</code> stops on a true one — because the overall result is already
        determined. This lets you write safe guards like{" "}
        <code>(p != nullptr &amp;&amp; p-&gt;ready)</code>, where the second part
        only runs when the first passed.
      </Callout>

      <Callout variant="rule" title="Use == for comparison, = for assignment">
        A single <code>=</code> assigns; a double <code>==</code> compares. Writing{" "}
        <code>if (x = 5)</code> instead of <code>if (x == 5)</code> is a classic
        bug — enable warnings to catch it.
      </Callout>

      <Callout variant="warning" title="Don't chain comparisons like math">
        In math you might write <code>1 &lt; x &lt; 10</code>, but in C++ that
        evaluates left-to-right into a bool and then compares <em>that</em> to 10 —
        almost never what you mean. Write <code>x &gt; 1 &amp;&amp; x &lt; 10</code>{" "}
        instead.
      </Callout>

      <KeyTakeaways
        items={[
          "Comparison operators (==, !=, <, >, <=, >=) produce booleans.",
          "Logical operators combine conditions: && (and), || (or), ! (not).",
          "&& and || short-circuit, skipping the second operand when the result is known.",
          "Write range checks as x > 1 && x < 10, not 1 < x < 10.",
          "== compares; = assigns — don't confuse them.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does short-circuit evaluation of && do?",
          [
            "Always evaluates both operands",
            "Skips the second operand if the first is false",
            "Reverses the operands",
            "Turns && into ||",
          ],
          1,
          "Since a false operand makes the whole && false, the second operand isn't evaluated.",
        )}
        {Q(
          "How should you check that x is between 1 and 10 (exclusive)?",
          [
            "1 < x < 10",
            "x > 1 && x < 10",
            "x > 1 || x < 10",
            "x > 1, x < 10",
          ],
          1,
          "Chained comparisons don't work as in math; combine two comparisons with &&.",
        )}
      </QuizSection>
    </>
  );
}

/* ========= Chapter 7 — Scope, duration & linkage ========= */

function L71() {
  return (
    <>
      <p>
        You&rsquo;ve met local variables. Their opposite is a{" "}
        <strong>global variable</strong>, defined outside any function and visible
        throughout the file. Globals are occasionally useful but easy to misuse.
      </p>
      <CodeBlock
        code={`#include <iostream>

int g_score { 0 };   // global variable (g_ prefix by convention)

void addPoint() { ++g_score; }

int main()
{
    addPoint();
    addPoint();
    std::cout << g_score << '\\n'; // 2 — both functions share it
    return 0;
}`}
        output={`2`}
      />
      <Callout variant="warning" title="Prefer local variables">
        Global variables can be changed from anywhere, which makes bugs hard to
        trace and code hard to reason about. Favor passing data through parameters
        and return values instead.
      </Callout>
      <KeyTakeaways
        items={[
          "Global variables are defined outside functions and visible file-wide.",
          "They're conventionally prefixed (e.g. g_) to stand out.",
          "Because any code can change them, prefer local variables and parameters.",
        ]}
      />
      <QuizSection>
        {Q(
          "Why are global variables generally discouraged?",
          [
            "They're slower to access",
            "Any code can modify them, making bugs hard to trace",
            "They can't hold numbers",
            "They must be const",
          ],
          1,
          "Uncontrolled access from anywhere makes global state a common source of hard-to-find bugs.",
        )}
      </QuizSection>
    </>
  );
}

function L72() {
  return (
    <>
      <p>
        You can define your own <strong>namespaces</strong> to group related code
        and prevent your names from colliding with other libraries&rsquo; names.
      </p>
      <CodeBlock
        code={`namespace geometry {
    constexpr double pi { 3.14159 };
    double circleArea(double r) { return pi * r * r; }
}

int main()
{
    std::cout << geometry::circleArea(2.0) << '\\n';
    return 0;
}`}
        output={`12.5664`}
      />
      <Callout variant="best-practice" title="Group a library's code in a namespace">
        When you write a set of related functions and constants meant to be used
        together, wrap them in a namespace. Callers then access them through a
        clear, collision-free prefix.
      </Callout>
      <KeyTakeaways
        items={[
          "You can define custom namespaces to organize related code.",
          "They keep your identifiers from colliding with others'.",
          "Access members with the :: scope resolution operator.",
        ]}
      />
      <QuizSection>
        {Q(
          "How do you call circleArea defined in namespace geometry?",
          ["circleArea()", "geometry.circleArea()", "geometry::circleArea()", "geometry->circleArea()"],
          2,
          "Use the scope resolution operator: geometry::circleArea().",
        )}
      </QuizSection>
    </>
  );
}

function L73() {
  return (
    <>
      <p>
        Two more properties round out how identifiers behave:{" "}
        <strong>duration</strong> (how long an object lives) and{" "}
        <strong>linkage</strong> (whether a name can be shared across files).
      </p>
      <h2 id="static-local">static local variables</h2>
      <p>
        A local variable marked <code>static</code> keeps its value between calls
        instead of being recreated each time:
      </p>
      <CodeBlock
        code={`void counter()
{
    static int count { 0 };  // initialized once, persists
    ++count;
    std::cout << count << ' ';
}
// Calling counter() three times prints: 1 2 3`}
      />
      <h2 id="linkage">Internal vs. external linkage</h2>
      <ul>
        <li>
          <strong>Internal linkage</strong> (<code>static</code> at file scope, or{" "}
          <code>const</code> globals) — the name is private to its file.
        </li>
        <li>
          <strong>External linkage</strong> (normal functions, <code>extern</code>{" "}
          globals) — the name can be used from other files via a declaration.
        </li>
      </ul>
      <KeyTakeaways
        items={[
          "Duration is how long an object exists; linkage is whether its name is shareable across files.",
          "A static local variable persists across calls, initialized only once.",
          "Internal linkage keeps a name file-private; external linkage lets other files use it.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does 'static' do to a local variable?",
          [
            "Makes it constant",
            "Makes it persist across function calls instead of being recreated",
            "Makes it global",
            "Deletes it after use",
          ],
          1,
          "A static local is initialized once and retains its value between calls.",
        )}
      </QuizSection>
    </>
  );
}

/* ================= Chapter 8 — Control flow ================= */

function L81() {
  return (
    <>
      <p>
        Up to now our programs have run straight through, top to bottom. Real
        programs need to make <strong>decisions</strong>. The <strong>if
        statement</strong> is the most fundamental one: it runs a block of code
        only when a condition is true.
      </p>

      <h2 id="basic">The basic form</h2>
      <CodeBlock
        code={`int temperature { 30 };

if (temperature > 25)
{
    std::cout << "It's warm out.\\n";
}`}
        output={`It's warm out.`}
      />
      <p>
        The condition in parentheses must evaluate to a <code>bool</code> (or
        something convertible to one). If it&rsquo;s <code>true</code>, the block
        runs; if <code>false</code>, it&rsquo;s skipped.
      </p>

      <h2 id="else">Handling the other case with else</h2>
      <p>
        Attach an <code>else</code> to run alternative code when the condition is
        false, and chain <code>else if</code> for several mutually exclusive paths:
      </p>
      <CodeBlock
        code={`int score { 82 };

if (score >= 90)
{
    std::cout << "A\\n";
}
else if (score >= 80)
{
    std::cout << "B\\n";
}
else
{
    std::cout << "C or below\\n";
}`}
        output={`B`}
      />
      <p>
        The branches are checked in order, and the first true one wins — the rest
        are skipped entirely. That&rsquo;s why the more specific condition (
        <code>&gt;= 90</code>) comes before the looser one (<code>&gt;= 80</code>).
      </p>

      <h2 id="nesting">Nesting</h2>
      <p>
        An <code>if</code> can live inside another to express &ldquo;this, and then
        that&rdquo; logic. Keep nesting shallow — deep nesting quickly becomes hard
        to read, and can often be flattened with <code>&amp;&amp;</code> or an
        early return.
      </p>

      <Callout variant="best-practice" title="Always use braces">
        Even for a single statement, wrap the body in <code>{`{ }`}</code>. It
        prevents a notorious class of bug where you later add a second line that
        <em> looks</em> like it belongs to the <code>if</code> but silently
        doesn&rsquo;t.
      </Callout>
      <Callout variant="rule" title="== compares; = assigns">
        Writing <code>if (x = 5)</code> assigns 5 to <code>x</code> and then tests
        that (always true) rather than comparing. Use <code>==</code> for equality,
        and turn on compiler warnings to catch the slip.
      </Callout>

      <KeyTakeaways
        items={[
          "if runs a block only when its condition (a bool) is true.",
          "else handles the false case; else if chains mutually exclusive conditions.",
          "Branches are tested in order — the first true one runs, and put specific conditions before general ones.",
          "Always brace the body, and never confuse = (assign) with == (compare).",
        ]}
      />
      <QuizSection>
        {Q(
          "Why brace even a single-statement if body?",
          [
            "It's required by the compiler",
            "To avoid bugs when a second line is added later",
            "It runs faster",
            "It changes the condition",
          ],
          1,
          "Without braces, a newly added line won't be part of the if, a classic mistake.",
        )}
        {Q(
          "In an if / else-if / else chain, how many branches run?",
          ["All that are true", "At most one — the first true branch", "Always exactly two", "None"],
          1,
          "Evaluation stops at the first true condition; the remaining branches are skipped.",
        )}
        {Q(
          "What does if (x = 5) actually do?",
          [
            "Compares x to 5",
            "Assigns 5 to x, then treats the result as the condition (always true)",
            "Causes a compile error always",
            "Nothing",
          ],
          1,
          "A single = assigns; the assignment's value (5) is then used as a truthy condition.",
        )}
      </QuizSection>
    </>
  );
}

function L82() {
  return (
    <>
      <p>
        A <strong>switch statement</strong> compares one value against a list of
        constant <code>case</code> labels and jumps to the match. When you&rsquo;re
        testing a single variable against many specific values, it&rsquo;s clearer
        (and often faster) than a long <code>else if</code> chain.
      </p>

      <h2 id="basic">Anatomy of a switch</h2>
      <CodeBlock
        code={`switch (day)
{
    case 1:
        std::cout << "Monday\\n";
        break;
    case 2:
        std::cout << "Tuesday\\n";
        break;
    default:
        std::cout << "Some other day\\n";
        break;
}`}
      />
      <p>
        The value in <code>switch (...)</code> must be an integral type or an enum.
        Each <code>case</code> label is a constant; <code>default</code> catches
        everything that matches no case (and is optional, though usually wise).
      </p>

      <h2 id="fallthrough">Break and fall-through</h2>
      <p>
        After jumping to a matching case, execution keeps running{" "}
        <em>downward</em> through later cases until it hits a <code>break</code> (or
        the end of the switch). This is called <strong>fall-through</strong>.
      </p>
      <Callout variant="rule" title="Forgetting break is a classic bug">
        Omit <code>break</code> and control spills into the next case&rsquo;s code.
        End every case with <code>break</code> unless you deliberately want
        fall-through.
      </Callout>

      <h2 id="stacked">Intentional stacked labels</h2>
      <p>
        One legitimate use of fall-through is stacking labels to share a body — for
        example, treating several values the same way:
      </p>
      <CodeBlock
        code={`switch (letter)
{
    case 'a':
    case 'e':
    case 'i':
    case 'o':
    case 'u':
        std::cout << "vowel\\n";
        break;
    default:
        std::cout << "consonant\\n";
        break;
}`}
      />

      <Callout variant="note" title="Declaring variables inside a case">
        If you need a new variable inside a single case, wrap that case&rsquo;s body
        in its own <code>{`{ }`}</code> block. Otherwise the compiler complains,
        because the variable&rsquo;s scope would span other cases.
      </Callout>

      <KeyTakeaways
        items={[
          "switch compares one integral/enum value against constant case labels.",
          "Each case usually ends with break; otherwise execution falls through to the next.",
          "Stacking case labels lets several values share one body.",
          "default handles unmatched values; brace a case's body if it declares variables.",
        ]}
      />
      <QuizSection>
        {Q(
          "What happens if you omit break at the end of a switch case?",
          [
            "The program won't compile",
            "Execution falls through into the next case",
            "The switch restarts",
            "Nothing runs",
          ],
          1,
          "Without break, control continues into the following case's statements.",
        )}
        {Q(
          "What kinds of values can a switch condition be?",
          [
            "Any type at all",
            "Only integral types and enums",
            "Only strings",
            "Only booleans",
          ],
          1,
          "switch works on integral types and enumerations, not arbitrary types like std::string.",
        )}
      </QuizSection>
    </>
  );
}

function L83() {
  return (
    <>
      <p>
        When you don&rsquo;t know in advance how many times to repeat — &ldquo;keep
        asking until the input is valid,&rdquo; &ldquo;process lines until the file
        ends&rdquo; — a <strong>while loop</strong> is the tool. It repeats its body
        as long as a condition remains true.
      </p>

      <h2 id="while">The while loop</h2>
      <CodeBlock
        code={`int i { 1 };
while (i <= 3)
{
    std::cout << i << ' ';
    ++i;                  // essential: move toward making the condition false
}
// prints: 1 2 3`}
        output={`1 2 3`}
      />
      <p>
        The condition is checked <em>before</em> each pass. If it&rsquo;s false the
        very first time, the body never runs at all.
      </p>
      <Callout variant="warning" title="Avoid infinite loops">
        Something in the body must move the condition toward false. Forget the{" "}
        <code>++i</code> above and <code>i</code> stays 1 forever — the loop never
        ends.
      </Callout>

      <h2 id="do-while">The do-while loop</h2>
      <p>
        A <strong>do-while</strong> loop puts the condition at the{" "}
        <em>bottom</em>, so the body always runs at least once before the condition
        is first tested. That fits menus and prompts that must display before you
        can decide whether to repeat:
      </p>
      <CodeBlock
        code={`int choice {};
do
{
    std::cout << "Enter a number 1-3: ";
    std::cin >> choice;
}
while (choice < 1 || choice > 3);   // repeat until it's in range`}
      />
      <Callout variant="note" title="Note the trailing semicolon">
        A <code>do-while</code> ends with a semicolon after the{" "}
        <code>while (...)</code>. It&rsquo;s easy to forget.
      </Callout>

      <h2 id="infinite">Intentional infinite loops</h2>
      <p>
        Sometimes you want a loop that runs until an event inside it says to stop.{" "}
        <code>while (true)</code> paired with a <code>break</code> (next lesson) is
        the standard way to express that.
      </p>

      <h2 id="which">Which loop to use</h2>
      <ul>
        <li>
          Known iteration count → <strong>for</strong>.
        </li>
        <li>
          Unknown count, might run zero times → <strong>while</strong>.
        </li>
        <li>
          Unknown count, must run at least once → <strong>do-while</strong>.
        </li>
      </ul>

      <KeyTakeaways
        items={[
          "while repeats while its condition is true, checking before each pass — it may run zero times.",
          "do-while checks after the body, so it always runs at least once (and needs a trailing semicolon).",
          "Always change something that moves the condition toward false to avoid infinite loops.",
          "Choose for (known count), while (may run zero times), or do-while (at least once).",
        ]}
      />
      <QuizSection>
        {Q(
          "What distinguishes do-while from while?",
          [
            "do-while never loops",
            "do-while always executes its body at least once",
            "do-while can't use conditions",
            "There's no difference",
          ],
          1,
          "do-while checks the condition after running the body, guaranteeing one execution.",
        )}
        {Q(
          "You need to prompt the user, then repeat only if the input was invalid. Which loop fits best?",
          ["for", "while", "do-while", "None can do this"],
          2,
          "The prompt must show at least once before checking, which is exactly do-while.",
        )}
      </QuizSection>
    </>
  );
}

function L84() {
  return (
    <>
      <p>
        The <strong>for loop</strong> gathers all three pieces of loop control —
        initialization, condition, and update — into a single header. That makes it
        the natural choice when you know (or can compute) how many times to iterate.
      </p>

      <h2 id="anatomy">The three parts</h2>
      <CodeBlock
        code={`for (int i { 0 }; i < 5; ++i)
{
    std::cout << i << ' ';
}
// prints: 0 1 2 3 4`}
        output={`0 1 2 3 4`}
      />
      <p>The header runs in a precise order:</p>
      <ol>
        <li>
          <strong>Init</strong> (<code>int i{`{0}`}</code>) runs once, before the
          loop starts.
        </li>
        <li>
          <strong>Condition</strong> (<code>i &lt; 5</code>) is checked before each
          pass; if false, the loop ends.
        </li>
        <li>
          The <strong>body</strong> runs.
        </li>
        <li>
          <strong>Update</strong> (<code>++i</code>) runs, then it loops back to
          the condition.
        </li>
      </ol>

      <h2 id="scope">The loop variable is scoped to the loop</h2>
      <p>
        Because <code>i</code> is declared inside the header, it exists only within
        the loop and is destroyed when the loop finishes. That&rsquo;s exactly what
        you want — it keeps counters from leaking into the surrounding code.
      </p>

      <h2 id="off-by-one">Off-by-one errors</h2>
      <p>
        The single most common loop bug is running one time too many or too few.
        Note the difference:
      </p>
      <CodeBlock
        code={`for (int i { 0 }; i < 5; ++i)  // i = 0,1,2,3,4  → 5 iterations
for (int i { 1 }; i <= 5; ++i) // i = 1,2,3,4,5  → 5 iterations
for (int i { 0 }; i <= 5; ++i) // i = 0..5       → 6 iterations (often a bug!)`}
      />
      <Callout variant="best-practice" title="Count from 0 with <">
        The idiom <code>for (int i{`{0}`}; i &lt; n; ++i)</code> runs exactly{" "}
        <code>n</code> times and matches zero-based indexing used by arrays and
        vectors. Make it your default shape.
      </Callout>

      <Callout variant="tip" title="For counting, prefer for over while">
        A <code>while</code> loop scatters the counter&rsquo;s declaration,
        condition, and update across three different places, making it easy to
        forget the update and spin forever. A <code>for</code> loop keeps all three
        in one visible line.
      </Callout>

      <KeyTakeaways
        items={[
          "A for loop combines init, condition, and update in its header.",
          "Execution order: init once, then (condition → body → update) repeatedly.",
          "The loop variable is scoped to the loop and destroyed when it ends.",
          "for (int i{0}; i < n; ++i) runs exactly n times — the standard idiom.",
          "Watch the condition (< vs <=) to avoid off-by-one errors.",
        ]}
      />
      <QuizSection>
        {Q(
          "How many times does `for (int i{0}; i < 5; ++i)` run its body?",
          ["4", "5", "6", "Infinite"],
          1,
          "i takes values 0,1,2,3,4 — five iterations.",
        )}
        {Q(
          "Which part of a for header runs only once?",
          ["The condition", "The initialization", "The update", "The body"],
          1,
          "Initialization executes a single time before the loop begins.",
        )}
        {Q(
          "How many iterations does `for (int i{1}; i <= 5; ++i)` perform?",
          ["4", "5", "6", "Infinite"],
          1,
          "i runs 1,2,3,4,5 — five iterations.",
        )}
      </QuizSection>
    </>
  );
}

function L85() {
  return (
    <>
      <p>
        Two statements fine-tune loops: <code>break</code> exits a loop
        immediately, and <code>continue</code> skips to the next iteration.
        We&rsquo;ll also generate random numbers.
      </p>
      <CodeBlock
        code={`for (int i { 0 }; i < 10; ++i)
{
    if (i == 5) break;      // stop entirely at 5
    if (i % 2 == 0) continue; // skip even numbers
    std::cout << i << ' ';    // prints: 1 3
}`}
      />
      <h2 id="random">Random numbers</h2>
      <p>
        Modern C++ uses the <code>&lt;random&gt;</code> library. A common,
        beginner-friendly approach uses the Mersenne Twister engine:
      </p>
      <CodeBlock
        code={`#include <random>
#include <iostream>

int main()
{
    std::mt19937 gen { std::random_device{}() };     // seeded engine
    std::uniform_int_distribution roll { 1, 6 };     // like a die
    std::cout << roll(gen) << '\\n';                  // a random 1..6
    return 0;
}`}
      />
      <KeyTakeaways
        items={[
          "break exits the enclosing loop immediately.",
          "continue skips the rest of the current iteration and moves on.",
          "Use the <random> library (e.g. std::mt19937 + a distribution) for randomness.",
        ]}
      />
      <QuizSection>
        {Q(
          "What's the difference between break and continue?",
          [
            "They're identical",
            "break exits the loop; continue skips to the next iteration",
            "continue exits the loop; break skips ahead",
            "Both end the program",
          ],
          1,
          "break leaves the loop entirely; continue jumps to the loop's next pass.",
        )}
      </QuizSection>
    </>
  );
}

/* ============ Chapter 9 — Error detection & handling ============ */

function L91() {
  return (
    <>
      <p>
        <strong>Testing</strong> is how you gain confidence that code works.
        Even informally, checking your functions against known inputs and expected
        outputs catches bugs early.
      </p>
      <CodeBlock
        code={`#include <iostream>

int add(int a, int b) { return a + b; }

int main()
{
    // Simple sanity checks
    std::cout << (add(2, 3) == 5) << '\\n';   // expect 1
    std::cout << (add(-1, 1) == 0) << '\\n';  // expect 1
    return 0;
}`}
        output={`1\n1`}
      />
      <Callout variant="best-practice" title="Test edge cases">
        Beyond typical inputs, test the boundaries: zero, negative numbers, empty
        strings, the largest value. Bugs love to hide at the edges.
      </Callout>
      <KeyTakeaways
        items={[
          "Testing checks code against known inputs and expected outputs.",
          "Even simple equality checks catch regressions early.",
          "Always test edge cases — zero, negatives, empties, and extremes.",
        ]}
      />
      <QuizSection>
        {Q(
          "Where do bugs most often hide?",
          ["In comments", "At edge cases and boundaries", "In whitespace", "In the main function only"],
          1,
          "Boundary conditions (zero, extremes, empties) are classic bug locations, so test them.",
        )}
      </QuizSection>
    </>
  );
}

function L92() {
  return (
    <>
      <p>
        When something can go wrong, you need a plan. Common strategies for{" "}
        <strong>handling errors</strong> include:
      </p>
      <ul>
        <li>
          <strong>Prevent</strong> — validate inputs so the error can&rsquo;t occur.
        </li>
        <li>
          <strong>Handle locally</strong> — deal with it where it happens (e.g.
          re-prompt the user).
        </li>
        <li>
          <strong>Signal the caller</strong> — return an error value or code so the
          caller decides.
        </li>
        <li>
          <strong>Fail loudly</strong> — for &ldquo;impossible&rdquo; situations,
          stop rather than continue with bad data.
        </li>
      </ul>
      <CodeBlock
        code={`double divide(int a, int b)
{
    if (b == 0)
    {
        std::cout << "Error: cannot divide by zero\\n";
        return 0.0;   // signal a safe fallback
    }
    return static_cast<double>(a) / b;
}`}
      />
      <Callout variant="key" title="Don't silently ignore errors">
        The worst response to an error is pretending it didn&rsquo;t happen.
        Detect it, then choose a deliberate strategy.
      </Callout>
      <KeyTakeaways
        items={[
          "Strategies: prevent, handle locally, signal the caller, or fail loudly.",
          "Validate inputs to stop errors before they start.",
          "Never silently ignore an error — respond deliberately.",
        ]}
      />
      <QuizSection>
        {Q(
          "What's the worst way to respond to a detected error?",
          ["Re-prompt the user", "Return an error code", "Silently ignore it", "Log and stop"],
          2,
          "Ignoring an error lets bad data propagate, causing worse failures later.",
        )}
      </QuizSection>
    </>
  );
}

function L93() {
  return (
    <>
      <p>
        Users type unexpected things. When <code>std::cin</code> fails to read what
        it expected (say, letters where a number was needed), it enters a{" "}
        <strong>failure state</strong> and stops working until you reset it.
      </p>
      <CodeBlock
        code={`#include <iostream>
#include <limits>

int getNumber()
{
    int x {};
    while (!(std::cin >> x))   // loop until a valid number is read
    {
        std::cin.clear();      // clear the error flag
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n'); // discard bad input
        std::cout << "Please enter a number: ";
    }
    return x;
}`}
      />
      <Callout variant="best-practice" title="Validate in a loop">
        Wrap input reads in a loop that clears the error state and re-prompts. This
        turns a crashy program into one that patiently guides the user.
      </Callout>
      <KeyTakeaways
        items={[
          "Invalid input puts std::cin into a failure state.",
          "Call cin.clear() to reset the error, then ignore() to discard bad characters.",
          "Loop until valid input is received for a robust prompt.",
        ]}
      />
      <QuizSection>
        {Q(
          "After std::cin fails to read a number, what must you do before reading again?",
          [
            "Nothing — it recovers on its own",
            "Call cin.clear() and discard the bad input with ignore()",
            "Restart the program",
            "Switch to std::cout",
          ],
          1,
          "You reset the error flag with clear() and remove the offending characters with ignore().",
        )}
      </QuizSection>
    </>
  );
}

function L94() {
  return (
    <>
      <p>
        An <strong>assertion</strong> documents and enforces an assumption. If the
        condition is false at run time, <code>assert</code> stops the program and
        reports where — turning a silent bug into a loud, located one.
      </p>
      <CodeBlock
        code={`#include <cassert>

double getAverage(int sum, int count)
{
    assert(count != 0 && "count must not be zero");
    return static_cast<double>(sum) / count;
}`}
      />
      <h2 id="static-assert">static_assert</h2>
      <p>
        <code>static_assert</code> checks a condition at{" "}
        <strong>compile time</strong> — useful for verifying assumptions about
        types or sizes before the program ever runs:
      </p>
      <CodeBlock
        code={`static_assert(sizeof(int) == 4, "This code assumes 4-byte ints");`}
        lineNumbers={false}
      />
      <Callout variant="note" title="assert is for bugs, not user errors">
        Use assertions to catch <em>programmer</em> mistakes (conditions that
        should be impossible). Handle expected problems like bad user input with
        normal error handling instead.
      </Callout>
      <KeyTakeaways
        items={[
          "assert checks a run-time condition and halts if it's false.",
          "static_assert checks a condition at compile time.",
          "Use assertions for 'impossible' programmer errors, not routine user errors.",
        ]}
      />
      <QuizSection>
        {Q(
          "When does static_assert check its condition?",
          ["At run time", "At compile time", "Only in debug builds", "Never"],
          1,
          "static_assert is evaluated during compilation, failing the build if the condition is false.",
        )}
      </QuizSection>
    </>
  );
}

/* ====== Chapter 10 — Conversion, aliases, deduction ====== */

function L101() {
  return (
    <>
      <p>
        <strong>Implicit type conversion</strong> is the compiler automatically
        changing a value from one type to another when needed — for example,
        promoting an <code>int</code> to a <code>double</code> in mixed arithmetic.
      </p>
      <CodeBlock
        code={`double result { 5 / 2.0 };  // 5 becomes 5.0 → 2.5
double d { 10 };            // int 10 widened to 10.0`}
      />
      <Callout variant="warning" title="Narrowing conversions lose data">
        Converting <code>double → int</code> or a large type to a smaller one can
        silently lose information. Brace initialization turns such narrowing into a
        compile error, which is why it&rsquo;s preferred.
      </Callout>
      <KeyTakeaways
        items={[
          "The compiler converts types implicitly when required.",
          "Widening (int → double) is safe; narrowing can lose data.",
          "Brace initialization rejects narrowing conversions.",
        ]}
      />
      <QuizSection>
        {Q(
          "What is the type and value of 5 / 2.0?",
          ["int 2", "double 2.5", "int 3", "double 2.0"],
          1,
          "2.0 is a double, so 5 is converted to 5.0 and the result is the double 2.5.",
        )}
      </QuizSection>
    </>
  );
}

function L102() {
  return (
    <>
      <p>
        When you deliberately want a conversion, use <code>static_cast</code>. It
        makes the intent explicit and visible, unlike a silent implicit
        conversion.
      </p>
      <CodeBlock
        code={`int total { 7 };
int count { 2 };
double avg { static_cast<double>(total) / count }; // 3.5, not 3`}
        lineNumbers={false}
      />
      <p>
        Casting <code>total</code> to <code>double</code> forces floating-point
        division, giving the correct <code>3.5</code> instead of integer{" "}
        <code>3</code>.
      </p>
      <Callout variant="best-practice" title="Prefer static_cast to C-style casts">
        <code>static_cast&lt;T&gt;(value)</code> is checked and searchable. Avoid
        old C-style casts like <code>(double)total</code>, which are easy to misuse
        and hard to find.
      </Callout>
      <KeyTakeaways
        items={[
          "static_cast<T>(value) performs an explicit, intentional conversion.",
          "It's the clean way to force, e.g., floating-point division.",
          "Prefer it over C-style casts, which are less safe and less visible.",
        ]}
      />
      <QuizSection>
        {Q(
          "Why cast to double in static_cast<double>(total) / count?",
          [
            "To make it slower",
            "To force floating-point division instead of integer division",
            "To round the result",
            "It has no effect",
          ],
          1,
          "With a double operand, division keeps the fractional part instead of truncating.",
        )}
      </QuizSection>
    </>
  );
}

function L103() {
  return (
    <>
      <p>
        A <strong>type alias</strong> gives an existing type a new name, and{" "}
        <code>auto</code> lets the compiler deduce a variable&rsquo;s type from its
        initializer. Both reduce clutter.
      </p>
      <CodeBlock
        code={`using Distance = double;   // alias: Distance means double
Distance marathon { 42.195 };

auto count { 5 };          // deduced as int
auto pi { 3.14 };          // deduced as double
auto name { std::string{"Ada"} }; // deduced as std::string`}
      />
      <Callout variant="best-practice" title="Use auto to avoid redundant type names">
        <code>auto</code> is especially handy with long type names (like iterator
        types you&rsquo;ll meet later). But keep code readable — don&rsquo;t use it
        where the type isn&rsquo;t obvious from context.
      </Callout>
      <KeyTakeaways
        items={[
          "A type alias (using Name = Type;) gives a type a readable second name.",
          "auto deduces a variable's type from its initializer.",
          "Both cut down on verbose, repetitive type names — use them for clarity.",
        ]}
      />
      <QuizSection>
        {Q(
          "What type does `auto x { 3.14 };` deduce?",
          ["int", "double", "float", "auto"],
          1,
          "3.14 is a double literal, so x is deduced as double.",
        )}
      </QuizSection>
    </>
  );
}

/* ====== Chapter 11 — Overloading & templates ====== */

function L111() {
  return (
    <>
      <p>
        <strong>Function overloading</strong> lets several functions share one
        name as long as their parameters differ. The compiler picks the right one
        based on the arguments you pass.
      </p>
      <CodeBlock
        code={`int    add(int a, int b)       { return a + b; }
double add(double a, double b) { return a + b; }

int main()
{
    std::cout << add(2, 3) << '\\n';       // calls the int version → 5
    std::cout << add(2.5, 3.5) << '\\n';   // calls the double version → 6
    return 0;
}`}
        output={`5\n6`}
      />
      <Callout variant="rule" title="Overloads must differ in parameters">
        Two functions can share a name only if their parameter lists differ (in
        number or types). You can&rsquo;t overload on return type alone.
      </Callout>
      <KeyTakeaways
        items={[
          "Overloading lets functions share a name if their parameters differ.",
          "The compiler selects the best match from the arguments.",
          "You can't overload based only on return type.",
        ]}
      />
      <QuizSection>
        {Q(
          "Can you overload two functions that differ only in return type?",
          ["Yes, always", "No — overloads must differ in their parameters", "Only for int and double", "Only inside classes"],
          1,
          "Overload resolution uses the arguments, so parameter lists must differ.",
        )}
      </QuizSection>
    </>
  );
}

function L112() {
  return (
    <>
      <p>
        A <strong>default argument</strong> gives a parameter a fallback value, so
        callers can omit it.
      </p>
      <CodeBlock
        code={`void greet(std::string_view name, std::string_view greeting = "Hello")
{
    std::cout << greeting << ", " << name << "!\\n";
}

int main()
{
    greet("Ada");             // Hello, Ada!
    greet("Ada", "Welcome");  // Welcome, Ada!
    return 0;
}`}
        output={`Hello, Ada!\nWelcome, Ada!`}
      />
      <Callout variant="rule" title="Defaults go last">
        Once a parameter has a default, every parameter after it must have one too
        — otherwise the compiler couldn&rsquo;t tell which argument you meant to
        skip.
      </Callout>
      <KeyTakeaways
        items={[
          "Default arguments let callers omit trailing parameters.",
          "Parameters with defaults must come after all non-default parameters.",
          "They're a clean alternative to writing several overloads.",
        ]}
      />
      <QuizSection>
        {Q(
          "Which parameter arrangement is legal?",
          [
            "void f(int a = 1, int b)",
            "void f(int a, int b = 2)",
            "void f(int a = 1, int b, int c = 3)",
            "None of these",
          ],
          1,
          "Defaults must be trailing, so only f(int a, int b = 2) is valid.",
        )}
      </QuizSection>
    </>
  );
}

function L113() {
  return (
    <>
      <p>
        A <strong>function template</strong> writes a function once for{" "}
        <em>any</em> type. The compiler generates a concrete version for each type
        you actually use.
      </p>
      <CodeBlock
        code={`template <typename T>
T maxValue(T a, T b)
{
    return (a > b) ? a : b;
}

int main()
{
    std::cout << maxValue(3, 7) << '\\n';        // int → 7
    std::cout << maxValue(2.5, 1.5) << '\\n';    // double → 2.5
    std::cout << maxValue('a', 'z') << '\\n';    // char → z
    return 0;
}`}
        output={`7\n2.5\nz`}
      />
      <Callout variant="key" title="Write once, works for all types">
        Templates are how the C++ standard library provides containers and
        algorithms that work with any type. <code>std::vector</code>, coming up in
        Chapter 15, is a class template.
      </Callout>
      <KeyTakeaways
        items={[
          "A function template defines a function for a placeholder type T.",
          "The compiler instantiates a concrete version per type used.",
          "Templates power the generic containers and algorithms of the standard library.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does the compiler do with a function template when you call it with an int?",
          [
            "Nothing special",
            "Generates a concrete int version of the function",
            "Converts the int to a string",
            "Reports an error",
          ],
          1,
          "It instantiates the template for int, producing a real function for that type.",
        )}
      </QuizSection>
    </>
  );
}

/* ====== Chapter 12 — References & pointers ====== */

function L121() {
  return (
    <>
      <p>
        An <strong>lvalue reference</strong> is an alias — a second name for an
        existing variable. Changes through the reference affect the original.
      </p>
      <CodeBlock
        code={`int x { 5 };
int& ref { x };   // ref is another name for x

ref = 10;
std::cout << x << '\\n';   // 10 — changing ref changed x`}
        output={`10`}
      />
      <Callout variant="rule" title="References must be initialized and can't rebind">
        A reference must be bound to something when created, and it stays bound to
        that same object for its whole life. There&rsquo;s no such thing as a
        &ldquo;null&rdquo; reference or reseating one to another variable.
      </Callout>
      <KeyTakeaways
        items={[
          "An lvalue reference (int&) is an alias for an existing variable.",
          "Modifying through the reference modifies the original.",
          "References must be initialized and cannot be rebound.",
        ]}
      />
      <QuizSection>
        {Q(
          "If int& ref = x; and you write ref = 10;, what is x?",
          ["5", "10", "Undefined", "0"],
          1,
          "ref is an alias for x, so assigning through it sets x to 10.",
        )}
      </QuizSection>
    </>
  );
}

function L122() {
  return (
    <>
      <p>
        Passing a large object by value copies it, which can be slow.{" "}
        <strong>Pass by reference</strong> hands the function the original instead
        of a copy — and <strong>pass by const reference</strong> does so while
        promising not to modify it.
      </p>
      <CodeBlock
        code={`void addPoint(int& score)      { score += 1; } // can modify caller's variable
void print(const std::string& s) { std::cout << s; } // reads, no copy, no changes

int main()
{
    int score { 0 };
    addPoint(score);
    std::cout << score << '\\n';   // 1 — the original changed
    return 0;
}`}
        output={`1`}
      />
      <Callout variant="best-practice" title="Pass big read-only objects by const reference">
        For types that are expensive to copy (strings, vectors, large structs),
        take a <code>const T&amp;</code> parameter when you only need to read. It
        avoids the copy and guarantees the function won&rsquo;t alter your data.
      </Callout>
      <KeyTakeaways
        items={[
          "Pass by reference lets a function modify the caller's variable and avoids copies.",
          "Pass by const reference avoids the copy while forbidding modification.",
          "Use const& for large read-only parameters like strings and vectors.",
        ]}
      />
      <QuizSection>
        {Q(
          "Why pass a large std::string as const std::string&?",
          [
            "To make a copy for safety",
            "To avoid copying while guaranteeing the function won't modify it",
            "To allow the function to change it",
            "It's required for all strings",
          ],
          1,
          "const reference gives read access to the original with no copy and no risk of modification.",
        )}
      </QuizSection>
    </>
  );
}

function L123() {
  return (
    <>
      <p>
        Every object in memory lives at a numbered location called its{" "}
        <strong>address</strong>. A <strong>pointer</strong> is a variable that
        stores such an address — it &ldquo;points at&rdquo; another object. Pointers
        are the foundation of dynamic memory, data structures, and much of what
        makes C++ powerful (and, admittedly, tricky).
      </p>

      <h2 id="address-of">The address-of operator &amp;</h2>
      <p>
        The <code>&amp;</code> operator, placed before a variable, yields its
        address:
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    int x { 5 };
    std::cout << x  << '\\n';  // 5     — the value
    std::cout << &x << '\\n';  // 0x... — the address in memory
    return 0;
}`}
      />

      <h2 id="declaring">Declaring a pointer and dereferencing it</h2>
      <p>
        A pointer&rsquo;s type is written with a <code>*</code>:{" "}
        <code>int*</code> is &ldquo;pointer to int.&rdquo; Once it holds an address,
        the <strong>dereference</strong> operator <code>*</code> gets to the value
        at that address:
      </p>
      <CodeBlock
        code={`int x { 5 };
int* ptr { &x };   // ptr holds the address of x

std::cout << ptr  << '\\n';  // prints an address, e.g. 0x7ffe...
std::cout << *ptr << '\\n';  // dereference → prints 5

*ptr = 10;                   // write through the pointer
std::cout << x << '\\n';      // 10 — x was changed via ptr`}
        output={`0x7ffe...\n5\n10`}
      />
      <Callout variant="key" title="Two operators that are inverses">
        <code>&amp;x</code> means &ldquo;the address <em>of</em> x,&rdquo; and{" "}
        <code>*ptr</code> means &ldquo;the value <em>at</em> ptr.&rdquo; The{" "}
        <code>*</code> in a <em>declaration</em> (<code>int* ptr</code>) marks the
        type as a pointer; the <code>*</code> in an <em>expression</em> (
        <code>*ptr</code>) dereferences it. Same symbol, two roles.
      </Callout>

      <h2 id="pointers-vs-references">Pointers vs. references</h2>
      <p>
        A pointer is like a reference (Lesson 12.1), but with important differences:
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Reference</th>
            <th>Pointer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Must be initialized</td>
            <td>Yes</td>
            <td>No (but should be)</td>
          </tr>
          <tr>
            <td>Can be reseated</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Can be null</td>
            <td>No</td>
            <td>Yes (nullptr)</td>
          </tr>
          <tr>
            <td>Needs dereferencing</td>
            <td>No (automatic)</td>
            <td>Yes (with *)</td>
          </tr>
        </tbody>
      </table>
      <Callout variant="best-practice" title="Prefer references when you can">
        Because references are safer (always valid, no explicit dereferencing),
        reach for them first. Use pointers when you need the extra capabilities:
        the ability to be null, to be reseated, or to do dynamic allocation.
      </Callout>

      <KeyTakeaways
        items={[
          "Every object has a memory address; a pointer is a variable that stores one.",
          "&x yields the address of x; the type int* means 'pointer to int'.",
          "Dereferencing with *ptr reads or writes the pointed-to object.",
          "* means 'pointer' in a declaration and 'dereference' in an expression.",
          "Pointers can be null and reseated; prefer references unless you need those abilities.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does the * operator do in the expression *ptr?",
          [
            "Takes the address of ptr",
            "Dereferences ptr to access the value it points to",
            "Multiplies ptr",
            "Deletes ptr",
          ],
          1,
          "Dereferencing with * yields the object the pointer refers to.",
        )}
        {Q(
          "What does &x evaluate to?",
          ["The value of x", "The address of x", "A reference to x", "Twice x"],
          1,
          "The address-of operator & yields the memory address where x is stored.",
        )}
        {Q(
          "Which is true of pointers but not references?",
          [
            "They can be reseated and can be null",
            "They alias another object",
            "They are always valid",
            "They never need dereferencing",
          ],
          0,
          "Pointers can point to nothing (nullptr) and be repointed; references can't.",
        )}
      </QuizSection>
    </>
  );
}

function L124() {
  return (
    <>
      <p>
        A <strong>null pointer</strong> points to nothing. Use the{" "}
        <code>nullptr</code> keyword to represent &ldquo;no address yet,&rdquo; and
        always check before dereferencing.
      </p>
      <CodeBlock
        code={`int* ptr { nullptr };   // points to nothing

if (ptr != nullptr)
    std::cout << *ptr;  // safe: only dereference if non-null
else
    std::cout << "no target\\n";`}
        output={`no target`}
      />
      <Callout variant="rule" title="Never dereference a null (or dangling) pointer">
        Dereferencing <code>nullptr</code> is undefined behavior and usually
        crashes. Guard every dereference of a pointer that might be null with a
        check.
      </Callout>
      <KeyTakeaways
        items={[
          "nullptr represents a pointer that points to nothing.",
          "Always check a pointer against nullptr before dereferencing it.",
          "Dereferencing a null pointer is undefined behavior.",
        ]}
      />
      <QuizSection>
        {Q(
          "What should you do before dereferencing a pointer that might be null?",
          [
            "Nothing, it's always safe",
            "Check that it isn't nullptr",
            "Multiply it by zero",
            "Convert it to int",
          ],
          1,
          "Guard the dereference with a null check to avoid undefined behavior.",
        )}
      </QuizSection>
    </>
  );
}

/* ====== Chapter 13 — Enums & structs ====== */

function L131() {
  return (
    <>
      <p>
        An <strong>enumeration</strong> defines a type whose values are a set of
        named constants — clearer and safer than remembering that{" "}
        <code>0</code> means red and <code>1</code> means green.
      </p>
      <CodeBlock
        code={`enum class Color { red, green, blue };  // scoped enum

Color c { Color::green };

if (c == Color::green)
    std::cout << "go\\n";`}
        output={`go`}
      />
      <Callout variant="best-practice" title="Prefer scoped enums (enum class)">
        <code>enum class</code> keeps its names in its own scope
        (<code>Color::red</code>) and won&rsquo;t implicitly convert to{" "}
        <code>int</code>, preventing a category of bugs that plagued the older
        unscoped <code>enum</code>.
      </Callout>
      <KeyTakeaways
        items={[
          "An enumeration gives names to a fixed set of related values.",
          "Scoped enums (enum class) namespace their values and avoid implicit int conversion.",
          "They make code self-documenting compared to bare magic numbers.",
        ]}
      />
      <QuizSection>
        {Q(
          "Why prefer enum class over a plain enum?",
          [
            "It's shorter to write",
            "Its values are scoped and don't implicitly convert to int",
            "It runs faster",
            "It allows more values",
          ],
          1,
          "Scoped enums prevent name leakage and accidental int conversions.",
        )}
      </QuizSection>
    </>
  );
}

function L132() {
  return (
    <>
      <p>
        A <strong>struct</strong> bundles several related variables into a single
        type. Instead of juggling separate <code>x</code>, <code>y</code>, and{" "}
        <code>z</code> variables, you group them.
      </p>
      <CodeBlock
        code={`struct Point
{
    double x {};
    double y {};
    double z {};
};

int main()
{
    Point p { 1.0, 2.0, 3.0 };   // aggregate initialization
    std::cout << p.x << ", " << p.y << ", " << p.z << '\\n';
    return 0;
}`}
        output={`1, 2, 3`}
      />
      <Callout variant="key" title="Members access with the dot operator">
        Reach a struct&rsquo;s members with <code>.</code> — <code>p.x</code>,{" "}
        <code>p.y</code>. Each <code>Point</code> variable carries its own copy of
        every member.
      </Callout>
      <KeyTakeaways
        items={[
          "A struct groups related variables (members) into one type.",
          "Access members with the dot operator: p.x.",
          "Braces initialize members in order (aggregate initialization).",
        ]}
      />
      <QuizSection>
        {Q(
          "How do you access member y of a Point variable p?",
          ["y", "p->y", "p.y", "Point::y"],
          2,
          "For a struct value, use the dot operator: p.y.",
        )}
      </QuizSection>
    </>
  );
}

function L133() {
  return (
    <>
      <p>
        Structs can be initialized member-by-member, given default member values,
        and passed to functions — usually by <code>const</code> reference to avoid
        copying.
      </p>
      <CodeBlock
        code={`struct Rectangle
{
    double width { 1.0 };   // default member initializers
    double height { 1.0 };
};

double area(const Rectangle& r)   // pass by const reference
{
    return r.width * r.height;
}

int main()
{
    Rectangle r { 4.0, 3.0 };
    std::cout << area(r) << '\\n';   // 12
    Rectangle unit {};              // uses defaults → 1 x 1
    std::cout << area(unit) << '\\n';// 1
    return 0;
}`}
        output={`12\n1`}
      />
      <Callout variant="best-practice" title="Give members sensible defaults">
        Default member initializers mean a value-initialized struct
        (<code>Rectangle{`{}`}</code>) starts in a valid state instead of holding
        garbage.
      </Callout>
      <KeyTakeaways
        items={[
          "Struct members can have default initializers for safe defaults.",
          "Pass structs by const reference to functions to avoid copies.",
          "Value-initializing a struct ({}) uses those member defaults.",
        ]}
      />
      <QuizSection>
        {Q(
          "Why pass a struct as const Rectangle& to a function?",
          [
            "To copy it safely",
            "To avoid copying and prevent modification",
            "To allow modification",
            "It's the only legal way",
          ],
          1,
          "const reference reads the struct without copying it or risking changes.",
        )}
      </QuizSection>
    </>
  );
}

/* ====== Chapter 14 — Intro to classes ====== */

function L141() {
  return (
    <>
      <p>
        <strong>Object-oriented programming</strong> models programs as objects
        that bundle <em>data</em> with the <em>behavior</em> that operates on it. A{" "}
        <strong>class</strong> is the blueprint; an object is an instance of it.
        Classes extend the struct idea by adding functions and access control.
      </p>
      <CodeBlock
        code={`class Circle
{
public:
    double radius {};

    double area() const           // a member function
    {
        return 3.14159 * radius * radius;
    }
};

int main()
{
    Circle c { 2.0 };
    std::cout << c.area() << '\\n';  // 12.5664
    return 0;
}`}
        output={`12.5664`}
      />
      <Callout variant="key" title="Data + behavior together">
        The big shift from structs is that a class keeps its data and the functions
        that work on that data in one place, so an object &ldquo;knows how to do
        things to itself.&rdquo;
      </Callout>
      <KeyTakeaways
        items={[
          "OOP bundles data with the behavior that acts on it.",
          "A class is a blueprint; an object is an instance of that class.",
          "Classes extend structs with member functions and access control.",
        ]}
      />
      <QuizSection>
        {Q(
          "What is an object in C++?",
          [
            "A blueprint for a class",
            "An instance created from a class",
            "A kind of function",
            "A namespace",
          ],
          1,
          "The class is the blueprint; an object is a concrete instance of it.",
        )}
      </QuizSection>
    </>
  );
}

function L142() {
  return (
    <>
      <p>
        A <strong>member function</strong> is a function that belongs to a class
        and operates on that object&rsquo;s data. It can access the object&rsquo;s
        members directly by name.
      </p>
      <CodeBlock
        code={`class Counter
{
public:
    int value {};

    void increment() { ++value; }      // modifies this object
    int  get() const  { return value; } // const: promises not to modify
};

int main()
{
    Counter c {};
    c.increment();
    c.increment();
    std::cout << c.get() << '\\n';  // 2
    return 0;
}`}
        output={`2`}
      />
      <Callout variant="best-practice" title="Mark read-only members const">
        If a member function doesn&rsquo;t change the object, add <code>const</code>{" "}
        after its parameter list. This lets it be called on const objects and
        documents that it&rsquo;s safe.
      </Callout>
      <KeyTakeaways
        items={[
          "Member functions belong to a class and access its members directly.",
          "Call them on an object with the dot operator: c.increment().",
          "Mark non-modifying member functions const.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does marking a member function `const` mean?",
          [
            "It can't be called",
            "It promises not to modify the object",
            "It returns a constant",
            "It runs at compile time",
          ],
          1,
          "A const member function guarantees it won't change the object's data.",
        )}
      </QuizSection>
    </>
  );
}

function L143() {
  return (
    <>
      <p>
        <strong>Access specifiers</strong> — <code>public</code> and{" "}
        <code>private</code> — control what code outside the class can touch.
        Hiding internal data behind a public interface is called{" "}
        <strong>encapsulation</strong>.
      </p>
      <CodeBlock
        code={`class BankAccount
{
private:
    double balance {};   // hidden from outside code

public:
    void deposit(double amount)
    {
        if (amount > 0) balance += amount;   // controlled access
    }
    double getBalance() const { return balance; }
};`}
      />
      <Callout variant="key" title="Why hide data?">
        Making <code>balance</code> private means no outside code can set it to a
        nonsensical value directly. All changes go through <code>deposit</code>,
        which can validate them. The class stays in a valid state by design.
      </Callout>
      <KeyTakeaways
        items={[
          "public members are accessible anywhere; private members only within the class.",
          "Encapsulation hides data behind a controlled public interface.",
          "This keeps objects in valid states and lets you change internals safely.",
        ]}
      />
      <QuizSection>
        {Q(
          "What's the main benefit of making data members private?",
          [
            "The program runs faster",
            "Outside code can't put the object into an invalid state directly",
            "It uses less memory",
            "It allows more members",
          ],
          1,
          "Private data can only be changed through validated member functions, protecting the object's invariants.",
        )}
      </QuizSection>
    </>
  );
}

function L144() {
  return (
    <>
      <p>
        A <strong>constructor</strong> is a special member function that runs when
        an object is created. Its job is to put the object into a valid initial
        state.
      </p>
      <CodeBlock
        code={`class Point
{
private:
    double m_x {};
    double m_y {};

public:
    Point(double x, double y)   // constructor
        : m_x { x }, m_y { y }  // member initializer list
    {
    }

    void print() const { std::cout << m_x << ", " << m_y << '\\n'; }
};

int main()
{
    Point p { 3.0, 4.0 };   // constructor runs here
    p.print();              // 3, 4
    return 0;
}`}
        output={`3, 4`}
      />
      <Callout variant="best-practice" title="Initialize members in the initializer list">
        Prefer the <code>: member{`{value}`}</code> initializer list over assigning
        inside the constructor body. It initializes members directly (more
        efficient), and it&rsquo;s <em>required</em> for members that are{" "}
        <code>const</code> or references, which can&rsquo;t be assigned after
        creation.
      </Callout>

      <h2 id="default">Default constructors</h2>
      <p>
        A <strong>default constructor</strong> takes no arguments and runs when you
        create an object without initializers. If you write no constructors at all,
        the compiler generates a simple one for you; once you write any constructor,
        you may need to provide the default explicitly if you still want it.
      </p>
      <CodeBlock
        code={`class Counter
{
private:
    int m_count {};

public:
    Counter() = default;                 // explicitly keep the default ctor
    Counter(int start) : m_count { start } {}

    int get() const { return m_count; }
};

int main()
{
    Counter a {};      // uses the default constructor → 0
    Counter b { 10 };  // uses the int constructor → 10
    return 0;
}`}
      />

      <h2 id="overloading">Multiple constructors</h2>
      <p>
        A class can have several constructors that differ in their parameters —
        the same overloading rules from Chapter 11 apply. The compiler picks the one
        matching the arguments you supply, letting objects be created in different
        ways.
      </p>

      <Callout variant="warning" title="Members initialize in declaration order">
        Members are always initialized in the order they&rsquo;re{" "}
        <em>declared</em> in the class, not the order they appear in the initializer
        list. To avoid confusing bugs, write the initializer list in the same order
        as the member declarations.
      </Callout>

      <KeyTakeaways
        items={[
          "A constructor runs automatically when an object is created, ensuring a valid initial state.",
          "Use the member initializer list to set members directly — required for const and reference members.",
          "A default constructor takes no arguments; the compiler supplies one only if you declare no constructors.",
          "A class can have multiple constructors that differ in parameters (overloading).",
          "Members initialize in declaration order — keep the initializer list in that order too.",
        ]}
      />
      <QuizSection>
        {Q(
          "When does a constructor run?",
          [
            "When the program ends",
            "When an object of the class is created",
            "Only when explicitly called like a function",
            "Never automatically",
          ],
          1,
          "The constructor is invoked automatically at object creation.",
        )}
        {Q(
          "What is a default constructor?",
          [
            "One that returns a default value",
            "A constructor that takes no arguments",
            "The last constructor in the class",
            "A constructor marked const",
          ],
          1,
          "A default constructor is callable with no arguments, e.g. MyType obj{};.",
        )}
        {Q(
          "In what order are a class's members initialized?",
          [
            "The order in the initializer list",
            "The order they're declared in the class",
            "Alphabetical order",
            "Reverse declaration order",
          ],
          1,
          "Members always initialize in declaration order, regardless of initializer-list order.",
        )}
      </QuizSection>
    </>
  );
}

/* ====== Chapter 15 — std::vector ====== */

function L151() {
  return (
    <>
      <p>
        A <strong>container</strong> holds a collection of values.{" "}
        <code>std::vector</code> (from <code>&lt;vector&gt;</code>) is the
        workhorse: a resizable sequence that grows and shrinks as needed and
        manages its own memory.
      </p>
      <CodeBlock
        code={`#include <iostream>
#include <vector>

int main()
{
    std::vector<int> scores { 90, 85, 100 };  // three ints
    std::cout << "First: " << scores[0] << '\\n';  // 90
    std::cout << "Count: " << scores.size() << '\\n'; // 3
    return 0;
}`}
        output={`First: 90\nCount: 3`}
      />
      <Callout variant="key" title="A vector knows its own size">
        Unlike a raw C-style array, a vector tracks how many elements it holds
        (<code>.size()</code>) and can change that count at run time. This makes it
        the default choice for lists of values.
      </Callout>
      <KeyTakeaways
        items={[
          "std::vector is a resizable sequence container from <vector>.",
          "std::vector<int> v { ... }; creates and initializes one.",
          "It tracks its own length via .size() and manages memory for you.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does scores.size() return for a vector with 3 elements?",
          ["2", "3", "The first element", "0"],
          1,
          ".size() reports the number of elements — 3 here.",
        )}
      </QuizSection>
    </>
  );
}

function L152() {
  return (
    <>
      <p>
        Access elements by index with <code>[]</code> (starting at 0), and iterate
        cleanly with a <strong>range-based for loop</strong>.
      </p>
      <CodeBlock
        code={`std::vector<int> nums { 10, 20, 30 };

std::cout << nums[1] << '\\n';   // 20 (index 1)

for (int n : nums)              // range-based for: each element in turn
    std::cout << n << ' ';       // 10 20 30`}
        output={`20\n10 20 30`}
      />
      <Callout variant="best-practice" title="Loop with const reference for big elements">
        For vectors of large objects, write <code>for (const auto&amp; item :
        v)</code> to avoid copying each element as you iterate.
      </Callout>
      <Callout variant="warning" title="Indexes start at 0 — mind the bounds">
        A vector of size 3 has valid indexes 0, 1, and 2. Accessing{" "}
        <code>nums[3]</code> is out of bounds and undefined behavior.
      </Callout>
      <KeyTakeaways
        items={[
          "Index elements with [] starting from 0.",
          "Range-based for (for (x : v)) iterates every element cleanly.",
          "Use const auto& in the loop for large element types.",
          "Indexing out of bounds is undefined behavior.",
        ]}
      />
      <QuizSection>
        {Q(
          "For std::vector<int> v { 10, 20, 30 }, what is v[2]?",
          ["10", "20", "30", "Out of bounds"],
          2,
          "Indexing is zero-based, so v[2] is the third element, 30.",
        )}
      </QuizSection>
    </>
  );
}

function L153() {
  return (
    <>
      <p>
        Vectors grow and shrink at run time. <code>push_back</code> appends an
        element; the vector handles the memory automatically.
      </p>
      <CodeBlock
        code={`#include <iostream>
#include <vector>

int main()
{
    std::vector<int> v {};   // empty
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);

    std::cout << "Size: " << v.size() << '\\n';  // 3
    for (int n : v) std::cout << n << ' ';       // 1 2 3
    return 0;
}`}
        output={`Size: 3\n1 2 3`}
      />
      <Callout variant="note" title="How vectors grow">
        When a vector runs out of room, it allocates a larger block and moves its
        elements over. It typically reserves extra capacity so that repeated{" "}
        <code>push_back</code> calls stay efficient on average.
      </Callout>
      <KeyTakeaways
        items={[
          "push_back appends an element and grows the vector as needed.",
          "The vector manages its own memory, reallocating when it runs out of room.",
          "You can start from an empty vector and build it up dynamically.",
        ]}
      />
      <QuizSection>
        {Q(
          "What does v.push_back(3) do?",
          [
            "Removes the last element",
            "Adds 3 to the end of the vector",
            "Sets element 3",
            "Clears the vector",
          ],
          1,
          "push_back appends its argument as a new last element.",
        )}
      </QuizSection>
    </>
  );
}

/* ====== Chapter 16 — Where to go next ====== */

function L161() {
  return (
    <>
      <p>
        You&rsquo;ve covered the core of modern C++: from your first program
        through functions, types, control flow, references and pointers, and your
        own classes and containers. That&rsquo;s a genuine foundation. Here&rsquo;s
        the terrain ahead.
      </p>
      <h2 id="next-topics">Topics that build on these foundations</h2>
      <ul>
        <li>
          <strong>Iterators &amp; algorithms</strong> — <code>std::sort</code>,{" "}
          <code>std::find</code>, and the rest of <code>&lt;algorithm&gt;</code>{" "}
          working over any container.
        </li>
        <li>
          <strong>Dynamic allocation &amp; smart pointers</strong> —{" "}
          <code>new</code>/<code>delete</code>, then <code>std::unique_ptr</code>{" "}
          and <code>std::shared_ptr</code> to manage memory safely.
        </li>
        <li>
          <strong>Move semantics</strong> — how modern C++ avoids needless copies
          for performance.
        </li>
        <li>
          <strong>Inheritance &amp; virtual functions</strong> — building type
          hierarchies and runtime polymorphism.
        </li>
        <li>
          <strong>Class templates</strong> — writing your own generic types.
        </li>
        <li>
          <strong>Exceptions</strong> — a structured way to handle errors across
          call boundaries.
        </li>
        <li>
          <strong>File &amp; stream I/O</strong> — reading and writing files with{" "}
          <code>&lt;fstream&gt;</code>.
        </li>
      </ul>
      <Callout variant="best-practice" title="Keep building things">
        The fastest way to solidify these fundamentals is to write small programs:
        a number-guessing game, a to-do list, a simple calculator. Reading teaches
        the concepts; building makes them yours.
      </Callout>
      <KeyTakeaways
        items={[
          "You've built a real foundation in modern C++ fundamentals.",
          "Next up: iterators/algorithms, smart pointers, move semantics, inheritance, templates, exceptions, and file I/O.",
          "Cement the basics by writing small programs of your own.",
        ]}
      />
      <Callout variant="key" title="Congratulations">
        Finishing the fundamentals is the hardest and most important part of
        learning C++. Everything beyond here is an extension of ideas you now
        understand. Keep going — and keep compiling.
      </Callout>
    </>
  );
}

export const CH3TO16 = {
  // ch3
  "3-1-syntax-and-semantic-errors": L31,
  "3-2-a-strategy-for-debugging": L32,
  "3-3-debugging-tactics": L33,
  "3-4-using-a-debugger": L34,
  // ch4
  "4-1-intro-to-fundamental-types": L41,
  "4-2-void-and-sizes": L42,
  "4-3-signed-integers": L43,
  "4-4-unsigned-integers": L44,
  "4-5-floating-point-numbers": L45,
  "4-6-booleans": L46,
  "4-7-chars": L47,
  "4-8-conditional-operator-and-conversions": L48,
  // ch5
  "5-1-constant-variables": L51,
  "5-2-literals-and-magic-numbers": L52,
  "5-3-constexpr": L53,
  "5-4-intro-to-std-string": L54,
  "5-5-std-string-view": L55,
  // ch6
  "6-1-operator-precedence-and-associativity": L61,
  "6-2-arithmetic-operators": L62,
  "6-3-increment-decrement-and-side-effects": L63,
  "6-4-comparison-and-logical-operators": L64,
  // ch7
  "7-1-local-and-global-scope": L71,
  "7-2-namespaces-revisited": L72,
  "7-3-duration-and-linkage": L73,
  // ch8
  "8-1-if-statements": L81,
  "8-2-switch-statements": L82,
  "8-3-while-and-do-while": L83,
  "8-4-for-loops": L84,
  "8-5-break-continue-and-random": L85,
  // ch9
  "9-1-testing-your-code": L91,
  "9-2-detecting-and-handling-errors": L92,
  "9-3-validating-user-input": L93,
  "9-4-assert-and-static-assert": L94,
  // ch10
  "10-1-implicit-type-conversion": L101,
  "10-2-explicit-conversion-static-cast": L102,
  "10-3-type-aliases-and-auto": L103,
  // ch11
  "11-1-function-overloading": L111,
  "11-2-default-arguments": L112,
  "11-3-function-templates": L113,
  // ch12
  "12-1-lvalue-references": L121,
  "12-2-pass-by-reference": L122,
  "12-3-intro-to-pointers": L123,
  "12-4-null-pointers": L124,
  // ch13
  "13-1-scoped-enumerations": L131,
  "13-2-intro-to-structs": L132,
  "13-3-member-selection-and-init": L133,
  // ch14
  "14-1-intro-to-oop-and-classes": L141,
  "14-2-member-functions": L142,
  "14-3-access-specifiers": L143,
  "14-4-constructors": L144,
  // ch15
  "15-1-intro-to-containers-and-vector": L151,
  "15-2-vector-access-and-loops": L152,
  "15-3-vector-operations": L153,
  // ch16
  "16-1-roadmap-beyond-the-basics": L161,
};
