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

const KNOWN_ACRONYMS = new Set([
    "AI",
    "API",
    "CPU",
    "CSS",
    "EU",
    "GDP",
    "GPU",
    "HTML",
    "HTTP",
    "HTTPS",
    "ID",
    "JSON",
    "JS",
    "ML",
    "NASA",
    "PDF",
    "SEO",
    "SQL",
    "UI",
    "UK",
    "UN",
    "URL",
    "USA",
    "UX",
]);

function capitalize(word: string): string {
    return word
        .split(/(['’])/)
        .map((segment) => {
            if (segment === "'" || segment === "’") return segment;
            if (!segment) return segment;
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
        if (style === "ap" && word.length >= 5) {
            return { convertToLower: false, reason: "AP style: preposition with 5+ letters" };
        }
        if (style === "apa" && word.length >= 4) {
            return { convertToLower: false, reason: "APA style: preposition with 4+ letters" };
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

function getCanonicalAcronym(word: string): string | null {
    const upper = word.toUpperCase();
    if (KNOWN_ACRONYMS.has(upper)) return upper;
    if (/^[A-Za-z](?:\.[A-Za-z])+\.?$/.test(word)) return upper;
    if (/[0-9]/.test(word) && /^[A-Za-z0-9]{2,}$/.test(word)) return upper;
    return null;
}

function hasCustomCasing(word: string): boolean {
    return /[a-z]/.test(word) && /[A-Z]/.test(word) && word !== word.toLowerCase() && word !== word.toUpperCase();
}

function looksVerbLike(word: string): boolean {
    const lower = word.toLowerCase();
    return COMMON_BASE_VERBS.has(lower) || lower.endsWith("ed") || lower.endsWith("ing");
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

        const canonicalAcronym = getCanonicalAcronym(token.word);
        if (canonicalAcronym) {
            return {
                word: token.word,
                converted: canonicalAcronym,
                reason: "Likely acronym",
                type: canonicalAcronym === token.word ? "unchanged" : "capitalized",
                start: token.start,
                end: token.end,
            };
        }

        if (hasCustomCasing(token.word)) {
            return { word: token.word, converted: token.word, reason: "Custom/proper noun casing preserved", type: "unchanged", start: token.start, end: token.end };
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
        if (decision.convertToLower) {
            return { word: token.word, converted: lower, reason: `${decision.reason} (${style.toUpperCase()} style)`, type: "lowercased", start: token.start, end: token.end };
        }

        return { word: token.word, converted: capitalize(lower), reason: `${decision.reason} (${style.toUpperCase()} style)`, type: "capitalized", start: token.start, end: token.end };
    });
}

function convertTitleCase(text: string, style: TitleCaseStyle): string {
    const transforms = buildTitleTransforms(text, style);
    let result = text;
    let offset = 0;

    for (const transform of transforms) {
        result = result.slice(0, transform.start + offset) + transform.converted + result.slice(transform.end + offset);
        offset += transform.converted.length - transform.word.length;
    }

    return result;
}

function buildSentenceTransforms(text: string): TitleWordTransform[] {
    const tokens = tokenizeWords(text);
    if (!tokens.length) return [];

    return tokens.map((token, i) => {
        const prevToken = i > 0 ? tokens[i - 1] : null;
        const betweenPrevAndCurrent = prevToken ? text.slice(prevToken.end, token.start) : "";
        const sentenceStart = i === 0 || /[.!?]/.test(betweenPrevAndCurrent);
        const canonicalAcronym = getCanonicalAcronym(token.word);

        if (hasCustomCasing(token.word) || canonicalAcronym) {
            return {
                word: token.word,
                converted: canonicalAcronym ?? token.word,
                reason: "Custom casing or acronym preserved",
                type: !canonicalAcronym || canonicalAcronym === token.word ? "unchanged" : "capitalized",
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
            const sentenceTransforms = buildSentenceTransforms(text);
            let sentenceResult = text;
            let sentenceOffset = 0;
            for (const transform of sentenceTransforms) {
                sentenceResult =
                    sentenceResult.slice(0, transform.start + sentenceOffset) +
                    transform.converted +
                    sentenceResult.slice(transform.end + sentenceOffset);
                sentenceOffset += transform.converted.length - transform.word.length;
            }
            return sentenceResult;
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
        case "title":
            // Title case with explanations
            const transforms = buildTitleTransforms(text, titleStyle);
            let transformedText = text;
            let transformOffset = 0;

            for (const transform of transforms) {
                if (transform.word !== transform.converted) {
                    explanations.push({
                        word: transform.word,
                        converted: transform.converted,
                        reason: transform.reason,
                        type: transform.type,
                    });
                }

                transformedText =
                    transformedText.slice(0, transform.start + transformOffset) +
                    transform.converted +
                    transformedText.slice(transform.end + transformOffset);
                transformOffset += transform.converted.length - transform.word.length;
            }
            output = transformedText;
            break;

        case "sentence":
            // Sentence case with explanations
            const sentenceTransforms = buildSentenceTransforms(text);
            output = text;
            let sentenceOffset = 0;

            for (const transform of sentenceTransforms) {
                if (transform.word !== transform.converted) {
                    explanations.push({
                        word: transform.word,
                        converted: transform.converted,
                        reason: transform.reason,
                        type: transform.type,
                    });
                }

                output =
                    output.slice(0, transform.start + sentenceOffset) +
                    transform.converted +
                    output.slice(transform.end + sentenceOffset);
                sentenceOffset += transform.converted.length - transform.word.length;
            }
            break;

        case "upper":
            output = text.toUpperCase();
            if (text !== output) {
                explanations.push({
                    word: text.substring(0, 20) + (text.length > 20 ? "..." : ""),
                    converted: output.substring(0, 20) + (output.length > 20 ? "..." : ""),
                    reason: "All text converted to uppercase",
                    type: "capitalized"
                });
            }
            break;

        case "lower":
            output = text.toLowerCase();
            if (text !== output) {
                explanations.push({
                    word: text.substring(0, 20) + (text.length > 20 ? "..." : ""),
                    converted: output.substring(0, 20) + (output.length > 20 ? "..." : ""),
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
