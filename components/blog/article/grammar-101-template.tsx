import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Article } from "@/components/blog/data"
import type { HighIntentGuidanceEntry } from "@/lib/high-intent-guidance"

type Grammar101TemplateProps = {
  article: Article
  entry: HighIntentGuidanceEntry
  converterHref: string
  relatedSlugs: HighIntentGuidanceEntry[]
}

export function Grammar101Template({ article, entry, converterHref, relatedSlugs }: Grammar101TemplateProps) {
  const styleGuideLinks: Array<{ key: keyof HighIntentGuidanceEntry["middlePositionVerdictByStyle"]; label: string; href: string }> = [
    { key: "standard", label: "Standard", href: "/capitalization-rules-guide?mode=title&style=standard" },
    { key: "ap", label: "AP", href: "/capitalization-rules-guide?mode=title&style=ap" },
    { key: "apa", label: "APA", href: "/capitalization-rules-guide?mode=title&style=apa" },
    { key: "mla", label: "MLA", href: "/capitalization-rules-guide?mode=title&style=mla" },
    { key: "chicago", label: "Chicago", href: "/capitalization-rules-guide?mode=title&style=chicago" },
  ]

  return (
    <>
      <section id="key-takeaway" data-testid="grammar-101-key-takeaway" className="scroll-mt-24 space-y-4">
        <div className="rounded-xl border-l-4 border-blue-700 bg-blue-50 p-4 dark:bg-blue-500/10 md:p-5">
          <h2 className="text-xl font-black text-slate-950 dark:text-zinc-100 md:text-2xl">Key Takeaway</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-zinc-300">{entry.quickAnswer}</p>
        </div>
      </section>

      <section id="rules-you-should-apply" data-testid="grammar-101-rules" className="scroll-mt-24 prose prose-slate max-w-none prose-p:text-[0.98rem] prose-p:leading-7 prose-li:leading-7 prose-li:marker:text-blue-600 prose-ul:my-4 prose-ul:space-y-1 prose-headings:font-black prose-headings:text-slate-950 prose-h2:mt-6 prose-h2:text-[1.55rem] prose-h2:leading-tight prose-h3:mt-5 prose-h3:text-[1.2rem] prose-h3:leading-snug md:prose-p:text-[1.06rem] md:prose-p:leading-8 md:prose-h2:mt-8 md:prose-h2:text-[1.85rem] md:prose-h3:mt-6 md:prose-h3:text-[1.35rem]">
        <h2>Rules You Should Apply</h2>
        <p>{entry.ruleSummary}</p>
        <ul>
          <li>{entry.styleNotes.standard}</li>
          <li>{entry.styleNotes.ap}</li>
          <li>{entry.styleNotes.apa}</li>
          <li>{entry.styleNotes.mla}</li>
          <li>{entry.styleNotes.chicago}</li>
        </ul>
      </section>

      <section data-testid="grammar-101-style-verdicts" className="rounded-xl border bg-slate-50/70 p-4 dark:bg-zinc-900/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">According to Style Guides (Middle Position)</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-zinc-300">
          {styleGuideLinks.map((style) => (
            <li key={style.key}>
              According to{" "}
              <Link href={style.href} className="font-semibold underline underline-offset-4">
                {style.label} style
              </Link>
              : <span className="font-semibold">{entry.middlePositionVerdictByStyle[style.key]}</span>.
            </li>
          ))}
        </ul>
      </section>

      <section id="do-and-do-not" data-testid="grammar-101-examples" className="scroll-mt-24 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Do</p>
          <p className="mt-2 text-sm font-medium text-emerald-900">{entry.examples[0]?.output}</p>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Do not</p>
          <p className="mt-2 text-sm font-medium text-rose-900">{entry.examples[0]?.input}</p>
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-[#08184a] to-[#15388f] p-5 text-white md:p-6">
        <h2 className="text-xl font-black md:text-2xl">Need instant formatting help?</h2>
        <p className="mt-2 text-sm text-blue-100">
          Open the converter with a prefilled example and adapt it to your headline.
        </p>
        <Button asChild className="mt-4 bg-white text-blue-800 hover:bg-blue-50 dark:border dark:border-white/35 dark:bg-white/10 dark:text-white dark:backdrop-blur dark:hover:bg-white/20">
          <Link href={converterHref}>Start Converting</Link>
        </Button>
      </section>

      {relatedSlugs.length > 0 && (
        <section data-testid="grammar-101-related">
          <Separator className="mb-8" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Related Grammar 101 Questions</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-zinc-300">
            {relatedSlugs.map((relatedEntry) => (
              <li key={relatedEntry.slug}>
                <Link href={`/blog/${relatedEntry.slug}`} className="underline underline-offset-4">
                  {relatedEntry.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <Separator className="mb-8" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Tags:</span>
            {["Grammar 101", "Title Case", entry.term.toUpperCase()].map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 dark:bg-zinc-800 dark:text-zinc-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Separator className="mb-8" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">About {article.author}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-300">
          {article.author} develops practical capitalization guidance for editorial and SEO workflows, with a focus on consistent rule application.
        </p>
      </section>
    </>
  )
}
