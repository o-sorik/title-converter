import { describe, expect, test } from "vitest"

import { CONVERTER_ANCHORS } from "./converter-anchors"
import { convert } from "./converters"
import {
  KEBAB_BACK_TO_WORDS,
  KEBAB_EXAMPLES,
  KEBAB_FAQS,
  KEBAB_NEIGHBOURS,
  KEBAB_STEPS,
} from "./kebab-case-content"
import { SEO_CONFIG } from "./seo-config"

describe("kebab-case converter examples", () => {
  test("every documented output matches the engine", () => {
    for (const [id, example] of Object.entries(KEBAB_EXAMPLES)) {
      expect(convert(example.input, "kebab"), id).toBe(example.output)
    }
  })

  // The brief's engine table (docs/briefs/kebab-case-converter.md), with the values after decision K1.
  test("the fifteen rows of the brief's engine table", () => {
    const rows: [string, string][] = [
      ["myVariableName", "my-variable-name"],
      ["user_first_name", "user-first-name"],
      ["HTTPServer", "http-server"],
      ["getHTTPResponseCode", "get-http-response-code"],
      ["XMLHttpRequest", "xml-http-request"],
      ["SCREAMING_SNAKE_CASE", "screaming-snake-case"],
      ["--dry-run", "dry-run"],
      ["version 2.5", "version-2-5"],
      ["iPhone 15 Pro", "i-phone-15-pro"],
      ["OAuth2Client", "o-auth2-client"],
      ["ABC123def", "abc123def"],
      ["C++ & C#", "c-c"],
      ["Don't Stop", "dont-stop"],
      ["Café Résumé", "café-résumé"],
      ["Straße über", "straße-über"],
    ]
    for (const [input, output] of rows) expect(convert(input, "kebab"), input).toBe(output)
  })

  // The list of steps and the limits quote these outputs inline. If the engine changes, the copy must too.
  test("inline examples in the copy are what the engine does", () => {
    expect(convert("Don't", "kebab")).toBe("dont")
    expect(convert("C++", "kebab")).toBe("c")
    expect(convert("C#", "kebab")).toBe("c")
    expect(convert("iPhone", "kebab")).toBe("i-phone")
    expect(convert("Two Words", "kebab")).toBe("two-words")
  })

  test("the bridge to snake_case, camelCase and the slug uses each mode's real output", () => {
    expect(convert(KEBAB_NEIGHBOURS.snake.input, "snake")).toBe(KEBAB_NEIGHBOURS.snake.output)
    expect(convert(KEBAB_NEIGHBOURS.camel.input, "camel")).toBe(KEBAB_NEIGHBOURS.camel.output)
    expect(convert(KEBAB_NEIGHBOURS.slugBrand.input, "slug")).toBe(KEBAB_NEIGHBOURS.slugBrand.output)
    expect(convert(KEBAB_NEIGHBOURS.slugAccent.input, "slug")).toBe(KEBAB_NEIGHBOURS.slugAccent.output)
    // The package and the attribute named in the bridge are kebab-case results themselves.
    expect(KEBAB_NEIGHBOURS.snake.input).toBe(KEBAB_EXAMPLES.packageName.output)
    expect(KEBAB_NEIGHBOURS.camel.input).toBe(KEBAB_EXAMPLES.dataAttribute.output)
  })

  test("the FAQ about turning kebab-case back into words shows the title case mode as it is", () => {
    const { spaced, hyphenated } = KEBAB_BACK_TO_WORDS
    expect(convert(spaced.input, "title")).toBe(spaced.output)
    expect(convert(hyphenated.input, "title")).toBe(hyphenated.output)
    const answer = KEBAB_FAQS.find((faq) => faq.question.includes("back into words"))!.answer
    for (const text of [spaced.input, spaced.output, hyphenated.output]) expect(answer).toContain(text)
  })
})

describe("kebab-case converter copy", () => {
  test("lists eight steps, as the heading vector does", () => {
    expect(KEBAB_STEPS).toHaveLength(8)
  })

  test("the page config's FAQ is the guide's FAQ, so structured data mirrors the page", () => {
    expect(SEO_CONFIG["kebab-case-converter"].faqs).toBe(KEBAB_FAQS)
    expect(SEO_CONFIG["kebab-case-converter"].mode).toBe("kebab")
    expect(KEBAB_FAQS).toHaveLength(6)
  })

  test("exactly one FAQ links out, to the converter, with an anchor from the pool", () => {
    const linked = KEBAB_FAQS.filter((faq) => faq.link)
    expect(linked).toHaveLength(1)
    const { answer, link } = linked[0]
    expect(link!.href).toBe("/")
    expect(CONVERTER_ANCHORS as readonly string[]).toContain(link!.anchor)
    expect(answer.split(link!.anchor)).toHaveLength(2)
  })

  test("title and H1 follow the registry, with an en dash", () => {
    const config = SEO_CONFIG["kebab-case-converter"]
    expect(config.title).toBe("kebab-case Converter – Text to kebab-case")
    expect(config.h1).toBe("kebab-case Converter")
    expect(config.title).not.toContain("—")
  })

  // The boundary with the slug generator (QN6): URL slugs are that page's subject.
  test("the page does not promise URL slugs in its title, description or intro", () => {
    const config = SEO_CONFIG["kebab-case-converter"]
    for (const text of [config.title, config.description, config.content.intro, ...config.content.features]) {
      expect(text.toLowerCase(), text).not.toContain("slug")
    }
  })
})
