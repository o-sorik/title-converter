import type { ReactNode } from "react"
import Link from "next/link"
import {
    KEBAB_EXAMPLES,
    KEBAB_FAQS,
    KEBAB_NEIGHBOURS,
    KEBAB_SOURCES,
    KEBAB_STEPS,
    type KebabExample,
    type KebabFaq,
} from "@/lib/kebab-case-content"
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

/** "input becomes output" inside a sentence, both taken from the tested examples. */
function Pair({ example }: { example: KebabExample }) {
    return (
        <>
            <Code>{example.input}</Code> becomes <Code>{example.output}</Code>
        </>
    )
}

function Example({ example }: { example: KebabExample }) {
    return (
        <p className="text-sm text-muted-foreground">
            <code className={CODE_CLASS}>{example.input}</code>
            <span aria-hidden="true"> → </span>
            <span className="sr-only"> becomes </span>
            <code className={cn(CODE_CLASS, "text-foreground")}>{example.output}</code>
        </p>
    )
}

/** The answer is plain text for structured data; its one linked phrase becomes a link on the page. */
function FaqAnswer({ faq }: { faq: KebabFaq }) {
    if (!faq.link) return <>{faq.answer}</>
    const [before, after] = faq.answer.split(faq.link.anchor)
    return (
        <>
            {before}
            <InlineLink href={faq.link.href}>{faq.link.anchor}</InlineLink>
            {after}
        </>
    )
}

export function KebabCaseGuide() {
    return (
        <article className="w-full max-w-4xl mx-auto space-y-12">
            {/* A1i – intro */}
            <div className="space-y-4">
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    kebab-case writes words in lowercase and joins them with hyphens: <Code>{KEBAB_EXAMPLES.camel.output}</Code>.
                    The converter reads camelCase, PascalCase and snake_case as well as plain text:{" "}
                    <Pair example={KEBAB_EXAMPLES.camel} />, <Pair example={KEBAB_EXAMPLES.acronym} /> and{" "}
                    <Pair example={KEBAB_EXAMPLES.snake} />.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Brand names, symbols and accented letters are the three places{" "}
                    <a href="#human-check" className={LINK_CLASS}>where the word split needs a human check</a>.
                </p>
            </div>

            {/* A2–A9 – root listing */}
            <section className="space-y-4">
                <H2 id="how-it-splits">How the converter splits text into kebab-case words</H2>
                <P>Eight things happen when text becomes kebab-case:</P>
                <ol className="list-decimal pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                    {KEBAB_STEPS.map(({ change, why, source }) => (
                        <li key={change}>
                            <span className="font-medium text-foreground">{change}</span> {why}
                            {source ? (
                                <> (<SourceLink href={source.href}>{source.label}</SourceLink>).</>
                            ) : null}
                        </li>
                    ))}
                </ol>
                <div className="space-y-2">
                    <Example example={KEBAB_EXAMPLES.acronymInside} />
                    <Example example={KEBAB_EXAMPLES.screaming} />
                    <Example example={KEBAB_EXAMPLES.mixed} />
                </div>
                <P>
                    These rules read letters, not meaning, so a few kinds of text come out in a form worth reading before you
                    use it.
                </P>
            </section>

            {/* A10–A13 – honest limits */}
            <section className="space-y-4">
                <H2 id="human-check">Where the word split needs a human check</H2>
                <P>
                    Three kinds of text need a second look: brand names with a capital inside, names made of symbols, and
                    words with an apostrophe or an accent.
                </P>

                <H3>Brand names with an inner capital, like iPhone and OAuth</H3>
                <P>
                    A capital inside a word reads as a word boundary, so <Pair example={KEBAB_EXAMPLES.brand} /> and{" "}
                    <Pair example={KEBAB_EXAMPLES.brandWithDigit} />. The JavaScript libraries lodash and change-case split{" "}
                    <Code>iPhone</Code> the same way. If the name is a brand, join it by hand: <Code>iphone-15-pro</Code>.
                </P>

                <H3>Names made of symbols, like C++ and C#</H3>
                <P>
                    Symbols that carry the meaning are lost: <Code>C++</Code> and <Code>C#</Code> both become <Code>c</Code>,
                    and <Pair example={KEBAB_EXAMPLES.symbols} />. Spell such names out before you convert them –{" "}
                    <Code>cpp</Code>, <Code>csharp</Code>.
                </P>

                <H3>Apostrophes and accented letters</H3>
                <P>
                    An apostrophe inside a word is dropped and the word stays whole: <Pair example={KEBAB_EXAMPLES.apostrophe} />.
                    Accented letters are kept: <Pair example={KEBAB_EXAMPLES.accents} />, which is a valid CSS class name,
                    because CSS identifiers accept letters such as é, ü and ß (
                    <SourceLink href={KEBAB_SOURCES.cssSyntax}>CSS Syntax</SourceLink>).
                </P>
                <P>
                    Package registries are stricter. An npm name cannot contain &ldquo;non-URL-safe characters&rdquo; (
                    <SourceLink href={KEBAB_SOURCES.npmName}>npm</SourceLink>), a Debian package name allows only lowercase
                    letters a–z, digits, plus and minus signs, and periods (
                    <SourceLink href={KEBAB_SOURCES.debianPolicy}>Debian</SourceLink>), and a Kubernetes name may &ldquo;contain
                    only lowercase alphanumeric characters or &apos;-&apos;&rdquo; (
                    <SourceLink href={KEBAB_SOURCES.kubernetesNames}>Kubernetes</SourceLink>). For a package name, replace
                    the accented letters by hand; the URL slug generator does that for you.
                </P>
            </section>

            {/* A14–A18 – use cases */}
            <section className="space-y-4">
                <H2 id="where-used">Where kebab-case is used</H2>
                <P>
                    kebab-case is the format for names that a browser, a shell or a file system reads, rather than a
                    programming language. MDN&apos;s glossary names the two best-known cases: CSS properties and HTML
                    attributes &ldquo;are in kebab case&rdquo; (<SourceLink href={KEBAB_SOURCES.mdnKebab}>MDN</SourceLink>).
                </P>

                <H3>CSS class names and custom properties</H3>
                <P>
                    A class name such as <Code>{KEBAB_EXAMPLES.cssClass.output}</Code> has the same shape as CSS&apos;s own
                    property names, <Code>background-color</Code> and <Code>font-family</Code> (
                    <SourceLink href={KEBAB_SOURCES.mdnKebab}>MDN</SourceLink>). A custom property is &ldquo;any property whose
                    name starts with two dashes&rdquo; (<SourceLink href={KEBAB_SOURCES.cssVariables}>CSS Variables</SourceLink>
                    ): the converter gives <Code>{KEBAB_EXAMPLES.cssCustomProperty.output}</Code>, and you add the dashes to
                    make <Code>--{KEBAB_EXAMPLES.cssCustomProperty.output}</Code>. Unlike other properties, custom property
                    names are case-sensitive, so lowercase everywhere keeps one name from becoming two.
                </P>
                <P>
                    One limit: a CSS identifier cannot start with a digit unless it is escaped (
                    <SourceLink href={KEBAB_SOURCES.cssSyntax}>CSS Syntax</SourceLink>). <Pair example={KEBAB_EXAMPLES.cssDigitFirst} />,
                    which needs a letter in front before it works as a class name.
                </P>

                <H3>HTML data and ARIA attributes</H3>
                <P>
                    A custom data attribute starts with <Code>data-</Code> and &ldquo;contains no ASCII upper alphas&rdquo; (
                    <SourceLink href={KEBAB_SOURCES.htmlData}>HTML Standard</SourceLink>), so{" "}
                    <Pair example={KEBAB_EXAMPLES.dataAttribute} />. ARIA attributes such as <Code>aria-label</Code> have the
                    same shape (<SourceLink href={KEBAB_SOURCES.mdnKebab}>MDN</SourceLink>). JavaScript reads the attribute{" "}
                    <Code>data-user-id</Code> as <Code>dataset.userId</Code>: the hyphen is dropped and the letter after it
                    becomes a capital (<SourceLink href={KEBAB_SOURCES.htmlData}>HTML Standard</SourceLink>). Vue&apos;s style
                    guide adds that in-DOM templates &ldquo;must still use kebab-case&rdquo;, because HTML ignores case (
                    <SourceLink href={KEBAB_SOURCES.vueStyle}>Vue</SourceLink>).
                </P>

                <H3>Command-line flags</H3>
                <P>
                    GNU long options &ldquo;consist of -- followed by a name made of alphanumeric characters and dashes&rdquo; (
                    <SourceLink href={KEBAB_SOURCES.glibcArguments}>GNU C Library</SourceLink>), as in <Code>--dry-run</Code>.
                    POSIX itself describes only one-character options (
                    <SourceLink href={KEBAB_SOURCES.posixArguments}>POSIX</SourceLink>). <Pair example={KEBAB_EXAMPLES.flag} />:
                    the converter returns the name, and the two leading dashes are yours to add.
                </P>

                <H3>File, folder and package names</H3>
                <P>
                    Package registries set the strictest rules. npm says: &ldquo;New packages must not have uppercase letters in
                    the name&rdquo;, and a name can be at most 214 characters long (
                    <SourceLink href={KEBAB_SOURCES.npmName}>npm</SourceLink>). PyPI compares names after every run of dots,
                    hyphens and underscores is &ldquo;replaced with a single - character&rdquo; (
                    <SourceLink href={KEBAB_SOURCES.pep503}>PEP 503</SourceLink>). Debian and Kubernetes accept lowercase
                    letters, digits and hyphens (<SourceLink href={KEBAB_SOURCES.debianPolicy}>Debian</SourceLink>,{" "}
                    <SourceLink href={KEBAB_SOURCES.kubernetesNames}>Kubernetes</SourceLink>).
                </P>
                <P>
                    For file names, Google&apos;s style guide for its developer documentation says: &ldquo;Use hyphens, not
                    underscores, to separate words&rdquo; (<SourceLink href={KEBAB_SOURCES.googleFilenames}>Google</SourceLink>
                    ). Angular&apos;s style guide separates the words of a file name with hyphens (
                    <SourceLink href={KEBAB_SOURCES.angularStyle}>Angular</SourceLink>), and Vue asks for single-file
                    component names that are &ldquo;always PascalCase or always kebab-case&rdquo; (
                    <SourceLink href={KEBAB_SOURCES.vueStyle}>Vue</SourceLink>).
                </P>
            </section>

            {/* A19 – limit of use */}
            <section className="space-y-4">
                <H2 id="why-languages-reject">Why most programming languages reject kebab-case names</H2>
                <P>
                    Because in most languages the hyphen is the minus sign. JavaScript identifiers &ldquo;can contain Unicode
                    letters, $, _, and digits&rdquo; (<SourceLink href={KEBAB_SOURCES.mdnIdentifier}>MDN</SourceLink>), and
                    Python names are built from letters, the underscore and digits (
                    <SourceLink href={KEBAB_SOURCES.pythonIdentifiers}>Python reference</SourceLink>) – neither list has a
                    hyphen. In JavaScript the <Code>-</Code> operator &ldquo;subtracts the two operands&rdquo; (
                    <SourceLink href={KEBAB_SOURCES.mdnSubtraction}>MDN</SourceLink>), so <Code>my-var</Code> reads as{" "}
                    <Code>my</Code> minus <Code>var</Code>.
                </P>
                <P>
                    A few languages are the exception. Clojure symbols can contain a hyphen (
                    <SourceLink href={KEBAB_SOURCES.clojureReader}>Clojure</SourceLink>), Raku allows one inside an identifier
                    when a letter follows it (<SourceLink href={KEBAB_SOURCES.rakuSyntax}>Raku</SourceLink>), and Common Lisp
                    names its own functions this way, as in <Code>MAKE-HASH-TABLE</Code> (
                    <SourceLink href={KEBAB_SOURCES.clhsMakeHashTable}>Common Lisp HyperSpec</SourceLink>) – hence another
                    name for the format, lisp-case. Rust shows the usual workaround: Cargo builds the library name from the
                    package name &ldquo;with any dashes replaced with underscores&rdquo; (
                    <SourceLink href={KEBAB_SOURCES.cargoTargets}>Cargo</SourceLink>), so the package{" "}
                    <Code>{KEBAB_NEIGHBOURS.snake.input}</Code> is <Code>{KEBAB_NEIGHBOURS.snake.output}</Code> in code.
                </P>
            </section>

            {/* A20 – sub-segment, returns to kebab-case */}
            <section className="space-y-4">
                <H2 id="snake-camel-slug" grouping>How kebab-case differs from snake_case, camelCase and a URL slug</H2>
                <P>
                    snake_case joins the same lowercase words with underscores, for code where a hyphen is not allowed: the{" "}
                    <InlineLink href="/snake-case-converter">snake_case converter</InlineLink> turns{" "}
                    <Code>{KEBAB_NEIGHBOURS.snake.input}</Code> into <Code>{KEBAB_NEIGHBOURS.snake.output}</Code>. camelCase
                    drops the separator and marks each word with a capital, which is how JavaScript names an HTML attribute;
                    the <InlineLink href="/camel-case-converter">camelCase converter</InlineLink> turns{" "}
                    <Code>{KEBAB_NEIGHBOURS.camel.input}</Code> into <Code>{KEBAB_NEIGHBOURS.camel.output}</Code>. A URL slug
                    uses the same hyphens but follows URL rules: the{" "}
                    <InlineLink href="/slug-generator">URL Slug Generator</InlineLink> keeps{" "}
                    <Code>{KEBAB_NEIGHBOURS.slugBrand.input}</Code> whole and turns <Code>{KEBAB_NEIGHBOURS.slugAccent.input}</Code>{" "}
                    into <Code>{KEBAB_NEIGHBOURS.slugAccent.output}</Code>. Choose kebab-case when a browser, a shell or a file
                    system reads the name.
                </P>
            </section>

            {/* A21 – supplementary */}
            <section className="space-y-5 border-t pt-10">
                <H2 id="faq">Questions about kebab-case</H2>
                <div className="space-y-4">
                    {KEBAB_FAQS.map((faq, index) => (
                        <details key={faq.question} className={cn(CARD_CLASS, "p-5")} open={index === 0}>
                            <summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                            <p className="mt-3 text-zinc-700 dark:text-zinc-300"><FaqAnswer faq={faq} /></p>
                        </details>
                    ))}
                </div>
            </section>
        </article>
    )
}
