import { Badge } from "@/components/ui/badge"
import type { Category, Article } from "@/components/blog/data"
import { formatBlogDate } from "@/lib/blog-date"
import { BlogBreadcrumbs } from "@/components/blog/breadcrumbs"

export function ArticleHeader({ article, category }: { article: Article; category?: Category }) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(category ? [{ label: category.name, href: `/blog/categories/${category.id}` }] : []),
    { label: article.title },
  ]

  return (
    <section className="space-y-3 md:space-y-4">
      <BlogBreadcrumbs items={breadcrumbItems} />
      <Badge variant="outline" className="w-fit border-blue-200 bg-blue-50 px-3 py-1 uppercase tracking-wide text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-300">
        {category?.name ?? "Guide"}
      </Badge>
      <h1 className="max-w-4xl text-3xl font-black leading-tight text-slate-950 dark:text-zinc-100 sm:text-4xl md:text-5xl">{article.title}</h1>
      <p className="max-w-3xl text-[15px] leading-7 text-slate-600 dark:text-zinc-300 md:text-base">{article.excerpt}</p>
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
        <span>{article.author} • Last updated {formatBlogDate(article.updatedAt)} • {article.readTime}</span>
        <span className="inline-flex items-center rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/35 dark:bg-emerald-500/10 dark:text-emerald-300">
          Reviewed for APA 7th Edition
        </span>
      </div>
    </section>
  )
}
