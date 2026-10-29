import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { TextConverter } from "./text-converter"

function extractOutputRegion(html: string): string {
  return html.match(/<div[^>]*id="converter-output"[\s\S]*?<\/div>/)?.[0] ?? ""
}

/**
 * The output is rendered word by word so each word can carry its rule, so its
 * text is not one contiguous string in the markup. Strip the tags to assert on
 * what the user actually reads.
 */
function extractOutputText(html: string): string {
  return extractOutputRegion(html)
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
}

function extractStyleControlsMarkup(html: string): string {
  const match = html.match(/data-testid="style-controls"[\s\S]*?<\/div>/)
  return match?.[0] ?? ""
}

function extractModeSelectMarkup(html: string): string {
  return html.match(/<select[^>]*data-testid="mode-controls"[\s\S]*?<\/select>/)?.[0] ?? ""
}

function extractCopyActionMarkup(html: string): string {
  return html.match(/<button[^>]*data-testid="copy-action"[\s\S]*?<\/button>/)?.[0] ?? ""
}

function extractOutputRulesEntryMarkup(html: string): string {
  return html.match(/data-testid="output-rules-entry"[\s\S]*?<\/div>/)?.[0] ?? ""
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
  expect(html).toContain("Which style guide?")
  expect(html).toContain('href="/batch-checker"')
})

test("workspace shell remains usable without auth or onboarding copy", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)
  const lowered = html.toLowerCase()

  expect(lowered).not.toContain("sign in")
  expect(lowered).not.toContain("log in")
  expect(lowered).not.toContain("create account")
  expect(lowered).not.toContain("onboarding")
  expect(lowered).toContain("which style guide?")
})

test.each([
  { mode: "title", outputLabel: "Standard title case", expectedOutput: "Hello World" },
  { mode: "sentence", outputLabel: "Sentence case", expectedOutput: "Hello world" },
  { mode: "upper", outputLabel: "UPPER CASE", expectedOutput: "HELLO WORLD" },
  { mode: "lower", outputLabel: "lower case", expectedOutput: "hello world" },
] as const)("selects the active mode and shows the matching output for $mode", ({ mode, outputLabel, expectedOutput }) => {
  const html = renderToStaticMarkup(<TextConverter defaultMode={mode} initialInput="hello world" />)
  const modeSelect = extractModeSelectMarkup(html)

  expect((modeSelect.match(/selected=""/g) ?? []).length).toBe(1)
  expect(modeSelect).toMatch(new RegExp(`<option value="${mode}" selected=""`))
  expect(html).toContain(`id="converter-output-label" class="text-sm font-medium text-muted-foreground">${outputLabel}<`)
  expect(extractOutputText(html)).toBe(expectedOutput)
})

test("preserves whitespace-only output for modes whose engine preserves whitespace", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" initialInput="   " />)
  const outputRegion = extractOutputRegion(html)

  expect(outputRegion).toContain('aria-label="Converted output"')
  expect(outputRegion).toContain('aria-readonly="true"')
  expect(outputRegion).toContain("   ")
  expect(extractOutputText(html)).not.toContain("Appear")
})

test("the empty-output placeholder previews the active mode", () => {
  const placeholder = (mode: "title" | "sentence" | "kebab") =>
    extractOutputText(renderToStaticMarkup(<TextConverter defaultMode={mode} />)).trim()
  expect(placeholder("title")).toBe("Result Will Appear Here...")
  expect(placeholder("sentence")).toBe("Result will appear here...")
  expect(placeholder("kebab")).toBe("result-will-appear-here")
})

test("marks changed words inline in the output with the rule that moved them", () => {
  const html = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="A Guide To Better Writing" />
  )

  // "To" is lowered by the infinitive rule and must be marked as a change.
  expect(html).toContain('data-change="lowercased"')
  expect(html).toMatch(/<mark[^>]*data-change="lowercased"[^>]*>to<\/mark>/)
  // The rule travels with the mark so hovering explains the change.
  expect(html).toMatch(/<mark[^>]*title="[^"]+"/)
})

test("explains every word of the result, including the ones that did not move", () => {
  const html = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="A Guide About Writing" initialTitleStyle="apa" />
  )

  expect(html).toContain('data-testid="rule-notes"')
  expect(html).toContain("Why each word looks this way")
  // "About" is already correct, yet the APA rule that keeps it capitalized is shown.
  expect(html).toContain("APA style: preposition with 4+ letters")
  expect(html).toMatch(/APA style: preposition with 4\+ letters<\/span><span[^>]*>About</)
})

test("shows the rules only when there is output in a mode that has word rules", () => {
  const withOutput = renderToStaticMarkup(<TextConverter defaultMode="title" initialInput="hello world" />)
  const emptyInput = renderToStaticMarkup(<TextConverter defaultMode="title" />)
  const unsupportedMode = renderToStaticMarkup(<TextConverter defaultMode="camel" initialInput="hello world" />)

  expect(withOutput).toContain('data-testid="explanations-toggle"')
  expect(emptyInput).not.toContain('data-testid="explanations-toggle"')
  expect(unsupportedMode).not.toContain('data-testid="explanations-toggle"')
})

test("slug mode shows the slug, its length, an unchecked stop-word switch and what changed", () => {
  const html = renderToStaticMarkup(
    <TextConverter defaultMode="slug" initialInput="Don't Stop: Café Résumé & 10% Off!" />
  )

  expect(extractOutputRegion(html)).toContain("dont-stop-cafe-resume-and-10-off")
  // The length is shown, never cut.
  expect(html).toContain('data-testid="slug-length">32 characters in the slug<')
  expect(html).toContain('data-testid="stop-words-toggle"')
  expect(html).toMatch(/<input type="checkbox"(?![^>]*checked)[^>]*>/)
  expect(html).toContain('data-testid="slug-notes"')
  expect(html).toContain("What changed in your text")
  expect(html).toContain("Apostrophes are dropped without splitting the word")
  expect(html).toContain("Don&#x27;t → dont")
  expect(html).not.toContain("Why each word looks this way")
})

test("the stop-word switch belongs to slug mode only", () => {
  expect(renderToStaticMarkup(<TextConverter defaultMode="kebab" initialInput="The Cat" />)).not.toContain('data-testid="stop-words-toggle"')
  expect(renderToStaticMarkup(<TextConverter defaultMode="title" initialInput="The Cat" />)).not.toContain('data-testid="stop-words-toggle"')
})

test("mode control lists every case and conversion stays realtime", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)
  const modeSelect = extractModeSelectMarkup(html)

  expect(modeSelect).toContain('aria-label="Conversion mode"')
  expect((modeSelect.match(/<option /g) ?? []).length).toBe(11)
  expect(modeSelect).toContain(">URL Slug<")
  expect(modeSelect).toContain(">kebab-case<")
  // Conversion is realtime – there is no Convert action or shortcut
  expect(html).not.toContain('data-testid="convert-action"')
  expect(html).not.toContain(">Convert<")
  expect(html).not.toContain("aria-keyshortcuts")
})

test("style controls put Standard first, explain it, and expose one checked option", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)
  const styleControls = extractStyleControlsMarkup(html)

  expect(styleControls).toContain('role="radiogroup"')
  expect((styleControls.match(/role="radio"/g) ?? []).length).toBe(5)
  expect((styleControls.match(/aria-checked="true"/g) ?? []).length).toBe(1)
  const labels = [...styleControls.matchAll(/role="radio"[^>]*>([^<]+)</g)].map((m) => m[1])
  expect(labels).toEqual(["Standard (MLA-based)", "AP", "APA", "Chicago", "MLA"])
  expect(html).toContain("Standard follows MLA-style rules: all prepositions lowercase.")
})

test("style selection updates title output for the same input", () => {
  const standardHtml = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="walking during the light" initialTitleStyle="standard" />
  )
  const apHtml = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="walking during the light" initialTitleStyle="ap" />
  )

  expect(extractOutputText(standardHtml)).toBe("Walking during the Light")
  expect(extractOutputText(apHtml)).toBe("Walking During the Light")
})

test("the result and the copy button name the style they follow", () => {
  const html = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="walking during the light" initialTitleStyle="apa" />
  )

  expect(html).toContain(">APA title case<")
  expect(extractCopyActionMarkup(html)).toContain("Copy APA")
  const sentence = renderToStaticMarkup(<TextConverter defaultMode="sentence" initialInput="hello world" />)
  expect(extractCopyActionMarkup(sentence)).toContain(">Copy<")
})

test("shows style-contextual guidance entry point in title mode without duplicates", () => {
  const html = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="walking during the light" initialTitleStyle="ap" />
  )
  const outputRulesEntry = extractOutputRulesEntryMarkup(html)

  expect(html).not.toContain('data-testid="style-rules-entry"')
  expect(html).toContain('data-testid="output-rules-entry"')
  expect(outputRulesEntry).toContain("AP rules")
  expect(outputRulesEntry).toContain('href="/capitalization-rules-guide?mode=title&amp;style=ap&amp;ctx_ref=latest')
  expect(outputRulesEntry).toContain("ctx_mode=title")
  expect(outputRulesEntry).toContain("ctx_style=ap")
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
  expect(html).toContain("Type or paste text to enable copy.")
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

  expect(html).toContain('aria-label="Clear input"')
  expect(html).toContain('aria-label="Copy output"')
  expect(html).toContain('aria-label="Input text"')
  expect(html).toContain('aria-label="Converted output"')
  // Clear only appears once there is something to clear
  expect(renderToStaticMarkup(<TextConverter defaultMode="title" />)).not.toContain('aria-label="Clear input"')
})

test("includes helper/status relationships and a field that starts compact", () => {
  const html = renderToStaticMarkup(<TextConverter defaultMode="title" />)

  expect(html).toContain('id="converter-input-helper"')
  expect(html).toContain('aria-describedby="converter-input-helper"')
  expect(html).toContain('aria-describedby="copy-feedback"')
  expect(html).toContain("min-h-24")
})

test("counts characters and words once, with correct plurals", () => {
  expect(renderToStaticMarkup(<TextConverter defaultMode="title" initialInput="hello" />)).toContain("5 characters · 1 word<")
  expect(renderToStaticMarkup(<TextConverter defaultMode="title" initialInput="a b" />)).toContain("3 characters · 2 words<")
})

test("shows matched Grammar 101 continuity link for high-intent capitalization query input", () => {
  const html = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="is and capitalized" initialTitleStyle="ap" />
  )

  expect(html).toContain('data-testid="converter-content-continuity"')
  expect(html).toContain("See matched answer")
  expect(html).toContain('href="/blog/and-capitalized-in-title-case?')
  expect(html).toContain("ctx_mode=title")
  expect(html).toContain("ctx_style=ap")
  // Whatever sits in the converter box must not reach the server through a
  // prefetched href; sessionStorage carries it across the navigation.
  expect(html).not.toContain("ctx_input")
})

test("shows Grammar 101 browse link when converter input does not match high-intent pattern", () => {
  const html = renderToStaticMarkup(
    <TextConverter defaultMode="title" initialInput="how to improve headline quality" />
  )

  expect(html).toContain('data-testid="converter-content-continuity"')
  expect(html).toContain("Grammar 101")
  expect(html).toContain('href="/blog/categories/grammar-101"')
  // No matched answer link when there is no high-intent match
  expect(html).not.toContain("See matched answer")
})

test("continuity context and output always follow the current selected mode", () => {
  const html = renderToStaticMarkup(
    <TextConverter
      defaultMode="sentence"
      initialInput="is and capitalized"
      initialTitleStyle="chicago"
    />
  )

  expect(html).toContain('href="/blog/and-capitalized-in-title-case?')
  expect(html).toContain("ctx_mode=sentence")
  expect(html).toContain("ctx_style=chicago")
  expect(html).not.toContain("ctx_output_mode")
  // Realtime: output renders immediately in the selected mode, no stale state
  expect(html).toContain(">Sentence case<")
  expect(extractOutputText(html)).toBe("Is and capitalized")
  expect(html).not.toContain("Settings changed")
})

test("AP points news headlines to sentence case, other styles do not", () => {
  const ap = renderToStaticMarkup(<TextConverter defaultMode="title" initialTitleStyle="ap" />)
  const hint = (ap.match(/data-testid="ap-headline-hint"[\s\S]*?<\/span>/)?.[0] ?? "").replace(/<[^>]+>/g, "")
  expect(hint).toContain("AP news headlines use")
  expect(hint).toContain("sentence case")

  const chicago = renderToStaticMarkup(<TextConverter defaultMode="title" initialTitleStyle="chicago" />)
  expect(chicago).not.toContain('data-testid="ap-headline-hint"')
})
