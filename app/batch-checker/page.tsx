import type { Metadata } from "next"
import Link from "next/link"
import { BatchChecker } from "@/components/batch-checker"
import { BreadcrumbListJsonLd, WebApplicationJsonLd } from "@/components/json-ld"
import { Toaster } from "@/components/ui/sonner"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { SITE_URL } from "@/lib/constants"

export const revalidate = 604800

const pageUrl = `${SITE_URL}/batch-checker`

const title = "Batch Headline Checker — Editorial QA Tool"
const description =
    "Check multiple headlines against AP, APA, MLA, or Chicago rules. Paste one per line and spot capitalization errors instantly."

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
        <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <WebApplicationJsonLd
                name="Batch Headline Checker"
                description={description}
                url={pageUrl}
            />
            <BreadcrumbListJsonLd
                items={[
                    { name: "Home", item: SITE_URL },
                    { name: "Batch Headline Checker", item: pageUrl },
                ]}
            />

            <SiteHeader containerClassName="max-w-5xl" />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.511_0.194_267/0.08),transparent)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.707_0.165_267/0.1),transparent)]"
            />

            <main id="main" className="relative container mx-auto pt-6 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-5xl mx-auto space-y-8">
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Batch Headline Checker
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                            Check a list of headlines against one capitalization style. Paste one per line, see which need a fix and why, then copy the corrected list.
                        </p>
                    </div>

                    <BatchChecker />

                    {/* SEO content */}
                    <article className="mx-auto w-full max-w-2xl space-y-12 pt-12 text-lg leading-relaxed text-pretty text-zinc-600 dark:text-zinc-400 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-zinc-900 md:[&_h2]:text-3xl dark:[&_h2]:text-zinc-50 [&_strong]:font-semibold [&_strong]:text-zinc-900 dark:[&_strong]:text-zinc-100">
                        <section>
                            <h2>What Is the Batch Headline Checker?</h2>
                            <p>
                                The Batch Headline Checker is an editorial quality-assurance tool for writers, editors, and content teams who need to verify multiple headlines against a single capitalization standard in one pass. Instead of checking each title individually in the{" "}
                                <Link href="/">title case converter</Link>, you paste all your headlines at once, choose your standard (AP, APA, MLA, Chicago, or plain lower/upper), and get an instant report showing which headlines are already consistent and which need correction.
                            </p>
                        </section>

                        <section>
                            <h2>Who Is This Tool For?</h2>
                            <ul className="list-disc space-y-3 pl-5 marker:text-zinc-400">
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
                            <ol className="list-decimal space-y-3 pl-5 marker:text-zinc-400">
                                <li>Pick the <strong>style guide</strong> you follow: Standard, AP, APA, Chicago, or MLA. To check a different case, switch Title Case to Sentence case, lower case, or UPPER CASE.</li>
                                <li>Paste your headlines into the text area, <strong>one per line</strong>. Results update as you type.</li>
                                <li>You see the headlines that <strong>need a fix</strong>, with every changed word marked and your original line underneath. Switch to All to see the ones that are already correct.</li>
                                <li>Click <strong>Why?</strong> under a headline to see the rule behind each change, or open that headline in the{" "}
                                    <Link href="/">main converter</Link>.</li>
                                <li>Click <strong>Copy all</strong> to take the corrected list back in its original order, or copy a single headline.</li>
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
