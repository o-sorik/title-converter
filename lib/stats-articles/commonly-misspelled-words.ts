import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const COMMONLY_MISSPELLED_WORDS_ARTICLE: WritingTipsArticle = {
  slug: "commonly-misspelled-words",
  tags: ["Writing Statistics", "Spelling", "Grammar 101"],
  ctaWord: "commonly misspelled words",
  ctaText:
    "Spelling is half the battle – capitalization is the other half. Once every word is spelled right, run your headline through the free Title Case Converter to check its capitalization against AP, APA, Chicago, or MLA rules.",
  relatedSlugs: [
    "common-grammar-mistakes",
    "average-typing-speed",
    "average-reading-speed",
    "how-long-should-a-blog-post-be",
    "how-many-words-average-person-knows",
  ],
  faqItems: [
    {
      question: "What is the most misspelled word in English?",
      answer:
        "By measured frequency, it's \"publicly\" – commonly misspelled as \"publically.\" That finding comes from Oxford Dictionaries' analysis of the Oxford English Corpus, a collection of over 2 billion words of real English. By search data, \"beautiful\" topped Google's US \"how to spell\" maps in both 2017 and 2018.",
    },
    {
      question: "What percentage of people rely on spellcheck?",
      answer:
        "In a 2012 Mencap survey of 2,000 UK adults, 18% said they use spellcheck or autocorrect all of the time and 21% most of the time – 39% combined. Mencap's chief executive summarized the results as over two-thirds of Britons now having to rely on spellcheck. In the US, a 2009 Ipsos MORI survey found 1 in 3 adults rely on spellcheckers even for job applications and letters.",
    },
    {
      question: "Why is 'necessary' so hard to spell?",
      answer:
        "It has one c and two s's, and its unstressed vowels give the ear no clue which letters to write. In Mencap's 2012 spelling test, 65% of UK adults failed it – the worst result of the five words tested. It also appears in Oxford's corpus-based misspelling list and on the UK's statutory school spelling lists.",
    },
    {
      question: "Did Google release a map of the most misspelled words in 2021?",
      answer:
        "No. The widely shared 2021 state map was produced by AT&T Experts, an AT&T retailer, using Google Trends data from March 2020 to March 2021 – it was not a Google release. Google's own state maps came out in 2017 and 2018. In the 2021 third-party analysis, \"quarantine\" topped 12 states.",
    },
    {
      question: "How common are spelling errors in everyday writing?",
      answer:
        "Research surveyed by Karen Kukich in ACM Computing Surveys (1992) puts spelling errors at 1–3% of words in typewritten text. Most errors are small: Fred Damerau's 1964 study found that 80% of misspellings are a single wrong letter – one insertion, deletion, substitution, or transposition.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "The most commonly misspelled word in English is “publicly” – frequently written as *publically* – according to [Oxford Dictionaries’ analysis of the Oxford English Corpus](https://web.archive.org/web/20200108003932/https://www.lexico.com/grammar/common-misspellings), an electronic collection of over 2 billion words of real English. Survey data shows how widespread the problem is: 65% of UK adults failed to spell “necessary” in 2012, and 62% of Americans misspelled “embarrassed” in 2009. Here are the key numbers, the full list, and what the hardest words have in common – with every claim linked to its primary source.",
        },
        {
          type: "keyStats",
          items: [
            "**“Publicly”** is the most commonly misspelled word in English, per [Oxford Dictionaries’ analysis of the 2-billion-word Oxford English Corpus](https://web.archive.org/web/20200108003932/https://www.lexico.com/grammar/common-misspellings) (2009).",
            "**65% of UK adults** failed to spell “necessary” in a [Mencap survey](https://www.mencap.org.uk/news/article/mencap-survey-highlights-britains-poor-spelling) of 2,000 people (2012) – and only 1 in 5 spelled all five test words correctly.",
            "**62% of Americans** misspelled “embarrassed,” versus 54% of Britons, in a [Spelling Society / Ipsos MORI survey](https://www.spellingsociety.org/news-archive-2010) (2009).",
            "**80% of misspellings** are one letter off – a single insertion, deletion, substitution, or transposition ([Damerau, 1964](https://dl.acm.org/doi/10.1145/363958.363994)).",
            "**1–3% of words** in typewritten text contain a spelling error ([Kukich, 1992](https://dl.acm.org/doi/10.1145/146370.146380)).",
            "**39% of Britons** use spellcheck or autocorrect all or most of the time ([Mencap, 2012](https://www.mencap.org.uk/news/article/mencap-survey-highlights-britains-poor-spelling)); **1 in 3 Americans** rely on spellcheckers for job applications and letters ([Ipsos MORI, 2009](https://www.spellingsociety.org/news-archive-2010)).",
            "**“Beautiful”** was America’s most-searched “how to spell” word two years running – #1 in 5 states in 2017 and 11 states in 2018, per [Google Trends](https://www.nbcnews.com/news/us-news/what-are-most-misspelled-words-every-state-n766361) (2017/2018).",
            "**A single misspelling cut one retailer’s online sales in half**, according to sales figures the owner reported to the [BBC](https://www.bbc.com/news/education-14130854) (2011).",
          ],
        },
      ],
    },
    {
      id: "master-list",
      heading: "The Master List of Commonly Misspelled Words",
      tocLabel: "The master list",
      blocks: [
        {
          type: "paragraph",
          text: "Most “misspelled words” lists online are editorial guesses. This one isn’t: [Oxford Dictionaries published a table of the most common English misspellings](https://web.archive.org/web/20200108003932/https://www.lexico.com/grammar/common-misspellings) measured against the Oxford English Corpus – over 2 billion words of real-world English (2009). Every word below comes from that corpus-verified list.",
        },
        {
          type: "table",
          headers: ["Correct spelling", "Common misspelling", "Why it trips people"],
          rows: [
            ["publicly", "publically", "“public” doesn’t end in -al, so there’s no -ally"],
            ["accommodate", "accomodate", "two c’s *and* two m’s"],
            ["definitely", "definately", "-ite- in the middle, not -ate- – the unstressed vowel is a coin flip"],
            ["separate", "seperate", "-par- in the middle; the second vowel is inaudible"],
            ["necessary", "neccessary", "one c, two s’s"],
            ["embarrass", "embarass", "double r and double s"],
            ["occurrence", "occurance", "double c, double r, and it ends in -ence"],
            ["receive", "recieve", "e before i after c"],
            ["believe", "beleive", "i before e"],
            ["government", "goverment", "the n before the m disappears in speech"],
            ["which", "wich", "silent h in wh-"],
            ["until", "untill", "only one l at the end"],
            ["business", "buisness", "busi- comes from “busy”"],
            ["calendar", "calender", "ends in -ar, not -er"],
            ["cemetery", "cemetary", "ends in -ery – three e’s, no a"],
            ["committee", "commitee", "double m, double t, double e"],
            ["conscious", "concious", "the -sc- cluster in the middle"],
            ["environment", "enviroment", "the n before the m goes unheard"],
            ["liaison", "liason", "French loanword – an a sandwiched between two i’s"],
            ["tomorrow", "tommorrow", "one m, two r’s"],
            ["harass", "harrass", "one r, two s’s – the opposite of “embarrass”"],
            ["weird", "wierd", "breaks the i-before-e rule"],
            ["supersede", "supercede", "the only English word ending in -sede"],
            ["millennium", "millenium", "double l and double n"],
            ["pharaoh", "pharoah", "the -aoh ending looks wrong even when it’s right"],
            ["forty", "fourty", "“four” drops its u"],
          ],
        },
        {
          type: "paragraph",
          text: "[Merriam-Webster’s “Commonly Misspelled Words” collection](https://www.merriam-webster.com/grammar/commonly-misspelled-words) adds several US favorites to the same pile: *rhythm* (no everyday vowels), *maneuver* (from French *manœuvre*), *consensus* (like “sense,” not “census”), *broccoli* (double c, single l), and – fittingly – *misspell* itself, which needs two s’s.",
        },
        {
          type: "paragraph",
          text: "The strongest evidence that these words are genuinely hard: “definitely,” “separate,” “necessary,” and “embarrassed” each show up independently in the Oxford corpus data (2009), the Mencap spelling test (2012), the Ipsos MORI survey (2009), and Google’s search-based state maps (2017–2018). Four different methods, same words. Note that this list is about spelling, not capitalization – if your question is which words get capital letters in a headline, that’s [a different list entirely](/blog/what-words-are-not-capitalized-in-a-title).",
        },
      ],
    },
    {
      id: "by-state",
      heading: "What Is the Most Misspelled Word in Every US State?",
      tocLabel: "By US state",
      blocks: [
        {
          type: "paragraph",
          text: "Google Trends released state-by-state maps of America’s top “how to spell” searches twice – ahead of the Scripps National Spelling Bee in [2017](https://www.cbsnews.com/news/google-americas-most-misspelled-words-spelling-bee/) and again in [2018](https://www.usnews.com/news/best-states/articles/2018-06-01/google-releases-each-states-most-commonly-misspelled-word). Both years, one word dominated: “beautiful.”",
        },
        {
          type: "table",
          headers: ["Release", "Top word", "Detail"],
          rows: [
            [
              "2017 – Google Trends",
              "beautiful",
              "#1 in 5 states (CA, MN, OH, KY, NY); data from Jan–Apr 2017",
            ],
            [
              "2018 – Google Trends",
              "beautiful",
              "#1 in 11 states; “supercalifragilisticexpialidocious” topped 6 states",
            ],
            [
              "2021 – AT&T Experts (not Google)",
              "quarantine",
              "#1 in 12 states; “coronavirus” topped 6 – Google Trends data, Mar 2020–Mar 2021",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "One correction worth making: the viral “2021 map” was **not a Google release**. It was [an analysis by AT&T Experts](https://www.attexperts.com/news/each-states-most-commonly-googled-misspelled-word), an AT&T retailer, applied to a year of Google Trends data during the pandemic – then widely re-reported as Google’s own. The same goes for the “2025 Google map” that circulated in spring 2025: [Language Log traced it](https://languagelog.ldc.upenn.edu/nll/?p=69292) to a word-game website, and documented serious problems with its methodology.",
        },
        {
          type: "paragraph",
          text: "The maps produce reliably strange trivia. In [Google’s 2017 data](https://www.nbcnews.com/news/us-news/what-are-most-misspelled-words-every-state-n766361), Wisconsin’s most-searched spelling was “Wisconsin,” New Jersey’s was “twelve,” and Pennsylvania’s was “sauerkraut” – and Google’s own announcement tweet misspelled Maryland’s word “ninety” as “Nintey.” In 2018, Maine’s top spelling search was “Connecticut.”",
        },
        {
          type: "paragraph",
          variant: "note",
          text: "Caveat: these maps measure “how to spell” searches – words people *know* they can’t spell – not how often words are actually misspelled in writing. That’s why they skew toward long showpieces like “supercalifragilisticexpialidocious” rather than everyday traps like “separate.”",
        },
      ],
    },
    {
      id: "spelling-statistics",
      heading: "How Many People Misspell Everyday Words?",
      tocLabel: "Spelling statistics",
      blocks: [
        {
          type: "paragraph",
          text: "More than most of us would guess – and far more than we admit. In [Mencap’s 2012 survey of 2,000 UK adults](https://www.mencap.org.uk/news/article/mencap-survey-highlights-britains-poor-spelling), 76% rated their own spelling as very or fairly good, yet only 21% could spell all five test words. Students scored worst of any group, at 13%. Mencap’s chief executive Mark Goldring described the results as “over two thirds of Britons now having to rely on spell check.”",
        },
        {
          type: "barList",
          items: [
            { label: "Rated their own spelling “very/fairly good” (Mencap UK, 2012)", percent: 76, display: "76%" },
            { label: "Failed to spell “necessary” (Mencap UK, 2012)", percent: 65, display: "65%" },
            { label: "Americans who misspelled “embarrassed” (Ipsos MORI, 2009)", percent: 62, display: "62%" },
            { label: "Britons who misspelled “embarrassed” (Ipsos MORI, 2008)", percent: 54, display: "54%" },
            { label: "Use spellcheck/autocorrect all or most of the time (Mencap UK, 2012)", percent: 39, display: "39%" },
            { label: "Failed to spell “definitely” (Mencap UK, 2012)", percent: 33, display: "33%" },
            { label: "Failed to spell “separate” (Mencap UK, 2012)", percent: 33, display: "33%" },
            { label: "Got all five test words right (Mencap UK, 2012)", percent: 21, display: "21%" },
            { label: "Students who got all five right (Mencap UK, 2012)", percent: 13, display: "13%" },
          ],
        },
        {
          type: "paragraph",
          text: "The American picture is no better. In the [Spelling Society’s 2009 Ipsos MORI survey](https://www.spellingsociety.org/news-archive-2010) of 1,000 US adults, more than half performed poorly on ten everyday words, and 1 in 3 said they rely on spellcheckers for job applications and letters. Men did worse than women on nearly every word – “liaison” was the lone exception.",
        },
        {
          type: "paragraph",
          text: "Academic research puts hard numbers on the baseline: spelling errors run [1–3% of words in typewritten text](https://dl.acm.org/doi/10.1145/146370.146380) (Kukich, ACM Computing Surveys, 1992). The largest compiled error collection, the [Birkbeck spelling error corpus](https://ota.bodleian.ox.ac.uk/repository/xmlui/handle/20.500.12024/0643) (Mitton, 1985), holds 36,133 recorded misspellings of just 6,136 words – nearly six documented ways to get each word wrong.",
        },
      ],
    },
    {
      id: "why-misspelled",
      heading: "Why Do Words Get Misspelled?",
      tocLabel: "Why words get misspelled",
      blocks: [
        {
          type: "paragraph",
          text: "The master list isn’t random – almost every word on it falls into one of five failure patterns, and each pattern has data behind it.",
        },
        {
          type: "list",
          items: [
            "**Double letters.** *Accommodate*, *embarrass*, *occurrence*, *committee*, *millennium* – [Merriam-Webster notes](https://www.merriam-webster.com/grammar/commonly-misspelled-words) that “accommodate” simply has more double letters than we expect. The inverse trap: *harass* and *tomorrow*, where writers double letters that stay single.",
            "**Silent letters.** *Pneumonia* – which topped three states in Google’s 2017 map – hides its p; *which* loses its h to become “wich” (the top spelling search in 5 states, per the 2021 AT&T Experts analysis).",
            "**The ei/ie trap.** *Believe* and *receive* follow “i before e except after c” – then *weird* breaks the rule entirely.",
            "**Unstressed vowels.** *Definitely* becomes “definately” and *separate* becomes “seperate” because the schwa sound, as [Merriam-Webster’s Spelling Bee analysis](https://www.merriam-webster.com/grammar/national-spelling-bee-misspelled-words) puts it, “can be represented by any vowel letter.”",
            "**Foreign borrowings.** In Merriam-Webster’s analysis of ten years of Scripps National Spelling Bee finals (published 2021), 48% of misspelled words came from Greek and Latin, and French led modern languages at 19%. That’s *liaison*, *maneuver*, *restaurant*, and *broccoli* in a nutshell.",
          ],
        },
        {
          type: "paragraph",
          text: "Structurally, the mistakes are tiny. [Fred Damerau’s 1964 study](https://dl.acm.org/doi/10.1145/363958.363994) – the paper behind the Damerau–Levenshtein distance used in every spellchecker since – found that 80% of misspellings are a single wrong letter: one insertion, deletion, substitution, or transposition. When you misspell a word, you’re usually one keystroke from correct.",
        },
      ],
    },
    {
      id: "cost",
      heading: "What Do Spelling Mistakes Cost?",
      tocLabel: "What mistakes cost",
      blocks: [
        {
          type: "paragraph",
          text: "The most cited number in this genre comes from UK entrepreneur Charles Duncombe, who told the [BBC in 2011](https://www.bbc.com/news/education-14130854) that a single spelling mistake can cut online sales in half – after fixing one error on his tightsplease.co.uk site, revenue per visitor doubled. Treat it honestly for what it is: one businessman’s internal figures, not a peer-reviewed study. But the mechanism is plausible – Oxford Internet Institute professor William Dutton told the BBC in the same piece that a misspelled word can be “a killer issue” on sites where users already fear spam and phishing.",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "−50%",
              label: "reported impact of a single misspelling on online sales – revenue per visitor doubled after the error was fixed (self-reported retail data)",
              sourceName: "BBC News, 2011",
              sourceHref: "https://www.bbc.com/news/education-14130854",
            },
            {
              value: "£8.8m",
              label: "damages awarded against UK Companies House after a one-letter error wrongly recorded 124-year-old Taylor & Sons as wound up",
              sourceName: "High Court ruling, via IBTimes UK, 2015",
              sourceHref: "https://www.ibtimes.co.uk/government-compensates-wound-business-9m-after-companies-house-spelling-error-1485595",
            },
            {
              value: "42%",
              label: "of employers were not satisfied with the basic reading and writing skills of school and college leavers",
              sourceName: "CBI, via BBC News, 2011",
              sourceHref: "https://www.bbc.com/news/education-14130854",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The court-verified case is stranger than the anecdote. In 2009, UK Companies House recorded the 124-year-old Welsh engineering firm **Taylor & Sons** as wound up – the company actually in liquidation was *Taylor & Son*, no s. The record was corrected three days later, but the damage cascaded: the firm collapsed, taking roughly 250 jobs with it. In January 2015, the High Court held Companies House liable, and [the government paid £8.8m](https://www.ibtimes.co.uk/government-compensates-wound-business-9m-after-companies-house-spelling-error-1485595) for a single added letter.",
        },
        {
          type: "paragraph",
          text: "The pattern behind both stories: surface errors read as credibility signals. That applies beyond spelling – inconsistent capitalization in headlines sends the same message, which is why editors are just as strict about [sentence case versus title case](/blog/sentence-vs-title-case) as they are about spelling.",
        },
      ],
    },
    {
      id: "grade-level",
      heading: "Which Words Do Students Misspell at Each Grade Level?",
      tocLabel: "By grade level",
      blocks: [
        {
          type: "paragraph",
          text: "England is the only country in this article’s dataset with a *statutory* answer. The [UK National Curriculum’s English Appendix 1: Spelling](https://assets.publishing.service.gov.uk/media/5a7ccc06ed915d63cc65ce61/English_Appendix_1_-_Spelling.pdf) (2013) sets two lists of 100 words each – one for Years 3–4 (roughly US grades 2–3), one for Years 5–6 (grades 4–5) – explicitly described as “a mixture of words pupils frequently use in their writing and those which they often misspell.”",
        },
        {
          type: "table",
          headers: ["Level", "Sample statutory words", "Overlap with the adult list"],
          rows: [
            [
              "Years 3–4 (US grades 2–3)",
              "believe, business, calendar, February, grammar, separate, surprise",
              "“separate,” “believe,” “business,” and “calendar” are already on Oxford’s adult misspelling list",
            ],
            [
              "Years 5–6 (US grades 4–5)",
              "accommodate, embarrass, environment, government, restaurant, rhythm, conscience",
              "nearly all reappear in Oxford’s corpus data and Merriam-Webster’s list",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The overlap is the story: the words 9-year-olds drill are the same words adults still get wrong decades later. The US has no federal equivalent – “3rd grade spelling words” lists online trace back to curriculum vendors, not government sources. The strongest US research is [Graham, Harris & Loynachan’s Basic Spelling Vocabulary List](https://www.tandfonline.com/doi/abs/10.1080/00220671.1993.9941230) (Journal of Educational Research, 1993), which found that just 850 words, graded across grades 1–5, account for 80% of the words children use in their writing – master those and most spelling problems in practice disappear.",
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
              name: "The most common English misspellings (Oxford English Corpus analysis)",
              publisher: "Oxford Dictionaries / Lexico (archived)",
              year: "2009",
              href: "https://web.archive.org/web/20200108003932/https://www.lexico.com/grammar/common-misspellings",
            },
            {
              name: "Commonly Misspelled Words",
              publisher: "Merriam-Webster",
              year: "n.d.",
              href: "https://www.merriam-webster.com/grammar/commonly-misspelled-words",
            },
            {
              name: "Misspelled Words of the National Spelling Bee",
              publisher: "Merriam-Webster, with Scripps and Babbel",
              year: "2021",
              href: "https://www.merriam-webster.com/grammar/national-spelling-bee-misspelled-words",
            },
            {
              name: "Google reveals America's most misspelled words (Google Trends state map)",
              publisher: "CBS News",
              year: "2017",
              href: "https://www.cbsnews.com/news/google-americas-most-misspelled-words-spelling-bee/",
            },
            {
              name: "What are the most misspelled words in every state?",
              publisher: "NBC News",
              year: "2017",
              href: "https://www.nbcnews.com/news/us-news/what-are-most-misspelled-words-every-state-n766361",
            },
            {
              name: "Google releases each state's most commonly misspelled word",
              publisher: "U.S. News & World Report",
              year: "2018",
              href: "https://www.usnews.com/news/best-states/articles/2018-06-01/google-releases-each-states-most-commonly-misspelled-word",
            },
            {
              name: "Each State's Most Commonly Googled Misspelled Word",
              publisher: "AT&T Experts (Google Trends analysis)",
              year: "2021",
              href: "https://www.attexperts.com/news/each-states-most-commonly-googled-misspelled-word",
            },
            {
              name: "Mencap survey highlights Britain's poor spelling",
              publisher: "Mencap",
              year: "2012",
              href: "https://www.mencap.org.uk/news/article/mencap-survey-highlights-britains-poor-spelling",
            },
            {
              name: "US spelling survey (Ipsos MORI, 1,000 US adults)",
              publisher: "The Spelling Society",
              year: "2009",
              href: "https://www.spellingsociety.org/news-archive-2010",
            },
            {
              name: "Spelling mistakes 'cost millions' in lost online sales",
              publisher: "BBC News",
              year: "2011",
              href: "https://www.bbc.com/news/education-14130854",
            },
            {
              name: "Government compensates wound-up business £8.8m after Companies House spelling error",
              publisher: "IBTimes UK",
              year: "2015",
              href: "https://www.ibtimes.co.uk/government-compensates-wound-business-9m-after-companies-house-spelling-error-1485595",
            },
            {
              name: "National Curriculum in England, English Appendix 1: Spelling",
              publisher: "UK Department for Education",
              year: "2013",
              href: "https://assets.publishing.service.gov.uk/media/5a7ccc06ed915d63cc65ce61/English_Appendix_1_-_Spelling.pdf",
            },
            {
              name: "The Basic Spelling Vocabulary List (Graham, Harris & Loynachan)",
              publisher: "Journal of Educational Research",
              year: "1993",
              href: "https://www.tandfonline.com/doi/abs/10.1080/00220671.1993.9941230",
            },
            {
              name: "A Technique for Computer Detection and Correction of Spelling Errors (Damerau)",
              publisher: "Communications of the ACM",
              year: "1964",
              href: "https://dl.acm.org/doi/10.1145/363958.363994",
            },
            {
              name: "Techniques for Automatically Correcting Words in Text (Kukich)",
              publisher: "ACM Computing Surveys",
              year: "1992",
              href: "https://dl.acm.org/doi/10.1145/146370.146380",
            },
            {
              name: "Birkbeck spelling error corpus (Mitton)",
              publisher: "Oxford Text Archive",
              year: "1985",
              href: "https://ota.bodleian.ox.ac.uk/repository/xmlui/handle/20.500.12024/0643",
            },
            {
              name: "America's Most Misspelled Words (methodology criticism of search-based maps)",
              publisher: "Language Log",
              year: "2025",
              href: "https://languagelog.ldc.upenn.edu/nll/?p=69292",
            },
          ],
        },
      ],
    },
  ],
}
