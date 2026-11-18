/**
 * Content for /snake-case-converter (batch 1 of the topical map, brief
 * docs/briefs/snake-case-converter.md in the strategy repo).
 *
 * Every example is kept as a literal so a reader sees what the page claims;
 * `snake-case-content.test.ts` asserts each one against the engine.
 * Claims about languages, databases and shells come from the sources below
 * only (F1–F24 in the brief).
 */

export interface SnakeExample {
  input: string
  output: string
}

export interface SnakeSource {
  label: string
  href: string
}

export const SNAKE_SOURCES = {
  rustcLint: "https://doc.rust-lang.org/rustc/lints/listing/warn-by-default.html#non-snake-case",
  pep8Functions: "https://peps.python.org/pep-0008/#function-and-variable-names",
  pep8Constants: "https://peps.python.org/pep-0008/#constants",
  pep8Modules: "https://peps.python.org/pep-0008/#package-and-module-names",
  pep8NamingStyles: "https://peps.python.org/pep-0008/#descriptive-naming-styles",
  rustNaming: "https://rust-lang.github.io/api-guidelines/naming.html",
  rubyMethods: "https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html",
  rubyStyleGuide: "https://rubystyle.guide/#snake-case-symbols-methods-vars",
  elixirNaming: "https://hexdocs.pm/elixir/naming-conventions.html#casing",
  psr1: "https://www.php-fig.org/psr/psr-1/",
  goMixedCaps: "https://go.dev/doc/effective_go#mixed-caps",
  googleJs: "https://google.github.io/styleguide/jsguide.html#naming-constant-names",
  postgresIdentifiers: "https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS",
  mysqlCase: "https://dev.mysql.com/doc/refman/8.4/en/identifier-case-sensitivity.html",
  posixEnv: "https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap08.html",
  googleJson: "https://google.github.io/styleguide/jsoncguide.html",
  pythonIdentifiers: "https://docs.python.org/3/reference/lexical_analysis.html#identifiers",
  pep503: "https://peps.python.org/pep-0503/#normalized-names",
  cIdentifiers: "https://en.cppreference.com/w/c/language/identifiers",
} as const

/** What happens to the text, in the order of the engine's rules. Subject = the text element. */
export const SNAKE_STEPS: { change: string; why: string; source?: SnakeSource }[] = [
  {
    change: "Spaces, hyphens and dots become underscores.",
    why: "Each of them marks a word boundary, so user-first-name becomes user_first_name and version 2.5 becomes version_2_5.",
  },
  {
    change: "A capital after a lowercase letter starts a new word.",
    why: "That is how camelCase marks its words: myVariableName becomes my_variable_name. A capital after a digit starts a new word too.",
  },
  {
    change: "A run of capitals stays one word.",
    why: "HTTPServer becomes http_server, not h_t_t_p_server: only the last capital of the run, the one a lowercase letter follows, opens the next word.",
  },
  {
    change: "Every letter becomes lowercase.",
    why: "The underscore already marks each word, so capitals carry nothing: MAX_RETRY_COUNT becomes max_retry_count. For a constant in capitals, see below.",
  },
  {
    change: "Digits stay attached to their word.",
    why: "md5Hash becomes md5_hash. A digit starts a word of its own only after a space or a symbol.",
  },
  {
    change: "Apostrophes are dropped without splitting the word.",
    why: "Don't becomes dont, not don_t, because a Python name is built only from letters, digits and the underscore",
    source: { label: "Python reference", href: SNAKE_SOURCES.pythonIdentifiers },
  },
  {
    change: "Other symbols are removed.",
    why: "Between two words they leave one underscore, so C++ & C# becomes c_c and user__name becomes user_name.",
  },
  {
    change: "Leading and trailing underscores are kept.",
    why: "In Python they carry a meaning, so _privateValue becomes _private_value and __init__ stays __init__.",
  },
]

export const SNAKE_EXAMPLES = {
  // Intro
  camel: { input: "myVariableName", output: "my_variable_name" },
  acronym: { input: "HTTPServer", output: "http_server" },
  kebab: { input: "user-first-name", output: "user_first_name" },
  // Under the list of steps
  acronymInside: { input: "getHTTPResponseCode", output: "get_http_response_code" },
  mixed: { input: "Don't Stop: Café 2.5", output: "dont_stop_café_2_5" },
  private: { input: "_privateValue", output: "_private_value" },
  // Honest limits
  brand: { input: "iPhone 15 Pro", output: "i_phone_15_pro" },
  brandWithDigit: { input: "OAuth2Client", output: "o_auth2_client" },
  digitFirst: { input: "2nd place", output: "2nd_place" },
  symbols: { input: "C++ & C#", output: "c_c" },
  dunder: { input: "__init__", output: "__init__" },
  accents: { input: "Café Résumé", output: "café_résumé" },
  // Use cases
  pythonFunction: { input: "getUserName", output: "get_user_name" },
  pythonModule: { input: "DataLoader", output: "data_loader" },
  rustFunction: { input: "parseConfig", output: "parse_config" },
  column: { input: "firstName", output: "first_name" },
  constant: { input: "maxRetryCount", output: "max_retry_count" },
  envVar: { input: "databaseUrl", output: "database_url" },
  // FAQ
  digits: { input: "md5Hash", output: "md5_hash" },
  version: { input: "version 2.5", output: "version_2_5" },
} satisfies Record<string, SnakeExample>

/** Constants in capitals: snake_case first, then the uppercase mode. */
export const SNAKE_TO_UPPER = {
  constant: { input: "max_retry_count", output: "MAX_RETRY_COUNT" },
  envVar: { input: "database_url", output: "DATABASE_URL" },
}

/** The neighbours the italic section bridges to, each produced by its own mode. */
export const SNAKE_NEIGHBOURS = {
  // A Python package may be named my-package; the module you import is my_package.
  fromKebab: { input: "my-package", output: "my_package" },
  kebab: { input: "user_first_name", output: "user-first-name" },
  camel: { input: "first_name", output: "firstName" },
}

/** FAQ: what the title case mode does with a snake_case name, with and without its underscores. */
export const SNAKE_BACK_TO_WORDS = {
  spaced: { input: "first name", output: "First Name" },
  underscored: { input: "first_name", output: "First_Name" },
}

export interface SnakeFaq {
  question: string
  /** Plain text: the same string feeds the FAQPage structured data. */
  answer: string
  /** A phrase of `answer` the page renders as a link. It must occur in the answer exactly once. */
  link?: { anchor: string; href: string }
}

export const SNAKE_FAQS: SnakeFaq[] = [
  {
    question: "What is snake case?",
    answer:
      "Snake case is a way of writing a name without spaces: the words are lowercase and joined with underscores, as in my_variable_name. The Rust compiler's documentation describes it as all characters \"in lowercase, with words separated with a single underscore.\"",
  },
  {
    question: "What is SCREAMING_SNAKE_CASE?",
    answer:
      "It is snake case in capital letters, as in MAX_RETRY_COUNT, and it is the usual format for constants. Python's PEP 8 writes constants \"in all capital letters with underscores separating words,\" Rust's API guidelines call the format SCREAMING_SNAKE_CASE, and Google's JavaScript style guide calls it CONSTANT_CASE. It is also known as upper snake case. This converter returns lowercase: convert to snake_case first, then to uppercase, and max_retry_count becomes MAX_RETRY_COUNT.",
  },
  {
    question: "snake_case or camelCase: which should I use?",
    answer:
      "Use the one the language already uses. Python and Rust name functions and variables in snake_case, Go uses \"MixedCaps or mixedCaps rather than underscores,\" and Google's JSON style guide asks for camelCase property names. In code that already mixes them, follow the existing style: PEP 8 allows mixedCase where it is \"already the prevailing style.\"",
  },
  {
    question: "How do I turn snake_case back into words?",
    answer:
      "Replace the underscores with spaces, then convert to title case: first name becomes First Name. With the underscores left in, each word still gets its capital but the underscores stay, so the result is First_Name.",
    link: { anchor: "convert to title case", href: "/" },
  },
  {
    question: "Does snake_case keep numbers?",
    answer:
      "Yes. A digit stays attached to its word, so md5Hash becomes md5_hash, and a number after a space becomes a word of its own: version 2.5 becomes version_2_5. A Python or C name cannot start with a digit, though, so a result such as 2nd_place needs a letter in front before it works as a variable name.",
  },
]
