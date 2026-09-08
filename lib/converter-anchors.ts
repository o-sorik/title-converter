/**
 * Converter-intent anchor pool for in-body links to the main converter.
 *
 * Rule (see CLAUDE.md, "Internal linking"): every article carries exactly one
 * contextual sentence with a link to the converter, and the anchor text must
 * come from this pool. The pool is built from Search Console queries that
 * already show impressions for converter intent, so anchors mirror how people
 * actually search. Refresh it from GSC roughly once a quarter; keep the
 * exact-match anchor under MAX_EXACT_MATCH_SHARE of all articles.
 *
 * Source: GSC, https://titlecaseconverter.online/, 2026-06-10..2026-09-07,
 * queries matching converter/tool/checker/generator/capitalizer intent.
 */
export const CONVERTER_ANCHORS = [
    "title case converter",
    "free title case converter",
    "online title case converter",
    "title case converter online",
    "titlecase converter",
    "title converter",
    "title case checker",
    "title case generator",
    "convert to title case",
    "title capitalization tool",
    "title capitalization generator",
    "title capitalization checker",
    "title capitalizer",
    "capitalization checker",
    "capitalization tool",
    "capitalize my title",
    "headline capitalization tool",
    "headline case converter",
    "AP title case converter",
    "AP style converter",
    "AP capitalization tool",
    "APA title case converter",
    "APA title capitalizer",
    "MLA title case converter",
    "Chicago title case converter",
] as const

export type ConverterAnchor = (typeof CONVERTER_ANCHORS)[number]

/** The money query. Cap its share so the anchor profile stays natural. */
export const EXACT_MATCH_ANCHOR: ConverterAnchor = "title case converter"
export const MAX_EXACT_MATCH_SHARE = 0.4

/** Where an in-body converter link may point. Default is the main converter. */
export type ConverterHref = "/" | `/${string}-converter` | "/slug-generator" | "/batch-checker"

/**
 * One contextual sentence with the link inside it:
 * `${before}<a>${anchor}</a>${after}`. `before` ends with a space (or is
 * empty), `after` starts with a space or punctuation and ends the sentence.
 */
export interface ConverterLink {
    anchor: ConverterAnchor
    before: string
    after: string
    href?: ConverterHref
}

export function isConverterAnchor(value: string): value is ConverterAnchor {
    return (CONVERTER_ANCHORS as readonly string[]).includes(value)
}
