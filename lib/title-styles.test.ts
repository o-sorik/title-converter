import { expect, test, describe } from 'vitest'
import { convert } from './converters'
import { TITLE_STYLES, STYLE_RULE_SUMMARY } from './title-styles'

/**
 * Drift guard for the style descriptions shown in the UI.
 *
 * The engine is the source of truth. Each style's claimed preposition
 * threshold is measured by actually running convert(), then compared against
 * both the declared threshold and the prose the user reads.
 */

// One preposition per length, all placed mid-title so first/last rules don't fire.
const PREPOSITIONS_BY_LENGTH: [number, string][] = [
    [2, 'of'],
    [3, 'for'],
    [4, 'with'],
    [5, 'about'],
    [6, 'toward'],
    [7, 'without'],
]

/** Shortest preposition length this style capitalises, or null if it never does. */
function measureThreshold(style: (typeof TITLE_STYLES)[number]['id']): number | null {
    for (const [length, word] of PREPOSITIONS_BY_LENGTH) {
        const output = convert(`the story ${word} the sea`, 'title', { titleStyle: style })
        const rendered = output.split(' ')[2]
        if (rendered !== rendered.toLowerCase()) return length
    }
    return null
}

describe.each(TITLE_STYLES)('$label style', (style) => {
    test('declared preposition threshold matches the engine', () => {
        expect(measureThreshold(style.id)).toBe(style.prepositionThreshold)
    })

    test('the hint shown to users states the same threshold', () => {
        const claimed = style.hint.match(/(\d)\+\s*letters/)
        if (style.prepositionThreshold === null) {
            expect(claimed).toBeNull()
            expect(style.hint.toLowerCase()).toContain('lowercase')
        } else {
            expect(claimed).not.toBeNull()
            expect(Number(claimed![1])).toBe(style.prepositionThreshold)
        }
    })

    test('the rule summary states the same threshold', () => {
        const summary = STYLE_RULE_SUMMARY[style.id]
        const claimed = summary.match(/(\d)\+\s*letters/)
        if (style.prepositionThreshold === null) {
            expect(claimed).toBeNull()
        } else {
            expect(Number(claimed![1])).toBe(style.prepositionThreshold)
        }
    })
})

test('every style has a summary and every summary has a style', () => {
    expect(Object.keys(STYLE_RULE_SUMMARY).sort()).toEqual(TITLE_STYLES.map((s) => s.id).sort())
})

test('styles that share a threshold are described as sharing it', () => {
    // MLA and Standard are genuinely the same rule. If that stops being true,
    // this test should fail so the copy gets revisited rather than silently lying.
    expect(measureThreshold('mla')).toBe(measureThreshold('standard'))
    expect(STYLE_RULE_SUMMARY.mla.toLowerCase()).toContain('same rule as standard')
})
