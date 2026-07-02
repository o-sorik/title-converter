import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { BreadcrumbListJsonLd } from "@/components/json-ld"
import { SITE_URL } from "@/lib/constants"
import { getAllAuthors } from "@/lib/authors"

export const revalidate = 604800

const pageUrl = `${SITE_URL}/about`

export const metadata: Metadata = {
  title: "About",
  description: "TitleCase is a free capitalization tool and editorial resource built for writers, editors, and content teams working with AP, APA, MLA, and Chicago styles.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "About TitleCase",
    description: "Free capitalization tool and editorial resource for writers, editors, and content teams.",
    type: "website",
    url: pageUrl,
    siteName: "Title Case Converter Online",
    locale: "en_US",
  },
}

export default function AboutPage() {
  const authors = getAllAuthors()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", item: SITE_URL },
          { name: "About", item: pageUrl },
        ]}
      />
      <SiteHeader />
      <main id="main" className="container mx-auto max-w-3xl space-y-12 px-4 py-12 sm:px-6 sm:py-16">
        <section className="space-y-4">
          <h1 className="text-4xl font-black text-slate-950 dark:text-zinc-100 sm:text-5xl">
            About TitleCase
          </h1>
          <p className="text-lg leading-8 text-slate-600 dark:text-zinc-300">
            TitleCase is a free online tool that converts text into Title Case, Sentence Case, camelCase, PascalCase, snake_case, kebab-case, and other formats. It supports AP, APA, MLA, and Chicago style guides out of the box.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-zinc-100">Why we built this</h2>
          <p className="text-base leading-7 text-slate-600 dark:text-zinc-300">
            Capitalization rules are surprisingly inconsistent across style guides. Writers, editors, and students constantly second-guess whether a word should be uppercase or lowercase in a title. We built TitleCase to remove that friction — paste your text, pick a style, and get a clean result in seconds.
          </p>
          <p className="text-base leading-7 text-slate-600 dark:text-zinc-300">
            Beyond the converter, we publish practical guides that explain <em>why</em> rules work the way they do. Every guide is grounded in official style manuals and reviewed for accuracy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-zinc-100">What you get</h2>
          <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-slate-600 dark:text-zinc-300">
            <li>Instant text conversion across 10+ case formats</li>
            <li>Style-aware title case with AP, APA, MLA, and Chicago rules</li>
            <li>A <Link href="/batch-checker" className="text-blue-700 dark:text-blue-400 hover:underline underline-offset-4">batch headline checker</Link> for editorial QA</li>
            <li>In-depth <Link href="/blog" className="text-blue-700 dark:text-blue-400 hover:underline underline-offset-4">capitalization guides</Link> with per-word rule breakdowns</li>
            <li>No signup, no ads, no tracking</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-zinc-100">Our editorial team</h2>
          <p className="text-base leading-7 text-slate-600 dark:text-zinc-300">
            Every guide on TitleCase is written and reviewed by contributors with hands-on experience in editorial workflows, academic writing, and content strategy.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {authors.map((author) => (
              <div
                key={author.id}
                className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/80"
              >
                <p className="font-bold text-slate-950 dark:text-zinc-100">{author.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
                  {author.role}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                  {author.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-zinc-100">Built by Antigravity</h2>
          <p className="text-base leading-7 text-slate-600 dark:text-zinc-300">
            TitleCase is an <strong>Antigravity</strong> project — a small studio focused on practical developer and editorial tools. We believe good tools should be fast, free, and respectful of your time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950 dark:text-zinc-100">Get in touch</h2>
          <p className="text-base leading-7 text-slate-600 dark:text-zinc-300">
            Have feedback, a question, or a style guide edge case we missed? Reach out on our{" "}
            <Link href="/contact" className="text-blue-700 dark:text-blue-400 hover:underline underline-offset-4">
              contact page
            </Link>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
