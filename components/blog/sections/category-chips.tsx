import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Category } from "@/components/blog/data"

export function CategoryChips({ categories, activeId }: { categories: Category[]; activeId?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-slate-200 dark:border-zinc-700 pb-0">
      <Link
        href="/blog/categories"
        className={cn(
          "inline-block pb-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors",
          !activeId
            ? "border-b-2 border-blue-700 text-blue-700 -mb-px"
            : "text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-100"
        )}
      >
        All
      </Link>
      {categories.map((category) => {
        const isActive = category.id === activeId
        return (
          <Link
            key={category.id}
            href={`/blog/categories/${category.id}`}
            className={cn(
              "inline-block pb-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors",
              isActive
                ? "border-b-2 border-blue-700 text-blue-700 -mb-px"
                : "text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-100"
            )}
          >
            {category.name}
          </Link>
        )
      })}
    </div>
  )
}
