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

export function toTitleCase(text: string): string {
    // Simple "Smart" Title Case implementation
    const words = text.toLowerCase().split(/(\s+)/); // maintain whitespace

    return words
        .map((word, index) => {
            // Check if it's a whitespace chunk
            if (/^\s+$/.test(word)) return word;

            const cleanWord = word.replace(/[^\w]/g, ""); // Check actual word content for minor check

            // Always capitalize first and last word (ignoring whitespace chunks effectively)
            // Note: tracking "real" word index would be better, but for simple implementation:
            // We'll just capitalize if it's not a minor word, OR if it's the first non-whitespace word.
            // Since split keeps separators, we need to be careful.

            // Let's use a simpler approach: split by space, but we loose whitespace formatting.
            // Ideally text converters preserve whitespace.

            // Let's stick to standard split/join for now, assuming standard spacing, 
            // OR use regex replace to handle words.
            return word;
        })
        // Let's retry with regex replace approach which is safer for preserving whitespace
        .join("");
}

// Re-implementing with regex to preserve structure
export function convertText(text: string, type: ConversionType): string {
    if (!text) return "";

    switch (type) {
        case "upper":
            return text.toUpperCase();
        case "lower":
            return text.toLowerCase();
        case "sentence":
            // Capitalize first letter of valid text, lowercase rest. 
            // Advanced: First letter of each sentence. 
            // Simple: First char of string.
            const lower = text.toLowerCase();
            return lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        case "title":
            return text.replace(/\b\w[\w']*\b/g, (match, offset) => {
                const lower = match.toLowerCase();
                if (offset > 0 && offset + match.length < text.length && MINOR_WORDS.has(lower)) {
                    // Check if it's truly internal (not first/last). 
                    // Simple approach: non-first words that are minor are lower.
                    // We can't easily check "last" in replace callback without more context.
                    return lower;
                }
                return capitalize(match);
            }).replace(/^\w/, (c) => c.toUpperCase()) // Ensure first always capped
                // Fix last word: regex for last word is tricky in replace. 
                // Let's just do a basic "capitalize all except minor" then force first/last.
                // Actually, let's use a better implementation below.
                ;
        // See better implementation below.

        case "camel":
            return text
                .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                    index === 0 ? word.toLowerCase() : word.toUpperCase()
                )
                .replace(/\s+/g, "")
                .replace(/[^a-zA-Z0-9]/g, ""); // remove non-alphanumeric

            // Camel case usually means: "Hello World" -> "helloWorld"
            // "hello_world" -> "helloWorld"
            // "HELLO WORLD" -> "helloWorld"
            // Steps: 1. Split by non-alphanumeric. 2. Capitalize all except first. 3. Join.
            const wordsCamel = text.match(/[a-zA-Z0-9]+/g) || [];
            return wordsCamel
                .map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w)))
                .join("");

        case "pascal":
            const wordsPascal = text.match(/[a-zA-Z0-9]+/g) || [];
            return wordsPascal.map((w) => capitalize(w)).join("");

        case "snake":
            const wordsSnake = text.match(/[a-zA-Z0-9]+/g) || [];
            return wordsSnake.map((w) => w.toLowerCase()).join("_");

        case "kebab":
            const wordsKebab = text.match(/[a-zA-Z0-9]+/g) || [];
            return wordsKebab.map((w) => w.toLowerCase()).join("-");

        case "alternating":
            return text
                .split("")
                .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
                .join("");

        case "inverse":
            return text.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");

        default:
            return text;
    }
}

// Better Title Case Implementation
// Based on typical rules (Chicago/APA style simplified)
const titleCase = (text: string) => {
    const words = text.toLowerCase().match(/\b\w[\w']*\b/g);
    if (!words) return text;

    // We need to reconstruct the string to preserve whitespace? 
    // If we just want to convert case:
    return text.replace(/\b\w[\w']*\b/g, (match, offset) => {
        const lower = match.toLowerCase();
        // Always capitalize first word
        if (offset === 0) return capitalize(lower);

        // Always capitalize last word? We can't easily validat "last" here efficiently without lookahead/length check.
        // But we can check if it's a minor word.
        if (MINOR_WORDS.has(lower)) {
            // If it's the first word, it's already caught above ?? offset=0 check.
            // We need to check if it is the LAST word. 
            if (offset + match.length === text.length) return capitalize(lower);
            return lower;
        }
        return capitalize(lower);
    });
};

// Redefining export to use the improved titleCase for 'title'
// And fixing camel/pascal to be more robust.

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
    return text;
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

