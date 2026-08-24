import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const APA_HEADING_LEVELS_ARTICLE: WritingTipsArticle = {
  slug: "apa-heading-levels",
  tags: ["APA Style", "Academic Writing", "Formatting"],
  ctaWord: "apa heading",
  ctaText:
    "Every APA heading level uses the same title case. Paste yours into the converter with APA selected and it applies the 4-letter rule across all five levels at once.",
  relatedSlugs: ["apa-7-title-case-guide", "apa-citing-titles", "mla-vs-apa-headlines", "do-you-capitalize-after-a-colon"],
  faqItems: [
    {
      question: "How many heading levels does APA 7 have?",
      answer:
        "Five. Levels 1 and 2 sit on their own line, Levels 3 through 5 are indented and run into the paragraph text. You use them in order and only go as deep as the paper needs – a short paper may use only Level 1.",
    },
    {
      question: "Are all APA heading levels in title case?",
      answer:
        "Yes. All five levels use title case, so the 4-letter rule applies identically at every depth. What changes between levels is placement, bold, and italics – never the capitalization.",
    },
    {
      question: "Is the word 'Introduction' used as a heading in APA 7?",
      answer:
        "No. APA 7 treats the paper title at the top of the first page of text as the heading for the introduction, so a separate \"Introduction\" heading is redundant and is not used.",
    },
    {
      question: "Do APA headings get numbered?",
      answer:
        "No. APA distinguishes levels by formatting – position, bold, italics – not by numbers. Numbered headings belong to other systems such as IEEE or many technical report templates.",
    },
    {
      question: "Can I skip from Level 1 to Level 3?",
      answer:
        "No. Levels must be used in sequence. If a Level 1 section needs subsections, the first one is Level 2, even if you only have a single subsection at that depth.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "APA 7 has **five heading levels, and every one of them uses title case**. The capitalization never changes with depth – what changes is placement, bold, and italics. So the only capitalization question you need to answer is the [APA 4-letter rule](/blog/apa-7-title-case-guide), applied the same way at every level.",
        },
      ],
    },
    {
      id: "the-five-levels",
      heading: "The Five Levels",
      tocLabel: "The five levels",
      blocks: [
        {
          type: "table",
          headers: ["Level", "Format", "Text begins"],
          rows: [
            ["1", "Centered, Bold, Title Case", "New paragraph below"],
            ["2", "Flush Left, Bold, Title Case", "New paragraph below"],
            ["3", "Flush Left, Bold Italic, Title Case", "New paragraph below"],
            ["4", "Indented, Bold, Title Case, ending with a period.", "Same line, after the period"],
            ["5", "Indented, Bold Italic, Title Case, ending with a period.", "Same line, after the period"],
          ],
        },
        {
          type: "paragraph",
          text: "Levels 4 and 5 are run-in headings: the heading ends with a period and the paragraph continues on the same line. They are still title case, and the final period is part of the heading rather than the sentence that follows.",
        },
        {
          type: "paragraph",
          variant: "note",
          text: "Headings are never numbered in APA and never take a colon in place of the period at Levels 4 and 5.",
        },
      ],
    },
    {
      id: "capitalization",
      heading: "Capitalization at Every Level",
      tocLabel: "Capitalization",
      blocks: [
        {
          type: "paragraph",
          text: "Because all five levels share one rule, a heading that is correct at Level 1 is correct at Level 5. The 4-letter threshold decides the minor words:",
        },
        {
          type: "styleGuideMatrix",
          rowHeader: "Word in a heading",
          rows: [
            { label: "and (3 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "of (2 letters)", guides: { ap: false, apa: false, chicago: false, mla: false } },
            { label: "with (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "from (4 letters)", guides: { ap: true, apa: true, chicago: false, mla: false } },
            { label: "during (6 letters)", guides: { ap: true, apa: true, chicago: true, mla: false } },
          ],
        },
        {
          type: "list",
          items: [
            "**Participants and Procedure** – \"and\" stays lowercase at three letters.",
            "**Measures of Working Memory** – \"of\" stays lowercase; \"Working\" and \"Memory\" are nouns.",
            "**Data Collected During Wave 2** – \"During\" is capitalized at six letters.",
            "**Results From the Pilot Study** – \"From\" is capitalized at four letters, \"the\" is not at three.",
          ],
        },
      ],
    },
    {
      id: "structure",
      heading: "Structuring a Paper",
      tocLabel: "Structuring a paper",
      blocks: [
        {
          type: "paragraph",
          text: "A typical empirical paper uses Level 1 for the major sections and Level 2 inside Method. Most papers never need Levels 4 and 5.",
        },
        {
          type: "table",
          headers: ["Section", "Level"],
          rows: [
            ["Method", "1"],
            ["Participants", "2"],
            ["Materials", "2"],
            ["Procedure", "2"],
            ["Results", "1"],
            ["Descriptive Statistics", "2"],
            ["Discussion", "1"],
          ],
        },
        {
          type: "paragraph",
          text: "APA 7 dropped the separate \"Introduction\" heading: the paper title, repeated in title case and bold at the top of the first page of text, serves that role. Starting with a Level 1 \"Introduction\" is one of the most common formatting errors carried over from APA 6.",
        },
      ],
    },
    {
      id: "mistakes",
      heading: "Five Mistakes to Check For",
      tocLabel: "Common mistakes",
      blocks: [
        {
          type: "table",
          headers: ["Mistake", "Fix"],
          rows: [
            ["An \"Introduction\" heading at Level 1", "Use the paper title instead – APA 7 removed this heading"],
            ["Sentence case in a heading", "All five levels are title case"],
            ["Skipping from Level 1 to Level 3", "Levels run in sequence, without gaps"],
            ["Numbered headings (1.1, 1.2)", "APA marks level by format, not number"],
            ["A colon ending a Level 4 heading", "Levels 4 and 5 end with a period"],
          ],
        },
        {
          type: "paragraph",
          text: "For headings that contain a colon in the middle – a title plus subtitle – the word after the colon is always capitalized. [Do You Capitalize After a Colon?](/blog/do-you-capitalize-after-a-colon) covers that rule across all four style guides.",
        },
        {
          type: "paragraph",
          text: "To check a set of headings in one pass, paste them into the [batch headline checker](/batch-checker) with APA selected; it flags any line whose capitalization disagrees with the style. The full rule set lives in the [capitalization rules guide](/capitalization-rules-guide?mode=title&style=apa).",
        },
      ],
    },
  ],
}
