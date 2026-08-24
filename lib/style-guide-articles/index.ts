import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"
import { APA_7_TITLE_CASE_GUIDE_ARTICLE } from "./apa-7-title-case-guide"
import { APA_CITING_TITLES_ARTICLE } from "./apa-citing-titles"
import { APA_HEADING_LEVELS_ARTICLE } from "./apa-heading-levels"
import { AP_TITLE_CAPITALIZATION_BASICS_ARTICLE } from "./ap-title-capitalization-basics"
import { CHICAGO_TITLE_CASE_ARTICLE } from "./chicago-title-case"
import { MLA_VS_APA_HEADLINES_ARTICLE } from "./mla-vs-apa-headlines"

/**
 * Style-guide cluster.
 *
 * These five slugs previously shared one hardcoded APA body rendered by the
 * `legacy` fallback in article-main-content.tsx – five indexed URLs with
 * identical content, one of them the site's featured article. Each now has its
 * own block-model body targeting its own intent.
 *
 * Order controls category-page order.
 */
export const STYLE_GUIDE_ARTICLES: WritingTipsArticle[] = [
  APA_7_TITLE_CASE_GUIDE_ARTICLE,
  APA_CITING_TITLES_ARTICLE,
  APA_HEADING_LEVELS_ARTICLE,
  AP_TITLE_CAPITALIZATION_BASICS_ARTICLE,
  MLA_VS_APA_HEADLINES_ARTICLE,
  CHICAGO_TITLE_CASE_ARTICLE,
]
