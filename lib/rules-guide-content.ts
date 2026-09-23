import type { ConversionType, TitleCaseStyle } from "./converters"
import { appendConverterContextToHref, type ConverterContext } from "./converter-context"

export type GuidanceStyle = Exclude<TitleCaseStyle, "standard"> | "standard"

/** The four published style guides the page compares. "Standard" is the converter's own default. */
export type PublishedStyle = Exclude<GuidanceStyle, "standard">

export const PUBLISHED_STYLES: PublishedStyle[] = ["ap", "apa", "mla", "chicago"]

export const STYLE_LABELS: Record<GuidanceStyle, string> = {
  standard: "Standard",
  ap: "AP",
  apa: "APA",
  mla: "MLA",
  chicago: "Chicago",
}

export interface GuidanceExample {
  caseLabel: string
  input: string
  outputs: Record<GuidanceStyle, string>
  whyItMatters: string
}

export interface RulesPageFAQ {
  question: string
  answer: string
  /** Where the full answer lives. Rendered under the answer, left out of the FAQ structured data. */
  link?: { href: string; label: string }
}

export interface RulesGuideViewModel {
  activeStyle: GuidanceStyle
  activeMode: string
  requestedStyle?: string
  didFallbackToStandard: boolean
  styleTitle: string
  styleSummary: string
  examples: GuidanceExample[]
  returnHref: string
  returnLabel: string
}

export interface RulesGuideHubViewModel extends RulesGuideViewModel {
  /** True when the visitor arrived with a style of their own, e.g. from the converter. */
  hasStyleFocus: boolean
  faqs: RulesPageFAQ[]
}

const STYLE_META: Record<GuidanceStyle, { title: string; summary: string }> = {
  standard: {
    title: "Standard title-case guidance",
    summary:
      "The converter's default: capitalize major words, lowercase articles, coordinating conjunctions and every preposition inside the title – the same preposition rule as MLA.",
  },
  ap: {
    title: "AP style guidance",
    summary:
      "AP capitalizes prepositions and conjunctions of four or more letters in composition titles. AP news headlines use sentence case instead.",
  },
  chicago: {
    title: "Chicago style guidance",
    summary:
      "Chicago (18th edition) capitalizes prepositions of five or more letters and keeps shorter prepositions and coordinating conjunctions lowercase inside the title.",
  },
  mla: {
    title: "MLA style guidance",
    summary:
      "MLA lowercases every preposition inside a title, however long it is, and capitalizes every other principal word.",
  },
  apa: {
    title: "APA style guidance",
    summary:
      "APA capitalizes every word of four or more letters in title case, and uses sentence case for article and book titles in the reference list.",
  },
}

/**
 * Where each guide states its title-case rule. Section numbers are only given
 * where the publisher itself cites them; MLA's is omitted on purpose.
 */
export const STYLE_SOURCES: Record<PublishedStyle, { name: string; url: string; edition: string }> = {
  ap: {
    name: "AP Stylebook",
    url: "https://www.apstylebook.com/",
    edition: "entries \"composition titles\" and \"headlines\"",
  },
  apa: {
    name: "APA Style: title case",
    url: "https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case",
    edition: "Publication Manual, 7th ed., section 6.17",
  },
  mla: {
    name: "MLA Style Center",
    url: "https://style.mla.org/two-word-prepositions-in-titles/",
    edition: "MLA Handbook, 9th ed.",
  },
  chicago: {
    name: "The Chicago Manual of Style",
    url: "https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles.html",
    edition: "18th ed., section 8.158",
  },
}

/** Rules every one of the four guides shares. Each sentence keeps the word or position as its subject. */
export const UNIVERSAL_RULES: string[] = [
  "The first word of a title is capitalized.",
  "The last word of a title is capitalized.",
  "The first word after a colon in a title is capitalized.",
  "Nouns, pronouns, verbs, adjectives and adverbs are capitalized at any length.",
  "Short verbs such as \"is\", \"are\" and \"be\" are capitalized, because part of speech outranks length.",
  "Articles (\"a\", \"an\", \"the\") stay lowercase inside a title.",
  "Proper nouns and acronyms keep their own form.",
]

export type Verdict = "Capitalize" | "Lowercase"

export interface DisagreementRow {
  wordType: string
  /** The word the row is about. Must appear exactly once in `probe`. */
  word: string
  /** A title that puts `word` in the position the row describes. */
  probe: string
  verdicts: Record<PublishedStyle, Verdict>
}

const ALL_CAPITALIZE: Record<PublishedStyle, Verdict> = { ap: "Capitalize", apa: "Capitalize", mla: "Capitalize", chicago: "Capitalize" }
const ALL_LOWERCASE: Record<PublishedStyle, Verdict> = { ap: "Lowercase", apa: "Lowercase", mla: "Lowercase", chicago: "Lowercase" }

/** The word-by-word comparison table. Each verdict is asserted against the engine. */
export const DISAGREEMENT_ROWS: DisagreementRow[] = [
  { wordType: "Preposition of 2–3 letters", word: "of", probe: "the art of war", verdicts: ALL_LOWERCASE },
  {
    wordType: "Preposition of 4 letters",
    word: "with",
    probe: "gone with the wind",
    verdicts: { ap: "Capitalize", apa: "Capitalize", mla: "Lowercase", chicago: "Lowercase" },
  },
  {
    wordType: "Preposition of 5+ letters",
    word: "between",
    probe: "the space between us",
    verdicts: { ap: "Capitalize", apa: "Capitalize", mla: "Lowercase", chicago: "Capitalize" },
  },
  { wordType: "Coordinating conjunction", word: "and", probe: "pride and prejudice", verdicts: ALL_LOWERCASE },
  { wordType: "Subordinating conjunction", word: "if", probe: "what if we tried", verdicts: ALL_CAPITALIZE },
  { wordType: "\"To\" before a verb", word: "to", probe: "how to write a headline", verdicts: ALL_LOWERCASE },
  { wordType: "Second part of a hyphenated compound", word: "report", probe: "self-report measures in clinical research", verdicts: ALL_CAPITALIZE },
  { wordType: "Word after a colon", word: "a", probe: "title case rules: a practical guide", verdicts: ALL_CAPITALIZE },
  { wordType: "Last word", word: "in", probe: "something to believe in", verdicts: ALL_CAPITALIZE },
]

export type ExampleId =
  | "fourStyles"
  | "anatomy"
  | "article"
  | "conjunction"
  | "phrasalVerb"
  | "infinitive"
  | "firstWord"
  | "subtitle"
  | "lastWord"
  | "hyphenated"
  | "stepByStep"
  | "irregular"
  | "acronyms"
  | "apComposition"
  | "mlaLength"
  | "chicagoEdition"
  | "allCaps"
  | "mixedCaps"

/**
 * Every title the page shows, with the output of each style. Kept as literals so
 * a reader of this file sees what the page claims; `rules-guide-content.test.ts`
 * and the style-guidance alignment QA assert each one against the engine.
 */
export const RULES_GUIDE_EXAMPLES: Record<ExampleId, GuidanceExample> = {
  fourStyles: {
    caseLabel: "One title, four style guides",
    input: "walking with ghosts through the old city",
    outputs: {
      standard: "Walking with Ghosts through the Old City",
      ap: "Walking With Ghosts Through the Old City",
      apa: "Walking With Ghosts Through the Old City",
      mla: "Walking with Ghosts through the Old City",
      chicago: "Walking with Ghosts Through the Old City",
    },
    whyItMatters: "A 4-letter and a 7-letter preposition in one title separate all three thresholds.",
  },
  anatomy: {
    caseLabel: "Title with a subtitle",
    input: "walking with ghosts through the old city: a guide to getting lost",
    outputs: {
      standard: "Walking with Ghosts through the Old City: A Guide to Getting Lost",
      ap: "Walking With Ghosts Through the Old City: A Guide to Getting Lost",
      apa: "Walking With Ghosts Through the Old City: A Guide to Getting Lost",
      mla: "Walking with Ghosts through the Old City: A Guide to Getting Lost",
      chicago: "Walking with Ghosts Through the Old City: A Guide to Getting Lost",
    },
    whyItMatters: "Every rule on the page in one title.",
  },
  article: {
    caseLabel: "Articles inside and at the start",
    input: "a room for the night",
    outputs: {
      standard: "A Room for the Night",
      ap: "A Room for the Night",
      apa: "A Room for the Night",
      mla: "A Room for the Night",
      chicago: "A Room for the Night",
    },
    whyItMatters: "The same article is capitalized first and lowercased inside.",
  },
  conjunction: {
    caseLabel: "Subordinating conjunction",
    input: "if you build it",
    outputs: {
      standard: "If You Build It",
      ap: "If You Build It",
      apa: "If You Build It",
      mla: "If You Build It",
      chicago: "If You Build It",
    },
    whyItMatters: "Subordinating conjunctions are major words in every guide.",
  },
  phrasalVerb: {
    caseLabel: "Preposition inside a phrasal verb",
    input: "log in to your account",
    outputs: {
      standard: "Log In to Your Account",
      ap: "Log In to Your Account",
      apa: "Log In to Your Account",
      mla: "Log In to Your Account",
      chicago: "Log In to Your Account",
    },
    whyItMatters: "\"In\" belongs to the verb, so no length threshold applies.",
  },
  infinitive: {
    caseLabel: "Infinitive \"to\"",
    input: "how to write a headline",
    outputs: {
      standard: "How to Write a Headline",
      ap: "How to Write a Headline",
      apa: "How to Write a Headline",
      mla: "How to Write a Headline",
      chicago: "How to Write a Headline",
    },
    whyItMatters: "\"To\" stays lowercase inside the title in every guide.",
  },
  firstWord: {
    caseLabel: "Small word in first position",
    input: "to kill a mockingbird",
    outputs: {
      standard: "To Kill a Mockingbird",
      ap: "To Kill a Mockingbird",
      apa: "To Kill a Mockingbird",
      mla: "To Kill a Mockingbird",
      chicago: "To Kill a Mockingbird",
    },
    whyItMatters: "Position outranks part of speech.",
  },
  subtitle: {
    caseLabel: "Subtitle after a colon",
    input: "title case rules: a practical guide",
    outputs: {
      standard: "Title Case Rules: A Practical Guide",
      ap: "Title Case Rules: A Practical Guide",
      apa: "Title Case Rules: A Practical Guide",
      mla: "Title Case Rules: A Practical Guide",
      chicago: "Title Case Rules: A Practical Guide",
    },
    whyItMatters: "The subtitle starts its own rule.",
  },
  lastWord: {
    caseLabel: "Preposition in last position",
    input: "something to believe in",
    outputs: {
      standard: "Something to Believe In",
      ap: "Something to Believe In",
      apa: "Something to Believe In",
      mla: "Something to Believe In",
      chicago: "Something to Believe In",
    },
    whyItMatters: "The last word is capitalized whatever it is.",
  },
  hyphenated: {
    caseLabel: "Hyphenated compound of two major words",
    input: "self-report measures in clinical research",
    outputs: {
      standard: "Self-Report Measures in Clinical Research",
      ap: "Self-Report Measures in Clinical Research",
      apa: "Self-Report Measures in Clinical Research",
      mla: "Self-Report Measures in Clinical Research",
      chicago: "Self-Report Measures in Clinical Research",
    },
    whyItMatters: "Both parts are major words, so both are capitalized.",
  },
  stepByStep: {
    caseLabel: "Hyphenated compound with a small word",
    input: "a step-by-step guide to editing",
    outputs: {
      standard: "A Step-by-Step Guide to Editing",
      ap: "A Step-by-Step Guide to Editing",
      apa: "A Step-by-Step Guide to Editing",
      mla: "A Step-by-Step Guide to Editing",
      chicago: "A Step-by-Step Guide to Editing",
    },
    whyItMatters: "The short preposition inside the compound stays lowercase.",
  },
  irregular: {
    caseLabel: "Brand names with irregular casing",
    input: "iPhone tips for eBay sellers",
    outputs: {
      standard: "iPhone Tips for eBay Sellers",
      ap: "iPhone Tips for eBay Sellers",
      apa: "iPhone Tips for eBay Sellers",
      mla: "iPhone Tips for eBay Sellers",
      chicago: "iPhone Tips for eBay Sellers",
    },
    whyItMatters: "A capital letter after the first position marks deliberate casing.",
  },
  acronyms: {
    caseLabel: "Acronyms",
    input: "NASA grants for PhD students",
    outputs: {
      standard: "NASA Grants for PhD Students",
      ap: "NASA Grants for PhD Students",
      apa: "NASA Grants for PhD Students",
      mla: "NASA Grants for PhD Students",
      chicago: "NASA Grants for PhD Students",
    },
    whyItMatters: "Acronyms keep their form in every guide.",
  },
  apComposition: {
    caseLabel: "AP composition title",
    input: "gone with the wind",
    outputs: {
      standard: "Gone with the Wind",
      ap: "Gone With the Wind",
      apa: "Gone With the Wind",
      mla: "Gone with the Wind",
      chicago: "Gone with the Wind",
    },
    whyItMatters: "\"With\" sits exactly on AP's four-letter line.",
  },
  mlaLength: {
    caseLabel: "Long preposition under MLA",
    input: "the space between us",
    outputs: {
      standard: "The Space between Us",
      ap: "The Space Between Us",
      apa: "The Space Between Us",
      mla: "The Space between Us",
      chicago: "The Space Between Us",
    },
    whyItMatters: "MLA ignores length, so a 7-letter preposition stays lowercase.",
  },
  chicagoEdition: {
    caseLabel: "Chicago 18th edition threshold",
    input: "much ado about nothing",
    outputs: {
      standard: "Much Ado about Nothing",
      ap: "Much Ado About Nothing",
      apa: "Much Ado About Nothing",
      mla: "Much Ado about Nothing",
      chicago: "Much Ado About Nothing",
    },
    whyItMatters: "Before the 18th edition Chicago wrote \"about\" in lowercase.",
  },
  allCaps: {
    caseLabel: "Text pasted in all caps",
    input: "THE MAN WHO SOLD THE WORLD",
    outputs: {
      standard: "The Man Who Sold the World",
      ap: "The Man Who Sold the World",
      apa: "The Man Who Sold the World",
      mla: "The Man Who Sold the World",
      chicago: "The Man Who Sold the World",
    },
    whyItMatters: "In all-caps input the casing carries no information.",
  },
  mixedCaps: {
    caseLabel: "Acronym in mixed-case input",
    input: "the NBA finals explained",
    outputs: {
      standard: "The NBA Finals Explained",
      ap: "The NBA Finals Explained",
      apa: "The NBA Finals Explained",
      mla: "The NBA Finals Explained",
      chicago: "The NBA Finals Explained",
    },
    whyItMatters: "In mixed-case input an all-caps word is a deliberate signal.",
  },
}

/**
 * The rule that decides each word of the anatomy example, in order. The page
 * pairs these with the words of its MLA output, so the counts must match.
 */
export const ANATOMY_RULES: { rule: string; differsByStyle: boolean }[] = [
  { rule: "First word", differsByStyle: false },
  { rule: "4-letter preposition", differsByStyle: true },
  { rule: "Noun", differsByStyle: false },
  { rule: "7-letter preposition", differsByStyle: true },
  { rule: "Article", differsByStyle: false },
  { rule: "Adjective", differsByStyle: false },
  { rule: "Noun", differsByStyle: false },
  { rule: "After a colon", differsByStyle: false },
  { rule: "Noun", differsByStyle: false },
  { rule: "Infinitive \"to\"", differsByStyle: false },
  { rule: "Verb", differsByStyle: false },
  { rule: "Last word", differsByStyle: false },
]

/** APA reference entries: the one sentence-case conversion the page shows. */
export const SENTENCE_CASE_EXAMPLE = {
  input: "Self-Report Measures in Clinical Research",
  output: "Self-report measures in clinical research",
}

/** Rule labels the converter prints next to each changed word, quoted verbatim on the page. */
export const ENGINE_REASON_SAMPLES: string[] = [
  "Preposition (MLA style)",
  "AP style: preposition with 4+ letters",
  "Chicago style (18th ed.): preposition with 5+ letters",
  "Infinitive marker stays lowercase",
  "First word after colon is capitalized",
  "Last word is always capitalized",
]

export const RULES_PAGE_FAQS: RulesPageFAQ[] = [
  {
    question: "What words are not capitalized in a title?",
    answer:
      "Articles (a, an, the), coordinating conjunctions (and, but, or, nor, for, yet, so) and short prepositions stay lowercase inside a title in every major style guide. Longer prepositions depend on the guide: AP and APA capitalize them from four letters, Chicago from five, and MLA never does.",
    link: { href: "/blog/what-words-are-not-capitalized-in-a-title", label: "What Words Are Not Capitalized in a Title?" },
  },
  {
    question: "Do I capitalize both parts of a hyphenated word in a title?",
    answer:
      "Yes, when both parts are major words, as in \"Self-Report\". A short preposition, article or conjunction inside the compound stays lowercase, as in \"Step-by-Step\".",
  },
  {
    question: "Which capitalization style guide should I use?",
    answer:
      "Use the one your publication or institution requires. Journalism uses AP, psychology and the social sciences use APA, the humanities use MLA, and book publishing uses Chicago.",
  },
  {
    question: "Should \"is\" be capitalized in a title?",
    answer:
      "Yes. \"Is\" is a verb, and every major style guide capitalizes verbs in a title regardless of their length.",
  },
  {
    question: "Should I use title case or sentence case?",
    answer:
      "Follow your style guide first: APA, for example, uses title case for headings and sentence case for titles in the reference list. Outside a style guide, title case reads as formal and sentence case as conversational.",
    link: { href: "/blog/sentence-vs-title-case", label: "Title Case vs Sentence Case: Which to Use and When" },
  },
]

const MODE_TO_RETURN_HREF: Partial<Record<ConversionType, string>> = {
  title: "/",
  sentence: "/sentence-case-converter",
  lower: "/lower-case-converter",
  upper: "/upper-case-converter",
  camel: "/camel-case-converter",
  pascal: "/pascal-case-converter",
  snake: "/snake-case-converter",
  kebab: "/slug-generator",
  alternating: "/alternating-case-converter",
}

const MODE_TO_RETURN_LABEL: Partial<Record<ConversionType, string>> = {
  title: "Return to Title Case Converter",
  sentence: "Return to Sentence Case Converter",
  lower: "Return to lower case converter",
  upper: "Return to UPPER CASE converter",
  camel: "Return to camelCase converter",
  pascal: "Return to PascalCase converter",
  snake: "Return to snake_case converter",
  kebab: "Return to slug generator",
  alternating: "Return to alternating-case converter",
}

function normalizeStyle(styleParam?: string): { style: GuidanceStyle; didFallbackToStandard: boolean } {
  const value = (styleParam ?? "standard").toLowerCase()
  if (value === "ap" || value === "apa" || value === "mla" || value === "chicago" || value === "standard") {
    return { style: value, didFallbackToStandard: false }
  }
  return { style: "standard", didFallbackToStandard: true }
}

export function getRulesGuideViewModel(styleParam?: string, modeParam?: string): RulesGuideViewModel {
  const normalizedStyle = normalizeStyle(styleParam)
  const activeStyle = normalizedStyle.style
  const styleMeta = STYLE_META[activeStyle]
  const activeMode = (modeParam ?? "title").toLowerCase()
  const returnHref = MODE_TO_RETURN_HREF[activeMode as ConversionType] ?? "/"
  const returnLabel =
    MODE_TO_RETURN_LABEL[activeMode as ConversionType] ?? "Return to Title Case Converter"

  return {
    activeStyle,
    activeMode,
    requestedStyle: styleParam,
    didFallbackToStandard: normalizedStyle.didFallbackToStandard,
    styleTitle: styleMeta.title,
    styleSummary: styleMeta.summary,
    examples: Object.values(RULES_GUIDE_EXAMPLES),
    returnHref,
    returnLabel,
  }
}

export function getRulesGuideViewModelWithContext(
  styleParam?: string,
  modeParam?: string,
  converterContext?: ConverterContext | null
): RulesGuideViewModel {
  const model = getRulesGuideViewModel(styleParam, modeParam)
  if (!converterContext) return model

  return {
    ...model,
    returnHref: appendConverterContextToHref(model.returnHref, converterContext),
  }
}

export function getRulesGuideHubViewModel(
  styleParam?: string,
  modeParam?: string,
  converterContext?: ConverterContext | null
): RulesGuideHubViewModel {
  const base = converterContext
    ? getRulesGuideViewModelWithContext(styleParam, modeParam, converterContext)
    : getRulesGuideViewModel(styleParam, modeParam)

  return {
    ...base,
    hasStyleFocus: styleParam !== undefined,
    faqs: RULES_PAGE_FAQS,
  }
}
