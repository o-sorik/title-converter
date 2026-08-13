import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const BOOKS_PER_YEAR_ARTICLE: WritingTipsArticle = {
  slug: "books-per-year",
  tags: ["Writing Statistics", "Reading", "Books"],
  ctaWord: "how many books does the average person read",
  ctaText:
    "Writing about books instead of just reading them? Our free Title Case Converter formats your headlines and book titles to AP, APA, Chicago, or MLA style in one click.",
  relatedSlugs: [
    "average-reading-speed",
    "average-book-length",
    "how-many-words-in-a-novel",
    "how-many-words-average-person-knows",
    "how-long-should-a-blog-post-be",
  ],
  faqItems: [
    {
      question: "How many books does the average person read per year?",
      answer:
        "The mean is about 12 to 13 books per year for US adults (Gallup, 2021), but the typical person reads far fewer: Pew's median is 5 books and YouGov's is just 2. The gap exists because a small group of heavy readers – 14% of Americans read 20 or more books a year – pulls the average far above what most people actually read.",
    },
    {
      question: "Is reading 20 books a year a lot?",
      answer:
        "Yes – that puts you around the 88th percentile of American readers, per YouGov's distribution data. Even 5 books a year puts you ahead of roughly two-thirds of the country, and reading a single book puts you ahead of the 40–46% of online-poll respondents who read none. Twenty books is heavy-reader territory shared by about 14% of US adults.",
    },
    {
      question: "What percentage of Americans don't read books?",
      answer:
        "Between one-quarter and four-in-ten, depending on how you ask. Pew's phone-and-web surveys find 25% read no books in the past year (October 2025), YouGov's online panels find 40–46%, and the federal NEA survey – which excludes reading for work or school – found a majority (51.5%) read no book in 2022. Survey mode changes the answer, which is why no single number should be quoted alone.",
    },
    {
      question: "How many books does Bill Gates read a year?",
      answer:
        "About 50, by his own account in a 2016 New York Times interview – roughly four times the American mean and ten to twenty-five times the median. It is self-reported, not independently counted. The related claim that \"the average CEO reads 60 books a year\" has no traceable source at all and should not be repeated.",
    },
    {
      question: "How much time does it take to read 12 books a year?",
      answer:
        "About 13 minutes a day. A typical novel of around 90,000 words takes roughly 6.3 hours at the average adult silent-reading speed of 238 words per minute, so 12.6 books works out to about 79 hours a year. That almost exactly matches the 15–16 minutes per day Americans actually log in federal time-use diaries.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "Americans read a mean of **12.6 books per year** ([Gallup, 2021](https://news.gallup.com/poll/388541/americans-reading-fewer-books-past.aspx)) – but the *typical* American reads about 2 to 5, and roughly a quarter read none at all. [Pew's 2021 survey](https://www.pewresearch.org/short-reads/2022/01/06/three-in-ten-americans-now-read-e-books/) found a mean of ~14 and a median of 5; [YouGov's December 2025 poll](https://yougov.com/en-us/articles/53804-most-americans-didnt-read-many-books-in-2025) found a mean of 8 and a median of just 2. The average is 12. The typical person reads 2 to 5. Both are true – and the difference is the whole story.",
        },
        {
          type: "keyStats",
          items: [
            "**12.6 books** – mean books read by US adults in 2021, the lowest Gallup has measured since before 1990 (2022, [Gallup](https://news.gallup.com/poll/388541/americans-reading-fewer-books-past.aspx))",
            "**5 books** – the median US adult's annual reading; the mean was ~14 in the same survey (2021, [Pew Research Center](https://www.pewresearch.org/short-reads/2022/01/06/three-in-ten-americans-now-read-e-books/))",
            "**2 books** – the median in YouGov's latest year-end poll; mean 8 (2025, [YouGov](https://yougov.com/en-us/articles/53804-most-americans-didnt-read-many-books-in-2025))",
            "**14%** of US adults read 20+ books a year – the heavy-reader tail that drags every mean upward (2025, [Pew](https://www.pewresearch.org/short-reads/2026/04/09/americans-still-opt-for-print-books-over-digital-or-audio-versions-few-are-in-book-clubs/), n=8,046)",
            "**75%** of US adults read at least one book in the past year – roughly stable for a decade (2025, [Pew](https://www.pewresearch.org/short-reads/2026/04/09/americans-still-opt-for-print-books-over-digital-or-audio-versions-few-are-in-book-clubs/))",
            "**15.7 vs 9.5** – mean books per year for women vs men (2021, [Gallup](https://news.gallup.com/poll/388541/americans-reading-fewer-books-past.aspx))",
            "**48.5%** of US adults read a book outside work or school in 2022 – the stricter federal measure, and a record low for fiction (2022, [NEA Survey of Public Participation in the Arts](https://www.arts.gov/impact/research/responses-to-the-2022-SPPA/a-time-of-hope-and-worry))",
            "**28% → 16%** – share of Americans reading for pleasure on a given day, 2003 vs 2023, from 236,270 time diaries (2025, [Bone et al., iScience](https://pmc.ncbi.nlm.nih.gov/articles/PMC12496190/))",
            "**~13 minutes a day** – all it takes to read 12 books a year at the average reading speed (derived; matches federal time-diary data)",
          ],
        },
      ],
    },
    {
      id: "mean-vs-median",
      heading: "How Many Books Does the Average Person Actually Read?",
      tocLabel: "Mean vs median",
      blocks: [
        {
          type: "paragraph",
          text: "Three major surveys, three answers – and the spread is the honest finding:",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "12.6",
              label: "Mean books per year, US adults – phone survey",
              sourceName: "Gallup, 2021",
              sourceHref: "https://news.gallup.com/poll/388541/americans-reading-fewer-books-past.aspx",
            },
            {
              value: "5",
              label: "Median books per year – the middle American",
              sourceName: "Pew, 2021",
              sourceHref: "https://www.pewresearch.org/short-reads/2022/01/06/three-in-ten-americans-now-read-e-books/",
            },
            {
              value: "2",
              label: "Median in the latest online year-end poll",
              sourceName: "YouGov, 2025",
              sourceHref: "https://yougov.com/en-us/articles/53804-most-americans-didnt-read-many-books-in-2025",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The mean-median gap has a simple cause: a small tail of devoted readers. In [Pew's October 2025 survey](https://www.pewresearch.org/short-reads/2026/04/09/americans-still-opt-for-print-books-over-digital-or-audio-versions-few-are-in-book-clubs/) of 8,046 adults, 14% read 20+ books; in [YouGov's data](https://yougov.com/en-us/articles/53804-most-americans-didnt-read-many-books-in-2025), 4% read 50 or more. A handful of 50-book readers pulls the average far above the middle. If you read 5 books last year, you are not below average – you are the typical American, ahead of about two-thirds of the country.",
        },
        {
          type: "paragraph",
          text: "One methodological note that most roundups skip: self-reports flatter reading. Phone surveys (Gallup, Pew) produce higher numbers than online panels (YouGov), and both run far above what people actually log in federal time-use diaries. Also mind the precision: Gallup's 12.6 comes from 811 respondents with a margin of error of about ±1.9 books – \"about 12–13\" is the honest phrasing.",
        },
      ],
    },
    {
      id: "distribution",
      heading: "How Do You Compare to Other Readers?",
      tocLabel: "Where you rank",
      blocks: [
        {
          type: "paragraph",
          text: "The freshest large-sample distribution comes from [Pew's October 2025 survey](https://www.pewresearch.org/short-reads/2026/04/09/americans-still-opt-for-print-books-over-digital-or-audio-versions-few-are-in-book-clubs/) (n=8,046):",
        },
        {
          type: "barList",
          items: [
            { label: "0 books", percent: 66, display: "25%" },
            { label: "1–5 books", percent: 100, display: "38%" },
            { label: "6–10 books", percent: 34, display: "13%" },
            { label: "11–20 books", percent: 26, display: "10%" },
            { label: "20+ books", percent: 37, display: "14%" },
          ],
        },
        {
          type: "paragraph",
          text: "[YouGov's percentile math](https://yougov.com/en-us/articles/48239-54-percent-of-americans-read-a-book-this-year) turns that into a ranking: reading just 1 book put you ahead of the 46% who read none in their 2023 poll; 5 books puts you ahead of roughly two-thirds of Americans; 10 books lands around the 79th percentile; 20+ books puts you in the top 12%. \"Well-read\" starts lower than most people think.",
        },
      ],
    },
    {
      id: "trend",
      heading: "Are People Reading Fewer Books Than Before?",
      tocLabel: "The decline",
      blocks: [
        {
          type: "paragraph",
          text: "Yes – by about a third since the peak. [Gallup's series](https://news.gallup.com/poll/388541/americans-reading-fewer-books-past.aspx) runs 15.3 books (1990), 18.5 (1999), 15.6 (2016), 12.6 (2021) – the 2021 figure is the lowest they have ever measured. The federal [NEA survey](https://www.arts.gov/impact/research/responses-to-the-2022-SPPA/a-time-of-hope-and-worry) confirms the direction: 48.5% of adults read any book in 2022, down from 54.6% in 2012, with fiction reading (37.6%) the lowest on record.",
        },
        {
          type: "paragraph",
          text: "Gallup's nuance is the interesting part: the share of non-readers barely moved. The decline came from **heavy readers reading less** – the share reading 11+ books fell from 35% to 27% between 2016 and 2021. And the most objective data, [federal time diaries analyzed in iScience](https://pmc.ncbi.nlm.nih.gov/articles/PMC12496190/) (236,270 diaries, 2003–2023), shows daily reading-for-pleasure participation nearly halved, from 28% to 16% – while [Americans logged about 15–16 minutes of daily reading](https://www.arts.gov/stories/blog/2024/federal-data-reading-pleasure-all-signs-show-slump) against roughly 2¾ hours of TV.",
        },
        {
          type: "paragraph",
          text: "The counterintuitive kicker from the same study: people who still read now read *longer* per sitting than in 2003 – 1h37m versus 1h23m per day. Reading isn't dying; it's polarizing into devotees and abstainers, which is exactly the mean-versus-median story again. The pattern isn't uniquely American either: [The Reading Agency](https://readingagency.org.uk/the-british-reader-is-in-decline-as-the-reading-agency-reveals-half-of-uk-adults-dont-read-regularly/) found only 50% of UK adults read regularly in 2024, down from 58% in 2015, with 24% of Britons aged 16–24 saying they have never been readers.",
        },
      ],
    },
    {
      id: "demographics",
      heading: "Who Reads the Most Books?",
      tocLabel: "Who reads most",
      blocks: [
        {
          type: "paragraph",
          text: "Education divides readers more sharply than anything else, with gender and age close behind:",
        },
        {
          type: "table",
          headers: ["Group", "Reading gap", "Source"],
          rows: [
            [
              "Women vs men",
              "15.7 vs 9.5 mean books/year; for fiction, 46.9% vs 27.7% read any",
              "[Gallup, 2021](https://news.gallup.com/poll/388541/americans-reading-fewer-books-past.aspx); [NEA, 2022](https://www.arts.gov/stories/blog/2025/men-women-split-reading-real-and-persists-amid-historical-rate-declines)",
            ],
            [
              "College grads vs HS or less",
              "88% vs 60% read ≥1 book; 11% vs 39% read none; postgrad median 5 books vs median 0",
              "[Pew, 2025](https://www.pewresearch.org/short-reads/2026/04/09/americans-still-opt-for-print-books-over-digital-or-audio-versions-few-are-in-book-clubs/); [Pew, 2021](https://www.pewresearch.org/short-reads/2021/09/21/who-doesnt-read-books-in-america/); [YouGov, 2025](https://yougov.com/en-us/articles/53804-most-americans-didnt-read-many-books-in-2025)",
            ],
            [
              "Age 65+ vs 18–29",
              "Mean 12.1 vs 5.8 books/year – though older adults were also the steepest decliners since 2002",
              "[YouGov, 2025](https://yougov.com/en-us/articles/53804-most-americans-didnt-read-many-books-in-2025); [Gallup, 2021](https://news.gallup.com/poll/388541/americans-reading-fewer-books-past.aspx)",
            ],
            [
              "Household income $75k+ vs <$30k",
              "15% vs 31% read no books at all",
              "[Pew, 2021](https://www.pewresearch.org/short-reads/2021/09/21/who-doesnt-read-books-in-america/)",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "One subtlety from [Pew's non-reader analysis](https://www.pewresearch.org/short-reads/2021/09/21/who-doesnt-read-books-in-america/): gender does not significantly predict *whether* someone reads at all – the male-female gap is in volume and in fiction, not in touching a book. Education and income are the strongest predictors of not reading, and only 7% of American readers belong to a book club.",
        },
      ],
    },
    {
      id: "zero-books",
      heading: "What Share of People Read Zero Books?",
      tocLabel: "The zero-book share",
      blocks: [
        {
          type: "paragraph",
          text: "Somewhere between one-quarter and four-in-ten Americans read no books at all last year – and the honest answer really is a range, because the number depends heavily on how you ask. [Pew's surveys](https://www.pewresearch.org/short-reads/2021/09/21/who-doesnt-read-books-in-america/) find 23% (2021) creeping to 25% (2025). [YouGov's online panels](https://yougov.com/en-us/articles/53804-most-americans-didnt-read-many-books-in-2025) find 40–46%. The [NEA's stricter federal question](https://www.arts.gov/impact/research/responses-to-the-2022-SPPA/a-time-of-hope-and-worry) – which excludes reading for work or school – finds a majority, 51.5%, read no book in 2022.",
        },
        {
          type: "paragraph",
          text: "Any article quoting a single zero-book number without the survey-mode caveat is cherry-picking. Online panels consistently find more non-readers than phone interviews (people admit more to a screen than to a human), and narrower questions find fewer readers than broad ones.",
        },
      ],
    },
    {
      id: "formats",
      heading: "Print, E-Books, or Audiobooks?",
      tocLabel: "Formats",
      blocks: [
        {
          type: "paragraph",
          text: "Print still dominates. Among US adults in [Pew's October 2025 survey](https://www.pewresearch.org/short-reads/2026/04/09/americans-still-opt-for-print-books-over-digital-or-audio-versions-few-are-in-book-clubs/):",
        },
        {
          type: "barList",
          items: [
            { label: "Read a print book", percent: 100, display: "64%" },
            { label: "Read an e-book", percent: 48, display: "31%" },
            { label: "Listened to an audiobook", percent: 41, display: "26%" },
          ],
        },
        {
          type: "paragraph",
          text: "The trendlines are slow: e-books went from 25% (2019) to 30% (2021) to 31% (2025), while audiobooks are the fastest grower, from about 20% to 26% over the same window. Print has barely moved. Most digital readers are format-mixers – in [Pew's 2021 data](https://www.pewresearch.org/short-reads/2022/01/06/three-in-ten-americans-now-read-e-books/), 33% of adults read both print and digital, against just 9% who went digital-only.",
        },
      ],
    },
    {
      id: "famous-readers",
      heading: "Does the Average CEO Really Read 60 Books a Year?",
      tocLabel: "CEO reading myths",
      blocks: [
        {
          type: "paragraph",
          text: "No – **that statistic does not exist**. The \"average CEO reads 60 books a year\" claim is usually attributed to \"a Fast Company survey\" or \"a study,\" but no such study can be found; the citation chain dead-ends in motivational blogs and social media posts. It is repeated because it flatters a productivity narrative, not because anyone measured it.",
        },
        {
          type: "paragraph",
          text: "The Warren Buffett version is a traceable double misquote. Per [Quote Investigator](https://quoteinvestigator.com/2018/10/20/pages/), Buffett told Columbia students around 2002 to \"read 500 pages like this every day\" – holding up *company reports and trade publications*, not books. His deputy Todd Combs, who was in the room, [clarified in 2023](https://www.kingswell.io/p/todd-combs-q-and-a-transcript-2023) that the realistic figure was 500 pages a *week*: \"500 a day is a little over the top.\"",
        },
        {
          type: "paragraph",
          text: "The one famous-reader figure worth citing – carefully – is Bill Gates: he told [The New York Times in 2016](https://www.nytimes.com/2016/01/03/fashion/bill-gates-the-billionaire-book-critic.html) that he reads \"about 50 books\" a year. That is self-reported, not independently counted, but even taken at face value it means Gates reads roughly 4× the American mean and 10–25× the median – which says more about how low the typical bar is than about superhuman reading.",
        },
      ],
    },
    {
      id: "the-math",
      heading: "How Much Time Would 12 Books a Year Take?",
      tocLabel: "The daily math",
      blocks: [
        {
          type: "paragraph",
          text: "Less than you'd guess: about **13 minutes a day**. A typical novel runs 80,000–100,000 words (see [how many words are in a novel](/blog/how-many-words-in-a-novel)); at the measured average silent-reading speed of 238 words per minute (see [average reading speed](/blog/average-reading-speed)), a 90,000-word book takes about 6.3 hours. Gallup's 12.6 books × 6.3 hours ≈ 79 hours a year ≈ 13 minutes a day.",
        },
        {
          type: "paragraph",
          text: "That derived figure almost exactly matches the 15–16 minutes per day Americans actually log in [federal time-use diaries](https://www.arts.gov/stories/blog/2024/federal-data-reading-pleasure-all-signs-show-slump) – the self-reports and the stopwatch data reconcile. The other benchmarks: a book a week (the Gates pace) costs about 54 minutes a day, while the median American's 2–5 books amount to 13–32 hours of reading a year – less than two weeks of average TV time. For how long any given book takes, see [average book length](/blog/average-book-length).",
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
              name: "Americans Reading Fewer Books Than in Past (Dec 2021 poll, n=811)",
              publisher: "Gallup",
              year: "2022",
              href: "https://news.gallup.com/poll/388541/americans-reading-fewer-books-past.aspx",
            },
            {
              name: "Three-in-Ten Americans Now Read E-Books (Jan–Feb 2021 survey, n=1,502)",
              publisher: "Pew Research Center",
              year: "2022",
              href: "https://www.pewresearch.org/short-reads/2022/01/06/three-in-ten-americans-now-read-e-books/",
            },
            {
              name: "Who Doesn't Read Books in America?",
              publisher: "Pew Research Center",
              year: "2021",
              href: "https://www.pewresearch.org/short-reads/2021/09/21/who-doesnt-read-books-in-america/",
            },
            {
              name: "Americans Still Opt for Print Books Over Digital or Audio Versions (Oct 2025 survey, n=8,046)",
              publisher: "Pew Research Center",
              year: "2026",
              href: "https://www.pewresearch.org/short-reads/2026/04/09/americans-still-opt-for-print-books-over-digital-or-audio-versions-few-are-in-book-clubs/",
            },
            {
              name: "54% of Americans Read a Book This Year (Dec 2023 poll, n=1,500)",
              publisher: "YouGov",
              year: "2024",
              href: "https://yougov.com/en-us/articles/48239-54-percent-of-americans-read-a-book-this-year",
            },
            {
              name: "Most Americans Didn't Read Many Books in 2025 (Dec 2025 poll, n=2,203)",
              publisher: "YouGov",
              year: "2026",
              href: "https://yougov.com/en-us/articles/53804-most-americans-didnt-read-many-books-in-2025",
            },
            {
              name: "A Time of Hope and Worry – Responses to the 2022 Survey of Public Participation in the Arts",
              publisher: "National Endowment for the Arts",
              year: "2023",
              href: "https://www.arts.gov/impact/research/responses-to-the-2022-SPPA/a-time-of-hope-and-worry",
            },
            {
              name: "Federal Data on Reading for Pleasure: All Signs Show a Slump (ATUS/BLS analysis)",
              publisher: "National Endowment for the Arts",
              year: "2024",
              href: "https://www.arts.gov/stories/blog/2024/federal-data-reading-pleasure-all-signs-show-slump",
            },
            {
              name: "The Men-Women Split in Reading Is Real (SPPA analysis)",
              publisher: "National Endowment for the Arts",
              year: "2025",
              href: "https://www.arts.gov/stories/blog/2025/men-women-split-reading-real-and-persists-amid-historical-rate-declines",
            },
            {
              name: "The Decline in Reading for Pleasure Over 20 Years of the American Time Use Survey (Bone, Bu, Sonke & Fancourt; n=236,270)",
              publisher: "iScience",
              year: "2025",
              href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12496190/",
            },
            {
              name: "The British Reader Is in Decline (Censuswide survey, n=2,003)",
              publisher: "The Reading Agency",
              year: "2024",
              href: "https://readingagency.org.uk/the-british-reader-is-in-decline-as-the-reading-agency-reveals-half-of-uk-adults-dont-read-regularly/",
            },
            {
              name: "Bill Gates: The Billionaire Book Critic (Rosman)",
              publisher: "The New York Times",
              year: "2016",
              href: "https://www.nytimes.com/2016/01/03/fashion/bill-gates-the-billionaire-book-critic.html",
            },
            {
              name: "Read 500 Pages Like This Every Day – Quote Origin Trace",
              publisher: "Quote Investigator",
              year: "2018",
              href: "https://quoteinvestigator.com/2018/10/20/pages/",
            },
            {
              name: "Todd Combs Q&A Transcript (\"500 a day is a little over the top\")",
              publisher: "Kingswell",
              year: "2023",
              href: "https://www.kingswell.io/p/todd-combs-q-and-a-transcript-2023",
            },
          ],
        },
      ],
    },
  ],
}
