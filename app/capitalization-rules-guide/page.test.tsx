import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"

import CapitalizationRulesGuidePage from "./page"

test("renders style-relevant edge-case examples for selected style", async () => {
  const page = await CapitalizationRulesGuidePage({
    searchParams: Promise.resolve({ style: "ap", mode: "title" }),
  })
  const html = renderToStaticMarkup(page)

  expect(html).toContain("Edge-case guidance")
  expect(html).toContain("AP style guidance")
  expect(html).toContain("Walking During the Light")
})

test("shows clear return action to converter based on mode context", async () => {
  const page = await CapitalizationRulesGuidePage({
    searchParams: Promise.resolve({ style: "mla", mode: "sentence" }),
  })
  const html = renderToStaticMarkup(page)

  expect(html).toContain("Next Action")
  expect(html).toContain('href="/sentence-case-converter"')
  expect(html).toContain("Return to converter")
})

test("uses safe fallback return link when mode route is unsupported", async () => {
  const page = await CapitalizationRulesGuidePage({
    searchParams: Promise.resolve({ style: "ap", mode: "inverse" }),
  })
  const html = renderToStaticMarkup(page)

  expect(html).toContain('href="/"')
  expect(html).toContain("Return to Title Case Converter")
})
