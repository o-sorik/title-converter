import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"

import ConverterPage from "@/app/[slug]/page"

async function renderSentencePage() {
  return renderToStaticMarkup(await ConverterPage({ params: Promise.resolve({ slug: "sentence-case-converter" }) }))
}

test("follows the approved heading vector in order", async () => {
  const html = await renderSentencePage()
  const headings = [...html.matchAll(/<h([1-4])[^>]*>(.*?)<\/h\1>/g)].map((match) =>
    match[2].replace(/<[^>]+>/g, "").replace(/&#x27;|&apos;/g, "'")
  )

  expect(headings[0]).toBe("Sentence Case Converter")
  const expectedOrder = [
    "What sentence case changes in your text",
    "What the converter leaves for you to check",
    "Which capitals does sentence case need to keep?",
    "APA keeps a capital after a colon in titles",
    "Where sentence case is the required style",
    "Why did product interfaces move to sentence case?",
    "Sentence case in Word, Google Docs and Excel",
    "Excel needs a formula for sentence case",
    "Questions about sentence case",
  ]
  const positions = expectedOrder.map((heading) => headings.indexOf(heading))
  expect(positions.every((position) => position > 0), JSON.stringify(headings)).toBe(true)
  expect([...positions].sort((a, b) => a - b)).toEqual(positions)
})

test("replaces the generic blocks and links where the brief bridges", async () => {
  const html = await renderSentencePage()

  expect(html).not.toContain("Frequently Asked Questions")
  expect(html).not.toContain(">Features</h2>")
  for (const href of [
    "/blog/do-you-capitalize-after-a-colon",
    "/capitalization-rules-guide",
    "/blog/apa-citing-titles",
    "/blog/ap-title-capitalization-basics",
    "/blog/sentence-vs-title-case",
  ]) {
    expect(html, href).toContain(`href="${href}"`)
  }
  expect(html).toContain(">title case converter</a>")
  expect(html).toContain("Related Converters")
})

test("the FAQ structured data mirrors the questions on the page", async () => {
  const html = await renderSentencePage()
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]))
    .find((data) => data["@type"] === "FAQPage")

  expect(jsonLd).toBeTruthy()
  for (const entry of jsonLd.mainEntity) {
    expect(html).toContain(entry.name.replace(/"/g, "&quot;"))
  }
})
