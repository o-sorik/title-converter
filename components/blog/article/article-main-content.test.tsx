import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, test } from "vitest"
import { ArticleMainContent } from "./article-main-content"

describe("ArticleMainContent", () => {
  test("renders high-intent grammar 101 layout for mapped slug", () => {
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

    expect(html).toContain("Key Takeaway")
    expect(html).toContain('data-testid="grammar-101-key-takeaway"')
    expect(html).toContain('data-testid="grammar-101-rules"')
    expect(html).toContain('data-testid="grammar-101-examples"')
    expect(html).toContain('data-testid="grammar-101-style-verdicts"')
    expect(html).toContain('data-testid="grammar-101-related"')
    expect(html).toContain("Related Grammar 101 Questions")
    expect(html).toContain("According to <a")
    expect(html).toContain(">AP style</a>")
    expect(html).toContain("not capitalized")
    expect(html).toContain('href="/capitalization-rules-guide?mode=title&amp;style=ap"')
    expect(html).toContain('href="/blog/the-capitalized-in-title-case"')
    expect(html).toContain('href="/?ctx_ref=latest')
    expect(html).toContain("ctx_input=research+and+development+handbook")
  })
})
