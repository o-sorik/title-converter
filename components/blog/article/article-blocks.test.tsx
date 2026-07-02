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

  test("renders generic table with bold first column", () => {
    const html = renderToStaticMarkup(
      <ArticleBlockRenderer
        block={{ type: "table", headers: ["Word", "Example"], rows: [["at", "*Success at Work*"]] }}
      />
    )
    expect(html).toContain("font-semibold")
    expect(html).toContain("<em>Success at Work</em>")
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
