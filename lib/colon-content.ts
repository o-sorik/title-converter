/**
 * Style guide table and engine-checked examples for
 * /blog/do-you-capitalize-after-a-colon (quality node 5 in the topical map).
 *
 * The table rows are the manuals' rules for the word after a colon (AP
 * Stylebook, APA 7, CMOS 18 6.67, MLA 9 2.27 and 1.11); the converter does
 * not parse sentences, so only the subtitle row can be checked against it.
 * Every title below is kept as a literal so a reader sees what the page
 * claims; `colon-content.test.ts` asserts each one against the engine.
 */

import type { GuideVerdicts } from "./lowercase-words-content"

/** A3: one kind of text after a colon per row, in the order of the H3s below the table. */
export interface ColonRow {
  /** What follows the colon, short enough for the narrow first column. */
  label: string
  note?: string
  /** The first word after the colon, as the cells show it. */
  word: string
  capitalized: GuideVerdicts
}

const ALL: GuideVerdicts = { ap: true, apa: true, chicago: true, mla: true }
const NONE: GuideVerdicts = { ap: false, apa: false, chicago: false, mla: false }

export const COLON_ROWS: ColonRow[] = [
  { label: "One sentence", note: "a complete sentence", word: "the", capitalized: { ap: true, apa: true, chicago: true, mla: false } },
  { label: "Two or more sentences", word: "the", capitalized: ALL },
  { label: "A question", word: "how", capitalized: ALL },
  { label: "A phrase or a word", note: "not a sentence", word: "no", capitalized: NONE },
  { label: "A name", note: "a proper noun, I or an acronym", word: "Paris", capitalized: ALL },
  { label: "A run-in list", note: "items inside the sentence", word: "all", capitalized: NONE },
  { label: "Bulleted sentences", note: "a vertical list of sentences", word: "the", capitalized: ALL },
  { label: "A subtitle", note: "in a title or heading", word: "a", capitalized: ALL },
]

/** A16: titles the guides print, which the converter returns unchanged in all four styles. */
export const SUBTITLES = {
  mla: { input: "othermindedness: the emergence of network culture", title: "Othermindedness: The Emergence of Network Culture" },
  apa: {
    input: "train your mind for peak performance: a science-based approach for achieving your goals",
    title: "Train Your Mind for Peak Performance: A Science-Based Approach for Achieving Your Goals",
  },
}

/** A17: an APA reference title in sentence case, and the same title in title case. */
export const SENTENCE_CASE_SUBTITLE = {
  input: "Suicide Prevention: An Ethically and Scientifically Informed Approach",
  output: "Suicide prevention: An ethically and scientifically informed approach",
}

/** A19: what the converter does with a colon, in title case and in sentence case. */
export const CONVERTER_EXAMPLES = {
  title: { input: "remote work: a guide for small teams", output: "Remote Work: A Guide for Small Teams" },
  sentenceCaseTitle: { input: "Remote Work: A Guide for Small Teams", output: "Remote work: A guide for small teams" },
  /** CMOS 18 prints the second sentence with a capital; the converter keeps the one you typed. */
  keptCapital: "The end of the party was signaled by an abrupt silence: The generator had run out of gas.",
}

/** Labels the converter prints next to the word after a colon. */
export const COLON_REASONS = {
  title: "First word after colon is capitalized",
  sentenceCase: "First word after a colon in a title",
}

/** A19: places where the converter's output differs from what a guide prints. */
export const COLON_LIMITS = {
  /** A complete sentence after a colon, converted from title case: AP, APA and Chicago want a capital. */
  sentenceAfterColon: {
    input: "The End of the Party Was Signaled by an Abrupt Silence: The Generator Had Run Out of Gas.",
    converter: "The end of the party was signaled by an abrupt silence: the generator had run out of gas.",
    correct: "The end of the party was signaled by an abrupt silence: The generator had run out of gas.",
  },
  /** APA capitalizes the first word after an em dash in a heading; the converter keeps it lowercase. */
  apaDash: {
    input: "to transform, to communicate, to play—the experimenting community in action",
    converter: "To Transform, to Communicate, to Play—the Experimenting Community in Action",
    correct: "To Transform, to Communicate, to Play—The Experimenting Community in Action",
  },
}
