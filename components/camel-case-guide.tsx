import type { ReactNode } from "react"
import Link from "next/link"
import {
    CAMEL_EXAMPLES,
    CAMEL_FAQS,
    CAMEL_NEIGHBOURS,
    CAMEL_SOURCES,
    CAMEL_STEPS,
    type CamelExample,
    type CamelFaq,
} from "@/lib/camel-case-content"
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
function Pair({ example }: { example: CamelExample }) {
    return (
        <>
            <Code>{example.input}</Code> becomes <Code>{example.output}</Code>
        </>
    )
}

function Example({ example }: { example: CamelExample }) {
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
function FaqAnswer({ faq }: { faq: CamelFaq }) {
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

export function CamelCaseGuide() {
    return (
        <article className="w-full max-w-4xl mx-auto space-y-12">
            {/* A1i – intro */}
            <div className="space-y-4">
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    camelCase joins words without spaces: the first word is lowercase and every next word starts with a
                    capital, as in <Code>{CAMEL_EXAMPLES.phrase.output}</Code>. The converter reads snake_case, kebab-case
                    and PascalCase as well as plain text, and <Pair example={CAMEL_EXAMPLES.acronym} />.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Languages do not agree on how an acronym looks inside a name, so check{" "}
                    <a href="#acronyms" className={LINK_CLASS}>how camelCase treats acronyms</a> in yours.
                </p>
            </div>

            {/* A2–A11 – root listing */}
            <section className="space-y-4">
                <H2 id="how-it-converts">How the converter turns text into camelCase</H2>
                <P>Nine things happen when text becomes camelCase:</P>
                <ol className="list-decimal pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                    {CAMEL_STEPS.map(({ change, why, source }) => (
                        <li key={change}>
                            <span className="font-medium text-foreground">{change}</span> {why}
                            {source ? (
                                <> (<SourceLink href={source.href}>{source.label}</SourceLink>).</>
                            ) : null}
                        </li>
                    ))}
                </ol>
                <div className="space-y-2">
                    <Example example={CAMEL_EXAMPLES.acronymInside} />
                    <Example example={CAMEL_EXAMPLES.kebab} />
                    <Example example={CAMEL_EXAMPLES.mixed} />
                </div>
            </section>

            {/* A12–A15 – the attribute only camelCase has: acronyms */}
            <section className="space-y-4">
                <H2 id="acronyms">How camelCase treats acronyms</H2>
                <P>
                    MDN&apos;s glossary admits that with acronyms &ldquo;camel casing practices vary&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.mdnCamel}>MDN</SourceLink>). The converter follows one practice,
                    Google&apos;s, and the guides that disagree with it are listed below.
                </P>

                <H3>Google style: httpServer and customerId</H3>
                <P>
                    Google&apos;s JavaScript guide lowercases everything &ldquo;(including acronyms)&rdquo; and then
                    capitalizes the first letter of each word after the first (
                    <SourceLink href={CAMEL_SOURCES.googleJsCamel}>Google JavaScript Style</SourceLink>). Its TypeScript guide
                    puts it shortly: &ldquo;use loadHttpUrl, not loadHTTPURL&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.googleTs}>Google TypeScript Style</SourceLink>). The converter does the
                    same: <Pair example={CAMEL_EXAMPLES.googleXml} /> and <Pair example={CAMEL_EXAMPLES.googleId} />. Names
                    with a capital inside a brand, such as iOS, are where the two part ways – see below.
                </P>

                <H3>.NET, Kotlin and Dart: two-letter acronyms</H3>
                <P>
                    .NET lowercases both letters of a two-letter acronym that begins a camel-cased name, as in{" "}
                    <Code>ioStream</Code> (<SourceLink href={CAMEL_SOURCES.dotnetCapitalization}>Microsoft</SourceLink>), and
                    the converter agrees: <Pair example={CAMEL_EXAMPLES.dotnetIo} />. Kotlin goes the other way: &ldquo;For
                    two-letter acronyms, use uppercase for both letters&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.kotlin}>Kotlin</SourceLink>). Dart calls two-letter acronyms &ldquo;the
                    exception&rdquo; and keeps ID, TV and UI in capitals (<SourceLink href={CAMEL_SOURCES.dart}>Effective Dart</SourceLink>).
                    In those languages <Pair example={CAMEL_EXAMPLES.userId} /> here, and you change it to{" "}
                    <Code>userID</Code> by hand.
                </P>

                <H3>Go and Swift: one case for the whole acronym</H3>
                <P>
                    Go keeps an initialism in one case, writing a URL &ldquo;never as &lsquo;Url&rsquo;&rdquo; and{" "}
                    <Code>appID</Code> rather than <Code>appId</Code> (
                    <SourceLink href={CAMEL_SOURCES.goInitialisms}>Go Code Review Comments</SourceLink>). Swift asks for
                    acronyms that are &ldquo;uniformly up- or down-cased&rdquo;, as in <Code>userSMTPServer</Code> (
                    <SourceLink href={CAMEL_SOURCES.swift}>Swift API Design Guidelines</SourceLink>). The converter gives{" "}
                    <Code>{CAMEL_EXAMPLES.goAppId.output}</Code> and <Code>{CAMEL_EXAMPLES.swiftSmtp.output}</Code>, so
                    put the capitals back by hand.
                </P>
            </section>

            {/* A16–A20 – honest limits */}
            <section className="space-y-4">
                <H2 id="human-check">Where the result needs a human check</H2>
                <P>
                    The rules read letters, not meaning, so four kinds of text come out in a form worth reading before you use
                    it.
                </P>

                <H3>Names with an inner capital, like iPhone and IPv6</H3>
                <P>
                    A capital inside a word reads as a word boundary. Sometimes that lands right:{" "}
                    <Pair example={CAMEL_EXAMPLES.brandLucky} />. More often it does not:{" "}
                    <Pair example={CAMEL_EXAMPLES.brandIos} />, and <Pair example={CAMEL_EXAMPLES.brandLong} />, where
                    Google&apos;s guide writes <Code>supportsIpv6OnIos</Code> and says a word such as iOS &ldquo;is not
                    really in camel case per se&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.googleJsCamel}>Google JavaScript Style</SourceLink>). Fix such names by
                    hand.
                </P>

                <H3>Names that start with a digit</H3>
                <P>
                    <Pair example={CAMEL_EXAMPLES.digitFirst} />, which is not a valid JavaScript name: identifiers
                    &ldquo;are not allowed to start with numbers&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.mdnIdentifiers}>MDN</SourceLink>). Write the number as a word:{" "}
                    <Code>secondPlace</Code>.
                </P>

                <H3>Reserved words and leading symbols</H3>
                <P>
                    <Code>{CAMEL_EXAMPLES.reserved.input}</Code> stays <Code>{CAMEL_EXAMPLES.reserved.output}</Code>, and a
                    reserved word cannot be a JavaScript variable, though it can be an object key (
                    <SourceLink href={CAMEL_SOURCES.mdnIdentifiers}>MDN</SourceLink>). Leading symbols disappear:{" "}
                    <Pair example={CAMEL_EXAMPLES.underscore} />, <Pair example={CAMEL_EXAMPLES.dollar} /> and{" "}
                    <Pair example={CAMEL_EXAMPLES.hash} />. Some of them carry a meaning. In C#, &ldquo;private and
                    internal non-constant instance fields start with an underscore&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.csharpIdentifiers}>Microsoft</SourceLink>), and a JavaScript private
                    class member is written with a <Code>#</Code> prefix (
                    <SourceLink href={CAMEL_SOURCES.mdnPrivate}>MDN</SourceLink>). Add the symbol back by hand.
                </P>

                <H3>Accented letters</H3>
                <P>
                    Accented letters are kept: <Pair example={CAMEL_EXAMPLES.accents} />. JavaScript accepts that, since
                    identifiers may use Unicode letters (<SourceLink href={CAMEL_SOURCES.mdnIdentifiers}>MDN</SourceLink>),
                    but Google&apos;s guide first converts the phrase &ldquo;to plain ASCII&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.googleJsCamel}>Google JavaScript Style</SourceLink>), so in code that
                    follows it, write <Code>cafeResume</Code>.
                </P>
            </section>

            {/* A21–A25 – use cases */}
            <section className="space-y-4">
                <H2 id="where-used">Where camelCase is used</H2>
                <P>
                    camelCase is the format for names of variables, functions and properties in languages that read a hyphen
                    as a minus sign and do not use underscores for the job.
                </P>

                <H3>JavaScript and TypeScript variables and functions</H3>
                <P>
                    Google&apos;s JavaScript guide writes method names and local variable names in lowerCamelCase (
                    <SourceLink href={CAMEL_SOURCES.googleJsMethods}>Google JavaScript Style</SourceLink>), and its TypeScript
                    guide extends it to variables, parameters, functions, methods and properties (
                    <SourceLink href={CAMEL_SOURCES.googleTs}>Google TypeScript Style</SourceLink>):{" "}
                    <Pair example={CAMEL_EXAMPLES.jsFunction} />. Classes and types take PascalCase instead.
                </P>

                <H3>Java, Kotlin, Swift and Dart</H3>
                <P>
                    Oracle&apos;s Java conventions, a historical document, write methods &ldquo;in mixed case with the first
                    letter lowercase&rdquo; (<SourceLink href={CAMEL_SOURCES.oracleJava}>Oracle</SourceLink>), and
                    Google&apos;s Java guide keeps the rule (<SourceLink href={CAMEL_SOURCES.googleJava}>Google Java Style</SourceLink>).
                    Kotlin names functions, properties and local variables in camel case &ldquo;without underscores&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.kotlin}>Kotlin</SourceLink>). In Swift, &ldquo;Everything else is
                    lowerCamelCase&rdquo; after types and protocols (<SourceLink href={CAMEL_SOURCES.swift}>Swift</SourceLink>),
                    and Dart names every identifier other than a type in lowerCamelCase (
                    <SourceLink href={CAMEL_SOURCES.dart}>Effective Dart</SourceLink>).
                </P>

                <H3>JSON keys</H3>
                <P>
                    Google&apos;s JSON style guide says &ldquo;Property names must be lower camel-cased, ASCII strings&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.googleJson}>Google JSON Style Guide</SourceLink>), so{" "}
                    <Pair example={CAMEL_EXAMPLES.jsonKey} />. That is Google&apos;s rule for its APIs, not part of the JSON
                    format itself.
                </P>

                <H3>CSS properties and data attributes in JavaScript</H3>
                <P>
                    In JavaScript a CSS property loses its hyphens: the CSSOM draft turns <Code>font-size</Code> into the{" "}
                    <Code>fontSize</Code> attribute (<SourceLink href={CAMEL_SOURCES.cssom}>CSSOM</SourceLink>), and React
                    wants style keys in camelCase, &ldquo;for example fontWeight instead of font-weight&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.react}>React</SourceLink>). Here <Pair example={CAMEL_EXAMPLES.cssProperty} />.
                    Data attributes work the same way through <Code>dataset</Code>, except that the <Code>data-</Code> prefix
                    goes too: <Code>data-user-id</Code> is read as <Code>dataset.userId</Code> (
                    <SourceLink href={CAMEL_SOURCES.mdnDataset}>MDN</SourceLink>), while the converter gives{" "}
                    <Code>{CAMEL_EXAMPLES.dataAttribute.output}</Code>.
                </P>
            </section>

            {/* A26 – limit of use */}
            <section className="space-y-4">
                <H2 id="not-the-convention">Where camelCase is not the convention</H2>
                <P>
                    Python allows mixedCase &ldquo;only in contexts where that&apos;s already the prevailing style&rdquo; (
                    <SourceLink href={CAMEL_SOURCES.pep8}>PEP 8</SourceLink>) and names functions in snake_case. .NET uses
                    camelCasing &ldquo;only for parameter names&rdquo; and PascalCasing for public members (
                    <SourceLink href={CAMEL_SOURCES.dotnetCapitalization}>Microsoft</SourceLink>). Constants in JavaScript use
                    CONSTANT_CASE (<SourceLink href={CAMEL_SOURCES.googleJsConstants}>Google JavaScript Style</SourceLink>),
                    so <Code>MAX_RETRY_COUNT</Code> stays in capitals. camelCase belongs where the language already uses it.
                </P>
            </section>

            {/* A27 – sub-segment, returns to camelCase */}
            <section className="space-y-4">
                <H2 id="pascal-snake-kebab" grouping>How camelCase differs from PascalCase, snake_case and kebab-case</H2>
                <P>
                    All four split the words the same way and differ in how they join them. PascalCase capitalizes the first
                    word too, for classes, types and components: the{" "}
                    <InlineLink href="/pascal-case-converter">PascalCase converter</InlineLink> turns{" "}
                    <Code>{CAMEL_NEIGHBOURS.pascal.input}</Code> into <Code>{CAMEL_NEIGHBOURS.pascal.output}</Code>.
                    snake_case joins lowercase words with underscores, the choice of Python, Rust and SQL: the{" "}
                    <InlineLink href="/snake-case-converter">snake_case Converter</InlineLink> gives{" "}
                    <Code>{CAMEL_NEIGHBOURS.snake.output}</Code>. kebab-case uses hyphens, for names a browser or a shell
                    reads: the <InlineLink href="/kebab-case-converter">kebab-case Converter</InlineLink> gives{" "}
                    <Code>{CAMEL_NEIGHBOURS.kebab.output}</Code>. Choose camelCase when the name lives inside JavaScript,
                    Java, Kotlin, Swift or Dart code.
                </P>
            </section>

            {/* A28 – supplementary */}
            <section className="space-y-5 border-t pt-10">
                <H2 id="faq">Questions about camelCase</H2>
                <div className="space-y-4">
                    {CAMEL_FAQS.map((faq, index) => (
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
