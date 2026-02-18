import { describe, expect, test } from "vitest"
import {
  buildPrioritizedBacklogFromCsv,
  ingestAhrefsCsv,
  prioritizeGrammar101Keywords,
} from "./ahrefs-grammar101-intake.mjs"

describe("ahrefs grammar-101 intake", () => {
  test("normalizes and deduplicates capitalization queries", () => {
    const csv = [
      "Keyword,Volume,KD,Traffic Potential,SERP intent hints",
      "\"Is AND capitalized in title case?\",1200,45,900,informational",
      "\"is and capitalized in title case\",1100,48,890,informational",
      "\"Is and capitalized?\",300,40,250,mixed",
    ].join("\n")

    const rows = ingestAhrefsCsv(csv)

    expect(rows).toHaveLength(2)
    expect(rows.map((row) => row.normalizedKeyword)).toEqual([
      "is and capitalized in title case",
      "is and capitalized",
    ])
  })

  test("accepts ahrefs tsv-style exports with intents and difficulty headers", () => {
    const tsv = [
      "\"#\"\t\"Keyword\"\t\"Difficulty\"\t\"Volume\"\t\"Traffic potential\"\t\"Intents\"",
      "\"1\"\t\"Is to capitalized in title case\"\t\"30\"\t\"1800\"\t\"1200\"\t\"Informational\"",
    ].join("\n")

    const rows = ingestAhrefsCsv(tsv)

    expect(rows).toHaveLength(1)
    expect(rows[0]?.normalizedKeyword).toBe("is to capitalized in title case")
    expect(rows[0]?.kd).toBe(30)
    expect(rows[0]?.serpIntentHints).toBe("Informational")
  })

  test("maps every ingested keyword to canonical target with cluster + intent", () => {
    const rows = prioritizeGrammar101Keywords([
      {
        sourceKeyword: "Is the capitalized in title case?",
        normalizedKeyword: "is the capitalized in title case",
        volume: 1000,
        kd: 34,
        trafficPotential: 800,
        serpIntentHints: "informational",
      },
      {
        sourceKeyword: "Is the capitalized?",
        normalizedKeyword: "is the capitalized",
        volume: 500,
        kd: 22,
        trafficPotential: 350,
        serpIntentHints: "mixed",
      },
      {
        sourceKeyword: "Capitalized words in headlines",
        normalizedKeyword: "capitalized words in headlines",
        volume: 250,
        kd: 30,
        trafficPotential: 180,
        serpIntentHints: "informational",
      },
    ])

    expect(rows).toHaveLength(3)
    expect(rows.every((row) => row.canonical_target_url_candidate.length > 0)).toBe(true)
    expect(rows[0]?.intent_class).toBeDefined()
    expect(rows[0]?.cluster_label).toBeDefined()
  })

  test("flags cross-cluster term collisions and assigns publish priority", () => {
    const rows = prioritizeGrammar101Keywords(
      [
        {
          sourceKeyword: "Is in capitalized in title case?",
          normalizedKeyword: "is in capitalized in title case",
          volume: 3000,
          kd: 35,
          trafficPotential: 2200,
          serpIntentHints: "informational",
        },
        {
          sourceKeyword: "Is in capitalized?",
          normalizedKeyword: "is in capitalized",
          volume: 1200,
          kd: 15,
          trafficPotential: 900,
          serpIntentHints: "informational",
        },
      ],
      { owner: "oleh", status: "ready-for-dev", startDate: "2026-02-18" }
    )

    expect(rows[0]?.publish_priority).toBe("P1")
    expect(rows[0]?.owner).toBe("oleh")
    expect(rows[0]?.status).toBe("ready-for-dev")
    expect(rows.every((row) => row.conflict_flag === "yes")).toBe(true)
    expect(rows[1]?.draft_target_date).toBe("2026-02-19")
  })

  test("supports configurable priority thresholds", () => {
    const rows = prioritizeGrammar101Keywords(
      [
        {
          sourceKeyword: "Is with capitalized in a title",
          normalizedKeyword: "is with capitalized in a title",
          volume: 4200,
          kd: 11,
          trafficPotential: 1400,
          serpIntentHints: "Informational",
        },
        {
          sourceKeyword: "Is from capitalized in a title",
          normalizedKeyword: "is from capitalized in a title",
          volume: 3200,
          kd: 18,
          trafficPotential: 900,
          serpIntentHints: "Informational",
        },
      ],
      { p1Threshold: 0.9, p2Threshold: 0.42 }
    )

    expect(rows[0]?.publish_priority).toBe("P1")
    expect(rows[1]?.publish_priority).toBe("P2")
  })

  test("builds prioritized backlog directly from csv contract", () => {
    const csv = [
      "Keyword,Volume,KD,Traffic Potential,SERP intent hints",
      "\"Is to capitalized in title case\",1800,55,1200,informational",
      "\"Is of capitalized\",900,20,600,informational",
      "\"capitalize heading words\",300,25,200,informational",
    ].join("\n")

    const backlog = buildPrioritizedBacklogFromCsv(csv, {
      owner: "seo-content",
      status: "backlog",
      startDate: "2026-02-20",
    })

    expect(backlog).toHaveLength(3)
    expect(backlog[2]?.canonical_term).toBe("heading words")
    expect(backlog[0]?.priority_score).toBeGreaterThanOrEqual(backlog[1]?.priority_score ?? 0)
    expect(backlog[1]?.priority_score).toBeGreaterThanOrEqual(backlog[2]?.priority_score ?? 0)
    expect(backlog[0]?.draft_target_date).toBe("2026-02-20")
  })
})
