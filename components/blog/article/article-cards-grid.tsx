import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Article } from "@/components/blog/data"

export function ArticleCardsGrid({
  title,
  items,
  label,
}: {
  title: string
  items: Article[]
  label: string
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((article) => (
          <article key={`${label}-${article.slug}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image src={article.image} alt={article.title} width={560} height={320} className="h-40 w-full object-cover" />
            <div className="space-y-2 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-700">{label}</p>
              <h3 className="text-base font-bold text-slate-950">{article.title}</h3>
              <p className="text-sm text-slate-600">{article.excerpt}</p>
              <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                Read guide <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
