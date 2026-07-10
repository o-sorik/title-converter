export interface TitleCaseMistake {
  wrong: string
  correct: string
  why: string
}

export interface PopularCapitalizationQuestion {
  question: string
  href: string
  hint: string
}

export const POPULAR_CAPITALIZATION_QUESTIONS: PopularCapitalizationQuestion[] = [
  { question: "Do You Capitalize Seasons?", href: "/blog/do-you-capitalize-seasons", hint: "Spring, summer, fall, winter – lowercase in most contexts." },
  { question: "Is President Capitalized?", href: "/blog/is-president-capitalized", hint: "Depends on whether it comes before a name." },
  { question: "Is Earth Capitalized?", href: "/blog/is-earth-capitalized", hint: "Capitalized as a planet, lowercase as soil or ground." },
  { question: "Do You Capitalize After a Colon?", href: "/blog/do-you-capitalize-after-a-colon", hint: "Style guides split on this one." },
  { question: "Is High School Capitalized?", href: "/blog/is-high-school-capitalized", hint: "Only when it is part of a school's name." },
  { question: "Is Professor Capitalized?", href: "/blog/is-professor-capitalized", hint: "Capitalized as a title before a name." },
  { question: "Is Math Capitalized?", href: "/blog/is-math-capitalized", hint: "Lowercase unless it names a specific course." },
  { question: "Do You Capitalize Majors?", href: "/blog/do-you-capitalize-majors", hint: "Lowercase in most sentences – with a language exception." },
  { question: "Is Bachelor's Degree Capitalized?", href: "/blog/is-bachelors-degree-capitalized", hint: "Usually lowercase, unlike the full degree name." },
  { question: "What Words Are Not Capitalized in a Title?", href: "/blog/what-words-are-not-capitalized-in-a-title", hint: "Articles, short prepositions, and short conjunctions." },
]

export const TITLE_CASE_MISTAKES: TitleCaseMistake[] = [
  { wrong: "A Guide To Better Writing", correct: "A Guide to Better Writing", why: "Short prepositions are usually lowercase." },
  { wrong: "How to Build a brand Voice", correct: "How to Build a Brand Voice", why: "Nouns are major words." },
  { wrong: "The Science of growth", correct: "The Science of Growth", why: "Last word is always capitalized." },
  { wrong: "Working with Api Data", correct: "Working with API Data", why: "Acronyms should keep intended casing." },
  { wrong: "Turn on Notifications Fast", correct: "Turn On Notifications Fast", why: "In phrasal verbs, second word may be a major word." },
  { wrong: "State-of-the-art Design System", correct: "State-of-the-Art Design System", why: "Hyphenated compounds often capitalize major elements." },
  { wrong: "Content Rules: how to Scale", correct: "Content Rules: How to Scale", why: "Subtitles after colons often start with a capitalized word." },
  { wrong: "Why is This Important", correct: "Why Is This Important", why: "Verbs such as \"is\" are capitalized." },
  { wrong: "Learning From The Best", correct: "Learning from the Best", why: "Articles and short prepositions are usually lowercase in the middle." },
  { wrong: "An Introduction to ui Design", correct: "An Introduction to UI Design", why: "Initialisms should keep their standard uppercase format." },
]
