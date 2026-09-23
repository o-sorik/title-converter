import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { BreadcrumbListJsonLd, FAQPageJsonLd } from "@/components/json-ld"
import { convertWithSegments } from "@/lib/converters"
import {
    ANATOMY_RULES,
    DISAGREEMENT_ROWS,
    ENGINE_REASON_SAMPLES,
    getRulesGuideHubViewModel,
    PUBLISHED_STYLES,
    RULES_GUIDE_EXAMPLES,
    SENTENCE_CASE_EXAMPLE,
    STYLE_LABELS,
    STYLE_SOURCES,
    UNIVERSAL_RULES,
    type ExampleId,
    type GuidanceStyle,
    type PublishedStyle,
} from "@/lib/rules-guide-content"
import { parseConverterInitialStateFromSearchParams, toConverterContext } from "@/lib/converter-context"
import { SITE_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"

export const revalidate = 604800

const PAGE_TITLE = "Title Capitalization Rules by Style Guide: AP, APA, MLA, Chicago"
const PAGE_DESCRIPTION =
    "What every style guide capitalizes in a title, where AP, APA, MLA and Chicago disagree word by word, and how each rule applies to your own headline."

export const metadata: Metadata = {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: `${SITE_URL}/capitalization-rules-guide`,
    },
    openGraph: {
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        type: "website",
        url: `${SITE_URL}/capitalization-rules-guide`,
        siteName: "Title Case Converter Online",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
    },
}

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-foreground cursor-pointer"
const CARD_CLASS = "rounded-xl border bg-white/70 dark:bg-zinc-900/60"
const CODE_CLASS = "font-mono text-[0.85em] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded"

interface RulesGuidePageProps {
    searchParams?: Promise<Record<string, string | string[] | undefined>>
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
    return <Link href={href} className={LINK_CLASS}>{children}</Link>
}

function H2({ id, children }: { id: string; children: ReactNode }) {
    return <h2 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight">{children}</h2>
}

function H3({ children, grouping = false }: { children: ReactNode; grouping?: boolean }) {
    return <h3 className={cn("text-xl font-semibold tracking-tight pt-2", grouping && "italic")}>{children}</h3>
}

function H4({ children }: { children: ReactNode }) {
    return <h4 className="text-base font-semibold tracking-tight pt-1">{children}</h4>
}

function P({ children }: { children: ReactNode }) {
    return <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{children}</p>
}

/** One example that reads the same in every guide: input, then the converted title. */
function Example({ id }: { id: ExampleId }) {
    const example = RULES_GUIDE_EXAMPLES[id]
    return (
        <p className="text-sm text-muted-foreground">
            <code className={CODE_CLASS}>{example.input}</code>
            <span aria-hidden="true"> → </span>
            <span className="sr-only"> becomes </span>
            <code className={cn(CODE_CLASS, "text-foreground")}>{example.outputs.ap}</code>
        </p>
    )
}

/** One example converted in each published guide, with the visitor's own style first-class. */
function StyleOutputs({ id, focus }: { id: ExampleId; focus: GuidanceStyle }) {
    const example = RULES_GUIDE_EXAMPLES[id]
    return (
        <div className={cn(CARD_CLASS, "p-4 space-y-2")}>
            <p className="text-sm text-muted-foreground">
                Input: <code className={CODE_CLASS}>{example.input}</code>
            </p>
            <ul className="space-y-1 text-sm">
                {PUBLISHED_STYLES.map((style) => (
                    <li
                        key={style}
                        className={cn(
                            "flex flex-wrap gap-x-3 rounded px-2 py-1",
                            style === focus && "bg-zinc-100 dark:bg-zinc-800"
                        )}
                    >
                        <span className="w-16 shrink-0 font-semibold">{STYLE_LABELS[style]}</span>
                        <code className="font-mono">{example.outputs[style]}</code>
                    </li>
                ))}
            </ul>
        </div>
    )
}

/** Each word of one title labelled with the rule that decides it – the diagram mirrors the section headings. */
function TitleAnatomy() {
    return (
        <figure className={cn(CARD_CLASS, "p-5 space-y-4")}>
            <ol className="flex flex-wrap gap-x-3 gap-y-4" aria-label="Rule behind each word">
                {RULES_GUIDE_EXAMPLES.anatomy.outputs.mla.split(" ").map((word, index) => (
                    <li key={index} className="flex flex-col items-center gap-1">
                        <span
                            className={cn(
                                "font-mono text-base px-1.5 rounded",
                                ANATOMY_RULES[index]?.differsByStyle
                                    ? "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200"
                                    : "text-foreground"
                            )}
                        >
                            {word}
                        </span>
                        <span className="text-[11px] leading-tight text-muted-foreground text-center max-w-24">{ANATOMY_RULES[index]?.rule}</span>
                    </li>
                ))}
            </ol>
            <figcaption className="text-sm text-muted-foreground">
                Only the two highlighted words change between style guides. Every other word gets the same decision in AP, APA,
                MLA and Chicago.
            </figcaption>
        </figure>
    )
}

export default async function CapitalizationRulesGuidePage({ searchParams }: RulesGuidePageProps) {
    const resolvedParams = (await searchParams) ?? {}
    const styleParam = Array.isArray(resolvedParams.style) ? resolvedParams.style[0] : resolvedParams.style
    const modeParam = Array.isArray(resolvedParams.mode) ? resolvedParams.mode[0] : resolvedParams.mode
    const converterInitialState = parseConverterInitialStateFromSearchParams(resolvedParams)
    const model = getRulesGuideHubViewModel(styleParam, modeParam, toConverterContext(converterInitialState))
    const focus = model.activeStyle
    const diffStyle: PublishedStyle = focus === "standard" ? "mla" : focus
    // Convert a title already cased in another guide, so the demo shows words moving both ways.
    const diffInput = diffStyle === "ap" || diffStyle === "apa"
        ? RULES_GUIDE_EXAMPLES.fourStyles.outputs.mla
        : RULES_GUIDE_EXAMPLES.fourStyles.outputs.ap
    const diff = convertWithSegments(diffInput, "title", { titleStyle: diffStyle })

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <SiteHeader containerClassName="max-w-5xl" />

            <BreadcrumbListJsonLd items={[
                { name: "Home", item: SITE_URL },
                { name: "Capitalization Rules Guide", item: `${SITE_URL}/capitalization-rules-guide` },
            ]} />
            <FAQPageJsonLd faqs={model.faqs} />

            <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-4xl space-y-12">
                <header className="space-y-4">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Reference guide</p>
                    <h1 className="text-4xl font-extrabold tracking-tight">Title Capitalization Rules by Style Guide</h1>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        Every major style guide capitalizes the first word, the last word and every noun, pronoun, verb, adjective
                        and adverb in a title. The guides split on short words: AP and APA capitalize any word of four letters or
                        more, Chicago capitalizes prepositions of five letters or more, and MLA lowercases prepositions at any length.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        The converter on this site applies each of these rules and names the rule behind every word it changes. It
                        also reads the shape of what you paste: a title typed in all caps is normalized, while a deliberate acronym
                        in ordinary text is kept.
                    </p>
                    {model.didFallbackToStandard && (
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                            Unsupported style parameter detected. Showing Standard guidance for safety.
                        </p>
                    )}
                    {model.hasStyleFocus && !model.didFallbackToStandard && focus !== "standard" && (
                        <p className="text-sm text-muted-foreground">
                            Highlighting <span className="font-semibold text-foreground">{STYLE_LABELS[focus]}</span> in the
                            tables below. {model.styleSummary}
                        </p>
                    )}
                </header>

                <nav aria-label="On this page" className={cn(CARD_CLASS, "p-4")}>
                    <p className="text-sm font-medium text-foreground mb-2">On this page</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                        <a href="#shared-rules" className="text-primary hover:underline underline-offset-4 cursor-pointer">Shared rules</a>
                        <span className="text-muted-foreground/40">|</span>
                        <a href="#where-they-disagree" className="text-primary hover:underline underline-offset-4 cursor-pointer">Where they disagree</a>
                        <span className="text-muted-foreground/40">|</span>
                        <a href="#four-guides" className="text-primary hover:underline underline-offset-4 cursor-pointer">The four guides</a>
                        <span className="text-muted-foreground/40">|</span>
                        <a href="#converting" className="text-primary hover:underline underline-offset-4 cursor-pointer">Converting a title</a>
                        <span className="text-muted-foreground/40">|</span>
                        <a href="#faq" className="text-primary hover:underline underline-offset-4 cursor-pointer">Questions</a>
                    </div>
                </nav>

                {/* A2 – root listing */}
                <section className="space-y-4">
                    <H2 id="shared-rules">What every style guide capitalizes</H2>
                    <P>Seven rules hold in AP, APA, MLA and Chicago alike:</P>
                    <ol className="list-decimal pl-6 space-y-1.5 text-zinc-700 dark:text-zinc-300">
                        {UNIVERSAL_RULES.map((rule) => <li key={rule}>{rule}</li>)}
                    </ol>
                    <P>Everything else, prepositions above all, is where the style guides part ways.</P>
                </section>

                {/* A3 – comparison */}
                <section className="space-y-5">
                    <H2 id="where-they-disagree">Where the style guides disagree, word by word</H2>
                    <P>
                        The four guides agree on position and on most parts of speech. They disagree on one question: how long a
                        preposition has to be before it earns a capital. The table shows each decision on a real word.
                    </P>
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-zinc-50 dark:bg-zinc-900">
                                    <th className="text-left p-3 font-semibold min-w-[200px]">Word</th>
                                    {PUBLISHED_STYLES.map((style) => (
                                        <th
                                            key={style}
                                            className={cn("text-left p-3 font-semibold min-w-[110px]", style === focus && "bg-zinc-100 dark:bg-zinc-800")}
                                        >
                                            {STYLE_LABELS[style]}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {DISAGREEMENT_ROWS.map((row) => (
                                    <tr key={row.wordType} className="border-b last:border-b-0">
                                        <td className="p-3 align-top">
                                            <div className="font-medium">{row.wordType}</div>
                                            <div className="text-xs text-muted-foreground mt-0.5">&ldquo;{row.word}&rdquo;</div>
                                        </td>
                                        {PUBLISHED_STYLES.map((style) => (
                                            <td
                                                key={style}
                                                className={cn(
                                                    "p-3 align-top",
                                                    row.verdicts[style] === "Capitalize" ? "text-emerald-700 dark:text-emerald-400" : "text-blue-700 dark:text-blue-400",
                                                    style === focus && "bg-zinc-100 dark:bg-zinc-800"
                                                )}
                                            >
                                                {row.verdicts[style]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <P>
                        Put a four-letter and a seven-letter preposition into one title and three different results come out. AP
                        and APA land on the same output here, as they do for most titles.
                    </P>
                    <StyleOutputs id="fourStyles" focus={focus} />
                    <TitleAnatomy />

                    <H3 grouping>Which small words does each style lowercase?</H3>
                    <P>
                        Three classes of small words stay lowercase inside a title: articles, coordinating conjunctions and
                        prepositions, plus &ldquo;to&rdquo;. Prepositions are the only class where the guides disagree. The full
                        word list lives in{" "}
                        <InlineLink href="/blog/what-words-are-not-capitalized-in-a-title">What Words Are Not Capitalized in a Title?</InlineLink>
                    </P>

                    <H4>Articles carry no weight in any style</H4>
                    <P>
                        &ldquo;A&rdquo;, &ldquo;an&rdquo; and &ldquo;the&rdquo; stay lowercase in every style guide unless they
                        open the title or the subtitle. An article carries grammar, not meaning, so no guide gives it a capital
                        inside the title.
                    </P>
                    <Example id="article" />

                    <H4>Coordinating conjunctions stay lowercase</H4>
                    <P>
                        The seven coordinating conjunctions are and, but, or, nor, for, yet and so. APA&apos;s four-letter rule never
                        reaches them, because all seven are shorter than four letters. Subordinating conjunctions such as because,
                        if and while are capitalized in every guide.
                    </P>
                    <Example id="conjunction" />

                    <H4>Prepositions cross a length threshold</H4>
                    <P>
                        AP and APA capitalize prepositions of four letters or more; Chicago draws the line at five; MLA lowercases
                        every preposition regardless of length. So &ldquo;with&rdquo; and &ldquo;from&rdquo; are capitalized
                        only in AP and APA, while &ldquo;about&rdquo; and &ldquo;between&rdquo; are capitalized everywhere except
                        MLA.
                    </P>
                    <P>
                        A preposition that belongs to a phrasal verb is capitalized in every style guide, because it works as
                        part of the verb rather than as a preposition.
                    </P>
                    <Example id="phrasalVerb" />

                    <H4>&ldquo;To&rdquo; stays lowercase as a preposition and as an infinitive</H4>
                    <P>
                        Inside a title, &ldquo;to&rdquo; is lowercase in all four guides, whether it points somewhere or marks an
                        infinitive. Only the first and last positions give it a capital. More examples:{" "}
                        <InlineLink href="/blog/to-capitalized-in-title-case">Is &ldquo;To&rdquo; Capitalized in Title Case? Infinitive vs Preposition</InlineLink>
                    </P>
                    <Example id="infinitive" />

                    <H3 grouping>What happens at the edges of a title?</H3>
                    <P>Position outranks part of speech in all four guides: no word at an edge of a title stays lowercase.</P>

                    <H4>The first word is capitalized in every style</H4>
                    <P>Even an article or &ldquo;to&rdquo; takes a capital when it opens the title.</P>
                    <Example id="firstWord" />

                    <H4>A subtitle after a colon restarts the rule</H4>
                    <P>
                        The first word after a colon inside a title is capitalized in all four guides, so the subtitle starts
                        like a new title. Inside a sentence the guides disagree, which is covered in{" "}
                        <InlineLink href="/blog/do-you-capitalize-after-a-colon">Do You Capitalize After a Colon?</InlineLink>
                    </P>
                    <Example id="subtitle" />

                    <H4>The last word keeps its capital regardless of part of speech</H4>
                    <P>A title that ends on a preposition still ends on a capital.</P>
                    <Example id="lastWord" />

                    <H3 grouping>How are compounds and brand names treated?</H3>
                    <P>A hyphenated compound and a brand name are the two cases where a word cannot be decided as a single unit.</P>

                    <H4>Hyphenated compounds split into two decisions</H4>
                    <P>
                        The first part of a compound is capitalized. The second part goes through the same small-word rule as the
                        rest of the title: both parts of a hyphenated compound are capitalized unless the second part is an
                        article, a short preposition or a coordinating conjunction.
                    </P>
                    <Example id="hyphenated" />
                    <Example id="stepByStep" />

                    <H4>Irregular casing survives conversion</H4>
                    <P>
                        A word with a capital letter after its first position, such as iPhone or eBay, is kept exactly as typed,
                        and acronyms such as NASA and PhD keep their form. A brand written entirely in lowercase, like adidas,
                        carries no signal to read, so the converter capitalizes it like any other word.
                    </P>
                    <Example id="irregular" />
                    <Example id="acronyms" />
                </section>

                {/* A16 – the four guides */}
                <section className="space-y-5">
                    <H2 id="four-guides">The four style guides in detail</H2>
                    <P>
                        Newsrooms follow AP, psychology and the social sciences follow APA, the humanities follow MLA, and book
                        publishers follow Chicago. Each one adds a rule the other three do not have.
                    </P>

                    <H3>AP style trades academic rules for newsroom speed</H3>
                    <P>
                        AP is the only guide of the four that treats headlines differently from the titles of books, films and
                        songs. The full rule set is in{" "}
                        <InlineLink href="/blog/ap-title-capitalization-basics">AP Style Headlines: Capitalization Rules</InlineLink>
                    </P>

                    <H4>AP composition titles cap words of four letters and up</H4>
                    <P>
                        For composition titles AP capitalizes every principal word, including prepositions and conjunctions of four
                        or more letters. &ldquo;With&rdquo; sits exactly on that line.
                    </P>
                    <StyleOutputs id="apComposition" focus={focus} />

                    <H4>AP news headlines switch to sentence case</H4>
                    <P>
                        An AP news headline capitalizes only the first word and proper nouns, and the first word after a colon is
                        always capitalized. The converter&apos;s AP preset applies the composition-title rule; for an AP news
                        headline, use the <InlineLink href="/sentence-case-converter">Sentence Case Converter</InlineLink> instead.
                    </P>

                    <H4>Job titles lose their capital after a name</H4>
                    <P>
                        AP capitalizes a formal title before a name, as in President Lincoln, and lowercases it after the name or
                        on its own, as in Abraham Lincoln, the president. The same logic applies to &ldquo;editor in chief&rdquo;.
                        Single words such as &ldquo;internet&rdquo; or compass directions have their own Stylebook entries.
                    </P>

                    <H3>APA separates title case from sentence case</H3>
                    <P>
                        APA capitalizes every word of four or more letters in title case, and it is the one guide that uses both
                        cases in the same paper: title case for headings and titles mentioned in the text, sentence case in the
                        reference list. Details and examples:{" "}
                        <InlineLink href="/blog/apa-7-title-case-guide">APA Title Case: Rules and Examples</InlineLink>
                    </P>

                    <H4>Reference entries use sentence case</H4>
                    <P>
                        Titles of articles and books in an APA reference list use sentence case, while journal names keep title
                        case. See <InlineLink href="/blog/apa-citing-titles">Citing Titles in APA: Book vs Article Formatting</InlineLink>{" "}
                        or run the title through the <InlineLink href="/sentence-case-converter">Sentence Case Converter</InlineLink>.
                    </P>
                    <p className="text-sm text-muted-foreground">
                        <code className={CODE_CLASS}>{SENTENCE_CASE_EXAMPLE.input}</code>
                        <span aria-hidden="true"> → </span>
                        <span className="sr-only"> becomes </span>
                        <code className={cn(CODE_CLASS, "text-foreground")}>{SENTENCE_CASE_EXAMPLE.output}</code>
                    </p>

                    <H4>All five heading levels use title case</H4>
                    <P>
                        All five APA 7 heading levels are written in title case. The levels differ in alignment, bold and italics,
                        never in capitalization. The layout of each level is in{" "}
                        <InlineLink href="/blog/apa-heading-levels">Formatting Levels of Headings in APA 7</InlineLink>
                    </P>

                    <H3>MLA capitalizes by part of speech, not length</H3>
                    <P>
                        MLA serves literature and humanities writing. It lowercases every preposition inside a title, however
                        long, along with articles, coordinating conjunctions and &ldquo;to&rdquo; in infinitives, so
                        &ldquo;between&rdquo; stays lowercase while &ldquo;Is&rdquo; is capitalized. How it compares with APA:{" "}
                        <InlineLink href="/blog/mla-vs-apa-headlines">MLA vs APA Title Capitalization</InlineLink>
                    </P>
                    <StyleOutputs id="mlaLength" focus={focus} />

                    <H3>Chicago sits between AP and the academic guides</H3>
                    <P>
                        Chicago governs book publishing. Its line falls between AP&apos;s four-letter threshold and MLA&apos;s
                        absence of one: prepositions of five or more letters are capitalized. From the 12th edition in 1969
                        until the 18th, Chicago lowercased prepositions regardless of length, which is why older references
                        disagree with newer ones. More in{" "}
                        <InlineLink href="/blog/chicago-title-case">Chicago Style Title Capitalization</InlineLink>
                    </P>
                    <StyleOutputs id="chicagoEdition" focus={focus} />

                    <p className="text-xs text-muted-foreground">
                        Sources:{" "}
                        {PUBLISHED_STYLES.map((style, index) => (
                            <span key={style}>
                                <a
                                    href={STYLE_SOURCES[style].url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-4 hover:text-foreground cursor-pointer"
                                >
                                    {STYLE_SOURCES[style].name}
                                </a>{" "}
                                ({STYLE_SOURCES[style].edition}){index < PUBLISHED_STYLES.length - 1 ? " · " : ""}
                            </span>
                        ))}
                    </p>
                </section>

                {/* A25 – conversion */}
                <section className="space-y-5">
                    <H2 id="converting">From rule to converted title</H2>
                    <P>
                        The <InlineLink href="/">title capitalization tool</InlineLink> on this site applies exactly the rules
                        above for the style guide you pick. Its Standard setting follows the MLA rule for prepositions.
                    </P>

                    <H3 grouping>How does the converter decide each word?</H3>
                    <P>It checks each word in a fixed order and stops at the first rule that applies:</P>
                    <ol className="list-decimal pl-6 space-y-1 text-zinc-700 dark:text-zinc-300">
                        <li>A known acronym is checked first, so NASA stays NASA.</li>
                        <li>Irregular casing is checked next, so iPhone survives.</li>
                        <li>The first word is capitalized.</li>
                        <li>The last word is capitalized.</li>
                        <li>The first word after a colon is capitalized.</li>
                        <li>&ldquo;To&rdquo; followed by another word is lowercased.</li>
                        <li>A particle that completes a phrasal verb is capitalized.</li>
                        <li>A hyphenated compound is split and each part decided on its own.</li>
                        <li>Every remaining word goes through the chosen style guide&apos;s rule.</li>
                    </ol>

                    <H4>Per-word explanations name the rule that fired</H4>
                    <P>
                        Every word the converter changes is marked in the result, with the rule behind it. The labels read like
                        this:
                    </P>
                    <ul className="flex flex-wrap gap-2">
                        {ENGINE_REASON_SAMPLES.map((reason) => (
                            <li key={reason}><code className={CODE_CLASS}>{reason}</code></li>
                        ))}
                    </ul>
                    <figure className={cn(CARD_CLASS, "p-4 space-y-2")}>
                        <p className="text-lg font-medium">
                            {diff.segments.map((segment, index) =>
                                segment.type === "unchanged" ? (
                                    <span key={index}>{segment.text}</span>
                                ) : (
                                    <mark
                                        key={index}
                                        title={segment.reason}
                                        className={cn(
                                            "rounded-[3px] px-0.5 bg-transparent decoration-2 underline-offset-4 underline",
                                            segment.type === "capitalized"
                                                ? "text-emerald-700 dark:text-emerald-400 decoration-emerald-400/60"
                                                : "text-blue-700 dark:text-blue-400 decoration-blue-400/60"
                                        )}
                                    >
                                        {segment.text}
                                    </mark>
                                )
                            )}
                        </p>
                        <figcaption className="text-xs text-muted-foreground">
                            &ldquo;{diffInput}&rdquo; converted to {STYLE_LABELS[diffStyle]} style.{" "}
                            Changed words are marked in{" "}
                            <span className="text-emerald-700 dark:text-emerald-400">green</span> when capitalized and{" "}
                            <span className="text-blue-700 dark:text-blue-400">blue</span> when lowercased; hover one for its rule.
                        </figcaption>
                    </figure>

                    <H4>Text pasted in ALL CAPS is normalized, not copied</H4>
                    <P>
                        In text typed entirely in capitals, the casing carries no information, so every word is rebuilt from the
                        rules. In ordinary mixed-case text, a word in capitals is a deliberate signal and is kept.
                    </P>
                    <Example id="allCaps" />
                    <Example id="mixedCaps" />

                    <H3>Checking a batch of headlines against one style</H3>
                    <P>
                        Paste a list of headlines into the{" "}
                        <InlineLink href="/batch-checker">Batch Headline Checker</InlineLink>, pick a style guide, and each line
                        comes back with its fix.
                    </P>
                    <div>
                        <Link
                            href={model.returnHref}
                            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                        >
                            {model.returnLabel}
                        </Link>
                    </div>
                </section>

                {/* A30 – supplementary */}
                <section className="space-y-5 border-t pt-10">
                    <H2 id="faq">Questions writers ask about title capitalization</H2>
                    <div className="space-y-4">
                        {model.faqs.map((faq, index) => (
                            <details key={faq.question} className={cn(CARD_CLASS, "p-5")} open={index === 0}>
                                <summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                                <p className="mt-3 text-zinc-700 dark:text-zinc-300">{faq.answer}</p>
                                {faq.link && (
                                    <p className="mt-2 text-sm">
                                        <InlineLink href={faq.link.href}>{faq.link.label}</InlineLink>
                                    </p>
                                )}
                            </details>
                        ))}
                    </div>
                </section>
            </main>
            <SiteFooter containerClassName="max-w-5xl" />
        </div>
    )
}
