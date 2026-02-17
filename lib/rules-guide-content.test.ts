import { describe, expect, test } from "vitest"

import { getRulesGuideViewModel, getRulesGuideViewModelWithContext } from "./rules-guide-content"

describe("getRulesGuideViewModel", () => {
  test("returns style-relevant AP metadata and all ambiguity classes", () => {
    const model = getRulesGuideViewModel("ap", "title")

    expect(model.activeStyle).toBe("ap")
    expect(model.styleTitle).toContain("AP")
    expect(model.didFallbackToStandard).toBe(false)
    expect(model.examples.length).toBeGreaterThanOrEqual(3)
    expect(model.examples.map((example) => example.caseLabel)).toEqual(
      expect.arrayContaining([
        "Short connectors and prepositions",
        "Subtitle after colon",
        "Hyphenated and branded wording",
      ])
    )
    expect(model.examples[0]?.outputs.ap).toBe("Walking During the Light")
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
    const model = getRulesGuideViewModelWithContext(
      "ap",
      "title",
      {
        input: "hello world",
        mode: "title",
        titleStyle: "ap",
        outputMode: "title",
        outputTitleStyle: "ap",
      }
    )

    expect(model.returnHref).toContain("ctx_ref=latest")
    expect(model.returnHref).toContain("ctx_mode=title")
    expect(model.returnHref).toContain("ctx_output_mode=title")
  })
})
