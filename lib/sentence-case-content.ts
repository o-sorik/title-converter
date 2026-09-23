/**
 * Content for /sentence-case-converter (quality node 2 in the topical map).
 *
 * Every example is kept as a literal so a reader sees what the page claims;
 * `sentence-case-content.test.ts` asserts each one against the engine.
 */

export interface CaseExample {
  input: string
  output: string
}

/** What the conversion changes. Each sentence keeps the text element as its subject. */
export const SENTENCE_CASE_CHANGES: string[] = [
  "The first letter of each sentence is capitalized.",
  "Every other letter is lowercased.",
  "A new sentence starts after a period, question mark or exclamation point.",
  "The pronoun \"I\" is capitalized wherever it appears.",
  "Acronyms such as NASA, API and UI keep their capitals, even in text typed in all caps.",
  "Brand names with a capital inside the word, such as iPhone, macOS and eBay, are kept as typed.",
  "Punctuation, spacing and line breaks stay exactly where they were.",
]

export const SENTENCE_CASE_EXAMPLES = {
  allCaps: { input: "THIS IS an EXAMPLE. of SENTENCE CASE.", output: "This is an example. Of sentence case." },
  pronoun: { input: "i think i can. can i?", output: "I think I can. Can I?" },
  acronymsAndBrands: { input: "How To Use The NASA API With Your iPhone", output: "How to use the NASA API with your iPhone" },
  names: { input: "Meeting With John Smith In Paris On Monday", output: "Meeting with john smith in paris on monday" },
  colon: { input: "Title Case Rules: A Practical Guide", output: "Title case rules: a practical guide" },
  apaReference: { input: "Self-Report Measures in Clinical Research", output: "Self-report measures in clinical research" },
} satisfies Record<string, CaseExample>

/** The APA fix a writer applies by hand after converting `SENTENCE_CASE_EXAMPLES.colon`. */
export const APA_COLON_FIX = "Title case rules: A practical guide"

/** One headline in both styles, for the side-by-side comparison. */
export const SIDE_BY_SIDE = {
  input: "why we switched to sentence case in our ui",
  sentence: "Why we switched to sentence case in our UI",
  title: "Why We Switched to Sentence Case in Our UI",
}

/** The before/after diagram. Callouts mirror the page headings: what changes, and what to check. */
export const DIAGRAM_INPUT = "MEETING WITH THE NASA TEAM IN PARIS. i THINK THE iPhone DEMO WENT WELL."
export const DIAGRAM_OUTPUT = "Meeting with the NASA team in paris. I think the iPhone demo went well."

export type CalloutKind = "changed" | "kept" | "check"

/** Keyed by the word as it appears in `DIAGRAM_OUTPUT`. */
export const DIAGRAM_CALLOUTS: { word: string; label: string; kind: CalloutKind }[] = [
  { word: "Meeting", label: "First letter of a sentence", kind: "changed" },
  { word: "NASA", label: "Acronym kept", kind: "kept" },
  { word: "paris.", label: "Name to restore", kind: "check" },
  { word: "I", label: "Pronoun \"I\" after a new sentence", kind: "changed" },
  { word: "iPhone", label: "Brand kept", kind: "kept" },
]

export const EXCEL_FORMULA = "=UPPER(LEFT(A1,1))&LOWER(MID(A1,2,LEN(A1)))"

export const SENTENCE_CASE_SOURCES = {
  apaSentenceCase: "https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case",
  apHeadlines: "https://x.com/APStylebook/status/1021397036808265729",
  material: "https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices",
  googleDocs: "https://www.howtogeek.com/478791/how-to-easily-change-the-case-on-text-in-google-docs/",
  excel: "https://www.ablebits.com/office-addins-blog/sentence-case-excel/",
}

export const SENTENCE_CASE_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is sentence case?",
    answer:
      "Sentence case capitalizes only the first letter of each sentence and proper nouns, the way ordinary prose is written. Everything else is lowercase.",
  },
  {
    question: "Is sentence case the same as lowercase?",
    answer:
      "No. Lowercase removes every capital, including the first letter of a sentence and the pronoun \"I\". Sentence case keeps both.",
  },
  {
    question: "Does sentence case keep proper nouns?",
    answer:
      "The style does: names of people, places, days and months keep their capitals. The converter cannot tell a name from an ordinary word, so it lowercases them and you restore them by hand.",
  },
  {
    question: "Should the word after a colon be capitalized in sentence case?",
    answer:
      "It depends on the style guide. APA capitalizes the first word after a colon in titles; in running text, most guides capitalize it only when a full sentence follows.",
  },
  {
    question: "When should I use sentence case instead of title case?",
    answer:
      "Use sentence case for body text, interface labels and APA reference titles, and title case for the titles of works and for headings your style guide sets in title case.",
  },
]
