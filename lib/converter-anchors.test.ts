import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { ConverterInlineLink } from "@/components/blog/article/converter-inline-link"
import { CONVERTER_ANCHORS, EXACT_MATCH_ANCHOR, MAX_EXACT_MATCH_SHARE, isConverterAnchor, type ConverterLink } from "./converter-anchors"
import { GEN_CAP_ARTICLES } from "./gen-cap-article-data"
import { IS_X_ARTICLES } from "./is-x-article-data"
import { getAllWritingTipsArticles } from "./writing-tips-article-data"

const articles: { slug: string; converterLink: ConverterLink }[] = [
    ...IS_X_ARTICLES,
    ...GEN_CAP_ARTICLES,
    ...getAllWritingTipsArticles(),
]

describe("converter anchor rule", () => {
    it("covers every article", () => {
        expect(articles.length).toBeGreaterThan(40)
        for (const a of articles) {
            expect(a.converterLink, a.slug).toBeDefined()
        }
    })

    it("uses only anchors from the GSC-derived pool", () => {
        for (const a of articles) {
            expect(isConverterAnchor(a.converterLink.anchor), `${a.slug}: ${a.converterLink.anchor}`).toBe(true)
        }
        expect(new Set(CONVERTER_ANCHORS).size).toBe(CONVERTER_ANCHORS.length)
    })

    it("wraps the anchor in a real sentence", () => {
        for (const a of articles) {
            const { before, after } = a.converterLink
            expect(before === "" || before.endsWith(" "), `${a.slug}: before must end with a space`).toBe(true)
            expect(/^[ ,.;:!?)]/.test(after), `${a.slug}: after must start with space or punctuation`).toBe(true)
            expect(/[.!?]$/.test(after), `${a.slug}: sentence must end`).toBe(true)
            expect((before + after).length, `${a.slug}: sentence too short`).toBeGreaterThan(40)
        }
    })

    it("keeps the exact-match anchor under the cap", () => {
        const exact = articles.filter((a) => a.converterLink.anchor === EXACT_MATCH_ANCHOR).length
        expect(exact / articles.length).toBeLessThanOrEqual(MAX_EXACT_MATCH_SHARE)
        expect(exact).toBeGreaterThan(0)
    })

    it("does not repeat the same sentence across articles", () => {
        const seen = new Set<string>()
        for (const a of articles) {
            const key = a.converterLink.before + a.converterLink.after
            expect(seen.has(key), `${a.slug}: duplicate sentence`).toBe(false)
            seen.add(key)
        }
    })

    it("varies anchors: no single anchor above half of all articles", () => {
        const counts = new Map<string, number>()
        for (const a of articles) counts.set(a.converterLink.anchor, (counts.get(a.converterLink.anchor) ?? 0) + 1)
        for (const [anchor, n] of counts) expect(n / articles.length, anchor).toBeLessThanOrEqual(0.5)
        expect(counts.size).toBeGreaterThanOrEqual(8)
    })
})

describe("ConverterInlineLink", () => {
    it("renders a plain link to the converter with the anchor as text", () => {
        const html = renderToStaticMarkup(
            ConverterInlineLink({ link: { anchor: "title case converter", before: "Paste it into the ", after: " and compare." } })
        )
        expect(html).toContain('href="/"')
        expect(html).toContain(">title case converter</a>")
        expect(html).not.toContain("nofollow")
        expect(html).not.toContain("ctx_")
    })

    it("honours an explicit converter page href", () => {
        const html = renderToStaticMarkup(
            ConverterInlineLink({ link: { anchor: "title case checker", before: "Try the ", after: " here.", href: "/batch-checker" } })
        )
        expect(html).toContain('href="/batch-checker"')
    })
})
