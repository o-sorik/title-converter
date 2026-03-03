import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BreadcrumbListJsonLd } from "@/components/json-ld"
import { SITE_URL } from "@/lib/constants"
import {
  blogCategories,
  blogArticles,
  categoryFaqs,
  getArticlesByCategory,
  getCategoryById,
  styleComparisons,
} from "@/components/blog/data"
import {
  ArticleCard,
  BottomCta,
  CategoryChips,
  CategoryHero,
  ComparisonCards,
  ExploreMore,
  FaqBlock,
  FeaturedArticle,
} from "@/components/blog/sections"

type Props = {
  params: Promise<{ category: string }>
}

export const revalidate = 86400
export const dynamicParams = false

export function generateStaticParams() {
  return blogCategories.map((category) => ({ category: category.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const currentCategory = getCategoryById(category)
  if (!currentCategory) {
    return {}
  }

  return {
    title: `${currentCategory.name} Guides`,
    description: currentCategory.description,
    alternates: {
      canonical: `/blog/categories/${currentCategory.id}`,
    },
  }
}

export default async function CategoryDetailPage({ params }: Props) {
  const { category } = await params
  const currentCategory = getCategoryById(category)

  if (!currentCategory) {
    notFound()
  }

  const categoryArticles = getArticlesByCategory(currentCategory.id)
  const featured = categoryArticles[0] ?? blogArticles[0]
  const rest = categoryArticles.slice(1)

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", item: SITE_URL },
          { name: "Blog", item: `${SITE_URL}/blog` },
          { name: "Categories", item: `${SITE_URL}/blog/categories` },
          { name: currentCategory.name, item: `${SITE_URL}/blog/categories/${currentCategory.id}` },
        ]}
      />
      <CategoryHero category={currentCategory} />

      <CategoryChips categories={blogCategories} activeId={currentCategory.id} />

      <FeaturedArticle article={featured} />

      <section className="grid gap-4 md:grid-cols-3">
        {rest.length > 0 ? rest.map((article) => <ArticleCard key={article.slug} article={article} />) : null}
      </section>

      <ComparisonCards items={styleComparisons} />

      <ExploreMore categories={blogCategories} currentCategoryId={currentCategory.id} />

      <FaqBlock title={`${currentCategory.name} FAQs`} items={categoryFaqs} />

      <BottomCta
        title={`Ready to format your ${currentCategory.name.toLowerCase()} headlines?`}
        description="Stop second-guessing capitalization. Convert headlines instantly and refine style-specific details with confidence."
      />
    </>
  )
}
