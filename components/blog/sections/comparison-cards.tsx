import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
import type { Comparison } from "@/components/blog/data"

export function ComparisonCards({ items }: { items: Comparison[] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-navy-surface p-6 dark:border-zinc-700 dark:bg-zinc-900/80">
      <h2 className="text-3xl font-black text-slate-950 dark:text-zinc-100">Style Comparisons</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">Quick references for deciding between major style guides.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
            <h3 className="text-base font-bold text-slate-950 dark:text-zinc-100">
              <Link href={item.href} className="transition-colors hover:text-blue-700 dark:hover:text-blue-400">
                {item.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">{item.summary}</p>
            <Link href={item.href} className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-blue-700 transition-all hover:gap-2 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
              Read comparison <IconArrowRight className="h-3 w-3" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
