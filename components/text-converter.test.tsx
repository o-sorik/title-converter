import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { TextConverter } from "./text-converter"

test("renders converter workspace shell with required zones", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)

  expect(html).toContain('data-testid="converter-workspace"')
  expect(html).toContain('data-testid="mode-controls"')
  expect(html).toContain('data-testid="input-zone"')
  expect(html).toContain('data-testid="output-zone"')
  expect(html).toContain('data-testid="style-controls"')
  expect(html).toContain('id="converter-input"')
  expect(html).toContain('id="converter-output"')
  expect(html).toContain("Input Text")
  expect(html).toContain("Title Style")
})

test("workspace shell remains usable without auth or onboarding copy", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)
  const lowered = html.toLowerCase()

  expect(lowered).not.toContain("sign in")
  expect(lowered).not.toContain("log in")
  expect(lowered).not.toContain("create account")
  expect(lowered).not.toContain("onboarding")
  expect(lowered).toContain("input text")
  expect(lowered).toContain("title style")
})

test.each([
  { mode: "title", outputLabel: "Title Case output", expectedOutput: "Hello World" },
  { mode: "sentence", outputLabel: "Sentence case output", expectedOutput: "Hello world" },
  { mode: "upper", outputLabel: "UPPER CASE output", expectedOutput: "HELLO WORLD" },
  { mode: "lower", outputLabel: "lower case output", expectedOutput: "hello world" },
] as const)("sets visible active mode state and matching output for $mode", ({ mode, outputLabel, expectedOutput }) => {
  const html = renderToStaticMarkup(<TextConverter defaultMode={mode} initialInput="hello world" />)

  const activeCount = (html.match(/aria-pressed="true"/g) ?? []).length
  expect(activeCount).toBe(1)
  expect(html).toContain(`data-active="true"`)
  expect(html).toContain(outputLabel)
  expect(html).toContain(expectedOutput)
})

test("mode controls expose keyboard-friendly toggle semantics", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)

  expect(html).toContain('aria-label="Mode Controls"')
  expect((html.match(/aria-pressed="/g) ?? []).length).toBe(10)
})
