import type { ReactNode } from "react"
import Link from "next/link"
import {
    APA_COLON_FIX,
    DIAGRAM_CALLOUTS,
    DIAGRAM_INPUT,
    DIAGRAM_OUTPUT,
    EXCEL_FORMULA,
    SENTENCE_CASE_CHANGES,
    SENTENCE_CASE_EXAMPLES,
    SENTENCE_CASE_FAQS,
    SENTENCE_CASE_SOURCES,
    SIDE_BY_SIDE,
    type CalloutKind,
    type CaseExample,
} from "@/lib/sentence-case-content"
import { cn } from "@/lib/utils"

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-foreground cursor-pointer"
const CARD_CLASS = "rounded-xl border bg-white/70 dark:bg-zinc-900/60"
const CODE_CLASS = "font-mono text-[0.85em] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded"

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

function Example({ example }: { example: CaseExample }) {
    return (
        <p className="text-sm text-muted-foreground">
            <code className={CODE_CLASS}>{example.input}</code>
            <span aria-hidden="true"> → </span>
            <span className="sr-only"> becomes </span>
            <code className={cn(CODE_CLASS, "text-foreground")}>{example.output}</code>
        </p>
    )
}

const CALLOUT_CLASS: Record<CalloutKind, string> = {
    changed: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200",
    kept: "bg-sky-100 text-sky-900 dark:bg-sky-950/50 dark:text-sky-200",
    check: "bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200",
}

/** Before/after with callouts that mirror the headings: what changes, what is kept, what to check. */
function BeforeAfterDiagram() {
    const callouts = new Map(DIAGRAM_CALLOUTS.map((callout) => [callout.word, callout]))
    return (
        <figure className={cn(CARD_CLASS, "p-5 space-y-4")}>
            <p className="text-sm text-muted-foreground">
                Pasted: <code className={CODE_CLASS}>{DIAGRAM_INPUT}</code>
            </p>
            <ol className="flex flex-wrap gap-x-2 gap-y-4" aria-label="Converted text with notes">
                {DIAGRAM_OUTPUT.split(" ").map((word, index) => {
                    const callout = callouts.get(word)
                    return (
                        <li key={index} className="flex flex-col items-center gap-1">
                            <span className={cn("font-mono text-base px-1 rounded", callout ? CALLOUT_CLASS[callout.kind] : "text-foreground")}>
                                {word}
                            </span>
                            {callout && (
                                <span className="text-[11px] leading-tight text-muted-foreground text-center max-w-24">{callout.label}</span>
                            )}
                        </li>
                    )
                })}
            </ol>
            <figcaption className="text-sm text-muted-foreground">
                <span className="text-emerald-700 dark:text-emerald-400">Green</span> marks what sentence case changed,{" "}
                <span className="text-sky-700 dark:text-sky-400">blue</span> what it kept, and{" "}
                <span className="text-rose-700 dark:text-rose-400">red</span> what you restore by hand.
            </figcaption>
        </figure>
    )
}

export function SentenceCaseGuide() {
    return (
        <article className="w-full max-w-4xl mx-auto space-y-12">
            {/* A1i – intro */}
            <div className="space-y-4">
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Paste any text and the converter capitalizes the first letter of each sentence and lowercases the rest.
                    Acronyms such as NASA and UI, and brand names such as iPhone and eBay, stay exactly as they were.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    The pronoun &ldquo;I&rdquo; is always capitalized, and every word the converter changes is marked in the
                    result with the rule behind it. Names of people and places need a second look – see{" "}
                    <a href="#what-to-check" className={LINK_CLASS}>what the converter leaves for you to check</a>.
                </p>
            </div>

            {/* A2 – root listing */}
            <section className="space-y-4">
                <H2 id="what-changes">What sentence case changes in your text</H2>
                <P>Seven changes happen when text is converted to sentence case:</P>
                <ol className="list-decimal pl-6 space-y-1.5 text-zinc-700 dark:text-zinc-300">
                    {SENTENCE_CASE_CHANGES.map((change) => <li key={change}>{change}</li>)}
                </ol>
                <div className="space-y-2">
                    <Example example={SENTENCE_CASE_EXAMPLES.allCaps} />
                    <Example example={SENTENCE_CASE_EXAMPLES.pronoun} />
                    <Example example={SENTENCE_CASE_EXAMPLES.acronymsAndBrands} />
                </div>
                <BeforeAfterDiagram />
                <P>What the list does not include is names – and that is the part to check.</P>
            </section>

            {/* A3 – honest limits */}
            <section className="space-y-4">
                <H2 id="what-to-check">What the converter leaves for you to check</H2>
                <P>
                    The converter cannot tell which words are proper nouns, so it lowercases every one of them except a
                    sentence&apos;s first word and known acronyms. Whether &ldquo;Paris&rdquo; is a city or &ldquo;March&rdquo;
                    is a month depends on meaning, and the converter works from the shape of each word.
                </P>

                <H3 grouping>Which capitals does sentence case need to keep?</H3>
                <P>Three groups of capitals belong in sentence case that the converter does not keep.</P>

                <H4>Names of people and places lose their capitals</H4>
                <Example example={SENTENCE_CASE_EXAMPLES.names} />
                <P>
                    After converting, scan for names of people, companies, cities and countries, and restore their capitals.
                </P>

                <H4>Days, months and proper adjectives follow names</H4>
                <P>
                    Days of the week, months, holidays, languages and nationalities such as English and French, and adjectives
                    formed from names such as Victorian are all proper nouns. Sentence case keeps them capitalized; the
                    converter does not.
                </P>

                <H4>APA keeps a capital after a colon in titles</H4>
                <P>
                    In APA sentence case, the first word of a subtitle after a colon is capitalized, along with proper nouns (
                    <SourceLink href={SENTENCE_CASE_SOURCES.apaSentenceCase}>APA Style</SourceLink>). The converter lowercases
                    it, so fix that word by hand:
                </P>
                <p className="text-sm text-muted-foreground">
                    <code className={CODE_CLASS}>{SENTENCE_CASE_EXAMPLES.colon.input}</code>
                    <span aria-hidden="true"> → </span>
                    <code className={CODE_CLASS}>{SENTENCE_CASE_EXAMPLES.colon.output}</code>
                    <span aria-hidden="true"> → </span>
                    <span className="sr-only"> corrected to </span>
                    <code className={cn(CODE_CLASS, "text-foreground")}>{APA_COLON_FIX}</code>
                </p>
                <P>
                    How the rule changes in ordinary sentences is covered in{" "}
                    <InlineLink href="/blog/do-you-capitalize-after-a-colon">Do You Capitalize After a Colon?</InlineLink>
                </P>
            </section>

            {/* A8 – where required */}
            <section className="space-y-4">
                <H2 id="where-required">Where sentence case is the required style</H2>
                <P>Sentence case is required in three places: the APA reference list, AP news headlines and product interfaces.</P>

                <H3 grouping>Which style guides require sentence case?</H3>
                <P>
                    Two of the four major guides call for sentence case in specific places. The full comparison of their title
                    rules is in <InlineLink href="/capitalization-rules-guide">Title Capitalization Rules by Style Guide</InlineLink>
                </P>

                <H4>APA reference titles use sentence case</H4>
                <P>
                    Titles of articles and books in an APA reference list use sentence case, while journal names keep title
                    case. The first word after a colon is capitalized, as shown above. More in{" "}
                    <InlineLink href="/blog/apa-citing-titles">Citing Titles in APA: Book vs Article Formatting</InlineLink>
                </P>
                <Example example={SENTENCE_CASE_EXAMPLES.apaReference} />

                <H4>AP news headlines capitalize only the first word and proper nouns</H4>
                <P>
                    AP writes news headlines in sentence case: only the first word and proper nouns are capitalized, and the
                    first word after a colon is always uppercase (<SourceLink href={SENTENCE_CASE_SOURCES.apHeadlines}>AP Stylebook</SourceLink>).
                    Titles of books and films still take title case, as explained in{" "}
                    <InlineLink href="/blog/ap-title-capitalization-basics">AP Style Headlines: Capitalization Rules</InlineLink>
                </P>

                <H3 grouping>Why did product interfaces move to sentence case?</H3>
                <P>
                    Material Design 3 asks for sentence case across all interface text – titles, headings, buttons, menu items
                    and navigation – and keeps capitals only for product and brand names (
                    <SourceLink href={SENTENCE_CASE_SOURCES.material}>Material Design 3</SourceLink>). Many product teams follow
                    the same convention for buttons and labels.
                </P>

                <H3>Sentence case and title case side by side</H3>
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b">
                                <th scope="row" className="text-left p-3 font-semibold w-32">Sentence case</th>
                                <td className="p-3 font-mono">{SIDE_BY_SIDE.sentence}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-left p-3 font-semibold w-32">Title case</th>
                                <td className="p-3 font-mono">{SIDE_BY_SIDE.title}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <P>
                    Title case suits the titles of works and headings your style guide sets that way; sentence case suits body
                    text, interfaces and APA references. The longer comparison is in{" "}
                    <InlineLink href="/blog/sentence-vs-title-case">Title Case vs Sentence Case: Which to Use and When</InlineLink>,
                    and headlines go through the <InlineLink href="/">title case converter</InlineLink>.
                </P>
            </section>

            {/* A14 – other tools */}
            <section className="space-y-4">
                <H2 id="word-docs-excel">Sentence case in Word, Google Docs and Excel</H2>
                <P>Of the three common editors, only Word has sentence case built in.</P>

                <H3>Word has a built-in Sentence case option</H3>
                <P>
                    Select the text, open Home, click Change Case (the Aa button) and choose &ldquo;Sentence case&rdquo;. Word
                    does not recognize proper nouns either, so check names afterwards.
                </P>

                <H3>Google Docs has no sentence case command</H3>
                <P>
                    Format → Text → Capitalization offers only lowercase, UPPERCASE and Title Case (
                    <SourceLink href={SENTENCE_CASE_SOURCES.googleDocs}>How-To Geek</SourceLink>). Paste the text into the
                    converter above and copy the result back.
                </P>

                <H3>Excel needs a formula for sentence case</H3>
                <P>Excel has no sentence case function, so combine four text functions:</P>
                <p><code className={CODE_CLASS}>{EXCEL_FORMULA}</code></p>
                <P>
                    It capitalizes the first letter and lowercases everything after it. That means it handles one sentence per
                    cell and turns acronyms like NASA into Nasa (
                    <SourceLink href={SENTENCE_CASE_SOURCES.excel}>Ablebits</SourceLink>).
                </P>
            </section>

            {/* A18 – supplementary */}
            <section className="space-y-5 border-t pt-10">
                <H2 id="faq">Questions about sentence case</H2>
                <div className="space-y-4">
                    {SENTENCE_CASE_FAQS.map((faq, index) => (
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
