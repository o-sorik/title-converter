import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const AVERAGE_READING_SPEED_ARTICLE: WritingTipsArticle = {
  slug: "average-reading-speed",
  tags: ["Writing Statistics", "Reading", "Research"],
  ctaWord: "average reading speed",
  ctaText:
    "Readers skim headlines before they commit to a first paragraph – a properly capitalized title is what makes them stop. Format yours in one click with the Title Case Converter.",
  relatedSlugs: [
    "average-typing-speed",
    "how-many-words-in-a-novel",
    "how-long-should-a-blog-post-be",
    "commonly-misspelled-words",
    "common-grammar-mistakes",
  ],
  faqItems: [
    {
      question: "How fast does the average person read?",
      answer:
        "Adults silently read non-fiction at about 238 words per minute and fiction at about 260 words per minute, according to a 2019 meta-analysis of 190 studies with 18,573 participants. Most adults fall between 175 and 300 words per minute. Reading aloud is much slower, averaging 183 words per minute.",
    },
    {
      question: "Is reading 500 words per minute possible?",
      answer:
        "Only with a real loss of comprehension. Skilled college-educated readers run at 200–400 words per minute. In lab tests, trained speed readers at 600–700 words per minute scored no better on detail questions than untrained skimmers, and a speed-reading course that pushed students from 280 to 400 words per minute cut comprehension from 81% to 74%.",
    },
    {
      question: "How long does it take to read 100 pages?",
      answer:
        "About two hours. At a typical 275 words per page, 100 pages is roughly 27,500 words, which takes about 115 minutes at the average silent reading speed of 238 words per minute. Fiction reads slightly faster – about 106 minutes at 260 words per minute.",
    },
    {
      question: "How many words per minute should a child read?",
      answer:
        "U.S. national norms compiled from 6.89 million scores put the median student at 60 words correct per minute (read aloud) at the end of grade 1, 112 at the end of grade 3, and 146 at the end of grade 6. The normal spread is wide: spring-semester sixth graders range from 91 to 204 words correct per minute between the 10th and 90th percentiles.",
    },
    {
      question: "Do you read faster on paper or on a screen?",
      answer:
        "Speed is about the same. Modern meta-analyses find no reliable reading-time difference between paper and screens; the old claim that screens are 20–30% slower comes from 1980s CRT-monitor studies. Comprehension, however, is measurably better on paper for informational texts, and screen readers tend to overestimate how much they understood.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "Adults silently read non-fiction at an average of **238 words per minute**, according to [the largest meta-analysis of reading speed to date](https://doi.org/10.1016/j.jml.2019.104047) – 190 studies and 18,573 participants (Brysbaert, 2019). Fiction goes a little faster at 260 wpm, and reading aloud is much slower at 183 wpm. Here are the strongest numbers, each with its primary source.",
        },
        {
          type: "keyStats",
          items: [
            "**238 wpm** – average adult silent reading speed for English non-fiction; most adults fall between 175 and 300 wpm ([Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047))",
            "**260 wpm** – average silent reading speed for fiction, confirmed in a 50-book cover-to-cover study ([Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047))",
            "**183 wpm** – average speed when reading aloud, capped by articulation rather than vision ([Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047))",
            "**112 words correct per minute** – median oral reading fluency of U.S. third graders in spring, from 6.89 million scores ([Hasbrouck & Tindal, 2017](https://files.eric.ed.gov/fulltext/ED594994.pdf))",
            "**24 wpm slower** – the decline in U.S. students' silent reading rates between 1960 and 2011 ([Spichtig et al., 2016](https://ila.onlinelibrary.wiley.com/doi/full/10.1002/rrq.137))",
            "**600–700 wpm** – what trained speed readers actually reach in the lab, with detail comprehension no better than untrained skimmers ([Rayner et al., 2016](https://doi.org/10.1177/1529100615623267))",
            "**81% to 74%** – the comprehension drop when a speed-reading course pushed readers from 280 to 400 wpm ([Calef et al., 1999, in Rayner et al., 2016](https://doi.org/10.1177/1529100615623267))",
            "**No speed penalty on screens** – paper beats screens on comprehension (g = –0.21), not on reading time ([Delgado et al., 2018](https://doi.org/10.1016/j.edurev.2018.09.003); [Clinton, 2019](https://onlinelibrary.wiley.com/doi/10.1111/1467-9817.12269))",
            "**≈5.6 hours** – time to read an 80,000-word novel, calculated at 238 wpm ([Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047))",
          ],
        },
      ],
    },
    {
      id: "average-wpm",
      heading: "What Is the Average Reading Speed in Words per Minute?",
      tocLabel: "Average WPM",
      blocks: [
        {
          type: "paragraph",
          text: "The best available estimate comes from Marc Brysbaert's 2019 meta-analysis in the *Journal of Memory and Language*, which pooled [190 studies covering 18,573 participants](https://doi.org/10.1016/j.jml.2019.104047). For silent reading of English non-fiction, the mean is 238 wpm (95% CI 230–246), and most adults fall between 175 and 300 wpm.",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "238 WPM",
              label: "Silent reading, non-fiction (adult average)",
              sourceName: "Brysbaert, 2019",
              sourceHref: "https://doi.org/10.1016/j.jml.2019.104047",
            },
            {
              value: "260 WPM",
              label: "Silent reading, fiction (adult average)",
              sourceName: "Brysbaert, 2019",
              sourceHref: "https://doi.org/10.1016/j.jml.2019.104047",
            },
            {
              value: "183 WPM",
              label: "Reading aloud (adult average)",
              sourceName: "Brysbaert, 2019",
              sourceHref: "https://doi.org/10.1016/j.jml.2019.104047",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Fiction reads faster – 260 wpm on average, with a normal range of 200–320 wpm – largely because fiction uses shorter words: 4.2 letters per word on average versus 4.6 in non-fiction ([Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047)). Reading aloud drops to 183 wpm because speech, not vision, becomes the bottleneck; conversational speech itself runs at only 150–160 wpm ([Rayner et al., 2016](https://doi.org/10.1177/1529100615623267)).",
        },
        {
          type: "paragraph",
          text: "The oral figure is remarkably stable across languages. A 2012 standardization study of 436 young adults across 17 languages measured reading aloud at [184 wpm on average](https://iovs.arvojournals.org/article.aspx?articleid=2166061) (Trauzettel-Klosinski & Dietz, 2012) – within 1 wpm of Brysbaert's English estimate. And at 238 wpm, an hour of continuous silent reading covers about 14,280 words, a calculation Brysbaert makes in the paper itself.",
        },
      ],
    },
    {
      id: "by-age-and-grade",
      heading: "Reading Speed by Age and Grade",
      tocLabel: "By age and grade",
      blocks: [
        {
          type: "paragraph",
          text: "Children's reading speed is usually measured aloud, as oral reading fluency in words correct per minute (WCPM). The standard benchmarks are [Hasbrouck and Tindal's 2017 norms](https://files.eric.ed.gov/fulltext/ED594994.pdf), compiled from 6,886,582 student scores. Median (50th percentile) rates by grade:",
        },
        {
          type: "table",
          headers: ["Grade", "Fall, 50th percentile", "Spring, 50th percentile"],
          rows: [
            ["Grade 1", "–", "60 WCPM"],
            ["Grade 2", "50 WCPM", "100 WCPM"],
            ["Grade 3", "83 WCPM", "112 WCPM"],
            ["Grade 4", "94 WCPM", "133 WCPM"],
            ["Grade 5", "121 WCPM", "146 WCPM"],
            ["Grade 6", "132 WCPM", "146 WCPM"],
          ],
        },
        {
          type: "paragraph",
          text: "The spread around those medians is wide. In spring of grade 6, the 10th percentile reads 91 WCPM while the 90th percentile reads 204 WCPM ([Hasbrouck & Tindal, 2017](https://files.eric.ed.gov/fulltext/ED594994.pdf)).",
        },
        {
          type: "paragraph",
          text: "Silent reading norms by grade come from a much older eye-movement study – Taylor's 1965 charts, built on at least 1,000 readers per grade with a 70%-or-better comprehension requirement, [reproduced in Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047):",
        },
        {
          type: "barList",
          items: [
            { label: "Grade 1 (Taylor, 1965)", percent: 29, display: "80 wpm" },
            { label: "Grade 4 (Taylor, 1965)", percent: 56, display: "158 wpm" },
            { label: "Grade 8 (Taylor, 1965)", percent: 73, display: "204 wpm" },
            { label: "Grade 12 (Taylor, 1965)", percent: 89, display: "250 wpm" },
            { label: "College (Taylor, 1965)", percent: 100, display: "280 wpm" },
          ],
        },
        {
          type: "paragraph",
          text: "One caveat and one hook. The caveat: Brysbaert notes Taylor's college sample was more selective than the school grades, so 280 wpm overstates the typical adult – the meta-analytic mean remains 238 wpm ([Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047)). The hook: when researchers re-ran Taylor's materials with 2,203 U.S. students in 2011, rates came out [about 24 wpm lower than in 1960](https://ila.onlinelibrary.wiley.com/doi/full/10.1002/rrq.137), and 12th graders read 19% slower than their 1960 peers (Spichtig et al., 2016).",
        },
      ],
    },
    {
      id: "speed-reading",
      heading: "How Fast Is Fast Reading? Speed Reading, Debunked",
      tocLabel: "Speed reading",
      blocks: [
        {
          type: "paragraph",
          text: "Skilled, college-educated adults read at [200–400 wpm](https://doi.org/10.1177/1529100615623267) (Rayner et al., 2016). Beyond that, the evidence says you are trading comprehension for speed. The most comprehensive review of the question concludes it is unlikely that readers can “double or triple their reading speeds” while still understanding the text as well as at normal speed (Rayner et al., 2016).",
        },
        {
          type: "paragraph",
          text: "The bottleneck is not eye speed. Eye movements take up only about 10% of reading time – fixations last roughly 250 milliseconds, while the jumps between them take 20–35 milliseconds, and the perceptual span covers just 3–4 letters left and 14–15 letters right of where you are looking ([Rayner et al., 2016](https://doi.org/10.1177/1529100615623267)). Word identification, not vision, sets the limit – so apps built on “eliminating eye movements” attack the wrong bottleneck.",
        },
        {
          type: "list",
          items: [
            "A speed-reading course raised students from 280 to 400 wpm – and comprehension fell from 81% to 74% ([Calef et al., 1999, in Rayner et al., 2016](https://doi.org/10.1177/1529100615623267)).",
            "Speed readers tested at 600–700 wpm got the gist but scored no better on detail questions than untrained skimmers – and worse than normal readers at about 250 wpm ([Just, Masson & Carpenter, 1980, in Rayner et al., 2016](https://doi.org/10.1177/1529100615623267)).",
            "Two star course graduates “reading” a textbook at over 15,000 wpm failed the comprehension test; the researcher credited them with “a remarkable dexterity in page-turning” ([Homa, 1983, in Rayner et al., 2016](https://doi.org/10.1177/1529100615623267)).",
            "RSVP apps that flash one word at a time keep gist recall above 80% at 600 wpm, but detailed recall “dropped markedly” as the rate increased – partly because they block re-reading, which accounts for 10–15% of normal eye movements ([Potter et al., 1980, in Rayner et al., 2016](https://doi.org/10.1177/1529100615623267)).",
          ],
        },
        {
          type: "paragraph",
          text: "Skimming, by contrast, is a legitimate strategy: 2–4 times faster than normal reading at reduced comprehension – a sensible trade when you only need the gist ([Rayner et al., 2016](https://doi.org/10.1177/1529100615623267)). It is also how most people treat headlines, which is why [a correctly capitalized title](/blog/ap-title-capitalization-basics) does disproportionate work.",
        },
      ],
    },
    {
      id: "screen-vs-paper",
      heading: "Do You Read Slower on a Screen Than on Paper?",
      tocLabel: "Screen vs. paper",
      blocks: [
        {
          type: "paragraph",
          text: "No – modern research finds no reliable speed difference between screens and paper. The often-repeated claim that screen reading is 20–30% slower traces back to 1980s CRT-monitor studies and does not hold on contemporary displays: a 2019 meta-analysis of 33 randomized studies (n = 2,799) found the paper advantage came “without having to expend more time” ([Clinton, 2019](https://onlinelibrary.wiley.com/doi/10.1111/1467-9817.12269)).",
        },
        {
          type: "paragraph",
          text: "The real difference is comprehension. Across 54 studies with 171,055 participants, readers understood [informational texts better on paper](https://doi.org/10.1016/j.edurev.2018.09.003) – Hedges' g = –0.21 – with the gap widening under time pressure (Delgado et al., 2018). Narrative texts showed no difference. Notably, the screen disadvantage *grew* between 2000 and 2017, so “digital natives” are not closing it.",
        },
        {
          type: "paragraph",
          text: "Clinton's meta-analysis adds one more twist: screen readers overestimate how much they understood ([Clinton, 2019](https://onlinelibrary.wiley.com/doi/10.1111/1467-9817.12269)). If your audience reads on screens – and on the web it does – scannable structure matters more, starting with how you case your headings ([sentence case vs. title case](/blog/sentence-vs-title-case)).",
        },
      ],
    },
    {
      id: "book-time",
      heading: "How Long Does It Take to Read a Book?",
      tocLabel: "Time to read a book",
      blocks: [
        {
          type: "paragraph",
          text: "At the meta-analytic average of 238 wpm, silent reading covers about [14,280 words per hour](https://doi.org/10.1016/j.jml.2019.104047) (Brysbaert, 2019). At a typical 250–300 words per page, that is roughly 48–57 pages per hour – and the average novel in Brysbaert's 50-book study worked out to 278 words per page, right inside that range.",
        },
        {
          type: "table",
          headers: ["Book length", "At 238 WPM (non-fiction pace)", "At 260 WPM (fiction pace)"],
          rows: [
            ["50,000 words (novella)", "≈3.5 hours", "≈3.2 hours"],
            ["80,000 words (typical novel)", "≈5.6 hours", "≈5.1 hours"],
            ["107,000 words (average novel in Brysbaert's book study)", "≈7.5 hours", "≈6.9 hours"],
            ["120,000 words (long novel)", "≈8.4 hours", "≈7.7 hours"],
            ["200,000 words (epic)", "≈14.0 hours", "≈12.8 hours"],
          ],
        },
        {
          type: "paragraph",
          variant: "note",
          text: "Calculated as words ÷ wpm, at 238 wpm for non-fiction and 260 wpm for fiction (Brysbaert, 2019). These rows are arithmetic, not measurements.",
        },
        {
          type: "paragraph",
          text: "Real-world times vary far more than the table suggests: actual cover-to-cover reading times in Brysbaert's 50-book study ranged from under 1 hour to over 17 hours ([Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047)). Anywhere in the 175–300 wpm range still counts as a normal pace.",
        },
      ],
    },
    {
      id: "folk-figure",
      heading: "Where Does the “200–250 WPM” Figure Come From?",
      tocLabel: "The 200–250 wpm claim",
      blocks: [
        {
          type: "paragraph",
          text: "Nowhere traceable. The “200–250 words per minute” range that circulates in blog posts has no identifiable primary source – it is folklore that happens to bracket the real non-fiction average while understating fiction reading. The older “300 wpm” claim does have a paper trail: Brysbaert traces it to Taylor's 1965 charts, to Carver's “rauding” theory, and to a 1978 illustrative table of just 10 skilled readers averaging 308 wpm – and shows all three overestimate the population mean ([Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047)).",
        },
        {
          type: "paragraph",
          text: "If you need to cite a reading speed, cite the meta-analysis: **238 wpm** for non-fiction, **260 wpm** for fiction, **183 wpm** aloud ([Brysbaert, 2019](https://doi.org/10.1016/j.jml.2019.104047)). It is the number with 18,573 participants behind it.",
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
              name: "How Many Words Do We Read per Minute? A Review and Meta-Analysis of Reading Rate (Brysbaert)",
              publisher: "Journal of Memory and Language",
              year: "2019",
              href: "https://doi.org/10.1016/j.jml.2019.104047",
            },
            {
              name: "An Update to Compiled ORF Norms, Technical Report No. 1702 (Hasbrouck & Tindal)",
              publisher: "Behavioral Research and Teaching, University of Oregon",
              year: "2017",
              href: "https://files.eric.ed.gov/fulltext/ED594994.pdf",
            },
            {
              name: "So Much to Read, So Little Time: How Do We Read, and Can Speed Reading Help? (Rayner, Schotter, Masson, Potter & Treiman)",
              publisher: "Psychological Science in the Public Interest",
              year: "2016",
              href: "https://doi.org/10.1177/1529100615623267",
            },
            {
              name: "Standardized Assessment of Reading Performance: The New International Reading Speed Texts IReST (Trauzettel-Klosinski & Dietz)",
              publisher: "Investigative Ophthalmology & Visual Science",
              year: "2012",
              href: "https://iovs.arvojournals.org/article.aspx?articleid=2166061",
            },
            {
              name: "The Decline of Comprehension-Based Silent Reading Efficiency in the United States (Spichtig et al.)",
              publisher: "Reading Research Quarterly",
              year: "2016",
              href: "https://ila.onlinelibrary.wiley.com/doi/full/10.1002/rrq.137",
            },
            {
              name: "Don't Throw Away Your Printed Books: A Meta-Analysis on the Effects of Reading Media on Reading Comprehension (Delgado, Vargas, Ackerman & Salmerón)",
              publisher: "Educational Research Review",
              year: "2018",
              href: "https://doi.org/10.1016/j.edurev.2018.09.003",
            },
            {
              name: "Reading From Paper Compared to Screens: A Systematic Review and Meta-Analysis (Clinton)",
              publisher: "Journal of Research in Reading",
              year: "2019",
              href: "https://onlinelibrary.wiley.com/doi/10.1111/1467-9817.12269",
            },
            {
              name: "Eye Movements in Reading: Facts and Fallacies (Taylor; grade-level norms reproduced as Table 4 in Brysbaert, 2019)",
              publisher: "American Educational Research Journal",
              year: "1965",
              href: "https://doi.org/10.1016/j.jml.2019.104047",
            },
          ],
        },
      ],
    },
  ],
}
