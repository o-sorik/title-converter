import { appendConverterContextToHref } from "./converter-context"

export type GuidanceStyleKey = "standard" | "ap" | "apa" | "mla" | "chicago"

export interface HighIntentExample {
  input: string
  output: string
  note: string
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
  styleNotes: Record<GuidanceStyleKey, string>
  middlePositionVerdictByStyle: Record<GuidanceStyleKey, "capitalized" | "not capitalized" | "depends">
  converterInput: string
  relatedSlugs: string[]
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

const HIGH_INTENT_GUIDANCE_BY_SLUG = new Map(
  HIGH_INTENT_GUIDANCE_ENTRIES.map((entry) => [entry.slug, entry])
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

export function getHighIntentConverterHref(converterInput: string): string {
  const hrefWithContext = appendConverterContextToHref("/", {
    input: converterInput,
    mode: "title",
    titleStyle: "standard",
    outputMode: "title",
    outputTitleStyle: "standard",
  })

  const url = new URL(hrefWithContext, "https://titlecaseconverter.online")
  url.searchParams.set("ctx_input", converterInput)
  const query = url.searchParams.toString()
  return `${url.pathname}${query ? `?${query}` : ""}${url.hash}`
}
