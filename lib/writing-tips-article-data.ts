import type { ArticleSection, FAQItem } from "@/lib/article-content"
import type { ConverterLink } from "@/lib/converter-anchors"
import { STATS_ARTICLES } from "@/lib/stats-articles"
import { STYLE_GUIDE_ARTICLES } from "@/lib/style-guide-articles"
import {
  COLON,
  DIAGRAM_HEADLINE,
  DIAGRAM_MARKS,
  DIAGRAM_NOTES,
  DIAGRAM_WORDS,
  SAME_HEADLINES,
  TO_SENTENCE,
  TO_TITLE,
} from "@/lib/sentence-vs-title-case-content"

export interface WritingTipsArticle {
  slug: string
  faqItems: FAQItem[]
  /** H2 above the FAQ block; defaults to "Frequently Asked Questions". */
  faqHeading?: string
  ctaWord: string
  ctaText?: string
  relatedSlugs: string[]
  /** One contextual in-body link to the converter, rendered after the intro section. */
  converterLink: ConverterLink
  tags: string[]
  sections: ArticleSection[]
}

export const WRITING_TIPS_ARTICLES: WritingTipsArticle[] = [
  {
    slug: "what-words-are-not-capitalized-in-a-title",
    converterLink: {
      anchor: "title case converter",
      before: "The list above is the rule; the ",
      after: " is the shortcut. Paste any title and it lowercases the small words by style and shows each change.",
    },
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
        blocks: [
          {
            type: "paragraph",
            text: "In title case, most words get capitalized – but short “function words” stay lowercase. These include articles (*a, an, the*), short prepositions (*in, on, at, to, for, of, by*), and short conjunctions (*and, but, or, nor, yet, so*). The catch: every style guide defines “short” differently, and some words change depending on how they’re used in the sentence. Here’s the full breakdown by word type and style guide.",
          },
          {
            type: "paragraph",
            variant: "note",
            text: "Still deciding between capitalization styles themselves? See [Title Case vs Sentence Case: Which to Use and When](/blog/sentence-vs-title-case).",
          },
        ],
      },
      {
        id: "three-categories",
        heading: "The Three Categories of Lowercase Words",
        tocLabel: "Three categories",
        blocks: [
          {
            type: "paragraph",
            text: "All major style guides agree on this basic framework: three types of words stay lowercase in titles, with exceptions for the first and last word (which are always capitalized regardless of type).",
          },
          {
            type: "paragraph",
            text: "The disagreements come down to length. AP and APA say “capitalize prepositions of four or more letters.” Chicago says “capitalize prepositions of five or more letters.” [MLA lowercases all prepositions](https://style.mla.org/capitalization-of-titles/) regardless of length. Getting the right answer depends on which style guide you’re following.",
          },
        ],
      },
      {
        id: "articles",
        heading: "1. Articles",
        tocLabel: "Articles",
        blocks: [
          {
            type: "paragraph",
            text: "Articles are the simplest category – all style guides agree. Three words, always lowercase in titles (unless they’re the first or last word):",
          },
          {
            type: "list",
            items: [
              "**a** – *A Guide to Better Writing* (first word = capitalize) vs. *Writing a Better Resume* (mid-title = lowercase)",
              "**an** – *An Introduction to Grammar* vs. *Finding an Answer*",
              "**the** – *The Elements of Style* (first word) vs. *Reading Between the Lines*",
            ],
          },
          {
            type: "paragraph",
            text: "That’s it. No exceptions, no style guide disagreements. If it’s an article and it’s not the first or last word of the title, it’s lowercase.",
          },
          {
            type: "paragraph",
            text: "For more detail on “the” specifically – including when it’s part of a proper noun like *The New York Times* – see [Is “The” Capitalized in a Title?](/blog/the-capitalized-in-title-case)",
          },
        ],
      },
      {
        id: "prepositions",
        heading: "2. Prepositions",
        tocLabel: "Prepositions",
        blocks: [
          {
            type: "paragraph",
            text: "Prepositions are where the style guides diverge. The core question: how long can a preposition be and still stay lowercase?",
          },
          {
            type: "paragraph",
            variant: "subheading",
            text: "Short prepositions (all guides agree – lowercase these):",
          },
          {
            type: "table",
            headers: ["Word", "Example"],
            rows: [
              ["at", "*Success at Work*"],
              ["by", "*Death by Chocolate*"],
              ["for", "*Recipes for Beginners*"],
              ["in", "*Adventures in Cooking*"],
              ["of", "*Game of Thrones*"],
              ["on", "*Hands on Approach*"],
              ["to", "*Back to Basics*"],
              ["up", "*What's up With Grammar?*"],
            ],
          },
          {
            type: "paragraph",
            variant: "subheading",
            text: "Where style guides disagree:",
          },
          {
            type: "styleGuideMatrix",
            rowHeader: "Preposition",
            rows: [
              { label: "with (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
              { label: "from (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
              { label: "into (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
              { label: "between (7 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
              { label: "through (7 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
              { label: "about (5 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
            ],
          },
          {
            type: "paragraph",
            text: "The pattern: AP and [APA capitalize prepositions of four or more letters](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case). [Chicago](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles/faq0007.html) capitalizes prepositions of five or more letters (with some flexibility). MLA lowercases all prepositions regardless of length.",
          },
          {
            type: "paragraph",
            text: "**The “to” problem.** “To” is lowercase as a preposition (*Go to School*) and lowercase as part of an infinitive (*How to Write*) in most style guides. But some writers capitalize it in infinitives because it feels like part of the verb. AP, APA, Chicago, and MLA all keep “to” lowercase in both cases. See [Is “To” Capitalized?](/blog/to-capitalized-in-title-case) for the full breakdown.",
          },
          {
            type: "paragraph",
            text: "**Words that look like prepositions but aren’t.** “Up,” “out,” “off,” and “down” can function as adverbs or parts of phrasal verbs – and when they do, they get capitalized. *Turn Off the Lights* (phrasal verb = capitalize “Off”) vs. *Jumping off the Cliff* (preposition = lowercase “off”). Chicago is especially strict about this distinction.",
          },
        ],
      },
      {
        id: "conjunctions",
        heading: "3. Conjunctions",
        tocLabel: "Conjunctions",
        blocks: [
          {
            type: "paragraph",
            text: "Coordinating conjunctions – the seven words you can remember with FANBOYS – stay lowercase:",
          },
          {
            type: "list",
            items: [
              "**for** – *Blood and Guts for Glory* (also a preposition – lowercase either way)",
              "**and** – *Pride and Prejudice*",
              "**nor** – *Neither Here nor There*",
              "**but** – *Nothing but the Truth*",
              "**or** – *Sink or Swim*",
              "**yet** – *Strange yet True*",
              "**so** – *Say It Ain’t So*",
            ],
          },
          {
            type: "paragraph",
            text: "All four major style guides agree: these seven words are lowercase in titles (unless first or last word).",
          },
          {
            type: "paragraph",
            text: "**What about subordinating conjunctions?** Words like “because,” “although,” “since,” “unless,” and “while” are subordinating conjunctions – and they get capitalized in title case. They’re longer words that start dependent clauses, and all style guides treat them as major words.",
          },
          {
            type: "paragraph",
            text: "For details on “and” specifically, see [Is “And” Capitalized?](/blog/and-capitalized-in-title-case)",
          },
        ],
      },
      {
        id: "first-last-word",
        heading: "The First and Last Word Rule",
        tocLabel: "First & last word rule",
        blocks: [
          {
            type: "paragraph",
            text: "Every style guide capitalizes the first and last word of a title, regardless of what part of speech it is. No exceptions.",
          },
          {
            type: "list",
            items: [
              "*The Catcher in the Rye* – “The” is first, so capitalize. “Rye” is last, so capitalize. “the” mid-title stays lowercase.",
              "*A River Runs Through It* – “A” is first, capitalize. “It” is last, capitalize.",
              "*What to Look For* – “For” is last, capitalize (even though prepositions are normally lowercase).",
            ],
          },
          {
            type: "paragraph",
            text: "This rule also applies after a colon or em dash in most style guides. The first word after a colon restarts the capitalization: *Writing Well: A Guide for Beginners.* See [Do You Capitalize After a Colon?](/blog/do-you-capitalize-after-a-colon) for the full rules.",
          },
        ],
      },
      {
        id: "style-guide-comparison",
        heading: "Complete Style Guide Comparison",
        tocLabel: "Style guide comparison",
        blocks: [
          {
            type: "paragraph",
            text: "Here’s how all four guides handle the main categories (for a side-by-side overview, [Purdue OWL’s capitalization guide](https://owl.purdue.edu/owl/general_writing/mechanics/help_with_capitals.html) is also a solid reference):",
          },
          {
            type: "styleGuideMatrix",
            rowHeader: "Category",
            rows: [
              { label: "Articles (a, an, the)", guides: { ap: false, apa: false, chicago: false, mla: false } },
              { label: "Short prepositions (≤3 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
              { label: "Prepositions (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
              { label: "Prepositions (5+ letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
              { label: "Coordinating conjunctions", guides: { ap: false, apa: false, chicago: false, mla: false } },
              { label: "Subordinating conjunctions", guides: { ap: true, apa: true, chicago: true, mla: true } },
              { label: '"To" (infinitive)', guides: { ap: false, apa: false, chicago: false, mla: false } },
              { label: "First/last word", guides: { ap: true, apa: true, chicago: true, mla: true } },
              { label: "After colon", guides: { ap: true, apa: true, chicago: true, mla: true } },
              { label: 'Verbs (all, including "is," "be")', guides: { ap: true, apa: true, chicago: true, mla: true } },
            ],
          },
          {
            type: "paragraph",
            variant: "note",
            text: "*APA capitalizes after a colon only when a complete sentence follows. If the text after the colon is a fragment, it stays lowercase.",
          },
          {
            type: "paragraph",
            text: "**Key takeaway:** AP and APA are the strictest – they capitalize more words. MLA is the most permissive – it lowercases all prepositions. Chicago falls in the middle.",
          },
        ],
      },
      {
        id: "title-case-wild",
        heading: "Title Case in the Wild",
        tocLabel: "Real examples",
        blocks: [
          {
            type: "paragraph",
            text: "The easiest way to internalize these rules is to look at titles you already know. Published books, movies, and songs follow title case consistently – and they make the patterns obvious.",
          },
          {
            type: "paragraph",
            variant: "subheading",
            text: "Articles and prepositions lowercase:",
          },
          {
            type: "list",
            items: [
              "[*The Lord of the Rings*](https://en.wikipedia.org/wiki/The_Lord_of_the_Rings) – “of” and “the” lowercase mid-title; “The” capitalized as first word",
              "[*To Kill a Mockingbird*](https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird) – “a” lowercase; “To” capitalized as first word (not because it’s an infinitive)",
              "[*The Silence of the Lambs*](https://en.wikipedia.org/wiki/The_Silence_of_the_Lambs_(novel)) – “of” and “the” lowercase between major words",
              "[*Of Mice and Men*](https://en.wikipedia.org/wiki/Of_Mice_and_Men) – “Of” capitalized (first word), “and” lowercase",
              "[*No Country for Old Men*](https://en.wikipedia.org/wiki/No_Country_for_Old_Men) – “for” lowercase (3-letter preposition)",
            ],
          },
          {
            type: "paragraph",
            variant: "subheading",
            text: "Conjunctions lowercase:",
          },
          {
            type: "list",
            items: [
              "[*Pride and Prejudice*](https://en.wikipedia.org/wiki/Pride_and_Prejudice) – “and” lowercase between two nouns",
              "[*War and Peace*](https://en.wikipedia.org/wiki/War_and_Peace) – same pattern",
              "[*Sense and Sensibility*](https://en.wikipedia.org/wiki/Sense_and_Sensibility) – “and” lowercase again",
            ],
          },
          {
            type: "paragraph",
            variant: "subheading",
            text: "Short verbs capitalized (not lowercase!):",
          },
          {
            type: "list",
            items: [
              "[*There Will Be Blood*](https://en.wikipedia.org/wiki/There_Will_Be_Blood) – “Will” and “Be” are verbs – capitalized even though they’re short",
              "[*Who Is America?*](https://en.wikipedia.org/wiki/Who_Is_America%3F) – “Is” capitalized (verb, not an article)",
              "[*As Good as It Gets*](https://en.wikipedia.org/wiki/As_Good_as_It_Gets) – “It” capitalized (pronoun), “as” lowercase (conjunction)",
            ],
          },
          {
            type: "paragraph",
            variant: "subheading",
            text: "Last word always capitalized:",
          },
          {
            type: "list",
            items: [
              "[*What Dreams May Come*](https://en.wikipedia.org/wiki/What_Dreams_May_Come_(novel)) – every word capitalized because they’re all major words",
              "[*Something to Talk About*](https://en.wikipedia.org/wiki/Something_to_Talk_About_(film)) – “to” lowercase (preposition), but “About” capitalized as last word",
            ],
          },
          {
            type: "paragraph",
            text: "These aren’t style exceptions – they’re the rules applied consistently across decades of publishing. If your title follows the same patterns as *The Lord of the Rings* and *Pride and Prejudice*, you’re doing it right.",
          },
        ],
      },
      {
        id: "common-mistakes",
        heading: "Common Mistakes",
        tocLabel: "Common mistakes",
        blocks: [
          {
            type: "paragraph",
            text: "**Lowercasing short verbs.** “Is,” “be,” “am,” “are,” “was,” “do,” “has,” and “go” are verbs, not prepositions – and verbs are always capitalized in title case. *What Is Title Case?* not *What is Title Case?* This is the single most common title case error. See [Is “Is” Capitalized?](/blog/is-capitalized-in-title-case)",
          },
          {
            type: "paragraph",
            text: "**Capitalizing every word.** Title case doesn’t mean capitalize everything. *The Art Of War* is wrong – “of” is a preposition. *The Art of War* is correct.",
          },
          {
            type: "paragraph",
            text: "**Forgetting the last-word rule.** *What Are You Waiting for* is wrong. “For” is the last word, so it gets capitalized: *What Are You Waiting For.*",
          },
          {
            type: "paragraph",
            text: "**Treating “it” as an article.** “It” is a pronoun, not an article – capitalize it: *Make It Count* not *Make it Count.*",
          },
        ],
      },
      {
        id: "edge-cases",
        heading: "Edge Cases",
        tocLabel: "Edge cases",
        blocks: [
          {
            type: "paragraph",
            text: "**Hyphenated words.** All four style guides evaluate each element of a hyphenated compound separately. If the second element is a major word (noun, verb, adjective), capitalize it: *Self-Driving Cars.* If it’s a short preposition or article, keep it lowercase. APA and MLA tend to capitalize both elements. AP and Chicago are more conservative – they keep minor elements lowercase even after the hyphen: *Editor-in-Chief* (capitalize “Chief” – it’s a noun) but *run-of-the-mill* (lowercase “of” and “the”).",
          },
          {
            type: "paragraph",
            text: "**Numbers and acronyms.** Capitalize normally: *Top 10 Tips for SEO.* Numbers follow the word before them. Acronyms in all-caps stay in all-caps: *Understanding the FBI’s Role.*",
          },
          {
            type: "paragraph",
            text: "**“Between” and other long prepositions.** AP, APA, and Chicago capitalize these. Only MLA keeps them lowercase. If you’re not sure which guide to follow, capitalizing long prepositions is the safer choice – most readers expect it.",
          },
        ],
      },
      {
        id: "sources",
        heading: "Sources",
        hideFromToc: true,
        blocks: [
          {
            type: "list",
            items: [
              "[APA Style: Title Case Capitalization](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case) – official APA 7th edition rules for major vs. minor words",
              "[MLA Style: Capitalization of Titles](https://style.mla.org/capitalization-of-titles/) – MLA’s Q&A on headline-style capitalization",
              "[Chicago Manual of Style: Titles FAQ](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles/faq0007.html) – CMOS headline-style capitalization principles",
              "[Purdue OWL: Help with Capitals](https://owl.purdue.edu/owl/general_writing/mechanics/help_with_capitals.html) – multi-style reference (AP, APA, MLA, Chicago)",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "sentence-vs-title-case",
    converterLink: {
      anchor: "online title case converter",
      before: "To see both cases on your own headline, paste it into the ",
      after: ", switch between Title Case and Sentence case, and press Explain for the rule behind every changed word.",
    },
    tags: ["Title Case", "Sentence Case", "Writing Tips"],
    ctaWord: "how to choose between title case and sentence case",
    ctaText: "Try both cases on your own headline – the free converter switches between title case (AP, APA, Chicago, MLA) and sentence case and explains every change.",
    relatedSlugs: [
      "what-words-are-not-capitalized-in-a-title",
      "do-you-capitalize-after-a-colon",
      "apa-7-title-case-guide",
      "ap-title-capitalization-basics",
    ],
    faqHeading: "Questions about title case and sentence case",
    faqItems: [
      {
        question: "What is sentence case?",
        answer: "Sentence case capitalizes a headline the way a sentence is capitalized: the first word, proper nouns, the pronoun I and acronyms. Every other word is lowercase.",
      },
      {
        question: "What is title case?",
        answer: "Title case capitalizes the first and last words and every major word of a headline, and keeps articles, short prepositions and coordinating conjunctions lowercase. Which small words stay lowercase depends on the style guide.",
      },
      {
        question: "Is sentence case the same as lowercase?",
        answer: "No. Lowercase removes every capital. Sentence case keeps the capitals on the first word, on proper nouns and on acronyms.",
      },
      {
        question: "What is the opposite of sentence case?",
        answer: "There is no single opposite. For headlines, title case is the usual alternative; for emphasis, some designs use ALL CAPS, which capitalizes every letter.",
      },
      {
        question: "Should headlines be written in ALL CAPS?",
        answer: "Rarely. In Tinker and Paterson's 1928 study of 320 readers, text set in capitals was read about 12% slower than lowercase text. All caps suits a word or two, such as a label, not a full headline.",
      },
      {
        question: "Is sentence case the same as camel case?",
        answer: "No. Camel case is not a headline style at all: it joins words without spaces and capitalizes each word after the first, as in camelCase, and is used for names in code.",
      },
    ],
    sections: [
      {
        id: "intro",
        blocks: [
          {
            type: "paragraph",
            text: `Title case capitalizes every major word: *${DIAGRAM_HEADLINE.title}*. Sentence case capitalizes only the first word and names: *${DIAGRAM_HEADLINE.sentence}*. The choice between them is rarely a matter of taste. A style guide or a publication makes it – and the same guide often asks for both: APA puts headings in title case and the titles in a reference list in sentence case.`,
          },
          {
            type: "paragraph",
            text: "The two cases also convert unevenly. Going from sentence case to title case is a rule a converter can apply. Going back needs someone who knows which words are names.",
          },
        ],
      },
      {
        id: "how-they-differ",
        heading: "How title case and sentence case differ",
        tocLabel: "How they differ",
        blocks: [
          { type: "paragraph", text: "Title case and sentence case differ in seven ways:" },
          {
            type: "list",
            ordered: true,
            items: [
              "**Capitals.** Title case capitalizes every major word – nouns, verbs, adjectives, adverbs and pronouns, short ones like *Is* and *It* included. Sentence case capitalizes the first word only.",
              "**Small words.** Articles, short prepositions and coordinating conjunctions stay lowercase in both cases. In title case they are the exceptions the style guides argue over – [What Words Are Not Capitalized in a Title?](/blog/what-words-are-not-capitalized-in-a-title) lists them by guide.",
              "**The word after a colon.** Title case always capitalizes it. In sentence case the guide decides: AP headlines and APA titles capitalize it, and in running text it depends on whether a full sentence follows – see [Do You Capitalize After a Colon?](/blog/do-you-capitalize-after-a-colon)",
              "**Names and acronyms.** Here the two cases agree: proper nouns, the pronoun *I* and acronyms keep their capitals in both.",
              "**Number of rules.** Sentence case follows one rule – capitalize as you would in a sentence. Title case follows a style guide, and AP, APA, Chicago and MLA disagree on words such as *with* and *into*.",
              "**Where each is the default.** Title case is the default for the titles of books, articles and other works, and for headings in APA papers. Sentence case is the default for AP news headlines, APA reference lists, and interface text in Google's and Microsoft's style guides.",
              "**Which direction converts cleanly.** Sentence case converts to title case by rule. Title case converts back only when someone knows which words are names, so this direction always needs a second look.",
            ],
          },
          {
            type: "caseDiagram",
            rows: [
              {
                label: "Title case – AP, APA, Chicago and MLA agree",
                text: DIAGRAM_HEADLINE.title,
                marks: DIAGRAM_MARKS,
              },
              {
                label: "Sentence case – AP headline, APA title",
                text: DIAGRAM_HEADLINE.sentence,
                marks: DIAGRAM_MARKS,
              },
              {
                label: "What a converter returns in sentence case",
                text: DIAGRAM_HEADLINE.converter,
                marks: [{ index: DIAGRAM_WORDS.mars, tone: "check" }],
              },
            ],
            notes: DIAGRAM_NOTES,
            caption:
              "Green marks a word that changes between the cases, blue a word that stays the same, red the word the converter gets wrong: a name it lowercased.",
          },
        ],
      },
      {
        id: "same-headlines",
        heading: "The same headlines in title case and sentence case",
        tocLabel: "Examples",
        blocks: [
          {
            type: "paragraph",
            text: "Five headlines in both cases. The last column points back to the numbered differences above.",
          },
          {
            type: "table",
            headers: ["Title case", "Sentence case", "What differs"],
            rows: SAME_HEADLINES.map((pair) => [pair.title, pair.sentence, pair.shows]),
          },
        ],
      },
      {
        id: "which-to-use",
        heading: "Which case to use: the standard decides, not taste",
        tocLabel: "Which to use",
        blocks: [
          {
            type: "paragraph",
            text: "Use the case your style guide or publication requires. Where nothing is required, pick one case for each level of heading and keep it across the site. A title-case page title over sentence-case section headings is a consistent pattern; switching case between headings of the same level is not.",
          },
          { type: "heading", level: 3, grouping: true, text: "Which style guides require title case, and which require sentence case?" },
          {
            type: "paragraph",
            text: "All four major guides put the titles of works in title case. They differ on where sentence case comes in. The word-by-word rules for each guide are in [Title Capitalization Rules by Style Guide](/capitalization-rules-guide).",
          },
          { type: "heading", level: 4, text: "APA uses title case for headings and sentence case for references" },
          {
            type: "paragraph",
            text: "APA 7 uses [title case](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case) for the paper title, every level of heading, and the titles of works mentioned in the text. In the reference list, titles of articles, books, reports and webpages switch to [sentence case](https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case) – even when the original used title case – while journal names stay in title case. *Thinking, Fast and Slow* in the text becomes *Thinking, fast and slow* in the references.",
          },
          {
            type: "paragraph",
            text: "Tables and figures split the same way: their titles take title case, column headings and notes take sentence case. [Citing Titles in APA: Book vs Article Formatting](/blog/apa-citing-titles) walks through the reference-list patterns.",
          },
          { type: "heading", level: 4, text: "AP uses title case for composition titles and sentence case for headlines" },
          {
            type: "paragraph",
            text: "AP news headlines capitalize only the first word and proper nouns, plus the first word after a colon ([@APStylebook](https://x.com/APStylebook/status/1021397036808265729)). Titles of books, films and songs take title case: the AP Stylebook capitalizes their principal words, including prepositions and conjunctions of four or more letters. [AP Style: When to Capitalize Titles and Jobs](/blog/ap-title-capitalization-basics) covers the composition-title rules.",
          },
          { type: "heading", level: 4, text: "Chicago and MLA use title case for titles of works" },
          {
            type: "paragraph",
            text: "The Chicago Manual of Style calls title case [usually preferred](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles.html) for the titles of works; its 18th edition (2024) also renamed headline style and sentence style to [title case and sentence case](https://www.chicagomanualofstyle.org/help-tools/what-s-new.html). Sentence case appears in Chicago for titles in some journals' reference lists and as its first recommendation for titles in languages other than English.",
          },
          {
            type: "paragraph",
            text: "MLA capitalizes the [first word, the last word and all principal words](https://style.mla.org/capitalizing-handout-title/) of an English title, with separate rules for titles in other languages. Neither guide fixes the case of section headings: Chicago (18th ed., 2.65) accepts either case for subheads as long as each level is treated consistently.",
          },
          { type: "heading", level: 3, grouping: true, text: "Which case do news headlines use?" },
          {
            type: "paragraph",
            text: "They split, and not along the Atlantic. On October 17, 2026, two of nine major news sites ran title-case headlines – The New York Times and The Wall Street Journal (*SoftBank in Early Talks to Buy Allied Universal*). The other seven used sentence case: AP, Reuters, The Washington Post, NPR (*Coastal homes burn as hot winds fuel California fires*), the BBC, The Guardian and The Economist.",
          },
          {
            type: "paragraph",
            text: "A publication's house style decides for its own writers. For a site without one, the AP headline rule – first word and proper nouns – is the one most newsrooms share.",
          },
          { type: "heading", level: 3, grouping: true, text: "Which case do product interfaces use?" },
          {
            type: "paragraph",
            text: "It depends on whose guidelines the product follows. Google's [Material Design 3](https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices) asks for sentence case on all interface text – titles, headings, labels, menu items, navigation and buttons – and Google's [developer documentation style guide](https://developers.google.com/style/capitalization) uses sentence case for titles and headings. The [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/capitalization) uses sentence-style capitalization for most titles, headings and UI labels.",
          },
          {
            type: "paragraph",
            text: "Apple is the exception. Its Human Interface Guidelines call for title-style capitalization on [button labels](https://developer.apple.com/design/human-interface-guidelines/buttons), [menu items](https://developer.apple.com/design/human-interface-guidelines/menus) and alert buttons, and for everything else [ask apps to choose a style](https://developer.apple.com/design/human-interface-guidelines/writing) for each type of element and use it consistently.",
          },
          { type: "heading", level: 3, grouping: true, text: "Which case works for ads, email and marketing copy?" },
          {
            type: "paragraph",
            text: "No rule requires either. [Google Ads policy](https://support.google.com/adspolicy/answer/14848295) rejects capitalization that is excessive or gimmicky – *FLOWERS*, *FlOwErS* – and says nothing against title case; [Google Ads Editor](https://support.google.com/google-ads/editor/answer/56358) offers title case as a built-in option. For email the evidence is observational: across about 6 million PR pitches sent to journalists, subject lines in title case were opened more often than those in sentence case – 40.75% against 35.03% ([BuzzStream](https://www.buzzstream.com/blog/subject-line-study/)) – but nothing else was held constant. Treat the case as a brand decision, test it on your own list, and keep one case for every ad or subject line in a campaign.",
          },
          { type: "heading", level: 3, grouping: true, text: "Does the choice affect SEO or readability?" },
          {
            type: "paragraph",
            text: "For search ranking, there is no documented effect. Google treats queries without regard to case – a search for *New York Times* is the same as *new york times* ([Google Search Help](https://support.google.com/websearch/answer/134479)) – and Google's John Mueller has said all-caps headings get no special treatment ([Search Engine Roundtable](https://www.seroundtable.com/google-all-case-seo-32105.html)). Click-through is less settled: in one published split test, a site that switched 70 title tags from title case to sentence case saw organic clicks fall 2.4% ([Semrush, 2022](https://www.semrush.com/blog/seo-split-test-result-should-you-sentence-case-or-title-sase-your-title-tags-/)). One site is not a rule.",
          },
          {
            type: "paragraph",
            text: "For readability, no controlled study has compared title case with sentence case. The research that exists compares lowercase with ALL CAPS: in Tinker and Paterson's 1928 study of 320 readers, text set in capitals was read about 12% slower (Tinker, *Legibility of Print*, 1963). It says nothing about which of the two mixed cases reads faster, so claims that sentence case is easier to read are opinions, not findings. Nielsen Norman Group's advice is the practical one: [pick one capitalization style and stick to it](https://www.nngroup.com/articles/tabs-used-right/).",
          },
        ],
      },
      {
        id: "how-to-convert",
        heading: "How to convert between title case and sentence case",
        tocLabel: "How to convert",
        blocks: [
          {
            type: "paragraph",
            text: "The two directions are not mirror images. One is a lookup of small words; the other needs knowledge of the text.",
          },
          { type: "heading", level: 3, text: "Title case to sentence case keeps the first word, names and acronyms" },
          {
            type: "paragraph",
            text: `Correct sentence case lowercases everything except the first word, proper nouns, the pronoun *I* and acronyms. A converter handles the first part and keeps the acronyms and brand spellings it recognizes: *${TO_SENTENCE.kept.input}* becomes *${TO_SENTENCE.kept.output}*.`,
          },
          {
            type: "paragraph",
            text: `What it cannot see is which ordinary-looking words are names. *${TO_SENTENCE.names.input}* comes out as *${TO_SENTENCE.names.output}*, and *Agreement* and *Brazil* need their capitals back. Text that is already in sentence case keeps the capitals it has, because there they can only be names. The [Sentence Case Converter](/sentence-case-converter) shows every word it changed when you press Explain, so the names are quick to find.`,
          },
          { type: "heading", level: 3, text: "Sentence case to title case follows one style guide's small-word list" },
          {
            type: "paragraph",
            text: `This direction is mechanical once a guide is chosen: capitalize the first and last words and every major word, and keep the guide's small words lowercase. The guide still matters. *${TO_TITLE.input}* becomes *${TO_TITLE.ap}* in AP and APA, and *${TO_TITLE.chicago}* in Chicago and MLA, because only AP and APA capitalize four-letter prepositions.`,
          },
          { type: "heading", level: 3, grouping: true, text: "Which decisions does a converter leave to you?" },
          {
            type: "list",
            items: [
              "**Names.** People, places and organizations spelled like ordinary words lose their capitals when you convert from title case or all caps. Check every proper noun after converting.",
              `**The word after a colon in a sentence.** In a title the converter capitalizes it, as AP headlines and APA titles ask: *${COLON.title.input}* becomes *${COLON.title.output}*. In a sentence that ends with a period it stays lowercase – *${COLON.sentence.output}* – so capitalize it by hand when a full sentence follows.`,
              `**Acronyms in all-caps text.** Acronyms typed in capitals are kept, but text typed entirely in capitals hides them, and only common ones such as NASA, API and UK are recognized: *${TO_SENTENCE.unknownAcronym.input}* comes out as *${TO_SENTENCE.unknownAcronym.output}*.`,
              "**Which style guide to follow.** In title case the converter applies the guide you pick. It cannot pick the guide for you.",
              "**One case per heading level.** A converter fixes one headline at a time. Keeping every section heading on a site in the same case is an editorial decision.",
            ],
          },
        ],
      },
    ],
  },
]

export function getWritingTipsArticleBySlug(slug: string): WritingTipsArticle | undefined {
  return getAllWritingTipsArticles().find((article) => article.slug === slug)
}

// Stats-article modules only type-import from this file, so the runtime
// module graph stays acyclic despite the cross-reference.
export function getAllWritingTipsArticles(): WritingTipsArticle[] {
  return [...WRITING_TIPS_ARTICLES, ...STATS_ARTICLES, ...STYLE_GUIDE_ARTICLES]
}
