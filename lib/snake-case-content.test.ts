import { describe, expect, test } from "vitest"

import { CONVERTER_ANCHORS } from "./converter-anchors"
import { convert } from "./converters"
import {
  SNAKE_BACK_TO_WORDS,
  SNAKE_EXAMPLES,
  SNAKE_FAQS,
  SNAKE_NEIGHBOURS,
  SNAKE_STEPS,
  SNAKE_TO_UPPER,
} from "./snake-case-content"
import { SEO_CONFIG } from "./seo-config"

describe("snake_case converter examples", () => {
  test("every documented output matches the engine", () => {
    for (const [id, example] of Object.entries(SNAKE_EXAMPLES)) {
      expect(convert(example.input, "snake"), id).toBe(example.output)
    }
  })

  // The brief's engine table (docs/briefs/snake-case-converter.md), with the values after decision S1.
  test("the rows of the brief's engine table", () => {
    const rows: [string, string][] = [
      ["myVariableName", "my_variable_name"],
      ["user-first-name", "user_first_name"],
      ["HTTPServer", "http_server"],
      ["getHTTPResponseCode", "get_http_response_code"],
      ["XMLHttpRequest", "xml_http_request"],
      ["userID", "user_id"],
      ["IOError", "io_error"],
      ["X-Request-ID", "x_request_id"],
      ["MAX_RETRY_COUNT", "max_retry_count"],
      ["_private_value", "_private_value"],
      ["__init__", "__init__"],
      ["version 2.5", "version_2_5"],
      ["md5Hash", "md5_hash"],
      ["user2Name", "user2_name"],
      ["iPhone 15 Pro", "i_phone_15_pro"],
      ["OAuth2Client", "o_auth2_client"],
      ["C++ & C#", "c_c"],
      ["Don't Stop", "dont_stop"],
      ["Café Résumé", "café_résumé"],
    ]
    for (const [input, output] of rows) expect(convert(input, "snake"), input).toBe(output)
  })

  // The list of steps quotes these outputs inline. If the engine changes, the copy must too.
  test("inline examples in the steps are what the engine does", () => {
    expect(convert("Don't", "snake")).toBe("dont")
    expect(convert("user__name", "snake")).toBe("user_name")
    expect(convert("C++", "snake")).toBe("c")
    expect(convert("iPhone", "snake")).toBe("i_phone")
    for (const { why } of SNAKE_STEPS) expect(why).not.toContain("—")
  })

  test("constants in capitals come from the uppercase mode applied to snake_case", () => {
    for (const { input, output } of Object.values(SNAKE_TO_UPPER)) {
      expect(convert(input, "upper")).toBe(output)
    }
    expect(SNAKE_TO_UPPER.constant.input).toBe(SNAKE_EXAMPLES.constant.output)
    expect(SNAKE_TO_UPPER.envVar.input).toBe(SNAKE_EXAMPLES.envVar.output)
  })

  test("the bridge to kebab-case and camelCase uses each mode's real output", () => {
    expect(convert(SNAKE_NEIGHBOURS.fromKebab.input, "snake")).toBe(SNAKE_NEIGHBOURS.fromKebab.output)
    expect(convert(SNAKE_NEIGHBOURS.kebab.input, "kebab")).toBe(SNAKE_NEIGHBOURS.kebab.output)
    expect(convert(SNAKE_NEIGHBOURS.camel.input, "camel")).toBe(SNAKE_NEIGHBOURS.camel.output)
  })

  test("the FAQ about turning snake_case back into words shows the title case mode as it is", () => {
    const { spaced, underscored } = SNAKE_BACK_TO_WORDS
    expect(convert(spaced.input, "title")).toBe(spaced.output)
    expect(convert(underscored.input, "title")).toBe(underscored.output)
    const answer = SNAKE_FAQS.find((faq) => faq.question.includes("back into words"))!.answer
    for (const text of [spaced.input, spaced.output, underscored.output]) expect(answer).toContain(text)
  })

  test("FAQ answers quote the engine's real outputs", () => {
    const text = SNAKE_FAQS.map((faq) => faq.answer).join(" ")
    for (const example of [SNAKE_EXAMPLES.digits, SNAKE_EXAMPLES.version, SNAKE_TO_UPPER.constant]) {
      expect(text).toContain(example.input)
      expect(text).toContain(example.output)
    }
  })
})

describe("snake_case converter copy", () => {
  test("lists eight steps, as the heading vector does", () => {
    expect(SNAKE_STEPS).toHaveLength(8)
  })

  test("the page config's FAQ is the guide's FAQ, so structured data mirrors the page", () => {
    expect(SEO_CONFIG["snake-case-converter"].faqs).toBe(SNAKE_FAQS)
    expect(SEO_CONFIG["snake-case-converter"].mode).toBe("snake")
    expect(SNAKE_FAQS).toHaveLength(5)
  })

  test("exactly one FAQ links out, to the converter, with an anchor from the pool", () => {
    const linked = SNAKE_FAQS.filter((faq) => faq.link)
    expect(linked).toHaveLength(1)
    const { answer, link } = linked[0]
    expect(link!.href).toBe("/")
    expect(CONVERTER_ANCHORS as readonly string[]).toContain(link!.anchor)
    expect(answer.split(link!.anchor)).toHaveLength(2)
  })

  test("title and H1 follow the registry, with an en dash", () => {
    const config = SEO_CONFIG["snake-case-converter"]
    expect(config.title).toBe("snake_case Converter – Text to snake_case")
    expect(config.h1).toBe("snake_case Converter")
    expect(config.title).not.toContain("—")
  })

  // The kebab page links here with this anchor; it must stay the H1.
  test("the H1 matches the anchor the kebab-case page uses", () => {
    expect(SEO_CONFIG["snake-case-converter"].h1.toLowerCase()).toBe("snake_case converter")
  })
})
