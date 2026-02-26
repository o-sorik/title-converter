import { ImageResponse } from "next/og"
import { ogImageLayout } from "@/lib/og-image-layout"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Title Case Converter Online"

export default function Image() {
    return new ImageResponse(
        ogImageLayout({
            title: "Title Case Converter Online",
            subtitle: "Free text capitalization tool with AP, APA, MLA & Chicago support",
        }),
        { ...size },
    )
}
