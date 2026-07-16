export interface LessonMeta {
  slug: string;
  num: string;
  title: string;
  summary: string;
  minutes: number;
  hasContent?: boolean;
}

export interface Chapter {
  num: number;
  slug: string;
  title: string;
  intro: string;
  lessons: LessonMeta[];
}

export const CURRICULUM: Chapter[] = [
  {
    num: 0,
    slug: "getting-started",
    title: "Introduction & Getting Started",
    intro:
      "What C++ is, why it's worth learning, and how to get a working compiler so you can build and run your first program.",
    lessons: [
      {
        slug: "0-1-intro-to-cpp",
        num: "0.1",
        title: "Introduction to C++",
        summary:
          "What C++ is, where it came from, and the kinds of software it powers today.",
        minutes: 7,
        hasContent: true,
      },
      {
        slug: "0-2-how-programs-work",
        num: "0.2",
        title: "How programs and languages work",
        summary:
          "Machine code, high-level languages, compilers, and how source becomes a running program.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "0-3-compilers-ides-toolchain",
        num: "0.3",
        title: "Compilers, IDEs, and your toolchain",
        summary:
          "Pick an IDE or compiler and understand the edit → compile → link → run loop.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "0-4-your-first-program",
        num: "0.4",
        title: "Writing and running your first program",
        summary:
          "Create a project, type in a Hello World program, compile it, and see output.",
        minutes: 9,
        hasContent: true,
      },
    ],
  },
  {
    num: 1,
    slug: "cpp-basics",
    title: "C++ Basics",
    intro:
      "The core building blocks of every program: statements, objects, variables, input and output, and comments.",
    lessons: [
      {
        slug: "1-1-statements-and-program-structure",
        num: "1.1",
        title: "Statements and the structure of a program",
        summary:
          "Statements, functions, and the anatomy of a minimal C++ program.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "1-2-comments",
        num: "1.2",
        title: "Comments",
        summary:
          "Document your intent with line and block comments — and how to use them well.",
        minutes: 7,
        hasContent: true,
      },
      {
        slug: "1-3-objects-and-variables",
        num: "1.3",
        title: "Objects and variables",
        summary:
          "How C++ stores data in memory, and how to define variables to name it.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "1-4-assignment-and-initialization",
        num: "1.4",
        title: "Variable assignment and initialization",
        summary:
          "The difference between assignment and initialization, and which form to prefer.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "1-5-iostream-cout-cin-endl",
        num: "1.5",
        title: "Introduction to iostream: cout, cin, and endl",
        summary:
          "Print to the console and read keyboard input using the standard streams.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "1-6-uninitialized-variables-and-ub",
        num: "1.6",
        title: "Uninitialized variables and undefined behavior",
        summary:
          "Why reading an uninitialized variable is dangerous, and how to stay safe.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "1-7-keywords-and-identifiers",
        num: "1.7",
        title: "Keywords and naming your identifiers",
        summary:
          "Reserved words and the rules and conventions for naming things.",
        minutes: 7,
        hasContent: true,
      },
      {
        slug: "1-8-whitespace-and-formatting",
        num: "1.8",
        title: "Whitespace and basic formatting",
        summary: "How C++ treats whitespace and how to format readable code.",
        minutes: 6,
        hasContent: true,
      },
    ],
  },
  {
    num: 2,
    slug: "functions-and-files",
    title: "Functions and Files",
    intro:
      "Break programs into reusable pieces with functions, parameters, and return values — then split code across multiple files.",
    lessons: [
      {
        slug: "2-1-introduction-to-functions",
        num: "2.1",
        title: "Introduction to functions",
        summary: "Define and call functions to organize and reuse your code.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "2-2-return-values",
        num: "2.2",
        title: "Function return values",
        summary: "Send a result back to the caller with return statements.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "2-3-parameters-and-arguments",
        num: "2.3",
        title: "Parameters and arguments",
        summary: "Pass data into functions and understand how copies are made.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "2-4-local-scope",
        num: "2.4",
        title: "Local scope and lifetime",
        summary: "Where local variables live and when they're destroyed.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "2-5-forward-declarations",
        num: "2.5",
        title: "Forward declarations and definitions",
        summary:
          "Tell the compiler about a function before it's defined so order stops mattering.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "2-6-multiple-files",
        num: "2.6",
        title: "Programs with multiple files",
        summary: "Split a program across source files and link them together.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "2-7-header-files",
        num: "2.7",
        title: "Header files",
        summary: "Share declarations between files cleanly with headers.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "2-8-namespaces-and-preprocessor",
        num: "2.8",
        title: "Naming collisions, namespaces & the preprocessor",
        summary:
          "Avoid name clashes with namespaces and understand what #include really does.",
        minutes: 10,
        hasContent: true,
      },
    ],
  },
  {
    num: 3,
    slug: "debugging",
    title: "Debugging C++ Programs",
    intro:
      "Every programmer writes bugs. Learn a repeatable process to find and fix them — and tools that make it faster.",
    lessons: [
      {
        slug: "3-1-syntax-and-semantic-errors",
        num: "3.1",
        title: "Syntax and semantic errors",
        summary: "The two broad categories of program errors and how they differ.",
        minutes: 6,
        hasContent: true,
      },
      {
        slug: "3-2-a-strategy-for-debugging",
        num: "3.2",
        title: "A strategy for debugging",
        summary:
          "A systematic loop for reproducing, isolating, and fixing defects.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "3-3-debugging-tactics",
        num: "3.3",
        title: "Basic debugging tactics",
        summary:
          "Print statements, commenting out code, and validating your assumptions.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "3-4-using-a-debugger",
        num: "3.4",
        title: "Using an integrated debugger",
        summary:
          "Step through code, set breakpoints, and watch variables change in real time.",
        minutes: 10,
        hasContent: true,
      },
    ],
  },
  {
    num: 4,
    slug: "fundamental-data-types",
    title: "Fundamental Data Types",
    intro:
      "The built-in types C++ gives you for numbers, characters, and truth values — and how to choose between them.",
    lessons: [
      {
        slug: "4-1-intro-to-fundamental-types",
        num: "4.1",
        title: "Introduction to fundamental data types",
        summary: "The categories of built-in types and how memory is measured.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "4-2-void-and-sizes",
        num: "4.2",
        title: "Void and the sizes of types",
        summary: "The void type and how much memory each type occupies.",
        minutes: 7,
        hasContent: true,
      },
      {
        slug: "4-3-signed-integers",
        num: "4.3",
        title: "Signed integers",
        summary: "Whole numbers that can be negative, and integer overflow.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "4-4-unsigned-integers",
        num: "4.4",
        title: "Unsigned integers, and why to avoid them",
        summary: "Non-negative integers, wrap-around, and the pitfalls they bring.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "4-5-floating-point-numbers",
        num: "4.5",
        title: "Floating point numbers",
        summary: "Represent real numbers, and understand rounding and precision.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "4-6-booleans",
        num: "4.6",
        title: "Booleans",
        summary: "The true/false type at the heart of every decision your code makes.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "4-7-chars",
        num: "4.7",
        title: "Characters",
        summary: "Store single characters and understand their numeric encoding.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "4-8-conditional-operator-and-conversions",
        num: "4.8",
        title: "Type conversion and the conditional operator",
        summary: "How values change type, and a compact way to choose between two.",
        minutes: 9,
        hasContent: true,
      },
    ],
  },
  {
    num: 5,
    slug: "constants-and-strings",
    title: "Constants and Strings",
    intro:
      "Values that never change, symbolic constants, and working with text using std::string.",
    lessons: [
      {
        slug: "5-1-constant-variables",
        num: "5.1",
        title: "Constant variables (const)",
        summary: "Lock a value so it can't be modified after initialization.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "5-2-literals-and-magic-numbers",
        num: "5.2",
        title: "Literals and magic numbers",
        summary: "Hard-coded values, why bare numbers are a smell, and how to fix them.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "5-3-constexpr",
        num: "5.3",
        title: "Compile-time constants and constexpr",
        summary: "Constants the compiler can evaluate before your program runs.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "5-4-intro-to-std-string",
        num: "5.4",
        title: "Introduction to std::string",
        summary: "Store and manipulate text with the standard string type.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "5-5-std-string-view",
        num: "5.5",
        title: "Introduction to std::string_view",
        summary: "A lightweight, read-only view of text that avoids copies.",
        minutes: 9,
        hasContent: true,
      },
    ],
  },
  {
    num: 6,
    slug: "operators",
    title: "Operators",
    intro:
      "Arithmetic, comparison, logical, and the rules of precedence that decide how expressions evaluate.",
    lessons: [
      {
        slug: "6-1-operator-precedence-and-associativity",
        num: "6.1",
        title: "Operator precedence and associativity",
        summary: "Which operators bind first, and how to keep expressions unambiguous.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "6-2-arithmetic-operators",
        num: "6.2",
        title: "Arithmetic operators",
        summary: "Add, subtract, multiply, divide, and the remainder operator.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "6-3-increment-decrement-and-side-effects",
        num: "6.3",
        title: "Increment, decrement, and side effects",
        summary: "The ++ and -- operators and the traps of order of evaluation.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "6-4-comparison-and-logical-operators",
        num: "6.4",
        title: "Comparison and logical operators",
        summary: "Compare values and combine conditions with &&, ||, and !.",
        minutes: 9,
        hasContent: true,
      },
    ],
  },
  {
    num: 7,
    slug: "scope-duration-linkage",
    title: "Scope, Duration & Linkage",
    intro:
      "Where names are visible, how long objects live, and how identifiers connect across files.",
    lessons: [
      {
        slug: "7-1-local-and-global-scope",
        num: "7.1",
        title: "Local and global variables",
        summary: "Compare local and global scope and when each is appropriate.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "7-2-namespaces-revisited",
        num: "7.2",
        title: "User-defined namespaces",
        summary: "Organize code and prevent collisions with your own namespaces.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "7-3-duration-and-linkage",
        num: "7.3",
        title: "Duration and linkage",
        summary: "static, extern, and internal vs external linkage explained.",
        minutes: 10,
        hasContent: true,
      },
    ],
  },
  {
    num: 8,
    slug: "control-flow",
    title: "Control Flow",
    intro:
      "Make decisions and repeat work with if statements, switches, and the three kinds of loops.",
    lessons: [
      {
        slug: "8-1-if-statements",
        num: "8.1",
        title: "If statements and blocks",
        summary: "Branch your program based on conditions.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "8-2-switch-statements",
        num: "8.2",
        title: "Switch statements",
        summary: "Choose among many cases based on a single value.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "8-3-while-and-do-while",
        num: "8.3",
        title: "While and do-while loops",
        summary: "Repeat code as long as a condition holds.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "8-4-for-loops",
        num: "8.4",
        title: "For loops",
        summary: "The classic counting loop for a known number of iterations.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "8-5-break-continue-and-random",
        num: "8.5",
        title: "Break, continue, and generating random numbers",
        summary: "Alter loop flow and produce randomness with the <random> library.",
        minutes: 10,
        hasContent: true,
      },
    ],
  },
  {
    num: 9,
    slug: "error-handling",
    title: "Error Detection & Handling",
    intro:
      "Validate input, guard against bad states, and use testing to keep programs correct.",
    lessons: [
      {
        slug: "9-1-testing-your-code",
        num: "9.1",
        title: "Introduction to testing your code",
        summary: "Simple techniques to verify that your code does what you think.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "9-2-detecting-and-handling-errors",
        num: "9.2",
        title: "Detecting and handling errors",
        summary: "Strategies for responding when something goes wrong.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "9-3-validating-user-input",
        num: "9.3",
        title: "std::cin and handling invalid input",
        summary: "Recover gracefully when the user types something unexpected.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "9-4-assert-and-static-assert",
        num: "9.4",
        title: "Assert and static_assert",
        summary: "Document and enforce assumptions at run time and compile time.",
        minutes: 8,
        hasContent: true,
      },
    ],
  },
  {
    num: 10,
    slug: "type-conversion-and-deduction",
    title: "Type Conversion, Aliases & Deduction",
    intro:
      "How types convert, how to give them friendlier names, and letting the compiler deduce them with auto.",
    lessons: [
      {
        slug: "10-1-implicit-type-conversion",
        num: "10.1",
        title: "Implicit type conversion",
        summary: "How and when the compiler converts values automatically.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "10-2-explicit-conversion-static-cast",
        num: "10.2",
        title: "Explicit conversion with static_cast",
        summary: "Convert types deliberately and safely when you must.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "10-3-type-aliases-and-auto",
        num: "10.3",
        title: "Type aliases and type deduction (auto)",
        summary: "Name complex types and let the compiler deduce them.",
        minutes: 9,
        hasContent: true,
      },
    ],
  },
  {
    num: 11,
    slug: "functions-overloading-templates",
    title: "Function Overloading & Templates",
    intro:
      "Write one function name for many argument types, then generalize with templates.",
    lessons: [
      {
        slug: "11-1-function-overloading",
        num: "11.1",
        title: "Introduction to function overloading",
        summary: "Reuse a name for functions that differ in their parameters.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "11-2-default-arguments",
        num: "11.2",
        title: "Default arguments",
        summary: "Give parameters fallback values so callers can omit them.",
        minutes: 8,
        hasContent: true,
      },
      {
        slug: "11-3-function-templates",
        num: "11.3",
        title: "Function templates",
        summary: "Write a function once that works for any type.",
        minutes: 10,
        hasContent: true,
      },
    ],
  },
  {
    num: 12,
    slug: "references-and-pointers",
    title: "Compound Types: References & Pointers",
    intro:
      "Refer to existing objects and work with memory addresses — the foundation for efficient C++.",
    lessons: [
      {
        slug: "12-1-lvalue-references",
        num: "12.1",
        title: "Lvalue references",
        summary: "Create an alias for an existing object.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "12-2-pass-by-reference",
        num: "12.2",
        title: "Pass by reference (and const reference)",
        summary: "Avoid expensive copies when passing arguments to functions.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "12-3-intro-to-pointers",
        num: "12.3",
        title: "Introduction to pointers",
        summary: "Store the address of an object and access it indirectly.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "12-4-null-pointers",
        num: "12.4",
        title: "Null pointers",
        summary: "Represent 'points to nothing' safely with nullptr.",
        minutes: 8,
        hasContent: true,
      },
    ],
  },
  {
    num: 13,
    slug: "enums-and-structs",
    title: "Compound Types: Enums & Structs",
    intro:
      "Create your own simple types: enumerations for named constants and structs for bundling data.",
    lessons: [
      {
        slug: "13-1-scoped-enumerations",
        num: "13.1",
        title: "Unscoped and scoped enumerations",
        summary: "Give meaningful names to a set of related integer constants.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "13-2-intro-to-structs",
        num: "13.2",
        title: "Introduction to structs",
        summary: "Bundle several related variables into a single type.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "13-3-member-selection-and-init",
        num: "13.3",
        title: "Struct member access and initialization",
        summary: "Read and write struct members and initialize them cleanly.",
        minutes: 9,
        hasContent: true,
      },
    ],
  },
  {
    num: 14,
    slug: "intro-to-classes",
    title: "Introduction to Classes",
    intro:
      "The heart of object-oriented C++: bundle data with the functions that operate on it, and control access.",
    lessons: [
      {
        slug: "14-1-intro-to-oop-and-classes",
        num: "14.1",
        title: "Object-oriented programming and classes",
        summary: "Why classes exist and how they extend the idea of structs.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "14-2-member-functions",
        num: "14.2",
        title: "Member functions",
        summary: "Attach behavior to your types with functions that live inside them.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "14-3-access-specifiers",
        num: "14.3",
        title: "Access specifiers and encapsulation",
        summary: "Hide implementation details behind public and private.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "14-4-constructors",
        num: "14.4",
        title: "Constructors",
        summary: "Initialize objects reliably the moment they're created.",
        minutes: 10,
        hasContent: true,
      },
    ],
  },
  {
    num: 15,
    slug: "vectors-and-loops",
    title: "Dynamic Arrays: std::vector",
    intro:
      "Store many values in a resizable container and iterate over them with range-based for loops.",
    lessons: [
      {
        slug: "15-1-intro-to-containers-and-vector",
        num: "15.1",
        title: "Introduction to containers and std::vector",
        summary: "A resizable sequence container for holding lists of values.",
        minutes: 10,
        hasContent: true,
      },
      {
        slug: "15-2-vector-access-and-loops",
        num: "15.2",
        title: "Accessing elements and range-based for",
        summary: "Index into a vector and loop over it the modern way.",
        minutes: 9,
        hasContent: true,
      },
      {
        slug: "15-3-vector-operations",
        num: "15.3",
        title: "Growing and shrinking a vector",
        summary: "push_back, size, resizing, and how vectors manage memory.",
        minutes: 9,
        hasContent: true,
      },
    ],
  },
  {
    num: 16,
    slug: "next-steps",
    title: "Where to Go Next",
    intro:
      "A map of the more advanced topics that build on these foundations, plus how to keep practicing.",
    lessons: [
      {
        slug: "16-1-roadmap-beyond-the-basics",
        num: "16.1",
        title: "A roadmap beyond the basics",
        summary:
          "Iterators, algorithms, smart pointers, inheritance, templates, and more.",
        minutes: 8,
        hasContent: true,
      },
    ],
  },
];

/* -------------------------- derived helpers -------------------------- */

export interface FlatLesson extends LessonMeta {
  chapterNum: number;
  chapterTitle: string;
  chapterSlug: string;
  index: number; // global order
}

export const FLAT_LESSONS: FlatLesson[] = CURRICULUM.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterNum: ch.num,
    chapterTitle: ch.title,
    chapterSlug: ch.slug,
    index: 0,
  })),
).map((l, i) => ({ ...l, index: i }));

export const TOTAL_LESSONS = FLAT_LESSONS.length;
export const TOTAL_CHAPTERS = CURRICULUM.length;

export function getLesson(slug: string): FlatLesson | undefined {
  return FLAT_LESSONS.find((l) => l.slug === slug);
}

export function getAdjacent(slug: string): {
  prev?: FlatLesson;
  next?: FlatLesson;
} {
  const idx = FLAT_LESSONS.findIndex((l) => l.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? FLAT_LESSONS[idx - 1] : undefined,
    next: idx < FLAT_LESSONS.length - 1 ? FLAT_LESSONS[idx + 1] : undefined,
  };
}
