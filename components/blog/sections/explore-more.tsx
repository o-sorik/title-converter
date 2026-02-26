import Link from "next/link"
import type { Category } from "@/components/blog/data"

export function ExploreMore({
  categories,
  currentCategoryId,
}: {
  categories: Category[]
  currentCategoryId: string
}) {
  return (
    <section className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-zinc-500">Explore more</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories
          .filter((categoryItem) => categoryItem.id !== currentCategoryId)
          .slice(0, 3)
          .map((categoryItem) => (
            <Link
              key={categoryItem.id}
              href={`/blog/categories/${categoryItem.id}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:text-blue-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:text-blue-300"
            >
              {categoryItem.name}
            </Link>
          ))}
      </div>
    </section>
  )
}
