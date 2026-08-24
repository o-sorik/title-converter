import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Article } from "@/components/blog/data"
import type { HighIntentGuidanceEntry } from "@/lib/high-intent-guidance"
import { GRAMMAR_101_SECTION_IDS } from "@/lib/article-content"
import { ConverterCtaLink } from "./converter-cta-link"

type Grammar101TemplateProps = {
  article: Article
  entry: HighIntentGuidanceEntry
  converterInput: string
  relatedSlugs: HighIntentGuidanceEntry[]
}

export function Grammar101Template({ article, entry, converterInput, relatedSlugs }: Grammar101TemplateProps) {
  const styleGuideLinks: Array<{ key: keyof HighIntentGuidanceEntry["middlePositionVerdictByStyle"]; label: string; href: string }> = [
    { key: "standard", label: "Standard", href: "/capitalization-rules-guide?mode=title&style=standard" },
    { key: "ap", label: "AP", href: "/capitalization-rules-guide?mode=title&style=ap" },
    { key: "apa", label: "APA", href: "/capitalization-rules-guide?mode=title&style=apa" },
    { key: "mla", label: "MLA", href: "/capitalization-rules-guide?mode=title&style=mla" },
    { key: "chicago", label: "Chicago", href: "/capitalization-rules-guide?mode=title&style=chicago" },
  ]

  return (
    <>
      <section id={GRAMMAR_101_SECTION_IDS.shortAnswer} data-testid="grammar-101-short-answer" className="scroll-mt-24 space-y-4">
        <div className="rounded-xl border-l-4 border-blue-700 bg-blue-50 p-4 dark:bg-blue-500/10 md:p-5">
          <h2 className="text-xl font-black text-slate-950 dark:text-zinc-100 md:text-2xl">Short Answer</h2>
          <p className="mt-2 text-base leading-7 text-slate-700 dark:text-zinc-300">{entry.quickAnswer}</p>
        </div>
      </section>

      <section
        id={GRAMMAR_101_SECTION_IDS.posLogic}
        data-testid="grammar-101-pos-logic"
        className="scroll-mt-24 space-y-4 rounded-xl border bg-white p-4 dark:bg-zinc-900/40 md:p-5"
      >
        <h2 className="text-2xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-3xl">
          Rule (Part-of-Speech Logic)
        </h2>
        <p className="text-lg leading-8 text-slate-900 dark:text-zinc-100">
          <strong>Part of speech:</strong> {entry.partOfSpeech}
        </p>
        <p className="text-base leading-7 text-slate-800 dark:text-zinc-200">{entry.posLogic}</p>
        <p className="text-base leading-7 text-slate-800 dark:text-zinc-200">{entry.ruleSummary}</p>

        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">Style notes quick scan</h3>
          <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-slate-700 dark:text-zinc-300">
            <li>{entry.styleNotes.standard}</li>
            <li>{entry.styleNotes.ap}</li>
            <li>{entry.styleNotes.apa}</li>
            <li>{entry.styleNotes.mla}</li>
            <li>{entry.styleNotes.chicago}</li>
          </ul>
        </div>
      </section>

      <section data-testid="grammar-101-style-verdicts" className="rounded-xl border bg-slate-50/70 p-4 dark:bg-zinc-900/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">According to Style Guides (Middle Position)</h3>
        <ul className="mt-3 space-y-2 text-base text-slate-700 dark:text-zinc-300">
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

      <section id={GRAMMAR_101_SECTION_IDS.doAndDoNot} data-testid="grammar-101-examples" className="scroll-mt-24 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:bg-emerald-500/10">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">✓ Do</p>
          <p className="mt-3 font-[family-name:var(--font-playfair)] text-lg font-semibold leading-snug text-emerald-900 dark:text-emerald-200">{entry.examples[0]?.output}</p>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 dark:bg-rose-500/10">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400">✗ Do not</p>
          <p className="mt-3 font-[family-name:var(--font-playfair)] text-lg font-semibold leading-snug line-through decoration-rose-400 text-rose-900 dark:text-rose-200">{entry.examples[0]?.input}</p>
        </div>
      </section>

      <section data-testid="grammar-101-special-cases" className="rounded-xl border bg-white p-4 dark:bg-zinc-900/40">
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Special Cases</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-slate-700 dark:text-zinc-300">
          {entry.specialCases.map((specialCase) => (
            <li key={specialCase}>{specialCase}</li>
          ))}
        </ul>
      </section>

      <section data-testid="grammar-101-why-confusing" className="rounded-xl border bg-amber-50/80 p-4 dark:bg-amber-500/10">
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Why People Get This Wrong</h3>
        <p className="mt-2 text-base leading-7 text-slate-700 dark:text-zinc-300">{entry.whyPeopleGetThisWrong}</p>
      </section>

      <section data-testid="grammar-101-attested-usage" className="rounded-xl border bg-white p-4 dark:bg-zinc-900/40">
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Attested Usage (Practice Evidence)</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 italic">
          These are observed editorial usage patterns, not absolute grammatical authority.
        </p>
        <ul className="mt-4 space-y-3">
          {entry.attestedUsage.map((usage) => (
            <li key={`${usage.publisher}-${usage.url}`} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-zinc-700">
              <p className="font-semibold text-slate-900 dark:text-zinc-100">{usage.publisher}</p>
              <p className="mt-1 text-base leading-7 text-slate-700 dark:text-zinc-300">{usage.fragment}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400">
                Style context: <span className="font-medium">{usage.style_context.toUpperCase()}</span> · Checked:{" "}
                <span className="font-medium">{usage.date_checked}</span>
              </p>
              <Link href={usage.url} className="mt-1 inline-block text-xs font-semibold underline underline-offset-4">
                Source
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {entry.originOrMeaning ? (
        <section data-testid="grammar-101-origin-meaning" className="rounded-xl border bg-slate-50/80 p-4 dark:bg-zinc-900/50">
          <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Origin / Meaning (Optional)</h3>
          <p className="mt-2 text-sm text-slate-700 dark:text-zinc-300">{entry.originOrMeaning}</p>
        </section>
      ) : null}

      <section className="rounded-2xl bg-gradient-to-br from-navy-dark to-navy-mid p-5 text-white md:p-6">
        <p className="text-xl font-black md:text-2xl">Need instant formatting help?</p>
        <p className="mt-2 text-sm text-blue-100">
          Open the converter with a prefilled example and adapt it to your headline.
        </p>
        <Button asChild className="mt-4 bg-white text-blue-800 hover:bg-blue-50 dark:border dark:border-white/35 dark:bg-white/10 dark:text-white dark:backdrop-blur dark:hover:bg-white/20">
          <ConverterCtaLink converterInput={converterInput}>Start Converting</ConverterCtaLink>
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
