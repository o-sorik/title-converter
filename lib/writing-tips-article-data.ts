import type { FAQItem } from "@/lib/is-x-article-data"
import type { ArticleSection } from "@/lib/article-content"

export interface WritingTipsArticle {
  slug: string
  faqItems: FAQItem[]
  ctaWord: string
  ctaText?: string
  relatedSlugs: string[]
  tags: string[]
  sections: ArticleSection[]
}

export const WRITING_TIPS_ARTICLES: WritingTipsArticle[] = [
  {
    slug: "what-words-are-not-capitalized-in-a-title",
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
              { label: "about (5 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
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
]

export function getWritingTipsArticleBySlug(slug: string): WritingTipsArticle | undefined {
  return WRITING_TIPS_ARTICLES.find((article) => article.slug === slug)
}
