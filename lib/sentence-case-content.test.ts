import { describe, expect, test } from "vitest"

import { convert, convertWithExplanations } from "./converters"
import { SEO_CONFIG } from "./seo-config"
import {
  DIAGRAM_CALLOUTS,
  DIAGRAM_INPUT,
  DIAGRAM_OUTPUT,
  SENTENCE_CASE_CHANGES,
  SENTENCE_CASE_EXAMPLES,
  SENTENCE_CASE_FAQS,
  SIDE_BY_SIDE,
} from "./sentence-case-content"

describe("sentence case examples", () => {
  test("every documented output matches the engine", () => {
    for (const [id, example] of Object.entries(SENTENCE_CASE_EXAMPLES)) {
      expect(convert(example.input, "sentence"), id).toBe(example.output)
    }
  })

  test("the side-by-side headline matches both modes", () => {
    expect(convert(SIDE_BY_SIDE.input, "sentence")).toBe(SIDE_BY_SIDE.sentence)
    expect(convert(SIDE_BY_SIDE.input, "title")).toBe(SIDE_BY_SIDE.title)
  })

  test("the diagram shows the engine's real output", () => {
    expect(convert(DIAGRAM_INPUT, "sentence")).toBe(DIAGRAM_OUTPUT)
  })

  test("every diagram callout points at a word that is in the output", () => {
    const words = DIAGRAM_OUTPUT.split(" ")
    for (const callout of DIAGRAM_CALLOUTS) {
      expect(words, callout.word).toContain(callout.word)
    }
  })

  // The page states these limits outright. If the engine learns to keep names or
  // to capitalize after a colon, these fail and the copy must be rewritten.
  test("the documented limits are still true", () => {
    expect(convert("Meeting With John Smith In Paris", "sentence")).toBe("Meeting with john smith in paris")
    expect(convert("Title Case Rules: A Practical Guide", "sentence")).toContain(": a practical")
  })

  test("the pronoun rule the page quotes is one the engine applies", () => {
    const reasons = convertWithExplanations(SENTENCE_CASE_EXAMPLES.pronoun.input, "sentence").explanations.map((e) => e.reason)
    expect(reasons).toContain("The pronoun \"I\" is always capitalized")
  })
})

describe("sentence case copy", () => {
  test("lists seven changes", () => {
    expect(SENTENCE_CASE_CHANGES).toHaveLength(7)
  })

  test("the page config's FAQ is the guide's FAQ, so structured data mirrors the page", () => {
    expect(SEO_CONFIG["sentence-case-converter"].faqs).toBe(SENTENCE_CASE_FAQS)
  })

  test("metadata stays within SEO length bounds", () => {
    const config = SEO_CONFIG["sentence-case-converter"]
    expect(config.title.length).toBeGreaterThanOrEqual(50)
    expect(config.title.length).toBeLessThanOrEqual(65)
    expect(config.description.length).toBeGreaterThanOrEqual(140)
    expect(config.description.length).toBeLessThanOrEqual(160)
  })
})
