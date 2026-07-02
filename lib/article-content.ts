import type { TitleCaseStyle } from "@/lib/converters"
import type { IsXArticle } from "@/lib/is-x-article-data"
import type { GenCapArticle } from "@/lib/gen-cap-article-data"
import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"
import type { HighIntentGuidanceEntry } from "@/lib/high-intent-guidance"
import { getIsXArticleBySlug } from "@/lib/is-x-article-data"
import { getGenCapArticleBySlug } from "@/lib/gen-cap-article-data"
import { getWritingTipsArticleBySlug } from "@/lib/writing-tips-article-data"
import { getHighIntentGuidanceBySlug } from "@/lib/high-intent-guidance"

/**
 * Unified article content model.
 *
 * Every blog article body resolves to exactly one template payload via
 * `getArticleContentBySlug`. This is the single dispatch point for both
 * rendering (`ArticleMainContent`) and view-model concerns (TOC, related
 * links), and the future mapping surface for the CMS migration: each
 * template variant corresponds to one CMS collection/block layout.
 */

export type TocItem = {
  id: string
  label: string
}

// ---------------------------------------------------------------------------
// Shared cross-template primitives
// ---------------------------------------------------------------------------

/**
 * Plain text only — question and answer render verbatim in the UI accordion
 * AND go verbatim into FAQPage JSON-LD. No inline markdown here: a
 * `[link](/blog/x)` would ship literal brackets to users and raw markdown
 * into schema.org output.
 */
export interface FAQItem {
  question: string
  answer: string
}

export interface DoNotExample {
  text: string
  reason: string
}

// ---------------------------------------------------------------------------
// Structured rich content (block model)
//
// Long-form articles (writing-tips) store their body as serializable blocks
// instead of JSX. Inline formatting inside `text`/`items`/table cells uses a
// constrained markdown subset rendered by `components/blog/article/article-blocks.tsx`:
//   **bold**   *italic*   [label](/internal/path)   [label](https://external)
// Link labels may contain *italic*. Nothing else is supported on purpose –
// the subset must stay trivially convertible to CMS rich text later.
//
// Known limits: italic markers cannot SPAN a link (`*text [label](href) text*`
// renders the asterisks literally – put the italics inside the label or split
// the phrase), and an unpaired `*` renders literally (used for footnote
// markers). Fields outside blocks (FAQItem, whySectionBody etc.) are plain
// text and never pass through this parser.
// ---------------------------------------------------------------------------

export type StyleGuideName = Exclude<TitleCaseStyle, "standard">

export type ArticleBlock =
  | {
      type: "paragraph"
      text: string
      /**
       * default – body paragraph; subheading – bold pseudo-heading inside a
       * section; note – small muted footnote text.
       */
      variant?: "default" | "subheading" | "note"
    }
  | { type: "list"; items: string[] }
  | {
      /** Generic two-plus column table; first column renders bold. */
      type: "table"
      headers: string[]
      rows: string[][]
    }
  | {
      /** Capitalize/Lowercase badge matrix across the four style guides. */
      type: "styleGuideMatrix"
      rowHeader: string
      rows: { label: string; guides: Record<StyleGuideName, boolean> }[]
    }

export interface ArticleSection {
  id: string
  /** Sections without a heading (e.g. intro) render blocks only. */
  heading?: string
  /** Short TOC label; defaults to `heading`. */
  tocLabel?: string
  /** Exclude from the derived TOC (e.g. sources). */
  hideFromToc?: boolean
  blocks: ArticleBlock[]
}

// ---------------------------------------------------------------------------
// Template dispatch
// ---------------------------------------------------------------------------

export type ArticleContent =
  | { template: "is-x"; data: IsXArticle }
  | { template: "gen-cap"; data: GenCapArticle }
  | { template: "writing-tips"; data: WritingTipsArticle }
  | { template: "grammar-101"; data: HighIntentGuidanceEntry }
  | { template: "legacy" }

export function getArticleContentBySlug(slug: string): ArticleContent {
  const isX = getIsXArticleBySlug(slug)
  if (isX) return { template: "is-x", data: isX }

  const genCap = getGenCapArticleBySlug(slug)
  if (genCap) return { template: "gen-cap", data: genCap }

  const writingTips = getWritingTipsArticleBySlug(slug)
  if (writingTips) return { template: "writing-tips", data: writingTips }

  const highIntent = getHighIntentGuidanceBySlug(slug)
  if (highIntent) return { template: "grammar-101", data: highIntent }

  return { template: "legacy" }
}

// ---------------------------------------------------------------------------
// Section ids + TOC
//
// Templates and TOC lists share these ids so anchors can never drift apart.
// ---------------------------------------------------------------------------

export const FAQ_SECTION_ID = "faq"

export const IS_X_SECTION_IDS = {
  quickAnswer: "quick-answer",
  whySection: "why-section",
  styleGuideTable: "style-guide-table",
  examples: "examples",
  edgeCases: "edge-cases",
} as const

export const GEN_CAP_SECTION_IDS = {
  quickAnswer: "quick-answer",
  whenSection: "when-section",
  quickRules: "quick-rules",
  styleComparison: "style-comparison",
  examples: "examples",
  edgeCases: "edge-cases",
} as const

export const GRAMMAR_101_SECTION_IDS = {
  shortAnswer: "short-answer",
  posLogic: "part-of-speech-logic",
  doAndDoNot: "do-and-do-not",
} as const

export const LEGACY_SECTION_IDS = {
  keyTakeaway: "key-takeaway",
  rules: "rules-you-should-apply",
  doAndDoNot: "do-and-do-not",
} as const

const IS_X_TOC_ITEMS: TocItem[] = [
  { id: IS_X_SECTION_IDS.quickAnswer, label: "Quick answer" },
  { id: IS_X_SECTION_IDS.whySection, label: "Why it's capitalized" },
  { id: IS_X_SECTION_IDS.styleGuideTable, label: "By style guide" },
  { id: IS_X_SECTION_IDS.examples, label: "Examples" },
  { id: IS_X_SECTION_IDS.edgeCases, label: "Edge cases" },
  { id: FAQ_SECTION_ID, label: "FAQ" },
]

const GEN_CAP_TOC_ITEMS: TocItem[] = [
  { id: GEN_CAP_SECTION_IDS.quickAnswer, label: "Quick answer" },
  { id: GEN_CAP_SECTION_IDS.whenSection, label: "When to capitalize" },
  { id: GEN_CAP_SECTION_IDS.quickRules, label: "Quick rules" },
  { id: GEN_CAP_SECTION_IDS.styleComparison, label: "AP vs. Chicago" },
  { id: GEN_CAP_SECTION_IDS.examples, label: "Examples" },
  { id: GEN_CAP_SECTION_IDS.edgeCases, label: "Edge cases" },
  { id: FAQ_SECTION_ID, label: "FAQ" },
]

const HIGH_INTENT_TOC_ITEMS: TocItem[] = [
  { id: GRAMMAR_101_SECTION_IDS.shortAnswer, label: "Short answer" },
  { id: GRAMMAR_101_SECTION_IDS.posLogic, label: "POS rule logic" },
  { id: GRAMMAR_101_SECTION_IDS.doAndDoNot, label: "Examples" },
]

const DEFAULT_TOC_ITEMS: TocItem[] = [
  { id: LEGACY_SECTION_IDS.keyTakeaway, label: "Key takeaway" },
  { id: LEGACY_SECTION_IDS.rules, label: "Capitalization rules" },
  { id: LEGACY_SECTION_IDS.doAndDoNot, label: "Do and do not examples" },
]

/** Derive TOC entries from structured sections (+ trailing FAQ). */
export function deriveTocFromSections(sections: ArticleSection[], hasFaq: boolean): TocItem[] {
  const items = sections
    .filter((section) => !section.hideFromToc && (section.tocLabel || section.heading))
    .map((section) => ({ id: section.id, label: section.tocLabel || section.heading! }))
  return hasFaq ? [...items, { id: FAQ_SECTION_ID, label: "FAQ" }] : items
}

export function getArticleTocItems(content: ArticleContent): TocItem[] {
  switch (content.template) {
    case "is-x":
      return IS_X_TOC_ITEMS
    case "gen-cap":
      return GEN_CAP_TOC_ITEMS
    case "writing-tips":
      return deriveTocFromSections(content.data.sections, content.data.faqItems.length > 0)
    case "grammar-101":
      return HIGH_INTENT_TOC_ITEMS
    case "legacy":
      return DEFAULT_TOC_ITEMS
  }
}
