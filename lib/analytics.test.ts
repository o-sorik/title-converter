import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
    CONSENT_STORAGE_KEY,
    GA_MEASUREMENT_ID,
    applyConsentChoice,
    buildConsentDefaultScript,
    isEuTimeZone,
    resetConsentChoice,
    trackEvent,
} from "./analytics"

describe("isEuTimeZone", () => {
    it("treats every Europe/* zone as EU", () => {
        expect(isEuTimeZone("Europe/Berlin")).toBe(true)
        expect(isEuTimeZone("Europe/London")).toBe(true)
        expect(isEuTimeZone("Europe/Kyiv")).toBe(true)
    })

    it("includes the EU Atlantic islands and Ceuta", () => {
        expect(isEuTimeZone("Atlantic/Canary")).toBe(true)
        expect(isEuTimeZone("Atlantic/Reykjavik")).toBe(true)
        expect(isEuTimeZone("Africa/Ceuta")).toBe(true)
    })

    it("leaves the rest of the world alone", () => {
        expect(isEuTimeZone("America/New_York")).toBe(false)
        expect(isEuTimeZone("Asia/Seoul")).toBe(false)
        expect(isEuTimeZone("Atlantic/Bermuda")).toBe(false)
        expect(isEuTimeZone("Africa/Cairo")).toBe(false)
        expect(isEuTimeZone("")).toBe(false)
        expect(isEuTimeZone(undefined)).toBe(false)
    })
})

describe("buildConsentDefaultScript", () => {
    it("denies ad storage and gates analytics on the EU check", () => {
        const script = buildConsentDefaultScript()
        expect(script).toContain("ad_storage:'denied'")
        expect(script).toContain("analytics_storage:granted?'granted':'denied'")
        expect(script).toContain(CONSENT_STORAGE_KEY)
        expect(script).toContain("Europe")
    })

    it("is valid JavaScript that grants analytics outside the EU", () => {
        const dataLayer: unknown[] = []
        const sandbox = {
            dataLayer,
            localStorage: { getItem: () => null },
            Intl: { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: "America/Chicago" }) }) },
        } as Record<string, unknown>
        const fn = new Function("window", "Intl", "localStorage", `with (window) { ${buildConsentDefaultScript()} }`)
        fn(sandbox, sandbox.Intl, sandbox.localStorage)
        const snapshot = sandbox.__tccConsent as { eu: boolean; granted: boolean; stored: unknown }
        expect(snapshot).toEqual({ eu: false, stored: null, granted: true })
        const call = dataLayer[0] as IArguments
        expect(Array.from(call)).toEqual([
            "consent",
            "default",
            expect.objectContaining({ analytics_storage: "granted", ad_storage: "denied" }),
        ])
    })

    it("keeps analytics denied for EU visitors with no stored choice", () => {
        const dataLayer: unknown[] = []
        const sandbox = {
            dataLayer,
            localStorage: { getItem: () => null },
            Intl: { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: "Europe/Paris" }) }) },
        } as Record<string, unknown>
        const fn = new Function("window", "Intl", "localStorage", `with (window) { ${buildConsentDefaultScript()} }`)
        fn(sandbox, sandbox.Intl, sandbox.localStorage)
        expect(sandbox.__tccConsent).toEqual({ eu: true, stored: null, granted: false })
    })

    it("honours an earlier EU acceptance", () => {
        const dataLayer: unknown[] = []
        const sandbox = {
            dataLayer,
            localStorage: { getItem: () => "granted" },
            Intl: { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: "Europe/Paris" }) }) },
        } as Record<string, unknown>
        const fn = new Function("window", "Intl", "localStorage", `with (window) { ${buildConsentDefaultScript()} }`)
        fn(sandbox, sandbox.Intl, sandbox.localStorage)
        expect(sandbox.__tccConsent).toEqual({ eu: true, stored: "granted", granted: true })
    })
})

describe("trackEvent / consent helpers (browser)", () => {
    // Tests run in node; emulate the few window APIs the helpers touch.
    const store = new Map<string, string>()
    const gtag = vi.fn()

    beforeEach(() => {
        store.clear()
        gtag.mockClear()
        ;(globalThis as { window?: unknown }).window = {
            gtag,
            localStorage: {
                getItem: (key: string) => store.get(key) ?? null,
                setItem: (key: string, value: string) => void store.set(key, value),
                removeItem: (key: string) => void store.delete(key),
            },
            __tccConsent: { eu: true, stored: null, granted: false },
        }
    })

    afterEach(() => {
        delete (globalThis as { window?: unknown }).window
    })

    it("forwards events to gtag", () => {
        trackEvent("copy_output", { mode: "title", style: "apa" })
        expect(gtag).toHaveBeenCalledWith("event", "copy_output", { mode: "title", style: "apa" })
    })

    it("is a no-op when gtag is missing", () => {
        delete window.gtag
        expect(() => trackEvent("copy_output")).not.toThrow()
    })

    it("is a no-op on the server", () => {
        delete (globalThis as { window?: unknown }).window
        expect(() => trackEvent("copy_output")).not.toThrow()
        expect(() => applyConsentChoice("granted")).not.toThrow()
    })

    it("persists and pushes the consent choice", () => {
        applyConsentChoice("granted")
        expect(store.get(CONSENT_STORAGE_KEY)).toBe("granted")
        expect(window.__tccConsent).toEqual({ eu: true, stored: "granted", granted: true })
        expect(gtag).toHaveBeenCalledWith("consent", "update", { analytics_storage: "granted" })
    })

    it("reset clears storage and denies analytics", () => {
        applyConsentChoice("granted")
        resetConsentChoice()
        expect(store.has(CONSENT_STORAGE_KEY)).toBe(false)
        expect(window.__tccConsent).toEqual({ eu: true, stored: null, granted: false })
        expect(gtag).toHaveBeenLastCalledWith("consent", "update", { analytics_storage: "denied" })
    })

    it("exposes a G- measurement id", () => {
        expect(GA_MEASUREMENT_ID === "" || /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)).toBe(true)
    })
})
