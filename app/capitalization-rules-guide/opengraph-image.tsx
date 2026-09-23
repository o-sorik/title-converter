import { ImageResponse } from "next/og"
import { ogImageLayout } from "@/lib/og-image-layout"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Title Capitalization Rules by Style Guide"

export default function Image() {
    return new ImageResponse(
        ogImageLayout({
            title: "Title Capitalization Rules by Style Guide",
            subtitle: "What AP, APA, MLA and Chicago share, and where they disagree",
        }),
        { ...size },
    )
}
