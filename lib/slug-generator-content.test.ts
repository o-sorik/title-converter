import { describe, expect, test } from "vitest"

import { convert } from "./converters"
import { SEO_CONFIG } from "./seo-config"
import { SLUG_STOP_WORDS } from "./slug"
import {
  DIAGRAM_CALLOUTS,
  DIAGRAM_INPUT,
  DIAGRAM_OUTPUT,
  SLUG_CHANGES,
  SLUG_EXAMPLES,
  SLUG_FAQS,
  SLUG_VS_CASES,
} from "./slug-generator-content"

describe("slug generator examples", () => {
  test("every documented output matches the engine", () => {
    for (const [id, example] of Object.entries(SLUG_EXAMPLES)) {
      const options = id === "stopWordsRemoved" ? { removeStopWords: true } : {}
      expect(convert(example.input, "slug", options), id).toBe(example.output)
    }
  })

  test("the slug, kebab and snake row matches all three modes", () => {
    expect(convert(SLUG_VS_CASES.input, "slug")).toBe(SLUG_VS_CASES.slug)
    expect(convert(SLUG_VS_CASES.input, "kebab")).toBe(SLUG_VS_CASES.kebab)
    expect(convert(SLUG_VS_CASES.input, "snake")).toBe(SLUG_VS_CASES.snake)
  })

  test("the diagram shows the engine's real output and every callout is on it", () => {
    expect(convert(DIAGRAM_INPUT, "slug")).toBe(DIAGRAM_OUTPUT)
    const words = DIAGRAM_OUTPUT.split("-")
    for (const callout of DIAGRAM_CALLOUTS) expect(words, callout.word).toContain(callout.word)
  })

  // The listing quotes these outputs inline. If the engine changes, the copy must too.
  test("inline examples in the list of changes are what the engine does", () => {
    expect(convert("Don't", "slug")).toBe("dont")
    expect(convert("Café", "slug")).toBe("cafe")
    expect(convert("ß", "slug")).toBe("ss")
    expect(convert("Å", "slug")).toBe("a")
    expect(convert("Next.js", "slug")).toBe("next-js")
    expect(convert("2.5", "slug")).toBe("2-5")
    expect(convert("10%", "slug")).toBe("10")
    expect(convert("iPhone", "slug")).toBe("iphone")
    expect(convert("C++", "slug")).toBe(convert("C#", "slug"))
    expect(encodeURIComponent("café")).toBe("caf%C3%A9")
  })
})

describe("slug generator copy", () => {
  test("lists eight changes, as the heading vector does", () => {
    expect(SLUG_CHANGES).toHaveLength(8)
  })

  test("the stop words the page prints are the engine's list", () => {
    expect(SLUG_STOP_WORDS.length).toBe(18)
  })

  test("the page config's FAQ is the guide's FAQ, so structured data mirrors the page", () => {
    expect(SEO_CONFIG["slug-generator"].faqs).toBe(SLUG_FAQS)
    expect(SEO_CONFIG["slug-generator"].mode).toBe("slug")
  })

  test("title uses an en dash and the description stays within SEO bounds", () => {
    const config = SEO_CONFIG["slug-generator"]
    expect(config.title).toContain(" – ")
    expect(config.title).not.toContain("—")
    expect(config.description.length).toBeGreaterThanOrEqual(140)
    expect(config.description.length).toBeLessThanOrEqual(160)
  })
})
