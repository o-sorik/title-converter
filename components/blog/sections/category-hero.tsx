import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Category } from "@/components/blog/data"
import { BlogBreadcrumbs } from "@/components/blog/breadcrumbs"

export function CategoryHero({ category }: { category: Category }) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Categories", href: "/blog/categories" },
    { label: category.name },
  ]

  return (
    <section className="space-y-5">
      <BlogBreadcrumbs items={breadcrumbItems} />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="space-y-3 lg:max-w-3xl lg:flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">{category.articleCount} articles</p>
          <h1 className="text-5xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-6xl">
            {category.name} <span className="text-blue-700 dark:text-blue-300">Capitalization Guides</span>
          </h1>
          <p className="text-base text-slate-600 dark:text-zinc-300">{category.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-blue-700 text-white hover:bg-blue-800">
              <Link href="/">Start Converting</Link>
            </Button>
            <Button asChild variant="ghost" className="text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-500/15">
              <Link href="/blog/categories">Browse All Categories</Link>
            </Button>
          </div>
        </div>
        <div className="hidden lg:block lg:w-80 lg:shrink-0">
          <div className="relative rounded-3xl border border-blue-100 bg-white p-8 shadow-sm dark:border-blue-500/30 dark:bg-zinc-900/80">
            <div className="absolute -right-3 -top-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md">
              <span className="text-lg">✦</span>
            </div>
            <h4 className="text-lg font-bold text-slate-950 dark:text-zinc-100">Academic Excellence</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-300">Updated for the 7th Edition (2024)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
