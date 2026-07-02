import { blogArticles, getCategoryById } from "@/components/blog/data"
import { toIsoDateTime } from "@/lib/blog-date"
import { SITE_URL } from "@/lib/constants"

export const revalidate = 86400

function escapeXml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;")
}

export function GET() {
    const items = [...blogArticles]
        .sort((a, b) => toIsoDateTime(b.updatedAt).localeCompare(toIsoDateTime(a.updatedAt)))
        .map((article) => {
            const url = `${SITE_URL}/blog/${article.slug}`
            const category = getCategoryById(article.categoryId)
            return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      ${category ? `<category>${escapeXml(category.name)}</category>` : ""}
      <pubDate>${new Date(toIsoDateTime(article.updatedAt)).toUTCString()}</pubDate>
    </item>`
        })
        .join("\n")

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Title Case Converter Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Capitalization guides and writing tips aligned with AP, APA, MLA, and Chicago style.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
        },
    })
}
