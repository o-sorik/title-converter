import { SITE_URL } from "@/lib/constants"

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@TitleCaseConverterOnline"

/** The homepage explainer, published on the brand channel on 17 Nov 2026. */
export const EXPLAINER_VIDEO = {
    id: "mFmx7wCDvLY",
    title: "Title Case Converter Online – AP, APA, Chicago & MLA, Explained Word by Word",
    description:
        "A one-minute tour: paste a headline, switch between AP, Chicago and MLA, and see the rule behind every word. Plus camelCase, snake_case, kebab-case, URL slugs and the Batch Checker.",
    uploadDate: "2026-11-17T06:52:29-08:00",
    duration: "PT1M1S",
    poster: "/images/video/title-case-converter-explainer.jpg",
} as const

export function youtubeWatchUrl(id: string): string {
    return `https://www.youtube.com/watch?v=${id}`
}

/** Public embed URL for structured data (the player itself uses the no-cookie domain). */
export function youtubeEmbedUrl(id: string): string {
    return `https://www.youtube.com/embed/${id}`
}

/** Player URL loaded only after the visitor clicks play: no YouTube cookies or scripts before that. */
export function youtubePlayerUrl(id: string): string {
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
}

export function explainerPosterUrl(): string {
    return `${SITE_URL}${EXPLAINER_VIDEO.poster}`
}
