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

  const date = formatBlogDate(article.updatedAt)

  return (
    <section className="space-y-0">
      <BlogBreadcrumbs items={breadcrumbItems} />

      <div className="mt-4 space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">
          {category?.name ?? "Guide"}
        </p>

        <hr className="border-t border-slate-200 dark:border-zinc-700" />

        <h1 className="font-[family-name:var(--font-playfair)] font-bold max-w-4xl text-3xl leading-tight text-slate-950 dark:text-zinc-100 sm:text-4xl md:text-5xl">
          {article.title}
        </h1>

        <hr className="border-t border-slate-200 dark:border-zinc-700" />

        <p className="max-w-3xl text-[15px] leading-7 text-slate-600 dark:text-zinc-300 md:text-base">
          {article.excerpt}
        </p>

        <hr className="border-t border-slate-200 dark:border-zinc-700" />

        <div className="flex flex-wrap items-center gap-x-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-zinc-500">
          <span>By {article.author}</span>
          <span className="mx-2">|</span>
          <span>{date}</span>
          <span className="mx-2">|</span>
          <span>{article.readTime} Read</span>
          {article.verifiedFor && (
            <span className="ml-3 text-emerald-600 dark:text-emerald-400">
              ● Reviewed for {article.verifiedFor}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
