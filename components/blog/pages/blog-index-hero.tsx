import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
import { ParallaxHeroBg } from "@/components/parallax-hero-bg"

export function BlogIndexHero() {
  return (
    <section className="relative overflow-hidden space-y-6 py-6">
      <ParallaxHeroBg />
      <div className="border-t-2 border-slate-900 dark:border-zinc-100 pt-5">
        <div className="flex items-baseline justify-between text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 animate-fadeIn" style={{ animationDelay: "80ms" }}>
          <span>Grammar &amp; Style Guides</span>
          <span className="hidden sm:inline">titlecaseconverter.online</span>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="font-[family-name:var(--font-playfair)] font-bold italic text-5xl leading-tight text-slate-950 dark:text-zinc-100 md:text-7xl animate-fadeIn">
          Master Title Case<br />with Confidence
        </h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-base text-slate-600 dark:text-zinc-400">
            Professional insights and practical walkthroughs to keep your headlines aligned with AP, APA, MLA, and Chicago standards.
          </p>
          <div className="flex shrink-0 items-center gap-4 text-sm font-semibold">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-400 hover:underline underline-offset-4"
            >
              Start Converting <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/blog/categories"
              className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:underline underline-offset-4"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-t border-zinc-200 dark:border-zinc-700" />
    </section>
  )
}
