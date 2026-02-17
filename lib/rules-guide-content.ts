import type { ConversionType, TitleCaseStyle } from "./converters"
import { appendConverterContextToHref, type ConverterContext } from "./converter-context"

export type GuidanceStyle = Exclude<TitleCaseStyle, "standard"> | "standard"

export interface GuidanceExample {
  caseLabel: string
  input: string
  outputs: Record<GuidanceStyle, string>
  whyItMatters: string
}

export interface RulesGuideViewModel {
  activeStyle: GuidanceStyle
  activeMode: string
  styleTitle: string
  styleSummary: string
  examples: GuidanceExample[]
  returnHref: string
  returnLabel: string
}

const STYLE_META: Record<GuidanceStyle, { title: string; summary: string }> = {
  standard: {
    title: "Standard title-case guidance",
    summary:
      "Balanced defaults: capitalize major words, lowercase most short connectors in middle positions, always capitalize first/last word.",
  },
  ap: {
    title: "AP style guidance",
    summary:
      "AP often capitalizes prepositions with five or more letters in titles; shorter connectors are usually lowercased in the middle.",
  },
  chicago: {
    title: "Chicago style guidance",
    summary:
      "Chicago keeps many middle prepositions/conjunctions lowercase and relies strongly on first/last-word positioning.",
  },
  mla: {
    title: "MLA style guidance",
    summary:
      "MLA headline-style patterns are close to Chicago for many connectors, with consistency across editorial usage as priority.",
  },
  apa: {
    title: "APA style guidance",
    summary:
      "APA typically capitalizes prepositions and conjunctions with four or more letters; shorter ones are lowercased in middle positions.",
  },
}

const EDGE_CASE_EXAMPLES: GuidanceExample[] = [
  {
    caseLabel: "Short connectors and prepositions",
    input: "walking during the light",
    outputs: {
      standard: "Walking during the Light",
      ap: "Walking During the Light",
      chicago: "Walking during the Light",
      mla: "Walking during the Light",
      apa: "Walking During the Light",
    },
    whyItMatters:
      "The word 'during' changes across styles and is a common source of editorial inconsistency.",
  },
  {
    caseLabel: "Subtitle after colon",
    input: "title case rules: a practical guide for editors",
    outputs: {
      standard: "Title Case Rules: A Practical Guide for Editors",
      ap: "Title Case Rules: A Practical Guide for Editors",
      chicago: "Title Case Rules: A Practical Guide for Editors",
      mla: "Title Case Rules: A Practical Guide for Editors",
      apa: "Title Case Rules: A Practical Guide for Editors",
    },
    whyItMatters:
      "Subtitles should start clearly after punctuation so the user has a reliable next edit decision.",
  },
  {
    caseLabel: "Hyphenated and branded wording",
    input: "state-of-the-art workflows for iPhone launches",
    outputs: {
      standard: "State-of-the-Art Workflows for iPhone Launches",
      ap: "State-of-the-Art Workflows for iPhone Launches",
      chicago: "State-of-the-Art Workflows for iPhone Launches",
      mla: "State-of-the-Art Workflows for iPhone Launches",
      apa: "State-of-the-Art Workflows for iPhone Launches",
    },
    whyItMatters:
      "Hyphenation and brand casing are frequent edge cases where users should verify output quickly before publishing.",
  },
]

const MODE_TO_RETURN_HREF: Partial<Record<ConversionType, string>> = {
  title: "/",
  sentence: "/sentence-case-converter",
  lower: "/lower-case-converter",
  upper: "/upper-case-converter",
  camel: "/camel-case-converter",
  pascal: "/pascal-case-converter",
  snake: "/snake-case-converter",
  kebab: "/slug-generator",
  alternating: "/alternating-case-converter",
}

function normalizeStyle(styleParam?: string): GuidanceStyle {
  const value = (styleParam ?? "standard").toLowerCase()
  if (value === "ap" || value === "apa" || value === "mla" || value === "chicago" || value === "standard") {
    return value
  }
  return "standard"
}

export function getRulesGuideViewModel(styleParam?: string, modeParam?: string): RulesGuideViewModel {
  const activeStyle = normalizeStyle(styleParam)
  const styleMeta = STYLE_META[activeStyle]
  const activeMode = (modeParam ?? "title").toLowerCase()
  const returnHref = MODE_TO_RETURN_HREF[activeMode as ConversionType] ?? "/"

  return {
    activeStyle,
    activeMode,
    styleTitle: styleMeta.title,
    styleSummary: styleMeta.summary,
    examples: EDGE_CASE_EXAMPLES,
    returnHref,
    returnLabel: returnHref === "/" ? "Return to Title Case Converter" : "Return to converter",
  }
}

export function getRulesGuideViewModelWithContext(
  styleParam?: string,
  modeParam?: string,
  converterContext?: ConverterContext | null
): RulesGuideViewModel {
  const model = getRulesGuideViewModel(styleParam, modeParam)
  if (!converterContext) return model

  return {
    ...model,
    returnHref: appendConverterContextToHref(model.returnHref, converterContext),
  }
}
