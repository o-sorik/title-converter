/**
 * Content for /kebab-case-converter (batch 1 of the topical map, brief
 * docs/briefs/kebab-case-converter.md in the strategy repo).
 *
 * Every example is kept as a literal so a reader sees what the page claims;
 * `kebab-case-content.test.ts` asserts each one against the engine.
 * Claims about CSS, HTML, shells, registries and languages come from the
 * sources below only (F1–F23 in the brief).
 */

export interface KebabExample {
  input: string
  output: string
}

export interface KebabSource {
  label: string
  href: string
}

export const KEBAB_SOURCES = {
  mdnKebab: "https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case",
  cssSyntax: "https://www.w3.org/TR/css-syntax-3/",
  cssVariables: "https://www.w3.org/TR/css-variables-1/",
  htmlData: "https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes",
  glibcArguments: "https://sourceware.org/glibc/manual/latest/html_node/Argument-Syntax.html",
  posixArguments: "https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap12.html",
  npmName: "https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name",
  pep503: "https://peps.python.org/pep-0503/#normalized-names",
  cargoTargets: "https://doc.rust-lang.org/cargo/reference/cargo-targets.html#the-name-field",
  debianPolicy: "https://www.debian.org/doc/debian-policy/ch-controlfields.html#source",
  kubernetesNames: "https://kubernetes.io/docs/concepts/overview/working-with-objects/names/",
  googleFilenames: "https://developers.google.com/style/filenames",
  angularStyle: "https://angular.dev/style-guide",
  vueStyle: "https://vuejs.org/style-guide/rules-strongly-recommended",
  mdnIdentifier: "https://developer.mozilla.org/en-US/docs/Glossary/Identifier",
  mdnSubtraction: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction",
  pythonIdentifiers: "https://docs.python.org/3/reference/lexical_analysis.html#identifiers",
  clojureReader: "https://clojure.org/reference/reader",
  rakuSyntax: "https://docs.raku.org/language/syntax#Identifiers",
  clhsMakeHashTable: "https://www.lispworks.com/documentation/HyperSpec/Body/f_mk_has.htm",
} as const

/** What happens to the text, in the order of the engine's rules. Subject = the text element. */
export const KEBAB_STEPS: { change: string; why: string; source?: KebabSource }[] = [
  {
    change: "Spaces, underscores and dots become hyphens.",
    why: "Each of them marks a word boundary, so user_first_name becomes user-first-name and version 2.5 becomes version-2-5.",
  },
  {
    change: "A capital after a lowercase letter starts a new word.",
    why: "That is how camelCase marks its words: myVariableName becomes my-variable-name. A capital after a digit starts a new word too.",
  },
  {
    change: "A run of capitals stays one word.",
    why: "HTTPServer becomes http-server, not h-t-t-p-server: only the last capital of the run, the one a lowercase letter follows, opens the next word.",
  },
  {
    change: "Every letter becomes lowercase.",
    why: "The hyphen already marks each word, so capitals carry nothing: SCREAMING_SNAKE_CASE becomes screaming-snake-case.",
  },
  {
    change: "Digits stay attached to their word.",
    why: "ABC123def becomes abc123def. A digit starts a word of its own only after a space or a symbol.",
  },
  {
    change: "Other symbols are removed.",
    why: "Between two words they leave a hyphen, so C++ & C# becomes c-c.",
  },
  {
    change: "Repeated and edge hyphens are trimmed.",
    why: "--dry-run becomes dry-run: the result never starts or ends with a hyphen and never doubles one.",
  },
  {
    change: "Apostrophes are dropped without splitting the word.",
    why: "Don't becomes dont, not don-t, because an apostrophe cannot be part of a CSS class name",
    source: { label: "CSS Syntax", href: KEBAB_SOURCES.cssSyntax },
  },
]

export const KEBAB_EXAMPLES = {
  // Intro
  camel: { input: "myVariableName", output: "my-variable-name" },
  acronym: { input: "HTTPServer", output: "http-server" },
  snake: { input: "user_first_name", output: "user-first-name" },
  // Under the list of steps
  acronymInside: { input: "getHTTPResponseCode", output: "get-http-response-code" },
  screaming: { input: "SCREAMING_SNAKE_CASE", output: "screaming-snake-case" },
  mixed: { input: "Don't Stop: Café 2.5", output: "dont-stop-café-2-5" },
  // Honest limits
  brand: { input: "iPhone 15 Pro", output: "i-phone-15-pro" },
  brandWithDigit: { input: "OAuth2Client", output: "o-auth2-client" },
  symbols: { input: "C++ & C#", output: "c-c" },
  apostrophe: { input: "Don't Stop", output: "dont-stop" },
  accents: { input: "Café Résumé", output: "café-résumé" },
  // Use cases
  cssClass: { input: "Product Card", output: "product-card" },
  cssCustomProperty: { input: "main color", output: "main-color" },
  cssDigitFirst: { input: "2nd place", output: "2nd-place" },
  dataAttribute: { input: "dataUserId", output: "data-user-id" },
  flag: { input: "Dry Run", output: "dry-run" },
  packageName: { input: "my crate", output: "my-crate" },
} satisfies Record<string, KebabExample>

/** The neighbours the italic section bridges to, each produced by its own mode. */
export const KEBAB_NEIGHBOURS = {
  snake: { input: "my-crate", output: "my_crate" },
  camel: { input: "data-user-id", output: "dataUserId" },
  slugBrand: { input: "iPhone", output: "iphone" },
  slugAccent: { input: "café", output: "cafe" },
}

/** FAQ 5: what the title case mode does with a kebab-case name, with and without its hyphens. */
export const KEBAB_BACK_TO_WORDS = {
  spaced: { input: "my blog post", output: "My Blog Post" },
  hyphenated: { input: "my-blog-post", output: "My-Blog-Post" },
}

export interface KebabFaq {
  question: string
  /** Plain text: the same string feeds the FAQPage structured data. */
  answer: string
  /** A phrase of `answer` the page renders as a link. It must occur in the answer exactly once. */
  link?: { anchor: string; href: string }
}

export const KEBAB_FAQS: KebabFaq[] = [
  {
    question: "What is kebab case?",
    answer:
      "Kebab case is a way of writing a name without spaces: the words are lowercase and joined with hyphens, as in my-variable-name. MDN's glossary describes it as writing phrases \"where spaces are replaced with hyphens.\"",
  },
  {
    question: "Why is it called kebab case?",
    answer:
      "MDN's glossary gives the reason: \"The name comes from the similarity of the words to meat on a kebab skewer.\" The hyphens are the skewer and the words are the pieces on it.",
  },
  {
    question: "What are other names for kebab-case?",
    answer:
      "dash-case is the main one: Angular's documentation uses that name, and the top-voted Stack Overflow answer on the question says the format \"is known as dash-case or kebab-case.\" The same answer lists lisp-case and hyphen-case as rarer names. train-case is a different format: it keeps a capital on each word, as in Two-Words.",
  },
  {
    question: "Is there an uppercase kebab-case?",
    answer:
      "Not in this converter: every letter comes out lowercase, so Two Words becomes two-words. A hyphenated name with a capital on each word, such as Two-Words, is called train-case in the change-case library.",
  },
  {
    question: "How do I turn kebab-case back into words?",
    answer:
      "Replace the hyphens with spaces, then convert to title case: my blog post becomes My Blog Post. With the hyphens left in, the name is read as one hyphenated compound and comes out as My-Blog-Post.",
    link: { anchor: "convert to title case", href: "/" },
  },
  {
    question: "Can I use kebab-case in a URL?",
    answer:
      "Yes: lowercase words joined with hyphens are what a URL slug looks like. A slug follows extra rules, though. Accented letters become plain ones and a brand name such as iPhone stays whole, so for a page address use the URL slug generator.",
  },
]
