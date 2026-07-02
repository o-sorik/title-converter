import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostingJsonLd, BreadcrumbListJsonLd } from "@/components/json-ld"
import { ReadingProgressBar } from "@/components/blog/reading-progress"
import { BottomCta } from "@/components/blog/sections"
import { ArticleCardsGrid } from "@/components/blog/article/article-cards-grid"
import { ArticleHeader } from "@/components/blog/article/article-header"
import { ArticleMainContent } from "@/components/blog/article/article-main-content"
import { ArticlePrevNext } from "@/components/blog/article/article-prev-next"
import { ArticleSidebar } from "@/components/blog/article/article-sidebar"
import { parseConverterInitialStateFromSearchParams, toConverterContext } from "@/lib/converter-context"
import {
  getArticlePageViewModel,
  getBlogArticleMetadataBySlug,
  getBlogArticleSlugs,
} from "@/lib/blog-view-model"
import { SITE_URL } from "@/lib/constants"

type Props = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export const revalidate = 604800
export const dynamicParams = false

export function generateStaticParams() {
  return getBlogArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const metadata = getBlogArticleMetadataBySlug(slug)
  if (!metadata) {
    return {}
  }

  return metadata
}

export default async function ArticlePage({ params, searchParams }: Props) {
  const { slug } = await params
  const viewModel = getArticlePageViewModel(slug)
  if (!viewModel) {
    notFound()
  }
  const converterInitialState = parseConverterInitialStateFromSearchParams((await searchParams) ?? {})
  const converterContext = toConverterContext(converterInitialState)
  const {
    article,
    category,
    related,
    recommended,
    prevArticle,
    nextArticle,
    articleUrl,
    articleImage,
    updatedIso,
    authorData,
    relatedTitle,
    recommendedTitle,
    tocItems,
  } = viewModel

  return (
    <>
      <ReadingProgressBar targetId="article-content" />
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", item: SITE_URL },
          { name: "Blog", item: `${SITE_URL}/blog` },
          ...(category ? [{ name: category.name, item: `${SITE_URL}/blog/categories/${category.id}` }] : []),
          { name: article.title, item: articleUrl },
        ]}
      />
      <BlogPostingJsonLd
        headline={article.title}
        description={article.excerpt}
        url={articleUrl}
        image={articleImage}
        author={article.author}
        authorRole={authorData?.role}
        authorBio={authorData?.bio}
        dateModified={updatedIso}
        section={category?.name}
      />

      <ArticleHeader article={article} category={category} authorData={authorData ?? undefined} />

      <section className="grid gap-5 md:gap-6 lg:grid-cols-[2fr_1fr]">
        <ArticleMainContent article={article} converterContext={converterContext} />
        <ArticleSidebar related={related} tocItems={tocItems} relatedTitle={relatedTitle} />
      </section>

      <ArticleCardsGrid title={recommendedTitle} items={recommended} />

      <ArticlePrevNext prevArticle={prevArticle} nextArticle={nextArticle} />

      <BottomCta
        title="Ready to format your headlines?"
        description="Convert faster with clear capitalization logic and reduce manual rewrites across your editorial workflow."
      />
    </>
  )
}
