import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const APA_CITING_TITLES_ARTICLE: WritingTipsArticle = {
  slug: "apa-citing-titles",
  tags: ["APA Style", "Citations", "Academic Writing"],
  ctaWord: "apa reference title",
  ctaText:
    "Switch the converter to Sentence case for a reference-list entry, or APA title case for the same title in your running text. Both are one click apart.",
  relatedSlugs: ["apa-7-title-case-guide", "apa-heading-levels", "mla-vs-apa-headlines", "sentence-vs-title-case"],
  faqItems: [
    {
      question: "Is an article title in APA sentence case or title case?",
      answer:
        "Sentence case in the reference list, title case in your running text. \"The effects of sleep loss on working memory\" appears that way in the references, but if you name the same article mid-paragraph it becomes The Effects of Sleep Loss on Working Memory.",
    },
    {
      question: "Do you capitalize journal names in APA references?",
      answer:
        "Yes. The journal name keeps title case and italics even though the article title next to it is in sentence case. That contrast inside a single entry is intentional: Journal of Experimental Psychology, not Journal of experimental psychology.",
    },
    {
      question: "Are book titles italicized in APA?",
      answer:
        "Yes. Books, reports, journals, and other standalone works are italicized. Article titles and book chapters – works that live inside a container – are neither italicized nor placed in quotation marks in APA references.",
    },
    {
      question: "What happens to a colon in an APA reference title?",
      answer:
        "The first word of the subtitle is capitalized even in sentence case. \"Working memory: A review of the evidence\" keeps \"A\" capitalized because it follows the colon, while the rest of the subtitle stays lowercase.",
    },
    {
      question: "Do proper nouns stay capitalized in APA sentence case?",
      answer:
        "Always. Sentence case lowercases ordinary words, not names. \"The effects of Ritalin on Canadian adolescents\" keeps both proper nouns capitalized, and acronyms such as ADHD or BDNF stay in capitals.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "APA uses **sentence case for the work being cited and title case for the container that holds it**. An article title is sentence case; the journal it appeared in is title case. A chapter is sentence case; the edited book is title case. Once you see the entry as work-inside-container, the rule stops looking arbitrary.",
        },
        {
          type: "paragraph",
          variant: "note",
          text: "This applies only inside the reference list. The same title named in your running text takes ordinary [APA title case](/blog/apa-7-title-case-guide).",
        },
      ],
    },
    {
      id: "the-split",
      heading: "The Work and the Container",
      tocLabel: "The split",
      blocks: [
        {
          type: "table",
          headers: ["Source type", "Work being cited", "Container"],
          rows: [
            ["Journal article", "Sentence case, no italics", "Journal name – title case, italic"],
            ["Book chapter", "Sentence case, no italics", "Book title – sentence case, italic"],
            ["Whole book", "Sentence case, italic", "– none –"],
            ["Report", "Sentence case, italic", "– none –"],
            ["Web page", "Sentence case, italic", "Site name – title case, roman"],
          ],
        },
        {
          type: "paragraph",
          text: "The one row that surprises people: an edited **book** title is sentence case, because the book is still a work rather than a periodical. Only periodical names – journals, magazines, newspapers – keep title case.",
        },
      ],
    },
    {
      id: "worked-examples",
      heading: "Worked Examples",
      tocLabel: "Examples",
      blocks: [
        {
          type: "paragraph",
          variant: "subheading",
          text: "Journal article",
        },
        {
          type: "paragraph",
          text: "Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. *Journal of Memory and Language, 109*, 104047.",
        },
        {
          type: "paragraph",
          text: "The article title is sentence case, with \"A\" capitalized after the question mark. The journal name is title case and italic.",
        },
        {
          type: "paragraph",
          variant: "subheading",
          text: "Whole book",
        },
        {
          type: "paragraph",
          text: "Kahneman, D. (2011). *Thinking, fast and slow*. Farrar, Straus and Giroux.",
        },
        {
          type: "paragraph",
          text: "Sentence case and italics. The publisher name keeps its own capitalization as a proper noun.",
        },
        {
          type: "paragraph",
          variant: "subheading",
          text: "Chapter in an edited book",
        },
        {
          type: "paragraph",
          text: "Chen, W. (2020). Attention in noisy environments. In A. Ruiz &amp; L. Park (Eds.), *Handbook of applied cognition* (pp. 121–148). Academic Press.",
        },
        {
          type: "paragraph",
          text: "Both the chapter and the book are sentence case; only the book is italicized.",
        },
        {
          type: "paragraph",
          variant: "subheading",
          text: "The same article named in your text",
        },
        {
          type: "paragraph",
          text: "Brysbaert's How Many Words Do We Read per Minute? A Review and Meta-Analysis of Reading Rate reports a mean of 238 words per minute.",
        },
        {
          type: "paragraph",
          text: "Now it is title case, because it is running prose rather than a reference entry. Note \"per\" stays lowercase at three letters while \"Meta-Analysis\" capitalizes both hyphenated elements.",
        },
      ],
    },
    {
      id: "sentence-case-rules",
      heading: "What Sentence Case Does Not Lowercase",
      tocLabel: "Sentence case rules",
      blocks: [
        {
          type: "paragraph",
          text: "Sentence case is not \"make everything lowercase\". Four categories keep their capitals:",
        },
        {
          type: "list",
          items: [
            "**The first word** of the title.",
            "**The first word after a colon**, a dash, or end punctuation inside the title.",
            "**Proper nouns** – people, places, organizations, brand names, languages.",
            "**Acronyms and initialisms** – ADHD, BDNF, COVID-19, fMRI.",
          ],
        },
        {
          type: "table",
          headers: ["Reference-list form", "Why"],
          rows: [
            ["Working memory: A review of the evidence", "\"A\" follows the colon"],
            ["The effects of Ritalin on adolescent attention", "\"Ritalin\" is a brand name"],
            ["Screening for ADHD in primary care", "Acronym stays uppercase"],
            ["Bilingualism in Canadian schools: A longitudinal study", "Proper adjective plus post-colon capital"],
          ],
        },
        {
          type: "paragraph",
          text: "If you are converting a title you already wrote in title case, the [sentence case converter](/sentence-case-converter) handles the mechanical part and leaves recognised acronyms alone – but read the result for proper nouns, which no tool can infer reliably.",
        },
      ],
    },
    {
      id: "common-errors",
      heading: "Four Errors That Cost Marks",
      tocLabel: "Common errors",
      blocks: [
        {
          type: "table",
          headers: ["Wrong", "Right", "Rule"],
          rows: [
            ["Thinking, Fast and Slow.", "Thinking, fast and slow.", "Book titles are sentence case in references"],
            ["Journal of memory and language", "Journal of Memory and Language", "Periodical names keep title case"],
            ["How many words do we read per minute? a review", "How many words do we read per minute? A review", "Capital after end punctuation"],
            ["The effects of ritalin on attention", "The effects of Ritalin on attention", "Proper nouns survive sentence case"],
          ],
        },
        {
          type: "paragraph",
          text: "For the difference between the two cases in general – not just in APA – see [Title Case vs Sentence Case](/blog/sentence-vs-title-case). For headings inside the paper itself, see [APA heading levels](/blog/apa-heading-levels).",
        },
      ],
    },
  ],
}
