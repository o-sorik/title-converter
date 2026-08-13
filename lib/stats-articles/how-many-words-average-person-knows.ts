import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const HOW_MANY_WORDS_AVERAGE_PERSON_KNOWS_ARTICLE: WritingTipsArticle = {
  slug: "how-many-words-average-person-knows",
  tags: ["Writing Statistics", "Vocabulary", "Language"],
  ctaWord: "how many words does the average person know",
  ctaText:
    "Knowing 42,000 words doesn't help when a headline needs AP or Chicago capitalization. Paste your title into our free Title Case Converter and get it right in one click.",
  relatedSlugs: [
    "average-reading-speed",
    "commonly-misspelled-words",
    "common-grammar-mistakes",
    "how-many-words-in-a-novel",
    "books-per-year",
  ],
  faqItems: [
    {
      question: "How many words does the average person know?",
      answer:
        "About 42,000 lemmas (dictionary words) for the average 20-year-old native English speaker, rising to about 48,200 by age 60, according to Brysbaert and colleagues' 2016 study of 221,268 people – the largest test-based estimate ever made. The same knowledge counts as only about 11,100 word families, so any vocabulary number depends entirely on what you count as a word.",
    },
    {
      question: "How many new words does a child learn per day?",
      answer:
        "Direct measurement puts it at about 2.2 to 2.4 root words per day from age 1 through grade 2 (Biemiller and Slonim, 2001). The famous \"10 words a day\" figure comes from a 1987 Scientific American article that counted every derived form, proper name, and idiom. Both are real numbers – they just count different things.",
    },
    {
      question: "How many words do you need to know to speak English fluently?",
      answer:
        "Paul Nation's 2006 corpus research found you need about 8,000 to 9,000 word families to read written English comfortably and 6,000 to 7,000 for spoken English – the point where you recognize 98% of the words you encounter. The most common vocabulary size among foreign learners who tested themselves online was about 4,500 words, roughly half the reading threshold.",
    },
    {
      question: "How many words did Shakespeare know?",
      answer:
        "Shakespeare used 31,534 distinct words across his known works, and statisticians Efron and Thisted estimated in 1976 that he knew at least 35,000 more – around 66,500 total. That sounds superhuman until you note that an average modern 20-year-old knows about 42,000 lemmas. The counting units differ, so the comparison is context, not a contest.",
    },
    {
      question: "How many words are there in the English language?",
      answer:
        "There is no official count. The Oxford English Dictionary currently describes itself as covering over 500,000 words and phrases; its 1989 Second Edition contained 171,476 words in current use. A 2011 Google Books analysis published in Science estimated the English lexicon at about 1,022,000 one-word forms in 2000 – but that includes vast numbers of forms no dictionary would list.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "The average 20-year-old native English speaker knows about **42,000 lemmas** – dictionary words like *run*, counting *runs* and *running* as the same word – rising to about 48,200 by age 60. That is the finding of [the largest vocabulary study ever conducted](https://doi.org/10.3389/fpsyg.2016.01116): 221,268 people tested by Brysbaert and colleagues at Ghent University in 2016. The catch is that \"how many words you know\" depends entirely on what counts as a word – the same people who know 42,000 lemmas know only about 11,100 word families.",
        },
        {
          type: "keyStats",
          items: [
            "**42,000 lemmas** – average vocabulary of a 20-year-old US native English speaker, from 221,268 test takers (2016, [Brysbaert et al., Frontiers in Psychology](https://doi.org/10.3389/fpsyg.2016.01116))",
            "**48,200 lemmas** – average vocabulary by age 60; adults keep learning about one new word every 2 days (2016, [Brysbaert et al.](https://doi.org/10.3389/fpsyg.2016.01116))",
            "**11,100 word families** – the same 20-year-old's knowledge counted by base words instead of lemmas (2016, [Brysbaert et al.](https://doi.org/10.3389/fpsyg.2016.01116))",
            "**27,000 to 52,000 lemmas** – the spread from the bottom 5% to the top 5% of 20-year-olds (2016, [Brysbaert et al.](https://doi.org/10.3389/fpsyg.2016.01116))",
            "**≈2.2–2.4 root words per day** – measured vocabulary growth from age 1 through grade 2 ([Biemiller & Slonim, 2001](https://doi.org/10.1037/0022-0663.93.3.498))",
            "**8,000–9,000 word families** – what you need to read English text at 98% word coverage (2006, [Nation](https://www.lextutor.ca/cover/papers/nation_2006.pdf))",
            "**31,534 distinct words** – Shakespeare's entire written vocabulary; models estimate he knew ≈66,500 (1976, [Efron & Thisted, Biometrika](https://academic.oup.com/biomet/article-abstract/63/3/435/270845))",
            "**100–200 words per year** – all that classroom instruction can directly teach, versus ~5,000 learned; the rest comes from reading (1987, [Miller & Gildea, Scientific American](https://languagelog.ldc.upenn.edu/myl/MillerWords1987.pdf))",
            "**~1,022,000** – the estimated size of the English lexicon in 2000, from the Google Books corpus (2011, [Michel et al., Science](https://doi.org/10.1126/science.1199644))",
          ],
        },
      ],
    },
    {
      id: "counting-problem",
      heading: "What Counts as \"Knowing a Word\"?",
      tocLabel: "The counting problem",
      blocks: [
        {
          type: "paragraph",
          text: "Every vocabulary statistic depends on its counting unit, and the differences are enormous. [Brysbaert's 2016 study](https://doi.org/10.3389/fpsyg.2016.01116) reports all the units for the same people: the average 20-year-old knows 42,000 *lemmas* (base words plus their inflections counted once), roughly 4,200 non-transparent multiword expressions like idioms – but only 11,100 *word families* (which fold derived forms like *happiness* into *happy*).",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "42,000",
              label: "Lemmas known by the average 20-year-old",
              sourceName: "Brysbaert et al., 2016",
              sourceHref: "https://doi.org/10.3389/fpsyg.2016.01116",
            },
            {
              value: "11,100",
              label: "Word families – the same person, the same knowledge",
              sourceName: "Brysbaert et al., 2016",
              sourceHref: "https://doi.org/10.3389/fpsyg.2016.01116",
            },
          ],
        },
        {
          type: "paragraph",
          text: "This is why the internet's favorite answer – \"the average person knows 20,000–35,000 words\" – needs an asterisk. It comes from testyourvocab.com's 2013 self-test results ([preserved at languagehat](https://languagehat.com/test-your-vocab-results/); the original site is offline). The organizers themselves noted their participants sat \"in roughly the 98th percentile of the American population\" – people who voluntarily take online vocabulary tests are not average. Any article quoting a vocabulary number without naming its counting unit and sample is quoting noise.",
        },
      ],
    },
    {
      id: "by-age",
      heading: "How Does Vocabulary Grow With Age?",
      tocLabel: "Vocabulary by age",
      blocks: [
        {
          type: "paragraph",
          text: "It grows fastest in childhood and never fully stops. The figures below combine the peer-reviewed lemma estimates for adults ([Brysbaert et al., 2016](https://doi.org/10.3389/fpsyg.2016.01116)) with the self-test childhood figures ([testyourvocab via languagehat](https://languagehat.com/test-your-vocab-results/), self-selected sample – treat as indicative):",
        },
        {
          type: "barList",
          items: [
            { label: "Age 4 (self-test, native speakers)", percent: 10, display: "~5,000 words" },
            { label: "Age 8 (self-test, native speakers)", percent: 21, display: "~10,000 words" },
            { label: "Age 20 (measured, lemmas)", percent: 87, display: "42,000 lemmas" },
            { label: "Age 60 (measured, lemmas)", percent: 100, display: "48,200 lemmas" },
          ],
        },
        {
          type: "paragraph",
          text: "The childhood engine is remarkably steady: [Biemiller and Slonim's direct testing](https://doi.org/10.1037/0022-0663.93.3.498) found children acquire about 860 root words per year – 2.2 to 2.4 per day – from age 1 through the end of grade 2. The gap opens early, too: by grade 2, children in the lowest quartile already knew about 4,100 fewer root words than the highest quartile.",
        },
        {
          type: "paragraph",
          text: "In adulthood, growth slows but continues: about 6,000 new lemmas between ages 20 and 60, or **one new word every 2 days** ([Brysbaert et al., 2016](https://doi.org/10.3389/fpsyg.2016.01116)). The self-test data independently found \"almost 1 new word a day until middle age\" – two very different datasets bracketing the same conclusion. The claim that vocabulary \"peaks in your 20s\" is simply wrong. What predicts the size of yours? Age, education, and speaking more than one language, per [a companion megastudy of ~300,000 people](https://pubmed.ncbi.nlm.nih.gov/25715025/).",
        },
      ],
    },
    {
      id: "words-per-day",
      heading: "How Many Words Do Children Learn Per Day?",
      tocLabel: "The words-per-day myth",
      blocks: [
        {
          type: "paragraph",
          text: "You will see 2 a day, 6 a day, and 10 a day – and all three are defensible, because they count different things. The \"10 words a day\" meme traces to a single sentence in [Miller and Gildea's 1987 Scientific American article](https://languagelog.ldc.upenn.edu/myl/MillerWords1987.pdf): \"a child learns new words at a rate of more than 10 per day!\" That rate counts every derived form, proper name, and idiom in their 80,000-word high-school estimate.",
        },
        {
          type: "table",
          headers: ["Rate", "What it counts", "Source"],
          rows: [
            [
              "≈2.2–2.4 per day",
              "Root words only, directly measured, ages 1 to grade 2",
              "[Biemiller & Slonim, 2001](https://doi.org/10.1037/0022-0663.93.3.498)",
            ],
            [
              "≈5.8 per day",
              "Lemmas – derived: 42,000 lemmas ÷ 20 years ÷ 365 days",
              "Arithmetic on [Brysbaert et al., 2016](https://doi.org/10.3389/fpsyg.2016.01116)",
            ],
            [
              "≈13 per day",
              "Everything: derived forms, proper names, idioms (80,000 ÷ 16 years)",
              "[Miller & Gildea, 1987](https://languagelog.ldc.upenn.edu/myl/MillerWords1987.pdf)",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "So \"10 a day\" isn't fabricated – it's a units artifact. The more consequential finding from the same 1987 article: classroom instruction can directly teach only \"100 or 200 words a year\" of the ~5,000 children actually learn. The rest comes from encountering words in context – which is to say, from reading. How much reading that takes is a function of [how fast people actually read](/blog/average-reading-speed).",
        },
      ],
    },
    {
      id: "learning-english",
      heading: "How Many Words Do You Need to Use English?",
      tocLabel: "Enough words for fluency",
      blocks: [
        {
          type: "paragraph",
          text: "Far fewer than a native speaker knows – but more than most learners have. [Paul Nation's 2006 corpus analysis](https://www.lextutor.ca/cover/papers/nation_2006.pdf) ran fourteen 1,000-word-family frequency lists over novels, newspapers, and spoken corpora to find how much vocabulary delivers 98% coverage, the threshold where reading becomes comfortable:",
        },
        {
          type: "table",
          headers: ["Word families known", "Share of running text covered", "What that means"],
          rows: [
            ["1,000 most frequent", "≈78–81%", "One word in five is unknown – unreadable"],
            ["2,000 most frequent", "≈87–92%", "Still roughly one unknown word per line"],
            ["4,000 + proper nouns", "≈95%", "Comprehension possible with effort"],
            ["8,000–9,000", "≈98%", "Comfortable reading – Nation's threshold for novels"],
          ],
        },
        {
          type: "paragraph",
          text: "Nation's summary: \"A vocabulary of 8,000 to 9,000 words is needed to read a novel, and even then, 1 word in 50 will be unfamiliar.\" Spoken English is cheaper – 6,000 to 7,000 word families. For scale, he puts well-educated native speakers at around 20,000 word families, roughly 1,000 per year of life up to age 20.",
        },
        {
          type: "paragraph",
          text: "Against that ladder, the most common self-tested vocabulary among foreign learners was about **4,500 words** – roughly half the reading threshold – while learners who had lived in an English-speaking country typically passed 10,000 ([testyourvocab via languagehat](https://languagehat.com/test-your-vocab-results/)). And advanced non-natives studying university degrees in English measure at 8,000–9,000 word families – exactly Nation's reading threshold. The convergence is the story.",
        },
      ],
    },
    {
      id: "shakespeare",
      heading: "How Many Words Did Shakespeare Know?",
      tocLabel: "Shakespeare's vocabulary",
      blocks: [
        {
          type: "paragraph",
          text: "The rigorous numbers come from an unlikely place: a 1976 *Biometrika* paper in which statisticians [Bradley Efron and Ronald Thisted](https://academic.oup.com/biomet/article-abstract/63/3/435/270845) applied \"unseen species\" estimation – a method built for counting butterfly species a trap hasn't caught yet – to the Shakespeare concordance. The corpus facts: Shakespeare wrote 884,647 words using **31,534 distinct word forms**, of which 14,376 appear exactly once.",
        },
        {
          type: "paragraph",
          text: "Their model estimated he *knew* at least 35,000 more words than he ever wrote – a total vocabulary around 66,500 word forms. The circulating claims that Shakespeare \"used 20,000 words\" or \"29,066 words\" are miscounts or unstated lemma reductions; cite the concordance figure.",
        },
        {
          type: "paragraph",
          text: "Was it the largest vocabulary in English, as often claimed? Unknowable – the estimate reflects corpus size and counting units. For context, [Brysbaert's data](https://doi.org/10.3389/fpsyg.2016.01116) put an ordinary modern 20-year-old at 42,000 lemmas. The units differ (word forms in a fixed corpus vs lemmas on a test), so treat it as perspective, not a head-to-head: by the numbers, Shakespeare's vocabulary was extraordinary for what he *did* with it, not for its raw size.",
        },
      ],
    },
    {
      id: "words-in-english",
      heading: "How Many Words Are There in English?",
      tocLabel: "Words in English total",
      blocks: [
        {
          type: "paragraph",
          text: "No official count exists – English has no academy, and no certified arbiter of what counts as a word. Three defensible layers:",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "500,000+",
              label: "Words and phrases covered by the OED today, per its own description",
              sourceName: "Oxford English Dictionary",
              sourceHref: "https://www.oed.com/",
            },
            {
              value: "171,476",
              label: "Words in current use in the OED Second Edition – frozen in 1989",
              sourceName: "OED2 via NYPL",
              sourceHref: "https://www.nypl.org/collections/articles-databases/oxford-english-dictionary-oed-2nd-edition",
            },
            {
              value: "~1,022,000",
              label: "English one-word forms in the year 2000, estimated from 5.2M digitized books",
              sourceName: "Michel et al., Science, 2011",
              sourceHref: "https://doi.org/10.1126/science.1199644",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The corpus estimate deserves its caveats: [Michel et al.](https://doi.org/10.1126/science.1199644) counted any string appearing more than once per billion words – far looser than a dictionary headword – and found the lexicon growing by roughly 8,500 \"words\" a year. The famous 2009 announcement that English had crossed \"one million words\" (crowning *Web 2.0* as the millionth) was a marketing stunt by the Global Language Monitor; linguist Geoffrey Nunberg [called it \"pure fraud\"](https://www.ischool.berkeley.edu/news/2009/geoff-nunberg-scoffs-millionth-word-claim).",
        },
        {
          type: "paragraph",
          text: "Run the shareable math with labeled units: 42,000 lemmas is about 24% of OED2's words in current use – and even the largest tested vocabularies (52,000 lemmas) clear barely 30%. Knowing a word is also not the same as spelling it: [word-prevalence norms for 61,858 English lemmas](https://doi.org/10.3758/s13428-018-1077-9) show some words known by 99% of people still rank among [the most commonly misspelled words](/blog/commonly-misspelled-words).",
        },
      ],
    },
    {
      id: "active-passive",
      heading: "Active vs Passive Vocabulary: Is There a Ratio?",
      tocLabel: "Active vs passive",
      blocks: [
        {
          type: "paragraph",
          text: "You will read that people \"actively use only 25%\" (or 50%) of the words they know. **No primary source supports any fixed ratio.** The defensible findings come from [Batia Laufer's 1998 longitudinal study](https://academic.oup.com/applij/article-abstract/19/2/255/316323): passive (recognition) vocabulary is always significantly larger than active (production) vocabulary, and the gap *widens* as vocabulary grows. The ratio varies by person and context and has never been measured at population scale – an honest gap worth knowing about.",
        },
        {
          type: "paragraph",
          text: "Where your passive vocabulary meets the page is recognition; where your active vocabulary meets an editor is style. Knowing the word is step one – knowing [which words to capitalize in a title](/capitalization-rules-guide) is the part even 48,200 lemmas won't settle for you.",
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
              name: "How Many Words Do We Know? Practical Estimates of Vocabulary Size (Brysbaert, Stevens, Mandera & Keuleers)",
              publisher: "Frontiers in Psychology 7:1116",
              year: "2016",
              href: "https://doi.org/10.3389/fpsyg.2016.01116",
            },
            {
              name: "Word Knowledge in the Crowd: Measuring Vocabulary Size and Word Prevalence in a Massive Online Experiment (Keuleers, Stevens, Mandera & Brysbaert)",
              publisher: "Quarterly Journal of Experimental Psychology 68(8)",
              year: "2015",
              href: "https://pubmed.ncbi.nlm.nih.gov/25715025/",
            },
            {
              name: "Word Prevalence Norms for 62,000 English Lemmas (Brysbaert, Mandera, McCormick & Keuleers)",
              publisher: "Behavior Research Methods 51",
              year: "2019",
              href: "https://doi.org/10.3758/s13428-018-1077-9",
            },
            {
              name: "How Large a Vocabulary Is Needed for Reading and Listening? (Nation)",
              publisher: "Canadian Modern Language Review 63(1)",
              year: "2006",
              href: "https://www.lextutor.ca/cover/papers/nation_2006.pdf",
            },
            {
              name: "How Children Learn Words (Miller & Gildea)",
              publisher: "Scientific American 257(3)",
              year: "1987",
              href: "https://languagelog.ldc.upenn.edu/myl/MillerWords1987.pdf",
            },
            {
              name: "Estimating the Number of Unseen Species: How Many Words Did Shakespeare Know? (Efron & Thisted)",
              publisher: "Biometrika 63(3)",
              year: "1976",
              href: "https://academic.oup.com/biomet/article-abstract/63/3/435/270845",
            },
            {
              name: "Estimating Root Word Vocabulary Growth in Normative and Advantaged Populations (Biemiller & Slonim)",
              publisher: "Journal of Educational Psychology 93(3)",
              year: "2001",
              href: "https://doi.org/10.1037/0022-0663.93.3.498",
            },
            {
              name: "The Development of Passive and Active Vocabulary in a Second Language (Laufer)",
              publisher: "Applied Linguistics 19(2)",
              year: "1998",
              href: "https://academic.oup.com/applij/article-abstract/19/2/255/316323",
            },
            {
              name: "Quantitative Analysis of Culture Using Millions of Digitized Books (Michel et al.)",
              publisher: "Science 331",
              year: "2011",
              href: "https://doi.org/10.1126/science.1199644",
            },
            {
              name: "Oxford English Dictionary – About (500,000+ words and phrases)",
              publisher: "Oxford University Press",
              year: "2026",
              href: "https://www.oed.com/",
            },
            {
              name: "Oxford English Dictionary (OED) 2nd Edition – Collection Notes (OED2 1989 counts)",
              publisher: "New York Public Library",
              year: "2026",
              href: "https://www.nypl.org/collections/articles-databases/oxford-english-dictionary-oed-2nd-edition",
            },
            {
              name: "Test Your Vocab – Summary of Results (2013, preserved reproduction)",
              publisher: "languagehat.com",
              year: "2013",
              href: "https://languagehat.com/test-your-vocab-results/",
            },
            {
              name: "Geoff Nunberg Scoffs at Millionth-Word Claim",
              publisher: "UC Berkeley School of Information",
              year: "2009",
              href: "https://www.ischool.berkeley.edu/news/2009/geoff-nunberg-scoffs-millionth-word-claim",
            },
          ],
        },
      ],
    },
  ],
}
