import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { BreadcrumbListJsonLd } from "@/components/json-ld"
import { SITE_URL } from "@/lib/constants"

export const revalidate = 604800

const pageUrl = `${SITE_URL}/contact`

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the TitleCase team. Report issues, suggest features, or ask about capitalization rules.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Contact TitleCase",
    description: "Get in touch with the TitleCase team. Report issues, suggest features, or ask about capitalization rules.",
    type: "website",
    url: pageUrl,
    siteName: "Title Case Converter Online",
    locale: "en_US",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-950 dark:via-blue-950/20 dark:to-purple-950/10">
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", item: SITE_URL },
          { name: "Contact", item: pageUrl },
        ]}
      />
      <SiteHeader />
      <main id="main" className="container mx-auto max-w-3xl space-y-12 px-4 py-12 sm:px-6 sm:py-16">
        <section className="space-y-4">
          <h1 className="text-4xl font-black text-slate-950 dark:text-zinc-100 sm:text-5xl">
            Contact Us
          </h1>
          <p className="text-lg leading-8 text-slate-600 dark:text-zinc-300">
            Have a question, found a bug, or want to suggest a feature? We&apos;d love to hear from you.
          </p>
        </section>

        <section className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900/80 space-y-4">
            <h2 className="text-xl font-black text-slate-950 dark:text-zinc-100">Email</h2>
            <p className="text-base leading-7 text-slate-600 dark:text-zinc-300">
              The fastest way to reach us is by email. We typically respond within 1-2 business days.
            </p>
            <a
              href="mailto:hello@titlecaseconverter.online"
              className="inline-flex items-center gap-2 text-base font-semibold text-blue-700 dark:text-blue-400 hover:underline underline-offset-4"
            >
              hello@titlecaseconverter.online
            </a>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900/80 space-y-4">
            <h2 className="text-xl font-black text-slate-950 dark:text-zinc-100">Bug reports & feature requests</h2>
            <p className="text-base leading-7 text-slate-600 dark:text-zinc-300">
              If the converter produced an incorrect result or you&apos;d like to request a new feature, email us with the input text, the expected output, and the style guide you were targeting. The more detail you include, the faster we can help.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900/80 space-y-4">
            <h2 className="text-xl font-black text-slate-950 dark:text-zinc-100">Editorial corrections</h2>
            <p className="text-base leading-7 text-slate-600 dark:text-zinc-300">
              Spotted an error in one of our{" "}
              <Link href="/blog" className="text-blue-700 dark:text-blue-400 hover:underline underline-offset-4">
                guides
              </Link>
              ? Let us know which article and what needs correcting. We take accuracy seriously and will update the content promptly.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
