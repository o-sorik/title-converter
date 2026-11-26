/**
 * Content for /camel-case-converter (batch 1 of the topical map, brief
 * docs/briefs/camel-case-converter.md in the strategy repo).
 *
 * Every example is kept as a literal so a reader sees what the page claims;
 * `camel-case-content.test.ts` asserts each one against the engine.
 * Claims about languages and style guides come from the sources below
 * only (F1–F22 in the brief).
 */

export interface CamelExample {
  input: string
  output: string
}

export interface CamelSource {
  label: string
  href: string
}

export const CAMEL_SOURCES = {
  googleJsCamel: "https://google.github.io/styleguide/jsguide.html#naming-camel-case-defined",
  googleJsMethods: "https://google.github.io/styleguide/jsguide.html#naming-method-names",
  googleJsConstants: "https://google.github.io/styleguide/jsguide.html#naming-constant-names",
  googleJava: "https://google.github.io/styleguide/javaguide.html#s5.3-camel-case",
  googleTs: "https://google.github.io/styleguide/tsguide.html#naming-rules-by-identifier-type",
  googleJson: "https://google.github.io/styleguide/jsoncguide.html#Property_Name_Format",
  mdnCamel: "https://developer.mozilla.org/en-US/docs/Glossary/Camel_case",
  mdnIdentifiers: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#identifiers",
  mdnPrivate: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements",
  mdnDataset: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#name_conversion",
  dotnetCapitalization: "https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/capitalization-conventions#capitalization-rules-for-identifiers",
  csharpIdentifiers: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/identifier-names#camel-case",
  oracleJava: "https://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html",
  kotlin: "https://kotlinlang.org/docs/coding-conventions.html#function-names",
  dart: "https://dart.dev/effective-dart/style#do-capitalize-acronyms-and-abbreviations-longer-than-two-letters-like-words",
  goInitialisms: "https://go.dev/wiki/CodeReviewComments#initialisms",
  swift: "https://www.swift.org/documentation/api-design-guidelines/#follow-case-conventions",
  cssom: "https://drafts.csswg.org/cssom/#css-property-to-idl-attribute",
  react: "https://react.dev/reference/react-dom/components/common#applying-css-styles",
  pep8: "https://peps.python.org/pep-0008/#function-and-variable-names",
} as const

/** What happens to the text, in the order of the engine's rules. Subject = the text element. */
export const CAMEL_STEPS: { change: string; why: string; source?: CamelSource }[] = [
  {
    change: "Spaces, hyphens, underscores and dots disappear.",
    why: "Each of them marks a word boundary, so user-first-name, user_first_name and user.first.name all become userFirstName.",
  },
  {
    change: "The first word becomes lowercase.",
    why: "UserFirstName becomes userFirstName and MAX_RETRY_COUNT becomes maxRetryCount. The lowercase start is what sets camelCase apart from PascalCase.",
  },
  {
    change: "Every next word starts with a capital.",
    why: "The capital is the only mark of where a word begins, so the rest of each word is lowercase: is valid becomes isValid.",
  },
  {
    change: "A run of capitals becomes one word.",
    why: "HTTPServer becomes httpServer, not hTTPServer: only the last capital of the run, the one a lowercase letter follows, opens the next word.",
  },
  {
    change: "A plural acronym stays one word.",
    why: "getURLs becomes getUrls, not getUrLs: a lowercase s after a run of capitals is read as a plural, not as the start of a word.",
  },
  {
    change: "Digits stay attached to their word.",
    why: "A digit has no capital, so it cannot mark a new word: md5 hash becomes md5Hash.",
  },
  {
    change: "An underscore separates two numbers in a row.",
    why: "version 2.5 becomes version2_5, because version25 would read as twenty-five. Google's Java guide does the same in its guava33_4_6 example",
    source: { label: "Google Java Style", href: CAMEL_SOURCES.googleJava },
  },
  {
    change: "Apostrophes are dropped without splitting the word.",
    why: "Don't becomes dont, not donT, as Google's guide says to \"remove any apostrophes\"",
    source: { label: "Google JavaScript Style", href: CAMEL_SOURCES.googleJsCamel },
  },
  {
    change: "Other symbols are removed.",
    why: "C++ & C# becomes cC, so spell out names whose symbols carry the meaning before you convert them.",
  },
]

export const CAMEL_EXAMPLES = {
  // Intro
  phrase: { input: "user first name", output: "userFirstName" },
  acronym: { input: "HTTPServer", output: "httpServer" },
  // Under the list of steps
  acronymInside: { input: "getHTTPResponseCode", output: "getHttpResponseCode" },
  kebab: { input: "user-first-name", output: "userFirstName" },
  mixed: { input: "Don't Stop: Café 2.5", output: "dontStopCafé2_5" },
  // Acronyms
  googleXml: { input: "XML HTTP request", output: "xmlHttpRequest" },
  googleId: { input: "new customer ID", output: "newCustomerId" },
  dotnetIo: { input: "IO stream", output: "ioStream" },
  userId: { input: "user ID", output: "userId" },
  goAppId: { input: "app ID", output: "appId" },
  swiftSmtp: { input: "user SMTP server", output: "userSmtpServer" },
  // Honest limits
  brandLucky: { input: "iPhone 15 Pro", output: "iPhone15Pro" },
  brandIos: { input: "iOS", output: "iOs" },
  brandLong: { input: "supports IPv6 on iOS", output: "supportsIPv6OnIOs" },
  digitFirst: { input: "2nd place", output: "2ndPlace" },
  reserved: { input: "class", output: "class" },
  underscore: { input: "_privateValue", output: "privateValue" },
  dollar: { input: "$scope", output: "scope" },
  hash: { input: "#count", output: "count" },
  accents: { input: "Café Résumé", output: "caféRésumé" },
  // Use cases
  jsFunction: { input: "get user name", output: "getUserName" },
  jsonKey: { input: "first name", output: "firstName" },
  cssProperty: { input: "font-size", output: "fontSize" },
  dataAttribute: { input: "data-user-id", output: "dataUserId" },
} satisfies Record<string, CamelExample>

/** The neighbours the italic section bridges to, each produced by its own mode from the same phrase. */
export const CAMEL_NEIGHBOURS = {
  pascal: { input: "user first name", output: "UserFirstName" },
  snake: { input: "user first name", output: "user_first_name" },
  kebab: { input: "user first name", output: "user-first-name" },
}

/** FAQ: the title case mode keeps a camelCase name whole, so it goes through snake_case first. */
export const CAMEL_BACK_TO_WORDS = {
  whole: { input: "userFirstName", output: "userFirstName" },
  snake: { input: "userFirstName", output: "user_first_name" },
  spaced: { input: "user first name", output: "User First Name" },
}

export interface CamelFaq {
  question: string
  /** Plain text: the same string feeds the FAQPage structured data. */
  answer: string
  /** A phrase of `answer` the page renders as a link. It must occur in the answer exactly once. */
  link?: { anchor: string; href: string }
}

export const CAMEL_FAQS: CamelFaq[] = [
  {
    question: "What is camel case?",
    answer:
      "Camel case is \"a way of writing phrases without spaces,\" as MDN puts it: the first word is lowercase and every next word starts with a capital, as in userFirstName. It is the usual format for variable and function names in JavaScript, Java, Kotlin, Swift and Dart.",
  },
  {
    question: "What is the difference between lower camel case and upper camel case?",
    answer:
      "Lower camel case starts with a lowercase letter, as in userFirstName. Upper camel case starts with a capital, as in UserFirstName, and MDN calls it \"upper camel case or Pascal case.\" This converter returns lower camel case; for the other form, use the PascalCase mode.",
  },
  {
    question: "Is it userId or userID in camelCase?",
    answer:
      "It depends on the style guide. Google's JavaScript and TypeScript guides treat an acronym as a word, so user ID becomes userId, and this converter does the same. Dart keeps a two-letter acronym that is capitalized in English in capitals, so userID, and Go writes appID rather than appId. Follow the guide your codebase uses.",
  },
  {
    question: "Why is it called camel case?",
    answer:
      "The capitals in the middle of the name stick up like the humps of a camel's back, which is the picture MDN gives for the name.",
  },
  {
    question: "How do I turn camelCase back into words?",
    answer:
      "The title case mode keeps a camelCase name as one word, so userFirstName stays userFirstName. Split it first: the snake_case mode turns userFirstName into user_first_name. Replace the underscores with spaces and convert to title case, and user first name becomes User First Name.",
    link: { anchor: "convert to title case", href: "/" },
  },
]
