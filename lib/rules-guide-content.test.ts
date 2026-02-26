import { describe, expect, test } from "vitest"

import {
  getRulesGuideViewModel,
  getRulesGuideViewModelWithContext,
  getRulesGuideHubViewModel,
  STYLE_GUIDE_SECTIONS,
  COMPARISON_SCENARIOS,
  RULES_PAGE_FAQS,
} from "./rules-guide-content"

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

describe("STYLE_GUIDE_SECTIONS", () => {
  test("covers all 5 style guides", () => {
    const ids = STYLE_GUIDE_SECTIONS.map((s) => s.id)
    expect(ids).toContain("standard")
    expect(ids).toContain("ap")
    expect(ids).toContain("apa")
    expect(ids).toContain("mla")
    expect(ids).toContain("chicago")
    expect(STYLE_GUIDE_SECTIONS).toHaveLength(5)
  })

  test("each section has required fields", () => {
    for (const section of STYLE_GUIDE_SECTIONS) {
      expect(section.name.length).toBeGreaterThan(0)
      expect(section.fullName.length).toBeGreaterThan(0)
      expect(section.description.length).toBeGreaterThan(20)
      expect(section.keyRules.length).toBeGreaterThanOrEqual(3)
      expect(section.sourceUrl).toMatch(/^https?:\/\//)
      expect(section.sourceName.length).toBeGreaterThan(0)
      expect(section.editionNote.length).toBeGreaterThan(0)
    }
  })
})

describe("COMPARISON_SCENARIOS", () => {
  test("has at least 6 scenarios", () => {
    expect(COMPARISON_SCENARIOS.length).toBeGreaterThanOrEqual(6)
  })

  test("each scenario has results for all 5 styles", () => {
    for (const scenario of COMPARISON_SCENARIOS) {
      expect(scenario.results.standard).toBeTruthy()
      expect(scenario.results.ap).toBeTruthy()
      expect(scenario.results.apa).toBeTruthy()
      expect(scenario.results.mla).toBeTruthy()
      expect(scenario.results.chicago).toBeTruthy()
    }
  })

  test("each scenario has non-empty notes", () => {
    for (const scenario of COMPARISON_SCENARIOS) {
      expect(scenario.notes.length).toBeGreaterThan(0)
    }
  })
})

describe("RULES_PAGE_FAQS", () => {
  test("has at least 4 FAQ items", () => {
    expect(RULES_PAGE_FAQS.length).toBeGreaterThanOrEqual(4)
  })

  test("each FAQ has question and answer", () => {
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
    expect(model.styleGuides).toHaveLength(5)
    expect(model.comparisonScenarios.length).toBeGreaterThanOrEqual(6)
    expect(model.faqs.length).toBeGreaterThanOrEqual(4)
    expect(model.examples.length).toBeGreaterThanOrEqual(3)
  })

  test("preserves converter context when provided", () => {
    const model = getRulesGuideHubViewModel("ap", "title", {
      input: "test",
      mode: "title",
      titleStyle: "ap",
      outputMode: "title",
      outputTitleStyle: "ap",
    })

    expect(model.returnHref).toContain("ctx_ref=latest")
  })
})
