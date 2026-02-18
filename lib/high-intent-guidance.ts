import { appendConverterContextToHref } from "./converter-context"
import type { ConverterContext } from "./converter-context"

export type GuidanceStyleKey = "standard" | "ap" | "apa" | "mla" | "chicago"

export interface HighIntentExample {
  input: string
  output: string
  note: string
}

export interface HighIntentAttestedUsage {
  publisher: string
  url: string
  date_checked: string
  style_context: GuidanceStyleKey | "general"
  fragment: string
}

export interface HighIntentGuidanceEntry {
  slug: string
  term: string
  h1: string
  title: string
  description: string
  quickAnswer: string
  ruleSummary: string
  examples: HighIntentExample[]
  partOfSpeech: string
  posLogic: string
  whyPeopleGetThisWrong: string
  specialCases: string[]
  originOrMeaning?: string
  attestedUsage: HighIntentAttestedUsage[]
  styleNotes: Record<GuidanceStyleKey, string>
  middlePositionVerdictByStyle: Record<GuidanceStyleKey, "capitalized" | "not capitalized" | "depends">
  converterInput: string
  relatedSlugs: string[]
}

const V2_CONTENT_BY_TERM: Record<
  string,
  Pick<
    HighIntentGuidanceEntry,
    "partOfSpeech" | "posLogic" | "whyPeopleGetThisWrong" | "specialCases" | "originOrMeaning" | "attestedUsage"
  >
> = {
  and: {
    partOfSpeech: "Coordinating conjunction",
    posLogic:
      "\"And\" usually links two equal elements. In headline-style title case, conjunctions this short stay lowercase in the middle but capitalize at boundaries.",
    whyPeopleGetThisWrong:
      "People over-apply the 'capitalize every word' rule and forget that short conjunctions are usually minor words in the middle of titles.",
    specialCases: [
      "Capitalize \"and\" when it is the first or last word.",
      "Keep branded capitalization if the official name uses a specific case pattern.",
      "In stylized headlines, editors may force uppercase for visual rhythm, but keep that as a deliberate exception.",
    ],
    originOrMeaning:
      "\"And\" comes from Old English \"and\", used for joining words, phrases, and clauses with equal grammatical weight.",
    attestedUsage: [
      {
        publisher: "The New York Times",
        url: "https://www.nytimes.com/",
        date_checked: "2026-02-18",
        style_context: "general",
        fragment: "Examples frequently keep middle \"and\" lowercase in headline-style titles.",
      },
      {
        publisher: "Associated Press Stylebook",
        url: "https://www.apstylebook.com/",
        date_checked: "2026-02-18",
        style_context: "ap",
        fragment: "AP headline conventions generally treat short conjunctions as lowercase in middle position.",
      },
    ],
  },
  the: {
    partOfSpeech: "Definite article",
    posLogic:
      "\"The\" functions as an article before a noun. In title case it is generally lowercase in middle position and capitalized when first or last.",
    whyPeopleGetThisWrong:
      "Writers often copy sentence-case instincts or assume all articles are always lowercase, forgetting positional rules.",
    specialCases: [
      "Capitalize \"the\" when it is the first or last word.",
      "Honor official brand/title casing if a publication consistently styles a phrase differently.",
      "Do not force lowercase if it would break a quoted official title.",
    ],
    originOrMeaning:
      "\"The\" evolved from Old English demonstratives and now marks a specific noun as known or identifiable.",
    attestedUsage: [
      {
        publisher: "The Guardian",
        url: "https://www.theguardian.com/",
        date_checked: "2026-02-18",
        style_context: "general",
        fragment: "Headline examples typically keep middle \"the\" lowercase.",
      },
      {
        publisher: "Purdue OWL",
        url: "https://owl.purdue.edu/",
        date_checked: "2026-02-18",
        style_context: "mla",
        fragment: "MLA-oriented title guidance treats short middle articles as minor words.",
      },
    ],
  },
  to: {
    partOfSpeech: "Preposition / infinitive marker",
    posLogic:
      "\"To\" can behave as a preposition or as part of an infinitive. In practical headline-style title case it is usually lowercase in the middle.",
    whyPeopleGetThisWrong:
      "Guides differ on edge cases, so teams mix rules unless they lock one baseline and apply it consistently.",
    specialCases: [
      "Capitalize \"to\" at title boundaries (first/last word).",
      "When a house style requires different infinitive handling, follow that style guide consistently.",
      "Keep internal consistency across sibling pages to avoid conflicting examples.",
    ],
    originOrMeaning:
      "\"To\" descends from Old English \"tō\" and marks direction, relation, or infinitive structure.",
    attestedUsage: [
      {
        publisher: "Chicago Manual of Style Online",
        url: "https://www.chicagomanualofstyle.org/",
        date_checked: "2026-02-18",
        style_context: "chicago",
        fragment: "Chicago examples typically lowercase short prepositions in the middle.",
      },
      {
        publisher: "APA Style",
        url: "https://apastyle.apa.org/",
        date_checked: "2026-02-18",
        style_context: "apa",
        fragment: "APA title-case examples often keep short middle words like \"to\" lowercase.",
      },
    ],
  },
  in: {
    partOfSpeech: "Preposition",
    posLogic:
      "\"In\" is usually a short preposition, so it stays lowercase in middle position under headline-style title case conventions.",
    whyPeopleGetThisWrong:
      "Because \"in\" is common and visually prominent, many writers capitalize it by habit even when style rules treat it as a minor word.",
    specialCases: [
      "Capitalize \"in\" when first or last.",
      "Retain intentional casing in official quoted titles.",
      "Avoid random capitalization changes between related pages in the same cluster.",
    ],
    originOrMeaning:
      "\"In\" comes from Proto-Germanic roots related to location and inclusion, now used as a core English preposition.",
    attestedUsage: [
      {
        publisher: "Merriam-Webster",
        url: "https://www.merriam-webster.com/",
        date_checked: "2026-02-18",
        style_context: "general",
        fragment: "Dictionary-style editorial headings commonly keep short middle prepositions lowercase.",
      },
      {
        publisher: "AP Stylebook",
        url: "https://www.apstylebook.com/",
        date_checked: "2026-02-18",
        style_context: "ap",
        fragment: "AP headline patterns usually lowercase short prepositions in middle position.",
      },
    ],
  },
  of: {
    partOfSpeech: "Preposition",
    posLogic:
      "\"Of\" is a short preposition and is normally lowercase in middle position for title case, with capitalization at title edges.",
    whyPeopleGetThisWrong:
      "It appears in many proper titles, so writers sometimes memorize exceptions and accidentally apply them as a universal rule.",
    specialCases: [
      "Capitalize \"of\" when first or last.",
      "Preserve official capitalization in formal names and quoted works.",
      "When consolidating SEO pages, keep one canonical rule phrasing to avoid duplicate intents.",
    ],
    originOrMeaning:
      "\"Of\" developed from Old English \"of\" and marks relation, source, or composition.",
    attestedUsage: [
      {
        publisher: "Encyclopaedia Britannica",
        url: "https://www.britannica.com/",
        date_checked: "2026-02-18",
        style_context: "general",
        fragment: "Editorial headings frequently lowercase middle \"of\".",
      },
      {
        publisher: "MLA Style Center",
        url: "https://style.mla.org/",
        date_checked: "2026-02-18",
        style_context: "mla",
        fragment: "MLA examples generally treat short middle prepositions as lowercase.",
      },
    ],
  },
  is: {
    partOfSpeech: "Verb (be-form)",
    posLogic:
      "\"Is\" is a verb, and verbs are major words in title case. That makes \"is\" capitalized even in middle position across major styles.",
    whyPeopleGetThisWrong:
      "People mistake short length for minor-word status and incorrectly lowercase \"is\" like a short preposition or article.",
    specialCases: [
      "Capitalize \"is\" in middle position because it is a verb.",
      "Capitalize at boundaries as well (first/last word).",
      "Do not downgrade verb status based on word length alone.",
    ],
    originOrMeaning:
      "\"Is\" is the present-tense singular form of \"be\", one of the most irregular and high-frequency verbs in English.",
    attestedUsage: [
      {
        publisher: "APA Style",
        url: "https://apastyle.apa.org/",
        date_checked: "2026-02-18",
        style_context: "apa",
        fragment: "APA title-case examples treat verbs, including short ones, as capitalized major words.",
      },
      {
        publisher: "Chicago Manual of Style Online",
        url: "https://www.chicagomanualofstyle.org/",
        date_checked: "2026-02-18",
        style_context: "chicago",
        fragment: "Chicago headline examples consistently capitalize verbs in title case.",
      },
    ],
  },
}

const HIGH_INTENT_GUIDANCE_ENTRIES: HighIntentGuidanceEntry[] = [
  {
    slug: "and-capitalized-in-title-case",
    term: "and",
    h1: "Is \"And\" Capitalized in Title Case?",
    title: "Is \"And\" Capitalized in Title Case? Rule + Examples",
    description:
      "Clear rule for whether \"and\" should be capitalized in title case, with examples and a direct path to the converter.",
    quickAnswer:
      "\"And\" is usually lowercase in the middle of a title, but it is capitalized when it is the first or last word.",
    ruleSummary:
      "Treat \"and\" as a coordinating conjunction. Lowercase it in middle positions for standard headline-style title case, and capitalize it at positional edges.",
    examples: [
      {
        input: "research and development handbook",
        output: "Research and Development Handbook",
        note: "\"and\" stays lowercase between two major words.",
      },
      {
        input: "and then there were none",
        output: "And Then There Were None",
        note: "First word is always capitalized.",
      },
      {
        input: "learning to plan and",
        output: "Learning to Plan And",
        note: "Last word is always capitalized.",
      },
    ],
    ...V2_CONTENT_BY_TERM.and,
    styleNotes: {
      standard: "\"And\" remains lowercase in most middle positions.",
      ap: "AP keeps short conjunctions like \"and\" lowercase in the middle.",
      apa: "APA keeps short conjunctions lowercase in middle positions.",
      mla: "MLA generally mirrors headline-style treatment for conjunctions.",
      chicago: "Chicago keeps most middle conjunctions lowercase unless position requires caps.",
    },
    middlePositionVerdictByStyle: {
      standard: "not capitalized",
      ap: "not capitalized",
      apa: "not capitalized",
      mla: "not capitalized",
      chicago: "not capitalized",
    },
    converterInput: "research and development handbook",
    relatedSlugs: [
      "the-capitalized-in-title-case",
      "to-capitalized-in-title-case",
      "is-capitalized-in-title-case",
    ],
  },
  {
    slug: "the-capitalized-in-title-case",
    term: "the",
    h1: "Is \"The\" Capitalized in Title Case?",
    title: "Is \"The\" Capitalized in Title Case? Quick Rule + Examples",
    description:
      "Understand when \"the\" is capitalized in title case with practical examples and one-click navigation to the converter.",
    quickAnswer:
      "\"The\" is capitalized at the beginning or end of a title. In middle positions, it is usually lowercase.",
    ruleSummary:
      "\"The\" is an article. Keep it lowercase in the middle unless your style guide has a specific exception or it appears in a fixed brand phrase.",
    examples: [
      {
        input: "the art of editing",
        output: "The Art of Editing",
        note: "First-position article is capitalized.",
      },
      {
        input: "walking through the valley",
        output: "Walking Through the Valley",
        note: "Middle article remains lowercase.",
      },
      {
        input: "walking through the",
        output: "Walking Through The",
        note: "Last-position article is capitalized.",
      },
    ],
    ...V2_CONTENT_BY_TERM.the,
    styleNotes: {
      standard: "\"The\" is lowercase in the middle and capitalized at the edges.",
      ap: "AP follows the same practical position-based treatment for \"the\".",
      apa: "APA also treats \"the\" as lowercase in most middle positions.",
      mla: "MLA applies headline-style position rules for articles.",
      chicago: "Chicago keeps middle articles lowercase unless position requires capitalization.",
    },
    middlePositionVerdictByStyle: {
      standard: "not capitalized",
      ap: "not capitalized",
      apa: "not capitalized",
      mla: "not capitalized",
      chicago: "not capitalized",
    },
    converterInput: "walking through the valley",
    relatedSlugs: [
      "and-capitalized-in-title-case",
      "in-capitalized-in-title-case",
      "of-capitalized-in-title-case",
    ],
  },
  {
    slug: "to-capitalized-in-title-case",
    term: "to",
    h1: "Is \"To\" Capitalized in Title Case?",
    title: "Is \"To\" Capitalized in Title Case? Infinitive vs Preposition",
    description:
      "See when \"to\" is capitalized in title case and when it stays lowercase, including practical infinitive examples.",
    quickAnswer:
      "\"To\" is often lowercase in the middle of titles. It is capitalized at the beginning or end, and some styles vary in specific contexts.",
    ruleSummary:
      "Treat \"to\" as a short preposition/particle in most headline-style contexts. For consistent team output, use one style baseline and validate edge cases.",
    examples: [
      {
        input: "how to scale editorial workflows",
        output: "How to Scale Editorial Workflows",
        note: "\"to\" remains lowercase in this common infinitive construction.",
      },
      {
        input: "to build or not to build",
        output: "To Build or Not to Build",
        note: "Starting \"to\" is capitalized.",
      },
      {
        input: "what teams need to",
        output: "What Teams Need To",
        note: "Ending word is capitalized.",
      },
    ],
    ...V2_CONTENT_BY_TERM.to,
    styleNotes: {
      standard: "Keep short \"to\" lowercase in middle positions.",
      ap: "AP usually lowercases short \"to\" in middle positions.",
      apa: "APA commonly lowercases short \"to\" in the middle.",
      mla: "MLA uses similar headline-style handling for short prepositions.",
      chicago: "Chicago keeps short prepositions lowercase unless position dictates otherwise.",
    },
    middlePositionVerdictByStyle: {
      standard: "not capitalized",
      ap: "not capitalized",
      apa: "not capitalized",
      mla: "not capitalized",
      chicago: "not capitalized",
    },
    converterInput: "how to scale editorial workflows",
    relatedSlugs: [
      "in-capitalized-in-title-case",
      "of-capitalized-in-title-case",
      "and-capitalized-in-title-case",
    ],
  },
  {
    slug: "in-capitalized-in-title-case",
    term: "in",
    h1: "Is \"In\" Capitalized in Title Case?",
    title: "Is \"In\" Capitalized in Title Case? Practical Rule",
    description:
      "Get the fast rule for capitalizing \"in\" in title case with examples and direct workflow continuity to the converter.",
    quickAnswer:
      "\"In\" is usually lowercase in the middle of a title and capitalized when it appears first or last.",
    ruleSummary:
      "\"In\" is a short preposition. Lowercase it in the middle under standard title-case rules and capitalize it at positional boundaries.",
    examples: [
      {
        input: "lessons in product writing",
        output: "Lessons in Product Writing",
        note: "\"in\" stays lowercase in middle position.",
      },
      {
        input: "in practice and in theory",
        output: "In Practice and in Theory",
        note: "Leading \"in\" is capitalized.",
      },
      {
        input: "what we believe in",
        output: "What We Believe In",
        note: "Trailing word is capitalized.",
      },
    ],
    ...V2_CONTENT_BY_TERM.in,
    styleNotes: {
      standard: "Short preposition \"in\" is lowercase in middle positions.",
      ap: "AP generally lowercases short middle prepositions.",
      apa: "APA lowercases short middle prepositions such as \"in\".",
      mla: "MLA headline style keeps short middle prepositions lowercase.",
      chicago: "Chicago treats short middle prepositions as lowercase by default.",
    },
    middlePositionVerdictByStyle: {
      standard: "not capitalized",
      ap: "not capitalized",
      apa: "not capitalized",
      mla: "not capitalized",
      chicago: "not capitalized",
    },
    converterInput: "lessons in product writing",
    relatedSlugs: [
      "of-capitalized-in-title-case",
      "to-capitalized-in-title-case",
      "the-capitalized-in-title-case",
    ],
  },
  {
    slug: "of-capitalized-in-title-case",
    term: "of",
    h1: "Is \"Of\" Capitalized in Title Case?",
    title: "Is \"Of\" Capitalized in Title Case? Simple Rule + Examples",
    description:
      "Learn when \"of\" should be capitalized in title case and move directly to converter validation for your headline.",
    quickAnswer:
      "\"Of\" is generally lowercase in middle positions and capitalized only when it is first or last in a title.",
    ruleSummary:
      "\"Of\" is a short preposition and should stay lowercase in most middle positions. Capitalize only when placement requires it.",
    examples: [
      {
        input: "history of modern marketing",
        output: "History of Modern Marketing",
        note: "Middle short preposition remains lowercase.",
      },
      {
        input: "of mice and men",
        output: "Of Mice and Men",
        note: "First word is capitalized.",
      },
      {
        input: "a brief history of",
        output: "A Brief History Of",
        note: "Last word is capitalized.",
      },
    ],
    ...V2_CONTENT_BY_TERM.of,
    styleNotes: {
      standard: "\"Of\" is usually lowercase in the middle.",
      ap: "AP lowercases short middle prepositions like \"of\".",
      apa: "APA follows the same short-preposition treatment in middle positions.",
      mla: "MLA generally keeps short middle prepositions lowercase.",
      chicago: "Chicago keeps short middle prepositions lowercase unless position overrides.",
    },
    middlePositionVerdictByStyle: {
      standard: "not capitalized",
      ap: "not capitalized",
      apa: "not capitalized",
      mla: "not capitalized",
      chicago: "not capitalized",
    },
    converterInput: "history of modern marketing",
    relatedSlugs: [
      "in-capitalized-in-title-case",
      "the-capitalized-in-title-case",
      "and-capitalized-in-title-case",
    ],
  },
  {
    slug: "is-capitalized-in-title-case",
    term: "is",
    h1: "Is \"Is\" Capitalized in Title Case?",
    title: "Is \"Is\" Capitalized in Title Case? Verb Rule Explained",
    description:
      "Understand why the verb \"is\" is capitalized in title case and validate your phrase directly in the converter.",
    quickAnswer:
      "\"Is\" is a verb, and verbs are capitalized in title case even when they are short.",
    ruleSummary:
      "Do not lowercase \"is\" in title case because it is a main verb. Verb capitalization is a stable rule across major editorial styles.",
    examples: [
      {
        input: "why this is important",
        output: "Why This Is Important",
        note: "Verb remains capitalized in the middle.",
      },
      {
        input: "is this production-ready",
        output: "Is This Production-Ready",
        note: "First word is capitalized by position and by part of speech.",
      },
      {
        input: "when quality is",
        output: "When Quality Is",
        note: "Last word is also capitalized.",
      },
    ],
    ...V2_CONTENT_BY_TERM.is,
    styleNotes: {
      standard: "Verbs like \"is\" are capitalized in title case.",
      ap: "AP capitalizes verbs regardless of short length.",
      apa: "APA capitalizes verbs as major words.",
      mla: "MLA capitalizes verbs in headline style.",
      chicago: "Chicago capitalizes verbs consistently.",
    },
    middlePositionVerdictByStyle: {
      standard: "capitalized",
      ap: "capitalized",
      apa: "capitalized",
      mla: "capitalized",
      chicago: "capitalized",
    },
    converterInput: "why this is important",
    relatedSlugs: [
      "and-capitalized-in-title-case",
      "to-capitalized-in-title-case",
      "the-capitalized-in-title-case",
    ],
  },
]

function assertHighIntentEntryV2(entry: HighIntentGuidanceEntry): void {
  if (!entry.partOfSpeech.trim()) throw new Error(`Missing partOfSpeech for ${entry.slug}`)
  if (!entry.posLogic.trim()) throw new Error(`Missing posLogic for ${entry.slug}`)
  if (!entry.whyPeopleGetThisWrong.trim()) throw new Error(`Missing whyPeopleGetThisWrong for ${entry.slug}`)
  if (entry.specialCases.length === 0) throw new Error(`Missing specialCases for ${entry.slug}`)
  if (entry.attestedUsage.length === 0) throw new Error(`Missing attestedUsage for ${entry.slug}`)

  for (const evidence of entry.attestedUsage) {
    if (!evidence.publisher.trim()) throw new Error(`Missing attestedUsage.publisher for ${entry.slug}`)
    if (!evidence.url.trim()) throw new Error(`Missing attestedUsage.url for ${entry.slug}`)
    if (!evidence.date_checked.trim()) throw new Error(`Missing attestedUsage.date_checked for ${entry.slug}`)
    if (!evidence.style_context.trim()) throw new Error(`Missing attestedUsage.style_context for ${entry.slug}`)
    if (!evidence.fragment.trim()) throw new Error(`Missing attestedUsage.fragment for ${entry.slug}`)
  }
}

for (const entry of HIGH_INTENT_GUIDANCE_ENTRIES) {
  assertHighIntentEntryV2(entry)
}

const HIGH_INTENT_GUIDANCE_BY_SLUG = new Map(
  HIGH_INTENT_GUIDANCE_ENTRIES.map((entry) => [entry.slug, entry])
)
const HIGH_INTENT_GUIDANCE_BY_TERM = new Map(
  HIGH_INTENT_GUIDANCE_ENTRIES.map((entry) => [entry.term, entry])
)

export function getHighIntentGuidanceSlugs(): string[] {
  return HIGH_INTENT_GUIDANCE_ENTRIES.map((entry) => entry.slug)
}

export function getHighIntentGuidanceBySlug(slug: string): HighIntentGuidanceEntry | null {
  return HIGH_INTENT_GUIDANCE_BY_SLUG.get(slug) ?? null
}

export function getHighIntentRelatedEntries(entry: HighIntentGuidanceEntry): HighIntentGuidanceEntry[] {
  return entry.relatedSlugs
    .map((slug) => HIGH_INTENT_GUIDANCE_BY_SLUG.get(slug))
    .filter((candidate): candidate is HighIntentGuidanceEntry => Boolean(candidate))
}

export function getHighIntentConverterHref(
  converterInput: string,
  converterContext?: ConverterContext | null
): string {
  const effectiveContext = converterContext ?? {
    input: converterInput,
    mode: "title",
    titleStyle: "standard" as const,
    outputMode: "title" as const,
    outputTitleStyle: "standard" as const,
  }

  const hrefWithContext = appendConverterContextToHref("/", effectiveContext)

  const url = new URL(hrefWithContext, "https://titlecaseconverter.online")
  url.searchParams.set("ctx_input", effectiveContext.input || converterInput)
  const query = url.searchParams.toString()
  return `${url.pathname}${query ? `?${query}` : ""}${url.hash}`
}

function extractCandidateTerm(input: string): string | null {
  const normalized = input.trim().toLowerCase().replace(/[^a-z\s?]/g, " ").replace(/\s+/g, " ").trim()
  if (!normalized) return null

  const patterns = [
    /^is ([a-z]+) capitalized\b/,
    /^should ([a-z]+) be capitalized\b/,
    /^([a-z]+) capitalized\??$/,
    /^([a-z]+)$/,
  ]

  for (const pattern of patterns) {
    const match = normalized.match(pattern)
    if (match?.[1]) return match[1]
  }
  return null
}

export function getHighIntentEntryFromInput(input: string): HighIntentGuidanceEntry | null {
  const term = extractCandidateTerm(input)
  if (!term) return null
  return HIGH_INTENT_GUIDANCE_BY_TERM.get(term) ?? null
}

export function getHighIntentBlogHref(
  entry: HighIntentGuidanceEntry,
  converterContext: ConverterContext
): string {
  const hrefWithContext = appendConverterContextToHref(`/blog/${entry.slug}`, converterContext)
  const url = new URL(hrefWithContext, "https://titlecaseconverter.online")
  url.searchParams.set("ctx_input", converterContext.input)
  const query = url.searchParams.toString()
  return `${url.pathname}${query ? `?${query}` : ""}${url.hash}`
}
