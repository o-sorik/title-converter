import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BlogIndexHero() {
  return (
    <section className="space-y-6 py-8 text-center">
      <h1 className="text-5xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-6xl">
        Master Title Case with <span className="text-blue-700 dark:text-blue-400">Confidence</span>
      </h1>
      <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-zinc-300">
        Professional insights and practical walkthroughs to keep your headlines aligned with AP, APA, MLA, and Chicago standards.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="bg-blue-700 text-white hover:bg-blue-800">
          <Link href="/">Start Converting</Link>
        </Button>
        <Button asChild variant="ghost" className="text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-500/15">
          <Link href="/blog/categories">Browse Categories</Link>
        </Button>
      </div>
    </section>
  )
}
