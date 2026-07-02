import Image from "next/image"
import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
import type { Article } from "@/components/blog/data"

export function ArticleCardsGrid({
  title,
  items,
}: {
  title: string
  items: Article[]
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-950 dark:text-zinc-100">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((article) => (
          <article key={article.slug} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/60">
            <Link href={`/blog/${article.slug}`} className="block overflow-hidden">
              <Image src={article.image} alt={article.title} width={560} height={320} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px" className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </Link>
            <div className="space-y-2 p-4">
              <h3 className="text-base font-bold text-slate-950 dark:text-zinc-100">
                <Link href={`/blog/${article.slug}`} className="transition-colors hover:text-blue-700 dark:hover:text-blue-400">
                  {article.title}
                </Link>
              </h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400">{article.excerpt}</p>
              <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-blue-700 transition-all hover:gap-2 dark:text-blue-400 dark:hover:text-blue-300">
                Read guide <IconArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
