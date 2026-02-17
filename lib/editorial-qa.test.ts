import { describe, expect, test } from "vitest"

import { runEditorialQaBatch } from "./editorial-qa"

describe("runEditorialQaBatch", () => {
  test("evaluates consistency for batch items under one standard", () => {
    const result = runEditorialQaBatch(
      "Walking During the Light\nwalking during the light\n",
      "title",
      "ap"
    )

    expect(result.standardLabel).toBe("title (AP)")
    expect(result.total).toBe(2)
    expect(result.consistentCount).toBe(1)
    expect(result.needsCorrectionCount).toBe(1)
    expect(result.items[1]?.converted).toBe("Walking During the Light")
    expect(result.items[1]?.isConsistent).toBe(false)
  })

  test("supports rapid lower-case QA checks for multiple lines", () => {
    const result = runEditorialQaBatch(
      "HELLO WORLD\nhello world",
      "lower",
      "standard"
    )

    expect(result.standardLabel).toBe("lower")
    expect(result.total).toBe(2)
    expect(result.consistentCount).toBe(1)
    expect(result.needsCorrectionCount).toBe(1)
    expect(result.items[0]?.converted).toBe("hello world")
  })

  test("ignores blank lines in batch input", () => {
    const result = runEditorialQaBatch("\n\nhello world\n\n", "sentence", "standard")

    expect(result.total).toBe(1)
    expect(result.items[0]?.source).toBe("hello world")
  })
})
