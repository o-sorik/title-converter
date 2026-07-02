import { describe, expect, test } from "vitest"
import {
  deriveTocFromSections,
  getArticleContentBySlug,
  getArticleTocItems,
  FAQ_SECTION_ID,
} from "./article-content"
import { WRITING_TIPS_ARTICLES } from "./writing-tips-article-data"

describe("getArticleContentBySlug", () => {
  test("dispatches by template priority: is-x wins over high-intent", () => {
    // Has both IsX data and a high-intent entry – the richer template owns the body.
    expect(getArticleContentBySlug("and-capitalized-in-title-case").template).toBe("is-x")
  })

  test("resolves each template family", () => {
    expect(getArticleContentBySlug("is-president-capitalized").template).toBe("gen-cap")
    expect(getArticleContentBySlug("what-words-are-not-capitalized-in-a-title").template).toBe("writing-tips")
    expect(getArticleContentBySlug("of-capitalized-in-title-case").template).toBe("grammar-101")
    expect(getArticleContentBySlug("apa-citing-titles").template).toBe("legacy")
  })
})

describe("deriveTocFromSections", () => {
  test("skips intro (no heading) and hidden sections, appends FAQ", () => {
    const toc = deriveTocFromSections(
      [
        { id: "intro", blocks: [] },
        { id: "one", heading: "Section One", blocks: [] },
        { id: "two", heading: "Long Heading", tocLabel: "Short label", blocks: [] },
        { id: "sources", heading: "Sources", hideFromToc: true, blocks: [] },
      ],
      true
    )

    expect(toc).toEqual([
      { id: "one", label: "Section One" },
      { id: "two", label: "Short label" },
      { id: FAQ_SECTION_ID, label: "FAQ" },
    ])
  })

  test("omits FAQ entry when the article has no FAQ items", () => {
    const toc = deriveTocFromSections([{ id: "one", heading: "Section One", blocks: [] }], false)
    expect(toc).toEqual([{ id: "one", label: "Section One" }])
  })
})

describe("getArticleTocItems", () => {
  test("writing-tips TOC is derived from its sections and matches section ids", () => {
    const article = WRITING_TIPS_ARTICLES[0]
    const toc = getArticleTocItems({ template: "writing-tips", data: article })
    const sectionIds = new Set(article.sections.map((section) => section.id))

    expect(toc.length).toBeGreaterThan(3)
    for (const item of toc) {
      if (item.id === FAQ_SECTION_ID) continue
      expect(sectionIds.has(item.id)).toBe(true)
    }
    // Sources section stays out of the TOC.
    expect(toc.some((item) => item.id === "sources")).toBe(false)
  })
})
