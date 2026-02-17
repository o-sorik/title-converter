import { describe, expect, test } from "vitest"

import {
  formatStyleGuidanceAlignmentMismatches,
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
})
