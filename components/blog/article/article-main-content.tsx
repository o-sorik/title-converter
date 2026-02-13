import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Article } from "@/components/blog/data"

export function ArticleMainContent({ article }: { article: Article }) {
  return (
    <article id="article-content" className="space-y-8 rounded-3xl border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900/80 sm:p-5 md:space-y-10 md:p-8">
      <Image src={article.image} alt={article.title} width={1120} height={640} className="rounded-xl border border-slate-200 dark:border-zinc-700 md:rounded-2xl" />

      <section id="key-takeaway" className="scroll-mt-24 space-y-4">
        <div className="rounded-xl border-l-4 border-blue-700 bg-blue-50 p-4 dark:bg-blue-500/10 md:p-5">
          <h2 className="text-xl font-black text-slate-950 dark:text-zinc-100 md:text-2xl">Key Takeaway</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-zinc-300">
            APA 7 title case emphasizes major words, including many terms with four letters or more. Minor words can remain lowercase unless they open or close the title.
          </p>
        </div>
      </section>

      <section id="rules-you-should-apply" className="scroll-mt-24 prose prose-slate max-w-none prose-p:text-[0.98rem] prose-p:leading-7 prose-li:leading-7 prose-li:marker:text-blue-600 prose-ul:my-4 prose-ul:space-y-1 prose-headings:font-black prose-headings:text-slate-950 prose-h2:mt-6 prose-h2:text-[1.55rem] prose-h2:leading-tight prose-h3:mt-5 prose-h3:text-[1.2rem] prose-h3:leading-snug md:prose-p:text-[1.06rem] md:prose-p:leading-8 md:prose-h2:mt-8 md:prose-h2:text-[1.85rem] md:prose-h3:mt-6 md:prose-h3:text-[1.35rem]">
        <h2>Rules You Should Apply</h2>
        <p>
          Use title case consistently in headings and display text, then run a final editorial pass for proper nouns, acronyms, and brand-specific casing exceptions.
        </p>
        <ul>
          <li>Capitalize major words in headings and section titles.</li>
          <li>Keep short conjunctions and many prepositions lowercase when they are minor words.</li>
          <li>Treat hyphenated compounds carefully and review each part based on role.</li>
          <li>Run a final editorial pass for brand names, acronyms, and proper nouns.</li>
        </ul>
      </section>

      <section id="do-and-do-not" className="scroll-mt-24 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Do</p>
          <p className="mt-2 text-sm font-medium text-emerald-900">Peer-to-Peer Learning in APA Headings</p>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Do not</p>
          <p className="mt-2 text-sm font-medium text-rose-900">peer-to-peer Learning in APA headings</p>
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-[#08184a] to-[#15388f] p-5 text-white md:p-6">
        <h2 className="text-xl font-black md:text-2xl">Need instant formatting help?</h2>
        <p className="mt-2 text-sm text-blue-100">
          Use TitleCase to draft faster, then apply your final style-specific review with confidence.
        </p>
        <Button asChild className="mt-4 bg-white text-blue-800 hover:bg-blue-50 dark:border dark:border-white/35 dark:bg-white/10 dark:text-white dark:backdrop-blur dark:hover:bg-white/20">
          <Link href="/">Start Converting</Link>
        </Button>
      </section>

      <section>
        <Separator className="mb-8" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Tags:</span>
            {["APA 7", "Capitalization", "Academic Writing"].map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 dark:bg-zinc-800 dark:text-zinc-200">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Helpful?</span>
            <button type="button" className="rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-emerald-50 dark:border-zinc-700 dark:hover:bg-emerald-500/15">
              👍
            </button>
            <button type="button" className="rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-rose-50 dark:border-zinc-700 dark:hover:bg-rose-500/15">
              👎
            </button>
          </div>
        </div>
      </section>

      <section>
        <Separator className="mb-8" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">About {article.author}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-300">
          {article.author} is part of the TitleCase editorial team, focused on practical style-guide implementation for academic and professional writing.
        </p>
      </section>
    </article>
  )
}
