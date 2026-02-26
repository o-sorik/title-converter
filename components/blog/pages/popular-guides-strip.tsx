import Image from "next/image"
import Link from "next/link"
import type { Article } from "@/components/blog/data"

export function PopularGuidesStrip({ items }: { items: Article[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900/80">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-zinc-500">Popular Guides</p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {items.map((article) => (
          <Link key={`popular-${article.slug}`} href={`/blog/${article.slug}`} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800">
            <Image src={article.image} alt={article.title} width={68} height={50} className="h-12 w-16 rounded object-cover" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-zinc-100">{article.title}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500">{article.readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
