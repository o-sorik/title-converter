import type { ConversionType, TitleCaseStyle } from "./converters"

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
  titleStyle: TitleCaseStyle
): RuleGuidanceContext {
  if (mode === "title") {
    return {
      href: `/capitalization-rules-guide?mode=title&style=${titleStyle}`,
      shortLabel: `${STYLE_LABELS[titleStyle]} rules`,
      description: `Open ${STYLE_LABELS[titleStyle]} capitalization guidance for this title-case result.`,
      isStyleSpecific: true,
    }
  }

  return {
    href: `/capitalization-rules-guide?mode=${mode}`,
    shortLabel: "Rules guide",
    description: "Open capitalization guidance. Title-style rules apply when Title Case mode is active.",
    isStyleSpecific: false,
  }
}
