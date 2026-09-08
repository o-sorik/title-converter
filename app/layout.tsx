import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_URL } from "@/lib/constants"
import { GA_MEASUREMENT_ID, buildConsentDefaultScript } from "@/lib/analytics"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import { ConsentBanner } from "@/components/analytics/consent-banner"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Title Case Converter Online - Free Text Capitalization Tool",
    template: "%s | Title Case Converter Online",
  },
  description: "Free online tool to convert text to Title Case, Sentence Case, camelCase, and more. Instant conversion with smart rules.",
  authors: [{ name: "Antigravity" }],
  creator: "Antigravity",
  publisher: "Antigravity",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Title Case Converter Online",
    title: "Title Case Converter Online - Free Text Capitalization Tool",
    description: "Convert text to Title Case, Sentence Case, camelCase, and more. Free, instant, and ad-free.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Title Case Converter Online",
    description: "Convert text to Title Case, Sentence Case, camelCase, and more. Free, instant, and ad-free.",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      {GA_MEASUREMENT_ID ? (
        <head>
          {/* Consent Mode v2 defaults: must run before gtag.js loads. */}
          <script dangerouslySetInnerHTML={{ __html: buildConsentDefaultScript() }} />
        </head>
      ) : null}
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen bg-background text-foreground"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {GA_MEASUREMENT_ID ? (
            <>
              <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
              <ConsentBanner />
            </>
          ) : null}
        </ThemeProvider>
      </body>
    </html>
  );
}
