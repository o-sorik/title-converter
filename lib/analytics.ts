/**
 * Google Analytics 4 wiring: measurement ID, EU consent gate, event helper.
 *
 * The measurement ID is public by nature (it ships in every page's HTML), so it
 * lives here as a constant. `NEXT_PUBLIC_GA_ID` can still override it at build
 * time. An empty string disables analytics entirely (used by tests / previews).
 */
export const GA_MEASUREMENT_ID: string =
    process.env.NEXT_PUBLIC_GA_ID ?? "G-ZHTCTJQZ42"

/** localStorage key holding the visitor's analytics choice: "granted" | "denied". */
export const CONSENT_STORAGE_KEY = "tcc-analytics-consent"

/**
 * Time zones where we ask before setting analytics cookies (EU/EEA/UK/CH).
 * Deliberately over-inclusive: every `Europe/*` zone plus the EU Atlantic
 * islands and Ceuta. Asking a few extra visitors beats skipping a required one.
 */
const EU_TIME_ZONE_SOURCE =
    "^(Europe\\/|Atlantic\\/(Canary|Madeira|Azores|Reykjavik|Faroe)$|Africa\\/Ceuta$)"

const EU_TIME_ZONE_REGEX = new RegExp(EU_TIME_ZONE_SOURCE)

export function isEuTimeZone(timeZone: string | null | undefined): boolean {
    if (!timeZone) return false
    return EU_TIME_ZONE_REGEX.test(timeZone)
}

export type ConsentChoice = "granted" | "denied"

export interface ConsentSnapshot {
    /** Visitor appears to be in the EU/EEA/UK by time zone. */
    eu: boolean
    /** Choice persisted from an earlier visit, if any. */
    stored: ConsentChoice | null
    /** Effective `analytics_storage` state gtag was initialised with. */
    granted: boolean
}

declare global {
    interface Window {
        dataLayer?: unknown[]
        gtag?: (...args: unknown[]) => void
        __tccConsent?: ConsentSnapshot
    }
}

/**
 * Inline script that MUST run before gtag.js: sets Google Consent Mode v2
 * defaults. Outside the EU analytics is granted immediately; inside the EU it
 * stays denied until the visitor accepts in the banner (or accepted earlier).
 * Ad-related storage is always denied — the site runs no ads.
 */
export function buildConsentDefaultScript(): string {
    return [
        "(function(){",
        "window.dataLayer=window.dataLayer||[];",
        "function gtag(){window.dataLayer.push(arguments);}",
        "var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}",
        `var eu=new RegExp(${JSON.stringify(EU_TIME_ZONE_SOURCE)}).test(tz);`,
        `var stored=null;try{stored=localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});}catch(e){}`,
        "if(stored!=='granted'&&stored!=='denied'){stored=null;}",
        "var granted=stored==='granted'||(!eu&&stored!=='denied');",
        "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:granted?'granted':'denied'});",
        "window.__tccConsent={eu:eu,stored:stored,granted:granted};",
        "})();",
    ].join("")
}

/** Fire a GA4 event. Safe to call anywhere: no-op on the server or when gtag is absent. */
export function trackEvent(name: string, params?: Record<string, string | number | boolean>): void {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return
    window.gtag("event", name, params ?? {})
}

/** Persist the visitor's choice and push the matching consent update to gtag. */
export function applyConsentChoice(choice: ConsentChoice): void {
    if (typeof window === "undefined") return
    try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
    } catch {
        // storage may be unavailable (private mode); consent update still applies for this page
    }
    if (window.__tccConsent) {
        window.__tccConsent = { ...window.__tccConsent, stored: choice, granted: choice === "granted" }
    }
    if (typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: choice })
    }
}

/** Forget the stored choice so the banner asks again (used on the privacy page). */
export function resetConsentChoice(): void {
    if (typeof window === "undefined") return
    try {
        window.localStorage.removeItem(CONSENT_STORAGE_KEY)
    } catch {
        // no-op
    }
    if (window.__tccConsent) {
        window.__tccConsent = { ...window.__tccConsent, stored: null, granted: false }
    }
    if (typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: "denied" })
    }
}
