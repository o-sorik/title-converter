import { ImageResponse } from "next/og"
import { ogImageLayout } from "@/lib/og-image-layout"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Title Case Converter Blog"

export default function Image() {
    return new ImageResponse(
        ogImageLayout({
            title: "Grammar & Style Guides",
            subtitle: "Capitalization guides aligned with AP, APA, MLA & Chicago",
        }),
        { ...size },
    )
}
