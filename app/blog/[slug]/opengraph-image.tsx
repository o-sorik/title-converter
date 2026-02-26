import { ImageResponse } from "next/og"
import { ogImageLayout } from "@/lib/og-image-layout"
import { getArticleBySlug, blogArticles } from "@/components/blog/data"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
    return blogArticles.map((a) => ({ slug: a.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = getArticleBySlug(slug)

    return new ImageResponse(
        ogImageLayout({
            title: article?.title ?? "Blog Article",
            subtitle: article ? `By ${article.author}` : undefined,
        }),
        { ...size },
    )
}
