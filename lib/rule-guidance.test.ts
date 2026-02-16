import { describe, expect, test } from "vitest"

import { getContextualRuleGuidance } from "./rule-guidance"

describe("getContextualRuleGuidance", () => {
  test("returns style-specific guidance for title mode", () => {
    const guidance = getContextualRuleGuidance("title", "apa")

    expect(guidance.isStyleSpecific).toBe(true)
    expect(guidance.shortLabel).toBe("APA rules")
    expect(guidance.href).toBe("/capitalization-rules-guide?mode=title&style=apa")
    expect(guidance.description).toContain("APA")
  })

  test("returns generic guidance for non-title modes", () => {
    const guidance = getContextualRuleGuidance("sentence", "ap")

    expect(guidance.isStyleSpecific).toBe(false)
    expect(guidance.shortLabel).toBe("Rules guide")
    expect(guidance.href).toBe("/capitalization-rules-guide?mode=sentence")
    expect(guidance.description).toContain("Title Case mode")
  })
})
