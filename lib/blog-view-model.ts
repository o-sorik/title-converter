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

export function getArticlePageViewModel(slug: string) {
  const article = getArticleBySlug(slug)
  if (!article) {
    return null
  }

  const category = getCategoryById(article.categoryId)
  const related = getArticlesByCategory(article.categoryId)
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3)
  const recommended = blogArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3)

  const articleIndex = blogArticles.findIndex((candidate) => candidate.slug === article.slug)
  const prevArticle = articleIndex > 0 ? blogArticles[articleIndex - 1] : null
  const nextArticle =
    articleIndex >= 0 && articleIndex < blogArticles.length - 1
      ? blogArticles[articleIndex + 1]
      : null

  const articleUrl = `https://titlecaseconverter.online/blog/${article.slug}`
  const articleImage = `https://titlecaseconverter.online${article.image}`
  const updatedIso = new Date(article.updatedAt).toISOString()

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
    tocItems: DEFAULT_TOC_ITEMS,
    faqs: articleFaqs,
    comparisons: styleComparisons,
  }
}

export function getBlogIndexPageViewModel() {
  const featured = getFeaturedArticle()
  const latest = blogArticles
    .filter((article) => article.slug !== featured.slug)
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
