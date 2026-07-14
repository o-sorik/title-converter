import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const HOW_MANY_WORDS_IN_A_NOVEL_ARTICLE: WritingTipsArticle = {
  slug: "how-many-words-in-a-novel",
  tags: ["Writing Statistics", "Fiction", "Publishing"],
  ctaWord: "how many words in a novel",
  ctaText:
    "Finished the manuscript? Your book title and chapter headings still need correct capitalization – run them through the free Title Case Converter before you submit.",
  relatedSlugs: [
    "average-reading-speed",
    "how-long-should-a-blog-post-be",
    "average-typing-speed",
    "commonly-misspelled-words",
    "common-grammar-mistakes",
  ],
  faqItems: [
    {
      question: "How many words is a 300-page novel?",
      answer:
        "About 75,000 to 90,000 words. Traditional publishers fit roughly 250–300 words on a printed page, so 300 pages works out to 75,000–90,000 words. A 2023 survey of more than 900 authors measured fiction at about 280 words per page, which puts a 300-page novel at around 84,000 words.",
    },
    {
      question: "Is 50,000 words enough for a novel?",
      answer:
        "Officially, yes – both the Nebula and Hugo awards define a novel as anything of 40,000 words or more. Commercially, it is on the short side: agents and publishers generally expect 80,000–100,000 words for an adult debut. The main exception is series romance, where Harlequin's lines run 50,000–75,000 words by design.",
    },
    {
      question: "How many words is the average chapter?",
      answer:
        "A 2020 academic study of 4,383 chapters from 79 classic novels found a mean of 5,165 words and a median of 4,122 words per chapter. As a cross-check, an 80,000-word novel split into 20–25 chapters averages 3,200–4,000 words per chapter.",
    },
    {
      question: "How many words are in the Harry Potter books?",
      answer:
        "According to Renaissance's Accelerated Reader database, the books range from 77,508 words (Harry Potter and the Sorcerer's Stone) to 257,154 words (Harry Potter and the Order of the Phoenix). The full seven-book series adds up to roughly 1,084,808 words.",
    },
    {
      question: "What is the longest novel ever written?",
      answer:
        "Guinness World Records lists Marcel Proust's In Search of Lost Time (A la recherche du temps perdu) as the longest novel, at an estimated 9,609,000 characters including spaces. Note that Guinness measures the record in characters, not words – the French text runs to roughly 1.3 million words.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "A novel is officially anything over **40,000 words** – the threshold both the [Nebula Awards](https://nebulas.sfwa.org/about-the-nebulas/nebula-rules/) (SFWA, current rules) and the [Hugo Awards](https://www.thehugoawards.org/hugo-categories/) use – but commercial publishers expect **80,000–100,000 words** for a debut, the standard literary agent Juliet Mushens cites in [Penguin's editorial on book length](https://www.penguin.co.uk/discover/articles/book-length-debate-fiction-long-novels) (2020). Every figure below comes from a primary source: award rules, publisher submission guidelines, and full-text word-count databases.",
        },
        {
          type: "keyStats",
          items: [
            "**40,000 words** – the official minimum length of a novel under both the [Nebula Rules](https://nebulas.sfwa.org/about-the-nebulas/nebula-rules/) and the [Hugo Awards](https://www.thehugoawards.org/hugo-categories/) (current rules, retrieved 2026)",
            "**80,000–100,000 words** – the standard for adult novels, per literary agent Juliet Mushens ([Penguin UK, 2020](https://www.penguin.co.uk/discover/articles/book-length-debate-fiction-long-novels))",
            "**80,000–89,999 words** – Writer's Digest's “100% safe range” for literary, mainstream, romance, mystery, thriller, and horror ([Writer's Digest, 2016](https://www.writersdigest.com/whats-new/word-count-for-novels-and-childrens-books-the-definitive-post))",
            "**50,000–75,000 words** – Harlequin's series romance range, dictated by print production rules ([Harlequin, 2021](https://www.writeforharlequin.com/how-long-should-my-manuscript-be-word-count-explained/))",
            "**100,000–130,000 words** – Baen Books' preferred length for science fiction and fantasy ([Baen, retrieved 2026](https://www.baen.com/submit))",
            "**47,094 words** – *The Great Gatsby*, barely a novel by award definitions ([Renaissance AR BookFinder, retrieved 2026](https://www.arbookfind.com/))",
            "**257,154 words** – *Harry Potter and the Order of the Phoenix*, about 5.5 times the length of *Gatsby* ([Renaissance AR BookFinder, retrieved 2026](https://www.arbookfind.com/))",
            "**5,165 words** – mean chapter length across 4,383 classic-novel chapters; the median is 4,122 ([Ladhak et al., ACL 2020](https://arxiv.org/abs/2005.01840))",
            "**250–300 words** – what traditional publishers fit on one printed page ([Kindlepreneur, 2023](https://kindlepreneur.com/words-per-page/))",
          ],
        },
      ],
    },
    {
      id: "official-definition",
      heading: "What Officially Counts as a Novel?",
      tocLabel: "Official definition",
      blocks: [
        {
          type: "paragraph",
          text: "The clearest formal definitions come from the two biggest awards in speculative fiction. The [Nebula Rules](https://nebulas.sfwa.org/about-the-nebulas/nebula-rules/) from the Science Fiction and Fantasy Writers Association (SFWA) and the [Hugo Awards](https://www.thehugoawards.org/hugo-categories/) (World Science Fiction Society) use identical word-count thresholds to separate fiction categories:",
        },
        {
          type: "table",
          headers: ["Category", "Word count", "Source"],
          rows: [
            [
              "Short story",
              "under 7,500 words",
              "[Nebula Rules](https://nebulas.sfwa.org/about-the-nebulas/nebula-rules/) and [Hugo Awards](https://www.thehugoawards.org/hugo-categories/)",
            ],
            [
              "Novelette",
              "7,500–17,499 words",
              "[Nebula Rules](https://nebulas.sfwa.org/about-the-nebulas/nebula-rules/) and [Hugo Awards](https://www.thehugoawards.org/hugo-categories/)",
            ],
            [
              "Novella",
              "17,500–39,999 words",
              "[Nebula Rules](https://nebulas.sfwa.org/about-the-nebulas/nebula-rules/) and [Hugo Awards](https://www.thehugoawards.org/hugo-categories/)",
            ],
            [
              "Novel",
              "40,000 words or more",
              "[Nebula Rules](https://nebulas.sfwa.org/about-the-nebulas/nebula-rules/) and [Hugo Awards](https://www.thehugoawards.org/hugo-categories/)",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Real-world publishing draws the novella line slightly differently. When Tor.com Publishing (now Tordotcom) opened to novella submissions, it asked for [manuscripts of 20,000–40,000 words](https://reactormag.com/tor-com-publishing-opening-to-novella-submissions-on-july-30/) (2018) – a narrower band than the award definition, but with the same 40,000-word ceiling before a book becomes a novel.",
        },
      ],
    },
    {
      id: "by-genre",
      heading: "What Is the Average Novel Word Count by Genre?",
      tocLabel: "By genre",
      blocks: [
        {
          type: "paragraph",
          text: "There is no measured “average” across all published novels – no dataset exists (more on that below). What does exist: publishers and agents state exactly what they want. These ranges come straight from their own guidelines:",
        },
        {
          type: "table",
          headers: ["Genre", "Word count", "Source (year)"],
          rows: [
            [
              "Adult commercial and literary",
              "80,000–89,999 ideal; 71,000–109,000 acceptable",
              "[Writer's Digest, 2016](https://www.writersdigest.com/whats-new/word-count-for-novels-and-childrens-books-the-definitive-post)",
            ],
            [
              "Adult novels (agent standard)",
              "80,000–100,000",
              "[Penguin UK / Juliet Mushens, 2020](https://www.penguin.co.uk/discover/articles/book-length-debate-fiction-long-novels); [Fuse Literary, retrieved 2026](https://www.fuseliterary.com/word-counts/)",
            ],
            [
              "Science fiction and fantasy",
              "100,000–115,000 ideal; 90,000–124,000 acceptable",
              "[Writer's Digest, 2016](https://www.writersdigest.com/whats-new/word-count-for-novels-and-childrens-books-the-definitive-post)",
            ],
            [
              "Science fiction and fantasy (Baen)",
              "100,000–130,000",
              "[Baen Books, retrieved 2026](https://www.baen.com/submit)",
            ],
            [
              "Series romance",
              "50,000–75,000, depending on the line",
              "[Harlequin, 2021](https://www.writeforharlequin.com/how-long-should-my-manuscript-be-word-count-explained/)",
            ],
            [
              "Romantic suspense (Harlequin Intrigue)",
              "exactly 55,000",
              "[Harlequin Submittable, retrieved 2026](https://harlequin.submittable.com/submit/28679/harlequin-intrigue-series-55-000-words)",
            ],
            [
              "Young adult",
              "55,000–79,999",
              "[Writer's Digest, 2016](https://www.writersdigest.com/whats-new/word-count-for-novels-and-childrens-books-the-definitive-post)",
            ],
            [
              "Middle grade",
              "20,000–55,000",
              "[Writer's Digest, 2016](https://www.writersdigest.com/whats-new/word-count-for-novels-and-childrens-books-the-definitive-post)",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Romance is the most tightly specified genre because the limits are physical. In [Harlequin's own explainer](https://www.writeforharlequin.com/how-long-should-my-manuscript-be-word-count-explained/) (2021), executive editor Kathleen Scheibling puts it bluntly: “word count = page count.” Series romances are printed in fixed formats, so each line's length is set by production, with only 2,000–3,000 words of tolerance. The [Harlequin Intrigue line](https://harlequin.submittable.com/submit/28679/harlequin-intrigue-series-55-000-words) asks for exactly 55,000 words, right in the call title.",
        },
        {
          type: "paragraph",
          text: "Science fiction and fantasy run long. [Baen Books' submission guidelines](https://www.baen.com/submit) state: “Generally we are uncomfortable with manuscripts under 100,000 words.” Going over the top of a range is riskier than staying inside it – [Fuse Literary reports](https://www.fuseliterary.com/word-counts/) that 30–40% of the queries it receives arrive at 120,000+ words, well past its stated 80,000–100,000 preference.",
        },
      ],
    },
    {
      id: "famous-novels",
      heading: "How Many Words Are in Famous Novels?",
      tocLabel: "Famous novels",
      blocks: [
        {
          type: "paragraph",
          text: "The figures below come from [Renaissance's Accelerated Reader BookFinder](https://www.arbookfind.com/) (retrieved 2026), the only large public database with a stated methodology: Renaissance counts the words in the full text of each book to compute its ATOS readability score. Titles like these also make handy capitalization practice – every one follows standard title case rules (here is [which words stay lowercase in a title](/blog/what-words-are-not-capitalized-in-a-title)).",
        },
        {
          type: "table",
          headers: ["Novel", "Word count"],
          rows: [
            ["*The Old Man and the Sea*", "26,560"],
            ["*Charlotte's Web*", "31,938"],
            ["*The Great Gatsby*", "47,094"],
            ["*The Catcher in the Rye*", "73,404"],
            ["*The Hobbit*", "95,022"],
            ["*To Kill a Mockingbird*", "99,121"],
            ["*The Hunger Games*", "99,750"],
            ["*Twilight*", "118,975"],
            ["*Pride and Prejudice*", "121,342"],
            ["*Moby-Dick*", "206,052"],
            ["*The Lord of the Rings* (all three volumes)", "455,125"],
          ],
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "47,094",
              label: "The Great Gatsby – only 7,000 words past the official novel threshold",
              sourceName: "Renaissance AR BookFinder, retrieved 2026",
              sourceHref: "https://www.arbookfind.com/",
            },
            {
              value: "257,154",
              label: "Harry Potter and the Order of the Phoenix – about 5.5 Gatsbys in one book",
              sourceName: "Renaissance AR BookFinder, retrieved 2026",
              sourceHref: "https://www.arbookfind.com/",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Two classics on the list are not even novels by award standards: *The Old Man and the Sea* (26,560 words) and *Charlotte's Web* (31,938) both fall in novella territory. And the Harry Potter series shows how far a single author can stretch within one story – the books more than triple in length between the first and the fifth:",
        },
        {
          type: "barList",
          items: [
            { label: "Sorcerer's Stone (book 1)", percent: 30, display: "77,508" },
            { label: "Chamber of Secrets (book 2)", percent: 33, display: "84,799" },
            { label: "Prisoner of Azkaban (book 3)", percent: 42, display: "106,821" },
            { label: "Goblet of Fire (book 4)", percent: 74, display: "190,858" },
            { label: "Order of the Phoenix (book 5)", percent: 100, display: "257,154" },
            { label: "Half-Blood Prince (book 6)", percent: 66, display: "169,441" },
            { label: "Deathly Hallows (book 7)", percent: 77, display: "198,227" },
          ],
        },
        {
          type: "paragraph",
          text: "The full seven-book series totals roughly 1,084,808 words ([Renaissance AR BookFinder, retrieved 2026](https://www.arbookfind.com/)) – more than double *The Lord of the Rings*. The all-time record holder dwarfs both: [Guinness World Records](https://www.guinnessworldrecords.com/world-records/longest-novel) lists Proust's *In Search of Lost Time* as the longest novel at an estimated 9,609,000 characters including spaces (measured in characters, not words – roughly 1.3 million words in French). Curious how long these books take to read? See our [average reading speed statistics](/blog/average-reading-speed).",
        },
      ],
    },
    {
      id: "words-per-page",
      heading: "How Many Words per Page in a Novel?",
      tocLabel: "Words per page",
      blocks: [
        {
          type: "paragraph",
          text: "For printed books, the industry rule of thumb is that [most traditional publishers fit 250–300 words on a page](https://kindlepreneur.com/words-per-page/) (Kindlepreneur, 2023). The same analysis surveyed more than 900 authors, comparing manuscript word counts against listed page counts, and measured fiction at about 280 words per page.",
        },
        {
          type: "paragraph",
          text: "That makes the math for a “300-page novel” straightforward: 300 pages x 250–300 words per page = **75,000–90,000 words**. Using the survey's measured fiction figure, 300 x 280 = 84,000 words – which lands almost exactly in the middle of Writer's Digest's [80,000–89,999 “safe range”](https://www.writersdigest.com/whats-new/word-count-for-novels-and-childrens-books-the-definitive-post) (2016). The page math and the publisher guidelines converge on the same answer.",
        },
        {
          type: "paragraph",
          text: "One caveat for manuscripts: the old rule that a manuscript page equals 250 words dates to typewriter formatting (10 characters per inch, about 25 double-spaced lines). William Shunn, whose manuscript-format guide is the de facto industry reference, [declared the 250-words-per-page estimate obsolete](https://www.shunn.net/format/2021/04/the_old_rule_of_thumb_for_estimating_word_count_is_obsolete.html) in 2021 – editors now simply use your word processor's count.",
        },
        {
          type: "paragraph",
          text: "Page counts are also drifting down. [WordsRated's analysis of 3,444 NYT-bestselling hardcovers](https://wordsrated.com/bestselling-books-have-never-been-shorter/) (2022) found the average bestseller shrank from 437.5 pages in 2011 to 386 pages in 2021 – a drop of 11.8% – while books over 400 pages fell from 54% of the list to 38%.",
        },
      ],
    },
    {
      id: "chapter-length",
      heading: "How Many Words Are in a Novel Chapter?",
      tocLabel: "Chapter length",
      blocks: [
        {
          type: "paragraph",
          text: "The only rigorous dataset on chapter length comes from an academic paper on chapter summarization ([Ladhak et al., ACL 2020](https://arxiv.org/abs/2005.01840)). Across **4,383 unique chapters** from 79 full-text novels on Project Gutenberg, chapters averaged **5,165 words**, with a median of **4,122** and a large standard deviation of 3,737 – chapter length varies enormously even within one book.",
        },
        {
          type: "paragraph",
          text: "Two caveats. First, the dataset skews to public-domain classics, and contemporary commercial fiction tends to run shorter. Second, the “chapters should be 3,000–5,000 words” advice repeated on writing blogs has no primary dataset behind it – the ACL figure is the only measured number. As a sanity check, the arithmetic points the same way: an 80,000-word novel split into 20–25 chapters averages 3,200–4,000 words per chapter.",
        },
        {
          type: "paragraph",
          text: "However long your chapters run, their headings deserve consistent styling – whether you set them in title case or sentence case, [the difference is explained here](/blog/sentence-vs-title-case).",
        },
      ],
    },
    {
      id: "is-50000-a-novel",
      heading: "Is 50,000 Words a Novel?",
      tocLabel: "Is 50,000 words a novel?",
      blocks: [
        {
          type: "paragraph",
          text: "By the official definitions, yes – 50,000 words clears the [40,000-word Nebula and Hugo threshold](https://nebulas.sfwa.org/about-the-nebulas/nebula-rules/) by a comfortable 10,000 words. By commercial standards, it is a short novel: about 30,000 words below the [80,000–100,000-word expectation for adult debuts](https://www.penguin.co.uk/discover/articles/book-length-debate-fiction-long-novels) (Penguin UK, 2020).",
        },
        {
          type: "paragraph",
          text: "The number owes its fame to National Novel Writing Month, which for a quarter century [defined its challenge as writing a 50,000-word novel](https://web.archive.org/web/2018/https://nanowrimo.org/about) between November 1 and November 30 (archived About page, 2018 snapshot). The nonprofit behind NaNoWriMo [shut down on March 31, 2025](https://www.publishersweekly.com/pw/by-topic/industry-news/publisher-news/article/97466-nanowrimo-nonprofit-shutters.html) (Publishers Weekly), but the 50k benchmark it popularized lives on.",
        },
        {
          type: "paragraph",
          text: "A 50,000-word draft is a legitimate novel – and for some markets a finished one. [Harlequin's shortest romance lines start at exactly 50,000 words](https://www.writeforharlequin.com/how-long-should-my-manuscript-be-word-count-explained/) (2021). For most other adult fiction, treat 50,000 words as a strong first draft that will grow in revision.",
        },
      ],
    },
    {
      id: "ninety-thousand-claim",
      heading: "Where Does the “90,000-Word Average Novel” Claim Come From?",
      tocLabel: "The 90,000-word myth",
      blocks: [
        {
          type: "paragraph",
          text: "Nowhere verifiable. The claim that “the average published novel is 90,000 words” circulates across writing blogs, but no organization or study has ever measured the average word count of published novels at scale. It is a convention mistaken for a statistic.",
        },
        {
          type: "paragraph",
          text: "A related zombie number is the “64,000-word median book.” It traces to [a 2012 HuffPost piece](https://www.huffpost.com/entry/book-length_n_1334636) whose method was manually browsing Amazon's Text Stats until *Brave New World* (64,531 words) sat roughly in the middle. Amazon removed Text Stats in 2013, so the figure is frozen, informal, and unreproducible – historical trivia, not evidence.",
        },
        {
          type: "paragraph",
          text: "What you can rely on instead are the published ranges: Writer's Digest's [80,000–89,999 safe range](https://www.writersdigest.com/whats-new/word-count-for-novels-and-childrens-books-the-definitive-post) (2016), the [80,000–100,000 agent standard](https://www.penguin.co.uk/discover/articles/book-length-debate-fiction-long-novels) (Penguin UK, 2020; [Fuse Literary, retrieved 2026](https://www.fuseliterary.com/word-counts/)), and the genre-specific publisher guidelines above. Those are guidelines publishers actually enforce – which is more useful than an average nobody measured.",
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
              name: "Nebula Rules, Section 8 (category definitions)",
              publisher: "Science Fiction and Fantasy Writers Association (SFWA)",
              year: "retrieved 2026",
              href: "https://nebulas.sfwa.org/about-the-nebulas/nebula-rules/",
            },
            {
              name: "Hugo Award Categories",
              publisher: "World Science Fiction Society / The Hugo Awards",
              year: "retrieved 2026",
              href: "https://www.thehugoawards.org/hugo-categories/",
            },
            {
              name: "How Long Should My Manuscript Be? Word Count, Explained",
              publisher: "Harlequin (Write for Harlequin)",
              year: "2021",
              href: "https://www.writeforharlequin.com/how-long-should-my-manuscript-be-word-count-explained/",
            },
            {
              name: "Harlequin Intrigue Series submission call (55,000 words)",
              publisher: "Harlequin / Submittable",
              year: "retrieved 2026",
              href: "https://harlequin.submittable.com/submit/28679/harlequin-intrigue-series-55-000-words",
            },
            {
              name: "Submission Guidelines",
              publisher: "Baen Books",
              year: "retrieved 2026",
              href: "https://www.baen.com/submit",
            },
            {
              name: "Tor.com Publishing Opening to Novella Submissions",
              publisher: "Reactor (formerly Tor.com)",
              year: "2018",
              href: "https://reactormag.com/tor-com-publishing-opening-to-novella-submissions-on-july-30/",
            },
            {
              name: "What's the Perfect Length for a Book? (Juliet Mushens quote)",
              publisher: "Penguin UK",
              year: "2020",
              href: "https://www.penguin.co.uk/discover/articles/book-length-debate-fiction-long-novels",
            },
            {
              name: "Word Counts",
              publisher: "Fuse Literary",
              year: "retrieved 2026",
              href: "https://www.fuseliterary.com/word-counts/",
            },
            {
              name: "Word Count for Novels and Children's Books: The Definitive Post",
              publisher: "Writer's Digest (Chuck Sambuchino)",
              year: "2016",
              href: "https://www.writersdigest.com/whats-new/word-count-for-novels-and-childrens-books-the-definitive-post",
            },
            {
              name: "The Old Rule of Thumb for Estimating Word Count Is Obsolete",
              publisher: "William Shunn, Proper Manuscript Format",
              year: "2021",
              href: "https://www.shunn.net/format/2021/04/the_old_rule_of_thumb_for_estimating_word_count_is_obsolete.html",
            },
            {
              name: "How Many Words per Page? (survey of 900+ authors)",
              publisher: "Kindlepreneur",
              year: "2023",
              href: "https://kindlepreneur.com/words-per-page/",
            },
            {
              name: "Accelerated Reader BookFinder (full-text word counts)",
              publisher: "Renaissance Learning",
              year: "retrieved 2026",
              href: "https://www.arbookfind.com/",
            },
            {
              name: "Exploring Content Selection in Summarization of Novel Chapters",
              publisher: "Ladhak, Li, Al-Onaizan & McKeown, ACL 2020",
              year: "2020",
              href: "https://arxiv.org/abs/2005.01840",
            },
            {
              name: "Bestselling Books Have Never Been Shorter",
              publisher: "WordsRated",
              year: "2022",
              href: "https://wordsrated.com/bestselling-books-have-never-been-shorter/",
            },
            {
              name: "Longest Novel",
              publisher: "Guinness World Records",
              year: "retrieved 2026",
              href: "https://www.guinnessworldrecords.com/world-records/longest-novel",
            },
            {
              name: "NaNoWriMo About page (archived)",
              publisher: "NaNoWriMo via Internet Archive",
              year: "2018 snapshot",
              href: "https://web.archive.org/web/2018/https://nanowrimo.org/about",
            },
            {
              name: "NaNoWriMo Nonprofit Shutters",
              publisher: "Publishers Weekly",
              year: "2025",
              href: "https://www.publishersweekly.com/pw/by-topic/industry-news/publisher-news/article/97466-nanowrimo-nonprofit-shutters.html",
            },
            {
              name: "The Length of a Bestseller (Amazon Text Stats median)",
              publisher: "HuffPost",
              year: "2012",
              href: "https://www.huffpost.com/entry/book-length_n_1334636",
            },
          ],
        },
      ],
    },
  ],
}
