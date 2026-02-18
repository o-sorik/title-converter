import { expect, test } from "vitest"
import { metadata } from "./page"
import { HOME_PAGE_CONFIG } from "@/lib/seo-config"

test("home metadata uses absolute title and canonical governance fields", () => {
  expect(metadata.title).toEqual({ absolute: HOME_PAGE_CONFIG.title })
  expect(metadata.description).toBe(HOME_PAGE_CONFIG.description)
  expect(metadata.alternates?.canonical).toBe("https://titlecaseconverter.online")
})
