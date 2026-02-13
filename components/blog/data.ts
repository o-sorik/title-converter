export type Category = {
  id: string
  name: string
  description: string
  articleCount: number
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  categoryId: string
  author: string
  updatedAt: string
  readTime: string
  image: string
  featured?: boolean
}

export type Comparison = {
  title: string
  href: string
  summary: string
}

export const blogCategories: Category[] = [
  {
    id: "apa-style",
    name: "APA Style",
    description: "Academic formatting guidance for titles, citations, and headings.",
    articleCount: 12,
  },
  {
    id: "mla-style",
    name: "MLA Style",
    description: "Humanities-first rules for capitalization and title treatment.",
    articleCount: 8,
  },
  {
    id: "chicago",
    name: "Chicago",
    description: "Formal editorial standards used in books and publishing.",
    articleCount: 15,
  },
  {
    id: "journalism",
    name: "Journalism",
    description: "AP-focused guidance for newsroom and digital media workflows.",
    articleCount: 10,
  },
  {
    id: "grammar-101",
    name: "Grammar 101",
    description: "Rule essentials to build confidence before style-specific decisions.",
    articleCount: 24,
  },
  {
    id: "writing-tips",
    name: "Writing Tips",
    description: "Actionable copy and readability best practices for everyday writing.",
    articleCount: 18,
  },
]

export const blogArticles: Article[] = [
  {
    slug: "apa-7-title-case-guide",
    title: "The Definitive Guide to APA 7th Edition Title Case",
    excerpt:
      "Learn how APA 7 handles major words, hyphenated terms, and edge cases in headings and references.",
    categoryId: "apa-style",
    author: "Sarah Klein",
    updatedAt: "2024-10-24",
    readTime: "5 min read",
    image: "/images/blog/generated/apa-notebook-cover.webp",
    featured: true,
  },
  {
    slug: "apa-citing-titles",
    title: "Citing Titles in APA: Book vs Article Formatting",
    excerpt:
      "Clarify case rules when citing books, journals, and web sources in APA manuscripts.",
    categoryId: "apa-style",
    author: "David Chen",
    updatedAt: "2024-05-18",
    readTime: "5 min read",
    image: "/images/blog/generated/editing-hands-cover.webp",
  },
  {
    slug: "apa-heading-levels",
    title: "Formatting Levels of Headings in APA 7",
    excerpt:
      "A practical checklist for structuring long-form academic writing with consistent heading levels.",
    categoryId: "apa-style",
    author: "Mia Gomez",
    updatedAt: "2024-04-21",
    readTime: "7 min read",
    image: "/images/blog/generated/style-guides-stack-cover.webp",
  },
  {
    slug: "ap-title-capitalization-basics",
    title: "AP Style: When to Capitalize Titles and Jobs",
    excerpt:
      "Keep newsroom copy sharp with quick AP capitalization rules for professions and honorifics.",
    categoryId: "journalism",
    author: "Nadia Ross",
    updatedAt: "2023-10-19",
    readTime: "4 min read",
    image: "/images/blog/generated/ap-typewriter-cover.webp",
  },
  {
    slug: "mla-vs-apa-headlines",
    title: "MLA vs APA: Which Headline Style Should You Use?",
    excerpt:
      "A side-by-side comparison to choose the right convention based on discipline and citation context.",
    categoryId: "mla-style",
    author: "Noah Brooks",
    updatedAt: "2023-11-02",
    readTime: "6 min read",
    image: "/images/blog/generated/laptop-workflow-cover.webp",
  },
  {
    slug: "sentence-vs-title-case",
    title: "Title Case vs Sentence Case: Choosing Your Voice",
    excerpt:
      "Understand when to favor each style for UX copy, editorial pages, and professional messaging.",
    categoryId: "writing-tips",
    author: "Mila Ross",
    updatedAt: "2023-10-15",
    readTime: "4 min read",
    image: "/images/blog/generated/checklist-desk-cover.webp",
  },
]

export const styleComparisons: Comparison[] = [
  {
    title: "MLA vs APA",
    href: "/blog/categories/apa-style",
    summary: "Academic heading requirements compared side-by-side.",
  },
  {
    title: "NY Times vs AP",
    href: "/blog/categories/journalism",
    summary: "Newsroom standards for modern digital publishing.",
  },
  {
    title: "Chicago vs APA",
    href: "/blog/categories/chicago",
    summary: "Formal vs academic capitalization conventions.",
  },
]

export const articleFaqs = [
  {
    question: "What words are not capitalized in APA title case?",
    answer:
      "Short coordinating conjunctions and many prepositions stay lowercase unless they are the first or last word in a title.",
  },
  {
    question: "How should hyphenated words be treated in APA 7?",
    answer:
      "APA 7 generally capitalizes both parts of major hyphenated compounds in title case headings.",
  },
  {
    question: "Is sentence case allowed in APA references?",
    answer:
      "Yes. APA references often use sentence case for article titles while headings in papers follow title case rules.",
  },
  {
    question: "Title case vs sentence case: when should I use each?",
    answer:
      "Use title case for headings and prominent labels, and sentence case for most body copy, UI text, and reference titles where style guides require it.",
  },
]

export const categoryFaqs = [
  {
    question: "How do I choose between APA, MLA, and Chicago?",
    answer:
      "Use APA for social sciences, MLA for humanities, and Chicago for publishing and long-form editorial work.",
  },
  {
    question: "Does the converter support multiple style guides?",
    answer:
      "Yes. The tool supports major capitalization patterns so you can draft quickly and do final style-specific checks.",
  },
  {
    question: "Can I apply these rules to web and app copy?",
    answer:
      "Yes. The same capitalization foundations can be adapted for UX writing, blog headlines, and marketing copy.",
  },
  {
    question: "APA vs MLA: which one should I choose?",
    answer:
      "Choose APA for social sciences and MLA for humanities. If your institution or publisher has a style policy, follow that as the source of truth.",
  },
]

export function getCategoryById(categoryId: string) {
  return blogCategories.find((category) => category.id === categoryId)
}

export function getFeaturedArticle() {
  return blogArticles.find((article) => article.featured) ?? blogArticles[0]
}

export function getArticlesByCategory(categoryId: string) {
  return blogArticles.filter((article) => article.categoryId === categoryId)
}

export function getArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug)
}
