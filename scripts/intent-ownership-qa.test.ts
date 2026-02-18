import { describe, expect, test } from "vitest"
import { analyzeIntentOwnership } from "./intent-ownership-qa.mjs"

describe("intent ownership qa", () => {
  test("passes valid mapping and creates grouped url map rows", () => {
    const csv = [
      "normalized_keyword,canonical_term,canonical_target_url_candidate,intent_class,cluster_label,conflict_flag,status,priority_score",
      "is and capitalized in title case,and,/blog/is-and-capitalized-in-title-case,title-case-decision,cluster-1-title-case,no,backlog,0.82",
      "is and capitalized,and,/blog/is-and-capitalized,general-capitalization-decision,cluster-2-general-capitalization,no,backlog,0.76",
      "capitalize heading words,heading words,/blog/categories/grammar-101,capitalization-informational,cluster-3-writing-tips,no,backlog,0.51",
    ].join("\n")

    const result = analyzeIntentOwnership(csv)
    const errors = result.findings.filter((item) => item.level === "error")

    expect(errors).toHaveLength(0)
    expect(result.mapRows).toHaveLength(3)
    expect(result.mapRows.some((row) => row.target_url === "/blog/is-and-capitalized")).toBe(true)
  })

  test("flags duplicate primary query across urls", () => {
    const csv = [
      "normalized_keyword,canonical_term,canonical_target_url_candidate,intent_class,cluster_label,conflict_flag,status,priority_score",
      "is and capitalized,and,/blog/is-and-capitalized,general-capitalization-decision,cluster-2-general-capitalization,no,backlog,0.7",
      "is and capitalized,and,/blog/is-and-capitalized-in-title-case,title-case-decision,cluster-1-title-case,no,backlog,0.8",
    ].join("\n")

    const result = analyzeIntentOwnership(csv)
    expect(result.findings.some((item) => item.code === "duplicate-primary-query")).toBe(true)
  })

  test("flags publishing rows with unresolved conflict", () => {
    const csv = [
      "normalized_keyword,canonical_term,canonical_target_url_candidate,intent_class,cluster_label,conflict_flag,status,priority_score",
      "is of capitalized,of,/blog/is-of-capitalized,general-capitalization-decision,cluster-2-general-capitalization,yes,published,0.79",
    ].join("\n")

    const result = analyzeIntentOwnership(csv)
    expect(result.findings.some((item) => item.code === "publish-conflict-flag")).toBe(true)
  })
})
