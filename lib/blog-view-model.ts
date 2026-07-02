import {
  articleFaqs,
  blogCategories,
  blogArticles,
  categoryFaqs,
  getFeaturedArticle,
  getArticleBySlug,
  getArticlesByCategory,
  getCategoryById,
  styleComparisons,
} from "@/components/blog/data"
import { toIsoDateTime } from "@/lib/blog-date"
import { getHighIntentGuidanceBySlug, getHighIntentRelatedEntries } from "./high-intent-guidance"
import { getArticleContentBySlug, getArticleTocItems } from "./article-content"
import { SITE_URL } from "@/lib/constants"
import { getAuthorByName } from "@/lib/authors"

export type { TocItem } from "./article-content"

export function getArticlePageViewModel(slug: string) {
  const article = getArticleBySlug(slug)
  if (!article) {
    return null
  }

  const category = getCategoryById(article.categoryId)
  const content = getArticleContentBySlug(article.slug)
  // Navigation (related/prev/next) follows the high-intent graph even when a
  // richer template owns the body (e.g. IsX articles that also have a
  // high-intent entry) – independent of the content template dispatch.
  const highIntentEntry = getHighIntentGuidanceBySlug(article.slug)
  const isHighIntentArticle = Boolean(highIntentEntry)

  const relatedFromHighIntent = highIntentEntry
    ? getHighIntentRelatedEntries(highIntentEntry)
        .map((entry) => getArticleBySlug(entry.slug))
        .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate))
        .slice(0, 3)
    : []

  const defaultRelated = getArticlesByCategory(article.categoryId)
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3)

  const related = isHighIntentArticle ? relatedFromHighIntent : defaultRelated

  const recommendedPool = isHighIntentArticle
    ? getArticlesByCategory(article.categoryId)
        .filter((candidate) => candidate.slug !== article.slug)
        .filter((candidate) => !related.some((relatedArticle) => relatedArticle.slug === candidate.slug))
    : blogArticles.filter((candidate) => candidate.slug !== article.slug)

  const recommended = recommendedPool.slice(0, 3)

  const articleIndex = blogArticles.findIndex((candidate) => candidate.slug === article.slug)
  const defaultPrevArticle = articleIndex > 0 ? blogArticles[articleIndex - 1] : null
  const defaultNextArticle =
    articleIndex >= 0 && articleIndex < blogArticles.length - 1 ? blogArticles[articleIndex + 1] : null

  const prevArticle = isHighIntentArticle
    ? getArticlesByCategory(article.categoryId).find((candidate) => {
        const candidateIntent = getHighIntentGuidanceBySlug(candidate.slug)
        if (!candidateIntent || candidate.slug === article.slug) return false
        return candidateIntent.relatedSlugs.includes(article.slug)
      }) ?? null
    : defaultPrevArticle

  const nextArticle = isHighIntentArticle ? related[0] ?? null : defaultNextArticle

  const articleUrl = `${SITE_URL}/blog/${article.slug}`
  const articleImage = `${SITE_URL}${article.image}`
  const updatedIso = toIsoDateTime(article.updatedAt)
  const authorData = getAuthorByName(article.author)

  return {
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
    isHighIntentArticle,
    relatedTitle: isHighIntentArticle ? "Related Capitalization Questions" : "Related Guides",
    recommendedTitle: isHighIntentArticle ? "Next Grammar 101 topics" : "Recommended Reading",
    tocItems: getArticleTocItems(content),
  }
}

export function getBlogIndexPageViewModel() {
  const featured = getFeaturedArticle()
  const latest = [...blogArticles]
    .filter((article) => article.slug !== featured.slug)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)

  // The writing-tips panel should feature writing-tips content, not repeat
  // the latest strip; top up with recent articles NOT already shown on the page.
  const writingTipsPool = getArticlesByCategory("writing-tips")
    .filter((article) => article.slug !== featured.slug)
  const shownSlugs = new Set([featured.slug, ...latest.map((article) => article.slug)])
  const fallbackPool = [...blogArticles]
    .filter((article) => !shownSlugs.has(article.slug))
    .filter((article) => !writingTipsPool.some((tip) => tip.slug === article.slug))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  const writingTips = [...writingTipsPool, ...fallbackPool].slice(0, 3)

  return {
    featured,
    latest,
    writingTips,
    categories: blogCategories,
    comparisons: styleComparisons,
    faqs: articleFaqs,
  }
}

export function getBlogCategoriesPageViewModel() {
  return {
    categories: blogCategories,
    popular: blogArticles.slice(0, 3),
    comparisons: styleComparisons,
    faqs: categoryFaqs,
  }
}

export function getBlogArticleSlugs() {
  return blogArticles.map((article) => article.slug)
}

export function getBlogArticleMetadataBySlug(slug: string) {
  const article = getArticleBySlug(slug)
  if (!article) {
    return null
  }

  const pageUrl = `${SITE_URL}/blog/${article.slug}`

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article" as const,
      url: pageUrl,
      siteName: "Title Case Converter Online",
      locale: "en_US",
    },
  }
}
