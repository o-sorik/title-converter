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

const MINOR_WORDS = new Set([
    "a",
    "an",
    "the",
    "and",
    "but",
    "or",
    "nor",
    "for",
    "yet",
    "so",
    "as",
    "at",
    "by",
    "in",
    "of",
    "on",
    "to",
    "from",
    "with",
    "into",
    "onto",
    "upon",
    "via",
]);

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function convert(text: string, type: ConversionType): string {
    if (!text) return "";

    switch (type) {
        case "upper": return text.toUpperCase();
        case "lower": return text.toLowerCase();
        case "sentence":
            // Upper first letter of sentences.
            return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        case "title":
            return text.replace(/\b\w[\w']*\b/g, (match, offset, fullText) => {
                const lower = match.toLowerCase();
                if (offset === 0 || offset + match.length === fullText.length) {
                    return capitalize(lower);
                }
                if (MINOR_WORDS.has(lower)) return lower;
                return capitalize(lower);
            });
        case "camel":
            return (text.match(/[a-zA-Z0-9]+/g) || [])
                .map((w, i) => i === 0 ? w.toLowerCase() : capitalize(w))
                .join("");
        case "pascal":
            return (text.match(/[a-zA-Z0-9]+/g) || [])
                .map((w) => capitalize(w))
                .join("");
        case "snake":
            return (text.match(/[a-zA-Z0-9]+/g) || [])
                .map((w) => w.toLowerCase())
                .join("_");
        case "kebab":
            return (text.match(/[a-zA-Z0-9]+/g) || [])
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
export function convertWithExplanations(text: string, type: ConversionType): ConversionResult {
    if (!text) return { output: "", explanations: [] };

    const explanations: WordExplanation[] = [];
    let output = "";

    switch (type) {
        case "title":
            // Title case with explanations
            const words = text.match(/\b[\w']+\b/g) || [];
            const wordPositions: { word: string; start: number; end: number }[] = [];

            let searchStart = 0;
            for (const word of words) {
                const idx = text.indexOf(word, searchStart);
                wordPositions.push({ word, start: idx, end: idx + word.length });
                searchStart = idx + word.length;
            }

            let result = text;
            let offset = 0;

            for (let i = 0; i < wordPositions.length; i++) {
                const { word, start, end } = wordPositions[i];
                const lower = word.toLowerCase();
                const isFirst = i === 0;
                const isLast = i === wordPositions.length - 1;

                let converted: string;
                let reason: string;
                let explanationType: "capitalized" | "lowercased" | "unchanged";

                if (isFirst) {
                    converted = capitalize(lower);
                    reason = "First word is always capitalized";
                    explanationType = "capitalized";
                } else if (isLast) {
                    converted = capitalize(lower);
                    reason = "Last word is always capitalized";
                    explanationType = "capitalized";
                } else if (MINOR_WORDS.has(lower)) {
                    converted = lower;
                    reason = `Minor word (${getMinorWordType(lower)})`;
                    explanationType = "lowercased";
                } else {
                    converted = capitalize(lower);
                    reason = "Major word (capitalized)";
                    explanationType = "capitalized";
                }

                // Only add explanation if something changed
                if (word !== converted) {
                    explanations.push({
                        word,
                        converted,
                        reason,
                        type: explanationType
                    });
                }

                // Apply the transformation
                result = result.slice(0, start + offset) + converted + result.slice(end + offset);
                offset += converted.length - word.length;
            }
            output = result;
            break;

        case "sentence":
            // Sentence case with explanations
            const lowerText = text.toLowerCase();
            output = lowerText.replace(/(^\s*\w|[\.!?]\s*\w)/g, (match, idx) => {
                const upper = match.toUpperCase();
                if (idx === 0 || /[.!?]/.test(text[idx - 1] || "")) {
                    explanations.push({
                        word: match.trim(),
                        converted: upper.trim(),
                        reason: idx === 0 ? "First letter of text" : "First letter after sentence end",
                        type: "capitalized"
                    });
                }
                return upper;
            });
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
            output = convert(text, type);
            break;
    }

    return { output, explanations };
}

// Helper to get the type of minor word (for detailed explanations)
function getMinorWordType(word: string): string {
    const articles = ["a", "an", "the"];
    const conjunctions = ["and", "but", "or", "nor", "for", "yet", "so", "as"];
    const prepositions = ["at", "by", "in", "of", "on", "to", "from", "with", "into", "onto", "upon", "via"];

    if (articles.includes(word)) return "article";
    if (conjunctions.includes(word)) return "conjunction";
    if (prepositions.includes(word)) return "preposition";
    return "minor word";
}

