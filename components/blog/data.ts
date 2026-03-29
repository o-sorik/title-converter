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
  verifiedFor?: string
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
    articleCount: 30,
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
    verifiedFor: "APA 7th Edition",
  },
  {
    slug: "and-capitalized-in-title-case",
    title: "Is \"And\" Capitalized in Title Case? Quick Rule + Examples",
    excerpt:
      "Fast answer for whether \"and\" should be capitalized in title case, plus examples and converter-ready workflow.",
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-02-18",
    readTime: "4 min read",
    image: "/images/blog/generated/checklist-desk-cover.webp",
  },
  {
    slug: "the-capitalized-in-title-case",
    title: "Is \"The\" Capitalized in Title Case? Position Rule Explained",
    excerpt:
      "Learn when \"the\" is capitalized in title case and where it should remain lowercase in real editorial headlines.",
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-02-18",
    readTime: "4 min read",
    image: "/images/blog/generated/style-guides-stack-cover.webp",
  },
  {
    slug: "to-capitalized-in-title-case",
    title: "Is \"To\" Capitalized in Title Case? Infinitive Cases Made Practical",
    excerpt:
      "Resolve \"to\" capitalization quickly with practical examples and style-aware checks you can apply immediately.",
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-02-18",
    readTime: "5 min read",
    image: "/images/blog/generated/laptop-workflow-cover.webp",
  },
  {
    slug: "in-capitalized-in-title-case",
    title: "Is \"In\" Capitalized in Title Case? Short Preposition Rule",
    excerpt:
      "A direct rule for capitalizing \"in\" in title case with examples for first, middle, and last-word positions.",
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-02-18",
    readTime: "4 min read",
    image: "/images/blog/generated/editing-hands-cover.webp",
  },
  {
    slug: "of-capitalized-in-title-case",
    title: "Is \"Of\" Capitalized in Title Case? Editorial Baseline",
    excerpt:
      "See when \"of\" stays lowercase and when positional rules require capitalization in title case headlines.",
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-02-18",
    readTime: "4 min read",
    image: "/images/blog/generated/ap-typewriter-cover.webp",
  },
  {
    slug: "is-capitalized-in-title-case",
    title: "Is \"Is\" Capitalized in Title Case? Verb Rule",
    excerpt:
      "Why verbs like \"is\" are capitalized in title case, with quick examples and converter validation workflow.",
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-02-18",
    readTime: "4 min read",
    image: "/images/blog/generated/apa-notebook-cover.webp",
  },
  {
    slug: "with-capitalized-in-title-case",
    title: `Is "With" Capitalized in a Title?`,
    excerpt: `Is "with" capitalized in a title? Yes in AP, APA, and MLA style (4+ letter rule). No in Chicago style. See the rules, examples, and edge cases.`,
    categoryId: "grammar-101",
    author: "Sophia Stewart",
    updatedAt: "2026-03-05",
    readTime: "4 min",
    image: "/images/blog/generated/checklist-desk-cover.webp",
    verifiedFor: "AP, APA, MLA, Chicago",
  },
  {
    slug: "from-capitalized-in-title-case",
    title: `Is "From" Capitalized in a Title?`,
    excerpt: `Is "from" capitalized in a title? Yes in AP, APA, and MLA (4-letter rule). No in Chicago style. Learn the rules, Chicago 18th ed. update, and examples.`,
    categoryId: "grammar-101",
    author: "Sophia Stewart",
    updatedAt: "2026-03-05",
    readTime: "4 min",
    image: "/images/blog/generated/style-guides-stack-cover.webp",
    verifiedFor: "AP, APA, MLA, Chicago",
  },
  {
    slug: "your-capitalized-in-title-case",
    title: `Is "Your" Capitalized in a Title?`,
    excerpt: `Yes – "your" is capitalized in all major style guides. At four letters and as a pronoun, it meets both the length rule and Chicago's pronoun rule. See examples.`,
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-03-05",
    readTime: "4 min",
    image: "/images/blog/generated/editing-hands-cover.webp",
    verifiedFor: "AP, APA, MLA, Chicago",
  },
  {
    slug: "that-capitalized-in-title-case",
    title: `Is "That" Capitalized in a Title?`,
    excerpt: `Yes – "that" is capitalized in all major style guides: AP, APA, MLA, and Chicago. As a subordinating conjunction with 4+ letters, it's always capitalized.`,
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-03-05",
    readTime: "4 min",
    image: "/images/blog/generated/laptop-workflow-cover.webp",
    verifiedFor: "AP, APA, MLA, Chicago",
  },
  {
    slug: "am-capitalized-in-title-case",
    title: `Is "Am" Capitalized in a Title?`,
    excerpt: `Yes – "am" is always capitalized in a title in AP, APA, MLA, and Chicago styles. All guides capitalize verbs regardless of length. See rules and examples.`,
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-03-05",
    readTime: "4 min",
    image: "/images/blog/generated/apa-notebook-cover.webp",
    verifiedFor: "AP, APA, MLA, Chicago",
  },
  {
    slug: "up-capitalized-in-title-case",
    title: `Is "Up" Capitalized in a Title?`,
    excerpt: `Is "up" capitalized in a title? It depends on its role. As a preposition, it's lowercase. As an adverb in a phrasal verb, AP and Chicago capitalize it.`,
    categoryId: "grammar-101",
    author: "Sophia Stewart",
    updatedAt: "2026-03-05",
    readTime: "4 min",
    image: "/images/blog/generated/ap-typewriter-cover.webp",
    verifiedFor: "AP, APA, MLA, Chicago",
  },
  {
    slug: "between-capitalized-in-title-case",
    title: `Is "Between" Capitalized in a Title?`,
    excerpt: `Yes – "between" is capitalized in all major style guides. At seven letters, it meets every guide's threshold. Chicago 18th ed. updated the rule in 2024.`,
    categoryId: "grammar-101",
    author: "Sophia Stewart",
    updatedAt: "2026-03-05",
    readTime: "4 min",
    image: "/images/blog/generated/checklist-desk-cover.webp",
    verifiedFor: "AP, APA, MLA, Chicago",
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
    slug: "is-president-capitalized",
    title: `Is "President" Capitalized?`,
    excerpt: `Is "president" capitalized? Only when used as a title before a name or as a stand-in for a specific person. See the rules, examples, and common mistakes.`,
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-03-11",
    readTime: "5 min",
    image: "/images/blog/generated/ap-typewriter-cover.webp",
    verifiedFor: "AP, Chicago",
  },
  {
    slug: "do-you-capitalize-seasons",
    title: `Do You Capitalize Seasons?`,
    excerpt: `Do you capitalize seasons like spring, summer, fall, and winter? No – unless they start a sentence or are part of a proper noun. See all the rules here.`,
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-03-11",
    readTime: "4 min",
    image: "/images/blog/generated/checklist-desk-cover.webp",
    verifiedFor: "AP, APA, MLA, Chicago",
  },
  {
    slug: "is-earth-capitalized",
    title: `Is "Earth" Capitalized?`,
    excerpt: `Is "earth" capitalized? Yes when referring to the planet (especially without "the"). No when it means soil or ground. See the rule with clear examples.`,
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-03-11",
    readTime: "5 min",
    image: "/images/blog/generated/style-guides-stack-cover.webp",
    verifiedFor: "AP, Chicago, NASA style",
  },
  {
    slug: "is-high-school-capitalized",
    title: `Is "High School" Capitalized?`,
    excerpt: `Is "high school" capitalized? Only when it's part of a specific school's name. Keep it lowercase when referring to high school in general. See all the rules.`,
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-03-11",
    readTime: "4 min",
    image: "/images/blog/generated/editing-hands-cover.webp",
    verifiedFor: "AP, Chicago",
  },
  {
    slug: "do-you-capitalize-after-a-colon",
    title: `Do You Capitalize After a Colon?`,
    excerpt: `Do you capitalize after a colon? It depends on the style guide. AP says yes for complete sentences. Chicago says only for two or more sentences. See the rules.`,
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-03-11",
    readTime: "5 min",
    image: "/images/blog/generated/laptop-workflow-cover.webp",
    verifiedFor: "AP, APA, MLA, Chicago",
  },
  {
    slug: "is-professor-capitalized",
    title: `Is "Professor" Capitalized?`,
    excerpt: `Is "professor" capitalized? Only before a name as a title – Professor Smith. As a job description, it stays lowercase. See rules, examples, and style guide tips.`,
    categoryId: "grammar-101",
    author: "Sophia Stewart",
    updatedAt: "2026-03-29",
    readTime: "5 min",
    image: "/images/blog/generated/ap-typewriter-cover.webp",
    verifiedFor: "AP, Chicago, APA",
  },
  {
    slug: "do-you-capitalize-majors",
    title: `Do You Capitalize Majors?`,
    excerpt: `Do you capitalize college majors? Not usually – unless the major contains a proper noun like English or French. See the rules, style guide comparison, and examples.`,
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-03-29",
    readTime: "5 min",
    image: "/images/blog/generated/checklist-desk-cover.webp",
    verifiedFor: "AP, APA, Chicago",
  },
  {
    slug: "is-bachelors-degree-capitalized",
    title: `Is "Bachelor's Degree" Capitalized?`,
    excerpt: `Is "bachelor's degree" capitalized? Not in general use – only when writing the full formal name like Bachelor of Arts. See the rule, examples, and apostrophe tip.`,
    categoryId: "grammar-101",
    author: "Oleh Kovalenko",
    updatedAt: "2026-03-29",
    readTime: "5 min",
    image: "/images/blog/generated/style-guides-stack-cover.webp",
    verifiedFor: "AP, APA, Chicago",
  },
  {
    slug: "is-math-capitalized",
    title: `Is "Math" Capitalized?`,
    excerpt: `Is "math" capitalized? No – math is a common noun and stays lowercase in regular writing. Capitalize only in course names like Math 101. See rules and examples.`,
    categoryId: "grammar-101",
    author: "Sophia Stewart",
    updatedAt: "2026-03-29",
    readTime: "4 min",
    image: "/images/blog/generated/editing-hands-cover.webp",
    verifiedFor: "AP, APA, Chicago",
  },
  {
    slug: "is-english-capitalized",
    title: `Is "English" Capitalized?`,
    excerpt: `Is "English" capitalized? Yes – always. It's a proper noun derived from England, whether you mean the language, the subject, or the nationality. See examples.`,
    categoryId: "grammar-101",
    author: "Sophia Stewart",
    updatedAt: "2026-03-29",
    readTime: "4 min",
    image: "/images/blog/generated/laptop-workflow-cover.webp",
    verifiedFor: "AP, APA, MLA, Chicago",
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
