import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { TextConverter } from "./text-converter"

function extractModeControlsMarkup(html: string): string {
  const match = html.match(/data-testid="mode-controls"[\s\S]*?<\/div>/)
  return match?.[0] ?? ""
}

function extractStyleControlsMarkup(html: string): string {
  const match = html.match(/data-testid="style-controls"[\s\S]*?<\/div>/)
  return match?.[0] ?? ""
}

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
  const modeControls = extractModeControlsMarkup(html)

  const activeCount = (modeControls.match(/aria-pressed="true"/g) ?? []).length
  expect(activeCount).toBe(1)
  expect(modeControls).toContain(`data-active="true"`)
  expect(html).toContain(outputLabel)
  expect(html).toContain(expectedOutput)
})

test("mode controls expose keyboard-friendly toggle semantics", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)
  const modeControls = extractModeControlsMarkup(html)

  expect(html).toContain('aria-label="Mode Controls"')
  expect((modeControls.match(/aria-pressed="/g) ?? []).length).toBe(10)
  expect(html).toContain('data-testid="convert-action"')
  expect(html).toContain(">Convert<")
})

test("style controls expose active style state and show expected options in title mode", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)
  const styleControls = extractStyleControlsMarkup(html)

  expect(html).toContain("Title Style")
  expect(html).toContain(">Standard<")
  expect(html).toContain(">AP<")
  expect(html).toContain(">Chicago<")
  expect(html).toContain(">MLA<")
  expect(html).toContain(">APA<")
  expect(styleControls).toContain('role="tablist"')
  expect((styleControls.match(/role="tab"/g) ?? []).length).toBe(5)
  expect((styleControls.match(/data-active="true"/g) ?? []).length).toBe(1)
})

test("style selection updates title output for the same input", () => {
  const standardHtml = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="walking during the light" initialTitleStyle="standard" />
  )
  const apHtml = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="walking during the light" initialTitleStyle="ap" />
  )

  expect(standardHtml).toContain("Walking during the Light")
  expect(apHtml).toContain("Walking During the Light")
})
