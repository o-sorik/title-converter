/**
 * Content for /slug-generator (quality node 6 in the topical map, brief
 * docs/briefs/qn6-slug-generator.md in the strategy repo).
 *
 * Every example is kept as a literal so a reader sees what the page claims;
 * `slug-generator-content.test.ts` asserts each one against the engine.
 * Platform and Google claims come from the sources below only.
 */

export interface SlugExample {
  input: string
  output: string
}

/** What the generator changes, in the order of the engine's rules. Subject = the text element. */
export const SLUG_CHANGES: { change: string; why: string }[] = [
  {
    change: "Capital letters become lowercase.",
    why: "URLs are case sensitive, so Google treats /APPLE and /apple as two different addresses.",
  },
  {
    change: "Spaces become single hyphens.",
    why: "Google recommends hyphens between words because they clearly signal a word boundary.",
  },
  {
    change: "Apostrophes are dropped without splitting the word.",
    why: "Don't becomes dont, not don-t, so the slug still reads as one word.",
  },
  {
    change: "Accented letters become plain letters.",
    why: "Café becomes cafe, ß becomes ss and Å becomes a. In a link, café would otherwise travel percent-encoded as caf%C3%A9.",
  },
  {
    change: "An ampersand becomes \"and\".",
    why: "In a URL the & is a reserved character that separates query parameters, so the word keeps its meaning instead.",
  },
  {
    change: "Other punctuation and symbols are removed.",
    why: "Between two letters or digits they leave a hyphen, so Next.js becomes next-js and 2.5 becomes 2-5 rather than 25.",
  },
  {
    change: "Numbers stay where they are.",
    why: "10% becomes 10 and 16 stays 16.",
  },
  {
    change: "Extra hyphens at the ends and in the middle are trimmed.",
    why: "A slug never starts or ends with a hyphen and never doubles one.",
  },
]

export const SLUG_EXAMPLES = {
  brief: { input: "Don't Stop: Café Résumé & 10% Off!", output: "dont-stop-cafe-resume-and-10-off" },
  version: { input: "What's New in Next.js 16?", output: "whats-new-in-next-js-16" },
  accents: { input: "Straße über Ångström", output: "strasse-uber-angstrom" },
  stopWords: { input: "The Cat in the Hat", output: "the-cat-in-the-hat" },
  stopWordsRemoved: { input: "The Cat in the Hat", output: "cat-hat" },
  number: { input: "10 Tips for Writers", output: "10-tips-for-writers" },
  cPlusPlus: { input: "C++ vs C# — which?", output: "c-vs-c-which" },
} satisfies Record<string, SlugExample>

/** One headline through the three hyphen-or-underscore modes. */
export const SLUG_VS_CASES = {
  input: "iPhone 15 Pro Max Review",
  slug: "iphone-15-pro-max-review",
  kebab: "i-phone-15-pro-max-review",
  snake: "i_phone_15_pro_max_review",
}

/** The before/after diagram. Callouts mirror the numbered list of changes. */
export const DIAGRAM_INPUT = SLUG_EXAMPLES.brief.input
export const DIAGRAM_OUTPUT = SLUG_EXAMPLES.brief.output

/** Keyed by a word of `DIAGRAM_OUTPUT`, in list order. */
export const DIAGRAM_CALLOUTS: { word: string; label: string }[] = [
  { word: "dont", label: "Apostrophe dropped, word kept" },
  { word: "stop", label: "Lowercase, colon removed" },
  { word: "cafe", label: "Accent becomes a plain letter" },
  { word: "and", label: "& becomes \"and\"" },
  { word: "10", label: "% removed, number kept" },
  { word: "off", label: "! removed, no hyphen at the end" },
]

export const SLUG_SOURCES = {
  googleUrlStructure: "https://developers.google.com/search/docs/crawling-indexing/url-structure",
  googleStarterGuide: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  wordpressSidebar: "https://wordpress.org/documentation/article/page-post-settings-sidebar/",
  wordpressOldSlug: "https://github.com/WordPress/wordpress-develop/blob/trunk/src/wp-includes/query.php",
  shopifyPages: "https://help.shopify.com/en/manual/online-store/add-edit-pages",
  shopifyCollections: "https://help.shopify.com/en/manual/products/collections/collection-settings",
  ghostPublishing: "https://ghost.org/help/publishing-options/",
  ghostRedirects: "https://ghost.org/tutorials/implementing-redirects/",
}

export const SLUG_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is a URL slug?",
    answer:
      "A slug is the last part of a URL that names the page, such as slug-generator in titlecaseconverter.online/slug-generator. Django's documentation defines it as \"a short label for something, containing only letters, numbers, underscores or hyphens.\"",
  },
  {
    question: "Why is it called a slug?",
    answer:
      "The word comes from newspapers. Charles G. Ross's 1911 handbook The Writing of News defines a slug as a line of machine-set type and, for copy readers, \"the identifying name given a story.\" Django calls slug \"a newspaper term.\"",
  },
  {
    question: "Should a slug use hyphens or underscores?",
    answer:
      "Hyphens. Google recommends hyphens instead of underscores to separate words in URLs, because hyphens clearly signal a word boundary.",
  },
  {
    question: "What is the difference between a slug and a permalink?",
    answer:
      "A permalink is the full, permanent URL of a page or post; the slug is its last part. WordPress describes the slug as \"the last part of the URL\" that you can edit.",
  },
  {
    question: "What does slugify mean?",
    answer:
      "To slugify text is to turn it into a slug. The word is a function name in developer tools: Django's slugify, for example, \"converts a string to a URL slug.\"",
  },
  {
    question: "Does the slug affect SEO?",
    answer:
      "Very little. Google says keywords in the URL path \"alone have hardly any effect beyond appearing in breadcrumbs.\" It still recommends words that are useful for readers over random identifiers.",
  },
]
