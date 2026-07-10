import type { DoNotExample, FAQItem } from "@/lib/article-content"

export interface GenCapRuleBlock {
  capitalizeRules: string[]
  lowercaseRules: string[]
  tip?: string
}

export interface GenCapArticle {
  slug: string
  word: string
  answerVariant?: "quick-answer" | "it-depends"
  answerBox: string

  whenHeading: string
  whenBody: string

  ruleBlockHeading: string
  ruleBlock: GenCapRuleBlock

  styleComparisonHeading?: string
  styleComparisonBody?: string

  doExamples: string[]
  doNotExamples: DoNotExample[]

  edgeCasesHeading: string
  edgeCasesBody: string
  edgeCaseItems: string[]

  faqItems: FAQItem[]

  ctaWord: string
  ctaText?: string

  relatedSlugs: string[]
}

export const GEN_CAP_ARTICLES: GenCapArticle[] = [
  {
    slug: "is-president-capitalized",
    word: "President",
    answerVariant: "it-depends",
    answerBox: `It depends on how you use it. Capitalize "president" when it appears as a formal title directly before a person's name – President Lincoln – or when it replaces a specific person's name in a formal context. Keep it lowercase when you're talking about the role in general terms – the president spoke to reporters.`,

    whenHeading: `When to Capitalize "President"`,
    whenBody: `"President" follows the same rule as other titles like "senator," "professor," and "mayor." It gets a capital letter when it works as part of someone's name – essentially functioning as a title attached to a specific individual.\n\nWrite President Biden addressed Congress the same way you'd write Dr. Smith called the office. The title is doing the job of a name component, not just describing a role.\n\nWhere this gets tricky is when "president" appears without a name. AP style and Chicago style handle this differently, and the distinction matters if you're writing for a publication or academic paper.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `It's a title before a name: President Obama signed the bill.`,
        `It replaces a specific person's name in formal writing: The President will address the nation tonight. (AP style)`,
        `It's part of an official title: the President of the United States`,
        `It starts a sentence (like any word)`,
      ],
      lowercaseRules: [
        `It describes the role generally: She hopes to become president someday.`,
        `It follows a name: Barack Obama, president of the United States, gave a speech. (AP style)`,
        `It refers to multiple people: Three presidents attended the ceremony.`,
        `It's used informally: The president held a press conference.`,
      ],
      tip: `If you can replace "president" with "leader" and the sentence still works the same way, it's probably generic – keep it lowercase.`,
    },

    styleComparisonHeading: `AP Style vs. Chicago Style`,
    styleComparisonBody: `AP and Chicago agree on the basics – capitalize before a name, lowercase after – but they split on one specific case.\n\nAP style capitalizes "President" when it stands alone as a clear reference to the current U.S. president in formal contexts: The President issued a statement. This is common in news writing where the reader knows exactly who "the President" refers to.\n\nChicago style is stricter. It lowercases "president" whenever it appears without a name directly attached, even when referring to a specific person: The president issued a statement. Most academic and book publishing follows Chicago here.\n\nIf you're not sure which to follow: AP for journalism and news writing, Chicago for books and academic papers. For blog posts, emails, and everyday writing, either works – just be consistent.`,

    doExamples: [
      `President Kennedy visited Dallas in November 1963.`,
      `The board elected Mariana Silva as president.`,
      `Have you read about the president's new policy?`,
      `The President of France met with German officials. (AP formal)`,
    ],

    doNotExamples: [
      {
        text: `The company president Smith announced layoffs.`,
        reason: `Missing comma or consistent title treatment. Write "Company President Smith" or "the company president, Smith, …"`,
      },
      {
        text: `She became President of the chess club.`,
        reason: `Organizational titles for clubs and groups are not formal government titles – lowercase "president."`,
      },
      {
        text: `Several Presidents have supported this policy.`,
        reason: `Never capitalize a title that refers to multiple people generically.`,
      },
    ],

    edgeCasesHeading: `Edge Cases Worth Knowing`,
    edgeCasesBody: `These are the scenarios where writers most often get tripped up. Each one follows the same underlying logic, but the surface form is different enough to cause hesitation.`,
    edgeCaseItems: [
      `Former presidents. The title stays capitalized before the name even after someone leaves office: Former President Carter or President Carter. Without the name, lowercase: the former president.`,
      `Vice president. Same rules apply. Capitalize before a name (Vice President Harris), lowercase when generic (the vice president's office). "Vice president" is two words, no hyphen.`,
      `Company presidents. Corporate titles follow the same pattern but are more often lowercase in running text. Company President Jane Doe announced the merger works, but Jane Doe, president of Acme Corp., announced the merger is the more common AP news style.`,
      `Other countries. The rules don't change based on country. President Macron gets a capital letter just like President Biden. The lowercase rule for generic use also applies: the French president addressed parliament.`,
    ],

    faqItems: [
      {
        question: `Is "president" a proper noun?`,
        answer: `Not by itself. "President" is a common noun that becomes part of a proper noun when used as a title before a name. Think of it like "lake" – it's lowercase on its own but capitalized in "Lake Michigan."`,
      },
      {
        question: `Do you capitalize "president" in a title or heading?`,
        answer: `In title case, yes – capitalize "president" regardless of how it's used in the sentence. Title case rules override the general capitalization rule. In sentence case, follow the normal rules described above.`,
      },
      {
        question: `Is "Mr. President" capitalized?`,
        answer: `Yes. When "President" is used as a direct form of address, it's capitalized: Thank you, Mr. President. This is true for all titles used as forms of address.`,
      },
      {
        question: `Should I capitalize "presidential"?`,
        answer: `No. Adjective forms of titles are almost always lowercase: presidential election, presidential suite, presidential candidate. The only exception is when it's part of an official name, like the Presidential Medal of Freedom.`,
      },
      {
        question: `Is "commander in chief" capitalized?`,
        answer: `Only before a name or when used as an official title referring to a specific person: Commander in Chief Biden. Otherwise, lowercase: the commander in chief. No hyphens in formal style (AP and Chicago agree).`,
      },
    ],

    ctaWord: `President Biden Addresses the Nation`,
    ctaText: `Try the free Title Case Converter to check capitalization in your titles and headings.`,

    relatedSlugs: ["is-constitution-capitalized", "is-god-capitalized", "do-you-capitalize-seasons", "is-professor-capitalized"],
  },

  {
    slug: "do-you-capitalize-seasons",
    word: "Seasons",
    answerVariant: "quick-answer",
    answerBox: `No – seasons are not capitalized in standard English. Write "spring," "summer," "fall" (or "autumn"), and "winter" in lowercase. Seasons are common nouns, not proper nouns. Capitalize them only when they're part of a proper noun, start a sentence, or appear in a title.`,

    whenHeading: "Why Seasons Are Lowercase",
    whenBody: `Unlike months and days of the week, seasons don't get capital letters. This surprises a lot of people – if Monday and January are capitalized, why not spring?\n\nThe difference comes down to proper nouns vs. common nouns. Monday and January are proper nouns – they name specific, unique things. But "spring" isn't unique the way "March" is. Spring happens every year, in every hemisphere (at different times), and it's more of a general description than a specific name. English treats seasons the same way it treats "morning," "afternoon," and "evening" – they describe a period, not a named entity.\n\nAll major style guides agree on this: AP, APA, Chicago, and MLA all lowercase seasons in running text.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `First word of a sentence: Winter arrived early this year.`,
        `Part of a proper noun or formal name: Winter Olympics, Spring Break 2026, Fall Semester`,
        `In a title (title case): A Guide to Summer Gardening`,
        `Used as personification in literary writing: Old Man Winter`,
      ],
      lowercaseRules: [
        `Used normally in a sentence: We're planning a trip this summer.`,
        `With a year: The project launches in spring 2026.`,
        `As an adjective: She wore her fall jacket.`,
        `In a list with other time periods: The report covers spring, summer, and fall.`,
      ],
      tip: `If you wouldn't capitalize "morning" in the same spot, don't capitalize the season.`,
    },

    styleComparisonHeading: "Season-by-Season Examples",
    styleComparisonBody: `People tend to second-guess specific seasons more than others. Here's how each one works.\n\nSpring. Lowercase in regular use: The flowers bloom in spring. Capitalize in Spring Break, Spring Semester, or at the start of a sentence.\n\nSummer. Same rules: We spent summer at the lake. Capitalize in Summer Olympics or Summer Session 2026.\n\nFall / Autumn. Both are lowercase: Fall is my favorite season only gets a capital because it starts the sentence. In the middle: I love fall and I love autumn – both lowercase. Capitalize in Fall Semester or Fall Festival.\n\nWinter. Lowercase: It gets cold in winter. Capitalize in Winter Solstice (when used as an event name), Winter Games, or Winter Break.`,

    doExamples: [
      `Registration for the fall semester opens in August.`,
      `We're hiring summer interns for three positions.`,
      `The Winter Olympics take place every four years.`,
      `Spring 2026 will be warmer than usual, according to forecasters.`,
    ],

    doNotExamples: [
      {
        text: `I love Fall because of the changing leaves.`,
        reason: `"Fall" is a common noun here – not a proper noun or sentence opener. Lowercase: I love fall.`,
      },
      {
        text: `She graduated in the Spring of 2024.`,
        reason: `Seasons paired with years are lowercase. Write: she graduated in the spring of 2024.`,
      },
      {
        text: `Our Winter collection launches next month.`,
        reason: `Generic product references stay lowercase unless it's the brand's official product line name.`,
      },
    ],

    edgeCasesHeading: "Edge Cases Worth Knowing",
    edgeCasesBody: `These are the situations where writers most often second-guess themselves on season capitalization.`,
    edgeCaseItems: [
      `Seasons with years. Always lowercase: spring 2026, winter 2025. Some universities capitalize in catalogs (Fall 2026 enrollment) – that's a house style choice, not a grammar rule.`,
      `Course catalogs and academic writing. Universities often write Fall Semester, Spring Quarter. Follow their style guide for institutional documents; lowercase in all other writing.`,
      `Brand names and marketing. If a company names a product line "Summer Collection," that's a proper noun – capitalize. The same word in general use stays lowercase: our summer collection (generic) vs. the Summer Collection by Brand X (proper name).`,
      `Personification in creative writing. When a season is treated as a character, some writers capitalize it: Winter crept across the landscape. This is a stylistic choice in literary writing – not a rule for business or academic prose.`,
    ],

    faqItems: [
      {
        question: `Are months and days capitalized but seasons aren't?`,
        answer: `Correct. Months (January, February) and days (Monday, Tuesday) are proper nouns in English – they name specific, unique time periods. Seasons are common nouns because they're general descriptors. This is simply how English evolved; there's no logical rule behind it.`,
      },
      {
        question: `Is "Spring Break" capitalized?`,
        answer: `Usually yes, because it functions as the name of a specific event or period. Same with "Summer Olympics," "Winter Solstice" (as an event), and "Fall Semester." The season gets capitalized because it's part of a proper noun.`,
      },
      {
        question: `Do you capitalize seasons in a title?`,
        answer: `In title case, yes – capitalize seasons like any other word following your style guide's rules. A Guide to Winter Gardening capitalizes "Winter" because of title case rules, not because seasons are normally capitalized.`,
      },
      {
        question: `Is "summertime" one word, and is it capitalized?`,
        answer: `"Summertime" is one word, and it follows the same rules – lowercase in normal use: I love summertime. The same applies to "wintertime" and "springtime." "Falltime" isn't standard usage.`,
      },
      {
        question: `Why do so many people capitalize seasons?`,
        answer: `Probably because months and days are capitalized, and seasons feel like they belong in the same category. Also, many companies and universities capitalize seasons in their branding and catalogs, which reinforces the habit.`,
      },
    ],

    ctaWord: `Tips for Your Spring Garden`,
    ctaText: `Need to check capitalization in your titles? Try our free Title Case Converter – it handles seasons, months, and every other tricky word automatically.`,

    relatedSlugs: ["is-earth-capitalized", "do-you-capitalize-after-a-colon", "is-president-capitalized", "do-you-capitalize-majors"],
  },

  {
    slug: "is-earth-capitalized",
    word: "Earth",
    answerVariant: "it-depends",
    answerBox: `Usually yes – when you mean the planet. Capitalize "Earth" when referring to the planet, especially when it appears alongside other planet names or without the article "the." Keep it lowercase when it means soil, ground, or dirt – the earth beneath our feet. The article "the" is a helpful signal: the earth (often lowercase, informal) vs. Earth (capitalized, scientific).`,

    whenHeading: `The Planet Rule`,
    whenBody: `Earth is the name of a planet – a proper noun, just like Mars, Venus, and Jupiter. When you're talking about our planet as an astronomical body, capitalize it.\n\nThe confusing part: "earth" also has a common noun meaning – soil, dirt, ground. She dug into the earth uses the word as a regular noun, and it stays lowercase. The same word, two different meanings, two different capitalization rules.\n\nMost grammar references give a reliable shortcut: if you can replace "earth" with "Mars" and the sentence still makes sense, capitalize it. We live on Earth → We live on Mars. Works. She dug into the Earth → She dug into the Mars. Doesn't work. Lowercase.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `Referring to the planet by name: Earth orbits the Sun.`,
        `Used alongside other planet names: Earth is smaller than Neptune.`,
        `In scientific or astronomical context: Earth's atmosphere contains 78% nitrogen.`,
        `Without "the" before it: Life on Earth depends on water.`,
      ],
      lowercaseRules: [
        `It means soil or ground: The gardener packed the earth around the roots.`,
        `Preceded by "the" in casual writing: She's the kindest person on the earth.`,
        `Part of an idiom: down to earth, what on earth, the salt of the earth`,
        `Meaning "the world" in a non-astronomical sense: the four corners of the earth`,
      ],
      tip: `The article "the" is your signal. "The earth" usually stays lowercase. "Earth" standing alone usually gets capitalized.`,
    },

    styleComparisonHeading: `What About "the Earth"?`,
    styleComparisonBody: `This is where style guides actually disagree – and it's the question behind most of the confusion.\n\nAP style lowercases "earth" in most contexts and treats it like other generic references: the earth, the sun, the moon. It capitalizes only when Earth appears as a proper name without "the" or alongside other planet names.\n\nChicago style is more flexible. It allows capitalizing "Earth" even with "the" when the context is clearly astronomical: The Earth revolves around the Sun. But it also accepts lowercase in the same context.\n\nNASA and scientific publications almost always capitalize Earth, Sun, and Moon when referring to the specific bodies – regardless of "the."\n\nFor everyday writing, the simplest approach: capitalize "Earth" when you mean the planet, lowercase "earth" when you mean the ground. If "the" is in front of it and the context isn't clearly scientific, lowercase is the safer choice.`,

    doExamples: [
      `Earth is the third planet from the Sun.`,
      `The astronauts viewed Earth from the space station.`,
      `She filled the pot with fresh earth from the garden.`,
      `Mars has roughly half the diameter of Earth.`,
    ],

    doNotExamples: [
      {
        text: `We need to protect the Earth's soil from erosion.`,
        reason: `Soil context means the common noun "earth" – lowercase: the earth's soil from erosion.`,
      },
      {
        text: `Mercury, Venus, and earth orbit closest to the Sun.`,
        reason: `Planet list = proper noun. Capitalize to match Mercury and Venus: Mercury, Venus, and Earth.`,
      },
      {
        text: `He's very Down To Earth.`,
        reason: `Fixed idiom – always lowercase: down to earth.`,
      },
    ],

    edgeCasesHeading: "Edge Cases Worth Knowing",
    edgeCasesBody: `These are the scenarios where "earth" causes the most hesitation – even for experienced writers.`,
    edgeCaseItems: [
      `Sun and Moon. The same rule applies. Capitalize "Sun" and "Moon" when used as proper names in scientific writing or alongside other celestial bodies. Lowercase in casual use: the sun was setting, the moon was bright.`,
      `"Google Earth," "Earth Day." Always capitalized – these are proper nouns (a product name and a named event). The capitalization has nothing to do with the planet rule; it's just a proper noun being a proper noun.`,
      `Idioms. Always lowercase: down to earth, what on earth, move heaven and earth, salt of the earth, the ends of the earth. These are fixed expressions where "earth" doesn't refer to the planet.`,
      `Earth in titles. In title case, capitalize "Earth" regardless of meaning – title case rules override the common noun rule. Digging Into the Earth capitalizes it because it's a major word in a title.`,
    ],

    faqItems: [
      {
        question: `Is "earth" a proper noun or a common noun?`,
        answer: `Both, depending on meaning. When it refers to the planet, it's a proper noun (capitalize). When it means soil or ground, it's a common noun (lowercase). English has several words like this – "sun" and "moon" work the same way.`,
      },
      {
        question: `Do you capitalize "Earth" in a sentence like "saving the earth"?`,
        answer: `It depends on what you mean. If you're talking about environmental conservation of the planet, you could write either saving the Earth or saving the earth – both are defensible. If you mean preserving actual soil quality, lowercase: saving the earth from erosion.`,
      },
      {
        question: `Is "earthly" capitalized?`,
        answer: `No. Adjective forms are lowercase: earthly possessions, earthly pleasures. Same for "earthy" (describing a flavor or personality).`,
      },
      {
        question: `How do NASA and scientists capitalize "Earth"?`,
        answer: `NASA capitalizes Earth, Sun, and Moon as proper nouns in all contexts. Scientific journals typically do the same. This is stricter than most style guides, which allow lowercase in informal or non-astronomical contexts.`,
      },
      {
        question: `Is "Mother Earth" capitalized?`,
        answer: `Yes. "Mother Earth" is a proper noun – it's a personified name for the planet, used in cultural and environmental contexts. Both words are capitalized.`,
      },
    ],

    ctaWord: `How Life on Earth Began`,
    ctaText: `Writing a title that includes "Earth"? Our free Title Case Converter handles capitalization across AP, APA, Chicago, and MLA styles.`,

    relatedSlugs: ["is-god-capitalized", "do-you-capitalize-seasons", "is-president-capitalized"],
  },

  {
    slug: "is-high-school-capitalized",
    word: "High School",
    answerVariant: "it-depends",
    answerBox: `Only when it's part of a school's name. Capitalize "High School" when it appears in the official name of a specific institution – Lincoln High School, Tokyo Metropolitan High School. Keep it lowercase when you're talking about high school as a general concept or stage of education – she's in high school, he teaches high school math.`,

    whenHeading: `The Rule`,
    whenBody: `"High school" works like most institutional terms in English. It's a common noun when it describes a level of education, and it becomes part of a proper noun when it's in an official name.\n\nThink of it like "lake." You swim in a lake (lowercase), but you swim in Lake Michigan (capitalized). Same word, different job. High school describes where teenagers go to learn. Westfield High School is the specific name of a building with a sign out front.\n\nThe tricky part is that people write about their own high school experience constantly – in college essays, resumes, LinkedIn profiles – and the instinct is to capitalize it because it feels important. But "importance" isn't a capitalization rule. If you're not naming a specific school, it's lowercase.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `Part of a specific school's name: She graduated from Roosevelt High School.`,
        `In a title (title case rules): My High School Experience`,
        `First word of a sentence: High school prepares students for college.`,
      ],
      lowercaseRules: [
        `Referring to the level of education generally: She's a high school student.`,
        `Talking about the experience generally: I went to high school in Texas.`,
        `Used as an adjective: high school diploma, high school football, high school reunion`,
        `No specific school is named: He's been teaching high school English for ten years.`,
      ],
      tip: `If you can put a specific name in front of "High School" and it would be the school's official name, capitalize. If not, lowercase.`,
    },

    doExamples: [
      `She graduated from Jefferson High School in 2019.`,
      `He's been teaching high school English for ten years.`,
      `My high school was in a small town in Oregon.`,
      `The rivalry between Central High School and Eastside High School is decades old.`,
    ],

    doNotExamples: [
      {
        text: `I hated High School.`,
        reason: `General reference, not a proper name. Lowercase: I hated high school.`,
      },
      {
        text: `She got her High School Diploma in May.`,
        reason: `"High school diploma" is a generic credential, not a proper noun. Lowercase both words.`,
      },
      {
        text: `He teaches at the High School on Oak Street.`,
        reason: `Unless that is literally the school's name, it's a generic reference. Lowercase: the high school on Oak Street.`,
      },
    ],

    edgeCasesHeading: "Edge Cases Worth Knowing",
    edgeCasesBody: `These are the situations that trip up resume writers, college essayists, and educators most often.`,
    edgeCaseItems: [
      `"High school" on a resume. Lowercase in descriptions: Graduated from high school in 2018. Capitalize when naming the actual school: Graduated from Lincoln High School, 2018. Resume section headers like "HIGH SCHOOL" are a design choice, not a grammar rule.`,
      `"High-school" as a compound adjective. Some style guides recommend hyphenating when "high school" modifies a noun (high-school teacher). AP style does not hyphenate. Most modern writing skips the hyphen: high school students is widely accepted.`,
      `Middle school, elementary school, junior high. Same rules. Lowercase when general (she's in middle school), capitalize when part of a name (Oakridge Middle School). The pattern is consistent across all school levels.`,
      `"The high school." Even with "the," keep it lowercase when you're not naming a specific school: The high school down the road has a new gym. Capitalize only if "the" is part of the institution's official name (rare).`,
      `College and university. Same pattern. She went to college (lowercase), She went to Boston College (capitalized). "College" on its own is not a proper noun, even when you're clearly talking about a specific school.`,
    ],

    faqItems: [
      {
        question: `Is "high school" a proper noun?`,
        answer: `Not by itself. "High school" is a common noun describing a level of education. It becomes part of a proper noun only when included in a specific school's official name, like Lakewood High School.`,
      },
      {
        question: `Do you capitalize "high school diploma"?`,
        answer: `No. A high school diploma is a general credential, not a proper noun – same as "driver's license" or "college degree." Capitalize only if it's part of a formal document title or awarded certificate name.`,
      },
      {
        question: `Is "high school" capitalized in a college essay?`,
        answer: `Only when you name a specific school. Write I learned a lot in high school (lowercase) but I attended Riverside High School (capitalized). College admissions readers notice this – getting it right signals attention to detail.`,
      },
      {
        question: `Is "high school" hyphenated?`,
        answer: `It depends on the style guide. Some recommend high-school when used as an adjective before a noun (high-school teacher), but AP style and most modern writing treat it as two unhyphenated words in all positions.`,
      },
      {
        question: `Do you capitalize "freshman," "sophomore," etc.?`,
        answer: `No. Class years are lowercase in running text: She's a sophomore at Lincoln High School. Capitalize only when part of a formal name or event: the Freshman Orientation, the Junior Prom.`,
      },
    ],

    ctaWord: `My High School Experience`,
    ctaText: `Writing about your school in a title or heading? Our free Title Case Converter applies the correct capitalization rules for AP, APA, Chicago, and MLA styles.`,

    relatedSlugs: ["is-president-capitalized", "do-you-capitalize-seasons", "is-bachelors-degree-capitalized"],
  },

  {
    slug: "do-you-capitalize-after-a-colon",
    word: "After a Colon",
    answerVariant: "it-depends",
    answerBox: `It depends on your style guide. AP style capitalizes the first word after a colon if it begins a complete sentence. Chicago style capitalizes only when two or more complete sentences follow the colon. APA always capitalizes after a colon if a complete sentence follows. In all styles, keep it lowercase when a colon introduces a fragment, list, or single word.`,

    whenHeading: "The Short Answer",
    whenBody: `Colons are one of the few punctuation marks where capitalization rules genuinely change depending on which style guide you follow. This isn't a case where one answer is "more correct" – AP, Chicago, and APA each have a defensible rule, and they disagree with each other.\n\nThe confusion makes sense. A colon sits between two related parts of a sentence, and reasonable people disagree on whether what follows it deserves the same treatment as a new sentence. If you're writing for a specific publication or institution, check their style guide. If you're writing for yourself, pick a rule and stick with it.\n\nHere's how the main style guides handle it.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `AP style: a complete sentence follows – There was one problem: The server crashed overnight.`,
        `APA style: a complete sentence follows – The results were clear: Participants preferred the shorter version.`,
        `Chicago style: two or more complete sentences follow – She had two goals: First, she wanted to finish the report. Second, she needed to send the invoice.`,
        `Any style: a proper noun follows the colon – The winner is: Sarah.`,
      ],
      lowercaseRules: [
        `A fragment or list follows: She packed three things: a book, a pen, and a notebook.`,
        `A single word or phrase follows: There's only one word for it: chaos.`,
        `Chicago style with one sentence after the colon: She had one goal: she wanted to finish the report.`,
        `MLA style (most conservative): lowercase unless a proper noun or original capitalized quotation follows.`,
      ],
      tip: `When in doubt, lowercase after a colon is the safer choice in everyday writing. It's never wrong when the colon introduces a fragment – and most things after colons are fragments.`,
    },

    styleComparisonHeading: "Style Guide Breakdown",
    styleComparisonBody: `AP Style has the simplest rule: capitalize the first word after a colon if what follows is a complete sentence. Doesn't matter if it's one sentence or five. Complete sentence = capital letter. Fragment = lowercase. Most journalism follows this.\n\nChicago Style is more conservative. It capitalizes after a colon only when two or more complete sentences follow. If just one sentence follows, lowercase. This is the standard for book publishing and academic writing outside the sciences.\n\nAPA Style aligns with AP on this one – capitalize if a complete sentence follows the colon. APA adds a specific rule for colons in titles: always capitalize the first word after a colon in a title or heading, regardless of what follows. This matters for academic papers and research titles.\n\nMLA Style keeps it lowercase after a colon unless the first word is a proper noun or begins a quotation that was capitalized in the original. MLA is the most conservative approach.`,

    doExamples: [
      `She had one request: don't be late. (Chicago – one sentence, lowercase)`,
      `She had one request: Don't be late. (AP/APA – complete sentence, capitalize)`,
      `The recipe calls for three ingredients: flour, sugar, and butter.`,
      `The title read: "Capitalizing After Colons: A Complete Guide"`,
    ],

    doNotExamples: [
      {
        text: `He bought: Apples, oranges, and bananas.`,
        reason: `A fragment follows the colon – always lowercase: He bought: apples, oranges, and bananas.`,
      },
      {
        text: `The store sold two things: Bread and milk.`,
        reason: `"Bread and milk" is a fragment, not a sentence. Lowercase in all major style guides.`,
      },
      {
        text: `He Said: "we should go now."`,
        reason: `If the quoted material was capitalized originally, keep it. If not, lowercase. And never capitalize "said."`,
      },
    ],

    edgeCasesHeading: "Edge Cases Worth Knowing",
    edgeCasesBody: `These scenarios trip up even experienced writers because each one has a different rule from what you'd expect.`,
    edgeCaseItems: [
      `Colons before lists. Always lowercase when the colon introduces a vertical or inline list – even if each list item is a complete sentence. The instructions are simple: wash your hands, put on gloves, open the package. All major style guides agree here.`,
      `Subtitles and headings. Capitalize the first word after the colon in titles and subtitles regardless of style guide: Harry Potter and the Prisoner of Azkaban: A Critical Analysis. APA explicitly requires this; AP, Chicago, and MLA all follow the same convention in title case.`,
      `Multiple colons in one sentence. Don't do it. Restructure instead. One colon per sentence is the universal rule.`,
      `Colons introducing quotations. If the quotation is a complete sentence, capitalize regardless of style guide – the capital letter belongs to the quoted material: She said: "The meeting starts at noon." If you're weaving a partial quote into your own sentence, lowercase: She described the mood as: "tense but hopeful."`,
      `Colons in dialogue and scripts. In screenplays and play scripts, the character name followed by a colon always leads to a capitalized line: JOHN: We need to leave. This is a formatting convention, not a grammar rule.`,
    ],

    faqItems: [
      {
        question: `Does AP style capitalize after a colon?`,
        answer: `Yes, when a complete sentence follows. AP capitalizes the first word after a colon if it begins an independent clause (a sentence that could stand on its own). Fragments and lists stay lowercase.`,
      },
      {
        question: `Does Chicago style capitalize after a colon?`,
        answer: `Only when two or more complete sentences follow the colon. If just one sentence follows, Chicago keeps it lowercase. This is stricter than AP and APA.`,
      },
      {
        question: `Do you capitalize after a colon in a title?`,
        answer: `Yes, in all major style guides. The first word after a colon in a title or subtitle is always capitalized, regardless of whether it would normally be lowercase in running text.`,
      },
      {
        question: `Is the word after a colon capitalized in APA format?`,
        answer: `Yes, if a complete sentence follows the colon. APA also specifically requires capitalizing the first word after a colon in titles and headings – even if it's an article or preposition.`,
      },
      {
        question: `Can you use a colon before a single word?`,
        answer: `Yes. A colon can introduce a single word for emphasis: There's one thing she wanted: silence. The single word stays lowercase (unless it's a proper noun).`,
      },
    ],

    ctaWord: `Modern Writing: a Complete Guide`,
    ctaText: `Writing titles with colons? Our free Title Case Converter handles post-colon capitalization across AP, APA, Chicago, and MLA styles automatically.`,

    relatedSlugs: ["do-you-capitalize-seasons", "is-president-capitalized", "what-words-are-not-capitalized-in-a-title"],
  },

  {
    slug: "is-professor-capitalized",
    word: "Professor",
    answerVariant: "it-depends",
    answerBox: `Only when it's a title before a name. Capitalize "Professor" when it appears directly before a person's name as a formal title – Professor Martinez lectured on Thursday. Keep it lowercase when describing the role generally – she's a professor of chemistry – or when it follows a name: David Kim, professor of economics.`,

    whenHeading: `The Title Rule`,
    whenBody: `"Professor" follows the same capitalization logic as "president," "senator," and "doctor." It's a title – and titles are capitalized when they work as part of someone's name, not when they describe a general role.\n\nWrite Professor Chen the same way you'd write Dr. Chen. The title functions like a first name in that position – it identifies a specific person. Remove the name and the capital letter usually goes with it: The professor assigned extra reading.\n\nThis is the single most common mistake with "professor." People capitalize it out of respect, but capitalization in English isn't about importance – it's about whether a word is functioning as a proper noun or a common noun.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `It's a title before a name: Professor Williams will hold office hours.`,
        `It's used as a direct form of address: Thank you, Professor, for your feedback.`,
        `It's part of a named/endowed position: the John Smith Professor of Law (official title)`,
        `It starts a sentence (like any word)`,
      ],
      lowercaseRules: [
        `It describes the role: She became a professor at 35.`,
        `It follows a name: Emily Hart, professor of biology, published new findings.`,
        `It refers to professors in general: The professors met to discuss the curriculum.`,
        `It's used as an adjective: a professor's office, the professor emeritus`,
      ],
      tip: `If you can swap "professor" with "teacher" and the sentence still reads the same way, it's being used as a description – keep it lowercase.`,
    },

    styleComparisonHeading: `AP Style vs. Chicago Style`,
    styleComparisonBody: `AP and Chicago agree on this one more than they disagree.\n\nBoth styles capitalize "Professor" before a name: Professor Angela Davis. Both lowercase it after a name or when used as a standalone description: the professor spoke at the event.\n\nThe small difference: AP style abbreviates most titles before names but does not abbreviate "Professor" – it's always written in full. You'd write Prof. only in informal contexts or tables, never in AP news copy.\n\nChicago is a bit more flexible. CMOS allows "Prof." as an abbreviation in running text when used before a full name, though spelling it out is always preferred.\n\nFor academic writing specifically, APA follows the same general rule – lowercase for descriptions, capitalize before names – and adds that you should generally avoid using courtesy titles like "Professor" in favor of full names on first reference.`,

    doExamples: [
      `Professor Garcia teaches microeconomics on Tuesdays.`,
      `The university hired three new professors this year.`,
      `I emailed my professor about the deadline extension.`,
      `Sarah Lin, professor of art history, curated the exhibition.`,
    ],

    doNotExamples: [
      {
        text: `The Professor canceled class today.`,
        reason: `No name follows – it's a generic reference. Lowercase: The professor canceled class today.`,
      },
      {
        text: `She's a Professor of Mathematics.`,
        reason: `Job description, not a title before a name. Lowercase: She's a professor of mathematics.`,
      },
      {
        text: `I asked professor Adams for a recommendation.`,
        reason: `Title before a name must be capitalized: I asked Professor Adams for a recommendation.`,
      },
    ],

    edgeCasesHeading: "Edge Cases Worth Knowing",
    edgeCasesBody: `These are the scenarios where "professor" causes the most hesitation – especially in academic writing and emails.`,
    edgeCaseItems: [
      `"Prof." abbreviation. Capitalize and punctuate: Prof. Tanaka. In formal writing, spell it out: Professor Tanaka. Never use the abbreviation without a name following it.`,
      `Professor emeritus. Lowercase "emeritus" in running text: professor emeritus, professor emerita. When used as a title before a name, capitalize the title portion: Professor Emeritus John Walker. Some institutions capitalize both words as an official designation – follow your institution's style if writing for an academic audience.`,
      `Adjunct, associate, assistant. These modifiers stay lowercase when describing a rank: She's an associate professor. Before a name, capitalize: Associate Professor Diane Rivera. The full rank functions as the title.`,
      `Visiting professor. Same pattern: a visiting professor from Berlin (lowercase) vs. Visiting Professor Hans Weber (before a name).`,
      `Emails to professors. When addressing a professor directly – "Dear Professor Kim" – capitalize. In the body of the email, follow normal rules: As the professor mentioned in lecture... (lowercase, no name attached).`,
    ],

    faqItems: [
      {
        question: `Is "professor" a proper noun?`,
        answer: `Not on its own. "Professor" is a common noun – a job title – that gets capitalized only when used as a formal title before a name, similar to "doctor" or "senator." Professor Lee treats the word as part of a proper name; a biology professor does not.`,
      },
      {
        question: `Do you capitalize "professor" in an email subject line?`,
        answer: `In title case, yes – capitalize "Professor" because it's a major word in the title. In sentence case, follow the normal rule: capitalize only before a name. Meeting with Professor Park (title case) or Meeting with professor about thesis (sentence case).`,
      },
      {
        question: `Should I capitalize "professor" when talking about a specific person?`,
        answer: `Only if the title comes directly before their name: Professor Nakamura. If you're referring to them without using their name, lowercase: The professor who taught my organic chemistry class was excellent.`,
      },
      {
        question: `Is "Professor" capitalized after a name?`,
        answer: `No. When a title follows a name, it's treated as a description and lowercased: Angela Wu, professor of linguistics. This applies to all titles, not just "professor."`,
      },
      {
        question: `How do you capitalize "Professor" in a title or heading?`,
        answer: `In title case, capitalize it – it's a major word regardless of meaning. In sentence case, capitalize only if it's the first word or comes before a name. Use our Title Case Converter to check.`,
      },
    ],

    ctaWord: `Professor Smith Joins the Research Team`,
    ctaText: `Writing a heading with "Professor" in it? Our free Title Case Converter handles AP, APA, Chicago, and MLA styles automatically.`,

    relatedSlugs: ["do-you-capitalize-majors", "is-bachelors-degree-capitalized", "is-president-capitalized", "is-english-capitalized"],
  },

  {
    slug: "do-you-capitalize-majors",
    word: "Majors",
    answerVariant: "it-depends",
    answerBox: `Usually no – with one important exception. College majors are lowercase when they're general fields of study – biology, history, political science. Capitalize them only when the major includes a proper noun – English, French, American studies – or when you're referring to a specific course or program by its official name: Bachelor of Science in Mechanical Engineering.`,

    whenHeading: `Why Majors Are Usually Lowercase`,
    whenBody: `College majors follow the same capitalization logic as other common nouns. A major is a field of study, not a specific name – so it stays lowercase in running text, the same way you'd write "she studied law" or "he's interested in medicine."\n\nThe exception is proper nouns. Languages, nationalities, and place names keep their capital letters no matter where they appear. "English" is always capitalized because it derives from a proper noun (England), not because it's a major. The same goes for "Japanese," "African American studies," and "Latin."\n\nThis trips people up because their university might capitalize majors on official documents. Degree audit sheets, diplomas, and department websites often use title case for emphasis – Major: Political Science – but that's a formatting choice, not a grammar rule. In a sentence, it's lowercase: She's studying political science.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `The major contains a proper noun: She's majoring in English literature.`,
        `It's part of an official degree name: Bachelor of Arts in Economics`,
        `It's a specific course name: Introduction to Organic Chemistry (but the field is organic chemistry)`,
        `It's used as a proper title on official documents (context-dependent)`,
      ],
      lowercaseRules: [
        `It's a general field of study: He chose biology as his major.`,
        `You're describing the subject broadly: a degree in computer science`,
        `It's used in conversation or informal writing: She's thinking about switching to psychology.`,
        `It appears as an adjective: a history major, a nursing student`,
      ],
      tip: `If you can add "a degree in" before the major and it sounds natural, it's probably a generic reference – keep it lowercase.`,
    },

    styleComparisonHeading: `AP Style vs. Chicago vs. APA`,
    styleComparisonBody: `All three major style guides agree on the basics: lowercase general fields of study, capitalize proper nouns within them.\n\nAP style is the most straightforward. It treats majors like any other common noun – lowercase unless a proper noun is involved. She majored in biology. He has a degree in English. AP also lowercases informal degree references: bachelor's degree, master's degree.\n\nChicago style follows the same approach. CMOS 8.85 specifically states that academic subjects are lowercased unless they're proper nouns or part of an official course name. She studied philosophy but She enrolled in Philosophy 301.\n\nAPA style aligns with both – lowercase for general references, capitalize for specific course titles. APA does capitalize the full formal name of a degree when it's written out with the major: Master of Science in Data Analytics.\n\nThe practical takeaway: all three guides tell you the same thing. Lowercase the major as a field of study, capitalize proper nouns and official names.`,

    doExamples: [
      `She's majoring in biology and minoring in chemistry.`,
      `His degree in English literature led to a career in publishing.`,
      `The university offers a Bachelor of Science in Computer Engineering.`,
      `Students in the political science department organized a debate.`,
    ],

    doNotExamples: [
      {
        text: `She's majoring in Biology and minoring in Chemistry.`,
        reason: `General fields of study are lowercase: She's majoring in biology and minoring in chemistry.`,
      },
      {
        text: `He has a degree in english.`,
        reason: `"English" is a proper noun (from England) – always capitalize: He has a degree in English.`,
      },
      {
        text: `She completed her Bachelor's Degree in Nursing.`,
        reason: `Informal degree reference is lowercase: She completed her bachelor's degree in nursing.`,
      },
    ],

    edgeCasesHeading: "Edge Cases Worth Knowing",
    edgeCasesBody: `These are the situations where writers most often second-guess themselves on major capitalization.`,
    edgeCaseItems: [
      `Minors and concentrations. Same rules apply. Lowercase the field, capitalize proper nouns: a minor in Spanish, a concentration in data science. Official program names with formal titles get capitalized: Minor in East Asian Studies.`,
      `Interdisciplinary programs. Programs like "women's studies" or "environmental science" stay lowercase. If the program includes a proper noun – "Latin American studies" – capitalize the proper noun portion.`,
      `Resumes and headings. On a resume, you'll often see majors capitalized for emphasis – Major: Computer Science. This is a formatting convention, not a grammar rule. In the body text of a cover letter or personal statement, follow the standard lowercase rule.`,
      `"I'm a [major] major." The word "major" as a noun stays lowercase: She's a biology major. Think of it like "a history teacher" – the subject modifies the role, and neither needs a capital letter unless it's a proper noun.`,
      `Double majors. Lowercase both unless one contains a proper noun: She double-majored in economics and French.`,
    ],

    faqItems: [
      {
        question: `Are college majors capitalized on a resume?`,
        answer: `In headings and section titles, capitalizing your major is common and acceptable – it's a formatting choice. In sentences within your resume or cover letter, follow standard rules: lowercase unless it contains a proper noun. Graduated with a degree in marketing is correct in running text.`,
      },
      {
        question: `Is "nursing" capitalized as a major?`,
        answer: `No. "Nursing" is a general field of study and stays lowercase: She earned her degree in nursing. Capitalize it only in an official degree name: Bachelor of Science in Nursing.`,
      },
      {
        question: `Do you capitalize "computer science"?`,
        answer: `Not when referring to the field generally: He's studying computer science. Capitalize in official degree names: Master of Science in Computer Science. Yes, that means you might see it both ways in the same document.`,
      },
      {
        question: `Should I capitalize my major in an essay?`,
        answer: `No. In academic writing – whether APA, MLA, or Chicago – college majors are lowercase unless they contain a proper noun. She studied sociology is correct. She studied English is also correct (proper noun).`,
      },
      {
        question: `Is "pre-med" capitalized?`,
        answer: `No. "Pre-med" is an informal label for a course track, not a proper noun: He's a pre-med student. The same goes for "pre-law" and "pre-vet."`,
      },
    ],

    ctaWord: `How to Choose the Right College Major`,
    ctaText: `Writing about your major in a title or heading? Our free Title Case Converter applies the right capitalization rules across AP, APA, Chicago, and MLA styles.`,

    relatedSlugs: ["is-professor-capitalized", "is-bachelors-degree-capitalized", "is-english-capitalized", "is-math-capitalized"],
  },

  {
    slug: "is-bachelors-degree-capitalized",
    word: "Bachelor's Degree",
    answerVariant: "it-depends",
    answerBox: `Not usually – unless you're writing the full formal name. Keep "bachelor's degree" lowercase and with an apostrophe when using it as a general term: She earned her bachelor's degree in 2024. Capitalize when writing the complete formal name of the degree: Bachelor of Science in Biology. The same pattern applies to master's degree, associate's degree, and doctoral degree.`,

    whenHeading: `The General Rule`,
    whenBody: `"Bachelor's degree" is a description, not a proper noun – so it stays lowercase in everyday writing. Think of it like "high school diploma" or "driver's license." You're describing a category of credential, not naming a specific one.\n\nThe capital letters come out when you write the official name of the degree. Bachelor of Arts, Bachelor of Science, Bachelor of Fine Arts – these are proper nouns, the same way Harvard University is. The distinction is between the generic label and the specific title.\n\nThis catches people off guard because they see the capitalized version on diplomas, transcripts, and university websites. Those documents use the formal name. In a sentence, you're usually talking about the degree generically – and that means lowercase.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `Writing the full formal degree name: Bachelor of Arts in English`,
        `Using the official title on official documents: She was awarded a Bachelor of Science.`,
        `It appears in a heading or title (title case rules apply)`,
      ],
      lowercaseRules: [
        `Referring to it generally: a bachelor's degree`,
        `Using it informally: He finished his bachelor's last year.`,
        `Describing the level: a bachelor's-level program`,
        `Using the possessive form in running text: her bachelor's degree in marketing`,
      ],
      tip: `If you're writing "bachelor's degree" with those two words, it's almost always lowercase. If you're writing "Bachelor of [Something]," it's the formal name – capitalize.`,
    },

    styleComparisonHeading: `The Apostrophe Question`,
    styleComparisonBody: `Almost as common as the capitalization question: where does the apostrophe go?\n\nThe correct form is bachelor's – with an apostrophe before the s. The degree belongs to a bachelor (singular), not multiple bachelors. Same logic: master's degree (one master), not masters degree or masters' degree.\n\nYou can also drop "degree" entirely: She has a bachelor's in chemistry. The apostrophe stays.\n\nThe abbreviations – BA, BS, MA, MS – don't use apostrophes or periods in most modern style guides. AP style: She has a BA in history. Chicago style accepts both B.A. and BA, though the trend is toward dropping the periods.\n\nAll three major style guides – AP, Chicago, and APA – agree on the core rule: lowercase "bachelor's degree" as a general term, capitalize the full formal name (Bachelor of Arts). Where they all agree: never capitalize "degree" when it follows "bachelor's" in a generic reference. It's bachelor's degree, not Bachelor's Degree.`,

    doExamples: [
      `She earned her bachelor's degree in 2023.`,
      `The program awards a Bachelor of Science in Nursing.`,
      `A bachelor's degree typically takes four years to complete.`,
      `He holds a BA from the University of Michigan.`,
    ],

    doNotExamples: [
      {
        text: `She earned her Bachelor's Degree in 2023.`,
        reason: `General reference is lowercase: She earned her bachelor's degree in 2023.`,
      },
      {
        text: `He has a bachelors degree.`,
        reason: `Needs an apostrophe – singular possessive: He has a bachelor's degree.`,
      },
      {
        text: `She completed a bachelor's degree in English Literature.`,
        reason: `The field of study "literature" is lowercase (only "English" stays capitalized as a proper noun): a bachelor's degree in English literature.`,
      },
    ],

    edgeCasesHeading: "Edge Cases Worth Knowing",
    edgeCasesBody: `These are the scenarios that trip up resume writers, college essayists, and HR professionals most often.`,
    edgeCaseItems: [
      `Master's degree. Identical rules. Lowercase master's degree in general use, capitalize Master of Business Administration. Apostrophe before the s: master's, not masters.`,
      `Associate's degree. Same pattern: an associate's degree (general) vs. Associate of Applied Science (formal). Some style guides accept "associate degree" without the apostrophe – AP allows both forms.`,
      `Doctoral degree. No apostrophe needed – doctoral degree, not doctoral's degree. "Doctorate" is also correct: She earned her doctorate. For the formal name: Doctor of Philosophy (PhD).`,
      `"Bachelor's" standing alone. You can use it without "degree": She finished her bachelor's in May. The apostrophe stays. Same for master's: He's working on his master's.`,
      `Plural. Tricky but rare: bachelor's degrees (multiple degrees of the bachelor's type). The apostrophe stays in the singular possessive form even when "degrees" is plural.`,
    ],

    faqItems: [
      {
        question: `Is it "bachelor's" or "bachelors"?`,
        answer: `"Bachelor's" – with an apostrophe. The degree belongs to a bachelor (singular possessive). Writing "bachelors degree" without an apostrophe is a common error. The only time "bachelors" appears without an apostrophe is when referring to multiple unmarried people.`,
      },
      {
        question: `Do you capitalize "bachelor's degree" on a resume?`,
        answer: `In headings and labels, capitalizing is standard formatting: Education: Bachelor's Degree in Marketing. In sentences on your resume or cover letter, follow the normal rule: lowercase for general references, capitalize for the formal name.`,
      },
      {
        question: `Is "Bachelor of Science" capitalized?`,
        answer: `Yes. The full formal name of a degree – Bachelor of Science, Bachelor of Arts, Bachelor of Fine Arts – is a proper noun and gets capitalized. The generic bachelor's degree does not.`,
      },
      {
        question: `Is "BS" or "B.S." correct?`,
        answer: `Both are accepted. AP style prefers BS (no periods). Chicago accepts both BS and B.S. Pick one and be consistent throughout your document.`,
      },
      {
        question: `Do you capitalize the major after "Bachelor of Science in"?`,
        answer: `Yes, when it's part of the full formal degree name: Bachelor of Science in Computer Engineering. The entire formal title is capitalized. But in a general sentence, the major stays lowercase: a bachelor's degree in computer engineering.`,
      },
    ],

    ctaWord: `How to List a Bachelor's Degree on Your Resume`,
    ctaText: `Including "bachelor's degree" in a title? Our free Title Case Converter handles the capitalization – and the apostrophe – across AP, APA, Chicago, and MLA styles.`,

    relatedSlugs: ["do-you-capitalize-majors", "is-professor-capitalized", "is-high-school-capitalized", "is-english-capitalized"],
  },

  {
    slug: "is-math-capitalized",
    word: "Math",
    answerVariant: "quick-answer",
    answerBox: `No – "math" is a common noun. Unlike "English" or "French," the word "math" doesn't derive from a proper noun, so it stays lowercase in regular writing: She's good at math. Capitalize it only when it's part of a specific course name – Math 201: Linear Algebra – or at the start of a sentence.`,

    whenHeading: `Why "Math" Stays Lowercase`,
    whenBody: `The capitalization rule for school subjects is straightforward: capitalize languages and proper nouns, lowercase everything else. Math isn't derived from a country, region, or person's name – it comes from the Greek mathēma (meaning "learning") – so it stays lowercase.\n\nThis is exactly the distinction that confuses people. "English" is capitalized because it derives from "England." "French" from "France." "Algebra" from the Arabic mathematician al-Khwārizmī's work – but the word has been fully absorbed into English as a common noun, so it stays lowercase.\n\n"Math," "mathematics," "algebra," "geometry," "calculus," "statistics" – all lowercase in running text. They're fields of study described by common nouns, just like "history," "biology," and "psychology."`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `It's a specific course name: She enrolled in Math 120.`,
        `It's part of an official department or program name: the Department of Mathematics`,
        `It starts a sentence: Math was her strongest subject.`,
        `It appears in a title or heading (title case rules apply)`,
      ],
      lowercaseRules: [
        `Referring to the subject generally: He studied math in college.`,
        `Using it as a modifier: a math teacher, math homework, math skills`,
        `Comparing it to other subjects: She prefers math over science.`,
        `Writing about it informally: I'm not great at math.`,
      ],
      tip: `Course names with numbers are proper nouns – capitalize them. The subject by itself is not.`,
    },

    styleComparisonHeading: `School Subjects: What Gets Capitalized?`,
    styleComparisonBody: `A quick reference that clarifies the full pattern, since "is [subject] capitalized?" is one of the most common grammar searches.\n\nLanguages are always capitalized because they derive from proper nouns: English, Spanish, French, Mandarin, Arabic, Latin. This applies whether you're talking about the language or the school subject.\n\nEverything else stays lowercase: math, science, history, biology, chemistry, physics, art, music, physical education. These are common nouns describing fields of study.\n\nThe exception for all subjects is a specific course name with a number or official title: History 301, Introduction to Biology, Advanced Placement Chemistry. In these cases, you're using the proper name of a specific course, not the general subject.`,

    doExamples: [
      `She scored highest in math and science this semester.`,
      `Math 240: Differential Equations starts in January.`,
      `The math department hired two new instructors.`,
      `He decided to major in mathematics.`,
    ],

    doNotExamples: [
      {
        text: `She's always been good at Math.`,
        reason: `General subject reference is lowercase: She's always been good at math.`,
      },
      {
        text: `He teaches Mathematics at the university.`,
        reason: `General reference, not official department name: He teaches mathematics at the university.`,
      },
      {
        text: `I need to take math 101 next semester.`,
        reason: `Specific course name is a proper noun – capitalize: I need to take Math 101 next semester.`,
      },
    ],

    edgeCasesHeading: "Edge Cases Worth Knowing",
    edgeCasesBody: `These are the scenarios where "math" capitalization causes the most confusion.`,
    edgeCaseItems: [
      `"Mathematics" vs. "math." Same rule for both. "Mathematics" is the full word, "math" (or "maths" in British English) is the shortened form. Neither is a proper noun: She studied mathematics at Oxford.`,
      `Department names. Style guides vary here. AP lowercases department references unless it's the official proper name: the math department vs. the Department of Mathematics at MIT. Chicago follows the same pattern. When in doubt, lowercase.`,
      `STEM and STEAM. These acronyms are capitalized because they're abbreviations: Science, Technology, Engineering, and Mathematics. But when you expand the words, only capitalize if they're at the start of a sentence or in a title.`,
      `Math-related fields. All lowercase as general subjects: algebra, geometry, trigonometry, calculus, statistics, number theory. Capitalize only as part of a specific course name: Calculus II.`,
      `AP and IB courses. "Advanced Placement" and "International Baccalaureate" are proper nouns (program names), so capitalize those words. The subject following them is part of the course name too: AP Mathematics, IB Mathematics: Analysis and Approaches.`,
    ],

    faqItems: [
      {
        question: `Is "math" a proper noun?`,
        answer: `No. "Math" is a common noun – it describes a general field of study, not a specific entity. It doesn't derive from a proper noun (unlike "English" from "England"), so it stays lowercase.`,
      },
      {
        question: `Do you capitalize school subjects?`,
        answer: `Only if they're languages (English, Spanish, French) or specific course names (Math 101, Introduction to Biology). General subjects – math, science, history, art – are lowercase.`,
      },
      {
        question: `Is "Algebra" capitalized?`,
        answer: `Not in general use: She's taking algebra this year. Capitalize only as part of a course name: Algebra II or Introduction to Abstract Algebra.`,
      },
      {
        question: `Should I capitalize "math" on a resume?`,
        answer: `In section headings and labels, capitalizing is fine as a formatting choice. In sentences, follow the standard rule: Completed advanced coursework in math and statistics. Lowercase.`,
      },
      {
        question: `Why is "English" capitalized but "math" isn't?`,
        answer: `"English" derives from "England" – a proper noun – so it's always capitalized regardless of context. "Math" comes from the Greek mathēma and has no connection to a specific place, person, or entity. The proper noun origin is what determines the rule.`,
      },
    ],

    ctaWord: `Why Every Student Should Take More Math Classes`,
    ctaText: `Writing a title with "math" in it? Our free Title Case Converter applies the right capitalization rules for AP, APA, Chicago, and MLA styles.`,

    relatedSlugs: ["is-english-capitalized", "do-you-capitalize-majors", "is-high-school-capitalized", "is-professor-capitalized"],
  },

  {
    slug: "is-english-capitalized",
    word: "English",
    answerVariant: "quick-answer",
    answerBox: `Yes – always. "English" is a proper noun in virtually every context. Whether you're referring to the language (She speaks English), the school subject (He got an A in English), or the nationality (English literature), it keeps its capital letter. This applies to all languages derived from proper nouns – French, Spanish, Japanese, Arabic – not just English.`,

    whenHeading: `Why "English" Is Always Capitalized`,
    whenBody: `"English" derives from "England," a proper noun. In English grammar, words derived from proper nouns retain their capitalization. This is the same reason "French" is always capitalized (from France), "Japanese" is always capitalized (from Japan), and "Shakespearean" is always capitalized (from Shakespeare).\n\nThis is where "English" differs from subjects like math, history, and biology. Those words come from common roots – Greek, Latin – and have no connection to a specific place or person. "Math" comes from the Greek mathēma (learning). "Biology" from Greek bios (life). No proper noun in the origin means no capital letter.\n\nThe rule is consistent and has no style-guide disagreements: all major guides – AP, APA, Chicago, MLA – capitalize "English" in every usage.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `Referring to the language: She speaks English fluently.`,
        `As a school subject: English is her favorite class.`,
        `As a nationality or cultural reference: English customs, English law`,
        `As an adjective derived from England: an English garden, the English Channel`,
        `Referring to English literature or English studies: She majored in English.`,
      ],
      lowercaseRules: [
        `Referring to the billiards/pool spin technique: He put english on the cue ball. (informal, primarily American usage)`,
        `Used as a verb meaning "to translate" in very informal contexts: Can you english that for me? (rare and colloquial)`,
      ],
      tip: `When in doubt, capitalize. The lowercase uses of "english" are extremely rare and limited to specialized contexts.`,
    },

    styleComparisonHeading: `"English" in Every Context`,
    styleComparisonBody: `Unlike most capitalization questions, this one has a simple answer across every common scenario.\n\nAs a language: Always capitalized. She's learning English. The document was translated into English. This applies to all named languages without exception.\n\nAs a school subject: Always capitalized. He's taking English this semester. She teaches English at the high school. This is the key difference from subjects like math or history – "English" is a proper noun even as a subject.\n\nAs an adjective: Always capitalized when referring to England or its people. English literature, English breakfast, the English countryside. The adjective carries the proper noun origin with it.\n\nAs a field of study or major: Always capitalized. She has a degree in English. He's an English major. This combines the language and academic rules – "English" stays capitalized either way.`,

    doExamples: [
      `She speaks English, French, and Mandarin.`,
      `English was his best subject in high school.`,
      `The class covers both American and English literature.`,
      `He put english on the cue ball to make it spin. (billiards term – lowercase accepted)`,
    ],

    doNotExamples: [
      {
        text: `She's studying english at university.`,
        reason: `"English" is a proper noun – always capitalize: She's studying English at university.`,
      },
      {
        text: `The manual is available in english and spanish.`,
        reason: `Languages are always capitalized: The manual is available in English and Spanish.`,
      },
      {
        text: `Do you speak english?`,
        reason: `Always capitalize: Do you speak English?`,
      },
    ],

    edgeCasesHeading: "Edge Cases Worth Knowing",
    edgeCasesBody: `These are the few situations where "English" capitalization gets even slightly complicated.`,
    edgeCaseItems: [
      `"English muffin." Capitalize "English" – it refers to the origin or style associated with England. She ordered an English muffin with her breakfast. Same pattern: English breakfast tea, English bulldog, English saddle. The adjective is derived from a proper noun, so it stays capitalized.`,
      `"English" in billiards. This is the one genuine exception. In pool and billiards, "english" refers to the spin put on a cue ball. American dictionaries like Merriam-Webster list the lowercase form as acceptable: put english on the ball. If you're writing about billiards, lowercase is fine; in any other context, capitalize.`,
      `Other languages. Every language name follows the same rule: French, Spanish, German, Arabic, Swahili, Korean, Hindi. They're all proper nouns. Even dead languages: Latin, Ancient Greek, Sanskrit.`,
      `"Anglicize," "Anglophone." Words derived from "English" through Latin ("Anglo-") keep their capital letter: Anglicize, Anglophone, Anglo-Saxon. But "anglicism" is sometimes lowercased in some dictionaries – check your style guide.`,
      `ESL, EFL, ELL. Abbreviations related to English instruction – English as a Second Language, English as a Foreign Language, English Language Learner – capitalize all words in the full phrase since "English" is always capitalized and the rest form a proper name.`,
    ],

    faqItems: [
      {
        question: `Is "English" a proper noun?`,
        answer: `Yes. "English" is always a proper noun because it derives from "England." This applies whether you're using it as a noun (She speaks English) or as an adjective (English literature). All words derived from the names of countries, regions, or peoples are proper nouns.`,
      },
      {
        question: `Why is "English" capitalized but "math" isn't?`,
        answer: `Because "English" comes from a proper noun (England) and "math" comes from a common Greek root (mathēma). The capitalization rule for school subjects depends entirely on whether the word has a proper noun origin. Languages always do; most other subjects don't.`,
      },
      {
        question: `Do you capitalize all languages?`,
        answer: `Yes – every language name is a proper noun: English, French, Spanish, Mandarin, Arabic, Hindi, Swahili, Latin. This rule has no exceptions in any major style guide.`,
      },
      {
        question: `Is "english" ever lowercase?`,
        answer: `Rarely. The only common lowercase use is in billiards/pool, where "english" describes the spin on a cue ball. Some dictionaries accept this as lowercase. In all other contexts – language, subject, nationality, adjective – "English" is capitalized.`,
      },
      {
        question: `Should I capitalize "English" on a resume?`,
        answer: `Absolutely. "English" is a proper noun and is always capitalized: Fluent in English and Spanish. BA in English Literature. This isn't a style choice – it's a grammar rule.`,
      },
    ],

    ctaWord: `Why Learning English Opens Doors Worldwide`,
    ctaText: `Writing a title that includes "English"? Our free Title Case Converter handles capitalization across AP, APA, Chicago, and MLA styles automatically.`,

    relatedSlugs: ["is-math-capitalized", "do-you-capitalize-majors", "is-professor-capitalized", "is-president-capitalized"],
  },
  {
    slug: "is-god-capitalized",
    word: "God",
    answerVariant: "it-depends",
    answerBox: `It depends on which god you mean. Capitalize "God" when it refers to the deity of a monotheistic religion – Christianity, Judaism, or Islam – because it functions as a proper name. Keep it lowercase when the word works as a category: the Greek gods, a sun god, gods and goddesses.`,

    whenHeading: `When to Capitalize "God"`,
    whenBody: `The rule comes down to whether the word is being used as a name or as a label. In monotheistic religions, "God" is the name of a specific being – there's only one, and the word points directly at it, the same way "Maria" points at a specific person. Proper names get capital letters, so God prayed to, thanked, or quoted in scripture is always capitalized.\n\nThe moment the word describes a type of being instead of naming one, it becomes a common noun. Ancient Greece had many gods. Thor is a god of thunder. In those sentences, "god" works like "king" or "hero" – a category, not a name.\n\nNote that the names of individual deities in any religion are still capitalized: Zeus, Odin, Vishnu, Allah. What stays lowercase is the category word "god" itself when it isn't functioning as a name.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `The monotheistic deity, used as a name: God created the heavens.`,
        `Proper names of specific deities in any religion: Zeus, Allah, Vishnu, Yahweh.`,
        `Common expressions that reference the deity: thank God, God willing, act of God.`,
        `Compounds built on the name: God-fearing, God-given.`,
      ],
      lowercaseRules: [
        `Plural or generic references: the gods of Olympus, gods and goddesses.`,
        `With an article describing a type: a sun god, the god of war.`,
        `Metaphorical uses: he treats money as a god.`,
        `Derived adjectives and nouns: godly, godlike, godsend, godparent.`,
      ],
      tip: `Substitute a personal name. If "God blessed them" works like "Maria blessed them," capitalize. If the word needs "a" or "the" in front to make sense, it's a category – lowercase.`,
    },

    styleComparisonHeading: `What About Pronouns – He or he?`,
    styleComparisonBody: `The noun is settled – every major style guide capitalizes "God" for the monotheistic deity. The real disagreement is over pronouns.\n\nAP style lowercases all pronouns referring to the deity: he, him, his, thee, thou. News writing treats deity pronouns like any other pronoun.\n\nChicago (CMOS 8.95) also lowercases them by default, but explicitly allows capitalization if the author or publisher prefers it. Chicago notes that capitalizing "He" and "Him" can read as an expression of the writer's own faith, so the choice depends on the audience.\n\nReligious publishing often goes the other way – many Christian publishers capitalize deity pronouns as a mark of reverence. If you're writing for a general audience, lowercase is the safer default. If you're writing devotional or liturgical material, follow the publisher's house style and be consistent.`,

    doExamples: [
      `She prays to God every morning.`,
      `The Greek gods lived on Mount Olympus.`,
      `Thank God the storm passed quickly.`,
      `Hindu tradition includes many gods and goddesses.`,
    ],

    doNotExamples: [
      {
        text: `We studied the Greek Gods in mythology class.`,
        reason: `Generic plural – "gods" is a category here, not a name. Lowercase: the Greek gods.`,
      },
      {
        text: `Do you believe in god?`,
        reason: `This refers to the monotheistic deity by name – capitalize: Do you believe in God?`,
      },
      {
        text: `He's a God at chess.`,
        reason: `Metaphorical use – the word means "extremely skilled person," not the deity. Lowercase: a god at chess.`,
      },
    ],

    edgeCasesHeading: `Edge Cases Worth Knowing`,
    edgeCasesBody: `"God" produces more borderline calls than most capitalization questions because the same three letters can be a name, a category, an exclamation, or part of a compound. These are the cases writers actually hit.`,
    edgeCaseItems: [
      `"Oh my God" vs. "omg." In full spelling, most style guides capitalize the exclamation because it invokes the name: oh my God. The texting abbreviation is lowercase by convention: omg. AP uses OMG in the rare cases it prints the abbreviation.`,
      `"Goddess" follows the same logic. Capitalize only as part of a name or formal title (the Goddess Athena in some translations); lowercase as a category: the goddess of wisdom, ancient goddesses.`,
      `Substitute names are capitalized. Words used in place of the name – the Lord, the Almighty, the Creator – take capitals, exactly like the name itself.`,
      `Compounds split by meaning. Keep the capital when the compound contains the name: God-given talent, God-fearing. Lowercase when the word has drifted into ordinary vocabulary: godsend, godfather, godspeed.`,
    ],

    faqItems: [
      {
        question: `Is "god" capitalized in "oh my god"?`,
        answer: `In formal writing, yes – the phrase invokes the deity by name: oh my God. In casual text messages and the abbreviation "omg," lowercase is the accepted convention. Pick based on the formality of what you're writing.`,
      },
      {
        question: `Do you capitalize "He" and "Him" when referring to God?`,
        answer: `AP style says no – deity pronouns are lowercase. Chicago also defaults to lowercase but allows author preference. Many religious publishers capitalize them as a mark of reverence. Choose one approach for your document and stay consistent.`,
      },
      {
        question: `Is "gods" capitalized when writing about Greek mythology?`,
        answer: `No. Plural and generic uses are common nouns: the Greek gods, the gods of Olympus. The individual names are capitalized – Zeus, Athena, Apollo – but the category word "gods" stays lowercase.`,
      },
      {
        question: `Is "godly" capitalized?`,
        answer: `No. Adjectives and derived words are lowercase: godly, godlike, godsend, godless. The exception is compounds that contain the actual name, which keep the capital: God-fearing, God-given.`,
      },
      {
        question: `Is "god" capitalized in a title?`,
        answer: `Yes, always. In title case, every noun is capitalized regardless of the sentence-level rules – so both "In Search of God" and "The Greek Gods of Olympus" capitalize the word. The lowercase rules above apply to regular sentences, not titles.`,
      },
    ],

    ctaWord: `a history of the greek gods`,
    ctaText: `Writing a title with "god" in it? Our free Title Case Converter applies AP, APA, Chicago, or MLA capitalization automatically.`,

    relatedSlugs: ["is-earth-capitalized", "is-president-capitalized", "is-english-capitalized", "do-you-capitalize-seasons"],
  },
  {
    slug: "is-constitution-capitalized",
    word: "Constitution",
    answerVariant: "it-depends",
    answerBox: `It depends on which constitution. Capitalize "Constitution" when referring to the U.S. Constitution – with or without the "U.S." – and when naming another nation's or state's constitution directly: the French Constitution, the Massachusetts Constitution. Lowercase generic references: the state constitution, the club's constitution, constitutional rights.`,

    whenHeading: `When to Capitalize "Constitution"`,
    whenBody: `"Constitution" follows the standard rule for document titles: capitalize it when it names a specific formal document, lowercase it when it describes a type of document.\n\nIn American writing, the U.S. Constitution gets special treatment. AP style capitalizes it even without the "U.S." in front – The senator quoted the Constitution – because readers know exactly which document is meant. Chicago style agrees: the Constitution of the United States, the U.S. Constitution, and the shorthand the Constitution are all capitalized.\n\nFor other constitutions, capitalization depends on whether the name is attached. Write the French Constitution and the Massachusetts Constitution – but the nation's constitution, the state constitution, and the organization's constitution stay lowercase, because those phrases describe rather than name.`,

    ruleBlockHeading: "Quick Rules",
    ruleBlock: {
      capitalizeRules: [
        `The U.S. Constitution, with or without the modifier: She cited the Constitution.`,
        `Another nation's or state's constitution named directly: the French Constitution, the Texas Constitution.`,
        `Formal document titles: the Constitution of the United States.`,
        `Specific amendments: the First Amendment, the 14th Amendment.`,
      ],
      lowercaseRules: [
        `Generic references: the state constitution, the nation's constitution.`,
        `Organizations and clubs: the union's constitution, our chess club's constitution.`,
        `The adjective, always: constitutional law, unconstitutional.`,
        `Generic amendments: a constitutional amendment, several amendments.`,
      ],
      tip: `If you could put the phrase on the document's cover page as its title, capitalize it. If it just describes what kind of document it is, lowercase.`,
    },

    styleComparisonHeading: `AP Style vs. Chicago Style`,
    styleComparisonBody: `The two big guides agree on the essentials here – both capitalize the U.S. Constitution with or without the modifier, both capitalize named amendments, and both lowercase "constitutional" in every position.\n\nThe practical difference is in how amendments are numbered. AP spells out First through Ninth and switches to numerals from 10 up: the First Amendment, the 14th Amendment. Chicago spells out numbers through one hundred: the Fourteenth Amendment.\n\nOne shared trap: "constitutional" never inherits the capital from "Constitution." Even in phrases tied directly to the U.S. document – constitutional convention, constitutional scholar, constitutional rights – the adjective is lowercase in both guides.`,

    doExamples: [
      `The Supreme Court interprets the Constitution.`,
      `The First Amendment protects freedom of speech.`,
      `Delegates drafted the Massachusetts Constitution in 1779.`,
      `The bylaws function as the club's constitution.`,
    ],

    doNotExamples: [
      {
        text: `The law was ruled unconstitutional under the constitution.`,
        reason: `Reference to the U.S. Constitution – capitalize: under the Constitution. ("Unconstitutional" is correctly lowercase.)`,
      },
      {
        text: `Every member received a copy of the club's Constitution.`,
        reason: `An organization's governing document is a generic reference – lowercase: the club's constitution.`,
      },
      {
        text: `The court cited the first amendment.`,
        reason: `Named amendments are capitalized: the First Amendment.`,
      },
    ],

    edgeCasesHeading: `Edge Cases Worth Knowing`,
    edgeCasesBody: `Most mistakes with "constitution" come from over-capitalizing – writers see a legal context and reach for the capital letter. These are the boundaries.`,
    edgeCaseItems: [
      `Standalone references to other countries' constitutions. With the country name, capitalize: the French Constitution. Without it, lowercase: France adopted a new constitution in 1958.`,
      `"Constitutional" never takes a capital – not in constitutional convention, constitutional law, or constitutional amendment. The adjective is always lowercase, even right next to a capitalized "Constitution."`,
      `Amendment numbers follow your style guide. AP: First through Ninth spelled out, numerals from the 10th Amendment on. Chicago: spelled out through one hundred – the Fourteenth Amendment.`,
      `Historical documents follow the same title rule: the Articles of Confederation, the Bill of Rights, and the Declaration of Independence are all capitalized as formal document names.`,
    ],

    faqItems: [
      {
        question: `Is "constitution" capitalized when it stands alone?`,
        answer: `Only when it refers to the U.S. Constitution. AP and Chicago both capitalize the standalone shorthand – defend the Constitution – because it names a specific document. A standalone reference to any other constitution is lowercase: the country ratified its constitution.`,
      },
      {
        question: `Is "constitutional" capitalized?`,
        answer: `No, never. The adjective is always lowercase: constitutional rights, constitutional law, unconstitutional. This holds in every major style guide, even when the word sits next to a capitalized "Constitution."`,
      },
      {
        question: `Do you capitalize "amendment"?`,
        answer: `Capitalize named amendments: the First Amendment, the 14th Amendment. Lowercase generic uses: a constitutional amendment, the amendment process. The word only takes a capital when it's part of a specific amendment's name.`,
      },
      {
        question: `Is "bill of rights" capitalized?`,
        answer: `Yes – the Bill of Rights is the formal name of the first ten amendments to the U.S. Constitution, so it's capitalized as a document title. A generic bill of rights for another context (a consumer bill of rights) is lowercase.`,
      },
      {
        question: `Is "constitution" capitalized in a title?`,
        answer: `Yes. In title case, all nouns are capitalized regardless of sentence-level rules – "A Guide to the Constitution" and "How State Constitutions Work" both capitalize it. The lowercase rules apply to regular sentences, not headlines.`,
      },
    ],

    ctaWord: `a beginner's guide to the constitution`,
    ctaText: `Writing a headline about law or government? Our free Title Case Converter applies AP, APA, Chicago, or MLA rules automatically.`,

    relatedSlugs: ["is-president-capitalized", "is-earth-capitalized", "is-high-school-capitalized", "is-god-capitalized"],
  },
]

export function getGenCapArticleBySlug(slug: string): GenCapArticle | undefined {
  return GEN_CAP_ARTICLES.find((article) => article.slug === slug)
}
