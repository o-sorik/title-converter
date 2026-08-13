import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const AVERAGE_BOOK_LENGTH_ARTICLE: WritingTipsArticle = {
  slug: "average-book-length",
  tags: ["Writing Statistics", "Publishing", "Books"],
  ctaWord: "average book length",
  ctaText:
    "Whatever length your book runs, its title and chapter headings need consistent capitalization. Our free Title Case Converter applies AP, APA, Chicago, or MLA style in one click.",
  relatedSlugs: [
    "how-many-words-in-a-novel",
    "average-reading-speed",
    "books-per-year",
    "words-per-page",
    "how-long-should-a-blog-post-be",
  ],
  faqItems: [
    {
      question: "How many pages is the average book?",
      answer:
        "Measured bestseller data puts it just under 400 pages: New York Times bestsellers averaged 386 pages in 2021 (WordsRated's analysis of 3,444 titles), and Amazon's yearly top-50 bestsellers averaged 398 pages across 2020–2024 (FriesenPress). The often-quoted \"300 pages\" is a publishing convention, not a measurement – no dataset produces that number.",
    },
    {
      question: "How long does it take to read an average book?",
      answer:
        "About 7 hours of actual reading. The average bestseller runs roughly 107,000 words (Brysbaert's 50-book benchmark), which takes about 6.9 hours at the measured fiction reading pace of 260 words per minute, or 7.5 hours at the 238 WPM non-fiction pace. Real cover-to-cover times in the same study ranged from under 1 hour to over 17.",
    },
    {
      question: "How long is the average audiobook?",
      answer:
        "About 11.5 hours for an average bestseller. The only solid primary figure is ACX's (Audible's) production standard: roughly 9,300 manuscript words equal one finished hour of audio. An average 107,000-word bestseller therefore runs about 11.5 hours; an 80,000-word novel about 8.6 hours; a 50,000-word business book about 5.4 hours. Circulating \"average audiobook is 10 hours\" claims cite no methodology.",
    },
    {
      question: "How long should a nonfiction or business book be?",
      answer:
        "Business-book editor Josh Bernoff puts today's typical range at 45,000–55,000 words, about 180–220 pages, down from roughly 65,000 words in the 1990s–2000s, with 35,000 words as the credibility floor. The Steve Laube literary agency's guidance for adult nonfiction is 40,000–70,000 words. Bestselling nonfiction averages 365 printed pages versus 425 for fiction.",
    },
    {
      question: "Why are picture books 32 pages?",
      answer:
        "Because of how books are physically printed. Presses fold large sheets into 16-page signatures, and two signatures make the cost-efficient 32-page standard. Publisher Annick Press states it directly in its submission guidelines: \"Our picture books tend to be 32 pages and no longer than 1000 words.\" Editorial guidance puts the text itself at 500–600 words.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "The average bestselling book runs **just under 400 pages** – New York Times bestsellers averaged 386 pages in 2021 ([WordsRated's analysis of 3,444 titles](https://wordsrated.com/bestselling-books-have-never-been-shorter/)), and Amazon's yearly top-50 averaged 398 pages across 2020–2024 ([FriesenPress](https://www.friesenpress.com/blog/2025/7/31/how-many-pages-should-a-book-be)). At the measured average of ~278 words per printed page, that is roughly 105,000–110,000 words: about 7 hours of reading, or 11.5 hours as an audiobook. The \"300-page average book\" you see everywhere is a convention – when researchers actually count, books are longer.",
        },
        {
          type: "keyStats",
          items: [
            "**386 pages** – average NYT bestseller in 2021, down from 437.5 in 2011 (2022, [WordsRated](https://wordsrated.com/bestselling-books-have-never-been-shorter/), n=3,444)",
            "**398 pages** – average Amazon top-50 bestseller 2020–2024; the middle 50% of books span 320–450 pages (2025, [FriesenPress](https://www.friesenpress.com/blog/2025/7/31/how-many-pages-should-a-book-be))",
            "**107,000 words / 385 pages** – the measured average of 50 real novels read cover-to-cover (2019, [Brysbaert](https://doi.org/10.1016/j.jml.2019.104047))",
            "**425 vs 365 pages** – fiction vs nonfiction bestseller averages (2025, [FriesenPress](https://www.friesenpress.com/blog/2025/7/31/how-many-pages-should-a-book-be))",
            "**45,000–55,000 words** (~180–220 pages) – today's typical business book, down from ~65,000 in the '90s (2024, [Bernoff](https://bernoff.com/blog/how-long-should-your-book-be))",
            "**32 pages, ≤1,000 words** – the picture-book industry standard, straight from a publisher's submission guidelines ([Annick Press](https://www.annickpress.com/Submission-Guidelines), current)",
            "**9,300 words = 1 hour** – ACX's (Audible's) conversion from manuscript to finished audio, making the average bestseller ≈11.5 audio hours (2013, [ACX](https://www.acx.com/mp/blog/money-talks-paying-and-getting-paid-for-your-audiobook))",
            "**112,000 words** – average length of the top-100 bestselling self-published ebooks on Smashwords; longer books sold better five years running (2016, [Smashwords Survey](https://blog.smashwords.com/2016/04/2016survey-how-to-publish-and-sell-ebooks.html))",
            "**≈6.9 hours** – time to read the average bestseller at the measured 260 WPM fiction pace (derived from [Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047))",
          ],
        },
      ],
    },
    {
      id: "average-pages",
      heading: "How Many Pages Is the Average Book?",
      tocLabel: "Average pages",
      blocks: [
        {
          type: "paragraph",
          text: "Two independent datasets converge just below 400 pages – and a third, built for a different purpose entirely, lands on the same number:",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "386 pages",
              label: "NYT bestsellers, 2021 – 3,444 hardcovers analyzed",
              sourceName: "WordsRated, 2022",
              sourceHref: "https://wordsrated.com/bestselling-books-have-never-been-shorter/",
            },
            {
              value: "398 pages",
              label: "Amazon yearly top-50, 2020–2024 – 250 books",
              sourceName: "FriesenPress, 2025",
              sourceHref: "https://www.friesenpress.com/blog/2025/7/31/how-many-pages-should-a-book-be",
            },
            {
              value: "385 pages",
              label: "50 real novels in a peer-reviewed reading study",
              sourceName: "Brysbaert, 2019",
              sourceHref: "https://doi.org/10.1016/j.jml.2019.104047",
            },
          ],
        },
        {
          type: "paragraph",
          text: "One honest caveat before the number settles in: all of these datasets measure **bestsellers**, not all published books. No dataset measures the average length of every book – Google's famous 2010 census counted [129,864,880 distinct books](http://booksearch.blogspot.com/2010/08/books-of-world-stand-up-and-be-counted.html) but recorded no page or word data at all. Any \"average book length per Google\" claim is a fabrication.",
        },
        {
          type: "paragraph",
          text: "As for the ubiquitous \"average book is 300 pages\": no dataset produces it. It is arithmetic convention – the (itself unmeasured) 90,000-word novel divided by ~280 [words per page](/blog/words-per-page), reinforced by print economics that cluster trade books near 300 pages. Treat 300 as the round number publishing aims at, not an average anyone measured.",
        },
      ],
    },
    {
      id: "by-type",
      heading: "How Long Are Books by Type and Genre?",
      tocLabel: "By type and genre",
      blocks: [
        {
          type: "paragraph",
          text: "Fiction bestsellers average 425 pages against 365 for nonfiction ([FriesenPress](https://www.friesenpress.com/blog/2025/7/31/how-many-pages-should-a-book-be)) – and the gap in words is even bigger than it looks, because a nonfiction page carries fewer words (≈233 vs ≈280, per [Kindlepreneur's author survey](https://kindlepreneur.com/words-per-page/)). Genre averages from the same bestseller dataset:",
        },
        {
          type: "barList",
          items: [
            { label: "Self-help", percent: 54, display: "296 pages" },
            { label: "Contemporary romance", percent: 59, display: "~320 pages" },
            { label: "Memoir", percent: 62, display: "339 pages" },
            { label: "Nonfiction average", percent: 67, display: "365 pages" },
            { label: "Fiction average", percent: 78, display: "425 pages" },
            { label: "Romantasy", percent: 100, display: "544 pages" },
          ],
        },
        {
          type: "paragraph",
          text: "For business books specifically, the best guidance chain comes from specialist editor [Josh Bernoff](https://bernoff.com/blog/how-long-should-your-book-be): 45,000–55,000 words (~180–220 pages) is now typical, 65,000 was the '90s–'00s norm, 35,000 words is the credibility floor, and 80,000+ reads as \"hefty.\" [The Steve Laube Agency](https://stevelaube.com/commercial-writing-word-count-question/) brackets adult nonfiction at 40,000–70,000 words. Bernoff's page formula is a handy widget: pages ≈ words ÷ 275 + 20.",
        },
        {
          type: "paragraph",
          text: "Fiction *word counts* by genre – from Harlequin's 55,000-word category romances to Baen's 100,000-word-minimum space opera – are a different question with different sources; we cover them in [how many words are in a novel](/blog/how-many-words-in-a-novel).",
        },
      ],
    },
    {
      id: "picture-books",
      heading: "Why Are Picture Books Exactly 32 Pages?",
      tocLabel: "The 32-page standard",
      blocks: [
        {
          type: "paragraph",
          text: "The strongest form of this standard is a publisher saying it out loud. [Annick Press's submission guidelines](https://www.annickpress.com/Submission-Guidelines) state: \"Our picture books tend to be 32 pages and no longer than 1000 words.\" Editorial guidance from [Writer's Digest](https://www.writersdigest.com/whats-new/word-count-for-novels-and-childrens-books-the-definitive-post) puts the text itself at 500–600 words.",
        },
        {
          type: "paragraph",
          text: "The reason is physical, not editorial: presses fold large sheets into **16-page signatures**, and two signatures make the cost-efficient 32-page book, as children's-book educator [Darcy Pattison explains](https://www.darcypattison.com/writing/picture-books/picture-book-standards-32-pages/) – 24-, 40-, and 48-page formats exist but are rarer. Front and back matter eat several of those 32 pages, so the story itself typically occupies about 26–28.",
        },
      ],
    },
    {
      id: "audiobooks",
      heading: "How Long Is the Average Audiobook?",
      tocLabel: "Audiobook length",
      blocks: [
        {
          type: "paragraph",
          text: "The only rock-solid primary number in audiobook length is a conversion rate. [ACX](https://www.acx.com/mp/blog/money-talks-paying-and-getting-paid-for-your-audiobook) – Audible's production marketplace – states: \"We estimate that about 9,300 words equals one hour of finished audio.\" That is a narration pace of roughly 155 words per minute. From there, the math writes itself:",
        },
        {
          type: "table",
          headers: ["Book", "Word count", "Finished audio (÷ 9,300 words/hr)"],
          rows: [
            ["Average bestseller", "≈107,000 words", "≈11.5 hours"],
            ["Standard adult novel", "80,000 words", "≈8.6 hours"],
            ["Typical business book", "50,000 words", "≈5.4 hours"],
          ],
        },
        {
          type: "paragraph",
          text: "Note what we're *not* citing: the widely repeated \"the average audiobook is 10 hours\" has no stated methodology anywhere we could trace, and the \"Audio Publishers Association says 8–12 hours\" claim appears in no APA publication – their surveys track revenue and units, not length. The derived math above is more defensible than either.",
        },
        {
          type: "paragraph",
          text: "The comparison that surprises people: silently reading the same bestseller takes about 6.9 hours versus 11.5 hours of listening at 1× – reading is roughly 40% faster than narration. Listening at 1.5× (~7.7 hours) approximately matches reading speed, consistent with the comprehension research covered in [our average reading speed breakdown](/blog/average-reading-speed).",
        },
      ],
    },
    {
      id: "self-published",
      heading: "Are Self-Published Books Shorter?",
      tocLabel: "Self-published lengths",
      blocks: [
        {
          type: "paragraph",
          text: "No head-to-head dataset compares self-published and traditionally published lengths – any percentage claim you see is invented. What the data we *do* have shows is the opposite of the stereotype: in the [2016 Smashwords Survey](https://blog.smashwords.com/2016/04/2016survey-how-to-publish-and-sell-ebooks.html) of retail sales across 100,000+ authors, the top-100 bestselling ebooks averaged **112,000 words**, the top 1,000 averaged over 103,000, and \"the lower the word count, the lower the sales\" – for the fifth consecutive year.",
        },
        {
          type: "paragraph",
          text: "Two caveats, both from the source itself: four of the top 100 were box sets, which inflates the average, and the data predates much of the Kindle Unlimited era. But the direction is clear – successful self-published books are not shorter than traditional norms, even though self-publishing *guidance* often floats a 50,000-word floor well below the traditional 80,000.",
        },
      ],
    },
    {
      id: "trend",
      heading: "Are Books Getting Shorter or Longer?",
      tocLabel: "The length trend",
      blocks: [
        {
          type: "paragraph",
          text: "Both, in sequence. Across 2011–2021, NYT bestsellers shrank from 437.5 to 386 pages – an 11.8% drop, with 400+ page books falling from 54% to 38% of the list ([WordsRated](https://wordsrated.com/bestselling-books-have-never-been-shorter/)). Then Amazon's top-50 average *rose* from 378 to 442 pages between 2020 and 2024 ([FriesenPress](https://www.friesenpress.com/blog/2025/7/31/how-many-pages-should-a-book-be)).",
        },
        {
          type: "paragraph",
          text: "That is not a contradiction – different lists, different windows – and the recent rebound has a specific engine: the romantasy boom, whose bestsellers average 544 pages. A decade of shrinking, then a genre-driven rebound. One seasonal quirk from the WordsRated data for color: October–March bestsellers run about 35 pages longer than April–September ones (427 vs 392).",
        },
        {
          type: "paragraph",
          text: "The older claim that bestsellers grew from 320 to 400 pages between 1999 and 2014 traces to a study that now survives only in [press coverage](https://www.smithsonianmag.com/smart-news/bestselling-books-are-getting-longer-180957577/) – its original page is gone, so treat it as historical reporting, not citable data.",
        },
      ],
    },
    {
      id: "reading-time",
      heading: "How Long Does It Take to Read the Average Book?",
      tocLabel: "Time to read one",
      blocks: [
        {
          type: "paragraph",
          text: "About 7 hours – and here is the math so you can run it for any book. Time = words ÷ reading speed. The average bestseller (~107,000 words) at the measured fiction pace of 260 WPM takes 412 minutes, or **≈6.9 hours**; at the 238 WPM non-fiction pace, **≈7.5 hours**. A \"300-page\" book (~83,400 words at 278 words per page) runs 5.3–5.8 hours.",
        },
        {
          type: "paragraph",
          text: "These aren't hypothetical rates: both WPM figures come from [Brysbaert's meta-analysis of 190 studies](https://doi.org/10.1016/j.jml.2019.104047), and his own 50-book cover-to-cover experiment – the same one that produced the 107,000-word average – recorded actual reading times from under 1 hour to over 17. Where you fall depends on [your own reading speed](/blog/average-reading-speed), and how many books that adds up to in a year is [its own statistic](/blog/books-per-year).",
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
              name: "Bestselling Books Have Never Been Shorter (3,444 NYT bestsellers, 2011–2021)",
              publisher: "WordsRated",
              year: "2022",
              href: "https://wordsrated.com/bestselling-books-have-never-been-shorter/",
            },
            {
              name: "How Many Pages Should Your Book Be? Insights from 5 Years of Bestsellers (250 Amazon top-50 titles, 2020–2024)",
              publisher: "FriesenPress",
              year: "2025",
              href: "https://www.friesenpress.com/blog/2025/7/31/how-many-pages-should-a-book-be",
            },
            {
              name: "How Many Words Do We Read per Minute? A Review and Meta-Analysis of Reading Rate (Brysbaert; 50-book corpus and WPM figures)",
              publisher: "Journal of Memory and Language 109:104047",
              year: "2019",
              href: "https://doi.org/10.1016/j.jml.2019.104047",
            },
            {
              name: "Smashwords Survey 2016 – How to Publish and Sell Ebooks (Coker)",
              publisher: "Smashwords",
              year: "2016",
              href: "https://blog.smashwords.com/2016/04/2016survey-how-to-publish-and-sell-ebooks.html",
            },
            {
              name: "Books of the World, Stand Up and Be Counted! (Taycher; 129,864,880 books)",
              publisher: "Google Books Search blog",
              year: "2010",
              href: "http://booksearch.blogspot.com/2010/08/books-of-world-stand-up-and-be-counted.html",
            },
            {
              name: "Submission Guidelines (32 pages / ≤1,000 words)",
              publisher: "Annick Press",
              year: "2026",
              href: "https://www.annickpress.com/Submission-Guidelines",
            },
            {
              name: "Money Talks – Paying, and Getting Paid, For Your Audiobook (9,300 words per finished hour)",
              publisher: "ACX (Audible/Amazon)",
              year: "2013",
              href: "https://www.acx.com/mp/blog/money-talks-paying-and-getting-paid-for-your-audiobook",
            },
            {
              name: "How Long Should Your Book Be? (Bernoff)",
              publisher: "bernoff.com",
              year: "2024",
              href: "https://bernoff.com/blog/how-long-should-your-book-be",
            },
            {
              name: "Commercial Writing – The Word Count Question (Balow)",
              publisher: "The Steve Laube Agency",
              year: "2025",
              href: "https://stevelaube.com/commercial-writing-word-count-question/",
            },
            {
              name: "Word Count for Novels and Children's Books: The Definitive Post (Sambuchino)",
              publisher: "Writer's Digest",
              year: "2016",
              href: "https://www.writersdigest.com/whats-new/word-count-for-novels-and-childrens-books-the-definitive-post",
            },
            {
              name: "How Many Words per Page Are in a Book? (900+ author survey)",
              publisher: "Kindlepreneur",
              year: "2023",
              href: "https://kindlepreneur.com/words-per-page/",
            },
            {
              name: "Standard Picture Books Are 32 Pages (Pattison; printing signatures)",
              publisher: "darcypattison.com",
              year: "2026",
              href: "https://www.darcypattison.com/writing/picture-books/picture-book-standards-32-pages/",
            },
            {
              name: "Bestselling Books Are Getting Longer (report of the 1999–2014 Vervesearch study)",
              publisher: "Smithsonian Magazine",
              year: "2015",
              href: "https://www.smithsonianmag.com/smart-news/bestselling-books-are-getting-longer-180957577/",
            },
          ],
        },
      ],
    },
  ],
}
