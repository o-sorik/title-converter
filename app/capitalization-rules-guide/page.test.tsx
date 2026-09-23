import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"

import CapitalizationRulesGuidePage from "./page"

async function render(searchParams: Record<string, string> = {}) {
  const page = await CapitalizationRulesGuidePage({ searchParams: Promise.resolve(searchParams) })
  return renderToStaticMarkup(page)
}

test("follows the approved heading vector in order", async () => {
  const html = await render()
  const headings = [...html.matchAll(/<h([1-4])[^>]*>(.*?)<\/h\1>/g)].map((match) =>
    match[2].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'")
  )

  expect(headings[0]).toBe("Title Capitalization Rules by Style Guide")
  const expectedOrder = [
    "What every style guide capitalizes",
    "Where the style guides disagree, word by word",
    "Which small words does each style lowercase?",
    "What happens at the edges of a title?",
    "How are compounds and brand names treated?",
    "The four style guides in detail",
    "AP news headlines switch to sentence case",
    "All five heading levels use title case",
    "From rule to converted title",
    "How does the converter decide each word?",
    "Questions writers ask about title capitalization",
  ]
  const positions = expectedOrder.map((heading) => headings.indexOf(heading))
  expect(positions.every((position) => position > 0), JSON.stringify(headings)).toBe(true)
  expect([...positions].sort((a, b) => a - b)).toEqual(positions)
})

test("links to the pages the brief bridges to, and not into the is-X series", async () => {
  const html = await render()

  for (const href of [
    "/blog/what-words-are-not-capitalized-in-a-title",
    "/blog/to-capitalized-in-title-case",
    "/blog/do-you-capitalize-after-a-colon",
    "/blog/ap-title-capitalization-basics",
    "/blog/apa-7-title-case-guide",
    "/blog/apa-citing-titles",
    "/blog/apa-heading-levels",
    "/blog/mla-vs-apa-headlines",
    "/blog/chicago-title-case",
    "/blog/sentence-vs-title-case",
    "/sentence-case-converter",
    "/batch-checker",
  ]) {
    expect(html, href).toContain(`href="${href}"`)
  }
  expect(html).toContain(">title capitalization tool</a>")
  expect(html).not.toContain("Popular Capitalization Questions")
  expect(html).not.toMatch(/href="\/blog\/is-[a-z-]+-capitalized"/)
})

test("highlights the style the visitor arrived with", async () => {
  const html = await render({ style: "ap", mode: "title" })

  expect(html).toContain("Highlighting <span")
  expect(html).toContain("Gone With the Wind")
})

test("shows clear return action to converter based on mode context", async () => {
  const html = await render({ style: "mla", mode: "sentence" })

  expect(html).toContain('href="/sentence-case-converter"')
  expect(html).toContain("Return to Sentence Case Converter")
})

test("uses safe fallback return link when mode route is unsupported", async () => {
  const html = await render({ style: "ap", mode: "inverse" })

  expect(html).toContain('href="/"')
  expect(html).toContain("Return to Title Case Converter")
})

test("shows explicit fallback notice when unsupported style param is provided", async () => {
  const html = await render({ style: "not-a-style", mode: "title" })

  expect(html).toContain("Unsupported style parameter detected")
  expect(html).toContain("Showing Standard guidance for safety")
  expect(html).not.toContain("Highlighting <span")
})

test("keeps converter context in return link for round-trip continuity", async () => {
  const html = await render({
    style: "ap",
    mode: "title",
    ctx_input: "walking during the light",
    ctx_mode: "title",
    ctx_style: "ap",
  })

  expect(html).toContain('href="/?ctx_ref=latest')
  expect(html).toContain("ctx_mode=title")
  expect(html).toContain("ctx_style=ap")
  // The return link names the storage ref; the text itself is restored from
  // sessionStorage, so it is never echoed back into the markup or the URL.
  expect(html).not.toContain("ctx_input=walking")
  expect(html).not.toContain("walking+during+the+light")
})
