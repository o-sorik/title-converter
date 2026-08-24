import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const CHICAGO_TITLE_CASE_ARTICLE: WritingTipsArticle = {
  slug: "chicago-title-case",
  tags: ["Chicago Style", "Capitalization", "Editorial"],
  ctaWord: "chicago title case",
  ctaText:
    "Select Chicago in the free Title Case Converter and it applies the 18th edition's 5-letter threshold, marking every word it changed and why.",
  relatedSlugs: ["apa-7-title-case-guide", "ap-title-capitalization-basics", "mla-vs-apa-headlines", "what-words-are-not-capitalized-in-a-title"],
  faqItems: [
    {
      question: "Does Chicago capitalize prepositions?",
      answer:
        "Since the 18th edition, yes – prepositions of five letters or more are capitalized. \"About\", \"Between\", \"Through\" and \"Without\" are capitalized; \"with\", \"from\", \"into\" and \"over\" stay lowercase at four letters. This is a change: earlier editions lowercased prepositions regardless of length.",
    },
    {
      question: "What changed in the Chicago Manual of Style 18th edition?",
      answer:
        "For title capitalization, the headline change is the new five-letter threshold for prepositions. Until the 18th edition, Chicago's guidance was to lowercase prepositions whatever their length, which is why older Chicago-styled titles read \"Much Ado about Nothing\" and current ones read \"Much Ado About Nothing\".",
    },
    {
      question: "Is Chicago title case the same as AP?",
      answer:
        "No. The thresholds differ by one letter, and that one letter covers a lot of common words. AP capitalizes prepositions at four letters or more, Chicago at five or more, so \"with\", \"from\", \"into\", \"over\" and \"upon\" are capitalized in AP and lowercase in Chicago.",
    },
    {
      question: "Does Chicago capitalize 'to' in an infinitive?",
      answer:
        "No. \"To\" stays lowercase as part of an infinitive – \"How to Cook Everything\" – and also as a two-letter preposition. It is capitalized only when it opens or closes the title.",
    },
    {
      question: "Which conjunctions does Chicago lowercase?",
      answer:
        "Only the coordinating ones: and, but, for, or, nor, so, and yet. Subordinating conjunctions such as \"Although\", \"Because\", \"If\", \"When\" and \"That\" count as major words and are capitalized.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "Chicago title case capitalizes the first and last word, every major word, and – since the **18th edition** – **every preposition of five letters or more**. Prepositions of four letters or fewer stay lowercase, as do articles and coordinating conjunctions.",
        },
        {
          type: "paragraph",
          variant: "note",
          text: "That five-letter rule is new. If you learned Chicago from the 17th edition or earlier, the rule you learned was to lowercase prepositions at any length.",
        },
      ],
    },
    {
      id: "the-change",
      heading: "What the 18th Edition Changed",
      tocLabel: "The 18th edition change",
      blocks: [
        {
          type: "paragraph",
          text: "For decades, Chicago's distinguishing feature was that it lowercased prepositions regardless of length. That is what produced the classic Chicago rendering of long prepositions in book titles, and what separated it most sharply from AP.",
        },
        {
          type: "table",
          headers: ["Title", "Chicago 17 and earlier", "Chicago 18"],
          rows: [
            ["much ado about nothing", "Much Ado about Nothing", "Much Ado About Nothing"],
            ["the bridge over the river", "The Bridge over the River", "The Bridge over the River"],
            ["a journey through the alps", "A Journey through the Alps", "A Journey Through the Alps"],
            ["notes toward a theory", "Notes toward a Theory", "Notes Toward a Theory"],
          ],
        },
        {
          type: "paragraph",
          text: "The second row is worth reading twice: \"over\" has four letters, so it stays lowercase under both editions. The change only affects prepositions at five letters and above.",
        },
      ],
    },
    {
      id: "the-threshold",
      heading: "Where the Line Falls",
      tocLabel: "The threshold",
      blocks: [
        {
          type: "paragraph",
          text: "Reading the Chicago column: everything at four letters or fewer is lowercase, everything at five or more is capitalized.",
        },
        {
          type: "styleGuideMatrix",
          rowHeader: "Word",
          rows: [
            { label: "of (2 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "for (3 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "with (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "over (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "about (5 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
            { label: "under (5 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
            { label: "through (7 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
          ],
        },
        {
          type: "paragraph",
          text: "Chicago now sits one letter above AP and APA, and well above MLA, which lowercases prepositions at any length. [MLA vs APA](/blog/mla-vs-apa-headlines) covers the two academic guides against each other.",
        },
      ],
    },
    {
      id: "the-rest",
      heading: "The Rules That Did Not Change",
      tocLabel: "The other rules",
      blocks: [
        {
          type: "list",
          items: [
            "Capitalize the **first and last word** of the title and of any subtitle, whatever they are.",
            "Capitalize **nouns, pronouns, verbs, adjectives and adverbs** at any length – including *Is*, *Be*, *It* and *Do*.",
            "Lowercase the articles *a*, *an*, *the* in middle positions.",
            "Lowercase the **coordinating conjunctions** *and*, *but*, *for*, *or*, *nor*, *so*, *yet*.",
            "Capitalize **subordinating conjunctions** – *Although*, *Because*, *If*, *When*, *That* – as major words.",
            "Lowercase **to** in an infinitive: *How to Cook Everything*.",
            "Capitalize the first word after a **colon**.",
          ],
        },
        {
          type: "paragraph",
          text: "The full rule set with side-by-side comparisons lives in the [capitalization rules guide](/capitalization-rules-guide?mode=title&style=chicago). For the general question of which words stay lowercase in any style, see [what words are not capitalized in a title](/blog/what-words-are-not-capitalized-in-a-title).",
        },
      ],
    },
    {
      id: "when-to-use",
      heading: "When to Use Chicago",
      tocLabel: "When to use it",
      blocks: [
        {
          type: "paragraph",
          text: "Chicago is the default for book publishing and for a large share of formal editorial work in the United States. Trade publishers, university presses, and many magazines specify it in their house style sheets.",
        },
        {
          type: "table",
          headers: ["Context", "Usual guide"],
          rows: [
            ["Books, university presses, history writing", "Chicago"],
            ["News copy, press releases, marketing", "AP"],
            ["Psychology, education, social sciences", "APA"],
            ["Literature, languages, humanities coursework", "MLA"],
          ],
        },
        {
          type: "paragraph",
          text: "If a publisher names Chicago but your source material was styled under an older edition, the preposition threshold is the thing to re-check. Paste a list of titles into the [batch headline checker](/batch-checker) with Chicago selected and it flags every line that disagrees.",
        },
      ],
    },
  ],
}
