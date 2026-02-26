import { ImageResponse } from "next/og"
import { ogImageLayout } from "@/lib/og-image-layout"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Capitalization Rules by Style Guide"

export default function Image() {
    return new ImageResponse(
        ogImageLayout({
            title: "Capitalization Rules by Style Guide",
            subtitle: "AP, APA, MLA, Chicago — side-by-side comparison",
        }),
        { ...size },
    )
}
