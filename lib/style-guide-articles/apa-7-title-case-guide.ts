import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const APA_7_TITLE_CASE_GUIDE_ARTICLE: WritingTipsArticle = {
  slug: "apa-7-title-case-guide",
  tags: ["APA Style", "Academic Writing", "Capitalization"],
  ctaWord: "apa title case",
  ctaText:
    "Paste a heading into the free Title Case Converter, pick APA, and every word is capitalized to the 4-letter rule with the reason shown next to each change.",
  relatedSlugs: ["apa-citing-titles", "apa-heading-levels", "mla-vs-apa-headlines", "ap-title-capitalization-basics"],
  faqItems: [
    {
      question: "What is the 4-letter rule in APA title case?",
      answer:
        "Capitalize every word of four letters or more, whatever its part of speech. That is why APA writes \"With\", \"From\", \"Into\" and \"Between\" but keeps \"of\", \"in\", \"to\" and \"the\" lowercase. Words of three letters or fewer stay lowercase unless they are the first word, the first word after a colon, or a major word such as a noun or verb.",
    },
    {
      question: "Does APA use title case or sentence case?",
      answer:
        "Both, in different places. Title case is used for the paper title, all five heading levels, table and figure titles, and for titles of works named inside your running text. Sentence case is used for article and chapter titles in the reference list. Mixing the two up is the single most common APA capitalization error.",
    },
    {
      question: "Do you capitalize both parts of a hyphenated word in APA?",
      answer:
        "Yes. APA capitalizes both elements of a hyphenated compound in title case, so it is \"Self-Report Measures\" and \"Long-Term Outcomes\", not \"Self-report Measures\". This differs from AP, which lowercases the second element in some compounds.",
    },
    {
      question: "Is the first word after a colon capitalized in APA?",
      answer:
        "Yes, always – regardless of how short it is or what part of speech it is. \"Working Memory: A Review of the Evidence\" capitalizes \"A\" because it opens the subtitle. The same applies after an em dash.",
    },
    {
      question: "Are two-letter verbs capitalized in APA title case?",
      answer:
        "Yes. The 4-letter rule is a floor for minor words, not a ceiling for major ones. Verbs, nouns, adjectives, adverbs and pronouns are capitalized at any length, so \"Is\", \"Be\", \"Do\" and \"It\" are all capitalized in an APA heading.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "APA 7 title case has one governing rule: **capitalize every word of four letters or more**, plus every major word regardless of length, plus the first and last word. Everything shorter than four letters that is not a major word stays lowercase. That single threshold is what separates APA from Chicago and MLA, and it is the rule most people get wrong.",
        },
        {
          type: "paragraph",
          variant: "note",
          text: "APA also uses sentence case – but only in the reference list. See [Citing Titles in APA](/blog/apa-citing-titles) for where the split falls.",
        },
      ],
    },
    {
      id: "the-rule",
      heading: "The 4-Letter Rule, Precisely",
      tocLabel: "The 4-letter rule",
      blocks: [
        {
          type: "paragraph",
          text: "APA capitalizes a word in title case if any of the following is true. The conditions are independent – a word only needs to satisfy one.",
        },
        {
          type: "list",
          items: [
            "It is four letters or longer, whatever its part of speech.",
            "It is a major word: a noun, verb (including short ones like *is* and *be*), adjective, adverb, or pronoun.",
            "It is the first word of the title, or the first word of the subtitle.",
            "It is the first word after a colon, an em dash, or end punctuation.",
            "It is the second part of a hyphenated compound.",
          ],
        },
        {
          type: "paragraph",
          text: "Only one category is left lowercase: minor words of three letters or fewer. That means short conjunctions (*and*, *but*, *or*, *nor*, *so*, *yet*, *as*), short prepositions (*at*, *by*, *in*, *of*, *on*, *to*, *up*, *via*), and the articles *a*, *an*, and *the*.",
        },
        {
          type: "styleGuideMatrix",
          rowHeader: "Word",
          rows: [
            { label: "the (3 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "and (3 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "of (2 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "with (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "from (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "about (5 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
            { label: "between (7 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
          ],
        },
        {
          type: "paragraph",
          variant: "note",
          text: "Read the APA column as the rule; the other three columns show how the same word behaves elsewhere. AP shares APA's 4-letter threshold. Chicago's 18th edition raised its own threshold to five letters. MLA lowercases prepositions at any length.",
        },
      ],
    },
    {
      id: "where-it-applies",
      heading: "Where APA Uses Title Case",
      tocLabel: "Where it applies",
      blocks: [
        {
          type: "paragraph",
          text: "Title case is not the default for everything in an APA paper. It applies in these places:",
        },
        {
          type: "table",
          headers: ["Element", "Case", "Example"],
          rows: [
            ["Paper title on the title page", "Title case", "The Effects of Sleep Loss on Working Memory"],
            ["All five heading levels", "Title case", "Method · Participants and Procedure"],
            ["Table and figure titles", "Title case", "Table 2 · Mean Reaction Times by Condition"],
            ["Titles of works named in your text", "Title case", "as reported in Thinking, Fast and Slow"],
            ["Article and chapter titles in the reference list", "Sentence case", "The effects of sleep loss on working memory"],
            ["Journal names in the reference list", "Title case", "Journal of Experimental Psychology"],
          ],
        },
        {
          type: "paragraph",
          text: "The last two rows are where most errors happen. A journal article title is sentence case in the references but title case if you name it mid-paragraph. The journal itself keeps title case in both places. [Citing Titles in APA](/blog/apa-citing-titles) works through each source type.",
        },
      ],
    },
    {
      id: "hyphens-and-colons",
      heading: "Hyphens, Colons, and Dashes",
      tocLabel: "Hyphens and colons",
      blocks: [
        {
          type: "paragraph",
          text: "APA capitalizes **both** elements of a hyphenated compound. This is a genuine point of difference – AP lowercases the second element in several compounds, so the same phrase is formatted differently depending on which guide you follow.",
        },
        {
          type: "table",
          headers: ["Phrase", "APA", "AP"],
          rows: [
            ["self report measures", "Self-Report Measures", "Self-Report Measures"],
            ["long term outcomes", "Long-Term Outcomes", "Long-Term Outcomes"],
            ["e commerce growth", "E-Commerce Growth", "E-commerce Growth"],
          ],
        },
        {
          type: "paragraph",
          text: "After a colon, the next word is always capitalized in APA, even a one-letter article. The same holds after an em dash. This overrides the 4-letter rule rather than competing with it – position wins.",
        },
        {
          type: "list",
          items: [
            "**Working Memory: A Review of the Evidence** – \"A\" is capitalized because it opens the subtitle.",
            "**Sleep and Cognition – An Updated Model** – \"An\" is capitalized after the dash.",
            "**Attention in Context: The Role of Task Demands** – \"The\" is capitalized after the colon but lowercase would be correct mid-title.",
          ],
        },
      ],
    },
    {
      id: "edge-cases",
      heading: "Edge Cases Worth Checking by Hand",
      tocLabel: "Edge cases",
      blocks: [
        {
          type: "paragraph",
          text: "A converter applies the mechanical rule correctly. These four cases still need a human read, because they depend on meaning rather than word length.",
        },
        {
          type: "list",
          items: [
            "**Acronyms and initialisms.** APA keeps them uppercase: *The Role of BDNF in Memory*. Type them in capitals and any decent tool will leave them alone.",
            "**Proper nouns of any length.** *Of Mice and Men* keeps \"Mice\" and \"Men\" capitalized as nouns, but a two-letter surname or place name is capitalized because it is a proper noun, not because of length.",
            "**Species names.** Binomial names follow scientific convention, not title case: *Effects of Caffeine on Drosophila melanogaster*.",
            "**Brand casing.** *iPhone*, *eBay*, and *macOS* keep their own capitalization even as the first word of a heading.",
          ],
        },
        {
          type: "paragraph",
          text: "For the general rules that sit underneath every style guide, see the [capitalization rules guide](/capitalization-rules-guide?mode=title&style=apa), or run a heading through the [converter](/) and read the per-word explanation it gives.",
        },
      ],
    },
    {
      id: "apa-vs-others",
      heading: "How APA Compares",
      tocLabel: "APA vs other guides",
      blocks: [
        {
          type: "paragraph",
          text: "Against the other three major guides, APA sits in the middle. It capitalizes more than MLA and Chicago, and behaves almost identically to AP for the mechanical rule.",
        },
        {
          type: "table",
          headers: ["Guide", "Preposition threshold", "Typical use"],
          rows: [
            ["APA 7", "4+ letters", "Psychology, education, social sciences"],
            ["AP", "4+ letters", "Journalism, news, marketing copy"],
            ["Chicago 18", "5+ letters", "Books, formal editorial work"],
            ["MLA 9", "Never – all lowercase", "Humanities, literature, languages"],
          ],
        },
        {
          type: "paragraph",
          text: "If you are choosing between APA and MLA for a specific paper, [MLA vs APA](/blog/mla-vs-apa-headlines) sets the two side by side on the same example titles.",
        },
      ],
    },
  ],
}
