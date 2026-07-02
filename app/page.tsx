import type { Metadata } from "next"
import { HOME_PAGE_CONFIG } from "@/lib/seo-config"
import { SITE_URL } from "@/lib/constants"
import { TextConverter } from "@/components/text-converter"
import { AudienceSection } from "@/components/audience-section"
import { ContentSection } from "@/components/content-section"
import { WebApplicationJsonLd, FAQPageJsonLd, HowToJsonLd } from "@/components/json-ld"
import { Toaster } from "@/components/ui/sonner"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { parseConverterInitialStateFromSearchParams } from "@/lib/converter-context"
import { ScrollReveal } from "@/components/scroll-reveal"
import { IconCheck } from "@tabler/icons-react"

export const revalidate = 86400

export const metadata: Metadata = {
  title: {
    absolute: HOME_PAGE_CONFIG.title,
  },
  description: HOME_PAGE_CONFIG.description,
  alternates: {
    canonical: SITE_URL,
  },
}

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function Home({ searchParams }: HomePageProps) {
  const config = HOME_PAGE_CONFIG;
  const converterContext = parseConverterInitialStateFromSearchParams((await searchParams) ?? {})
  const defaultMode = converterContext.initialMode ?? config.mode

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* JSON-LD Structured Data */}
      <WebApplicationJsonLd
        name={config.h1}
        description={config.description}
        url={SITE_URL}
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.511_0.194_267/0.08),transparent)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.707_0.165_267/0.1),transparent)]"
      />

      <main className="relative container mx-auto pt-6 pb-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-3.5rem)] flex flex-col items-center">
        <div className="w-full max-w-5xl space-y-12">
          <div className="text-center space-y-3 mb-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {config.h1}
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Capitalize titles with practical AP, APA, MLA, and Chicago-friendly rules in one click. Free, no signup.
            </p>
          </div>

          <TextConverter
            defaultMode={defaultMode}
            initialInput={converterContext.initialInput}
            initialTitleStyle={converterContext.initialTitleStyle}
            initialContextRef={converterContext.initialContextRef}
          />

          <ScrollReveal><AudienceSection /></ScrollReveal>

          {/* SEO Content Section */}
          <ScrollReveal delay={100}>
          <article className="prose prose-zinc dark:prose-invert max-w-none w-full">
            <p className="lead text-lg text-muted-foreground mb-8">
              {config.content.intro}
            </p>
            <nav aria-label="On this page" className="mb-8 p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900">
              <p className="text-sm font-medium text-foreground mb-2">On this page:</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <a href="#what-is-title-case" className="text-primary hover:underline underline-offset-4">What Is Title Case?</a>
                <a href="#which-title-case-style" className="text-primary hover:underline underline-offset-4">Title Capitalization Styles</a>
                <a href="#common-title-case-mistakes" className="text-primary hover:underline underline-offset-4">Common Mistakes</a>
                <a href="#title-case-cheat-sheet" className="text-primary hover:underline underline-offset-4">Rules Cheat Sheet</a>
                <a href="#faq" className="text-primary hover:underline underline-offset-4">FAQ</a>
              </div>
            </nav>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border">
                <h2 className="text-lg font-semibold mb-4">Features</h2>
                <ul className="space-y-2">
                  {config.content.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <IconCheck className="h-4 w-4 mt-1 shrink-0 text-primary" aria-hidden="true" />
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
          </ScrollReveal>

          <ScrollReveal delay={50}><ContentSection faqs={config.faqs} /></ScrollReveal>
        </div>
      </main>

      <SiteFooter containerClassName="max-w-5xl" />
      <Toaster />
    </div>
  );
}
