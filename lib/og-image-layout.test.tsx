import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, test } from "vitest"
import { ogImageLayout } from "./og-image-layout"

describe("ogImageLayout", () => {
    test("returns a React element with the title", () => {
        const element = ogImageLayout({ title: "Hello World" })
        const html = renderToStaticMarkup(element)

        expect(html).toContain("Hello World")
        expect(html).toContain("titlecaseconverter.online")
        expect(html).toContain("T")
    })

    test("renders subtitle when provided", () => {
        const html = renderToStaticMarkup(
            ogImageLayout({ title: "Main Title", subtitle: "A subtitle here" })
        )

        expect(html).toContain("Main Title")
        expect(html).toContain("A subtitle here")
    })

    test("does not render subtitle when omitted", () => {
        const html = renderToStaticMarkup(
            ogImageLayout({ title: "Title Only" })
        )

        expect(html).toContain("Title Only")
        expect(html).not.toContain("subtitle")
    })

    test("uses smaller font for long titles (> 50 chars)", () => {
        const shortTitle = ogImageLayout({ title: "Short" })
        const longTitle = ogImageLayout({ title: "A Very Long Title That Definitely Exceeds Fifty Characters In Length" })

        const shortHtml = renderToStaticMarkup(shortTitle)
        const longHtml = renderToStaticMarkup(longTitle)

        expect(shortHtml).toContain("font-size:52px")
        expect(longHtml).toContain("font-size:40px")
    })
})
