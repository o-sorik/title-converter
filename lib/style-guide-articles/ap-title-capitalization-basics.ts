import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const AP_TITLE_CAPITALIZATION_BASICS_ARTICLE: WritingTipsArticle = {
  slug: "ap-title-capitalization-basics",
  tags: ["AP Style", "Journalism", "Capitalization"],
  ctaWord: "ap title case",
  ctaText:
    "Run a headline through the free Title Case Converter with AP selected. It applies the 4-letter rule and marks every word it changed, so you can check the call rather than trust it.",
  relatedSlugs: ["apa-7-title-case-guide", "mla-vs-apa-headlines", "is-president-capitalized", "is-professor-capitalized"],
  faqItems: [
    {
      question: "Does AP style capitalize prepositions?",
      answer:
        "Yes, when they are four letters or longer. AP capitalizes \"With\", \"From\", \"Into\", \"Over\" and \"About\", and lowercases \"at\", \"by\", \"in\", \"of\", \"on\", \"to\" and \"up\". The cutoff is length, not part of speech.",
    },
    {
      question: "Do you capitalize job titles in AP style?",
      answer:
        "Only when the title comes directly before a name and is a formal title. \"President Lincoln\" and \"Mayor Chen\" are capitalized; \"Abraham Lincoln, the president\" and \"the mayor, Wei Chen\" are not. Occupational descriptions like \"astronaut Mae Jemison\" stay lowercase even before the name.",
    },
    {
      question: "Are AP headlines written in title case or sentence case?",
      answer:
        "AP itself recommends sentence case for headlines – capitalize the first word and proper nouns only. Many newsrooms and most marketing teams use AP title case anyway for headlines and article titles, which is the rule this page describes. Check your own outlet's style sheet before assuming.",
    },
    {
      question: "How does AP style handle composition titles?",
      answer:
        "AP puts book, film, song and TV show titles in quotation marks rather than italics, and capitalizes them in title case: the film \"Gone With the Wind\". The Bible and reference books such as dictionaries take no quotation marks.",
    },
    {
      question: "Is AP the same as APA for capitalization?",
      answer:
        "For the mechanical rule, almost. Both capitalize words of four letters or more. They diverge on hyphenated compounds, where APA capitalizes both elements and AP lowercases the second in cases like \"E-commerce\", and on where each is used at all – AP for news copy, APA for academic manuscripts.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "AP style capitalizes **every word of four letters or more** in a title, plus all major words at any length, plus the first and last word. Everything else – short articles, short conjunctions, short prepositions – stays lowercase. Job titles follow a separate rule that has nothing to do with length: capitalize a formal title only when it sits directly before a name.",
        },
      ],
    },
    {
      id: "the-rule",
      heading: "The 4-Letter Rule",
      tocLabel: "The 4-letter rule",
      blocks: [
        {
          type: "paragraph",
          text: "The threshold is what makes AP distinctive. Four letters is the line, and it applies to prepositions and conjunctions alike – a word does not get a pass for being a \"minor\" part of speech if it is long enough.",
        },
        {
          type: "styleGuideMatrix",
          rowHeader: "Word",
          rows: [
            { label: "in (2 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "for (3 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "with (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "over (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "into (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "after (5 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
            { label: "through (7 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
          ],
        },
        {
          type: "paragraph",
          text: "The classic illustration is *Gone With the Wind*. AP capitalizes \"With\" at four letters but leaves \"the\" lowercase at three. Chicago and MLA both write *Gone with the Wind*, which is why the same film title appears two ways across publications.",
        },
      ],
    },
    {
      id: "job-titles",
      heading: "Job Titles and Honorifics",
      tocLabel: "Job titles",
      blocks: [
        {
          type: "paragraph",
          text: "This is the AP rule most often broken in press releases and company blogs. Position, not importance, decides the case.",
        },
        {
          type: "table",
          headers: ["Correct", "Incorrect", "Why"],
          rows: [
            ["President Lincoln signed the order", "president Lincoln signed the order", "Formal title directly before a name"],
            ["Abraham Lincoln, the president, signed", "Abraham Lincoln, the President, signed", "Title follows the name"],
            ["The mayor announced the plan", "The Mayor announced the plan", "No name attached"],
            ["astronaut Mae Jemison", "Astronaut Mae Jemison", "Occupational description, not a formal title"],
            ["Chief Executive Officer Ana Ruiz", "chief executive officer Ana Ruiz", "Formal corporate title before the name"],
          ],
        },
        {
          type: "paragraph",
          text: "AP also prefers to move long titles after the name rather than stacking them in front: *Ana Ruiz, chief executive officer of Northwind*, reads better than the capitalized version and sidesteps the question entirely.",
        },
        {
          type: "paragraph",
          variant: "note",
          text: "Two adjacent questions have their own pages: [Is \"President\" Capitalized?](/blog/is-president-capitalized) and [Is \"Professor\" Capitalized?](/blog/is-professor-capitalized).",
        },
      ],
    },
    {
      id: "headlines",
      heading: "Headlines: Sentence Case or Title Case?",
      tocLabel: "Headlines",
      blocks: [
        {
          type: "paragraph",
          text: "AP's own guidance for news headlines is sentence case – capitalize the first word and proper nouns, nothing else. Wire copy and most newspapers follow it.",
        },
        {
          type: "paragraph",
          text: "In practice, a large share of organizations that say \"we use AP style\" apply AP title case to headlines and article titles, because it reads as more formal in a marketing context. Both are defensible. What is not defensible is switching between them within one publication.",
        },
        {
          type: "table",
          headers: ["Approach", "Example", "Common in"],
          rows: [
            ["AP sentence case", "City council approves transit funding", "Newspapers, wire copy"],
            ["AP title case", "City Council Approves Transit Funding", "Marketing, blogs, internal style sheets"],
          ],
        },
        {
          type: "paragraph",
          text: "If you need to check a batch for consistency, the [batch headline checker](/batch-checker) runs a whole list against one style and flags the lines that disagree with it. The difference between the two is covered in more depth in [Title Case vs Sentence Case](/blog/sentence-vs-title-case).",
        },
      ],
    },
    {
      id: "composition-titles",
      heading: "Composition Titles",
      tocLabel: "Composition titles",
      blocks: [
        {
          type: "paragraph",
          text: "AP departs from academic guides here: quotation marks instead of italics, applied to books, films, songs, albums, plays, and television programs.",
        },
        {
          type: "list",
          items: [
            "the novel \"Beloved\" – quotation marks, title case inside them",
            "the film \"Gone With the Wind\" – \"With\" capitalized at four letters",
            "the album \"Rumours\" – same treatment as books and films",
            "the Bible, Webster's New World College Dictionary – no quotation marks for scripture and reference works",
          ],
        },
        {
          type: "paragraph",
          text: "Software, apps, and websites are not composition titles in AP and take no quotation marks: *Photoshop*, *Slack*, *Wikipedia*.",
        },
      ],
    },
    {
      id: "quick-reference",
      heading: "Quick Reference",
      tocLabel: "Quick reference",
      blocks: [
        {
          type: "list",
          items: [
            "Capitalize words of **four letters or more**, regardless of part of speech.",
            "Capitalize all nouns, verbs, adjectives, adverbs and pronouns at any length – including *Is*, *Be*, and *It*.",
            "Capitalize the first and last word no matter what.",
            "Lowercase *a*, *an*, *the*, and short conjunctions and prepositions in middle positions.",
            "Capitalize a formal job title only directly before a name.",
            "Put composition titles in quotation marks, not italics.",
          ],
        },
        {
          type: "paragraph",
          text: "The [capitalization rules guide](/capitalization-rules-guide?mode=title&style=ap) holds the full AP rule set with side-by-side comparisons against the other three guides.",
        },
      ],
    },
  ],
}
