import { CONVERTER_SLUGS } from "@/lib/seo-config"
import { SITE_URL } from "@/lib/constants"
import { blogArticles, blogCategories } from "@/components/blog/data"

export const revalidate = 86400

export function GET() {
    const converterLinks = CONVERTER_SLUGS.map(
        (slug) => `- [${slug.replaceAll("-", " ")}](${SITE_URL}/${slug})`,
    ).join("\n")

    // Every article, grouped by category. The file previously listed only the
    // blog index, so none of the individual guides – including the whole
    // Writing Statistics cluster built for citation – were discoverable here.
    const articleSections = blogCategories
        .map((category) => {
            const articles = blogArticles.filter((article) => article.categoryId === category.id)
            if (articles.length === 0) return null

            const links = articles
                .map((article) => `- [${article.title}](${SITE_URL}/blog/${article.slug}): ${article.excerpt}`)
                .join("\n")

            return `### ${category.name}\n\n${links}`
        })
        .filter(Boolean)
        .join("\n\n")

    const body = `# Title Case Converter

> Free online tool that converts text to Title Case, Sentence Case, camelCase, PascalCase,
> snake_case, kebab-case, and more. Supports AP, APA, MLA, and Chicago style guides.
> All conversion happens client-side; no signup, no tracking.

## Core Pages

- [Title Case Converter](${SITE_URL}/): main conversion tool
- [Batch Headline Checker](${SITE_URL}/batch-checker): check multiple headlines at once
- [Capitalization Rules Guide](${SITE_URL}/capitalization-rules-guide): full rules reference for AP, APA, MLA, Chicago

## Converters

${converterLinks}

## Blog

- [Grammar & Style Guides Blog](${SITE_URL}/blog): capitalization guides and writing tips
- [RSS feed](${SITE_URL}/blog/feed.xml)

## Articles

${articleSections}

## Editorial

- [About](${SITE_URL}/about)
- [Editorial Policy](${SITE_URL}/editorial-policy)
- [Contact](${SITE_URL}/contact)

## Sitemap

- [XML sitemap](${SITE_URL}/sitemap.xml)
`

    return new Response(body, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    })
}
