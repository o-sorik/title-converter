import { ImageResponse } from "next/og"
import { ogImageLayout } from "@/lib/og-image-layout"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Batch Headline Checker"

export default function Image() {
    return new ImageResponse(
        ogImageLayout({
            title: "Batch Headline Checker",
            subtitle: "Check multiple headlines at once for consistent capitalization",
        }),
        { ...size },
    )
}
