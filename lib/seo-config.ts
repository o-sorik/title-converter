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
}

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
    },
};

export const CONVERTER_SLUGS = Object.keys(SEO_CONFIG);
