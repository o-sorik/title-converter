import { describe, expect, test } from "vitest"
import { performance } from "node:perf_hooks"
import fs from "node:fs"
import path from "node:path"
import { convert, type ConversionType, type TitleCaseStyle } from "./converters"

const SAMPLE_INPUTS = [
  "is and capitalized in title case",
  "how to write cleaner editorial headlines for seo",
  "state-of-the-art methods in ai-driven content planning",
  "NASA and the future of U.S. policy in 2026",
  "quick check: should 'to' be capitalized in a subtitle?",
  "fix THIS mixedCase headline before publishing",
]

const MODES: ConversionType[] = ["title", "sentence", "upper", "lower", "camel", "pascal", "snake", "kebab"]
const TITLE_STYLES: TitleCaseStyle[] = ["standard", "ap", "apa", "mla", "chicago"]
const P95_LIMIT_MS = 2000
const PERFORMANCE_ARTIFACT_PATH = path.resolve(
  "_bmad-output/implementation-artifacts/converter-performance-status.json"
)

function percentile(values: number[], p: number) {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const index = Math.ceil((p / 100) * sorted.length) - 1
  return sorted[Math.max(0, Math.min(sorted.length - 1, index))]
}

describe("converter performance validation", () => {
  test("core conversion p95 stays below 2 seconds for representative input", () => {
    const samples: number[] = []

    for (let iteration = 0; iteration < 20; iteration += 1) {
      for (const input of SAMPLE_INPUTS) {
        for (const mode of MODES) {
          const start = performance.now()
          if (mode === "title") {
            for (const style of TITLE_STYLES) {
              convert(input, mode, { titleStyle: style })
            }
          } else {
            convert(input, mode)
          }
          samples.push(performance.now() - start)
        }
      }
    }

    const p95 = percentile(samples, 95)
    const payload = {
      generated_at: new Date().toISOString(),
      p95_ms: Number(p95.toFixed(3)),
      threshold_ms: P95_LIMIT_MS,
      sample_count: samples.length,
      passed: p95 <= P95_LIMIT_MS,
    }

    fs.mkdirSync(path.dirname(PERFORMANCE_ARTIFACT_PATH), { recursive: true })
    fs.writeFileSync(PERFORMANCE_ARTIFACT_PATH, `${JSON.stringify(payload, null, 2)}\n`)

    console.log(`CONVERTER_P95_MS=${payload.p95_ms}`)
    expect(p95).toBeLessThanOrEqual(P95_LIMIT_MS)
  })
})
