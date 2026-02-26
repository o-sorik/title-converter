import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { AudienceSection } from "./audience-section"

test("renders all 5 audience cards", () => {
    const html = renderToStaticMarkup(<AudienceSection />)

    expect(html).toContain("Students and Academics")
    expect(html).toContain("Content Marketers and SEOs")
    expect(html).toContain("Editors and Publishers")
    expect(html).toContain("Developers")
    expect(html).toContain("Writers and Bloggers")
})

test("section has accessible heading and aria-labelledby", () => {
    const html = renderToStaticMarkup(<AudienceSection />)

    expect(html).toContain('id="who-is-this-for-heading"')
    expect(html).toContain('aria-labelledby="who-is-this-for-heading"')
    expect(html).toContain("Who Uses This Tool")
})

test("each card links to a relevant internal page", () => {
    const html = renderToStaticMarkup(<AudienceSection />)

    expect(html).toContain('href="/blog/apa-7-title-case-guide"')
    expect(html).toContain('href="/blog/ap-title-capitalization-basics"')
    expect(html).toContain('href="/blog/categories/chicago"')
    expect(html).toContain('href="/camel-case-converter"')
    expect(html).toContain('href="/blog/sentence-vs-title-case"')
})

test("does not contain auth or signup copy", () => {
    const html = renderToStaticMarkup(<AudienceSection />)
    const lowered = html.toLowerCase()

    expect(lowered).not.toContain("sign in")
    expect(lowered).not.toContain("sign up")
    expect(lowered).not.toContain("register")
    expect(lowered).not.toContain("login")
    expect(lowered).not.toContain("create account")
})
