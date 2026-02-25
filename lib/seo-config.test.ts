import { expect, test, describe } from "vitest"
import { HOME_PAGE_CONFIG, SEO_CONFIG, CONVERTER_SLUGS } from "./seo-config"

describe("HOME_PAGE_CONFIG", () => {
    test("has required fields", () => {
        expect(HOME_PAGE_CONFIG.title).toBeTruthy()
        expect(HOME_PAGE_CONFIG.description).toBeTruthy()
        expect(HOME_PAGE_CONFIG.h1).toBeTruthy()
        expect(HOME_PAGE_CONFIG.mode).toBe("title")
        expect(HOME_PAGE_CONFIG.content.intro).toBeTruthy()
        expect(HOME_PAGE_CONFIG.content.features.length).toBeGreaterThan(0)
        expect(HOME_PAGE_CONFIG.content.exampleInput).toBeTruthy()
        expect(HOME_PAGE_CONFIG.content.exampleOutput).toBeTruthy()
    })

    test("has FAQs", () => {
        expect(HOME_PAGE_CONFIG.faqs).toBeDefined()
        expect(HOME_PAGE_CONFIG.faqs!.length).toBeGreaterThan(0)
    })
})

describe("SEO_CONFIG", () => {
    test("every entry has required fields", () => {
        for (const [slug, config] of Object.entries(SEO_CONFIG)) {
            expect(config.slug, `${slug} slug`).toBe(slug)
            expect(config.title, `${slug} title`).toBeTruthy()
            expect(config.description, `${slug} description`).toBeTruthy()
            expect(config.h1, `${slug} h1`).toBeTruthy()
            expect(config.mode, `${slug} mode`).toBeTruthy()
            expect(config.content.intro, `${slug} intro`).toBeTruthy()
            expect(config.content.features.length, `${slug} features`).toBeGreaterThan(0)
        }
    })

    test("all slugs are unique", () => {
        const slugs = Object.keys(SEO_CONFIG)
        const uniqueSlugs = new Set(slugs)
        expect(uniqueSlugs.size).toBe(slugs.length)
    })

    test("every entry has FAQs", () => {
        for (const [slug, config] of Object.entries(SEO_CONFIG)) {
            expect(config.faqs, `${slug} should have FAQs`).toBeDefined()
            expect(config.faqs!.length, `${slug} should have at least 1 FAQ`).toBeGreaterThan(0)
        }
    })
})

describe("CONVERTER_SLUGS", () => {
    test("matches SEO_CONFIG keys", () => {
        expect(CONVERTER_SLUGS.sort()).toEqual(Object.keys(SEO_CONFIG).sort())
    })
})
