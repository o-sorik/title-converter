import { describe, expect, test } from "vitest"
import {
  deriveTocFromSections,
  getArticleContentBySlug,
  getArticleTocItems,
  FAQ_SECTION_ID,
} from "./article-content"
import { WRITING_TIPS_ARTICLES, getAllWritingTipsArticles } from "./writing-tips-article-data"
import { blogArticles } from "@/components/blog/data"
import { convert } from "./converters"

describe("getArticleContentBySlug", () => {
  test("dispatches by template priority: is-x wins over high-intent", () => {
    // Has both IsX data and a high-intent entry – the richer template owns the body.
    expect(getArticleContentBySlug("and-capitalized-in-title-case").template).toBe("is-x")
  })

  test("resolves each template family", () => {
    expect(getArticleContentBySlug("is-president-capitalized").template).toBe("gen-cap")
    expect(getArticleContentBySlug("what-words-are-not-capitalized-in-a-title").template).toBe("writing-tips")
    expect(getArticleContentBySlug("of-capitalized-in-title-case").template).toBe("grammar-101")
    expect(getArticleContentBySlug("apa-citing-titles").template).toBe("writing-tips")
  })

  test("no published article falls through to the legacy placeholder", () => {
    // The legacy branch rendered one hardcoded APA body for every slug that
    // reached it. Five indexed URLs shared it, including the featured article.
    // Nothing may rely on it again.
    const onLegacy = blogArticles
      .map((article) => article.slug)
      .filter((slug) => getArticleContentBySlug(slug).template === "legacy")

    expect(onLegacy, `slugs still rendering the placeholder body: ${onLegacy.join(", ")}`).toEqual([])
  })

  test("every style-guide article has its own distinct body", () => {
    const slugs = [
      "apa-7-title-case-guide",
      "apa-citing-titles",
      "apa-heading-levels",
      "ap-title-capitalization-basics",
      "mla-vs-apa-headlines",
    ]
    const firstParagraphs = slugs.map((slug) => {
      const content = getArticleContentBySlug(slug)
      if (content.template !== "writing-tips") throw new Error(`${slug} is not on the block model`)
      const block = content.data.sections[0].blocks[0]
      return block.type === "paragraph" ? block.text : ""
    })

    expect(new Set(firstParagraphs).size).toBe(slugs.length)
  })
})

describe("deriveTocFromSections", () => {
  test("skips intro (no heading) and hidden sections, appends FAQ", () => {
    const toc = deriveTocFromSections(
      [
        { id: "intro", blocks: [] },
        { id: "one", heading: "Section One", blocks: [] },
        { id: "two", heading: "Long Heading", tocLabel: "Short label", blocks: [] },
        { id: "sources", heading: "Sources", hideFromToc: true, blocks: [] },
      ],
      true
    )

    expect(toc).toEqual([
      { id: "one", label: "Section One" },
      { id: "two", label: "Short label" },
      { id: FAQ_SECTION_ID, label: "FAQ" },
    ])
  })

  test("omits FAQ entry when the article has no FAQ items", () => {
    const toc = deriveTocFromSections([{ id: "one", heading: "Section One", blocks: [] }], false)
    expect(toc).toEqual([{ id: "one", label: "Section One" }])
  })
})

describe("getArticleTocItems", () => {
  test("writing-tips TOC is derived from its sections and matches section ids", () => {
    const article = WRITING_TIPS_ARTICLES[0]
    const toc = getArticleTocItems({ template: "writing-tips", data: article })
    const sectionIds = new Set(article.sections.map((section) => section.id))

    expect(toc.length).toBeGreaterThan(3)
    for (const item of toc) {
      if (item.id === FAQ_SECTION_ID) continue
      expect(sectionIds.has(item.id)).toBe(true)
    }
    // Sources section stays out of the TOC.
    expect(toc.some((item) => item.id === "sources")).toBe(false)
  })
})

describe("styleGuideMatrix alignment with converter engine", () => {
  test("word-level matrix rows match actual converter output per style", () => {
    const styleMap = { ap: "ap", apa: "apa", chicago: "chicago", mla: "mla" } as const
    let checkedRows = 0

    // Every block-model article, including the stats and style-guide clusters.
    for (const article of getAllWritingTipsArticles()) {
      for (const section of article.sections) {
        for (const block of section.blocks) {
          if (block.type !== "styleGuideMatrix") continue
          for (const row of block.rows) {
            // Only rows naming a concrete word, e.g. `with (4 letters)` –
            // category rows like `Prepositions (5+ letters)` are not testable.
            const match = row.label.match(/^([a-z]+) \(\d+ letters\)$/)
            if (!match) continue
            checkedRows++
            const word = match[1]
            for (const [guide, style] of Object.entries(styleMap)) {
              const output = convert(`books ${word} words`, "title", { titleStyle: style })
              const capitalized = output.split(" ")[1][0] === word[0].toUpperCase()
              expect(
                capitalized,
                `"${row.label}" / ${guide}: matrix says ${row.guides[guide as keyof typeof row.guides]}, engine output "${output}"`,
              ).toBe(row.guides[guide as keyof typeof row.guides])
            }
          }
        }
      }
    }

    expect(checkedRows).toBeGreaterThanOrEqual(20)
  })
})
