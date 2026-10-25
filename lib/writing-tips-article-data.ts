import type { ArticleSection, FAQItem } from "@/lib/article-content"
import type { ConverterLink } from "@/lib/converter-anchors"
import { STATS_ARTICLES } from "@/lib/stats-articles"
import { STYLE_GUIDE_ARTICLES } from "@/lib/style-guide-articles"
import {
  COLON,
  DIAGRAM_HEADLINE,
  DIAGRAM_MARKS,
  DIAGRAM_NOTES,
  DIAGRAM_WORDS,
  SAME_HEADLINES,
  TO_SENTENCE,
  TO_TITLE,
} from "@/lib/sentence-vs-title-case-content"
import { CONVERTER_LIMITS, EXAMPLES, MAJOR_WORD_ROWS, REASON_SAMPLES, WORD_ROWS, majorTitle } from "@/lib/lowercase-words-content"

export interface WritingTipsArticle {
  slug: string
  faqItems: FAQItem[]
  /** H2 above the FAQ block; defaults to "Frequently Asked Questions". */
  faqHeading?: string
  ctaWord: string
  ctaText?: string
  relatedSlugs: string[]
  /** One contextual in-body link to the converter, rendered after the intro section. */
  converterLink: ConverterLink
  tags: string[]
  sections: ArticleSection[]
}

export const WRITING_TIPS_ARTICLES: WritingTipsArticle[] = [
  {
    slug: "what-words-are-not-capitalized-in-a-title",
    converterLink: {
      anchor: "title capitalization checker",
      before: "To test a title of your own, paste it into the ",
      after: ", pick AP, APA, Chicago or MLA, and press Explain to see why each small word stayed lowercase.",
    },
    tags: ["Title Case", "Grammar 101", "Style Guides"],
    ctaWord: "what words are not capitalized in a title",
    ctaText: "Paste your title and pick AP, APA, Chicago or MLA – the free converter lowercases the small words that guide lowercases and explains every change.",
    relatedSlugs: [
      "is-capitalized-in-title-case",
      "with-capitalized-in-title-case",
      "the-capitalized-in-title-case",
      "do-you-capitalize-after-a-colon",
      "sentence-vs-title-case",
      "chicago-title-case",
    ],
    faqHeading: "Questions about lowercase words in titles",
    faqItems: [
      {
        question: `Is "is" capitalized in a title?`,
        answer: `Yes, in every style guide. "Is" is a verb, and verbs are capitalized however short they are: What Is Title Case.`,
      },
      {
        question: `Is "it" capitalized in a title?`,
        answer: `Yes. "It" is a pronoun, not an article, so AP, APA, Chicago and MLA all capitalize it: Make It Count.`,
      },
      {
        question: `Is "for" capitalized in a title?`,
        answer: `No, unless it is the first or last word. "For" is both a coordinating conjunction and a three-letter preposition, and every guide lowercases it: Recipes for Beginners.`,
      },
      {
        question: `Is "about" capitalized in a title?`,
        answer: `In AP, APA and Chicago, yes – it is a preposition of five letters. MLA lowercases prepositions of any length, so it writes A Book about Grief.`,
      },
      {
        question: `Is "as" capitalized in a title?`,
        answer: `Usually not. AP, APA and Chicago lowercase it. MLA lowercases it as a preposition (The Artist as Critic) but capitalizes it when it opens a clause (Life As I Find It).`,
      },
      {
        question: `Should "not" be capitalized in a title?`,
        answer: `Yes. "Not" is an adverb, and adverbs are major words in every guide: Why Not Start Today.`,
      },
    ],
    sections: [
      {
        id: "intro",
        blocks: [
          {
            type: "paragraph",
            text: "Articles, coordinating conjunctions, short prepositions and the *to* of an infinitive stay lowercase in a title, unless they are the first or last word. What counts as short depends on the style guide: AP and APA lowercase prepositions of up to three letters, Chicago up to four, and MLA lowercases prepositions of any length.",
          },
          {
            type: "paragraph",
            text: "Length alone does not decide, though – the role of the word does. *Is*, *It* and *Not* are as short as *in* and *of*, but they are a verb, a pronoun and an adverb, so every guide capitalizes them. And the same word can get different answers: Chicago capitalizes *so* and *yet*, which AP, APA and MLA keep lowercase.",
          },
        ],
      },
      {
        id: "lowercase-words",
        heading: "The words that stay lowercase in a title",
        tocLabel: "The four groups",
        blocks: [
          { type: "paragraph", text: "Four groups of words stay lowercase when they fall inside a title:" },
          {
            type: "list",
            ordered: true,
            items: [
              `**Articles** – *a*, *an* and *the*, in every guide: *${EXAMPLES.articleA.ap}*, *${EXAMPLES.articleAn.ap}*.`,
              `**Coordinating conjunctions** – *and*, *but*, *or*, *nor* and *for* in every guide, plus *so* and *yet* in AP, APA and MLA: *${EXAMPLES.pride.ap}*, *${EXAMPLES.sink.ap}*.`,
              "**Short prepositions** – *at*, *by*, *in*, *of*, *on*, *to*, *up* and any other preposition under the guide's length limit: under four letters in AP and APA, under five in Chicago, any length in MLA.",
              `**To before a verb** – the infinitive marker is lowercase in every guide: *${majorTitle("be")}*.`,
            ],
          },
          {
            type: "paragraph",
            text: "Everything else is a major word and takes a capital: nouns, verbs, pronouns, adjectives and adverbs, however short. AP and APA also lowercase the two-letter conjunctions *as* and *if*; how Chicago and MLA treat them is covered below.",
          },
        ],
      },
      {
        id: "by-style-guide",
        heading: "Lowercase words in AP, APA, Chicago and MLA",
        tocLabel: "Word by word",
        blocks: [
          {
            type: "paragraph",
            text: "Each row shows what a guide does with the word in the middle of a title. Words that have their own page link to it.",
          },
          {
            type: "wordFormMatrix",
            rowHeader: "Word",
            caption: "Each guide's column shows the word as it appears in a title. Shaded rows are where the guides disagree.",
            rows: WORD_ROWS.map((row) => ({
              word: row.word,
              href: row.slug ? `/blog/${row.slug}` : undefined,
              note: row.kind,
              guides: row.capitalized,
            })),
          },
          {
            type: "paragraph",
            text: "Read down a column and each guide's line shows. AP and APA switch to capitals at four letters, Chicago at five, and MLA never does for a preposition. Outside the prepositions, only *so*, *yet* and *if* split the guides.",
          },
          { type: "heading", level: 3, grouping: true, text: "Which prepositions does each style guide lowercase?" },
          {
            type: "paragraph",
            text: "All four lowercase prepositions of one to three letters. Above that, each guide draws its own line. [Title Capitalization Rules by Style Guide](/capitalization-rules-guide) compares the four rule sets in full.",
          },
          { type: "heading", level: 4, text: "AP and APA capitalize prepositions of four letters or more" },
          {
            type: "paragraph",
            text: `APA capitalizes [every word of four letters or more](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case), and the AP Stylebook capitalizes prepositions and conjunctions of four or more letters in composition titles. So *with* and *from* take capitals: *${EXAMPLES.fourLetters.ap}* in AP and APA, *${EXAMPLES.fourLetters.chicago}* in Chicago and MLA.`,
          },
          { type: "heading", level: 4, text: "Chicago capitalizes prepositions of five letters or more" },
          {
            type: "paragraph",
            text: `The 18th edition of the Chicago Manual of Style (2024) capitalizes prepositions of five letters or more; earlier editions lowercased them at any length. Chicago writes *${EXAMPLES.fiveLetters.chicago}*, keeping four-letter words such as *with*, *from* and *into* lowercase. [Chicago Title Case: What the 18th Edition Changed](/blog/chicago-title-case) covers the edition change.`,
          },
          { type: "heading", level: 4, text: "MLA lowercases prepositions of any length" },
          {
            type: "paragraph",
            text: `MLA lowercases [every preposition](https://style.mla.org/capitalization-of-titles/), whatever its length: *${EXAMPLES.anyLength.mla}*, where the other three guides write *Between*. The rule covers [prepositions of two words](https://style.mla.org/two-word-prepositions-in-titles/) too – MLA styles John Irving's novel *${EXAMPLES.according.mla}*.`,
          },
          { type: "heading", level: 4, text: "Vs. and v. stay lowercase in every style" },
          {
            type: "paragraph",
            text: `*Versus* and its abbreviations are lowercase in all four guides: *${EXAMPLES.versus.ap}*, and in case names *${EXAMPLES.legalVersus.ap}*.`,
          },
          { type: "heading", level: 3, grouping: true, text: "Which conjunctions stay lowercase?" },
          {
            type: "paragraph",
            text: "Coordinating conjunctions stay lowercase, with two exceptions in Chicago. Subordinating conjunctions are capitalized, with the short ones split by guide.",
          },
          { type: "heading", level: 4, text: "And, but, or, nor and for are lowercase in every style" },
          {
            type: "paragraph",
            text: `These five join equal parts of a title and stay lowercase in AP, APA, Chicago and MLA: *${EXAMPLES.pride.ap}*, *${EXAMPLES.sink.ap}*. *For* is also a preposition and is lowercase in either role.`,
          },
          { type: "heading", level: 4, text: "Chicago capitalizes so and yet" },
          {
            type: "paragraph",
            text: `Chicago lowercases only *and*, *but*, *for*, *or* and *nor* – its [Q&A](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles/faq0098.html) calls them the "five common coordinating conjunctions." *So* and *yet* are therefore major words: *${EXAMPLES.yet.chicago}* in Chicago, *${EXAMPLES.yet.ap}* in AP, APA and MLA.`,
          },
          {
            type: "paragraph",
            text: `In those three guides *so* is lowercase only when it joins two clauses after a comma: *${EXAMPLES.soJoins.ap}*. As an adverb it is capitalized everywhere: *${EXAMPLES.soAdverb.ap}*.`,
          },
          { type: "heading", level: 4, text: "Chicago and MLA capitalize subordinating conjunctions, while AP and APA go by length" },
          {
            type: "paragraph",
            text: `Subordinating conjunctions such as *because*, *when* and *that* are capitalized in all four guides. The short ones split them. APA lists *if* among the [short conjunctions it lowercases](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case), and AP capitalizes only conjunctions of four letters or more, so both write *${EXAMPLES.ifClause.ap}*. Chicago and MLA capitalize every subordinating conjunction: *${EXAMPLES.ifClause.chicago}*.`,
          },
          {
            type: "paragraph",
            text: `*As* is the exception in Chicago, which lowercases it in any role: *${EXAMPLES.asClause.chicago}*. MLA capitalizes it when it opens a clause; the MLA Handbook's own example is *${EXAMPLES.asClause.mla}*.`,
          },
        ],
      },
      {
        id: "always-capitalized",
        heading: "Short words that are always capitalized",
        tocLabel: "Short but capitalized",
        blocks: [
          {
            type: "paragraph",
            text: "Short is not the same as minor. A two-letter verb or pronoun is a major word, and every guide capitalizes it in any position:",
          },
          {
            type: "table",
            headers: ["Word", "Part of speech", "Title, the same in every guide"],
            rows: MAJOR_WORD_ROWS.map((row) => [row.slug ? `[${row.word}](/blog/${row.slug})` : row.word, row.kind, `*${row.title}*`]),
          },
          { type: "heading", level: 3, grouping: true, text: "Which short words are major words?" },
          {
            type: "paragraph",
            text: "Any word that is not an article, a preposition or a conjunction. Four groups catch writers out most often.",
          },
          { type: "heading", level: 4, text: "Verbs such as is, are, be and do" },
          {
            type: "paragraph",
            text: `Every form of a verb is capitalized, including *Is*, *Am*, *Are*, *Be* and *Do*: *${majorTitle("is")}*, *${majorTitle("are")}*. Lowercasing *is* is the most common title case mistake.`,
          },
          { type: "heading", level: 4, text: "Pronouns and possessives such as it, my, your and its" },
          {
            type: "paragraph",
            text: `*It* is a pronoun, not an article, and *my*, *your* and *its* are possessives: *${majorTitle("it")}*, *${majorTitle("its")}*.`,
          },
          { type: "heading", level: 4, text: "Adverbs and negatives such as not, too and also" },
          {
            type: "paragraph",
            text: `*Not*, *too*, *also* and *so* used as an adverb are major words: *${majorTitle("not")}*, *${majorTitle("too")}*.`,
          },
          { type: "heading", level: 4, text: "That is always capitalized" },
          {
            type: "paragraph",
            text: `*That* has four letters, so AP and APA capitalize it by length, and Chicago and MLA capitalize it as a pronoun or a subordinating conjunction: *${majorTitle("that")}*.`,
          },
        ],
      },
      {
        id: "exceptions",
        heading: "When a lowercase word is capitalized",
        tocLabel: "Exceptions",
        blocks: [
          {
            type: "paragraph",
            text: "Position and role override the list. Any word from the table above takes a capital in these places.",
          },
          { type: "heading", level: 3, grouping: true, text: "Which positions capitalize any word?" },
          { type: "heading", level: 4, text: "The first and the last word" },
          {
            type: "paragraph",
            text: `*${EXAMPLES.firstWord.ap}* opens with a preposition and *${EXAMPLES.lastWord.ap}* ends with one. Both are capitalized in every guide.`,
          },
          { type: "heading", level: 4, text: "The first word after a colon" },
          {
            type: "paragraph",
            text: `A subtitle starts like a new title, so its first word is capitalized: *${EXAMPLES.colon.ap}*. Inside a sentence the rules differ – see [Do You Capitalize After a Colon?](/blog/do-you-capitalize-after-a-colon)`,
          },
          { type: "heading", level: 4, text: "A preposition with no object" },
          {
            type: "paragraph",
            text: `A preposition without an object works as an adverb and is capitalized: *${EXAMPLES.noObject.mla}*, *${EXAMPLES.noObjectQuestion.chicago}*.`,
          },
          { type: "heading", level: 3, grouping: true, text: "When does a small word change its role?" },
          { type: "heading", level: 4, text: "Up, on and in as part of a phrasal verb" },
          {
            type: "paragraph",
            text: `In a phrasal verb the small word is an adverb, not a preposition, and is capitalized: *${EXAMPLES.phrasalVerb.ap}*, *${EXAMPLES.logIn.ap}*. Before a noun the same word is a preposition again: *${EXAMPLES.upPreposition.ap}*.`,
          },
          { type: "heading", level: 4, text: "Since, until and than when they start a clause" },
          {
            type: "paragraph",
            text: `These words are prepositions before a noun and conjunctions before a clause. MLA writes *${EXAMPLES.sincePreposition.mla}* but *${EXAMPLES.sinceClause.mla}*. Chicago, which lowercases four-letter prepositions, writes *${EXAMPLES.thanPreposition.chicago}* but *${EXAMPLES.thanClause.chicago}* – both from its [Q&A on "than"](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles/faq0074.html).`,
          },
          { type: "heading", level: 3, text: "How are small words handled in hyphenated compounds?" },
          {
            type: "paragraph",
            text: `The first element is always capitalized, and each later element follows the rules for a separate word. *${EXAMPLES.selfReport.ap}* capitalizes both parts; in *${EXAMPLES.upToDate.ap}* the *to* stays lowercase and *Date* is capitalized.`,
          },
        ],
      },
      {
        id: "converter",
        heading: "How the converter decides which words stay lowercase",
        tocLabel: "In the converter",
        blocks: [
          {
            type: "paragraph",
            text: `The converter applies the table above to the guide you pick. Choose AP, APA, Chicago or MLA, paste a title and press Explain: every word it changed carries the rule behind it, such as *${REASON_SAMPLES[0]}* or *${REASON_SAMPLES[2]}*.`,
          },
          {
            type: "paragraph",
            text: "It reads roles from patterns, not meaning, so check two things by hand:",
          },
          {
            type: "list",
            items: [
              `**A noun that is also a verb.** Before *in*, *up* or *on*, such a noun looks like a phrasal verb: the converter writes *${CONVERTER_LIMITS.nounBeforeParticle.converter}*, where every guide wants *${CONVERTER_LIMITS.nounBeforeParticle.correct}*.`,
              `**A phrasal verb it does not know.** It recognizes common verbs such as *set up* and *log in*. With a rarer verb, Chicago and MLA output keeps the particle lowercase: *${CONVERTER_LIMITS.unknownPhrasalVerb.converter}* instead of *${CONVERTER_LIMITS.unknownPhrasalVerb.correct}*.`,
            ],
          },
        ],
      },
      {
        id: "sources",
        heading: "Sources",
        hideFromToc: true,
        blocks: [
          {
            type: "list",
            items: [
              "[APA Style: Title Case Capitalization](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case) – words of four letters or more, and the short conjunctions APA lowercases",
              "[The Chicago Manual of Style Online: Q&A on coordinating conjunctions](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles/faq0098.html) and [on \"than\"](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles/faq0074.html)",
              "[MLA Style Center: Capitalization of Titles](https://style.mla.org/capitalization-of-titles/) and [Two-Word Prepositions in Titles](https://style.mla.org/two-word-prepositions-in-titles/); MLA Handbook, 9th ed., 2.90",
              "The Associated Press Stylebook, entry \"composition titles\"",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "sentence-vs-title-case",
    converterLink: {
      anchor: "online title case converter",
      before: "To see both cases on your own headline, paste it into the ",
      after: ", switch between Title Case and Sentence case, and press Explain for the rule behind every changed word.",
    },
    tags: ["Title Case", "Sentence Case", "Writing Tips"],
    ctaWord: "how to choose between title case and sentence case",
    ctaText: "Try both cases on your own headline – the free converter switches between title case (AP, APA, Chicago, MLA) and sentence case and explains every change.",
    relatedSlugs: [
      "what-words-are-not-capitalized-in-a-title",
      "do-you-capitalize-after-a-colon",
      "apa-7-title-case-guide",
      "ap-title-capitalization-basics",
    ],
    faqHeading: "Questions about title case and sentence case",
    faqItems: [
      {
        question: "What is sentence case?",
        answer: "Sentence case capitalizes a headline the way a sentence is capitalized: the first word, proper nouns, the pronoun I and acronyms. Every other word is lowercase.",
      },
      {
        question: "What is title case?",
        answer: "Title case capitalizes the first and last words and every major word of a headline, and keeps articles, short prepositions and coordinating conjunctions lowercase. Which small words stay lowercase depends on the style guide.",
      },
      {
        question: "Is sentence case the same as lowercase?",
        answer: "No. Lowercase removes every capital. Sentence case keeps the capitals on the first word, on proper nouns and on acronyms.",
      },
      {
        question: "What is the opposite of sentence case?",
        answer: "There is no single opposite. For headlines, title case is the usual alternative; for emphasis, some designs use ALL CAPS, which capitalizes every letter.",
      },
      {
        question: "Should headlines be written in ALL CAPS?",
        answer: "Rarely. In Tinker and Paterson's 1928 study of 320 readers, text set in capitals was read about 12% slower than lowercase text. All caps suits a word or two, such as a label, not a full headline.",
      },
      {
        question: "Is sentence case the same as camel case?",
        answer: "No. Camel case is not a headline style at all: it joins words without spaces and capitalizes each word after the first, as in camelCase, and is used for names in code.",
      },
    ],
    sections: [
      {
        id: "intro",
        blocks: [
          {
            type: "paragraph",
            text: `Title case capitalizes every major word: *${DIAGRAM_HEADLINE.title}*. Sentence case capitalizes only the first word and names: *${DIAGRAM_HEADLINE.sentence}*. The choice between them is rarely a matter of taste. A style guide or a publication makes it – and the same guide often asks for both: APA puts headings in title case and the titles in a reference list in sentence case.`,
          },
          {
            type: "paragraph",
            text: "The two cases also convert unevenly. Going from sentence case to title case is a rule a converter can apply. Going back needs someone who knows which words are names.",
          },
        ],
      },
      {
        id: "how-they-differ",
        heading: "How title case and sentence case differ",
        tocLabel: "How they differ",
        blocks: [
          { type: "paragraph", text: "Title case and sentence case differ in seven ways:" },
          {
            type: "list",
            ordered: true,
            items: [
              "**Capitals.** Title case capitalizes every major word – nouns, verbs, adjectives, adverbs and pronouns, short ones like *Is* and *It* included. Sentence case capitalizes the first word only.",
              "**Small words.** Articles, short prepositions and coordinating conjunctions stay lowercase in both cases. In title case they are the exceptions the style guides argue over – [What Words Are Not Capitalized in a Title?](/blog/what-words-are-not-capitalized-in-a-title) lists them by guide.",
              "**The word after a colon.** Title case always capitalizes it. In sentence case the guide decides: AP headlines and APA titles capitalize it, and in running text it depends on whether a full sentence follows – see [Do You Capitalize After a Colon?](/blog/do-you-capitalize-after-a-colon)",
              "**Names and acronyms.** Here the two cases agree: proper nouns, the pronoun *I* and acronyms keep their capitals in both.",
              "**Number of rules.** Sentence case follows one rule – capitalize as you would in a sentence. Title case follows a style guide, and AP, APA, Chicago and MLA disagree on words such as *with* and *into*.",
              "**Where each is the default.** Title case is the default for the titles of books, articles and other works, and for headings in APA papers. Sentence case is the default for AP news headlines, APA reference lists, and interface text in Google's and Microsoft's style guides.",
              "**Which direction converts cleanly.** Sentence case converts to title case by rule. Title case converts back only when someone knows which words are names, so this direction always needs a second look.",
            ],
          },
          {
            type: "caseDiagram",
            rows: [
              {
                label: "Title case – AP, APA, Chicago and MLA agree",
                text: DIAGRAM_HEADLINE.title,
                marks: DIAGRAM_MARKS,
              },
              {
                label: "Sentence case – AP headline, APA title",
                text: DIAGRAM_HEADLINE.sentence,
                marks: DIAGRAM_MARKS,
              },
              {
                label: "What a converter returns in sentence case",
                text: DIAGRAM_HEADLINE.converter,
                marks: [{ index: DIAGRAM_WORDS.mars, tone: "check" }],
              },
            ],
            notes: DIAGRAM_NOTES,
            caption:
              "Green marks a word that changes between the cases, blue a word that stays the same, red the word the converter gets wrong: a name it lowercased.",
          },
        ],
      },
      {
        id: "same-headlines",
        heading: "The same headlines in title case and sentence case",
        tocLabel: "Examples",
        blocks: [
          {
            type: "paragraph",
            text: "Five headlines in both cases. The last column points back to the numbered differences above.",
          },
          {
            type: "table",
            headers: ["Title case", "Sentence case", "What differs"],
            rows: SAME_HEADLINES.map((pair) => [pair.title, pair.sentence, pair.shows]),
          },
        ],
      },
      {
        id: "which-to-use",
        heading: "Which case to use: the standard decides, not taste",
        tocLabel: "Which to use",
        blocks: [
          {
            type: "paragraph",
            text: "Use the case your style guide or publication requires. Where nothing is required, pick one case for each level of heading and keep it across the site. A title-case page title over sentence-case section headings is a consistent pattern; switching case between headings of the same level is not.",
          },
          { type: "heading", level: 3, grouping: true, text: "Which style guides require title case, and which require sentence case?" },
          {
            type: "paragraph",
            text: "All four major guides put the titles of works in title case. They differ on where sentence case comes in. The word-by-word rules for each guide are in [Title Capitalization Rules by Style Guide](/capitalization-rules-guide).",
          },
          { type: "heading", level: 4, text: "APA uses title case for headings and sentence case for references" },
          {
            type: "paragraph",
            text: "APA 7 uses [title case](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case) for the paper title, every level of heading, and the titles of works mentioned in the text. In the reference list, titles of articles, books, reports and webpages switch to [sentence case](https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case) – even when the original used title case – while journal names stay in title case. *Thinking, Fast and Slow* in the text becomes *Thinking, fast and slow* in the references.",
          },
          {
            type: "paragraph",
            text: "Tables and figures split the same way: their titles take title case, column headings and notes take sentence case. [Citing Titles in APA: Book vs Article Formatting](/blog/apa-citing-titles) walks through the reference-list patterns.",
          },
          { type: "heading", level: 4, text: "AP uses title case for composition titles and sentence case for headlines" },
          {
            type: "paragraph",
            text: "AP news headlines capitalize only the first word and proper nouns, plus the first word after a colon ([@APStylebook](https://x.com/APStylebook/status/1021397036808265729)). Titles of books, films and songs take title case: the AP Stylebook capitalizes their principal words, including prepositions and conjunctions of four or more letters. [AP Style: When to Capitalize Titles and Jobs](/blog/ap-title-capitalization-basics) covers the composition-title rules.",
          },
          { type: "heading", level: 4, text: "Chicago and MLA use title case for titles of works" },
          {
            type: "paragraph",
            text: "The Chicago Manual of Style calls title case [usually preferred](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles.html) for the titles of works; its 18th edition (2024) also renamed headline style and sentence style to [title case and sentence case](https://www.chicagomanualofstyle.org/help-tools/what-s-new.html). Sentence case appears in Chicago for titles in some journals' reference lists and as its first recommendation for titles in languages other than English.",
          },
          {
            type: "paragraph",
            text: "MLA capitalizes the [first word, the last word and all principal words](https://style.mla.org/capitalizing-handout-title/) of an English title, with separate rules for titles in other languages. Neither guide fixes the case of section headings: Chicago (18th ed., 2.65) accepts either case for subheads as long as each level is treated consistently.",
          },
          { type: "heading", level: 3, grouping: true, text: "Which case do news headlines use?" },
          {
            type: "paragraph",
            text: "They split, and not along the Atlantic. On October 17, 2026, two of nine major news sites ran title-case headlines – The New York Times and The Wall Street Journal (*SoftBank in Early Talks to Buy Allied Universal*). The other seven used sentence case: AP, Reuters, The Washington Post, NPR (*Coastal homes burn as hot winds fuel California fires*), the BBC, The Guardian and The Economist.",
          },
          {
            type: "paragraph",
            text: "A publication's house style decides for its own writers. For a site without one, the AP headline rule – first word and proper nouns – is the one most newsrooms share.",
          },
          { type: "heading", level: 3, grouping: true, text: "Which case do product interfaces use?" },
          {
            type: "paragraph",
            text: "It depends on whose guidelines the product follows. Google's [Material Design 3](https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices) asks for sentence case on all interface text – titles, headings, labels, menu items, navigation and buttons – and Google's [developer documentation style guide](https://developers.google.com/style/capitalization) uses sentence case for titles and headings. The [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/capitalization) uses sentence-style capitalization for most titles, headings and UI labels.",
          },
          {
            type: "paragraph",
            text: "Apple is the exception. Its Human Interface Guidelines call for title-style capitalization on [button labels](https://developer.apple.com/design/human-interface-guidelines/buttons), [menu items](https://developer.apple.com/design/human-interface-guidelines/menus) and alert buttons, and for everything else [ask apps to choose a style](https://developer.apple.com/design/human-interface-guidelines/writing) for each type of element and use it consistently.",
          },
          { type: "heading", level: 3, grouping: true, text: "Which case works for ads, email and marketing copy?" },
          {
            type: "paragraph",
            text: "No rule requires either. [Google Ads policy](https://support.google.com/adspolicy/answer/14848295) rejects capitalization that is excessive or gimmicky – *FLOWERS*, *FlOwErS* – and says nothing against title case; [Google Ads Editor](https://support.google.com/google-ads/editor/answer/56358) offers title case as a built-in option. For email the evidence is observational: across about 6 million PR pitches sent to journalists, subject lines in title case were opened more often than those in sentence case – 40.75% against 35.03% ([BuzzStream](https://www.buzzstream.com/blog/subject-line-study/)) – but nothing else was held constant. Treat the case as a brand decision, test it on your own list, and keep one case for every ad or subject line in a campaign.",
          },
          { type: "heading", level: 3, grouping: true, text: "Does the choice affect SEO or readability?" },
          {
            type: "paragraph",
            text: "For search ranking, there is no documented effect. Google treats queries without regard to case – a search for *New York Times* is the same as *new york times* ([Google Search Help](https://support.google.com/websearch/answer/134479)) – and Google's John Mueller has said all-caps headings get no special treatment ([Search Engine Roundtable](https://www.seroundtable.com/google-all-case-seo-32105.html)). Click-through is less settled: in one published split test, a site that switched 70 title tags from title case to sentence case saw organic clicks fall 2.4% ([Semrush, 2022](https://www.semrush.com/blog/seo-split-test-result-should-you-sentence-case-or-title-sase-your-title-tags-/)). One site is not a rule.",
          },
          {
            type: "paragraph",
            text: "For readability, no controlled study has compared title case with sentence case. The research that exists compares lowercase with ALL CAPS: in Tinker and Paterson's 1928 study of 320 readers, text set in capitals was read about 12% slower (Tinker, *Legibility of Print*, 1963). It says nothing about which of the two mixed cases reads faster, so claims that sentence case is easier to read are opinions, not findings. Nielsen Norman Group's advice is the practical one: [pick one capitalization style and stick to it](https://www.nngroup.com/articles/tabs-used-right/).",
          },
        ],
      },
      {
        id: "how-to-convert",
        heading: "How to convert between title case and sentence case",
        tocLabel: "How to convert",
        blocks: [
          {
            type: "paragraph",
            text: "The two directions are not mirror images. One is a lookup of small words; the other needs knowledge of the text.",
          },
          { type: "heading", level: 3, text: "Title case to sentence case keeps the first word, names and acronyms" },
          {
            type: "paragraph",
            text: `Correct sentence case lowercases everything except the first word, proper nouns, the pronoun *I* and acronyms. A converter handles the first part and keeps the acronyms and brand spellings it recognizes: *${TO_SENTENCE.kept.input}* becomes *${TO_SENTENCE.kept.output}*.`,
          },
          {
            type: "paragraph",
            text: `What it cannot see is which ordinary-looking words are names. *${TO_SENTENCE.names.input}* comes out as *${TO_SENTENCE.names.output}*, and *Agreement* and *Brazil* need their capitals back. Text that is already in sentence case keeps the capitals it has, because there they can only be names. The [Sentence Case Converter](/sentence-case-converter) shows every word it changed when you press Explain, so the names are quick to find.`,
          },
          { type: "heading", level: 3, text: "Sentence case to title case follows one style guide's small-word list" },
          {
            type: "paragraph",
            text: `This direction is mechanical once a guide is chosen: capitalize the first and last words and every major word, and keep the guide's small words lowercase. The guide still matters. *${TO_TITLE.input}* becomes *${TO_TITLE.ap}* in AP and APA, and *${TO_TITLE.chicago}* in Chicago and MLA, because only AP and APA capitalize four-letter prepositions.`,
          },
          { type: "heading", level: 3, grouping: true, text: "Which decisions does a converter leave to you?" },
          {
            type: "list",
            items: [
              "**Names.** People, places and organizations spelled like ordinary words lose their capitals when you convert from title case or all caps. Check every proper noun after converting.",
              `**The word after a colon in a sentence.** In a title the converter capitalizes it, as AP headlines and APA titles ask: *${COLON.title.input}* becomes *${COLON.title.output}*. In a sentence that ends with a period it stays lowercase – *${COLON.sentence.output}* – so capitalize it by hand when a full sentence follows.`,
              `**Acronyms in all-caps text.** Acronyms typed in capitals are kept, but text typed entirely in capitals hides them, and only common ones such as NASA, API and UK are recognized: *${TO_SENTENCE.unknownAcronym.input}* comes out as *${TO_SENTENCE.unknownAcronym.output}*.`,
              "**Which style guide to follow.** In title case the converter applies the guide you pick. It cannot pick the guide for you.",
              "**One case per heading level.** A converter fixes one headline at a time. Keeping every section heading on a site in the same case is an editorial decision.",
            ],
          },
        ],
      },
    ],
  },
]

export function getWritingTipsArticleBySlug(slug: string): WritingTipsArticle | undefined {
  return getAllWritingTipsArticles().find((article) => article.slug === slug)
}

// Stats-article modules only type-import from this file, so the runtime
// module graph stays acyclic despite the cross-reference.
export function getAllWritingTipsArticles(): WritingTipsArticle[] {
  return [...WRITING_TIPS_ARTICLES, ...STATS_ARTICLES, ...STYLE_GUIDE_ARTICLES]
}
