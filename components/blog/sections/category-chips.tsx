import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Category } from "@/components/blog/data"

export function CategoryChips({ categories, activeId }: { categories: Category[]; activeId?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href="/blog/categories"
        className={cn(
          "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
          !activeId
            ? "border-blue-700 bg-blue-700 text-white"
            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700"
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
              "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
              isActive
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700"
            )}
          >
            {category.name}
          </Link>
        )
      })}
    </div>
  )
}
