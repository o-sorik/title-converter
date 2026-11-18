import type { ReactNode } from "react"
import Link from "next/link"
import {
    SNAKE_EXAMPLES,
    SNAKE_FAQS,
    SNAKE_NEIGHBOURS,
    SNAKE_SOURCES,
    SNAKE_STEPS,
    SNAKE_TO_UPPER,
    type SnakeExample,
    type SnakeFaq,
} from "@/lib/snake-case-content"
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
function Pair({ example }: { example: SnakeExample }) {
    return (
        <>
            <Code>{example.input}</Code> becomes <Code>{example.output}</Code>
        </>
    )
}

function Example({ example }: { example: SnakeExample }) {
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
function FaqAnswer({ faq }: { faq: SnakeFaq }) {
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

export function SnakeCaseGuide() {
    return (
        <article className="w-full max-w-4xl mx-auto space-y-12">
            {/* A1i – intro */}
            <div className="space-y-4">
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    snake_case writes words in lowercase and joins them with underscores: <Code>{SNAKE_EXAMPLES.camel.output}</Code>.
                    The converter reads camelCase, PascalCase and kebab-case as well as plain text:{" "}
                    <Pair example={SNAKE_EXAMPLES.camel} />, <Pair example={SNAKE_EXAMPLES.acronym} /> and{" "}
                    <Pair example={SNAKE_EXAMPLES.kebab} />. Underscores at the start or end of a name are kept, so{" "}
                    <Pair example={SNAKE_EXAMPLES.private} />.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Brand names, leading digits, Python&apos;s underscores and accented letters are the four places{" "}
                    <a href="#human-check" className={LINK_CLASS}>where the word split needs a human check</a>.
                </p>
            </div>

            {/* A2–A9 – root listing */}
            <section className="space-y-4">
                <H2 id="how-it-splits">How the converter splits text into snake_case words</H2>
                <P>Eight things happen when text becomes snake_case:</P>
                <ol className="list-decimal pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                    {SNAKE_STEPS.map(({ change, why, source }) => (
                        <li key={change}>
                            <span className="font-medium text-foreground">{change}</span> {why}
                            {source ? (
                                <> (<SourceLink href={source.href}>{source.label}</SourceLink>).</>
                            ) : null}
                        </li>
                    ))}
                </ol>
                <div className="space-y-2">
                    <Example example={SNAKE_EXAMPLES.acronymInside} />
                    <Example example={SNAKE_EXAMPLES.mixed} />
                    <Example example={SNAKE_EXAMPLES.private} />
                </div>
                <P>
                    These rules read letters, not meaning, so a few kinds of text come out in a form worth reading before you
                    use it.
                </P>
            </section>

            {/* A10–A14 – honest limits */}
            <section className="space-y-4">
                <H2 id="human-check">Where the word split needs a human check</H2>
                <P>
                    Four kinds of text need a second look: brand names with a capital inside, names that start with a digit or
                    a symbol, underscores that carry a meaning, and accented letters.
                </P>

                <H3>Brand names with an inner capital, like iPhone and OAuth</H3>
                <P>
                    A capital inside a word reads as a word boundary, so <Pair example={SNAKE_EXAMPLES.brand} /> and{" "}
                    <Pair example={SNAKE_EXAMPLES.brandWithDigit} />. The JavaScript libraries lodash and change-case split{" "}
                    <Code>iPhone</Code> the same way. Rust&apos;s API guidelines go further: in snake_case,{" "}
                    &ldquo;a &lsquo;word&rsquo; should never consist of a single letter unless it is the last &lsquo;word&rsquo;&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.rustNaming}>Rust API Guidelines</SourceLink>). If the name is a brand,
                    join it by hand: <Code>iphone_15_pro</Code>.
                </P>

                <H3>Names that start with a digit or a symbol</H3>
                <P>
                    <Pair example={SNAKE_EXAMPLES.digitFirst} />, which works as a quoted database column but not as a
                    variable: a Python name &ldquo;cannot start with a digit&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.pythonIdentifiers}>Python reference</SourceLink>), and neither can a C
                    name (<SourceLink href={SNAKE_SOURCES.cIdentifiers}>cppreference</SourceLink>). Put a letter in front:{" "}
                    <Code>second_place</Code>. Symbols that carry the meaning are lost too: <Pair example={SNAKE_EXAMPLES.symbols} />,
                    so spell such names out first – <Code>cpp</Code>, <Code>csharp</Code>.
                </P>

                <H3>Leading underscores, like _private and __init__</H3>
                <P>
                    The converter keeps underscores at the start and end of the input, because Python gives them a meaning.
                    PEP 8 describes <Code>_single_leading_underscore</Code> as a weak &ldquo;internal use&rdquo; indicator and{" "}
                    <Code>__double_leading_and_trailing_underscore__</Code> as &ldquo;magic&rdquo; objects or attributes (
                    <SourceLink href={SNAKE_SOURCES.pep8NamingStyles}>PEP 8</SourceLink>). So <Pair example={SNAKE_EXAMPLES.private} />{" "}
                    and <Code>{SNAKE_EXAMPLES.dunder.input}</Code> stays <Code>{SNAKE_EXAMPLES.dunder.output}</Code>. Check
                    them before you keep them: in C, names that begin with an underscore followed by a capital letter or by
                    another underscore are reserved (<SourceLink href={SNAKE_SOURCES.cIdentifiers}>cppreference</SourceLink>).
                </P>

                <H3>Accented letters</H3>
                <P>
                    Accented letters are kept: <Pair example={SNAKE_EXAMPLES.accents} />. That is a valid name in Python,
                    whose identifiers accept non-ASCII letters (
                    <SourceLink href={SNAKE_SOURCES.pythonIdentifiers}>Python reference</SourceLink>), and in PostgreSQL,
                    which allows &ldquo;letters with diacritical marks and non-Latin letters&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.postgresIdentifiers}>PostgreSQL</SourceLink>). Environment variables
                    are stricter: the names the standard shell utilities use consist &ldquo;solely of uppercase letters,
                    digits, and the &lt;underscore&gt;&rdquo; (<SourceLink href={SNAKE_SOURCES.posixEnv}>POSIX</SourceLink>),
                    so replace accented letters by hand there.
                </P>
            </section>

            {/* A15–A19 – use cases */}
            <section className="space-y-4">
                <H2 id="where-used">Where snake_case is used</H2>
                <P>
                    snake_case is the format for names that a programming language or a database reads, where a hyphen would
                    be taken for a minus sign. The Rust compiler&apos;s documentation gives the shape: all characters &ldquo;in
                    lowercase, with words separated with a single underscore&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.rustcLint}>rustc</SourceLink>).
                </P>

                <H3>Python functions, variables and modules</H3>
                <P>
                    PEP 8 asks for function names in &ldquo;lowercase, with words separated by underscores as necessary to
                    improve readability&rdquo;, and variable names follow the same rule (
                    <SourceLink href={SNAKE_SOURCES.pep8Functions}>PEP 8</SourceLink>): <Pair example={SNAKE_EXAMPLES.pythonFunction} />.
                    mixedCase is allowed &ldquo;only in contexts where that&apos;s already the prevailing style&rdquo;. Module
                    names are short and lowercase, and &ldquo;Underscores can be used in the module name if it improves
                    readability&rdquo;, so <Pair example={SNAKE_EXAMPLES.pythonModule} />; in package names &ldquo;the use of
                    underscores is discouraged&rdquo; (<SourceLink href={SNAKE_SOURCES.pep8Modules}>PEP 8</SourceLink>).
                </P>

                <H3>Rust, Ruby and Elixir</H3>
                <P>
                    Rust uses snake_case for &ldquo;value-level&rdquo; constructs – modules, functions, methods and local
                    variables (<SourceLink href={SNAKE_SOURCES.rustNaming}>Rust API Guidelines</SourceLink>), and its
                    compiler warns by default when one of them is not in snake case (
                    <SourceLink href={SNAKE_SOURCES.rustcLint}>rustc</SourceLink>): <Pair example={SNAKE_EXAMPLES.rustFunction} />.
                    Ruby&apos;s documentation says &ldquo;The convention is to use underscores to separate words in a multiword
                    method name&rdquo; (<SourceLink href={SNAKE_SOURCES.rubyMethods}>Ruby docs</SourceLink>), and the
                    community Ruby Style Guide extends it to symbols and variables (
                    <SourceLink href={SNAKE_SOURCES.rubyStyleGuide}>Ruby Style Guide</SourceLink>). Elixir is the strictest:
                    developers &ldquo;must use snake_case when defining variables, function names, module attributes&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.elixirNaming}>Elixir</SourceLink>).
                </P>

                <H3>Database tables and columns</H3>
                <P>
                    In PostgreSQL, &ldquo;unquoted names are always folded to lower case&rdquo;, while quoting a name makes it
                    case-sensitive (<SourceLink href={SNAKE_SOURCES.postgresIdentifiers}>PostgreSQL</SourceLink>). A column
                    named <Code>firstName</Code> has to be written in double quotes in every query; <Pair example={SNAKE_EXAMPLES.column} />,
                    which needs no quotes at all. MySQL adds another reason: table names are &ldquo;not case-sensitive in
                    Windows, but are case-sensitive in most varieties of Unix&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.mysqlCase}>MySQL</SourceLink>), and lowercase with underscores reads the
                    same on both.
                </P>

                <H3>Constants and environment variables</H3>
                <P>
                    Constants use the same underscores in capital letters, a format Rust&apos;s guidelines call
                    SCREAMING_SNAKE_CASE (<SourceLink href={SNAKE_SOURCES.rustNaming}>Rust API Guidelines</SourceLink>).
                    PEP 8 writes constants &ldquo;in all capital letters with underscores separating words&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.pep8Constants}>PEP 8</SourceLink>), Google&apos;s JavaScript style guide
                    calls it CONSTANT_CASE (<SourceLink href={SNAKE_SOURCES.googleJs}>Google</SourceLink>), and PHP declares
                    class constants &ldquo;in all upper case with underscore separators&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.psr1}>PSR-1</SourceLink>). Environment variables have the same shape (
                    <SourceLink href={SNAKE_SOURCES.posixEnv}>POSIX</SourceLink>).
                </P>
                <P>
                    This converter returns lowercase, so a constant takes two steps: <Pair example={SNAKE_EXAMPLES.constant} />,
                    then the uppercase mode turns <Code>{SNAKE_TO_UPPER.constant.input}</Code> into{" "}
                    <Code>{SNAKE_TO_UPPER.constant.output}</Code>. In the same way <Code>{SNAKE_EXAMPLES.envVar.input}</Code>{" "}
                    ends up as <Code>{SNAKE_TO_UPPER.envVar.output}</Code>.
                </P>
            </section>

            {/* A20 – limit of use */}
            <section className="space-y-4">
                <H2 id="not-the-convention">Where snake_case is not the convention</H2>
                <P>
                    Some languages that accept underscores still choose capitals. Go&apos;s convention is &ldquo;MixedCaps or
                    mixedCaps rather than underscores to write multiword names&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.goMixedCaps}>Effective Go</SourceLink>). PHP method names &ldquo;MUST be
                    declared in camelCase&rdquo; (<SourceLink href={SNAKE_SOURCES.psr1}>PSR-1</SourceLink>). For JSON,
                    Google&apos;s own style guide says &ldquo;Property names must be lower camel-cased&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.googleJson}>Google JSON Style Guide</SourceLink>), though that is
                    Google&apos;s rule rather than a standard. snake_case belongs where the language or the database already
                    uses it.
                </P>
            </section>

            {/* A21 – sub-segment, returns to snake_case */}
            <section className="space-y-4">
                <H2 id="kebab-camel" grouping>How snake_case differs from kebab-case and camelCase</H2>
                <P>
                    kebab-case splits the words the same way but joins them with hyphens, for names a browser, a shell or a
                    file system reads: the <InlineLink href="/kebab-case-converter">kebab-case Converter</InlineLink> turns{" "}
                    <Code>{SNAKE_NEIGHBOURS.kebab.input}</Code> into <Code>{SNAKE_NEIGHBOURS.kebab.output}</Code>. The two
                    meet in Python packaging: a package name may contain hyphens, and PyPI compares names after every run of
                    dots, hyphens and underscores is &ldquo;replaced with a single - character&rdquo; (
                    <SourceLink href={SNAKE_SOURCES.pep503}>PEP 503</SourceLink>), but the module you import is{" "}
                    <Code>{SNAKE_NEIGHBOURS.fromKebab.output}</Code>. camelCase drops the separator and marks each word with
                    a capital, the usual choice for JavaScript and JSON: the{" "}
                    <InlineLink href="/camel-case-converter">camelCase converter</InlineLink> turns{" "}
                    <Code>{SNAKE_NEIGHBOURS.camel.input}</Code> into <Code>{SNAKE_NEIGHBOURS.camel.output}</Code>. Choose
                    snake_case when the name lives inside Python, Rust, Ruby or SQL.
                </P>
            </section>

            {/* A22 – supplementary */}
            <section className="space-y-5 border-t pt-10">
                <H2 id="faq">Questions about snake_case</H2>
                <div className="space-y-4">
                    {SNAKE_FAQS.map((faq, index) => (
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
