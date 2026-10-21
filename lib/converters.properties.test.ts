import { describe, expect, test } from 'vitest'
import fc from 'fast-check'
import { convert } from './converters'
import type { TitleCaseStyle } from './converters'

/**
 * Invariants the engine must hold for ANY title, not just the examples we
 * thought of.
 *
 * The 2026-08 audit found the engine frozen on already-capitalised input while
 * 208 example tests stayed green, because every example was lowercase. The
 * shape-invariance property below is that bug class stated once: the same
 * title pasted lowercase, naively Title Cased or in ALL CAPS has to convert to
 * the same output.
 */

const STYLES: TitleCaseStyle[] = ['standard', 'ap', 'chicago', 'mla', 'apa']

// Plain English words, function words of every length, the ambiguous words the
// engine has to judge (so, as, since, vs), phrasal-verb pairs and dictionary
// acronyms. No proper nouns: their casing is information the lowercase variant
// genuinely lacks, so invariance cannot hold for them.
const WORDS = [
    'guide', 'writing', 'better', 'world', 'history', 'music', 'rules', 'story',
    'river', 'man', 'time', 'life', 'best', 'new', 'great', 'walking', 'look',
    'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'yet', 'so', 'as',
    'of', 'in', 'on', 'at', 'to', 'by', 'up', 'with', 'from', 'into', 'about',
    'through', 'between', 'among', 'without', 'since', 'until', 'till',
    'before', 'after', 'versus', 'vs', 'down', 'off', 'over',
    'set', 'check', 'out', 'log', 'turn',
    'api', 'seo', 'nasa', 'url', 'ceo', 'phd',
]

const SEPARATORS = [' ', ' ', ' ', ': ', '-', ', ', '. ']

const titleArb = fc
    .array(fc.tuple(fc.constantFrom(...WORDS), fc.constantFrom(...SEPARATORS)), { minLength: 1, maxLength: 10 })
    .map((pairs) => pairs.map(([word, sep], i) => (i === pairs.length - 1 ? word : word + sep)).join(''))

const naiveTitleCase = (text: string) =>
    text.toLowerCase().replace(/(^|[^a-z'])([a-z])/g, (_, before: string, letter: string) => before + letter.toUpperCase())

const shapes = (text: string) => [text.toLowerCase(), naiveTitleCase(text), text.toUpperCase()]

const RUNS = { numRuns: 300 }

describe.each(STYLES)('title case (%s)', (style) => {
    const title = (text: string) => convert(text, 'title', { titleStyle: style })

    test('is idempotent', () => {
        fc.assert(fc.property(titleArb, (text) => {
            const once = title(text)
            expect(title(once)).toBe(once)
        }), RUNS)
    })

    test('gives the same output for lowercase, Title Case and ALL CAPS input', () => {
        fc.assert(fc.property(titleArb, (text) => {
            const [lower, naive, upper] = shapes(text).map(title)
            expect(naive).toBe(lower)
            expect(upper).toBe(lower)
        }), RUNS)
    })

    test('only changes letter case', () => {
        fc.assert(fc.property(titleArb, (text) => {
            expect(title(text).toLowerCase()).toBe(text.toLowerCase())
        }), RUNS)
    })
})

describe('sentence case', () => {
    const sentence = (text: string) => convert(text, 'sentence')

    test('is idempotent', () => {
        fc.assert(fc.property(titleArb, (text) => {
            const once = sentence(text)
            expect(sentence(once)).toBe(once)
        }), RUNS)
    })

    test('gives the same output for lowercase, Title Case and ALL CAPS input', () => {
        fc.assert(fc.property(titleArb, (text) => {
            const [lower, naive, upper] = shapes(text).map(sentence)
            expect(naive).toBe(lower)
            expect(upper).toBe(lower)
        }), RUNS)
    })

    test('only changes letter case', () => {
        fc.assert(fc.property(titleArb, (text) => {
            expect(sentence(text).toLowerCase()).toBe(text.toLowerCase())
        }), RUNS)
    })

    // Sentence case keeps the capitals of text that is already in sentence case.
    // Real title case, in any style, must never be mistaken for it, or the
    // converter would hand the title back unchanged.
    test.each(STYLES)('converts %s title case like lowercase input', (style) => {
        fc.assert(fc.property(titleArb, (text) => {
            expect(sentence(convert(text, 'title', { titleStyle: style }))).toBe(sentence(text.toLowerCase()))
        }), RUNS)
    })
})
