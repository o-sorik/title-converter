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
    /** Label with what the style is, where there is room for it ("Standard (MLA-based)"). */
    qualifiedLabel: string
    /** One sentence under the style picker saying what the style does. */
    hint: string
    /**
     * Preposition length at or above which this style capitalises, or null when
     * the style lowercases prepositions regardless of length. Asserted against
     * the engine.
     */
    prepositionThreshold: number | null
}

/** Picker order: the default first, then the four manuals. */
export const TITLE_STYLES: TitleStyleOption[] = [
    {
        id: "standard",
        label: "Standard",
        qualifiedLabel: "Standard (MLA-based)",
        hint: "Standard follows MLA-style rules: all prepositions lowercase.",
        prepositionThreshold: null,
    },
    {
        id: "ap",
        label: "AP",
        qualifiedLabel: "AP",
        hint: "AP capitalizes prepositions with 4+ letters.",
        prepositionThreshold: 4,
    },
    {
        id: "apa",
        label: "APA",
        qualifiedLabel: "APA",
        hint: "APA capitalizes prepositions and conjunctions with 4+ letters.",
        prepositionThreshold: 4,
    },
    {
        id: "chicago",
        label: "Chicago",
        qualifiedLabel: "Chicago",
        hint: "Chicago capitalizes prepositions with 5+ letters (18th ed.).",
        prepositionThreshold: 5,
    },
    {
        id: "mla",
        label: "MLA",
        qualifiedLabel: "MLA",
        hint: "MLA lowercases all prepositions.",
        prepositionThreshold: null,
    },
]

export const STYLE_RULE_SUMMARY: Record<TitleCaseStyle, string> = {
    standard:
        "Lowercases articles, coordinating conjunctions, and all prepositions in middle positions; capitalizes major words plus the first and last word.",
    ap: "Capitalizes prepositions with 4+ letters, lowercases shorter ones in the middle of titles.",
    chicago:
        "Capitalizes prepositions with 5+ letters (18th ed.); keeps 4-letter and shorter prepositions lowercase.",
    mla: "Lowercases all prepositions regardless of length, the same rule as Standard.",
    apa: "Capitalizes prepositions and conjunctions with 4+ letters; lowercases shorter ones in the middle.",
}

export function getTitleStyle(id: TitleCaseStyle): TitleStyleOption | undefined {
    return TITLE_STYLES.find((style) => style.id === id)
}
