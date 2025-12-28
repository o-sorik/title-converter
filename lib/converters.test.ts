import { expect, test } from 'vitest'
import { convert } from './converters'

test('converts to title case', () => {
    expect(convert('hello world', 'title')).toBe('Hello World')
    expect(convert('the catcher in the rye', 'title')).toBe('The Catcher in the Rye')
    expect(convert('GIVE IN TO ME', 'title')).toBe('Give in to Me')
})

test('converts to sentence case', () => {
    expect(convert('hello world', 'sentence')).toBe('Hello world')
    expect(convert('HELLO WORLD', 'sentence')).toBe('Hello world')
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
