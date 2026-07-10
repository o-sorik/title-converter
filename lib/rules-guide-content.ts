import type { ConversionType, TitleCaseStyle } from "./converters"
import { appendConverterContextToHref, type ConverterContext } from "./converter-context"
import { SITE_URL } from "@/lib/constants"

export type GuidanceStyle = Exclude<TitleCaseStyle, "standard"> | "standard"

export interface GuidanceExample {
  caseLabel: string
  input: string
  outputs: Record<GuidanceStyle, string>
  whyItMatters: string
}

export interface StyleGuideSection {
  id: GuidanceStyle
  name: string
  fullName: string
  description: string
  keyRules: string[]
  sourceUrl: string
  sourceName: string
  editionNote: string
}

export interface ComparisonScenario {
  scenario: string
  example: string
  results: Record<GuidanceStyle, string>
  notes: string
}

export interface RulesPageFAQ {
  question: string
  answer: string
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
  styleGuides: StyleGuideSection[]
  comparisonScenarios: ComparisonScenario[]
  faqs: RulesPageFAQ[]
}

const STYLE_META: Record<GuidanceStyle, { title: string; summary: string }> = {
  standard: {
    title: "Standard title-case guidance",
    summary:
      "Balanced defaults: capitalize major words, lowercase most short connectors in middle positions, always capitalize first/last word.",
  },
  ap: {
    title: "AP style guidance",
    summary:
      "AP capitalizes prepositions and conjunctions with four or more letters in titles; shorter connectors are lowercased in the middle.",
  },
  chicago: {
    title: "Chicago style guidance",
    summary:
      "Chicago (18th edition, 2024) capitalizes prepositions of five or more letters and keeps shorter prepositions and conjunctions lowercase in middle positions.",
  },
  mla: {
    title: "MLA style guidance",
    summary:
      "MLA lowercases all prepositions regardless of length – the strictest of the major guides – while capitalizing every other principal word.",
  },
  apa: {
    title: "APA style guidance",
    summary:
      "APA typically capitalizes prepositions and conjunctions with four or more letters; shorter ones are lowercased in middle positions.",
  },
}

export const STYLE_GUIDE_SECTIONS: StyleGuideSection[] = [
  {
    id: "ap",
    name: "AP",
    fullName: "Associated Press Stylebook",
    description:
      "The AP Stylebook is the primary reference for journalists, newsrooms, and digital media. It favors readability and consistency in headline casing, capitalizing longer prepositions while keeping short function words lowercase.",
    keyRules: [
      "Capitalize words with 4 or more letters, including prepositions and conjunctions",
      "Lowercase articles (a, an, the) in middle positions",
      "Always capitalize the first and last word of the title",
      "Capitalize both parts of hyphenated compounds in most cases",
    ],
    sourceUrl: "https://www.apstylebook.com/",
    sourceName: "AP Stylebook",
    editionNote: "56th Edition (2024)",
  },
  {
    id: "apa",
    name: "APA",
    fullName: "APA Publication Manual",
    description:
      "The APA Publication Manual is the standard for academic and scientific writing. Its title case rules capitalize words of four or more letters, creating a slightly more capitalized look than AP style.",
    keyRules: [
      "Capitalize words with 4 or more letters, including prepositions and conjunctions",
      "Lowercase short conjunctions (and, but, or, nor, yet, so, for) under 4 letters",
      "Lowercase short prepositions (at, by, in, of, on, to, up) under 4 letters",
      "Always capitalize the first word after a colon, dash, or end punctuation",
    ],
    sourceUrl: "https://apastyle.apa.org/",
    sourceName: "APA Style",
    editionNote: "7th Edition (2019)",
  },
  {
    id: "mla",
    name: "MLA",
    fullName: "MLA Handbook",
    description:
      "The MLA Handbook serves humanities scholars and literature students. Its title case conventions are the strictest of the major guides: all prepositions stay lowercase in middle positions regardless of length.",
    keyRules: [
      "Capitalize the first and last word of the title and subtitle",
      "Lowercase articles, prepositions, and coordinating conjunctions in middle positions",
      "Lowercase all prepositions regardless of length, even long ones like \"between\" or \"through\"",
      "Capitalize the first word after a colon",
    ],
    sourceUrl: "https://www.mla.org/",
    sourceName: "MLA Handbook",
    editionNote: "9th Edition (2021)",
  },
  {
    id: "chicago",
    name: "Chicago",
    fullName: "The Chicago Manual of Style",
    description:
      "The Chicago Manual of Style is the gold standard for book publishing and formal editorial work. The 18th edition (2024) capitalizes prepositions of five or more letters, while shorter prepositions and conjunctions stay lowercase in middle positions.",
    keyRules: [
      "Lowercase articles (a, an, the) in middle positions",
      "Lowercase coordinating conjunctions (and, but, or, nor, yet, so, for)",
      "Lowercase prepositions of four or fewer letters; capitalize prepositions of five or more letters (18th ed.)",
      "Always capitalize the first and last word of title and subtitle",
    ],
    sourceUrl: "https://www.chicagomanualofstyle.org/",
    sourceName: "Chicago Manual of Style",
    editionNote: "18th Edition (2024)",
  },
  {
    id: "standard",
    name: "Standard",
    fullName: "Standard Title Case",
    description:
      "Standard title case is a balanced default used when no specific style guide is required. It follows broadly accepted conventions: capitalizing major words while lowercasing most short function words in middle positions.",
    keyRules: [
      "Capitalize major words (nouns, verbs, adjectives, adverbs)",
      "Lowercase articles, short prepositions, and short conjunctions in middle positions",
      "Always capitalize the first and last word",
      "Capitalize words after colons and major punctuation",
    ],
    sourceUrl: `${SITE_URL}/capitalization-rules-guide`,
    sourceName: "Title Case Converter",
    editionNote: "General convention",
  },
]

export const COMPARISON_SCENARIOS: ComparisonScenario[] = [
  {
    scenario: "Long preposition: \"across\" (6 letters)",
    example: "running across the bridge at night",
    results: {
      standard: "Running across the Bridge at Night",
      ap: "Running Across the Bridge at Night",
      apa: "Running Across the Bridge at Night",
      mla: "Running across the Bridge at Night",
      chicago: "Running Across the Bridge at Night",
    },
    notes: "AP, APA, and Chicago (18th ed.) capitalize \"across\" – it clears every length threshold. Standard and MLA keep it lowercase.",
  },
  {
    scenario: "Long preposition: \"between\" (7 letters)",
    example: "the cat is between the boxes",
    results: {
      standard: "The Cat Is between the Boxes",
      ap: "The Cat Is Between the Boxes",
      apa: "The Cat Is Between the Boxes",
      mla: "The Cat Is between the Boxes",
      chicago: "The Cat Is Between the Boxes",
    },
    notes: "AP, APA, and Chicago (18th ed.) capitalize \"between\" (7 letters). MLA keeps all prepositions lowercase regardless of length.",
  },
  {
    scenario: "Short preposition: \"with\" (4 letters)",
    example: "writing with confidence and purpose",
    results: {
      standard: "Writing with Confidence and Purpose",
      ap: "Writing With Confidence and Purpose",
      apa: "Writing With Confidence and Purpose",
      mla: "Writing with Confidence and Purpose",
      chicago: "Writing with Confidence and Purpose",
    },
    notes: "AP and APA capitalize \"with\" (4-letter threshold). Standard, MLA, and Chicago (5+ letters) keep it lowercase.",
  },
  {
    scenario: "Short preposition: \"from\" (4 letters)",
    example: "ideas from around the world",
    results: {
      standard: "Ideas from around the World",
      ap: "Ideas From Around the World",
      apa: "Ideas From Around the World",
      mla: "Ideas from around the World",
      chicago: "Ideas from Around the World",
    },
    notes: "AP and APA capitalize both \"from\" (4 letters) and \"around\" (6 letters). Chicago capitalizes only \"around\" (5+ letters), so \"from\" stays lowercase.",
  },
  {
    scenario: "Subtitle after colon",
    example: "title case rules: a practical guide",
    results: {
      standard: "Title Case Rules: A Practical Guide",
      ap: "Title Case Rules: A Practical Guide",
      apa: "Title Case Rules: A Practical Guide",
      mla: "Title Case Rules: A Practical Guide",
      chicago: "Title Case Rules: A Practical Guide",
    },
    notes: "All styles agree: the first word after a colon is always capitalized, even articles like \"a\".",
  },
  {
    scenario: "Preposition \"about\" (5 letters)",
    example: "the rules about writing and thinking",
    results: {
      standard: "The Rules about Writing and Thinking",
      ap: "The Rules About Writing and Thinking",
      apa: "The Rules About Writing and Thinking",
      mla: "The Rules about Writing and Thinking",
      chicago: "The Rules About Writing and Thinking",
    },
    notes: "\"About\" hits Chicago's 5-letter threshold exactly, so AP (4+), APA (4+), and Chicago (5+) all capitalize it. Standard and MLA do not.",
  },
  {
    scenario: "Preposition \"after\" (5 letters)",
    example: "she walked along the river after lunch",
    results: {
      standard: "She Walked Along the River after Lunch",
      ap: "She Walked Along the River After Lunch",
      apa: "She Walked Along the River After Lunch",
      mla: "She Walked Along the River after Lunch",
      chicago: "She Walked Along the River After Lunch",
    },
    notes: "\"Along\" reads as part of the verb here, so every style capitalizes it. \"After\" (5 letters) splits AP, APA, and Chicago from standard and MLA.",
  },
]

export const RULES_PAGE_FAQS: RulesPageFAQ[] = [
  {
    question: "Which capitalization style should I use?",
    answer: "Use the style required by your publication or institution. AP style is standard for journalism and news, APA for academic and scientific papers, MLA for humanities essays, and Chicago for book publishing and formal editorial work.",
  },
  {
    question: "What is the main difference between AP and Chicago title case?",
    answer: "The key difference is how they treat longer prepositions. AP capitalizes prepositions with 5 or more letters (like \"Between\" and \"Through\"), while Chicago keeps all prepositions lowercase in middle positions regardless of length.",
  },
  {
    question: "Should I capitalize \"is\" in a title?",
    answer: "Yes. \"Is\" is a verb (a form of \"to be\"), and all major styles agree that verbs should always be capitalized in titles, even short ones.",
  },
  {
    question: "Are there words that are always lowercase in titles?",
    answer: "No word is always lowercase. Even articles like \"a\", \"an\", and \"the\" are capitalized when they appear as the first or last word of a title. In middle positions, articles, short prepositions, and short conjunctions are typically lowercase across all styles.",
  },
  {
    question: "How do I capitalize a hyphenated word in a title?",
    answer: "Most styles capitalize the first element of a hyphenated compound. For subsequent elements, capitalize them if they are major words (nouns, verbs, adjectives). Keep small function words lowercase, such as \"State-of-the-Art\" where \"of\" and \"the\" stay lowercase.",
  },
]

const EDGE_CASE_EXAMPLES: GuidanceExample[] = [
  {
    caseLabel: "Short connectors and prepositions",
    input: "walking during the light",
    outputs: {
      standard: "Walking during the Light",
      ap: "Walking During the Light",
      chicago: "Walking During the Light",
      mla: "Walking during the Light",
      apa: "Walking During the Light",
    },
    whyItMatters:
      "The word 'during' changes across styles and is a common source of editorial inconsistency. Chicago's 18th edition (2024) now capitalizes it too.",
  },
  {
    caseLabel: "Subtitle after colon",
    input: "title case rules: a practical guide for editors",
    outputs: {
      standard: "Title Case Rules: A Practical Guide for Editors",
      ap: "Title Case Rules: A Practical Guide for Editors",
      chicago: "Title Case Rules: A Practical Guide for Editors",
      mla: "Title Case Rules: A Practical Guide for Editors",
      apa: "Title Case Rules: A Practical Guide for Editors",
    },
    whyItMatters:
      "Subtitles should start clearly after punctuation so the user has a reliable next edit decision.",
  },
  {
    caseLabel: "Hyphenated and branded wording",
    input: "state-of-the-art workflows for iPhone launches",
    outputs: {
      standard: "State-of-the-Art Workflows for iPhone Launches",
      ap: "State-of-the-Art Workflows for iPhone Launches",
      chicago: "State-of-the-Art Workflows for iPhone Launches",
      mla: "State-of-the-Art Workflows for iPhone Launches",
      apa: "State-of-the-Art Workflows for iPhone Launches",
    },
    whyItMatters:
      "Hyphenation and brand casing are frequent edge cases where users should verify output quickly before publishing.",
  },
  {
    caseLabel: "Infinitive \"to\" vs preposition \"to\"",
    input: "to be or not to be",
    outputs: {
      standard: "To Be or Not to Be",
      ap: "To Be or Not to Be",
      chicago: "To Be or Not to Be",
      mla: "To Be or Not to Be",
      apa: "To Be or Not to Be",
    },
    whyItMatters:
      "\"To\" as the first word is always capitalized. In middle positions, all styles lowercase it whether used as an infinitive marker or preposition.",
  },
  {
    caseLabel: "Short verb \"is\" in the middle",
    input: "she is an editor-in-chief",
    outputs: {
      standard: "She Is an Editor-in-Chief",
      ap: "She Is an Editor-in-Chief",
      chicago: "She Is an Editor-in-Chief",
      mla: "She Is an Editor-in-Chief",
      apa: "She Is an Editor-in-Chief",
    },
    whyItMatters:
      "\"Is\" is a verb, not a preposition or conjunction, so all styles capitalize it. Many writers mistakenly lowercase short verbs.",
  },
  {
    caseLabel: "4-letter preposition \"with\"",
    input: "writing with confidence and purpose",
    outputs: {
      standard: "Writing with Confidence and Purpose",
      ap: "Writing With Confidence and Purpose",
      chicago: "Writing with Confidence and Purpose",
      mla: "Writing with Confidence and Purpose",
      apa: "Writing With Confidence and Purpose",
    },
    whyItMatters:
      "The 4-letter threshold in AP and APA capitalizes \"with,\" while Chicago (5+ letters) and MLA (all prepositions lowercase) keep it lowercase. It is the most common boundary word.",
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
    examples: EDGE_CASE_EXAMPLES,
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
    styleGuides: STYLE_GUIDE_SECTIONS,
    comparisonScenarios: COMPARISON_SCENARIOS,
    faqs: RULES_PAGE_FAQS,
  }
}
