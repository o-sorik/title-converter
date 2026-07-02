import { ImageResponse } from "next/og"
import { ogImageLayout } from "@/lib/og-image-layout"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Blog Categories – Title Case Converter"

export default function Image() {
    return new ImageResponse(
        ogImageLayout({
            title: "Blog Categories",
            subtitle: "Browse capitalization guides by style guide and topic",
        }),
        { ...size },
    )
}
