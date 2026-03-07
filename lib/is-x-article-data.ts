export interface StyleGuideRow {
  guide: "AP" | "APA" | "MLA" | "Chicago"
  capitalize: boolean
  rule: string
}

export interface DoNotExample {
  text: string
  reason: string
}

export interface AlternativeExample {
  label: string
  examples: string[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface IsXArticle {
  slug: string
  word: string
  answerBox: string
  whySectionHeading: string
  whySectionBody: string
  styleGuideRows: StyleGuideRow[]
  contextNote: string
  doExamples: string[]
  doNotExamples: DoNotExample[]
  alternativeExamples?: AlternativeExample[]
  edgeCasesHeading: string
  edgeCasesBody: string
  edgeCaseItems: string[]
  faqItems: FAQItem[]
  ctaWord: string
  relatedSlugs: string[]
}

export const IS_X_ARTICLES: IsXArticle[] = [
  {
    slug: "with-capitalized-in-title-case",
    word: "with",
    answerBox: `Yes – in most style guides, "with" is capitalized in a title. AP, APA, and MLA capitalize "with" because it has four letters. Chicago is the exception – it lowercases all prepositions of four or fewer letters regardless of the word.`,
    whySectionHeading: `Why "With" Gets Capitalized`,
    whySectionBody: `"With" is a preposition – a word that shows the relationship between a noun and another element in the sentence ("coffee with milk," "a book with a blue cover"). Prepositions are one of those word categories that title case rules single out for special treatment.\n\nMost style guides don't lowercase all prepositions equally. Instead, they use word length as the deciding factor. AP, APA, and MLA all draw the line at four letters: anything shorter stays lowercase, anything four letters or longer gets capitalized. "With" has exactly four letters, so it lands on the capitalize side.\n\nChicago takes a different approach. The 17th edition of the Chicago Manual of Style lowercased all prepositions in titles regardless of length. The 18th edition (2024) updated the rule: now only prepositions of four letters or fewer are lowercase, while prepositions of five or more letters get capitalized. Either way, "with" at four letters stays lowercase in Chicago style.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: true,  rule: "Capitalize words of four or more letters" },
      { guide: "APA",     capitalize: true,  rule: "Capitalize words of four or more letters" },
      { guide: "Chicago", capitalize: false, rule: "Lowercase prepositions of four or fewer letters (18th ed.)" },
      { guide: "MLA",     capitalize: true,  rule: "Capitalize words of four or more letters" },
    ],
    contextNote: `The reason "with" trips people up is that it sits right on the boundary. Three-letter prepositions like "for" and "yet" are lowercase in every major style guide. But at four letters, "with" crosses the threshold in AP, APA, and MLA. If you're not following a specific style guide, the safest choice is to capitalize "with." Three out of four major guides agree on this, and it's what most readers expect to see.`,
    doExamples: [
      "Cooking With Fresh Herbs",
      "The Girl With the Dragon Tattoo",
      "Working With Remote Teams",
      "Dealing With Stress in College",
    ],
    doNotExamples: [
      { text: "cooking with fresh herbs", reason: "No title case applied — first word must be capitalized at minimum" },
      { text: "Cooking WITH Fresh Herbs", reason: "All-caps preposition — never correct in any style guide" },
    ],
    alternativeExamples: [
      {
        label: "Chicago style (also correct)",
        examples: [
          "Cooking with Fresh Herbs",
          "The Girl with the Dragon Tattoo",
        ],
      },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"With" as the first word. Every style guide agrees: capitalize the first word of a title, no exceptions. "With Great Power Comes Great Responsibility" — ✓ (all styles).`,
      `"With" as the last word. AP, APA, Chicago, and MLA all require capitalizing the last word of a title. "The Team I Work With" — ✓ (all styles).`,
      `"With" after a colon or dash. Most style guides treat the word after a colon as the start of a new title segment. Capitalize "with" after a colon in all styles. "Remote Work: With the Right Tools, It's Easy" — ✓.`,
      `"With" in a hyphenated compound. If "with" appears in a hyphenated word in a title (rare), capitalize it in AP, APA, and MLA. Chicago lowercases it.`,
    ],
    faqItems: [
      {
        question: `Is "with" a preposition or a conjunction?`,
        answer: `"With" is a preposition. It connects a noun or pronoun to another part of the sentence, showing a relationship like accompaniment ("go with me"), means ("cut with scissors"), or possession ("a house with a garden"). It's never a conjunction.`,
      },
      {
        question: `Do you capitalize "with" in an email subject line?`,
        answer: `If you're using title case for your email subject, yes – capitalize "with." Most email style follows AP or general title case rules where four-letter words are capitalized. If you're using sentence case, only capitalize the first word and proper nouns.`,
      },
      {
        question: `Is "with" capitalized in APA 7th edition?`,
        answer: `Yes. APA 7th edition capitalizes all words of four or more letters in titles. "With" has four letters, so it's always capitalized in APA style – unless you're using sentence case for reference list entries.`,
      },
      {
        question: `Why does Chicago style treat "with" differently?`,
        answer: `The Chicago Manual of Style 17th edition lowercased all prepositions regardless of length. The 18th edition (2024) revised this: prepositions of four or fewer letters stay lowercase, while five-letter-or-longer prepositions like "about" and "through" are now capitalized. "With" has four letters, so it remains lowercase under both editions.`,
      },
      {
        question: `Should I capitalize "without" in a title?`,
        answer: `Yes, in all four major style guides. "Without" has seven letters, so AP, APA, and MLA capitalize it. Chicago 18th edition also capitalizes prepositions of five or more letters, so "without" gets capitalized there too.`,
      },
    ],
    ctaWord: "cooking with fresh herbs",
    relatedSlugs: [
      "in-capitalized-in-title-case",
      "and-capitalized-in-title-case",
      "to-capitalized-in-title-case",
    ],
  },
  {
    slug: "is-capitalized-in-title-case",
    word: "is",
    answerBox: `Yes – "is" is always capitalized in a title. All major style guides capitalize verbs in titles regardless of length. Even though "is" is only two letters, it's a verb, and verbs are always capitalized.`,
    whySectionHeading: `Why "Is" Is Always Capitalized`,
    whySectionBody: `"Is" is the third-person singular present tense form of the verb "to be." Verbs are one of the word categories that title case rules treat differently from other parts of speech. The length rule – capitalize words of four letters or more – does not apply to verbs.\n\nAP, APA, MLA, and Chicago all have the same core rule: capitalize all verbs in titles. The word length is irrelevant. This is why even two-letter verbs like "is" get capitalized, while three-letter prepositions like "for" and "yet" stay lowercase. Part of speech trumps length every time.\n\nMany people assume "is" should be lowercase because it's so short. This is the most common mistake with short verbs. The rule is counterintuitive, but it's consistent across all major style guides: if it's a verb, capitalize it.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: true, rule: "All verbs are capitalized" },
      { guide: "APA",     capitalize: true, rule: "All verbs are capitalized" },
      { guide: "Chicago", capitalize: true, rule: "All verbs are capitalized" },
      { guide: "MLA",     capitalize: true, rule: "All verbs are capitalized" },
    ],
    contextNote: `Title case exists to make titles readable and visually distinct. Verbs carry the action and meaning of a sentence. Lowercasing a verb – especially a short one like "is" – makes a title harder to scan and less visually balanced. Compare "What Is Love?" (verb capitalized – balanced, clear) with "What is Love?" (verb lowercased – awkward, looks like sentence case). Even though "is" is only two letters, capitalizing it signals to readers that this is a title, not a regular sentence. The same logic applies to all verbs, regardless of their length.`,
    doExamples: [
      "What Is Love?",
      "Why Is This Happening?",
      "This Is the Way",
      "Being Is Becoming",
    ],
    doNotExamples: [
      { text: "What is Love?", reason: "Lowercase verb — looks like sentence case, not title case" },
      { text: "What IS Love?", reason: "All-caps verb — never correct in any style guide" },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"Is" as the first word. Every style guide requires capitalizing the first word, so "is" is capitalized regardless of which style you follow. "Is There Hope?" — ✓ (all styles).`,
      `"Is" as the last word. Style guides capitalize the last word of a title. If your title ends with "is," capitalize it. "What She Is" — ✓ (all styles).`,
      `"Is" after a colon or dash. The word after a colon or dash is treated as the start of a new title segment. Capitalize "is" if it follows a colon. "The Question: Is Love Real?" — ✓ (all styles).`,
      `"Is" in a question within a title. Even in a question, "is" remains capitalized as a verb. "Does He Know What He Is?" — ✓.`,
    ],
    faqItems: [
      {
        question: `Is "is" a verb or an auxiliary verb?`,
        answer: `"Is" is both – it's a finite verb and also serves as an auxiliary (helping verb) in progressive and passive constructions. Regardless of its grammatical role, it's treated the same way in title case: always capitalized.`,
      },
      {
        question: `Should I capitalize "is" in an email subject line?`,
        answer: `If you're using title case for your subject line, yes – capitalize "is." Most professional email subjects follow AP or title case convention. If you're using sentence case in your subject line, only capitalize the first word and proper nouns.`,
      },
      {
        question: `What about other forms of "to be" – am, are, was, were, being, been?`,
        answer: `All forms of "to be" are verbs, so they're all capitalized in titles. "Am," "are," "was," "were," "being," and "been" all get capitalized regardless of length – just like "is."`,
      },
      {
        question: `Why do some websites show "is" in lowercase in titles?`,
        answer: `Some websites use sentence case instead of title case. Sentence case lowercases all words except the first word and proper nouns. If a website is using sentence case, "is" will be lowercase – but that's a different convention, not title case.`,
      },
      {
        question: `Is "is" capitalized in APA 7th edition?`,
        answer: `Yes. APA 7th edition capitalizes all verbs in titles and headings. "Is" is capitalized in APA title case, in APA headings, and in any other title-case text.`,
      },
    ],
    ctaWord: "What Is Love?",
    relatedSlugs: [
      "am-capitalized-in-title-case",
      "with-capitalized-in-title-case",
      "that-capitalized-in-title-case",
    ],
  },
  {
    slug: "the-capitalized-in-title-case",
    word: "the",
    answerBox: `Usually no – "the" stays lowercase in title case. "The" is a definite article, and all four major style guides (AP, APA, Chicago, MLA) agree: articles stay lowercase in the middle of a title. The only exceptions are when "the" is the first or last word of the title.`,
    whySectionHeading: `Why "The" Stays Lowercase`,
    whySectionBody: `"The" is a definite article – the word that marks a specific noun ("the book," "the idea," "the New York Times"). Articles are function words; they don't carry meaning on their own the way nouns and verbs do. Title case rules group articles together with other short function words – prepositions, conjunctions, coordinating words – that typically stay lowercase unless they're in a prominent position (first, last, or after a colon).\n\nAll four major style guides treat articles identically: "a," "an," and "the" are lowercase in the middle of a title. This isn't up for debate between AP and Chicago or MLA and APA – they all align on this one rule. The reason is practical: "the" is the most common word in English titles. Getting the capitalization right matters because you'll encounter this word constantly.\n\nThe position rule is where the real precision comes in. If "the" is the first word of your title, capitalize it – always. If it's the last word, capitalize it – always. But in the middle? Stay lowercase. This applies across the board.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: false, rule: "Articles stay lowercase unless first or last word" },
      { guide: "APA",     capitalize: false, rule: "Articles stay lowercase except in first/last position" },
      { guide: "Chicago", capitalize: false, rule: "Articles are minor words; capitalize only when first or last" },
      { guide: "MLA",     capitalize: false, rule: "Articles stay lowercase unless first or last word of title" },
    ],
    contextNote: `The rule for "the" hinges entirely on where it sits in the title. If "the" appears at the start of your title, capitalize it – no exceptions. If it appears at the end, capitalize it. But sandwiched in the middle? Lowercase it. This is why so many people second-guess themselves. They see "The Great Gatsby" (capitalized because it's first) and then wonder if "great" takes a capital in the middle. It does – "great" is an adjective, a major word. But "the" is an article, a minor word, so it stays lowercase when it's in the middle position.`,
    doExamples: [
      "The Great Gatsby",
      "Harry Potter and the Half-Blood Prince",
      "How to Bake the Perfect Cake",
      "A Book About Everything Under the Sun",
    ],
    doNotExamples: [
      { text: "the great gatsby", reason: "No title case applied at all" },
      { text: "The great gatsby", reason: "Only first word capitalized — this is sentence case, not title case" },
      { text: "How To Bake THE Perfect Cake", reason: "Random capitalization — never correct in any style guide" },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"The" in proper nouns and organization names. If "the" is part of a proper noun – a publication, institution, or company name – keep it exactly as the organization uses it. "The New York Times," "The Beatles." Don't apply title case rules to proper nouns.`,
      `"The" after a colon. When "the" appears right after a colon in a title, treat the text after the colon as a new title segment. Capitalize "the." Example: "Cooking Basics: The Essential Techniques."`,
      `"The" in subtitles. Apply the same rule: if "the" is the first word of the subtitle, capitalize it. If it's in the middle of the subtitle, lowercase it.`,
      `Articles in other languages. English articles (a, an, the) follow these rules. If you're writing a title in another language – German "der," French "le" – check that language's style guide, as rules vary significantly.`,
    ],
    faqItems: [
      {
        question: `Should I capitalize "the" if it's the first word of my title?`,
        answer: `Yes, always. Every style guide agrees: the first word of a title must be capitalized, regardless of what word it is. So "The Great Gatsby" is correct; "the Great Gatsby" is not.`,
      },
      {
        question: `Is "the" considered a minor word or a major word?`,
        answer: `"The" is a minor word – a function word that serves grammatical purposes rather than carrying semantic meaning. Minor words include articles (a, an, the), prepositions (in, on, to), coordinating conjunctions (and, but, or), and some auxiliary verbs. Title case rules typically lowercase minor words in middle positions.`,
      },
      {
        question: `Do any style guides capitalize "the" in the middle of a title?`,
        answer: `No. AP, APA, Chicago (both 17th and 18th editions), and MLA all agree: "the" is lowercase in the middle of a title. There's no outlier guide here – this is one of the most universal rules in English title capitalization.`,
      },
      {
        question: `What if "the" appears after a dash instead of a colon?`,
        answer: `Most style guides treat a dash similarly to a colon – as a separator between title segments. Capitalize "the" after a dash. Example: "How to Bake – The Ultimate Guide" – capitalize "the."`,
      },
      {
        question: `Should I change "The New York Times" to "The new york times" in a title?`,
        answer: `No, absolutely not. Proper nouns – including publication names, place names, and organization titles – are always capitalized in their standard form, regardless of title case rules. "The New York Times" stays as written, even when the whole title is in title case.`,
      },
    ],
    ctaWord: "The Great Gatsby and the Power of Symbolism",
    relatedSlugs: [
      "and-capitalized-in-title-case",
      "in-capitalized-in-title-case",
      "to-capitalized-in-title-case",
    ],
  },
  {
    slug: "and-capitalized-in-title-case",
    word: "and",
    answerBox: `No – "and" is lowercase in title case across all four major style guides (AP, APA, Chicago, MLA). This is one of the rare rules where every guide fully agrees. Capitalize "and" only if it's the first or last word of the title.`,
    whySectionHeading: `Why "And" Stays Lowercase`,
    whySectionBody: `"And" is a coordinating conjunction – one of seven words in the English language that join independent clauses or equal grammatical elements. The seven coordinating conjunctions are remembered by the acronym FANBOYS: For, And, Nor, But, Or, Yet, So.\n\nAll seven follow the same rule in title case: they stay lowercase in the middle of a title. This is one of the most universal rules in English capitalization – you won't find disagreement among AP, APA, Chicago, or MLA on this. Every major style guide treats all coordinating conjunctions identically. The reason is linguistic: conjunctions are function words. They connect ideas but don't carry independent meaning the way nouns, verbs, or adjectives do.\n\nThe fact that all four guides agree on this rule makes it one of the easiest capitalization decisions you'll make. If you see a conjunction in the middle of a title, lowercase it. No exceptions, no style-specific variations. This uniformity makes FANBOYS easy to teach and remember: learn the rule once, apply it everywhere.\n\nThe position rule still applies: if "and" is the first word of your title, capitalize it. If it's the last word, capitalize it. But sandwiched between other words? Stay lowercase across all styles.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: false, rule: "Coordinating conjunctions stay lowercase unless first or last" },
      { guide: "APA",     capitalize: false, rule: "Coordinating conjunctions are lowercase except first/last position" },
      { guide: "Chicago", capitalize: false, rule: "Conjunctions are minor words; lowercase unless first or last" },
      { guide: "MLA",     capitalize: false, rule: "Coordinating conjunctions stay lowercase in middle positions" },
    ],
    contextNote: `"And" isn't the only coordinating conjunction – it's one of seven, and they all behave identically in title case. If you learn the rule for "and," you automatically know the rule for "for," "nor," "but," "or," "yet," and "so." Because these seven words all function in the same grammatical way, title case rules treat them uniformly. You won't find a style guide that capitalizes "but" while lowercasing "and." The rule is monolithic: all seven are lowercase in the middle of a title, across all major style guides. Learn one, learn them all.`,
    doExamples: [
      "Cats and Dogs Make Great Pets",
      "Thunder, Lightning, and Storms",
      "How to Train Your Dog and Keep It Healthy",
      "And Now for Something Completely Different",
    ],
    doNotExamples: [
      { text: "Cats And Dogs Make Great Pets", reason: "Random capitalization of conjunction — never correct" },
      { text: "cats and dogs make great pets", reason: "No title case applied at all" },
      { text: "Cats AND Dogs Make Great Pets", reason: "All-caps conjunction — never correct in any style guide" },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"And" as the first word. Every style guide requires capitalizing the first word of a title. If "and" is your first word – unusual but possible in creative titles – capitalize it. "And Then There Were None" — ✓.`,
      `"And" as the last word. All four guides require capitalizing the last word. If your title ends in "and" (rare), capitalize it.`,
      `The "&" symbol vs. the word "and." When you use the ampersand symbol (&) instead of spelling out "and," you're using a stylistic choice rather than a word. For consistency and clarity, spell out "and" and lowercase it in the middle of your title.`,
      `"And" after a colon or dash. If "and" appears right after a colon or dash – separating a main title from a subtitle – it's treated as the first word of a new segment. Capitalize it. "Cooking Basics: And Why It Matters" — capitalize "and."`,
    ],
    faqItems: [
      {
        question: `Why do all four style guides agree on "and" when they disagree on other words?`,
        answer: `Because "and" is a coordinating conjunction – a function word with a clear grammatical role. All four guides define "minor words" (those that stay lowercase) similarly: they include articles, prepositions, and coordinating conjunctions. Since "and" fits this category universally, the guides don't diverge on its treatment.`,
      },
      {
        question: `Is "and" the same as other conjunctions in title case?`,
        answer: `Not exactly. There are two main types of conjunctions: coordinating (FANBOYS) and subordinating (because, if, while, since, etc.). Both stay lowercase in the middle of titles in most cases. However, some guides have exceptions for longer subordinating conjunctions. But the seven coordinating conjunctions (including "and") are treated identically across all guides.`,
      },
      {
        question: `Should I use "and" or "&" in a title?`,
        answer: `If you're following strict title case rules, spell out "and" and apply the lowercase rule. The ampersand "&" is a stylistic choice that has inconsistent treatment across guides. For consistency and clarity, use "and" and lowercase it in the middle of your title.`,
      },
      {
        question: `What if "and" appears in a compound word or hyphenated title?`,
        answer: `If "and" is part of a hyphenated compound (like "tried-and-tested"), treat it as part of the compound. Lowercase it. Most guides lowercase conjunctions even within hyphenated compounds unless they're at the very beginning of the title.`,
      },
      {
        question: `Are there any exceptions where "and" should be capitalized in the middle of a title?`,
        answer: `No. All four major style guides (AP, APA, Chicago, MLA) agree: "and" is lowercase in the middle of a title. There are no exceptions, no style-specific variations, no length rules that apply. This is one of the most straightforward capitalization rules in English.`,
      },
    ],
    ctaWord: "Of Mice and Men and Other Great Novels",
    relatedSlugs: [
      "the-capitalized-in-title-case",
      "with-capitalized-in-title-case",
      "to-capitalized-in-title-case",
    ],
  },
  {
    slug: "to-capitalized-in-title-case",
    word: "to",
    answerBox: `No – "to" is never capitalized in a title, regardless of which style guide you follow. "To" stays lowercase in AP, APA, Chicago, and MLA, whether it functions as a preposition ("go to school") or as an infinitive marker ("to run"). This rule is consistent across all major styles.`,
    whySectionHeading: `Why "To" Is Always Lowercase`,
    whySectionBody: `"To" is a short word with three letters, and that's the primary reason it stays lowercase. AP, APA, MLA, and Chicago all have length thresholds in their capitalization rules, and "to" falls well below all of them.\n\nBut "to" also has a special complication: it serves two grammatical functions in English. As a preposition, it shows direction or relationship ("go to Paris," "listen to music"). As an infinitive marker, it precedes a verb to indicate the base form ("to run," "to sing," "to understand"). Some people mistakenly think that because the infinitive form of a verb feels like it should be emphasized, the "to" that precedes it should be capitalized. The answer is no – "to" remains lowercase regardless of which job it's doing in the sentence.\n\nAll four major style guides agree on this. Whether you're following AP, APA, Chicago, or MLA, "to" is always lowercase in titles.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: false, rule: "Lowercase words of three or fewer letters" },
      { guide: "APA",     capitalize: false, rule: "Lowercase words of three or fewer letters" },
      { guide: "Chicago", capitalize: false, rule: "Lowercase prepositions; 'to' is 3 letters" },
      { guide: "MLA",     capitalize: false, rule: "Lowercase words of three or fewer letters" },
    ],
    contextNote: `The biggest source of confusion with "to" is its role as an infinitive marker. When you write "How to Learn Coding," your instinct might be to capitalize "to" because "learn" is the main verb and you're capitalizing the verb. But title case rules don't work that way. "To" is a three-letter function word, so it stays lowercase – even when it introduces a major verb. Think of titles like "How to Learn Coding" or "The Key to Success." In both cases, the verb or noun that comes after "to" is capitalized, but "to" itself remains lowercase.`,
    doExamples: [
      "How to Learn a New Language",
      "The Path to Success",
      "Introduction to Python Programming",
      "Going to the Mountains",
    ],
    doNotExamples: [
      { text: "How To Learn a New Language", reason: "Incorrect capitalization of 'to' — it's always lowercase" },
      { text: "The Path To Success", reason: "Incorrect capitalization of 'to' — it's always lowercase" },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"To" as the first word of a title. Even though "to" is normally lowercase, the first word of any title is always capitalized in all style guides. "To Infinity and Beyond" — ✓ (all styles). "To Kill a Mockingbird" — ✓ (all styles).`,
      `"To" as the last word of a title. Most style guides require capitalizing the last word of a title. If "to" ends your title, capitalize it.`,
      `"To" after a colon or dash. When a colon or dash introduces a subtitle, the first word after that punctuation is treated as a new title segment. Capitalize "to" after a colon.`,
      `"To" in phrasal verbs. When "to" is part of a phrasal verb construction ("sign up to," "look up to"), "to" remains lowercase. The capitalized word is the verb itself. "How to Look Up Information Online" — ✓.`,
    ],
    faqItems: [
      {
        question: `Is "to" a preposition or infinitive marker in title case rules?`,
        answer: `"To" functions as both, but title case rules treat it the same way in either role. For rule purposes, it's simply a three-letter word that falls below the capitalization threshold in all major styles. The grammatical distinction doesn't change the capitalization.`,
      },
      {
        question: `Should I capitalize "to" in email subject lines?`,
        answer: `No – if you're using title case in an email subject line, follow the same rules as titles: "to" stays lowercase. For example, "How to Improve Your Email Subject Lines" is correct. If you're using sentence case, only the first word and proper nouns are capitalized, so "to" is still lowercase.`,
      },
      {
        question: `Is there any style guide where "to" is capitalized?`,
        answer: `No. Across AP, APA, Chicago, and MLA – the four major English style guides used in publishing, journalism, and academia – "to" is always lowercase in titles. There is no mainstream style that capitalizes "to."`,
      },
      {
        question: `Why do so many people capitalize "to" incorrectly?`,
        answer: `The confusion stems from two sources. First, "to" starts a new grammatical unit when it's an infinitive marker ("to run"), and people think that should trigger capitalization. Second, many people assume all words longer than two letters should be capitalized. Both assumptions are incorrect.`,
      },
      {
        question: `Is "to" capitalized differently in Chicago 18th edition?`,
        answer: `No. Chicago's 18th edition (2024) made updates to preposition rules, but those changes apply to longer prepositions. "To" was and remains lowercase in all versions of Chicago style because it's a three-letter preposition.`,
      },
    ],
    ctaWord: "How to Learn a New Language",
    relatedSlugs: [
      "in-capitalized-in-title-case",
      "and-capitalized-in-title-case",
      "with-capitalized-in-title-case",
    ],
  },
  {
    slug: "in-capitalized-in-title-case",
    word: "in",
    answerBox: `Usually no, but it depends on how "in" is used. As a preposition, "in" is lowercase in all four major style guides – it's only three letters, below all length thresholds. But when "in" functions as an adverb in a phrasal verb (like "log in," "sign in," "drop in"), AP and Chicago capitalize it, while APA and MLA keep it lowercase.`,
    whySectionHeading: `The Two Roles of "In": Preposition vs. Adverb`,
    whySectionBody: `"In" is one of the most versatile words in English. Most of the time, it's a preposition – a word that shows a relationship between a noun and another element. "In the morning," "in the kitchen," "in the novel" – all prepositions. When "in" is a preposition, capitalization is straightforward: all four guides lowercase it because it's a short function word.\n\nBut "in" also appears in phrasal verbs – two-word verbs where a preposition or adverb changes the meaning of the base verb. "Sign up," "check out," "log in," "drop by" – the second word is technically an adverb, not a preposition, even though it looks identical. This is where guides diverge.\n\nThe distinction matters because guides have different philosophies about phrasal verbs. Some argue that phrasal verbs function as single units and should follow capitalization rules for verbs (capitalize them). Others treat the individual words and apply standard preposition rules (lowercase them). This philosophical difference creates the only real controversy about "in" in title case.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: false, rule: "Lowercase as preposition (3 letters); capitalize as adverb in phrasal verbs" },
      { guide: "APA",     capitalize: false, rule: "Words under 4 letters stay lowercase, including in phrasal verbs" },
      { guide: "Chicago", capitalize: false, rule: "Lowercase as preposition (3 letters); capitalize as adverb in phrasal verbs" },
      { guide: "MLA",     capitalize: false, rule: "Words under 4 letters stay lowercase, including in phrasal verbs" },
    ],
    contextNote: `The key to understanding when guides differ is recognizing phrasal verbs. A phrasal verb is a verb plus a preposition or adverb that together form a new meaning. "Look up" means research, not gaze upward. "Log in" means access a system, not physically enter. In titles, AP and Chicago capitalize "in" when it's part of a phrasal verb ("Sign In to Your Account"), while APA and MLA always lowercase it ("Sign in to Your Account"). Both approaches are defensible – they reflect different philosophies about how to handle function words in compound verbs. Choose your guide and stay consistent.`,
    doExamples: [
      "Information in the Database",
      "Managing Inventory in Your Store",
      "Finding Facts in the Archives",
      "Working in the Cloud",
    ],
    doNotExamples: [
      { text: "Information IN the Database", reason: "Random capitalization — never correct" },
      { text: "in the database", reason: "No title case applied at all" },
    ],
    alternativeExamples: [
      {
        label: "AP/Chicago (phrasal verb — also correct)",
        examples: [
          "Sign In to Your Account",
          "Log In to Your Email",
          "Check In Anytime",
        ],
      },
      {
        label: "APA/MLA (phrasal verb — also correct)",
        examples: [
          "Sign in to Your Account",
          "Log in to Your Email",
        ],
      },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `Phrasal verbs in titles: the contested territory. Common phrasal verbs with "in" include: sign in, log in, check in, fill in, move in, dive in, tune in. The solution: pick your guide and document it. AP/Chicago capitalize "In"; APA/MLA keep it lowercase.`,
      `"In" as the first word of a title. Every style guide agrees: capitalize the first word of a title. "In the Beginning" capitalizes "In" regardless of which style guide you follow.`,
      `"In" as the last word of a title. All four guides require capitalizing the last word. If your title ends in "in," capitalize it. This overrides all other rules.`,
      `"In" after a colon or dash. Treat text after a colon as a new title segment. If "in" starts this segment, capitalize it. "How to Build an App: In 30 Days or Less" — capitalize "In."`,
    ],
    faqItems: [
      {
        question: `Why do AP and Chicago capitalize "In" in phrasal verbs while APA and MLA don't?`,
        answer: `AP and Chicago treat phrasal verbs as semantic units – the adverb is a core part of the verb's meaning, so they capitalize it. APA and MLA apply a more mechanical rule: any word under 4 letters stays lowercase. Both approaches are defensible; they reflect different philosophies about how to handle function words in compound verbs.`,
      },
      {
        question: `Is "in" a preposition or adverb in "Sign In"?`,
        answer: `Grammatically, it's an adverb – a particle that modifies the verb "sign" to create a new meaning. But in many dictionaries, it's listed as a preposition because it looks like one. This ambiguity is why guides handle it differently. The practical answer: check your chosen style guide and follow its rule consistently.`,
      },
      {
        question: `What's the difference between "in" as a preposition and "in" as an adverb?`,
        answer: `As a preposition, "in" shows location or relationship ("in the room," "in the novel"). As an adverb in a phrasal verb, "in" changes the meaning of the verb ("log in" = access a system; "fill in" = complete a form). In phrasal verbs, "in" is often called a particle rather than a pure adverb or preposition.`,
      },
      {
        question: `Which guide should I use if I'm unsure whether to capitalize "In"?`,
        answer: `If you're writing for a publication, check their style guide. If you're writing for yourself, APA or MLA are consistent and simple (always lowercase "in" under 4 letters). If you want to capitalize phrasal verbs, use AP or Chicago. Document your choice and apply it consistently.`,
      },
      {
        question: `Should I use "Sign In" or "Sign in" in a website or app button?`,
        answer: `This depends on your chosen style guide. Many tech companies use AP or Chicago conventions and capitalize "Sign In." Others use sentence case and lowercase "in." Choose one and apply it to all similar buttons. Consistency matters more than which specific choice you make.`,
      },
    ],
    ctaWord: "How to Sign In and Manage Your Account",
    relatedSlugs: [
      "the-capitalized-in-title-case",
      "and-capitalized-in-title-case",
      "to-capitalized-in-title-case",
    ],
  },
  {
    slug: "from-capitalized-in-title-case",
    word: "from",
    answerBox: `Yes – in most style guides, "from" is capitalized in a title. AP, APA, and MLA capitalize "from" because it has four letters, meeting their minimum length threshold. Chicago is the exception – it keeps prepositions of four or fewer letters lowercase, even in the updated 18th edition (2024).`,
    whySectionHeading: `Why "From" Gets Capitalized (or Not)`,
    whySectionBody: `"From" is a preposition – it shows the starting point or origin of something ("a letter from my sister," "far from home," "dates from 1995"). Prepositions are the first category of words that title case rules single out for special attention, and they're also the most confusing because different style guides handle them differently.\n\nAP, APA, and MLA use a simple rule: capitalize any word of four or more letters, regardless of what part of speech it is. Since "from" has four letters, it gets capitalized in these three guides. This makes "from" one of the boundary words – it's just long enough to trigger capitalization in most styles, but not so long that every guide automatically includes it.\n\nChicago takes a different approach. The 17th edition of the Chicago Manual of Style lowercased all prepositions in titles, regardless of length. This meant "from" was lowercase, even though it had four letters. However, the 18th edition (2024) revised this rule. Now Chicago capitalizes prepositions of five or more letters while keeping prepositions of four or fewer letters lowercase. Since "from" has exactly four letters, it remains lowercase under the updated Chicago style.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: true,  rule: "Capitalize words of four or more letters" },
      { guide: "APA",     capitalize: true,  rule: "Capitalize words of four or more letters" },
      { guide: "Chicago", capitalize: false, rule: "Lowercase prepositions of four or fewer letters (18th ed.)" },
      { guide: "MLA",     capitalize: true,  rule: "Capitalize words of four or more letters" },
    ],
    contextNote: `"From" sits right at the threshold where most guides differ. Three-letter prepositions like "for," "but," and "yet" are universally lowercase. Five-letter prepositions like "about," "under," and "after" are capitalized by AP, APA, and MLA – and also by Chicago 18th edition. But four-letter prepositions like "from," "with," and "into" are where the guides split. If you're writing for a general audience, the safest choice is to capitalize "from." Three out of four major guides agree, and it's what most readers expect to see.`,
    doExamples: [
      "Travels From East to West",
      "A Lesson From My Father",
      "Letters From Home: A Story of Connection",
      "Messages From Around the World",
    ],
    doNotExamples: [
      { text: "Travels from East to West", reason: "Correct in Chicago style only — incorrect for AP, APA, and MLA" },
      { text: "A Lesson FROM My Father", reason: "All-caps preposition — never correct in any style guide" },
    ],
    alternativeExamples: [
      {
        label: "Chicago style (also correct)",
        examples: [
          "Travels from East to West",
          "A Lesson from My Father",
        ],
      },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"From" as the first word of a title. All style guides capitalize the first word of a title regardless of part of speech or length. "From the Ashes: A Story of Renewal" — ✓ (all styles). "From Russia With Love" — ✓ (all styles).`,
      `"From" as the last word of a title. Most style guides require capitalizing the last word of a title. So if "from" ends your title, capitalize it in AP, APA, and MLA.`,
      `"From" in date ranges. Titles sometimes include date ranges using "from...to" construction. In this context, "from" is still a preposition – capitalize in AP/APA/MLA, lowercase in Chicago. "Sales Data From 2015 to 2020" — ✓ (AP, APA, MLA).`,
      `"From" after a colon. When a colon introduces a subtitle, the first word after the colon is treated as a new title segment and capitalized in all guides. "The History of Science: From Alchemy to Modern Chemistry" — ✓.`,
    ],
    faqItems: [
      {
        question: `Is "from" always a preposition?`,
        answer: `Yes. "From" is exclusively a preposition in English grammar. It never functions as a verb, noun, adjective, or other part of speech. This makes the capitalization rule simpler – it's only subject to the preposition and length rules.`,
      },
      {
        question: `Should I capitalize "from" in an email subject line?`,
        answer: `It depends on the style guide you're following. For AP, APA, or MLA style, yes – capitalize "from." For Chicago style, no – keep it lowercase. If you're writing an informal email subject line without adhering to a specific style, capitalize "from" as most people expect it.`,
      },
      {
        question: `Did the Chicago Manual of Style 18th edition change how "from" is capitalized?`,
        answer: `Yes, indirectly. The 18th edition updated preposition rules. Previously (17th ed.), all prepositions were lowercase regardless of length. Now (18th ed.), prepositions of five or more letters are capitalized, while four-letter-or-fewer prepositions like "from" remain lowercase. So if you're using Chicago, "from" stays lowercase under both editions.`,
      },
      {
        question: `What about "from" in book titles – should I follow a specific style?`,
        answer: `Book titles typically follow the style guide of the publisher or author. Major publishers use either AP/APA/MLA (capitalize "from") or Chicago (lowercase "from"). Check your publisher's style guide, or if self-publishing, choose one guide and stay consistent. Capitalize "from" if you're uncertain – it's the more common choice.`,
      },
      {
        question: `Why is "from" a 4-letter boundary word while "for" is not?`,
        answer: `Both "for" and "from" are prepositions, but they have different letter counts. "For" has three letters, so it's lowercase in all four major guides. "From" has four letters, which is the minimum threshold for AP, APA, and MLA capitalization, but Chicago treats prepositions specially and keeps four-letter prepositions lowercase.`,
      },
    ],
    ctaWord: "Travels From East to West",
    relatedSlugs: [
      "with-capitalized-in-title-case",
      "in-capitalized-in-title-case",
      "between-capitalized-in-title-case",
    ],
  },
  {
    slug: "your-capitalized-in-title-case",
    word: "your",
    answerBox: `Yes – "your" is capitalized in a title in all major style guides. "Your" is capitalized for two independent reasons: it has four letters (meeting the length rule in AP, APA, and MLA) and it's a pronoun (which Chicago capitalizes regardless of length).`,
    whySectionHeading: `Why "Your" Gets Capitalized`,
    whySectionBody: `"Your" is a possessive pronoun (or determinative pronoun) that shows possession or belonging. Pronouns are one of the word categories that title case rules treat specially. The way "your" gets capitalized depends on which style guide you follow, but all four major guides capitalize it – just for different reasons.\n\nAP, APA, and MLA use the four-letter rule: capitalize words of four letters or more. "Your" has exactly four letters, so it passes this threshold. In these styles, "your" is capitalized primarily because of its length, not because it's a pronoun.\n\nChicago style takes a different approach. Instead of relying mainly on word length, Chicago capitalizes all pronouns regardless of length. So in Chicago style, "your" would be capitalized because it's a pronoun – the length is irrelevant. This is why even in the rare cases where a pronoun has fewer than four letters, Chicago capitalizes it.\n\nThe result is the same in all styles: "your" is always capitalized. But the grammatical reasoning differs depending on which guide you follow.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: true, rule: "Capitalize words of four or more letters" },
      { guide: "APA",     capitalize: true, rule: "Capitalize words of four or more letters" },
      { guide: "Chicago", capitalize: true, rule: "Capitalize all pronouns" },
      { guide: "MLA",     capitalize: true, rule: "Capitalize words of four or more letters" },
    ],
    contextNote: `Pronouns sit between verbs and prepositions in the title case hierarchy. Verbs are always capitalized (like "is," "am," "run") regardless of length. Pronouns usually follow the length rule, but Chicago makes all pronouns an exception. Prepositions and conjunctions shorter than four letters stay lowercase ("to," "for," "but") unless they're the first or last word. "Your" is unambiguous in all four major styles because it satisfies both criteria: it's four letters (meets the length rule) AND it's a pronoun (Chicago's pronoun rule).`,
    doExamples: [
      "Your Guide to Title Case",
      "Living Your Best Life",
      "Mastering Your Craft",
      "Your Questions Answered",
    ],
    doNotExamples: [
      { text: "your guide to title case", reason: "No title case applied at all" },
      { text: "Living your Best Life", reason: "Pronoun lowercased — incorrect in all major style guides" },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"Your" as the first word. All style guides capitalize the first word of a title, so "your" is capitalized regardless of which guide you follow. "Your Money or Your Life" — ✓ (all styles).`,
      `"Your" as the last word. Style guides capitalize the last word of a title. If your title ends with "your," capitalize it. "Make It Your Own" — ✓ (all styles).`,
      `"Your" after a colon or dash. The word after a colon is treated as the start of a new title segment. Capitalize "your" after a colon. "Success Strategy: Your Path Forward" — ✓ (all styles).`,
      `"Your" vs "you're" – which gets capitalized? Both get capitalized because "you're" is a contraction of "you are" (pronoun + verb). "You're Ready for Your Next Chapter" — both "You're" and "Your" capitalized ✓.`,
    ],
    faqItems: [
      {
        question: `Is "your" a pronoun or an adjective?`,
        answer: `"Your" is a possessive pronoun, though it's sometimes classified as a determinative pronoun or possessive adjective depending on the grammatical framework. The important point for title case is that it's in the pronoun family, and pronouns are capitalized in all major style guides.`,
      },
      {
        question: `What's the difference between "your" and "you're" in titles?`,
        answer: `"Your" is possessive ("your book") while "you're" is a contraction of "you are." In title case, both are capitalized because "your" is a pronoun and "you're" contains a pronoun ("you") and a verb ("are"). Capitalize both: Your Book, You're Ready.`,
      },
      {
        question: `Is "your" capitalized in APA 7th edition?`,
        answer: `Yes. APA 7th edition capitalizes all words of four or more letters in titles, and "your" has four letters. It's also capitalized in APA headings and other title-case text.`,
      },
      {
        question: `Should I capitalize "your" in an email subject line?`,
        answer: `If you're using title case, yes – capitalize "your." Most professional email subjects follow AP or title case convention. If you're using sentence case, capitalize "your" only if it's the first word of your subject line.`,
      },
      {
        question: `Why do some pronouns have different rules in different style guides?`,
        answer: `Chicago Manual of Style capitalizes all pronouns for consistency and readability, while AP, APA, and MLA use word length as the primary factor. Chicago prioritizes part of speech, while the others prioritize visual balance through length. "Your" gets capitalized in all styles, but "it" (two letters) would be lowercase in AP/APA/MLA but capitalized in Chicago.`,
      },
    ],
    ctaWord: "Your Guide to Title Case",
    relatedSlugs: [
      "in-capitalized-in-title-case",
      "with-capitalized-in-title-case",
      "is-capitalized-in-title-case",
    ],
  },
  {
    slug: "that-capitalized-in-title-case",
    word: "that",
    answerBox: `Yes – "that" is capitalized in a title in all major style guides. "That" can function as a subordinating conjunction, a relative pronoun, or a demonstrative pronoun. Regardless of its grammatical role, it's capitalized in AP, APA, MLA, and Chicago styles.`,
    whySectionHeading: `Why "That" Is Always Capitalized`,
    whySectionBody: `"That" is a versatile word in English. It can introduce a subordinate clause as a conjunction ("the book that he read"), function as a relative pronoun in the same way, or act as a demonstrative adjective or pronoun ("that one over there"). Despite these different roles, title case capitalizes "that" in all of them.\n\nThe reason is twofold. First, "that" has four letters, meeting the length threshold in AP, APA, and MLA. Second, when "that" acts as a subordinating conjunction (the most common role in titles), subordinating conjunctions are always capitalized in title case, unlike coordinating conjunctions such as "but," "or," and "and." A subordinating conjunction introduces a dependent clause that adds essential information to the sentence. These are considered more grammatically significant than coordinating conjunctions, so they get capitalized.\n\nThe distinction between subordinating and coordinating conjunctions is crucial here. If you remember that "that" is a subordinating conjunction (not a coordinating one), you'll never wonder whether to capitalize it. Even in Chicago style, which has different rules for prepositions, subordinating conjunctions like "that" are always capitalized.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: true, rule: "Subordinating conjunctions capitalized; 4+ letter rule also applies" },
      { guide: "APA",     capitalize: true, rule: "Capitalize words of four or more letters; subordinating conjunctions capitalized" },
      { guide: "Chicago", capitalize: true, rule: "Subordinating conjunctions are always capitalized" },
      { guide: "MLA",     capitalize: true, rule: "Capitalize words of four or more letters; subordinating conjunctions capitalized" },
    ],
    contextNote: `Subordinating conjunctions like "that," "because," "although," "if," and "when" introduce dependent clauses and are grammatically more complex. They carry more semantic weight than coordinating conjunctions like "and," "but," "or," and "so." Compare "The Day That Changed Everything" (subordinating conjunction – capitalized) with "Coffee and Cream" (coordinating conjunction – lowercase). In both titles, the conjunctions join elements, but "that" introduces a subordinate clause while "and" merely lists items. That's why "that" is capitalized and "and" is not.`,
    doExamples: [
      "The Book That Inspired Me",
      "Lessons That Last a Lifetime",
      "The Moment That Everything Changed",
      "Knowing That You Care",
    ],
    doNotExamples: [
      { text: "The book that inspired me", reason: "No title case applied at all" },
      { text: "The Book that Inspired Me", reason: "Conjunction lowercased — incorrect in all major style guides" },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"That" as the first word. All style guides require capitalizing the first word of a title. "That's What I'm Talking About" — ✓ (all styles).`,
      `"That" as the last word. Style guides capitalize the last word of a title. If "that" ends your title, capitalize it.`,
      `"That" after a colon or dash. The word after a colon is treated as the start of a new title segment. "The Secret Revealed: That One Thing You Missed" — ✓ (all styles).`,
      `"That" as a demonstrative vs conjunction. In both uses, "that" is capitalized. "That one" (demonstrative adjective) and "the one that fell" (conjunction) both keep "that" capitalized in title case.`,
    ],
    faqItems: [
      {
        question: `What's the difference between "that" and "which" in title case?`,
        answer: `Both can be relative pronouns, but "which" is longer (five letters) and is always capitalized in AP, APA, and MLA because of the length rule. "That" is capitalized for multiple reasons (length + conjunction type). In editing, "that" introduces restrictive clauses (essential info) while "which" introduces non-restrictive clauses (extra info) – but both are capitalized in titles.`,
      },
      {
        question: `Is "that" a pronoun or a conjunction?`,
        answer: `"That" can be both, depending on context. It can function as a relative pronoun ("the book that I read"), a subordinating conjunction, or a demonstrative pronoun ("I want that one"). In title case, it doesn't matter which role it's playing – it's always capitalized.`,
      },
      {
        question: `Should I capitalize "that" in an email subject line?`,
        answer: `If you're using title case, yes – capitalize "that." Most professional email subjects follow AP or title case convention. If you're using sentence case, only capitalize the first word and proper nouns, so "that" would be lowercase unless it's the first word.`,
      },
      {
        question: `Why is "that" capitalized but "if" sometimes isn't?`,
        answer: `"If" is also a subordinating conjunction, and it should be capitalized in title case. Both "that" and "if" are subordinating conjunctions, so they're both capitalized. If you've seen "if" lowercased in a title, it was either using sentence case or the writer made an error.`,
      },
      {
        question: `Is "that's" capitalized in a title?`,
        answer: `Yes. "That's" is a contraction of "that is" (subordinating conjunction + verb). Since both components are parts of speech that get capitalized, "that's" is capitalized. The contraction doesn't change the capitalization rules: "That's the Way," "That's Why."`,
      },
    ],
    ctaWord: "The Book That Changed My Life",
    relatedSlugs: [
      "is-capitalized-in-title-case",
      "am-capitalized-in-title-case",
      "with-capitalized-in-title-case",
    ],
  },
  {
    slug: "am-capitalized-in-title-case",
    word: "am",
    answerBox: `Yes – "am" is always capitalized in a title. All major style guides capitalize verbs, even when they're extremely short. At only two letters, "am" is one of the shortest English verbs – but it's still capitalized in AP, APA, MLA, and Chicago styles.`,
    whySectionHeading: `Why "Am" Is Always Capitalized`,
    whySectionBody: `"Am" is the first-person singular present tense form of the verb "to be." The core rule in all major style guides is simple: capitalize all verbs in titles. This rule doesn't care about word length. A two-letter verb gets the same treatment as a ten-letter verb.\n\nMany people assume "am" should be lowercase because of its length. After all, three-letter prepositions like "for" and "and" are lowercase. But part of speech is the deciding factor, not word count. Verbs are capitalized. Prepositions and conjunctions follow the length rule. "Am" is a verb, so it's capitalized.\n\nThis is why "I Am Legend" – one of the most famous titles in film and literature – has "Am" capitalized. The length of the word is irrelevant. The fact that it's a verb is what matters.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: true, rule: "All verbs are capitalized" },
      { guide: "APA",     capitalize: true, rule: "All verbs are capitalized" },
      { guide: "Chicago", capitalize: true, rule: "All verbs are capitalized" },
      { guide: "MLA",     capitalize: true, rule: "All verbs are capitalized" },
    ],
    contextNote: `The length-based rule in title case – capitalize words of four letters or more – applies to nouns, adjectives, pronouns, and adverbs. But verbs, conjunctions, and prepositions follow their own rules. Verbs are always capitalized. Conjunctions and prepositions shorter than four letters are usually lowercase. "Am" at two letters doesn't meet the four-letter threshold, but it doesn't need to. As a verb, it's automatically capitalized. If "am" were a preposition or conjunction – which it isn't – then its length would determine its case. But as a verb, length is irrelevant.`,
    doExamples: [
      "I Am Legend",
      "What Am I Doing Here?",
      "This Is What I Am",
      "Where Am I Going?",
    ],
    doNotExamples: [
      { text: "I am Legend", reason: "Verb lowercased — incorrect in all major style guides" },
      { text: "I AM Legend", reason: "All-caps verb — never correct in any style guide" },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"Am" as the first word. Every style guide capitalizes the first word of a title, so "am" is capitalized regardless of the style. "Am I the Only One?" — ✓ (all styles).`,
      `"Am" as the last word. Style guides capitalize the last word of a title. If "am" ends your title, capitalize it. "This Is What I Am" — ✓ (all styles).`,
      `"Am" after a colon or dash. The word after a colon is treated as the start of a new title segment. Capitalize "am" after a colon. "Identity Crisis: Am I Who I Think I Am?" — ✓ (all styles).`,
      `"Am" in a question. Questions maintain the same capitalization rules as statements. "Am" is capitalized as a verb whether it's in a question or not. "Am I Ready for This?" — ✓.`,
    ],
    faqItems: [
      {
        question: `Is "am" always present tense?`,
        answer: `Yes. "Am" is specifically the first-person singular present tense form of "to be." Other present tense forms include "are" and "is." All forms of the verb "to be" are capitalized in titles, regardless of tense.`,
      },
      {
        question: `Why is "I Am Legend" capitalized that way?`,
        answer: `"Am" is capitalized because it's a verb. The title follows standard title case rules where verbs are always capitalized. The same rule applies to any title with "am," whether it's a book, film, song, or article headline.`,
      },
      {
        question: `Should I capitalize "am" in an email subject line?`,
        answer: `If you're using title case in your subject line, yes – capitalize "am." Most professional email subjects use title case. If you're using sentence case, only capitalize the first word and proper nouns.`,
      },
      {
        question: `Is "am" capitalized in APA 7th edition?`,
        answer: `Yes. APA 7th edition capitalizes all verbs, including "am," in titles and headings. This applies to the title itself, section headings, and any other title-case text.`,
      },
      {
        question: `What's the difference between "is," "am," and "are" in titles?`,
        answer: `All three are forms of the verb "to be," so they're all capitalized in titles. "Is" is third-person singular (he/she/it is), "am" is first-person singular (I am), and "are" is second-person or plural (you are, they are). The verb form doesn't matter – they're all capitalized.`,
      },
    ],
    ctaWord: "I Am Legend",
    relatedSlugs: [
      "is-capitalized-in-title-case",
      "that-capitalized-in-title-case",
      "with-capitalized-in-title-case",
    ],
  },
  {
    slug: "up-capitalized-in-title-case",
    word: "up",
    answerBox: `It depends on how "up" is used. When "up" functions as a preposition ("walk up the hill"), it's lowercase in all styles. When "up" functions as an adverb or adjective ("Give Up Hope," "The Up Side"), AP and Chicago capitalize it, while APA and MLA keep it lowercase based on the three-letter rule.`,
    whySectionHeading: `Why "Up" Is Complicated`,
    whySectionBody: `"Up" is genuinely one of the trickiest words in English title case because its function changes depending on context. Most words have a stable part of speech – "with" is always a preposition, "very" is always an adverb. But "up" shifts roles frequently, and different style guides handle this shift differently.\n\nAs a preposition, "up" shows direction or position: "walk up the stairs," "up the street," "climb up the mountain." In this role, "up" is lowercase in every major style guide because it's only three letters and prepositions are typically short words.\n\nAs an adverb, "up" modifies a verb and adds meaning: "give up," "set up," "break up." In these phrasal verb constructions, "up" is part of the verbal action, not just a directional marker. AP and Chicago capitalize adverbs, so "up" becomes "Up" in titles: "Give Up Hope," "Set Up Your Account." APA and MLA sidestep this complexity entirely by using a simple rule: "up" has three letters, so it's lowercase regardless of part of speech.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: false, rule: "Lowercase as preposition (3 letters); capitalize as adverb/adjective in phrasal verbs" },
      { guide: "APA",     capitalize: false, rule: "Lowercase words of three or fewer letters regardless of part of speech" },
      { guide: "Chicago", capitalize: false, rule: "Lowercase as preposition (3 letters); capitalize as adverb/adjective in phrasal verbs" },
      { guide: "MLA",     capitalize: false, rule: "Lowercase words of three or fewer letters regardless of part of speech" },
    ],
    contextNote: `The single biggest factor in whether to capitalize "up" is understanding its grammatical role. As a preposition (showing direction): lowercase in all styles. As an adverb in a phrasal verb ("give up," "set up," "break up"): capitalize in AP/Chicago, lowercase in APA/MLA. As an adjective ("the up side"): capitalize in AP/Chicago, lowercase in APA/MLA. If you're unsure whether "up" is a preposition or something else, ask: "Is 'up' showing direction?" If yes, it's a preposition – lowercase. "Is 'up' part of a verb phrase that changes the verb's meaning?" If yes, it's likely an adverb – capitalize in AP/Chicago, lowercase in APA/MLA.`,
    doExamples: [
      "Give Up Hope",
      "Set Up Your Account",
      "Break Up Songs",
      "Walk up the Mountain",
    ],
    doNotExamples: [
      { text: "Walk Up the Mountain", reason: "Treating 'up' as more important than it is when used as a preposition" },
      { text: "The UP Side", reason: "All-caps — never correct in any style guide" },
    ],
    alternativeExamples: [
      {
        label: "APA/MLA style (always lowercase for 3-letter words)",
        examples: [
          "Give up hope",
          "Set up your account",
          "Break up songs",
        ],
      },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"Up" as the first word of a title. Capitalize "up" when it starts a title, regardless of style guide or part of speech. "Up in the Air" — ✓ (all styles). "Up the Ladder" — ✓ (all styles).`,
      `"Up" as the last word of a title. Most guides capitalize the last word of a title. Capitalize "up" at the end in all styles. "Why We Give Up" — ✓ (all styles).`,
      `"Up" after a colon. The word after a colon is treated as the start of a new title segment. Capitalize "up" after a colon in all styles.`,
      `Phrasal verbs vs. prepositions – context is critical. "Look up the street" (preposition – "up" = direction) versus "Look Up the Number" (phrasal verb – "up" = to find). In the first, "up" is lowercase in all styles. In the second, "up" is capitalized in AP/Chicago, lowercase in APA/MLA.`,
    ],
    faqItems: [
      {
        question: `How can I tell if "up" is a preposition or an adverb in a phrasal verb?`,
        answer: `Ask yourself if "up" can be separated from the verb. In phrasal verbs, the adverb and verb are flexible – you can say "give up" or "give the idea up." In prepositions, you can't separate them – "walk up the street" but never "walk the street up." If separation is possible, it's likely an adverb in a phrasal verb.`,
      },
      {
        question: `Should I capitalize "up" in "The Up Side" or "The up side"?`,
        answer: `In AP and Chicago, "The Up Side" is correct – "up" is an adjective modifying "side." In APA and MLA, "The up side" is correct – it's a three-letter word. Whichever guide you're following determines the answer.`,
      },
      {
        question: `What about "update" – does the "up" in that word follow the same rules?`,
        answer: `No. "Update" is a single word, not a word + preposition/adverb combination. It's treated as one unit. In title case, "Update" is capitalized because it's a multisyllabic word with meaning.`,
      },
      {
        question: `Why do AP and Chicago capitalize adverbs and adjectives while APA and MLA don't?`,
        answer: `AP and Chicago follow a "parts of speech" rule where major word categories (nouns, verbs, adjectives, adverbs) are capitalized. APA and MLA follow a "word length" rule where only words above a certain length are capitalized. This is a fundamental difference in philosophy between the style guides.`,
      },
      {
        question: `Is "upon" treated the same way as "up"?`,
        answer: `No. "Upon" is a preposition and has four letters. AP, APA, and MLA capitalize it (four-letter rule). Chicago lowercases it (preposition rule). "Up" as a standalone preposition is always lowercase because it has three letters. But "upon" follows different rules.`,
      },
    ],
    ctaWord: "Give Up Hope and Try Again",
    relatedSlugs: [
      "in-capitalized-in-title-case",
      "to-capitalized-in-title-case",
      "with-capitalized-in-title-case",
    ],
  },
  {
    slug: "between-capitalized-in-title-case",
    word: "between",
    answerBox: `Yes – "between" is capitalized in all major style guides. "Between" has seven letters, well above the minimum length threshold for capitalization. AP, APA, and MLA capitalize it without question. Chicago also capitalizes it in the 18th edition (2024), which updated the preposition rule to capitalize five-letter-or-longer words.`,
    whySectionHeading: `Why "Between" Is Always Capitalized`,
    whySectionBody: `"Between" is a preposition – a word that shows the relationship between elements in a sentence ("the space between the trees," "a choice between two options," "between you and me"). Prepositions are one of the primary categories that title case rules examine, but they're handled differently depending on the style guide.\n\n"Between" is a seven-letter word, which puts it well above every threshold in the major style guides. AP, APA, and MLA all capitalize words of four or more letters, so "between" qualifies easily. Chicago's approach to prepositions is more complex. Historically, the Chicago Manual of Style lowercased all prepositions regardless of length. However, the 18th edition (2024) revised this rule to capitalize prepositions of five or more letters while keeping shorter prepositions lowercase. Since "between" has seven letters, it gets capitalized under the new Chicago rule as well.\n\nThe result is unique and straightforward: there is no major style guide in which "between" should be lowercase. This makes it one of the simplest words to handle in title case.`,
    styleGuideRows: [
      { guide: "AP",      capitalize: true, rule: "Capitalize words of four or more letters" },
      { guide: "APA",     capitalize: true, rule: "Capitalize words of four or more letters" },
      { guide: "Chicago", capitalize: true, rule: "Capitalize prepositions of five or more letters (18th ed.)" },
      { guide: "MLA",     capitalize: true, rule: "Capitalize words of four or more letters" },
    ],
    contextNote: `"Between" is a word that highlights the difference between Chicago Manual of Style 17th edition (pre-2024) and 18th edition (2024). In the 17th edition, Chicago lowercased all prepositions in titles regardless of length – so "between" would have been lowercase: "The Choice between Good and Evil." However, the 18th edition updated this rule. Since "between" has seven letters, it now gets capitalized: "The Choice Between Good and Evil." Other long prepositions affected by this change include "without," "through," "before," "after," and "during." In contrast, short prepositions like "to," "for," "in," "on," and "from" remain lowercase in both editions.`,
    doExamples: [
      "The Choice Between Two Paths",
      "A Bridge Between Nations",
      "Communication Between Teams",
      "Living Between Two Worlds",
    ],
    doNotExamples: [
      { text: "The Choice between Two Paths", reason: "Correct under Chicago 17th (outdated) — incorrect under all current guides" },
      { text: "A Bridge BETWEEN Nations", reason: "All-caps preposition — never correct in any style guide" },
    ],
    edgeCasesHeading: "Edge Cases",
    edgeCasesBody: `A few situations where the standard rules shift:`,
    edgeCaseItems: [
      `"Between" as the first word of a title. All style guides capitalize the first word of a title regardless of part of speech or length. "Between the Lines: A Reading Guide" — ✓ (all styles).`,
      `"Between" as the last word of a title. Most style guides require capitalizing the last word of a title, regardless of length or part of speech. "The Secrets We Keep Between" — ✓ (all styles).`,
      `"Between" in date or range expressions. Titles sometimes express ranges using "between...and" construction. In this context, "between" is a preposition showing range boundaries – capitalize it in all current styles. "Historical Data Between 1950 and 2000" — ✓.`,
      `"Between" after a colon or dash. When a colon introduces a subtitle, the first word after the colon is treated as a new title segment. Capitalize "between" after a colon in all styles. "Relationships: Between Conflict and Connection" — ✓.`,
    ],
    faqItems: [
      {
        question: `Is "between" a preposition or a conjunction?`,
        answer: `"Between" is a preposition. It shows the relationship between two or more things. Conjunctions like "and" and "but" connect words or clauses, but "between" connects a noun or pronoun to other elements in the sentence. This grammatical distinction doesn't affect title capitalization – "between" is capitalized because of its length.`,
      },
      {
        question: `Should I capitalize "between" in email subject lines?`,
        answer: `Yes. Email subject lines typically use title case, and "between" should be capitalized. For example, "The Difference Between AP and Chicago Style" is correct. If you're using sentence case for an email subject, only the first word and proper nouns are capitalized.`,
      },
      {
        question: `How did the Chicago Manual of Style 18th edition change the rule for "between"?`,
        answer: `The 17th edition lowercased all prepositions, including "between." The 18th edition (2024) updated the rule to capitalize prepositions of five or more letters. Since "between" has seven letters, it went from lowercase in 17th edition to uppercase in 18th edition. If you're updating Chicago style guides, this is one of the prepositions directly affected.`,
      },
      {
        question: `What other long prepositions were affected by the Chicago 18th edition update?`,
        answer: `Several prepositions with five or more letters are now capitalized in Chicago 18th edition: "without," "through," "before," "after," "during," "toward," "across," and "against." Short prepositions like "to," "for," "in," "on," "from," and "with" (four letters or fewer) remain lowercase.`,
      },
      {
        question: `Is there any style guide where "between" would be lowercase?`,
        answer: `Not in modern practice. Chicago 17th edition lowercased "between," but that edition is now superseded by the 18th edition. All current major style guides – AP, APA, Chicago 18th, and MLA – capitalize "between."`,
      },
    ],
    ctaWord: "The Choice Between Two Paths",
    relatedSlugs: [
      "from-capitalized-in-title-case",
      "with-capitalized-in-title-case",
      "in-capitalized-in-title-case",
    ],
  },
]

export function getIsXArticleBySlug(slug: string): IsXArticle | undefined {
  return IS_X_ARTICLES.find((a) => a.slug === slug)
}
