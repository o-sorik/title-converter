import { ImageResponse } from "next/og"
import { ogImageLayout } from "@/lib/og-image-layout"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Editorial Policy – Title Case Converter"

export default function Image() {
    return new ImageResponse(
        ogImageLayout({
            title: "Editorial Policy",
            subtitle: "How we source, review, and update our style guidance",
        }),
        { ...size },
    )
}
