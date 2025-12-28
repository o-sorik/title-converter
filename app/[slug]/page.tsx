import { notFound } from "next/navigation"
import { SEO_CONFIG, CONVERTER_SLUGS } from "@/lib/seo-config"
import { TextConverter } from "@/components/text-converter"
import { ContentSection } from "@/components/content-section"
import { ModeToggle } from "@/components/mode-toggle"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"

// 1. Generate Static Params for all known slugs
export function generateStaticParams() {
    return CONVERTER_SLUGS.map((slug) => ({
        slug: slug,
    }))
}

// 2. Dynamic Metadata
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

    return {
        title: config.title,
        description: config.description,
        openGraph: {
            title: config.title,
            description: config.description,
            type: "website",
        },
    }
}

export default async function ConverterPage({ params }: Props) {
    const { slug } = await params
    const config = SEO_CONFIG[slug]

    if (!config) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between mx-auto px-4 max-w-5xl">
                    <div className="flex items-center gap-2">
                        <a href="/" className="font-bold text-xl tracking-tighter hover:text-primary transition-colors">
                            Title Case Converter Online
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-10 px-4 min-h-[calc(100vh-3.5rem)] flex flex-col items-center">
                <div className="w-full max-w-5xl space-y-16">
                    {/* Converter Section */}
                    <TextConverter defaultMode={config.mode} />

                    {/* SEO Content Section */}
                    <article className="prose prose-zinc dark:prose-invert max-w-none w-full">
                        <h1 className="text-3xl font-bold tracking-tight mb-6">{config.h1}</h1>
                        <p className="lead text-lg text-muted-foreground mb-8">
                            {config.content.intro}
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border">
                                <h3 className="text-lg font-semibold mb-4">Features</h3>
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
                                <h3 className="text-lg font-semibold mb-4">Example</h3>
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

                    {/* Keep the generic content section at the bottom too? Or maybe replace it? 
                        Let's keep generic content at bottom for internal linking value if it exists 
                        in ContentSection, but for now we won't duplicate.
                        Actually, let's include the generic ContentSection from the home page 
                        below the specific content to pad out the page.
                    */}
                    <ContentSection />
                </div>
            </main>

            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4 max-w-5xl">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by Antigravity. Source available on GitHub.
                    </p>
                </div>
            </footer>
            <Toaster />
        </div>
    )
}
