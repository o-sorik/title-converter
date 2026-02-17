import { describe, expect, test } from "vitest"

import { getRulesGuideViewModel } from "./rules-guide-content"

describe("getRulesGuideViewModel", () => {
  test("returns style-relevant AP metadata and examples", () => {
    const model = getRulesGuideViewModel("ap", "title")

    expect(model.activeStyle).toBe("ap")
    expect(model.styleTitle).toContain("AP")
    expect(model.examples.length).toBeGreaterThan(1)
    expect(model.examples[0]?.outputs.ap).toBe("Walking During the Light")
  })

  test("falls back to standard style for unknown style params", () => {
    const model = getRulesGuideViewModel("unknown-style", "title")

    expect(model.activeStyle).toBe("standard")
    expect(model.styleTitle).toContain("Standard")
  })

  test("provides clear return action for non-title mode", () => {
    const model = getRulesGuideViewModel("mla", "sentence")

    expect(model.returnHref).toBe("/sentence-case-converter")
    expect(model.returnLabel).toContain("Return")
  })

  test("falls back to title converter when mode has no dedicated route", () => {
    const model = getRulesGuideViewModel("apa", "inverse")

    expect(model.returnHref).toBe("/")
    expect(model.returnLabel).toBe("Return to Title Case Converter")
  })
})
