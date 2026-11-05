import type { ReactNode } from "react"
import Link from "next/link"
import { SLUG_STOP_WORDS } from "@/lib/slug"
import {
    DIAGRAM_CALLOUTS,
    DIAGRAM_INPUT,
    DIAGRAM_OUTPUT,
    SLUG_CHANGES,
    SLUG_EXAMPLES,
    SLUG_FAQS,
    SLUG_SOURCES,
    SLUG_VS_CASES,
    type SlugExample,
} from "@/lib/slug-generator-content"
import { cn } from "@/lib/utils"

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-foreground cursor-pointer"
const CARD_CLASS = "rounded-xl border bg-white/70 dark:bg-zinc-900/60"
const CODE_CLASS = "font-mono text-[0.85em] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded [overflow-wrap:anywhere]"

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
    return <Link href={href} className={LINK_CLASS}>{children}</Link>
}

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground cursor-pointer">
            {children}
        </a>
    )
}

function H2({ id, children, grouping = false }: { id: string; children: ReactNode; grouping?: boolean }) {
    return <h2 id={id} className={cn("scroll-mt-24 text-2xl font-bold tracking-tight", grouping && "italic")}>{children}</h2>
}

function H3({ children }: { children: ReactNode }) {
    return <h3 className="text-xl font-semibold tracking-tight pt-2">{children}</h3>
}

function P({ children }: { children: ReactNode }) {
    return <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{children}</p>
}

function Code({ children }: { children: ReactNode }) {
    return <code className={CODE_CLASS}>{children}</code>
}

function Example({ example }: { example: SlugExample }) {
    return (
        <p className="text-sm text-muted-foreground">
            <code className={CODE_CLASS}>{example.input}</code>
            <span aria-hidden="true"> → </span>
            <span className="sr-only"> becomes </span>
            <code className={cn(CODE_CLASS, "text-foreground")}>{example.output}</code>
        </p>
    )
}

/** Before/after with callouts that mirror the numbered list of changes. */
function BeforeAfterDiagram() {
    const callouts = new Map(DIAGRAM_CALLOUTS.map((callout) => [callout.word, callout]))
    const words = DIAGRAM_OUTPUT.split("-")
    return (
        <figure className={cn(CARD_CLASS, "p-5 space-y-4")}>
            <p className="text-sm text-muted-foreground">
                Pasted: <code className={CODE_CLASS}>{DIAGRAM_INPUT}</code>
            </p>
            <ol className="flex flex-wrap items-start gap-y-4" aria-label="Slug with notes">
                {words.map((word, index) => {
                    const callout = callouts.get(word)
                    return (
                        <li key={index} className="flex items-start">
                            <span className="flex flex-col items-center gap-1">
                                <span
                                    className={cn(
                                        "font-mono text-base px-1 rounded",
                                        callout ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200" : "text-foreground"
                                    )}
                                >
                                    {word}
                                </span>
                                {callout && (
                                    <span className="text-[11px] leading-tight text-muted-foreground text-center max-w-24">{callout.label}</span>
                                )}
                            </span>
                            {index < words.length - 1 && <span className="font-mono text-base text-muted-foreground" aria-hidden="true">-</span>}
                        </li>
                    )
                })}
            </ol>
            <figcaption className="text-sm text-muted-foreground">
                Every part the generator removed or changed, in the order of the list above. The same notes appear under
                your own result.
            </figcaption>
        </figure>
    )
}

export function SlugGeneratorGuide() {
    return (
        <article className="w-full max-w-4xl mx-auto space-y-12">
            {/* A1i – intro */}
            <div className="space-y-4">
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Paste a headline and the generator turns it into a lowercase, hyphenated URL slug. Words stay whole:{" "}
                    <Code>don&apos;t</Code> becomes <Code>dont</Code>, <Code>iPhone</Code> becomes <Code>iphone</Code> and{" "}
                    <Code>café</Code> becomes <Code>cafe</Code>.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Every part it removes is listed under the result with the rule behind it, and the slug&apos;s length is
                    shown, never cut. Stop words, length, numbers and non-English letters stay your call – see{" "}
                    <a href="#leaves-for-you" className={LINK_CLASS}>what the generator leaves for you to decide</a>.
                </p>
            </div>

            {/* A2–A10 – root listing */}
            <section className="space-y-4">
                <H2 id="what-changes">What the slug generator changes in your text</H2>
                <P>Eight changes happen when text becomes a slug:</P>
                <ol className="list-decimal pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                    {SLUG_CHANGES.map(({ change, why }, index) => (
                        <li key={change}>
                            <span className="font-medium text-foreground">{change}</span> {why}
                            {index === 0 && (
                                <> (<SourceLink href={SLUG_SOURCES.googleUrlStructure}>Google</SourceLink>)</>
                            )}
                        </li>
                    ))}
                </ol>
                <div className="space-y-2">
                    <Example example={SLUG_EXAMPLES.brief} />
                    <Example example={SLUG_EXAMPLES.version} />
                    <Example example={SLUG_EXAMPLES.accents} />
                </div>
                <BeforeAfterDiagram />
                <P>
                    One limit comes from the rules themselves: symbols that carry the meaning are lost, so{" "}
                    <Code>C++</Code> and <Code>C#</Code> both become <Code>c</Code>.
                </P>
                <Example example={SLUG_EXAMPLES.cPlusPlus} />
            </section>

            {/* A11 – sub-segment, returns to the slug */}
            <section className="space-y-4">
                <H2 id="kebab-snake" grouping>How a slug differs from kebab case and snake case</H2>
                <P>
                    Kebab case also joins lowercase words with hyphens, but it is made for code: the{" "}
                    <InlineLink href="/kebab-case-converter">kebab-case converter</InlineLink> splits <Code>iPhone</Code> into{" "}
                    <Code>i-phone</Code>, because a capital inside an identifier starts a new word. Snake case joins words with
                    underscores for variables and database columns, which is what the{" "}
                    <InlineLink href="/snake-case-converter">snake_case converter</InlineLink> is for.
                </P>
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <caption className="sr-only">{SLUG_VS_CASES.input} in three formats</caption>
                        <tbody>
                            <tr className="border-b">
                                <th scope="row" className="text-left p-3 font-semibold w-32">Slug</th>
                                <td className="p-3 font-mono [overflow-wrap:anywhere]">{SLUG_VS_CASES.slug}</td>
                            </tr>
                            <tr className="border-b">
                                <th scope="row" className="text-left p-3 font-semibold w-32">kebab-case</th>
                                <td className="p-3 font-mono [overflow-wrap:anywhere]">{SLUG_VS_CASES.kebab}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-left p-3 font-semibold w-32">snake_case</th>
                                <td className="p-3 font-mono [overflow-wrap:anywhere]">{SLUG_VS_CASES.snake}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <P>
                    For URLs, Google recommends hyphens instead of underscores (
                    <SourceLink href={SLUG_SOURCES.googleUrlStructure}>Google</SourceLink>). A slug is kebab case plus the URL
                    rules above: words stay whole, accents become plain letters and symbols go.
                </P>
            </section>

            {/* A12–A16 – honest limits */}
            <section className="space-y-4">
                <H2 id="leaves-for-you">What the generator leaves for you to decide</H2>
                <P>
                    Four decisions stay with you: whether to keep stop words, how long the slug should be, whether a year or a
                    number belongs in it, and when to keep non-English letters.
                </P>

                <H3>Should a slug keep stop words like &ldquo;the&rdquo; and &ldquo;of&rdquo;?</H3>
                <P>
                    Keep them unless the slug reads naturally without them. Removing them can change the meaning, which is why
                    &ldquo;Remove stop words&rdquo; is off by default:
                </P>
                <Example example={SLUG_EXAMPLES.stopWords} />
                <Example example={SLUG_EXAMPLES.stopWordsRemoved} />
                <P>
                    With the switch on, the generator removes {SLUG_STOP_WORDS.join(", ")}. If every word is a stop word, it
                    keeps them all. Google&apos;s URL guidelines do not mention stop words (
                    <SourceLink href={SLUG_SOURCES.googleUrlStructure}>Google</SourceLink>).
                </P>

                <H3>How long should a slug be?</H3>
                <P>
                    Google&apos;s URL guidelines give no length limit; they ask for readable words rather than long ID numbers (
                    <SourceLink href={SLUG_SOURCES.googleUrlStructure}>Google</SourceLink>). Ghost recommends keeping a slug
                    &ldquo;as short as possible&rdquo; (<SourceLink href={SLUG_SOURCES.ghostPublishing}>Ghost</SourceLink>). The
                    generator never cuts a slug: it shows the character count, so you can drop words by meaning rather than at
                    a fixed number of characters.
                </P>

                <H3>Should a slug keep the year or a number from the title?</H3>
                <P>
                    Keep a number that is part of the subject, such as the 15 in <Code>iphone-15-pro-max-review</Code> or the
                    10 here:
                </P>
                <Example example={SLUG_EXAMPLES.number} />
                <P>
                    Leave out a year if you plan to update the page next year: the slug would then need changing, and a changed
                    slug needs a redirect.
                </P>

                <H3>When should a slug keep non-English letters?</H3>
                <P>
                    When your readers search in that language. The generator always turns accented letters into plain ones,
                    which suits an English-speaking audience. Google recommends words in your audience&apos;s language in the
                    URL, and its own example writes <Code>gemüse</Code> in a link as <Code>gem%C3%BCse</Code> (
                    <SourceLink href={SLUG_SOURCES.googleUrlStructure}>Google</SourceLink>). For such a page, type the slug in
                    that language by hand. Letters with no plain Latin form, such as Cyrillic or Japanese, are removed, so
                    write those slugs by hand too.
                </P>
            </section>

            {/* A17–A20 – use case */}
            <section className="space-y-4">
                <H2 id="headline-to-url">From a headline to a published URL</H2>
                <P>
                    A slug comes late in publishing: settle the headline, generate the slug, paste it into your CMS – and
                    leave it alone once the page is live.
                </P>

                <H3>Fix the headline&apos;s case before you make the slug</H3>
                <P>
                    The headline and the slug go live together, so finish the headline first. If you are asking how to{" "}
                    <InlineLink href="/">capitalize my title</InlineLink>, the converter answers for AP, APA, Chicago and MLA
                    and marks the rule behind every word. The slug lowercases everything anyway; what matters is that it
                    matches the final wording.
                </P>

                <H3>Changing a published slug needs a redirect</H3>
                <P>
                    Once a page is live, the old URL needs a redirect to the new one, or links to it end on a &ldquo;page not
                    found&rdquo; error (<SourceLink href={SLUG_SOURCES.shopifyCollections}>Shopify</SourceLink>). WordPress
                    redirects old slugs of published posts with a 301 on its own (
                    <SourceLink href={SLUG_SOURCES.wordpressOldSlug}>WordPress source</SourceLink>), but not of pages, and it
                    does not update links to the old URL inside your content. Shopify pre-selects &ldquo;Create a URL
                    redirect&rdquo; when you change the handle of a page or blog post (
                    <SourceLink href={SLUG_SOURCES.shopifyPages}>Shopify</SourceLink>) and offers the same choice for
                    collections. In Ghost, you add the redirect yourself in <Code>redirects.yaml</Code> (
                    <SourceLink href={SLUG_SOURCES.ghostRedirects}>Ghost</SourceLink>).
                </P>

                <H3>Where to paste the slug in WordPress, Shopify and Ghost</H3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                    <li>
                        <span className="font-medium text-foreground">WordPress:</span> in the post or page settings sidebar,
                        open Slug. You can edit it once the post is saved as a draft (
                        <SourceLink href={SLUG_SOURCES.wordpressSidebar}>WordPress</SourceLink>).
                    </li>
                    <li>
                        <span className="font-medium text-foreground">Shopify:</span> in the Search engine listing section of a
                        product, collection, page or blog post, edit the URL handle field (
                        <SourceLink href={SLUG_SOURCES.shopifyPages}>Shopify</SourceLink>).
                    </li>
                    <li>
                        <span className="font-medium text-foreground">Ghost:</span> in the post settings, edit Post URL (
                        <SourceLink href={SLUG_SOURCES.ghostPublishing}>Ghost</SourceLink>).
                    </li>
                </ul>
                <P>
                    Each platform also builds a slug from the title on its own and treats symbols such as & and apostrophes in
                    its own way, so pasting the slug is how you get exactly the one shown above.
                </P>
            </section>

            {/* A21 – supplementary */}
            <section className="space-y-5 border-t pt-10">
                <H2 id="faq">Questions about URL slugs</H2>
                <div className="space-y-4">
                    {SLUG_FAQS.map((faq, index) => (
                        <details key={faq.question} className={cn(CARD_CLASS, "p-5")} open={index === 0}>
                            <summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                            <p className="mt-3 text-zinc-700 dark:text-zinc-300">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </article>
    )
}
