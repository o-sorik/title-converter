import type { Metadata } from "next"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { BreadcrumbListJsonLd } from "@/components/json-ld"
import { ConsentPreferences } from "@/components/analytics/consent-preferences"
import { SITE_URL } from "@/lib/constants"

export const revalidate = 604800

const pageUrl = `${SITE_URL}/privacy-policy`

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TitleCase privacy policy. Your text never leaves your browser; we only count visits with privacy-conscious analytics.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Privacy Policy — TitleCase",
    description: "TitleCase privacy policy. Your text never leaves your browser; we only count visits.",
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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
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
            Last updated: September 8, 2026
          </p>
        </section>

        <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-950 dark:prose-headings:text-zinc-100 prose-p:text-base prose-p:leading-7 prose-p:text-slate-600 dark:prose-p:text-zinc-300 prose-li:text-slate-600 dark:prose-li:text-zinc-300 prose-h2:text-xl prose-h2:mt-8">
          <h2>The short version</h2>
          <p>
            TitleCase is a client-side tool. The text you type or paste into the converter is processed entirely in your browser and is never sent to our servers. We use Google Analytics to count visits and see which tools get used, and nothing more: no ads, no data sales, no profiles.
          </p>

          <h2>What we don&apos;t collect</h2>
          <ul>
            <li>Text you enter into the converter or the batch checker</li>
            <li>Personal information (name, email, address)</li>
            <li>Advertising identifiers or cross-site tracking</li>
            <li>Keystroke or session recordings</li>
          </ul>

          <h2>Analytics</h2>
          <p>
            We use Google Analytics 4, provided by Google Ireland Limited, to understand how the site is used. It records page views, which conversion mode and title style were selected, whether the copy button or batch checker was used, and general context such as browser type, device category, and approximate location (country or city, derived from your IP address, which Google Analytics does not store).
          </p>
          <p>
            Advertising features, Google Signals, and demographic reporting are switched off. Analytics data is not shared with advertisers, is not used to show you ads anywhere, and is kept for 14 months.
          </p>
          <p>
            If you visit from the EU, the UK, or Switzerland, analytics stays off until you allow it in the one-time prompt at the bottom of the page. The tool works exactly the same either way. You can change your choice here at any time:
          </p>
          <ConsentPreferences />

          <h2>Hosting and logs</h2>
          <p>
            The site is hosted on infrastructure that may record standard server access logs (IP address, request URL, timestamp). These logs are used solely for security monitoring and are not linked to individual users. They are automatically deleted within 30 days.
          </p>

          <h2>Cookies</h2>
          <p>
            TitleCase uses a functional cookie to remember your theme preference (light or dark mode). When analytics is on, Google Analytics sets first-party cookies named <code>_ga</code> and <code>_ga_*</code> that hold a random identifier, so returning visitors are counted once rather than as new people. They expire after 13 months. We set no third-party cookies.
          </p>

          <h2>Third-party services</h2>
          <p>
            Google Analytics, as described above. Fonts are loaded from Google Fonts, which may log requests according to its own privacy policy. We do not use advertising networks or social media trackers.
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
