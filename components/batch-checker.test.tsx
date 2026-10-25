import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, test } from "vitest"
import { BATCH_EXAMPLE, BatchChecker } from "./batch-checker"
import { runEditorialQaBatch } from "@/lib/editorial-qa"
import { TITLE_STYLES } from "@/lib/title-styles"

function rows(html: string): string[] {
    return html.match(/<li[^>]*data-testid="batch-row"[\s\S]*?<\/li>/g) ?? []
}

/** What a reader sees in a row: tags stripped, entities decoded. */
function text(markup: string): string {
    return markup
        .replace(/<[^>]+>/g, "")
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
}

describe("empty checker", () => {
    test("asks for one headline per line and offers an example", () => {
        const html = renderToStaticMarkup(<BatchChecker />)

        expect(html).toContain('data-testid="batch-input"')
        expect(html).toContain("Your headlines")
        expect(html).toContain('data-testid="batch-empty"')
        expect(html).toContain("Try an example")
        expect(html).not.toContain('data-testid="qa-results"')
    })

    test("uses the converter's style picker, with the four editorial cases only", () => {
        const html = renderToStaticMarkup(<BatchChecker />)
        const modeSelect = html.match(/<select[^>]*data-testid="mode-controls"[\s\S]*?<\/select>/)?.[0] ?? ""

        expect(html).toContain('data-testid="style-controls"')
        expect(html).toContain("Which style guide?")
        for (const style of TITLE_STYLES) expect(html).toContain(`>${style.qualifiedLabel}<`)
        expect(modeSelect).toContain('aria-label="Case"')
        for (const label of ["Title Case", "Sentence case", "lower case", "UPPER CASE"]) {
            expect(modeSelect).toContain(`>${label}<`)
        }
        expect(modeSelect).not.toContain("camelCase")
    })

    test("drops the old QA jargon", () => {
        const html = renderToStaticMarkup(<BatchChecker initialInput={BATCH_EXAMPLE} />)

        expect(html).not.toContain("Run QA Pass")
        expect(html).not.toContain("Capitalization Standard")
        expect(html).not.toContain("Consistent")
    })

    test("does not contain auth or signup copy", () => {
        const lowered = renderToStaticMarkup(<BatchChecker />).toLowerCase()

        expect(lowered).not.toContain("sign in")
        expect(lowered).not.toContain("sign up")
        expect(lowered).not.toContain("register")
        expect(lowered).not.toContain("login")
    })
})

describe("results", () => {
    test("shows only the headlines that need a fix, keeping their list numbers", () => {
        const html = renderToStaticMarkup(<BatchChecker initialInput={BATCH_EXAMPLE} />)
        const shown = rows(html)

        expect(text(html)).toContain("6 of 8 need a fix for Standard title case")
        expect(shown).toHaveLength(6)
        expect(shown.every((row) => row.includes('data-status="fix"'))).toBe(true)
        expect(shown.map((row) => row.match(/<span[^>]*>(\d+)<\/span>/)?.[1])).toEqual(["1", "3", "4", "5", "6", "8"])
        expect(text(html)).toContain("2 already correct – show all")
    })

    test("marks the words that changed and keeps the original line underneath", () => {
        const html = renderToStaticMarkup(<BatchChecker initialInput="the best laptops for students in 2026" />)
        const [row] = rows(html)

        expect(text(row)).toContain("The Best Laptops for Students in 2026")
        expect(text(row)).toContain("was: the best laptops for students in 2026")
        expect(row).toMatch(/<mark[^>]*data-change="capitalized"[^>]*>The<\/mark>/)
        expect(row).toMatch(/<mark[^>]*title="[^"]+"/)
        expect(row).toContain('aria-expanded="false"')
        expect(row).toContain(">Why?<")
        // The converter link lives inside the opened explanation, not on every row.
        expect(row).not.toContain('data-testid="review-link"')
    })

    test("re-checks for the picked style without a button", () => {
        const html = renderToStaticMarkup(<BatchChecker initialInput={BATCH_EXAMPLE} initialTitleStyle="ap" />)

        // AP capitalizes "Between" (4+ letters), so that line is already right.
        expect(text(html)).toContain("5 of 8 need a fix for AP title case")
        expect(text(html)).not.toContain("Difference between")
    })

    test("offers a copy for the whole list and for every row", () => {
        const html = renderToStaticMarkup(<BatchChecker initialInput={BATCH_EXAMPLE} />)

        expect(html).toContain('data-testid="copy-all"')
        expect(html).toContain('aria-label="Copy all 8 corrected headlines"')
        expect(html).toContain('aria-label="Copy headline 1"')
        expect(html).toContain('aria-label="Copy headline 8"')
    })

    test("says so when every headline is already right", () => {
        const html = renderToStaticMarkup(<BatchChecker initialInput={"The Art of War\nHow to Train Your Dragon in 10 Days"} />)

        expect(text(html)).toContain("All 2 headlines already follow Standard title case.")
        expect(rows(html)).toHaveLength(0)
        expect(text(html)).toContain("2 already correct – show all")
    })

    test("has no rule marks or Why? for cases without word rules", () => {
        const html = renderToStaticMarkup(<BatchChecker initialInput="Mixed Case Headline" initialMode="upper" />)
        const [row] = rows(html)

        expect(text(row)).toContain("MIXED CASE HEADLINE")
        expect(row).not.toContain("<mark")
        expect(row).not.toContain(">Why?<")
        expect(html).not.toContain('data-testid="style-controls"')
    })

    test("announces results through one polite status region", () => {
        const html = renderToStaticMarkup(<BatchChecker initialInput={BATCH_EXAMPLE} />)

        expect(html.match(/aria-live="polite"/g)).toHaveLength(1)
        expect(html).toContain('data-testid="batch-status"')
    })
})

test("the example has lines to fix and lines already right in every style", () => {
    for (const style of TITLE_STYLES) {
        const result = runEditorialQaBatch(BATCH_EXAMPLE, "title", style.id)
        expect(result.needsCorrectionCount, style.id).toBeGreaterThan(0)
        expect(result.consistentCount, style.id).toBeGreaterThan(0)
    }
})
