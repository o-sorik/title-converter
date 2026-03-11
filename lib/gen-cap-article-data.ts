import type { DoNotExample, FAQItem } from "@/lib/is-x-article-data"

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

    relatedSlugs: ["do-you-capitalize-seasons", "do-you-capitalize-after-a-colon"],
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

    relatedSlugs: ["is-earth-capitalized", "do-you-capitalize-after-a-colon", "is-president-capitalized"],
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

    relatedSlugs: ["do-you-capitalize-seasons", "is-president-capitalized"],
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

    relatedSlugs: ["is-president-capitalized", "do-you-capitalize-seasons"],
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

    relatedSlugs: ["do-you-capitalize-seasons", "is-president-capitalized"],
  },
]

export function getGenCapArticleBySlug(slug: string): GenCapArticle | undefined {
  return GEN_CAP_ARTICLES.find((article) => article.slug === slug)
}
