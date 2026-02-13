import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogBreadcrumbs } from "@/components/blog/breadcrumbs"

export function CategoriesHero() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Categories" },
  ]

  return (
    <section className="space-y-5 py-8 text-center">
      <div className="flex justify-center">
        <BlogBreadcrumbs items={breadcrumbItems} />
      </div>
      <h1 className="text-5xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-6xl">
        Explore Writing Style <span className="text-blue-700 dark:text-blue-300">Categories</span>
      </h1>
      <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-zinc-300">
        Browse practical guides across APA, MLA, Chicago, AP, grammar, and writing tips.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="bg-blue-700 text-white hover:bg-blue-800">
          <Link href="/">Open Converter</Link>
        </Button>
        <Button asChild variant="ghost" className="text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-500/15">
          <Link href="/blog">View Latest Guides</Link>
        </Button>
      </div>
    </section>
  )
}
