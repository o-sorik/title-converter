import { describe, expect, test } from "vitest"
import {
  getHighIntentBlogHref,
  getHighIntentConverterHref,
  getHighIntentEntryFromInput,
  getHighIntentGuidanceBySlug,
  getHighIntentGuidanceSlugs,
  getHighIntentRelatedEntries,
} from "./high-intent-guidance"

describe("high-intent guidance catalog", () => {
  test("returns known slugs for static route generation", () => {
    const slugs = getHighIntentGuidanceSlugs()

    expect(slugs.length).toBeGreaterThanOrEqual(6)
    expect(slugs).toContain("and-capitalized-in-title-case")
    expect(slugs).toContain("is-capitalized-in-title-case")
  })

  test("resolves entry by slug and includes required rule content", () => {
    const entry = getHighIntentGuidanceBySlug("and-capitalized-in-title-case")

    expect(entry).not.toBeNull()
    expect(entry?.term).toBe("and")
    expect(entry?.h1).toContain("And")
    expect(entry?.examples.length).toBeGreaterThanOrEqual(3)
    expect(entry?.quickAnswer).toContain("usually lowercase")
  })

  test("returns null for unknown slug", () => {
    expect(getHighIntentGuidanceBySlug("unknown-intent")).toBeNull()
  })

  test("builds related entries list from related slugs", () => {
    const entry = getHighIntentGuidanceBySlug("to-capitalized-in-title-case")
    if (!entry) throw new Error("Expected known entry for test fixture")

    const related = getHighIntentRelatedEntries(entry)

    expect(related.length).toBeGreaterThan(0)
    expect(related.every((candidate) => candidate.slug !== entry.slug)).toBe(true)
  })

  test("builds converter href with context and prefilled input", () => {
    const href = getHighIntentConverterHref("how to scale editorial workflows")

    expect(href).toContain("ctx_ref=latest")
    expect(href).toContain("ctx_mode=title")
    expect(href).toContain("ctx_style=standard")
    expect(href).toContain("ctx_output_mode=title")
    expect(href).toContain("ctx_input=how+to+scale+editorial+workflows")
  })

  test("matches high-intent entry from capitalization query input", () => {
    const entry = getHighIntentEntryFromInput("Is and capitalized in a title?")
    expect(entry?.slug).toBe("and-capitalized-in-title-case")
  })

  test("returns null when converter input does not match high-intent query shape", () => {
    expect(getHighIntentEntryFromInput("how to write better headlines")).toBeNull()
  })

  test("builds blog continuity href with converter context", () => {
    const entry = getHighIntentGuidanceBySlug("is-capitalized-in-title-case")
    if (!entry) throw new Error("Expected known entry")
    const href = getHighIntentBlogHref(entry, {
      input: "is this production-ready",
      mode: "title",
      titleStyle: "ap",
      outputMode: "title",
      outputTitleStyle: "ap",
    })

    expect(href).toContain(`/blog/${entry.slug}?`)
    expect(href).toContain("ctx_mode=title")
    expect(href).toContain("ctx_style=ap")
    expect(href).toContain("ctx_input=is+this+production-ready")
  })

  test("keeps template-required fields complete for all high-intent entries", () => {
    const slugs = getHighIntentGuidanceSlugs()

    for (const slug of slugs) {
      const entry = getHighIntentGuidanceBySlug(slug)
      expect(entry).not.toBeNull()
      expect(entry?.quickAnswer.length).toBeGreaterThan(20)
      expect(entry?.ruleSummary.length).toBeGreaterThan(20)
      expect(entry?.partOfSpeech.length).toBeGreaterThan(3)
      expect(entry?.posLogic.length).toBeGreaterThan(20)
      expect(entry?.whyPeopleGetThisWrong.length).toBeGreaterThan(20)
      expect(entry?.specialCases.length).toBeGreaterThanOrEqual(2)
      expect(entry?.attestedUsage.length).toBeGreaterThanOrEqual(1)
      expect(entry?.attestedUsage[0]?.publisher.length).toBeGreaterThan(2)
      expect(entry?.attestedUsage[0]?.url.startsWith("https://")).toBe(true)
      expect(entry?.attestedUsage[0]?.date_checked).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(entry?.attestedUsage[0]?.style_context.length).toBeGreaterThan(1)
      expect(entry?.examples.length).toBeGreaterThanOrEqual(3)
      expect(entry?.styleNotes.standard.length).toBeGreaterThan(10)
      expect(entry?.styleNotes.ap.length).toBeGreaterThan(10)
      expect(entry?.styleNotes.apa.length).toBeGreaterThan(10)
      expect(entry?.styleNotes.mla.length).toBeGreaterThan(10)
      expect(entry?.styleNotes.chicago.length).toBeGreaterThan(10)
      expect(entry?.middlePositionVerdictByStyle.standard).toBeDefined()
      expect(entry?.middlePositionVerdictByStyle.ap).toBeDefined()
      expect(entry?.middlePositionVerdictByStyle.apa).toBeDefined()
      expect(entry?.middlePositionVerdictByStyle.mla).toBeDefined()
      expect(entry?.middlePositionVerdictByStyle.chicago).toBeDefined()
      expect(entry?.relatedSlugs.length).toBeGreaterThan(0)
    }
  })
})
