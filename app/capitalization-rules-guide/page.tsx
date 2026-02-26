import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { BreadcrumbListJsonLd, FAQPageJsonLd } from "@/components/json-ld"
import { getRulesGuideHubViewModel } from "@/lib/rules-guide-content"
import { parseConverterInitialStateFromSearchParams, toConverterContext } from "@/lib/converter-context"
import type { GuidanceStyle } from "@/lib/rules-guide-content"

const siteUrl = "https://titlecaseconverter.online"

export const revalidate = 604800

export const metadata: Metadata = {
    title: "Capitalization Rules by Style — AP, APA, MLA, Chicago",
    description: "Compare title capitalization rules across AP, APA, MLA, and Chicago style guides. Side-by-side table, edge cases, and links to official sources.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://titlecaseconverter.online/capitalization-rules-guide",
    },
    openGraph: {
        title: "Capitalization Rules by Style — AP, APA, MLA, Chicago",
        description: "Compare title capitalization rules across AP, APA, MLA, and Chicago style guides.",
        type: "website",
        url: `${siteUrl}/capitalization-rules-guide`,
        siteName: "Title Case Converter Online",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Capitalization Rules by Style — AP, APA, MLA, Chicago",
        description: "Compare title capitalization rules across AP, APA, MLA, and Chicago style guides.",
    },
}

const STYLE_ORDER: GuidanceStyle[] = ["standard", "ap", "apa", "mla", "chicago"]

interface RulesGuidePageProps {
    searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function CapitalizationRulesGuidePage({ searchParams }: RulesGuidePageProps) {
    const resolvedParams = (await searchParams) ?? {}
    const styleParam = Array.isArray(resolvedParams.style) ? resolvedParams.style[0] : resolvedParams.style
    const modeParam = Array.isArray(resolvedParams.mode) ? resolvedParams.mode[0] : resolvedParams.mode
    const converterInitialState = parseConverterInitialStateFromSearchParams(resolvedParams)
    const model = getRulesGuideHubViewModel(styleParam, modeParam, toConverterContext(converterInitialState))

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-950 dark:via-blue-950/20 dark:to-purple-950/10">
            <SiteHeader containerClassName="max-w-5xl" />

            <BreadcrumbListJsonLd items={[
                { name: "Home", item: siteUrl },
                { name: "Capitalization Rules Guide", item: `${siteUrl}/capitalization-rules-guide` },
            ]} />
            <FAQPageJsonLd faqs={model.faqs} />

            <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-4xl space-y-10">
                {/* Hero */}
                <header className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Reference guide</p>
                    <h1 className="text-4xl font-extrabold tracking-tight">Capitalization Rules by Style Guide</h1>
                    <p className="text-lg text-muted-foreground">
                        Compare how AP, APA, MLA, Chicago, and standard title case handle prepositions,
                        conjunctions, articles, and other tricky words — with a side-by-side table and real examples.
                    </p>
                </header>

                {/* Jump nav */}
                <nav aria-label="On this page" className="rounded-xl border bg-white/70 dark:bg-zinc-900/60 p-4">
                    <p className="text-sm font-medium text-foreground mb-2">On this page</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                        <a href="#style-guides" className="text-primary hover:underline underline-offset-4">Style Guides</a>
                        <span className="text-muted-foreground/40">|</span>
                        <a href="#comparison-table" className="text-primary hover:underline underline-offset-4">Comparison Table</a>
                        <span className="text-muted-foreground/40">|</span>
                        <a href="#edge-cases" className="text-primary hover:underline underline-offset-4">Edge Cases</a>
                        <span className="text-muted-foreground/40">|</span>
                        <a href="#faq" className="text-primary hover:underline underline-offset-4">FAQ</a>
                    </div>
                </nav>

                {/* Current style context */}
                <section className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                        Active style focus: <span className="font-semibold text-foreground">{model.styleTitle}</span>
                    </p>
                    {model.didFallbackToStandard && (
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                            Unsupported style parameter detected. Showing Standard guidance for safety.
                        </p>
                    )}
                </section>

                {/* Style Guide Overview */}
                <section id="style-guides" className="scroll-mt-24 space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Style Guide Overview</h2>
                    <div className="space-y-4">
                        {model.styleGuides.map((guide) => (
                            <article key={guide.id} id={`style-${guide.id}`} className="scroll-mt-24 rounded-xl border bg-white/70 dark:bg-zinc-900/60 p-6 space-y-4">
                                <h3 className="text-xl font-semibold">{guide.fullName}</h3>
                                <p className="text-muted-foreground">{guide.description}</p>
                                <ul className="space-y-1.5">
                                    {guide.keyRules.map((rule, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <span className="text-primary mt-0.5 shrink-0">&mdash;</span>
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-muted-foreground">
                                    Source:{" "}
                                    <a
                                        href={guide.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline underline-offset-4 hover:text-foreground"
                                    >
                                        {guide.sourceName}
                                    </a>
                                    {" "}({guide.editionNote})
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Comparison Table */}
                <section id="comparison-table" className="scroll-mt-24 space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Style Comparison Table</h2>
                    <p className="text-muted-foreground">
                        How each style treats the same input. Differences are where editorial consistency matters most.
                    </p>
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-zinc-50 dark:bg-zinc-900">
                                    <th className="text-left p-3 font-semibold min-w-[160px]">Scenario</th>
                                    {STYLE_ORDER.map((style) => (
                                        <th key={style} className="text-left p-3 font-semibold min-w-[140px] capitalize">{style === "standard" ? "Standard" : style.toUpperCase()}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {model.comparisonScenarios.map((row, i) => (
                                    <tr key={i} className="border-b last:border-b-0">
                                        <td className="p-3 align-top">
                                            <div className="font-medium">{row.scenario}</div>
                                            <div className="text-xs text-muted-foreground mt-1">{row.notes}</div>
                                        </td>
                                        {STYLE_ORDER.map((style) => (
                                            <td key={style} className="p-3 font-mono text-xs align-top whitespace-nowrap">{row.results[style]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Edge Cases */}
                <section id="edge-cases" className="scroll-mt-24 space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Common Edge Cases</h2>
                    <div className="space-y-4">
                        {model.examples.map((example) => (
                            <article key={example.caseLabel} className="rounded-xl border bg-white/70 dark:bg-zinc-900/60 p-5 space-y-3">
                                <h3 className="text-lg font-semibold tracking-tight">{example.caseLabel}</h3>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">Input:</span>{" "}
                                    <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{example.input}</code>
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">Current style ({model.activeStyle}):</span>{" "}
                                    <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{example.outputs[model.activeStyle]}</code>
                                </p>
                                <details className="rounded-lg border p-3">
                                    <summary className="cursor-pointer text-sm font-medium">Compare all styles</summary>
                                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                                        {STYLE_ORDER.map((style) => (
                                            <li key={style}>
                                                <span className="font-medium capitalize">{style === "standard" ? "Standard" : style.toUpperCase()}:</span>{" "}
                                                <code className="font-mono text-xs">{example.outputs[style]}</code>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                                <p className="text-sm text-muted-foreground">{example.whyItMatters}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="scroll-mt-24 space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {model.faqs.map((faq, i) => (
                            <details key={i} className="rounded-xl border bg-white/70 dark:bg-zinc-900/60 p-5 group">
                                <summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                                <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Internal links + actions */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
                    <p className="text-muted-foreground">
                        Try the converter with your own text, or explore style-specific guides in the blog.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href={model.returnHref} className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            {model.returnLabel}
                        </Link>
                        <Link href="/" className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            Open Title Case Converter
                        </Link>
                        <Link href="/blog" className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            Browse Writing Guides
                        </Link>
                        <Link href="/blog/categories/grammar-101" className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            Grammar 101
                        </Link>
                    </div>
                </section>
            </main>
            <SiteFooter containerClassName="max-w-5xl" />
        </div>
    )
}
