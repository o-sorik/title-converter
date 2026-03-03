import { expect, test } from "vitest"
import { metadata, revalidate } from "./page"
import { SITE_URL } from "@/lib/constants"

const canonicalUrl = `${SITE_URL}/batch-checker`

test("batch-checker metadata has correct canonical URL", () => {
    expect(metadata.alternates?.canonical).toBe(canonicalUrl)
})

test("batch-checker metadata title is set and within length bounds", () => {
    const title = typeof metadata.title === "object" && "absolute" in metadata.title
        ? metadata.title.absolute
        : metadata.title as string
    expect(typeof title).toBe("string")
    expect((title as string).length).toBeGreaterThanOrEqual(30)
    expect((title as string).length).toBeLessThanOrEqual(70)
})

test("batch-checker metadata description is set and within length bounds", () => {
    expect(typeof metadata.description).toBe("string")
    expect((metadata.description as string).length).toBeGreaterThanOrEqual(100)
    expect((metadata.description as string).length).toBeLessThanOrEqual(165)
})

test("batch-checker page has revalidate export", () => {
    expect(typeof revalidate).toBe("number")
    expect(revalidate).toBeGreaterThan(0)
})

test("batch-checker openGraph includes canonical URL and siteName", () => {
    expect(metadata.openGraph?.url).toBe(canonicalUrl)
    expect(metadata.openGraph?.siteName).toBe("Title Case Converter Online")
})
