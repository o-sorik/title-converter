import Link from "next/link"
import { TITLE_CASE_MISTAKES } from "@/lib/home-content-data"

interface FAQ {
  question: string
  answer: string
}

interface ContentSectionProps {
  faqs?: FAQ[]
}

export function ContentSection({ faqs }: ContentSectionProps) {
    const lastUpdated = "February 8, 2026"

    return (
        <section className="mt-16 space-y-12 max-w-4xl mx-auto px-4 text-zinc-800 dark:text-zinc-200">
            <div className="space-y-4">
                <h2 id="what-is-title-case" className="scroll-mt-20 text-3xl font-bold tracking-tight">What Is Title Case?</h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Title case is a capitalization style where major words are capitalized and most minor words stay lowercase.
                    It is commonly used for blog titles, article headlines, video titles, and book names.
                </p>
                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="font-semibold mb-2 text-green-700 dark:text-green-400">Correct Examples</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>The Catcher in the Rye</li>
                            <li>A Tale of Two Cities</li>
                            <li>How to Write Better Headlines</li>
                        </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="font-semibold mb-2 text-red-700 dark:text-red-400">Incorrect Examples</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>The catcher in the rye</li>
                            <li>A Tale Of Two Cities</li>
                            <li>How To Write better Headlines</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 id="which-title-case-style" className="scroll-mt-20 text-3xl font-bold tracking-tight">Which Title Case Style Should You Use?</h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Most teams follow one style guide consistently. The right choice depends on your publication type and editorial standards.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold text-lg">AP Style</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Best for newsrooms, press releases, and journalism teams.</p>
                        <p className="text-sm mt-2">Main difference: often keeps short prepositions lowercase in the middle of titles.</p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold text-lg">APA Style</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Best for academic writing in psychology and social sciences.</p>
                        <p className="text-sm mt-2">Main difference: emphasizes sentence case in references but title case in headings.</p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold text-lg">MLA Style</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Best for humanities writing, essays, and literature research.</p>
                        <p className="text-sm mt-2">Main difference: title capitalization is strict for major words and first/last words.</p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold text-lg">Chicago Style</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Best for books, long-form publishing, and editorial teams.</p>
                        <p className="text-sm mt-2">Main difference: detailed rules for compounds, hyphenation, and subtitle punctuation.</p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card md:col-span-2">
                        <h3 className="font-semibold text-lg">NYT / Headline Style</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Best for media-style headlines and marketing copy experiments.</p>
                        <p className="text-sm mt-2">Main difference: can prioritize readability and editorial tone over formal guide purity.</p>
                    </div>
                </div>
                <div>
                    <Link
                        href="/capitalization-rules-guide"
                        className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                        Read the Full Capitalization Rules Guide
                    </Link>
                </div>
            </div>

            <div className="space-y-4">
                <h2 id="common-title-case-mistakes" className="scroll-mt-20 text-3xl font-bold tracking-tight">Common Title Case Mistakes (With Fixes)</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {TITLE_CASE_MISTAKES.map((mistake) => (
                        <div key={mistake.correct} className="p-4 rounded-lg border bg-card text-sm space-y-1.5">
                            <p className="text-zinc-500 dark:text-zinc-400 line-through decoration-red-400/60">{mistake.wrong}</p>
                            <p className="font-medium">{mistake.correct}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{mistake.why}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <Link
                        href="/blog"
                        className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                        Browse the Capitalization Blog
                    </Link>
                </div>
            </div>

            <div className="space-y-4">
                <h2 id="title-case-cheat-sheet" className="scroll-mt-20 text-3xl font-bold tracking-tight">Title Case Rules Cheat Sheet</h2>
                <ol className="space-y-3 list-decimal list-inside text-zinc-700 dark:text-zinc-300">
                    <li>Capitalize the first and last word. Example: &quot;In the End&quot;.</li>
                    <li>Capitalize nouns, pronouns, verbs, adjectives, and adverbs. Example: &quot;How Smart Teams Work&quot;.</li>
                    <li>Lowercase articles in the middle. Example: &quot;The Art of Writing&quot;.</li>
                    <li>Lowercase short conjunctions in the middle. Example: &quot;Design and Development&quot;.</li>
                    <li>Lowercase most short prepositions in the middle. Example: &quot;A Guide to Product Strategy&quot;.</li>
                    <li>Capitalize verbs, even short ones. Example: &quot;Why It Is Worth It&quot;.</li>
                    <li>Treat the first word after a colon as title-start in many styles. Example: &quot;Editorial Rules: What to Follow&quot;.</li>
                    <li>Preserve proper noun casing. Example: &quot;A Beginner Guide to iPhone Photography&quot;.</li>
                    <li>Review acronyms manually. Example: &quot;How to Use API Keys Safely&quot;.</li>
                    <li>Double-check brand names before publishing. Example: &quot;LinkedIn Content Strategy Basics&quot;.</li>
                </ol>
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">How This Converter Applies Rules</h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    The converter applies practical title case logic that prioritizes readability and consistency for common editorial use cases.
                    It handles major/minor word decisions automatically and gives you a clean baseline in real time.
                </p>
                <h3 className="text-xl font-semibold">Limitations You Should Know</h3>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Automatic capitalization cannot always infer brand-specific casing, unusual proper nouns, or niche editorial exceptions.
                    For final publishing, do a quick manual check against your target style guide.
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Last updated: {lastUpdated}</p>
            </div>

            {faqs && faqs.length > 0 && (
                <div className="space-y-4">
                    <h2 id="faq" className="scroll-mt-20 text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border">
                                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Explore Related Tools</h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Use the right case format for each workflow:
                    {" "}
                    <Link href="/sentence-case-converter" className="underline underline-offset-4">Sentence Case Converter</Link>,
                    {" "}
                    <Link href="/lower-case-converter" className="underline underline-offset-4">Lower Case Converter</Link>,
                    {" "}
                    <Link href="/upper-case-converter" className="underline underline-offset-4">Upper Case Converter</Link>,
                    {" "}
                    <Link href="/slug-generator" className="underline underline-offset-4">URL Slug Generator</Link>,
                    {" "}
                    <Link href="/camel-case-converter" className="underline underline-offset-4">Camel Case Converter</Link>.
                </p>
            </div>
        </section>
    )
}
