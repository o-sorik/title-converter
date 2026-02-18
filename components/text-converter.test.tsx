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

function extractCopyActionMarkup(html: string): string {
  const match = html.match(/<button[^>]*data-testid="copy-action"[^>]*>/)
  return match?.[0] ?? ""
}

function extractStyleRulesEntryMarkup(html: string): string {
  const match = html.match(/data-testid="style-rules-entry"[\s\S]*?<\/div>/)
  return match?.[0] ?? ""
}

function extractOutputRulesEntryMarkup(html: string): string {
  const match = html.match(/data-testid="output-rules-entry"[\s\S]*?<\/div>/)
  return match?.[0] ?? ""
}

test("renders converter workspace shell with required zones", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)

  expect(html).toContain('data-testid="converter-workspace"')
  expect(html).toContain('data-testid="mode-controls"')
  expect(html).toContain('data-testid="input-zone"')
  expect(html).toContain('data-testid="output-zone"')
  expect(html).toContain('data-testid="style-controls"')
  expect(html).toContain('data-testid="editorial-qa-workflow"')
  expect(html).toContain('data-testid="run-editorial-qa"')
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
  expect(html).toContain('aria-keyshortcuts="Control+Enter Meta+Enter"')
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

test("shows editorial QA standard context for current mode and style", () => {
  const titleHtml = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialTitleStyle="ap" />
  )
  const sentenceHtml = renderToStaticMarkup(
    <TextConverter defaultMode="sentence" />
  )

  expect(titleHtml).toContain("Editorial QA Workflow")
  expect(titleHtml).toContain("Current standard: Title Case")
  expect(titleHtml).toContain("(AP)")
  expect(sentenceHtml).toContain("Current standard: Sentence case")
})

test("shows style-contextual guidance entry points in title mode", () => {
  const html = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="walking during the light" initialTitleStyle="ap" />
  )
  const styleRulesEntry = extractStyleRulesEntryMarkup(html)
  const outputRulesEntry = extractOutputRulesEntryMarkup(html)

  expect(html).toContain('data-testid="style-rules-entry"')
  expect(html).toContain('data-testid="output-rules-entry"')
  expect(styleRulesEntry).toContain("AP rules")
  expect(outputRulesEntry).toContain("AP rules")
  expect(styleRulesEntry).toContain('href="/capitalization-rules-guide?mode=title&amp;style=ap&amp;ctx_ref=latest')
  expect(outputRulesEntry).toContain('href="/capitalization-rules-guide?mode=title&amp;style=ap&amp;ctx_ref=latest')
  expect(styleRulesEntry).toContain("ctx_mode=title")
  expect(styleRulesEntry).toContain("ctx_style=ap")
  expect(styleRulesEntry).toContain("ctx_output_mode=title")
})

test("keeps non-title guidance visible without style-specific claims", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="sentence" initialInput="hello world" />)
  const outputRulesEntry = extractOutputRulesEntryMarkup(html)

  expect(html).not.toContain('data-testid="style-rules-entry"')
  expect(html).toContain('data-testid="output-rules-entry"')
  expect(outputRulesEntry).toContain("Rules guide")
  expect(outputRulesEntry).toContain('href="/capitalization-rules-guide?mode=sentence&amp;ctx_ref=latest')
  expect(outputRulesEntry).toContain("ctx_mode=sentence")
  expect(outputRulesEntry).not.toContain("AP rules")
  expect(outputRulesEntry).not.toContain("APA rules")
  expect(outputRulesEntry).not.toContain("MLA rules")
  expect(outputRulesEntry).not.toContain("Chicago rules")
})

test("updates guidance href and labels deterministically across style/mode contexts", () => {
  const apTitleHtml = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="walking during the light" initialTitleStyle="ap" />
  )
  const chicagoTitleHtml = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="walking during the light" initialTitleStyle="chicago" />
  )
  const sentenceHtml = renderToStaticMarkup(
    <TextConverter defaultMode="sentence" initialInput="walking during the light" initialTitleStyle="ap" />
  )

  expect(apTitleHtml).toContain("AP rules")
  expect(apTitleHtml).toContain('href="/capitalization-rules-guide?mode=title&amp;style=ap&amp;ctx_ref=latest')
  expect(chicagoTitleHtml).toContain("Chicago rules")
  expect(chicagoTitleHtml).toContain('href="/capitalization-rules-guide?mode=title&amp;style=chicago&amp;ctx_ref=latest')
  expect(sentenceHtml).toContain("Rules guide")
  expect(sentenceHtml).toContain('href="/capitalization-rules-guide?mode=sentence&amp;ctx_ref=latest')
})

test("shows explicit accessible copy feedback text when output is unavailable", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)
  const copyAction = extractCopyActionMarkup(html)

  expect(html).toContain('data-testid="copy-feedback"')
  expect(html).toContain('role="status"')
  expect(html).toContain('aria-live="polite"')
  expect(html).toContain("Convert text to enable copy.")
  expect(copyAction).toContain('disabled=""')
})

test("enables copy action and shows ready feedback when output exists", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" initialInput="hello world" />)
  const copyAction = extractCopyActionMarkup(html)

  expect(html).toContain("Copy result to clipboard.")
  expect(copyAction).toContain('title="Copy Result"')
  expect(copyAction).not.toContain('disabled=""')
})

test("provides semantic labels for icon controls and textareas", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" initialInput="hello world" />)

  expect(html).toContain('aria-label="Paste from clipboard"')
  expect(html).toContain('aria-label="Clear input"')
  expect(html).toContain('aria-label="Copy output"')
  expect(html).toContain('aria-label="Input text"')
  expect(html).toContain('aria-label="Converted output"')
})

test("includes helper/status relationships and responsive textarea sizing", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)

  expect(html).toContain('id="converter-input-helper"')
  expect(html).toContain('aria-describedby="converter-input-helper"')
  expect(html).toContain('aria-describedby="copy-feedback"')
  expect(html).toContain('min-h-[200px] md:min-h-[260px]')
})

test("shows matched Grammar 101 continuity link for high-intent capitalization query input", () => {
  const html = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="is and capitalized" initialTitleStyle="ap" />
  )

  expect(html).toContain('data-testid="converter-content-continuity"')
  expect(html).toContain("Open matching Grammar 101 answer")
  expect(html).toContain('href="/blog/and-capitalized-in-title-case?')
  expect(html).toContain("ctx_mode=title")
  expect(html).toContain("ctx_style=ap")
  expect(html).toContain("ctx_input=is+and+capitalized")
})

test("shows Grammar 101 browse fallback when converter input does not match high-intent pattern", () => {
  const html = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="how to improve headline quality" />
  )

  expect(html).toContain('data-testid="converter-content-continuity"')
  expect(html).toContain("Browse Grammar 101 questions")
  expect(html).toContain('href="/blog/categories/grammar-101"')
})

test("uses current selected mode in continuity context even when snapshot output is stale", () => {
  const html = renderToStaticMarkup(
    <TextConverter
      defaultMode="sentence"
      initialInput="is and capitalized"
      initialOutputMode="title"
      initialOutputTitleStyle="ap"
      initialTitleStyle="chicago"
    />
  )

  expect(html).toContain('href="/blog/and-capitalized-in-title-case?')
  expect(html).toContain("ctx_mode=sentence")
  expect(html).toContain("ctx_style=chicago")
  expect(html).toContain("ctx_output_mode=sentence")
  expect(html).toContain("ctx_output_style=chicago")
  expect(html).not.toContain("ctx_output_mode=title")
})
