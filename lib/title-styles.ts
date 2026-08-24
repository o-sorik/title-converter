import type { TitleCaseStyle } from "@/lib/converters"

/**
 * Single source of truth for how the title-case styles are described in the UI.
 *
 * These strings used to be duplicated between the converter and the batch
 * checker, and drifted: the converter claimed AP capitalised prepositions with
 * "5+" letters while the engine used 4+, and two contradictory AP thresholds
 * shipped in the same file. `title-styles.test.ts` now derives each threshold
 * from the engine and asserts the prose matches, so this can't drift again.
 */

export interface TitleStyleOption {
    id: TitleCaseStyle
    label: string
    /** Short line shown under the style picker. */
    hint: string
    /**
     * Preposition length at or above which this style capitalises, or null when
     * the style lowercases prepositions regardless of length. Asserted against
     * the engine.
     */
    prepositionThreshold: number | null
}

export const TITLE_STYLES: TitleStyleOption[] = [
    {
        id: "standard",
        label: "Standard",
        hint: "Lowercases all prepositions in middle positions",
        prepositionThreshold: null,
    },
    {
        id: "ap",
        label: "AP",
        hint: "Capitalizes prepositions with 4+ letters",
        prepositionThreshold: 4,
    },
    {
        id: "chicago",
        label: "Chicago",
        hint: "Capitalizes prepositions with 5+ letters (18th ed.)",
        prepositionThreshold: 5,
    },
    {
        id: "mla",
        label: "MLA",
        hint: "Lowercases all prepositions — same rule as Standard",
        prepositionThreshold: null,
    },
    {
        id: "apa",
        label: "APA",
        hint: "Capitalizes prepositions and conjunctions with 4+ letters",
        prepositionThreshold: 4,
    },
]

export const STYLE_RULE_SUMMARY: Record<TitleCaseStyle, string> = {
    standard:
        "Lowercases articles, coordinating conjunctions, and all prepositions in middle positions; capitalizes major words plus the first and last word.",
    ap: "Capitalizes prepositions with 4+ letters, lowercases shorter ones in the middle of titles.",
    chicago:
        "Capitalizes prepositions with 5+ letters (18th ed.); keeps 4-letter and shorter prepositions lowercase.",
    mla: "Lowercases all prepositions regardless of length — the same rule as Standard.",
    apa: "Capitalizes prepositions and conjunctions with 4+ letters; lowercases shorter ones in the middle.",
}

export function getTitleStyle(id: TitleCaseStyle): TitleStyleOption | undefined {
    return TITLE_STYLES.find((style) => style.id === id)
}
