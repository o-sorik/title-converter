import { convert, type TitleCaseStyle } from "./converters"
import { getRulesGuideViewModel, type GuidanceStyle } from "./rules-guide-content"

const SUPPORTED_STYLES: TitleCaseStyle[] = ["standard", "ap", "chicago", "mla", "apa"]

export interface StyleGuidanceAlignmentMismatch {
  scenarioId: string
  caseLabel: string
  input: string
  style: GuidanceStyle
  expected: string
  actual: string
}

export interface StyleGuidanceAlignmentReport {
  totalComparisons: number
  stylesCovered: TitleCaseStyle[]
  mismatches: StyleGuidanceAlignmentMismatch[]
}

export function runStyleGuidanceAlignmentQa(): StyleGuidanceAlignmentReport {
  const model = getRulesGuideViewModel("standard", "title")
  const mismatches: StyleGuidanceAlignmentMismatch[] = []

  model.examples.forEach((example, index) => {
    const scenarioId = `scenario-${index + 1}`

    SUPPORTED_STYLES.forEach((style) => {
      const expected = example.outputs[style]
      const actual = convert(example.input, "title", { titleStyle: style })

      if (actual !== expected) {
        mismatches.push({
          scenarioId,
          caseLabel: example.caseLabel,
          input: example.input,
          style,
          expected,
          actual,
        })
      }
    })
  })

  return {
    totalComparisons: model.examples.length * SUPPORTED_STYLES.length,
    stylesCovered: SUPPORTED_STYLES,
    mismatches,
  }
}

export function formatStyleGuidanceAlignmentMismatches(
  mismatches: StyleGuidanceAlignmentMismatch[]
): string {
  if (mismatches.length === 0) {
    return "No style guidance alignment mismatches detected."
  }

  const lines = mismatches.map((mismatch) => {
    return [
      `${mismatch.scenarioId} | ${mismatch.caseLabel} | style=${mismatch.style}`,
      `input: ${mismatch.input}`,
      `expected: ${mismatch.expected}`,
      `actual: ${mismatch.actual}`,
    ].join(" | ")
  })

  return `Style guidance alignment mismatches detected (${mismatches.length}):\n${lines.join("\n")}`
}
