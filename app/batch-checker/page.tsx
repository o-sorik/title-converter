import type { Metadata } from "next"
import Link from "next/link"
import { BatchChecker } from "@/components/batch-checker"
import { WebApplicationJsonLd } from "@/components/json-ld"
import { Toaster } from "@/components/ui/sonner"
import { SiteFooter, SiteHeader } from "@/components/site-shell"

export const revalidate = 604800

const siteUrl = "https://titlecaseconverter.online"
const pageUrl = `${siteUrl}/batch-checker`

const title = "Batch Headline Checker — Editorial QA Tool"
const description =
    "Check multiple headlines at once against AP, APA, MLA, or Chicago capitalization rules. Paste one headline per line and instantly spot inconsistencies."

export const metadata: Metadata = {
    title: {
        absolute: title,
    },
    description,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title,
        description,
        type: "website",
        url: pageUrl,
        siteName: "Title Case Converter Online",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
}

export default function BatchCheckerPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-950 dark:via-blue-950/20 dark:to-purple-950/10 gradient-animated">
            <WebApplicationJsonLd
                name="Batch Headline Checker"
                description={description}
                url={pageUrl}
            />

            <SiteHeader containerClassName="max-w-5xl" />

            <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                            Batch Headline Checker
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Process multiple headlines against one capitalization standard. Paste one per line, run a QA pass, and instantly spot inconsistencies.
                        </p>
                    </div>

                    <BatchChecker />

                    {/* SEO content */}
                    <article className="prose prose-zinc dark:prose-invert max-w-none w-full space-y-8">
                        <section>
                            <h2>What Is the Batch Headline Checker?</h2>
                            <p>
                                The Batch Headline Checker is an editorial quality-assurance tool for writers, editors, and content teams who need to verify multiple headlines against a single capitalization standard in one pass. Instead of checking each title individually in the{" "}
                                <Link href="/">title case converter</Link>, you paste all your headlines at once, choose your standard (AP, APA, MLA, Chicago, or plain lower/upper), and get an instant report showing which headlines are already consistent and which need correction.
                            </p>
                        </section>

                        <section>
                            <h2>Who Is This Tool For?</h2>
                            <ul>
                                <li>
                                    <strong>Content editors and publishers</strong> reviewing a batch of article titles before publication — especially when enforcing a house style like AP or Chicago across a team.
                                </li>
                                <li>
                                    <strong>SEO managers and content marketers</strong> auditing blog post titles, meta titles, or social media post headlines for capitalization consistency.
                                </li>
                                <li>
                                    <strong>Students and academics</strong> double-checking APA or MLA formatted references and section headings before submission.
                                </li>
                                <li>
                                    <strong>Developers and technical writers</strong> normalizing documentation headings or API reference titles to a consistent case style.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2>How to Use the Batch Headline Checker</h2>
                            <ol>
                                <li>Select your <strong>capitalization standard</strong> — Title Case, Sentence case, lower case, or UPPER CASE.</li>
                                <li>If you chose Title Case, pick the <strong>title style</strong>: Standard, AP, Chicago, MLA, or APA.</li>
                                <li>Paste your headlines into the text area, <strong>one per line</strong>.</li>
                                <li>Click <strong>Run QA Pass</strong> to see which headlines are consistent and which need correction.</li>
                                <li>For any inconsistent headline, click <strong>Review in converter</strong> to open it in the{" "}
                                    <Link href="/">main converter</Link> with the text pre-filled.</li>
                            </ol>
                        </section>
                    </article>
                </div>
            </main>

            <SiteFooter containerClassName="max-w-5xl" />
            <Toaster />
        </div>
    )
}
