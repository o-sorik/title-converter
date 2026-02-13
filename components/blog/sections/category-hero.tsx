import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Category } from "@/components/blog/data"

export function CategoryHero({ category }: { category: Category }) {
  return (
    <section className="space-y-5">
      <div className="text-xs text-slate-500">
        <Link href="/blog" className="hover:text-blue-700">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/blog/categories" className="hover:text-blue-700">
          Categories
        </Link>{" "}
        / <span className="font-semibold text-blue-700">{category.name}</span>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="space-y-3 lg:max-w-3xl lg:flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{category.articleCount} articles</p>
          <h1 className="text-5xl font-black leading-tight text-slate-950 md:text-6xl">
            {category.name} <span className="text-blue-700">Capitalization Guides</span>
          </h1>
          <p className="text-base text-slate-600">{category.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-blue-700 text-white hover:bg-blue-800">
              <Link href="/">Start Converting</Link>
            </Button>
            <Button asChild variant="ghost" className="text-blue-700 hover:bg-blue-50">
              <Link href="/blog/categories">Browse All Categories</Link>
            </Button>
          </div>
        </div>
        <div className="hidden lg:block lg:w-80 lg:shrink-0">
          <div className="relative rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <div className="absolute -right-3 -top-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md">
              <span className="text-lg">✦</span>
            </div>
            <h4 className="text-lg font-bold text-slate-950">Academic Excellence</h4>
            <p className="mt-2 text-sm text-slate-600">Updated for the 7th Edition (2024)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
