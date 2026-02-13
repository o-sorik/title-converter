import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostingJsonLd } from "@/components/json-ld"
import { ReadingProgressBar } from "@/components/blog/reading-progress"
import { BottomCta, ComparisonCards, FaqBlock } from "@/components/blog/sections"
import { ArticleCardsGrid } from "@/components/blog/article/article-cards-grid"
import { ArticleHeader } from "@/components/blog/article/article-header"
import { ArticleMainContent } from "@/components/blog/article/article-main-content"
import { ArticlePrevNext } from "@/components/blog/article/article-prev-next"
import { ArticleSidebar } from "@/components/blog/article/article-sidebar"
import {
  getArticlePageViewModel,
  getBlogArticleMetadataBySlug,
  getBlogArticleSlugs,
} from "@/lib/blog-view-model"

type Props = {
  params: Promise<{ slug: string }>
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const viewModel = getArticlePageViewModel(slug)
  if (!viewModel) {
    notFound()
  }
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
    tocItems,
    faqs,
    comparisons,
  } = viewModel

  return (
    <>
      <ReadingProgressBar targetId="article-content" />
      <BlogPostingJsonLd
        headline={article.title}
        description={article.excerpt}
        url={articleUrl}
        image={articleImage}
        author={article.author}
        dateModified={updatedIso}
        section={category?.name}
      />

      <ArticleHeader article={article} category={category} />

      <section className="grid gap-5 md:gap-6 lg:grid-cols-[2fr_1fr]">
        <ArticleMainContent article={article} />
        <ArticleSidebar related={related} tocItems={tocItems} />
      </section>

      <div id="article-faqs" className="scroll-mt-24">
        <FaqBlock title="Article FAQs" items={faqs} />
      </div>

      <ArticleCardsGrid title="Recommended Reading" items={recommended} label="Recommended" />
      <ArticleCardsGrid title="Related content" items={related} label="Related" />

      <ArticlePrevNext prevArticle={prevArticle} nextArticle={nextArticle} />

      <ComparisonCards items={comparisons} />

      <BottomCta
        title="Ready to format your APA headlines?"
        description="Convert faster with clear capitalization logic and reduce manual rewrites across your editorial workflow."
      />
    </>
  )
}
