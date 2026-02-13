import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter, SiteHeader } from "@/components/site-shell"

export const revalidate = 604800

export const metadata: Metadata = {
    title: "Capitalization Rules Guide (Coming Soon)",
    description: "Coming soon: a comprehensive capitalization rules guide covering AP, APA, MLA, Chicago, examples, edge cases, and practical publishing workflows.",
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: "https://titlecaseconverter.online/capitalization-rules-guide",
    },
}

export default function CapitalizationRulesGuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-950 dark:via-blue-950/20 dark:to-purple-950/10">
            <SiteHeader containerClassName="max-w-5xl" />
            <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
                <header className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Coming soon</p>
                    <h1 className="text-4xl font-extrabold tracking-tight">Capitalization Rules: Full Guide</h1>
                    <p className="text-lg text-muted-foreground">
                        We are preparing a comprehensive guide on capitalization rules across AP, APA, MLA, Chicago, and modern digital publishing workflows.
                    </p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">What Will Be Included</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Style-by-style comparison: AP vs APA vs MLA vs Chicago.</li>
                        <li>Complete title case rule breakdown with examples.</li>
                        <li>Edge cases: hyphenated terms, subtitles, acronyms, proper nouns, and brand casing.</li>
                        <li>Practical checklists for blogs, newsletters, video titles, and editorial workflows.</li>
                        <li>Internal links to converter tools for faster editing workflows.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Quick Start Until Full Guide Is Live</h2>
                    <p className="text-muted-foreground">
                        Use the homepage converter for fast title cleanup, then run a quick manual review for brand names and style-guide specific exceptions.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/" className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            Open Title Case Converter
                        </Link>
                        <Link href="/sentence-case-converter" className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            Try Sentence Case Converter
                        </Link>
                    </div>
                </section>
            </main>
            <SiteFooter containerClassName="max-w-5xl" />
        </div>
    )
}
