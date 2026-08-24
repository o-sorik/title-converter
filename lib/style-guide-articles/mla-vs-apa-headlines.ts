import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const MLA_VS_APA_HEADLINES_ARTICLE: WritingTipsArticle = {
  slug: "mla-vs-apa-headlines",
  tags: ["MLA Style", "APA Style", "Capitalization"],
  ctaWord: "mla title case",
  ctaText:
    "Paste one title into the free Title Case Converter and switch between MLA and APA. The output changes in place and every altered word carries the rule that moved it.",
  relatedSlugs: ["apa-7-title-case-guide", "ap-title-capitalization-basics", "apa-citing-titles", "what-words-are-not-capitalized-in-a-title"],
  faqItems: [
    {
      question: "What is the main difference between MLA and APA title case?",
      answer:
        "Preposition length. APA capitalizes any word of four letters or more, so it writes \"With\", \"From\" and \"Between\". MLA lowercases prepositions regardless of length, so the same words stay \"with\", \"from\" and \"between\" in middle positions. Everything else about the two is close to identical.",
    },
    {
      question: "Which should I use, MLA or APA?",
      answer:
        "Your discipline decides, not your preference. MLA is standard in literature, languages, cultural studies and most humanities coursework. APA is standard in psychology, education, nursing and the social sciences. If an assignment names one, that is the answer; if it does not, ask rather than guess.",
    },
    {
      question: "Does MLA capitalize 'between' in a title?",
      answer:
        "No, not in a middle position. MLA lowercases prepositions at any length, so it is \"The Space between Us\". APA, AP and Chicago all capitalize \"Between\" because it clears their length thresholds. MLA does capitalize it if it opens or closes the title.",
    },
    {
      question: "Do MLA and APA both use title case in the works cited or reference list?",
      answer:
        "No, and this is the sharpest split between them. MLA uses title case for every source title in the Works Cited list. APA switches to sentence case for article and chapter titles in its reference list, while keeping journal names in title case.",
    },
    {
      question: "Do MLA and APA capitalize subordinating conjunctions?",
      answer:
        "Both do. Words like \"Because\", \"Although\", \"If\", \"When\" and \"That\" count as major words in both guides and are capitalized. Only coordinating conjunctions – and, but, or, nor, for, so, yet – are lowercased, and only in middle positions.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "There is really one difference, and it is about prepositions. **APA capitalizes any word of four letters or more. MLA lowercases prepositions at any length.** Everything else – first and last word, major words, hyphenated compounds, the word after a colon – the two guides handle the same way.",
        },
        {
          type: "paragraph",
          text: "The second difference is not about titles on a page but about titles in a list: MLA keeps title case in the Works Cited, APA switches to sentence case in the References.",
        },
      ],
    },
    {
      id: "side-by-side",
      heading: "The Same Titles, Both Ways",
      tocLabel: "Side by side",
      blocks: [
        {
          type: "table",
          headers: ["Input", "MLA 9", "APA 7"],
          rows: [
            ["the space between us", "The Space between Us", "The Space Between Us"],
            ["gone with the wind", "Gone with the Wind", "Gone With the Wind"],
            ["notes toward a theory of reading", "Notes toward a Theory of Reading", "Notes Toward a Theory of Reading"],
            ["learning from failure", "Learning from Failure", "Learning From Failure"],
            ["a study of memory in context", "A Study of Memory in Context", "A Study of Memory in Context"],
          ],
        },
        {
          type: "paragraph",
          text: "The last row is the point worth noticing: when a title contains no preposition of four letters or more, MLA and APA produce identical output. Most short titles fall into that category, which is why the two guides feel interchangeable until they suddenly are not.",
        },
      ],
    },
    {
      id: "the-threshold",
      heading: "Where the Threshold Bites",
      tocLabel: "The threshold",
      blocks: [
        {
          type: "paragraph",
          text: "Reading down the MLA column below: every preposition stays lowercase. Reading down the APA column: the line falls between three and four letters.",
        },
        {
          type: "styleGuideMatrix",
          rowHeader: "Word",
          rows: [
            { label: "of (2 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "for (3 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "with (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "from (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "toward (6 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
            { label: "between (7 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
            { label: "without (7 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
          ],
        },
        {
          type: "paragraph",
          variant: "note",
          text: "Chicago sits between the two. Its 18th edition raised the threshold to five letters, so \"with\" stays lowercase but \"about\" is capitalized. [The APA guide](/blog/apa-7-title-case-guide) and [the AP guide](/blog/ap-title-capitalization-basics) cover each in full.",
        },
      ],
    },
    {
      id: "what-they-share",
      heading: "What the Two Guides Agree On",
      tocLabel: "What they share",
      blocks: [
        {
          type: "paragraph",
          text: "Most of the rule set is common ground, which is why the difference above is easy to miss.",
        },
        {
          type: "list",
          items: [
            "First and last word are always capitalized, whatever they are.",
            "Nouns, pronouns, verbs, adjectives and adverbs are capitalized at any length – including two-letter verbs like *Is* and *Be*.",
            "Subordinating conjunctions (*Because*, *Although*, *If*, *When*, *That*) are major words and get capitalized.",
            "Coordinating conjunctions (*and*, *but*, *or*, *nor*, *for*, *so*, *yet*) are lowercase in middle positions.",
            "Articles *a*, *an*, *the* are lowercase unless they open or close the title.",
            "The first word after a colon is capitalized.",
            "Both elements of a hyphenated compound are capitalized.",
          ],
        },
      ],
    },
    {
      id: "reference-lists",
      heading: "Works Cited vs References",
      tocLabel: "Reference lists",
      blocks: [
        {
          type: "paragraph",
          text: "This split catches people who learned one guide and then switched. It is not a capitalization preference so much as a different theory of what a reference entry is for.",
        },
        {
          type: "table",
          headers: ["", "MLA 9 Works Cited", "APA 7 References"],
          rows: [
            ["Article title", "Title case", "Sentence case"],
            ["Book title", "Title case", "Sentence case"],
            ["Journal name", "Title case", "Title case"],
            ["Example", "Kahneman, Daniel. Thinking, Fast and Slow.", "Kahneman, D. Thinking, fast and slow."],
          ],
        },
        {
          type: "paragraph",
          text: "APA's sentence-case rule applies to the title of the work being cited, never to the container. A journal or newspaper name keeps title case in both systems. [Citing Titles in APA](/blog/apa-citing-titles) walks through each source type with worked examples.",
        },
      ],
    },
    {
      id: "choosing",
      heading: "Choosing Between Them",
      tocLabel: "Choosing",
      blocks: [
        {
          type: "table",
          headers: ["Use", "When"],
          rows: [
            ["MLA 9", "Literature, languages, philosophy, cultural studies, most humanities coursework"],
            ["APA 7", "Psychology, education, nursing, sociology, business, health sciences"],
            ["Chicago 18", "Books, history, and publishers who specify it"],
            ["AP", "News writing, press releases, and marketing copy"],
          ],
        },
        {
          type: "paragraph",
          text: "If a syllabus, journal, or house style sheet names one, that settles it. Where nothing is specified, pick one and hold it across the whole document – inconsistency reads as carelessness far more visibly than either choice reads as wrong.",
        },
        {
          type: "paragraph",
          text: "To see the difference on your own titles, open the [converter](/) and switch between MLA and APA with the same text in the box. For the underlying rules shared by every guide, see [what words are not capitalized in a title](/blog/what-words-are-not-capitalized-in-a-title).",
        },
      ],
    },
  ],
}
