import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Article } from "@/components/blog/data"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/blog/${article.slug}`} className="block">
        <Image src={article.image} alt={article.title} width={560} height={320} className="h-44 w-full object-cover" />
      </Link>
      <div className="flex grow flex-col space-y-3 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          Last updated {article.updatedAt} • {article.readTime} • {article.author}
        </p>
        <Link href={`/blog/${article.slug}`} className="block">
          <h3 className="text-lg font-bold leading-tight text-slate-950 transition-colors hover:text-blue-700">{article.title}</h3>
        </Link>
        <p className="grow text-sm text-slate-600">{article.excerpt}</p>
        <Link href={`/blog/${article.slug}`} className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-blue-700">
          Read article <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  )
}
