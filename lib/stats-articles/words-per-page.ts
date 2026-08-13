import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const WORDS_PER_PAGE_ARTICLE: WritingTipsArticle = {
  slug: "words-per-page",
  tags: ["Writing Statistics", "Formatting", "Academic Writing"],
  ctaWord: "words per page",
  ctaText:
    "Finished the essay and now fixing the formatting? Paste your title into our free Title Case Converter and it applies AP, APA, Chicago, or MLA capitalization in one click.",
  relatedSlugs: [
    "how-many-words-in-a-novel",
    "average-book-length",
    "average-reading-speed",
    "how-long-should-a-blog-post-be",
    "average-typing-speed",
  ],
  faqItems: [
    {
      question: "How many pages is 1,000 words?",
      answer:
        "About 2 pages single-spaced or 4 pages double-spaced, using the standard academic assumption of 12-point Times New Roman with 1-inch margins. Divide your word count by 500 for single-spaced pages or by 250 for double-spaced pages. These are convention-based estimates – actual page counts shift with font, margins, and paragraph breaks.",
    },
    {
      question: "Is 500 words one page?",
      answer:
        "Yes, if the page is single-spaced in 12-point Times New Roman with 1-inch margins – that is the classic convention stated by college library guides like Howard Community College's. Double-spaced, 500 words runs to about 2 pages. On Microsoft Word's actual defaults (1.15 line spacing plus a blank line after each paragraph), a page holds noticeably fewer than 500 words.",
    },
    {
      question: "How many words are on a page of a book?",
      answer:
        "Roughly 250–300 words on a typical printed page, per Kindlepreneur's survey of 900+ authors. The best measured figure comes from Brysbaert's 2019 study: the 50 novels his participants read averaged about 278 words per page. Trim size and type size move the number a lot – a 6-by-9-inch page set in 10-point type can hold up to 600 words.",
    },
    {
      question: "How many words is a 5-page paper?",
      answer:
        "About 1,250 words double-spaced or 2,500 words single-spaced, using the 250/500 words-per-page convention. Howard Community College's library guide gives the same math for shorter assignments: a 3–4 page double-spaced paper is roughly 750–1,000 words. Many instructors now assign word counts directly because page counts vary with formatting.",
    },
    {
      question: "Does MLA or APA specify a words-per-page standard?",
      answer:
        "No. MLA and APA define formatting – 12-point legible font, double spacing, 1-inch margins – but neither publishes a words-per-page figure, and neither does the Chicago Manual of Style's public guidance. The familiar 250 words-per-page number is a convention derived from those formatting rules, not an official standard from any style body.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "A page holds about **500 words single-spaced or 250 words double-spaced** – assuming 12-point Times New Roman, 1-inch margins, and letter-size paper. That is the convention stated by college library guides ([Howard Community College](https://howardcc.libanswers.com/faq/69833)), and it converges with two independent traditions: the typewriter-era manuscript rule of 250 words per page documented by [William Shunn](https://www.shunn.net/format/2021/04/the_old_rule_of_thumb_for_estimating_word_count_is_obsolete.html), and real printed novels, which average about 278 words per page ([Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047)).",
        },
        {
          type: "keyStats",
          items: [
            "**500 words** – one single-spaced typed page in 12-pt Times New Roman with 1-inch margins ([Howard Community College Library](https://howardcc.libanswers.com/faq/69833), current)",
            "**250 words** – one double-spaced typed page under the same format ([Howard Community College Library](https://howardcc.libanswers.com/faq/69833), current)",
            "**≈278 words** – the measured average per printed page across 50 real novels: 107,000 words over 385 pages (2019, [Brysbaert](https://doi.org/10.1016/j.jml.2019.104047))",
            "**250–300 words** – what most traditional publishers fit on a printed book page ([Kindlepreneur](https://kindlepreneur.com/words-per-page/) survey of 900+ authors, 2023)",
            "**425–600 words** – capacity of a 6″×9″ printed page depending on type size, from typeset tests by professional book designers ([Book Design Made Simple](https://www.bookdesignmadesimple.com/calculate-book-page-count-using-word-count/), current)",
            "**1.15, not 1.0** – Microsoft Word's default line spacing, which breaks the 500-words-per-page assumption out of the box ([Microsoft Support](https://support.microsoft.com/en-us/office/change-the-default-line-spacing-in-word-411437a0-0646-490d-b426-a9249a78b315), current)",
            "**10 characters per inch** – the pica typewriter spec behind the original 250-words-per-page manuscript rule ([Shunn, 2021](https://www.shunn.net/format/2021/04/the_old_rule_of_thumb_for_estimating_word_count_is_obsolete.html))",
            "**0** – the number of style bodies (MLA, APA, Chicago) that publish an official words-per-page figure (verified absence, 2026)",
          ],
        },
      ],
    },
    {
      id: "single-vs-double-spaced",
      heading: "How Many Words Fit on a Single-Spaced vs Double-Spaced Page?",
      tocLabel: "Single vs double spacing",
      blocks: [
        {
          type: "paragraph",
          text: "The standard answer is 500 single-spaced and 250 double-spaced. [Howard Community College's library FAQ](https://howardcc.libanswers.com/faq/69833) states the rule directly – \"a good rule of thumb is 500 words for a single spaced page and 250 words for a double spaced page\" – along with the caveat every mill site omits: the count \"will vary depending on word length, font size and type, margin size, and spacing elements.\"",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "500 words",
              label: "One single-spaced page – 12-pt Times New Roman, 1-inch margins",
              sourceName: "Howard CC Library FAQ",
              sourceHref: "https://howardcc.libanswers.com/faq/69833",
            },
            {
              value: "250 words",
              label: "One double-spaced page under the same format",
              sourceName: "Howard CC Library FAQ",
              sourceHref: "https://howardcc.libanswers.com/faq/69833",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Double spacing is not arbitrary – it is required by the major academic styles. [MLA format](https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_general_format.html) calls for a legible 12-point font, double spacing, and 1-inch margins on 8.5×11-inch paper. [APA is even more explicit](https://apastyle.apa.org/style-grammar-guidelines/paper-format/line-spacing): \"Double-space all parts of an APA Style paper, including the abstract; text; block quotations; table and figure numbers, titles, and notes; and reference list.\" So a \"page\" of academic writing is a double-spaced page, and 250 words is the working figure.",
        },
        {
          type: "paragraph",
          text: "One catch before you trust either number: **Microsoft Word's defaults don't match the rule's assumptions**. Word ships with 1.15 line spacing and adds a blank line after every paragraph ([Microsoft Support](https://support.microsoft.com/en-us/office/change-the-default-line-spacing-in-word-411437a0-0646-490d-b426-a9249a78b315)). A default Word page is neither single- nor double-spaced, and it holds noticeably fewer than 500 words. The 500/250 figures only apply after you manually set the classic academic format.",
        },
      ],
    },
    {
      id: "conversion-table",
      heading: "How Many Pages Is 500, 1,000, or 2,000 Words?",
      tocLabel: "Words-to-pages table",
      blocks: [
        {
          type: "paragraph",
          text: "Divide your word count by 500 for single-spaced pages or by 250 for double-spaced pages. Every figure below is convention-based arithmetic on the standard academic format, not a measurement:",
        },
        {
          type: "table",
          headers: ["Word count", "Single-spaced pages", "Double-spaced pages"],
          rows: [
            ["250 words", "0.5", "1"],
            ["500 words", "1", "2"],
            ["750 words", "1.5", "3"],
            ["1,000 words", "2", "4"],
            ["1,500 words", "3", "6"],
            ["2,000 words", "4", "8"],
            ["2,500 words", "5", "10"],
            ["5,000 words", "10", "20"],
            ["10,000 words", "20", "40"],
          ],
        },
        {
          type: "paragraph",
          text: "[The same college guide](https://howardcc.libanswers.com/faq/69833) works the conversion in the other direction: a 3–4 page double-spaced paper is roughly 750–1,000 words, and a 7-page double-spaced paper is about 1,750 words. It also notes that assignments increasingly specify length in words rather than pages \"to ensure consistency across varying formatting choices\" – which is exactly why these figures are estimates, not guarantees.",
        },
        {
          type: "paragraph",
          text: "For book-length totals – how many words a 300-page novel runs, what publishers expect by genre – see our dedicated breakdown of [how many words are in a novel](/blog/how-many-words-in-a-novel).",
        },
      ],
    },
    {
      id: "typewriter-history",
      heading: "Where Does the 250-Words-Per-Page Rule Come From?",
      tocLabel: "The typewriter origin",
      blocks: [
        {
          type: "paragraph",
          text: "From typewriters. As manuscript-format authority [William Shunn documents](https://www.shunn.net/format/2021/04/the_old_rule_of_thumb_for_estimating_word_count_is_obsolete.html), pica typewriter type produced exactly 10 characters per inch, which on a page with 1-inch margins yields about 25 double-spaced lines – roughly 250 words. Editors paid by the word and needed a fast estimate; 250 words per manuscript page became the industry convention.",
        },
        {
          type: "paragraph",
          text: "The manuscript format itself is still alive – [Shunn's current spec](https://www.shunn.net/format/story/) calls for 12-point Times New Roman or Courier New, double-spaced, with one-inch margins all around. That is, the professional manuscript page and the academic paper page are the same page, which is why both traditions land on 250 words.",
        },
        {
          type: "paragraph",
          text: "The estimation rule, however, is officially retired. Shunn declared it obsolete in 2021: now that every word processor counts words exactly, \"the old rule of thumb for estimating word count\" no longer serves a purpose. Use the computer's count – the 250 figure survives only as a page-length intuition.",
        },
      ],
    },
    {
      id: "by-font",
      heading: "How Many Words Per Page by Font and Font Size?",
      tocLabel: "By font and size",
      blocks: [
        {
          type: "paragraph",
          text: "Honest answer: **no verifiable standard exists for typed pages**. The font-by-font tables circulating online (Arial vs Calibri vs Verdana) are copied between calculator sites with no stated methodology – one popular counter states the 500-word baseline and then contradicts it with its own calculator on the same page. We found no per-font figures worth publishing.",
        },
        {
          type: "paragraph",
          text: "For **printed books**, one defensible dataset exists. The professional book designers behind [Book Design Made Simple](https://www.bookdesignmadesimple.com/calculate-book-page-count-using-word-count/) typeset the same 10,000 words at each trim size and type size and derived real capacity figures:",
        },
        {
          type: "barList",
          items: [
            { label: "5″ × 8″ trade paperback", percent: 67, display: "300–400 words" },
            { label: "5.5″ × 8.5″ trade paperback", percent: 79, display: "350–475 words" },
            { label: "6″ × 9″ hardcover or trade", percent: 100, display: "425–600 words" },
          ],
        },
        {
          type: "paragraph",
          text: "The ranges run from 12-point type (fewer words) down to 10-point type (more words). Two qualitative rules do hold: smaller type and larger pages fit more words, and monospaced fonts like Courier fit fewer words than proportional fonts like Times New Roman – that difference is built into the typewriter math above.",
        },
      ],
    },
    {
      id: "style-guides",
      heading: "Do MLA, APA, or Chicago Define Words Per Page?",
      tocLabel: "What style guides say",
      blocks: [
        {
          type: "paragraph",
          text: "No – none of them. We checked the [MLA Style Center's formatting guidance](https://style.mla.org/formatting-papers/), [Purdue OWL's MLA format page](https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_general_format.html), [APA's official paper-format pages](https://apastyle.apa.org/style-grammar-guidelines/paper-format/line-spacing), and the [Chicago Manual of Style's public manuscript-preparation Q&A](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/ManuscriptPreparation.html). Each defines fonts, spacing, and margins. None states a words-per-page figure.",
        },
        {
          type: "paragraph",
          text: "So when a site claims \"the MLA standard is 250 words per page,\" it is laundering a convention into an official rule. The 250 figure *follows from* the formatting the style guides require – it is not something they publish. The style bodies define the container; the word count is what happens to fit in it.",
        },
        {
          type: "paragraph",
          text: "The practical consequence, as the college guides note, is that institutions increasingly assign word counts instead of page counts, precisely because page counts are formatting-dependent. If your assignment says pages, it implicitly assumes the classic double-spaced format – and if your title needs style-guide-correct capitalization to match, our guide to [capitalization rules](/capitalization-rules-guide) covers all four major styles.",
        },
      ],
    },
    {
      id: "printed-books",
      heading: "How Many Words Are on a Page of a Printed Book?",
      tocLabel: "Printed book pages",
      blocks: [
        {
          type: "paragraph",
          text: "Between 250 and 600, depending on the book. Three independent measurements bracket the range:",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "250–300",
              label: "Publisher rule of thumb, from a survey of 900+ authors",
              sourceName: "Kindlepreneur, 2023",
              sourceHref: "https://kindlepreneur.com/words-per-page/",
            },
            {
              value: "≈278",
              label: "Measured average across 50 real novels (107,000 words / 385 pages)",
              sourceName: "Brysbaert, 2019",
              sourceHref: "https://doi.org/10.1016/j.jml.2019.104047",
            },
            {
              value: "425–600",
              label: "Typeset capacity of a 6″×9″ page at 12-pt down to 10-pt type",
              sourceName: "Book Design Made Simple",
              sourceHref: "https://www.bookdesignmadesimple.com/calculate-book-page-count-using-word-count/",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The same survey found fiction averages about 280 words per printed page versus roughly 233 for nonfiction – nonfiction's headings, lists, and white space eat capacity. For what those per-page figures add up to across a whole book – and how long that book takes to read at [the average reading speed](/blog/average-reading-speed) – see our companion piece on [average book length](/blog/average-book-length).",
        },
      ],
    },
    {
      id: "sources",
      heading: "Sources",
      hideFromToc: true,
      blocks: [
        {
          type: "sources",
          items: [
            {
              name: "How Many Words Are Typically on One Typed Page? (Library FAQ)",
              publisher: "Howard Community College",
              year: "2026",
              href: "https://howardcc.libanswers.com/faq/69833",
            },
            {
              name: "MLA General Format",
              publisher: "Purdue Online Writing Lab",
              year: "2026",
              href: "https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_general_format.html",
            },
            {
              name: "Line Spacing – Paper Format Guidelines",
              publisher: "APA Style, American Psychological Association",
              year: "2026",
              href: "https://apastyle.apa.org/style-grammar-guidelines/paper-format/line-spacing",
            },
            {
              name: "Formatting Papers",
              publisher: "MLA Style Center",
              year: "2026",
              href: "https://style.mla.org/formatting-papers/",
            },
            {
              name: "Manuscript Preparation Q&A",
              publisher: "The Chicago Manual of Style Online",
              year: "2026",
              href: "https://www.chicagomanualofstyle.org/qanda/data/faq/topics/ManuscriptPreparation.html",
            },
            {
              name: "Change the Default Line Spacing in Word",
              publisher: "Microsoft Support",
              year: "2026",
              href: "https://support.microsoft.com/en-us/office/change-the-default-line-spacing-in-word-411437a0-0646-490d-b426-a9249a78b315",
            },
            {
              name: "Proper Manuscript Format – Short Story Format (William Shunn)",
              publisher: "Shunn.net",
              year: "2026",
              href: "https://www.shunn.net/format/story/",
            },
            {
              name: "The Old Rule of Thumb for Estimating Word Count Is Obsolete (William Shunn)",
              publisher: "Shunn.net",
              year: "2021",
              href: "https://www.shunn.net/format/2021/04/the_old_rule_of_thumb_for_estimating_word_count_is_obsolete.html",
            },
            {
              name: "How Many Words per Page Are in a Book? (900+ author survey)",
              publisher: "Kindlepreneur",
              year: "2023",
              href: "https://kindlepreneur.com/words-per-page/",
            },
            {
              name: "Calculate Book Page Count Using Word Count (Raven & Collett)",
              publisher: "Book Design Made Simple",
              year: "2026",
              href: "https://www.bookdesignmadesimple.com/calculate-book-page-count-using-word-count/",
            },
            {
              name: "How Many Words Do We Read per Minute? A Review and Meta-Analysis of Reading Rate (Brysbaert; 50-book corpus: 107,000 words / 385 pages)",
              publisher: "Journal of Memory and Language 109:104047",
              year: "2019",
              href: "https://doi.org/10.1016/j.jml.2019.104047",
            },
          ],
        },
      ],
    },
  ],
}
