import { expect, test } from "vitest"
import { generateMetadata } from "./page"

test("blog article metadata includes title, description, and canonical", async () => {
  const slug = "and-capitalized-in-title-case"
  const result = await generateMetadata({
    params: Promise.resolve({ slug }),
    searchParams: Promise.resolve({}),
  })

  expect(result.title).toBe('Is "And" Capitalized in Title Case? Quick Rule + Examples')
  expect(result.description).toContain('Fast answer for whether "and" should be capitalized')
  expect(result.alternates?.canonical).toBe(`/blog/${slug}`)
})
