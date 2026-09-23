import { describe, expect, test } from "vitest"

import { convert, convertWithExplanations } from "./converters"
import {
  ANATOMY_RULES,
  DISAGREEMENT_ROWS,
  ENGINE_REASON_SAMPLES,
  getRulesGuideViewModel,
  getRulesGuideViewModelWithContext,
  getRulesGuideHubViewModel,
  PUBLISHED_STYLES,
  RULES_GUIDE_EXAMPLES,
  RULES_PAGE_FAQS,
  SENTENCE_CASE_EXAMPLE,
  STYLE_SOURCES,
  UNIVERSAL_RULES,
} from "./rules-guide-content"

const ALL_STYLES = ["standard", "ap", "apa", "mla", "chicago"] as const

describe("getRulesGuideViewModel", () => {
  test("returns style-relevant AP metadata and every page example", () => {
    const model = getRulesGuideViewModel("ap", "title")

    expect(model.activeStyle).toBe("ap")
    expect(model.styleTitle).toContain("AP")
    expect(model.didFallbackToStandard).toBe(false)
    expect(model.examples).toHaveLength(Object.keys(RULES_GUIDE_EXAMPLES).length)
  })

  test("falls back to standard style for unknown style params with explicit signal", () => {
    const model = getRulesGuideViewModel("unknown-style", "title")

    expect(model.activeStyle).toBe("standard")
    expect(model.didFallbackToStandard).toBe(true)
    expect(model.requestedStyle).toBe("unknown-style")
    expect(model.styleTitle).toContain("Standard")
  })

  test("provides clear return action for non-title mode", () => {
    const model = getRulesGuideViewModel("mla", "sentence")

    expect(model.returnHref).toBe("/sentence-case-converter")
    expect(model.returnLabel).toBe("Return to Sentence Case Converter")
  })

  test("falls back to title converter when mode has no dedicated route", () => {
    const model = getRulesGuideViewModel("apa", "inverse")

    expect(model.returnHref).toBe("/")
    expect(model.returnLabel).toBe("Return to Title Case Converter")
  })

  test("preserves converter context in return href when available", () => {
    const model = getRulesGuideViewModelWithContext("ap", "title", {
      input: "hello world",
      mode: "title",
      titleStyle: "ap",
    })

    expect(model.returnHref).toContain("ctx_ref=latest")
    expect(model.returnHref).toContain("ctx_mode=title")
  })
})

describe("RULES_GUIDE_EXAMPLES", () => {
  test("every documented output matches the engine in every style", () => {
    for (const [id, example] of Object.entries(RULES_GUIDE_EXAMPLES)) {
      for (const style of ALL_STYLES) {
        expect(convert(example.input, "title", { titleStyle: style }), `${id} / ${style}`).toBe(example.outputs[style])
      }
    }
  })

  // <Example> on the page prints a single output, so it may only be used for
  // titles all four published guides agree on.
  test("single-output examples read the same in all four guides", () => {
    const singleOutput = [
      "article", "conjunction", "phrasalVerb", "infinitive", "firstWord", "subtitle", "lastWord",
      "hyphenated", "stepByStep", "irregular", "acronyms", "allCaps", "mixedCaps",
    ] as const
    for (const id of singleOutput) {
      const outputs = PUBLISHED_STYLES.map((style) => RULES_GUIDE_EXAMPLES[id].outputs[style])
      expect(new Set(outputs).size, id).toBe(1)
    }
  })

  test("the four-style example actually separates the thresholds", () => {
    const outputs = PUBLISHED_STYLES.map((style) => RULES_GUIDE_EXAMPLES.fourStyles.outputs[style])
    expect(new Set(outputs).size).toBe(3)
  })

  test("the anatomy diagram labels every word of its title", () => {
    expect(RULES_GUIDE_EXAMPLES.anatomy.outputs.mla.split(" ")).toHaveLength(ANATOMY_RULES.length)
  })

  test("the sentence-case example matches the engine", () => {
    expect(convert(SENTENCE_CASE_EXAMPLE.input, "sentence")).toBe(SENTENCE_CASE_EXAMPLE.output)
  })
})

describe("DISAGREEMENT_ROWS", () => {
  test("every verdict matches how the engine treats the word in its probe title", () => {
    for (const row of DISAGREEMENT_ROWS) {
      for (const style of PUBLISHED_STYLES) {
        const words = convert(row.probe, "title", { titleStyle: style }).split(/[^\p{L}]+/u)
        const matches = words.filter((word) => word.toLowerCase() === row.word)
        expect(matches, `${row.wordType}: "${row.word}" must appear once in "${row.probe}"`).toHaveLength(1)
        const actual = matches[0][0] === matches[0][0].toUpperCase() ? "Capitalize" : "Lowercase"
        expect(actual, `${row.wordType} / ${style}`).toBe(row.verdicts[style])
      }
    }
  })
})

describe("ENGINE_REASON_SAMPLES", () => {
  test("every quoted label is one the engine actually prints", () => {
    // The engine only labels words it changes, so also feed it titles already
    // converted in another style – the way a writer pastes a finished headline.
    const probes = [
      ...Object.values(RULES_GUIDE_EXAMPLES).flatMap((example) => [example.input, ...Object.values(example.outputs)]),
      ...DISAGREEMENT_ROWS.map((row) => row.probe),
      "How To Write a Headline",
    ]
    const reasons = new Set<string>()
    for (const probe of probes) {
      for (const style of ALL_STYLES) {
        for (const explanation of convertWithExplanations(probe, "title", { titleStyle: style }).explanations) {
          reasons.add(explanation.reason)
        }
      }
    }
    for (const sample of ENGINE_REASON_SAMPLES) {
      expect(reasons, sample).toContain(sample)
    }
  })
})

describe("page copy", () => {
  test("lists the seven shared rules", () => {
    expect(UNIVERSAL_RULES).toHaveLength(7)
  })

  test("cites a source for each published guide", () => {
    for (const style of PUBLISHED_STYLES) {
      expect(STYLE_SOURCES[style].url).toMatch(/^https:\/\//)
    }
  })

  test("each FAQ has a question and a real answer", () => {
    expect(RULES_PAGE_FAQS).toHaveLength(5)
    for (const faq of RULES_PAGE_FAQS) {
      expect(faq.question.endsWith("?")).toBe(true)
      expect(faq.answer.length).toBeGreaterThan(20)
    }
  })
})

describe("getRulesGuideHubViewModel", () => {
  test("includes base view model plus hub data", () => {
    const model = getRulesGuideHubViewModel("ap", "title")

    expect(model.activeStyle).toBe("ap")
    expect(model.hasStyleFocus).toBe(true)
    expect(model.faqs).toBe(RULES_PAGE_FAQS)
  })

  test("has no style focus when the visitor did not bring one", () => {
    expect(getRulesGuideHubViewModel(undefined, undefined).hasStyleFocus).toBe(false)
  })

  test("preserves converter context when provided", () => {
    const model = getRulesGuideHubViewModel("ap", "title", {
      input: "test",
      mode: "title",
      titleStyle: "ap",
    })

    expect(model.returnHref).toContain("ctx_ref=latest")
  })
})
