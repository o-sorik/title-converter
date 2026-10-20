/**
 * Engine-checked examples for /blog/sentence-vs-title-case (quality node 3 in
 * the topical map).
 *
 * Every headline is kept as a literal so a reader sees what the page claims;
 * `sentence-vs-title-case-content.test.ts` asserts each one against the engine.
 * Where correct sentence case needs a hand fix the converter cannot make, the
 * engine's own output is stored next to it as `converter`.
 */

import type { CaseDiagramTone } from "./article-content"

/** A3: one headline in both cases. `shows` names the differences from A2 by number. */
export interface HeadlinePair {
  title: string
  sentence: string
  /** What the converter returns for `title` in sentence case, when it differs from `sentence`. */
  converter?: string
  shows: string
}

export const SAME_HEADLINES: HeadlinePair[] = [
  {
    title: "What Is Title Case and How Do You Use It",
    sentence: "What is title case and how do you use it",
    shows: "1 – *Is*, *Do*, *You* and *It* are major words",
  },
  {
    title: "The Art of Saying No",
    sentence: "The art of saying no",
    shows: "2 – *of* is lowercase in both",
  },
  {
    title: "Something to Believe In",
    sentence: "Something to believe in",
    shows: "1 – the last word is always capitalized",
  },
  {
    title: "How to Use the NASA API With Your iPhone",
    sentence: "How to use the NASA API with your iPhone",
    shows: "2 – *With* in AP and APA, *with* in Chicago and MLA · 4 – acronyms and brands match",
  },
  {
    title: "Remote Work: A Guide for Small Teams",
    sentence: "Remote work: A guide for small teams",
    converter: "Remote work: a guide for small teams",
    shows: "3 – AP and APA capitalize after a colon in both",
  },
]

/** The quality-node diagram: one headline, three rows, marks mirror the A2 list. */
export const DIAGRAM_HEADLINE = {
  input: "why NASA is sending a robot to Mars: what scientists hope to find",
  title: "Why NASA Is Sending a Robot to Mars: What Scientists Hope to Find",
  sentence: "Why NASA is sending a robot to Mars: What scientists hope to find",
  converter: "Why NASA is sending a robot to mars: what scientists hope to find",
}

/** Word indexes in `DIAGRAM_HEADLINE.*.split(" ")`. */
export const DIAGRAM_WORDS = { nasa: 1, is: 2, a: 4, mars: 7, what: 8 } as const

/** Marks shared by the title-case and sentence-case rows; `note` is the A2 item number. */
export const DIAGRAM_MARKS: { index: number; note: number; tone: CaseDiagramTone }[] = [
  { index: DIAGRAM_WORDS.nasa, note: 4, tone: "same" },
  { index: DIAGRAM_WORDS.is, note: 1, tone: "differs" },
  { index: DIAGRAM_WORDS.a, note: 2, tone: "same" },
  { index: DIAGRAM_WORDS.mars, note: 4, tone: "same" },
  { index: DIAGRAM_WORDS.what, note: 3, tone: "same" },
]

/** A2 items 1–4 – the differences that show on single words. */
export const DIAGRAM_NOTES = [
  "Capitals: every major word in title case, the first word in sentence case",
  "Small words: lowercase in both",
  "The word after a colon: capitalized in title case, and in AP and APA sentence case",
  "Names and acronyms: capitalized in both",
]

/** A14: title case to sentence case. */
export const TO_SENTENCE = {
  kept: { input: "How to Use the NASA API With Your iPhone", output: "How to use the NASA API with your iPhone" },
  names: {
    input: "Paris Agreement Talks Stall as Leaders Meet in Brazil",
    output: "Paris agreement talks stall as leaders meet in brazil",
    fixed: "Paris Agreement talks stall as leaders meet in Brazil",
  },
  unknownAcronym: { input: "How the BBC Covers Elections in the UK", output: "How the bbc covers elections in the UK" },
}

/** A15: sentence case to title case, one input under two style guides. */
export const TO_TITLE = {
  input: "a look into the history of the web",
  ap: "A Look Into the History of the Web",
  chicago: "A Look into the History of the Web",
}

/** A16: the colon fix a writer applies by hand. */
export const COLON_FIX = {
  input: "Remote Work: A Guide for Small Teams",
  output: "Remote work: a guide for small teams",
  fixed: "Remote work: A guide for small teams",
}
