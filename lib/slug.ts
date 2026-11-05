/**
 * URL slug mode, separate from kebab case on purpose: kebab case splits
 * identifiers at case changes (iPhone -> i-phone), which is right for code and
 * wrong for a URL. Rules follow the QN6 brief (docs/briefs/qn6-slug-generator.md,
 * decisions D1-D6):
 *
 * - apostrophes between letters are dropped without splitting the word (don't -> dont)
 * - accented letters become plain letters (café -> cafe, ß -> ss, Å -> a)
 * - "&" becomes "and"
 * - punctuation between letters or digits becomes a hyphen (Next.js -> next-js,
 *   2.5 -> 2-5); at the edges of a word it is removed (Off! -> off)
 * - numbers stay, words are never split at a capital (iPhone -> iphone)
 * - stop words are removed only on request, and never down to an empty slug
 * - the length is never cut
 */

export interface SlugOptions {
    removeStopWords?: boolean
}

/** The rule behind one change, from a fragment of the input to what it became. */
export interface SlugNote {
    reason: SlugReason
    from: string
    to: string
}

export const SLUG_REASONS = {
    lowercase: "Capital letters become lowercase",
    apostrophe: "Apostrophes are dropped without splitting the word",
    accent: "Accented letters become plain letters",
    ampersand: "An ampersand becomes \"and\"",
    inner: "Punctuation inside a word becomes a hyphen",
    removed: "Other punctuation and symbols are removed",
    nonLatin: "Letters with no plain Latin form are removed",
    stopWord: "Stop words are removed",
    allStopWords: "Every word is a stop word, so all are kept",
} as const

export type SlugReason = (typeof SLUG_REASONS)[keyof typeof SLUG_REASONS]

/** Printed on the page (brief A13), so the list and the page cannot drift apart. */
export const SLUG_STOP_WORDS = [
    "a", "an", "the",
    "and", "or", "but", "nor",
    "of", "in", "on", "at", "to", "for", "by", "with", "from", "as", "vs",
] as const

const STOP_WORDS = new Set<string>(SLUG_STOP_WORDS)

// Letters that Unicode decomposition does not reduce to a plain Latin letter.
const LETTER_MAP: Record<string, string> = {
    "ß": "ss", "ẞ": "ss", "æ": "ae", "Æ": "ae", "œ": "oe", "Œ": "oe",
    "ø": "o", "Ø": "o", "đ": "d", "Đ": "d", "ð": "d", "Ð": "d",
    "ł": "l", "Ł": "l", "þ": "th", "Þ": "th", "ı": "i", "ħ": "h", "Ħ": "h",
}

const APOSTROPHE = /['’ʼ‘`]/
const INNER_APOSTROPHE = /(?<=\p{L})['’ʼ‘`](?=\p{L})/gu
const EDGE = /^[^\p{L}\p{N}&]+|[^\p{L}\p{N}&]+$/gu

function toPlainLetters(text: string): string {
    return text
        .replace(/[ßẞæÆœŒøØđĐðÐłŁþÞıħĦ]/g, (ch) => LETTER_MAP[ch])
        .normalize("NFKD")
        .replace(/\p{M}/gu, "")
}

interface Chunk {
    tokens: string[]
    notes: SlugNote[]
}

/** One whitespace-separated piece of input: "Don't", "Stop:", "&", "Next.js". */
function slugChunk(raw: string): Chunk {
    const notes: SlugNote[] = []
    const edges = raw.match(EDGE)?.join("") ?? ""
    const core = raw.replace(EDGE, "")

    if (!core) {
        if (edges) notes.push({ reason: SLUG_REASONS.removed, from: edges, to: "" })
        return { tokens: [], notes }
    }

    let text = core.replace(INNER_APOSTROPHE, "")
    const hadInnerApostrophe = text !== core
    // An apostrophe that is not between two letters is ordinary punctuation.
    const strayApostrophes = (text.match(new RegExp(APOSTROPHE, "g")) ?? []).join("")
    text = text.replace(new RegExp(APOSTROPHE, "g"), "")

    const plain = toPlainLetters(text)
    const hadAccent = plain !== text
    const lower = plain.toLowerCase().replace(/&/g, " and ")
    const hadNonLatin = /(?![a-z])\p{L}/u.test(lower)
    const tokens = lower.split(/[^a-z0-9]+/).filter(Boolean)
    const result = tokens.join("-")

    const innerPunctuation = core
        .replace(INNER_APOSTROPHE, "")
        .replace(/[\p{L}\p{N}&\s-]/gu, "")
        .replace(new RegExp(APOSTROPHE, "g"), "")

    if (/[A-Z]/.test(plain)) notes.push({ reason: SLUG_REASONS.lowercase, from: core, to: result })
    if (hadInnerApostrophe) notes.push({ reason: SLUG_REASONS.apostrophe, from: core, to: result })
    if (hadAccent) notes.push({ reason: SLUG_REASONS.accent, from: core, to: result })
    if (core.includes("&")) notes.push({ reason: SLUG_REASONS.ampersand, from: "&", to: "and" })
    if (hadNonLatin) notes.push({ reason: SLUG_REASONS.nonLatin, from: core, to: result })
    if (innerPunctuation && tokens.length > 1) notes.push({ reason: SLUG_REASONS.inner, from: core, to: result })
    const removed = edges + strayApostrophes + (tokens.length > 1 ? "" : innerPunctuation)
    if (removed) notes.push({ reason: SLUG_REASONS.removed, from: removed, to: "" })

    return { tokens, notes }
}

/** The slug and the rule behind every change, in input order. */
export function buildSlug(text: string, options: SlugOptions = {}): { slug: string; notes: SlugNote[] } {
    const chunks = text.split(/\s+/).filter(Boolean).map(slugChunk)
    const notes = chunks.flatMap((chunk) => chunk.notes)
    let tokens = chunks.flatMap((chunk) => chunk.tokens)

    if (options.removeStopWords && tokens.length) {
        const kept = tokens.filter((token) => !STOP_WORDS.has(token))
        if (kept.length) {
            for (const token of tokens) {
                if (STOP_WORDS.has(token)) notes.push({ reason: SLUG_REASONS.stopWord, from: token, to: "" })
            }
            tokens = kept
        } else {
            notes.push({ reason: SLUG_REASONS.allStopWords, from: tokens.join(" "), to: tokens.join("-") })
        }
    }

    return { slug: tokens.join("-"), notes }
}

export function slugify(text: string, options: SlugOptions = {}): string {
    return buildSlug(text, options).slug
}
