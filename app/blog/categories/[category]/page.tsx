import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BreadcrumbListJsonLd } from "@/components/json-ld"
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
  CategoryHero,
  CategorySearchBar,
  ComparisonCards,
  ExploreMore,
  FaqBlock,
  FeaturedArticle,
  TopicPills,
} from "@/components/blog/sections"
import { Button } from "@/components/ui/button"

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
  }
}

export default async function CategoryDetailPage({ params }: Props) {
  const siteUrl = "https://titlecaseconverter.online"
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
          { name: "Home", item: siteUrl },
          { name: "Blog", item: `${siteUrl}/blog` },
          { name: "Categories", item: `${siteUrl}/blog/categories` },
          { name: currentCategory.name, item: `${siteUrl}/blog/categories/${currentCategory.id}` },
        ]}
      />
      <CategoryHero category={currentCategory} />

      <TopicPills items={["All", "Basics", "Citations", "Headings", "Common Mistakes"]} />
      <CategorySearchBar />

      <FeaturedArticle article={featured} />

      <section className="grid gap-4 md:grid-cols-3">
        {rest.length > 0 ? rest.map((article) => <ArticleCard key={article.slug} article={article} />) : null}
      </section>

      <div className="flex justify-center">
        <Button variant="outline">Load More Guides</Button>
      </div>

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
