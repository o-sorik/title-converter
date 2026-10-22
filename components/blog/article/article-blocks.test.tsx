import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, test } from "vitest"
import { ArticleBlockRenderer, renderInline } from "./article-blocks"

function renderInlineHtml(text: string): string {
  return renderToStaticMarkup(<>{renderInline(text)}</>)
}

describe("renderInline", () => {
  test("renders bold and italic markup", () => {
    const html = renderInlineHtml("**a** – *A Guide to Better Writing* stays plain")
    expect(html).toContain("<strong>a</strong>")
    expect(html).toContain("<em>A Guide to Better Writing</em>")
    expect(html).toContain("stays plain")
  })

  test("renders internal links via next/link and external links with rel/target", () => {
    const internal = renderInlineHtml("see [Is “The” Capitalized?](/blog/the-capitalized-in-title-case)")
    expect(internal).toContain('href="/blog/the-capitalized-in-title-case"')
    expect(internal).not.toContain("target")

    const external = renderInlineHtml("per [MLA guidance](https://style.mla.org/capitalization-of-titles/)")
    expect(external).toContain('href="https://style.mla.org/capitalization-of-titles/"')
    expect(external).toContain('target="_blank"')
    expect(external).toContain('rel="noopener noreferrer"')
  })

  test("supports italic inside link labels and parentheses in URLs", () => {
    const html = renderInlineHtml("[*The Silence of the Lambs*](https://en.wikipedia.org/wiki/The_Silence_of_the_Lambs_(novel)) – lowercase")
    expect(html).toContain('href="https://en.wikipedia.org/wiki/The_Silence_of_the_Lambs_(novel)"')
    expect(html).toContain("<em>The Silence of the Lambs</em>")
    expect(html).toContain("– lowercase")
  })

  test("leaves unpaired asterisks untouched (footnote markers)", () => {
    const html = renderInlineHtml("*APA capitalizes after a colon only when a complete sentence follows.")
    expect(html).toContain("*APA capitalizes")
    expect(html).not.toContain("<em>")
  })
})

describe("ArticleBlockRenderer", () => {
  test("renders heading blocks as real h3/h4, grouping questions in italics", () => {
    const h3 = renderToStaticMarkup(
      <ArticleBlockRenderer block={{ type: "heading", level: 3, text: "Which case do news headlines use?", grouping: true }} />
    )
    expect(h3).toMatch(/^<h3 class="[^"]*italic[^"]*">Which case do news headlines use\?<\/h3>$/)

    const h4 = renderToStaticMarkup(<ArticleBlockRenderer block={{ type: "heading", level: 4, text: "APA uses both" }} />)
    expect(h4).toMatch(/^<h4 class="[^"]*">APA uses both<\/h4>$/)
    expect(h4).not.toContain("italic")
  })

  test("renders ordered lists as ol", () => {
    const html = renderToStaticMarkup(<ArticleBlockRenderer block={{ type: "list", ordered: true, items: ["One", "Two"] }} />)
    expect(html).toMatch(/^<ol class="[^"]*list-decimal[^"]*"><li/)
    const plain = renderToStaticMarkup(<ArticleBlockRenderer block={{ type: "list", items: ["One"] }} />)
    expect(plain).toMatch(/^<ul class="[^"]*list-disc/)
  })

  test("renders caseDiagram rows with numbered marks and a notes legend", () => {
    const html = renderToStaticMarkup(
      <ArticleBlockRenderer
        block={{
          type: "caseDiagram",
          rows: [
            { label: "Title case", text: "The Art of Saying No", marks: [{ index: 2, note: 2, tone: "same" }] },
            { label: "Sentence case", text: "The art of saying no", marks: [{ index: 1, note: 1, tone: "differs" }] },
          ],
          notes: ["Capitals", "Small words"],
          caption: "Green marks a **difference**.",
        }}
      />
    )
    expect(html).toContain("Title case")
    expect(html).toContain("Sentence case")
    expect(html).toMatch(/>of<sup[^>]*>2<\/sup><\/span>/)
    expect(html).toMatch(/>art<sup[^>]*>1<\/sup><\/span>/)
    expect(html).toContain("Small words")
    expect(html).toContain("<strong>difference</strong>")
  })

  test("renders styleGuideMatrix with capitalize/lowercase badges in guide order", () => {
    const html = renderToStaticMarkup(
      <ArticleBlockRenderer
        block={{
          type: "styleGuideMatrix",
          rowHeader: "Preposition",
          rows: [{ label: "with (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } }],
        }}
      />
    )
    expect(html).toContain("Preposition")
    expect((html.match(/>Capitalize</g) ?? []).length).toBe(2)
    expect((html.match(/>Lowercase</g) ?? []).length).toBe(2)
    expect(html).toContain("with (4 letters)")
  })

  test("renders a styleGuideMatrix row note as a second line under the label", () => {
    const html = renderToStaticMarkup(
      <ArticleBlockRenderer
        block={{
          type: "styleGuideMatrix",
          rowHeader: "Word",
          rows: [{ label: "with", note: "preposition, 4 letters", guides: { ap: true, apa: true, chicago: false, mla: false } }],
        }}
      />
    )
    expect(html).toMatch(/with<span class="block text-xs[^"]*">preposition, 4 letters<\/span>/)
  })

  test("renders generic table with bold first column", () => {
    const html = renderToStaticMarkup(
      <ArticleBlockRenderer
        block={{ type: "table", headers: ["Word", "Example"], rows: [["at", "*Success at Work*"]] }}
      />
    )
    expect(html).toContain("font-semibold")
    expect(html).toContain("<em>Success at Work</em>")
  })

  test("renders statHighlight grid with source attribution link", () => {
    const html = renderToStaticMarkup(
      <ArticleBlockRenderer
        block={{
          type: "statHighlight",
          items: [
            { value: "52 WPM", label: "Average typing speed", sourceName: "Dhakal et al., 2018", sourceHref: "https://userinterfaces.aalto.fi/136Mkeystrokes/" },
            { value: "36.2 WPM", label: "Average mobile typing speed", sourceName: "Palin et al., 2019" },
          ],
        }}
      />
    )
    expect(html).toContain("52 WPM")
    expect(html).toContain('href="https://userinterfaces.aalto.fi/136Mkeystrokes/"')
    expect(html).toContain("Palin et al., 2019")
    expect(html).toContain("sm:grid-cols-2")
  })

  test("renders barList with clamped widths", () => {
    const html = renderToStaticMarkup(
      <ArticleBlockRenderer
        block={{
          type: "barList",
          items: [
            { label: "Ages 10–19", percent: 100, display: "39.6 WPM" },
            { label: "Ages 50–59", percent: 120, display: "26.3 WPM" },
          ],
        }}
      />
    )
    expect(html).toContain("39.6 WPM")
    expect(html).toContain("width:100%")
    expect(html).not.toContain("width:120%")
  })

  test("renders keyStats digest with inline markdown", () => {
    const html = renderToStaticMarkup(
      <ArticleBlockRenderer
        block={{
          type: "keyStats",
          items: ["**238 WPM** – average silent reading speed ([Brysbaert, 2019](https://example.com/paper))"],
        }}
      />
    )
    expect(html).toContain("Key Statistics")
    expect(html).toContain("<strong>238 WPM</strong>")
    expect(html).toContain('href="https://example.com/paper"')
  })

  test("renders numbered sources with publisher and year", () => {
    const html = renderToStaticMarkup(
      <ArticleBlockRenderer
        block={{
          type: "sources",
          items: [
            { name: "Observations on Typing from 136 Million Keystrokes", publisher: "Aalto University", year: "2018", href: "https://userinterfaces.aalto.fi/136Mkeystrokes/" },
          ],
        }}
      />
    )
    expect(html).toContain("<ol")
    expect(html).toContain("Aalto University, 2018")
    expect(html).toContain('rel="noopener noreferrer"')
  })

  test("renders paragraph variants", () => {
    const note = renderToStaticMarkup(<ArticleBlockRenderer block={{ type: "paragraph", text: "note", variant: "note" }} />)
    expect(note).toContain("text-sm")

    const subheading = renderToStaticMarkup(
      <ArticleBlockRenderer block={{ type: "paragraph", text: "sub", variant: "subheading" }} />
    )
    expect(subheading).toContain("font-semibold")
  })
})
