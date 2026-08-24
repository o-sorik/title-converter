import { describe, expect, test } from "vitest"
import { getArticlePageViewModel, getBlogIndexPageViewModel } from "./blog-view-model"
import { blogArticles } from "@/components/blog/data"

describe("getBlogIndexPageViewModel", () => {
  // Asserts the ordering rule rather than today's three newest slugs. The
  // hardcoded version broke on every publish, which trained people to update
  // the expectation instead of reading it.
  test("prioritizes most recently updated guides in latest strip", () => {
    const model = getBlogIndexPageViewModel()
    const latest = model.latest

    expect(latest.length).toBeGreaterThan(0)

    // Sorted newest first.
    const dates = latest.map((article) => Date.parse(article.updatedAt))
    expect(dates).toEqual([...dates].sort((a, b) => b - a))

    // Nothing outside the strip is newer than the oldest entry in it.
    const cutoff = Math.min(...dates)
    const stripSlugs = new Set(latest.map((article) => article.slug))
    const newerOutside = blogArticles
      .filter((article) => !stripSlugs.has(article.slug))
      .filter((article) => Date.parse(article.updatedAt) > cutoff)
      .map((article) => article.slug)

    expect(newerOutside, `newer than the strip but excluded: ${newerOutside.join(", ")}`).toEqual([])
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

test("an article alone in its category still gets related links", () => {
  // Chicago has a single article. Category-only related lists left the sidebar
  // empty; authored relatedSlugs now fill it.
  const model = getArticlePageViewModel("chicago-title-case")
  expect(model).not.toBeNull()
  if (!model) return

  expect(model.related.length).toBeGreaterThan(0)
  expect(model.related.every((article) => article.slug !== "chicago-title-case")).toBe(true)
})

test("every article has at least one related link", () => {
  const empty = blogArticles
    .map((article) => article.slug)
    .filter((slug) => (getArticlePageViewModel(slug)?.related.length ?? 0) === 0)

  expect(empty, `articles with no related links: ${empty.join(", ")}`).toEqual([])
})
