import { ImageResponse } from "next/og"
import { ogImageLayout } from "@/lib/og-image-layout"
import { blogCategories, getCategoryById } from "@/components/blog/data"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
    return blogCategories.map((c) => ({ category: c.id }))
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params
    const currentCategory = getCategoryById(category)

    return new ImageResponse(
        ogImageLayout({
            title: currentCategory ? `${currentCategory.name} Guides` : "Blog Category",
            subtitle: currentCategory?.description,
        }),
        { ...size },
    )
}
