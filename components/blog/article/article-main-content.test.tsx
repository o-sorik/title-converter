import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, test } from "vitest"
import { ArticleMainContent } from "./article-main-content"

describe("ArticleMainContent", () => {
  test("renders IsX template for articles with IsX data", () => {
    const html = renderToStaticMarkup(
      <ArticleMainContent
        article={{
          slug: "and-capitalized-in-title-case",
          title: "Is \"And\" Capitalized in Title Case? Quick Rule + Examples",
          excerpt: "Fast answer for whether and should be capitalized in title case.",
          categoryId: "grammar-101",
          author: "Oleh Kovalenko",
          updatedAt: "2026-02-18",
          readTime: "4 min read",
          image: "/images/blog/generated/checklist-desk-cover.webp",
        }}
      />
    )

    expect(html).toContain("Quick Answer")
    expect(html).toContain('data-testid="is-x-related"')
    expect(html).toContain("FANBOYS")
    expect(html).toContain("ctx_input=Of%20Mice%20and%20Men")
    expect(html).not.toContain('data-testid="grammar-101-short-answer"')
  })

  test("falls through to Grammar101 for non-IsX high-intent article", () => {
    const html = renderToStaticMarkup(
      <ArticleMainContent
        article={{
          slug: "of-capitalized-in-title-case",
          title: "Is \"Of\" Capitalized in Title Case? Editorial Baseline",
          excerpt: "See when \"of\" stays lowercase and when positional rules require capitalization.",
          categoryId: "grammar-101",
          author: "Oleh Kovalenko",
          updatedAt: "2026-02-18",
          readTime: "4 min read",
          image: "/images/blog/generated/ap-typewriter-cover.webp",
        }}
        converterContext={{
          input: "history of modern marketing",
          mode: "title",
          titleStyle: "ap",
          outputMode: "title",
          outputTitleStyle: "ap",
        }}
      />
    )

    expect(html).toContain("Short Answer")
    expect(html).toContain('data-testid="grammar-101-short-answer"')
    expect(html).toContain('href="/?ctx_ref=latest')
    expect(html).toContain("ctx_input=history+of+modern+marketing")
    expect(html).not.toContain("Quick Answer")
  })
})
