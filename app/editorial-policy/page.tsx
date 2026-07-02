import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { BreadcrumbListJsonLd } from "@/components/json-ld"
import { SITE_URL } from "@/lib/constants"

export const revalidate = 604800

const pageUrl = `${SITE_URL}/editorial-policy`

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How TitleCase creates and reviews its capitalization guides. Our standards for accuracy, sourcing, and updates.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Editorial Policy — TitleCase",
    description: "How TitleCase creates and reviews its capitalization guides.",
    type: "website",
    url: pageUrl,
    siteName: "Title Case Converter Online",
    locale: "en_US",
  },
}

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", item: SITE_URL },
          { name: "Editorial Policy", item: pageUrl },
        ]}
      />
      <SiteHeader />
      <main id="main" className="container mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
        <section className="space-y-4">
          <h1 className="text-4xl font-black text-slate-950 dark:text-zinc-100 sm:text-5xl">
            Editorial Policy
          </h1>
          <p className="text-lg leading-8 text-slate-600 dark:text-zinc-300">
            Every guide on TitleCase is held to the same standard: accurate, sourced, and kept up to date. Here is how we work.
          </p>
        </section>

        <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-950 dark:prose-headings:text-zinc-100 prose-p:text-base prose-p:leading-7 prose-p:text-slate-600 dark:prose-p:text-zinc-300 prose-li:text-slate-600 dark:prose-li:text-zinc-300 prose-h2:text-xl prose-h2:mt-8">
          <h2>Sources we reference</h2>
          <p>
            Our capitalization rules are based on the official style manuals they describe:
          </p>
          <ul>
            <li><em>The Associated Press Stylebook</em> (AP)</li>
            <li><em>Publication Manual of the American Psychological Association</em>, 7th Edition (APA 7)</li>
            <li><em>MLA Handbook</em>, 9th Edition (MLA)</li>
            <li><em>The Chicago Manual of Style</em>, 18th Edition (Chicago)</li>
          </ul>
          <p>
            When style guides are ambiguous or silent on an edge case, we note it explicitly rather than guessing.
          </p>

          <h2>How guides are written</h2>
          <p>
            Each guide follows a consistent structure: a direct answer, the underlying rule, examples that show it in context, and cross-style comparisons where relevant. We avoid filler and write for people who need a quick, reliable answer.
          </p>

          <h2>Review and accuracy</h2>
          <p>
            Guides that cover specific style guide rules carry a &quot;Reviewed for&quot; badge (e.g., &quot;Reviewed for APA 7th Edition&quot;) indicating that the content has been verified against the cited manual. When a style guide publishes an update, we review and revise affected articles.
          </p>

          <h2>Updates and corrections</h2>
          <p>
            Every article displays a &quot;Last updated&quot; date. When we correct a factual error, we update the article and its timestamp. We do not maintain a separate changelog for individual articles, but substantive corrections are noted inline.
          </p>

          <h2>Converter accuracy</h2>
          <p>
            The{" "}
            <Link href="/" className="text-blue-700 dark:text-blue-400">
              text converter
            </Link>{" "}
            applies rule-based logic to produce title case output consistent with each supported style guide. No automated tool is perfect — edge cases involving proper nouns, brand names, and hyphenated compounds may require manual review. We test the converter against a growing suite of automated checks and real-world examples.
          </p>

          <h2>Independence</h2>
          <p>
            TitleCase is not affiliated with, endorsed by, or sponsored by the AP, APA, MLA, or the University of Chicago Press. All style guide names and trademarks belong to their respective owners.
          </p>

          <h2>Report an issue</h2>
          <p>
            If you spot an inaccuracy in any guide or converter result, please let us know on our{" "}
            <Link href="/contact" className="text-blue-700 dark:text-blue-400">
              contact page
            </Link>
            . We take corrections seriously and respond within 1-2 business days.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
