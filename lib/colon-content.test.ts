import { describe, expect, test } from "vitest"

import type { StyleGuideName } from "./article-content"
import {
  COLON_LIMITS,
  COLON_REASONS,
  COLON_ROWS,
  CONVERTER_EXAMPLES,
  SENTENCE_CASE_SUBTITLE,
  SUBTITLES,
} from "./colon-content"
import { convert, convertWithExplanations } from "./converters"

const GUIDES: StyleGuideName[] = ["ap", "apa", "chicago", "mla"]

describe("style guide table", () => {
  test("rows are listed once and the cell word is a single word", () => {
    const labels = COLON_ROWS.map((row) => row.label)
    expect(new Set(labels).size).toBe(labels.length)
    for (const row of COLON_ROWS) expect(row.word, row.label).toMatch(/^\p{L}+$/u)
  })

  test("only a single sentence splits the guides, and MLA is the one that lowercases it", () => {
    const split = COLON_ROWS.filter((row) => new Set(Object.values(row.capitalized)).size > 1)
    expect(split.map((row) => row.label)).toEqual(["One sentence"])
    expect(split[0].capitalized).toEqual({ ap: true, apa: true, chicago: true, mla: false })
  })

  test("the subtitle row matches the engine in every guide", () => {
    const row = COLON_ROWS.find((candidate) => candidate.label === "A subtitle")
    expect(row).toBeDefined()
    for (const style of GUIDES) {
      const word = convert(CONVERTER_EXAMPLES.title.input, "title", { titleStyle: style }).split(": ")[1].split(" ")[0]
      expect(word, style).toBe(row!.capitalized[style] ? "A" : "a")
    }
  })
})

describe("subtitles", () => {
  test("titles the guides print come back unchanged in all four styles", () => {
    for (const [id, example] of Object.entries(SUBTITLES)) {
      for (const style of GUIDES) {
        expect(convert(example.input, "title", { titleStyle: style }), `${id} / ${style}`).toBe(example.title)
      }
    }
  })

  test("sentence case keeps the capital after a colon in a title", () => {
    expect(convert(SENTENCE_CASE_SUBTITLE.input, "sentence")).toBe(SENTENCE_CASE_SUBTITLE.output)
  })
})

describe("converter", () => {
  test("title case capitalizes the word after a colon in every style", () => {
    for (const style of GUIDES) {
      expect(convert(CONVERTER_EXAMPLES.title.input, "title", { titleStyle: style }), style).toBe(CONVERTER_EXAMPLES.title.output)
    }
  })

  test("sentence case treats a line without a closing period as a title", () => {
    expect(convert(CONVERTER_EXAMPLES.sentenceCaseTitle.input, "sentence")).toBe(CONVERTER_EXAMPLES.sentenceCaseTitle.output)
  })

  test("a capital typed after a colon in a sentence-case sentence is kept", () => {
    expect(convert(CONVERTER_EXAMPLES.keptCapital, "sentence")).toBe(CONVERTER_EXAMPLES.keptCapital)
  })

  test("the quoted labels are the ones the converter prints", () => {
    const title = convertWithExplanations(CONVERTER_EXAMPLES.title.input, "title", { titleStyle: "ap" }).explanations
    expect(title.find((explanation) => explanation.word === "a")?.reason).toBe(COLON_REASONS.title)
    const sentence = convertWithExplanations("Remote Work: a Guide for Small Teams", "sentence").explanations
    expect(sentence.find((explanation) => explanation.word === "a")?.reason).toBe(COLON_REASONS.sentenceCase)
  })
})

describe("converter limits", () => {
  test("a sentence after a colon, converted from title case, still comes out lowercase", () => {
    const limit = COLON_LIMITS.sentenceAfterColon
    expect(convert(limit.input, "sentence")).toBe(limit.converter)
    expect(limit.converter.toLowerCase()).toBe(limit.correct.toLowerCase())
    expect(limit.converter).not.toBe(limit.correct)
  })

  test("APA title case still lowercases the word after an em dash", () => {
    const limit = COLON_LIMITS.apaDash
    expect(convert(limit.input, "title", { titleStyle: "apa" })).toBe(limit.converter)
    expect(limit.converter.toLowerCase()).toBe(limit.correct.toLowerCase())
    expect(limit.converter).not.toBe(limit.correct)
  })
})
