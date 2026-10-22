/**
 * Engine-checked word table and examples for
 * /blog/what-words-are-not-capitalized-in-a-title (quality node 4 in the
 * topical map).
 *
 * Every verdict and title is kept as a literal so a reader sees what the page
 * claims; `lowercase-words-content.test.ts` asserts each one against the engine
 * in all four style guides. The verdicts themselves come from the style
 * manuals (AP composition titles, APA title case, CMOS 8.160, MLA 2.90).
 */

import type { StyleGuideName } from "./article-content"

/** True where the guide capitalizes the word in a middle position. */
export type GuideVerdicts = Record<StyleGuideName, boolean>

const NONE: GuideVerdicts = { ap: false, apa: false, chicago: false, mla: false }
const FOUR_LETTERS: GuideVerdicts = { ap: true, apa: true, chicago: false, mla: false }
const FIVE_LETTERS: GuideVerdicts = { ap: true, apa: true, chicago: true, mla: false }
const CHICAGO_ONLY: GuideVerdicts = { ap: false, apa: false, chicago: true, mla: false }

/** A3: one word per row, grouped in the order of the H3s below the table. */
export interface WordRow {
  word: string
  /** Word class and length as the table prints them. */
  kind: string
  /** A lowercase title with `word` once, in a middle position and in the role `kind` names. */
  probe: string
  /** The word's own "Is X capitalized" page, when it has one. */
  slug?: string
  capitalized: GuideVerdicts
}

export const WORD_ROWS: WordRow[] = [
  { word: "a", kind: "article", probe: "writing a better resume", capitalized: NONE },
  { word: "an", kind: "article", probe: "finding an answer", capitalized: NONE },
  { word: "the", kind: "article", probe: "lessons from the road", slug: "the-capitalized-in-title-case", capitalized: NONE },
  { word: "and", kind: "conjunction", probe: "pride and prejudice", slug: "and-capitalized-in-title-case", capitalized: NONE },
  { word: "but", kind: "conjunction", probe: "nothing but the truth", capitalized: NONE },
  { word: "or", kind: "conjunction", probe: "sink or swim", capitalized: NONE },
  { word: "nor", kind: "conjunction", probe: "neither here nor there", capitalized: NONE },
  { word: "for", kind: "conjunction, preposition", probe: "recipes for beginners", capitalized: NONE },
  { word: "yet", kind: "conjunction", probe: "small yet powerful tools", capitalized: CHICAGO_ONLY },
  { word: "so", kind: "conjunction", probe: "i was tired, so i left early", capitalized: CHICAGO_ONLY },
  { word: "as", kind: "preposition, conjunction", probe: "the artist as critic", capitalized: NONE },
  {
    word: "if",
    kind: "subordinating conjunction",
    probe: "what to do if it rains",
    capitalized: { ap: false, apa: false, chicago: true, mla: true },
  },
  { word: "at", kind: "preposition, 2 letters", probe: "success at work", capitalized: NONE },
  { word: "by", kind: "preposition, 2 letters", probe: "death by chocolate", capitalized: NONE },
  { word: "in", kind: "preposition, 2 letters", probe: "adventures in cooking", slug: "in-capitalized-in-title-case", capitalized: NONE },
  { word: "of", kind: "preposition, 2 letters", probe: "the art of war", slug: "of-capitalized-in-title-case", capitalized: NONE },
  { word: "on", kind: "preposition, 2 letters", probe: "notes on a scandal", capitalized: NONE },
  { word: "to", kind: "preposition, 2 letters", probe: "back to basics", slug: "to-capitalized-in-title-case", capitalized: NONE },
  { word: "up", kind: "preposition, 2 letters", probe: "a cabin up the river", slug: "up-capitalized-in-title-case", capitalized: NONE },
  { word: "off", kind: "preposition, 3 letters", probe: "a day off the grid", capitalized: NONE },
  { word: "per", kind: "preposition, 3 letters", probe: "miles per gallon", capitalized: NONE },
  { word: "via", kind: "preposition, 3 letters", probe: "notes via email", capitalized: NONE },
  { word: "from", kind: "preposition, 4 letters", probe: "letters from home", slug: "from-capitalized-in-title-case", capitalized: FOUR_LETTERS },
  { word: "into", kind: "preposition, 4 letters", probe: "a look into the past", capitalized: FOUR_LETTERS },
  { word: "like", kind: "preposition, 4 letters", probe: "a city like no other", capitalized: FOUR_LETTERS },
  { word: "near", kind: "preposition, 4 letters", probe: "a house near the sea", capitalized: FOUR_LETTERS },
  { word: "onto", kind: "preposition, 4 letters", probe: "a window onto the world", capitalized: FOUR_LETTERS },
  { word: "over", kind: "preposition, 4 letters", probe: "a bridge over troubled water", capitalized: FOUR_LETTERS },
  { word: "with", kind: "preposition, 4 letters", probe: "gone with the wind", slug: "with-capitalized-in-title-case", capitalized: FOUR_LETTERS },
  { word: "about", kind: "preposition, 5 letters", probe: "a book about grief", capitalized: FIVE_LETTERS },
  { word: "after", kind: "preposition, 5 letters", probe: "life after college", capitalized: FIVE_LETTERS },
  { word: "among", kind: "preposition, 5 letters", probe: "a stranger among friends", capitalized: FIVE_LETTERS },
  { word: "under", kind: "preposition, 5 letters", probe: "a city under siege", capitalized: FIVE_LETTERS },
  {
    word: "between",
    kind: "preposition, 7 letters",
    probe: "the space between us",
    slug: "between-capitalized-in-title-case",
    capitalized: FIVE_LETTERS,
  },
  { word: "through", kind: "preposition, 7 letters", probe: "a journey through time", capitalized: FIVE_LETTERS },
  { word: "without", kind: "preposition, 7 letters", probe: "a life without limits", capitalized: FIVE_LETTERS },
]

/** A13: short words every guide capitalizes. `title` is the engine's output in all four guides. */
export interface MajorWordRow {
  word: string
  kind: string
  title: string
  slug?: string
}

/** The A13 title for `word`; throws if the table has no such row. */
export function majorTitle(word: string): string {
  const row = MAJOR_WORD_ROWS.find((candidate) => candidate.word === word)
  if (!row) throw new Error(`No major-word row for "${word}"`)
  return row.title
}

export const MAJOR_WORD_ROWS: MajorWordRow[] = [
  { word: "is", kind: "verb", title: "What Is Title Case", slug: "is-capitalized-in-title-case" },
  { word: "am", kind: "verb", title: "Who Am I to Judge", slug: "am-capitalized-in-title-case" },
  { word: "are", kind: "verb", title: "Where Are They Now" },
  { word: "be", kind: "verb", title: "How to Be a Better Writer" },
  { word: "do", kind: "verb", title: "What to Do Next" },
  { word: "it", kind: "pronoun", title: "Make It Count" },
  { word: "its", kind: "possessive", title: "A City and Its People" },
  { word: "my", kind: "possessive", title: "This Is My Story" },
  { word: "your", kind: "possessive", title: "How to Write Your First Headline", slug: "your-capitalized-in-title-case" },
  { word: "not", kind: "adverb", title: "Why Not Start Today" },
  { word: "too", kind: "adverb", title: "A Story Too Good to Ignore" },
  { word: "that", kind: "conjunction or pronoun", title: "The Book That Changed My Life", slug: "that-capitalized-in-title-case" },
]

/** One lowercase input and what each guide makes of it. */
export interface GuideExample {
  input: string
  ap: string
  apa: string
  chicago: string
  mla: string
}

function same(input: string, output: string): GuideExample {
  return { input, ap: output, apa: output, chicago: output, mla: output }
}

/** Examples quoted in the article body, keyed by the heading they illustrate. */
export const EXAMPLES = {
  // A5–A8: prepositions
  fourLetters: {
    input: "dinner with friends from home",
    ap: "Dinner With Friends From Home",
    apa: "Dinner With Friends From Home",
    chicago: "Dinner with Friends from Home",
    mla: "Dinner with Friends from Home",
  },
  fiveLetters: {
    input: "notes about life after college",
    ap: "Notes About Life After College",
    apa: "Notes About Life After College",
    chicago: "Notes About Life After College",
    mla: "Notes about Life after College",
  },
  anyLength: {
    input: "a history of italy between the wars",
    ap: "A History of Italy Between the Wars",
    apa: "A History of Italy Between the Wars",
    chicago: "A History of Italy Between the Wars",
    mla: "A History of Italy between the Wars",
  },
  according: {
    input: "the world according to garp",
    ap: "The World According to Garp",
    apa: "The World According to Garp",
    chicago: "The World According to Garp",
    mla: "The World according to Garp",
  },
  versus: same("title case vs sentence case", "Title Case vs Sentence Case"),
  legalVersus: same("brown v. board of education", "Brown v. Board of Education"),
  // A2: articles
  articleA: same("writing a better resume", "Writing a Better Resume"),
  articleAn: same("finding an answer", "Finding an Answer"),
  // A10–A12: conjunctions
  pride: same("pride and prejudice", "Pride and Prejudice"),
  sink: same("sink or swim", "Sink or Swim"),
  yet: {
    input: "small yet powerful tools",
    ap: "Small yet Powerful Tools",
    apa: "Small yet Powerful Tools",
    chicago: "Small Yet Powerful Tools",
    mla: "Small yet Powerful Tools",
  },
  soJoins: {
    input: "i was tired, so i left early",
    ap: "I Was Tired, so I Left Early",
    apa: "I Was Tired, so I Left Early",
    chicago: "I Was Tired, So I Left Early",
    mla: "I Was Tired, so I Left Early",
  },
  soAdverb: same("why so many titles fail", "Why So Many Titles Fail"),
  ifClause: {
    input: "what to do if it rains",
    ap: "What to Do if It Rains",
    apa: "What to Do if It Rains",
    chicago: "What to Do If It Rains",
    mla: "What to Do If It Rains",
  },
  asClause: {
    input: "life as i find it",
    ap: "Life as I Find It",
    apa: "Life as I Find It",
    chicago: "Life as I Find It",
    mla: "Life As I Find It",
  },
  // A20–A22: positions
  firstWord: same("of mice and men", "Of Mice and Men"),
  lastWord: same("something to believe in", "Something to Believe In"),
  colon: same("title case rules: a practical guide", "Title Case Rules: A Practical Guide"),
  noObject: same("freedom from, freedom to", "Freedom From, Freedom To"),
  noObjectQuestion: same("where are you from, really", "Where Are You From, Really"),
  // A24–A26: roles and compounds
  phrasalVerb: same("how to set up a blog", "How to Set Up a Blog"),
  upPreposition: same("a cabin up the river", "A Cabin up the River"),
  logIn: same("log in to your account", "Log In to Your Account"),
  sincePreposition: {
    input: "life since the war",
    ap: "Life Since the War",
    apa: "Life Since the War",
    chicago: "Life Since the War",
    mla: "Life since the War",
  },
  sinceClause: same("everything changed since we met", "Everything Changed Since We Met"),
  thanClause: same("more than i bargained for", "More Than I Bargained For"),
  thanPreposition: {
    input: "more than one path",
    ap: "More Than One Path",
    apa: "More Than One Path",
    chicago: "More than One Path",
    mla: "More than One Path",
  },
  selfReport: same("self-report measures in clinical research", "Self-Report Measures in Clinical Research"),
  upToDate: same("an up-to-date guide", "An Up-to-Date Guide"),
} satisfies Record<string, GuideExample>

/** A27: labels the converter prints under changed words, quoted on the page. */
export const REASON_SAMPLES = [
  "AP style: conjunction with fewer than 4 letters",
  "Chicago style: only and, but, for, or, nor are lowercase",
  "Preposition (MLA style)",
]

/**
 * A27: titles the converter gets wrong, with the correct form. The test keeps
 * each one failing, so the page stops claiming a limit once the engine fixes it.
 */
export interface ConverterLimit {
  input: string
  /** Guides in which the converter returns `converter` instead of `correct`. */
  styles: StyleGuideName[]
  converter: string
  correct: string
}

export const CONVERTER_LIMITS = {
  /** "Walk" is also a verb, so "in" reads as part of a phrasal verb. */
  nounBeforeParticle: {
    input: "a walk in the park",
    styles: ["ap", "apa", "chicago", "mla"],
    converter: "A Walk In the Park",
    correct: "A Walk in the Park",
  },
  /** "Hunker" is not on the converter's verb list, so "down" stays a preposition. */
  unknownPhrasalVerb: {
    input: "how to hunker down at home",
    styles: ["chicago", "mla"],
    converter: "How to Hunker down at Home",
    correct: "How to Hunker Down at Home",
  },
} satisfies Record<string, ConverterLimit>
