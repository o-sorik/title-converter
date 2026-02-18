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

export type TocItem = {
  id: string
  label: string
}

const DEFAULT_TOC_ITEMS: TocItem[] = [
  { id: "key-takeaway", label: "Key takeaway" },
  { id: "rules-you-should-apply", label: "Capitalization rules" },
  { id: "do-and-do-not", label: "Do and do not examples" },
  { id: "article-faqs", label: "FAQ and related guides" },
]

const HIGH_INTENT_TOC_ITEMS: TocItem[] = [
  { id: "short-answer", label: "Short answer" },
  { id: "part-of-speech-logic", label: "POS rule logic" },
  { id: "do-and-do-not", label: "Examples" },
  { id: "article-faqs", label: "FAQ and related guides" },
]

export function getArticlePageViewModel(slug: string) {
  const article = getArticleBySlug(slug)
  if (!article) {
    return null
  }

  const category = getCategoryById(article.categoryId)
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

  const articleUrl = `https://titlecaseconverter.online/blog/${article.slug}`
  const articleImage = `https://titlecaseconverter.online${article.image}`
  const updatedIso = toIsoDateTime(article.updatedAt)

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
    isHighIntentArticle,
    relatedTitle: isHighIntentArticle ? "Related capitalization questions" : "Related guides",
    recommendedTitle: isHighIntentArticle ? "Next Grammar 101 topics" : "Recommended Reading",
    tocItems: isHighIntentArticle ? HIGH_INTENT_TOC_ITEMS : DEFAULT_TOC_ITEMS,
    faqs: articleFaqs,
    comparisons: styleComparisons,
  }
}

export function getBlogIndexPageViewModel() {
  const featured = getFeaturedArticle()
  const latest = [...blogArticles]
    .filter((article) => article.slug !== featured.slug)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)

  return {
    featured,
    latest,
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

  return {
    title: article.title,
    description: article.excerpt,
  }
}
