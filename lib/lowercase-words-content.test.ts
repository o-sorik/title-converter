import { describe, expect, test } from "vitest"

import { blogArticles } from "@/components/blog/data"
import type { StyleGuideName } from "./article-content"
import { convert, convertWithExplanations } from "./converters"
import { CONVERTER_LIMITS, EXAMPLES, MAJOR_WORD_ROWS, REASON_SAMPLES, WORD_ROWS } from "./lowercase-words-content"

const GUIDES: StyleGuideName[] = ["ap", "apa", "chicago", "mla"]
const slugs = new Set(blogArticles.map((article) => article.slug))

/** Whether the guide capitalized `word` in `title`; the word must appear exactly once. */
function capitalizes(title: string, word: string, style: StyleGuideName): boolean {
  const matches = convert(title, "title", { titleStyle: style })
    .split(/[^\p{L}]+/u)
    .filter((token) => token.toLowerCase() === word)
  expect(matches, `"${word}" must appear once in "${title}"`).toHaveLength(1)
  return matches[0][0] === matches[0][0].toUpperCase()
}

describe("word table", () => {
  test("every verdict matches the engine in the word's probe title", () => {
    for (const row of WORD_ROWS) {
      for (const style of GUIDES) {
        expect(capitalizes(row.probe, row.word, style), `${row.word} / ${style}`).toBe(row.capitalized[style])
      }
    }
  })

  test("the word sits in a middle position of its probe", () => {
    for (const row of [...WORD_ROWS, ...MAJOR_WORD_ROWS]) {
      const words = ("probe" in row ? row.probe : row.title).toLowerCase().split(/[^\p{L}]+/u)
      expect(words[0], row.word).not.toBe(row.word)
      expect(words.at(-1), row.word).not.toBe(row.word)
    }
  })

  test("words are listed once and link only to pages that exist", () => {
    const words = [...WORD_ROWS, ...MAJOR_WORD_ROWS].map((row) => row.word)
    expect(new Set(words).size).toBe(words.length)
    for (const row of [...WORD_ROWS, ...MAJOR_WORD_ROWS]) {
      if (row.slug) expect(slugs.has(row.slug), row.slug).toBe(true)
    }
  })
})

describe("short words that are always capitalized", () => {
  test("every guide returns the same title, with the word capitalized", () => {
    for (const row of MAJOR_WORD_ROWS) {
      for (const style of GUIDES) {
        expect(convert(row.title.toLowerCase(), "title", { titleStyle: style }), `${row.word} / ${style}`).toBe(row.title)
      }
    }
  })
})

describe("examples", () => {
  test("each example is the engine's output in all four guides", () => {
    for (const [id, example] of Object.entries(EXAMPLES)) {
      for (const style of GUIDES) {
        expect(convert(example.input, "title", { titleStyle: style }), `${id} / ${style}`).toBe(example[style])
      }
    }
  })

  test("every quoted label is one the converter prints for these examples", () => {
    const reasons = new Set<string>()
    for (const example of Object.values(EXAMPLES)) {
      for (const style of GUIDES) {
        // The converter labels only words it changes, so also feed it another guide's output.
        for (const input of [example.input, ...GUIDES.map((other) => example[other])]) {
          for (const explanation of convertWithExplanations(input, "title", { titleStyle: style }).explanations) {
            reasons.add(explanation.reason)
          }
        }
      }
    }
    for (const sample of REASON_SAMPLES) expect(reasons, sample).toContain(sample)
  })
})

describe("converter limits", () => {
  test("each documented limit is still a limit", () => {
    for (const [id, limit] of Object.entries(CONVERTER_LIMITS)) {
      for (const style of GUIDES) {
        const expected = (limit.styles as StyleGuideName[]).includes(style) ? limit.converter : limit.correct
        expect(convert(limit.input, "title", { titleStyle: style }), `${id} / ${style}`).toBe(expected)
      }
      expect(limit.converter.toLowerCase()).toBe(limit.correct.toLowerCase())
      expect(limit.converter).not.toBe(limit.correct)
    }
  })
})
