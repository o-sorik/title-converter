export type ConversionType =
    | "title"
    | "upper"
    | "lower"
    | "sentence"
    | "camel"
    | "pascal"
    | "snake"
    | "kebab"
    | "alternating"
    | "inverse";

export type TitleCaseStyle = "standard" | "ap" | "chicago" | "mla" | "apa";

export interface ConvertOptions {
    titleStyle?: TitleCaseStyle;
}

const EXPLANATION_SNIPPET_LENGTH = 20;

// Human-facing style names for explanation text. Avoids leaking internals
// like "STANDARD style" into the UI.
const STYLE_LABELS: Record<TitleCaseStyle, string> = {
    standard: "Standard",
    ap: "AP",
    chicago: "Chicago",
    mla: "MLA",
    apa: "APA",
};

const ARTICLES = new Set([
    "a",
    "an",
    "the",
]);

const CONJUNCTIONS = new Set([
    "and",
    "but",
    "or",
    "nor",
    "for",
    "yet",
    "so",
    "as",
]);

const PREPOSITIONS = new Set([
    "at",
    "about",
    "above",
    "across",
    "after",
    "against",
    "around",
    "before",
    "behind",
    "below",
    "beneath",
    "beside",
    "between",
    "by",
    "during",
    "except",
    "for",
    "from",
    "inside",
    "in",
    "near",
    "off",
    "of",
    "on",
    "out",
    "outside",
    "over",
    "past",
    "per",
    "since",
    "through",
    "throughout",
    "toward",
    "towards",
    "to",
    "under",
    "underneath",
    "until",
    "up",
    "upon",
    "via",
    "with",
    "within",
    "without",
    "into",
    "onto",
    // Added 2026-08: these were missing, so every style treated them as major
    // words and capitalized them unconditionally. "among" was the visible case –
    // it showed up in Search Console as "among capitalized in title" while the
    // converter capitalized it even under MLA, which lowercases all prepositions.
    "along",
    "amid",
    "amidst",
    "among",
    "amongst",
    "atop",
    "besides",
    "beyond",
    "concerning",
    "despite",
    "down",
    "like",
    "minus",
    "opposite",
    "plus",
    "regarding",
    "round",
    "than",
    "till",
    "unlike",
    "unto",
    "versus",
    "worth",
]);

const PHRASAL_VERB_PAIRS = new Set([
    "back up",
    "break down",
    "carry on",
    "check in",
    "check out",
    "find out",
    "log in",
    "make up",
    "pick up",
    "set up",
    "shut down",
    "sign up",
    "turn off",
    "turn on",
    "wake up",
]);

const ADVERBIAL_PARTICLES = new Set([
    "up",
    "down",
    "in",
    "out",
    "off",
    "on",
    "over",
    "through",
    "around",
    "away",
    "back",
    "along",
]);

const CONTRACTION_SUFFIXES = new Set([
    "t",
    "s",
    "ll",
    "ve",
    "re",
    "d",
    "m",
]);

const COMMON_BASE_VERBS = new Set([
    "add",
    "back",
    "break",
    "bring",
    "call",
    "carry",
    "check",
    "clean",
    "close",
    "come",
    "cut",
    "fill",
    "find",
    "get",
    "go",
    "hand",
    "head",
    "join",
    "keep",
    "let",
    "log",
    "look",
    "make",
    "move",
    "open",
    "pick",
    "point",
    "put",
    "run",
    "set",
    "shut",
    "sign",
    "sort",
    "start",
    "step",
    "take",
    "think",
    "turn",
    "walk",
    "wake",
    "work",
    "write",
    "zoom",
]);

// Acronyms we are willing to PROMOTE from lowercase input ("seo" -> "SEO").
// Keyed by uppercase lookup form, valued by canonical spelling, so mixed-case
// canonical forms like "PhD" survive the toUpperCase() lookup.
//
// Deliberately EXCLUDED: WHO, ID, RAM, COO. Each is an ordinary English word,
// and promoting it wrecks normal titles ("The Man Who Sold the World" ->
// "The Man WHO Sold the World"). Already-uppercase input keeps working for them
// through the deliberate-acronym path below, which needs no dictionary at all.
const ACRONYM_CANONICAL = new Map<string, string>([
    ["AI", "AI"],
    ["API", "API"],
    ["AWS", "AWS"],
    ["CEO", "CEO"],
    ["CFO", "CFO"],
    ["CIA", "CIA"],
    ["COVID", "COVID"],
    ["CPU", "CPU"],
    ["CRM", "CRM"],
    ["CSS", "CSS"],
    ["CTO", "CTO"],
    ["DNS", "DNS"],
    ["ERP", "ERP"],
    ["EU", "EU"],
    ["FBI", "FBI"],
    ["FTP", "FTP"],
    ["GDP", "GDP"],
    ["GPU", "GPU"],
    ["HTML", "HTML"],
    ["HTTP", "HTTP"],
    ["HTTPS", "HTTPS"],
    ["IP", "IP"],
    ["JSON", "JSON"],
    ["JS", "JS"],
    ["KPI", "KPI"],
    ["MBA", "MBA"],
    ["ML", "ML"],
    ["MVP", "MVP"],
    ["NASA", "NASA"],
    ["NATO", "NATO"],
    ["PDF", "PDF"],
    ["PHD", "PhD"],
    ["ROI", "ROI"],
    ["RSS", "RSS"],
    ["SDK", "SDK"],
    ["SEO", "SEO"],
    ["SQL", "SQL"],
    ["SSH", "SSH"],
    ["TCP", "TCP"],
    ["UI", "UI"],
    ["UK", "UK"],
    ["UN", "UN"],
    ["URL", "URL"],
    ["USB", "USB"],
    ["USA", "USA"],
    ["UX", "UX"],
    ["VPN", "VPN"],
    ["XML", "XML"],
]);

function capitalize(word: string): string {
    const parts = word.split(/(\u0027|\u2018|\u2019)/);
    let firstSegmentDone = false;

    return parts
        .map((segment) => {
            if (segment === "’" || segment === "\u2018" || segment === "\u2019") return segment;
            if (!segment) return segment;
            if (!firstSegmentDone) {
                firstSegmentDone = true;
                return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
            }
            // After apostrophe: contraction suffix → lowercase, name part → capitalize
            if (CONTRACTION_SUFFIXES.has(segment.toLowerCase())) {
                return segment.toLowerCase();
            }
            return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
        })
        .join("");
}

function getTitleCaseDecision(word: string, style: TitleCaseStyle): { convertToLower: boolean; reason: string } {
    if (ARTICLES.has(word)) return { convertToLower: true, reason: "Article" };
    if (CONJUNCTIONS.has(word)) {
        if (style === "apa" && word.length >= 4) {
            return { convertToLower: false, reason: "APA style: conjunction with 4+ letters" };
        }
        return { convertToLower: true, reason: "Coordinating conjunction" };
    }

    if (PREPOSITIONS.has(word)) {
        if (style === "ap" && word.length >= 4) {
            return { convertToLower: false, reason: "AP style: preposition with 4+ letters" };
        }
        if (style === "apa" && word.length >= 4) {
            return { convertToLower: false, reason: "APA style: preposition with 4+ letters" };
        }
        if (style === "chicago" && word.length >= 5) {
            return { convertToLower: false, reason: "Chicago style (18th ed.): preposition with 5+ letters" };
        }
        return { convertToLower: true, reason: "Preposition" };
    }

    return { convertToLower: false, reason: "Major word" };
}

interface WordToken {
    word: string;
    start: number;
    end: number;
}

interface TitleWordTransform {
    word: string;
    converted: string;
    reason: string;
    type: "capitalized" | "lowercased" | "unchanged";
    start: number;
    end: number;
}

const WORD_TOKEN_PATTERN = /(?:[\p{Lu}](?:\.[\p{Lu}])+\.?)|(?:[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*)/gu;

function tokenizeWords(text: string): WordToken[] {
    return Array.from(text.matchAll(WORD_TOKEN_PATTERN)).map((match) => ({
        word: match[0],
        start: match.index ?? 0,
        end: (match.index ?? 0) + match[0].length,
    }));
}

type InputShape = "all-caps" | "all-lower" | "mixed";

/**
 * Whether the INPUT's casing carries information.
 *
 * In all-caps input ("THE NBA FINALS") every word is uppercase, so uppercase
 * tells us nothing and everything must be normalised. In mixed input
 * ("The NBA Finals") an all-caps token is a deliberate signal from the writer
 * and has to survive untouched.
 *
 * Known limit: acronyms in all-caps input are unrecoverable except through the
 * dictionary — "THE NBA FINALS" cannot be distinguished from "THE BIG GAME".
 */
function detectInputShape(tokens: WordToken[]): InputShape {
    let hasUpper = false;
    let hasLower = false;
    for (const token of tokens) {
        if (/[a-z]/.test(token.word)) hasLower = true;
        if (/[A-Z]/.test(token.word)) hasUpper = true;
        if (hasUpper && hasLower) return "mixed";
    }
    return hasUpper ? "all-caps" : "all-lower";
}

// Short all-caps runs are structurally acronym-shaped (NBA, IBM, DIY, FAQ,
// NASA, USSR). Longer ones are far more likely to be a shouted English word
// ("Hello WORLD"), so they need dictionary confirmation instead.
const ACRONYM_STRUCTURAL_MAX_LENGTH = 4;

/**
 * An all-caps token inside mixed-case input: NBA, IBM, DIY, URLs, NASA's.
 * No dictionary needed — the writer already told us by shouting it.
 *
 * Two guards keep this from swallowing ordinary shouting: a length cap, and an
 * exclusion for function words, so "The NBA And THE Man" still lowercases the
 * shouted "AND" and "THE" through the normal style rules.
 */
function isDeliberateAcronym(word: string): boolean {
    const core = word.replace(/['‘’]s$/i, "").replace(/s$/, "");
    if (core.length < 2 || core.length > ACRONYM_STRUCTURAL_MAX_LENGTH) return false;
    if (!/^[A-Z0-9]+$/.test(core) || !/[A-Z]/.test(core)) return false;

    const lower = core.toLowerCase();
    if (ARTICLES.has(lower) || CONJUNCTIONS.has(lower) || PREPOSITIONS.has(lower)) return false;
    return true;
}

/**
 * Irregular INTERNAL casing: iPhone, eBay, macOS, PhD, JavaScript, McDonald.
 *
 * This must not match an ordinary title-cased word like "Guide". The previous
 * implementation did, which froze every already-capitalised word and made the
 * converter a no-op on the most common input people paste.
 */
function hasIrregularCasing(word: string): boolean {
    return /[a-z]/.test(word) && /[A-Z]/.test(word.slice(1));
}

/** Dictionary lookup that tolerates a possessive or plural suffix. */
function promoteKnownAcronym(word: string): string | null {
    const possessive = /['‘’]s$/i.test(word) ? word.slice(-2) : "";
    const base = possessive ? word.slice(0, -2) : word;
    const tail = possessive.toLowerCase();

    const direct = ACRONYM_CANONICAL.get(base.toUpperCase());
    if (direct) return direct + tail;

    if (/s$/i.test(base) && base.length > 2) {
        const singular = ACRONYM_CANONICAL.get(base.slice(0, -1).toUpperCase());
        if (singular) return `${singular}s${tail}`;
    }
    return null;
}

function getCanonicalAcronym(word: string, preserveDeliberateCaps: boolean): string | null {
    if (preserveDeliberateCaps && isDeliberateAcronym(word)) return word;

    const promoted = promoteKnownAcronym(word);
    if (promoted) return promoted;

    // Dotted initialisms: U.S.A., U.N.C.L.E.
    if (/^[A-Za-z](?:\.[A-Za-z])+\.?$/.test(word)) return word.toUpperCase();

    if (/[0-9]/.test(word) && /^[A-Za-z0-9]{2,}$/.test(word)) {
        if (/^\d+(st|nd|rd|th)$/i.test(word)) return null;
        if (/^[A-Z0-9]+$/.test(word)) return word.toUpperCase();
        return null;
    }
    return null;
}

/** Strip an -ing/-ed inflection back to candidate base forms. */
function stemCandidates(lower: string): string[] {
    const out = [lower];
    for (const suffix of ["ing", "ed"]) {
        if (!lower.endsWith(suffix) || lower.length <= suffix.length + 1) continue;
        const trimmed = lower.slice(0, -suffix.length);
        out.push(trimmed, `${trimmed}e`);
        if (/(.)\1$/.test(trimmed)) out.push(trimmed.slice(0, -1));
    }
    return out;
}

/**
 * Only genuine verbs trigger the adverbial-particle rule. The previous version
 * treated ANY -ed/-ing word as a verb, so "The Wedding in Paris" came out as
 * "The Wedding In Paris".
 */
function looksVerbLike(word: string): boolean {
    return stemCandidates(word.toLowerCase()).some((candidate) => COMMON_BASE_VERBS.has(candidate));
}

function tokenizeIdentifierWords(text: string): string[] {
    const normalized = text
        .replace(/([\p{Ll}\p{N}])([\p{Lu}])/gu, "$1 $2")
        .replace(/([\p{Lu}]+)([\p{Lu}][\p{Ll}])/gu, "$1 $2");

    return normalized.match(/[\p{L}\p{N}]+/gu) ?? [];
}

function buildTitleTransforms(text: string, style: TitleCaseStyle): TitleWordTransform[] {
    const tokens = tokenizeWords(text);
    if (!tokens.length) return [];

    const lowerWords = tokens.map((t) => t.word.toLowerCase());
    const shape = detectInputShape(tokens);

    return tokens.map((token, i) => {
        const lower = lowerWords[i];
        const isFirst = i === 0;
        const isLast = i === tokens.length - 1;
        const prevToken = i > 0 ? tokens[i - 1] : null;
        const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;

        const betweenPrevAndCurrent = prevToken ? text.slice(prevToken.end, token.start) : "";
        const betweenCurrentAndNext = nextToken ? text.slice(token.end, nextToken.start) : "";
        const followsColon = /:/.test(betweenPrevAndCurrent);
        const isHyphenLeft = betweenPrevAndCurrent === "-";
        const isHyphenRight = betweenCurrentAndNext === "-";
        const inHyphenCompound = isHyphenLeft || isHyphenRight;
        const isHyphenCompoundStart = isHyphenRight && !isHyphenLeft;

        const canonicalAcronym = getCanonicalAcronym(token.word, shape === "mixed");
        if (canonicalAcronym) {
            return {
                word: token.word,
                converted: canonicalAcronym,
                reason: "Acronym keeps its uppercase form",
                type: canonicalAcronym === token.word ? "unchanged" : "capitalized",
                start: token.start,
                end: token.end,
            };
        }

        if (hasIrregularCasing(token.word)) {
            return { word: token.word, converted: token.word, reason: "Brand or proper-noun casing preserved", type: "unchanged", start: token.start, end: token.end };
        }

        if (isFirst) {
            return { word: token.word, converted: capitalize(lower), reason: "First word is always capitalized", type: "capitalized", start: token.start, end: token.end };
        }

        if (isLast) {
            return { word: token.word, converted: capitalize(lower), reason: "Last word is always capitalized", type: "capitalized", start: token.start, end: token.end };
        }

        if (followsColon) {
            return { word: token.word, converted: capitalize(lower), reason: "First word after colon is capitalized", type: "capitalized", start: token.start, end: token.end };
        }

        if (lower === "to" && nextToken) {
            return { word: token.word, converted: "to", reason: "Infinitive marker stays lowercase", type: "lowercased", start: token.start, end: token.end };
        }

        if (!inHyphenCompound && prevToken && ADVERBIAL_PARTICLES.has(lower) && looksVerbLike(prevToken.word)) {
            return { word: token.word, converted: capitalize(lower), reason: "Adverbial particle after verb", type: "capitalized", start: token.start, end: token.end };
        }

        if (prevToken && PHRASAL_VERB_PAIRS.has(`${lowerWords[i - 1]} ${lower}`)) {
            return { word: token.word, converted: capitalize(lower), reason: "Phrasal verb particle", type: "capitalized", start: token.start, end: token.end };
        }

        if (inHyphenCompound) {
            if (isHyphenCompoundStart) {
                return { word: token.word, converted: capitalize(lower), reason: "First element in hyphenated compound", type: "capitalized", start: token.start, end: token.end };
            }

            const decision = getTitleCaseDecision(lower, style);
            if (decision.convertToLower) {
                return { word: token.word, converted: lower, reason: `${decision.reason} in hyphenated compound`, type: "lowercased", start: token.start, end: token.end };
            }
            return { word: token.word, converted: capitalize(lower), reason: "Hyphenated compound part", type: "capitalized", start: token.start, end: token.end };
        }

        const decision = getTitleCaseDecision(lower, style);
        const reason = decision.reason.includes("style") ? decision.reason : `${decision.reason} (${STYLE_LABELS[style]} style)`;
        if (decision.convertToLower) {
            return { word: token.word, converted: lower, reason, type: "lowercased", start: token.start, end: token.end };
        }

        return { word: token.word, converted: capitalize(lower), reason, type: "capitalized", start: token.start, end: token.end };
    });
}

/**
 * A run of the OUTPUT text, tagged with whether this conversion changed it.
 *
 * Lets the UI highlight exactly which words moved and why, inline in the
 * result, instead of only listing them in a separate panel.
 */
export interface OutputSegment {
    text: string
    type: "unchanged" | "capitalized" | "lowercased"
    /** The rule that produced the change. Absent when nothing changed. */
    reason?: string
}

function buildSegments(text: string, transforms: TitleWordTransform[]): OutputSegment[] {
    const segments: OutputSegment[] = [];
    let cursor = 0;

    for (const transform of transforms) {
        if (transform.start > cursor) {
            segments.push({ text: text.slice(cursor, transform.start), type: "unchanged" });
        }
        const changed = transform.converted !== transform.word;
        segments.push(
            changed
                ? { text: transform.converted, type: transform.type, reason: transform.reason }
                : { text: transform.converted, type: "unchanged" },
        );
        cursor = transform.end;
    }

    if (cursor < text.length) {
        segments.push({ text: text.slice(cursor), type: "unchanged" });
    }
    return segments;
}

function applyTransforms(text: string, transforms: TitleWordTransform[]): string {
    let result = text;
    let offset = 0;
    for (const transform of transforms) {
        result = result.slice(0, transform.start + offset) + transform.converted + result.slice(transform.end + offset);
        offset += transform.converted.length - transform.word.length;
    }
    return result;
}

function convertTitleCase(text: string, style: TitleCaseStyle): string {
    return applyTransforms(text, buildTitleTransforms(text, style));
}

function buildSentenceTransforms(text: string): TitleWordTransform[] {
    const tokens = tokenizeWords(text);
    if (!tokens.length) return [];

    return tokens.map((token, i) => {
        const prevToken = i > 0 ? tokens[i - 1] : null;
        const betweenPrevAndCurrent = prevToken ? text.slice(prevToken.end, token.start) : "";
        const sentenceStart = i === 0 || /[.!?]/.test(betweenPrevAndCurrent);
        // Sentence case deliberately de-shouts: "he said HELLO" -> "he said hello".
        // So it never treats a bare all-caps token as a deliberate acronym, and
        // relies on the dictionary instead.
        const canonicalAcronym = getCanonicalAcronym(token.word, false);

        if (hasIrregularCasing(token.word) || canonicalAcronym) {
            return {
                word: token.word,
                converted: canonicalAcronym ?? token.word,
                reason: "Brand casing or acronym preserved",
                type: !canonicalAcronym || canonicalAcronym === token.word ? "unchanged" : "capitalized",
                start: token.start,
                end: token.end,
            };
        }

        // The pronoun "I" and its contractions are always capitalised.
        if (/^i(['‘’](m|ll|ve|d))?$/i.test(token.word)) {
            const converted = capitalize(token.word.toLowerCase());
            return {
                word: token.word,
                converted,
                reason: 'The pronoun "I" is always capitalized',
                type: converted === token.word ? "unchanged" : "capitalized",
                start: token.start,
                end: token.end,
            };
        }

        if (sentenceStart) {
            const converted = capitalize(token.word.toLowerCase());
            return {
                word: token.word,
                converted,
                reason: "First word of sentence",
                type: converted === token.word ? "unchanged" : "capitalized",
                start: token.start,
                end: token.end,
            };
        }

        const converted = token.word.toLowerCase();
        return {
            word: token.word,
            converted,
            reason: "Sentence case lowercases non-initial words",
            type: converted === token.word ? "unchanged" : "lowercased",
            start: token.start,
            end: token.end,
        };
    });
}

export function convert(text: string, type: ConversionType, options: ConvertOptions = {}): string {
    if (!text) return "";
    const titleStyle = options.titleStyle ?? "standard";

    switch (type) {
        case "upper": return text.toUpperCase();
        case "lower": return text.toLowerCase();
        case "sentence":
            return applyTransforms(text, buildSentenceTransforms(text));
        case "title":
            return convertTitleCase(text, titleStyle);
        case "camel":
            return tokenizeIdentifierWords(text)
                .map((w, i) => i === 0 ? w.toLowerCase() : capitalize(w))
                .join("");
        case "pascal":
            return tokenizeIdentifierWords(text)
                .map((w) => capitalize(w))
                .join("");
        case "snake":
            return tokenizeIdentifierWords(text)
                .map((w) => w.toLowerCase())
                .join("_");
        case "kebab":
            return tokenizeIdentifierWords(text)
                .map((w) => w.toLowerCase())
                .join("-");
        case "alternating":
            return text.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("");
        case "inverse":
            return text.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
    }
}

// Explanation types for the "Show Explanations" feature
export interface WordExplanation {
    word: string;
    converted: string;
    reason: string;
    type: "capitalized" | "lowercased" | "unchanged";
}

export interface ConversionResult {
    output: string;
    explanations: WordExplanation[];
}

// Convert with explanations - provides detailed reasons for each word transformation
export function convertWithExplanations(text: string, type: ConversionType, options: ConvertOptions = {}): ConversionResult {
    if (!text) return { output: "", explanations: [] };

    const explanations: WordExplanation[] = [];
    let output = "";
    const titleStyle = options.titleStyle ?? "standard";

    switch (type) {
        case "title": {
            const transforms = buildTitleTransforms(text, titleStyle);
            for (const transform of transforms) {
                if (transform.word !== transform.converted) {
                    explanations.push({
                        word: transform.word,
                        converted: transform.converted,
                        reason: transform.reason,
                        type: transform.type,
                    });
                }
            }
            output = applyTransforms(text, transforms);
            break;
        }

        case "sentence": {
            const sentenceTransforms = buildSentenceTransforms(text);
            for (const transform of sentenceTransforms) {
                if (transform.word !== transform.converted) {
                    explanations.push({
                        word: transform.word,
                        converted: transform.converted,
                        reason: transform.reason,
                        type: transform.type,
                    });
                }
            }
            output = applyTransforms(text, sentenceTransforms);
            break;
        }

        case "upper":
            output = text.toUpperCase();
            if (text !== output) {
                explanations.push({
                    word: text.substring(0, EXPLANATION_SNIPPET_LENGTH) + (text.length > EXPLANATION_SNIPPET_LENGTH ? "..." : ""),
                    converted: output.substring(0, EXPLANATION_SNIPPET_LENGTH) + (output.length > EXPLANATION_SNIPPET_LENGTH ? "..." : ""),
                    reason: "All text converted to uppercase",
                    type: "capitalized"
                });
            }
            break;

        case "lower":
            output = text.toLowerCase();
            if (text !== output) {
                explanations.push({
                    word: text.substring(0, EXPLANATION_SNIPPET_LENGTH) + (text.length > EXPLANATION_SNIPPET_LENGTH ? "..." : ""),
                    converted: output.substring(0, EXPLANATION_SNIPPET_LENGTH) + (output.length > EXPLANATION_SNIPPET_LENGTH ? "..." : ""),
                    reason: "All text converted to lowercase",
                    type: "lowercased"
                });
            }
            break;

        default:
            // For other types, just convert without detailed explanations
            output = convert(text, type, options);
            break;
    }

    return { output, explanations };
}

/**
 * Conversion plus a segmented view of the output, so the UI can mark each
 * changed word in place and show the rule behind it.
 *
 * Only title and sentence case run through the rule pipeline; every other mode
 * returns a single unchanged segment.
 */
export function convertWithSegments(
    text: string,
    type: ConversionType,
    options: ConvertOptions = {},
): { output: string; segments: OutputSegment[] } {
    if (!text) return { output: "", segments: [] };

    const titleStyle = options.titleStyle ?? "standard";
    const transforms =
        type === "title" ? buildTitleTransforms(text, titleStyle)
        : type === "sentence" ? buildSentenceTransforms(text)
        : null;

    if (!transforms) {
        const output = convert(text, type, options);
        return { output, segments: [{ text: output, type: "unchanged" }] };
    }

    const segments = buildSegments(text, transforms);
    return { output: segments.map((segment) => segment.text).join(""), segments };
}
