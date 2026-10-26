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
import { COLON_LIMITS, COLON_REASONS, COLON_ROWS, CONVERTER_EXAMPLES, SENTENCE_CASE_SUBTITLE, SUBTITLES } from "@/lib/colon-content"

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
    slug: "do-you-capitalize-after-a-colon",
    converterLink: {
      anchor: "headline case converter",
      before: "Writing a headline with a subtitle? Paste it into the ",
      after: " and pick your style guide – the word after the colon gets its capital, and Explain shows the rule behind it.",
    },
    tags: ["Grammar 101", "Style Guides", "Title Case"],
    ctaWord: CONVERTER_EXAMPLES.title.input,
    ctaText: "Paste a title with a subtitle and pick AP, APA, Chicago or MLA – the free converter capitalizes the word after the colon and explains why.",
    relatedSlugs: ["what-words-are-not-capitalized-in-a-title", "sentence-vs-title-case", "chicago-title-case", "apa-heading-levels"],
    faqHeading: "Questions about capitalizing after a colon",
    faqItems: [
      {
        question: "Do you capitalize after a colon in AP style?",
        answer:
          "Only when a complete sentence or a proper noun follows. In AP news headlines, which use sentence case, the first word after a colon is always capitalized.",
      },
      {
        question: "Do you capitalize after a colon in APA style?",
        answer:
          "Yes, when what follows is a complete sentence. In titles and headings APA capitalizes the first word after a colon whatever follows, and in headings it does the same after an em dash.",
      },
      {
        question: "Has Chicago changed its rule on capitalizing after a colon?",
        answer:
          "Yes. The 17th edition capitalized only when two or more sentences, dialogue or a quotation followed. The 18th edition, published in 2024, capitalizes any complete sentence after a colon.",
      },
      {
        question: "Do you capitalize after a label such as Note:?",
        answer:
          "Yes, when a sentence follows. Chicago prints Note: Semicolons are not allowed past this point. A word or a phrase after the label stays lowercase.",
      },
      {
        question: "Does a colon need a complete sentence before it?",
        answer:
          "Not always: a label such as Note: or Warning: can come before one. But Chicago and MLA both rule out a colon between a verb and the list that completes it. MLA's example of the error ends …are: tennis, lenses, and mathematics.",
      },
    ],
    sections: [
      {
        id: "intro",
        blocks: [
          {
            type: "paragraph",
            text: "In a title, yes: AP, APA, Chicago and MLA all capitalize the first word after a colon, because it starts the subtitle. In a sentence, capitalize it when a complete sentence follows – the rule in AP, APA and, since its 2024 edition, Chicago. A phrase, a list or a single word after a colon stays lowercase unless it is a name.",
          },
          {
            type: "paragraph",
            text: "MLA is the exception. It keeps a single sentence after a colon lowercase and capitalizes only a series of sentences, a rule or a question. And if you learned that Chicago capitalizes only when two or more sentences follow, that was the 17th edition – the 18th edition changed the rule.",
          },
        ],
      },
      {
        id: "how-to-decide",
        heading: "How to decide whether to capitalize after a colon",
        tocLabel: "Five checks",
        blocks: [
          { type: "paragraph", text: "Go through these checks in order and stop at the first one that fits:" },
          {
            type: "list",
            ordered: true,
            items: [
              `**Is the colon in a title or heading?** Capitalize the first word after it. Every guide does, in title case and in sentence case: *${CONVERTER_EXAMPLES.title.output}*.`,
              "**Is the first word a name, *I* or an acronym?** It keeps its capital wherever it stands.",
              "**Does a complete sentence follow?** AP, APA and Chicago capitalize it. MLA keeps one sentence lowercase but capitalizes two or more sentences, a rule or principle, and a question.",
              "**Does a list follow?** A list that runs on inside the sentence stays lowercase. In a vertical list, items that are full sentences start with a capital.",
              "**Anything else** – a phrase, a fragment or a single word – stays lowercase.",
            ],
          },
        ],
      },
      {
        id: "by-style-guide",
        heading: "Capitalization after a colon in AP, APA, Chicago and MLA",
        tocLabel: "By style guide",
        blocks: [
          {
            type: "paragraph",
            text: "Each row is one kind of text that can follow a colon. A guide's column shows the first word after the colon as that guide writes it.",
          },
          {
            type: "wordFormMatrix",
            rowHeader: "After the colon",
            caption: "Each guide's column shows the first word after the colon. The shaded row is where the guides disagree.",
            rows: COLON_ROWS.map((row) => ({ word: row.label, form: row.word, note: row.note, guides: row.capitalized })),
          },
          {
            type: "paragraph",
            text: "Only one row splits the guides: a single complete sentence, which MLA alone keeps lowercase. On everything else the four agree, subtitles included.",
          },
          { type: "heading", level: 3, grouping: true, text: "Does a complete sentence after a colon start with a capital?" },
          {
            type: "paragraph",
            text: "In AP, APA and Chicago it does, and one sentence is enough. In MLA it does only when more than one sentence follows.",
          },
          { type: "heading", level: 4, text: "AP and APA capitalize a complete sentence" },
          {
            type: "paragraph",
            text: 'The AP Stylebook capitalizes the first word after a colon "only if it is a proper noun or the start of a complete sentence" ([@APStylebook](https://x.com/APStylebook/status/831604055524966400)). APA capitalizes it ["if what follows the colon is a complete sentence"](https://apastyle.apa.org/instructional-aids/test-apa-style-knowledge.pdf). Neither guide counts sentences: one is enough.',
          },
          { type: "heading", level: 4, text: "Chicago has capitalized it since the 18th edition" },
          {
            type: "paragraph",
            text: 'Until 2024, Chicago lowercased a single sentence after a colon and capitalized only a series of sentences, dialogue or a quoted extract. The 18th edition [recommends an initial cap](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Capitalization/faq0008.html) "for any complete sentence following a colon." Its own pair of examples, from the [CMOS Q&A](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Capitalization/faq0105.html):',
          },
          {
            type: "list",
            items: [
              `*${COLON_LIMITS.sentenceAfterColon.correct}* – a complete sentence`,
              "*…signaled by an abrupt silence: no more gas.* – a phrase",
            ],
          },
          {
            type: "paragraph",
            text: "Much of the advice online still gives the old rule. [Chicago Title Case: What the 18th Edition Changed](/blog/chicago-title-case) covers the edition's other changes.",
          },
          { type: "heading", level: 4, text: "MLA lowercases a single sentence" },
          {
            type: "paragraph",
            text: 'The MLA Handbook (9th ed., 2.27) lowercases what follows a colon unless it is a word that is always capitalized, or the colon introduces more than one sentence, a rule or principle, or a question. Its example: *The plot is founded on deception: the protagonist has a secret identity.* Asked whether an independent clause after a colon may take a capital, MLA\'s editors answered ["Generally, no."](https://style.mla.org/colons-how-to-use-them/)',
          },
          { type: "heading", level: 3, text: "Do you capitalize a question or a quotation after a colon?" },
          {
            type: "paragraph",
            text: "A question that is a complete sentence takes a capital in all four guides. MLA names questions outright: *The moderator then posed a question to the panelists: In what ways has the New Queer Cinema amplified the visibility of queerness in film?*",
          },
          {
            type: "paragraph",
            text: 'A quotation follows its source. MLA keeps ["the case used in the source"](https://style.mla.org/capitalize-quotation/), and Chicago prints *Unprompted, Jerzy announced the reason for her recent absence: "I was on the moon. Again."* ([CMOS Q&A](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Quotations/faq0080.html)). APA lets you change the first letter of a quotation to fit your sentence.',
          },
          { type: "heading", level: 3, text: "Phrases, fragments and single words stay lowercase" },
          {
            type: "paragraph",
            text: "If what follows the colon cannot stand as a sentence, every guide keeps it lowercase – Chicago's example above ends *…an abrupt silence: no more gas.* The exception is a word that is always capitalized: a name, the pronoun *I* or an acronym. AP allows a capital after a colon for nothing else but a complete sentence.",
          },
          { type: "heading", level: 3, grouping: true, text: "How do you capitalize a list after a colon?" },
          {
            type: "paragraph",
            text: "That depends on whether the list runs on inside the sentence or stands as a vertical list.",
          },
          { type: "heading", level: 4, text: "A run-in list stays lowercase" },
          {
            type: "paragraph",
            text: "A list inside the sentence starts lowercase, even when its items are clauses: *There were two main viewpoints presented: (1) all people lie, and (2) only certain people lie.* ([CMOS Q&A](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/NoneoftheAbove/faq0025.html)). MLA capitalizes a run-in list only when its items are several full sentences.",
          },
          { type: "heading", level: 4, text: "Vertical list items that are full sentences start with a capital" },
          {
            type: "paragraph",
            text: "In a vertical list, an item that is a complete sentence begins with a capital in [APA](https://apastyle.apa.org/style-grammar-guidelines/lists/bulleted), [Chicago](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/VerticalListsBullets/faq0003.html) and MLA (Handbook 1.11). APA and MLA start items that are words or phrases with a lowercase letter.",
          },
          { type: "heading", level: 4, text: "AP capitalizes every bulleted item" },
          {
            type: "paragraph",
            text: 'AP does not sort items by grammar: ["Capitalize the first word following the dash or bullet"](https://x.com/APStylebook/status/1415407776726142979), whether the item is a sentence or a phrase.',
          },
        ],
      },
      {
        id: "titles",
        heading: "Capitalizing after a colon in titles and headings",
        tocLabel: "In titles",
        blocks: [
          {
            type: "paragraph",
            text: "In a title, the colon separates the title from its subtitle, and the subtitle starts like a new title. This is one of the few rules in [Title Capitalization Rules by Style Guide](/capitalization-rules-guide) on which all four guides agree.",
          },
          { type: "heading", level: 3, grouping: true, text: "Is the first word of a subtitle always capitalized?" },
          { type: "paragraph", text: "Yes – in all four guides, in title case and sentence case, whatever the word." },
          { type: "heading", level: 4, text: "In title case, a subtitle starts like a new title" },
          {
            type: "paragraph",
            text: `Even an article or a short preposition takes a capital after the colon, though it stays lowercase anywhere else in the title. MLA prints *${SUBTITLES.mla.title}* (Handbook 2.90), and APA prints *${SUBTITLES.apa.title}*. The small words that stay lowercase in the rest of a title are listed in [What Words Are Not Capitalized in a Title?](/blog/what-words-are-not-capitalized-in-a-title)`,
          },
          { type: "heading", level: 4, text: "In sentence case, APA, Chicago and AP headlines still capitalize it" },
          {
            type: "paragraph",
            text: `Sentence case lowercases every word except the first and names – and the first word of a subtitle. APA writes reference titles this way: *${SENTENCE_CASE_SUBTITLE.output}* ([APA Style](https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case)). Chicago's sentence case capitalizes ["the first word in a subtitle"](https://cmosshoptalk.com/2018/08/28/chicago-style-workout-29-styling-titles-in-running-text/), and AP writes news headlines in sentence case with one exception: ["First word after colon is always uppercase in headlines"](https://x.com/APStylebook/status/1021397036808265729).`,
          },
          {
            type: "paragraph",
            text: "[Title Case vs Sentence Case: Which to Use and When](/blog/sentence-vs-title-case) compares the two styles.",
          },
          { type: "heading", level: 3, text: "Is the word after a dash in a title capitalized?" },
          {
            type: "paragraph",
            text: 'In APA, yes: its heading rule capitalizes ["the first word after a colon, em dash, or end punctuation"](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case). Chicago does not treat a dash as a colon. What follows an em dash ["is not normally considered to be a subtitle"](https://cmosshoptalk.com/2018/08/28/chicago-style-workout-29-styling-titles-in-running-text/), so Chicago writes *Chicago—a Metropolitan Smorgasbord*.',
          },
        ],
      },
      {
        id: "converter",
        heading: "How the converter capitalizes the word after a colon",
        tocLabel: "In the converter",
        blocks: [
          {
            type: "paragraph",
            text: `In title case the converter capitalizes the first word after a colon in every style and labels it *${COLON_REASONS.title}*: *${CONVERTER_EXAMPLES.title.input}* becomes *${CONVERTER_EXAMPLES.title.output}*.`,
          },
          {
            type: "paragraph",
            text: `In sentence case it tells a title from a sentence by the closing period. A line without one is a title, so the subtitle keeps its capital: *${CONVERTER_EXAMPLES.sentenceCaseTitle.input}* becomes *${CONVERTER_EXAMPLES.sentenceCaseTitle.output}*, labeled *${COLON_REASONS.sentenceCase}*. In a line that ends with a period, a capital you typed after the colon stays if the text is already in sentence case.`,
          },
          { type: "paragraph", text: "It reads punctuation, not grammar, so check two things by hand:" },
          {
            type: "list",
            items: [
              `**A complete sentence after a colon.** The converter cannot tell a sentence from a phrase. Converted from title case, *${COLON_LIMITS.sentenceAfterColon.input}* comes out as *${COLON_LIMITS.sentenceAfterColon.converter}* – right for MLA, but AP, APA and Chicago want *…silence: The generator…*.`,
              `**A dash in an APA heading.** After an em dash the converter keeps a small word lowercase, as Chicago does: *${COLON_LIMITS.apaDash.converter}*. APA wants *${COLON_LIMITS.apaDash.correct}*.`,
            ],
          },
        ],
      },
      {
        id: "semicolon",
        heading: "Is the word after a semicolon capitalized?",
        tocLabel: "Semicolons",
        blocks: [
          {
            type: "paragraph",
            text: "No. A semicolon joins two independent clauses inside one sentence, so the word after it stays lowercase unless it is a name, *I* or an acronym. MLA's example: *The girl bought an ice cream cone; she dropped it in the park.* ([MLA Style Center](https://style.mla.org/types-of-sentences/))",
          },
          {
            type: "paragraph",
            text: 'Chicago puts it plainly: a capital after a semicolon ["is likely to look like an error"](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Capitalization/faq0076.html). A colon is different – what follows it can stand as a sentence of its own, and that is where the guides split.',
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
              "[The Chicago Manual of Style Online: Q&A on capitalizing after a colon](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Capitalization/faq0008.html) and [on a sentence after a colon](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Capitalization/faq0105.html); CMOS 18th ed., 6.67; [Q&A on a capital after a semicolon](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Capitalization/faq0076.html)",
              "MLA Handbook, 9th ed., 1.11, 2.27 and 2.90; [MLA Style Center: Colons: How to Use Them](https://style.mla.org/colons-how-to-use-them/)",
              "[APA Style: Title Case Capitalization](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case), [Sentence Case Capitalization](https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case) and [Bulleted Lists](https://apastyle.apa.org/style-grammar-guidelines/lists/bulleted)",
              "The Associated Press Stylebook, entries \"colon\" and \"headlines\"",
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
