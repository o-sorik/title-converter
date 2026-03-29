import type { ReactNode } from "react"
import Link from "next/link"
import type { FAQItem } from "@/lib/is-x-article-data"
import type { TocItem } from "@/lib/blog-view-model"

export interface WritingTipsSection {
  id: string
  heading?: string
  content: ReactNode
}

export interface WritingTipsArticle {
  slug: string
  tocItems: TocItem[]
  faqItems: FAQItem[]
  ctaWord: string
  ctaText?: string
  relatedSlugs: string[]
  tags: string[]
  sections: WritingTipsSection[]
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank" className="underline underline-offset-4 text-blue-700 dark:text-blue-400">
      {children}
    </a>
  )
}

function IntLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <Link href={`/blog/${slug}`} className="underline underline-offset-4 text-blue-700 dark:text-blue-400">
      {children}
    </Link>
  )
}

const tableWrap = "overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-700"
const tableClass = "w-full text-sm"
const thClass = "px-4 py-3 text-left font-semibold text-slate-700 dark:text-zinc-300"
const tdClass = "px-4 py-3 text-slate-700 dark:text-zinc-300"
const trBorder = "border-t border-slate-100 dark:border-zinc-700/50"
const theadBg = "bg-slate-50 dark:bg-zinc-800/60"
const capBadge = "rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
const lcBadge = "rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"

const p = "text-base leading-8 text-slate-800 dark:text-zinc-200"
const li = "text-base leading-7 text-slate-700 dark:text-zinc-300"

export const WRITING_TIPS_ARTICLES: WritingTipsArticle[] = [
  {
    slug: "what-words-are-not-capitalized-in-a-title",
    tocItems: [
      { id: "three-categories", label: "Three categories" },
      { id: "articles", label: "Articles" },
      { id: "prepositions", label: "Prepositions" },
      { id: "conjunctions", label: "Conjunctions" },
      { id: "first-last-word", label: "First & last word rule" },
      { id: "style-guide-comparison", label: "Style guide comparison" },
      { id: "title-case-wild", label: "Real examples" },
      { id: "common-mistakes", label: "Common mistakes" },
      { id: "edge-cases", label: "Edge cases" },
      { id: "faq", label: "FAQ" },
    ],
    tags: ["Title Case", "Grammar 101", "Style Guides"],
    ctaWord: "what words are not capitalized in a title",
    ctaText: "Not sure which words to capitalize? Paste your title into our free Title Case Converter – it applies AP, APA, Chicago, or MLA rules automatically.",
    relatedSlugs: [
      "the-capitalized-in-title-case",
      "and-capitalized-in-title-case",
      "to-capitalized-in-title-case",
      "is-capitalized-in-title-case",
      "with-capitalized-in-title-case",
      "in-capitalized-in-title-case",
      "from-capitalized-in-title-case",
      "do-you-capitalize-after-a-colon",
    ],
    faqItems: [
      {
        question: `Is "is" capitalized in a title?`,
        answer: `Yes – always. "Is" is a verb, not a preposition or article. All style guides capitalize all verbs in titles, regardless of length. "What Is Title Case?" is correct. This is one of the most common mistakes in title case.`,
      },
      {
        question: `Is "it" capitalized in a title?`,
        answer: `Yes. "It" is a pronoun, and pronouns are always capitalized in title case. "Make It Happen" is correct. Don't confuse "it" with articles like "a" or "the."`,
      },
      {
        question: `How many words are lowercase in title case?`,
        answer: `Depending on the style guide, roughly 15–25 words stay lowercase. These are mainly articles (3 words), short prepositions (7–15 words depending on the guide), and coordinating conjunctions (7 words). Every other word gets capitalized.`,
      },
      {
        question: `What is title case vs sentence case?`,
        answer: `Title case capitalizes most words (The Quick Brown Fox Jumps Over the Lazy Dog). Sentence case capitalizes only the first word and proper nouns (The quick brown fox jumps over the lazy dog). Title case is used for headlines and titles; sentence case for regular sentences.`,
      },
      {
        question: `Do you capitalize "with" in a title?`,
        answer: `It depends on your style guide. AP and APA capitalize "with" (4 letters = capitalize). Chicago and MLA keep it lowercase. See our detailed breakdown in Is "With" Capitalized in a Title?`,
      },
    ],
    sections: [
      {
        id: "intro",
        content: (
          <p className={p}>
            In title case, most words get capitalized – but short &ldquo;function words&rdquo; stay lowercase. These include articles (<em>a, an, the</em>), short prepositions (<em>in, on, at, to, for, of, by</em>), and short conjunctions (<em>and, but, or, nor, yet, so</em>). The catch: every style guide defines &ldquo;short&rdquo; differently, and some words change depending on how they&rsquo;re used in the sentence. Here&rsquo;s the full breakdown by word type and style guide.
          </p>
        ),
      },
      {
        id: "three-categories",
        heading: "The Three Categories of Lowercase Words",
        content: (
          <>
            <p className={p}>
              All major style guides agree on this basic framework: three types of words stay lowercase in titles, with exceptions for the first and last word (which are always capitalized regardless of type).
            </p>
            <p className={p}>
              The disagreements come down to length. AP and APA say &ldquo;capitalize prepositions of four or more letters.&rdquo; Chicago says &ldquo;capitalize prepositions of five or more letters.&rdquo; <ExtLink href="https://style.mla.org/capitalization-of-titles/">MLA lowercases all prepositions</ExtLink> regardless of length. Getting the right answer depends on which style guide you&rsquo;re following.
            </p>
          </>
        ),
      },
      {
        id: "articles",
        heading: "1. Articles",
        content: (
          <>
            <p className={p}>
              Articles are the simplest category – all style guides agree. Three words, always lowercase in titles (unless they&rsquo;re the first or last word):
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li className={li}><strong>a</strong> – <em>A Guide to Better Writing</em> (first word = capitalize) vs. <em>Writing a Better Resume</em> (mid-title = lowercase)</li>
              <li className={li}><strong>an</strong> – <em>An Introduction to Grammar</em> vs. <em>Finding an Answer</em></li>
              <li className={li}><strong>the</strong> – <em>The Elements of Style</em> (first word) vs. <em>Reading Between the Lines</em></li>
            </ul>
            <p className={p}>
              That&rsquo;s it. No exceptions, no style guide disagreements. If it&rsquo;s an article and it&rsquo;s not the first or last word of the title, it&rsquo;s lowercase.
            </p>
            <p className={p}>
              For more detail on &ldquo;the&rdquo; specifically – including when it&rsquo;s part of a proper noun like <em>The New York Times</em> – see <IntLink slug="the-capitalized-in-title-case">Is &ldquo;The&rdquo; Capitalized in a Title?</IntLink>
            </p>
          </>
        ),
      },
      {
        id: "prepositions",
        heading: "2. Prepositions",
        content: (
          <>
            <p className={p}>
              Prepositions are where the style guides diverge. The core question: how long can a preposition be and still stay lowercase?
            </p>
            <p className={`${p} font-semibold`}>Short prepositions (all guides agree – lowercase these):</p>
            <div className={tableWrap}>
              <table className={tableClass}>
                <thead className={theadBg}>
                  <tr>
                    <th className={thClass}>Word</th>
                    <th className={thClass}>Example</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["at", "Success at Work"],
                    ["by", "Death by Chocolate"],
                    ["for", "Recipes for Beginners"],
                    ["in", "Adventures in Cooking"],
                    ["of", "Game of Thrones"],
                    ["on", "Hands on Approach"],
                    ["to", "Back to Basics"],
                    ["up", "What's up With Grammar?"],
                  ].map(([word, example]) => (
                    <tr key={word} className={trBorder}>
                      <td className={`${tdClass} font-semibold`}>{word}</td>
                      <td className={tdClass}><em>{example}</em></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`${p} font-semibold mt-4`}>Where style guides disagree:</p>
            <div className={tableWrap}>
              <table className={tableClass}>
                <thead className={theadBg}>
                  <tr>
                    <th className={thClass}>Preposition</th>
                    <th className={thClass}>AP</th>
                    <th className={thClass}>APA</th>
                    <th className={thClass}>Chicago</th>
                    <th className={thClass}>MLA</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["with (4 letters)", true, true, false, false],
                    ["from (4 letters)", true, true, false, false],
                    ["into (4 letters)", true, true, false, false],
                    ["between (7 letters)", true, true, true, false],
                    ["through (7 letters)", true, true, true, false],
                    ["about (5 letters)", true, true, false, false],
                  ].map(([prep, ap, apa, chi, mla]) => (
                    <tr key={prep as string} className={trBorder}>
                      <td className={`${tdClass} font-semibold`}>{prep as string}</td>
                      <td className={tdClass}><span className={ap ? capBadge : lcBadge}>{ap ? "Capitalize" : "Lowercase"}</span></td>
                      <td className={tdClass}><span className={apa ? capBadge : lcBadge}>{apa ? "Capitalize" : "Lowercase"}</span></td>
                      <td className={tdClass}><span className={(chi as boolean) ? capBadge : lcBadge}>{(chi as boolean) ? "Capitalize" : "Lowercase"}</span></td>
                      <td className={tdClass}><span className={(mla as boolean) ? capBadge : lcBadge}>{(mla as boolean) ? "Capitalize" : "Lowercase"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={p}>
              The pattern: AP and <ExtLink href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case">APA capitalize prepositions of four or more letters</ExtLink>. <ExtLink href="https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles/faq0007.html">Chicago</ExtLink> capitalizes prepositions of five or more letters (with some flexibility). MLA lowercases all prepositions regardless of length.
            </p>
            <p className={p}>
              <strong>The &ldquo;to&rdquo; problem.</strong> &ldquo;To&rdquo; is lowercase as a preposition (<em>Go to School</em>) and lowercase as part of an infinitive (<em>How to Write</em>) in most style guides. But some writers capitalize it in infinitives because it feels like part of the verb. AP, APA, Chicago, and MLA all keep &ldquo;to&rdquo; lowercase in both cases. See <IntLink slug="to-capitalized-in-title-case">Is &ldquo;To&rdquo; Capitalized?</IntLink> for the full breakdown.
            </p>
            <p className={p}>
              <strong>Words that look like prepositions but aren&rsquo;t.</strong> &ldquo;Up,&rdquo; &ldquo;out,&rdquo; &ldquo;off,&rdquo; and &ldquo;down&rdquo; can function as adverbs or parts of phrasal verbs – and when they do, they get capitalized. <em>Turn Off the Lights</em> (phrasal verb = capitalize &ldquo;Off&rdquo;) vs. <em>Jumping off the Cliff</em> (preposition = lowercase &ldquo;off&rdquo;). Chicago is especially strict about this distinction.
            </p>
          </>
        ),
      },
      {
        id: "conjunctions",
        heading: "3. Conjunctions",
        content: (
          <>
            <p className={p}>
              Coordinating conjunctions – the seven words you can remember with FANBOYS – stay lowercase:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li className={li}><strong>for</strong> – <em>Blood and Guts for Glory</em> (also a preposition – lowercase either way)</li>
              <li className={li}><strong>and</strong> – <em>Pride and Prejudice</em></li>
              <li className={li}><strong>nor</strong> – <em>Neither Here nor There</em></li>
              <li className={li}><strong>but</strong> – <em>Nothing but the Truth</em></li>
              <li className={li}><strong>or</strong> – <em>Sink or Swim</em></li>
              <li className={li}><strong>yet</strong> – <em>Strange yet True</em></li>
              <li className={li}><strong>so</strong> – <em>Say It Ain&rsquo;t So</em></li>
            </ul>
            <p className={p}>
              All four major style guides agree: these seven words are lowercase in titles (unless first or last word).
            </p>
            <p className={p}>
              <strong>What about subordinating conjunctions?</strong> Words like &ldquo;because,&rdquo; &ldquo;although,&rdquo; &ldquo;since,&rdquo; &ldquo;unless,&rdquo; and &ldquo;while&rdquo; are subordinating conjunctions – and they get capitalized in title case. They&rsquo;re longer words that start dependent clauses, and all style guides treat them as major words.
            </p>
            <p className={p}>
              For details on &ldquo;and&rdquo; specifically, see <IntLink slug="and-capitalized-in-title-case">Is &ldquo;And&rdquo; Capitalized?</IntLink>
            </p>
          </>
        ),
      },
      {
        id: "first-last-word",
        heading: "The First and Last Word Rule",
        content: (
          <>
            <p className={p}>
              Every style guide capitalizes the first and last word of a title, regardless of what part of speech it is. No exceptions.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li className={li}><em>The Catcher in the Rye</em> – &ldquo;The&rdquo; is first, so capitalize. &ldquo;Rye&rdquo; is last, so capitalize. &ldquo;the&rdquo; mid-title stays lowercase.</li>
              <li className={li}><em>A River Runs Through It</em> – &ldquo;A&rdquo; is first, capitalize. &ldquo;It&rdquo; is last, capitalize.</li>
              <li className={li}><em>What to Look For</em> – &ldquo;For&rdquo; is last, capitalize (even though prepositions are normally lowercase).</li>
            </ul>
            <p className={p}>
              This rule also applies after a colon or em dash in most style guides. The first word after a colon restarts the capitalization: <em>Writing Well: A Guide for Beginners.</em> See <IntLink slug="do-you-capitalize-after-a-colon">Do You Capitalize After a Colon?</IntLink> for the full rules.
            </p>
          </>
        ),
      },
      {
        id: "style-guide-comparison",
        heading: "Complete Style Guide Comparison",
        content: (
          <>
            <p className={p}>
              Here&rsquo;s how all four guides handle the main categories (for a side-by-side overview, <ExtLink href="https://owl.purdue.edu/owl/general_writing/mechanics/help_with_capitals.html">Purdue OWL&rsquo;s capitalization guide</ExtLink> is also a solid reference):
            </p>
            <div className={tableWrap}>
              <table className={tableClass}>
                <thead className={theadBg}>
                  <tr>
                    <th className={thClass}>Category</th>
                    <th className={thClass}>AP</th>
                    <th className={thClass}>APA</th>
                    <th className={thClass}>Chicago</th>
                    <th className={thClass}>MLA</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Articles (a, an, the)", false, false, false, false],
                    ["Short prepositions (≤3 letters)", false, false, false, false],
                    ["Prepositions (4 letters)", true, true, false, false],
                    ["Prepositions (5+ letters)", true, true, true, false],
                    ["Coordinating conjunctions", false, false, false, false],
                    ["Subordinating conjunctions", true, true, true, true],
                    ['"To" (infinitive)', false, false, false, false],
                    ["First/last word", true, true, true, true],
                    ["After colon", true, true, true, true],
                    ['Verbs (all, including "is," "be")', true, true, true, true],
                  ].map(([cat, ap, apa, chi, mla]) => (
                    <tr key={cat as string} className={trBorder}>
                      <td className={`${tdClass} font-semibold`}>{cat as string}</td>
                      <td className={tdClass}><span className={ap ? capBadge : lcBadge}>{ap ? "Capitalize" : "Lowercase"}</span></td>
                      <td className={tdClass}><span className={apa ? capBadge : lcBadge}>{apa ? "Capitalize" : "Lowercase"}</span></td>
                      <td className={tdClass}><span className={(chi as boolean) ? capBadge : lcBadge}>{(chi as boolean) ? "Capitalize" : "Lowercase"}</span></td>
                      <td className={tdClass}><span className={(mla as boolean) ? capBadge : lcBadge}>{(mla as boolean) ? "Capitalize" : "Lowercase"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
              *APA capitalizes after a colon only when a complete sentence follows. If the text after the colon is a fragment, it stays lowercase.
            </p>
            <p className={p}>
              <strong>Key takeaway:</strong> AP and APA are the strictest – they capitalize more words. MLA is the most permissive – it lowercases all prepositions. Chicago falls in the middle.
            </p>
          </>
        ),
      },
      {
        id: "title-case-wild",
        heading: "Title Case in the Wild",
        content: (
          <>
            <p className={p}>
              The easiest way to internalize these rules is to look at titles you already know. Published books, movies, and songs follow title case consistently – and they make the patterns obvious.
            </p>
            <p className={`${p} font-semibold`}>Articles and prepositions lowercase:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/The_Lord_of_the_Rings"><em>The Lord of the Rings</em></ExtLink> – &ldquo;of&rdquo; and &ldquo;the&rdquo; lowercase mid-title; &ldquo;The&rdquo; capitalized as first word</li>
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird"><em>To Kill a Mockingbird</em></ExtLink> – &ldquo;a&rdquo; lowercase; &ldquo;To&rdquo; capitalized as first word (not because it&rsquo;s an infinitive)</li>
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/The_Silence_of_the_Lambs_(novel)"><em>The Silence of the Lambs</em></ExtLink> – &ldquo;of&rdquo; and &ldquo;the&rdquo; lowercase between major words</li>
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/Of_Mice_and_Men"><em>Of Mice and Men</em></ExtLink> – &ldquo;Of&rdquo; capitalized (first word), &ldquo;and&rdquo; lowercase</li>
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/No_Country_for_Old_Men"><em>No Country for Old Men</em></ExtLink> – &ldquo;for&rdquo; lowercase (3-letter preposition)</li>
            </ul>
            <p className={`${p} font-semibold mt-4`}>Conjunctions lowercase:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/Pride_and_Prejudice"><em>Pride and Prejudice</em></ExtLink> – &ldquo;and&rdquo; lowercase between two nouns</li>
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/War_and_Peace"><em>War and Peace</em></ExtLink> – same pattern</li>
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/Sense_and_Sensibility"><em>Sense and Sensibility</em></ExtLink> – &ldquo;and&rdquo; lowercase again</li>
            </ul>
            <p className={`${p} font-semibold mt-4`}>Short verbs capitalized (not lowercase!):</p>
            <ul className="list-disc space-y-2 pl-5">
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/There_Will_Be_Blood"><em>There Will Be Blood</em></ExtLink> – &ldquo;Will&rdquo; and &ldquo;Be&rdquo; are verbs – capitalized even though they&rsquo;re short</li>
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/Who_Is_America%3F"><em>Who Is America?</em></ExtLink> – &ldquo;Is&rdquo; capitalized (verb, not an article)</li>
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/As_Good_as_It_Gets"><em>As Good as It Gets</em></ExtLink> – &ldquo;It&rdquo; capitalized (pronoun), &ldquo;as&rdquo; lowercase (conjunction)</li>
            </ul>
            <p className={`${p} font-semibold mt-4`}>Last word always capitalized:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/What_Dreams_May_Come_(novel)"><em>What Dreams May Come</em></ExtLink> – every word capitalized because they&rsquo;re all major words</li>
              <li className={li}><ExtLink href="https://en.wikipedia.org/wiki/Something_to_Talk_About_(film)"><em>Something to Talk About</em></ExtLink> – &ldquo;to&rdquo; lowercase (preposition), but &ldquo;About&rdquo; capitalized as last word</li>
            </ul>
            <p className={p}>
              These aren&rsquo;t style exceptions – they&rsquo;re the rules applied consistently across decades of publishing. If your title follows the same patterns as <em>The Lord of the Rings</em> and <em>Pride and Prejudice</em>, you&rsquo;re doing it right.
            </p>
          </>
        ),
      },
      {
        id: "common-mistakes",
        heading: "Common Mistakes",
        content: (
          <>
            <p className={p}>
              <strong>Lowercasing short verbs.</strong> &ldquo;Is,&rdquo; &ldquo;be,&rdquo; &ldquo;am,&rdquo; &ldquo;are,&rdquo; &ldquo;was,&rdquo; &ldquo;do,&rdquo; &ldquo;has,&rdquo; and &ldquo;go&rdquo; are verbs, not prepositions – and verbs are always capitalized in title case. <em>What Is Title Case?</em> not <em>What is Title Case?</em> This is the single most common title case error. See <IntLink slug="is-capitalized-in-title-case">Is &ldquo;Is&rdquo; Capitalized?</IntLink>
            </p>
            <p className={p}>
              <strong>Capitalizing every word.</strong> Title case doesn&rsquo;t mean capitalize everything. <em>The Art Of War</em> is wrong – &ldquo;of&rdquo; is a preposition. <em>The Art of War</em> is correct.
            </p>
            <p className={p}>
              <strong>Forgetting the last-word rule.</strong> <em>What Are You Waiting for</em> is wrong. &ldquo;For&rdquo; is the last word, so it gets capitalized: <em>What Are You Waiting For.</em>
            </p>
            <p className={p}>
              <strong>Treating &ldquo;it&rdquo; as an article.</strong> &ldquo;It&rdquo; is a pronoun, not an article – capitalize it: <em>Make It Count</em> not <em>Make it Count.</em>
            </p>
          </>
        ),
      },
      {
        id: "edge-cases",
        heading: "Edge Cases",
        content: (
          <>
            <p className={p}>
              <strong>Hyphenated words.</strong> All four style guides evaluate each element of a hyphenated compound separately. If the second element is a major word (noun, verb, adjective), capitalize it: <em>Self-Driving Cars.</em> If it&rsquo;s a short preposition or article, keep it lowercase. APA and MLA tend to capitalize both elements. AP and Chicago are more conservative – they keep minor elements lowercase even after the hyphen: <em>Editor-in-Chief</em> (capitalize &ldquo;Chief&rdquo; – it&rsquo;s a noun) but <em>run-of-the-mill</em> (lowercase &ldquo;of&rdquo; and &ldquo;the&rdquo;).
            </p>
            <p className={p}>
              <strong>Numbers and acronyms.</strong> Capitalize normally: <em>Top 10 Tips for SEO.</em> Numbers follow the word before them. Acronyms in all-caps stay in all-caps: <em>Understanding the FBI&rsquo;s Role.</em>
            </p>
            <p className={p}>
              <strong>&ldquo;Between&rdquo; and other long prepositions.</strong> AP, APA, and Chicago capitalize these. Only MLA keeps them lowercase. If you&rsquo;re not sure which guide to follow, capitalizing long prepositions is the safer choice – most readers expect it.
            </p>
          </>
        ),
      },
      {
        id: "sources",
        heading: "Sources",
        content: (
          <ul className="list-disc space-y-2 pl-5">
            <li className={li}><ExtLink href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case">APA Style: Title Case Capitalization</ExtLink> – official APA 7th edition rules for major vs. minor words</li>
            <li className={li}><ExtLink href="https://style.mla.org/capitalization-of-titles/">MLA Style: Capitalization of Titles</ExtLink> – MLA&rsquo;s Q&amp;A on headline-style capitalization</li>
            <li className={li}><ExtLink href="https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles/faq0007.html">Chicago Manual of Style: Titles FAQ</ExtLink> – CMOS headline-style capitalization principles</li>
            <li className={li}><ExtLink href="https://owl.purdue.edu/owl/general_writing/mechanics/help_with_capitals.html">Purdue OWL: Help with Capitals</ExtLink> – multi-style reference (AP, APA, MLA, Chicago)</li>
          </ul>
        ),
      },
    ],
  },
]

export function getWritingTipsArticleBySlug(slug: string): WritingTipsArticle | undefined {
  return WRITING_TIPS_ARTICLES.find((article) => article.slug === slug)
}
