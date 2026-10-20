import { describe, expect, test } from "vitest"

import { convert, type TitleCaseStyle } from "./converters"
import {
  COLON_FIX,
  DIAGRAM_HEADLINE,
  DIAGRAM_NOTES,
  DIAGRAM_WORDS,
  SAME_HEADLINES,
  TO_SENTENCE,
  TO_TITLE,
} from "./sentence-vs-title-case-content"

const GUIDES: TitleCaseStyle[] = ["ap", "apa", "chicago", "mla"]

/** The two strings differ only in the case of the letters at these word indexes. */
function differOnlyAt(a: string, b: string): number[] {
  const left = a.split(" ")
  const right = b.split(" ")
  expect(left.length).toBe(right.length)
  expect(a.toLowerCase()).toBe(b.toLowerCase())
  return left.flatMap((word, index) => (word === right[index] ? [] : [index]))
}

describe("same headlines in both cases", () => {
  test("the sentence column is what the converter returns, or a documented hand fix", () => {
    for (const pair of SAME_HEADLINES) {
      expect(convert(pair.title, "sentence"), pair.title).toBe(pair.converter ?? pair.sentence)
      if (pair.converter) expect(differOnlyAt(pair.converter, pair.sentence)).toHaveLength(1)
    }
  })

  test("the title column is AP output, and the guides agree unless the row says otherwise", () => {
    for (const pair of SAME_HEADLINES) {
      expect(convert(pair.sentence, "title", { titleStyle: "ap" }), pair.title).toBe(pair.title)
      const outputs = new Set(GUIDES.map((titleStyle) => convert(pair.sentence, "title", { titleStyle })))
      if (outputs.size > 1) expect(pair.shows, pair.title).toMatch(/Chicago|MLA/)
    }
  })
})

describe("diagram", () => {
  test("title row is the same in every style guide", () => {
    for (const titleStyle of GUIDES) {
      expect(convert(DIAGRAM_HEADLINE.input, "title", { titleStyle })).toBe(DIAGRAM_HEADLINE.title)
    }
  })

  test("converter row is the engine's sentence case", () => {
    expect(convert(DIAGRAM_HEADLINE.title, "sentence")).toBe(DIAGRAM_HEADLINE.converter)
  })

  test("converter and correct sentence case differ exactly at the words marked for checking", () => {
    expect(differOnlyAt(DIAGRAM_HEADLINE.converter, DIAGRAM_HEADLINE.sentence)).toEqual([
      DIAGRAM_WORDS.mars,
      DIAGRAM_WORDS.what,
    ])
  })

  test("marked words point at the words they describe", () => {
    const words = DIAGRAM_HEADLINE.title.split(" ")
    expect(words[DIAGRAM_WORDS.nasa]).toBe("NASA")
    expect(words[DIAGRAM_WORDS.is]).toBe("Is")
    expect(words[DIAGRAM_WORDS.a]).toBe("a")
    expect(words[DIAGRAM_WORDS.mars]).toBe("Mars:")
    expect(words[DIAGRAM_WORDS.what]).toBe("What")
    expect(DIAGRAM_NOTES).toHaveLength(4)
  })
})

describe("conversion examples", () => {
  test("title case to sentence case", () => {
    expect(convert(TO_SENTENCE.kept.input, "sentence")).toBe(TO_SENTENCE.kept.output)
    expect(convert(TO_SENTENCE.names.input, "sentence")).toBe(TO_SENTENCE.names.output)
    expect(differOnlyAt(TO_SENTENCE.names.output, TO_SENTENCE.names.fixed)).toEqual([1, 8])
    expect(convert(TO_SENTENCE.unknownAcronym.input, "sentence")).toBe(TO_SENTENCE.unknownAcronym.output)
  })

  test("sentence case to title case depends on the style guide", () => {
    expect(convert(TO_TITLE.input, "title", { titleStyle: "ap" })).toBe(TO_TITLE.ap)
    expect(convert(TO_TITLE.input, "title", { titleStyle: "apa" })).toBe(TO_TITLE.ap)
    expect(convert(TO_TITLE.input, "title", { titleStyle: "chicago" })).toBe(TO_TITLE.chicago)
    expect(convert(TO_TITLE.input, "title", { titleStyle: "mla" })).toBe(TO_TITLE.chicago)
  })

  test("the colon fix is one capital", () => {
    expect(convert(COLON_FIX.input, "sentence")).toBe(COLON_FIX.output)
    expect(differOnlyAt(COLON_FIX.output, COLON_FIX.fixed)).toEqual([2])
  })
})
