import type { Metadata } from "next"
import { BottomCta, CategorySearchBar, ComparisonCards, FaqBlock } from "@/components/blog/sections"
import { CategoriesGrid, CategoriesHero, PopularGuidesStrip } from "@/components/blog/pages"
import { getBlogCategoriesPageViewModel } from "@/lib/blog-view-model"

export const revalidate = 86400

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore writing and capitalization categories.",
}

export default function BlogCategoriesPage() {
  const viewModel = getBlogCategoriesPageViewModel()
  const { categories, popular, comparisons, faqs } = viewModel

  return (
    <>
      <CategoriesHero />

      <CategorySearchBar />

      <CategoriesGrid categories={categories} />

      <PopularGuidesStrip items={popular} />

      <ComparisonCards items={comparisons} />

      <FaqBlock title="Frequently Asked Questions" items={faqs} />

      <BottomCta
        title="Ready to format your headlines?"
        description="Use the converter to apply style-guide rules in one click and keep your editorial workflow fast."
      />
    </>
  )
}
