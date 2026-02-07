import { HOME_PAGE_CONFIG } from "@/lib/seo-config"
import Link from "next/link"
import { TextConverter } from "@/components/text-converter"
import { ContentSection } from "@/components/content-section"
import { ModeToggle } from "@/components/mode-toggle"
import { ConverterNav } from "@/components/converter-nav"
import { Toaster } from "@/components/ui/sonner"
import { WebApplicationJsonLd, FAQPageJsonLd, HowToJsonLd } from "@/components/json-ld"

export default function Home() {
  const config = HOME_PAGE_CONFIG;
  const siteUrl = "https://titlecaseconverter.online";

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-950 dark:via-blue-950/20 dark:to-purple-950/10 gradient-animated">
      {/* JSON-LD Structured Data */}
      <WebApplicationJsonLd
        name={config.h1}
        description={config.description}
        url={siteUrl}
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

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl tracking-tighter hover:text-primary transition-colors">
              Title Case Converter Online
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ConverterNav />
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-3.5rem)] flex flex-col items-center">
        <div className="w-full max-w-5xl space-y-16">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
              {config.h1}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your text instantly with smart capitalization rules.
            </p>
          </div>

          <TextConverter defaultMode={config.mode} />

          {/* SEO Content Section */}
          <article className="prose prose-zinc dark:prose-invert max-w-none w-full">
            <p className="lead text-lg text-muted-foreground mb-8">
              {config.content.intro}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border">
                <h2 className="text-lg font-semibold mb-4">Features</h2>
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

            {/* FAQ Section */}
            {config.faqs && config.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {config.faqs.map((faq, i) => (
                    <div key={i} className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border">
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

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
  );
}
