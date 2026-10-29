import type { ConversionType, TitleCaseStyle } from "./converters"
import { appendConverterContextToHref, type ConverterContext } from "./converter-context"

export interface RuleGuidanceContext {
  href: string
  shortLabel: string
  description: string
  isStyleSpecific: boolean
}

const STYLE_LABELS: Record<TitleCaseStyle, string> = {
  standard: "Standard",
  ap: "AP",
  chicago: "Chicago",
  mla: "MLA",
  apa: "APA",
}

export function getContextualRuleGuidance(
  mode: ConversionType,
  titleStyle: TitleCaseStyle,
  converterContext?: ConverterContext
): RuleGuidanceContext {
  // A slug has no capitalization rules: its rules are the list on the slug page.
  if (mode === "slug") {
    return {
      href: "/slug-generator#what-changes",
      shortLabel: "Slug rules",
      description: "Open the list of changes the slug generator makes.",
      isStyleSpecific: false,
    }
  }

  const baseHref =
    mode === "title"
      ? `/capitalization-rules-guide?mode=title&style=${titleStyle}`
      : `/capitalization-rules-guide?mode=${mode}`
  const href = converterContext ? appendConverterContextToHref(baseHref, converterContext) : baseHref

  if (mode === "title") {
    return {
      href,
      shortLabel: `${STYLE_LABELS[titleStyle]} rules`,
      description: `Open ${STYLE_LABELS[titleStyle]} capitalization guidance for this title-case context.`,
      isStyleSpecific: true,
    }
  }

  return {
    href,
    shortLabel: "Rules guide",
    description: "Open capitalization guidance. Title-style rules apply when Title Case mode is active.",
    isStyleSpecific: false,
  }
}
