import Image from "next/image"
import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
import type { Article } from "@/components/blog/data"
import { getCategoryById } from "@/components/blog/data"
import { formatBlogDate } from "@/lib/blog-date"

export function FeaturedArticle({ article }: { article: Article }) {
  const category = getCategoryById(article.categoryId)

  return (
    <article className="group space-y-0">
      <Link href={`/blog/${article.slug}`} className="block overflow-hidden rounded-2xl">
        <Image
          src={article.image}
          alt={article.title}
          width={1120}
          height={630}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="border-t border-b border-slate-900 dark:border-zinc-200 my-5 py-3 flex justify-between items-baseline">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-zinc-400">
          Featured Guide
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">
          {category?.name ?? "Guide"}
        </span>
      </div>

      <div className="space-y-4">
        <h2 className="font-[family-name:var(--font-playfair)] font-bold text-3xl leading-tight text-slate-950 dark:text-zinc-100 md:text-4xl">
          <Link href={`/blog/${article.slug}`} className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
            {article.title}
          </Link>
        </h2>
        <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-2xl">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-500">
          <span>
            {article.author} • Last updated {formatBlogDate(article.updatedAt)} • {article.readTime}
          </span>
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1 hover:gap-2 font-semibold text-blue-700 dark:text-blue-400 hover:underline underline-offset-4 shrink-0 ml-4 transition-all duration-150"
          >
            Read guide <IconArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  )
}
