import { expect, test, describe } from "vitest"
import { formatBlogDate, toIsoDateTime } from "./blog-date"

describe("formatBlogDate", () => {
    test("formats a valid ISO date string", () => {
        expect(formatBlogDate("2026-02-15")).toBe("Feb 15, 2026")
    })

    test("formats a full ISO datetime string", () => {
        expect(formatBlogDate("2025-12-25T10:00:00Z")).toBe("Dec 25, 2025")
    })

    test("returns original string for invalid date", () => {
        expect(formatBlogDate("not-a-date")).toBe("not-a-date")
    })

    test("returns original string for empty input", () => {
        expect(formatBlogDate("")).toBe("")
    })
})

describe("toIsoDateTime", () => {
    test("converts a valid date string to ISO format", () => {
        const result = toIsoDateTime("2026-02-15")
        expect(result).toMatch(/^2026-02-15T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    })

    test("returns current ISO string for invalid date", () => {
        const before = new Date().toISOString()
        const result = toIsoDateTime("not-a-date")
        const after = new Date().toISOString()
        expect(result >= before).toBe(true)
        expect(result <= after).toBe(true)
    })
})
