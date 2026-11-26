import { describe, expect, test } from "vitest"

import {
  CAMEL_BACK_TO_WORDS,
  CAMEL_EXAMPLES,
  CAMEL_FAQS,
  CAMEL_NEIGHBOURS,
  CAMEL_STEPS,
} from "./camel-case-content"
import { CONVERTER_ANCHORS } from "./converter-anchors"
import { convert } from "./converters"
import { SEO_CONFIG } from "./seo-config"

describe("camelCase converter examples", () => {
  test("every documented output matches the engine", () => {
    for (const [id, example] of Object.entries(CAMEL_EXAMPLES)) {
      expect(convert(example.input, "camel"), id).toBe(example.output)
    }
  })

  // The brief's engine table (docs/briefs/camel-case-converter.md), with the values after decisions C1–C3.
  test("the rows of the brief's engine table", () => {
    const rows: [string, string][] = [
      ["user first name", "userFirstName"],
      ["user_first_name", "userFirstName"],
      ["user-first-name", "userFirstName"],
      ["UserFirstName", "userFirstName"],
      ["MAX_RETRY_COUNT", "maxRetryCount"],
      ["XML HTTP request", "xmlHttpRequest"],
      ["XMLHttpRequest", "xmlHttpRequest"],
      ["new customer ID", "newCustomerId"],
      ["userID", "userId"],
      ["inner stopwatch", "innerStopwatch"],
      ["YouTube importer", "youTubeImporter"],
      ["getHTTPResponseCode", "getHttpResponseCode"],
      ["IOError", "ioError"],
      ["font-size", "fontSize"],
      ["data-user-id", "dataUserId"],
      ["version 2.5", "version2_5"],
      ["Guava 33.4.6", "guava33_4_6"],
      ["rgb 255 0 0", "rgb255_0_0"],
      ["getURLs", "getUrls"],
      ["APIs list", "apisList"],
      ["userIDs", "userIds"],
      ["DVDs and CDs", "dvdsAndCds"],
      ["supports IPv6 on iOS", "supportsIPv6OnIOs"],
      ["Turn on 2SV", "turnOn2Sv"],
      ["iOS", "iOs"],
      ["OAuth2Client", "oAuth2Client"],
      ["eBay store", "eBayStore"],
      ["_privateValue", "privateValue"],
      ["__proto__", "proto"],
      ["$scope", "scope"],
      ["#count", "count"],
      ["2nd place", "2ndPlace"],
      ["404 page", "404Page"],
      ["class", "class"],
      ["C++ & C#", "cC"],
      ["Don't Stop", "dontStop"],
      ["Café Résumé", "caféRésumé"],
      ["first name\nlast name", "firstNameLastName"],
    ]
    for (const [input, output] of rows) expect(convert(input, "camel"), input).toBe(output)
  })

  // The list of steps quotes these outputs inline. If the engine changes, the copy must too.
  test("inline examples in the steps are what the engine does", () => {
    const inline: [string, string][] = [
      ["user-first-name", "userFirstName"],
      ["user_first_name", "userFirstName"],
      ["user.first.name", "userFirstName"],
      ["UserFirstName", "userFirstName"],
      ["MAX_RETRY_COUNT", "maxRetryCount"],
      ["is valid", "isValid"],
      ["HTTPServer", "httpServer"],
      ["getURLs", "getUrls"],
      ["md5 hash", "md5Hash"],
      ["version 2.5", "version2_5"],
      ["Don't", "dont"],
      ["C++ & C#", "cC"],
    ]
    const copy = CAMEL_STEPS.map(({ why }) => why).join(" ")
    for (const [input, output] of inline) {
      expect(convert(input, "camel"), input).toBe(output)
      expect(copy).toContain(input)
      expect(copy).toContain(output)
    }
    expect(copy).not.toContain("—")
  })

  test("the bridge to PascalCase, snake_case and kebab-case uses each mode's real output", () => {
    expect(convert(CAMEL_NEIGHBOURS.pascal.input, "pascal")).toBe(CAMEL_NEIGHBOURS.pascal.output)
    expect(convert(CAMEL_NEIGHBOURS.snake.input, "snake")).toBe(CAMEL_NEIGHBOURS.snake.output)
    expect(convert(CAMEL_NEIGHBOURS.kebab.input, "kebab")).toBe(CAMEL_NEIGHBOURS.kebab.output)
  })

  test("the FAQ about turning camelCase back into words shows each mode as it is", () => {
    const { whole, snake, spaced } = CAMEL_BACK_TO_WORDS
    expect(convert(whole.input, "title")).toBe(whole.output)
    expect(convert(snake.input, "snake")).toBe(snake.output)
    expect(convert(spaced.input, "title")).toBe(spaced.output)
    const answer = CAMEL_FAQS.find((faq) => faq.question.includes("back into words"))!.answer
    for (const text of [whole.input, snake.output, spaced.input, spaced.output]) expect(answer).toContain(text)
  })

  test("FAQ answers quote the engine's real outputs", () => {
    const text = CAMEL_FAQS.map((faq) => faq.answer).join(" ")
    expect(text).toContain(CAMEL_EXAMPLES.userId.input)
    expect(text).toContain(CAMEL_EXAMPLES.userId.output)
    expect(text).toContain(convert("user first name", "camel"))
    expect(text).toContain(convert("user first name", "pascal"))
  })
})

describe("camelCase converter copy", () => {
  test("lists nine steps, as the heading vector does after C1 and C2", () => {
    expect(CAMEL_STEPS).toHaveLength(9)
  })

  test("the page config's FAQ is the guide's FAQ, so structured data mirrors the page", () => {
    expect(SEO_CONFIG["camel-case-converter"].faqs).toBe(CAMEL_FAQS)
    expect(SEO_CONFIG["camel-case-converter"].mode).toBe("camel")
    expect(CAMEL_FAQS).toHaveLength(5)
  })

  test("exactly one FAQ links out, to the converter, with an anchor from the pool", () => {
    const linked = CAMEL_FAQS.filter((faq) => faq.link)
    expect(linked).toHaveLength(1)
    const { answer, link } = linked[0]
    expect(link!.href).toBe("/")
    expect(CONVERTER_ANCHORS as readonly string[]).toContain(link!.anchor)
    expect(answer.split(link!.anchor)).toHaveLength(2)
  })

  test("title and H1 follow the registry, with an en dash", () => {
    const config = SEO_CONFIG["camel-case-converter"]
    expect(config.title).toBe("camelCase Converter – Text to camelCase")
    expect(config.h1).toBe("camelCase Converter")
    expect(config.title).not.toContain("—")
    for (const faq of CAMEL_FAQS) expect(faq.answer).not.toContain("—")
  })

  // The kebab and snake pages link here with this anchor; it must stay the H1.
  test("the H1 matches the anchor the kebab-case and snake_case pages use", () => {
    expect(SEO_CONFIG["camel-case-converter"].h1.toLowerCase()).toBe("camelcase converter")
  })
})
