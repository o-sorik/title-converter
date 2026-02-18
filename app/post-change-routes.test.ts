import { describe, expect, test } from "vitest"
import sitemap from "./sitemap"
import { CONVERTER_SLUGS } from "@/lib/seo-config"
import { blogArticles, blogCategories } from "@/components/blog/data"
import { getBlogArticleMetadataBySlug } from "@/lib/blog-view-model"

describe("post-change route validation", () => {
  test("sitemap contains all priority static routes and no duplicates", () => {
    const entries = sitemap()
    const urls = entries.map((entry) => entry.url)
    const unique = new Set(urls)

    expect(unique.size).toBe(urls.length)
    expect(urls).toContain("https://titlecaseconverter.online")
    expect(urls).toContain("https://titlecaseconverter.online/blog")
    expect(urls).toContain("https://titlecaseconverter.online/blog/categories")
  })

  test("sitemap contains all converter, category, and article routes", () => {
    const entries = sitemap()
    const urls = new Set(entries.map((entry) => entry.url))
    const baseUrl = "https://titlecaseconverter.online"

    for (const slug of CONVERTER_SLUGS) {
      expect(urls.has(`${baseUrl}/${slug}`)).toBe(true)
    }

    for (const category of blogCategories) {
      expect(urls.has(`${baseUrl}/blog/categories/${category.id}`)).toBe(true)
    }

    for (const article of blogArticles) {
      expect(urls.has(`${baseUrl}/blog/${article.slug}`)).toBe(true)
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
