import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { ExplainerVideo } from "./explainer-video"
import { VideoObjectJsonLd, WebApplicationJsonLd } from "./json-ld"
import {
    EXPLAINER_VIDEO,
    YOUTUBE_CHANNEL_URL,
    explainerPosterUrl,
    youtubeEmbedUrl,
    youtubePlayerUrl,
    youtubeWatchUrl,
} from "@/lib/explainer-video"

test("renders a poster and a play button, not the YouTube player, before a click", () => {
    const html = renderToStaticMarkup(<ExplainerVideo />)

    expect(html).toContain('aria-labelledby="see-it-in-action-heading"')
    expect(html).toContain("See It in Action")
    expect(html).toContain(`aria-label="Play video: ${EXPLAINER_VIDEO.title.replace("&", "&amp;")}"`)
    expect(html).not.toContain("<iframe")
    expect(html).not.toContain("youtube-nocookie.com")
})

test("links to the video on YouTube", () => {
    const html = renderToStaticMarkup(<ExplainerVideo />)

    expect(html).toContain(`href="${youtubeWatchUrl(EXPLAINER_VIDEO.id)}"`)
    expect(html).toContain("Watch on YouTube")
})

test("player loads from the no-cookie domain with autoplay after the click", () => {
    expect(youtubePlayerUrl("abc123")).toBe("https://www.youtube-nocookie.com/embed/abc123?autoplay=1&rel=0")
    expect(youtubeEmbedUrl("abc123")).toBe("https://www.youtube.com/embed/abc123")
})

test("VideoObject schema has the fields Google requires", () => {
    const html = renderToStaticMarkup(
        <VideoObjectJsonLd
            name={EXPLAINER_VIDEO.title}
            description={EXPLAINER_VIDEO.description}
            thumbnailUrl={explainerPosterUrl()}
            uploadDate={EXPLAINER_VIDEO.uploadDate}
            duration={EXPLAINER_VIDEO.duration}
            embedUrl={youtubeEmbedUrl(EXPLAINER_VIDEO.id)}
            url={youtubeWatchUrl(EXPLAINER_VIDEO.id)}
        />
    )
    const json = JSON.parse(html.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, ""))

    expect(json["@type"]).toBe("VideoObject")
    expect(json.name).toBe(EXPLAINER_VIDEO.title)
    expect(json.thumbnailUrl).toEqual(["https://titlecaseconverter.online/images/video/title-case-converter-explainer.jpg"])
    expect(json.uploadDate).toBe("2026-11-17T06:52:29-08:00")
    expect(json.duration).toBe("PT1M1S")
    expect(json.embedUrl).toBe("https://www.youtube.com/embed/mFmx7wCDvLY")
})

test("WebApplication schema lists the YouTube channel in sameAs only when given", () => {
    const parse = (html: string) => JSON.parse(html.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, ""))
    const withChannel = parse(renderToStaticMarkup(
        <WebApplicationJsonLd name="Title Case Converter Online" description="d" url="https://titlecaseconverter.online" sameAs={[YOUTUBE_CHANNEL_URL]} />
    ))
    const without = parse(renderToStaticMarkup(
        <WebApplicationJsonLd name="Title Case Converter Online" description="d" url="https://titlecaseconverter.online" />
    ))

    expect(withChannel.sameAs).toEqual(["https://www.youtube.com/@TitleCaseConverterOnline"])
    expect(without.sameAs).toBeUndefined()
})
