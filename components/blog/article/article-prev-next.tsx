import Link from "next/link"
import type { Article } from "@/components/blog/data"

export function ArticlePrevNext({
  prevArticle,
  nextArticle,
}: {
  prevArticle: Article | null
  nextArticle: Article | null
}) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Previous article</p>
        {prevArticle ? (
          <Link href={`/blog/${prevArticle.slug}`} className="mt-2 block text-sm font-bold text-slate-900 hover:text-blue-700">
            {prevArticle.title}
          </Link>
        ) : (
          <p className="mt-2 text-sm text-slate-500">No previous article.</p>
        )}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Next article</p>
        {nextArticle ? (
          <Link href={`/blog/${nextArticle.slug}`} className="mt-2 block text-sm font-bold text-slate-900 hover:text-blue-700">
            {nextArticle.title}
          </Link>
        ) : (
          <p className="mt-2 text-sm text-slate-500">No next article.</p>
        )}
      </div>
    </section>
  )
}
