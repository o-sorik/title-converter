import { ConversionType } from "./converters";

export interface SeoPageConfig {
    slug: string;
    mode: ConversionType;
    title: string;
    description: string;
    h1: string;
    content: {
        intro: string;
        features: string[];
        exampleInput: string;
        exampleOutput: string;
    };
    faqs?: { question: string; answer: string }[];
}

export const HOME_PAGE_CONFIG: SeoPageConfig = {
    slug: "",
    mode: "title",
    title: "Title Case Converter Online - Free Text Capitalization Tool",
    description: "Convert text to Title Case instantly online. Automatically capitalizes major words and lowercases minor words following standard capitalization rules.",
    h1: "Title Case Converter Online",
    content: {
        intro: "Use this free title capitalization tool to convert headlines and titles in seconds. It applies standard title case rules used across AP, APA, MLA, and Chicago style workflows, with practical handling for small words, punctuation, and common edge cases.",
        features: [
            "Converts text instantly with no signup required.",
            "Capitalizes major words and keeps minor words lowercase where appropriate.",
            "Always capitalizes the first and last word of a title.",
            "Supports practical edge cases like hyphenated words and subtitle punctuation.",
        ],
        exampleInput: "the quick brown fox jumps over the lazy dog",
        exampleOutput: "The Quick Brown Fox Jumps over the Lazy Dog",
    },
    faqs: [
        {
            question: "What is title case?",
            answer: "Title case is a capitalization style where major words are capitalized and minor words (like articles, prepositions, and conjunctions) are lowercased. It's commonly used for book titles, headlines, and article titles."
        },
        {
            question: "Which words should be capitalized in title case?",
            answer: "In title case, capitalize nouns, pronouns, verbs, adjectives, and adverbs. Lowercase articles (a, an, the), coordinating conjunctions (and, but, or), and short prepositions (in, on, at). Always capitalize the first and last word."
        },
        {
            question: "Is 'the' capitalized in a title?",
            answer: "The word 'the' is typically lowercased in title case unless it's the first or last word of the title. For example: 'The Catcher in the Rye' - the first 'The' is capitalized, but 'the' in the middle is lowercase."
        },
        {
            question: "What's the difference between title case and sentence case?",
            answer: "Title case capitalizes major words throughout the text, while sentence case only capitalizes the first word and proper nouns, similar to regular sentences. Use title case for titles and headlines, sentence case for subtitles and descriptions."
        },
        {
            question: "Is title case the same in AP, APA, MLA, and Chicago?",
            answer: "Not exactly. The core logic is similar, but style guides differ on specific edge cases, especially prepositions, conjunction length rules, and subtitle treatment. Use your required style guide when writing for publication."
        },
        {
            question: "Do you capitalize short verbs like 'is' or 'be' in title case?",
            answer: "Yes. Verbs are major words, so they are capitalized even when short. Example: 'Why This Is Important' and 'How to Be More Productive.'"
        },
        {
            question: "Should words after a colon be capitalized?",
            answer: "In many editorial styles, the first word after a colon in a title is capitalized, especially when a subtitle begins. Example: 'Title Case Rules: A Practical Guide.'"
        },
        {
            question: "How should hyphenated words be capitalized?",
            answer: "Hyphenated compounds are often capitalized based on each part's role. In many cases both parts are capitalized for title case. Example: 'State-of-the-Art Methods' may vary by guide, so check your target style."
        },
        {
            question: "Is 'to' capitalized in infinitives like 'How to Write'?",
            answer: "Usually 'to' remains lowercase in title case when used as an infinitive marker. Example: 'How to Write Better Headlines.'"
        },
        {
            question: "Should prepositions always stay lowercase?",
            answer: "Not always. Most short prepositions are lowercased in the middle of a title, but they are capitalized when they are the first or last word."
        },
        {
            question: "When should I use title case vs sentence case?",
            answer: "Use title case for headlines, article titles, book titles, and many marketing headings. Use sentence case for body copy, UI labels, and contexts where a more conversational tone is preferred."
        },
        {
            question: "Can I trust automatic title capitalization for brand names?",
            answer: "Automatic conversion is a fast baseline, but brand and product names may have custom capitalization. Always do a final manual check for proper nouns and trademarks."
        },
        {
            question: "Does this converter work for blog titles and YouTube titles?",
            answer: "Yes. It is useful for blogs, newsletters, ad headlines, and video titles when you need consistent capitalization quickly."
        },
        {
            question: "Is this title case converter free to use?",
            answer: "Yes. The converter is free, instant, and does not require account signup for basic use."
        }
    ],
};

export const SEO_CONFIG: Record<string, SeoPageConfig> = {
    "sentence-case-converter": {
        slug: "sentence-case-converter",
        mode: "sentence",
        title: "Sentence Case Converter - Free Online Tool",
        description: "Convert text to Sentence case instantly. Automatically capitalizes the first letter of each sentence and lowercases the rest.",
        h1: "Sentence Case Converter",
        content: {
            intro: "The Sentence Case Converter automatically standardizes your text into proper sentence format. It capitalizes the very first letter of every sentence and transforms the rest of the text into lowercase. This is perfect for cleaning up rough drafts, fixing accidental caps lock usage, or standardizing list items.",
            features: [
                "Capitalizes the first letter of sentences.",
                "Lowercases all other letters.",
                "Respects basic punctuation like periods, question marks, and exclamation points.",
            ],
            exampleInput: "THIS IS an EXAMPLE. of SENTENCE CASE.",
            exampleOutput: "This is an example. Of sentence case.",
        },
        faqs: [
            {
                question: "What does a sentence case converter do?",
                answer: "It converts text so each sentence starts with a capital letter while the remaining words are lowercased, except where manual edits are needed."
            },
            {
                question: "When should I use sentence case instead of title case?",
                answer: "Use sentence case for body copy, UI text, and descriptions. Use title case mostly for headings and titles."
            },
            {
                question: "Will sentence case fix random ALL CAPS text?",
                answer: "Yes. It is useful for normalizing text that was typed in caps lock or pasted with inconsistent capitalization."
            },
            {
                question: "Does sentence case preserve punctuation?",
                answer: "Yes. The converter focuses on letter casing and keeps punctuation in place."
            }
        ],
    },
    "lower-case-converter": {
        slug: "lower-case-converter",
        mode: "lower",
        title: "Lower Case Converter - Free Online Tool",
        description: "Convert all text to lower case instantly. Removes all capitalization.",
        h1: "Lower Case Converter",
        content: {
            intro: "The Lower Case Converter transforms all characters in your text to small letters. It is useful for standardizing data, normalizing inputs for databases, or simply styling text that requires no capitalization.",
            features: [
                "Converts every letter to lowercase.",
                "Leaves numbers and symbols unchanged.",
                "Instant conversion for large blocks of text.",
            ],
            exampleInput: "Hello WORLD",
            exampleOutput: "hello world",
        },
        faqs: [
            {
                question: "What is a lower case converter used for?",
                answer: "It converts all letters to lowercase, which helps with text normalization, data cleanup, and case-insensitive matching."
            },
            {
                question: "Does lower case conversion change numbers and symbols?",
                answer: "No. Numbers and punctuation are preserved while alphabetic characters are converted to lowercase."
            },
            {
                question: "Should I use lower case for SEO URLs?",
                answer: "Yes, lowercase is generally preferred for consistent and clean URLs, often combined with hyphens."
            },
            {
                question: "Can lower case conversion affect brand names?",
                answer: "Yes. It may remove intentional brand casing, so review final text when proper nouns matter."
            }
        ],
    },
    "upper-case-converter": {
        slug: "upper-case-converter",
        mode: "upper",
        title: "Upper Case Converter - Free Online Tool",
        description: "Convert all text to UPPER CASE. Capitalizes every single letter instantly.",
        h1: "Upper Case Converter",
        content: {
            intro: "The Upper Case Converter transforms all text into capital letters. Use this tool to make headlines stand out, create acronyms, or emphasize important warnings.",
            features: [
                "Capitalizes every letter.",
                "Great for headlines and emphasis.",
                "Preserves numbers and punctuation.",
            ],
            exampleInput: "Hello World",
            exampleOutput: "HELLO WORLD",
        },
        faqs: [
            {
                question: "What is an upper case converter?",
                answer: "It converts all letters in your text to uppercase, useful for short labels, emphasis, and warnings."
            },
            {
                question: "When should I avoid using all caps?",
                answer: "Avoid all caps for long paragraphs because it reduces readability and can feel visually aggressive."
            },
            {
                question: "Does uppercase conversion keep punctuation?",
                answer: "Yes. Symbols and punctuation remain unchanged while letters are capitalized."
            },
            {
                question: "Can I use this for acronyms?",
                answer: "Yes. Uppercase conversion is useful when formatting acronyms and short technical labels."
            }
        ],
    },
    "camel-case-converter": {
        slug: "camel-case-converter",
        mode: "camel",
        title: "Camel Case Converter - Free Online Tool",
        description: "Convert text to camelCase. Perfect for programming variable names in JavaScript, Java, and C#.",
        h1: "Camel Case Converter",
        content: {
            intro: "The Camel Case Converter transforms text into the camelCase naming convention, commonly used in programming languages like JavaScript and Java. It removes spaces and punctuation, and capitalizes the first letter of each word except the first one.",
            features: [
                "Removes all spaces and special characters.",
                "Lowercases the first word.",
                "Capitalizes subsequent words.",
                "Essential for coding variable names.",
            ],
            exampleInput: "User first name",
            exampleOutput: "userFirstName",
        },
        faqs: [
            {
                question: "What is camelCase?",
                answer: "camelCase is a naming convention where the first word is lowercase and each following word starts with an uppercase letter."
            },
            {
                question: "Where is camelCase commonly used?",
                answer: "It is common in JavaScript, TypeScript, and JSON keys for variables, properties, and function names."
            },
            {
                question: "Does camel case remove spaces and punctuation?",
                answer: "Yes. Spaces and separators are removed and words are merged into a single identifier."
            },
            {
                question: "What is the difference between camelCase and PascalCase?",
                answer: "camelCase starts with a lowercase letter, while PascalCase starts with an uppercase letter."
            }
        ],
    },
    "pascal-case-converter": {
        slug: "pascal-case-converter",
        mode: "pascal",
        title: "Pascal Case Converter - Free Online Tool",
        description: "Convert text to PascalCase. Standard naming convention for classes in many programming languages.",
        h1: "Pascal Case Converter",
        content: {
            intro: "The Pascal Case Converter transforms text into PascalCase (also known as UpperCamelCase). This is widely used for class names in languages like C#, Java, and TypeScript. Every word is capitalized and spaces are removed.",
            features: [
                "Capitalizes the first letter of every word.",
                "Removes spaces and punctuation.",
                "Standard for class names and types.",
            ],
            exampleInput: "api response data",
            exampleOutput: "ApiResponseData",
        },
        faqs: [
            {
                question: "What is PascalCase used for?",
                answer: "PascalCase is widely used for class names, component names, and type identifiers in many programming languages."
            },
            {
                question: "Does PascalCase capitalize every word?",
                answer: "Yes. Each word begins with an uppercase letter and separators are removed."
            },
            {
                question: "Is PascalCase the same as UpperCamelCase?",
                answer: "Yes. PascalCase and UpperCamelCase usually refer to the same naming style."
            },
            {
                question: "Should file names also use PascalCase?",
                answer: "That depends on your project conventions, but many teams align component files with PascalCase names."
            }
        ],
    },
    "snake-case-converter": {
        slug: "snake-case-converter",
        mode: "snake",
        title: "Snake Case Converter - Free Online Tool",
        description: "Convert text to snake_case. Replaces spaces with underscores, ideal for Python and databases.",
        h1: "Snake Case Converter",
        content: {
            intro: "The Snake Case Converter transforms text into snake_case. It replaces all spaces with underscores and converts letters to lowercase. This format is the standard for variable names in Python and for database column names.",
            features: [
                "Replaces spaces with underscores (_).",
                "Converts all text to lowercase.",
                "Removes special characters.",
            ],
            exampleInput: "User ID Number",
            exampleOutput: "user_id_number",
        },
        faqs: [
            {
                question: "What is snake_case?",
                answer: "snake_case is a naming format where words are lowercase and separated by underscores."
            },
            {
                question: "Where is snake_case commonly used?",
                answer: "It is common in Python code, SQL schemas, and data engineering workflows."
            },
            {
                question: "Does snake case keep numbers?",
                answer: "Yes. Numeric characters are preserved while words are normalized and separated with underscores."
            },
            {
                question: "Snake case vs kebab case: what is the difference?",
                answer: "snake_case uses underscores, while kebab-case uses hyphens."
            }
        ],
    },
    "kebab-case-converter": {
        slug: "kebab-case-converter",
        mode: "kebab",
        title: "Kebab Case Converter - Free Online Tool",
        description: "Convert text to kebab-case. Replaces spaces with hyphens, essential for URLs and CSS classes.",
        h1: "Kebab Case Converter",
        content: {
            intro: "The Kebab Case Converter transforms text into kebab-case (also called spinal-case). It replaces spaces with hyphens and makes everything lowercase. This is the standard for URL slugs and CSS class names.",
            features: [
                "Replaces spaces with hyphens (-).",
                "Converts all text to lowercase.",
                "URL-friendly format.",
            ],
            exampleInput: "Product Detail Page",
            exampleOutput: "product-detail-page",
        },
        faqs: [
            {
                question: "What is kebab-case?",
                answer: "kebab-case is a format where words are lowercase and separated by hyphens."
            },
            {
                question: "Is kebab-case good for URLs?",
                answer: "Yes. Hyphenated lowercase slugs are typically easier to read and widely used in SEO-friendly URLs."
            },
            {
                question: "Can I use kebab-case for CSS classes?",
                answer: "Yes. Many CSS naming patterns use kebab-case for consistency and readability."
            },
            {
                question: "Will punctuation be removed in kebab conversion?",
                answer: "Yes. Special characters are generally stripped while words are joined with hyphens."
            }
        ],
    },
    // Alias for slug generator
    "slug-generator": {
        slug: "slug-generator",
        mode: "kebab",
        title: "URL Slug Generator - Free Online Tool",
        description: "Generate clean URL slugs from any text. Converts to lowercase, removes specials, and uses hyphens.",
        h1: "URL Slug Generator",
        content: {
            intro: "The URL Slug Generator creates SEO-friendly URL slugs from your text. It follows best practices by using hyphens to separate words, converting to lowercase, and removing invalid URL characters.",
            features: [
                "Creates SEO-friendly URLs.",
                "Removes unsafe characters.",
                "Standardizes on hyphens.",
            ],
            exampleInput: "What IS the Best Title?",
            exampleOutput: "what-is-the-best-title",
        },
        faqs: [
            {
                question: "What is a URL slug generator?",
                answer: "It converts text into a clean, URL-safe slug by lowercasing words, removing unsafe characters, and using hyphens."
            },
            {
                question: "Why are hyphens preferred in slugs?",
                answer: "Hyphens improve readability and are commonly used in search-friendly URL structures."
            },
            {
                question: "Should slugs include stop words like 'the' and 'of'?",
                answer: "They can, but many teams shorten slugs by removing unnecessary words while keeping meaning clear."
            },
            {
                question: "Can I use generated slugs for blog posts and products?",
                answer: "Yes. Slugs are useful for blog URLs, product pages, category pages, and docs."
            }
        ],
    },
    "alternating-case-converter": {
        slug: "alternating-case-converter",
        mode: "alternating",
        title: "Alternating Case Converter - Free Online Tool",
        description: "Convert text to aLtErNaTiNg cAsE. Fun text generator for memes and social media.",
        h1: "Alternating Case Converter",
        content: {
            intro: "The Alternating Case Converter transforms text into a SpongeBob-style mocking format. It is widely used in internet culture, memes, and social media to convey a mocking or sarcastic tone.",
            features: [
                "Randomizes or alternates capitalization.",
                "Fun for social media.",
                "Instantly memifies text.",
            ],
            exampleInput: "Don't mock me",
            exampleOutput: "dOn'T mOcK mE",
        },
        faqs: [
            {
                question: "What is alternating case?",
                answer: "Alternating case switches letter casing in sequence to create a playful or meme-like text style."
            },
            {
                question: "When should I use alternating case?",
                answer: "It works best for informal content like jokes, memes, and social media posts."
            },
            {
                question: "Is alternating case good for professional writing?",
                answer: "Usually no. It reduces readability and is not recommended for formal communication."
            },
            {
                question: "Does alternating case preserve punctuation?",
                answer: "Yes. Punctuation remains while letter casing alternates."
            }
        ],
    },
};

export const CONVERTER_SLUGS = Object.keys(SEO_CONFIG);
