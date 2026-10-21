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

    test('long shouted words are lowercased; short all-caps words in mixed text are acronyms, as in title case', () => {
        expect(convert('he said "HELLO." then left.', 'sentence')).toBe('He said "hello." Then left.')
        expect(convert('the BBC report on the NHS', 'sentence')).toBe('The BBC report on the NHS')
        expect(convert('NFL Suspends Texans Receiver After FBI Probe', 'sentence')).toBe('NFL suspends texans receiver after FBI probe')
        // All-caps text carries no signal, so only dictionary acronyms survive.
        expect(convert('THE NBA FINALS WERE GREAT', 'sentence')).toBe('The nba finals were great')
        // A stray lowercase word does not make shouted text deliberate.
        expect(convert('THE BEST iPhone APPS FOR 2026', 'sentence')).toBe('The best iPhone apps for 2026')
        // The accepted cost (decision 2026-10-21): a short shouted word reads as an acronym.
        expect(convert('he said "HELLO." then LEFT.', 'sentence')).toBe('He said "hello." Then LEFT.')
    })

    test('capitals in text already in sentence case are names and are kept', () => {
        expect(convert('we met John Smith in Paris last Monday', 'sentence')).toBe('We met John Smith in Paris last Monday')
        // A line made only of names looks exactly like Title Case and is treated as such.
        expect(convert('meeting with John Smith in Paris on Monday', 'sentence')).toBe('Meeting with john smith in paris on monday')
        expect(convert('Here’s what voters make of President Trump’s COVID-19 diagnosis', 'sentence')).toBe('Here’s what voters make of President Trump’s COVID-19 diagnosis')
        // From Title Case every word is capitalized, so names cannot be told apart.
        expect(convert('Meeting With John Smith In Paris On Monday', 'sentence')).toBe('Meeting with john smith in paris on monday')
        expect(convert('How to Use the NASA API With Your iPhone', 'sentence')).toBe('How to use the NASA API with your iPhone')
    })

    test('a colon starts a subtitle in a title, not in a sentence that ends with a period', () => {
        expect(convert('Title Case Rules: A Practical Guide', 'sentence')).toBe('Title case rules: A practical guide')
        expect(convert('Late-onset unexplained epilepsy: what are we missing?', 'sentence')).toBe('Late-onset unexplained epilepsy: What are we missing?')
        expect(convert('We need three things: time, money and luck.', 'sentence')).toBe('We need three things: time, money and luck.')
    })

    test('each line of a pasted list is judged on its own', () => {
        expect(convert('Remote Work: A Guide for Small Teams\nwe moved to Berlin: here is why.', 'sentence'))
            .toBe('Remote work: A guide for small teams\nwe moved to Berlin: here is why.')
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

describe('rules checked against the style manuals (2026-10-20)', () => {
    test.each([
        // AP Ask the Editor: "Use the lowercase vs."; MLA prints it lowercase.
        ['title case vs sentence case', 'standard', 'Title Case vs Sentence Case'],
        ['man vs. machine', 'ap', 'Man vs. Machine'],
        // Legal "v." is lowercase; a bare V is a Roman numeral.
        ['brown v. board of education', 'apa', 'Brown v. Board of Education'],
        ['henry v and the battle of agincourt', 'standard', 'Henry V and the Battle of Agincourt'],
        // "So" is an adverb unless it joins clauses after a comma.
        ['why so many titles fail', 'apa', 'Why So Many Titles Fail'],
        ['not so fast', 'mla', 'Not So Fast'],
        ['i was tired, so i left early', 'mla', 'I Was Tired, so I Left Early'],
        // CMOS 8.160 lowercases only and, but, for, or, nor, plus "as" in any role.
        ['small yet powerful tools', 'chicago', 'Small Yet Powerful Tools'],
        ['small yet powerful tools', 'apa', 'Small yet Powerful Tools'],
        ['the artist as critic', 'chicago', 'The Artist as Critic'],
        // A preposition that opens a clause is a subordinating conjunction.
        ['wait until we meet again', 'mla', 'Wait Until We Meet Again'],
        ['coming after you again', 'mla', 'Coming after You Again'],
        ['life as i find it', 'mla', 'Life As I Find It'],
        ['the artist as critic', 'mla', 'The Artist as Critic'],
        ['life as i find it', 'chicago', 'Life as I Find It'],
        // A preposition with no object is an adverb.
        ['freedom from, freedom to', 'mla', 'Freedom From, Freedom To'],
        ['where are you from, really', 'chicago', 'Where Are You From, Really'],
        // MLA lowercases multiword prepositions; Chicago caps the participle.
        ['the world according to garp', 'mla', 'The World according to Garp'],
        ['the world according to garp', 'chicago', 'The World According to Garp'],
        // APA lowercases "short conjunctions (e.g., ... if ...)"; AP capitalizes
        // conjunctions of four or more letters. Chicago and MLA cap every
        // subordinating conjunction.
        ['what to do if it rains', 'ap', 'What to Do if It Rains'],
        ['what to do if it rains', 'apa', 'What to Do if It Rains'],
        ['what to do if it rains', 'chicago', 'What to Do If It Rains'],
        ['what to do if it rains', 'mla', 'What to Do If It Rains'],
        ['what to do if it rains', 'standard', 'What to Do If It Rains'],
        ['if you asked me to', 'apa', 'If You Asked Me To'],
        ['as if', 'ap', 'As If'],
        ['life: if only', 'apa', 'Life: If Only'],
        // Inside a compound "if" is a noun, not a conjunction.
        ['the what-if scenario', 'ap', 'The What-If Scenario'],
    ] as const)('%s (%s)', (input, style, expected) => {
        expect(title(input, style)).toBe(expected)
    })
})
