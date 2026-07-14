import { describe, expect, test } from "vitest"
import { getArticlePageViewModel, getBlogIndexPageViewModel } from "./blog-view-model"

describe("getBlogIndexPageViewModel", () => {
  test("prioritizes most recently updated guides in latest strip", () => {
    const model = getBlogIndexPageViewModel()
    const slugs = model.latest.map((article) => article.slug)

    expect(slugs).toContain("average-typing-speed")
    expect(slugs).toContain("how-long-should-a-blog-post-be")
    expect(slugs).toContain("commonly-misspelled-words")
  })
})

describe("getArticlePageViewModel", () => {
  test("uses contextual high-intent navigation for grammar 101 article", () => {
    const model = getArticlePageViewModel("and-capitalized-in-title-case")
    expect(model).not.toBeNull()
    if (!model) return

    expect(model.isHighIntentArticle).toBe(true)
    expect(model.relatedTitle).toBe("Related Capitalization Questions")
    expect(model.recommendedTitle).toBe("Next Grammar 101 topics")
    expect(model.related.map((item) => item.slug)).toEqual([
      "the-capitalized-in-title-case",
      "to-capitalized-in-title-case",
      "is-capitalized-in-title-case",
    ])
    expect(model.nextArticle?.slug).toBe("the-capitalized-in-title-case")
    expect(["the-capitalized-in-title-case", "to-capitalized-in-title-case"]).toContain(model.prevArticle?.slug)
  })

  test("keeps default navigation behavior for non-high-intent article", () => {
    const model = getArticlePageViewModel("apa-citing-titles")
    expect(model).not.toBeNull()
    if (!model) return

    expect(model.isHighIntentArticle).toBe(false)
    expect(model.relatedTitle).toBe("Related Guides")
    expect(model.recommendedTitle).toBe("Recommended Reading")
    expect(model.related.length).toBeGreaterThan(0)
  })
})
