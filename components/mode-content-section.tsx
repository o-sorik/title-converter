import Link from "next/link"
import type { SeoPageConfig } from "@/lib/seo-config"
import type { ConversionType } from "@/lib/converters"

type ModeContent = {
    whenToUse: string
    useCases: string[]
    commonMistakes: string[]
    proTip: string
    relatedLinks: { href: string; label: string }[]
}

const MODE_CONTENT: Record<ConversionType, ModeContent> = {
    title: {
        whenToUse: "Use title case for headlines, article titles, and naming conventions where major words should stand out.",
        useCases: [
            "Blog post and landing page headlines.",
            "YouTube video titles and newsletter subjects.",
            "Editorial publishing workflows with style guidelines.",
        ],
        commonMistakes: [
            "Capitalizing every short preposition in the middle of a title.",
            "Forgetting to capitalize the first or last word.",
            "Overwriting brand casing (for example, iPhone or eBay).",
        ],
        proTip: "Choose a style (Standard, AP, APA, Chicago, MLA) before final publishing and keep it consistent across pages.",
        relatedLinks: [
            { href: "/sentence-case-converter", label: "Sentence Case Converter" },
            { href: "/upper-case-converter", label: "Upper Case Converter" },
            { href: "/lower-case-converter", label: "Lower Case Converter" },
        ],
    },
    sentence: {
        whenToUse: "Use sentence case when you want natural, readable text with only sentence starts and proper nouns capitalized.",
        useCases: [
            "UI labels, form hints, and product microcopy.",
            "Meta descriptions and summary snippets.",
            "Clean-up of ALL CAPS or inconsistent draft text.",
        ],
        commonMistakes: [
            "Using title case for full paragraphs that should remain conversational.",
            "Keeping random uppercase words from pasted content.",
            "Assuming sentence case should capitalize every word after punctuation in all contexts.",
        ],
        proTip: "Use sentence case for body content and reserve title case mostly for headings and titles.",
        relatedLinks: [
            { href: "/", label: "Title Case Converter" },
            { href: "/lower-case-converter", label: "Lower Case Converter" },
            { href: "/upper-case-converter", label: "Upper Case Converter" },
        ],
    },
    lower: {
        whenToUse: "Use lower case when you need normalization, consistent storage values, or clean machine-friendly text.",
        useCases: [
            "Database value normalization and deduplication.",
            "Bulk cleanup of copied text with mixed capitalization.",
            "Pre-processing data before comparisons or search indexing.",
        ],
        commonMistakes: [
            "Applying lower case to branded names that require specific casing.",
            "Using lower case in places where readability depends on proper nouns.",
            "Forgetting to review acronyms after bulk conversion.",
        ],
        proTip: "For technical pipelines, lower-case conversion is often the first cleanup step before validation.",
        relatedLinks: [
            { href: "/upper-case-converter", label: "Upper Case Converter" },
            { href: "/snake-case-converter", label: "Snake Case Converter" },
            { href: "/slug-generator", label: "URL Slug Generator" },
        ],
    },
    upper: {
        whenToUse: "Use upper case for strong emphasis, labels, warnings, and content that must be visually prominent.",
        useCases: [
            "CTA labels and short hero taglines.",
            "Warning notices and compliance indicators.",
            "Formatting acronyms and code identifiers in docs.",
        ],
        commonMistakes: [
            "Using all caps for long paragraphs, which harms readability.",
            "Forgetting that upper case can feel aggressive in UX copy.",
            "Converting text that contains case-sensitive brand names without review.",
        ],
        proTip: "Keep all-caps strings short to preserve scannability and visual balance.",
        relatedLinks: [
            { href: "/lower-case-converter", label: "Lower Case Converter" },
            { href: "/", label: "Title Case Converter" },
            { href: "/alternating-case-converter", label: "Alternating Case Converter" },
        ],
    },
    camel: {
        whenToUse: "Use camelCase for variable names and object keys where the first token should be lowercase.",
        useCases: [
            "JavaScript and TypeScript variable naming.",
            "JSON key formatting for APIs.",
            "Frontend state and prop naming conventions.",
        ],
        commonMistakes: [
            "Using PascalCase where camelCase is required by lint rules.",
            "Keeping spaces or special characters in generated names.",
            "Starting with uppercase when the convention expects lowercase.",
        ],
        proTip: "Use camelCase for values and PascalCase for classes/components to keep naming predictable.",
        relatedLinks: [
            { href: "/pascal-case-converter", label: "Pascal Case Converter" },
            { href: "/snake-case-converter", label: "Snake Case Converter" },
            { href: "/kebab-case-converter", label: "Kebab Case Converter" },
        ],
    },
    pascal: {
        whenToUse: "Use PascalCase for class names, component names, and type identifiers.",
        useCases: [
            "React component naming conventions.",
            "C# and Java class/type names.",
            "Schema model and DTO naming.",
        ],
        commonMistakes: [
            "Using camelCase for exported class/type names.",
            "Leaving punctuation that breaks identifier formatting.",
            "Inconsistent casing between file names and class names.",
        ],
        proTip: "Align file names and PascalCase identifiers to reduce import confusion in large codebases.",
        relatedLinks: [
            { href: "/camel-case-converter", label: "Camel Case Converter" },
            { href: "/snake-case-converter", label: "Snake Case Converter" },
            { href: "/kebab-case-converter", label: "Kebab Case Converter" },
        ],
    },
    snake: {
        whenToUse: "Use snake_case for Python variables, SQL columns, and systems that prefer underscore-separated identifiers.",
        useCases: [
            "Database table and column naming.",
            "Python variables and function names.",
            "Data pipeline field normalization.",
        ],
        commonMistakes: [
            "Mixing snake_case with camelCase in the same codebase.",
            "Leaving uppercase letters in standardized identifiers.",
            "Using hyphens where underscores are required.",
        ],
        proTip: "Choose one naming convention per layer (DB, API, frontend) and map intentionally between layers.",
        relatedLinks: [
            { href: "/kebab-case-converter", label: "Kebab Case Converter" },
            { href: "/camel-case-converter", label: "Camel Case Converter" },
            { href: "/slug-generator", label: "URL Slug Generator" },
        ],
    },
    kebab: {
        whenToUse: "Use kebab-case for URL slugs, CSS class names, and human-readable path segments.",
        useCases: [
            "SEO-friendly URL path generation.",
            "CSS utility and component class naming.",
            "Normalized route and filename patterns.",
        ],
        commonMistakes: [
            "Using underscores in URL slugs when hyphens are preferred.",
            "Keeping uppercase characters in slugs.",
            "Including unsafe punctuation in path segments.",
        ],
        proTip: "For SEO pages, keep slugs short, descriptive, and keyword-relevant without stuffing.",
        relatedLinks: [
            { href: "/slug-generator", label: "URL Slug Generator" },
            { href: "/snake-case-converter", label: "Snake Case Converter" },
            { href: "/lower-case-converter", label: "Lower Case Converter" },
        ],
    },
    alternating: {
        whenToUse: "Use alternating case for playful formatting, meme-style text, and social content experiments.",
        useCases: [
            "Humor and meme captions.",
            "Community replies and lighthearted copy.",
            "Experimental social media hooks.",
        ],
        commonMistakes: [
            "Using alternating case in formal or business communication.",
            "Applying it to long text blocks that become hard to read.",
            "Assuming it improves clarity rather than tone.",
        ],
        proTip: "Use alternating case selectively for tone, not for core product copy or accessibility-critical text.",
        relatedLinks: [
            { href: "/upper-case-converter", label: "Upper Case Converter" },
            { href: "/lower-case-converter", label: "Lower Case Converter" },
            { href: "/", label: "Title Case Converter" },
        ],
    },
    inverse: {
        whenToUse: "Use inverse case when you need quick toggling for visual comparison or formatting experiments.",
        useCases: [
            "Case-flip previews in content editing.",
            "Debugging copy formatting differences.",
            "Creative text effects.",
        ],
        commonMistakes: [
            "Using inverse case for production content.",
            "Applying to long text where readability is important.",
            "Expecting grammatical capitalization from inversion.",
        ],
        proTip: "Inverse case is best as a temporary transformation, not as a final publishing format.",
        relatedLinks: [
            { href: "/alternating-case-converter", label: "Alternating Case Converter" },
            { href: "/upper-case-converter", label: "Upper Case Converter" },
            { href: "/lower-case-converter", label: "Lower Case Converter" },
        ],
    },
}

export function getRelatedLinksForMode(mode: ConversionType) {
    return MODE_CONTENT[mode].relatedLinks
}

export function ModeContentSection({ config, showRelated = true }: { config: SeoPageConfig; showRelated?: boolean }) {
    const modeContent = MODE_CONTENT[config.mode]

    return (
        <section className="mt-16 space-y-10 max-w-4xl mx-auto px-4 text-zinc-800 dark:text-zinc-200">
            <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight">What Is {config.h1}?</h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {config.content.intro}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">{modeContent.whenToUse}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-xl border bg-card">
                    <h3 className="font-semibold text-lg mb-3">Best Use Cases</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {modeContent.useCases.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="p-6 rounded-xl border bg-card">
                    <h3 className="font-semibold text-lg mb-3">Common Mistakes to Avoid</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {modeContent.commonMistakes.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-xl font-semibold">Pro Tip</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{modeContent.proTip}</p>
            </div>

            {showRelated && (
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold">Related Converters</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {modeContent.relatedLinks.map((link, index) => (
                            <span key={link.href}>
                                {index > 0 ? ", " : ""}
                                <Link href={link.href} className="underline underline-offset-4">
                                    {link.label}
                                </Link>
                            </span>
                        ))}
                        .
                    </p>
                </div>
            )}
        </section>
    )
}
