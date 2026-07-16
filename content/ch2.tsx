import type { ReactNode } from "react";
import {
  CodeBlock,
  Callout,
  Definition,
  KeyTakeaways,
  QuizSection,
  QuizChoice,
  QuizReveal,
} from "./_components";

/* 2.1 */
function L21(): ReactNode {
  return (
    <>
      <p>
        As programs grow, cramming everything into <code>main</code> becomes
        unmanageable. <strong>Functions</strong> let you package a group of
        statements under a name, then run them whenever you like by{" "}
        <strong>calling</strong> that name. This is the primary tool for keeping
        code organized and avoiding repetition.
      </p>

      <Definition term="function">
        A reusable sequence of statements designed to do a particular job. You
        define it once and call it as many times as needed.
      </Definition>

      <h2 id="defining">Defining a function</h2>
      <p>A function definition has four parts:</p>
      <CodeBlock
        code={`// return-type  name  ( parameters )
void sayHello()          // 'void' means it returns nothing
{
    std::cout << "Hello!\\n";   // the body
}`}
      />

      <h2 id="calling">Calling a function</h2>
      <p>
        A <strong>function call</strong> tells the program to jump into that
        function, run its statements, then return to where it left off:
      </p>
      <CodeBlock
        code={`#include <iostream>

void sayHello()
{
    std::cout << "Hello!\\n";
}

int main()
{
    sayHello();   // call 1
    sayHello();   // call 2 — reuse without repeating code
    return 0;
}`}
        output={`Hello!\nHello!`}
        highlight={[11, 12]}
      />
      <p>
        When <code>main</code> reaches <code>sayHello();</code>, control transfers
        into <code>sayHello</code>. After its last statement, control returns to{" "}
        <code>main</code> and continues with the next line.
      </p>

      <Callout variant="key" title="Functions can call functions">
        <code>main</code> calls <code>sayHello</code>, and <code>sayHello</code>{" "}
        could call others in turn. Programs are trees of function calls rooted at{" "}
        <code>main</code>. The one rule: a function can&rsquo;t define another
        function inside itself.
      </Callout>

      <Callout variant="best-practice" title="One function, one job">
        A well-designed function does a single, nameable task. If you struggle to
        name a function concisely, it may be trying to do too much — a hint to
        split it.
      </Callout>

      <KeyTakeaways
        items={[
          "Functions package statements under a name so you can reuse them.",
          "Calling a function runs its body, then returns to the caller.",
          "'void' as a return type means the function returns no value.",
          "Prefer small functions that each do one clearly-named job.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="What happens when a function call finishes?"
          options={[
            "The program ends",
            "Control returns to the point right after the call",
            "main is called again",
            "The function is deleted",
          ]}
          answer={1}
          explanation="Execution resumes at the statement following the call."
        />
        <QuizChoice
          prompt="What does a 'void' return type indicate?"
          options={[
            "The function returns 0",
            "The function returns nothing",
            "The function is empty",
            "The function is private",
          ]}
          answer={1}
          explanation="void means the function does not return a value to its caller."
        />
      </QuizSection>
    </>
  );
}

/* 2.2 */
function L22(): ReactNode {
  return (
    <>
      <p>
        Many functions compute a result that the caller needs. A function sends
        that result back with a <strong>return value</strong>. The function&rsquo;s
        declared return type says what kind of value comes back.
      </p>

      <h2 id="returning">Returning a value</h2>
      <CodeBlock
        code={`#include <iostream>

int getFive()      // returns an int
{
    return 5;      // hand 5 back to the caller
}

int main()
{
    std::cout << getFive() << '\\n';       // prints 5
    std::cout << getFive() + 2 << '\\n';   // prints 7
    return 0;
}`}
        output={`5\n7`}
      />
      <p>
        The call <code>getFive()</code> evaluates to the value it returns, so you
        can use it anywhere a value of that type is expected — printing it, adding
        to it, or storing it in a variable.
      </p>

      <h2 id="main-return">main returns a status code</h2>
      <p>
        You&rsquo;ve been writing <code>return 0;</code> at the end of{" "}
        <code>main</code> all along. That value is the program&rsquo;s{" "}
        <strong>exit status</strong>: <code>0</code> conventionally means
        &ldquo;success,&rdquo; and any nonzero value signals an error to the
        operating system.
      </p>

      <Callout variant="rule" title="Non-void functions must return a value">
        If a function claims to return a type (anything but <code>void</code>),
        every path through it must return an appropriate value. Falling off the
        end without returning is undefined behavior.
      </Callout>

      <Callout variant="tip" title="A quirk you can rely on">
        <code>main</code> is special: if you omit its <code>return</code>{" "}
        statement, C++ implicitly returns <code>0</code>. Every <em>other</em>{" "}
        non-void function still requires an explicit return.
      </Callout>

      <KeyTakeaways
        items={[
          "A return statement sends a value back to the caller.",
          "A function call evaluates to its returned value and can be used inline.",
          "main returns an exit status: 0 for success, nonzero for failure.",
          "Every non-void function must return a value on all paths.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="What does 'return 0;' at the end of main signify?"
          options={[
            "The program failed",
            "The program completed successfully",
            "Nothing — it's optional decoration",
            "main should be called again",
          ]}
          answer={1}
          explanation="An exit status of 0 conventionally reports success to the OS."
        />
        <QuizReveal prompt="Write a function 'square' that takes no parameters isn't possible — but write one named getDouble that returns the double value 3.14.">
          <CodeBlock
            code={`double getPi()
{
    return 3.14;
}`}
          />
        </QuizReveal>
      </QuizSection>
    </>
  );
}

/* 2.3 */
function L23(): ReactNode {
  return (
    <>
      <p>
        Return values let functions send data <em>out</em>. To send data{" "}
        <em>in</em>, we use <strong>parameters</strong> and{" "}
        <strong>arguments</strong>. Together they make functions flexible: the
        same function can operate on different inputs.
      </p>

      <Definition term="parameter">
        A variable declared in the function&rsquo;s definition that receives a
        value when the function is called.
      </Definition>
      <Definition term="argument">
        The actual value you pass in the call, which is copied into the
        corresponding parameter.
      </Definition>

      <h2 id="example">Passing values in</h2>
      <CodeBlock
        code={`#include <iostream>

int add(int a, int b)   // a and b are parameters
{
    return a + b;
}

int main()
{
    std::cout << add(3, 4) << '\\n';   // 3 and 4 are arguments → 7
    int x { 10 };
    std::cout << add(x, 5) << '\\n';   // → 15
    return 0;
}`}
        output={`7\n15`}
      />
      <p>
        When <code>add(3, 4)</code> runs, <code>3</code> is copied into{" "}
        <code>a</code> and <code>4</code> into <code>b</code>. The function works
        with those copies.
      </p>

      <h2 id="pass-by-value">Pass by value makes copies</h2>
      <p>
        Because arguments are <strong>copied</strong> into parameters, changing a
        parameter inside the function does not affect the caller&rsquo;s variable:
      </p>
      <CodeBlock
        code={`void tryToChange(int n)
{
    n = 99;   // changes only the local copy
}

int main()
{
    int value { 5 };
    tryToChange(value);
    std::cout << value << '\\n';   // still 5
    return 0;
}`}
        output={`5`}
      />
      <Callout variant="note" title="We'll revisit this">
        This copying behavior is called <strong>pass by value</strong>. Later,
        with references and pointers, you&rsquo;ll learn how to let a function
        modify the caller&rsquo;s data or avoid copying large objects.
      </Callout>

      <KeyTakeaways
        items={[
          "Parameters are variables in the function; arguments are the values you pass.",
          "Arguments are copied into parameters (pass by value).",
          "Modifying a parameter doesn't change the caller's original variable.",
          "Parameters let one function handle many different inputs.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="In add(3, 4), what are 3 and 4 called?"
          options={["Parameters", "Arguments", "Return values", "Statements"]}
          answer={1}
          explanation="Values passed in a call are arguments; the variables that receive them are parameters."
        />
        <QuizChoice
          prompt="After calling a function that sets its int parameter to 99, what is the caller's variable?"
          options={[
            "99, because parameters share memory",
            "Unchanged, because the argument was copied",
            "Undefined behavior",
            "0",
          ]}
          answer={1}
          explanation="Pass by value copies the argument, so the caller's variable is untouched."
        />
      </QuizSection>
    </>
  );
}

/* 2.4 */
function L24(): ReactNode {
  return (
    <>
      <p>
        Variables don&rsquo;t exist forever. A variable defined inside a function
        — including a parameter — has <strong>local scope</strong> and a limited{" "}
        <strong>lifetime</strong>. Understanding when variables appear and vanish
        prevents a whole class of bugs.
      </p>

      <h2 id="scope">Scope: where a name is visible</h2>
      <Definition term="scope">
        The region of code where an identifier can be used. A local
        variable&rsquo;s scope runs from its definition to the end of the enclosing
        block <code>{`{ }`}</code>.
      </Definition>
      <CodeBlock
        code={`int main()
{
    int x { 5 };   // x's scope begins here

    {
        int y { 10 };            // y is visible only inside these braces
        std::cout << x << y;     // both x and y are in scope
    }                            // y is destroyed here

    std::cout << y;   // ERROR: y is out of scope
    return 0;
}`}
      />

      <h2 id="lifetime">Lifetime: when it exists</h2>
      <p>
        A local variable is <strong>created</strong> when execution reaches its
        definition and <strong>destroyed</strong> when its block ends. Two
        functions can have variables with the same name without interfering,
        because each exists only within its own scope.
      </p>
      <CodeBlock
        code={`void foo()
{
    int count { 0 };   // this 'count' is independent...
}

void bar()
{
    int count { 99 };  // ...of this one
}`}
      />

      <Callout variant="best-practice" title="Define variables close to first use">
        Give each variable the smallest scope that does the job, and define it
        right before you need it. Small scopes mean fewer variables to reason
        about at any moment, and less chance of accidental misuse.
      </Callout>

      <KeyTakeaways
        items={[
          "Local variables are visible only within the block that defines them (scope).",
          "They're created at their definition and destroyed when the block ends (lifetime).",
          "Variables in different functions are independent, even with the same name.",
          "Prefer the smallest scope possible; define variables near first use.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="When is a local variable destroyed?"
          options={[
            "When the program ends",
            "When its enclosing block ends",
            "When it's next assigned",
            "It's never destroyed",
          ]}
          answer={1}
          explanation="A local variable's lifetime ends when execution leaves its block."
        />
        <QuizChoice
          prompt="Can two different functions each have a local variable named 'i'?"
          options={[
            "No, names must be globally unique",
            "Yes — each is local to its own function",
            "Only if they have different types",
            "Only inside loops",
          ]}
          answer={1}
          explanation="Local scope keeps them separate; the names don't collide."
        />
      </QuizSection>
    </>
  );
}

/* 2.5 */
function L25(): ReactNode {
  return (
    <>
      <p>
        The compiler reads your file top to bottom. If <code>main</code> calls a
        function that&rsquo;s defined <em>below</em> it, the compiler hasn&rsquo;t
        seen that function yet and reports an error. A{" "}
        <strong>forward declaration</strong> solves this by telling the compiler
        about the function ahead of time.
      </p>

      <h2 id="problem">The ordering problem</h2>
      <CodeBlock
        code={`int main()
{
    std::cout << add(3, 4);   // ERROR: 'add' not declared yet
    return 0;
}

int add(int a, int b)
{
    return a + b;
}`}
      />

      <h2 id="prototype">Declaring with a function prototype</h2>
      <p>
        A <strong>function prototype</strong> is the function&rsquo;s signature —
        return type, name, and parameter types — followed by a semicolon, with no
        body. Place it before the call:
      </p>
      <CodeBlock
        code={`int add(int a, int b);   // forward declaration (prototype)

int main()
{
    std::cout << add(3, 4);   // OK: compiler knows add's signature
    return 0;
}

int add(int a, int b)        // the definition provides the body
{
    return a + b;
}`}
        output={`7`}
        highlight={[1]}
      />

      <Definition term="declaration vs. definition">
        A <strong>declaration</strong> tells the compiler that something exists
        (its name and type). A <strong>definition</strong> also provides the full
        details (a function&rsquo;s body). Every definition is also a declaration.
      </Definition>

      <Callout variant="key" title="Why this matters">
        Forward declarations are what make <strong>multi-file programs</strong>{" "}
        possible. You declare a function in one place so other code can call it,
        while its definition lives elsewhere. That&rsquo;s the whole idea behind
        header files, coming up next.
      </Callout>

      <KeyTakeaways
        items={[
          "The compiler must see a function's declaration before any call to it.",
          "A forward declaration (prototype) is the signature plus a semicolon, no body.",
          "A declaration says 'this exists'; a definition also provides the body.",
          "Forward declarations are the foundation for splitting code across files.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="What does a function prototype consist of?"
          options={[
            "The full function including its body",
            "The return type, name, and parameter types, ending with a semicolon",
            "Just the function's name",
            "A comment describing the function",
          ]}
          answer={1}
          explanation="A prototype is the signature terminated by a semicolon, with no body."
        />
        <QuizChoice
          prompt="Why use a forward declaration?"
          options={[
            "To make the program run faster",
            "So code can call a function whose definition appears later or in another file",
            "To avoid writing the function body",
            "To hide the function from main",
          ]}
          answer={1}
          explanation="It lets the compiler accept calls before it has seen the definition."
        />
      </QuizSection>
    </>
  );
}

/* 2.6 */
function L26(): ReactNode {
  return (
    <>
      <p>
        Real programs are spread across many source files. Splitting code keeps
        each file focused, speeds up compilation (only changed files rebuild), and
        lets teams work in parallel. Here&rsquo;s how C++ handles it.
      </p>

      <h2 id="two-files">A two-file program</h2>
      <p>
        Put a helper function in its own <code>.cpp</code> file, and call it from{" "}
        <code>main.cpp</code> using a forward declaration:
      </p>
      <CodeBlock
        filename="add.cpp"
        code={`// Definition of add lives here
int add(int a, int b)
{
    return a + b;
}`}
      />
      <CodeBlock
        filename="main.cpp"
        code={`#include <iostream>

int add(int a, int b);   // forward declaration so we can call it

int main()
{
    std::cout << add(3, 4) << '\\n';
    return 0;
}`}
        output={`7`}
      />

      <h2 id="compile-both">Compiling multiple files</h2>
      <p>
        Each <code>.cpp</code> file is compiled independently into an object file,
        then the linker combines them. From the command line you simply list them
        both:
      </p>
      <CodeBlock
        lang="bash"
        filename="terminal"
        lineNumbers={false}
        code={`g++ -std=c++20 main.cpp add.cpp -o program
./program`}
        output={`7`}
      />
      <Callout variant="tip" title="In an IDE, add files to the project">
        Don&rsquo;t just create the file on disk — add it to your{" "}
        <em>project</em> so the IDE compiles and links it. A file that exists but
        isn&rsquo;t part of the project produces &ldquo;unresolved external&rdquo;
        linker errors.
      </Callout>

      <h2 id="linker-errors">Linker errors vs. compiler errors</h2>
      <p>
        If you misspell a function or forget to include its file in the build, the
        code may compile fine (the forward declaration satisfied the compiler) but
        fail at the <strong>link</strong> step, because no definition was found.
        Recognizing which stage failed tells you where to look.
      </p>

      <KeyTakeaways
        items={[
          "Programs can span many .cpp files; each is compiled separately, then linked.",
          "Call a function in another file by forward-declaring it.",
          "Add every source file to your build/project, or the linker can't find definitions.",
          "A missing definition is a linker error, not a compiler error.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="You call a function that's declared but never defined anywhere. What fails?"
          options={[
            "The compiler, with a syntax error",
            "The linker, because no definition exists",
            "Nothing — it returns 0",
            "The preprocessor",
          ]}
          answer={1}
          explanation="The declaration satisfies the compiler, but the linker needs a definition to bind the call to."
        />
        <QuizChoice
          prompt="Why split a program into multiple files?"
          options={[
            "It's required by C++",
            "Focus, faster incremental builds, and parallel teamwork",
            "It makes the executable smaller",
            "To avoid using functions",
          ]}
          answer={1}
          explanation="Separation of concerns and only rebuilding what changed are the big wins."
        />
      </QuizSection>
    </>
  );
}

/* 2.7 */
function L27(): ReactNode {
  return (
    <>
      <p>
        Writing a forward declaration by hand in every file that calls a function
        is tedious and error-prone. <strong>Header files</strong> collect those
        declarations in one place so any file can pull them in with a single{" "}
        <code>#include</code>.
      </p>

      <h2 id="anatomy">A header and its source</h2>
      <p>
        By convention, <code>add.h</code> holds the declaration and{" "}
        <code>add.cpp</code> holds the definition:
      </p>
      <CodeBlock
        filename="add.h"
        code={`#ifndef ADD_H
#define ADD_H

int add(int a, int b);   // declaration only

#endif`}
      />
      <CodeBlock
        filename="add.cpp"
        code={`#include "add.h"   // good practice: include your own header

int add(int a, int b)
{
    return a + b;
}`}
      />
      <CodeBlock
        filename="main.cpp"
        code={`#include <iostream>
#include "add.h"     // brings in the declaration of add

int main()
{
    std::cout << add(3, 4) << '\\n';
    return 0;
}`}
        output={`7`}
      />

      <h2 id="guards">Header guards</h2>
      <p>
        The <code>#ifndef</code> / <code>#define</code> / <code>#endif</code> trio
        is a <strong>header guard</strong>. It ensures the header&rsquo;s contents
        are included only once per file, even if it gets pulled in through several
        paths — which would otherwise cause &ldquo;redefinition&rdquo; errors.
      </p>
      <Callout variant="tip" title="#pragma once">
        Most compilers accept <code>#pragma once</code> at the top of a header as
        a shorter alternative to the three-line guard. Both are widely used; pick
        one and be consistent.
      </Callout>

      <h2 id="quotes-vs-brackets">Quotes vs. angle brackets</h2>
      <p>
        Use <code>&quot;quotes&quot;</code> for <em>your own</em> headers and{" "}
        <code>&lt;angle brackets&gt;</code> for standard library and system
        headers. The difference is where the compiler looks for the file first.
      </p>

      <Callout variant="best-practice" title="Headers declare, sources define">
        Keep <em>declarations</em> in headers and <em>definitions</em> in{" "}
        <code>.cpp</code> files. Putting function definitions in a header that&rsquo;s
        included by multiple files leads to duplicate-definition linker errors.
      </Callout>

      <KeyTakeaways
        items={[
          "Header files (.h) gather declarations so many files can #include them.",
          "Pair a header (declarations) with a .cpp (definitions).",
          "Header guards (#ifndef/#define/#endif or #pragma once) prevent double inclusion.",
          "Use \"quotes\" for your headers, <angle brackets> for library headers.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="What problem do header guards prevent?"
          options={[
            "Slow compilation",
            "A header's contents being included more than once in the same file",
            "Missing semicolons",
            "Undefined behavior at runtime",
          ]}
          answer={1}
          explanation="Guards make inclusion idempotent, avoiding redefinition errors."
        />
        <QuizChoice
          prompt="Which include style is correct for your own header 'math.h'?"
          options={[
            "#include <math.h>",
            '#include "math.h"',
            "#include math.h",
            "import math.h",
          ]}
          answer={1}
          explanation="Use quotes for project headers; angle brackets are for library/system headers."
        />
      </QuizSection>
    </>
  );
}

/* 2.8 */
function L28(): ReactNode {
  return (
    <>
      <p>
        As programs and libraries combine, two functions might end up with the
        same name — a <strong>naming collision</strong>. C++ solves this with{" "}
        <strong>namespaces</strong>. This lesson also demystifies the{" "}
        <code>std::</code> prefix and what the preprocessor really does.
      </p>

      <h2 id="collisions">Naming collisions</h2>
      <p>
        If two files each define a function <code>print()</code> and both end up
        in the same program, the linker sees two definitions of the same name and
        errors out. Namespaces prevent this by giving names a home.
      </p>

      <h2 id="namespaces">Namespaces and the std namespace</h2>
      <Definition term="namespace">
        A named region that groups identifiers, so the same name can exist in
        different namespaces without conflict. You access a name inside one with
        the scope resolution operator <code>::</code>.
      </Definition>
      <p>
        The entire standard library lives in the <code>std</code> namespace. That
        is why we write <code>std::cout</code> and <code>std::cin</code> —{" "}
        &ldquo;the <code>cout</code> that belongs to <code>std</code>.&rdquo;
      </p>
      <CodeBlock
        code={`namespace math {
    int add(int a, int b) { return a + b; }
}

namespace physics {
    int add(int a, int b) { return a + b + 1; } // different 'add'
}

int main()
{
    std::cout << math::add(3, 4);      // 7
    std::cout << physics::add(3, 4);   // 8
    return 0;
}`}
        output={`78`}
      />

      <Callout variant="warning" title="Avoid 'using namespace std;'">
        You may see <code>using namespace std;</code> in tutorials. It dumps every
        standard name into your scope, re-introducing exactly the collision
        problem namespaces exist to prevent. Prefer typing <code>std::</code>{" "}
        explicitly.
      </Callout>

      <h2 id="preprocessor">What the preprocessor does</h2>
      <p>
        Before the compiler sees your code, the <strong>preprocessor</strong>{" "}
        performs text substitutions driven by directives that start with{" "}
        <code>#</code>:
      </p>
      <ul>
        <li>
          <code>#include</code> replaces the line with the entire contents of the
          named file.
        </li>
        <li>
          <code>#define</code> creates a macro (a text replacement).
        </li>
        <li>
          <code>#ifndef</code>, <code>#ifdef</code>, <code>#endif</code>{" "}
          conditionally include or skip sections — the mechanism behind header
          guards.
        </li>
      </ul>
      <Callout variant="key" title="It's just text, before compilation">
        The preprocessor doesn&rsquo;t understand C++ — it manipulates text. Its
        output (your code with all includes pasted in and macros expanded) is what
        the compiler actually compiles.
      </Callout>

      <KeyTakeaways
        items={[
          "Namespaces prevent naming collisions by grouping identifiers.",
          "The standard library lives in namespace std, hence std::cout.",
          "Prefer explicit std:: over 'using namespace std;'.",
          "The preprocessor does text substitution (#include, #define, guards) before compilation.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="Why do we write std::cout instead of just cout?"
          options={[
            "std makes it print faster",
            "cout lives in the std namespace; :: accesses it there",
            "It's required punctuation for all functions",
            "std is the file name",
          ]}
          answer={1}
          explanation="cout is defined in namespace std, so we qualify it with std::."
        />
        <QuizChoice
          prompt="What does #include do?"
          options={[
            "Runs another program",
            "Pastes the contents of the named file in place, before compilation",
            "Declares a namespace",
            "Links object files",
          ]}
          answer={1}
          explanation="It's a preprocessor directive that textually inserts the file's contents."
        />
      </QuizSection>
    </>
  );
}

export const CH2 = {
  "2-1-introduction-to-functions": L21,
  "2-2-return-values": L22,
  "2-3-parameters-and-arguments": L23,
  "2-4-local-scope": L24,
  "2-5-forward-declarations": L25,
  "2-6-multiple-files": L26,
  "2-7-header-files": L27,
  "2-8-namespaces-and-preprocessor": L28,
};
