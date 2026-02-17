import { describe, expect, test } from "vitest"

import { getContextualRuleGuidance } from "./rule-guidance"

describe("getContextualRuleGuidance", () => {
  test("returns style-specific guidance for title mode", () => {
    const guidance = getContextualRuleGuidance("title", "apa")

    expect(guidance.isStyleSpecific).toBe(true)
    expect(guidance.shortLabel).toBe("APA rules")
    expect(guidance.href).toBe("/capitalization-rules-guide?mode=title&style=apa")
    expect(guidance.description).toContain("APA")
    expect(guidance.description).toContain("context")
  })

  test("returns generic guidance for non-title modes", () => {
    const guidance = getContextualRuleGuidance("sentence", "ap")

    expect(guidance.isStyleSpecific).toBe(false)
    expect(guidance.shortLabel).toBe("Rules guide")
    expect(guidance.href).toBe("/capitalization-rules-guide?mode=sentence")
    expect(guidance.description).toContain("Title Case mode")
  })

  test("updates guidance target deterministically when title style changes", () => {
    const apGuidance = getContextualRuleGuidance("title", "ap")
    const chicagoGuidance = getContextualRuleGuidance("title", "chicago")

    expect(apGuidance.href).toContain("style=ap")
    expect(chicagoGuidance.href).toContain("style=chicago")
    expect(apGuidance.shortLabel).toBe("AP rules")
    expect(chicagoGuidance.shortLabel).toBe("Chicago rules")
  })

  test("switches between style-specific and generic guidance by mode", () => {
    const titleGuidance = getContextualRuleGuidance("title", "mla")
    const sentenceGuidance = getContextualRuleGuidance("sentence", "mla")

    expect(titleGuidance.isStyleSpecific).toBe(true)
    expect(titleGuidance.href).toContain("mode=title")
    expect(titleGuidance.href).toContain("style=mla")
    expect(sentenceGuidance.isStyleSpecific).toBe(false)
    expect(sentenceGuidance.href).toBe("/capitalization-rules-guide?mode=sentence")
  })
})
