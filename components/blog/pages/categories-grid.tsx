import Link from "next/link"
import type { Category } from "@/components/blog/data"

export function CategoriesGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <article
          key={category.id}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-sm p-5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-white/90 dark:hover:bg-zinc-900/70"
        >
          <h2 className="text-2xl font-bold text-slate-950">{category.name}</h2>
          <p className="mt-2 text-sm text-slate-600">{category.description}</p>

          <Link
            href={`/blog/categories/${category.id}`}
            className="mt-5 inline-flex text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900"
          >
            View category
          </Link>
        </article>
      ))}
    </section>
  )
}
