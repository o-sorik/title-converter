import type { Metadata } from "next"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { BreadcrumbListJsonLd } from "@/components/json-ld"
import { SITE_URL } from "@/lib/constants"

export const revalidate = 604800

const pageUrl = `${SITE_URL}/privacy-policy`

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TitleCase privacy policy. Learn how we handle your data — short version: we don't collect or store it.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Privacy Policy — TitleCase",
    description: "TitleCase privacy policy. We don't collect or store personal data.",
    type: "website",
    url: pageUrl,
    siteName: "Title Case Converter Online",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-950 dark:via-blue-950/20 dark:to-purple-950/10">
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", item: SITE_URL },
          { name: "Privacy Policy", item: pageUrl },
        ]}
      />
      <SiteHeader />
      <main id="main" className="container mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
        <section className="space-y-4">
          <h1 className="text-4xl font-black text-slate-950 dark:text-zinc-100 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-500">
            Last updated: March 25, 2026
          </p>
        </section>

        <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-950 dark:prose-headings:text-zinc-100 prose-p:text-base prose-p:leading-7 prose-p:text-slate-600 dark:prose-p:text-zinc-300 prose-li:text-slate-600 dark:prose-li:text-zinc-300 prose-h2:text-xl prose-h2:mt-8">
          <h2>The short version</h2>
          <p>
            TitleCase is a client-side tool. The text you type or paste into the converter is processed entirely in your browser and is never sent to our servers. We do not collect, store, or share your personal data.
          </p>

          <h2>What we don&apos;t collect</h2>
          <ul>
            <li>Text you enter into the converter</li>
            <li>Personal information (name, email, address)</li>
            <li>Tracking cookies or advertising identifiers</li>
            <li>Keystroke or session recordings</li>
          </ul>

          <h2>Hosting and logs</h2>
          <p>
            The site is hosted on infrastructure that may record standard server access logs (IP address, request URL, timestamp). These logs are used solely for security monitoring and are not linked to individual users. They are automatically deleted within 30 days.
          </p>

          <h2>Cookies</h2>
          <p>
            TitleCase uses a single functional cookie to remember your theme preference (light or dark mode). This cookie does not track you and contains no personal information.
          </p>

          <h2>Third-party services</h2>
          <p>
            We do not use third-party analytics, advertising networks, or social media trackers. Fonts are loaded from Google Fonts, which may log requests according to its own privacy policy.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            TitleCase does not knowingly collect information from children under 13. The tool is designed for general use by writers, editors, and students of all ages.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we make changes to this privacy policy, we will update the &quot;Last updated&quot; date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this policy, email us at{" "}
            <a href="mailto:hello@titlecaseconverter.online" className="text-blue-700 dark:text-blue-400">
              hello@titlecaseconverter.online
            </a>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
