import { describe, expect, test } from 'vitest'
import { convert } from './converters'
import type { TitleCaseStyle } from './converters'
import { STYLE_MANUAL_TITLES } from './style-manual-titles'

/**
 * The engine against titles the style guides print themselves.
 *
 * Two checks per title: a correctly styled title must come back unchanged, and
 * the same title typed in lowercase must be rebuilt exactly. Every failure is
 * either fixed or listed below with its reason, and a listed title must still
 * fail, so an accidental fix forces the list to shrink.
 */

const LIMIT_AS_PRINTED: Record<string, string> = {
    'An a la Carte Menu': 'Foreign phrase: the engine has no list of borrowed phrases like "à la".',
    'Mnemonics That Work Are Better Than Rules That Do Not': 'CMOS caps "than" as a conjunction but lowercases it as a preposition ("More than One Path"); before a noun the two look identical.',
    'Capitalizing Titles in Languages Other Than English': 'MLA 2.90 lists "other than" as a lowercase preposition, yet this MLA page prints it capitalized.',
    'It Takes More Than a Major: Employer Priorities for College Learning and Student Success': 'Same "than" ambiguity as above, in MLA.',
    'What Will Grandma Dress Up Like?': 'Adverbial particle after a verb outside COMMON_BASE_VERBS; needs a phrasal-verb lexicon.',
    'In Texas, Ad Heats Up Race for Governor': 'Same: "heats up" is not in the verb list.',
    'Before Normal, There Was Natural: John Bulwer, Disability, and Natural Signing in Early Modern England and Beyond': 'The particle rule fires on any known verb + "in"; here "in" is a preposition with an object.',
    'Some Like It Hot': '"Like" is a verb here and a preposition elsewhere; the engine cannot tell.',
    'Theodore Dwight Weld and the American Anti-slavery Society': 'MLA lowercases after a prefix when the dictionary closes the term up; no dictionary in the engine.',
    'A Meme-able Feast: Teaching Modernist Citationality and Hemingway Iconography': 'Suffix after a hyphen stays lowercase; the engine treats every hyphen part as a word.',
}

// Casing that lowercase input no longer carries.
const LIMIT_FROM_LOWERCASE: Record<string, string> = {
    'Beck Depression Inventory–II': 'Roman numeral is indistinguishable from a word once lowercased.',
    'Improving SET Response Rates': 'Acronym outside ACRONYM_CANONICAL ("set" is also a word).',
    'OpenAI’s Big Bet That Jony Ive Can Make AI Hardware Work': 'Brand casing (OpenAI) is lost in lowercase input.',
    '#MeToo Poll: Many in US More Willing to Call Out Misconduct': 'Brand casing and "US" vs "us" are lost in lowercase input.',
    'LOL I Don’t Think So': 'Acronym outside ACRONYM_CANONICAL.',
}

const title = (text: string, style: TitleCaseStyle) => convert(text, 'title', { titleStyle: style })

const cases = (skip: Record<string, string>[]) =>
    STYLE_MANUAL_TITLES.filter((e) => !skip.some((limits) => e.title in limits)).map((e) => [e.style, e.title] as const)

describe('style-manual titles come back unchanged', () => {
    test.each(cases([LIMIT_AS_PRINTED]))('[%s] %s', (style, text) => {
        expect(title(text, style)).toBe(text)
    })
})

describe('style-manual titles are rebuilt from lowercase', () => {
    test.each(cases([LIMIT_AS_PRINTED, LIMIT_FROM_LOWERCASE]))('[%s] %s', (style, text) => {
        expect(title(text.toLowerCase(), style)).toBe(text)
    })
})

describe('documented limits are still limits', () => {
    const styleOf = (text: string) => {
        const example = STYLE_MANUAL_TITLES.find((e) => e.title === text)
        if (!example) throw new Error(`Limit lists a title that is not in STYLE_MANUAL_TITLES: ${text}`)
        return example.style
    }

    test.each(Object.keys(LIMIT_AS_PRINTED))('as printed: %s', (text) => {
        expect(title(text, styleOf(text))).not.toBe(text)
    })

    test.each(Object.keys(LIMIT_FROM_LOWERCASE))('from lowercase: %s', (text) => {
        expect(title(text.toLowerCase(), styleOf(text))).not.toBe(text)
    })
})
