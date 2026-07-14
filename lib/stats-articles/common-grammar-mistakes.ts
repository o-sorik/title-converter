import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

const LUNSFORD_2008_PDF = "http://stabler3010.pbworks.com/w/file/fetch/58546609/lunsford%20mistakes.pdf"
const CONNORS_LUNSFORD_1988 = "https://www.jstor.org/stable/357695"
const CAREERBUILDER_2018 =
  "https://www.prnewswire.com/news-releases/employers-share-their-most-outrageous-resume-mistakes-and-instant-deal-breakers-in-a-new-careerbuilder-study-300701888.html"
const GRAMMARLY_HARRIS_2022 = "https://www.businesswire.com/news/home/20220125005525/en/"
const NAEP_2011 = "https://nces.ed.gov/nationsreportcard/pubs/main2011/2012470.aspx"
const ACT_2024 =
  "https://www.act.org/content/dam/act/unsecured/documents/2024-act-national-graduating-class-profile-report.pdf"
const FORBES_GRAMMARLY_2013 =
  "https://www.forbes.com/sites/cherylsnappconner/2013/03/11/report-how-grammar-influences-your-income/"
const SLOAN_1990 = "https://www.troyspier.com/assets/files/bibliographies/teaching/sloan_errors.pdf"
const BBC_2011 = "https://www.bbc.co.uk/news/education-14130854"
const WEBSITE_PLANET_2019 = "https://www.websiteplanet.com/blog/grammar-report/"
const GRAMMARLY_TOP10_2022 =
  "https://www.grammarly.com/blog/academic-writing/top-10-student-writing-mistakes-finals-edition/"
const CAMBRIDGE_CLC_2020 =
  "https://www.cambridge.org/elt/blog/2020/03/02/understanding-common-learner-error-cambridge-learner-corpus/"
const NICHOLLS_2003 = "https://ucrel.lancs.ac.uk/publications/CL2003/papers/nicholls.pdf"

export const COMMON_GRAMMAR_MISTAKES_ARTICLE: WritingTipsArticle = {
  slug: "common-grammar-mistakes",
  tags: ["Writing Statistics", "Grammar 101", "Editing"],
  ctaWord: "common grammar mistakes",
  ctaText:
    "Capitalization errors are the fastest-rising mistake on the list – check your titles with the free Title Case Converter.",
  relatedSlugs: [
    "commonly-misspelled-words",
    "what-words-are-not-capitalized-in-a-title",
    "average-typing-speed",
    "average-reading-speed",
    "how-long-should-a-blog-post-be",
  ],
  faqItems: [
    {
      question: "What is the most common grammar mistake?",
      answer:
        "Using the wrong word. In Lunsford & Lunsford's 2008 national study of 877 college papers, wrong-word errors accounted for 13.7% of all errors found – more than any other category. Missing commas after introductory elements came second at 9.6%.",
    },
    {
      question: "How many hiring managers reject resumes with grammar errors?",
      answer:
        "77% of US hiring managers called typos and bad grammar an instant deal-breaker in CareerBuilder's 2018 survey of 1,023 hiring managers and HR professionals. That made grammar the #1 resume deal-breaker, more than double the next reason. An earlier 2013 wave of the same survey put the figure at 58%.",
    },
    {
      question: "Are grammar skills getting worse?",
      answer:
        "No. Comparative studies show college students made 2.11 errors per 100 words in 1917 and 2.45 in 2006 (2.30 excluding spelling) – essentially the same rate for nearly a century. The types of errors changed, but the overall rate did not.",
    },
    {
      question: "What are the most common comma mistakes?",
      answer:
        "The most common is a missing comma after an introductory element – 9.6% of all errors and the #2 mistake overall in the 2008 national study. Unnecessary commas, missing commas around nonrestrictive elements, missing commas in compound sentences, and comma splices also rank in the top 20. Together, those five comma errors make up about a quarter of all errors students make.",
    },
    {
      question: "What grammar mistakes do non-native English speakers make most?",
      answer:
        "It depends heavily on the learner's first language. The Cambridge Learner Corpus – over 50 million words of error-coded exam scripts – shows French speakers misspelling 'company' as 'compagny,' Spanish speakers writing 'confortable,' and Japanese speakers dropping articles. Errors are predictable enough by first language that Cambridge publishes separate mistake factsheets for eight of them.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "The most common grammar mistake in American college writing is using the wrong word – 13.7% of all errors found, according to [Lunsford & Lunsford's 2008 national study](" +
            LUNSFORD_2008_PDF +
            ") of 877 first-year papers sampled from colleges across the US. The same research delivers a bigger surprise: students today make errors at almost exactly the same rate as students in 1917 – they just make *different* ones. Here are the most common grammar mistakes, ranked by real data, plus what they cost in the real world.",
        },
        {
          type: "keyStats",
          items: [
            "**Wrong word** is the #1 error in college writing – **13.7%** of all errors in a national sample of 877 papers ([Lunsford & Lunsford, 2008](" +
              LUNSFORD_2008_PDF +
              "))",
            "Student error rates stayed between **2.11 and 2.45 errors per 100 words** from 1917 to 2006 – essentially flat for nearly a century ([Lunsford & Lunsford, 2008](" +
              LUNSFORD_2008_PDF +
              "))",
            "**77%** of hiring managers call typos and bad grammar an instant resume deal-breaker – the #1 reason to reject a candidate ([CareerBuilder, 2018](" +
              CAREERBUILDER_2018 +
              "))",
            "Poor communication costs US businesses up to **$1.2 trillion a year** – about **$12,506 per employee** ([Grammarly × The Harris Poll, 2022](" +
              GRAMMARLY_HARRIS_2022 +
              "))",
            "Only **24%** of US 8th and 12th graders write at or above the Proficient level ([NAEP, 2011](" +
              NAEP_2011 +
              "))",
            "**51%** of 2024 ACT-tested graduates met the English college-readiness benchmark, down from 58% in 2020 ([ACT, 2024](" +
              ACT_2024 +
              "))",
            "Professionals who were never promoted to director made **2.5× as many grammar errors** in their LinkedIn profiles as director-level peers ([Grammarly via Forbes, 2013](" +
              FORBES_GRAMMARLY_2013 +
              "))",
            "Teachers marked only **38%** of the errors that trained coders found in the same papers ([Lunsford & Lunsford, 2008](" +
              LUNSFORD_2008_PDF +
              "))",
            "Even professional magazine writers average **2.04 errors per 100 words** – barely fewer than college freshmen at 2.26 ([Sloan, 1990](" +
              SLOAN_1990 +
              "))",
          ],
        },
      ],
    },
    {
      id: "top-20-mistakes",
      heading: "What Are the 20 Most Common Grammar Mistakes?",
      tocLabel: "Top 20 mistakes",
      blocks: [
        {
          type: "paragraph",
          text: "The best data comes from the only national error censuses ever conducted. In 2006, [Andrea and Karen Lunsford](" +
            LUNSFORD_2008_PDF +
            ") had roughly 30 trained coders analyze 877 first-year papers, drawn from a stratified national sample of US two- and four-year colleges, against a 40-error rubric (published 2008). The top 15, with the share of all errors each one caused:",
        },
        {
          type: "table",
          headers: ["Rank", "Mistake", "Share of Errors", "❌ → ✅"],
          rows: [
            ["1", "Wrong word", "13.7%", "❌ The company *excepted* the offer. ✅ The company *accepted* the offer."],
            [
              "2",
              "Missing comma after an introductory element",
              "9.6%",
              "❌ After the meeting we revised the draft. ✅ After the meeting, we revised the draft.",
            ],
            [
              "3",
              "Incomplete or missing documentation",
              "7.1%",
              "❌ A quotation with no citation ✅ The same quotation followed by (Smith 24)",
            ],
            [
              "4",
              "Vague pronoun reference",
              "6.7%",
              "❌ When Lisa met Ana, she was nervous. ✅ Lisa was nervous when she met Ana.",
            ],
            [
              "5",
              "Spelling error (incl. homonyms)",
              "6.5%",
              "❌ Their is a *definately* better way. ✅ There is a definitely better way.",
            ],
            [
              "6",
              "Mechanical error with a quotation",
              "6.4%",
              "❌ She said “writing matters”. ✅ She said, “Writing matters.”",
            ],
            [
              "7",
              "Unnecessary comma",
              "5.2%",
              "❌ The tool, converts titles instantly. ✅ The tool converts titles instantly.",
            ],
            [
              "8",
              "Unnecessary or missing capitalization",
              "5.2%",
              "❌ my manager studied History at stanford. ✅ My manager studied history at Stanford.",
            ],
            ["9", "Missing word", "4.6%", "❌ She going to the office. ✅ She is going to the office."],
            [
              "10",
              "Faulty sentence structure",
              "4.4%",
              "❌ By revising early is how we hit deadlines. ✅ Revising early is how we hit deadlines.",
            ],
            [
              "11",
              "Missing comma with a nonrestrictive element",
              "3.8%",
              "❌ My car which is red needs service. ✅ My car, which is red, needs service.",
            ],
            [
              "12",
              "Unnecessary shift in verb tense",
              "3.8%",
              "❌ She opened the file and starts editing. ✅ She opened the file and started editing.",
            ],
            [
              "13",
              "Missing comma in a compound sentence",
              "3.6%",
              "❌ The draft was done but nobody reviewed it. ✅ The draft was done, but nobody reviewed it.",
            ],
            [
              "14",
              "Unnecessary or missing apostrophe (incl. its/it's)",
              "3.1%",
              "❌ The company lost it's lead. ✅ The company lost its lead.",
            ],
            [
              "15",
              "Fused (run-on) sentence",
              "3.0%",
              "❌ It's late we should ship it. ✅ It's late, so we should ship it.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Rounding out the top 20: comma splices (2.9%), pronoun-antecedent agreement (2.7%), poorly integrated quotations (2.7%), unnecessary or missing hyphens (2.5%), and sentence fragments (2.4%). Comma problems are the biggest error family by far – five of the top 20 are comma errors, and together they account for roughly a quarter of everything students get wrong.",
        },
        {
          type: "paragraph",
          text: "Modern tool data tells a similar story. [Grammarly's 2022 ranking](" +
            GRAMMARLY_TOP10_2022 +
            ") of student mistakes – drawn from its own editor, which reviews billions of words a month – puts spelling, run-ons, fragments, and the missing comma after an introductory phrase at the top. The academic census and the software logs converge on the same culprits.",
        },
      ],
    },
    {
      id: "has-grammar-gotten-worse",
      heading: "Has Grammar Actually Gotten Worse?",
      tocLabel: "Is grammar getting worse?",
      blocks: [
        {
          type: "paragraph",
          text: "No – and this is the most quotable finding in the entire literature. When [Lunsford & Lunsford (2008)](" +
            LUNSFORD_2008_PDF +
            ") lined up every comparable study going back to 1917, the error rate barely moved:",
        },
        {
          type: "barList",
          items: [
            { label: "1917 (Johnson, 198 papers)", percent: 86, display: "2.11 per 100 words" },
            { label: "1930 (Witty & Green, 170 papers)", percent: 91, display: "2.24 per 100 words" },
            { label: "1986 (Connors & Lunsford, 3,000 papers)", percent: 92, display: "2.26 per 100 words" },
            { label: "2006 (Lunsford & Lunsford, 877 papers)", percent: 100, display: "2.45 per 100 words" },
          ],
        },
        {
          type: "paragraph",
          text: "The 2006 figure drops to 2.30 per 100 words once spelling is excluded to match the earlier studies – “almost exactly the same as it has been during the last century,” in the authors' words. Their conclusion: student errors “are not more prevalent – they are only different.” Meanwhile the average first-year paper grew from 162 words in 1917 to 1,038 in 2006 – students now write six times as much at the same accuracy.",
        },
        {
          type: "paragraph",
          text: "What *did* change is which mistakes dominate. In the [1986 census](" +
            CONNORS_LUNSFORD_1988 +
            ") (Connors & Lunsford, published 1988), spelling outnumbered every other error by roughly 300% and was tracked separately. By 2006, spelling had fallen to #5 – and wrong word had jumped from #4 to #1. The 2008 paper attributes part of that swap to spell-checkers: the software fixes *definately* but happily replaces a misspelled “frantic” with “fanatic,” converting a spelling error into a wrong-word error.",
        },
        {
          type: "paragraph",
          text: "One more panic debunked in passing: the 2006 coders found almost no instances of texting shorthand like “gtg” or “imho” – or even smileys – in formal papers. Students switch registers just fine.",
        },
      ],
    },
    {
      id: "capitalization-errors-rising",
      heading: "Why Are Capitalization Errors Rising?",
      tocLabel: "Capitalization errors",
      blocks: [
        {
          type: "paragraph",
          text: "Capitalization is the clearest new arrival on the list. It didn't appear in the [1986 top 20](" +
            CONNORS_LUNSFORD_1988 +
            ") at all – but by 2006 “unnecessary or missing capitalization” was the [#8 error nationally](" +
            LUNSFORD_2008_PDF +
            "), with 1,168 instances (5.2% of all errors). It's also an old problem returning: capitalization was the #2 most common error back in Johnson's 1917 study.",
        },
        {
          type: "paragraph",
          text: "The 2008 paper blames distinctly digital habits: Word's autocapitalize firing after abbreviation periods and going uncorrected; brand names like eBay and iPod normalizing internal caps; and ad headlines – arguably the text students read most – modeling “seemingly random capitalization.” Students also capitalize whatever feels important: the study found papers capitalizing “Baseball” throughout, or “High School Diploma” mid-sentence.",
        },
        {
          type: "paragraph",
          text: "Those two habits map directly onto questions we cover in depth: school subjects and majors stay lowercase unless they're proper nouns ([do you capitalize majors?](/blog/do-you-capitalize-majors)), and “high school” is only capitalized as part of an official name ([is high school capitalized?](/blog/is-high-school-capitalized)). In titles, the confusion runs the other way – knowing [which words are *not* capitalized in a title](/blog/what-words-are-not-capitalized-in-a-title) is what separates clean headlines from random ones.",
        },
        {
          type: "paragraph",
          text: "The #19 error, hyphen misuse, has the same digital-era flavor – the study points to confusion between “sign-up sheet” and “sign up here,” and to two-part verbs written as “log-in.”",
        },
      ],
    },
    {
      id: "professional-cost",
      heading: "What Do Grammar Mistakes Cost Professionally?",
      tocLabel: "Professional cost",
      blocks: [
        {
          type: "paragraph",
          text: "Outside the classroom, the numbers get expensive. In [CareerBuilder's 2018 survey](" +
            CAREERBUILDER_2018 +
            ") of 1,023 US hiring managers and HR professionals, 77% named typos and bad grammar an instant resume deal-breaker – the #1 reason, more than double the runner-up (an unprofessional email address, at 35%). A [2013 wave](https://www.prnewswire.com/news-releases/careerbuilder-releases-study-of-common-and-not-so-common-resume-mistakes-that-can-cost-you-the-job-223251611.html) of the survey had already put automatic dismissal for typos at 58%.",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "77%",
              label: "of hiring managers call typos and bad grammar an instant resume deal-breaker (2018)",
              sourceName: "CareerBuilder",
              sourceHref: CAREERBUILDER_2018,
            },
            {
              value: "$1.2T",
              label: "estimated yearly cost of poor communication to US businesses (2022)",
              sourceName: "Grammarly × The Harris Poll",
              sourceHref: GRAMMARLY_HARRIS_2022,
            },
            {
              value: "$12,506",
              label: "cost of poor communication per employee, per year (2022)",
              sourceName: "Grammarly × The Harris Poll",
              sourceHref: GRAMMARLY_HARRIS_2022,
            },
            {
              value: "2.5×",
              label: "more grammar errors in LinkedIn profiles of professionals who were never promoted to director (2013)",
              sourceName: "Grammarly via Forbes",
              sourceHref: FORBES_GRAMMARLY_2013,
            },
          ],
        },
        {
          type: "paragraph",
          text: "The promotion link is striking. [Grammarly's 2013 study](" +
            FORBES_GRAMMARLY_2013 +
            ") of 100 LinkedIn profiles found that professionals who never reached director level made 2.5× as many grammar errors as director-level peers – and those promoted six to nine times in their first decade made 45% fewer errors than those promoted one to four times. Correlation, not causation, but the pattern held across the sample.",
        },
        {
          type: "paragraph",
          text: "Sales feel it too. UK entrepreneur Charles Duncombe told the [BBC in 2011](" +
            BBC_2011 +
            ") that a single spelling mistake can cut online sales in half – fixing one typo on his tightsplease.co.uk site doubled revenue per visitor. That's one company's internal before-and-after, not a controlled study, but it remains the canonical citation. A small 2019 [Website Planet experiment](" +
            WEBSITE_PLANET_2019 +
            ") pointed the same way: landing pages with typos saw bounce rates 85% higher, and clean Google ads drew up to 70% more clicks than versions with errors (the authors themselves call it “a quick test”).",
        },
      ],
    },
    {
      id: "what-teachers-mark",
      heading: "Which Mistakes Do Teachers Actually Mark?",
      tocLabel: "What teachers mark",
      blocks: [
        {
          type: "paragraph",
          text: "Here's the uncomfortable part: teachers catch less than half of these errors. In the [1986 study](" +
            CONNORS_LUNSFORD_1988 +
            "), teachers marked only 43% of the errors that trained raters found in the same papers; by [2006](" +
            LUNSFORD_2008_PDF +
            ") that had slipped to 38%. Which errors get flagged is revealing – the most-marked error of 1986 was its/it's confusion, marked 64% of the time even though it was the *least frequent* error in the top 20:",
        },
        {
          type: "barList",
          items: [
            { label: "Its/it's confusion (1986)", percent: 64, display: "64% marked" },
            { label: "Spelling errors (2006)", percent: 54, display: "54% marked" },
            { label: "Apostrophe errors (2006)", percent: 54, display: "54% marked" },
            { label: "Wrong word (2006)", percent: 48, display: "48% marked" },
            { label: "Quotation mechanics (2006)", percent: 47, display: "47% marked" },
            { label: "Missing documentation (2006)", percent: 46, display: "46% marked" },
            { label: "Capitalization (2006)", percent: 42, display: "42% marked" },
            { label: "All errors, average (2006)", percent: 38, display: "38% marked" },
          ],
        },
        {
          type: "paragraph",
          text: "The takeaway: frequency and judgment are two different rankings. Its/it's barely registers by volume, but it's the error readers punish hardest – which is exactly why it's worth fixing first.",
        },
      ],
    },
    {
      id: "non-native-speakers",
      heading: "What Mistakes Do Non-Native Speakers Make?",
      tocLabel: "Non-native speakers",
      blocks: [
        {
          type: "paragraph",
          text: "For English learners, the biggest dataset is the [Cambridge Learner Corpus](" +
            CAMBRIDGE_CLC_2020 +
            ") – over 50 million words of Cambridge exam scripts, error-coded by an expert team (as described by Cambridge University Press in 2020). The [2003 technical paper](" +
            NICHOLLS_2003 +
            ") on its coding system reports scripts from learners of 86 different first languages.",
        },
        {
          type: "paragraph",
          text: "The headline finding: learner errors are predictable from the first language. Per [Cambridge's own corpus examples](" +
            CAMBRIDGE_CLC_2020 +
            ") (2020), French speakers misspell *company* as “compagny” (from French *compagnie*), Spanish speakers write “confortable,” and Japanese speakers drop articles – “visit Tate Modern museum.” The patterns are consistent enough that Cambridge publishes free “common mistakes” factsheets for eight first languages, from Arabic to Korean.",
        },
        {
          type: "paragraph",
          text: "That makes the learner list genuinely different from the native-speaker list above: articles, prepositions, and L1-driven spellings dominate, while native speakers trip over wrong words, commas, and capitalization. Same language, two different error profiles.",
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
              name: "“Mistakes Are a Fact of Life”: A National Comparative Study",
              publisher: "College Composition and Communication (NCTE)",
              year: "2008",
              href: LUNSFORD_2008_PDF,
            },
            {
              name: "Frequency of Formal Errors in Current College Writing",
              publisher: "College Composition and Communication (NCTE)",
              year: "1988",
              href: CONNORS_LUNSFORD_1988,
            },
            {
              name: "Frequency of Errors in Essays by College Freshmen and by Professional Writers",
              publisher: "College Composition and Communication (NCTE)",
              year: "1990",
              href: SLOAN_1990,
            },
            {
              name: "The Nation's Report Card: Writing 2011",
              publisher: "National Center for Education Statistics",
              year: "2012",
              href: NAEP_2011,
            },
            {
              name: "National Profile Report, Graduating Class 2024",
              publisher: "ACT",
              year: "2024",
              href: ACT_2024,
            },
            {
              name: "Employers Share Their Most Outrageous Resume Mistakes and Instant Deal Breakers",
              publisher: "CareerBuilder / The Harris Poll",
              year: "2018",
              href: CAREERBUILDER_2018,
            },
            {
              name: "The State of Business Communication",
              publisher: "Grammarly & The Harris Poll",
              year: "2022",
              href: GRAMMARLY_HARRIS_2022,
            },
            {
              name: "Report: How Grammar Influences Your Income",
              publisher: "Forbes",
              year: "2013",
              href: FORBES_GRAMMARLY_2013,
            },
            {
              name: "Spelling Mistakes ‘Cost Millions’ in Lost Online Sales",
              publisher: "BBC News",
              year: "2011",
              href: BBC_2011,
            },
            {
              name: "Your Typo Is Costing You Extra on Your Google Ads Spend",
              publisher: "Website Planet",
              year: "2019",
              href: WEBSITE_PLANET_2019,
            },
            {
              name: "Top 10 Student Writing Mistakes: Finals Edition",
              publisher: "Grammarly",
              year: "2022",
              href: GRAMMARLY_TOP10_2022,
            },
            {
              name: "Understanding Common Learner Errors and the Cambridge Learner Corpus",
              publisher: "Cambridge University Press ELT",
              year: "2020",
              href: CAMBRIDGE_CLC_2020,
            },
            {
              name: "The Cambridge Learner Corpus: Error Coding and Analysis",
              publisher: "Corpus Linguistics 2003 (UCREL, Lancaster University)",
              year: "2003",
              href: NICHOLLS_2003,
            },
          ],
        },
      ],
    },
  ],
}
