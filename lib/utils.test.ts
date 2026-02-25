import { expect, test, describe } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
    test("merges class names", () => {
        expect(cn("foo", "bar")).toBe("foo bar")
    })

    test("handles conditional values", () => {
        expect(cn("foo", false && "bar", "baz")).toBe("foo baz")
        expect(cn("foo", undefined, null, "bar")).toBe("foo bar")
    })

    test("resolves tailwind conflicts", () => {
        expect(cn("px-2", "px-4")).toBe("px-4")
        expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
    })
})
