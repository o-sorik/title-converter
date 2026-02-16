import { expect, test } from 'vitest'
import { convert } from './converters'

test('converts to title case', () => {
    expect(convert('hello world', 'title')).toBe('Hello World')
    expect(convert('the catcher in the rye', 'title')).toBe('The Catcher in the Rye')
    expect(convert('GIVE IN TO ME', 'title')).toBe('Give in to Me')
})

test('supports AP-style title case differences', () => {
    expect(convert('walking during the light', 'title', { titleStyle: 'standard' })).toBe('Walking during the Light')
    expect(convert('walking during the light', 'title', { titleStyle: 'ap' })).toBe('Walking During the Light')
})

test('supports APA-style differences for 4+ letter prepositions', () => {
    expect(convert('walking into the light', 'title', { titleStyle: 'ap' })).toBe('Walking into the Light')
    expect(convert('walking into the light', 'title', { titleStyle: 'apa' })).toBe('Walking Into the Light')
})

test('keeps long prepositions lowercase in chicago and mla styles', () => {
    expect(convert('walking during the light', 'title', { titleStyle: 'chicago' })).toBe('Walking during the Light')
    expect(convert('walking during the light', 'title', { titleStyle: 'mla' })).toBe('Walking during the Light')
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

test('ap vs chicago differences inside hyphenated compounds', () => {
    expect(convert('a walk-through guide', 'title', { titleStyle: 'ap' })).toBe('A Walk-Through Guide')
    expect(convert('a walk-through guide', 'title', { titleStyle: 'chicago' })).toBe('A Walk-through Guide')
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
