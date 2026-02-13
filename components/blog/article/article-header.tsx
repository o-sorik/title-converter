import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Category, Article } from "@/components/blog/data"
import { formatBlogDate } from "@/lib/blog-date"

export function ArticleHeader({ article, category }: { article: Article; category?: Category }) {
  return (
    <section className="space-y-3 md:space-y-4">
      <div className="text-xs text-slate-500">
        <Link href="/blog" className="hover:text-blue-700">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:text-blue-700">
          Blog
        </Link>{" "}
        /{" "}
        {category ? (
          <>
            <Link href={`/blog/categories/${category.id}`} className="hover:text-blue-700">
              {category.name}
            </Link>{" "}
            /
          </>
        ) : null}{" "}
        <span className="font-semibold text-blue-700">Article</span>
      </div>
      <Badge variant="outline" className="w-fit border-blue-200 bg-blue-50 px-3 py-1 uppercase tracking-wide text-blue-700">
        {category?.name ?? "Guide"}
      </Badge>
      <h1 className="max-w-4xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:text-5xl">{article.title}</h1>
      <p className="max-w-3xl text-[15px] leading-7 text-slate-600 md:text-base">{article.excerpt}</p>
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span>{article.author} • Last updated {formatBlogDate(article.updatedAt)} • {article.readTime}</span>
        <span className="inline-flex items-center rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          Reviewed for APA 7th Edition
        </span>
      </div>
    </section>
  )
}
