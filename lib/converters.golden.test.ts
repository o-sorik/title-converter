import { expect, test, describe } from 'vitest'
import { convert } from './converters'
import type { TitleCaseStyle } from './converters'

/**
 * Golden corpus for the casing engine.
 *
 * The original suite fed the engine all-lowercase input everywhere, which hid
 * the two worst defects for months: already-capitalised words were frozen and
 * never corrected, and the acronym whitelist shouted ordinary English words.
 *
 * Every case here is a real-world paste shape. Add to this file whenever a
 * conversion bug is reported.
 */

const title = (text: string, style: TitleCaseStyle = 'standard') =>
    convert(text, 'title', { titleStyle: style })

describe('already-capitalised input is corrected, not frozen', () => {
    test.each([
        ['A Guide To Better Writing', 'A Guide to Better Writing'],
        ['Learning From The Best', 'Learning from the Best'],
        ['The Catcher In The Rye', 'The Catcher in the Rye'],
        ['Gone With The Wind', 'Gone with the Wind'],
        ['The Best Of Times And The Worst Of Times', 'The Best of Times and the Worst of Times'],
        ['Content Rules: How To Scale', 'Content Rules: How to Scale'],
    ])('%s', (input, expected) => {
        expect(title(input)).toBe(expected)
    })

    test('the correction is idempotent', () => {
        const once = title('A Guide To Better Writing')
        expect(title(once)).toBe(once)
    })
})

describe('ordinary English words are never shouted as acronyms', () => {
    test.each([
        ['the man who sold the world', 'The Man Who Sold the World'],
        ['who framed roger rabbit', 'Who Framed Roger Rabbit'],
        ['the ego and the id', 'The Ego and the Id'],
        ['the ram in the field', 'The Ram in the Field'],
    ])('%s', (input, expected) => {
        expect(title(input)).toBe(expected)
    })

    test('all-caps input is normalised rather than treated as acronyms', () => {
        expect(title('THE MAN WHO SOLD THE WORLD')).toBe('The Man Who Sold the World')
        expect(title('ALL CAPS HEADLINE HERE')).toBe('All Caps Headline Here')
    })

    test('a shouted word in mixed input is still normalised', () => {
        expect(title('Hello WORLD')).toBe('Hello World')
        expect(title('The NBA And THE Man')).toBe('The NBA and the Man')
    })
})

describe('acronyms outside the dictionary survive mixed-case input', () => {
    test.each([
        ['NBA Finals Recap', 'NBA Finals Recap'],
        ['The IBM Story', 'The IBM Story'],
        ['A Guide to DIY Repairs', 'A Guide to DIY Repairs'],
        ['The CDC and the IRS', 'The CDC and the IRS'],
        ['An FAQ for the NHS', 'An FAQ for the NHS'],
    ])('%s', (input, expected) => {
        expect(title(input)).toBe(expected)
    })
})

describe('possessives, plurals and mixed-case canonical forms', () => {
    test('acronym possessives survive in both directions', () => {
        expect(title("NASA's Mission")).toBe("NASA's Mission")
        expect(title("nasa's mission")).toBe("NASA's Mission")
    })

    test('acronym plurals survive', () => {
        expect(title('reading URLs and APIs')).toBe('Reading URLs and APIs')
        expect(title('the ceos and the ctos')).toBe('The CEOs and the CTOs')
    })

    test('mixed-case canonical spellings are reachable from lowercase', () => {
        expect(title('a phd student')).toBe('A PhD Student')
        expect(title('PhD students')).toBe('PhD Students')
    })

    test('brand casing is preserved, dotted initialisms intact', () => {
        expect(title('iphone and eBay strategy')).toBe('Iphone and eBay Strategy')
        expect(title('macOS and JavaScript')).toBe('macOS and JavaScript')
        expect(title('learning from the U.S.A. style guide')).toBe('Learning from the U.S.A. Style Guide')
    })
})

describe('adverbial particles fire for verbs only', () => {
    test.each([
        ['the wedding in paris', 'The Wedding in Paris'],
        ['a meeting in berlin', 'A Meeting in Berlin'],
        ['the seed in the ground', 'The Seed in the Ground'],
    ])('noun ending in -ing/-ed does not trigger the rule: %s', (input, expected) => {
        expect(title(input)).toBe(expected)
    })

    test.each([
        ['how to zoom in quickly', 'How to Zoom In Quickly'],
        ['running up that hill', 'Running Up That Hill'],
        ['walking through the process', 'Walking Through the Process'],
    ])('a real verb still triggers it: %s', (input, expected) => {
        expect(title(input)).toBe(expected)
    })
})

describe('sentence case', () => {
    test('the pronoun I is always capitalised', () => {
        expect(convert('you and i are friends', 'sentence')).toBe('You and I are friends')
        expect(convert("he and i went home. i'm tired.", 'sentence')).toBe("He and I went home. I'm tired.")
    })

    test('sentence case still de-shouts, unlike title case', () => {
        expect(convert('he said "HELLO." then LEFT.', 'sentence')).toBe('He said "hello." Then left.')
        expect(convert('THE NBA FINALS WERE GREAT', 'sentence')).toBe('The nba finals were great')
    })

    test('dictionary acronyms are still preserved', () => {
        expect(convert('NASA and USA mission. API works.', 'sentence')).toBe('NASA and USA mission. API works.')
    })
})

describe('style thresholds still hold after the refactor', () => {
    test('AP capitalises 4+ letter prepositions, Chicago 5+, MLA none', () => {
        expect(title('dancing with wolves', 'ap')).toBe('Dancing With Wolves')
        expect(title('dancing with wolves', 'chicago')).toBe('Dancing with Wolves')
        expect(title('dancing with wolves', 'mla')).toBe('Dancing with Wolves')
        expect(title('all about eve', 'chicago')).toBe('All About Eve')
    })

    test('every style leaves already-correct output untouched', () => {
        const styles: TitleCaseStyle[] = ['standard', 'ap', 'chicago', 'mla', 'apa']
        for (const style of styles) {
            const once = title('a guide to better writing about the nba', style)
            expect(title(once, style)).toBe(once)
        }
    })
})
