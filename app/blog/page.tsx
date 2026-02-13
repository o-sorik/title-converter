import type { Metadata } from "next"
import Link from "next/link"
import { BottomCta, CategoryChips, ComparisonCards, FaqBlock, FeaturedArticle, ArticleCard } from "@/components/blog/sections"
import { BlogIndexHero, BlogWritingTipsPanel } from "@/components/blog/pages"
import { getBlogIndexPageViewModel } from "@/lib/blog-view-model"

export const metadata: Metadata = {
  title: "Blog",
  description: "Capitalization guides, comparisons, and practical writing tips.",
}

export default function BlogIndexPage() {
  const viewModel = getBlogIndexPageViewModel()
  const { featured, latest, categories, comparisons, faqs } = viewModel

  return (
    <>
      <BlogIndexHero />

      <FeaturedArticle article={featured} />

      <section className="space-y-4">
        <CategoryChips categories={categories} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-950">Latest Guides</h2>
          <Link href="/blog/categories" className="text-sm font-semibold text-blue-700">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <ComparisonCards items={comparisons} />

      <BlogWritingTipsPanel items={latest} />

      <FaqBlock title="Frequently Asked Questions" items={faqs} />

      <BottomCta
        title="Ready to format your headlines?"
        description="Use the converter to apply consistent capitalization and publish cleaner copy in seconds."
      />
    </>
  )
}
