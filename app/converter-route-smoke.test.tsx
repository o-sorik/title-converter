import { expect, test } from "vitest"
import { renderToString } from "react-dom/server"
import Home from "./page"
import ConverterPage from "./[slug]/page"

test("home route renders core converter shell", async () => {
  const html = renderToString(await Home({ searchParams: Promise.resolve({}) }))
  expect(html).toContain("Title Case Converter Online")
  expect(html).toContain("Frequently Asked Questions")
})

test("converter slug route renders known mode page", async () => {
  const html = renderToString(
    await ConverterPage({
      params: Promise.resolve({ slug: "sentence-case-converter" }),
      searchParams: Promise.resolve({}),
    })
  )

  expect(html).toContain("Sentence Case Converter")
  expect(html).toContain("Frequently Asked Questions")
})
