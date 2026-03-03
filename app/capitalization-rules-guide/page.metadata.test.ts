import { describe, expect, test } from "vitest"
import { metadata, revalidate } from "./page"
import { SITE_URL } from "@/lib/constants"

const canonicalUrl = `${SITE_URL}/capitalization-rules-guide`

describe("capitalization-rules-guide metadata", () => {
    test("has correct canonical URL", () => {
        expect(metadata.alternates?.canonical).toBe(canonicalUrl)
    })

    test("title is within SEO length bounds (50-65 chars)", () => {
        const title = typeof metadata.title === "string" ? metadata.title : ""
        expect(title.length).toBeGreaterThanOrEqual(50)
        expect(title.length).toBeLessThanOrEqual(65)
    })

    test("description is within SEO length bounds (140-160 chars)", () => {
        expect(typeof metadata.description).toBe("string")
        const desc = metadata.description as string
        expect(desc.length).toBeGreaterThanOrEqual(140)
        expect(desc.length).toBeLessThanOrEqual(160)
    })

    test("is set to index: true", () => {
        expect(metadata.robots).toMatchObject({ index: true, follow: true })
    })

    test("has revalidate export", () => {
        expect(typeof revalidate).toBe("number")
        expect(revalidate).toBeGreaterThan(0)
    })

    test("openGraph includes canonical URL and siteName", () => {
        const og = metadata.openGraph as Record<string, unknown>
        expect(og?.url).toBe(canonicalUrl)
        expect(og?.siteName).toBe("Title Case Converter Online")
    })

    test("twitter card is summary_large_image", () => {
        const twitter = metadata.twitter as Record<string, unknown>
        expect(twitter?.card).toBe("summary_large_image")
    })
})
