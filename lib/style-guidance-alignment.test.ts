import { describe, expect, test } from "vitest"

import {
  formatStyleGuidanceAlignmentMismatches,
  type StyleGuidanceAlignmentMismatch,
  runStyleGuidanceAlignmentQa,
} from "./style-guidance-alignment"

describe("runStyleGuidanceAlignmentQa", () => {
  test("covers every guidance example across all supported title styles", () => {
    const report = runStyleGuidanceAlignmentQa()

    expect(report.totalComparisons).toBeGreaterThanOrEqual(15)
    expect(report.stylesCovered).toEqual(["standard", "ap", "chicago", "mla", "apa"])
  })

  test("keeps converter output aligned with rules-guide examples", () => {
    const report = runStyleGuidanceAlignmentQa()
    if (report.mismatches.length > 0) {
      throw new Error(formatStyleGuidanceAlignmentMismatches(report.mismatches))
    }

    expect(report.mismatches).toEqual([])
  })

  test("remains deterministic across repeated runs", () => {
    const first = runStyleGuidanceAlignmentQa()
    const second = runStyleGuidanceAlignmentQa()

    expect(second).toEqual(first)
  })

  test("flags missing style output in fixtures as actionable mismatch", () => {
    const report = runStyleGuidanceAlignmentQa({
      examples: [
        {
          caseLabel: "Incomplete fixture",
          input: "walking during the light",
          outputs: {
            standard: "Walking during the Light",
            ap: "Walking During the Light",
            chicago: "Walking during the Light",
            mla: "Walking during the Light",
            // Intentionally incomplete for mismatch detection
            apa: undefined as unknown as string,
          },
          whyItMatters: "Fixture quality must be enforced.",
        },
      ],
      styles: ["apa"],
    })

    expect(report.totalComparisons).toBe(1)
    expect(report.mismatches.length).toBe(1)
    expect(report.mismatches[0]?.expected).toBe("<missing style output>")
  })

  test("formats mismatch details in multi-line actionable output", () => {
    const mismatches: StyleGuidanceAlignmentMismatch[] = [
      {
        scenarioId: "scenario-1",
        caseLabel: "Short connectors",
        input: "walking during the light",
        style: "ap",
        expected: "Walking During the Light",
        actual: "Walking during the Light",
      },
    ]

    const message = formatStyleGuidanceAlignmentMismatches(mismatches)

    expect(message).toContain("Style guidance alignment mismatches detected (1)")
    expect(message).toContain("scenario-1 (Short connectors)")
    expect(message).toContain("style: ap")
    expect(message).toContain("expected: Walking During the Light")
    expect(message).toContain("actual: Walking during the Light")
  })
})
