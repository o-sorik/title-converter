import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const AVERAGE_TYPING_SPEED_ARTICLE: WritingTipsArticle = {
  slug: "average-typing-speed",
  tags: ["Writing Statistics", "Typing", "Productivity"],
  ctaWord: "average typing speed",
  ctaText:
    "Typed your draft at full speed? Formatting is the slow part – paste your headline into our free Title Case Converter and it applies AP, APA, Chicago, or MLA capitalization automatically.",
  relatedSlugs: [
    "average-reading-speed",
    "how-long-should-a-blog-post-be",
    "commonly-misspelled-words",
    "common-grammar-mistakes",
    "how-many-words-in-a-novel",
  ],
  faqItems: [
    {
      question: "What is a good typing speed?",
      answer:
        "Anything above 52 WPM is above average, based on Aalto University's 2018 study of 168,960 typists. 60 to 80 WPM is a genuinely good speed for professional work, and 78 WPM or higher puts you in the fastest 10% of typists. For reference, US federal clerk-typist jobs require just 40 WPM under the OPM qualification standard.",
    },
    {
      question: "Is 70 WPM fast?",
      answer:
        "Yes. In Aalto University's 2018 dataset the top 10% of typists started at about 78 WPM, so 70 WPM lands you roughly in the top 15%. In Ostrach's 1997 analysis of 3,475 clerical job applicants, 65 WPM was already the top 8%. Typing 70 WPM is comfortably faster than the vast majority of people.",
    },
    {
      question: "What is the average typing speed for a 14-year-old?",
      answer:
        "There is no large-scale study of teenage typing on physical keyboards. On smartphones, typists aged 10 to 19 average 39.6 WPM, the fastest of any age group, per the Palin et al. 2019 study of 37,370 volunteers. Typing.com's platform guidance suggests around 30 WPM as a realistic target for keyboard learners aged 12 to 16.",
    },
    {
      question: "Is 40 WPM a good typing speed?",
      answer:
        "It is a workable, employable speed but slightly below average. 40 WPM is the exact minimum for US federal clerk-typist positions per the OPM standard, and it matches the mean of Ostrach's 1997 clerical-applicant data. The modern average from Aalto University's 2018 study is about 52 WPM, so 40 WPM leaves room to improve.",
    },
    {
      question: "What is the fastest typing speed ever recorded?",
      answer:
        "The fastest verified modern score is 281.85 WPM sustained for 60 seconds, set on Monkeytype's English leaderboard in May 2026, with a 15-second burst of 318.99 WPM by the same typist. On typewriters, Stella Pajunas was reported at 216 WPM in 1946, and Barbara Blackburn's Guinness-era listing was 150 WPM sustained for 50 minutes.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "The average typing speed is **52 words per minute (WPM)** on a physical keyboard, according to [the largest typing study ever conducted](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf) – 168,960 people and 136 million keystrokes, analyzed by Aalto University researchers in 2018. On smartphones, the average drops to 36.2 WPM ([Palin et al., 2019](https://userinterfaces.aalto.fi/typing37k/resources/Mobile_typing_study.pdf)). If you type faster than 78 WPM, you are already in the fastest 10% of typists.",
        },
        {
          type: "keyStats",
          items: [
            "**52 WPM** – average typing speed on a physical keyboard, measured across 168,960 people in 2018 ([Dhakal et al., Aalto University](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf))",
            "**36.2 WPM** – average typing speed on a smartphone, from 37,370 volunteers in 2019 ([Palin et al.](https://userinterfaces.aalto.fi/typing37k/resources/Mobile_typing_study.pdf))",
            "**78+ WPM** puts you in the top 10% of typists; that group averages 89.6 WPM (2018, [Dhakal et al.](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf))",
            "**40 WPM** – the minimum typing speed for US federal clerk-typist positions ([US Office of Personnel Management](https://www.opm.gov/policy-data-oversight/classification-qualifications/general-schedule-qualification-standards/0300/office-automation-clerical-and-assistance-series-0326/), standing standard)",
            "**225 WPM** at 95%+ accuracy – the certification requirement for court reporters ([NCRA RPR exam](https://www.ncra.org/certification/NCRA-Certifications/registered-professional-reporter), current)",
            "**19 WPM** – how fast average users compose original text, versus 33 WPM when copying (1999, [Karat et al.](https://doi.org/10.1145/302979.303160))",
            "**281.85 WPM** – the fastest verified 60-second typing score, set in May 2026 ([Monkeytype leaderboard](https://monkeytype.com/leaderboards))",
            "**1.17%** – the average uncorrected error rate on desktop; faster typists are also *more* accurate, not less (2018, [Dhakal et al.](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf))",
            "**~5 WPM** – the entire speed gap between people with and without formal typing training: 54.4 vs 49.0 WPM (2018, [Dhakal et al.](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf))",
          ],
        },
      ],
    },
    {
      id: "good-typing-speed",
      heading: "What Is a Good Typing Speed?",
      tocLabel: "What's a good speed?",
      blocks: [
        {
          type: "paragraph",
          text: "A good typing speed is anything above the 52 WPM average; 60–80 WPM is strong for professional work, and 80+ WPM is elite. The bands below combine three independent distributions: [Dhakal et al.'s 2018 study](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf) of 168,960 typists, [Ostrach's 1997 analysis](https://cdn.shopify.com/s/files/1/0156/9110/files/Average-OrbiTouch-Typing-Speed.pdf) of 3,475 clerical job applicants, and [Ratatype's April 2026 analysis](https://www.ratatype.com/typing-tips/3004-what-typing-speed-is-considered-good-real-data-from-506000-tests/) of 506,024 typing tests.",
        },
        {
          type: "table",
          headers: ["WPM", "Rating", "Where that puts you"],
          rows: [
            [
              "Under 26",
              "Slow",
              "Bottom 10% of typists, who average 20.9 WPM ([Dhakal et al., 2018](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf))",
            ],
            [
              "30–45",
              "Average",
              "Median of 35 WPM in [Ratatype's 2026 data](https://www.ratatype.com/typing-tips/3004-what-typing-speed-is-considered-good-real-data-from-506000-tests/); mean of 40 WPM in [Ostrach's 1997 data](https://cdn.shopify.com/s/files/1/0156/9110/files/Average-OrbiTouch-Typing-Speed.pdf)",
            ],
            [
              "46–60",
              "Above average",
              "56 WPM was the top 20% of clerical applicants ([Ostrach, 1997](https://cdn.shopify.com/s/files/1/0156/9110/files/Average-OrbiTouch-Typing-Speed.pdf)); 60+ WPM is the top ~5% of test takers ([Ratatype, 2026](https://www.ratatype.com/typing-tips/3004-what-typing-speed-is-considered-good-real-data-from-506000-tests/))",
            ],
            [
              "61–80",
              "Fast",
              "65 WPM = top 8% ([Ostrach, 1997](https://cdn.shopify.com/s/files/1/0156/9110/files/Average-OrbiTouch-Typing-Speed.pdf)); 78+ WPM = top 10% ([Dhakal et al., 2018](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf))",
            ],
            [
              "80–100",
              "Very fast",
              "Top 1–5% of typists; 80+ WPM was the top ~1% of Ratatype's 506,024 tests ([2026](https://www.ratatype.com/typing-tips/3004-what-typing-speed-is-considered-good-real-data-from-506000-tests/))",
            ],
            [
              "100+",
              "Elite",
              "Consistently topping 100 WPM is where formal touch typing starts to pay off ([Feit et al., 2016](https://userinterfaces.aalto.fi/how-we-type/))",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "For employability, the clearest official anchor is the [US Office of Personnel Management standard](https://www.opm.gov/policy-data-oversight/classification-qualifications/general-schedule-qualification-standards/0300/office-automation-clerical-and-assistance-series-0326/): federal clerk-typist and office automation positions require 40 WPM. If you can type 40 WPM, you meet the US government's bar for typing-focused clerical work.",
        },
        {
          type: "paragraph",
          text: "One counterintuitive finding: technique matters less than you'd think. The 2018 Aalto study found that typists using 9–10 fingers averaged about 57 WPM versus about 40 WPM for those using 1–2 fingers – but self-taught typists using just 5–6 fingers reached speeds [comparable to trained touch typists](https://userinterfaces.aalto.fi/how-we-type/) in the group's 2016 motion-capture study.",
        },
      ],
    },
    {
      id: "by-age",
      heading: "What Is the Average Typing Speed by Age?",
      tocLabel: "Average speed by age",
      blocks: [
        {
          type: "paragraph",
          text: "The only large-scale measured age data comes from smartphones: [Palin et al.'s 2019 study](https://userinterfaces.aalto.fi/typing37k/resources/Mobile_typing_study.pdf) of 37,370 volunteers found that typing speed peaks in the teens and declines steadily with age. Every gap between age groups below is statistically significant.",
        },
        {
          type: "barList",
          items: [
            { label: "Ages 10–19", percent: 100, display: "39.6 WPM" },
            { label: "Ages 20–29", percent: 92, display: "36.5 WPM" },
            { label: "Ages 30–39", percent: 81, display: "32.2 WPM" },
            { label: "Ages 40–49", percent: 73, display: "28.9 WPM" },
            { label: "Ages 50–59", percent: 66, display: "26.3 WPM" },
          ],
        },
        {
          type: "paragraph",
          text: "Note that these are smartphone numbers – no comparable large-scale desktop-by-age dataset exists. The big 2018 desktop study skewed young (mean age 24.5) and didn't publish per-age breakdowns, so treat any \"desktop WPM by age\" table you see elsewhere with suspicion.",
        },
        {
          type: "paragraph",
          text: "For kids on keyboards, [Typing.com's platform guidance](https://www.typing.com/blog/how-fast-typing-speed-kids/) – a recommendation drawn from student lessons, not a measured average – suggests about 15 WPM for beginners aged 6–11 and about 30 WPM for ages 12–16. And despite what many typing curricula claim, [Common Core sets no WPM target at all](https://www.thecorestandards.org/ELA-Literacy/W/4/): the standards require typing one, two, and three pages \"in a single sitting\" by grades 4, 5, and 6 (2010).",
        },
      ],
    },
    {
      id: "mobile-vs-keyboard",
      heading: "How Much Slower Is Typing on a Phone?",
      tocLabel: "Mobile vs keyboard",
      blocks: [
        {
          type: "paragraph",
          text: "About 15 WPM slower. The comparison is unusually clean because both numbers come from the same Aalto research group using the identical 15-sentence transcription test:",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "52 WPM",
              label: "Average on a physical keyboard, 168,960 typists (2018)",
              sourceName: "Dhakal et al., 2018",
              sourceHref: "https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf",
            },
            {
              value: "36.2 WPM",
              label: "Average on a smartphone, 37,370 typists (2019)",
              sourceName: "Palin et al., 2019",
              sourceHref: "https://userinterfaces.aalto.fi/typing37k/resources/Mobile_typing_study.pdf",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Phones also produce more mistakes: the uncorrected error rate is **2.34% on mobile versus 1.17% on desktop** ([Palin et al., 2019](https://userinterfaces.aalto.fi/typing37k/resources/Mobile_typing_study.pdf)). How you hold the phone matters too – the 74% of people who type with two thumbs average 38 WPM, while one-finger typists manage about 29 WPM.",
        },
        {
          type: "paragraph",
          text: "Smart features cut both ways. In the same 2019 dataset, autocorrect users were the fastest group at 43.4 WPM, but people who relied on word prediction typed roughly 10 WPM *slower* than autocorrect users – pausing to scan suggestions costs more time than it saves.",
        },
      ],
    },
    {
      id: "by-profession",
      heading: "What Typing Speed Do Different Jobs Require?",
      tocLabel: "Speed by profession",
      blocks: [
        {
          type: "paragraph",
          text: "Official, documented typing requirements are rarer than typing blogs suggest. Here are the ones that actually exist:",
        },
        {
          type: "table",
          headers: ["Role", "Required or observed speed", "Source"],
          rows: [
            [
              "Court reporter (RPR certification)",
              "225 WPM testimony, 200 WPM jury charge, 180 WPM literary – all at 95%+ accuracy",
              "[NCRA certification requirements](https://www.ncra.org/certification/NCRA-Certifications/registered-professional-reporter) (current)",
            ],
            [
              "US federal clerk-typist / office automation",
              "40 WPM minimum",
              "[US Office of Personnel Management](https://www.opm.gov/policy-data-oversight/classification-qualifications/general-schedule-qualification-standards/0300/office-automation-clerical-and-assistance-series-0326/) (standing standard)",
            ],
            [
              "Secretaries and admin roles",
              "Up to 60 WPM (platform guidance, not a measured average)",
              "[Typing.com](https://www.typing.com/blog/how-fast-typing-speed-kids/) (current)",
            ],
            [
              "Typewriter-era professional typists",
              "60–75 WPM observed in studies from the 1930s–1980s",
              "Cited in [Dhakal et al., 2018](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf)",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The court reporter number deserves an asterisk: 225 WPM is achieved on a stenotype machine, which records whole syllables and words in single chorded strokes – no one sustains that on a QWERTY keyboard.",
        },
        {
          type: "paragraph",
          text: "And an honest gap: the \"programmers type 50–70 WPM\" and \"data entry requires 8,000–12,000 keystrokes per hour\" figures that circulate online have no traceable primary study behind them. We searched; every citation chains back to typing blogs quoting each other. No credible measurement of professional developers' average typing speed exists.",
        },
      ],
    },
    {
      id: "forty-wpm-myth",
      heading: "Where Does the \"40 WPM Average\" Claim Come From?",
      tocLabel: "The 40 WPM myth",
      blocks: [
        {
          type: "paragraph",
          text: "From a 1997 staffing-agency report. Nearly every article claiming \"the average typing speed is 40 WPM\" traces back to [Typing Speed: How Fast Is Average](https://cdn.shopify.com/s/files/1/0156/9110/files/Average-OrbiTouch-Typing-Speed.pdf) by Teresia Ostrach of Five Star Staffing – an analysis of 3,475 clerical job applicants tested in Orlando, Florida between 1993 and 1997. The mean was 40 WPM, the median 38, the mode just 31.",
        },
        {
          type: "paragraph",
          text: "It's a real study with real data, but three caveats matter. The sample was US clerical job seekers only. The test disabled the backspace key, which no modern typing test does. And the data is now roughly 30 years old – collected before most people typed daily.",
        },
        {
          type: "paragraph",
          text: "The modern 52 WPM figure from [Dhakal et al., 2018](https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf) skews in the *opposite* direction: its 168,960 participants were self-selected typing-test takers, mostly young (mean age 24.5), and 72% had taken typing training. Meanwhile [Ratatype's April 2026 analysis](https://www.ratatype.com/typing-tips/3004-what-typing-speed-is-considered-good-real-data-from-506000-tests/) of 506,024 tests – a population with many beginners actively practicing – found a median of about 35 WPM.",
        },
        {
          type: "paragraph",
          text: "**The honest answer:** most adults fall somewhere in the 40–55 WPM band. The number you get depends on who is being measured – 1990s job applicants, 2020s typing-test enthusiasts, or learners mid-practice.",
        },
      ],
    },
    {
      id: "world-records",
      heading: "What Is the Fastest Typing Speed Ever Recorded?",
      tocLabel: "World records",
      blocks: [
        {
          type: "paragraph",
          text: "The fastest verified modern score is **281.85 WPM sustained for 60 seconds**, set in May 2026 by the user \"rocket\" at 96.3% accuracy on [Monkeytype's all-time English leaderboard](https://monkeytype.com/leaderboards). The same typist holds the 15-second record at 318.99 WPM with 99.0% accuracy. These are platform-verified scores, checked live against Monkeytype's public API in July 2026.",
        },
        {
          type: "paragraph",
          text: "The typewriter era has two famous names. Stella Pajunas was [reported at 216 WPM in 1946](https://www.ratatype.com/typing-tips/average-typing-speed-infographic/) on an IBM electric typewriter – a one-minute burst that predates modern verification, so treat it as \"reported,\" not verified.",
        },
        {
          type: "paragraph",
          text: "Then there's the Barbara Blackburn story, which almost every typing article gets wrong. The widely repeated claim that she \"typed 212 WPM, a Guinness World Record\" is misleading: [Guinness actually listed her at 170 WPM peak and 150 WPM sustained for 50 minutes](https://en.wikipedia.org/wiki/Barbara_Blackburn_(typist)) on a Dvorak keyboard. The 212 figure comes from her own claim in a 1985 Seattle Times interview and was never independently verified. Guinness dropped electric and computer typing records entirely from its 1987 edition, saying such records \"cannot be compared with any accuracy.\"",
        },
      ],
    },
    {
      id: "typing-vs-productivity",
      heading: "Does Typing Faster Make You a Faster Writer?",
      tocLabel: "Speed vs productivity",
      blocks: [
        {
          type: "paragraph",
          text: "Only up to a point – because writing is limited by thinking, not fingers. In a classic 1999 IBM study, [Karat et al.](https://doi.org/10.1145/302979.303160) found average users typed about **33 WPM when copying text but only about 19 WPM when composing** original sentences. Even the fastest group managed just 40 WPM while composing. Once your typing comfortably outruns your thoughts, extra WPM stops converting into extra output.",
        },
        {
          type: "paragraph",
          text: "Dictation shows the same pattern. People speak at around 105 WPM raw, but in the 1999 study the effective rate collapsed to about 25 WPM once users fixed recognition errors. A 2018 Stanford-led study found modern speech recognition on phones hit [153 WPM versus 52 WPM for keyboard entry](https://arxiv.org/abs/1608.07323) – 2.9 times faster for short messages – though dictated text still ended with slightly more residual errors.",
        },
        {
          type: "paragraph",
          text: "The practical takeaway: pushing from 40 to 60 WPM saves real time on transcription-like work – notes, emails you've already composed in your head, data entry. For original writing, the bigger wins come from removing friction elsewhere in the workflow: knowing your style rules cold, like [which words stay lowercase in a title](/blog/what-words-are-not-capitalized-in-a-title), or settling once whether your headings use [sentence case or title case](/blog/sentence-vs-title-case) instead of re-deciding every time.",
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
              name: "Observations on Typing from 136 Million Keystrokes (Dhakal, Feit, Kristensson & Oulasvirta)",
              publisher: "CHI 2018, ACM / Aalto University",
              year: "2018",
              href: "https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf",
            },
            {
              name: "How Do People Type on Mobile Devices? Observations from a Study with 37,000 Volunteers (Palin, Feit, Kim, Kristensson & Oulasvirta)",
              publisher: "MobileHCI 2019, ACM",
              year: "2019",
              href: "https://userinterfaces.aalto.fi/typing37k/resources/Mobile_typing_study.pdf",
            },
            {
              name: "How We Type: Movement Strategies and Performance in Everyday Typing (Feit, Weir & Oulasvirta)",
              publisher: "CHI 2016, ACM / Aalto University",
              year: "2016",
              href: "https://userinterfaces.aalto.fi/how-we-type/",
            },
            {
              name: "Typing Speed: How Fast Is Average (Teresia R. Ostrach)",
              publisher: "Five Star Staffing, Orlando FL",
              year: "1997",
              href: "https://cdn.shopify.com/s/files/1/0156/9110/files/Average-OrbiTouch-Typing-Speed.pdf",
            },
            {
              name: "Patterns of Entry and Correction in Large Vocabulary Continuous Speech Recognition Systems (Karat, Halverson, Horn & Karat)",
              publisher: "CHI 1999, ACM / IBM",
              year: "1999",
              href: "https://doi.org/10.1145/302979.303160",
            },
            {
              name: "Comparing Speech and Keyboard Text Entry for Short Messages on Touchscreen Phones (Ruan, Wobbrock, Liou, Ng & Landay)",
              publisher: "Proc. ACM IMWUT, Stanford / University of Washington",
              year: "2018",
              href: "https://arxiv.org/abs/1608.07323",
            },
            {
              name: "What Typing Speed Is Considered Good? Real Data from 506,000 Tests",
              publisher: "Ratatype",
              year: "2026",
              href: "https://www.ratatype.com/typing-tips/3004-what-typing-speed-is-considered-good-real-data-from-506000-tests/",
            },
            {
              name: "Registered Professional Reporter (RPR) Certification Requirements",
              publisher: "National Court Reporters Association",
              year: "2026",
              href: "https://www.ncra.org/certification/NCRA-Certifications/registered-professional-reporter",
            },
            {
              name: "Office Automation Clerical and Assistance Series, GS-0326 – Qualification Standards",
              publisher: "US Office of Personnel Management",
              year: "1990",
              href: "https://www.opm.gov/policy-data-oversight/classification-qualifications/general-schedule-qualification-standards/0300/office-automation-clerical-and-assistance-series-0326/",
            },
            {
              name: "How to Know How Fast Your Students Should Be Typing",
              publisher: "Typing.com",
              year: "2026",
              href: "https://www.typing.com/blog/how-fast-typing-speed-kids/",
            },
            {
              name: "Common Core State Standards, ELA-Literacy W.4.6 / W.5.6 / W.6.6",
              publisher: "Common Core State Standards Initiative",
              year: "2010",
              href: "https://www.thecorestandards.org/ELA-Literacy/W/4/",
            },
            {
              name: "All-Time English Typing Leaderboards (queried via public API, July 2026)",
              publisher: "Monkeytype",
              year: "2026",
              href: "https://monkeytype.com/leaderboards",
            },
            {
              name: "Barbara Blackburn (Typist) – with Seattle Times and Guinness edition citations",
              publisher: "Wikipedia",
              year: "2026",
              href: "https://en.wikipedia.org/wiki/Barbara_Blackburn_(typist)",
            },
          ],
        },
      ],
    },
  ],
}
