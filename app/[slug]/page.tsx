import { notFound } from "next/navigation"
import Link from "next/link"
import { SEO_CONFIG, CONVERTER_SLUGS } from "@/lib/seo-config"
import { TextConverter } from "@/components/text-converter"
import { ModeContentSection, getRelatedLinksForMode } from "@/components/mode-content-section"
import { Toaster } from "@/components/ui/sonner"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { WebApplicationJsonLd, FAQPageJsonLd, HowToJsonLd } from "@/components/json-ld"
import type { Metadata } from "next"

const siteUrl = "https://titlecaseconverter.online"
export const revalidate = 604800
export const dynamicParams = false

// 1. Generate Static Params for all known slugs
export function generateStaticParams() {
    return CONVERTER_SLUGS.map((slug) => ({
        slug: slug,
    }))
}

// 2. Dynamic Metadata with full SEO
type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const config = SEO_CONFIG[slug]

    if (!config) {
        return {}
    }

    const pageUrl = `${siteUrl}/${slug}`

    return {
        title: config.title,
        description: config.description,
        openGraph: {
            title: config.title,
            description: config.description,
            type: "website",
            url: pageUrl,
            siteName: "Title Case Converter Online",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: config.title,
            description: config.description,
        },
        alternates: {
            canonical: pageUrl,
        },
    }
}

export default async function ConverterPage({ params }: Props) {
    const { slug } = await params
    const config = SEO_CONFIG[slug]

    if (!config) {
        notFound()
    }

    const pageUrl = `${siteUrl}/${slug}`
    const relatedLinks = getRelatedLinksForMode(config.mode)

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-950 dark:via-blue-950/20 dark:to-purple-950/10 gradient-animated">
            {/* JSON-LD Structured Data */}
            <WebApplicationJsonLd
                name={config.h1}
                description={config.description}
                url={pageUrl}
            />
            <HowToJsonLd
                name={`How to use ${config.h1}`}
                description={config.content.intro}
                steps={[
                    { name: "Enter your text", text: "Type or paste the text you want to convert into the input field." },
                    { name: "View results instantly", text: "The converted text will appear in the output field in real-time." },
                    { name: "Copy your text", text: "Click the copy button to copy the converted text to your clipboard." },
                ]}
            />
            {config.faqs && <FAQPageJsonLd faqs={config.faqs} />}

            <SiteHeader containerClassName="max-w-5xl" />

            <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-3.5rem)] flex flex-col items-center">
                <div className="w-full max-w-5xl space-y-16">
                    <div className="text-center space-y-4 mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                            {config.h1}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Transform your text instantly with smart capitalization rules.
                        </p>
                    </div>

                    {/* Converter Section */}
                    <TextConverter defaultMode={config.mode} />

                    {/* SEO Content Section */}
                    <article className="prose prose-zinc dark:prose-invert max-w-none w-full">
                        <p className="lead text-lg text-muted-foreground mb-8">
                            {config.content.intro}
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border">
                                <h2 className="text-lg font-semibold mb-4">Features</h2>
                                <ul className="space-y-2">
                                    {config.content.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border">
                                <h2 className="text-lg font-semibold mb-4">Example</h2>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-xs font-mono text-muted-foreground mb-1 uppercase">Input</div>
                                        <div className="font-medium">{config.content.exampleInput}</div>
                                    </div>
                                    <div className="text-center text-muted-foreground">↓</div>
                                    <div>
                                        <div className="text-xs font-mono text-muted-foreground mb-1 uppercase">Output</div>
                                        <div className="font-medium text-primary">{config.content.exampleOutput}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </article>

                    <ModeContentSection config={config} showRelated={false} />

                    {/* FAQ Section */}
                    {config.faqs && config.faqs.length > 0 && (
                        <section className="mt-16 w-full">
                            <h2 className="text-2xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                {config.faqs.map((faq, i) => (
                                    <div key={i} className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border">
                                        <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="mt-16 w-full">
                        <h2 className="text-2xl font-bold tracking-tight mb-6">Related Converters</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            {relatedLinks.map((link, index) => (
                                <span key={link.href}>
                                    {index > 0 ? ", " : ""}
                                    <Link href={link.href} className="underline underline-offset-4">
                                        {link.label}
                                    </Link>
                                </span>
                            ))}
                            .
                        </p>
                    </section>
                </div>
            </main>

            <SiteFooter containerClassName="max-w-5xl" />
            <Toaster />
        </div>
    )
}
