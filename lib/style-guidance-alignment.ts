import { convert, type TitleCaseStyle } from "./converters"
import { getRulesGuideViewModel, type GuidanceExample, type GuidanceStyle } from "./rules-guide-content"

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

interface StyleGuidanceAlignmentQaOptions {
  examples?: GuidanceExample[]
  styles?: TitleCaseStyle[]
}

export function runStyleGuidanceAlignmentQa(
  options: StyleGuidanceAlignmentQaOptions = {}
): StyleGuidanceAlignmentReport {
  const model = getRulesGuideViewModel("standard", "title")
  const examples = options.examples ?? model.examples
  const styles = options.styles ?? SUPPORTED_STYLES
  const mismatches: StyleGuidanceAlignmentMismatch[] = []

  examples.forEach((example, index) => {
    const scenarioId = `scenario-${index + 1}`

    styles.forEach((style) => {
      const expected = example.outputs[style]
      const actual = convert(example.input, "title", { titleStyle: style })

      if (!expected || actual !== expected) {
        mismatches.push({
          scenarioId,
          caseLabel: example.caseLabel,
          input: example.input,
          style,
          expected: expected ?? "<missing style output>",
          actual,
        })
      }
    })
  })

  return {
    totalComparisons: examples.length * styles.length,
    stylesCovered: styles,
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
    return `${mismatch.scenarioId} (${mismatch.caseLabel})
  style: ${mismatch.style}
  input: ${mismatch.input}
  expected: ${mismatch.expected}
  actual: ${mismatch.actual}`
  })

  return `Style guidance alignment mismatches detected (${mismatches.length}):\n${lines.join("\n")}`
}
