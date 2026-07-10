import { expect, test } from 'vitest'
import { convert } from './converters'
import type { ConversionType } from './converters'

test('converts to title case', () => {
    expect(convert('hello world', 'title')).toBe('Hello World')
    expect(convert('the catcher in the rye', 'title')).toBe('The Catcher in the Rye')
    expect(convert('GIVE IN TO ME', 'title')).toBe('Give in to Me')
})

test('supports AP-style title case differences', () => {
    expect(convert('walking during the light', 'title', { titleStyle: 'standard' })).toBe('Walking during the Light')
    expect(convert('walking during the light', 'title', { titleStyle: 'ap' })).toBe('Walking During the Light')
})

test('capitalizes 4-letter prepositions in ap and apa styles', () => {
    expect(convert('walking into the light', 'title', { titleStyle: 'ap' })).toBe('Walking Into the Light')
    expect(convert('walking into the light', 'title', { titleStyle: 'apa' })).toBe('Walking Into the Light')
    expect(convert('dancing with wolves', 'title', { titleStyle: 'ap' })).toBe('Dancing With Wolves')
})

test('updates title output when switching style contexts for the same input', () => {
    const input = 'walking during the light'

    const standard = convert(input, 'title', { titleStyle: 'standard' })
    const ap = convert(input, 'title', { titleStyle: 'ap' })
    const chicago = convert(input, 'title', { titleStyle: 'chicago' })
    const mla = convert(input, 'title', { titleStyle: 'mla' })
    const apa = convert(input, 'title', { titleStyle: 'apa' })

    expect(standard).toBe('Walking during the Light')
    expect(ap).toBe('Walking During the Light')
    expect(chicago).toBe('Walking During the Light')
    expect(mla).toBe('Walking during the Light')
    expect(apa).toBe('Walking During the Light')
})

test('chicago capitalizes 5+ letter prepositions but keeps 4-letter ones lowercase (18th ed.)', () => {
    expect(convert('all about eve', 'title', { titleStyle: 'chicago' })).toBe('All About Eve')
    expect(convert('a room with a view', 'title', { titleStyle: 'chicago' })).toBe('A Room with a View')
    expect(convert('walking into the light', 'title', { titleStyle: 'chicago' })).toBe('Walking into the Light')
})

test('mla keeps prepositions lowercase regardless of length', () => {
    expect(convert('walking during the light', 'title', { titleStyle: 'mla' })).toBe('Walking during the Light')
    expect(convert('dancing with wolves', 'title', { titleStyle: 'mla' })).toBe('Dancing with Wolves')
})

test('capitalizes first word after colon', () => {
    expect(convert('content rules: how to scale', 'title')).toBe('Content Rules: How to Scale')
})

test('handles common hyphenated compounds', () => {
    expect(convert('state-of-the-art design system', 'title')).toBe('State-of-the-Art Design System')
})

test('handles phrasal verb particles', () => {
    expect(convert('how to turn on notifications', 'title')).toBe('How to Turn On Notifications')
    expect(convert('please log in to continue', 'title')).toBe('Please Log In to Continue')
})

test('capitalizes adverbial particles after verb-like words', () => {
    expect(convert('how to zoom in quickly', 'title')).toBe('How to Zoom In Quickly')
    expect(convert('walk through the process', 'title')).toBe('Walk Through the Process')
})

test('capitalizes first element in hyphenated compounds', () => {
    expect(convert('an up-to-date guide', 'title')).toBe('An Up-to-Date Guide')
})

test('style thresholds apply inside hyphenated compounds', () => {
    expect(convert('a walk-through guide', 'title', { titleStyle: 'ap' })).toBe('A Walk-Through Guide')
    expect(convert('a walk-through guide', 'title', { titleStyle: 'chicago' })).toBe('A Walk-Through Guide')
    expect(convert('a walk-through guide', 'title', { titleStyle: 'mla' })).toBe('A Walk-through Guide')
})

test('preserves acronym and custom casing', () => {
    expect(convert('working with API data', 'title')).toBe('Working with API Data')
    expect(convert('iphone and eBay strategy', 'title')).toBe('Iphone and eBay Strategy')
})

test('converts to sentence case', () => {
    expect(convert('hello world', 'sentence')).toBe('Hello world')
    expect(convert('HELLO WORLD', 'sentence')).toBe('Hello world')
})

test('converts to upper and lower case for baseline mode set', () => {
    expect(convert('Hello World', 'upper')).toBe('HELLO WORLD')
    expect(convert('Hello World', 'lower')).toBe('hello world')
})

test('produces expected deterministic outputs for baseline mode conversions', () => {
    const input = 'Hello WORLD'

    expect(convert(input, 'title')).toBe('Hello World')
    expect(convert(input, 'sentence')).toBe('Hello world')
    expect(convert(input, 'upper')).toBe('HELLO WORLD')
    expect(convert(input, 'lower')).toBe('hello world')
})

test('is deterministic across repeated conversion calls with identical input and settings', () => {
    const input = 'repeatable headline for qa'

    const firstRun = convert(input, 'title', { titleStyle: 'apa' })
    const secondRun = convert(input, 'title', { titleStyle: 'apa' })
    const thirdRun = convert(input, 'title', { titleStyle: 'apa' })

    expect(firstRun).toBe('Repeatable Headline for Qa')
    expect(secondRun).toBe(firstRun)
    expect(thirdRun).toBe(firstRun)
})

test('converts to camel case', () => {
    expect(convert('hello world', 'camel')).toBe('helloWorld')
    expect(convert('Hello World', 'camel')).toBe('helloWorld')
    expect(convert('hello_world', 'camel')).toBe('helloWorld')
})

test('converts to pascal case', () => {
    expect(convert('hello world', 'pascal')).toBe('HelloWorld')
})

test('converts to snake case', () => {
    expect(convert('hello world', 'snake')).toBe('hello_world')
})

test('supports unicode in title case', () => {
    expect(convert('привіт світ', 'title')).toBe('Привіт Світ')
    expect(convert('working with café data', 'title')).toBe('Working with Café Data')
})

test('capitalizes apostrophe names correctly in title case', () => {
    expect(convert("o'neill and d'artagnan", 'title')).toBe("O'Neill and D'Artagnan")
})

test('handles mixedCase input for identifier formats', () => {
    expect(convert('helloWorld testCase', 'snake')).toBe('hello_world_test_case')
    expect(convert('helloWorld testCase', 'kebab')).toBe('hello-world-test-case')
    expect(convert('hello_world test-case', 'camel')).toBe('helloWorldTestCase')
})

test('preserves acronym-like tokens in sentence mode when context is mixed', () => {
    expect(convert('NASA and USA mission. API works.', 'sentence')).toBe('NASA and USA mission. API works.')
})

test('preserves dotted acronyms', () => {
    expect(convert('learning from the U.S.A. style guide', 'title')).toBe('Learning from the U.S.A. Style Guide')
    expect(convert('we follow U.S.A. standards. api stays stable.', 'sentence')).toBe('We follow U.S.A. standards. API stays stable.')
})

test('handles sentence boundaries with quotes and parentheses', () => {
    expect(convert('he said "HELLO." then LEFT.', 'sentence')).toBe('He said "hello." Then left.')
    expect(convert('(what IS this?) YES it is.', 'sentence')).toBe('(What is this?) Yes it is.')
})

// --- Contractions ---

test('handles contractions correctly in title case', () => {
    expect(convert("don't stop the music", 'title')).toBe("Don't Stop the Music")
    expect(convert("it's a wonderful life", 'title')).toBe("It's a Wonderful Life")
    expect(convert("we'll always have paris", 'title')).toBe("We'll Always Have Paris")
    expect(convert("they're not ready yet", 'title')).toBe("They're Not Ready Yet")
    expect(convert("i've been waiting", 'title')).toBe("I've Been Waiting")
    expect(convert("she'd rather stay", 'title')).toBe("She'd Rather Stay")
    expect(convert("can't stop won't stop", 'title')).toBe("Can't Stop Won't Stop")
})

test('handles contractions in sentence case', () => {
    expect(convert("DON'T STOP THE MUSIC", 'sentence')).toBe("Don't stop the music")
    expect(convert("IT'S A WONDERFUL LIFE", 'sentence')).toBe("It's a wonderful life")
})

test('preserves apostrophe names alongside contractions', () => {
    expect(convert("o'neill can't believe it", 'title')).toBe("O'Neill Can't Believe It")
    expect(convert("d'artagnan won't surrender", 'title')).toBe("D'Artagnan Won't Surrender")
})

// --- Possessives ---

test('handles possessives correctly in title case', () => {
    expect(convert("john's greatest adventure", 'title')).toBe("John's Greatest Adventure")
    expect(convert("the company's new strategy", 'title')).toBe("The Company's New Strategy")
})

test('handles possessives in sentence case', () => {
    expect(convert("JOHN'S GREATEST ADVENTURE", 'sentence')).toBe("John's greatest adventure")
})

// --- Ordinals and numbers ---

test('does not uppercase ordinals in title case', () => {
    expect(convert('the 3rd annual report', 'title')).toBe('The 3rd Annual Report')
    expect(convert('21st century solutions', 'title')).toBe('21st Century Solutions')
    expect(convert('the 1st and 2nd place winners', 'title')).toBe('The 1st and 2nd Place Winners')
})

test('preserves already-uppercase alphanumeric acronyms', () => {
    expect(convert('B2B marketing strategy', 'title')).toBe('B2B Marketing Strategy')
    expect(convert('using S3 and EC2 on AWS', 'title')).toBe('Using S3 and EC2 on AWS')
})

test('does not force-uppercase letter-digit-letter words', () => {
    expect(convert('the h2o molecule', 'title')).toBe('The H2o Molecule')
})

// --- New acronyms ---

test('preserves newly added acronyms in title case', () => {
    expect(convert('fbi and cia report', 'title')).toBe('FBI and CIA Report')
    expect(convert('a guide for the ceo and cto', 'title')).toBe('A Guide for the CEO and CTO')
    expect(convert('deploying to aws with sdk', 'title')).toBe('Deploying to AWS with SDK')
    expect(convert('dns and vpn configuration', 'title')).toBe('DNS and VPN Configuration')
    expect(convert('tracking roi and kpi metrics', 'title')).toBe('Tracking ROI and KPI Metrics')
})

test('preserves newly added acronyms in sentence case', () => {
    expect(convert('the fbi investigation', 'sentence')).toBe('The FBI investigation')
    expect(convert('ask the ceo about roi', 'sentence')).toBe('Ask the CEO about ROI')
})

// --- Alternating case ---

test('converts to alternating case', () => {
    expect(convert('hello world', 'alternating')).toBe('hElLo wOrLd')
    expect(convert('Hello World', 'alternating')).toBe('hElLo wOrLd')
    expect(convert('HELLO', 'alternating')).toBe('hElLo')
})

test('alternating case includes spaces in character index', () => {
    expect(convert('ab cd', 'alternating')).toBe('aB Cd')
})

// --- Inverse case ---

test('converts to inverse case', () => {
    expect(convert('Hello World', 'inverse')).toBe('hELLO wORLD')
    expect(convert('hello world', 'inverse')).toBe('HELLO WORLD')
    expect(convert('HELLO WORLD', 'inverse')).toBe('hello world')
})

test('inverse case preserves numbers and flips letters', () => {
    expect(convert('Hello 123 World', 'inverse')).toBe('hELLO 123 wORLD')
})

// --- Empty and whitespace ---

test('handles empty string for all modes', () => {
    const modes: ConversionType[] = ['title', 'upper', 'lower', 'sentence', 'camel', 'pascal', 'snake', 'kebab', 'alternating', 'inverse']
    for (const mode of modes) {
        expect(convert('', mode)).toBe('')
    }
})

test('handles whitespace-only input', () => {
    expect(convert('   ', 'title')).toBe('   ')
    expect(convert('   ', 'upper')).toBe('   ')
    expect(convert('   ', 'lower')).toBe('   ')
    expect(convert('   ', 'sentence')).toBe('   ')
})

// --- Pascal and kebab expanded ---

test('converts various inputs to pascal case', () => {
    expect(convert('hello world', 'pascal')).toBe('HelloWorld')
    expect(convert('Hello World', 'pascal')).toBe('HelloWorld')
    expect(convert('hello_world', 'pascal')).toBe('HelloWorld')
    expect(convert('hello-world', 'pascal')).toBe('HelloWorld')
    expect(convert('helloWorld', 'pascal')).toBe('HelloWorld')
    expect(convert('HELLO WORLD', 'pascal')).toBe('HelloWorld')
})

test('converts various inputs to kebab case', () => {
    expect(convert('hello world', 'kebab')).toBe('hello-world')
    expect(convert('Hello World', 'kebab')).toBe('hello-world')
    expect(convert('hello_world', 'kebab')).toBe('hello-world')
    expect(convert('HELLO WORLD', 'kebab')).toBe('hello-world')
    expect(convert('helloWorld', 'kebab')).toBe('hello-world')
})

// --- Multiple consecutive spaces ---

test('preserves multiple consecutive spaces in title case', () => {
    expect(convert('hello  world', 'title')).toBe('Hello  World')
    expect(convert('hello   world', 'title')).toBe('Hello   World')
})

test('preserves multiple consecutive spaces in sentence case', () => {
    expect(convert('HELLO  WORLD', 'sentence')).toBe('Hello  world')
})

// --- Parentheses and quotes ---

test('handles parenthesized text in title case', () => {
    expect(convert('(hello world)', 'title')).toBe('(Hello World)')
})

test('handles quoted text in title case', () => {
    expect(convert('"hello world"', 'title')).toBe('"Hello World"')
})

// --- All 5 styles with hyphenated preposition compounds ---

test('all five styles handle hyphenated compounds with prepositions', () => {
    const input = 'a run-through of the plan'
    expect(convert(input, 'title', { titleStyle: 'standard' })).toBe('A Run-through of the Plan')
    expect(convert(input, 'title', { titleStyle: 'ap' })).toBe('A Run-Through of the Plan')
    expect(convert(input, 'title', { titleStyle: 'apa' })).toBe('A Run-Through of the Plan')
    expect(convert(input, 'title', { titleStyle: 'mla' })).toBe('A Run-through of the Plan')
    expect(convert(input, 'title', { titleStyle: 'chicago' })).toBe('A Run-Through of the Plan')
})
