import { describe, expect, test } from 'vitest'
import { convert } from './converters'
import { buildSlug, slugify, SLUG_REASONS, SLUG_STOP_WORDS } from './slug'

// The five rows of the QN6 brief (docs/briefs/qn6-slug-generator.md, "Що движок робить зараз").
describe('brief table', () => {
    test.each([
        ["Don't Stop: Café Résumé & 10% Off!", 'dont-stop-cafe-resume-and-10-off'],
        ["What's New in Next.js 16?", 'whats-new-in-next-js-16'],
        ['Straße über Ångström', 'strasse-uber-angstrom'],
        ['iPhone 15 Pro Max Review', 'iphone-15-pro-max-review'],
    ])('%s', (input, slug) => {
        expect(convert(input, 'slug')).toBe(slug)
    })

    // A boundary, not a right answer: "+" and "#" carry the meaning, and a slug
    // has no way to keep them, so C++ and C# both collapse to "c". The page says so.
    test('C++ and C# collapse to the same "c" (known limit)', () => {
        expect(convert('C++ vs C# — which?', 'slug')).toBe('c-vs-c-which')
    })
})

describe('slug rules', () => {
    test('apostrophes drop without splitting the word, straight or curly', () => {
        expect(slugify("Don't")).toBe('dont')
        expect(slugify('What’s')).toBe('whats')
        expect(slugify("rock'n'roll")).toBe('rocknroll')
    })

    test('an apostrophe at the edge of a word is ordinary punctuation', () => {
        expect(slugify("the dogs' bowls")).toBe('the-dogs-bowls')
        expect(slugify("'quoted'")).toBe('quoted')
    })

    test('accented letters become plain letters, without a switch', () => {
        expect(slugify('Café Crème Brûlée')).toBe('cafe-creme-brulee')
        expect(slugify('Ærø Łódź Œuvre ẞ')).toBe('aero-lodz-oeuvre-ss')
    })

    test('an ampersand becomes "and", spaced or not', () => {
        expect(slugify('Salt & Pepper')).toBe('salt-and-pepper')
        expect(slugify('AT&T')).toBe('at-and-t')
    })

    test('punctuation inside a word becomes a hyphen, so numbers keep their meaning (D4)', () => {
        expect(slugify('Version 2.5')).toBe('version-2-5')
        expect(slugify('and/or')).toBe('and-or')
        expect(slugify('snake_case')).toBe('snake-case')
        expect(slugify('U.S. Open')).toBe('u-s-open')
    })

    test('numbers stay where they are', () => {
        expect(slugify('10 Tips for 2026')).toBe('10-tips-for-2026')
        expect(slugify('50% Off')).toBe('50-off')
    })

    test('brands are never split at a capital', () => {
        expect(slugify('iPhone eBay macOS YouTube')).toBe('iphone-ebay-macos-youtube')
        expect(convert('iPhone', 'kebab')).toBe('i-phone') // kebab case keeps its identifier rule
    })

    test('double, leading and trailing hyphens are trimmed', () => {
        expect(slugify('  -- Hello --  World -- ')).toBe('hello-world')
        expect(slugify('state-of-the-art')).toBe('state-of-the-art')
    })

    test('letters with no plain Latin form are removed', () => {
        expect(slugify('Привіт world')).toBe('world')
        expect(slugify('東京')).toBe('')
    })

    test('the length is never cut', () => {
        const long = 'word '.repeat(60).trim()
        expect(slugify(long)).toHaveLength('word-'.repeat(60).length - 1)
    })
})

describe('stop words', () => {
    test('are kept by default', () => {
        expect(slugify('The Cat in the Hat')).toBe('the-cat-in-the-hat')
    })

    test('are removed when asked', () => {
        expect(convert('The Cat in the Hat', 'slug', { removeStopWords: true })).toBe('cat-hat')
        expect(slugify('Salt & Pepper', { removeStopWords: true })).toBe('salt-pepper')
    })

    test('never empty the slug', () => {
        const { slug, notes } = buildSlug('The Of And', { removeStopWords: true })
        expect(slug).toBe('the-of-and')
        expect(notes.map((n) => n.reason)).toContain(SLUG_REASONS.allStopWords)
    })

    test('the list is the one printed on the page', () => {
        expect(SLUG_STOP_WORDS).toEqual(['a', 'an', 'the', 'and', 'or', 'but', 'nor', 'of', 'in', 'on', 'at', 'to', 'for', 'by', 'with', 'from', 'as', 'vs'])
    })
})

describe('every removed part is explained', () => {
    const reasonsFor = (text: string, options = {}) => buildSlug(text, options).notes

    test('the brief example carries each rule once per word it touches', () => {
        const notes = reasonsFor("Don't Stop: Café Résumé & 10% Off!")
        expect(notes).toContainEqual({ reason: SLUG_REASONS.apostrophe, from: "Don't", to: 'dont' })
        expect(notes).toContainEqual({ reason: SLUG_REASONS.accent, from: 'Café', to: 'cafe' })
        expect(notes).toContainEqual({ reason: SLUG_REASONS.ampersand, from: '&', to: 'and' })
        expect(notes).toContainEqual({ reason: SLUG_REASONS.removed, from: ':', to: '' })
        expect(notes).toContainEqual({ reason: SLUG_REASONS.removed, from: '%', to: '' })
        expect(notes).toContainEqual({ reason: SLUG_REASONS.removed, from: '!', to: '' })
    })

    test('inner punctuation, symbols, non-Latin letters and stop words', () => {
        expect(reasonsFor('Next.js')).toContainEqual({ reason: SLUG_REASONS.inner, from: 'Next.js', to: 'next-js' })
        expect(reasonsFor('C++')).toContainEqual({ reason: SLUG_REASONS.removed, from: '++', to: '' })
        expect(reasonsFor('Привіт')).toEqual([{ reason: SLUG_REASONS.nonLatin, from: 'Привіт', to: '' }])
        expect(reasonsFor('The Hat', { removeStopWords: true })).toContainEqual({ reason: SLUG_REASONS.stopWord, from: 'the', to: '' })
    })

    test('a plain lowercase slug needs no explanation', () => {
        expect(reasonsFor('already-a-slug 2026')).toEqual([])
    })
})
