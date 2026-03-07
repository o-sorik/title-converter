import { describe, expect, test } from "vitest"
import sitemap from "./sitemap"
import { CONVERTER_SLUGS } from "@/lib/seo-config"
import { blogArticles, blogCategories } from "@/components/blog/data"
import { getBlogArticleMetadataBySlug } from "@/lib/blog-view-model"
import { IS_X_ARTICLES } from "@/lib/is-x-article-data"
import { SITE_URL } from "@/lib/constants"

describe("post-change route validation", () => {
  test("sitemap contains all priority static routes and no duplicates", () => {
    const entries = sitemap()
    const urls = entries.map((entry) => entry.url)
    const unique = new Set(urls)

    expect(unique.size).toBe(urls.length)
    expect(urls).toContain(SITE_URL)
    expect(urls).toContain(`${SITE_URL}/blog`)
    expect(urls).toContain(`${SITE_URL}/blog/categories`)
  })

  test("sitemap contains all converter, category, and article routes", () => {
    const entries = sitemap()
    const urls = new Set(entries.map((entry) => entry.url))
    for (const slug of CONVERTER_SLUGS) {
      expect(urls.has(`${SITE_URL}/${slug}`)).toBe(true)
    }

    for (const category of blogCategories) {
      expect(urls.has(`${SITE_URL}/blog/categories/${category.id}`)).toBe(true)
    }

    for (const article of blogArticles) {
      expect(urls.has(`${SITE_URL}/blog/${article.slug}`)).toBe(true)
    }
  })

  test("every IS_X_ARTICLES entry has a corresponding blogArticles entry (sitemap coverage)", () => {
    const blogSlugs = new Set(blogArticles.map((a) => a.slug))
    for (const isXArticle of IS_X_ARTICLES) {
      expect(
        blogSlugs.has(isXArticle.slug),
        `IS_X_ARTICLES slug "${isXArticle.slug}" is missing from blogArticles — it won't appear in the sitemap or blog listing`
      ).toBe(true)
    }
  })

  test("blog article metadata has canonical + title + description for all known slugs", () => {
    for (const article of blogArticles) {
      const metadata = getBlogArticleMetadataBySlug(article.slug)

      expect(metadata?.title).toBe(article.title)
      expect(metadata?.description).toBe(article.excerpt)
      expect(metadata?.alternates?.canonical).toBe(`/blog/${article.slug}`)
    }
  })
})
