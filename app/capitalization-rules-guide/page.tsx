import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { getRulesGuideViewModelWithContext } from "@/lib/rules-guide-content"
import { parseConverterInitialStateFromSearchParams, toConverterContext } from "@/lib/converter-context"

export const revalidate = 604800

export const metadata: Metadata = {
    title: "Capitalization Rules Guide - Edge Cases and Style Examples",
    description: "Resolve ambiguous capitalization quickly with practical edge-case examples across AP, APA, MLA, Chicago, and standard title-style guidance.",
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: "https://titlecaseconverter.online/capitalization-rules-guide",
    },
}

interface RulesGuidePageProps {
    searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function CapitalizationRulesGuidePage({ searchParams }: RulesGuidePageProps) {
    const resolvedParams = (await searchParams) ?? {}
    const styleParam = Array.isArray(resolvedParams.style) ? resolvedParams.style[0] : resolvedParams.style
    const modeParam = Array.isArray(resolvedParams.mode) ? resolvedParams.mode[0] : resolvedParams.mode
    const converterInitialState = parseConverterInitialStateFromSearchParams(resolvedParams)
    const model = getRulesGuideViewModelWithContext(styleParam, modeParam, toConverterContext(converterInitialState))

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-950 dark:via-blue-950/20 dark:to-purple-950/10">
            <SiteHeader containerClassName="max-w-5xl" />
            <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
                <header className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Edge-case guidance</p>
                    <h1 className="text-4xl font-extrabold tracking-tight">Capitalization Rules: Ambiguous Cases</h1>
                    <p className="text-lg text-muted-foreground">
                        Practical examples for short words, punctuation, and subtitle complexity so you can verify uncertain cases without losing momentum.
                    </p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Current Style Context</h2>
                    <p className="text-muted-foreground">{model.styleSummary}</p>
                    <p className="text-sm text-muted-foreground">
                        Active style focus: <span className="font-semibold text-foreground">{model.styleTitle}</span>
                    </p>
                    {model.didFallbackToStandard && (
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                            Unsupported style parameter detected. Showing Standard guidance for safety.
                        </p>
                    )}
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Common Ambiguous Cases</h2>
                    <div className="space-y-4">
                        {model.examples.map((example) => (
                            <article key={example.caseLabel} className="rounded-xl border bg-white/70 dark:bg-zinc-900/60 p-5 space-y-3">
                                <h3 className="text-lg font-semibold tracking-tight">{example.caseLabel}</h3>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">Input:</span> {example.input}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">Recommended for current style:</span>{" "}
                                    {example.outputs[model.activeStyle]}
                                </p>
                                <details className="rounded-lg border p-3">
                                    <summary className="cursor-pointer text-sm font-medium">Compare all styles</summary>
                                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                                        <li>Standard: {example.outputs.standard}</li>
                                        <li>AP: {example.outputs.ap}</li>
                                        <li>APA: {example.outputs.apa}</li>
                                        <li>MLA: {example.outputs.mla}</li>
                                        <li>Chicago: {example.outputs.chicago}</li>
                                    </ul>
                                </details>
                                <p className="text-sm text-muted-foreground">{example.whyItMatters}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Next Action</h2>
                    <p className="text-muted-foreground">
                        Return to the converter and apply the example that matches your editorial context, then run one more conversion check.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href={model.returnHref} className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            {model.returnLabel}
                        </Link>
                        <Link href="/" className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            Open Title Case Converter
                        </Link>
                    </div>
                </section>
            </main>
            <SiteFooter containerClassName="max-w-5xl" />
        </div>
    )
}
