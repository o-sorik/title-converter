import { ImageResponse } from "next/og"
import { ogImageLayout } from "@/lib/og-image-layout"
import { SEO_CONFIG, CONVERTER_SLUGS } from "@/lib/seo-config"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
    return CONVERTER_SLUGS.map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const config = SEO_CONFIG[slug]

    return new ImageResponse(
        ogImageLayout({ title: config?.h1 ?? "Text Converter" }),
        { ...size },
    )
}
