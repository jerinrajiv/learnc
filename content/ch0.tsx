import type { ReactNode } from "react";
import {
  CodeBlock,
  Callout,
  Definition,
  KeyTakeaways,
  QuizSection,
  QuizChoice,
} from "./_components";

/* 0.1 ------------------------------------------------------------------ */
function Lesson01(): ReactNode {
  return (
    <>
      <p>
        C++ is a general-purpose programming language: a precise way of writing
        instructions that a computer can carry out. It was created by Bjarne
        Stroustrup in the early 1980s as an extension of the older C language.
        His goal was to keep C&rsquo;s speed and low-level control while adding
        higher-level features that make large programs easier to organize — most
        notably <strong>classes</strong>, which is where the &ldquo;++&rdquo;
        (C&rsquo;s increment operator) in the name comes from.
      </p>

      <h2 id="why-cpp">Why learn C++?</h2>
      <p>
        Decades later, C++ is still one of the most widely used languages in the
        world, and for good reason. It sits close to the hardware, so programs
        written in it tend to be extremely fast and memory-efficient, yet it also
        offers powerful abstractions for building large, maintainable systems.
        That combination is why it powers software where performance genuinely
        matters:
      </p>
      <ul>
        <li>Operating systems, device drivers, and embedded firmware</li>
        <li>Game engines such as Unreal Engine, and most AAA game titles</li>
        <li>Web browsers, databases, and high-frequency trading systems</li>
        <li>
          Scientific computing, machine-learning libraries, and 3D graphics
        </li>
        <li>
          Desktop applications and creative tools like Photoshop and Blender
        </li>
      </ul>

      <Callout variant="key" title="Learning C++ makes you a better programmer">
        Because C++ exposes what the machine is really doing — memory, copies,
        addresses — the mental model you build here transfers to almost every
        other language. Concepts that stay hidden in higher-level languages are
        front and center in C++.
      </Callout>

      <h2 id="philosophy">The C++ philosophy</h2>
      <p>
        C++ is guided by a couple of enduring principles. The first is{" "}
        <em>trust the programmer</em>: the language lets you do nearly anything,
        even things that are dangerous, rather than getting in your way. The
        second is <em>you don&rsquo;t pay for what you don&rsquo;t use</em> —
        features are designed so that unused capabilities cost nothing at run
        time.
      </p>
      <p>
        This power comes with responsibility. C++ will happily let you write code
        that compiles but does something undefined. A large part of this course
        is about learning the modern habits and tools that keep you on the safe
        path.
      </p>

      <h2 id="standards">A living language</h2>
      <p>
        C++ is standardized by an international committee, and a new version is
        published roughly every three years: C++11, C++14, C++17, C++20, and
        C++23 each added significant features. When people say{" "}
        <strong>&ldquo;modern C++,&rdquo;</strong> they mean the style that grew
        out of C++11 and later — safer, clearer, and less error-prone than the
        C-with-classes code of the 1990s. This course teaches modern C++ from the
        start.
      </p>

      <KeyTakeaways
        items={[
          "C++ is a fast, general-purpose language built on top of C by Bjarne Stroustrup.",
          "It powers performance-critical software: operating systems, games, browsers, and more.",
          "Its philosophy is to trust the programmer and add zero-overhead abstractions.",
          "“Modern C++” (C++11 onward) is safer and clearer — and it's what you'll learn here.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="What does the '++' in C++ refer to?"
          options={[
            "It means the language is twice as fast as C",
            "It's C's increment operator, hinting that C++ is 'C, incremented'",
            "It stands for two extra features added to C",
            "Nothing in particular — it's just a name",
          ]}
          answer={1}
          explanation="++ is C's increment operator. The name playfully suggests C++ is the next step up from C."
        />
        <QuizChoice
          prompt="Which statement best describes C++'s design philosophy?"
          options={[
            "Prevent the programmer from ever making mistakes",
            "Hide the hardware completely for simplicity",
            "Trust the programmer, and don't charge run-time cost for unused features",
            "Optimize only for small scripts",
          ]}
          answer={2}
          explanation="C++ favors control and zero-overhead abstractions over guardrails, which is powerful but demands good habits."
        />
      </QuizSection>
    </>
  );
}

/* 0.2 ------------------------------------------------------------------ */
function Lesson02(): ReactNode {
  return (
    <>
      <p>
        Before you write C++, it helps to understand what a program actually is
        and how the code you type turns into something the computer can run.
      </p>

      <h2 id="machine-code">Computers only understand machine code</h2>
      <p>
        At the lowest level, a CPU can only execute <strong>machine code</strong>{" "}
        — sequences of binary instructions (1s and 0s) that are specific to that
        processor&rsquo;s architecture. Each instruction is tiny: load a number
        from memory, add two numbers, jump to another instruction. Writing
        machine code by hand is impractical and error-prone.
      </p>

      <Definition term="machine code">
        The set of binary instructions a particular CPU can execute directly. It
        is fast for the machine but nearly impossible for humans to read or
        write.
      </Definition>

      <h2 id="high-level">High-level languages</h2>
      <p>
        To make programming humane, we use <strong>high-level languages</strong>{" "}
        like C++, which read much closer to English and math. A single line of
        C++ might correspond to dozens of machine instructions. But since the CPU
        can&rsquo;t run C++ directly, something has to translate it into machine
        code. That job belongs to a <strong>compiler</strong>.
      </p>

      <h2 id="compiled-vs-interpreted">Compiled vs. interpreted</h2>
      <p>
        There are two broad ways to run a high-level language:
      </p>
      <ul>
        <li>
          <strong>Compiled languages</strong> (like C++) translate your entire
          program into a standalone machine-code executable ahead of time. You
          compile once, then run the fast result as many times as you like.
        </li>
        <li>
          <strong>Interpreted languages</strong> (like Python or JavaScript) are
          translated line-by-line each time they run, by another program called
          an interpreter. This is more flexible but generally slower.
        </li>
      </ul>
      <p>
        Because C++ is compiled to native machine code, its programs are typically
        much faster and don&rsquo;t require the language to be installed on the
        user&rsquo;s machine to run.
      </p>

      <Callout variant="note" title="Portability">
        C++ source code is portable — the same code can be compiled on Windows,
        macOS, or Linux. The resulting <em>executable</em>, however, is specific
        to one platform. You recompile for each target rather than shipping one
        binary everywhere.
      </Callout>

      <h2 id="pipeline">From source to running program</h2>
      <p>
        Turning C++ into a runnable program takes a few steps, which we&rsquo;ll
        explore in detail later:
      </p>
      <ol>
        <li>
          You write <strong>source code</strong> in one or more text files
          (ending in <code>.cpp</code>).
        </li>
        <li>
          The <strong>preprocessor</strong> handles directives like{" "}
          <code>#include</code>, pulling in other files.
        </li>
        <li>
          The <strong>compiler</strong> translates each source file into an
          object file of machine code.
        </li>
        <li>
          The <strong>linker</strong> stitches the object files (and libraries)
          together into a single executable.
        </li>
      </ol>

      <KeyTakeaways
        items={[
          "CPUs execute only machine code — binary instructions specific to the hardware.",
          "High-level languages like C++ are readable by humans and must be translated for the machine.",
          "C++ is compiled ahead of time into a fast, standalone executable.",
          "The build pipeline is: source → preprocessor → compiler → linker → executable.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="Why is a compiled C++ program typically faster than an interpreted one?"
          options={[
            "Because C++ code is shorter",
            "Because it's translated to machine code once, ahead of time, instead of line-by-line at run time",
            "Because compilers remove all the bugs",
            "Because it skips the CPU entirely",
          ]}
          answer={1}
          explanation="Compilation produces native machine code up front, so the CPU runs the optimized result directly."
        />
        <QuizChoice
          prompt="Which tool combines multiple object files into a single executable?"
          options={["The preprocessor", "The compiler", "The linker", "The interpreter"]}
          answer={2}
          explanation="The linker resolves references between object files and libraries and produces the final executable."
        />
      </QuizSection>
    </>
  );
}

/* 0.3 ------------------------------------------------------------------ */
function Lesson03(): ReactNode {
  return (
    <>
      <p>
        To follow along you need two things: a <strong>compiler</strong> to turn
        your code into a program, and ideally an{" "}
        <strong>IDE (Integrated Development Environment)</strong> that bundles an
        editor, compiler, and debugger into one convenient application.
      </p>

      <h2 id="what-is-an-ide">What an IDE gives you</h2>
      <p>
        You <em>can</em> write C++ in any text editor and compile from the command
        line, but an IDE makes the whole loop smoother by combining:
      </p>
      <ul>
        <li>A code editor with syntax highlighting and auto-completion</li>
        <li>A compiler and one-click build/run</li>
        <li>A debugger for stepping through code</li>
        <li>Error messages linked directly to the offending line</li>
      </ul>

      <h2 id="choices">Recommended options</h2>
      <p>Any of these are excellent and free:</p>
      <ul>
        <li>
          <strong>Visual Studio Community</strong> (Windows) — a full-featured
          IDE with an outstanding debugger.
        </li>
        <li>
          <strong>Visual Studio Code</strong> (all platforms) — a lightweight
          editor; add the C/C++ extension and a compiler like g++ or clang.
        </li>
        <li>
          <strong>Xcode</strong> (macOS) or <strong>Code::Blocks</strong>{" "}
          (Windows/Linux) are solid alternatives.
        </li>
        <li>
          For a zero-install start, an online compiler like Compiler Explorer or
          Wandbox lets you run C++ in the browser.
        </li>
      </ul>

      <Callout variant="best-practice" title="Use a modern language standard">
        In your IDE&rsquo;s project settings, set the C++ language standard to{" "}
        <strong>C++20 or C++23</strong> (or at least C++17). Many examples in this
        course use features that older defaults won&rsquo;t recognize.
      </Callout>

      <h2 id="the-loop">The edit–compile–run loop</h2>
      <p>
        Nearly all your time developing will be spent cycling through this loop:
      </p>
      <ol>
        <li>
          <strong>Edit</strong> — write or change your source code.
        </li>
        <li>
          <strong>Compile</strong> — the compiler checks your syntax and builds
          the program. If there are errors, it tells you where; go back and fix
          them.
        </li>
        <li>
          <strong>Run</strong> — execute the program and observe the result.
        </li>
      </ol>
      <p>
        When the output isn&rsquo;t what you expected, you loop back to editing.
        Getting comfortable and <em>fast</em> at this cycle is one of the biggest
        early wins in learning to program.
      </p>

      <Callout variant="warning" title="Compile warnings are your friend">
        Enable your compiler&rsquo;s warnings (e.g. <code>-Wall -Wextra</code> on
        g++/clang) and treat them seriously. Warnings frequently point at real
        bugs the compiler noticed but didn&rsquo;t consider fatal.
      </Callout>

      <KeyTakeaways
        items={[
          "You need a compiler; an IDE bundles the editor, compiler, and debugger together.",
          "Good free choices include Visual Studio, VS Code, Xcode, and Code::Blocks.",
          "Set your language standard to C++17 or newer — C++20/23 is ideal.",
          "Programming is a fast loop of edit → compile → run; enable compiler warnings.",
        ]}
      />
    </>
  );
}

/* 0.4 ------------------------------------------------------------------ */
function Lesson04(): ReactNode {
  return (
    <>
      <p>
        Time to run some real C++. The traditional first program simply prints a
        greeting to the screen. Here it is in full:
      </p>

      <CodeBlock
        code={`#include <iostream>

int main()
{
    std::cout << "Hello, world!\\n";
    return 0;
}`}
        output={`Hello, world!`}
      />

      <p>
        Don&rsquo;t worry about understanding every symbol yet — we&rsquo;ll
        dissect all of it in Chapter 1. For now, here&rsquo;s the gist of each
        line:
      </p>
      <ul>
        <li>
          <code>#include &lt;iostream&gt;</code> pulls in the part of the standard
          library that handles input and output.
        </li>
        <li>
          <code>int main()</code> declares the <strong>main function</strong> —
          the entry point where every C++ program begins.
        </li>
        <li>
          <code>std::cout &lt;&lt; &quot;Hello, world!\n&quot;;</code> sends the
          text to the console. The <code>\n</code> at the end moves to a new
          line.
        </li>
        <li>
          <code>return 0;</code> reports to the operating system that the program
          finished successfully.
        </li>
      </ul>

      <h2 id="build-and-run">Building and running it</h2>
      <p>To turn this source code into a running program:</p>
      <ol>
        <li>
          Create a new <strong>console project</strong> in your IDE (not a GUI or
          empty project).
        </li>
        <li>
          Replace the generated contents of the main source file with the code
          above.
        </li>
        <li>
          Build and run — in most IDEs this is a single button or a shortcut like{" "}
          <code>F5</code>.
        </li>
      </ol>
      <p>
        If you&rsquo;re compiling from the command line with g++ or clang instead,
        it looks like this:
      </p>
      <CodeBlock
        lang="bash"
        filename="terminal"
        lineNumbers={false}
        code={`g++ -std=c++20 -Wall main.cpp -o hello
./hello`}
        output={`Hello, world!`}
      />

      <Callout variant="tip" title="If the console window flashes and closes">
        When you run a console program by double-clicking it (or in some IDEs),
        the window may close instantly after it finishes. Run it from within your
        IDE, or from an already-open terminal, so you can see the output.
      </Callout>

      <h2 id="experiment">Make it yours</h2>
      <p>
        The best way to learn is to change things and see what happens. Try
        editing the message, then add a second line of output:
      </p>
      <CodeBlock
        code={`#include <iostream>

int main()
{
    std::cout << "Hello, world!\\n";
    std::cout << "I am learning C++.\\n";
    return 0;
}`}
        output={`Hello, world!\nI am learning C++.`}
        highlight={[6]}
      />

      <Callout variant="rule" title="Every statement ends with a semicolon">
        Notice each line inside <code>main</code> ends with a{" "}
        <code>;</code>. Forgetting it is the single most common beginner error —
        and the compiler&rsquo;s message about it often points at the{" "}
        <em>next</em> line, which can be confusing at first.
      </Callout>

      <KeyTakeaways
        items={[
          "Every C++ program starts executing at the main function.",
          "std::cout sends text to the console; \\n starts a new line.",
          "Create a console project, paste the code, and build-and-run in one step.",
          "Experiment freely — editing and re-running is how the concepts click.",
        ]}
      />

      <QuizSection>
        <QuizChoice
          prompt="Where does execution of a C++ program begin?"
          options={[
            "At the first #include",
            "At the top of the file, line by line",
            "In the main function",
            "Wherever std::cout first appears",
          ]}
          answer={2}
          explanation="Regardless of where main is written in the file, the program starts running there."
        />
        <QuizChoice
          prompt="What does the \\n inside the string do?"
          options={[
            "Prints the literal characters backslash-n",
            "Moves output to a new line",
            "Ends the program",
            "Adds a space",
          ]}
          answer={1}
          explanation="\\n is the newline escape sequence; it advances output to the next line."
        />
      </QuizSection>
    </>
  );
}

export const CH0 = {
  "0-1-intro-to-cpp": Lesson01,
  "0-2-how-programs-work": Lesson02,
  "0-3-compilers-ides-toolchain": Lesson03,
  "0-4-your-first-program": Lesson04,
};
