import type { ReactNode } from "react";
import {
  CodeBlock,
  Callout,
  Definition,
  Compare,
  KeyTakeaways,
  QuizSection,
  QuizChoice,
  QuizReveal,
} from "./_components";

/* 1.1 ------------------------------------------------------------------ */
function Lesson11(): ReactNode {
  return (
    <>
      <p>
        A computer program is a sequence of instructions telling the computer
        what to do. In C++, the most common kind of instruction is called a{" "}
        <strong>statement</strong>. Statements are the smallest complete units of
        work, and most of them end with a semicolon.
      </p>

      <Definition term="statement">
        An instruction that causes the program to perform some action. Most C++
        statements end with a semicolon (<code>;</code>).
      </Definition>

      <h2 id="anatomy">The anatomy of Hello World</h2>
      <p>Let&rsquo;s revisit our first program and name each part:</p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    std::cout << "Hello, world!";
    return 0;
}`}
        output={`Hello, world!`}
      />

      <ul>
        <li>
          <strong>Line 1 — a preprocessor directive.</strong>{" "}
          <code>#include &lt;iostream&gt;</code> tells the preprocessor to pull in
          the contents of the <code>iostream</code> header, which gives us access
          to <code>std::cout</code>. Directives start with <code>#</code> and are
          not statements — note there&rsquo;s no semicolon.
        </li>
        <li>
          <strong>Line 3 — the main function.</strong> Every C++ program must have
          exactly one function named <code>main</code>. It&rsquo;s where execution
          begins.
        </li>
        <li>
          <strong>Lines 4 and 7 — braces.</strong> The <code>{`{`}</code> and{" "}
          <code>{`}`}</code> mark the beginning and end of the function&rsquo;s
          body.
        </li>
        <li>
          <strong>Line 5 — an output statement.</strong> This sends text to the
          console.
        </li>
        <li>
          <strong>Line 6 — a return statement.</strong> <code>return 0;</code>{" "}
          ends <code>main</code> and reports success to the operating system.
        </li>
      </ul>

      <h2 id="functions">Functions and the main function</h2>
      <p>
        A <strong>function</strong> is a reusable, named group of statements.
        Programs are built by combining functions. C++ requires that one of them
        be named <code>main</code>: when your program runs, the statements inside{" "}
        <code>main</code> execute from top to bottom, and when it returns, the
        program ends.
      </p>

      <Callout variant="key" title="Statements run in order">
        Within a function, statements execute sequentially — one after another,
        top to bottom. Understanding this &ldquo;flow of control&rdquo; is the
        foundation for everything else.
      </Callout>

      <h2 id="syntax-errors">Syntax and the compiler</h2>
      <p>
        The rules governing how C++ code must be written are its{" "}
        <strong>syntax</strong>. When you break a rule — a missing semicolon, an
        unmatched brace — the compiler reports a <strong>syntax error</strong> and
        refuses to build until you fix it. These errors are frustrating at first
        but they&rsquo;re actually helpful: the compiler is catching mistakes
        before your program ever runs.
      </p>

      <CodeBlock
        code={`int main()
{
    std::cout << "Oops"   // <-- missing semicolon
    return 0;
}`}
      />
      <p>
        A compiler will reject the code above, usually with a message about an
        expected <code>;</code>. Because the error is often detected on the
        <em> next</em> line, always check the line above the one the compiler
        points to.
      </p>

      <KeyTakeaways
        items={[
          "Programs are made of statements; most statements end with a semicolon.",
          "Functions are named groups of statements; every program needs exactly one main.",
          "Execution begins in main and runs statements top to bottom.",
          "#include is a preprocessor directive (no semicolon); it brings in library features.",
          "Breaking C++'s syntax rules produces a compiler error you must fix before running.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="Which function must every C++ program contain?"
          options={["start", "run", "main", "program"]}
          answer={2}
          explanation="Execution always begins in the function named main."
        />
        <QuizChoice
          prompt="Why does #include <iostream> NOT end with a semicolon?"
          options={[
            "It's a mistake in most programs",
            "It's a preprocessor directive, not a statement",
            "Semicolons are optional in C++",
            "Because it's on the first line",
          ]}
          answer={1}
          explanation="Preprocessor directives have their own syntax and are not terminated with semicolons."
        />
      </QuizSection>
    </>
  );
}

/* 1.2 ------------------------------------------------------------------ */
function Lesson12(): ReactNode {
  return (
    <>
      <p>
        A <strong>comment</strong> is a note you write in your source code that
        the compiler ignores entirely. Comments exist purely for humans — to
        explain what code does and, more importantly, <em>why</em> it does it.
      </p>

      <h2 id="two-kinds">Two kinds of comments</h2>
      <p>
        C++ gives you a single-line comment and a multi-line comment:
      </p>
      <CodeBlock
        code={`// This is a single-line comment. It runs to the end of the line.

std::cout << "Hello"; // Comments can also follow code on the same line.

/* This is a multi-line comment.
   Everything between the markers is ignored,
   no matter how many lines it spans. */`}
      />

      <Callout variant="warning" title="Multi-line comments don't nest">
        You can&rsquo;t put one <code>/* */</code> comment inside another — the
        first <code>*/</code> ends the whole thing. For commenting out big blocks,
        prefer many <code>//</code> lines (your editor can toggle them for you).
      </Callout>

      <h2 id="what-vs-why">Comment on the "why," not the "what"</h2>
      <p>
        A common beginner habit is to narrate what each line does. Good code
        usually shows <em>what</em> it&rsquo;s doing clearly enough on its own;
        what it can&rsquo;t show is the reasoning behind it. Aim your comments at
        intent.
      </p>
      <Compare
        good={
          <CodeBlock
            code={`// Convert to cents to avoid floating-point rounding on money
int totalCents = dollars * 100 + cents;`}
            lineNumbers={false}
          />
        }
        bad={
          <CodeBlock
            code={`// Multiply dollars by 100 and add cents
int totalCents = dollars * 100 + cents;`}
            lineNumbers={false}
          />
        }
      />

      <h2 id="uses">Good uses for comments</h2>
      <ul>
        <li>
          At the top of a file or function: a sentence on what it&rsquo;s for.
        </li>
        <li>Explaining a non-obvious decision, trade-off, or gotcha.</li>
        <li>
          Temporarily disabling code while debugging (&ldquo;commenting out&rdquo;).
        </li>
      </ul>

      <Callout variant="best-practice" title="Keep comments truthful">
        An out-of-date comment is worse than none, because it misleads. When you
        change code, update the comments around it in the same breath.
      </Callout>

      <KeyTakeaways
        items={[
          "Comments are ignored by the compiler and written for human readers.",
          "// comments a single line; /* ... */ comments a block (and cannot nest).",
          "Prefer explaining why the code exists over restating what it does.",
          "Keep comments in sync with the code — a stale comment misleads.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="What happens to comments when the program is compiled?"
          options={[
            "They're printed to the console",
            "They're ignored by the compiler",
            "They slow the program down",
            "They're converted to documentation",
          ]}
          answer={1}
          explanation="Comments exist only in the source; the compiler strips them out."
        />
        <QuizChoice
          prompt="Which comment is more useful?"
          options={[
            "// set x to 5",
            "// use 5 retries to match the server's rate-limit window",
          ]}
          answer={1}
          explanation="The second explains the reasoning; the first just restates the code."
        />
      </QuizSection>
    </>
  );
}

/* 1.3 ------------------------------------------------------------------ */
function Lesson13(): ReactNode {
  return (
    <>
      <p>
        Programs work with data, and that data has to live somewhere while the
        program runs. That somewhere is <strong>memory (RAM)</strong>. To use
        memory in a structured way, C++ gives us objects and variables.
      </p>

      <Definition term="object">
        A region of memory that holds a value. In C++, most objects have a{" "}
        <strong>type</strong> that determines what kind of value they store and
        how much memory they use.
      </Definition>
      <Definition term="variable">
        A named object. The name lets you refer to that piece of memory in your
        code without caring about its exact address.
      </Definition>

      <h2 id="defining">Defining a variable</h2>
      <p>
        To create a variable, you write a <strong>definition</strong>: its type,
        then its name.
      </p>
      <CodeBlock
        code={`int x; // define an integer variable named x`}
        lineNumbers={false}
      />
      <p>
        When this statement runs, the program sets aside a piece of memory big
        enough to hold an <code>int</code> and lets you call it <code>x</code>.
        The type <code>int</code> — short for &ldquo;integer&rdquo; — holds whole
        numbers like <code>-3</code>, <code>0</code>, or <code>42</code>.
      </p>

      <h2 id="multiple">Defining several at once</h2>
      <p>You can define multiple variables of the same type together:</p>
      <CodeBlock
        code={`int a;        // one at a time is clearest
int b;

int c, d;     // legal, but defining several on one line is discouraged`}
      />
      <Callout variant="best-practice" title="One variable per line">
        Defining a single variable per statement is easier to read, easier to
        comment, and avoids a classic mistake with pointers you&rsquo;ll meet
        later. Prefer it.
      </Callout>

      <h2 id="using">Using a variable</h2>
      <p>
        Once defined, you refer to a variable by its name to read or change its
        value. We&rsquo;ll cover giving it a value in the next lesson, but
        here&rsquo;s a preview of the whole idea:
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    int width;      // define
    width = 5;      // assign a value
    std::cout << width; // use the value
    return 0;
}`}
        output={`5`}
      />

      <KeyTakeaways
        items={[
          "Data lives in memory while a program runs.",
          "An object is a region of memory holding a value; a variable is a named object.",
          "Define a variable by writing its type followed by its name, e.g. int x;.",
          "Prefer defining one variable per line for clarity.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="What is a variable?"
          options={[
            "A function that returns a value",
            "A named region of memory that holds a value",
            "A keyword in C++",
            "A comment describing data",
          ]}
          answer={1}
          explanation="A variable is simply a name attached to an object (a piece of memory holding a value)."
        />
        <QuizChoice
          prompt="Which type would you use to store the whole number 42?"
          options={["char", "bool", "int", "void"]}
          answer={2}
          explanation="int stores whole numbers. You'll meet the others in Chapter 4."
        />
      </QuizSection>
    </>
  );
}

/* 1.4 ------------------------------------------------------------------ */
function Lesson14(): ReactNode {
  return (
    <>
      <p>
        Defining a variable creates storage; now we need to put a value in it.
        There are two distinct ways to do that, and the difference matters:{" "}
        <strong>assignment</strong> and <strong>initialization</strong>.
      </p>

      <h2 id="assignment">Assignment</h2>
      <p>
        <strong>Copy assignment</strong> uses the <code>=</code> operator to give
        an already-existing variable a new value:
      </p>
      <CodeBlock
        code={`int width;   // definition (no value yet)
width = 5;   // assignment: copy the value 5 into width
width = 7;   // assignment again: 7 replaces 5`}
      />
      <p>
        Each assignment overwrites whatever was there before. Assignment happens
        <em> after</em> a variable already exists.
      </p>

      <h2 id="initialization">Initialization</h2>
      <p>
        <strong>Initialization</strong> gives a variable a value at the very
        moment it&rsquo;s created — definition and first value in one step. Modern
        C++ offers several forms:
      </p>
      <CodeBlock
        code={`int a = 5;     // copy initialization (C-style)
int b( 5 );    // direct initialization
int c { 5 };   // direct-list (brace) initialization  <-- preferred
int d {};      // value initialization: d is set to 0`}
      />

      <Callout variant="best-practice" title="Prefer brace initialization">
        Use <strong>brace initialization</strong> (<code>int c{`{5}`}</code>)
        whenever you can. It works everywhere, and it&rsquo;s the only form that
        refuses to compile when a value would be silently truncated — for example{" "}
        <code>int x{`{4.5}`}</code> is an error, which is exactly what you want.
      </Callout>

      <Compare
        good={
          <CodeBlock
            code={`int speed { 5 };
int count {};   // zero`}
            lineNumbers={false}
          />
        }
        bad={
          <CodeBlock
            code={`int speed = 5;
int count;  // uninitialized!`}
            lineNumbers={false}
          />
        }
      />

      <h2 id="value-init">Value initialization and zeroing</h2>
      <p>
        Empty braces <code>{`{}`}</code> perform <strong>value
        initialization</strong>, which for fundamental types means &ldquo;set to
        zero.&rdquo; When you don&rsquo;t have a meaningful starting value yet,
        this is a safe default:
      </p>
      <CodeBlock
        code={`int total {}; // total is 0, guaranteed`}
        lineNumbers={false}
      />

      <Callout variant="rule" title="Always initialize your variables">
        Prefer initializing a variable when you define it. As you&rsquo;ll see in
        the next lesson, using a variable that was never given a value is a real
        bug with unpredictable consequences.
      </Callout>

      <KeyTakeaways
        items={[
          "Assignment (=) gives a value to a variable that already exists, and can be repeated.",
          "Initialization gives a value at the moment of creation.",
          "Prefer brace initialization: int x{5}; — it catches narrowing conversions.",
          "Empty braces value-initialize (zero for fundamental types).",
          "Always initialize variables when you define them.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="What is the value of x after: int x{};"
          options={["Undefined / garbage", "0", "It won't compile", "1"]}
          answer={1}
          explanation="Empty braces value-initialize; for an int that means 0."
        />
        <QuizChoice
          prompt="Why is brace initialization preferred over copy initialization?"
          options={[
            "It's shorter to type",
            "It rejects narrowing conversions that would silently lose data",
            "It runs faster at runtime",
            "It's the only form that compiles",
          ]}
          answer={1}
          explanation="Brace init makes value-losing conversions (like 4.5 → int) a compile error."
        />
        <QuizReveal prompt="Write a line that defines an int named score and initializes it to 100 using the preferred style.">
          <CodeBlock code={`int score { 100 };`} lineNumbers={false} />
        </QuizReveal>
      </QuizSection>
    </>
  );
}

/* 1.5 ------------------------------------------------------------------ */
function Lesson15(): ReactNode {
  return (
    <>
      <p>
        The <code>iostream</code> library handles input and output. Its two
        workhorses are <code>std::cout</code> for sending output to the console
        and <code>std::cin</code> for reading input from the keyboard.
      </p>

      <h2 id="cout">Output with std::cout</h2>
      <p>
        <code>std::cout</code> (&ldquo;character output&rdquo;) is used with the{" "}
        <strong>insertion operator</strong> <code>&lt;&lt;</code> to print text
        and values:
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    std::cout << "The answer is ";
    std::cout << 42;
    return 0;
}`}
        output={`The answer is 42`}
      />
      <p>You can chain multiple insertions into one statement:</p>
      <CodeBlock
        code={`int age { 30 };
std::cout << "You are " << age << " years old";`}
        output={`You are 30 years old`}
        lineNumbers={false}
      />

      <h2 id="newlines">Newlines: \n vs std::endl</h2>
      <p>
        To move to a new line, insert either <code>&apos;\n&apos;</code> or{" "}
        <code>std::endl</code>. They look similar but differ: <code>std::endl</code>{" "}
        also forces the output buffer to flush, which is slightly slower.
      </p>
      <CodeBlock
        code={`std::cout << "Line one\\n";          // preferred
std::cout << "Line two" << '\\n';    // also fine
std::cout << "Line three" << std::endl; // works, but flushes every time`}
        output={`Line one\nLine two\nLine three`}
      />
      <Callout variant="best-practice" title="Prefer \n over std::endl">
        Use <code>&apos;\n&apos;</code> for line breaks. Reserve{" "}
        <code>std::endl</code> for the rare cases where you truly need to flush
        the buffer immediately.
      </Callout>

      <h2 id="cin">Input with std::cin</h2>
      <p>
        <code>std::cin</code> reads keyboard input using the{" "}
        <strong>extraction operator</strong> <code>&gt;&gt;</code>, storing what
        the user types into a variable:
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    std::cout << "Enter a number: ";
    int x {};        // a place to store the input
    std::cin >> x;   // read a number into x
    std::cout << "You entered " << x << '\\n';
    return 0;
}`}
        output={`Enter a number: 8\nYou entered 8`}
        highlight={[7]}
      />

      <Callout variant="tip" title="Remember the direction of the arrows">
        The operators point the way data flows. With <code>cout &lt;&lt; x</code>{" "}
        data goes <em>into</em> the output stream; with <code>cin &gt;&gt; x</code>{" "}
        data comes <em>out</em> of the input stream and into <code>x</code>.
      </Callout>

      <KeyTakeaways
        items={[
          "std::cout << ... prints to the console; insertions can be chained.",
          "std::cin >> variable reads keyboard input into a variable.",
          "Use '\\n' for newlines; prefer it over std::endl, which also flushes.",
          "The << and >> arrows point in the direction the data flows.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="Which operator is used to read input from std::cin?"
          options={["<<", ">>", "==", "&&"]}
          answer={1}
          explanation="The extraction operator >> pulls data from the input stream into a variable."
        />
        <QuizChoice
          prompt="Why is '\\n' generally preferred over std::endl?"
          options={[
            "std::endl doesn't produce a newline",
            "'\\n' avoids the unnecessary buffer flush that std::endl forces",
            "std::endl only works on Windows",
            "There is no difference",
          ]}
          answer={1}
          explanation="Both start a new line, but std::endl also flushes the buffer, which is usually needless overhead."
        />
        <QuizReveal prompt="Write a program that asks the user for two numbers and prints their sum.">
          <CodeBlock
            code={`#include <iostream>

int main()
{
    std::cout << "Enter two numbers: ";
    int a {};
    int b {};
    std::cin >> a >> b;   // reads two values in a row
    std::cout << "Sum: " << a + b << '\\n';
    return 0;
}`}
          />
        </QuizReveal>
      </QuizSection>
    </>
  );
}

/* 1.6 ------------------------------------------------------------------ */
function Lesson16(): ReactNode {
  return (
    <>
      <p>
        In the last lessons we kept insisting: always initialize your variables.
        Here&rsquo;s why. Skipping initialization leads to one of C++&rsquo;s most
        notorious sources of subtle, hard-to-reproduce bugs.
      </p>

      <h2 id="uninitialized">Uninitialized variables</h2>
      <p>
        Unlike many languages, C++ does <em>not</em> automatically zero your
        variables. If you define one without a value, it takes on whatever bits
        happened to already be in that memory — effectively a random value.
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    int x;            // uninitialized — contains garbage
    std::cout << x;   // prints an unpredictable value
    return 0;
}`}
      />
      <p>
        This program might print <code>0</code>, might print{" "}
        <code>-858993460</code>, might print something different every run, and
        might even crash. That unpredictability is the danger.
      </p>

      <h2 id="ub">Undefined behavior</h2>
      <Definition term="undefined behavior (UB)">
        The result of executing code whose behavior the C++ standard does not
        define. Anything can happen — correct-looking output, wrong output,
        crashes, or bugs that appear only sometimes.
      </Definition>
      <p>
        Reading an uninitialized variable is undefined behavior. The insidious
        part is that UB doesn&rsquo;t always <em>look</em> broken. Code might work
        perfectly on your machine and fail on someone else&rsquo;s, or work today
        and break after an unrelated change. That&rsquo;s what makes it so costly.
      </p>

      <Callout variant="rule" title="The fix is simple: initialize">
        This entire category of bug disappears if you initialize every variable
        when you define it. <code>int x{`{}`};</code> gives you a guaranteed{" "}
        <code>0</code> instead of garbage.
      </Callout>
      <Compare
        good={<CodeBlock code={`int count {};   // 0`} lineNumbers={false} />}
        bad={<CodeBlock code={`int count;      // garbage → UB`} lineNumbers={false} />}
      />

      <Callout variant="tip" title="Let your tools help">
        Turn on compiler warnings (<code>-Wall</code>). Most compilers will warn
        &ldquo;variable used uninitialized,&rdquo; catching the mistake before it
        ever runs.
      </Callout>

      <KeyTakeaways
        items={[
          "C++ does not auto-initialize variables — an uninitialized variable holds garbage.",
          "Reading an uninitialized variable is undefined behavior (UB).",
          "UB is dangerous because it may appear to work, then fail unpredictably later.",
          "Always initialize; enable compiler warnings to catch omissions.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="What value does an uninitialized int hold in C++?"
          options={[
            "Always 0",
            "Whatever happened to be in that memory (garbage)",
            "It's a compile error",
            "The largest possible int",
          ]}
          answer={1}
          explanation="C++ leaves it uninitialized, so it contains indeterminate 'garbage' bits."
        />
        <QuizChoice
          prompt="Why is undefined behavior especially dangerous?"
          options={[
            "It always crashes immediately, wasting time",
            "It may appear to work correctly, hiding the bug until later",
            "It's only a problem in very large programs",
            "The compiler always rejects it",
          ]}
          answer={1}
          explanation="UB can produce plausible results, so the bug can lurk unnoticed and surface unpredictably."
        />
      </QuizSection>
    </>
  );
}

/* 1.7 ------------------------------------------------------------------ */
function Lesson17(): ReactNode {
  return (
    <>
      <p>
        Names you invent — for variables, functions, and more — are called{" "}
        <strong>identifiers</strong>. A small set of words is reserved by the
        language and can&rsquo;t be used as identifiers; these are{" "}
        <strong>keywords</strong>.
      </p>

      <h2 id="keywords">Keywords</h2>
      <p>
        C++ reserves around 90 keywords — words like <code>int</code>,{" "}
        <code>return</code>, <code>if</code>, <code>for</code>, <code>class</code>
        , <code>const</code>, and <code>true</code>. You&rsquo;ll learn them
        naturally as you go. The only rule to remember now: you can&rsquo;t name
        your own variable after one of them.
      </p>

      <h2 id="rules">The rules for naming</h2>
      <p>An identifier:</p>
      <ul>
        <li>
          may contain letters, digits, and underscores (<code>_</code>);
        </li>
        <li>may not start with a digit;</li>
        <li>may not be a keyword;</li>
        <li>
          is <strong>case-sensitive</strong> — <code>value</code> and{" "}
          <code>Value</code> are different names.
        </li>
      </ul>
      <CodeBlock
        code={`int score;      // ok
int player2;    // ok
int _temp;      // ok, but leading underscores are conventionally reserved
int 2fast;      // error: can't start with a digit
int return;     // error: 'return' is a keyword`}
      />

      <h2 id="conventions">Conventions: writing good names</h2>
      <p>
        The rules say what&rsquo;s <em>legal</em>; conventions say what&rsquo;s{" "}
        <em>readable</em>. Good names are one of the cheapest ways to make code
        maintainable.
      </p>
      <ul>
        <li>
          Start variable names with a lowercase letter:{" "}
          <code>totalScore</code>, not <code>TotalScore</code>.
        </li>
        <li>
          Use <code>camelCase</code> or <code>snake_case</code> consistently — pick
          one style and stick to it.
        </li>
        <li>
          Make names descriptive in proportion to their scope. A loop counter can
          be <code>i</code>; a value used across a whole function deserves a full
          name like <code>customerCount</code>.
        </li>
        <li>Avoid abbreviations that aren&rsquo;t obvious.</li>
      </ul>

      <Compare
        good={
          <CodeBlock
            code={`int numStudents { 25 };
double averageGrade { 88.5 };`}
            lineNumbers={false}
          />
        }
        bad={
          <CodeBlock
            code={`int n { 25 };
double ag { 88.5 };`}
            lineNumbers={false}
          />
        }
      />

      <Callout variant="best-practice" title="Name for the reader">
        Code is read far more often than it&rsquo;s written. A name that states
        the variable&rsquo;s purpose saves everyone — including future you — from
        having to reverse-engineer it.
      </Callout>

      <KeyTakeaways
        items={[
          "Identifiers are the names you give variables, functions, etc.",
          "Keywords are reserved and can't be used as identifiers.",
          "Names may use letters, digits, and underscores, can't start with a digit, and are case-sensitive.",
          "Prefer descriptive names in a consistent style (camelCase or snake_case).",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="Which of these is an INVALID identifier?"
          options={["totalCount", "_value", "3dPoint", "playerScore2"]}
          answer={2}
          explanation="Identifiers can't begin with a digit, so 3dPoint is illegal."
        />
        <QuizChoice
          prompt="Are 'count' and 'Count' the same identifier?"
          options={[
            "Yes, C++ ignores capitalization",
            "No, identifiers are case-sensitive",
            "Only inside main",
            "Only for keywords",
          ]}
          answer={1}
          explanation="C++ identifiers are case-sensitive, so those are two different names."
        />
      </QuizSection>
    </>
  );
}

/* 1.8 ------------------------------------------------------------------ */
function Lesson18(): ReactNode {
  return (
    <>
      <p>
        <strong>Whitespace</strong> — spaces, tabs, and newlines — is mostly
        ignored by the C++ compiler. That freedom means formatting is up to you,
        and consistent formatting is what separates readable code from a wall of
        symbols.
      </p>

      <h2 id="ignored">Where whitespace doesn't matter</h2>
      <p>
        The compiler treats these three as identical, because the amount and kind
        of whitespace between tokens generally doesn&rsquo;t change meaning:
      </p>
      <CodeBlock
        code={`int x{5};

int   x   {   5   };

int
x
{ 5 };`}
      />
      <p>
        Just because you <em>can</em> write the second and third versions
        doesn&rsquo;t mean you should — but it shows the compiler&rsquo;s
        flexibility.
      </p>

      <h2 id="matters">Where whitespace does matter</h2>
      <ul>
        <li>
          Inside string literals: <code>&quot;a b&quot;</code> and{" "}
          <code>&quot;a  b&quot;</code> are different strings.
        </li>
        <li>
          Some tokens need at least one separator: <code>int x</code> can&rsquo;t
          be written <code>intx</code>.
        </li>
      </ul>

      <h2 id="style">Formatting for humans</h2>
      <p>
        Use whitespace deliberately to reveal structure. The two most impactful
        habits:
      </p>
      <ul>
        <li>
          <strong>Indent the body</strong> of every function, loop, and
          conditional (commonly 4 spaces per level).
        </li>
        <li>
          <strong>Use blank lines</strong> to separate logical groups of
          statements, like paragraphs in prose.
        </li>
      </ul>
      <Compare
        good={
          <CodeBlock
            code={`int main()
{
    int width { 5 };
    int height { 3 };

    int area { width * height };
    std::cout << area << '\\n';

    return 0;
}`}
          />
        }
        bad={
          <CodeBlock
            code={`int main(){
int width{5};int height{3};int area{width*height};
std::cout<<area<<'\\n';return 0;}`}
          />
        }
      />

      <Callout variant="tip" title="Let the tools format for you">
        Most IDEs auto-indent as you type and can reformat a whole file on a
        keystroke (often <code>Ctrl/Cmd+Shift+F</code>). Tools like clang-format
        enforce a consistent style automatically so you never argue about it.
      </Callout>

      <Callout variant="best-practice" title="Consistency beats any single rule">
        Whether you put the opening brace on its own line or at the end of the
        previous one matters far less than doing it the same way everywhere. Pick
        a style and apply it uniformly.
      </Callout>

      <KeyTakeaways
        items={[
          "The compiler ignores most whitespace, so formatting is for human readers.",
          "Whitespace still matters inside strings and between certain tokens.",
          "Indent bodies and use blank lines to group related statements.",
          "Let your editor auto-format, and above all be consistent.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="Does adding extra spaces between int and x in 'int   x;' change the meaning?"
          options={[
            "Yes, it defines a different variable",
            "No — the compiler ignores the extra whitespace",
            "It causes a syntax error",
            "Only inside a function",
          ]}
          answer={1}
          explanation="Extra whitespace between tokens is ignored; the definition is unchanged."
        />
        <QuizChoice
          prompt="In which place does whitespace actually change program behavior?"
          options={[
            "Between statements",
            "Inside a string literal like \"a b\"",
            "Around operators",
            "At the start of a line",
          ]}
          answer={1}
          explanation="Characters inside a string literal are significant, so spacing there is part of the value."
        />
      </QuizSection>
    </>
  );
}

export const CH1 = {
  "1-1-statements-and-program-structure": Lesson11,
  "1-2-comments": Lesson12,
  "1-3-objects-and-variables": Lesson13,
  "1-4-assignment-and-initialization": Lesson14,
  "1-5-iostream-cout-cin-endl": Lesson15,
  "1-6-uninitialized-variables-and-ub": Lesson16,
  "1-7-keywords-and-identifiers": Lesson17,
  "1-8-whitespace-and-formatting": Lesson18,
};
