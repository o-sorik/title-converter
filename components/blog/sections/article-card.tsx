import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
import type { Article } from "@/components/blog/data"
import { getCategoryById } from "@/components/blog/data"
import { formatBlogDate } from "@/lib/blog-date"

export function ArticleCard({ article }: { article: Article }) {
  const category = getCategoryById(article.categoryId)

  return (
    <article className="group flex h-full flex-col border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-white/90 dark:hover:bg-zinc-900/70">
      <div className="border-l-4 border-blue-700 group-hover:border-blue-500 pl-4 flex flex-col grow transition-colors duration-200">
        <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase tracking-[0.15em]">
          <span className="text-blue-700 dark:text-blue-400">{category?.name ?? "Guide"}</span>
          <span className="text-slate-400 dark:text-zinc-500">{article.readTime}</span>
        </div>

        <Link href={`/blog/${article.slug}`} className="block">
          <h3 className="font-[family-name:var(--font-playfair)] font-bold text-lg leading-snug text-slate-950 dark:text-zinc-100 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
        </Link>

        <p className="grow text-sm text-slate-600 dark:text-zinc-400 line-clamp-2 mt-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between mt-4 text-xs text-slate-400 dark:text-zinc-500">
          <span>{article.author} • {formatBlogDate(article.updatedAt)}</span>
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-400 hover:underline underline-offset-4 shrink-0 ml-2"
          >
            Read <IconArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  )
}
